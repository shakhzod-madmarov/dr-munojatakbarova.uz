import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  DentalToothMolar,
  DentalVeneerCrown,
  DentalImplantFixture,
  DentalWhiteningZoom,
  DentalSurgeryExtraction,
  IconCheckCircle,
  IconShieldCheck,
  IconSparkleStar,
} from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const treatments = [
  {
    id: "treatment",
    num: "01",
    shortTitle: { uz: "Plomba & Davolash", ru: "Пломбы & Лечение", en: "Fillings & Care" },
    categoryTag: { uz: "Terapiya", ru: "Терапия", en: "Restorative" },
    icon: <DentalToothMolar className="w-5 h-5" />,
    badgeTitle: {
      uz: "GERMANIYA · YAPONIYA · KOREYA · ROSSIYA PLOMBALARI",
      ru: "ПЛОМБЫ: ГЕРМАНИЯ · ЯПОНИЯ · КОРЕЯ · РОССИЯ",
      en: "FILLINGS: GERMANY · JAPAN · KOREA · RUSSIA",
    },
    title: {
      uz: "Tish Davolash & Zamonaviy Plomba Turlari",
      ru: "Лечение Зубов и Виды Современных Пломб",
      en: "Tooth Pain Relief & Modern Dental Fillings",
    },
    desc: {
      uz: "O'tkir tish og'rig'ini zudlik bilan to'xtatish hamda kariesni 100% og'riqsiz davolash. Bemorning tanlovi va tish holatiga qarab Germaniya, Yaponiya, Janubiy Koreya hamda Rossiyaning original sertifikatlangan fotopolimer plombalari o'rnatiladi.",
      ru: "Мгновенное снятие острой боли и лечение кариеса без боли. На выбор пациентки: сертифицированные нано-композиты из Германии, Японии, Южной Кореи и России с гарантией прочности.",
      en: "Immediate acute toothache relief and 100% painless cavity therapy. Patients can choose from certified photopolymer composite fillings from Germany, Japan, South Korea, and Russia.",
    },
    plombaTypes: [
      {
        country: { uz: "Germaniya", ru: "Германия", en: "Germany" },
        brand: "3M™ Filtek & Charisma",
        desc: { uz: "Premium nano-keramika, 10+ yil kafolat", ru: "Премиум нанокомпозит, гарантия 10+ лет", en: "Premium nano-ceramic, 10+ yrs durability" },
      },
      {
        country: { uz: "Yaponiya", ru: "Япония", en: "Japan" },
        brand: "Estelite & GC Gradia",
        desc: { uz: "Xameleon tabiiy emal jilolanishi", ru: "Хамелеон эффект под родную эмаль", en: "Chameleon shade blending & shine" },
      },
      {
        country: { uz: "Janubiy Koreya", ru: "Южная Корея", en: "South Korea" },
        brand: "DenFil & DiaDent",
        desc: { uz: "Mustahkam mikro-gibrid texnologiya", ru: "Прочный микрогибридный композит", en: "Durable micro-hybrid composite" },
      },
      {
        country: { uz: "Rossiya", ru: "Россия", en: "Russia" },
        brand: "VladMiVa (Estelight)",
        desc: { uz: "Tejamkor va ishonchli terapevtik plomba", ru: "Надёжная и доступная терапия", en: "Reliable & affordable therapeutic filling" },
      },
    ],
    points: {
      uz: [
        "Koreya, Yaponiya, Germaniya va Rossiya sifatli plomba materiallari tanlovi",
        "Mikro-anesteziya: milk oldindan muzlatiladi, ukol og'rig'i sezilmaydi",
        "Tishning tabiiy chaynash yuzasi va barcha anatomik burmalari to'liq tiklanadi",
      ],
      ru: [
        "Широкий выбор оригинальных пломб: Германия, Япония, Южная Корея, Россия",
        "Деликатная анестезия: предварительное обезболивание десны гелем",
        "Точное анатомическое воссоздание естественного рельефа и жевательной функции",
      ],
      en: [
        "Wide choice of genuine fillings: Germany, Japan, South Korea, and Russia",
        "Gentle micro-anesthesia: topical gel pre-numbing eliminates any needle pinch",
        "Microscopic restoration of natural tooth contours and chewing strength",
      ],
    },
    duration: { uz: "30–45 daqiqa", ru: "30–45 минут", en: "30–45 mins" },
    visits: { uz: "1 ta qabul", ru: "1 визит", en: "1 visit" },
    result: { uz: "Tabiiy emal (0 og'riq)", ru: "Естественная эмаль", en: "Natural enamel" },
  },
  {
    id: "veneers",
    num: "02",
    shortTitle: { uz: "Old & Orqa Karonka", ru: "Коронки на Зубы", en: "Dental Crowns" },
    categoryTag: { uz: "Ortopediya", ru: "Ортопедия", en: "Prosthetics" },
    icon: <DentalVeneerCrown className="w-5 h-5" />,
    badgeTitle: {
      uz: "OLD VA ORQA TISHLAR · XITOY · GERMANIYA · AVSTRALIYA",
      ru: "КОРОНКИ ДЛЯ ЗУБОВ: КИТАЙ · ГЕРМАНИЯ · АВСТРАЛИЯ",
      en: "DENTAL CROWNS: CHINA · GERMANY · AUSTRALIA",
    },
    title: {
      uz: "Old va Orqa Tishlar Uchun Sifatli Karonkalar",
      ru: "Коронки для Передних и Жевательных Зубов",
      en: "Dental Crowns for Front & Posterior Teeth",
    },
    desc: {
      uz: "Old va orqa tishlarni Germaniya, Avstraliya hamda Xitoyning yuqori sifatli tsirkoniy va keramik koronkalari bilan tiklash. Old tishlar uchun tabiiy emal jilosi va go'zallik, orqa chaynov tishlari uchun esa qattiq yuklamaga chidamli baquvvat monolit qoplama. Uzoq yillar mustahkam xizmat qiladi.",
      ru: "Качественные циркониевые и керамические коронки из Германии, Австралии и Китая. Для передних зубов — естественная эстетика и блеск эмали, для жевательных — сверхпрочная монолитная защита на долгие годы.",
      en: "Restoration of front and back teeth using high-grade zirconia and ceramic crowns from Germany, Australia, and China. Natural aesthetics for front teeth and heavy chewing strength for molars lasting for many years.",
    },
    crownTypes: [
      {
        country: { uz: "Germaniya", ru: "Германия", en: "Germany" },
        brand: "Germaniya Tsirkon Karonkasi",
        desc: {
          uz: "Yuqori aniqlik, tabiiy shaffoflik va uzoq yillar xizmat",
          ru: "Высокая точность и прозрачность эмали на долгие годы",
          en: "Maximum precision and natural translucency for years",
        },
      },
      {
        country: { uz: "Avstraliya", ru: "Австралия", en: "Australia" },
        brand: "Avstraliya Keramikasi",
        desc: {
          uz: "Premium sifat, tish to'qimasiga 100% mos va mustahkam",
          ru: "Премиальное качество и идеальная биосовместимость",
          en: "Premium biocompatibility and heavy load endurance",
        },
      },
      {
        country: { uz: "Xitoy", ru: "Китай", en: "China" },
        brand: "Xitoy Tsirkon Karonkasi",
        desc: {
          uz: "Hamyonbop va baquvvat zamonaviy qoplama",
          ru: "Доступная и надёжная современная коронка",
          en: "Affordable and durable modern crown restoration",
        },
      },
    ],
    points: {
      uz: [
        "Old tishlar: tabiiy emal rangi, yorug'lik qaytarishi va estetika uzoq yillar saqlanadi",
        "Orqa tishlar: qattiq taomlarni bemalol chaynash uchun maksimal darajada mustahkam",
        "Germaniya, Avstraliya va Xitoy materiallari tanlovi: uzoq yillar ishonchli xizmat",
      ],
      ru: [
        "Передние зубы: естественный цвет, блеск и эстетика улыбки на долгие годы",
        "Жевательные зубы: максимальная прочность для уверенного комфортного жевания",
        "Сертифицированные материалы из Германии, Австралии и Китая на долгие годы",
      ],
      en: [
        "Front teeth: lifelike enamel translucency and beautiful aesthetics for many years",
        "Posterior teeth: extreme strength to chew all foods with full confidence",
        "Certified crown materials from Germany, Australia, and China for lasting years",
      ],
    },
    duration: { uz: "2–3 kun (2 seans)", ru: "2–3 дня (2 визита)", en: "2–3 days (2 visits)" },
    visits: { uz: "2 ta qabul", ru: "2 визита", en: "2 visits" },
    result: { uz: "Uzoq Yillar Xizmat", ru: "На Долгие Годы", en: "Long-term Durability" },
  },
  {
    id: "implant",
    num: "03",
    shortTitle: { uz: "Titan Implant", ru: "Имплантация", en: "Dental Implant" },
    categoryTag: { uz: "Implantologiya", ru: "Имплантология", en: "Implantology" },
    icon: <DentalImplantFixture className="w-5 h-5" />,
    badgeTitle: { uz: "KOREYA BIOTITAN PROTOKOLI · OSSTEM", ru: "КОРЕЙСКИЙ БИОТИТАНОВЫЙ ПРОТОКОЛ · OSSTEM", en: "KOREAN BIOTITANIUM PROTOCOL · OSSTEM" },
    title: { uz: "Biotitan Tish Implantatsiyasi", ru: "Титановая Имплантация Зубов", en: "Biocompatible Titanium Implantation" },
    desc: {
      uz: "Yo'qotilgan tishni qo'shni sog'lom tishlarni charxlamasdan, Janubiy Koreya (Osstem) va Shveysariya (Straumann) biotitan implantlari hamda estetik tsirkoniy toj bilan uzoq yillar davomida qayta tiklash. 100% og'riqsiz xirurgiya.",
      ru: "Восстановление утраченных зубов сертифицированными титановыми корнями (Osstem, Straumann) по протоколам Южной Кореи без обточки соседних здоровых зубов на долгие годы. Без боли и осложнений.",
      en: "Restoration of missing teeth using certified titanium root fixtures (Osstem, Straumann) guided by South Korean surgical protocols without grinding adjacent healthy teeth for long-term years.",
    },
    points: {
      uz: [
        "Qo'shni sog'lom tishlarga mutlaqo tegilmaydi va charxlanmaydi",
        "99.2% suyakka xavfsiz integratsiya va uzoq yillar mustahkamlik kafolati",
        "Tabiiy tishdek 100% to'liq chaynash quvvati va estetik go'zallik",
      ],
      ru: [
        "Соседние здоровые зубы остаются нетронутыми и живыми",
        "99.2% успешная приживаемость и надёжность на долгие годы",
        "100% восстановление естественной жевательной силы и дикции",
      ],
      en: [
        "Adjacent healthy teeth remain completely untouched and intact",
        "99.2% clinical osseointegration success backed by long-term durability",
        "Full 100% natural masticatory power and seamless aesthetic harmony",
      ],
    },
    duration: { uz: "20 daqiqa", ru: "20 минут", en: "20 mins" },
    visits: { uz: "2–3 ta qabul", ru: "2–3 визита", en: "2–3 visits" },
    result: { uz: "Uzoq Yillar", ru: "На Долгие Годы", en: "Long-term Durability" },
  },
  {
    id: "whitening",
    num: "04",
    shortTitle: { uz: "ZOOM 4 Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" },
    categoryTag: { uz: "Profilaktika", ru: "Отбеливание", en: "Whitening" },
    icon: <DentalWhiteningZoom className="w-5 h-5" />,
    badgeTitle: { uz: "PHILIPS ZOOM® 4 WHITE-SPEED · AQSH", ru: "PHILIPS ZOOM® 4 WHITE-SPEED · США", en: "PHILIPS ZOOM® 4 WHITE-SPEED · USA" },
    title: { uz: "Philips ZOOM® 4 Lazer Oqartirish", ru: "Лазерное Отбеливание Philips ZOOM® 4", en: "Philips ZOOM® 4 Laser Whitening" },
    desc: {
      uz: "Philips ZOOM® 4 original sovuq LED nuri yordamida tishlarning o'z holatiga nisbatan xavfsiz oqartirish va yorqin qilish. Emal qizimasligi, sezuvchanlik paydo bo'lmasligi va nervlar 100% xavfsizligi kafolatlanadi.",
      ru: "Осветление зубов холодным LED-светом Philips ZOOM® 4 относительно их исходного оттенка до естественного сияния. Без перегрева эмали, без боли и чувствительности.",
      en: "Gentle cold LED whitening with Philips ZOOM® 4 brightening and whitening teeth relative to their natural baseline with complete enamel and nerve protection.",
    },
    points: {
      uz: [
        "Tishlarning o'z holatiga nisbatan xavfsiz va sezilarli darajada yorqin qilish",
        "Sovuq LED nuri: tish emali qizimaydi va noxush sezuvchanlik bo'lmaydi",
        "Olingan yorqin tabassum 1.5–2 yil davomida mustahkam saqlanadi",
      ],
      ru: [
        "Осветление зубов относительно их исходного состояния до красивого блеска",
        "Холодный свет LED: исключает перегрев эмали и повреждение нерва",
        "Стойкий белоснежный результат сохраняется на 1.5–2 года",
      ],
      en: [
        "Safe, noticeable shade brightening relative to your teeth's natural baseline",
        "Cold LED light prevents thermal enamel stress and nerve irritation",
        "Radiant luminous shade maintained securely for 1.5–2 years",
      ],
    },
    duration: { uz: "45 daqiqa", ru: "45 минут", en: "45 mins" },
    visits: { uz: "1 ta seans", ru: "1 сеанс", en: "1 session" },
    result: { uz: "Tabiiy Yorqin Oqlik", ru: "Естественная Белизна", en: "Natural Radiant Shine" },
  },
  {
    id: "extraction",
    num: "05",
    shortTitle: { uz: "Atravmatik Tish Olish", ru: "Удаление Зубов", en: "Painless Extraction" },
    categoryTag: { uz: "Jarrohlik", ru: "Хирургия", en: "Surgery" },
    icon: <DentalSurgeryExtraction className="w-5 h-5" />,
    badgeTitle: { uz: "MIKROXIRURGIK ATRAVMATIK PROTOKOL", ru: "МИКРОХИРУРГИЧЕСКИЙ ПРОТОКОЛ", en: "ATRAUMATIC MICROSURGICAL PROTOCOL" },
    title: { uz: "Og'riqsiz Mikroxirurgik Tish Olish", ru: "Бережное Удаление Зубов Без Боли", en: "Atraumatic Painless Tooth Extraction" },
    desc: {
      uz: "Aql tishlari va murakkab ildizlarni nozik mikroxirurgik asboblar bilan, milk va suyak to'qimasini to'liq asragan holda 100% og'riqsiz va shishsiz olish. Muolajadan keyin 1-2 kunda tez va yengil bitish.",
      ru: "Бережное атравматичное удаление зубов любой сложности и зубов мудрости без боли, травмирования десны и отёков. Быстрое комфортное заживление за 1–2 дня.",
      en: "Atraumatic extraction of wisdom teeth and damaged roots utilizing delicate microsurgical instruments with zero pain, zero tissue tearing, and rapid healing within 1-2 days.",
    },
    points: {
      uz: [
        "Milk va suyak to'qimasi maksimal darajada asrab qolinadi",
        "Muolaja paytida 0% sezuvchanlik va to'liq og'riqsizlik kafolati",
        "Muolajadan so'ng asoratsiz va shishlarsiz 1–2 kunda tez bitish",
      ],
      ru: [
        "Бережное отношение к костной ткани и десневому контуру",
        "Полное отсутствие боли и неприятных ощущений во время процедуры",
        "Быстрое первичное заживление лунки без отёка за 1–2 дня",
      ],
      en: [
        "Maximum conservation of surrounding bone and gingival architecture",
        "Total local anesthesia guaranteeing 100% zero procedure discomfort",
        "Smooth post-extraction recovery with minimal swelling in 1-2 days",
      ],
    },
    duration: { uz: "10–20 daqiqa", ru: "10–20 минут", en: "10–20 mins" },
    visits: { uz: "1 ta qabul", ru: "1 визит", en: "1 visit" },
    result: { uz: "0 Shish, Tez Bitish", ru: "Без отёков и боли", en: "Zero swelling" },
  },
];

