/**
 * Online booking.
 *
 * This site asks the MedInson licence server which times the dentist is free,
 * and sends the patient's choice back to it. The dentist's own app publishes
 * those times and pulls the request in, so what is offered here is what their
 * calendar actually has free.
 *
 * Connecting another dentist's website costs one value in the MedInson admin
 * portal - their account's custom domain - and nothing here: the server works
 * out whose website is asking from the browser's own Origin header.
 */

const PRODUCTION_API = "https://dentist-medinson-license.uz/api/public/booking";

/* VITE_BOOKING_API points the site at a licence server running locally, which
   is how the booking flow is exercised end to end without touching live data. */
export const BOOKING_API = import.meta.env.VITE_BOOKING_API || PRODUCTION_API;

/** The domain registered on the MedInson account. Used only in development. */
export const BOOKING_DOMAIN = "drmunojat.uz";

/* Vite serves the site from localhost while developing, and localhost is not
   anybody's clinic, so the domain is named explicitly there. In production the
   browser sends the real Origin and this is never used. */
const devQuery = import.meta.env.DEV ? `?domain=${encodeURIComponent(BOOKING_DOMAIN)}` : "";

export const availabilityUrl = () => `${BOOKING_API}/availability${devQuery}`;
export const requestUrl = () => `${BOOKING_API}/request${devQuery}`;

/** How long to wait on the server before offering the phone number instead. */
export const BOOKING_TIMEOUT_MS = 8000;
