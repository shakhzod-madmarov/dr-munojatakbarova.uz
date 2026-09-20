import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath, localizePath } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import { DOCTOR_INFO } from "../constants/doctor";
import Seo from "../components/Seo";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { useModalA11y } from "../hooks/useModalA11y";
import {
  IconInstagram,
  IconShieldCheck,
  IconPrivacyLock,
  IconSparkleStar,
  IconClock,
  IconPhone,
  IconTelegram,
  IconAward,
  IconCheckCircle,
} from "../components/MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

/* ─── AUTHENTIC CLINICAL DENTAL CASES (MEDICAL TAXONOMY) ───────────── */
const galleryCases = [
  {
    id: 1,
    category: "whitening",
    serviceId: "tish-oqartirish",
    serviceSlug: "tish-oqartirish",
    image: assets.treatmentWhitening,
    badge: { uz: "AQSH Sovuq Nur Texnologiyasi", ru: "Технология Холодного Света (США)", en: "USA Cold Light Technology" },
    tag: { uz: "ZOOM 4 Laser", ru: "ZOOM 4 Лазер", en: "ZOOM 4 Laser" },
    title: {
      uz: "Philips ZOOM® 4 Lazerli Tish Oqartirish (Tabiiy Yorqinlik)",
      ru: "Лазерное отбеливание Philips ZOOM® 4 (Естественный Блеск)",
      en: "Philips ZOOM® 4 Laser Teeth Whitening (Natural Radiant Glow)",
    },
    complaint: {
      uz: "Emalning qorayishi, kofe va choy pigmentlari tufayli tishlarning A3.5 rangigacha sarg'ayishi",
      ru: "Потемнение эмали, стойкий жёлтый оттенок A3.5 от кофе, чая и пищевых красителей",
      en: "Severe enamel discoloration, yellowing up to shade A3.5 due to coffee and tea staining",
    },
    procedure: {
      uz: "Philips ZOOM® 4 sovuq nurli lazerli oqartirish + fosfatli remineralizatsiya himoya geli",
      ru: "Холодное лазерное отбеливание Philips ZOOM® 4 + защитный гель с фосфатом кальция",
      en: "Philips ZOOM® 4 cold-light laser whitening + remineralizing calcium phosphate protective gel",
    },
    duration: { uz: "45 daqiqa (1 seans)", ru: "45 минут (1 сеанс)", en: "45 minutes (1 session)" },
    result: {
      uz: "Emal strukturasi shikastlanmagan holda tabiiy A1 rangiga yetkazildi, 100% og'riqsiz",
      ru: "Безопасное восстановление природного тона A1 без повреждения эмали и без боли",
      en: "Safe restoration to natural A1 shade with zero enamel damage and zero pain",
    },
    doctorNote: {
      uz: "Dr. Munojat Akbarova tomonidan maxsus emal himoyalovchi remineralizatsiya geli bilan o'tkazildi. Muolajadan so'ng 48 soat oq parhez tavsiya etiladi.",
      ru: "Проведено Д-р Мунаджат Акбаровой с нанесением защитного укрепляющего геля. Рекомендована «белая диета» на 48 часов.",
      en: "Performed by Dr. Munojat Akbarova using a protective remineralizing protocol. A 48-hour white diet is recommended post-procedure.",
    },
  },
  {
    id: 2,
    category: "crowns",
    serviceId: "ortopediya",
    serviceSlug: "ortopediya",
    image: assets.heroSmile,
    badge: { uz: "Germaniya Tsirkoniysi", ru: "Немецкий Диоксид Циркония", en: "German Zirconia" },
    tag: { uz: "Gollivud Tabassumi", ru: "Голливудская Улыбка", en: "Hollywood Smile" },
    title: {
      uz: "Old Tishlar Tsirkoniy Karonkalari (Anatomik Simmetriya)",
      ru: "Циркониевые коронки передних зубов (Идеальная Симметрия)",
      en: "Front Teeth Zirconia Crowns (Flawless Anatomical Symmetry)",
    },
    complaint: {
      uz: "Old tishlarning yemirilishi, chetlari sinishi, notekis shakli va rang nomutanosibligi",
      ru: "Сколы режущего края передних зубов, неровная форма и выраженная пигментация",
      en: "Chipped incisal edges, irregular tooth contours, and severe aesthetic shade discrepancy",
    },
    procedure: {
      uz: "Germaniya va Avstraliya tsirkoniy bloklaridan CAD/CAM 3D frezerlash, minimal emal preparatsiyasi",
      ru: "CAD/CAM 3D фрезерование из циркония (Германия/Австралия), минимальное препарирование",
      en: "CAD/CAM 3D milled zirconia (Germany/Australia) with ultra-conservative tooth preparation",
    },
    duration: { uz: "2 bosqich (3 kun)", ru: "2 визита (3 дня)", en: "2 visits (3 days)" },
    result: {
      uz: "Tabiiy tish emalidek shaffoflik, to'liq chaynash mustahkamligi va uzoq yillik estetik kafolat",
      ru: "Естественная полупрозрачность эмали, высокая прочность и долговечная эстетика",
      en: "Natural enamel translucency, superior masticatory strength, and long-term aesthetic stability",
    },
    doctorNote: {
      uz: "Tishlar minimal ishlanib, tirik to'qimalar va nerv maksimal darajada saqlab qolindi.",
      ru: "Минимальная обработка зубов с максимальным сохранением живых тканей и витальности.",
      en: "Microscopic tooth preparation preserving maximum healthy dental structure and pulp vitality.",
    },
  },
  {
    id: 3,
    category: "implants",
    serviceId: "implantatsiya",
    serviceSlug: "implantatsiya",
    image: assets.treatmentImplant,
    badge: { uz: "Janubiy Koreya Biotitan", ru: "Биотитан Южная Корея", en: "South Korea Biotitanium" },
    tag: { uz: "0 Og'riq", ru: "Без Боли", en: "Zero Pain" },
    title: {
      uz: "Yo'qotilgan Chaynash Tishini Biotitan Implant Bilan Tiklash",
      ru: "Восстановление утраченного жевательного зуба титановым имплантом",
      en: "Restoration of Missing Molar with South Korean Biotitanium Implant",
    },
    complaint: {
      uz: "Pastki chaynash tishining erta yo'qotilishi, ovqat chaynash qiyinligi va suyak atrofiyasi xavfi",
      ru: "Утрата нижнего моляра, затруднение пережёвывания пищи и риск атрофии костной ткани",
      en: "Loss of mandibular first molar, compromised mastication, and progressive bone loss risk",
    },
    procedure: {
      uz: "Janubiy Koreya biotitan implantini atravmatik mikroxirurgik o'rnatish + tsirkoniy toj",
      ru: "Атравматичная микрохирургическая установка импланта (Юж. Корея) + циркониевая коронка",
      en: "Atraumatic microsurgical titanium implant placement (South Korea) + customized zirconia crown",
    },
    duration: { uz: "Uzoq yillar xizmat", ru: "На долгие годы", en: "Long-term durability" },
    result: {
      uz: "100% og'riqsiz o'rnatildi, tabiiy tishdek to'liq chaynash kuchi va suyak balandligi tiklandi",
      ru: "100% безболезненно, полностью восстановлена жевательная нагрузка и контур десны",
      en: "100% painless procedure, complete chewing capacity and gingival architecture restored",
    },
    doctorNote: {
      uz: "Koreyada o'rganilgan zamonaviy protokol asosida nozik va to'qimalarga zarar yetkazmagan holda bajarildi.",
      ru: "Выполнено по атравматичному протоколу стажировки в Южной Корее без повреждения смежных тканей.",
      en: "Executed following gentle South Korean clinical training protocols with zero tissue trauma.",
    },
  },
  {
    id: 4,
    category: "restoration",
    serviceId: "tish-davolash",
    serviceSlug: "tish-davolash",
    image: assets.drMunojatLoupes,
    badge: { uz: "Germaniya & Yaponiya Nano-Plombasi", ru: "Нано-Пломбы Германия и Япония", en: "German & Japanese Nano-Fillings" },
    tag: { uz: "Badiiy Restavratsiya", ru: "Художественная Реставрация", en: "Artistic Restoration" },
    title: {
      uz: "Kariesni 4 Davlat Plombalari Bilan Badiiy Qayta Tiklash",
      ru: "Художественная реставрация кариеса нано-композитами 4 стран",
      en: "Artistic Caries Restoration with 4-Country Certified Nano-Composites",
    },
    complaint: {
      uz: "Chuqur karies, emal qorayishi, sovuq-issiqqa o'tkir og'riq va tabassum paytida ko'rinib turishi",
      ru: "Глубокий кариес, потемнение эмали, резкая реакция на температурные раздражители",
      en: "Deep dental caries, dark discoloration, sensitivity to hot and cold, and compromised smile aesthetics",
    },
    procedure: {
      uz: "Optik lupa ostida kariesni yumshoq tozalash, Germaniya va Yaponiya nano-gibrid kompoziti",
      ru: "Лечение под оптическим увеличением, послойная реставрация нано-композитом (Германия/Япония)",
      en: "Gentle caries debridement under optical loupes with layer-by-layer nano-hybrid composite layering",
    },
    duration: { uz: "1 seans (30 daqiqa)", ru: "1 сеанс (30 мин)", en: "1 session (30 mins)" },
    result: {
      uz: "Plomba tish tabiiy anatomiyasiga 100% uyg'unlashib, ko'rinmas estetik monolit hosil qildi",
      ru: "Пломба на 100% повторяет анатомические бугры и микрорельеф зуба, абсолютно незаметна",
      en: "Restoration replicates 100% of natural tooth anatomy, fissures, and shade with invisible margins",
    },
    doctorNote: {
      uz: "Mikroskopik aniqlikda tish nervi tirik saqlab qolindi. Qayta karies paydo bo'lishiga qarshi maxsus polimerizatsiya qilindi.",
      ru: "Зубной нерв сохранён живым. Проведена многоступенчатая полимеризация для предотвращения вторичного кариеса.",
      en: "Dental pulp preserved healthy and vital. Advanced multi-stage curing prevents secondary marginal caries.",
    },
  },
  {
    id: 5,
    category: "clinic",
    serviceId: "korik",
    serviceSlug: "contact",
    image: assets.clinicRoom,
    badge: { uz: "Faqat Ayollar Uchun", ru: "Исключительно Для Женщин", en: "Exclusively for Women" },
    tag: { uz: "Shinam & Maxfiy", ru: "Приватность 100%", en: "100% Private Suite" },
    title: {
      uz: "Andijondagi Shinam, Maxfiy va Steril Ayollar Stomatologiya Kabineti",
      ru: "Уютный, приватный и стерильный стоматологический кабинет для женщин",
      en: "Private, Comfortable, and Sterile Female Dental Suite in Andijan",
    },
    complaint: {
      uz: "Ayollar va qizlar uchun begonalar va erkaklar kirmaydigan, tinch va maxfiy tibbiy sharoit talabi",
      ru: "Потребность пациенток в спокойной обстановке без посторонних мужчин и психологического дискомфорта",
      en: "Need for private, stress-free dental care strictly closed to male visitors and outside spectators",
    },
    procedure: {
      uz: "Alohida yopiq muolaja xonasi, faqat ayol shifokor va hamshiralar guruhi, B-klass avtoklav sterilligi",
      ru: "Отдельный закрытый кабинет, медицинский персонал исключительно женщины, стерилизация класс-B",
      en: "Dedicated enclosed treatment room, all-female dental and nursing staff, Class-B autoclave sterilization",
    },
    duration: { uz: "Yakka tartibda", ru: "Индивидуальный приём", en: "1-on-1 private care" },
    result: {
      uz: "To'liq ruhiy xotirjamlik, nozik muloyim munosabat va Yevropa standartlaridagi gigiyena",
      ru: "Полный психологический комфорт, деликатное обращение и европейские стандарты чистоты",
      en: "Complete psychological comfort, gentle bedside manner, and European hygiene standards",
    },
    doctorNote: {
      uz: "Har bir ayol bemorimiz o'zini eng aziz insonday xotirjam his qilishi bizning oliy qadriyatimizdir.",
      ru: "Для нас первостепенно, чтобы каждая женщина чувствовала себя защищённо, уверенно и спокойно.",
      en: "Ensuring every female patient experiences absolute comfort, safety, and respect is our primary commitment.",
    },
  },
  {
    id: 6,
    category: "clinic",
    serviceId: "xirurgiya",
    serviceSlug: "xirurgiya",
    image: assets.treatmentSurgery,
    badge: { uz: "B-Klass Avtoklav", ru: "Автоклав Класс-B", en: "Class-B Autoclave" },
    tag: { uz: "Atravmatik Xirurgiya", ru: "Атравматично", en: "Atraumatic Microsurgery" },
    title: {
      uz: "Zamonaviy Mikroxirurgiya: Shishsiz va Og'riqsiz Aql Tishlarini Olish",
      ru: "Современная микрохирургия: безболезненное удаление зубов мудрости без отёков",
      en: "Modern Microsurgery: Swelling-Free & Painless Wisdom Tooth Extraction",
    },
    complaint: {
      uz: "Noto'g'ri chiqqan retinirlangan aql tishining qattiq og'rig'i, qo'shni tishni bosishi va milk yallig'lanishi",
      ru: "Острая боль от ретинированного зуба мудрости, давление на соседние корни и воспаление капюшона",
      en: "Acute pain from impacted third molar, pressure on second molar roots, and pericoronal inflammation",
    },
    procedure: {
      uz: "Nozik mikroxirurgik bo'lib olish, zamonaviy karpula anesteziyasi va steril operatsiya protokoli",
      ru: "Атравматичное сегментирование зуба, карпульная анестезия и стерильный хирургический протокол",
      en: "Delicate microsurgical sectioning under premium carpule local anesthesia and strict sterile protocol",
    },
    duration: { uz: "15-20 daqiqa", ru: "15-20 минут", en: "15-20 minutes" },
    result: {
      uz: "Tish 100% og'riqsiz olindi, milk shishisiz va tez bitish jarayoni kafolatlangan",
      ru: "Зуб удален абсолютно без боли, исключён послеоперационный отёк с быстрым заживлением",
      en: "Painless extraction with zero structural alveolar bone damage and rapid recovery",
    },
    doctorNote: {
      uz: "Jag' suyagi va qo'shni tish ildizlari to'liq asrab qolindi. Muolajadan keyin shishni oldini oluvchi davo belgilandi.",
      ru: "Костная ткань челюсти сохранена. Назначена поддерживающая терапия для предупреждения воспаления.",
      en: "Surrounding alveolar bone and neighboring roots fully preserved with anti-inflammatory post-op guidance.",
    },
  },
];

