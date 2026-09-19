import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Seo from "../components/Seo";
import { IconPhone, IconTelegram } from "../components/MedicalIcons";
import { DOCTOR_INFO } from "../constants/doctor";

/**
 * 404 page.
 *
 * Unknown URLs previously rendered an empty <main> with the homepage's title and
 * canonical, which search engines read as a soft 404: indexable, duplicated, and
 * a waste of crawl budget. This route gives them real content and a noindex.
 *
 * A static host cannot return a 404 status from client-side routing, so the
 * build also writes this page to dist/404.html - Netlify, Vercel, GitHub Pages
 * and nginx (error_page 404 /404.html) serve that with a genuine 404 status.
 */
const NotFound = () => {
  const { lang } = useLanguage();

  const t = {
    uz: {
      title: "Sahifa topilmadi",
      heading: "Bu sahifa mavjud emas",
      body: "Siz qidirgan sahifa ko'chirilgan yoki o'chirilgan bo'lishi mumkin. Quyidagi bo'limlardan birini tanlang yoki to'g'ridan-to'g'ri bog'laning.",
      home: "Bosh sahifa",
      services: "Xizmatlar",
      contact: "Aloqa",
      call: "Qo'ng'iroq qilish",
      seoTitle: "Sahifa topilmadi (404) — Dr. Munojat Akbarova",
      seoDesc: "Bu sahifa mavjud emas. Dr. Munojat Akbarova — Andijondagi ayol stomatolog. Qabulga yozilish: +998 (94) 106-15-55",
    },
    ru: {
      title: "Страница не найдена",
      heading: "Такой страницы нет",
      body: "Возможно, страница была перемещена или удалена. Выберите один из разделов ниже или свяжитесь с нами напрямую.",
      home: "Главная",
      services: "Услуги",
      contact: "Контакты",
      call: "Позвонить",
      seoTitle: "Страница не найдена (404) — Д-р Мунаджат Акбарова",
      seoDesc: "Такой страницы нет. Д-р Мунаджат Акбарова — женский стоматолог в Андижане. Запись: +998 (94) 106-15-55",
    },
    en: {
      title: "Page not found",
      heading: "This page does not exist",
      body: "The page you were looking for may have been moved or removed. Pick a section below, or get in touch directly.",
      home: "Home",
      services: "Services",
      contact: "Contact",
      call: "Call now",
      seoTitle: "Page not found (404) — Dr. Munojat Akbarova",
      seoDesc: "This page does not exist. Dr. Munojat Akbarova — female dentist in Andijan. Book: +998 (94) 106-15-55",
    },
  }[lang];

  return (
    <>
      <Seo title={t.seoTitle} description={t.seoDesc} noindex />

      <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 bg-[#0d0101] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#930b0b]/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#fd1616]/15 rounded-full blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#fd1616] font-black tracking-[0.3em] text-sm mb-3">404</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            {t.heading}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {t.body}
          </p>

          <nav aria-label={t.title} className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link
              to="/"
              className="min-h-[46px] px-6 py-3 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              {t.home}
            </Link>
            <Link
              to="/services"
              className="min-h-[46px] px-6 py-3 rounded-full bg-white/10 border border-white/25 text-white font-bold text-sm hover:bg-white/20 transition-all"
            >
              {t.services}
            </Link>
            <Link
              to="/contact"
              className="min-h-[46px] px-6 py-3 rounded-full bg-white/10 border border-white/25 text-white font-bold text-sm hover:bg-white/20 transition-all"
            >
              {t.contact}
            </Link>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${DOCTOR_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white text-[#930b0b] font-black text-xs shadow-md hover:bg-amber-50 transition-colors"
            >
              <IconPhone className="w-4 h-4 text-[#930b0b]" />
              <span>{DOCTOR_INFO.phone}</span>
            </a>
            <a
              href={DOCTOR_INFO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#229ed9] text-white font-black text-xs shadow-md hover:brightness-110 transition-all"
            >
              <IconTelegram className="w-4 h-4 text-white" />
              <span>{DOCTOR_INFO.telegramHandle}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
