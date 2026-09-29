import React from "react";

/* ─── CLASSIC, PROFESSIONAL CLINICAL SPECIALTY BADGES ────────────────────── */
const STICKER_CONFIGS = {
  ortopediya: {
    uz: "Ortopedik Stomatologiya",
    ru: "Ортопедическая стоматология",
    en: "Prosthodontics",
  },
  implantatsiya: {
    uz: "Dental Implantologiya",
    ru: "Дентальная имплантация",
    en: "Dental Implantology",
  },
  "tish-oqartirish": {
    uz: "Estetik Stomatologiya",
    ru: "Эстетическая стоматология",
    en: "Esthetic Dentistry",
  },
  "tish-davolash": {
    uz: "Terapevtik Davolash",
    ru: "Терапевтическое лечение",
    en: "Restorative Care",
  },
  xirurgiya: {
    uz: "Jarrohlik Stomatologiyasi",
    ru: "Хирургическая стоматология",
    en: "Oral Surgery",
  },
  japan_nano: {
    uz: "Badiiy Restavratsiya",
    ru: "Художественная реставрация",
    en: "Artistic Restoration",
  },
  russia_endo: {
    uz: "Klinik Endodontiya",
    ru: "Клиническая эндодонтия",
    en: "Clinical Endodontics",
  },
  hygiene: {
    uz: "Profilaktik Ko'rik",
    ru: "Профилактический осмотр",
    en: "Preventive Check-up",
  },
  clinic_women: {
    uz: "Maxfiy Ayollar Kabineti",
    ru: "Приватный женский кабинет",
    en: "Private Women's Suite",
  },
};

/**
 * Simple, classic, professional medical badge.
 */
export const DentalSticker = ({
  type = "ortopediya",
  lang = "uz",
  className = "",
}) => {
  const cfg = STICKER_CONFIGS[type] || STICKER_CONFIGS["ortopediya"];
  const label = cfg[lang] || cfg.uz;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 text-slate-800 text-[11px] font-semibold tracking-wide shadow-xs select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#930b0b] shrink-0" />
      <span>{label}</span>
    </div>
  );
};

export const DentalGoldSeal = () => null;
export const DentalHeroSeal = () => null;

export default DentalSticker;
