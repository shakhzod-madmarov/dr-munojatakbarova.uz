import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconLocationPin,
  IconClock,
} from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const FloatingActionHub = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
        setOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label={a11y.quickActions}
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-auto"
    >
      
      {/* Expanded Menu Actions */}
      {open && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-fade-in-up">
          
          {/* Quick Booking */}
          <button
            onClick={() => {
              setOpen(false);
              if (onOpenBooking) onOpenBooking();
            }}
            aria-label={a11y.openBooking}
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white px-4 py-2 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold border border-white/20 cursor-pointer"
          >
            <span>{lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Запись на приём" : "Book Appointment"}</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <IconClock className="w-3.5 h-3.5 text-white" />
            </span>
          </button>

          {/* Instagram Profile */}
          <a
            href="https://www.instagram.com/dr_munojatakbarova/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={a11y.instagram}
            className="flex items-center gap-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white px-4 py-2 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold border border-white/20"
          >
            <span>Instagram: @dr_munojatakbarova</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <IconInstagram className="w-3.5 h-3.5 text-white" />
            </span>
          </a>

          {/* Telegram Chat */}
          <a
            href="https://t.me/dr_munojat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={a11y.telegram}
            className="flex items-center gap-2.5 bg-[#229ED9] text-white px-4 py-2 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold border border-white/20"
          >
            <span>Telegram: @dr_munojat</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <IconTelegram className="w-3.5 h-3.5 text-white" />
            </span>
          </a>

          {/* Phone Call */}
          <a
            href="tel:+998941061555"
            aria-label={a11y.call}
            className="flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold border border-white/20"
          >
            <span>+998 (94) 106-15-55</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <IconPhone className="w-3.5 h-3.5 text-white" />
            </span>
          </a>

          {/* Yandex Maps: Orzu Stoma Denta */}
          <a
            href="https://yandex.uz/maps/-/CTT8VGNR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={a11y.yandexMap}
            className="flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold border border-white/20"
          >
            <span>Orzu Stoma Denta</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <IconLocationPin className="w-3.5 h-3.5 text-white" />
            </span>
          </a>

        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Tezkor menyuni yopish" : "Tezkor aloqa va yozilish menyusi"}
        aria-expanded={open}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#930b0b] to-[#fd1616] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-white/30 cursor-pointer"
      >
        <IconPhone className="w-5 h-5 text-white" />
      </button>

    </aside>
  );
};

export default FloatingActionHub;
