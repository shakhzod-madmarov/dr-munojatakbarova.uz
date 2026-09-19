import { useLanguage } from "../context/LanguageContext";
import { IconAward, IconGraduationCap, IconSparkleStar, IconInstagram, IconCheckCircle } from "./MedicalIcons";
import { DOCTOR_INFO } from "../constants/doctor";

const credentialsList = [
  {
    title: {
      uz: "Toshkent Davlat Stomatologiya Instituti (Buxoro Filiali) — Bakalavr",
      ru: "Ташкентский Государственный Стоматологический Институт (Бухарский филиал) — Бакалавриат",
      en: "Tashkent State Dental Institute (Bukhara Branch) — Bachelor's Degree",
    },
    org: {
      uz: "Toshkent Davlat Stomatologiya Instituti",
      ru: "Ташкентский Государственный Стоматологический Институт",
      en: "Tashkent State Dental Institute (TSDI)",
    },
    year: `Faoliyat ${DOCTOR_INFO.careerStartYear}-yildan`,
    tag: `BAKALAVR · ${DOCTOR_INFO.careerStartYear}`,
    type: "education",
    desc: {
      uz: "Stomatologiya mutaxassisligi bo'yicha fundamental tibbiy va amaliy bakalavr bosqichini muvaffaqiyatli tamomlagan.",
      ru: "Успешно окончила бакалавриат по направлению общей и клинической стоматологии.",
      en: "Completed clinical bachelor's degree in general and operative dentistry.",
    },
  },
  {
    title: {
      uz: "Andijon Davlat Tibbiyot Instituti — Magistratura",
      ru: "Андижанский Государственный Медицинский Институт — Магистратура",
      en: "Andijan State Medical Institute — Master's Degree",
    },
    org: {
      uz: "Andijon Davlat Tibbiyot Instituti (ADTI)",
      ru: "Андижанский Государственный Медицинский Институт (АГМИ)",
      en: "Andijan State Medical Institute (ASMI)",
    },
    year: "Magistratura",
    tag: "MAGISTRATURA · ADTI",
    type: "education",
    desc: {
      uz: "Stomatologiya sohasida yuqori ixtisoslashtirilgan ilmiy-amaliy magistratura bosqichini a'lo natijalar bilan tamomlagan.",
      ru: "Окончила специализированную магистратуру по углубленной стоматологии и клинической практике.",
      en: "Completed advanced clinical master's degree specialization in dentistry.",
    },
  },
  {
    title: {
      uz: "Rossiya Yetakchi Stomatologiya Maktablarida Malaka Oshirish Kurslari",
      ru: "Курсы Повышения Квалификации Ведущих Стоматологических Центров России",
      en: "Advanced Clinical Endodontics & Restorative Training (Russia)",
    },
    org: {
      uz: "Moskva va Sankt-Peterburg Klinik Markazlari",
      ru: "Клинические Центры Москвы и Санкт-Петербурга",
      en: "Clinical Centers of Moscow & Saint Petersburg",
    },
    year: "Malaka Kursi",
    tag: "MALAKA OSHIRISH · ROSSIYA",
    type: "specialization",
    badgeColor: "bg-red-50 border-red-200 text-red-900",
    desc: {
      uz: "Murakkab ildiz kanallarini zamonaviy mikroskop ostida davolash, zamonaviy endodontiya va estetik restavratsiya protokollari.",
      ru: "Современные протоколы эндодонтического лечения корневых каналов и терапевтической стоматологии под микроскопом.",
      en: "Advanced endodontic root canal protocols and microscopic restorative therapeutic care.",
    },
  },
  {
    title: {
      uz: "Germaniya (3M™) va Yaponiya (Tokuyama) Estetik Restavratsiya Sertifikatlari",
      ru: "Сертификаты по Эстетической Реставрации: Германия (3M™) и Япония (Tokuyama)",
      en: "Aesthetic Restoration Masterclasses: Germany (3M™) & Japan (Tokuyama)",
    },
    org: {
      uz: "3M ESPE Germany & Tokuyama Dental Japan",
      ru: "3M ESPE Германия и Tokuyama Dental Япония",
      en: "3M ESPE Germany & Tokuyama Dental Japan",
    },
    year: "Xalqaro Sertifikat",
    tag: "GERMANIYA & YAPONIYA",
    type: "specialization",
    badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-900",
    desc: {
      uz: "Germaniyaning 3M nano-kompozitlari hamda Yaponiyaning yuqori aniqlikdagi optik fotopolimerlari bilan tishlarni badiiy tiklash.",
      ru: "Художественная реставрация зубов немецкими нанокомпозитами 3M и японскими материалами Tokuyama Dental.",
      en: "Artistic direct tooth bonding using German 3M nano-hybrid composites and Japanese Tokuyama optical resins.",
    },
  },
  {
    title: {
      uz: "Koreya Respublikasida Xalqaro Implantologiya Malaka Oshirish Kursi",
      ru: "Международная Стажировка по Дентальной Имплантации в Южной Корее",
      en: "Advanced Dental Implantology Training in South Korea (2025)",
    },
    org: {
      uz: "Koreya Respublikasi (Janubiy Koreya) Tibbiyot Markazi",
      ru: "Медицинский Центр Имплантологии, Республика Корея",
      en: "Advanced Implantology Center, Republic of Korea",
    },
    year: "2025-yil",
    tag: "XALQARO MALAKA · KOREYA 2025",
    type: "specialization",
    badgeColor: "bg-blue-50 border-blue-200 text-blue-900",
    desc: {
      uz: "2025-yilda Janubiy Koreyada zamonaviy biotitan implantlar, suyak to'qimasi augmentatsiyasi va xalqaro mikrojarrohlik protokollari bo'yicha chuqur amaliy malaka oshirgan.",
      ru: "В 2025 году прошла международную стажировку в Южной Корее по прогрессивной дентальной имплантации и костной пластике.",
      en: "Advanced clinical training in South Korea (2025) covering bio-titanium implantology, bone grafting, and micro-surgery.",
    },
  },
  {
    title: {
      uz: "“Eng Yaxshi Ayol Stomatologi – 2025” Nominatsiyasi G'olibi",
      ru: "Победитель Номинации «Лучший Женский Стоматолог – 2025»",
      en: "Winner: «Best Female Dentist of the Year – 2025» Award",
    },
    org: {
      uz: "Rasmiy Kasbiy E'tirof & Mukofot",
      ru: "Официальное Профессиональное Признание",
      en: "Official Healthcare Excellence Award",
    },
    year: "2025 G'olibi",
    tag: "YIL G'OLIBI · 2025",
    type: "award",
    reelUrl: "https://www.instagram.com/reel/DO_U1fijfO8/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    badgeColor: "bg-amber-50 border-amber-300 text-amber-950",
    desc: {
      uz: "2025-yilda xotin-qizlar salomatligi va estetik tabassumini tiklashdagi yuksak xizmatlari hamda bemorlar e'tirofi uchun 'Eng Yaxshi Ayol Stomatologi' unvoni bilan taqdirlangan.",
      ru: "В 2025 году удостоена высшей профессиональной награды «Лучший Женский Стоматолог» за безупречное мастерство и заботу о пациентках.",
      en: "Honored with the prestigious 'Best Female Dentist 2025' award in recognition of outstanding clinical excellence and patient care.",
    },
  },
];

