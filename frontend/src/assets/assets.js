/*
 * Only images that are actually rendered are imported here. Three AI-generated
 * placeholder "patient" portraits and two portrait copies duplicated from
 * public/ were removed; they shipped ~530 KB on every visit and appeared on no
 * page. The real doctor photos live in public/ and are referenced from there.
 */
import logo from "./logo.png";
import hero3DTooth from "./hero_3d_tooth.webp";
import drMunojatPortrait34 from "./dr_munojat_portrait_34.webp";
import drMunojatStudio from "./dr_munojat_studio.webp";
import drMunojatLoupes from "./dr_munojat_loupes.webp";
import heroSmile from "./hero_smile.webp";
import treatmentImplant from "./treatment_implant.webp";
import treatmentWhitening from "./treatment_whitening.webp";
import clinicRoom from "./clinic_room.webp";
import treatmentSurgery from "./treatment_surgery.webp";

export const assets = {
  logo,
  hero3DTooth,
  drMunojatPortrait34,
  drMunojatStudio,
  drMunojatLoupes,
  heroSmile,
  treatmentImplant,
  treatmentWhitening,
  clinicRoom,
  treatmentSurgery,
};

/** Services offered by Dr. Munojat — matching the clinical specializations */
export const servicesData = [
  {
    id: "implantatsiya",
    slug: "implantatsiya",
    icon: "",
    emoji: "",
    image: treatmentImplant,
    color: "from-red-950 to-red-900",
    borderColor: "border-red-800",
    displayName: {
      uz: "Tish Implantatsiyasi (Ayol Implantolog)",
      ru: "Имплантация Зубов (Женский Имплантолог)",
      en: "Dental Implantation (Female Implantologist)",
    },
    shortDesc: {
      uz: "Andijonda yetakchi ayol implantolog Dr. Munojat Akbarova: Janubiy Koreya biotitan implantlari bilan 100% og'riqsiz davolash.",
      ru: "Ведущий женский имплантолог в Андижане Д-р Мунаджат: титановые импланты из Южной Кореи, надёжно и без боли.",
      en: "Leading female implantologist in Andijan Dr. Munojat: South Korean titanium implants, 100% pain-free treatment.",
    },
    fullDesc: {
      uz: "Implantatsiya — yo'qotilgan tishlarni sun'iy ildiz (implant) yordamida tiklash usuli. Dr. Munojat Akbarova — Koreyada malaka oshirgan yetakchi ayol implantolog va stomatolog-jarroh sifatida, ayollar va qizlar uchun 100% og'riqsiz, maxfiy va xavfsiz sharoitda tishingizni qayta tiklaydi. Natija tabiiy ko'rinish va og'iz faoliyatining to'liq tiklanishi.",
      ru: "Имплантация — метод восстановления утраченных зубов с помощью искусственного корня (импланта). Д-р Мунаджат Акбарова — ведущий женский имплантолог со стажировкой в Южной Корее, безболезненно и деликатно восстановит зубной ряд.",
      en: "Dental implantation is a method of restoring lost teeth using an artificial root (implant). Dr. Munojat Akbarova, leading female implantologist trained in South Korea, provides 100% painless and gentle restoration tailored for women.",
    },
    benefits: {
      uz: ["100% og'riqsiz", "Titan implant", "Uzoq yillar kafolat", "Tabiiy ko'rinish"],
      ru: ["100% без боли", "Титановый имплант", "Гарантия на долгие годы", "Естественный вид"],
      en: ["100% painless", "Titanium implant", "Long-term guarantee", "Natural appearance"],
    },
  },
  {
    id: "tish-davolash",
    slug: "tish-davolash",
    icon: "",
    emoji: "",
    image: clinicRoom,
    color: "from-rose-950 to-rose-900",
    borderColor: "border-rose-800",
    displayName: {
      uz: "Tish Davolash",
      ru: "Лечение Зубов",
      en: "Dental Treatment",
    },
    shortDesc: {
      uz: "Karies, pulpit va boshqa tish kasalliklarini zamonaviy usulda 100% og'riqsiz davolash.",
      ru: "Лечение кариеса, пульпита и других заболеваний зубов — современно и безболезненно.",
      en: "Treatment of caries, pulpitis and other dental diseases — modern and painless.",
    },
    fullDesc: {
      uz: "Terapevtik stomatologiya bo'yicha mutaxassis sifatida Dr. Munojat Akbarova karies va pulpitni eng zamonaviy plombalash materiallari va uskunalar bilan davolaydi. Har bir muolaja 100% og'riqsiz va yuqori sifatli bajariladi.",
      ru: "Как специалист по терапевтической стоматологии, д-р Мунаджат лечит кариес и пульпит с применением современных пломбировочных материалов. Каждая процедура выполняется безболезненно.",
      en: "As a therapeutic dentistry specialist, Dr. Munojat treats caries and pulpitis using the most modern filling materials. Each procedure is performed painlessly.",
    },
    benefits: {
      uz: ["Germaniya, Koreya, Yaponiya, Rossiya plombalari", "Og'riqsiz anesteziya", "Karies profilaktikasi", "Pulpit davolash"],
      ru: ["Пломбы из 4 стран (Германия, Япония, Корея, Россия)", "Безболезненная анестезия", "Профилактика кариеса", "Лечение пульпита"],
      en: ["4 Countries Fillings (Germany, Japan, Korea, Russia)", "Painless anesthesia", "Caries prevention", "Pulpitis treatment"],
    },
  },
  {
    id: "ortopediya",
    slug: "ortopediya",
    icon: "",
    emoji: "",
    image: heroSmile,
    color: "from-red-900 to-red-800",
    borderColor: "border-red-700",
    displayName: {
      uz: "Ortopediya",
      ru: "Ортопедия",
      en: "Prosthodontics",
    },
    shortDesc: {
      uz: "Tish ko'yish va protezlash — keramik qoplamalar, tsirkoniy tojlar va ko'priklar.",
      ru: "Протезирование зубов — керамические коронки, циркониевые протезы и мосты.",
      en: "Dental prosthetics — ceramic crowns, zirconia prosthetics and bridges.",
    },
    fullDesc: {
      uz: "Ortopedik stomatologiya — old va orqa tishlarni Germaniya, Avstraliya hamda Xitoyning mustahkam tsirkoniy va keramik karonkalari yordamida uzoq yillarga mukammal tiklash.",
      ru: "Ортопедическая стоматология — восстановление зубов с помощью керамических виниров, циркониевых коронок и мостов. Д-р Мунаджат использует только высококачественные материалы.",
      en: "Prosthodontics — restoring teeth aesthetically and functionally using ceramic veneers, zirconia crowns and bridges. Dr. Munojat uses only premium materials.",
    },
    benefits: {
      uz: ["Old tish karonkalari", "Orqa tish karonkalari", "Germaniya, Avstraliya, Xitoy", "Uzoq yillik xizmat"],
      ru: ["Коронки на передние зубы", "Коронки на жевательные", "Германия, Австралия, Китай", "На долгие годы"],
      en: ["Front tooth crowns", "Molar chewing crowns", "Germany, Australia, China", "Long-term durability"],
    },
  },
  {
    id: "xirurgiya",
    slug: "xirurgiya",
    icon: "",
    emoji: "",
    image: treatmentSurgery,
    color: "from-red-950 to-rose-950",
    borderColor: "border-red-900",
    displayName: {
      uz: "Xirurgiya",
      ru: "Хирургия",
      en: "Oral Surgery",
    },
    shortDesc: {
      uz: "Tish olish (aql tishi ham) — mikrojirurlik usulida og'riqsiz va tez tiklanish bilan.",
      ru: "Удаление зубов (включая зубы мудрости) — микрохирургически, безболезненно.",
      en: "Tooth extraction (including wisdom teeth) — microsurgically, painlessly.",
    },
    fullDesc: {
      uz: "Stomatologik jarrohlik (tish olish) — og'riqsiz anestezia ostida, zamonaviy mikroxirurgik usullar bilan amalga oshiriladi. Aql tishlari, murakab holatlar ham Dr. Munojat tomonidan xavfsiz va tez hal qilinadi.",
      ru: "Хирургическая стоматология — удаление зубов под безболезненной анестезией с применением микрохирургических методов. Зубы мудрости и сложные случаи решаются быстро и безопасно.",
      en: "Oral surgery — tooth extraction under painless anesthesia using microsurgical methods. Wisdom teeth and complex cases are solved quickly and safely.",
    },
    benefits: {
      uz: ["Aql tishi olish", "Mikroxirurgiya", "Og'riqsiz anestezia", "Tez tiklanish"],
      ru: ["Удаление зуба мудрости", "Микрохирургия", "Безболезненная анестезия", "Быстрое заживление"],
      en: ["Wisdom tooth removal", "Microsurgery", "Painless anesthesia", "Fast recovery"],
    },
  },
  {
    id: "tish-oqartirish",
    slug: "tish-oqartirish",
    icon: "",
    emoji: "",
    image: treatmentWhitening,
    color: "from-rose-900 to-red-900",
    borderColor: "border-rose-700",
    displayName: {
      uz: "Tish Oqartirish",
      ru: "Отбеливание Зубов",
      en: "Teeth Whitening",
    },
    shortDesc: {
      uz: "Tish oqartirish (Zoom) — professional texnologiya bilan bir seansdayoq porloq tabassum.",
      ru: "Отбеливание зубов (Zoom) — профессиональная технология для сияющей улыбки.",
      en: "Teeth whitening (Zoom) — professional technology for a radiant smile in one session.",
    },
    fullDesc: {
      uz: "ZOOM texnologiyasi yordamida professional tish oqartirish — tishlaringizni o'z holatiga nisbatan xavfsiz oqartiradi va yorqin qiladi. Xavfsiz, tez va tabiiy natija.",
      ru: "Профессиональное отбеливание ZOOM — осветляет зубы относительно исходного тона до естественного сияния без вреда для эмали.",
      en: "Professional teeth whitening using ZOOM technology — whitens and brightens teeth safely relative to their natural baseline.",
    },
    benefits: {
      uz: ["ZOOM texnologiyasi", "Tabiiy oqartirish", "1 seans natijasi", "Xavfsiz va tez"],
      ru: ["Технология ZOOM", "Естественное осветление", "Результат за 1 сеанс", "Безопасно и быстро"],
      en: ["ZOOM technology", "Natural brightening", "1-session results", "Safe & fast"],
    },
  },
];
