import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import Seo from "../components/Seo";
import CertificatesShowcase from "../components/CertificatesShowcase";
import InlineBookingSection from "../components/InlineBookingSection";
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

const About = () => {
  const { lang } = useLanguage();
  const years = getYearsOfExperience();
  const start = DOCTOR_INFO.careerStartYear;

  const handleBookingClick = () => {
    const el = document.getElementById("uchrashuv-vaqti");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const t = {
    uz: {
      topTag: `Oliy Toifali Shifokor-Stomatolog · ${years} Yillik Tajriba`,
      heading: "Dr. Munojat Akbarova",
      specialty: "Shifokor-Stomatolog, Terapevt, Ortoped va Implantolog",
      credentials: [
        {
          tag: "Terapevtik stomatologiya",
          title: "Tish davolash va plomba",
          desc: "O'tkir tish og'rig'ini bartaraf etish, kanal davolash va zamonaviy estetik plombalar.",
          icon: <IconTherapeuticTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Ortopedik stomatologiya",
          title: "Old va orqa tish karonkalari",
          desc: "Tsirkoniy hamda keramik karonkalar yordamida tish qatorini uzoq muddatga tiklash.",
          icon: <IconVeneerTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Implantologiya",
          title: "Dental implantatsiya",
          desc: "Janubiy Koreya klinik protokollari asosida biotitan implantlarni og'riqsiz o'rnatish.",
          icon: <IconDentalImplant className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Diagnostika",
          title: "Ko'rik va individual reja",
          desc: "Aniq rentgen diagnostikasi, shaffof maslahat va har bir bemor uchun shaxsiy davolash rejasi.",
          icon: <IconCheckCircle className="w-5 h-5 text-emerald-600" />,
        },
      ],
      bio1: `Munojat Akbarova — ${start}-yildan buyon stomatologiya sohasida faoliyat yuritib kelayotgan, ${years} yillik klinik tajribaga ega oliy toifali mutaxassis. Toshkent Davlat Stomatologiya Instituti Buxoro filiali bakalavri hamda Andijon Davlat Tibbiyot Instituti magistri.`,
      bio2: "Shifokor tish og'rig'ini zudlik bilan qoldirish, badiiy restavratsiya, tsirkoniy karonkalar va dental implantatsiya yo'nalishlarida xizmat ko'rsatadi. 2025-yilda «The Best of Uzbekistan» tanlovida «Eng Yaxshi Ayol Stomatologi» unvoni bilan taqdirlangan.",
      bio3: "Klinikada ayollar va qizlar uchun alohida yopiq xona, faqat ayol mutaxassislardan iborat jamoa va 100% og'riqsiz davolash muhiti yaratilgan.",
      awardTag: "Yil e'tirofi · 2025",
      awardTitle: "«Eng Yaxshi Ayol Stomatologi – 2025» G'olibi",
      awardDesc: "Bemorlarning ishonchi, yuqori klinik natijalar va professional xizmat e'tirofi.",
      awardBtn: "Taqdirlash videosini ko'rish (Instagram) →",
      callBtn: "Uchrashuv vaqtini tanlash ↓",
      pillars: [
        {
          title: "Faqat Ayol Mutaxassislar",
          desc: "Bosh shifokor, hamshiralar va assistentlar faqat malakali ayol mutaxassislardan iborat.",
          icon: <IconPrivacyLock className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Ayollar jamoasi",
        },
        {
          title: "Alohida Yopiq Kabinet",
          desc: "Yakka tartibdagi sokin muolaja xonasi — begonalarning kirishi taqiqlangan.",
          icon: <IconShieldCheck className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Shaxsiy kabinet",
        },
        {
          title: "Og'riqsiz va Muloyim Muolaja",
          desc: "Zamonaviy anesteziya va har bir bemorga alohida e'tibor bilan sokin davolash.",
          icon: <IconSparkleStar className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Komfort standart",
        },
      ],
    },
    ru: {
      topTag: `Врач-Стоматолог Высшей Категории · ${years} Лет Опыта`,
      heading: "Д-р Мунаджат Акбарова",
      specialty: "Стоматолог-Терапевт, Ортопед, Хирург и Имплантолог",
      credentials: [
        {
          tag: "Терапевтическая стоматология",
          title: "Лечение зубов и пломбирование",
          desc: "Бережное снятие острой боли, эндодонтическое лечение каналов и эстетические пломбы.",
          icon: <IconTherapeuticTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Ортопедическая стоматология",
          title: "Циркониевые и керамические коронки",
          desc: "Надёжное восстановление передних и жевательных зубов современными коронками.",
          icon: <IconVeneerTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Имплантология",
          title: "Дентальная имплантация",
          desc: "Установка титановых имплантов по клиническим протоколам Южной Кореи без боли.",
          icon: <IconDentalImplant className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Диагностика",
          title: "Осмотр и план лечения",
          desc: "Точная рентген-диагностика, подробная консультация и индивидуальный план лечения.",
          icon: <IconCheckCircle className="w-5 h-5 text-emerald-600" />,
        },
      ],
      bio1: `Мунаджат Акбарова — дипломированный врач-стоматолог с ${getRussianYearsAdjective(years)} стажем клинической практики (с ${start} года). Выпускница бакалавриата ТГСИ и магистратуры АГМИ.`,
      bio2: "Специализируется на терапевтическом лечении, художественной реставрации, протезировании циркониевыми коронками и дентальной имплантации. Победитель премии «The Best of Uzbekistan – 2025» в номинации «Лучший Женский Стоматолог».",
      bio3: "Для женщин предусмотрен отдельный закрытый кабинет и приём исключительно женским медицинским персоналом.",
      awardTag: "Признание года · 2025",
      awardTitle: "Победитель номинации «Лучший Женский Стоматолог – 2025»",
      awardDesc: "Награда за профессионализм, клинические результаты и доверие пациенток.",
      awardBtn: "Смотреть церемонию (Instagram) →",
      callBtn: "Выбрать время приёма ↓",
      pillars: [
        {
          title: "Только Женский Персонал",
          desc: "Врач, ассистенты и медперсонал — исключительно квалифицированные женщины.",
          icon: <IconPrivacyLock className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Женский коллектив",
        },
        {
          title: "Индивидуальный Кабинет",
          desc: "Приём один на один в закрытом кабинете в атмосфере спокойствия и уюта.",
          icon: <IconShieldCheck className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Личный кабинет",
        },
        {
          title: "Безболезненное Лечение",
          desc: "Деликатное отношение и современная анестезия без стресса и дискомфорта.",
          icon: <IconSparkleStar className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Стандарт комфорта",
        },
      ],
    },
    en: {
      topTag: `Senior Dental Specialist · ${years}+ Years Experience`,
      heading: "Dr. Munojat Akbarova",
      specialty: "Restorative Dentist, Prosthodontist & Implantologist",
      credentials: [
        {
          tag: "Restorative Dentistry",
          title: "Tooth Care & Aesthetic Fillings",
          desc: "Immediate pain relief, gentle root canal therapy, and durable composite restorations.",
          icon: <IconTherapeuticTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Prosthodontics",
          title: "Zirconia & Ceramic Crowns",
          desc: "Long-lasting restoration for front and posterior teeth with precision-crafted crowns.",
          icon: <IconVeneerTooth className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Implantology",
          title: "Dental Implants",
          desc: "South Korean fellowship-trained placement of biocompatible titanium implants.",
          icon: <IconDentalImplant className="w-5 h-5 text-[#930b0b]" />,
        },
        {
          tag: "Diagnostics",
          title: "Comprehensive Consultation",
          desc: "Digital radiography, thorough clinical evaluation, and transparent treatment planning.",
          icon: <IconCheckCircle className="w-5 h-5 text-emerald-600" />,
        },
      ],
      bio1: `Dr. Munojat Akbarova is a senior dental specialist with over ${years} years of clinical practice (since ${start}). She graduated from TSDI and completed her master's residency at ASMI.`,
      bio2: "Her practice encompasses restorative dentistry, zirconia and ceramic prosthodontics, and dental implantology. Honored as Uzbekistan's «Best Female Dentist of 2025» at The Best of Uzbekistan ceremony.",
      bio3: "The clinic offers a private single-patient suite and an all-female clinical team dedicated to calm, pain-free care.",
      awardTag: "2025 Recognition",
      awardTitle: "Winner: «Best Female Dentist of 2025» Award",
      awardDesc: "Recognized for clinical excellence and dedication to women's dental health.",
      awardBtn: "Watch Ceremony (Instagram) →",
      callBtn: "Select Appointment Time ↓",
      pillars: [
        {
          title: "All-Female Clinical Team",
          desc: "The doctor, nurses, and assistants are all qualified female professionals.",
          icon: <IconPrivacyLock className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Female Team",
        },
        {
          title: "Private Treatment Suite",
          desc: "One-on-one care in a dedicated private room with complete peace of mind.",
          icon: <IconShieldCheck className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Private Suite",
        },
        {
          title: "Gentle, Pain-Free Care",
          desc: "Modern anesthesia and a calm, attentive approach for every patient.",
          icon: <IconSparkleStar className="w-5 h-5 text-[#930b0b]" />,
          sticker: "Comfort Standard",
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
      "Periodontics",
    ],
    availableService: [
      { "@type": "MedicalProcedure", name: "Tish og'rig'ini zudlik bilan qoldirish" },
      { "@type": "MedicalProcedure", name: "Zamonaviy 3M kompozit plomba" },
      { "@type": "MedicalProcedure", name: "Old va orqa tish karonkalari (Tsirkoniy)" },
      { "@type": "MedicalProcedure", name: "Tsirkoniy karonkalar" },
      { "@type": "MedicalProcedure", name: "Dental implantatsiya" },
      { "@type": "MedicalProcedure", name: "Og'riqsiz tish olish" },
      { "@type": "MedicalProcedure", name: "Profilaktik ko'rik va diagnostika" },
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
    <div className="pt-24 sm:pt-28 bg-slate-50/60">
      <Seo page="about" path="/about" schemaJson={physicianSchema} />

      {/* ─── 1. DOCTOR PROFILE CARD ─────────────────────────────────────── */}
      <section className="pb-8 sm:pb-10">
        <article
          itemScope
          itemType="https://schema.org/Physician"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <meta itemProp="name" content="Dr. Munojat Akbarova" />
          <meta
            itemProp="jobTitle"
            content="Oliy Toifali Shifokor-Stomatolog, Terapevt, Ortoped va Implantolog"
          />
          <meta itemProp="telephone" content="+998941061555" />

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Doctor Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <figure className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-50 m-0">
                <img
                  src={assets.drMunojatLoupes}
                  alt="Dr. Munojat Akbarova — Andijondagi yetakchi ayol stomatolog"
                  className="w-full h-full object-cover object-[center_20%] select-none"
                  loading="eager"
                  fetchPriority="high"
                  width="682"
                  height="1024"
                  itemProp="image"
                />
              </figure>
            </div>

            {/* Right Column: Classic Credentials, Bio, Award & CTA */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Simple Classic Experience Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80">
                <IconClock className="w-3.5 h-3.5 text-[#930b0b]" />
                <span>{t.topTag}</span>
              </div>

              {/* Doctor Headings */}
              <div className="space-y-1">
                <h1
                  itemProp="name"
                  className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
                >
                  {t.heading}
                </h1>
                <p
                  itemProp="medicalSpecialty"
                  className="text-sm sm:text-base font-medium text-[#930b0b]"
                >
                  {t.specialty}
                </p>
              </div>

              {/* 4 Classic Specialty Cards (Simple, Clean, Professional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {t.credentials.map((c, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <div className="text-left space-y-0.5">
                      <span className="text-[11px] font-medium text-[#930b0b] block">
                        {c.tag}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Professional Narrative */}
              <div
                itemProp="description"
                className="space-y-2 text-slate-700 text-sm leading-relaxed font-normal pt-1"
              >
                <p>{t.bio1}</p>
                <p>{t.bio2}</p>
                <p>{t.bio3}</p>
              </div>

              {/* Classic Award Box */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <IconAward className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-semibold text-amber-800">
                    {t.awardTag}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#930b0b] hover:underline"
                  >
                    <IconInstagram className="w-3.5 h-3.5" />
                    <span>{t.awardBtn}</span>
                  </a>
                </div>
              </div>

              {/* Scroll to Inline Booking Button */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#930b0b] hover:bg-[#7a0909] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <IconClock className="w-4 h-4 text-white" />
                  <span>{t.callBtn}</span>
                </button>
                <a
                  href={`tel:${DOCTOR_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  <IconPhone className="w-4 h-4 text-[#930b0b]" />
                  <span>{DOCTOR_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* ─── 2. INLINE APPOINTMENT TIME PICKER (DENTAHOUSE STYLE, NO POPUP) ── */}
      <section className="pb-10 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InlineBookingSection sectionId="uchrashuv-vaqti" />
        </div>
      </section>

      {/* ─── 3. 3 CLASSIC PRIVACY PILLARS ───────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {t.pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs">
                      {p.icon}
                    </div>
                    <span className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-full">
                      {p.sticker}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. VERIFIED CERTIFICATES & DIPLOMAS SHOWCASE ───────────────── */}
      <CertificatesShowcase />
    </div>
  );
};

export default About;
