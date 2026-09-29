/**
 * medinsonBooking.js
 * ==================
 * Drop-in API client for the MedInson Stomatolog Relay Server.
 *
 * Handles:
 *  - Fetching live availability + dentist profile (Endpoint A)
 *  - E2E browser-side encryption of patient PII via RSA-OAEP + AES-GCM
 *  - Generating linkToken / linkTokenHash for Telegram bot pairing
 *  - Submitting the booking request (Endpoint B)
 *  - Returning a Telegram deep-link the patient uses to enable reminders
 *
 * The server stores zero plaintext PII when a publicKey is present:
 * only the date, time, and an opaque ciphertext are ever written to disk.
 */

/* ── Config (reads Vite env; falls back so the module works in plain Node) ── */

const DEFAULT_API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_API_URL) ||
  "https://dentist-medinson-license.uz";

const DEFAULT_SITE_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDINSON_SITE_ID) ||
  "";

/* ── Internal helpers ─────────────────────────────────────────────────────── */

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

/**
 * Seal patient details with the clinic's RSA-2048 OAEP public key.
 *
 * Hybrid encryption: fresh AES-256-GCM key per booking (the payload can be
 * hundreds of bytes — a note about a toothache — so RSA alone would not fit),
 * the AES key itself wrapped with RSA-OAEP.
 *
 * Returns null when publicKeyBase64 is absent or crypto.subtle is unavailable,
 * so the caller can fall back to sending plaintext instead of refusing to book.
 */
const sealPatientDetails = async (details, publicKeyBase64) => {
  const subtle = window.crypto?.subtle;
  if (!subtle || !publicKeyBase64) return null;

  try {
    /* 1. Import the clinic's RSA public key (base64-encoded SPKI) */
    const rsaKey = await subtle.importKey(
      "spki",
      fromBase64(publicKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"],
    );

    /* 2. Generate a fresh AES-256-GCM key + random 12-byte IV */
    const aesKey = await subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"],
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    /* 3. Encrypt the JSON payload with AES-GCM */
    const encoded = new TextEncoder().encode(JSON.stringify(details));
    const ciphertext = await subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoded);

    /* 4. Wrap (encrypt) the raw AES key with RSA-OAEP */
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

/** Last successful availability response — used by submitDentistBooking to
 *  pick up the publicKey without a second round-trip. Cleared on a new fetch. */
let cachedAvailability = null;

/* ── Public API ───────────────────────────────────────────────────────────── */

/**
 * Fetch live availability and dentist/clinic profile from MedInson.
 *
 * Always passes `?site=SITE_ID` so the server resolves the exact dentist
 * regardless of the current hostname (localhost, Vercel preview, or production).
 *
 * @param {object} [opts]
 * @param {string} [opts.siteId]  Override VITE_MEDINSON_SITE_ID
 * @param {string} [opts.apiUrl]  Override VITE_MEDINSON_API_URL
 * @param {string} [opts.date]    Optional YYYY-MM-DD to limit the response
 * @returns {Promise<object>}     Full availability response (see spec §2, Endpoint A)
 * @throws  {Error}               On non-2xx HTTP or JSON parse failure
 */
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

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || `Availability error (${res.status})`);
  }

  cachedAvailability = data;
  return data;
}

/**
 * Submit a booking request to MedInson with E2E-encrypted patient details.
 *
 * Automatically uses the publicKey from the last `fetchDentistAvailability`
 * call to seal PII in the browser. If no public key is available (older clinic
 * app) or WebCrypto is unavailable, falls back to sending details as plaintext.
 *
 * @param {object} opts
 * @param {string} opts.date      Appointment date YYYY-MM-DD
 * @param {string} opts.time      Appointment time HH:mm
 * @param {string} opts.name      Patient full name (2–120 chars, required)
 * @param {string} opts.phone     Patient phone +998… (required)
 * @param {string} [opts.dob]     Patient date of birth YYYY-MM-DD (optional)
 * @param {string} [opts.note]    Note / complaint (0–500 chars, optional)
 * @param {string} [opts.siteId]  Override VITE_MEDINSON_SITE_ID
 * @param {string} [opts.apiUrl]  Override VITE_MEDINSON_API_URL
 *
 * @returns {Promise<{success, id, date, time, message, linkToken, telegramUrl, botUsername}>}
 * @throws  {Error}  err.status === 409 → slot taken; 429 → rate limited; else general
 */
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

  /* Ensure we have a publicKey. Re-fetch only if the cache is cold. */
  if (!cachedAvailability) {
    try {
      await fetchDentistAvailability({ siteId, apiUrl });
    } catch {
      /* Proceed without encryption — better a plaintext booking than none. */
    }
  }

  const publicKey = cachedAvailability?.publicKey || "";
  const botUsername = String(cachedAvailability?.botUsername || "").replace(/^@+/, "");

  /* One-time Telegram link token — ties this booking to the patient's bot session */
  let linkToken = "";
  let linkTokenHash = "";
  if (window.crypto?.subtle) {
    linkToken = randomHex(24); // 48-char hex
    linkTokenHash = await sha256Hex(linkToken); // 64-char hex
  }

  const details = {
    name: String(name || "").trim(),
    phone: String(phone || "").trim(),
    dob: String(dob || "").trim(),
    note: String(note || "").trim(),
    linkToken,
  };

  /* Base payload — PII goes in `sealed` when possible, plaintext as fallback */
  const payload = {
    site: siteId || undefined,
    date: String(date || "").trim(),
    time: String(time || "").trim(),
    source:
      typeof window !== "undefined" ? window.location.hostname : "drmunojat.uz",
  };

  if (linkTokenHash) payload.linkTokenHash = linkTokenHash;

  const sealed = publicKey && window.crypto?.subtle
    ? await sealPatientDetails(details, publicKey)
    : null;

  if (sealed) {
    /* E2E encrypted — server stores zero plaintext PII */
    payload.sealed = sealed;
  } else {
    /* Plaintext fallback (old clinic app or no WebCrypto) */
    payload.name = details.name;
    payload.phone = details.phone;
    if (details.dob) payload.dob = details.dob;
    if (details.note) payload.note = details.note;
  }

  const params = siteId ? `?site=${encodeURIComponent(siteId)}` : "";
  const res = await fetch(`${base}/api/public/booking/request${params}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data?.success === false) {
    const err = new Error(data?.message || "Qabulga yozilishda xatolik yuz berdi");
    err.status = res.status;
    throw err;
  }

  /* Deep-link into the clinic's Telegram bot, pre-seeded with the linkToken.
   * The patient taps START in the bot and reminders are then sent automatically. */
  const telegramUrl =
    botUsername && linkToken
      ? `https://t.me/${botUsername}?start=${encodeURIComponent(linkToken)}`
      : null;

  return {
    ...data,
    linkToken: linkToken || null,
    telegramUrl,
    botUsername: botUsername || null,
  };
}
