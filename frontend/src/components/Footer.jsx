import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import Logo from "./Logo";
import {
  DOCTOR_INFO,
  OPENING_HOURS,
  getYearsOfExperience,
  getRussianYearsAdjective,
} from "../constants/doctor";
import {
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconLocationPin,
  IconClock,
  IconShieldCheck,
  IconSparkleStar,
  IconGoogle,
} from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const Footer = () => {
  const { lang } = useLanguage();
  const lp = useLocalizedPath();
  const a11y = getA11yLabels(lang);
  const years = getYearsOfExperience();
  const start = DOCTOR_INFO.careerStartYear;

  const t = {
    uz: {
      ctaTitle: "Mukammal Tabassum Sari Ilk Qadam",
      ctaSub: "Andijon shahrida ayollar va qizlar uchun 100% og'riqsiz, maxfiy va Yevropa standartlaridagi professional stomatologiya.",
      ctaCall: "Qabulga Yozilish: +998 (94) 106-15-55",
      ctaTg: "Telegram Orqali Yozilish",
      bio: `Dr. Munojat Akbarova — ${years} yillik tajribaga ega yuqori malakali stomatolog (${start}-yildan buyon), Koreya malakasi va “Eng Yaxshi Ayol Stomatologi – 2025” nominatsiyasi g‘olibi. Orzu Stoma Denta klinikasida 100% og'riqsiz va maxfiy xizmat ko'rsatadi.`,
      navTitle: "Sahifalar",
      servicesTitle: "Asosiy Xizmatlar",
      contactTitle: "Klinika & Manzil",
      clinic: "Orzu Stoma Denta",
      address: "Andijon shahri, Orzu Stoma Denta",
      hours: OPENING_HOURS.display.uz,
      yandexBtn: "Yandex Xaritada Ko'rish",
      yandexReviewBtn: "Yandex Kartada bizga baho bering ⭐",
      googleReviewBtn: "Google Xaritalarda bizga baho bering ⭐",
      rights: "Barcha huquqlar himoyalangan.",
      badge1: "100% Maxfiylik",
      badge2: "Steril Standart",
      badge3: "Og'riqsiz Muolaja",
    },
    ru: {
      ctaTitle: "Первый Шаг к Идеальной Улыбке",
      ctaSub: "Стоматология европейского качества для женщин и девушек в Андижане: 100% без боли и в полной безопасности.",
      ctaCall: "Запись на приём: +998 (94) 106-15-55",
      ctaTg: "Запись через Telegram",
      bio: `Д-р Мунаджат Акбарова — стоматолог высшей категории с ${getRussianYearsAdjective(years)} стажем (с ${start} г.), стажировкой в Южной Корее и званием «Лучший Женский Стоматолог – 2025». Деликатный приём в Orzu Stoma Denta 100% без боли.`,
      navTitle: "Страницы",
      servicesTitle: "Услуги",
      contactTitle: "Клиника и Адрес",
      clinic: "Orzu Stoma Denta",
      address: "г. Андижан, клиника Orzu Stoma Denta",
      hours: OPENING_HOURS.display.ru,
      yandexBtn: "Открыть в Яндекс Картах",
      yandexReviewBtn: "Оцените нас в Яндекс Картах ⭐",
      googleReviewBtn: "Оцените нас в Google Maps ⭐",
      rights: "Все права защищены.",
      badge1: "100% Приватность",
      badge2: "Стерильность",
      badge3: "Лечение без боли",
    },
    en: {
      ctaTitle: "The First Step to a Flawless Smile",
      ctaSub: "Gentle, 100% pain-free and strictly private aesthetic dental care for women and ladies in Andijan.",
      ctaCall: "Book Appointment: +998 (94) 106-15-55",
      ctaTg: "Book via Telegram",
      bio: `Dr. Munojat Akbarova — ${years} years of clinical excellence (practicing since ${start}), South Korea trained specialist in fillings, veneers, crowns & implants, Winner of «Best Female Dentist 2025» at Orzu Stoma Denta in Andijan.`,
      navTitle: "Navigation",
      servicesTitle: "Specialties",
      contactTitle: "Clinic & Location",
      clinic: "Orzu Stoma Denta",
      address: "Andijan City, Orzu Stoma Denta",
      hours: OPENING_HOURS.display.en,
      yandexBtn: "Open in Yandex Maps",
      yandexReviewBtn: "Rate us on Yandex Maps ⭐",
      googleReviewBtn: "Rate us on Google Maps ⭐",
      rights: "All rights reserved.",
      badge1: "100% Privacy",
      badge2: "Sterile Standard",
      badge3: "Pain-Free Care",
    },
  }[lang] || {};

  const navLinks = [
    { label: { uz: "Bosh sahifa", ru: "Главная", en: "Home" }[lang], to: "/" },
    { label: { uz: "Barcha xizmatlar", ru: "Все услуги", en: "All Services" }[lang], to: "/services" },
    { label: { uz: "Dr. Munojat haqida", ru: "О докторе", en: "About Dr." }[lang], to: "/about" },
    { label: { uz: "Klinik natijalar (Galereya)", ru: "Результаты", en: "Gallery" }[lang], to: "/gallery" },
    { label: { uz: "Aloqa va Manzil", ru: "Контакты и адрес", en: "Contact" }[lang], to: "/contact" },
  ];

  const serviceLinks = [
    { label: { uz: "Old & Orqa Tish Karonkalari", ru: "Коронки на зубы", en: "Dental Crowns (Front & Back)" }[lang], to: "/services/ortopediya" },
    { label: { uz: "Tish Davolash & Plombalar", ru: "Лечение зубов и Пломбы", en: "Tooth Care & Modern Fillings" }[lang], to: "/services/tish-davolash" },
    { label: { uz: "Titan Tish Implanti", ru: "Имплантация", en: "Dental Implants" }[lang], to: "/services/implantatsiya" },
    { label: { uz: "ZOOM 4 Lazer Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" }[lang], to: "/services/tish-oqartirish" },
    { label: { uz: "Og'riqsiz Mikroxirurgiya", ru: "Хирургия", en: "Oral Surgery" }[lang], to: "/services/xirurgiya" },
  ];

  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200/90 pt-10 pb-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pre-Footer Callout Card */}
        <div className="bg-gradient-to-br from-red-50/90 via-[#fff8f8] to-rose-50/70 border border-red-200/80 rounded-3xl p-8 sm:p-10 mb-8 sm:mb-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-[11px] font-black text-[#930b0b] uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-red-200 inline-block">
              {t.clinic} · Dr. Munojat Akbarova
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {t.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.ctaSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+998941061555"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white text-xs sm:text-sm font-black shadow-lg shadow-red-900/20 hover:brightness-110 active:scale-95 transition-all"
              aria-label={a11y.call}
            >
              <IconPhone className="w-4 h-4 text-white" />
              <span>{t.ctaCall}</span>
            </a>

            <a
              href="https://t.me/dr_munojat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-800 border border-slate-300 hover:border-[#fd1616] hover:text-[#930b0b] text-xs sm:text-sm font-bold shadow-xs transition-all"
              aria-label={a11y.telegram}
            >
              <IconTelegram className="w-4 h-4 text-[#229ED9]" />
              <span>{t.ctaTg}</span>
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to={lp("/")} className="inline-block" aria-label={a11y.home}>
              <Logo />
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              {t.bio}
            </p>
            
            {/* Social pills */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="tel:+998941061555"
                className="w-10 h-10 rounded-xl bg-red-50 hover:bg-[#930b0b] text-[#930b0b] hover:text-white flex items-center justify-center transition-all border border-red-200/80 shadow-xs"
                aria-label={a11y.call}
              >
                <IconPhone className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/dr_munojat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-sky-50 hover:bg-[#229ED9] text-[#229ED9] hover:text-white flex items-center justify-center transition-all border border-sky-200/80 shadow-xs"
                aria-label={a11y.telegram}
              >
                <IconTelegram className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/dr_munojatakbarova/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white flex items-center justify-center transition-all border border-pink-200/80 shadow-xs"
                aria-label={a11y.instagram}
              >
                <IconInstagram className="w-4 h-4" />
              </a>
            </div>

            {/* Quality badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                <IconShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{t.badge1}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                <IconSparkleStar className="w-3 h-3 text-[#930b0b]" />
                <span>{t.badge2}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-2 border-[#930b0b] pl-2">
              {t.navTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((l, i) => (
                <li key={i}>
                  <Link to={lp(l.to)} className="text-slate-600 hover:text-[#930b0b] font-medium transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-2 border-[#930b0b] pl-2">
              {t.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((s, i) => (
                <li key={i}>
                  <Link to={lp(s.to)} className="text-slate-600 hover:text-[#930b0b] font-medium transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-2 border-[#930b0b] pl-2">
              {t.contactTitle}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-slate-900 font-bold">{t.clinic}</p>
              <p className="text-slate-600">{t.address}</p>
              <div className="flex items-center gap-1.5 text-slate-600">
                <IconClock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t.hours}</span>
              </div>
              <a
                href="tel:+998941061555"
                className="inline-block text-[#930b0b] font-black text-sm hover:underline pt-1"
              >
                +998 (94) 106-15-55
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://maps.google.com/?cid=4641379713526839793"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 text-blue-900 text-xs font-bold transition-all border border-blue-200 shadow-2xs group"
                aria-label={a11y.googleReview}
              >
                <IconGoogle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform shrink-0" />
                <span>{t.googleReviewBtn}</span>
              </a>

              <a
                href="https://yandex.uz/maps/org/orzu_stoma_denta/215888013765/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/80 hover:bg-amber-100 text-amber-950 text-xs font-bold transition-all border border-amber-300 shadow-2xs group"
                aria-label={a11y.yandexReview}
              >
                <span className="text-amber-500 text-sm group-hover:scale-125 transition-transform shrink-0">⭐</span>
                <span>{t.yandexReviewBtn}</span>
              </a>

              <a
                href="https://yandex.uz/maps/org/orzu_stoma_denta/215888013765/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              >
                <IconLocationPin className="w-3.5 h-3.5 text-[#930b0b] shrink-0" />
                <span>{t.yandexBtn}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Dr. Munojat Akbarova · Orzu Stoma Denta. {t.rights}</p>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
            <span>{t.badge1}</span>
            <span>·</span>
            <span>{t.badge2}</span>
            <span>·</span>
            <span>{t.badge3}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
