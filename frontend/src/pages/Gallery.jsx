import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { assets } from "../assets/assets";
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

/* ─── REAL CLINICAL CASE STUDIES WITH MEDICAL DETAILS ───────────────── */
const galleryCases = [
  {
    id: 1,
    category: "whitening",
    serviceId: "oqartirish",
    serviceSlug: "tish-oqartirish",
    image: assets.treatmentWhitening,
    badge: { uz: "AQSH Texnologiyasi", ru: "Технология США", en: "USA Technology" },
    tag: { uz: "ZOOM 4 Laser", ru: "ZOOM 4 Лазер", en: "ZOOM 4 Laser" },
    title: {
      uz: "ZOOM 4 Laser Tish Oqartirish (Tabiiy Yorqinlik)",
      ru: "Лазерное отбеливание ZOOM 4 (Естественный блеск)",
      en: "ZOOM 4 Laser Teeth Whitening (Natural Radiant Glow)",
    },
    complaint: {
      uz: "Emalning qorayishi, qahva va choy tufayli sarg'aygan tishlar",
      ru: "Потемнение эмали, стойкий жёлтый оттенок от кофе и чая",
      en: "Enamel discoloration, persistent tea and coffee staining",
    },
    procedure: {
      uz: "Philips ZOOM® 4 sovuq nurli lazerli oqartirish (1 seans 45 daqiqa)",
      ru: "Холодное лазерное отбеливание Philips ZOOM® 4 (1 сеанс 45 мин)",
      en: "Philips ZOOM® 4 cold-light laser whitening (1 session 45 mins)",
    },
    duration: { uz: "45 daqiqa (1 seans)", ru: "45 минут (1 сеанс)", en: "45 minutes (1 session)" },
    result: {
      uz: "Emal xavfsiz holatda o'z tabiiy yorqin oqligiga qaytarildi, 100% og'riqsiz",
      ru: "Безопасное восстановление естественной белизны без повреждения эмали",
      en: "Safe restoration of natural brightness without enamel damage, zero pain",
    },
    doctorNote: {
      uz: "Dr. Munojat Akbarova tomonidan maxsus emal himoyalovchi remineralizatsiya geli bilan o'tkazildi.",
      ru: "Проведено Д-р Мунаджат Акбаровой с нанесением защитного укрепляющего геля.",
      en: "Performed by Dr. Munojat Akbarova using protective remineralizing gel.",
    },
  },
  {
    id: 2,
    category: "crowns",
    serviceId: "ortopediya",
    serviceSlug: "ortopediya",
    image: assets.heroSmile,
    badge: { uz: "Germaniya Tsirkoniysi", ru: "Немецкий Цирконий", en: "German Zirconia" },
    tag: { uz: "Gollivud Tabassumi", ru: "Голливудская Улыбка", en: "Hollywood Smile" },
    title: {
      uz: "Old Tishlar Tsirkoniy Karonkalari (Mukammal Simmetriya)",
      ru: "Циркониевые коронки передних зубов (Идеальная симметрия)",
      en: "Front Teeth Zirconia Crowns (Flawless Symmetry)",
    },
    complaint: {
      uz: "Old tishlarning sinishi, notekis shakli va rang nomutanosibligi",
      ru: "Сколы передних зубов, неровная форма и неравномерный цвет",
      en: "Chipped front teeth, uneven shape and shade discrepancy",
    },
    procedure: {
      uz: "Germaniya va Avstraliya tsirkoniy karonkalari, mikroskopik aniqlik",
      ru: "Коронки из диоксида циркония (Германия/Австралия) с микроскопической точностью",
      en: "Zirconia crowns (Germany/Australia) engineered with microscopic precision",
    },
    duration: { uz: "2 bosqich", ru: "2 визита", en: "2 visits" },
    result: {
      uz: "To'liq tabiiy shaffoflik, mustahkam chaynash va uzoq yillik estetik kafolat",
      ru: "Натуральная прозрачность, прочность и долговечная эстетика",
      en: "Completely natural translucency, high durability and lasting aesthetics",
    },
    doctorNote: {
      uz: "Tishlar minimal ishlanib, tirik to'qimalar maksimal darajada saqlab qolindi.",
      ru: "Минимальная обработка зубов с максимальным сохранением живых тканей.",
      en: "Minimal tooth preparation preserving maximum healthy biological tissue.",
    },
  },
  {
    id: 3,
    category: "implants",
    serviceId: "implantatsiya",
    serviceSlug: "implantatsiya",
    image: assets.treatmentImplant,
    badge: { uz: "Janubiy Koreya Biotitan", ru: "Биотитан Юж. Корея", en: "South Korea Biotitanium" },
    tag: { uz: "0 Og'riq", ru: "Без Боли", en: "Painless" },
    title: {
      uz: "Yo'qotilgan Tishni Titan Implant Bilan Tiklash",
      ru: "Восстановление утраченного зуба титановым имплантом",
      en: "Restoration of Lost Tooth with Titanium Implant",
    },
    complaint: {
      uz: "Pastki chaynash tishining yo'qligi va qo'shni tishlarning siljishi xavfi",
      ru: "Отсутствие жевательного зуба и угроза смещения зубного ряда",
      en: "Missing molar tooth with risk of dental arch shifting",
    },
    procedure: {
      uz: "Janubiy Koreya biotitan implanti o'rnatish + tsirkoniy toj bilan yakunlash",
      ru: "Установка биотитанового импланта (Южная Корея) + циркониевая коронка",
      en: "South Korean biotitanium implant placement + customized zirconia crown",
    },
    duration: { uz: "Uzoq yillar xizmat", ru: "На долгие годы", en: "Long-term durability" },
    result: {
      uz: "100% og'riqsiz o'rnatildi, tabiiy tishdek to'liq chaynash quvvati tiklandi",
      ru: "100% безболезненно, восстановлена полноценная жевательная функция",
      en: "100% pain-free procedure, full natural chewing capacity restored",
    },
    doctorNote: {
      uz: "Koreyada o'rganilgan zamonaviy protokol asosida nozik va travmasiz bajarildi.",
      ru: "Выполнено по атравматичному протоколу стажировки в Южной Корее.",
      en: "Executed following gentle atraumatic South Korean clinical protocols.",
    },
  },
  {
    id: 4,
    category: "restoration",
    serviceId: "tish-davolash",
    serviceSlug: "tish-davolash",
    image: assets.drMunojatLoupes,
    badge: { uz: "Germaniya & Yaponiya", ru: "Германия и Япония", en: "Germany & Japan" },
    tag: { uz: "Badiiy Restavratsiya", ru: "Реставрация", en: "Artistic Restoration" },
    title: {
      uz: "Kariesni 4 Davlat Plombalari Bilan Badiiy Qayta Tiklash",
      ru: "Художественная реставрация кариеса нано-пломбами",
      en: "Artistic Caries Restoration with 4-Country Fillings",
    },
    complaint: {
      uz: "Chuqur karies, tish emalining yorilishi va sovuq-issiqqa sezuvchanlik",
      ru: "Глубокий кариес, трещины эмали и чувствительность к холодному/горячему",
      en: "Deep caries, cracked enamel and sensitivity to hot and cold",
    },
    procedure: {
      uz: "Optik lupa ostida kariesni tozalash, Germaniya/Yaponiya nano-plombasi",
      ru: "Лечение под оптическим увеличением, нано-композит (Германия/Япония)",
      en: "Treatment under high optical loupes with German/Japanese nano-composites",
    },
    duration: { uz: "1 seans (30 daqiqa)", ru: "1 сеанс (30 мин)", en: "1 session (30 mins)" },
    result: {
      uz: "Plomba tish to'qimasiga 100% uyg'unlashib, ko'rinmas estetik shaklga kirdi",
      ru: "Пломба на 100% повторяет анатомию и цвет зуба, абсолютно незаметна",
      en: "Invisible restoration matching 100% of natural tooth anatomy and shade",
    },
    doctorNote: {
      uz: "Mikroskopik aniqlikda nerv shikastlanmagan holda og'riqsiz davolandi.",
      ru: "Безболезненное лечение с сохранением нерва зуба под увеличением.",
      en: "Painless treatment preserving vital nerve tissue with microscopic precision.",
    },
  },
  {
    id: 5,
    category: "clinic",
    serviceId: "korik",
    serviceSlug: "contact",
    image: assets.clinicRoom,
    badge: { uz: "100% Ayollar Uchun", ru: "100% Для Женщин", en: "100% Women Suite" },
    tag: { uz: "Shinam & Maxfiy", ru: "Приватно", en: "Private & Comfortable" },
    title: {
      uz: "Andijondagi Shinam va Maxfiy Ayollar Stomatologiya Kabineti",
      ru: "Уютный и приватный кабинет для женщин в Андижане",
      en: "Private, Gentle and Comfortable Dental Suite for Women in Andijan",
    },
    complaint: {
      uz: "Ayollar va qizlar uchun begonalar kirmaydigan xavfsiz va shinam muhit",
      ru: "Потребность в спокойной обстановке без посторонних мужчин и очередей",
      en: "Demand for private, peaceful dental care free from strangers and queues",
    },
    procedure: {
      uz: "Alohida yopiq qabul xonasi, faqat ayol shifokor va hamshiralar",
      ru: "Отдельный закрытый кабинет, персонал состоит исключительно из женщин",
      en: "Dedicated private room with all-female medical and nursing staff",
    },
    duration: { uz: "Yakka tartibda", ru: "Индивидуально", en: "1-on-1 private care" },
    result: {
      uz: "To'liq ruhiy xotirjamlik, nozik muloyim munosabat va Yevropa qulayligi",
      ru: "Полный психологический комфорт, деликатный подход и европейский уют",
      en: "Total peace of mind, delicate female approach and European clinical comfort",
    },
    doctorNote: {
      uz: "Har bir bemorimiz o'zini eng aziz mehmonday his qilishi biz uchun eng muhim.",
      ru: "Для нас важно, чтобы каждая пациентка чувствовала себя уверенно и комфортно.",
      en: "Ensuring every patient feels completely respected and comfortable is our priority.",
    },
  },
  {
    id: 6,
    category: "clinic",
    serviceId: "xirurgiya",
    serviceSlug: "xirurgiya",
    image: assets.treatmentSurgery,
    badge: { uz: "B-Klass Sterillik", ru: "Стерильность B-Class", en: "B-Class Sterility" },
    tag: { uz: "Atravmatik Xirurgiya", ru: "Атравматично", en: "Atraumatic Surgery" },
    title: {
      uz: "Zamonaviy Mikroxirurgiya va Shishsiz Aql Tishlarini Olish",
      ru: "Современная микрохирургия и бережное удаление зубов мудрости",
      en: "Modern Microsurgery & Gentle Wisdom Tooth Extraction",
    },
    complaint: {
      uz: "Noto'g'ri chiqqan aql tishining qattiq og'rig'i va milk yallig'lanishi",
      ru: "Острая боль от неправильно растущего зуба мудрости и воспаление десны",
      en: "Severe pain and gum inflammation from an impacted wisdom tooth",
    },
    procedure: {
      uz: "Nozik mikroxirurgik bo'lib olish, zamonaviy anesteziya va steril operatsiya",
      ru: "Атравматичное сегментирование зуба, современная анестезия и стерильность",
      en: "Delicate microsurgical sectioning under premium local anesthesia",
    },
    duration: { uz: "15 daqiqa", ru: "15 минут", en: "15 minutes" },
    result: {
      uz: "Tish 100% og'riqsiz olindi, milk shishisiz va tez bitish kafolati",
      ru: "Зуб удален без боли, без тяжелого отека с быстрым заживлением",
      en: "Completely painless extraction with rapid, swelling-free healing",
    },
    doctorNote: {
      uz: "Tish atrofidagi suyak to'qimasi saqlab qolinib, milk travmasiz bitkazildi.",
      ru: "Костная ткань сохранена, лунка заживает быстро и без осложнений.",
      en: "Bone tissue fully preserved, enabling swift complication-free recovery.",
    },
  },
];

