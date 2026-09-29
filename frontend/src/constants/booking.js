/**
 * booking.js — MedInson URL constants & timeout
 * ==============================================
 * Centralises the two API endpoints so every import stays in sync when the
 * server address or site code changes.
 *
 * The `?site=` query parameter is ALWAYS included.  That single token is what
 * lets the MedInson relay server identify Dr. Munojat's account regardless of
 * whether the page is open on localhost, a Vercel preview branch, or the live
 * drmunojat.uz domain.  Without it, local development would hit a 403 because
 * "localhost" is not a registered clinic domain.
 *
 * Variable names follow the VITE_MEDINSON_* convention used by medinsonBooking.js
 * so both the drop-in client and these constants share the same .env values.
 */

const API_BASE =
  (import.meta.env.VITE_MEDINSON_API_URL || "https://dentist-medinson-license.uz")
    .replace(/\/+$/, "");

/** 10-character site code from the clinic's MedInson app → Settings → Website. */
export const BOOKING_SITE_ID =
  (import.meta.env.VITE_MEDINSON_SITE_ID || "").trim();

/** Human-readable domain kept as a reference; ?site= takes priority everywhere. */
export const BOOKING_DOMAIN =
  (import.meta.env.VITE_MEDINSON_DOMAIN || "drmunojat.uz").trim();

const BOOKING_API = `${API_BASE}/api/public/booking`;

/**
 * Always append `?site=SITE_ID` so the server resolves the correct dentist.
 * Falls back gracefully to no query string when the var is somehow empty,
 * which mirrors the old behaviour on the production domain.
 */
const siteParam = BOOKING_SITE_ID
  ? `?site=${encodeURIComponent(BOOKING_SITE_ID)}`
  : "";

export const availabilityUrl = () => `${BOOKING_API}/availability${siteParam}`;
export const requestUrl      = () => `${BOOKING_API}/request${siteParam}`;

/** How long to wait for the relay server before showing the phone-number fallback. */
export const BOOKING_TIMEOUT_MS = 8000;
