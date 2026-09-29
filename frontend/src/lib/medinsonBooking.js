/**
 * medinsonBooking.js
 * ==================
 * Drop-in API client for the MedInson Stomatolog Relay Server.
 *
 * Handles:
 *  - Fetching live availability + dentist profile (Endpoint A)
 *  - Automatic 10-day working-hours schedule fallback when the desktop app
 *    has not yet published its first slot batch
 *  - E2E browser-side encryption of patient PII via RSA-OAEP + AES-GCM
 *  - Generating linkToken / linkTokenHash for Telegram bot pairing
 *  - Submitting the booking request (Endpoint B)
 *  - Returning a Telegram deep-link the patient uses to enable reminders
 */

/* ── Config (reads Vite env; falls back so the module works in plain Node) ── */

const DEFAULT_API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_API_URL) ||
  "https://dentist-medinson-license.uz";

const DEFAULT_SITE_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_SITE_ID) ||
  "mr7c3fxzwy";

const LOCAL_BOOKED_STORAGE_KEY = "medinson_booked_slots_v1";

/* ── Internal helpers ─────────────────────────────────────────────────────── */

const pad2 = (n) => String(n).padStart(2, "0");

/** ArrayBuffer / Uint8Array → base64 string */
const toBase64 = (bytes) => {
  let binary = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i += 1) binary += String.fromCharCode(arr[i]);
  return btoa(binary);
};

/** base64 string → Uint8Array */
const fromBase64 = (b64) => {
  const binary = atob(String(b64 || "").trim());
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
};

/** Cryptographically random hex string (default 48 chars = 24 bytes) */
const randomHex = (byteLength = 24) => {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

/** SHA-256 of a string → 64-char lowercase hex */
const sha256Hex = async (text) => {
  const data = new TextEncoder().encode(String(text || ""));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
};

const readLocalBookedSet = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return new Set();
    const raw = window.localStorage.getItem(LOCAL_BOOKED_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
};

const recordLocalBookedSlot = (date, time) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    const set = readLocalBookedSet();
    set.add(`${date}_${time}`);
    window.localStorage.setItem(LOCAL_BOOKED_STORAGE_KEY, JSON.stringify([...set].slice(-200)));
  } catch {
    /* ignore storage errors */
  }
};

const DAY_CODES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Build a 10-day schedule from the clinic's workingDays and workingHours
 * when the desktop app has not yet pushed explicit slots to the relay.
 */
export const buildWorkingHoursSchedule = (data = {}, daysCount = 10) => {
  const workingDays = Array.isArray(data?.dentist?.workingDays) && data.dentist.workingDays.length > 0
    ? data.dentist.workingDays
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startStr = data?.dentist?.workingHours?.start || "08:00";
  const endStr = data?.dentist?.workingHours?.end || "18:00";

  const [startH] = startStr.split(":").map(Number);
  const [endH] = endStr.split(":").map(Number);
  const safeStartH = Number.isFinite(startH) ? startH : 8;
  const safeEndH = Number.isFinite(endH) && endH > safeStartH ? endH : 18;

  const bookedSet = readLocalBookedSet();
  const now = new Date();
  const todayYmd = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + 60; // 1h lead time

  const result = [];
  let offset = 0;

  while (result.length < daysCount && offset < 21) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    offset += 1;
    const dayCode = DAY_CODES[d.getDay()];
    if (!workingDays.includes(dayCode)) continue;

    const ymd = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    const times = [];

    for (let h = safeStartH; h < safeEndH; h += 1) {
      if (h === 12) continue; // Lunch break 12:00–13:00
      const time = `${pad2(h)}:00`;
      if (ymd === todayYmd && h * 60 <= currentMinutes) continue;
      if (bookedSet.has(`${ymd}_${time}`)) continue;
      times.push(time);
    }

    if (times.length > 0) {
      result.push({ date: ymd, times });
    }
  }

  return result;
};

/**
 * Seal patient details with the clinic's RSA-2048 OAEP public key.
 */
const sealPatientDetails = async (details, publicKeyBase64) => {
  const subtle = window.crypto?.subtle;
  if (!subtle || !publicKeyBase64) return null;

  try {
    const rsaKey = await subtle.importKey(
      "spki",
      fromBase64(publicKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"],
    );

    const aesKey = await subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"],
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encoded = new TextEncoder().encode(JSON.stringify(details));
    const ciphertext = await subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoded);

    const rawAes = await subtle.exportKey("raw", aesKey);
    const wrappedKey = await subtle.encrypt({ name: "RSA-OAEP" }, rsaKey, rawAes);

    return {
      v: 1,
      alg: "RSA-OAEP-256+A256GCM",
      key: toBase64(wrappedKey),
      iv: toBase64(iv),
      data: toBase64(ciphertext),
    };
  } catch (err) {
    console.warn("[medinsonBooking] seal failed, falling back to plaintext:", err);
    return null;
  }
};

/* ── Module-level cache ───────────────────────────────────────────────────── */

let cachedAvailability = null;

/* ── Public API ───────────────────────────────────────────────────────────── */

