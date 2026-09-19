import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";
import { IconPhone } from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const Nav = ({ topOffset = 0 }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, changeLanguage } = useLanguage();
  const a11y = getA11yLabels(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
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
    <header
      style={{ top: topOffset }}
      /* Transition only the scroll-state properties. `transition-all` would also
         animate the `top` offset above, which leaves the bar mid-flight. */
      className={`fixed left-0 right-0 z-50 transition-[padding,background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100/80 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <NavLink to="/" aria-label="Dr. Munojat Akbarova" className="flex items-center min-w-0">
          <Logo />
        </NavLink>

        {/* Desktop Nav Links */}
        <nav aria-label={a11y.mainNav} className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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

        {/* Right actions: Language Switcher & Call Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 text-[11px] font-bold text-slate-700">
            {["uz", "ru", "en"].map((code) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                aria-label={code === "uz" ? "O'zbek tiliga o'tish" : code === "ru" ? "Переключить на русский язык" : "Switch to English"}
                className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                  lang === code ? "bg-white text-[#930b0b] shadow-xs font-black" : "hover:text-[#930b0b]"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Direct Phone Call Button */}
          <a
            href="tel:+998941061555"
            aria-label={a11y.call}
            className="hidden sm:inline-flex items-center gap-2 min-h-[42px] px-5 py-2 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <IconPhone className="w-3.5 h-3.5 text-white" />
            <span>+998 (94) 106-15-55</span>
          </a>

          {/* Mobile Hamburger Menu Trigger */}
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label={showMenu ? "Menyuni yopish" : "Asosiy menyuni ochish"}
            aria-expanded={showMenu}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 hover:text-[#930b0b] transition-colors cursor-pointer"
          >
            {showMenu ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {showMenu && (
        <nav aria-label={a11y.mobileNav} className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 animate-fade-in-up">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-bold ${
                  isActive ? "bg-red-50 text-[#930b0b] font-black" : "text-slate-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2">
            <a
              href="tel:+998941061555"
              aria-label={a11y.call}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#930b0b] text-white font-bold text-sm shadow-md"
            >
              <IconPhone className="w-4 h-4 text-white" />
              <span>+998 (94) 106-15-55</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Nav;
