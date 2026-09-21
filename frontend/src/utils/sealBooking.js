/**
 * SEALING A BOOKING
 * =================
 * Encrypts what the patient typed, in their own browser, so the only machine
 * that can read it is the dentist's computer.
 *
 * The clinic publishes the public half of its key alongside its free times.
 * This seals the details to that key; the licence server in between stores
 * bytes it has no way to open, and deletes them as soon as the clinic's app has
 * collected them. The date and time stay in the clear, because the server has
 * to compare them to stop two people taking the same slot — and a date on its
 * own identifies nobody.
 *
 * The format is shared with the app, which opens these: see
 * `shared/bookingEnvelope.js` in the MedInson repository. If either side
 * changes, bump `v` rather than redefining a field, so an old website and a new
 * app can still tell each other apart.
 */

const ENVELOPE_VERSION = 1;
const ENVELOPE_ALG = "RSA-OAEP-256+A256GCM";

const toBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const fromBase64 = (value) => {
  const binary = atob(String(value));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

/** Whether this browser can seal at all. Old browsers, and any page served over
 *  plain http, have no crypto.subtle — the booking then falls back to sending
 *  the details as before rather than refusing to work. */
export const canSeal = () =>
  typeof window !== "undefined"
  && Boolean(window.crypto?.subtle)
  && typeof window.crypto.getRandomValues === "function";

/** A one-time secret the patient carries to the clinic's Telegram bot. */
export const makeLinkToken = () => {
  const bytes = new Uint8Array(24);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

/**
 * Seal the patient's details to the clinic's public key.
 *
 * A fresh AES key per booking, wrapped with the clinic's RSA key — the payload
 * is longer than RSA alone can carry once somebody writes a sentence about
 * their toothache.
 */
export const sealBookingDetails = async (details, publicKeyBase64) => {
  const subtle = window.crypto.subtle;

  const clinicKey = await subtle.importKey(
    "spki",
    fromBase64(publicKeyBase64),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );

  const aesKey = await subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const data = await subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    new TextEncoder().encode(JSON.stringify(details)),
  );

  const wrappedKey = await subtle.encrypt(
    { name: "RSA-OAEP" },
    clinicKey,
    await subtle.exportKey("raw", aesKey),
  );

  return {
    v: ENVELOPE_VERSION,
    alg: ENVELOPE_ALG,
    key: toBase64(wrappedKey),
    iv: toBase64(iv),
    data: toBase64(data),
  };
};
