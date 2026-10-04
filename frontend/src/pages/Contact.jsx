import { useLanguage } from "../context/LanguageContext";
import Seo from "../components/Seo";
import ClinicLocationMap from "../components/ClinicLocationMap";
import InlineBookingSection from "../components/InlineBookingSection";
import {
  IconPhone,
  IconTelegram,
  IconInstagram,
  IconClock,
  IconGoogle,
  IconYandex,
} from "../components/MedicalIcons";
import { OPENING_HOURS } from "../constants/doctor";
import { getA11yLabels } from "../constants/a11yLabels";

const Contact = () => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);

  const t = {
    uz: {
      tag: "ORZU STOMA DENTA • ANDIJON",
      heading: "Dr. Munojat Akbarova Bilan Bog'laning",
      sub: "Orzu Stoma Denta klinikasida xotin-qizlar uchun 100% og'riqsiz, maxfiy va xavfsiz qabul.",
      formTitle: "Tezkor Qabulga Yozilish",
      namePh: "Ismingiz (masalan: Malika)",
      phonePh: "Telefon raqamingiz (+998 90 ...)",
      serviceLabel: "Qiziqtirgan xizmat",
      msgPh: "Tishingizdagi bezovtalik (ixtiyoriy)",
      send: "Bo'sh Vaqtni Tanlash",
      hours: "Qabul Vaqti",
      hoursVal: OPENING_HOURS.display.uz,
      phone: "Telefon",
      ig: "Instagram",
      tg: "Telegram",
      loc: "Klinika Manzili",
      locVal: "Andijon shahri, Shabnam ko'chasi, 11 (Orzu Stoma Denta)",
    },
    ru: {
      tag: "ORZU STOMA DENTA • АНДИЖАН",
      heading: "Свяжитесь с Д-р Мунаджат",
      sub: "Приватный приём для женщин в клинике Orzu Stoma Denta в Андижане.",
      formTitle: "Запись на Приём",
      namePh: "Ваше имя (например: Малика)",
      phonePh: "Номер телефона (+998 90 ...)",
      serviceLabel: "Услуга",
      msgPh: "Ваше сообщение (необязательно)",
      send: "Выбрать свободное время",
      hours: "Часы приёма",
      hoursVal: OPENING_HOURS.display.ru,
      phone: "Телефон",
      ig: "Instagram",
      tg: "Telegram",
      loc: "Адрес Клиники",
      locVal: "г. Андижан, ул. Шабнам, 11 (клиника Orzu Stoma Denta)",
    },
    en: {
      tag: "ORZU STOMA DENTA • ANDIJAN",
      heading: "Contact Dr. Munojat Akbarova",
      sub: "Private, gentle dental care for women at Orzu Stoma Denta in Andijan.",
      formTitle: "Book An Appointment",
      namePh: "Your Name",
      phonePh: "Phone Number (+998 90 ...)",
      serviceLabel: "Service",
      msgPh: "Your message (optional)",
      send: "Choose a free time",
      hours: "Opening Hours",
      hoursVal: OPENING_HOURS.display.en,
      phone: "Phone",
      ig: "Instagram",
      tg: "Telegram",
      loc: "Clinic Location",
      locVal: "11 Shabnam Street, Andijan (Orzu Stoma Denta)",
    },
  }[lang] || {};

  return (
    <div className="bg-[#fff8f8]">
      <Seo
        page="contact"
        path="/contact"
      />

      {/* Hero Header */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 bg-[#120202] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-black text-amber-300 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/15">
            {t.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-3">
            {t.heading}
          </h1>
          <p className="text-red-100/85 text-sm sm:text-base max-w-lg mx-auto">
            {t.sub}
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards + Inline Booking Section */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-4">
              <address className="not-italic bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4" itemScope itemType="https://schema.org/MedicalBusiness">
                <meta itemProp="name" content="Dr. Munojat Akbarova — Orzu Stoma Denta" />
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                  Tezkor Aloqa Kanallari
                </h3>

                <a
                  href="tel:+998941061555"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-red-50 hover:bg-red-100 text-slate-900 transition-colors"
                  itemProp="telephone"
                  aria-label={a11y.call}
                >
                  <span className="w-10 h-10 rounded-xl bg-[#930b0b] text-white flex items-center justify-center shrink-0">
                    <IconPhone className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{t.phone}</p>
                    <p className="text-sm font-black text-[#930b0b]">+998 (94) 106-15-55</p>
                  </div>
                </a>

                <a
                  href="https://t.me/dr_munojat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-slate-900 transition-colors"
                  aria-label={a11y.telegram}
                >
                  <span className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <IconTelegram className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{t.tg}</p>
                    <p className="text-sm font-black text-sky-700">@dr_munojat</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/dr_munojatakbarova/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 text-slate-900 transition-colors"
                  aria-label={a11y.instagram}
                >
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                    <IconInstagram className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{t.ig}</p>
                    <p className="text-sm font-black text-pink-700">@dr_munojatakbarova</p>
                  </div>
                </a>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                    <IconClock className="w-4 h-4 text-amber-600" />
                    <span>{t.hours}:</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6">{t.hoursVal}</p>
                </div>

                {/* Direct Google & Yandex Maps Review Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50 border border-amber-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-black text-xs">
                      <span className="text-sm">⭐</span>
                      <span>{lang === "uz" ? "Bizga xolis baho bering" : "Оцените нас на картах"}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                      5.0 ★
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-950/80 leading-relaxed">
                    {lang === "uz"
                      ? "Dr. Munojat qabulida bo'lganmisiz? Google yoki Yandex xaritalarda o'z samimiy fikringizni qoldiring!"
                      : "Были на приёме у Д-р Мунаджат? Оставьте честный отзыв на картах Google или Яндекс!"}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href="https://maps.google.com/?cid=4641379713526839793"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] shadow-2xs transition-all active:scale-95"
                      aria-label={a11y.googleReview}
                    >
                      <IconGoogle className="w-3.5 h-3.5 brightness-200" />
                      <span>Google</span>
                      <span>★</span>
                    </a>
                    <a
                      href="https://yandex.uz/maps/org/orzu_stoma_denta/215888013765/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-black text-[11px] shadow-2xs hover:brightness-105 transition-all active:scale-95"
                      aria-label={a11y.yandexReview}
                    >
                      <IconYandex className="w-3.5 h-3.5" />
                      <span>Yandex</span>
                      <span>★</span>
                    </a>
                  </div>
                </div>
              </address>
            </div>

            {/* Right: Inline Date & Time Booking Section */}
            <div className="lg:col-span-7">
              <InlineBookingSection sectionId="uchrashuv-vaqti" />
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Location Map with Real Yandex Map */}
      <ClinicLocationMap />
    </div>
  );
};

export default Contact;
