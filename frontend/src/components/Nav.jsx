import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage, useLocalizedPath, LANGS } from "../context/LanguageContext";
import Logo from "./Logo";
import { IconPhone } from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const Nav = ({ onOpenBooking }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, changeLanguage } = useLanguage();
  const lp = useLocalizedPath();
  const a11y = getA11yLabels(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setShowMenu(false);
  }

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showMenu]);

  const navItems = [
    { name: { uz: "Bosh sahifa", ru: "Главная", en: "Home" }[lang], path: "/", exact: true },
    { name: { uz: "Xizmatlar", ru: "Услуги", en: "Services" }[lang], path: "/services" },
    { name: { uz: "Dr. Munojat haqida", ru: "О докторе", en: "About Dr." }[lang], path: "/about" },
    { name: { uz: "Natijalar", ru: "Результаты", en: "Results" }[lang], path: "/gallery" },
    { name: { uz: "Aloqa", ru: "Контакты", en: "Contact" }[lang], path: "/contact" },
  ];

  return (
    <>
      <header
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl shadow-md border-b border-slate-200/90 py-2 sm:py-2.5"
            : "bg-white/95 backdrop-blur-xl shadow-xs border-b border-slate-200/70 py-2.5 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">

          {/* Brand Logo */}
          <NavLink to={lp("/")} aria-label="Dr. Munojat Akbarova" className="flex items-center shrink-0">
            <Logo />
          </NavLink>

          {/* Desktop Nav Links */}
          <nav aria-label={a11y.mainNav} className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={lp(item.path)}
                end={item.exact}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#930b0b] text-white shadow-md font-black scale-105"
                      : "text-slate-700 hover:text-[#930b0b] hover:bg-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right actions: Language Switcher, Call Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100/90 rounded-full p-0.5 sm:p-1 border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-700">
              {LANGS.map((code) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  aria-label={code === "uz" ? "O'zbek tiliga o'tish" : code === "ru" ? "Переключить на русский язык" : "Switch to English"}
                  className={`px-2 sm:px-2.5 py-1 rounded-full uppercase transition-all ${
                    lang === code
                      ? "bg-white text-[#930b0b] shadow-xs font-black"
                      : "hover:text-[#930b0b] text-slate-600"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Direct Phone Call Button (hidden on small mobile screens) */}
            <a
              href="tel:+998941061555"
              aria-label={a11y.call}
              className="hidden md:inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <IconPhone className="w-3.5 h-3.5 text-white" />
              <span>+998 (94) 106-15-55</span>
            </a>

            {/* Mobile Animated Hamburger Button */}
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label={showMenu ? "Menyuni yopish" : "Asosiy menyuni ochish"}
              aria-expanded={showMenu}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-800 transition-all border border-slate-200/70 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#930b0b]"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between items-center relative">
                <span
                  className={`w-full h-0.5 bg-slate-800 rounded-full transition-all duration-300 origin-center ${
                    showMenu ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-slate-800 rounded-full transition-all duration-200 ${
                    showMenu ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-slate-800 rounded-full transition-all duration-300 origin-center ${
                    showMenu ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Drawer Navigation (Slide-down with luxury glass backdrop) */}
        {showMenu && (
          <nav
            aria-label={a11y.mobileNav}
            className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-2xl px-4 sm:px-6 py-5 space-y-4 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
          >
            {/* Nav Links */}
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={lp(item.path)}
                  end={item.exact}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#930b0b] text-white shadow-md font-black"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800"
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <span className="text-xs opacity-70">→</span>
                </NavLink>
              ))}
            </div>

            {/* Language Switcher inside Drawer */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                {lang === "uz" ? "Tilni tanlang" : lang === "ru" ? "Выберите язык" : "Select language"}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: "uz", label: "O'zbek" },
                  { code: "ru", label: "Русский" },
                  { code: "en", label: "English" },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code);
                      setShowMenu(false);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                      lang === l.code
                        ? "bg-red-50 border-[#930b0b] text-[#930b0b] shadow-xs font-black"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons in Drawer */}
            <div className="space-y-2.5 pt-2">
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#e11d48] via-[#fd1616] to-[#ea580c] text-white font-black text-sm shadow-lg shadow-red-900/30 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  <span>{lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться на Приём" : "Book Appointment"}</span>
                </button>
              )}

              <a
                href="tel:+998941061555"
                aria-label={a11y.call}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-all"
              >
                <IconPhone className="w-4 h-4 text-[#930b0b]" />
                <span>+998 (94) 106-15-55</span>
              </a>
            </div>

            {/* Clinic Info Snippet */}
            <div className="pt-2 text-center text-xs text-slate-400 space-y-1 border-t border-slate-100">
              <p className="font-semibold text-slate-600">
                {lang === "uz" ? "Andijon sh., Milliy Tiklanish ko'chasi" : lang === "ru" ? "г. Андижан, ул. Миллий Тикланиш" : "Andijan, Milliy Tiklanish street"}
              </p>
              <p className="text-[11px]">
                {lang === "uz" ? "Har kuni: 08:30 – 18:00" : lang === "ru" ? "Ежедневно: 08:30 – 18:00" : "Daily: 08:30 – 18:00"}
              </p>
            </div>
          </nav>
        )}
      </header>

      {/* Dimmed Backdrop when Mobile Menu is Open */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Nav;
