import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IconSparkleStar, IconShieldCheck } from "./MedicalIcons";

const faqData = [
  {
    q: {
      uz: "Muolajalar haqiqatan ham 100% og'riqsiz o'tadimi?",
      ru: "Процедуры действительно проходят на 100% без боли?",
      en: "Are dental treatments truly 100% pain-free?",
    },
    a: {
      uz: "Ha, mutlaqo! Dr. Munojat Akbarova har bir muolaja oldidan maxsus milkni muzlatuvchi applikatsion gel surtadi, so'ngra zamonaviy kompyuterli mikro-anesteziya qo'llaydi. Natijada ukol ninasining o'zi ham sezilmaydi.",
      ru: "Да, абсолютно! Перед инъекцией на десну наносится обезболивающий гель, затем применяется мягкая современная анестезия. Вы не почувствуете даже самого укола.",
      en: "Yes, completely! A soothing topical numbing gel is applied to the gums before a gentle local micro-anesthesia, ensuring zero discomfort throughout the visit.",
    },
  },
  {
    q: {
      uz: "Homiladorlik yoki emizish davrida tish davolash xavfsizmi?",
      ru: "Безопасно ли лечить зубы во время беременности или грудного вскармливания?",
      en: "Is dental care safe during pregnancy or breastfeeding?",
    },
    a: {
      uz: "Albatta. Dr. Munojat homilador ayollar uchun homilaga mutlaqo ta'sir qilmaydigan, xalqaro FDA ruxsatiga ega xavfsiz anestetik preparatlardan foydalanadi. Homiladorlikning 2-trimestrida tish davolash eng maqbul hisoblanadi.",
      ru: "Да, абсолютно безопасно. Применяются специальные анестетики без адреналина, разрешённые международными протоколами для беременных и кормящих мам.",
      en: "Yes, completely safe. Dr. Munojat utilizes special pregnancy-safe anesthetics without systemic side effects, adhering to international prenatal dental protocols.",
    },
  },
  {
    q: {
      uz: "Old va orqa tishlarga karonka qo'yilganda o'z tishim qattiq charxlanadimi?",
      ru: "Сильно ли обтачиваются зубы при установке коронок на передние и жевательные зубы?",
      en: "Does getting crowns on front and posterior teeth require aggressive shaving?",
    },
    a: {
      uz: "Yo'q! Zamonaviy Germaniya, Avstraliya va Xitoy tsirkoniy karonkalari raqamli CAD/CAM texnologiyasida yasalgani sababli, tish faqat minimal mikron darajasida nozik silliqlanadi. O'z tishingiz maksimal darajada asrab qolinadi va uzoq yillar mustahkam xizmat qiladi.",
      ru: "Нет! Современные коронки из Германии, Австралии и Китая изготавливаются на цифровом оборудовании CAD/CAM с минимальной микро-обработкой эмали. Зуб максимально сохраняется и служит долгие годы.",
      en: "No! Modern zirconia crowns from Germany, Australia, and China are digitally milled with CAD/CAM precision, requiring minimal micro-smoothing so your natural tooth structure is preserved for long-lasting years.",
    },
  },
  {
    q: {
      uz: "Titan tish implantining xizmat muddati va kafolati qanday?",
      ru: "Каков срок службы и гарантия на титановые импланты?",
      en: "What is the lifespan and warranty on titanium dental implants?",
    },
    a: {
      uz: "Titan implantlar inson jag' suyagi bilan biologik to'liq birikib ketadi va to'g'ri gigiyenik parvarish qilinganda uzoq yillar davomida mustahkam xizmat qiladi.",
      ru: "Титановые импланты полностью интегрируются с костной тканью и при правильном уходе надёжно служат долгие годы.",
      en: "Titanium implants biologically fuse with jawbone (osseointegration) and serve reliably for long-term years with standard oral hygiene.",
    },
  },
  {
    q: {
      uz: "Klinikada sterilizatsiya va sanitariya qoidalari qanday ta'minlanadi?",
      ru: "Как обеспечивается стерильность и безопасность в клинике?",
      en: "How are clinical sterilization and hygiene standards maintained?",
    },
    a: {
      uz: "Barcha asboblar Yevropa standarti bo'yicha 3 bosqichli tozalash, ultratovushli dezinfeksiya va yuqori bosimli avtoklavda steril qilinadi. Har bir bemor uchun bir martalik steril to'plam ochiladi.",
      ru: "Все инструменты проходят 3-этапную обработку: ультразвук, дезинфекцию и автоклав B-класса. Для каждой пациентки вскрывается индивидуальный крафт-пакет.",
      en: "All dental instruments undergo 3-stage ultrasonic cleaning, medical chemical disinfection, and high-pressure Class-B autoclaving with single-use sterile pouches.",
    },
  },
  {
    q: {
      uz: "Qanday plomba materiallari qo'llaniladi va qaysi biri yaxshiroq?",
      ru: "Какие материалы для пломб используются и какой лучше выбрать?",
      en: "What filling materials are used and how to choose the best one?",
    },
    a: {
      uz: "Dr. Munojat Akbarova qabulida 4 ta yetakchi davlat materiallari mavjud: Germaniya (3M™ Filtek), Yaponiya (Estelite), Janubiy Koreya (DenFil) va Rossiya (VladMiVa). Tishning holati va joylashuviga qarab shifokor eng mos va uzoq yillar xizmat qiladigan plomba turini tanlab beradi.",
      ru: "В клинике применяются сертифицированные пломбировочные материалы из 4 стран: Германия (3M™ Filtek), Япония (Estelite), Южная Корея (DenFil) и Россия (ВладМиВа). Врач подбирает оптимальный вариант индивидуально под анатомию зуба.",
      en: "We offer certified composite restorations from 4 premier countries: Germany (3M™ Filtek), Japan (Estelite), South Korea (DenFil), and Russia (VladMiVa), individually matched to natural tooth anatomy.",
    },
  },
  {
    q: {
      uz: "Klinikada ayollar va qizlar uchun qanday maxfiy sharoitlar yaratilgan?",
      ru: "Какие условия приватности созданы для женщин и девушек?",
      en: "What privacy measures are provided for women and female patients?",
    },
    a: {
      uz: "Orzu Stoma Denta klinikasida faqat ayollar qabul qilinadi. Shifokor, assistentlar va barcha xodimlar ayollardan iborat. Davolash eshigi yopiq alohida individual xonada 100% begona ko'zlardan xoli tarzda o'tkaziladi.",
      ru: "Приём ведётся исключительно для женщин в изолированном закрытом кабинете. Весь персонал — от главного врача до ассистентов — квалифицированные женщины. Полная конфиденциальность и комфорт.",
      en: "Care is exclusively delivered for women in a completely private, single-patient room by an all-female medical team, ensuring 100% modesty, tranquility, and privacy.",
    },
  },
  {
    q: {
      uz: "Qabulga oldindan yozilish kerakmi va navbat kutish bormi?",
      ru: "Нужно ли записываться заранее и есть ли очереди?",
      en: "Is prior booking required and are there waiting queues?",
    },
    a: {
      uz: "Ha, har bir bemorga to'liq e'tibor qaratilishi va navbatda vaqt yo'qotilmasligi uchun qabul oldindan yozilish asosida olib boriladi. Telefon (+998 94 106-15-55) yoki rasmiy Telegram orqali 1 daqiqada qulay vaqtni band qilishingiz mumkin.",
      ru: "Да, для комфорта каждой пациентки приём ведётся строго по предварительной записи без очередей. Записаться на удобное время можно по телефону (+998 94 106-15-55) или через Telegram.",
      en: "Yes, to ensure dedicated one-on-one doctor attention without waiting in line, appointments are scheduled in advance via phone (+998 94 106-15-55) or Telegram.",
    },
  },
];