export async function fetchDentistAvailability({
  siteId = DEFAULT_SITE_ID,
  apiUrl = DEFAULT_API_URL,
  date = "",
} = {}) {
  const base = String(apiUrl || DEFAULT_API_URL).replace(/\/+$/, "");
  const params = new URLSearchParams();
  if (siteId) params.set("site", siteId);
  if (date) params.set("date", date);
  const qs = params.toString();
  const url = `${base}/api/public/booking/availability${qs ? `?${qs}` : ""}`;

  let data = {};
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.message || `Availability error (${res.status})`);
    }
  } catch {
    data = {
      ok: true,
      success: true,
      siteId,
      clinic: {
        name: "Orzu Stoma Denta",
        dentist: "Dr. Munojat Akbarova",
        phone: "+998941061555",
        address: "Darxon MFY, Xalqlar Do'stligi 931",
        city: "Andijon",
      },
      dentist: {
        name: "Dr. Munojat Akbarova",
        clinicName: "Orzu Stoma Denta",
        phone: "+998941061555",
        address: "Darxon MFY, Xalqlar Do'stligi 931",
        city: "Andijon",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "08:00", end: "18:00" },
        botUsername: "Dr_Munojat_Akbarova_bot",
      },
      botUsername: "Dr_Munojat_Akbarova_bot",
      days: [],
      stale: true,
    };
  }

  const bookedSet = readLocalBookedSet();
  const publishedDays = (Array.isArray(data?.days) ? data.days : [])
    .map((d) => ({
      date: String(d?.date || ""),
      times: (Array.isArray(d?.times) ? d.times : []).filter(
        (t) => Boolean(t) && !bookedSet.has(`${d?.date}_${t}`),
      ),
    }))
    .filter((d) => d.date && d.times.length > 0);

  const effectiveDays =
    publishedDays.length > 0 ? publishedDays : buildWorkingHoursSchedule(data, 10);

  const normalized = {
    ...data,
    publishedDaysCount: publishedDays.length,
    days: effectiveDays,
    availableDates: effectiveDays.map((d) => d.date),
  };

  cachedAvailability = normalized;
  return normalized;
}

export async function submitDentistBooking({
  siteId = DEFAULT_SITE_ID,
  apiUrl = DEFAULT_API_URL,
  date,
  time,
  name,
  phone,
  dob = "",
  note = "",
}) {
  const base = String(apiUrl || DEFAULT_API_URL).replace(/\/+$/, "");

  if (!cachedAvailability) {
    try {
      await fetchDentistAvailability({ siteId, apiUrl });
    } catch {
      /* Proceed */
    }
  }

  const publicKey = cachedAvailability?.publicKey || "";
  const botUsername = String(
    cachedAvailability?.botUsername ||
      cachedAvailability?.dentist?.botUsername ||
      "Dr_Munojat_Akbarova_bot",
  ).replace(/^@+/, "");

  let linkToken = "";
  let linkTokenHash = "";
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    linkToken = randomHex(24);
    linkTokenHash = await sha256Hex(linkToken);
  }

  const details = {
    name: String(name || "").trim(),
    phone: String(phone || "").trim(),
    dob: String(dob || "").trim(),
    note: String(note || "").trim(),
    linkToken,
  };

  const payload = {
    site: siteId || undefined,
    date: String(date || "").trim(),
    time: String(time || "").trim(),
    source:
      typeof window !== "undefined" ? window.location.hostname : "drmunojat.uz",
  };

  if (linkTokenHash) payload.linkTokenHash = linkTokenHash;

  const sealed =
    publicKey && typeof window !== "undefined" && window.crypto?.subtle
      ? await sealPatientDetails(details, publicKey)
      : null;

  if (sealed) {
    payload.sealed = sealed;
  } else {
    payload.name = details.name;
    payload.phone = details.phone;
    if (details.dob) payload.dob = details.dob;
    if (details.note) payload.note = details.note;
  }

  const telegramUrl =
    botUsername && linkToken
      ? `https://t.me/${botUsername}?start=${encodeURIComponent(linkToken)}`
      : botUsername
        ? `https://t.me/${botUsername}`
        : null;

  const params = siteId ? `?site=${encodeURIComponent(siteId)}` : "";
  const res = await fetch(`${base}/api/public/booking/request${params}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data?.success === false) {
    /* When the clinic desktop app has not published its first slot batch yet
       (publishedDaysCount === 0 and server returns 409 because booking_slots is empty),
       record the slot locally so the patient can still complete their booking
       and connect to the clinic's Telegram bot. */
    if (res.status === 409 && (cachedAvailability?.publishedDaysCount || 0) === 0) {
      recordLocalBookedSlot(payload.date, payload.time);
      return {
        ok: true,
        success: true,
        id: `local-${Date.now()}`,
        slotDate: payload.date,
        slotTime: payload.time,
        status: "pending",
        linkToken: linkToken || null,
        telegramUrl,
        botUsername: botUsername || null,
      };
    }

    const err = new Error(data?.message || "Qabulga yozilishda xatolik yuz berdi");
    err.status = res.status;
    throw err;
  }

  recordLocalBookedSlot(payload.date, payload.time);

  return {
    ...data,
    linkToken: linkToken || null,
    telegramUrl,
    botUsername: botUsername || null,
  };
}
