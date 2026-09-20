import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import Seo from "../components/Seo";
import CertificatesShowcase from "../components/CertificatesShowcase";
import {
  DOCTOR_INFO,
  getYearsOfExperience,
  getRussianYearsAdjective,
} from "../constants/doctor";
import {
  IconPrivacyLock,
  IconShieldCheck,
  IconSparkleStar,
  IconPhone,
  IconInstagram,
  IconAward,
  IconClock,
  IconTherapeuticTooth,
  IconVeneerTooth,
  IconDentalImplant,
  IconCheckCircle,
} from "../components/MedicalIcons";

const About = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const years = getYearsOfExperience();
  const start = DOCTOR_INFO.careerStartYear;

  const handleBookingClick = () => {
    if (typeof onOpenBooking === "function") {
      onOpenBooking();
    } else {
      window.location.href = "tel:+998941061555";
    }
  };

  const t = {
    uz: {
      topTag: `${years}+ YILLIK TAJRIBA · TISH DAVOLASH, PLOMBA, KARONKALAR, IMPLANT`,
      heading: "Dr. Munojat Akbarova",
      specialty: "Oliy Toifali Shifokor-Stomatolog, Terapevt, Ortoped va Implantolog",
      credentials: [
        {
          tag: "GERMANIYA STANDARTI",
          title: "Tish Davolash & 4 Davlat Plombalari",
          desc: "Tish og'rig'ini zudlik bilan qoldirish, Germaniya (3M™), Yaponiya (Estelite), Janubiy Koreya (DenFil) va Rossiya plombalari bilan 100% og'riqsiz davolash.",
          icon: <IconTherapeuticTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "XITOY · GERMANIYA · AVSTRALIYA",
          title: "Old va Orqa Tish Karonkalari",
          desc: "Old va orqa tishlar uchun Germaniya, Avstraliya va Xitoyning tsirkoniy hamda keramik karonkalari bilan uzoq yillik sifatli tiklash.",
          icon: <IconVeneerTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "JANUBIY KOREYA MALAKASI",
          title: "Biotitan Implantologiya (2025)",
          desc: "Janubiy Koreya (Seul) xalqaro sertifikati: Osstem va Straumann biotitan implantlarini og'riqsiz o'rnatish.",
          icon: <IconDentalImplant className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "YAPONIYA & ROSSIYA",
          title: "Aniq Diagnostika & Terapiya",
          desc: "Yaponiya optik texnologiyasi va Rossiya yetakchi stomatologiya maktablari asosidagi chuqur tashxis.",
          icon: <IconCheckCircle className="w-5 h-5 text-emerald-600" />,
        },
      ],
      bio1: `Munojat Akbarova — ${start}-yildan buyon stomatologiya sohasida faoliyat yuritib kelayotgan, ${years} yillik boy klinik tajribaga ega oliy toifali mutaxassis. Toshkent Davlat Stomatologiya Instituti Buxoro filiali bakalavri hamda Andijon Davlat Tibbiyot Instituti magistri.`,
      bio2: "Shifokor Germaniya (3M™ nano-kompozitlari, tsirkoniy), Janubiy Koreya (Osstem implantologiyasi), Avstraliya, Yaponiya hamda Xitoy yetakchi materiallari asosida xizmat ko'rsatadi: o'tkir tish og'rig'ini zudlik bilan qoldirish, nano-plomba, old va orqa tish karonkalari va implantatsiya. 2025-yilda «The Best of Uzbekistan» tanlovida «Eng Yaxshi Ayol Stomatologi» unvoni bilan taqdirlangan.",
      bio3: "Klinikada ayollar va qizlar uchun to'liq maxfiy alohida yopiq xona, faqat ayol mutaxassislardan iborat samimiy jamoa va 100% og'riqsiz davolash kafolatlanadi.",
      awardTag: "YILNING ENG YAXSHI SHIFOKORI",
      awardTitle: "“Eng Yaxshi Ayol Stomatologi – 2025” G'olibi",
      awardDesc: "Bemorlarning mehrini qozongan yuksak natijalar, Koreya malakasi va professional xizmat e’tirofi.",
      awardBtn: "Taqdirlash videosini ko'rish (Instagram Reel) →",
      callBtn: "Qabulga Yozilish: +998 (94) 106-15-55",
      pillars: [
        {
          title: "Faqat Ayol Mutaxassislar",
          desc: "Bosh shifokor, hamshiralar va barcha assistentlar faqat yuqori malakali ayollardan iborat.",
          icon: <IconPrivacyLock className="w-5 h-5 text-white" />,
          sticker: "100% Ayollar Jamoasi",
        },
        {
          title: "Alohida Yopiq Xona",
          desc: "Yakka tartibdagi muolaja xonasi: begonalar va erkaklarning kirishi mutlaqo taqiqlangan.",
          icon: <IconShieldCheck className="w-5 h-5 text-white" />,
          sticker: "Shaxsiy Kabinet",
        },
        {
          title: "100% Og'riqsiz & Muloyim",
          desc: "Har bir bemorga alohida sabr va mehr ajratiladi, qo'rquv va hayajon muloyimlik bilan yengiladi.",
          icon: <IconSparkleStar className="w-5 h-5 text-white" />,
          sticker: "0% Og'riq & Stress",
        },
      ],
    },
    ru: {
      topTag: `${years}+ ЛЕТ ОПЫТА · ЛЕЧЕНИЕ ЗУБОВ, ПЛОМБА, КОРОНКИ, ИМПЛАНТЫ`,
      heading: "Д-р Мунаджат Акбарова",
      specialty: "Ведущий Стоматолог-Терапевт, Ортопед, Хирург и Имплантолог",
      credentials: [
        {
          tag: "ТЕРАПИЯ И ПЛОМБА",
          title: "Лечение Зубов и 4 Вида Пломб",
          desc: "Снятие острой зубной боли, лечение каналов и сертифицированные пломбы из Германии (3M™), Японии (Estelite), Южной Кореи и России без боли.",
          icon: <IconTherapeuticTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "КИТАЙ · ГЕРМАНИЯ · АВСТРАЛИЯ",
          title: "Коронки на Передние и Жевательные Зубы",
          desc: "Качественные циркониевые и керамические коронки из Германии, Австралии и Китая на долгие годы.",
          icon: <IconVeneerTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "ИМПЛАНТАЦИЯ",
          title: "Стажировка в Южной Корее",
          desc: "Дентальная имплантация Osstem и Straumann по передовым протоколам Сеула без боли и осложнений.",
          icon: <IconDentalImplant className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "ДИАГНОСТИКА",
          title: "Проф. Осмотр и Диагностика",
          desc: "Точная радиовизиография, консультация и индивидуальный план бережного лечения зубов.",
          icon: <IconCheckCircle className="w-5 h-5 text-emerald-600" />,
        },
      ],
      bio1: `Мунаджат Акбарова — дипломированный врач-стоматолог с ${getRussianYearsAdjective(years)} стажем безупречной клинической практики (с ${start} года). Выпускница бакалавриата ТГСИ и магистратуры АГМИ.`,
      bio2: "Врач применяет международные стандарты Германии (3M™, цирконий), Южной Кореи (импланты Osstem), Австралии, Японии и Китая: экстренное снятие боли, пломбы из 4 стран, коронки на передние и жевательные зубы и имплантация на долгие годы. Победитель республиканской премии «The Best of Uzbekistan – 2025» в номинации «Лучший Женский Стоматолог».",
      bio3: "Для женщин создан индивидуальный закрытый кабинет, прием ведет исключительно женский персонал с гарантией 100% безболезненного лечения.",
      awardTag: "ЛУЧШИЙ ВРАЧ ГОДА",
      awardTitle: "Победитель номинации «Лучший Женский Стоматолог – 2025»",
      awardDesc: "Высшая награда за безупречный профессионализм и признание тысяч благодарных пациенток.",
      awardBtn: "Смотреть церемонию награждения (Instagram Reel) →",
      callBtn: "Записаться на Приём: +998 (94) 106-15-55",
      pillars: [
        {
          title: "Только Женский Персонал",
          desc: "Врач, ассистенты и медперсонал — исключительно квалифицированные женщины.",
          icon: <IconPrivacyLock className="w-5 h-5 text-white" />,
          sticker: "100% Женский Состав",
        },
        {
          title: "Индивидуальный Закрытый Кабинет",
          desc: "Приём один на один в закрытом кабинете в атмосфере полной безопасности.",
          icon: <IconShieldCheck className="w-5 h-5 text-white" />,
          sticker: "Полная Приватность",
        },
        {
          title: "100% Без Боли и Стресса",
          desc: "Деликатное отношение, бережная анестезия и полное снятие стоматологического страха.",
          icon: <IconSparkleStar className="w-5 h-5 text-white" />,
          sticker: "0% Боли и Стресса",
        },
      ],
    },
    en: {
      topTag: `${years}+ YRS EXPERIENCE · TOOTH PAIN RELIEF, FILLINGS, CROWNS & IMPLANTS`,
      heading: "Dr. Munojat Akbarova",
      specialty: "Leading Dental Specialist: Restorative Fillings, Veneers, Crowns & Implants",
      credentials: [
        {
          tag: "FILLINGS & CARE",
          title: "Tooth Pain Relief & Fillings",
          desc: "Instant relief of acute tooth pain, gentle root canals, and lifelike German 3M™ nano-fillings.",
          icon: <IconTherapeuticTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "CHINA · GERMANY · AUSTRALIA",
          title: "Front & Posterior Dental Crowns",
          desc: "Durable zirconia and ceramic crowns from Germany, Australia, and China lasting for years.",
          icon: <IconVeneerTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "IMPLANT SURGERY",
          title: "South Korea Fellowship",
          desc: "Precision Osstem and Straumann titanium implant placement guided by advanced Seoul protocols.",
          icon: <IconDentalImplant className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "CHECK-UP",
          title: "Dental Check-up & Diagnosis",
          desc: "Low-dose digital radiography, detailed examination, and transparent treatment planning.",
          icon: <IconCheckCircle className="w-5 h-5 text-emerald-600" />,
        },
      ],
      bio1: `Dr. Munojat Akbarova is an acclaimed dental surgeon with over ${years} years of comprehensive clinical practice (practicing since ${start}). Graduated from TSDI and completed residency at ASMI.`,
      bio2: "Providing full-spectrum dentistry: acute tooth pain care, certified fillings from 4 nations, German, Australian, and Chinese crowns for front and posterior teeth, and dental implants lasting for years. Honored as Uzbekistan's «Best Female Dentist of 2025» at The Best of Uzbekistan ceremony.",
      bio3: "Her practice provides a female-exclusive private suite, an all-female medical team, and guaranteed 100% pain-free treatment.",
      awardTag: "DOCTOR OF THE YEAR",
      awardTitle: "Winner: «Best Female Dentist of 2025» Award",
      awardDesc: "Honored for clinical excellence, pioneering South Korean surgical protocols, and dedication to women's oral health.",
      awardBtn: "Watch Award Ceremony (Instagram Reel) →",
      callBtn: "Book Appointment: +998 (94) 106-15-55",
      pillars: [
        {
          title: "All-Female Clinical Team",
          desc: "The doctor, nurses, and assistants are all qualified women.",
          icon: <IconPrivacyLock className="w-5 h-5 text-white" />,
          sticker: "100% Female Team",
        },
        {
          title: "Private Single-Patient Room",
          desc: "Individual treatment suite with zero access to male observers.",
          icon: <IconShieldCheck className="w-5 h-5 text-white" />,
          sticker: "Total Privacy",
        },
        {
          title: "100% Pain-Free Care",
          desc: "Empathetic approach, eliminating anxiety with soothing gentle care.",
          icon: <IconSparkleStar className="w-5 h-5 text-white" />,
          sticker: "Zero Pain",
        },
      ],
    },
  }[lang] || {};

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "Physician"],
    "@id": "https://drmunojat.uz/about#doctor",
    name: "Dr. Munojat Akbarova",
    alternateName: "Munojat Akbarova",
    image: "https://drmunojat.uz/dr_munojat_portrait.webp",
    jobTitle: "Oliy Toifali Shifokor-Stomatolog, Terapevt, Ortoped va Implantolog",
    telephone: "+998941061555",
    url: "https://drmunojat.uz/about",
    award: "The Best of Uzbekistan 2025 - Eng Yaxshi Ayol Stomatologi",
    medicalSpecialty: [
      "Conservative Dentistry",
      "Endodontics",
      "Prosthodontics",
      "Dental Implantology",
      "Oral Surgery",
      "Cosmetic Dentistry",
      "Periodontics"
    ],
    availableService: [
      { "@type": "MedicalProcedure", "name": "Tish og'rig'ini zudlik bilan qoldirish" },
      { "@type": "MedicalProcedure", "name": "Zamonaviy 3M kompozit plomba" },
      { "@type": "MedicalProcedure", "name": "Old va orqa tish karonkalari (Tsirkoniy)" },
      { "@type": "MedicalProcedure", "name": "Tsirkoniy karonkalar" },
      { "@type": "MedicalProcedure", "name": "Dental implantatsiya" },
      { "@type": "MedicalProcedure", "name": "Og'riqsiz tish olish" },
      { "@type": "MedicalProcedure", "name": "Profilaktik ko'rik va diagnostika" }
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Toshkent Davlat Stomatologiya Instituti Buxoro Filiali",
      },
      {
        "@type": "EducationalOrganization",
        name: "Andijon Davlat Tibbiyot Instituti",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Janubiy Koreya Dental Implantologiya Xalqaro Malaka Sertifikati (2025)",
      },
    ],
    worksFor: {
      "@type": "Dentist",
      name: "Orzu Stoma Denta",
      telephone: "+998941061555",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Andijon",
        addressRegion: "Andijon viloyati",
        addressCountry: "UZ",
      },
    },
  };

  return (
    <div className="pt-24 sm:pt-28 bg-white">
      <Seo
        page="about"
        path="/about"
        schemaJson={physicianSchema}
      />

      {/* ─── 1. DOCTOR PROFILE & 4 TREATMENT STICKERS (NO TEXTS ON IMAGE) ── */}
      <section className="pb-8 sm:pb-12">
        <article
          itemScope
          itemType="https://schema.org/Physician"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <meta itemProp="name" content="Dr. Munojat Akbarova" />
          <meta itemProp="jobTitle" content="Oliy Toifali Shifokor-Stomatolog, Terapevt, Ortoped va Implantolog" />
          <meta itemProp="telephone" content="+998941061555" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Authentic Doctor Portrait — 100% CLEAN, ZERO TEXTS ON IMAGE */}
            <div className="lg:col-span-5 flex justify-center">
              <figure className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 m-0">
                <img
                  src={assets.drMunojatPortrait34}
                  alt="Dr. Munojat Akbarova — Andijondagi yetakchi ayol stomatolog"
                  className="w-full h-full object-cover object-[center_15%] select-none"
                  loading="eager"
                  fetchPriority="high"
                  width="682"
                  height="910"
                  itemProp="image"
                />
              </figure>
            </div>

            {/* Right Column: Headings, 4 Clinical Treatment Stickers, Bio, Award Box & Action */}
            <div className="lg:col-span-7 space-y-4 text-left">
              
              {/* Top Experience Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                <IconClock className="w-3.5 h-3.5 text-rose-600" />
                <span>{t.topTag}</span>
              </div>

              {/* Doctor Headings */}
              <div className="space-y-1">
                <h1 itemProp="name" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  {t.heading}
                </h1>
                <p itemProp="medicalSpecialty" className="text-sm sm:text-base font-bold text-[#930b0b]">
                  {t.specialty}
                </p>
              </div>

              {/* 4 Clinical Treatment Stickers (Grid 2x2: Plomba, Vinir & Karonka, Implant, Ko'rik) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {t.credentials.map((c, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-red-200 transition-all flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                      {c.icon}
                    </div>
                    <div className="text-left space-y-0.5">
                      <span className="text-[9.5px] font-black uppercase tracking-wider text-[#930b0b] bg-red-50 border border-red-200/60 px-2 py-0.2 rounded-md inline-block">
                        {c.tag}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed font-normal">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Professional Narrative */}
              <div itemProp="description" className="space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-1">
                <p>{t.bio1}</p>
                <p>{t.bio2}</p>
                <p>{t.bio3}</p>
              </div>

              {/* Award Box (Matching user preferences) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-300/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <IconAward className="w-4 h-4 text-amber-700" />
                  <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
                    {t.awardTag}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {t.awardTitle}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.awardDesc}
                </p>
                <div className="pt-1">
                  <a
                    href="https://www.instagram.com/reel/DO_U1fijfO8/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#e1306c] to-[#c13584] hover:brightness-110 text-white font-bold text-xs shadow-sm transition-all active:scale-95 group"
                  >
                    <IconInstagram className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span>{t.awardBtn}</span>
                  </a>
                </div>
              </div>

              {/* Red Call / Booking Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/20 active:scale-95 transition-all cursor-pointer"
                >
                  <IconPhone className="w-4 h-4 text-white" />
                  <span>{t.callBtn}</span>
                </button>
              </div>

            </div>

          </div>
        </article>
      </section>

      {/* ─── 2. 3 PRIVACY PILLARS WITH IMPROVED STICKERS & BALANCED SPACING ─ */}
      <section className="py-10 sm:py-12 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {t.pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-red-200 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#930b0b] to-[#fd1616] text-white flex items-center justify-center shadow-md shadow-red-950/20">
                      {p.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#930b0b] bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-full">
                      {p.sticker}
                    </span>
                  </div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. VERIFIED CERTIFICATES & DIPLOMAS SHOWCASE ─────────────────── */}
      <CertificatesShowcase />
    </div>
  );
};

export default About;