const CertificatesShowcase = () => {
  const { lang } = useLanguage();

  const t = {
    uz: {
      tag: "RASMIY TA'LIM VA XALQARO MALAKA",
      title: "Tasdiqlangan Diplomlar, Koreya Malakasi va Mukofotlar",
      sub: `Dr. Munojat Akbarova ${DOCTOR_INFO.careerStartYear}-yildan buyon doimiy ravishda o'z bilimini oshirib, O'zbekiston va xalqaro miqyosda e'tirof etilgan yetakchi ayol shifokor.`,
      watchReel: "Taqdirlash videosini ko'rish (Instagram)",
      verifiedBadge: "Rasman Tasdiqlangan Hujjat",
    },
    ru: {
      tag: "ОФИЦИАЛЬНОЕ ОБРАЗОВАНИЕ И СТАЖИРОВКИ",
      title: "Дипломы, Стажировка в Корее и Награды",
      sub: `Д-р Мунаджат Акбарова непрерывно совершенствует мастерство с ${DOCTOR_INFO.careerStartYear} года, обучаясь по передовым протоколам в Узбекистане и за рубежом.`,
      watchReel: "Смотреть видео награждения (Instagram)",
      verifiedBadge: "Официально Подтверждено",
    },
    en: {
      tag: "OFFICIAL EDUCATION & GLOBAL CREDENTIALS",
      title: "Degrees, South Korea Training & 2025 Award",
      sub: `Dr. Munojat Akbarova has continuously advanced her clinical excellence since ${DOCTOR_INFO.careerStartYear} across Uzbekistan and leading international centers.`,
      watchReel: "Watch Award Ceremony (Instagram)",
      verifiedBadge: "Officially Verified Credential",
    },
  }[lang] || {};

  return (
    <section className="py-10 sm:py-14 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/80 border border-red-200 shadow-2xs">
            <IconAward className="w-4 h-4 text-[#930b0b]" />
            <span>{t.tag}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {t.sub}
          </p>
        </div>

        {/* 4 Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {credentialsList.map((c, idx) => {
            const isAward = c.type === "award";
            const isKorea = c.tag.includes("KOREYA");

            return (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-8 border-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isAward
                    ? "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 border-amber-300 shadow-md hover:shadow-xl hover:border-amber-400"
                    : isKorea
                    ? "bg-gradient-to-br from-blue-50/60 via-white to-sky-50/40 border-blue-200 shadow-sm hover:shadow-lg hover:border-blue-300"
                    : "bg-white border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${c.badgeColor || "bg-red-50 border-red-200 text-[#930b0b]"}`}>
                      {c.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{c.year}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform ${
                      isAward
                        ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950 font-black text-xl"
                        : isKorea
                        ? "bg-blue-600 text-white"
                        : "bg-gradient-to-br from-[#930b0b] to-[#fd1616] text-white"
                    }`}>
                      {isAward ? (
                        <IconAward className="w-6 h-6 text-amber-950" />
                      ) : (
                        <IconGraduationCap className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{c.org[lang] || c.org.uz}</p>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <IconCheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>{t.verifiedBadge}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-slate-900 mb-2.5 group-hover:text-[#930b0b] transition-colors leading-snug">
                    {c.title[lang]}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {c.desc[lang]}
                  </p>
                </div>

                {/* Optional Action Button for Award Reel */}
                {c.reelUrl && (
                  <div className="pt-5 mt-5 border-t border-amber-200/80">
                    <a
                      href={c.reelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e1306c] to-[#c13584] hover:brightness-110 text-white font-bold text-xs shadow-md shadow-pink-600/20 active:scale-95 transition-all"
                    >
                      <IconInstagram className="w-4 h-4 text-white" />
                      <span>{t.watchReel}</span>
                      <span>→</span>
                    </a>
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

export default CertificatesShowcase;

