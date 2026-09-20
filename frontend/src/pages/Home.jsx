import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import ClinicLocationMap from "../components/ClinicLocationMap";
import SmileAssessmentWizard from "../components/SmileAssessmentWizard";
import FaqAccordion from "../components/FaqAccordion";
import { IconTelegram } from "../components/MedicalIcons";
import Seo from "../components/Seo";
import DentalSticker, { DentalHeroSeal } from "../components/DentalSticker";
import {
  DOCTOR_INFO,
  getYearsOfExperience,
  getExperienceBadge,
  getRussianYearsAdjective,
  getRussianYearsWord,
} from "../constants/doctor";
import {
  IconAward,
  IconGraduationCap,
  IconClock,
  IconPrivacyLock,
  IconShieldCheck,
  IconPhone,
  IconCheckCircle,
  IconSparkleStar,
  IconGoogle,
  IconYandex,
  IconDentalImplant,
  IconTherapeuticTooth,
  IconVeneerTooth,
  IconSurgicalScalpel,
  IconCosmeticSmile,
  IconInstagram,
  IconVolumeUp,
  IconVolumeMute,
  IconVideo,
} from "../components/MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

/* ─── 1. LUMINOUS LUXURY HERO SECTION (FULL-HEADER CINEMATIC) ──────── */
const HeroSection = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const years = getYearsOfExperience();

  const bgVideoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const isHeaderInViewRef = useRef(true);
  // Sound enabled by default as requested
  const [isMuted, setIsMuted] = useState(false);
  const userExplicitlyMutedRef = useRef(false);

  // Autoplay with sound by default (or auto-unmute on first interaction if blocked by browser policy)
  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    video.volume = 1.0;

    // Attempt direct unmuted playback
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // Browser autoplay policy restricted unmuted playback without prior interaction.
          // Start playing muted immediately so visual playback is never blocked:
          video.muted = true;
          video.play().catch(() => {});
          setIsMuted(true);

          // As soon as the user touches the screen, clicks, or interacts, unmute audio immediately:
          const enableAudioOnInteraction = () => {
            if (userExplicitlyMutedRef.current) return;
            const vid = bgVideoRef.current;
            if (!vid) return;

            vid.muted = false;
            vid.volume = 1.0;
            vid.play()
              .then(() => {
                setIsMuted(false);
              })
              .catch(() => {});

            cleanup();
          };

          const events = ["touchstart", "touchend", "pointerdown", "mousedown", "click", "keydown", "scroll"];
          const cleanup = () => {
            events.forEach((evt) => {
              window.removeEventListener(evt, enableAudioOnInteraction, { capture: true });
              document.removeEventListener(evt, enableAudioOnInteraction, { capture: true });
            });
          };

          events.forEach((evt) => {
            window.addEventListener(evt, enableAudioOnInteraction, { capture: true, once: true });
            document.addEventListener(evt, enableAudioOnInteraction, { capture: true, once: true });
          });
        });
    }
  }, []);

  /* Play or pause with visibility, preserving the mute state. */
  useEffect(() => {
    const sectionEl = heroSectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
        isHeaderInViewRef.current = inView;

        const video = bgVideoRef.current;
        if (!video) return;

        if (inView) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.05, 0.2] }
    );

    observer.observe(sectionEl);
    return () => {
      observer.disconnect();
      const video = bgVideoRef.current;
      if (video) video.pause();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = bgVideoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else if (isHeaderInViewRef.current) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const toggleSound = () => {
    const video = bgVideoRef.current;
    if (!video) return;

    if (isMuted || video.muted) {
      userExplicitlyMutedRef.current = false;
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      video.play().catch(() => {});
    } else {
      userExplicitlyMutedRef.current = true;
      video.muted = true;
      setIsMuted(true);
    }
  };

  const t = {
    uz: {
      awardBadge: "Yil Stomatologi – 2025",
      brand: "Dr. Munojat Akbarova",
      title: "Andijondagi Oliy Toifali Ayol Stomatolog",
      desc: `${years} yillik tajriba. Tish og'rig'ini zudlik bilan qoldirish, 4 davlat plombalari, old va orqa tish karonkalari (Xitoy, Germaniya, Avstraliya) hamda og'riqsiz implantatsiya.`,
      bookBtn: "Qabulga Yozilish",
      callBtn: "+998 (94) 106-15-55",
      statAward: "Yil Stomatologi",
      statExp: "Klinik Tajriba",
      statSmiles: "Mamnun Bemor",
      statPainFree: "Og'riqsiz Muolaja",
    },
    ru: {
      awardBadge: "Стоматолог Года – 2025",
      brand: "Д-р Мунаджат Акбарова",
      title: "Ведущий Женский Стоматолог в Андижане",
      desc: `${years} лет клинического опыта. Снятие зубной боли, сертифицированные пломбы (4 страны), коронки (Китай, Германия, Австралия) и имплантация без боли на долгие годы.`,
      bookBtn: "Записаться на Приём",
      callBtn: "+998 (94) 106-15-55",
      statAward: "Стоматолог Года",
      statExp: "Клинический Опыт",
      statSmiles: "Довольных Пациентов",
      statPainFree: "Без Боли",
    },
    en: {
      awardBadge: "Dentist of the Year – 2025",
      brand: "Dr. Munojat Akbarova",
      title: "Leading Female Dentist in Andijan",
      desc: `${years}+ years of clinical excellence. Acute tooth pain relief, German 3M™ fillings, porcelain veneers, zirconia crowns & painless implants.`,
      bookBtn: "Book Appointment",
      callBtn: "+998 (94) 106-15-55",
      statAward: "Dentist of the Year",
      statExp: "Clinical Experience",
      statSmiles: "Happy Patients",
      statPainFree: "Pain-Free Care",
    },
  }[lang] || {};

  return (
    <section
      ref={heroSectionRef}
      aria-label="Dr. Munojat Akbarova Stomatologiya Markazi"
      itemScope
      itemType="https://schema.org/Dentist"
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-slate-950 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 border-b border-slate-900"
    >
      {/* SEO Microdata (Schema.org / JSON-LD complementary) */}
      <meta itemProp="name" content="Dr. Munojat Akbarova - Zamonaviy Ayollar Stomatologiyasi" />
      <meta itemProp="description" content={t.desc} />
      <meta itemProp="telephone" content="+998941061555" />
      <meta itemProp="priceRange" content="$$" />
      <meta itemProp="award" content="The Best of Uzbekistan 2025 - Yil Stomatologi" />
      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="sr-only">
        <span itemProp="addressLocality">Andijon</span>
        <span itemProp="addressRegion">Andijon viloyati</span>
        <span itemProp="addressCountry">UZ</span>
      </div>

      {/* 1. BACKGROUND VIDEO ANCHORED TO THE RIGHT SIDE (Silent, Cinematic, High-Performance) */}
      <figure className="absolute inset-y-0 right-0 w-full md:w-[70%] lg:w-[58%] xl:w-[52%] h-full overflow-hidden pointer-events-none select-none z-0 m-0">
        <video
          ref={bgVideoRef}
          src="/dr_munojat_award.mp4"
          poster="/dr_munojat_award_poster.webp"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          aria-label="Dr. Munojat Akbarova - The Best of Uzbekistan 2025 taqdirlash marosimi"
          className="w-full h-full object-cover object-center scale-100 lg:scale-105 transition-transform duration-1000"
        />
        <figcaption className="sr-only">
          Dr. Munojat Akbarova - The Best of Uzbekistan 2025 taqdirlash marosimi
        </figcaption>

        {/* Cinematic Multi-Layer Gradient Overlays */}
        {/* Horizontal blend: pure dark on left so left text has 100% pristine contrast, smoothly revealing the video on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 md:via-slate-950/40 to-transparent z-10" />

        {/* Top fade (smooth blend under navbar) */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent z-10" />

        {/* Bottom fade (smooth blend into next section) */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-10" />

        {/* Ambient warm gold celebration aura */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-10" />
      </figure>

      {/* Subtle Ambient Red Aura on the left edge */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Razor-sharp clean bottom divider line (No muddy haze) */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent z-10 pointer-events-none" />

      {/* 2. FOREGROUND CONTENT (Semantic, Clean, Simple, Professional) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-5 text-left">

          {/* Award Badge Pill (Clean prestige badge, no play button) */}
          <div className="flex items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-orange-500/20 text-amber-200 text-xs sm:text-sm font-black border border-amber-400/40 shadow-lg shadow-amber-500/10 backdrop-blur-md select-none">
              <IconAward className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="tracking-wide uppercase">{t.awardBadge}</span>
            </div>
          </div>

          {/* Semantic Heading Group: Doctor Name & Professional Title */}
          <hgroup className="space-y-1.5">
            <h1 itemProp="founder" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {t.brand}
            </h1>
            <p itemProp="medicalSpecialty" className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-400 via-red-300 to-amber-300 bg-clip-text text-transparent">
              {t.title}
            </p>
          </hgroup>

          {/* Clean, Simple, Professional Description */}
          <p itemProp="disambiguatingDescription" className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
            {t.desc}
          </p>

          {/* Action Buttons: Clean & Direct */}
          <nav aria-label="Tezkor amallar" className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={onOpenBooking}
              className="min-h-[50px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e11d48] via-[#fd1616] to-[#ea580c] hover:brightness-110 text-white font-black text-sm sm:text-base shadow-xl shadow-red-900/50 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>{t.bookBtn}</span>
            </button>

            <a
              href="tel:+998941061555"
              itemProp="telephone"
              className="min-h-[50px] px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-md shadow-md flex items-center gap-2 transition-all active:scale-95"
              aria-label="Telefon orqali bog'lanish"
            >
              <IconPhone className="w-4 h-4 text-emerald-400" />
              <span>{t.callBtn}</span>
            </a>
          </nav>

          {/* Semantic Description List: 4 Key Achievements & Metrics with Custom Stickers */}
          <dl className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10" aria-label="Klinika asosiy yutuq va ko'rsatkichlari">
            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/30 transition-all backdrop-blur-sm group">
              <dd className="text-amber-400 text-xl sm:text-2xl font-black">2025</dd>
              <dt className="text-xs sm:text-sm font-bold text-white mt-1">{t.statAward}</dt>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-rose-400/30 transition-all backdrop-blur-sm group">
              <dd className="text-rose-400 text-xl sm:text-2xl font-black">{years}+</dd>
              <dt className="text-xs sm:text-sm font-bold text-white mt-1">{t.statExp}</dt>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/30 transition-all backdrop-blur-sm group">
              <dd className="text-emerald-400 text-xl sm:text-2xl font-black">5,000+</dd>
              <dt className="text-xs sm:text-sm font-bold text-white mt-1">{t.statSmiles}</dt>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/30 transition-all backdrop-blur-sm group">
              <dd className="text-sky-400 text-xl sm:text-2xl font-black">100%</dd>
              <dt className="text-xs sm:text-sm font-bold text-white mt-1">{t.statPainFree}</dt>
            </div>
          </dl>

        </div>
      </div>

      {/* Audio Control (Clear, intuitive pill toggle) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
          title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-850 text-white border border-amber-500/40 hover:border-amber-400 backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
        >
          {isMuted ? (
            <>
              <IconVolumeMute className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                {lang === "uz" ? "Ovozni yoqish" : lang === "ru" ? "Включить звук" : "Unmute Sound"}
              </span>
            </>
          ) : (
            <>
              <IconVolumeUp className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors animate-pulse" />
              <span className="text-xs font-bold text-emerald-300">
                {lang === "uz" ? "Ovoz yoniq" : lang === "ru" ? "Звук включен" : "Sound On"}
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};



/* ─── 2. 5 CORE SPECIALTIES BENTO GRID ─────────────────────────────── */
const CoreServicesBento = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();

  const services = [
    {
      slug: "ortopediya",
      title: { uz: "Old & Orqa Tish Karonkalari", ru: "Коронки для Передних и Жевательных Зубов", en: "Dental Crowns (Front & Back)" },
      desc: {
        uz: "Old va orqa tishlarni Germaniya, Avstraliya va Xitoy tsirkoniy karonkalari bilan uzoq yillarga tiklash.",
        ru: "Коронки из Германии, Австралии и Китая для передних и жевательных зубов на долгие годы.",
        en: "Restoration of front and molar teeth with crowns from Germany, Australia, and China lasting for years.",
      },
      image: assets.heroSmile,
      icon: <IconVeneerTooth className="w-4 h-4 text-amber-500" />,
    },
    {
      slug: "implantatsiya",
      title: { uz: "Titan Tish Implanti", ru: "Имплантация", en: "Dental Implant" },
      desc: {
        uz: "Yo'qotilgan tishlarni uzoq yillar davomida mustahkam titan implantlar bilan tiklash.",
        ru: "Надёжное восстановление утраченных зубов титановыми корнями на долгие годы.",
        en: "Long-term restoration of missing teeth with certified titanium.",
      },
      image: assets.treatmentImplant,
      icon: <IconDentalImplant className="w-4 h-4 text-sky-500" />,
    },
    {
      slug: "tish-oqartirish",
      title: { uz: "ZOOM 4 Tish Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" },
      desc: {
        uz: "Tishlarning o'z holatiga nisbatan xavfsiz oqartirish va yorqin qilish.",
        ru: "Осветление зубов относительно исходного тона без вреда для эмали.",
        en: "Safe laser whitening brightening teeth relative to their natural baseline.",
      },
      image: assets.treatmentWhitening,
      icon: <IconCosmeticSmile className="w-4 h-4 text-blue-500" />,
    },
    {
      slug: "tish-davolash",
      title: { uz: "Karies & Davolash", ru: "Лечение Кариеса", en: "Cavity Treatment" },
      desc: {
        uz: "Karies va nerv kasalliklarini nano-plombalar bilan 100% og'riqsiz davolash.",
        ru: "Лечение кариеса и пульпита нанокомпозитами абсолютно без боли.",
        en: "Painless treatment of cavities using invisible nano-composites.",
      },
      image: assets.clinicRoom,
      icon: <IconTherapeuticTooth className="w-4 h-4 text-emerald-500" />,
    },
    {
      slug: "xirurgiya",
      title: { uz: "Og'riqsiz Xirurgiya", ru: "Хирургия", en: "Oral Surgery" },
      desc: {
        uz: "Aql tishlari va ildizlarni nozik mikroxirurgik usulda, shishsiz olish.",
        ru: "Бережное удаление зубов мудрости без боли и без отёков.",
        en: "Gentle atraumatic tooth extraction with zero pain and fast healing.",
      },
      image: assets.treatmentSurgery,
      icon: <IconSurgicalScalpel className="w-4 h-4 text-purple-500" />,
    },
  ];

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black text-[#930b0b] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 inline-block mb-3">
            5 TA ASOSIY MUTAXASSISLIK
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Zamonaviy Stomatologiya Xizmatlari
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Ayollar va qizlar uchun 100% og'riqsiz, maxfiy va Yevropa standartlaridagi professional muolajalar.
          </p>
        </div>

        {/* 5 Cards Balanced Layout: Top 3 + Bottom 2 */}
        <div className="space-y-6">
          
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                to={lp(`/services/${s.slug}`)}
                className="bg-slate-50 hover:bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <article itemScope itemType="https://schema.org/MedicalProcedure" className="flex flex-col h-full justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={s.image}
                        alt={`${s.title[lang]} — Dr. Munojat Akbarova Andijon`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        loading="lazy"
                        decoding="async"
                        itemProp="image"
                      />
                      {/* Left: Creative Die-Cut Dental Sticker */}
                      <div className="absolute top-3 left-3 z-10 pointer-events-none">
                        <DentalSticker type={s.slug} lang={lang} />
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 itemProp="name" className="font-black text-lg text-slate-900 group-hover:text-[#930b0b] transition-colors">
                        {s.title[lang]}
                      </h3>
                      <p itemProp="description" className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {s.desc[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                    <span>{lang === "uz" ? "Batafsil ma'lumot" : lang === "ru" ? "Подробнее" : "Learn More"}</span>
                    <span>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Bottom Row: 2 Centered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.slice(3, 5).map((s) => (
              <Link
                key={s.slug}
                to={lp(`/services/${s.slug}`)}
                className="bg-slate-50 hover:bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <article itemScope itemType="https://schema.org/MedicalProcedure" className="flex flex-col h-full justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={s.image}
                        alt={`${s.title[lang]} — Dr. Munojat Akbarova Andijon`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        loading="lazy"
                        decoding="async"
                        itemProp="image"
                      />
                      {/* Left: Creative Die-Cut Dental Sticker */}
                      <div className="absolute top-3 left-3 z-10 pointer-events-none">
                        <DentalSticker type={s.slug} lang={lang} />
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 itemProp="name" className="font-black text-lg text-slate-900 group-hover:text-[#930b0b] transition-colors">
                        {s.title[lang]}
                      </h3>
                      <p itemProp="description" className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {s.desc[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                    <span>{lang === "uz" ? "Batafsil ma'lumot" : lang === "ru" ? "Подробнее" : "Learn More"}</span>
                    <span>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

/* ─── 3. WOMEN'S MODESTY & PRIVACY PILLARS ──────────────────────────── */
const ModestyPillars = () => {
  const { lang } = useLanguage();

  const pillars = [
    {
      title: { uz: "Faqat Ayol Mutaxassislar", ru: "Только Женский Персонал", en: "All-Female Medical Team" }[lang],
      desc: {
        uz: "Bosh shifokor, assistentlar va hamshiralar faqat ayollardan iborat.",
        ru: "Врач и ассистенты — исключительно женщины.",
        en: "The entire clinic team consists exclusively of qualified women.",
      }[lang],
      icon: <IconPrivacyLock className="w-6 h-6 text-[#930b0b]" />,
    },
    {
      title: { uz: "Alohida Yopiq Qabul Xonasi", ru: "Индивидуальный Кабинет", en: "Private Treatment Suite" }[lang],
      desc: {
        uz: "Yakka tartibdagi muolaja xonasi: begonalar va erkaklarning kirishi taqiqlangan.",
        ru: "Приём один на один в закрытом кабинете в полной безопасности.",
        en: "Single-patient private room with zero access to male observers.",
      }[lang],
      icon: <IconShieldCheck className="w-6 h-6 text-[#930b0b]" />,
    },
    {
      title: { uz: "100% Og'riqsiz & Muloyim", ru: "100% Без Боли и Стресса", en: "100% Pain-Free Care" }[lang],
      desc: {
        uz: "Sabr-toqatli va nozik yondashuv. Qo'rquv va hayajon muloyimlik bilan yengiladi.",
        ru: "Деликатное отношение, снятие страха и бережное лечение.",
        en: "Gentle empathetic approach eliminating anxiety with soothing care.",
      }[lang],
      icon: <IconCheckCircle className="w-6 h-6 text-[#930b0b]" />,
    },
  ];

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Nima Uchun Ayollar Dr. Munojatni Tanlashadi?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                {p.icon}
              </div>
              <h3 className="font-black text-lg text-slate-900">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ─── 3.5 DOCTOR SPOTLIGHT SECTION (AUTHENTIC PORTRAIT & CREDENTIALS) ─── */
const DoctorSpotlight = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const a11y = getA11yLabels(lang);
  const years = getYearsOfExperience();

  const t = {
    uz: {
      tag: `YIL STOMATOLOGI – 2025 · ${years} YILLIK AMALIYOT`,
      title: "Dr. Munojat Akbarova",
      subtitle: "Oliy Toifali Shifokor: Plomba, Davolash, Karonkalar va Implantologiya",
      desc: "12 yillik boy amaliy tajriba: Germaniya, Yaponiya, Koreya va Rossiya plombalari, old va orqa tishlar uchun Xitoy, Germaniya, Avstraliya karonkalari hamda Janubiy Koreya biotitan implantatsiyasi. 100% og'riqsiz va ayollar uchun maxfiy muhitda.",
      badge1: "Germaniya & Yaponiya Plombalari",
      badge2: "Koreya & Rossiya Plombalari",
      badge3: "Xitoy, Germaniya, Avstraliya Karonkalari",
      badge4: "Janubiy Koreya Biotitan Implanti",
      moreBtn: "Shifokor Haqida Batafsil",
      bookBtn: "Qabulga Yozilish",
    },
    ru: {
      tag: `СТОМАТОЛОГ ГОДА – 2025 · ${years} ЛЕТ ОПЫТА`,
      title: "Д-р Мунаджат Акбарова",
      subtitle: "Ведущий Стоматолог: Пломбы, Лечение Зубов, Виниры, Коронки и Импланты",
      desc: "12 лет безупречной практики: снятие зубной боли, пломбы из 4 стран, коронки для передних и жевательных зубов из Германии, Австралии и Китая, а также имплантация на долгие годы. Без боли, в комфортной приватной обстановке.",
      badge1: "Лечение Зубов & Пломбы 3M™",
      badge2: "Коронки: Китай, Германия, Австралия",
      badge3: "Имплантация (Южная Корея)",
      badge4: "Проф. Осмотр & Без Боли",
      moreBtn: "Подробнее о Враче",
      bookBtn: "Записаться на Приём",
    },
    en: {
      tag: `DENTIST OF THE YEAR – 2025 · ${years}+ YRS EXPERIENCE`,
      title: "Dr. Munojat Akbarova",
      subtitle: "Leading Dental Specialist: Restorative Fillings, Veneers, Crowns & Implants",
      desc: "12+ years of clinical excellence: tooth pain relief, certified fillings, dental crowns (China, Germany, Australia), extractions, and Korean bio-implants. Strictly private, 100% pain-free.",
      badge1: "Tooth Pain Care & Certified Fillings",
      badge2: "Crowns: China, Germany, Australia",
      badge3: "South Korea Implant Surgery",
      badge4: "Dental Check-up & 100% Pain-Free",
      moreBtn: "Learn More About Doctor",
      bookBtn: "Book Appointment",
    },
  }[lang] || {};

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-200/80" aria-label={a11y.aboutDoctor}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Authentic Doctor Photo Frame (Clean, Elegant, No Tacky Stickers) */}
          <div className="lg:col-span-5 flex justify-center">
            <figure className="relative w-full max-w-[360px] sm:max-w-[400px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white m-0">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={assets.drMunojatPortrait34}
                  alt="Dr. Munojat Akbarova — Andijondagi yetakchi ayol stomatolog"
                  className="w-full h-full object-cover object-[center_15%] select-none"
                  loading="lazy"
                  width="682"
                  height="910"
                />
              </div>
            </figure>
          </div>

          {/* Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-900 text-xs sm:text-sm font-bold border border-amber-400/30">
              <IconAward className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.tag}</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {t.title}
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#930b0b]">
                {t.subtitle}
              </p>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {t.desc}
            </p>

            {/* 4 Professional Credential Badges (Clean SVG Icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 px-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <IconGraduationCap className="w-4 h-4 text-[#930b0b] shrink-0" />
                <span>{t.badge1}</span>
              </div>
              <div className="p-2.5 px-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <IconDentalImplant className="w-4 h-4 text-[#930b0b] shrink-0" />
                <span>{t.badge2}</span>
              </div>
              <div className="p-2.5 px-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <IconAward className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.badge3}</span>
              </div>
              <div className="p-2.5 px-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <IconShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.badge4}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="min-h-[48px] px-7 py-3 rounded-full bg-gradient-to-r from-[#e11d48] via-[#fd1616] to-[#ea580c] hover:brightness-110 text-white font-black text-sm shadow-lg shadow-red-900/30 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{t.bookBtn}</span>
              </button>

              <Link
                to={lp("/about")}
                className="min-h-[48px] px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-300 shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>{t.moreBtn}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─── 4. PATIENT REVIEWS & VERIFIED FEEDBACK HUB ──────────────────────── */
const PatientReviews = () => {
  const { lang } = useLanguage();

  const t = {
    uz: {
      badge: "XOLIS VA ISHONCHLI FIKRLAR",
      title: "Bemorlar Bahosi & Fikrlar Markazi",
      sub: "Dr. Munojat Akbarova qabulida bo'lgan xotin-qizlarning samimiy tavsiyalari va xolis baholari. Biz har bir bemorimizning haqiqiy fikrini qadrlaymiz.",
      googleTitle: "Google Xaritalarda Baho Bering",
      googleDesc: "1 daqiqada Google hisobingiz orqali 5 yulduzli baho va xolis sharhingizni qoldiring.",
      googleBtn: "Google'da Baholash",
      googleTag: "Google Maps · Andijon",
      yandexTitle: "Yandex Kartada Baho Bering",
      yandexDesc: "Andijondagi manzilimiz bo'yicha Yandex profilingiz orqali muolaja sifatini baholang.",
      yandexBtn: "Yandex Kartada Baholash",
      yandexTag: "Yandex Maps · Orzu Stoma Denta",
      tgTitle: "Telegram orqali Fikr Yuboring",
      tgDesc: "Muolajadan keyingi minnatdorchilik xabaringiz yoki tabassumingiz fotosuratini shaxsan yuboring.",
      tgBtn: "Telegram'da Yozish",
      tgTag: "@dr_munojat · Shaxsiy Aloqa",
      bannerTitle: "Haqiqiy Bemorlar Sharhlari",
      bannerText: "Bemorlarimizning Telegram orqali yozgan samimiy fikrlari, tavsiyalari va fotosuratlari yaqin kunlarda ushbu sahifada muntazam e'lon qilib boriladi. Siz ham o'z natijangiz bilan bo'lishing!",
      bannerAction: "Telegram orqali fikr bildirish",
    },
    ru: {
      badge: "ЧЕСТНЫЕ И ПРОВЕРЕННЫЕ ОТЗЫВЫ",
      title: "Отзывы и Оценки Пациенток",
      sub: "Искренние рекомендации и оценки женщин и девушек, прошедших лечение у доктора Мунаджат Акбаровой. Мы ценим каждый честный отзыв на официальных сервисах.",
      googleTitle: "Оценить в Google Maps",
      googleDesc: "Оставьте 5-звёздочную оценку и честный отзыв через ваш Google аккаунт всего за 1 минуту.",
      googleBtn: "Оценить в Google",
      googleTag: "Google Maps · Андижан",
      yandexTitle: "Оценить в Яндекс Картах",
      yandexDesc: "Поделитесь впечатлениями о комфорте, стерильности и лечении без боли на Яндекс Картах.",
      yandexBtn: "Оценить в Яндекс",
      yandexTag: "Яндекс Карты · Orzu Stoma Denta",
      tgTitle: "Отзыв через Telegram",
      tgDesc: "Отправьте ваши впечатления, фото улыбки или слова благодарности лично доктору Мунаджат.",
      tgBtn: "Написать в Telegram",
      tgTag: "@dr_munojat · Прямой контакт",
      bannerTitle: "Реальные Отзывы Пациенток",
      bannerText: "Искренние сообщения пациенток из Telegram, фотографии результатов и благодарности будут регулярно публиковаться здесь. Поделитесь своим опытом лечения!",
      bannerAction: "Отправить отзыв в Telegram",
    },
    en: {
      badge: "VERIFIED & AUTHENTIC REVIEWS",
      title: "Patient Reviews & Ratings Hub",
      sub: "Genuine recommendations and authentic ratings from patients of Dr. Munojat Akbarova. We honor verified feedback on trusted global platforms.",
      googleTitle: "Rate on Google Maps",
      googleDesc: "Leave a 5-star rating and honest review via your Google account in just 1 minute.",
      googleBtn: "Review on Google",
      googleTag: "Google Maps · Andijan",
      yandexTitle: "Rate on Yandex Maps",
      yandexDesc: "Share your honest impressions of comfort, sterility, and painless treatment on Yandex Maps.",
      yandexBtn: "Review on Yandex",
      yandexTag: "Yandex Maps · Orzu Stoma Denta",
      tgTitle: "Send Feedback via Telegram",
      tgDesc: "Send your recovery update, smile picture, or personal thank-you directly to Dr. Munojat.",
      tgBtn: "Message on Telegram",
      tgTag: "@dr_munojat · Direct Contact",
      bannerTitle: "Authentic Patient Testimonials",
      bannerText: "Genuine patient messages from Telegram, real smile results, and personal notes will be published here. Share your experience with Dr. Munojat today!",
      bannerAction: "Share feedback on Telegram",
    },
  }[lang] || {};

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-black uppercase tracking-wider shadow-2xs">
            <span className="text-amber-500">★</span>
            <span>{t.badge}</span>
            <span className="text-amber-500">★</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* 3 Prominent Review Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* 1. Google Maps Card */}
          <div className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:scale-150 transition-transform" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <IconGoogle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
                  {t.googleTag}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  {t.googleTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t.googleDesc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-400 text-sm pt-1">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span className="text-slate-400 text-[11px] font-bold ml-1.5">(Google Maps)</span>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://maps.google.com/?cid=4641379713526839793"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-black shadow-md shadow-blue-600/20 transition-all"
                aria-label="Google Xaritalarda baho berish"
              >
                <IconGoogle className="w-4 h-4 brightness-200" />
                <span>{t.googleBtn}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* 2. Yandex Maps Card */}
          <div className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:scale-150 transition-transform" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <IconYandex className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  {t.yandexTag}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                  {t.yandexTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t.yandexDesc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-400 text-sm pt-1">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span className="text-slate-400 text-[11px] font-bold ml-1.5">(Yandex Maps)</span>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://yandex.uz/maps/org/orzu_stoma_denta/215888013765/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-105 active:scale-98 text-amber-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all"
                aria-label="Yandex Kartada baho berish"
              >
                <span>⭐</span>
                <span>{t.yandexBtn}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* 3. Telegram Feedback Card */}
          <div className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:scale-150 transition-transform" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <IconTelegram className="w-6 h-6 text-[#229ED9]" />
                </div>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/60">
                  {t.tgTag}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  {t.tgTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t.tgDesc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sky-600 text-xs font-bold pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === "uz" ? "Jonli Telegram aloqa" : lang === "ru" ? "Прямая связь в Telegram" : "Live Telegram Contact"}</span>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://t.me/dr_munojat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#229ED9] hover:bg-[#1b8ec5] active:scale-98 text-white text-xs font-black shadow-md shadow-sky-500/20 transition-all"
                aria-label="Telegram orqali fikr yuborish"
              >
                <IconTelegram className="w-4 h-4 text-white" />
                <span>{t.tgBtn}</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

        {/* Real Feedback Announcement Banner (ready for user's incoming real Telegram messages) */}
        <div className="rounded-3xl bg-gradient-to-r from-red-50/70 via-amber-50/40 to-slate-50 border border-red-100/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-red-200 flex items-center justify-center text-[#930b0b] shrink-0 shadow-2xs">
              <IconShieldCheck className="w-6 h-6 text-[#930b0b]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <span>{t.bannerTitle}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  100% Xolis
                </span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {t.bannerText}
              </p>
            </div>
          </div>

          <a
            href="https://t.me/dr_munojat"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 hover:text-[#930b0b] text-xs font-bold shadow-2xs transition-all"
          >
            <IconTelegram className="w-4 h-4 text-[#229ED9]" />
            <span>{t.bannerAction}</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

/* ─── MAIN HOME COMPONENT ──────────────────────────────────────────── */
const Home = ({ onOpenBooking }) => {
  return (
    <>
      <Seo
        page="home"
        path="/"
      />

      <HeroSection onOpenBooking={onOpenBooking} />
      <CoreServicesBento onOpenBooking={onOpenBooking} />
      <SmileAssessmentWizard />
      <ModestyPillars />
      <DoctorSpotlight onOpenBooking={onOpenBooking} />
      <BeforeAfterSlider />
      <PatientReviews />
      <FaqAccordion />
      <ClinicLocationMap />
    </>
  );
};

export default Home;
