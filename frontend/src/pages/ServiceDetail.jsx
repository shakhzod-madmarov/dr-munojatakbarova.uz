import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Seo from "../components/Seo";
import { assets } from "../assets/assets";
import {
  IconDentalImplant,
  IconTherapeuticTooth,
  IconVeneerTooth,
  IconSurgicalScalpel,
  IconCosmeticSmile,
  IconShieldCheck,
  IconPrivacyLock,
  IconPhone,
  IconCheckCircle,
  IconSparkleStar,
} from "../components/MedicalIcons";
import { toast } from "react-toastify";

/* ─── Comprehensive clinical data for each specialty ────────────────────────── */
export const detailedSpecialties = {
  "implantatsiya": {
    slug: "implantatsiya",
    iconType: "implant",
    badge: "100% OG'RIQSIZ · TITAN IMPLANT",
    title: {
      uz: "Tish Implantatsiyasi — Andijon",
      ru: "Имплантация Зубов в Андижане",
      en: "Dental Implantation in Andijan",
    },
    seoTitle: {
      uz: "Tish Implantatsiyasi Andijon — Dr. Munojat Akbarova | Titan Implantlar, 100% Og'riqsiz",
      ru: "Имплантация зубов в Андижане — Д-р Мунаджат Акбарова | Титановые импланты без боли",
      en: "Dental Implantation Andijan — Dr. Munojat Akbarova | Titanium Implants, 100% Painless",
    },
    metaDescription: {
      uz: "Andijonda tish implantatsiyasi Dr. Munojat Akbarova tomonidan. Titan implantlar bilan yo'qotilgan tishlarni uzoq yillar davomida tiklash. 100% og'riqsiz, ayollar uchun maxsus qulay sharoit. Tel: +998 94 106-15-55",
      ru: "Имплантация зубов в Андижане у Д-р Мунаджат Акбаровой. Восстановление зубов титановыми имплантами с гарантией на долгие годы. Без боли, деликатный приём для женщин. Тел: +998 94 106-15-55",
      en: "Dental implantation in Andijan by Dr. Munojat Akbarova. Long-term restoration with titanium implants. 100% pain-free, specialized for women. Phone: +998 94 106-15-55",
    },
    subtitle: {
      uz: "Yo'qotilgan tishlarni zamonaviy titan implantlar va tsirkoniy tojlar bilan uzoq yillar davomida qayta tiklash",
      ru: "Восстановление утраченных зубов титановыми имплантами и циркониевыми коронками на долгие годы",
      en: "Long-term restoration of missing teeth with modern titanium implants and zirconia crowns",
    },
    overview: {
      uz: "Tish implantatsiyasi — zamonaviy stomatologiyaning eng ishonchli va uzoq muddatli yutug'idir. Titan vint (implant) jag' suyagiga kiritilib, tabiiy tish ildizining o'rnini to'liq bosadi. Natijada qo'shni sog'lom tishlarni charxlashga yoki ko'prik qilishga mutlaqo hojat qolmaydi. Dr. Munojat Akbarova implantatsiya muolajasini eng nozik mikroxirurgik usulda, 100% og'riqsiz mahalliy anesteziya ostida o'tkazadi.",
      ru: "Имплантация зубов — самый надёжный и современный способ восстановления зубов. Титановый имплант вживляется в костную ткань и полностью заменяет натуральный корень зуба. При этом не требуется обтачивать соседние здоровые зубы. Д-р Мунаджат Акбарова проводит имплантацию микрохирургическим методом абсолютно безболезненно под современной анестезией.",
      en: "Dental implantation is the most reliable modern method for restoring missing teeth. A titanium screw is placed into the jawbone, fully replacing the natural root without needing to grind adjacent healthy teeth. Dr. Munojat Akbarova performs the procedure microsurgically, 100% pain-free under modern anesthesia.",
    },
    indications: {
      uz: [
        "Bitta yoki bir nechta tish yo'qotilganda",
        "Chaynov yoki old tishlarning to'liq yetishmasligi",
        "Olinadigan protez taqishni istamagan bemorlar",
        "Tishsiz qolish natijasida jag' suyagining yupqalashishi xavfi",
        "Estetik tabassum va to'liq chaynash quvvatini qaytarish",
      ],
      ru: [
        "Отсутствие одного или нескольких зубов",
        "Полная или частичная потеря жевательных или передних зубов",
        "Нежелание носить неудобные съёмные протезы",
        "Предотвращение атрофии костной ткани челюсти",
        "Восстановление идеальной улыбки и жевательной функции",
      ],
      en: [
        "Missing single or multiple teeth",
        "Partial or complete loss of chewing or front teeth",
        "Desire to avoid uncomfortable removable dentures",
        "Prevention of jawbone density loss (atrophy)",
        "Full aesthetic and masticatory restoration",
      ],
    },
    steps: {
      uz: [
        { title: "1. Diagnostika va 3D Tahlil", desc: "Raqamli rentgen va jag' suyagi zichligini baholash, individual davolash rejasi tuzish." },
        { title: "2. Og'riqsiz Anesteziya", desc: "Eng so'nggi anesteziya preparatlari bilan to'liq og'riqsizlantirish." },
        { title: "3. Titan Implant O'rnatish", desc: "Suyakka titan implantni steril va mikroxirurgik usulda o'rnatish (15-30 daqiqa)." },
        { title: "4. Integratsiya Davri", desc: "Implantning suyak bilan to'liq mustahkam birikishi (2-4 oy)." },
        { title: "5. Tsirkoniy Toj O'rnatish", desc: "Tish rangiga 100% mos keluvchi estetik tsirkoniy toj o'rnatish." },
      ],
      ru: [
        { title: "1. Диагностика и 3D анализ", desc: "Рентген-диагностика, оценка плотности кости и составление индивидуального плана." },
        { title: "2. Безопасная анестезия", desc: "Полное обезболивание современными анестетиками." },
        { title: "3. Установка импланта", desc: "Установка титанового импланта в стерильных условиях за 15-30 минут." },
        { title: "4. Период остеоинтеграции", desc: "Сращение импланта с костной тканью (2-4 месяца)." },
        { title: "5. Циркониевая коронка", desc: "Установка индивидуальной коронки под натуральный цвет зубов." },
      ],
      en: [
        { title: "1. 3D Diagnosis & Planning", desc: "Digital X-ray, bone density evaluation and personalized treatment plan." },
        { title: "2. Painless Anesthesia", desc: "Complete comfort with modern local anesthetics." },
        { title: "3. Implant Placement", desc: "Microsurgical sterile placement of titanium implant (15-30 mins)." },
        { title: "4. Osseointegration Period", desc: "Firm biological integration of implant into jawbone (2-4 months)." },
        { title: "5. Zirconia Crown Placement", desc: "Custom tooth-colored zirconia crown for natural aesthetic look." },
      ],
    },
    comparison: {
      title: { uz: "Implantatsiya va An'anaviy Ko'prik Taqqoslashi", ru: "Сравнение Имплантации и Мостовидного Протеза", en: "Comparison: Implants vs Traditional Bridges" },
      headers: {
        uz: ["Xususiyat", "Titan Implant", "Oddiy Ko'prik Protez"],
        ru: ["Параметр", "Титановый имплант", "Обычный мост"],
        en: ["Feature", "Titanium Implant", "Traditional Bridge"],
      },
      rows: {
        uz: [
          ["Qo'shni tishlarni charxlash", "— Kerak emas (Sog'lom qoladi)", "• 2 ta sog'lom tish charxlanadi"],
          ["Xizmat muddati", "Uzoq yillar davomida", "5–10 yil"],
          ["Suyak atrofiyasini to'xtatish", "✓ To'liq to'xtatadi", "— Suyak yupqalashaveradi"],
          ["Chaynash kuchi", "✓ 100% tabiiy tishdek", "• 60-70% kuch"],
        ],
        ru: [
          ["Обточка соседних зубов", "— Не требуется (Зубы целы)", "• Обтачиваются 2 здоровых зуба"],
          ["Срок службы", "На долгие годы", "5–10 лет"],
          ["Сохранение кости", "✓ Полностью сохраняет", "— Кость атрофируется"],
          ["Жевательная сила", "✓ 100% как родной зуб", "• 60-70% мощности"],
        ],
        en: [
          ["Grinding adjacent teeth", "— None (Neighbors stay healthy)", "• 2 healthy teeth must be ground"],
          ["Lifespan", "Long-term durable years", "5–10 years"],
          ["Bone loss prevention", "✓ Fully preserves bone", "— Bone slowly resorbs"],
          ["Chewing efficiency", "✓ 100% natural bite", "• 60-70% capacity"],
        ],
      },
    },
    faqs: {
      uz: [
        { q: "Implant qo'yish jarayoni og'riqlimi?", a: "Yo'q, mutlaqo og'riqsiz. Zamonaviy mahalliy anesteziya sababli bemor faqat yengil teginishni his qiladi. Operatsiyadan keyin ham dori vositalari bilan qulaylik ta'minlanadi." },
        { q: "Implant organizmga tushmasligi (rad etilishi) mumkinmi?", a: "Zamonaviy titan implantlarning ildiz otish foizi 98-99% ni tashkil qiladi. Dr. Munojat Akbarova xalqaro sifat sertifikatiga ega bo'lgan original titan implantlardan foydalanadi." },
        { q: "Ayollar uchun implantatsiya qabulida qanday sharoit bor?", a: "Dr. Munojat xonasida ayollar va qizlar uchun to'liq maxfiy, shinam va mehrli muhit yaratilgan. Hijobli ayollar ham hech qanday xijolatsiz, erkin holda muolaja olishadi." },
      ],
      ru: [
        { q: "Больно ли ставить имплант?", a: "Нет, процедура полностью безболезненна благодаря качественной современной анестезии. Никакой боли во время манипуляций нет." },
        { q: "Может ли имплант не прижиться?", a: "Приживаемость титановых имплантов составляет 98-99%. Д-р Мунаджат использует сертифицированные мировые бренды имплантов." },
        { q: "Какие условия для женщин?", a: "Кабинет Д-р Мунаджат обеспечивает полную приватность, уют и понимание для женщин и девушек." },
      ],
      en: [
        { q: "Is implant placement painful?", a: "No, it is completely painless under local anesthesia. You only feel gentle vibration." },
        { q: "What is the implant success rate?", a: "Modern medical titanium implants have a 98-99% success rate with Dr. Munojat." },
        { q: "What accommodations are provided for ladies?", a: "Complete privacy, gentle care, and comfortable atmosphere where ladies feel safe and respected." },
      ],
    },
  },

  "tish-davolash": {
    slug: "tish-davolash",
    iconType: "treatment",
    badge: "100% OG'RIQSIZ · 4 DAVLAT PLOMBALARI",
    title: {
      uz: "Tish Davolash & Plomba Turlari — Andijon",
      ru: "Лечение Зубов и Виды Пломб в Андижане",
      en: "Painless Dental Treatment & Fillings in Andijan",
    },
    seoTitle: {
      uz: "Tish Davolash & Plomba Andijon — Germaniya, Yaponiya, Koreya, Rossiya | Dr. Munojat Akbarova",
      ru: "Лечение зубов и пломбы в Андижане — Германия, Япония, Корея, Россия | Д-р Мунаджат Акбарова",
      en: "Dental Treatment & Fillings Andijan — Germany, Japan, Korea, Russia | Dr. Munojat Akbarova",
    },
    metaDescription: {
      uz: "Andijonda karies, pulpit va tish og'riqlarini 100% og'riqsiz davolash. Germaniya (3M™), Yaponiya (Estelite), Janubiy Koreya (DenFil) va Rossiya original plombalari. Tel: +998 94 106-15-55",
      ru: "Лечение кариеса, пульпита и зубной боли в Андижане у Д-р Мунаджат Акбаровой. Сертифицированные пломбы из Германии, Японии, Кореи и России. Тел: +998 94 106-15-55",
      en: "Painless cavity & toothache care in Andijan by Dr. Munojat Akbarova. Genuine fillings from Germany (3M™), Japan (Estelite), South Korea (DenFil), and Russia. Phone: +998 94 106-15-55",
    },
    subtitle: {
      uz: "Karies, pulpit va tish og'riqlarini Germaniya, Yaponiya, Janubiy Koreya va Rossiya original plombalari bilan 100% og'riqsiz davolash",
      ru: "Лечение кариеса, пульпита и боли с помощью сертифицированных пломб из Германии, Японии, Южной Кореи и России",
      en: "Treatment of cavities, pulpitis, and toothache using certified composite fillings from Germany, Japan, South Korea, and Russia",
    },
    overview: {
      uz: "Tish og'rig'i va kariesni o'z vaqtida davolash — tishni uzoq yillar saqlab qolishning kalitidir. Dr. Munojat Akbarova terapevtik stomatologiyada 4 ta davlatning eng yetakchi sertifikatlangan fotopolimer kompozitlaridan foydalanadi: Germaniya (3M™ Filtek & Charisma), Yaponiya (Estelite & GC Gradia), Janubiy Koreya (DenFil & DiaDent) va Rossiya (VladMiVa). Har bir bemorga klinik holati va imkoniyatiga qarab eng to'g'ri plomba tavsiya etiladi. Barcha muolajalar nozik mikro-anesteziya ostida 100% og'riqsiz bajariladi.",
      ru: "Своевременное лечение кариеса и пульпита позволяет сохранить собственные зубы на долгие годы. Д-р Мунаджат Акбарова применяет сертифицированные наногибридные фотополимерные материалы 4 ведущих стран: Германия (3M™ Filtek, Charisma), Япония (Estelite, GC Gradia), Южная Корея (DenFil, DiaDent) и Россия (ВладМиВа). Подбор материала индивидуален. Все манипуляции выполняются под деликатной микроанестезией на 100% без боли.",
      en: "Timely treatment of caries and pulpitis preserves your natural teeth for decades. Dr. Munojat Akbarova utilizes certified composite filling systems from 4 world-leading manufacturing countries: Germany (3M™ Filtek & Charisma), Japan (Estelite & GC Gradia), South Korea (DenFil & DiaDent), and Russia (VladMiVa). All treatments are 100% painless under delicate micro-anesthesia.",
    },
    materials: {
      title: {
        uz: "Biz Qo'llaydigan Original Plomba Materiallari (4 Davlat)",
        ru: "Используемые Пломбировочные Материалы (4 Страны)",
        en: "Original Certified Filling Systems (4 Countries)",
      },
      subtitle: {
        uz: "Dr. Munojat Akbarova har bir bemorga individual yondashib, tish holati va istagiga ko'ra eng ma'qul plomba turini tavsiya etadi:",
        ru: "Доктор Мунаджат подбирает оптимальный материал индивидуально под клиническую ситуацию и пожелания пациентки:",
        en: "Dr. Munojat selects the optimal composite filling based on clinical assessment and individual preferences:",
      },
      items: [
        {
          country: { uz: "Germaniya", ru: "Германия", en: "Germany" },
          flagColor: "bg-amber-500",
          brand: "3M™ Filtek & Charisma",
          desc: {
            uz: "Premium nano-keramik fotopolimer. Yuqori mustahkamlik, mikroskopik darajadagi jilolanish va 10+ yil benuqson xizmat.",
            ru: "Премиальный нанокомпозит с нанокерамикой. Высокая прочность, зеркальный блеск и долговечность 10+ лет.",
            en: "Premium nano-ceramic composite. Exceptional hardness, microscopic polish, and 10+ years durability.",
          },
          features: {
            uz: ["Nano-klaster texnologiyasi", "Katta yuklamaga chidamli", "10+ yil rasmiy kafolat"],
            ru: ["Технология нанокластеров", "Высокая износостойкость", "Гарантия 10+ лет"],
            en: ["Nano-cluster technology", "High chewing resistance", "10+ years warranty"],
          },
        },
        {
          country: { uz: "Yaponiya", ru: "Япония", en: "Japan" },
          flagColor: "bg-rose-500",
          brand: "Estelite & GC Gradia Direct",
          desc: {
            uz: "Xameleon submikron restavratsiya. Tishning tabiiy emal rangi va shaffofligini 100% o'ziga singdiradi, chegara umuman ko'rinmaydi.",
            ru: "Субмикронный композит с эффектом хамелеона. Идеальное слияние с естественным цветом зуба, переход абсолютно незаметен.",
            en: "Submicron chameleon filler. Seamlessly mimics natural tooth shading and translucency with invisible margins.",
          },
          features: {
            uz: ["Xameleon optik effekt", "Old tishlar uchun ideal", "Tabiiy emal jilolanishi"],
            ru: ["Оптический эффект хамелеона", "Идеально для передних зубов", "Глянцевый естественный блеск"],
            en: ["Chameleon optical blending", "Ideal for front incisors", "Natural enamel gloss"],
          },
        },
        {
          country: { uz: "Janubiy Koreya", ru: "Южная Корея", en: "South Korea" },
          flagColor: "bg-sky-500",
          brand: "DenFil & DiaDent",
          desc: {
            uz: "Yuqori zichlikdagi mikro-gibrid texnologiya. Chaynash tishlari uchun ajoyib chidamlilik va hamyonbop mukammal sifat uyg'unligi.",
            ru: "Высокоплотный микрогибридный композит. Отличная прочность для жевательных зубов и идеальный баланс цены и качества.",
            en: "High-density micro-hybrid composite. Superior wear resistance for molars with optimal value and reliability.",
          },
          features: {
            uz: ["Mikro-gibrid polimer", "Chaynash tishlarida baquvvat", "Eng ma'qul narx-sifat"],
            ru: ["Микрогибридная матрица", "Надёжность на жевательных зубах", "Оптимальное соотношение цена/качество"],
            en: ["Micro-hybrid matrix", "Heavy chewing strength", "Best value & reliability"],
          },
        },
        {
          country: { uz: "Rossiya", ru: "Россия", en: "Russia" },
          flagColor: "bg-emerald-500",
          brand: "VladMiVa (Estelight / DentLight)",
          desc: {
            uz: "Tejamkor va vaqt sinovidan o'tgan terapevtik fotopolimer. Kariesni ishonchli va arzon narxda sifatli davolash uchun qulay tanlov.",
            ru: "Проверенный временем доступный терапевтический композит. Надёжное и бюджетное лечение кариеса с хорошей фиксацией.",
            en: "Time-tested and budget-friendly restorative photopolymer. Dependable cavity restoration at an accessible price point.",
          },
          features: {
            uz: ["Klinik sinalgan tarkib", "Ishonchli terapevtik plomba", "Eng arzon va tejamkor"],
            ru: ["Клинически проверенный состав", "Надёжная фиксация", "Самый доступный вариант"],
            en: ["Clinically proven formula", "Dependable therapeutic seal", "Most accessible option"],
          },
        },
      ],
    },
    indications: {
      uz: [
        "Tishda qora dog'lar, chuqurliklar yoki karies paydo bo'lganda",
        "Issiq, sovuq, shirin yoki nordon yeguliklarda tish bezovta qilganda",
        "Tunda tishning o'z-o'zidan qattiq og'rishi (pulpit)",
        "Eski plombalarning rangi o'zgarishi yoki tushib qolishi",
        "Tish sinishi, emal parchalanishi (badiiy restavratsiya)",
      ],
      ru: [
        "Появление тёмных пятен, полостей и кариеса",
        "Чувствительность на горячее, холодное, сладкое или кислое",
        "Ноющая ночная боль в зубе (пульпит)",
        "Потемнение или выпадение старых пломб",
        "Сколы зубов и дефекты эмали (художественная реставрация)",
      ],
      en: [
        "Dark spots, holes, or visible cavities on teeth",
        "Sensitivity to hot, cold, sweet, or acidic foods",
        "Throbbing nocturnal toothache (pulpitis)",
        "Discolored, leaking, or missing old fillings",
        "Chipped edges and enamel fractures (cosmetic bonding)",
      ],
    },
    steps: {
      uz: [
        { title: "1. To'liq Diagnostika", desc: "Zararlangan sohani aniqlash va rentgen tekshiruvi." },
        { title: "2. Og'riqsizlantirish", desc: "Yumshoq anesteziya yordamida muolajani to'liq hissizlantirish." },
        { title: "3. Kariesni Tozalash", desc: "Zararlangan to'qimalarni mikromotor yordamida ehtiyotkorlik bilan tozalash." },
        { title: "4. Kanal Davolash (zarurat bo'lsa)", desc: "Ildiz kanallarini antiseptik bilan yuvish va germetik plombalash." },
        { title: "5. Badiiy Restavratsiya", desc: "Nano-kompozit material bilan tish anatomiyasini va emal rangini tiklash." },
      ],
      ru: [
        { title: "1. Диагностика", desc: "Осмотр и прицельный рентген-снимок." },
        { title: "2. Обезболивание", desc: "Качественная мягкая анестезия." },
        { title: "3. Очищение кариеса", desc: "Бережное удаление поражённых тканей зуба." },
        { title: "4. Пломбирование каналов", desc: "Антисептическая обработка и пломбировка корней (при пульпите)." },
        { title: "5. Реставрация", desc: "Послойное нанесение фотополимера под естественный цвет." },
      ],
      en: [
        { title: "1. Diagnosis", desc: "Detailed inspection and targeted digital X-ray." },
        { title: "2. Painless Anesthesia", desc: "Gentle numbness injection." },
        { title: "3. Cavity Cleaning", desc: "Micro-removal of carious enamel and dentin." },
        { title: "4. Canal Therapy (if needed)", desc: "Antiseptic cleaning and hermetic root sealing." },
        { title: "5. Layered Bonding", desc: "Layered nano-composite sculpting matching natural shade." },
      ],
    },
    comparison: {
      title: { uz: "Dr. Munojat Restavratsiyasi va Oddiy Plombalar Farqi", ru: "Преимущества Реставрации у Д-р Мунаджат", en: "Dr. Munojat's Restorations vs Standard Fillings" },
      headers: {
        uz: ["Xususiyat", "Dr. Munojat Fotopolimeri", "Eski Oddiy Plomba"],
        ru: ["Критерий", "Фотополимер Д-р Мунаджат", "Старая обычная пломба"],
        en: ["Feature", "Dr. Munojat Photopolymer", "Old Basic Filling"],
      },
      rows: {
        uz: [
          ["Tishga yopishish kuchi", "Nano-adgeziya (Tushib ketmaydi)", "• Ajralib qolish xavfi yuqori"],
          ["Rang mosligi", "100% ko'rinmas, tabiiy emaldek", "— Kulrang yoki sariq dog'dek ko'rinadi"],
          ["Tish shakli anatomiyasi", "✓ Tuberkul va burmalargacha tiklanadi", "— Tekis plastirdek qilinadi"],
          ["Chidamlilik", "7–12 yil", "1–3 yil"],
        ],
        ru: [
          ["Сцепление с зубом", "Нано-адгезив (Не выпадает)", "• Риск сколов и отслойки"],
          ["Цвет", "Невидима, как родная эмаль", "— Заметна глазу, желтеет"],
          ["Анатомия", "✓ Воссоздаются все бугорки зуба", "— Плоская заплатка"],
          ["Срок службы", "7–12 лет", "1–3 года"],
        ],
        en: [
          ["Bond strength", "Nano-adhesion (No debonding)", "• High risk of leakage"],
          ["Shade match", "Seamless natural transparency", "— Visible artificial patch"],
          ["Tooth anatomy", "✓ Exact cusps and grooves sculpted", "— Flat artificial blob"],
          ["Durability", "7–12 years", "1–3 years"],
        ],
      },
    },
    faqs: {
      uz: [
        { q: "Tish davolatishdan juda qo'rqaman, og'riq bo'lmaydimi?", a: "Mutlaqo og'rimaydi! Dr. Munojat Akbarova aynan stomatologdan qo'rqadigan ayollar va bolalar bilan juda xotirjam, sabrli va mehrli ishlaydi. Anesteziya oldidan milkka maxsus muzlatuvchi gel surtiladi, hatto ukol ninasining o'zi ham sezilmaydi." },
        { q: "Plomba qo'yilgandan keyin qachon ovqat yesa bo'ladi?", a: "Zamonaviy fotopolimer plombalar maxsus ultrabinafsha chiroq yordamida darhol qotadi, shuning uchun muolajadan so'ng (anesteziya o'tgach) bemalol ovqatlanishingiz mumkin." },
      ],
      ru: [
        { q: "Очень боюсь лечить зубы, будет ли больно?", a: "Совершенно без боли! Перед уколом наносится обезболивающий гель, поэтому даже укол не чувствуется. Доктор работает мягко и терпеливо." },
        { q: "Когда можно кушать после пломбирования?", a: "Фотополимер полимеризуется лампой сразу, поэтому кушать можно сразу после отхода анестезии." },
      ],
      en: [
        { q: "I have dental anxiety, will it hurt?", a: "Zero pain! A topical numbing gel is applied before the injection, so you don't even feel the needle. Dr. Munojat is gentle and patient." },
        { q: "When can I eat after a filling?", a: "Photopolymer cures immediately under UV light; you can eat as soon as the local numbness subsides." },
      ],
    },
  },

  "ortopediya": {
    slug: "ortopediya",
    iconType: "ortho",
    badge: "OLD VA ORQA TISHLAR · XITOY · GERMANIYA · AVSTRALIYA",
    title: {
      uz: "Old va Orqa Tish Karonkalari (Tsirkoniy & Keramika) — Andijon",
      ru: "Коронки для Передних и Жевательных Зубов в Андижане",
      en: "Front & Back Teeth Crowns in Andijan",
    },
    seoTitle: {
      uz: "Old va Orqa Tish Karonkalari Andijon — Xitoy, Germaniya, Avstraliya | Dr. Munojat Akbarova",
      ru: "Коронки для передних и жевательных зубов в Андижане — Китай, Германия, Австралия",
      en: "Front and Back Dental Crowns Andijan — China, Germany, Australia | Dr. Munojat",
    },
    metaDescription: {
      uz: "Andijonda old va orqa tishlar uchun Germaniya, Avstraliya hamda Xitoy tsirkoniy va keramik karonkalari. Dr. Munojat Akbarova — tabiiy estetika va uzoq yillik mustahkamlik. Tel: +998 94 106-15-55",
      ru: "Коронки для передних и жевательных зубов в Андижане из Германии, Австралии и Китая у Д-р Мунаджат Акбаровой. Естественный цвет и прочность на долгие годы. Тел: +998 94 106-15-55",
      en: "Front and molar dental crowns in Andijan using certified materials from Germany, Australia, and China by Dr. Munojat Akbarova. Long-term durability. Phone: +998 94 106-15-55",
    },
    subtitle: {
      uz: "Old va orqa tishlarni Germaniya, Avstraliya hamda Xitoyning yuqori sifatli tsirkoniy va keramik karonkalari bilan uzoq yillarga mukammal tiklash",
      ru: "Восстановление передних и жевательных зубов коронками из Германии, Австралии и Китая на долгие годы",
      en: "Restoration of front and posterior teeth with certified crowns from Germany, Australia, and China for long-lasting years",
    },
    overview: {
      uz: "Ortopedik stomatologiyada old va orqa tishlar alohida vazifalarni bajaradi: old tishlar yuz chiroyi, tabassum estetikasi va tabiiy shaffoflikni talab qilsa, orqa chaynov tishlari ovqatni to'liq maydalash va yuqori bosimga chidash uchun maksimal baquvvat bo'lishi kerak. Dr. Munojat Akbarova har bir bemorga individual yondashib, 3 ta yetakchi davlatning sertifikatlangan tsirkoniy va keramik qoplamalarini taqdim etadi: Germaniya (yuqori aniqlik va tabiiy emal shaffofligi), Avstraliya (premium biosovushuvchanlik va milk xavfsizligi) hamda Xitoy (hamyonbop va baquvvat monolit tsirkoniy). Har bir karonka uzoq yillar mustahkam va benuqson xizmat qiladi.",
      ru: "Передние и жевательные зубы несут разную нагрузку: для зоны улыбки критически важны цвет и прозрачность, а для жевательных моляров — выдерживание экстремальных жевательных нагрузок. Д-р Мунаджат Акбарова предлагает сертифицированные коронки 3 ведущих стран: Германия (высочайшая точность и естественная эстетика), Австралия (биосовместимость и забота о деснах) и Китай (современный прочный и доступный цирконий). Все конструкции служат долгие годы.",
      en: "Front and back teeth require distinct functional engineering: front teeth demand lifelike translucency and cosmetic elegance, while molars require heavy-duty strength to absorb immense chewing pressures. Dr. Munojat Akbarova provides certified crowns from 3 leading nations: Germany (sublime precision and natural enamel brilliance), Australia (premium biocompatibility preserving gum health), and China (durable, high-value modern monolithic zirconia) built for long-term years.",
    },
    materials: {
      title: {
        uz: "Old va Orqa Tish Karonkalari (3 Davlat)",
        ru: "Коронки для Передних и Жевательных Зубов (3 Страны)",
        en: "Crown Systems for Front & Back Teeth (3 Countries)",
      },
      subtitle: {
        uz: "Dr. Munojat Akbarova old tishlarga tabiiy jilo va shaffoflik, orqa tishlarga esa baquvvat chaynash quvvatini ta'minlovchi materiallarni tavsiya etadi:",
        ru: "Доктор Мунаджат подбирает материалы индивидуально: эстетическая прозрачность для зоны улыбки и высокая прочность для жевательных зубов:",
        en: "Dr. Munojat selects materials tailored for front aesthetic translucency and posterior chewing strength:",
      },
      items: [
        {
          country: { uz: "Germaniya", ru: "Германия", en: "Germany" },
          flagColor: "bg-amber-500",
          brand: "Germaniya Tsirkon Karonkasi",
          desc: {
            uz: "Yuqori texnologik monolit tsirkoniy. Old va orqa tishlar uchun ajoyib optik shaffoflik, tabiiy rang va uzoq yillar benuqson xizmat.",
            ru: "Высокотехнологичный монолитный цирконий. Естественная прозрачность для передних зубов и надёжность для жевательных на долгие годы.",
            en: "High-precision German monolithic zirconia. Exceptional optical translucency and heavy load capacity lasting for years.",
          },
          features: {
            uz: ["Tabiiy emaldek shaffof", "Old va orqa tishlarga mos", "Uzoq yillar xizmat"],
            ru: ["Прозрачность родной эмали", "Для передних и моляров", "Долгие годы службы"],
            en: ["Natural enamel translucency", "For incisors and molars", "Long-lasting service"],
          },
        },
        {
          country: { uz: "Avstraliya", ru: "Австралия", en: "Australia" },
          flagColor: "bg-emerald-500",
          brand: "Avstraliya Keramikasi",
          desc: {
            uz: "Premium biokompatibil keramik qoplama. Milk to'qimasiga 100% zararsiz, milkni qoraytirmaydi va uzoq yillik mustahkamlik beradi.",
            ru: "Премиальная керамика. Идеальное прилегание к десне без посинения края, максимальная биосовместимость на долгие годы.",
            en: "Premium biocompatible ceramic crowns. Zero gingival discoloration, ideal soft tissue adaptation for many years.",
          },
          features: {
            uz: ["100% biosovushuvchanlik", "Milk cheti qoraymaydi", "Uzoq yillar mustahkamlik"],
            ru: ["Биосовместимый состав", "Без тёмного края у десны", "Прочность на долгие годы"],
            en: ["100% biocompatibility", "No dark gum margins", "High durability"],
          },
        },
        {
          country: { uz: "Xitoy", ru: "Китай", en: "China" },
          flagColor: "bg-rose-500",
          brand: "Xitoy Tsirkon Karonkasi",
          desc: {
            uz: "Zamonaviy raqamli CAD/CAM tsirkoniy qoplamasi. Chaynash tishlarida baquvvat, qattiq bosimga chidamli va eng ma'qul narxdagi sifat.",
            ru: "Современный цифровой CAD/CAM диоксид циркония. Отличная выносливость на жевательных зубах по доступной стоимости.",
            en: "Modern digital CAD/CAM zirconia crowns. Reliable chewing endurance for molars at an accessible price.",
          },
          features: {
            uz: ["CAD/CAM aniqligi", "Orqa tishlarda baquvvat", "Eng ma'qul narx-sifat"],
            ru: ["Высокая точность CAD/CAM", "Прочность на жевательных", "Доступная цена"],
            en: ["CAD/CAM precision fit", "Heavy molar endurance", "Best value"],
          },
        },
      ],
    },
    indications: {
      uz: [
        "Old tishlarning yemirilishi, rangi o'zgarishi, sinishi yoki shaklsizligi",
        "Orqa chaynov tishlarining katta qismi karies sabab yemirilganda",
        "Ildiz kanali davolangan (nervi olingan) tishlarni sinishdan asrash uchun",
        "Tishlar orasidagi noqulay oraliqlarni estetik bartaraf etish",
        "Uzoq yillar davomida mustahkam va ishonchli xizmat qiladigan qoplama kerak bo'lganda",
      ],
      ru: [
        "Разрушение, сколы, потемнение или дефекты формы передних зубов",
        "Сильное разрушение жевательных зубов кариесом",
        "Защита депульпированных (после лечения каналов) зубов от раскалывания",
        "Устранение эстетических дефектов и щелей",
        "Потребность в надёжной коронке на долгие годы службы",
      ],
      en: [
        "Chipped, discolored, fractured, or misshapen anterior incisors",
        "Extensive cavity damage on posterior chewing molars",
        "Protecting root-canal treated teeth from structural fracture",
        "Correcting aesthetic spacing and misalignment",
        "Desire for robust, natural dental crowns lasting for years",
      ],
    },
    steps: {
      uz: [
        { title: "1. Diagnostika & 3D Tekshiruv", desc: "Old va orqa tishlarning holatini aniqlash va individual davolash rejasi." },
        { title: "2. Nozik Tayyorlov", desc: "Tish to'qimasini mikron darajasida minimal silliqlash." },
        { title: "3. Raqamli CAD/CAM Iz", desc: "Raqamli texnologiyada 100% aniqlikdagi 3D model olish." },
        { title: "4. Vaqtinchalik Qoplama", desc: "Asosiy karonka tayyor bo'lguncha tishni to'liq himoya qilish." },
        { title: "5. Doimiy Fiksatsiya", desc: "Karonkani maxsus tsement bilan uzoq yillarga mustahkam biriktirish." },
      ],
      ru: [
        { title: "1. Диагностика и 3D-осмотр", desc: "Оценка зубов и составление плана протезирования." },
        { title: "2. Бережная обработка", desc: "Минимальное микро-сошлифовывание эмали." },
        { title: "3. Цифровой слепок CAD/CAM", desc: "Снятие высокоточного цифрового 3D-слепка." },
        { title: "4. Временная защита", desc: "Установка временной коронки на время изготовления." },
        { title: "5. Постоянная фиксация", desc: "Надёжное закрепление постоянной коронки на долгие годы." },
      ],
      en: [
        { title: "1. 3D Assessment & Diagnosis", desc: "Comprehensive evaluation of front and posterior bite forces." },
        { title: "2. Gentle Micro-Preparation", desc: "Minimal tooth contouring preserving live tissue." },
        { title: "3. Digital CAD/CAM Scan", desc: "High-precision 3D scan for exact laboratory milling." },
        { title: "4. Temporary Protection", desc: "Aesthetic temporary crown shielding the tooth." },
        { title: "5. Definitive Bonding", desc: "Precision cementation engineered for long-term years." },
      ],
    },
    comparison: {
      title: { uz: "Zamonaviy Tsirkoniy Karonka va Oddiy Qoplama Farqi", ru: "Преимущества Циркониевых Коронок перед Обычными", en: "Modern Zirconia Crowns vs Basic Metal-Plastic" },
      headers: {
        uz: ["Parametr", "Tsirkoniy Karonka (Dr. Munojat)", "Eski Oddiy Qoplama"],
        ru: ["Критерий", "Цирконий (Д-р Мунаджат)", "Старые металлические/пластмассовые"],
        en: ["Feature", "Zirconia Crown (Dr. Munojat)", "Basic Metal/Plastic Crown"],
      },
      rows: {
        uz: [
          ["Old tishlar estetikasi", "100% tabiiy shaffof, chegarasi ko'rinmaydi", "• Sun'iy, qoraygan yoki mat ko'rinadi"],
          ["Orqa tishlar mustahkamligi", "✓ Monolit: sinmaydi va yemirilmaydi", "— Plastmassa yoriladi, metall yeyiladi"],
          ["Xizmat muddati", "Uzoq yillar davomida xizmat qiladi", "1–3 yilda eskiradi va tushadi"],
          ["Milkka ta'siri", "✓ Milk qizarib qoraymaydi, 100% zararsiz", "— Metall cheti milkni qoraytirib qo'yadi"],
        ],
        ru: [
          ["Эстетика передних зубов", "100% естественная прозрачность, без швов", "• Заметны глазу, серый оттенок"],
          ["Прочность на жевательных", "✓ Монолит: не скалывается под нагрузкой", "— Пластмасса стирается, металл окисляется"],
          ["Срок службы", "Служит долгие годы", "1–3 года максимум"],
          ["Влияние на десну", "✓ Биосовместимо, десна остаётся розовой", "— Тёмная полоса у края десны"],
        ],
        en: [
          ["Front smile aesthetics", "Lifelike translucency with invisible margins", "• Artificial look with gray discoloration"],
          ["Molar chewing power", "✓ Monolithic: withstands heavy mastication", "— Chips, wears down, or fractures"],
          ["Lifespan", "Lasts for long-term years", "1–3 years only"],
          ["Gum line health", "✓ 100% biocompatible, no gum darkening", "— Unpleasant dark metallic border"],
        ],
      },
    },
    faqs: {
      uz: [
        { q: "Old va orqa tishlarga qanday karonka tanlash kerak?", a: "Old tishlar uchun tabiiy shaffoflikka ega Germaniya yoki Avstraliya karonkalari tavsiya etiladi (kulib turganda tabiiy tishdek ko'rinadi). Orqa chaynov tishlari uchun esa qattiq taomlar bosimiga chidamli Germaniya yoki Xitoy monolit tsirkoniy karonkalari uzoq yillar mustahkam xizmat qiladi." },
        { q: "Karonkalar qancha vaqt xizmat qiladi?", a: "Zamonaviy tsirkoniy va keramik karonkalar uzoq yillar davomida mustahkam saqlanadi. Ular qahva, choy yoki boshqa moddalardan aslo rangini yo'qotmaydi va yeyilmaydi." },
      ],
      ru: [
        { q: "Какие коронки лучше выбрать для передних и жевательных зубов?", a: "Для передних зубов рекомендуются коронки из Германии или Австралии с высокой прозрачностью родной эмали. Для жевательных моляров идеально подходят прочные монолитные циркониевые коронки из Германии или Китая на долгие годы." },
        { q: "Сколько служат коронки?", a: "Современные циркониевые и керамические коронки служат долгие годы, не теряют блеск, не стираются и не меняют свой первоначальный цвет." },
      ],
      en: [
        { q: "Which crown should I choose for front vs back teeth?", a: "For front incisors, highly translucent German or Australian crowns are optimal for natural smile aesthetics. For chewing molars, heavy-duty monolithic zirconia from Germany or China provides unmatched chewing durability for long years." },
        { q: "How long do crowns last?", a: "Modern zirconia and ceramic crowns last for long-term years without staining, cracking, or losing their natural enamel luster." },
      ],
    },
  },

  "xirurgiya": {
    slug: "xirurgiya",
    iconType: "surgery",
    badge: "100% OG'RIQSIZ · MIKROXIRURGIYA",
    title: {
      uz: "Xirurgiya va Tish Olish — Andijon",
      ru: "Хирургия и Удаление Зубов в Андижане",
      en: "Oral Surgery & Tooth Extraction in Andijan",
    },
    seoTitle: {
      uz: "Tish Olish va Aql Tishi Xirurgiyasi Andijon — Dr. Munojat Akbarova | 100% Og'riqsiz",
      ru: "Удаление зубов и зубов мудрости в Андижане — Д-р Мунаджат Акбарова | Без боли",
      en: "Painless Tooth Extraction Andijan — Dr. Munojat Akbarova | Wisdom Tooth Surgery",
    },
    metaDescription: {
      uz: "Andijonda og'riqsiz tish olish, aql tishini xirurgik olish va milk operatsiyalari. Dr. Munojat Akbarova — mikroxirurgik nozik usul, 1-3 kunda tez tiklanish. Tel: +998 94 106-15-55",
      ru: "Безболезненное удаление зубов и зубов мудрости в Андижане у Д-р Мунаджат Акбаровой. Микрохирургическая точность, быстрое заживление. Тел: +998 94 106-15-55",
      en: "Painless tooth extraction and wisdom tooth surgery in Andijan by Dr. Munojat Akbarova. Gentle microsurgery, fast recovery in 1-3 days. Phone: +998 94 106-15-55",
    },
    subtitle: {
      uz: "Oddiy, murakkab va aql tishlarini (8-tish) mutlaqo og'riqsiz, nozik va tezkor mikroxirurgik usulda olish",
      ru: "Удаление обычных зубов и зубов мудрости любой сложности без боли и травм",
      en: "Gentle, painless extraction of simple, complex, and impacted wisdom teeth",
    },
    overview: {
      uz: "Dr. Munojat Akbarova jarrohlik amaliyotlarida atravmatik (to'qimalarga shikast yetkazmaydigan) zamonaviy texnologiyalardan foydalanadi. Aql tishi noto'g'ri o'sgan yoki milk ichida qolib ketgan holatlarda ham maxsus mikroxirurgik asboblar yordamida tish bir necha daqiqada og'riqsiz olinadi va shish xavfi minimal darajaga tushiriladi.",
      ru: "Д-р Мунаджат Акбарова применяет атравматичные технологии удаления зубов. Даже при сложном ретинированном зубе мудрости удаление проходит за считанные минуты без боли, с минимальным риском отёка.",
      en: "Dr. Munojat Akbarova utilizes atraumatic surgical protocols. Even deeply impacted or angled wisdom teeth are removed smoothly within minutes with minimal swelling.",
    },
    indications: {
      uz: [
        "Davolashning iloji qolmagan, ildizigacha chirigan tishlar",
        "Noto'g'ri o'sib, jag'ni og'ritayotgan yoki boshqa tishlarni siqayotgan aql tishlari",
        "Ortodontik davolash (breket taqish) oldidan tish qatorida joy ochish zarurati",
        "Ildiz atrofida yiring yoki kista paydo bo'lishi",
      ],
      ru: [
        "Зубы, разрушенные ниже уровня десны и не подлежащие лечению",
        "Зубы мудрости, растущие криво или давящие на соседние зубы",
        "Подготовка зубного ряда к установке брекетов",
        "Воспалительные кисты у верхушки корня",
      ],
      en: [
        "Severely broken down teeth non-restorable by fillings or crowns",
        "Impacted or sideways wisdom teeth causing crowding and pain",
        "Orthodontic extractions to create space for aligners or braces",
        "Persistent root cysts or chronic infection",
      ],
    },
    steps: {
      uz: [
        { title: "1. Rentgen Tahlil", desc: "Tish ildizi shakli va jag' nervi joylashuvini aniq ko'rish." },
        { title: "2. Chuqur Anesteziya", desc: "Sezuvchanlikni 100% yo'qotuvchi zamonaviy anesteziya." },
        { title: "3. Atravmatik Olish", desc: "Suyak va milkka zarar yetkazmasdan tishni yengil ajratib olish." },
        { title: "4. Dori Qo'yish & Tikish", desc: "Qon ketishini to'xtatuvchi hemostatik gubka va nozik mikro-tikuv." },
        { title: "5. Shaxsiy Ko'rsatmalar", desc: "Tez bitishi uchun muz qo'yish va dori ichish bo'yicha yo'riqnoma." },
      ],
      ru: [
        { title: "1. Рентген-контроль", desc: "Анализ формы корней и положения нерва." },
        { title: "2. Глубокая анестезия", desc: "Полное отключение болевых рецепторов." },
        { title: "3. Бережное удаление", desc: "Атравматичное извлечение без повреждения кости." },
        { title: "4. Гемостаз и шов", desc: "Саморассасывающийся шов для быстрого заживления." },
        { title: "5. Инструктаж", desc: "Рекомендации для заживления без отёков." },
      ],
      en: [
        { title: "1. Digital X-Ray", desc: "Mapping root curvature and nerve proximity." },
        { title: "2. Profound Anesthesia", desc: "Complete nerve blocking with premium anesthetics." },
        { title: "3. Atraumatic Extraction", desc: "Gentle luxation preserving surrounding bone." },
        { title: "4. Hemostatic Suture", desc: "Collagen sponge and micro-sutures for rapid healing." },
        { title: "5. Post-op Guide", desc: "Clear guidelines on ice, food, and medications." },
      ],
    },
    comparison: {
      title: { uz: "Atravmatik Olish va Eski Usul Farqi", ru: "Атравматичное Удаление против Старого Метода", en: "Atraumatic Modern Extraction vs Old Aggressive Methods" },
      headers: {
        uz: ["Parametr", "Dr. Munojatning Atravmatik Usuli", "Eski An'anaviy Usul"],
        ru: ["Критерий", "Метод Д-р Мунаджат", "Старый метод"],
        en: ["Criterion", "Dr. Munojat Atraumatic Protocol", "Old Conventional Technique"],
      },
      rows: {
        uz: [
          ["Og'riq darajasi", "✓ 100% sezilmaydi", "• Kuchli bosim va og'riq"],
          ["Jag' suyagining saqlanishi", "100% butun (kelgusida implant oson tushadi)", "— Suyak devori sinishi mumkin"],
          ["Tiklanish vaqti", "1–2 kun", "7–14 kun kuchli og'riq"],
          ["Shish xavfi", "✓ Minimal yoki umuman yo'q", "• Katta shish va ko'karish"],
        ],
        ru: [
          ["Боль", "✓ Полностью отсутствует", "• Сильное давление и боль"],
          ["Сохранность кости", "100% сохранена под имплант", "— Повреждение лунки"],
          ["Заживление", "1–2 дня", "1–2 недели болей"],
          ["Отёки", "✓ Минимальны", "• Выраженный отёк"],
        ],
        en: [
          ["Pain Level", "✓ 100% pain-free", "• Forceful trauma and pain"],
          ["Bone Preservation", "Socket wall 100% intact for future implants", "— Damaged socket edges"],
          ["Recovery Time", "1–2 days", "7–14 days sore recovery"],
          ["Post-op Swelling", "✓ Minimal or zero swelling", "• Noticeable bruising and swelling"],
        ],
      },
    },
    faqs: {
      uz: [
        { q: "Aql tishini oldirish juda qo'rqinchlimi?", a: "Yo'q! Dr. Munojat Akbarovaning qo'li juda yengil bo'lib, eng murakkab aql tishi ham 10-15 daqiqa ichida hech qanday og'riqsiz olinadi." },
        { q: "Tish olgandan keyin og'izni chayish mumkinmi?", a: "Dastlabki 24 soat ichida og'izni kuchli chayish mumkin emas, chunki tish o'rnidagi himoya qon laxtasi (qon quyqasi) saqlanishi shart." },
      ],
      ru: [
        { q: "Страшно ли удалять зуб мудрости?", a: "Нет! У Д-р Мунаджат очень лёгкая рука. Процедура проходит за 10-15 минут абсолютно безболезненно." },
        { q: "Можно ли полоскать рот после удаления?", a: "В первые 24 часа полоскать нельзя, чтобы сохранить защитный кровяной сгусток в лунке." },
      ],
      en: [
        { q: "Is wisdom tooth removal scary?", a: "Not at all! Dr. Munojat has a remarkably gentle touch and completes the extraction in 10-15 painless minutes." },
        { q: "Can I rinse my mouth after extraction?", a: "Do not vigorously rinse within the first 24 hours to protect the vital blood clot." },
      ],
    },
  },

  "tish-oqartirish": {
    slug: "tish-oqartirish",
    iconType: "whitening",
    badge: "ZOOM TEXNOLOGIYASI · TABIIY YORQIN OQLIK",
    title: {
      uz: "ZOOM Tish Oqartirish — Andijon",
      ru: "ZOOM Отбеливание Зубов в Андижане",
      en: "ZOOM Professional Teeth Whitening in Andijan",
    },
    seoTitle: {
      uz: "ZOOM Tish Oqartirish Andijon — Dr. Munojat Akbarova | Tishlarni Xavfsiz Yorqin Qilish",
      ru: "Отбеливание зубов ZOOM в Андижане — Д-р Мунаджат Акбарова | 1 сеанс",
      en: "ZOOM Teeth Whitening Andijan — Dr. Munojat Akbarova | Safe Natural Brightening",
    },
    metaDescription: {
      uz: "Andijonda professional ZOOM tish oqartirish. Dr. Munojat Akbarova — tishlarning o'z holatiga nisbatan xavfsiz oqartirish va yorqin qilish. Emalga zarar yo'q. Tel: +998 94 106-15-55",
      ru: "Профессиональное отбеливание зубов ZOOM в Андижане у Д-р Мунаджат Акбаровой. Осветление зубов относительно исходного тона без вреда для эмали. Тел: +998 94 106-15-55",
      en: "Professional ZOOM teeth whitening in Andijan by Dr. Munojat Akbarova. Safe brightening relative to your starting shade. Phone: +998 94 106-15-55",
    },
    subtitle: {
      uz: "Professional ZOOM tizimi yordamida tishlarning o'z holatiga nisbatan xavfsiz oqartirish, tabiiy yorqin va jiloli qilish",
      ru: "Осветление зубов относительно исходного оттенка до естественного сияния с помощью системы ZOOM",
      en: "Safe teeth brightening and whitening relative to your natural shade using ZOOM technology",
    },
    overview: {
      uz: "ZOOM professional tish oqartirish — butun dunyoda eng mashhur va xavfsiz estetik muolajadir. Maxsus gel va sovuq nurli ZOOM lampasi yordamida emal ichidagi pigmentlar parchalanadi. Tish emali strukturasi zarracha zararlanmaydi. Dr. Munojat Akbarova Andijonda ayollar va kelinlar uchun to'y va bayramlar oldidan benuqson oppoq tabassum yaratadi.",
      ru: "ZOOM — всемирно признанная безопасная технология отбеливания. Холодный свет лампы активирует гель, расщепляя глубокие пигменты без вреда для эмали. Д-р Мунаджат создаёт сияющие белоснежные улыбки для женщин и невест в Андижане.",
      en: "ZOOM is the gold standard in in-office teeth whitening. A cold-light LED lamp activates the whitening gel to break down deep stains without harming tooth enamel. Ideal for brides and ladies in Andijan.",
    },
    indications: {
      uz: [
        "Qahva, choy, shirinliklar yoki chekish oqibatida sarg'aygan tishlar",
        "To'y, bayram, fotosessiya yoki muhim tadbir oldidan tezkor porloq tabassum kerak bo'lganda",
        "Yosh o'tishi bilan tish emali qoraygan holatlarda",
        "Har qanday ayolning o'ziga bo'lgan ishonchini oshirish istagi",
      ],
      ru: [
        "Пожелтение эмали от чая, кофе, пищевых красителей",
        "Подготовка к свадьбе, фотосессии и важным событиям",
        "Возрастные изменения цвета зубов",
        "Желание иметь яркую ослепительную улыбку",
      ],
      en: [
        "Enamel yellowing from tea, coffee, or dietary pigments",
        "Pre-wedding, event, or photo-shoot aesthetic preparation",
        "Age-related tooth darkening",
        "Boosting personal confidence with a brilliant radiant smile",
      ],
    },
    steps: {
      uz: [
        { title: "1. Emal Rangini Aniqlash", desc: "VITA shkalasi bo'yicha boshlang'ich tish rangini belgilash." },
        { title: "2. Milk va Lablarni Himoyalash", desc: "Milk to'qimalariga maxsus himoya geli (kofferdam) surtish." },
        { title: "3. ZOOM Gel Qo'llash", desc: "Tish yuzasiga kislorodli faol oqartiruvchi gel surtish." },
        { title: "4. ZOOM Chiroq Aktivatsiyasi", desc: "3 marta 15 daqiqalik yorug'lik seansi." },
        { title: "5. Remineralizatsiya", desc: "Tish sezuvchanligini oldini oluvchi fluoridli gel bilan emalni boyitish." },
      ],
      ru: [
        { title: "1. Определение тона", desc: "Фиксация исходного оттенка по шкале VITA." },
        { title: "2. Защита дёсен", desc: "Нанесение защитного барьера на десны." },
        { title: "3. Нанесение геля", desc: "Покрытие зубов гелем ZOOM." },
        { title: "4. Активация лампой", desc: "3 цикла по 15 минут под лампой ZOOM." },
        { title: "5. Фторирование", desc: "Укрепление эмали минеральным гелем." },
      ],
      en: [
        { title: "1. Shade Assessment", desc: "Recording initial tooth shade on VITA guide." },
        { title: "2. Gum Isolation", desc: "Applying protective liquid dam barrier." },
        { title: "3. ZOOM Gel Application", desc: "Applying proprietary ZOOM hydrogen peroxide gel." },
        { title: "4. Light Activation", desc: "Three 15-minute illumination cycles." },
        { title: "5. Enamel Remineralization", desc: "Strengthening enamel with soothing fluoride gel." },
      ],
    },
    comparison: {
      title: { uz: "ZOOM Professional va Uy Sharoitidagi Oqartirish Farqi", ru: "ZOOM против Домашних Полосок и Паст", en: "In-Office ZOOM vs Home Whitening Strips & Pastes" },
      headers: {
        uz: ["Parametr", "ZOOM Professional (Dr. Munojat)", "Uy Sharoitidagi Pasta/Plastir"],
        ru: ["Параметр", "Профессиональный ZOOM", "Домашние пасты и полоски"],
        en: ["Feature", "In-Office ZOOM System", "Home Strips & Pastes"],
      },
      rows: {
        uz: [
          ["Natija kuchi", "Tish o'z holatiga nisbatan yorqin va oppoq bo'ladi", "• Zo'rg'a seziladi yoki noxolis oqaradi"],
          ["Vaqt", "Atigi 45 daqiqa (1 seans)", "3–4 hafta har kuni ovoragarchilik"],
          ["Emal xavfsizligi", "✓ Vrach nazorati ostida 100% xavfsiz", "— Emalni qirib, sezgir qilib qo'yishi mumkin"],
          ["Natijaning saqlanishi", "1.5–2 yil", "1–2 oy"],
        ],
        ru: [
          ["Эффект", "Естественная белизна относительно исходного тона", "• Едва заметный эффект"],
          ["Время", "Всего 45 минут", "Недели ежедневных мучений"],
          ["Безопасность", "✓ 100% безопасно под контролем врача", "— Абразив повреждает эмаль"],
          ["Стойкость", "1.5–2 года", "1–2 месяца"],
        ],
        en: [
          ["Effectiveness", "Safe natural brightening relative to baseline", "• Minimal or uneven result"],
          ["Time Required", "Just 45 minutes (1 visit)", "3–4 weeks of messy routine"],
          ["Safety", "✓ 100% safe under doctor supervision", "— Risk of abrasive enamel wear"],
          ["Longevity", "1.5–2 years", "1–2 months"],
        ],
      },
    },
    faqs: {
      uz: [
        { q: "ZOOM oqartirish tish emalini yupqalashtiradimi?", a: "Yo'q! ZOOM texnologiyasi emal qatlamini yupqalashtirmaydi yoki qirmaydi. Kislorod molekulalari faqat emal chuqurligidagi rang beruvchi dog'larni parchalaydi." },
        { q: "Oqartirishdan keyin qanday parvarish kerak?", a: "Dastlabki 48 soat davomida 'oq parhez' (choy, qahva, shokolad, qizil lavlagi kabi bo'yovchi mahsulotlardan tiyilish) tavsiya etiladi." },
      ],
      ru: [
        { q: "Вредит ли ZOOM эмали?", a: "Нет! Гель ZOOM работает на молекулярном уровне, расщепляя пигмент внутри пор эмали без снятия поверхностного слоя." },
        { q: "Какая диета нужна после процедуры?", a: "В первые 48 часов соблюдается «белая диета» (исключение кофе, крепкого чая, красного вина и соусов)." },
      ],
      en: [
        { q: "Does ZOOM damage or thin tooth enamel?", a: "No! Oxygen free radicals specifically target stain molecules within enamel micropores without removing enamel." },
        { q: "What is the post-whitening care?", a: "Follow a 'white diet' for 48 hours, avoiding dark liquids like tea, coffee, and dark sauces." },
      ],
    },
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const specialty = detailedSpecialties[slug] || detailedSpecialties["implantatsiya"];

  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", notes: "" });
  const [sending, setSending] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      toast.error(
        lang === "uz" ? "Ismingiz va telefon raqamingizni kiriting" :
        lang === "ru" ? "Введите имя и номер телефона" :
        "Please enter your name and phone number"
      );
      return;
    }
    setSending(true);
    const text = encodeURIComponent(
      `🦷 QABULGA YOZILISH:\n` +
      `📌 Xizmat: ${specialty.title[lang]}\n` +
      `👤 Bemor: ${bookingForm.name}\n` +
      `📞 Tel: ${bookingForm.phone}\n` +
      (bookingForm.notes ? `💬 Izoh: ${bookingForm.notes}\n` : "") +
      `📍 Manzil: Andijon (dr-munojatakbarova.uz)`
    );
    window.open(`https://t.me/dr_munojat?text=${text}`, "_blank", "noopener,noreferrer");
    toast.success(
      lang === "uz" ? "Qabulingiz Telegramga yuborildi!" :
      lang === "ru" ? "Заявка отправлена в Telegram!" :
      "Appointment sent via Telegram!"
    );
    setSending(false);
    setBookingForm({ name: "", phone: "", notes: "" });
  };

  const otherSpecialties = Object.values(detailedSpecialties).filter((s) => s.slug !== specialty.slug);

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": ["MedicalProcedure", "MedicalWebPage"],
    "name": specialty.title[lang],
    "description": specialty.metaDescription[lang],
    "url": `https://dr-munojatakbarova.uz/services/${specialty.slug}`,
    "provider": {
      "@type": "Person",
      "name": "Dr. Munojat Akbarova",
      "jobTitle": "Stomatolog",
      "telephone": "+998941061555",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Andijon",
        "addressCountry": "UZ"
      }
    }
  };

  return (
    <>
      <Seo
        title={specialty.seoTitle[lang]}
        description={specialty.metaDescription[lang]}
        keywords={`${specialty.title[lang]}, ${specialty.slug} Andijon, ayol stomatolog Andijon, Dr Munojat Akbarova`}
        canonical={`https://dr-munojatakbarova.uz/services/${specialty.slug}`}
        schemaJson={schemaJson}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 bg-[#0d0101] overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#930b0b]/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#fd1616]/15 rounded-full blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs text-red-300/70 mb-6 font-semibold">
            <Link to="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Xizmatlar</Link>
            <span>/</span>
            <span className="text-[#fd1616]">{specialty.title[lang]}</span>
          </nav>

          <span className="section-tag mb-4 inline-block">{specialty.badge}</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            {specialty.title[lang]}
          </h1>
          <p className="text-red-200/80 text-base sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {specialty.subtitle[lang]}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#book"
              className="btn-crimson min-h-[50px] px-8 py-3.5 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <span className="flex items-center gap-2"><IconPhone className="w-4 h-4 text-white" /> {lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться на Приём" : "Book Appointment"}</span>
            </a>
            <a
              href="tel:+998941061555"
              className="btn-ghost min-h-[50px] px-8 py-3.5 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <span>+998 (94) 106-15-55</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 bg-[#fff8f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          {/* Overview Block */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#930b0b] to-[#fd1616] rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505]">
                {lang === "uz" ? "Muolaja Haqida To'liq Ma'lumot" : lang === "ru" ? "О Процедуре" : "Clinical Overview"}
              </h2>
            </div>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {specialty.overview[lang]}
            </p>

            {/* Indications */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50/40 rounded-2xl p-6 border border-red-100">
              <h3 className="font-black text-base text-[#930b0b] mb-4 flex items-center gap-2">
                <IconSparkleStar className="w-5 h-5 text-[#930b0b]" />
                <span>{lang === "uz" ? "Kimlarga Tavsiya Etiladi?" : lang === "ru" ? "Кому показана процедура?" : "Who is this procedure for?"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.indications[lang].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <span className="text-[#fd1616] font-black">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Materials Section (e.g. 4 Countries Plombalar) */}
          {specialty.materials && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="section-tag">
                  {lang === "uz" ? "PLOMBA MATERIALLARI" : lang === "ru" ? "МАТЕРИАЛЫ ПЛОМБ" : "FILLING SYSTEMS"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                  {specialty.materials.title[lang]}
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {specialty.materials.subtitle[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {specialty.materials.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between hover:border-red-300 hover:shadow-md transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800">
                          <span className={`w-2 h-2 rounded-full ${item.flagColor} shrink-0`} />
                          <span>{item.country[lang]}</span>
                        </span>
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-[#930b0b]">
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-black text-base text-slate-900 mb-2 leading-tight">
                        {item.brand}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {item.desc[lang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 space-y-1.5">
                      {item.features[lang].map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step by Step Timeline */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="section-tag">
                {lang === "uz" ? "BOSQICHMA-BOSQICH" : lang === "ru" ? "ЭТАПЫ" : "STEP-BY-STEP"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                {lang === "uz" ? "Muolaja Qanday O'tkaziladi?" : lang === "ru" ? "Как проходит процедура?" : "How is the procedure performed?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {specialty.steps[lang].map((step, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 flex flex-col relative group hover:border-[#930b0b]/40 hover:shadow-red-sm transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#930b0b] to-[#fd1616] text-white flex items-center justify-center text-xs font-black mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-black text-sm text-[#1a0505] mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="section-tag">
                {lang === "uz" ? "TAQQOSLASH" : lang === "ru" ? "СРАВНЕНИЕ" : "COMPARISON"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                {specialty.comparison.title[lang]}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#1a0505] text-white">
                    {specialty.comparison.headers[lang].map((h, i) => (
                      <th key={i} className="p-4 font-black text-xs uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {specialty.comparison.rows[lang].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="p-4 font-bold text-slate-800">{row[0]}</td>
                      <td className="p-4 font-semibold text-[#930b0b] bg-red-50/40">{row[1]}</td>
                      <td className="p-4 text-slate-500">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Specialty FAQ */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="section-tag">
                {lang === "uz" ? "SAVOL VA JAVOBLAR" : lang === "ru" ? "ВОПРОСЫ" : "FAQ"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                {specialty.title[lang]} — {lang === "uz" ? "Tez-tez beriladigan savollar" : lang === "ru" ? "Частые вопросы" : "FAQ"}
              </h2>
            </div>

            <div className="space-y-4">
              {specialty.faqs[lang].map((faq, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                  <h3 className="font-black text-base text-[#1a0505] mb-2 flex items-start gap-2">
                    <span className="text-[#fd1616]">❓</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Booking Section */}
          <div id="book" className="bg-gradient-to-br from-[#1a0505] to-[#2a0808] text-white rounded-3xl p-8 sm:p-12 shadow-premium border border-red-900/40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="section-tag mb-3">{specialty.title[lang]}</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
                  {lang === "uz" ? "Andijonda Qabulga Yoziling" : lang === "ru" ? "Запишитесь в Андижане" : "Book in Andijan"}
                </h2>
                <p className="text-red-200/80 text-sm leading-relaxed mb-6">
                  {lang === "uz" ? "Dr. Munojat Akbarova sizga maxsus qulay vaqt ajratadi. To'g'ridan-to'g'ri qo'ng'iroq qiling yoki quyidagi formani to'ldiring:" :
                   lang === "ru" ? "Д-р Мунаджат подберёт для вас удобное время. Позвоните или оставьте заявку:" :
                   "Dr. Munojat will schedule your convenient appointment. Call directly or submit below:"}
                </p>
                <div className="space-y-2 text-sm text-red-200/90">
                  <p><strong className="text-white">+998 (94) 106-15-55</strong></p>
                  <p><strong className="text-white">@dr_munojat</strong></p>
                  <p><strong className="text-white">Andijon shahar, O'zbekiston</strong></p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBooking} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3">
                <label htmlFor="sd-booking-name" className="sr-only">
                  {lang === "uz" ? "Ismingiz" : lang === "ru" ? "Ваше имя" : "Your name"}
                </label>
                <input
                  id="sd-booking-name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  placeholder={lang === "uz" ? "Ismingiz" : lang === "ru" ? "Ваше имя" : "Your name"}
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-800 font-medium text-sm outline-none focus:ring-2 focus:ring-[#fd1616]"
                />
                <label htmlFor="sd-booking-phone" className="sr-only">
                  {lang === "uz" ? "Telefon raqamingiz" : lang === "ru" ? "Номер телефона" : "Phone number"}
                </label>
                <input
                  id="sd-booking-phone"
                  name="tel"
                  autoComplete="tel"
                  type="tel"
                  placeholder={lang === "uz" ? "Telefon raqamingiz" : lang === "ru" ? "Номер телефона" : "Phone number"}
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm((p) => ({ ...p, phone: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-800 font-medium text-sm outline-none focus:ring-2 focus:ring-[#fd1616]"
                />
                <label htmlFor="sd-booking-notes" className="sr-only">
                  {lang === "uz" ? "Qo'shimcha savol yoki qulay vaqt" : lang === "ru" ? "Вопрос или удобное время" : "Notes or preferred time"}
                </label>
                <textarea
                  id="sd-booking-notes"
                  name="notes"
                  placeholder={lang === "uz" ? "Qo'shimcha savol yoki qulay vaqt" : lang === "ru" ? "Вопрос или удобное время" : "Notes or preferred time"}
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-800 font-medium text-sm outline-none focus:ring-2 focus:ring-[#fd1616] resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-crimson w-full min-h-[48px] text-sm flex items-center justify-center gap-2"
                >
                  <span>{lang === "uz" ? "Telegram orqali yozilish" : lang === "ru" ? "Записаться в Telegram" : "Book via Telegram"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Other Specialties navigation */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1a0505] mb-6 text-center">
              {lang === "uz" ? "Boshqa Xizmatlarimiz" : lang === "ru" ? "Другие Услуги" : "Explore Other Services"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherSpecialties.map((other) => {
                const specialtyMedia = {
                  ortopediya: {
                    image: assets.heroSmile,
                    icon: <IconVeneerTooth className="w-4 h-4 text-amber-600" />,
                    badge: "XITOY · GERMANIYA · AVSTRALIYA",
                    badgeBg: "bg-amber-50 text-amber-900 border-amber-200",
                  },
                  implantatsiya: {
                    image: assets.treatmentImplant,
                    icon: <IconDentalImplant className="w-4 h-4 text-sky-600" />,
                    badge: "OSSTEM & STRAUMANN · UZOQ YILLAR",
                    badgeBg: "bg-sky-50 text-sky-900 border-sky-200",
                  },
                  "tish-oqartirish": {
                    image: assets.treatmentWhitening,
                    icon: <IconCosmeticSmile className="w-4 h-4 text-blue-600" />,
                    badge: "PHILIPS ZOOM® 4 · TABIIY OQLIK",
                    badgeBg: "bg-blue-50 text-blue-900 border-blue-200",
                  },
                  "tish-davolash": {
                    image: assets.clinicRoom,
                    icon: <IconTherapeuticTooth className="w-4 h-4 text-teal-600" />,
                    badge: "3M™ ESPE · 100% OG'RIQSIZ",
                    badgeBg: "bg-teal-50 text-teal-900 border-teal-200",
                  },
                  xirurgiya: {
                    image: assets.treatmentSurgery,
                    icon: <IconSurgicalScalpel className="w-4 h-4 text-purple-600" />,
                    badge: "PIEZOTOME® · 0 SHISH",
                    badgeBg: "bg-purple-50 text-purple-900 border-purple-200",
                  },
                };
                const media = specialtyMedia[other.slug] || specialtyMedia["implantatsiya"];

                return (
                  <Link
                    key={other.slug}
                    to={`/services/${other.slug}`}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-[#930b0b]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Clinical Procedure Photo Header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={media.image}
                          alt={other.title[lang]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black border shadow-xs ${media.badgeBg}`}>
                            {media.icon}
                            <span>{media.badge}</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-1.5">
                        <h4 className="font-black text-sm text-[#1a0505] group-hover:text-[#930b0b] transition-colors leading-snug">
                          {other.title[lang]}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {other.subtitle[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                      <span>{lang === "uz" ? "Batafsil ma'lumot" : lang === "ru" ? "Подробнее" : "Learn more"}</span>
                      <span>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