const FaqAccordion = () => {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);

  const t = {
    uz: {
      tag: "KO'P SO'RALADIGAN SAVOLLAR",
      title: "Bemorlar Uchun Muhim Ma'lumotlar",
      sub: "Davolanish jarayoni, xavfsizlik va narxlar haqidagi eng ko'p beriladigan savollarga aniq javoblar.",
    },
    ru: {
      tag: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
      title: "Важная Информация для Пациенток",
      sub: "Ответы на самые популярные вопросы о процедурах, безопасности и гарантиях.",
    },
    en: {
      tag: "FREQUENTLY ASKED QUESTIONS",
      title: "Essential Information for Patients",
      sub: "Clear answers to the most common questions regarding treatments, safety, and warranties.",
    },
  }[lang] || {};

  // Generate Google Schema.org FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.q[lang],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a[lang],
      },
    })),
  };

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-white border-t border-slate-100" aria-labelledby="faq-heading">
      
      {/* Schema.org FAQPage Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
            <IconSparkleStar className="w-4 h-4 text-[#930b0b]" />
            <span>{t.tag}</span>
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mt-3 mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 transition-all duration-300 ${
                  isOpen
                    ? "bg-red-50/40 border-red-300 shadow-md"
                    : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className={`font-black text-base sm:text-lg ${isOpen ? "text-[#930b0b]" : "text-slate-900"}`}>
                    {item.q[lang]}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-[#fd1616] text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-red-100/60 pt-4 animate-fade-in-up">
                    <p>{item.a[lang]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqAccordion;