const FILTERS = [
  { key: "all", uz: "Barcha Natijalar", ru: "Все работы", en: "All Cases" },
  { key: "whitening", uz: "ZOOM 4 Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" },
  { key: "crowns", uz: "Tsirkoniy Karonkalar", ru: "Циркониевые Коронки", en: "Zirconia Crowns" },
  { key: "implants", uz: "Titan Implanti", ru: "Имплантация", en: "Implants" },
  { key: "restoration", uz: "Plomba & Davolash", ru: "Пломбы и лечение", en: "Fillings & Care" },
  { key: "clinic", uz: "Klinika & Sharoitlar", ru: "Кабинет и условия", en: "Clinic & Setup" },
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
      tag: "ISHLAR VA NATIJALAR GALEREYASI",
      heading: "Bemorlar Tabassumi & Klinik Natijalar",
      sub: "Andijonda ayollar va qizlar uchun Dr. Munojat Akbarova tomonidan bajarilgan real natijalar, tish oqartirish, tsirkoniy karonkalar va og'riqsiz implantatsiya ishlari.",
      stat1: "5,000+ Muvaffaqiyatli Muolaja",
      stat2: "12 Yillik Klinik Tajriba",
      stat3: "100% Ayollar Maxfiyligi",
      complaintLabel: "Boshlang'ich Holat / Shikoyat:",
      procedureLabel: "Qo'llanilgan Muolaja & Material:",
      durationLabel: "Vaqt:",
      resultLabel: "Klinik Natija:",
      doctorLabel: "Shifokor:",
      viewDetails: "Batafsil ma'lumot",
      bookThis: "Qabulga Yozilish",
      consultTg: "Telegramdan Maslahat Olish",
      learnService: "Xizmat haqida to'liq o'qish",
      privacyTitle: "Andijonlik Ayollar va Qizlar Uchun 100% Maxfiylik Kafolati",
      privacyDesc: "Dr. Munojat Akbarova qabulida har bir ayolning shaxsiy daxlsizligi qat'iy himoyalangan. Saytdagi klinik fotosuratlar bemorlarning shaxsiy yozma roziligi bilan va faqat tabassum hududini aks ettirgan holda taqdim etiladi. Erkaklar va begonalarning qabul xonasiga kirishi taqiqlangan.",
      videoTitle: "Jonli Video Sharhlar va Natijalar",
      videoSub: "Dr. Munojat Akbarovaning rasmiy Instagram sahifasida haqiqiy bemorlarning samimiy video-fikrlari va jonli jarayonlarni kuzating.",
      igBtn: "Instagram @dr_munojatakbarova",
      ctaTitle: "Siz Ham O'zingiz Orzu Qilgan Tabassumga Ega Bo'ling",
      ctaSub: "Hoziroq qabulga yoziling va Dr. Munojat Akbarovaning shaxsiy ko'rigiga navbatsiz tashrif buyuring.",
      ctaCall: "Qo'ng'iroq Qilish: +998 (94) 106-15-55",
      ctaBook: "Qabulga Yozilish",
    },
    ru: {
      tag: "ГАЛЕРЕЯ РАБОТ И РЕЗУЛЬТАТОВ",
      heading: "Улыбки Пациенток и Результаты",
      sub: "Реальные клинические результаты процедур для женщин в Андижане: лазерное отбеливание, циркониевые коронки, пломбы и имплантация у Д-р Мунаджат Акбаровой.",
      stat1: "5,000+ Довольных Пациенток",
      stat2: "12 Лет Опыта",
      stat3: "100% Приватность Женщин",
      complaintLabel: "Исходная ситуация / Жалоба:",
      procedureLabel: "Проведённое лечение и материал:",
      durationLabel: "Время:",
      resultLabel: "Клинический результат:",
      doctorLabel: "Врач:",
      viewDetails: "Подробнее",
      bookThis: "Записаться на Приём",
      consultTg: "Консультация в Telegram",
      learnService: "Подробнее об услуге",
      privacyTitle: "100% Гарантия Приватности для Женщин в Андижане",
      privacyDesc: "В клинике Д-р Мунаджат Акбаровой личный комфорт каждой пациентки превыше всего. Все фотографии публикуются строго с согласия пациенток и отображают только зону улыбки. Вход посторонних мужчин в кабинет исключён.",
      videoTitle: "Живые Видео-Отзывы в Instagram",
      videoSub: "Смотрите искренние отзывы пациенток и реальные видео-процессы в официальном Instagram Д-р Мунаджат Акбаровой.",
      igBtn: "Instagram @dr_munojatakbarova",
      ctaTitle: "Обретите Улыбку Своей Мечты Уже Сегодня",
      ctaSub: "Запишитесь на индивидуальный приём к Д-р Мунаджат Акбаровой без очередей.",
      ctaCall: "Позвонить: +998 (94) 106-15-55",
      ctaBook: "Записаться на Приём",
    },
    en: {
      tag: "CLINICAL CASES & SMILE GALLERY",
      heading: "Patient Smiles & Clinical Results",
      sub: "Authentic clinical treatments performed exclusively for women in Andijan: laser teeth whitening, zirconia crowns, implants, and painless restorations by Dr. Munojat Akbarova.",
      stat1: "5,000+ Happy Patients",
      stat2: "12+ Years Clinical Experience",
      stat3: "100% Female Privacy",
      complaintLabel: "Initial Condition / Complaint:",
      procedureLabel: "Treatment & Material:",
      durationLabel: "Duration:",
      resultLabel: "Clinical Result:",
      doctorLabel: "Dentist:",
      viewDetails: "Case Details",
      bookThis: "Book Appointment",
      consultTg: "Consult via Telegram",
      learnService: "Learn about this service",
      privacyTitle: "100% Privacy Guarantee for Women in Andijan",
      privacyDesc: "At Dr. Munojat Akbarova's dental suite, female dignity and privacy are strictly safeguarded. All clinical images are presented with patient consent and focus exclusively on the smile zone. The suite is strictly closed to outside male visitors.",
      videoTitle: "Live Video Reviews & Cases on Instagram",
      videoSub: "Watch candid patient video reviews and smile makeover journeys on Dr. Munojat Akbarova's official Instagram.",
      igBtn: "Instagram @dr_munojatakbarova",
      ctaTitle: "Achieve Your Dream Radiant Smile Today",
      ctaSub: "Schedule your private consultation with Dr. Munojat Akbarova in Andijan without waiting.",
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

  return (
    <div className="bg-[#fff8f8]">
      <Seo
        page="gallery"
        path="/gallery"
      />

      {/* 1. HERO HEADER */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#120202] text-white text-center border-b border-red-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full mb-3 border border-white/15 backdrop-blur-md">
            <IconSparkleStar className="w-4 h-4 text-amber-300" />
            <span>{t.tag}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-3 leading-tight tracking-tight">
            {t.heading}
          </h1>
          <p className="text-red-200/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.sub}
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-amber-200">
              <IconAward className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.stat1}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-200">
              <IconCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.stat2}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-rose-200">
              <IconPrivacyLock className="w-3.5 h-3.5 text-rose-300" />
              <span>{t.stat3}</span>
            </span>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE BEFORE & AFTER SLIDER SHOWCASE */}
      <BeforeAfterSlider onOpenBooking={onOpenBooking} />

      {/* 3. CASE STUDIES GRID SECTION */}
      <section className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Filter Navigation */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
              <IconShieldCheck className="w-4 h-4 text-[#930b0b]" />
              <span>KLINIK ISHLAR BAZASI</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 mb-4">
              {lang === "uz" ? "Dr. Munojat Akbarovaning Amaliy Natijalari" :
               lang === "ru" ? "Практические результаты Д-р Мунаджат Акбаровой" :
               "Clinical Case Studies by Dr. Munojat Akbarova"}
            </h2>

            {/* Smart Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filter === f.key
                      ? "bg-[#930b0b] text-white shadow-lg scale-105 border border-red-500 font-black"
                      : "bg-white text-slate-700 hover:bg-red-50 hover:text-[#930b0b] border border-slate-200 shadow-xs"
                  }`}
                >
                  {f[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image Area */}
                  <div
                    className="relative aspect-[16/11] overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => setLightbox(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-black px-3 py-1 rounded-full border border-white/20 shadow-md">
                        {item.tag[lang]}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                        {item.badge[lang]}
                      </span>
                    </div>

                    {/* Bottom Duration / Inspection hint */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-200">
                        <IconClock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.duration[lang]}</span>
                      </span>
                      <span className="text-[11px] font-bold text-amber-300 group-hover:underline">
                        {t.viewDetails} ↗
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3
                      onClick={() => setLightbox(item)}
                      className="font-black text-base sm:text-lg text-slate-900 group-hover:text-[#930b0b] transition-colors leading-snug cursor-pointer"
                    >
                      {item.title[lang]}
                    </h3>

                    {/* Problem & Solution Snippet */}
                    <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <p className="text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 font-bold block mb-0.5">{t.complaintLabel}</strong>
                        {item.complaint[lang]}
                      </p>
                      <p className="text-slate-600 leading-relaxed pt-1.5 border-t border-slate-200/60">
                        <strong className="text-emerald-800 font-bold block mb-0.5">{t.procedureLabel}</strong>
                        {item.procedure[lang]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer"
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
                </div>
              </article>
            ))}
          </div>

          {/* 4. FEMALE PRIVACY & ETHICS GUARANTEE BANNER */}
          <div className="mt-14 sm:mt-16 bg-gradient-to-br from-[#1c0404] via-[#2d0707] to-[#120202] rounded-3xl p-6 sm:p-10 text-white border border-red-900/50 shadow-2xl">
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
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {t.privacyTitle}
                </h3>
                <p className="text-red-200/80 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  {t.privacyDesc}
                </p>
              </div>
            </div>
          </div>

          {/* 5. INSTAGRAM REELS & VIDEO REVIEWS HUB */}
          <div className="mt-10 sm:mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg text-center space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-black text-pink-600 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200">
              <IconInstagram className="w-4 h-4 text-pink-500" />
              <span>INSTAGRAM JONLI REELS</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.videoTitle}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {t.videoSub}
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/dr_munojatakbarova/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-900/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <IconInstagram className="w-4 h-4 text-white" />
                <span>{t.igBtn}</span>
              </a>
            </div>
          </div>

          {/* 6. BOTTOM CONSULTATION CTA SECTION */}
          <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#930b0b] to-[#fd1616] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-2xl shadow-red-950/40">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black">
              {t.ctaTitle}
            </h3>
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
                href="tel:+998941061555"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-red-950/40 border border-white/30 text-white font-bold text-xs sm:text-sm hover:bg-red-950/60 transition-all"
              >
                <IconPhone className="w-4 h-4 text-emerald-300" />
                <span>{t.ctaCall}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─── RICH CLINICAL CASE LIGHTBOX MODAL ───────────────────────── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title[lang]}
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
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
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
                <h3 className="font-black text-lg sm:text-2xl leading-snug">
                  {lightbox.title[lang]}
                </h3>
              </div>
            </div>

            {/* Modal Detailed Case Breakdown */}
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
                    Dr. Munojat Akbarova Xulosasi
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {lightbox.doctorNote[lang]}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Modal */}
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
                  href={`https://t.me/dr_munojat?text=${encodeURIComponent(`Assalomu alaykum Dr. Munojat! Saytdagi "${lightbox.title[lang]}" natijasi bo'yicha konsultatsiya olmoqchiman.`)}`}
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
    </div>
  );
};

export default Gallery;
