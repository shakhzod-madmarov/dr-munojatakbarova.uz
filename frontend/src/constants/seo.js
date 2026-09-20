import { DOCTOR_INFO } from "./doctor";

/**
 * Per-page, per-language SEO copy.
 *
 * Two problems this solves. Every title was a single hardcoded Uzbek string of
 * 74-98 characters, so all ten truncated in results and the keyword that
 * matters was cut off. And the Russian and English copy lived only in
 * localStorage, so neither was ever indexable - which for a clinic in
 * Uzbekistan means the whole Russian-language side of Google and Yandex was
 * unreachable.
 *
 * Titles are kept at or under ~60 characters with the search term first, not
 * the brand: someone types "ayol stomatolog Andijon", not "Dr. Munojat".
 * Descriptions sit near 150-160 characters and end with a reason to click.
 */

const PHONE = DOCTOR_INFO.phone;

export const PAGE_SEO = {
  home: {
    uz: {
      title: "Andijonda Ayol Stomatolog — Dr. Munojat Akbarova",
      description: `Andijondagi oliy toifali ayol stomatolog. Implantatsiya, plomba, karonka va ZOOM oqartirish. Ayollar uchun maxfiy va og'riqsiz qabul. ${PHONE}`,
    },
    ru: {
      title: "Женский стоматолог в Андижане — Д-р Мунаджат",
      description: `Женский стоматолог высшей категории в Андижане. Имплантация, пломбы, коронки и отбеливание ZOOM. Приватный и безболезненный приём. ${PHONE}`,
    },
    en: {
      title: "Female Dentist in Andijan — Dr. Munojat Akbarova",
      description: `Leading female dentist in Andijan, Uzbekistan. Implants, fillings, crowns and ZOOM whitening. Private, painless care for women. ${PHONE}`,
    },
  },

  services: {
    uz: {
      title: "Stomatologiya Xizmatlari Andijon — Dr. Munojat",
      description: `Tish davolash, 4 davlat plombalari, old va orqa karonkalar, implantatsiya va ZOOM oqartirish. Andijonda ayol shifokor qabuli. ${PHONE}`,
    },
    ru: {
      title: "Стоматологические услуги в Андижане — Д-р Мунаджат",
      description: `Лечение зубов, пломбы, коронки, имплантация и отбеливание ZOOM в Андижане. Приём ведёт женщина-стоматолог. ${PHONE}`,
    },
    en: {
      title: "Dental Services in Andijan — Dr. Munojat Akbarova",
      description: `Treatment, certified fillings, crowns, implants and ZOOM whitening in Andijan. Seen by a female dentist, start to finish. ${PHONE}`,
    },
  },

  about: {
    uz: {
      title: "Dr. Munojat Akbarova — Stomatolog, 12 Yil Tajriba",
      description: "Andijonlik ayol stomatolog Dr. Munojat Akbarova: TDSI va ADTI bitiruvchisi, Koreyada implantologiya malakasi, 2025-yil g'olibi.",
    },
    ru: {
      title: "Д-р Мунаджат Акбарова — стоматолог, 12 лет опыта",
      description: "Женщина-стоматолог в Андижане: выпускница ТГСИ и АГМИ, стажировка по имплантологии в Корее, победитель номинации 2025 года.",
    },
    en: {
      title: "About Dr. Munojat Akbarova — Dentist in Andijan",
      description: "Female dentist in Andijan: trained at TSDI and ASMI, advanced implantology training in South Korea, 2025 award winner.",
    },
  },

  gallery: {
    uz: {
      title: "Klinik Natijalar & Tabassum Galereyasi — Dr. Munojat Akbarova, Andijon",
      description: "Dr. Munojat Akbarovaning klinik natijalari: Philips ZOOM 4 oqartirish, Germaniya tsirkoniy karonkalari, Janubiy Koreya biotitan implantlari va badiiy restavratsiya.",
    },
    ru: {
      title: "Клинические Результаты & Галерея Улыбок — Д-р Мунаджат, Андижан",
      description: "Реальные клинические кейсы Д-р Мунаджат Акбаровой: отбеливание ZOOM 4, циркониевые коронки, титановые импланты и эстетическое восстановление зубов.",
    },
    en: {
      title: "Clinical Results & Smile Gallery — Dr. Munojat Akbarova, Andijan",
      description: "Documented clinical cases by Dr. Munojat Akbarova in Andijan: Philips ZOOM 4 whitening, German zirconia crowns, titanium implants, and artistic restorations.",
    },
  },

  contact: {
    uz: {
      title: "Qabulga Yozilish — Dr. Munojat Akbarova, Andijon",
      description: `Orzu Stoma Denta klinikasi, Andijon shahri. Dushanba-Shanba 09:00-18:00. Telefon yoki Telegram orqali yoziling: ${PHONE}`,
    },
    ru: {
      title: "Записаться на приём — Андижан, Д-р Мунаджат",
      description: `Клиника Orzu Stoma Denta, город Андижан. Понедельник-суббота 09:00-18:00. Запись по телефону или в Telegram: ${PHONE}`,
    },
    en: {
      title: "Book an Appointment — Dr. Munojat, Andijan",
      description: `Orzu Stoma Denta clinic, Andijan. Monday to Saturday, 09:00-18:00. Book by phone or on Telegram: ${PHONE}`,
    },
  },

  notFound: {
    uz: { title: "Sahifa topilmadi (404) — Dr. Munojat Akbarova",
          description: "Bu sahifa mavjud emas. Dr. Munojat Akbarova — Andijondagi ayol stomatolog." },
    ru: { title: "Страница не найдена (404) — Д-р Мунаджат",
          description: "Такой страницы нет. Д-р Мунаджат Акбарова — женский стоматолог в Андижане." },
    en: { title: "Page not found (404) — Dr. Munojat Akbarova",
          description: "This page does not exist. Dr. Munojat Akbarova, female dentist in Andijan." },
  },
};

/* Trimmed hard. The old tag carried 68 terms over 1,970 characters: Google has
   ignored this tag for years and Yandex treats stuffing as a quality signal
   against you. What remains is only what the page is genuinely about. */
export const PAGE_KEYWORDS = {
  uz: "ayol stomatolog Andijon, tish davolash Andijon, implantatsiya Andijon, tish karonkasi, tish oqartirish, Dr. Munojat Akbarova",
  ru: "женский стоматолог Андижан, лечение зубов Андижан, имплантация зубов, коронки на зубы, отбеливание зубов, Мунаджат Акбарова",
  en: "female dentist Andijan, dentist Uzbekistan, dental implants Andijan, dental crowns, teeth whitening, Dr Munojat Akbarova",
};

export const getPageSeo = (page, lang) => {
  const entry = PAGE_SEO[page];
  if (!entry) return null;
  return entry[lang] || entry.uz;
};