const Interactive3DCostCalculator = () => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [selectedId, setSelectedId] = useState("treatment");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  const current = treatments.find((t) => t.id === selectedId) || treatments[0];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const text = encodeURIComponent(
      `QABULGA YOZILISH (drmunojat.uz):\n` +
      `Xizmat: ${current.title[lang]}\n` +
      `Bemor: ${patientName}\n` +
      `Tel: ${patientPhone}\n` +
      `Manzil: Andijon`
    );
    window.open(`https://t.me/dr_munojat?text=${text}`, "_blank", "noopener,noreferrer");
    setPatientName("");
    setPatientPhone("");
  };

  return (
    <section className="pt-4 pb-10 sm:pt-6 sm:pb-14 bg-[#faf8f8] relative overflow-hidden" aria-label={a11y.treatmentPlan}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-black text-[#930b0b] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-red-100/70 border border-red-200 inline-block mb-2.5">
            {lang === "uz" ? "KLINIK XIZMATLAR REJASI" :
             lang === "ru" ? "ПЛАН КЛИНИЧЕСКОГО ЛЕЧЕНИЯ" :
             "CLINICAL TREATMENT BLUEPRINT"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === "uz" ? "Muolaja Tafsilotlari & Tezkor Qabul" :
             lang === "ru" ? "Параметры Лечения и Быстрая Запись" :
             "Treatment Parameters & Priority Booking"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal">
            {lang === "uz" ? "Kerakli stomatologik yo'nalishni tanlang, muolaja vaqti, kafolati va natijasi bilan tanishing." :
             lang === "ru" ? "Выберите нужное направление, ознакомьтесь с параметрами и запишитесь на приём." :
             "Select your dental procedure to view duration, technology protocols and treatment outcomes."}
          </p>
        </div>


        {/* ─── 5 AUTHENTIC DENTAL SPECIALTY BUTTONS (CLEAN, NO TRUNCATION) ─ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {treatments.map((t) => {
            const isSelected = selectedId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                className={`group relative p-3.5 rounded-2xl text-left transition-all duration-200 flex items-center gap-3 border cursor-pointer select-none ${
                  isSelected
                    ? "bg-gradient-to-r from-[#930b0b] via-[#ad1313] to-[#dc2626] text-white border-transparent shadow-lg shadow-red-950/20 ring-2 ring-red-400/40 scale-[1.01]"
                    : "bg-white text-slate-800 border-slate-200/90 hover:border-red-300 hover:bg-red-50/30 hover:text-[#930b0b] shadow-2xs"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-red-50 text-[#930b0b] group-hover:bg-red-100/80"
                  }`}
                >
                  {t.icon}
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-[9.5px] font-black uppercase tracking-wider block leading-none mb-1 ${
                      isSelected ? "text-red-100" : "text-slate-400 group-hover:text-[#930b0b]"
                    }`}
                  >
                    {t.categoryTag[lang]}
                  </span>
                  <span className="text-xs sm:text-[13px] font-bold block leading-tight">
                    {t.shortTitle[lang]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── MAIN TWO-COLUMN DENTAL CARD CONTAINER ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left: Clean Clinical Dental Specification Sheet */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              
              {/* Header with Authentic Dental Icon Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/70 text-[#930b0b] flex items-center justify-center shadow-2xs shrink-0">
                    {current.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#930b0b] block leading-none mb-1">
                      {current.badgeTitle[lang]}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                      {current.title[lang]}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70 shrink-0 inline-flex items-center gap-1.5">
                  <IconShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Og'riqsiz</span>
                </span>
              </div>
              
              {/* Clinical Narrative */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-5">
                {current.desc[lang]}
              </p>

              {/* 4 PLOMBA TYPES SHOWCASE (IF TREATMENT SELECTED) */}
              {current.plombaTypes && (
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#930b0b]" />
                    <span>{lang === "uz" ? "Mavjud Plomba Materiallari:" : lang === "ru" ? "Доступные Пломбировочные Материалы:" : "Available Filling Materials:"}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {current.plombaTypes.map((p, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#930b0b] block">
                          {p.country[lang]}
                        </span>
                        <span className="text-xs font-bold text-slate-900 block mt-0.5 leading-snug">
                          {p.brand}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1 leading-tight font-medium">
                          {p.desc[lang]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3 CROWN TYPES SHOWCASE (IF CROWNS SELECTED: XITOY, GERMANIYA, AVSTRALIYA) */}
              {current.crownTypes && (
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#930b0b]" />
                    <span>{lang === "uz" ? "Old & Orqa Tish Karonkalari (Xitoy, Germaniya, Avstraliya):" : lang === "ru" ? "Коронки для Передних и Жевательных Зубов:" : "Crown Systems (Front & Back):"}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {current.crownTypes.map((c, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#930b0b] block">
                          {c.country[lang]}
                        </span>
                        <span className="text-xs font-bold text-slate-900 block mt-0.5 leading-snug">
                          {c.brand}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1 leading-tight font-medium">
                          {c.desc[lang]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3 Clinical Guarantees */}
              <ul className="space-y-2.5 mb-6">
                {current.points[lang].map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center text-xs shrink-0 font-black">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3 Metric Tiles at Bottom */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-left">
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 text-center sm:text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === "uz" ? "Vaqt" : lang === "ru" ? "Время" : "Duration"}
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">
                  {current.duration[lang]}
                </span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 text-center sm:text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === "uz" ? "Tashrif" : lang === "ru" ? "Визиты" : "Visits"}
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">
                  {current.visits[lang]}
                </span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 text-center sm:text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === "uz" ? "Kafolat" : lang === "ru" ? "Гарантия" : "Outcome"}
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">
                  {current.result[lang]}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Booking Form Card (Clean Luxury) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#180404] via-[#240606] to-[#120202] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between border border-red-900/40">
            <div>
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-2">
                {lang === "uz" ? "TEZKOR QABUL · ANDIJON" : lang === "ru" ? "БЫСТРАЯ ЗАПИСЬ · АНДИЖАН" : "PRIORITY BOOKING"}
              </span>
              
              <h4 className="text-2xl font-black text-white mb-2 tracking-tight">
                {lang === "uz" ? "Navbatsiz Qabulga Yozilish" : lang === "ru" ? "Запись на Приём Без Очереди" : "Book Priority Appointment"}
              </h4>
              <p className="text-red-200/80 text-xs leading-relaxed mb-6 font-normal">
                {lang === "uz" ? "Dr. Munojat Akbarova bilan to'g'ridan-to'g'ri bog'lanish va dastlabki konsultatsiya belgilash." :
                 lang === "ru" ? "Прямая связь с доктором Мунаджат Акбаровой и запись на первичный осмотр." :
                 "Direct appointment booking with Dr. Munojat Akbarova with zero queue wait times."}
              </p>

              <form onSubmit={handleBooking} className="space-y-3">
                <div>
                  <label htmlFor="calc-name" className="sr-only">
                    {lang === "uz" ? "Ismingiz" : lang === "ru" ? "Ваше имя" : "Your name"}
                  </label>
                  <input
                    id="calc-name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    placeholder={lang === "uz" ? "Ismingiz (masalan: Nigora)" : lang === "ru" ? "Ваше имя (напр. Нигора)" : "Your name"}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-red-200/50 text-xs font-semibold focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="calc-phone" className="sr-only">
                    {lang === "uz" ? "Telefon raqamingiz" : lang === "ru" ? "Номер телефона" : "Phone number"}
                  </label>
                  <input
                    id="calc-phone"
                    name="tel"
                    autoComplete="tel"
                    type="tel"
                    placeholder={lang === "uz" ? "Telefon raqamingiz (+998 90 ...)" : lang === "ru" ? "Номер телефона (+998 90 ...)" : "Phone number"}
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-red-200/50 text-xs font-semibold focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full min-h-[48px] bg-gradient-to-r from-[#930b0b] via-[#fd1616] to-[#dc2626] hover:brightness-110 active:scale-98 text-white font-black text-sm rounded-xl shadow-lg shadow-red-950/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === "uz" ? "Telegram orqali yuborish" : lang === "ru" ? "Отправить через Telegram" : "Book via Telegram"}</span>
                  <span>→</span>
                </button>
              </form>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-red-200/70 text-center font-medium">
              <IconShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === "uz" ? "Ayollar uchun 100% maxfiy alohida xona" : lang === "ru" ? "100% приватный кабинет для женщин" : "100% Private Women-Only Suite"}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Interactive3DCostCalculator;
