import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IconSparkleStar, IconShieldCheck, IconCheckCircle } from "./MedicalIcons";

const guides = [
  {
    id: "whitening",
    title: {
      uz: "ZOOM 4 Oqartirishdan So'ng 'Oq Parhez' (48 Soat)",
      ru: "Белая диета после отбеливания ZOOM (48 часов)",
      en: "ZOOM 4 Post-Whitening 'White Diet' (48 Hours)",
    },
    tag: "OQ PARHEZ",
    allowed: {
      uz: ["Sut, qatiq, tvorog va pishloq", "Tovuq va kurka go'shti (oq go'sht)", "Guruch, kartoshka va oq non", "Oddiy gazsiz toza suv"],
      ru: ["Молочные продукты (молоко, творог, сыр)", "Белое мясо птицы (курица, индейка)", "Рис, картофель, белые макароны", "Чистая негазированная вода"],
      en: ["Dairy products (milk, yogurt, cheese)", "White poultry meat (chicken, turkey)", "Rice, potatoes, white bread", "Pure still water"],
    },
    forbidden: {
      uz: ["Qora va ko'k choy, qahva", "Qizil souslar, ketchup, lavlagi", "Shokolad va rangli shirinliklar", "Rangli gazli ichimliklar (Fanta, Cola)"],
      ru: ["Чёрный и зелёный чай, кофе", "Красные соусы, кетчуп, свёкла", "Шоколад и цветные десерты", "Цветные газировки (Кола, Фанта)"],
      en: ["Black/green tea, dark coffee", "Red sauces, ketchup, beets", "Chocolate and colored desserts", "Dark sodas and colored juices"],
    },
  },
  {
    id: "implant",
    title: {
      uz: "Implantatsiyadan Keyingi 7 Kunlik Parvarish",
      ru: "Уход в первые 7 дней после имплантации",
      en: "First 7 Days Post-Implant Care",
    },
    tag: "IMPLANT PARVARISHI",
    allowed: {
      uz: ["Iliq va yumshoq ovqatlar (pyure, sho'rva)", "Operatsiya qilinmagan tomonda ehtiyotkorona chaynash", "Dr. Munojat yozib bergan dori-darmonlarni o'z vaqtida ichish", "Antiseptik eritma bilan og'izni muloyim chayish"],
      ru: ["Тёплая и мягкая пища (пюре, супы)", "Жевание на противоположной стороне", "Приём назначенных врачом препаратов по графику", "Бережные антисептические ванночки"],
      en: ["Lukewarm and soft foods (purees, soups)", "Chewing carefully on the opposite side", "Taking prescribed medication on time", "Gentle soothing antiseptic mouth baths"],
    },
    forbidden: {
      uz: ["Qaynoq, achchiq va qattiq yeguliklar", "Issiq vanna, sauna va og'ir sport", "Implant sohasini til yoki barmog'ingiz bilan tegish", "Chekish va spirtli ichimliklar"],
      ru: ["Горячая, острая и твёрдая пища", "Бани, сауны и тяжёлый спорт", "Прикосновение к области швов языком или руками", "Курение и алкоголь"],
      en: ["Hot, spicy, and crunchy foods", "Saunas, hot baths, and heavy workouts", "Touching surgical site with tongue or fingers", "Smoking and alcohol"],
    },
  },
  {
    id: "extraction",
    title: {
      uz: "Tish Olingandan Keyingi Ko'rsatmalar",
      ru: "Памятка после удаления зуба",
      en: "Post-Extraction Recovery Protocol",
    },
    tag: "TISH OLINGANDAN SO'NG",
    allowed: {
      uz: ["Dokali tamponni 20 daqiqadan so'ng olib tashlash", "Yuz tashqarisidan sovuq kompress qo'yish", "2 soatdan keyin iliq yumshoq taom yeyish", "Yumshoq tish cho'tkasi bilan ehtiyotkorlik bilan tozalash"],
      ru: ["Удалить марлевый тампон через 20 минут", "Прикладывать холод к щеке снаружи", "Принимать тёплую мягкую пищу через 2 часа", "Бережная чистка зубов мягкой щёткой"],
      en: ["Remove gauze pad after 20 minutes", "Apply external cold compress to cheek", "Eat soft lukewarm foods after 2 hours", "Gentle brushing with a soft toothbrush"],
    },
    forbidden: {
      uz: ["Dastlabki 24 soatda og'izni qattiq chayqash", "Naycha (trubochka) orqali ichish", "Yaraga til yoki tish tozalagich bilan tegish", "Qaynoq ovqatlar va dush"],
      ru: ["Интенсивное полоскание в первые 24 часа", "Питьё напитков через трубочку", "Ковыряние лунки зубочистками", "Горячая ванна и прогревание щеки"],
      en: ["Vigorous rinsing within the first 24 hours", "Drinking liquids through a straw", "Poking the socket with toothpicks or fingers", "Hot baths and heating the cheek"],
    },
  },
];

const PatientCareGuides = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("whitening");

  const current = guides.find((g) => g.id === activeTab) || guides[0];

  return (
    <section className="py-10 sm:py-14 bg-slate-50 border-t border-slate-200" id="care-guides">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
            <IconShieldCheck className="w-4 h-4 text-[#930b0b]" />
            <span>{lang === "uz" ? "BEMORLAR UCHUN ESQATMA" : lang === "ru" ? "ПАМЯТКА ПАЦИЕНТАМ" : "PATIENT CARE GUIDES"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mt-3 mb-4">
            {lang === "uz" ? "Muolajadan Keyingi Klinik Ko'rsatmalar" : lang === "ru" ? "Рекомендации после процедур" : "Post-Treatment Clinical Instructions"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {lang === "uz" ? "Davolash natijasi uzoq yillar go'zal saqlanishi uchun Dr. Munojat Akbarovaning rasmiy klinik tavsiyalari." :
             lang === "ru" ? "Официальные рекомендации Д-р Мунаджат для идеального сохранения результатов лечения." :
             "Official clinical recommendations by Dr. Munojat Akbarova to ensure long-lasting treatment success."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id)}
              className={`min-h-[44px] px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === g.id
                  ? "bg-[#930b0b] text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-red-300"
              }`}
            >
              {g.tag}
            </button>
          ))}
        </div>

        {/* Guide Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-xl animate-fade-in-up">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 text-center">
            {current.title[lang]}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Allowed Column */}
            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-6">
              <h4 className="font-black text-sm text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                <span>{lang === "uz" ? "Tavsiya Etiladi (Mumkin)" : lang === "ru" ? "Рекомендуется" : "Recommended"}</span>
              </h4>
              <ul className="space-y-3">
                {current.allowed[lang].map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-emerald-950 font-semibold flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forbidden Column */}
            <div className="bg-red-50/70 border-2 border-red-200 rounded-2xl p-6">
              <h4 className="font-black text-sm text-red-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">✕</span>
                <span>{lang === "uz" ? "Taqiqlanadi (Mumkin emas)" : lang === "ru" ? "Запрещено" : "Avoid"}</span>
              </h4>
              <ul className="space-y-3">
                {current.forbidden[lang].map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-red-950 font-semibold flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PatientCareGuides;