/* ─── SMART CLINICAL FILTERS ───────────────────────────────────────── */
const FILTERS = [
  { key: "all", uz: "Barcha Natijalar", ru: "Все работы", en: "All Cases" },
  { key: "whitening", uz: "ZOOM 4 Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" },
  { key: "crowns", uz: "Tsirkoniy Karonkalar", ru: "Циркониевые Коронки", en: "Zirconia Crowns" },
  { key: "implants", uz: "Titan Implanti", ru: "Имплантация", en: "Implants" },
  { key: "restoration", uz: "Plomba & Davolash", ru: "Пломбы и лечение", en: "Fillings & Care" },
  { key: "clinic", uz: "Klinika & Sharoitlar", ru: "Кабинет и условия", en: "Clinic & Setup" },
];

/* ─── PATIENT FAQ LIST (CLINICAL & PROJECT MANAGER OPTIMIZED) ──────── */
const FAQ_ITEMS = [
  {
    id: "faq-1",
    q: {
      uz: "ZOOM 4 tish oqartirish tish emaliga zarar yetkazmaydimi?",
      ru: "Вредит ли отбеливание зубов Philips ZOOM 4 эмали?",
      en: "Does Philips ZOOM 4 whitening damage tooth enamel?",
    },
    a: {
      uz: "Yo'q, mutlaqo zarar yetkazmaydi. Philips ZOOM® 4 tizimi sovuq LED nuri bilan ishlaydi va emalni qizdirmaydi. Muolajadan so'ng maxsus kaltsiy fosfatli remineralizatsiya geli surtilib, emal yanada mustahkamlanadi.",
      ru: "Нет, абсолютно безвредно. Система Philips ZOOM® 4 использует холодный светодиодный свет без перегрева эмали. После процедуры наносится специальный гель с фосфатом кальция для укрепления структуры зубов.",
      en: "No, it is completely safe. The Philips ZOOM® 4 system utilizes cold LED light that prevents enamel overheating. After treatment, a calcium-phosphate remineralizing gel is applied to fortify tooth enamel.",
    },
  },
  {
    id: "faq-2",
    q: {
      uz: "Tsirkoniy karonkalar necha kunda tayyor bo'ladi va qancha xizmat qiladi?",
      ru: "За сколько дней изготавливаются циркониевые коронки и сколько они служат?",
      en: "How quickly are zirconia crowns made, and how long do they last?",
    },
    a: {
      uz: "Zamonaviy raqamli 3D skanerlash va CAD/CAM texnologiyasi tufayli Germaniya va Avstraliya tsirkoniy tojlari 2-3 kunda tayyor bo'ladi. Ular tabiiy tishdek mustahkam bo'lib, to'g'ri gigiyenik parvarishda uzoq yillar davomida xizmat qiladi.",
      ru: "Благодаря цифровому 3D сканированию и CAD/CAM фрезерованию коронки из Германии и Австралии изготавливаются за 2-3 дня. При регулярной гигиене они сохраняют форму и цвет долгие годы.",
      en: "Thanks to digital 3D scanning and CAD/CAM milling, German and Australian zirconia crowns are completed in 2-3 days. With regular dental hygiene, they deliver aesthetic and functional performance for many years.",
    },
  },
  {
    id: "faq-3",
    q: {
      uz: "Titan tish implanti o'rnatish og'riqlimi?",
      ru: "Больно ли устанавливать титановый зубной имплант?",
      en: "Is placing a titanium dental implant painful?",
    },
    a: {
      uz: "Muolaja zamonaviy anesteziya ostida 100% og'riqsiz o'tkaziladi. Janubiy Koreya biotitan implantatsiyasi nozik mikroxirurgik usulda o'rnatilgani uchun shishsiz va yengil kechadi.",
      ru: "Процедура проводится под современной анестезией на 100% без боли. Биотитановые импланты из Южной Кореи устанавливаются атравматично, что исключает сильный отёк и ускоряет заживление.",
      en: "The procedure is 100% painless under modern carpule local anesthesia. South Korean biotitanium implants are placed with microsurgical precision, preventing severe swelling and enabling rapid healing.",
    },
  },
  {
    id: "faq-4",
    q: {
      uz: "Ayollar va qizlar uchun maxfiylik qanday kafolatlanadi?",
      ru: "Как обеспечивается приватность для женщин и девушек?",
      en: "How is female privacy guaranteed during consultations and treatment?",
    },
    a: {
      uz: "Orzu Stoma Denta klinikasida Dr. Munojat Akbarova qabuli faqat ayollar uchun ajratilgan alohida yopiq kabinetda olib boriladi. Erkaklar va begonalarning kirishi taqiqlangan. Barcha fotosuratlar faqat bemorning yozma roziligi bilan va faqat tabassum hududini ko'rsatgan holda taqdim etiladi.",
      ru: "В клинике Orzu Stoma Denta приём Д-р Мунаджат проходит в закрытом индивидуальном кабинете. Вход посторонних мужчин исключён. Все фотографии публикуются строго по письменному согласию пациенток и только в области улыбки.",
      en: "At Orzu Stoma Denta, Dr. Munojat Akbarova treats patients in a private, closed suite exclusively for women. Male visitors are strictly restricted. Clinical photos are displayed exclusively with written patient consent and focus strictly on the smile area.",
    },
  },
];

