import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IconShieldCheck, IconPhone } from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const EmergencyBanner = ({ onHeightChange }) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const barRef = useRef(null);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem("emergency_banner_dismissed") === "true";
    } catch {
      return false;
    }
  });

  /* Report the rendered height so App can push the fixed <Nav> and the page
     content down by exactly the space this bar occupies — 0 once dismissed.
     Measured rather than hard-coded because the text wraps at small widths. */
  useEffect(() => {
    const el = barRef.current;
    if (!el) {
      onHeightChange?.(0);
      return;
    }
    const report = () => onHeightChange?.(el.offsetHeight);
    report();
    const observer = new ResizeObserver(report);
    observer.observe(el);
    return () => observer.disconnect();
  }, [dismissed, lang, onHeightChange]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("emergency_banner_dismissed", "true");
    } catch {
      /* Dismissal just will not survive a reload. */
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div ref={barRef} className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#5c0606] via-[#930b0b] to-[#5c0606] text-white px-4 py-2 text-xs font-semibold border-b border-red-500/30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping shrink-0" />
          <span className="text-amber-200 font-bold uppercase tracking-wider text-[10px]">
            {lang === "uz" ? "Shoshilinch Yordam" : lang === "ru" ? "Срочная Помощь" : "Emergency"}
          </span>
          <span className="hidden sm:inline text-red-100 font-normal">
            {lang === "uz"
              ? "Tishingiz to'satdan bezovta qilyaptimi? Dr. Munojat Akbarova qabuliga navbatsiz yoziling:"
              : lang === "ru"
              ? "Острая зубная боль? Запишитесь на срочный приём к Д-р Мунаджат без очереди:"
              : "Acute tooth pain? Book an urgent same-day consultation with Dr. Munojat:"}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+998941061555"
            className="flex items-center gap-1.5 bg-white text-[#930b0b] px-3 py-1 rounded-full text-[11px] font-black hover:bg-amber-100 transition-colors shadow-xs"
          >
            <IconPhone className="w-3 h-3 text-[#930b0b]" />
            <span>+998 (94) 106-15-55</span>
          </a>

          <button
            onClick={handleDismiss}
            aria-label={a11y.close}
            className="text-white/70 hover:text-white text-base leading-none px-1"
          >
            ✕
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmergencyBanner;
