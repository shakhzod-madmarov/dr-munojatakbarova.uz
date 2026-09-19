import React from "react";

/* ─── INTERNATIONAL CLINICAL TECHNOLOGY BADGES (GERMANIYA, ROSSIYA, KOREYA, YAPONIYA) ── */
const STICKER_CONFIGS = {
  ortopediya: {
    uz: "Karonkalar: Xitoy · Germaniya · Avstraliya",
    ru: "Коронки: Китай · Германия · Австралия",
    en: "Crowns: China · Germany · Australia",
  },
  implantatsiya: {
    uz: "Biotitan Implant · Koreya",
    ru: "Имплантация · Южная Корея",
    en: "Implantation · South Korea",
  },
  "tish-oqartirish": {
    uz: "Philips ZOOM® 4 · AQSH",
    ru: "ZOOM® 4 · США",
    en: "Philips ZOOM® 4 · USA",
  },
  "tish-davolash": {
    uz: "Germaniya · Yaponiya · Koreya · Rossiya Plombalari",
    ru: "Пломбы: Германия · Япония · Корея · Россия",
    en: "Fillings: Germany · Japan · Korea · Russia",
  },
  xirurgiya: {
    uz: "Atravmatik Jarrohlik",
    ru: "Атравматичное Удаление",
    en: "Atraumatic Extraction",
  },
  japan_nano: {
    uz: "Nano-Restavratsiya · Yaponiya",
    ru: "Нано-Реставрация · Япония",
    en: "Nano-Restoration · Japan",
  },
  russia_endo: {
    uz: "Klinik Endodontiya · Rossiya",
    ru: "Эндодонтия · Россия",
    en: "Endodontics · Russia",
  },
  hygiene: {
    uz: "Profilaktik Ko'rik & Airflow",
    ru: "Проф. Осмотр & Airflow",
    en: "Check-up & Airflow",
  },
  clinic_women: {
    uz: "100% Maxfiy Ayollar Xonasi",
    ru: "100% Женский Кабинет",
    en: "100% Private Women Suite",
  },
};

/**
 * Clean, discreet, medical-grade technology badge.
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
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide shadow-md select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
      <span>{label}</span>
    </div>
  );
};

export const DentalGoldSeal = () => null;
export const DentalHeroSeal = () => null;

export default DentalSticker;
