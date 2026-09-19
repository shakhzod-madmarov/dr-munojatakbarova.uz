/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CENTRAL DOCTOR PROFILE & DYNAMIC CLINICAL EXPERIENCE CONSTANTS
 * Single source of truth for Dr. Munojat Akbarova's verified credentials.
 * Automatically computes clinical years of experience dynamically each year.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const DOCTOR_INFO = {
  name: "Dr. Munojat Akbarova",
  givenName: "Munojat",
  familyName: "Akbarova",
  careerStartYear: 2014,
  awardYear: 2025,
  awardTitle: {
    uz: "Eng Yaxshi Ayol Stomatologi – 2025",
    ru: "Лучший Женский Стоматолог – 2025",
    en: "Best Female Dentist of 2025",
  },
  awardReelUrl: "https://www.instagram.com/reel/DO_U1fijfO8/",
  phone: "+998 (94) 106-15-55",
  phoneRaw: "+998941061555",
  telegram: "https://t.me/dr_munojat",
  telegramHandle: "@dr_munojat",
  instagram: "https://www.instagram.com/dr_munojatakbarova/",
  yandexMaps: "https://yandex.uz/maps/-/CTT8VGNR",
  googleMaps: "https://www.google.com/maps/search/?api=1&query=40.754205,72.358426",
  coordinates: {
    lat: 40.754205,
    lng: 72.358426,
  },
  clinicName: "Orzu Stoma Denta",
  city: "Andijon",
};

/**
 * Returns dynamic years of clinical practice based on the current year.
 * In 2026: 2026 - 2014 = 12 years.
 * In 2027: 2027 - 2014 = 13 years, etc.
 */
export const getYearsOfExperience = () => {
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - DOCTOR_INFO.careerStartYear);
};

export const YEARS_OF_EXPERIENCE = getYearsOfExperience();

/**
 * Russian grammar declension helper for years:
 * 1 год, 2-4 года, 5-20 лет, 21 год, 22-24 года, 25-30 лет, etc.
 */
export const getRussianYearsWord = (years) => {
  const mod10 = years % 10;
  const mod100 = years % 100;
  if (mod100 >= 11 && mod100 <= 14) return "лет";
  if (mod10 === 1) return "год";
  if (mod10 >= 2 && mod10 <= 4) return "года";
  return "лет";
};

export const getRussianYearsAdjective = (years) => {
  return `${years}-летней`;
};

/**
 * Localized short experience string:
 * - uz: "12 yillik tajriba"
 * - ru: "12 лет опыта"
 * - en: "12+ years experience"
 */
export const getExperienceText = (lang = "uz") => {
  const y = getYearsOfExperience();
  switch (lang) {
    case "ru":
      return `${y} ${getRussianYearsWord(y)} опыта`;
    case "en":
      return `${y}+ years experience`;
    case "uz":
    default:
      return `${y} yillik tajriba`;
  }
};

/**
 * Localized trust badge with career start year (2014):
 * - uz: "12 Yillik Tajriba (2014-yildan)"
 * - ru: "12 Лет Опыта (с 2014 г.)"
 * - en: "12+ Years Experience (Since 2014)"
 */
export const getExperienceBadge = (lang = "uz") => {
  const y = getYearsOfExperience();
  const start = DOCTOR_INFO.careerStartYear;
  switch (lang) {
    case "ru":
      return `${y} ${getRussianYearsWord(y)} опыта (с ${start} г.)`;
    case "en":
      return `${y}+ Years Experience (Since ${start})`;
    case "uz":
    default:
      return `${y} Yillik Tajriba (${start}-yildan)`;
  }
};

/**
 * Localized hero tag:
 */
export const getHeroTag = (lang = "uz") => {
  const y = getYearsOfExperience();
  switch (lang) {
    case "ru":
      return `АНДИЖАН · ${y} ${getRussianYearsWord(y).toUpperCase()} ОПЫТА · 100% БЕЗ БОЛИ`;
    case "en":
      return `ANDIJAN · ${y}+ YRS EXP · 100% PAIN-FREE`;
    case "uz":
    default:
      return `ANDIJON · ${y} YILLIK TAJRIBA · 100% OG'RIQSIZ`;
  }
};

/**
 * Localized services header tag:
 */
export const getServicesTag = (lang = "uz") => {
  const y = getYearsOfExperience();
  switch (lang) {
    case "ru":
      return `${y} ${getRussianYearsWord(y).toUpperCase()} ОПЫТА · СТАЖИРОВКА В КОРЕЕ · АНДИЖАН`;
    case "en":
      return `${y}+ YEARS EXP · SOUTH KOREA TRAINED · ANDIJAN`;
    case "uz":
    default:
      return `${y} YILLIK TAJRIBA · KOREYA MALAKASI · ANDIJON`;
  }
};

/**
 * Clinic opening hours - the one definition the whole site reads from.
 *
 * These used to be retyped in nine places and had drifted apart: the JSON-LD in
 * index.html claimed Sat 09:00-15:00 while every visible string said 18:00, and
 * Sunday was "closed" in llms.txt but "by appointment" on the map. Confirmed
 * correct: Monday-Saturday 09:00-18:00, closed Sunday.
 */
export const OPENING_HOURS = {
  /* Drives schema.org openingHoursSpecification. Sunday is absent, which is how
     schema.org expresses "closed". */
  spec: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  /* Short form, for compact spots like the footer. */
  display: {
    uz: "Dushanba – Shanba: 09:00 – 18:00",
    ru: "Понедельник – Суббота: 09:00 – 18:00",
    en: "Monday – Saturday: 09:00 – 18:00",
  },
  /* Long form, where there is room to say what happens on Sunday. */
  withSunday: {
    uz: "Dushanba – Shanba: 09:00 – 18:00 (Yakshanba: dam olish kuni)",
    ru: "Понедельник – Суббота: 09:00 – 18:00 (Воскресенье: выходной)",
    en: "Monday – Saturday: 09:00 – 18:00 (Sunday: closed)",
  },
};