const Gallery = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const a11y = getA11yLabels(lang);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const lightboxRef = useModalA11y(Boolean(lightbox), closeLightbox);

  const t = {
    uz: {
      breadcrumbHome: "Bosh sahifa",
      breadcrumbCurrent: "Natijalar",
      tag: "ISHLAR VA NATIJALAR GALEREYASI",
      heading: "Bemorlar Tabassumi & Klinik Natijalar",
      sub: "Andijonda ayollar va qizlar uchun Dr. Munojat Akbarova tomonidan bajarilgan real natijalar: Philips ZOOM 4 oqartirish, Germaniya tsirkoniy karonkalari, Janubiy Koreya biotitan implantlari va 4 davlat nano-plombalari.",
      stat1: "5,000+ Mamnun Bemor",
      stat2: "12 Yillik Klinik Tajriba",
      stat3: "100% Ayollar Maxfiyligi",
      compareHeading: "Interaktiv Oldin va Keyin Taqqoslashi",
      casesHeading: "Dr. Munojat Akbarovaning Amaliy Klinik Ishlari",
      complaintLabel: "Boshlang'ich Holat / Shikoyat:",
      procedureLabel: "Qo'llanilgan Muolaja & Material:",
      durationLabel: "Muolaja Vaqti:",
      resultLabel: "Klinik Natija:",
      doctorLabel: "Shifokor:",
      viewDetails: "Batafsil ma'lumot",
      bookThis: "Qabulga Yozilish",
      consultTg: "Telegramdan Maslahat Olish",
      learnService: "Xizmat haqida to'liq o'qish",
      privacyTitle: "Andijonlik Ayollar va Qizlar Uchun 100% Maxfiylik Kafolati",
      privacyDesc: "Dr. Munojat Akbarova qabulida har bir ayolning shaxsiy daxlsizligi qat'iy himoyalangan. Saytdagi barcha fotosuratlar bemorlarning shaxsiy yozma roziligi bilan va faqat tabassum hududini aks ettirgan holda taqdim etiladi. Erkaklar va begonalarning qabul xonasiga kirishi qat'iyan taqiqlangan.",
      faqHeading: "Bemorlarning Ko'p Beradigan Savollari (FAQ)",
      faqSub: "Klinik natijalar, muolaja vaqti va xavfsizlik borasidagi asosiy savollarga shifokor javoblari.",
      videoTitle: "Jonli Video Sharhlar va Natijalar",
      videoSub: "Dr. Munojat Akbarovaning rasmiy Instagram sahifasida haqiqiy bemorlarning samimiy video-fikrlari va jonli jarayonlarni kuzating.",
      igBtn: "Instagram @dr_munojatakbarova",
      ctaTitle: "Siz Ham Mukammal Tabassumga Ega Bo'lishni Xohlaysizmi?",
      ctaSub: "Hoziroq qabulga yoziling va Dr. Munojat Akbarovaning shaxsiy ko'rigiga navbatsiz tashrif buyuring.",
      ctaCall: "Telefon: +998 (94) 106-15-55",
      ctaBook: "Qabulga Yozilish",
    },
    ru: {
      breadcrumbHome: "Главная",
      breadcrumbCurrent: "Результаты",
      tag: "ГАЛЕРЕЯ РАБОТ И РЕЗУЛЬТАТОВ",
      heading: "Улыбки Пациенток и Клинические Результаты",
      sub: "Документированные клинические результаты для женщин в Андижане: лазерное отбеливание ZOOM 4, немецкие циркониевые коронки, биотитановые импланты и художественные реставрации у Д-р Мунаджат Акбаровой.",
      stat1: "5,000+ Довольных Пациенток",
      stat2: "12 Лет Опыта",
      stat3: "100% Приватность Женщин",
      compareHeading: "Интерактивное сравнение До и После",
      casesHeading: "Клинические Кейсы Д-р Мунаджат Акбаровой",
      complaintLabel: "Исходная ситуация / Жалоба:",
      procedureLabel: "Проведённое лечение и материал:",
      durationLabel: "Время процедуры:",
      resultLabel: "Клинический результат:",
      doctorLabel: "Врач:",
      viewDetails: "Подробнее",
      bookThis: "Записаться на Приём",
      consultTg: "Консультация в Telegram",
      learnService: "Подробнее об услуге",
      privacyTitle: "100% Гарантия Приватности для Женщин в Андижане",
      privacyDesc: "В клинике Д-р Мунаджат Акбаровой личный комфорт каждой пациентки превыше всего. Все фотографии публикуются строго по письменному согласию пациенток и отображают только зону улыбки. Вход посторонних мужчин в кабинет исключён.",
      faqHeading: "Часто Задаваемые Вопросы Пациентов (FAQ)",
      faqSub: "Ответы врача на популярные вопросы о длительности, комфорте и эстетике процедур.",
      videoTitle: "Живые Видео-Отзывы в Instagram",
      videoSub: "Смотрите искренние отзывы пациенток и реальные видео-процессы в официальном Instagram Д-р Мунаджат Акбаровой.",
      igBtn: "Instagram @dr_munojatakbarova",
      ctaTitle: "Обретите Улыбку Своей Мечты Уже Сегодня",
      ctaSub: "Запишитесь на индивидуальный приём к Д-р Мунаджат Акбаровой без очередей в Андижане.",
      ctaCall: "Позвонить: +998 (94) 106-15-55",
      ctaBook: "Записаться на Приём",
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Results",
      tag: "CLINICAL CASES & SMILE GALLERY",
      heading: "Patient Smiles & Documented Results",
      sub: "Verified clinical treatments performed exclusively for women in Andijan: Philips ZOOM 4 whitening, German zirconia crowns, South Korean titanium implants, and artistic restorations by Dr. Munojat Akbarova.",
      stat1: "5,000+ Happy Patients",
      stat2: "12+ Years Clinical Experience",
      stat3: "100% Female Privacy",
      compareHeading: "Interactive Before and After Slider",
      casesHeading: "Clinical Case Studies by Dr. Munojat Akbarova",
      complaintLabel: "Initial Condition / Complaint:",
      procedureLabel: "Treatment Protocol & Material:",
      durationLabel: "Duration:",
      resultLabel: "Clinical Result:",
      doctorLabel: "Dentist:",
      viewDetails: "Case Details",
      bookThis: "Book Appointment",
      consultTg: "Consult via Telegram",
      learnService: "Read Full Service Details",
      privacyTitle: "100% Privacy Guarantee for Women in Andijan",
      privacyDesc: "At Dr. Munojat Akbarova's dental suite, female dignity and confidentiality are strictly safeguarded. All clinical images are presented with patient consent and focus strictly on the smile zone. The suite is strictly closed to male visitors.",
      faqHeading: "Frequently Asked Questions (FAQ)",
      faqSub: "Direct answers from Dr. Munojat regarding procedures, recovery, comfort, and clinical safety.",
      videoTitle: "Live Video Reviews & Cases on Instagram",
      videoSub: "Watch candid patient video reviews and smile makeover journeys on Dr. Munojat Akbarova's official Instagram.",
      igBtn: "Instagram @dr_munojatakbarova",
      ctaTitle: "Achieve Your Dream Radiant Smile Today",
      ctaSub: "Schedule your private consultation with Dr. Munojat Akbarova in Andijan without queues.",
      ctaCall: "Call: +998 (94) 106-15-55",
      ctaBook: "Book Appointment",
    },
  }[lang] || {};

  const filtered = filter === "all" ? galleryCases : galleryCases.filter((g) => g.category === filter);

  const handleBookCase = (serviceId) => {
    if (lightbox) closeLightbox();
    if (onOpenBooking) {
      onOpenBooking(serviceId);
    }
  };

  /* ─── ENRICHED SCHEMA.ORG JSON-LD GRAPH (SEMANTIC SEO) ─────────────── */
  const canonicalUrl = `https://drmunojat.uz${localizePath("/gallery", lang)}`;
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": t.heading,
        "description": t.sub,
        "inLanguage": lang,
        "about": {
          "@type": "Dentist",
          "@id": "https://drmunojat.uz/#dentist",
          "name": DOCTOR_INFO.name,
          "legalName": DOCTOR_INFO.clinicName,
          "telephone": DOCTOR_INFO.phoneRaw,
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": DOCTOR_INFO.city,
            "addressRegion": "Andijon viloyati",
            "addressCountry": "UZ",
          },
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": t.casesHeading,
          "itemListElement": galleryCases.map((c, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
              "@type": "MedicalProcedure",
              "name": c.title[lang],
              "description": c.procedure[lang],
              "image": `https://drmunojat.uz${c.image}`,
              "performer": {
                "@type": "Person",
                "name": DOCTOR_INFO.name,
                "jobTitle": "Stomatolog",
              },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": FAQ_ITEMS.map((faq) => ({
          "@type": "Question",
          "name": faq.q[lang],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a[lang],
          },
        })),
      },
    ],
  };

  return (
    <main className="w-full bg-[#fff8f8] text-slate-900">
      <Seo
        page="gallery"
        path="/gallery"
        schemaJson={schemaJson}
      />

      {/* 1. SEMANTIC HERO HEADER */}
      <header className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#120202] text-white text-center border-b border-red-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs font-semibold text-red-300/80 flex items-center justify-center gap-2">
            <Link to={lp("/")} className="hover:text-amber-300 transition-colors">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-amber-300" aria-current="page">
              {t.breadcrumbCurrent}
            </span>
          </nav>

          <span className="inline-flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full mb-3.5 border border-white/15 backdrop-blur-md">
            <IconSparkleStar className="w-4 h-4 text-amber-300" />
            <span>{t.tag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black mb-3 leading-tight tracking-tight">
            {t.heading}
          </h1>

          <p className="text-red-200/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.sub}
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 backdrop-blur-sm">
              <IconAward className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.stat1}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-200 backdrop-blur-sm">
              <IconCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.stat2}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-200 backdrop-blur-sm">
              <IconPrivacyLock className="w-3.5 h-3.5 text-rose-300" />
              <span>{t.stat3}</span>
            </span>
          </div>

        </div>
      </header>

      {/* 2. INTERACTIVE BEFORE & AFTER SLIDER SHOWCASE */}
      <section aria-label={t.compareHeading}>
        <BeforeAfterSlider onOpenBooking={onOpenBooking} />
      </section>

      {/* 3. CASE STUDIES GRID SECTION */}
      <section aria-labelledby="cases-grid-heading" className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
              <IconShieldCheck className="w-4 h-4 text-[#930b0b]" />
              <span>KLINIK ISHLAR BAZASI</span>
            </span>
            <h2 id="cases-grid-heading" className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 mb-4 tracking-tight">
              {t.casesHeading}
            </h2>

            {/* Accessible ARIA Filter Tablist */}
            <nav
              role="tablist"
              aria-label="Klinik yo'nalishlar bo'yicha filtrlar"
              className="flex flex-wrap items-center justify-center gap-2 mt-4"
            >
              {FILTERS.map((f) => {
                const isSelected = filter === f.key;
                return (
                  <button
                    key={f.key}
                    id={`tab-${f.key}`}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    aria-controls="cases-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#930b0b] text-white shadow-lg scale-105 border border-red-500 font-black ring-2 ring-red-300"
                        : "bg-white text-slate-700 hover:bg-red-50 hover:text-[#930b0b] border border-slate-200 shadow-xs font-bold"
                    }`}
                  >
                    {f[lang]}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Cards Grid Panel */}
          <div
            id="cases-panel"
            role="tabpanel"
            aria-labelledby={`tab-${filter}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filtered.map((item) => (
              <article
                key={item.id}
                aria-labelledby={`case-title-${item.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Semantic Figure with Proper Image Attributes to Prevent CLS */}
                  <figure
                    className="relative aspect-[16/11] overflow-hidden bg-slate-950 cursor-pointer m-0"
                    onClick={() => setLightbox(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      width="640"
                      height="440"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    <figcaption className="sr-only">
                      {item.title[lang]} — Dr. Munojat Akbarova
                    </figcaption>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-slate-950/85 backdrop-blur-md text-amber-300 text-[11px] font-black px-3 py-1 rounded-full border border-white/20 shadow-md">
                        {item.tag[lang]}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                        {item.badge[lang]}
                      </span>
                    </div>

                    {/* Bottom Duration & Hint */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-200">
                        <IconClock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.duration[lang]}</span>
                      </span>
                      <span className="text-[11px] font-bold text-amber-300 group-hover:underline">
                        {t.viewDetails} ↗
                      </span>
                    </div>
                  </figure>

                  {/* Card Content & Clinical Breakdown */}
                  <div className="p-6 space-y-3">
                    <header>
                      <h3
                        id={`case-title-${item.id}`}
                        onClick={() => setLightbox(item)}
                        className="font-black text-base sm:text-lg text-slate-900 group-hover:text-[#930b0b] transition-colors leading-snug cursor-pointer"
                      >
                        {item.title[lang]}
                      </h3>
                    </header>

                    {/* Problem & Solution Snippet */}
                    <dl className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100 m-0">
                      <div>
                        <dt className="text-slate-900 font-bold block mb-0.5">{t.complaintLabel}</dt>
                        <dd className="text-slate-600 leading-relaxed ml-0">{item.complaint[lang]}</dd>
                      </div>
                      <div className="pt-1.5 border-t border-slate-200/60">
                        <dt className="text-emerald-800 font-bold block mb-0.5">{t.procedureLabel}</dt>
                        <dd className="text-slate-600 leading-relaxed ml-0">{item.procedure[lang]}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Card Conversion Actions */}
                <footer className="px-6 pb-6 pt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer active:scale-95"
                  >
                    {t.viewDetails}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBookCase(item.serviceId)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 text-white text-xs font-black shadow-md shadow-red-900/30 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    {t.bookThis}
                  </button>
                </footer>
              </article>
            ))}
          </div>

          {/* 4. FEMALE PRIVACY & ETHICS GUARANTEE BANNER */}
          <section
            aria-labelledby="privacy-banner-heading"
            className="mt-14 sm:mt-16 bg-gradient-to-br from-[#1c0404] via-[#2d0707] to-[#120202] rounded-3xl p-6 sm:p-10 text-white border border-red-900/50 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-2 flex justify-center">
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                  <IconPrivacyLock className="w-8 h-8 sm:w-10 sm:h-10 text-rose-300" />
                </span>
              </div>
              <div className="md:col-span-10 text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <IconShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>AYOLLAR MAXFIYLIGI & TIBBIY ETIKA</span>
                </div>
                <h2 id="privacy-banner-heading" className="text-xl sm:text-2xl font-black text-white">
                  {t.privacyTitle}
                </h2>
                <p className="text-red-200/85 text-xs sm:text-sm leading-relaxed max-w-3xl font-normal">
                  {t.privacyDesc}
                </p>
              </div>
            </div>
          </section>

          {/* 5. CLINICAL FAQ ACCORDION SECTION (GOOGLE SERP RICH SNIPPET ENGINE) */}
          <section aria-labelledby="faq-section-heading" className="mt-14 sm:mt-16">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
                <IconCheckCircle className="w-4 h-4 text-[#930b0b]" />
                <span>SAVOL-JAVOBLAR</span>
              </span>
              <h2 id="faq-section-heading" className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">
                {t.faqHeading}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
                {t.faqSub}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3.5">
              {FAQ_ITEMS.map((faq) => (
                <details
                  key={faq.id}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-300 open:shadow-md open:border-red-200"
                >
                  <summary className="px-6 py-4.5 cursor-pointer font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 select-none group-hover:text-[#930b0b] transition-colors list-none">
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#fd1616] shrink-0" />
                      <span>{faq.q[lang]}</span>
                    </span>
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 group-open:rotate-180 transition-transform duration-200 shrink-0">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                    {faq.a[lang]}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* 6. INSTAGRAM REELS & VIDEO REVIEWS HUB */}
          <section
            aria-labelledby="reels-hub-heading"
            className="mt-12 sm:mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg text-center space-y-4"
          >
            <span className="inline-flex items-center gap-2 text-xs font-black text-pink-600 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200">
              <IconInstagram className="w-4 h-4 text-pink-500" />
              <span>INSTAGRAM JONLI REELS</span>
            </span>
            <h2 id="reels-hub-heading" className="text-xl sm:text-2xl font-black text-slate-900">
              {t.videoTitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {t.videoSub}
            </p>
            <div className="pt-2">
              <a
                href={DOCTOR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-900/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <IconInstagram className="w-4 h-4 text-white" />
                <span>{t.igBtn}</span>
              </a>
            </div>
          </section>

          {/* 7. HIGH-CONVERTING BOTTOM CTA BANNER */}
          <section
            aria-labelledby="cta-banner-heading"
            className="mt-10 sm:mt-12 bg-gradient-to-r from-[#930b0b] to-[#fd1616] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-2xl shadow-red-950/40"
          >
            <h2 id="cta-banner-heading" className="text-2xl sm:text-3xl lg:text-4xl font-black">
              {t.ctaTitle}
            </h2>
            <p className="text-red-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
              {t.ctaSub}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => handleBookCase()}
                className="px-8 py-3.5 rounded-full bg-white text-[#930b0b] font-black text-xs sm:text-sm shadow-lg hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
              >
                {t.ctaBook}
              </button>
              <a
                href={`tel:${DOCTOR_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-red-950/40 border border-white/30 text-white font-bold text-xs sm:text-sm hover:bg-red-950/60 transition-all"
              >
                <IconPhone className="w-4 h-4 text-emerald-300" />
                <span>{t.ctaCall}</span>
              </a>
            </div>
          </section>

        </div>
      </section>

      {/* ─── RICH CLINICAL CASE LIGHTBOX MODAL (A11Y & CONVERSION) ───── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxRef}
            tabIndex={-1}
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 outline-none my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label={a11y.close}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center text-sm font-black hover:bg-[#fd1616] transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Image Area */}
            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              <img
                src={lightbox.image}
                alt={lightbox.title[lang]}
                width="768"
                height="480"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-black px-3.5 py-1 rounded-full border border-white/20 shadow-lg">
                  {lightbox.tag[lang]}
                </span>
                <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {lightbox.badge[lang]}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  Dr. Munojat Akbarova • Orzu Stoma Denta
                </span>
                <h3 id="modal-case-title" className="font-black text-lg sm:text-2xl leading-snug">
                  {lightbox.title[lang]}
                </h3>
              </div>
            </div>

            {/* Modal Structured Clinical Case Breakdown */}
            <div className="p-6 sm:p-8 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    {t.complaintLabel}
                  </span>
                  <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                    {lightbox.complaint[lang]}
                  </p>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                  <span className="text-emerald-800 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    {t.procedureLabel}
                  </span>
                  <p className="text-emerald-950 text-xs sm:text-sm font-medium leading-relaxed">
                    {lightbox.procedure[lang]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    {t.durationLabel}
                  </span>
                  <p className="text-slate-900 text-xs sm:text-sm font-bold">
                    {lightbox.duration[lang]}
                  </p>
                </div>

                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                  <span className="text-amber-900 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    {t.resultLabel}
                  </span>
                  <p className="text-amber-950 text-xs sm:text-sm font-medium leading-relaxed">
                    {lightbox.result[lang]}
                  </p>
                </div>
              </div>

              {/* Doctor's Assessment */}
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-[#930b0b] font-black text-xs">
                  DR
                </span>
                <div>
                  <h4 className="text-xs font-black text-[#930b0b] uppercase tracking-wider">
                    Dr. Munojat Akbarova Xulosasi & Parvarish
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {lightbox.doctorNote[lang]}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Modal (Direct Conversion Paths) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookCase(lightbox.serviceId)}
                  className="w-full sm:flex-1 min-h-[48px] px-6 py-3 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-900/40 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <IconAward className="w-4 h-4 text-amber-300" />
                  <span>{t.bookThis}</span>
                </button>

                <a
                  href={`https://t.me/dr_munojat?text=${encodeURIComponent(`Assalomu alaykum Dr. Munojat! Saytdagi "${lightbox.title[lang]}" natijasi bo'yicha konsultatsiyaga yozilmoqchiman.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 min-h-[48px] px-6 py-3 rounded-full bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <IconTelegram className="w-4 h-4 text-white" />
                  <span>{t.consultTg}</span>
                </a>

                {lightbox.serviceSlug && lightbox.serviceSlug !== "contact" && (
                  <Link
                    to={lp(`/services/${lightbox.serviceSlug}`)}
                    onClick={closeLightbox}
                    className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center"
                  >
                    {t.learnService} →
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
