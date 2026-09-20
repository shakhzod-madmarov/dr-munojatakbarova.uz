import { DOCTOR_INFO, OPENING_HOURS } from "./doctor";

/**
 * Every clinic Dr. Munojat practises at.
 *
 * She works across more than one clinic, in more than one city. The site
 * previously asserted a single MedicalBusiness with one address and one geo
 * point, which is both factually wrong and invalid as structured data:
 * schema.org allows one `address` per entity, so several locations must be
 * several entities, each linked back to her Person entity.
 *
 * She is the stable thing people search for; clinics are places she works. So
 * the Person carries the reputation and each clinic carries its own NAP (name,
 * address, phone), hours and coordinates.
 *
 * ADDING A CLINIC: append an object here. The location page, its schema, the
 * sitemap and the prerender list are all generated from this array - nothing
 * else needs editing. Every field marked REQUIRED must be real; a guessed
 * address or coordinate is worse than no location page, because search engines
 * cross-check it against maps data and lose trust in all of them.
 */

export const CLINICS = [
  {
    /* REQUIRED. Used in the URL: /clinics/<slug> */
    slug: "orzu-stoma-denta",
    /* REQUIRED. The clinic's own registered name, exactly as on its signage
       and its own Google/Yandex listing - consistency is what links them. */
    name: "Orzu Stoma Denta",
    /* Marks the location used for site-wide defaults and the Organization
       entity. Exactly one clinic should be primary. */
    primary: true,

    city: { uz: "Andijon", ru: "Андижан", en: "Andijan" },
    region: { uz: "Andijon viloyati", ru: "Андижанская область", en: "Andijan Region" },
    country: "UZ",

    /* REQUIRED and currently INCOMPLETE: this needs the actual street address.
       "Andijon shahri" alone is not a postal address and will not match a map
       listing. */
    street: { uz: "", ru: "", en: "" },
    postalCode: "",

    /* REQUIRED. Verified against the clinic's real map pin, not approximated. */
    geo: { lat: 40.754205, lng: 72.358426 },

    telephone: DOCTOR_INFO.phoneRaw,
    telephoneDisplay: DOCTOR_INFO.phone,

    /* Hours AT THIS CLINIC. She splits her week between locations, so these
       differ per clinic and must not be copied from the site-wide default. */
    hours: OPENING_HOURS.spec,
    hoursDisplay: OPENING_HOURS.display,

    maps: {
      yandex: DOCTOR_INFO.yandexMaps,
      google: DOCTOR_INFO.googleMaps,
    },

    /* Which of her services are actually offered here. Slugs from
       detailedSpecialties. An empty array means "all". */
    services: [],

    /* Is she the only dentist at this location? This decides how Google
       Business Profile should be set up: at a clinic where she is the sole
       practitioner, a separate listing in her name is a duplicate and risks
       suspension - the clinic's own listing should carry her instead. */
    soleDentist: false,

    /* One or two sentences unique to this location. Do not reuse across
       clinics: duplicated location pages compete with each other and none of
       them rank. */
    intro: {
      uz: "Andijon shahridagi Orzu Stoma Denta klinikasida Dr. Munojat Akbarova ayollar va qizlar uchun alohida, to'liq maxfiy xonada qabul qiladi.",
      ru: "В клинике Orzu Stoma Denta в Андижане приём ведёт д-р Мунаджат Акбарова — отдельный приватный кабинет для женщин и девушек.",
      en: "At the Orzu Stoma Denta clinic in Andijan, Dr. Munojat Akbarova sees patients in a private, women-only treatment room.",
    },
  },
];

export const PRIMARY_CLINIC = CLINICS.find((c) => c.primary) || CLINICS[0];

export const getClinic = (slug) => CLINICS.find((c) => c.slug === slug) || null;

/** Every city she practises in, for country-level targeting copy. */
export const servedCities = (lang = "uz") => CLINICS.map((c) => c.city[lang] || c.city.uz);

/** A clinic is only safe to publish once it has a real address and pin. */
export const isPublishable = (clinic) =>
  Boolean(clinic.slug && clinic.name && clinic.geo?.lat && clinic.geo?.lng && (clinic.street?.uz || clinic.postalCode));
