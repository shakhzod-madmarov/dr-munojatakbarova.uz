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
      description: `Dr. Munojat Akbarova qabuli: Shabnam ko'chasi, 11, Andijon. Dushanba-Shanba 09:00-18:00. Qabulga yozilish: ${PHONE}`,
    },
    ru: {
      title: "Записаться на приём — Андижан, Д-р Мунаджат",
      description: `Приём Д-р Мунаджат Акбаровой: ул. Шабнам, 11, Андижан. Понедельник-суббота 09:00-18:00. Запись: ${PHONE}`,
    },
    en: {
      title: "Book an Appointment — Dr. Munojat, Andijan",
      description: `Dr. Munojat Akbarova Clinic: 11 Shabnam St, Andijan. Monday to Saturday, 09:00-18:00. Phone: ${PHONE}`,
    },
  },

  booking: {
    uz: {
      title: "Uchrashuv Vaqtini Tanlang — Dr. Munojat Akbarova, Andijon",
      description: `Dr. Munojat Akbarova qabuliga onlayn yozilish: Shabnam 11, Andijon. Bo'sh kunlar va soatlarni tanlang. ${PHONE}`,
    },
    ru: {
      title: "Выберите Время Приёма — Д-р Мунаджат Акбарова, Андижан",
      description: `Онлайн запись к Д-р Мунаджат Акбаровой: ул. Шабнам, 11, Андижан. Выберите свободный день и время приёма. ${PHONE}`,
    },
    en: {
      title: "Select Appointment Time — Dr. Munojat Akbarova, Andijan",
      description: `Direct online appointment booking with Dr. Munojat Akbarova: 11 Shabnam St, Andijan. Choose an available date and time slot. ${PHONE}`,
    },
  },

  feedback: {
    uz: {
      title: "Baho Berish va Fikr Qoldirish — Dr. Munojat Akbarova",
      description: `Dr. Munojat Akbarova qabuli bo'yicha o'z fikringiz va bahoingizni qoldiring. Google va Yandex Xaritalarda xolis sharhlar. ${PHONE}`,
    },
    ru: {
      title: "Оставить Отзыв и Оценку — Д-р Мунаджат Акбарова",
      description: `Оставьте ваш честный отзыв и оценку приёма Д-р Мунаджат Акбаровой. Оценки на Яндекс Картах и Google Maps. ${PHONE}`,
    },
    en: {
      title: "Rate & Leave a Review — Dr. Munojat Akbarova",
      description: `Leave your genuine review and rating for Dr. Munojat Akbarova in Andijan. Verified patient reviews on Google and Yandex Maps. ${PHONE}`,
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
  // Global defaults across languages
  uz: "andijonda stomatologiya, andijonda stomatolog, andijon stomatologlari, andijon tish klinikasi, stomatologiya markazi andijon, ayol stomatolog Andijon, tish og'rig'i, tish qattiq og'riyapti, tish og'rig'ini qoldirish, tish davolash Andijon, 4 davlat plombalari, plomba tushib qolsa, old tish sinishi, tsirkoniy karonka, Janubiy Koreya biotitan implantatsiya, Philips ZOOM 4 tish oqartirish, aql tishi og'riyapti, donolik tishi olish, milk qonashi va shishi, Dr. Munojat Akbarova, Shabnam 11, аёл стоматолог Андижон, тиш оғриғи, тиш даволаш, тиш клиникаси",
  ru: "стоматология андижан, стоматологи андижана, клиники стоматологии андижан, стоматолог в андижане, женский стоматолог Андижан, болит зуб что делать, острая зубная боль, как снять зубную боль, лечение зубов Андижан, пломбы 4 стран, выпала пломба, сломался зуб, циркониевые коронки, имплантация зубов корея, болит зуб мудрости, удаление зуба мудрости, отбеливание зубов zoom 4, Мунаджат Акбарова, ул Шабнам 11, клиника стоматологии андижан",
  en: "dentistry in andijan, dentist in andijan, dental clinic andijan, female dentist Andijan, toothache relief andijan, severe tooth pain, how to stop tooth pain, dental implants Andijan, 4 countries certified fillings, lost filling, broken tooth repair, zirconia crowns, teeth whitening zoom 4, wisdom tooth pain, Dr Munojat Akbarova, 11 Shabnam St",

  // Page-specific keyword matrices
  home: {
    uz: "andijonda stomatologiya, andijonda stomatolog, andijon stomatologlari, andijon stomatologiya klinikalari, ayol stomatolog andijon, dr munojat akbarova stomatologiya markazi, tish og'rig'i, tish qattiq og'riyapti, tish og'rig'ini qoldirish, tish nervi og'rishi, tish davolash andijon, 4 davlat plombalari, plomba tushib qolsa, old tish sinishi, tsirkoniy karonka, tsirkoniy karonka metallokeramika farqi, titan implantatsiya, implantatsiya bitish vaqti, karies va pulpit farqi, nervni ogriqsiz olish, zoom 4 tish oqartirish, aql tishi og'riyapti, donolik tishi olish, milk qonashi va shishi, homiladorlikda tish og'rig'i, ogriqsiz tish davolash, shabnam kochasi 11, osh stomatologiya andijon, dental tourism andijan, аёл стоматолог андижон, тиш даволаш андижон, тиш оғриғини қолдириш, стоматология маркази",
    ru: "стоматология андижан, стоматологи андижана, клиники стоматологии андижан, женский стоматолог андижан, женщина стоматолог, д-р мунаджат акбарова, болит зуб что делать, острая зубная боль, как снять зубную боль быстро, лечение зубов андижан, пломбы из 4 стран, выпала пломба, сломался передний зуб, циркониевые коронки, циркониевые коронки или металлокерамика, имплантация зубов южная корея, сколько приживается имплант, как отличить кариес от пульпита, удаление нерва без боли, отбеливание зубов zoom 4, болит зуб мудрости, удаление зуба мудрости без боли, кровоточат десны, лечение зубов при беременности, ул шабнам 11, лечение зубов ош андижан",
    en: "dentistry in andijan, dentist andijan, dental clinics andijan, female dentist andijan, dr munojat akbarova dental clinic, toothache relief andijan, severe tooth pain, how to stop toothache fast, dental treatment andijan, certified dental fillings, lost filling repair, chipped tooth repair, zirconia dental crowns, zirconia vs metal ceramic crowns, titanium implants south korea, dental implant healing time, cavity vs pulpitis, painless root canal, zoom 4 teeth whitening, wisdom tooth pain, painless wisdom tooth extraction, emergency dentist andijan, 11 shabnam st andijan, dental tourism andijan uzbekistan",
  },

  services: {
    uz: "stomatologiya xizmatlari andijon, tish davolash narxlari andijon, plomba qoyish narxi andijon, tish implantatsiyasi narxi andijon, tsirkoniy karonka narxi, tish qo'ydirish narxi, tish oqartirish narxlari, aql tishi oldirish narxi, tish nervini olish narxi, tish toshlarini tozalash airflow narxi, homilador ayollar tish davolash narxi, profilaktik stomatologiya, stomatologik diagnostika, xizmatlar va narxlar stomatologiya, хизматлар ва нархлар стоматология андижон",
    ru: "услуги стоматологии в андижане, цены на лечение зубов андижан, сколько стоит пломба в андижане, цены на имплантацию зубов андижан, стоимость циркониевых коронок, сколько стоит вставить зуб, удаление зуба мудрости цена, отбеливание зубов цены андижан, чистка зубов от камня цена, удаление нерва зуба цена, прайс лист стоматологии",
    en: "dental services andijan, dental treatment prices andijan, tooth filling cost andijan, dental implant cost andijan, zirconia crown prices, teeth whitening cost andijan, wisdom tooth removal cost, root canal cost andijan, dental cleaning cost, dental procedure catalog andijan",
  },

  about: {
    uz: "dr munojat akbarova, munojat akbarova stomatolog, andijondagi eng yaxshi ayol stomatolog, ayol tish doktori andijon, tdsi buxoro stomatologiya, adti magistratura, koreyada implantologiya malakasi seul, eng yaxshi ayol stomatologi 2025 mukofoti, oliy toifali ayol implantolog, 12 yillik tajriba, og'riqsiz tish davolash, tish davolatishdan qo'rqadiganlar uchun stomatolog, д-р мунаджат акбарова биография",
    ru: "д-р мунаджат акбарова, мунаджат акбарова стоматолог, биография женского стоматолога андижан, высшая категория, тгси бухара, агми магистратура, стажировка по имплантологии сеул южная корея, лучший женский стоматолог 2025 года, 12 лет опыта, стоматолог без страха и боли",
    en: "dr munojat akbarova, female dentist credentials andijan, tsdi bukhara, asmi andijan master degree, south korea dental implant training seoul, best female dentist 2025 award winner, 12 years clinical experience, gentle pain-free dentist for anxious patients",
  },

  gallery: {
    uz: "tish davolash natijalari andijon, tabassum galereyasi dr munojat, singan tishni tiklash oldin va keyin, tsirkoniy karonka oldin va keyin, zoom 4 oqartirish natijalari, biotitan implant natijalari, tish davolash suratlari, фото до и после лечение зубов андижан, smile gallery dental results andijan",
    ru: "результаты лечения зубов андижан, фото до и после стоматология, восстановление сломанного зуба фото, циркониевые коронки до и после, отбеливание zoom 4 результаты, имплантация фото кейсов, клинические случаи д-р мунаджат, before after dental cases andijan",
    en: "dental treatment results andijan, before and after dental cases, broken tooth restoration before after, zirconia crowns results, zoom 4 whitening results, dental implant cases, smile makeover gallery andijan",
  },

  contact: {
    uz: "dr munojat akbarova manzili, shabnam kochasi 11 andijon, stomatologiya telefon raqami andijon, tish shifokori bilan boglanish, qabul kunlari va ish vaqti, shoshilinch tish og'rig'ida qabul, lokatsiya stomatologiya andijon, контакты стоматологии андижан, dentist location andijan",
    ru: "адрес клиники д-р мунаджат, ул шабнам 11 андижан, телефон стоматолога андижан, записаться к стоматологу, время работы стоматологии, прием при острой боли, стоматология на карте андижана, dentist contact phone andijan",
    en: "dr munojat akbarova clinic address, 11 shabnam street andijan, dental clinic phone number andijan, dentist working hours, emergency toothache visit, contact female dentist andijan",
  },

  booking: {
    uz: "stomatolog qabuliga yozilish andijon, onlayn navbat stomatologiya, tish davolashga band qilish, dr munojat qabuli vaqtlari, shoshilinch tish ogriqi qabul, tish og'riganda navbat olish, запись к стоматологу андижан онлайн, book dentist appointment andijan",
    ru: "онлайн запись к стоматологу андижан, выбрать время приёма стоматология, запись на имплантацию и лечение зубов, срочный прием при зубной боли, д-р мунаджат прием, book dental appointment andijan online",
    en: "online dental booking andijan, book dentist appointment andijan, dental visit schedule, reserve dental treatment slot dr munojat, emergency dental booking",
  },

  feedback: {
    uz: "dr munojat akbarova fikrlar, stomatologiya sharhlari andijon, bemorlar bahosi, tish davolatganlar fikri, og'riqsiz davolash baholari, yandex xaritalar fikrlar stomatolog, google xaritalar baho, отзывы о стоматологе андижан, patient reviews dentist andijan",
    ru: "отзывы д-р мунаджат акбарова, отзывы о стоматологии в андижане, оценки пациентов, отзывы о лечении зубов без боли, яндекс карты отзывы стоматолог, google maps отзывы, genuine patient reviews andijan dentist",
    en: "dr munojat akbarova patient reviews, dentist ratings andijan, dental clinic google yandex reviews, verified feedback female dentist andijan, painless dentistry reviews",
  },
};

export const getPageSeo = (page, lang) => {
  const entry = PAGE_SEO[page];
  if (!entry) return null;
  return entry[lang] || entry.uz;
};
