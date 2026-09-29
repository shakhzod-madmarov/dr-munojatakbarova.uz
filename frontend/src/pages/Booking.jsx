/**
 * Booking.jsx — /qabul (uz) · /ru/qabul · /en/qabul
 * ===================================================
 * Dedicated full-page appointment booking (dentahouse.uz layout):
 *   • Compact classic Doctor profile card at top
 *   • InlineBookingSection ("Uchrashuv vaqtini tanlang") directly below
 */

import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Seo from "../components/Seo";
import InlineBookingSection from "../components/InlineBookingSection";
import { DOCTOR_INFO, OPENING_HOURS, getYearsOfExperience } from "../constants/doctor";
import { assets } from "../assets/assets";

const T = {
  uz: {
    seoTitle: "Qabulga Yozilish | Dr. Munojat Akbarova — Orzu Stoma Denta",
    seoDesc: "Dr. Munojat Akbarova qabuliga onlayn yozilish. Andijon, Orzu Stoma Denta. Qulay kun va bo'sh soatni tanlang.",
    name: "Dr. Munojat Akbarova",
    specialty: "Oliy Toifali Shifokor-Stomatolog, Terapevt, Ortoped va Implantolog",
    degreeLabel: "Ma'lumoti",
    degreeVal: "TDSI bakalavri · ADTI magistri",
    expLabel: "Tajriba",
    expVal: (y) => `${y} yil`,
    aboutLabel: "Shifokor haqida",
    aboutVal: "Tish og'rig'ini bartaraf etish, badiiy plombalash, tsirkoniy karonkalar va dental implantatsiya bo'yicha mutaxassis. Ayollar uchun alohida yopiq kabinet.",
    onlineHours: "Onlayn qabul: 08:00 – 18:00",
    lunch: "Tushlik: 12:00 – 13:00",
    sunday: "Yakshanba: onlayn bron yopiq",
    note: "Agar sizga kerakli vaqtda onlayn bron mavjud bo'lmasa, iltimos, klinikamizga qo'ng'iroq qilib administrator bilan bog'laning.",
  },
  ru: {
    seoTitle: "Онлайн Запись | Д-р Мунаджат Акбарова — Orzu Stoma Denta",
    seoDesc: "Онлайн запись к Д-р Мунаджат Акбаровой. Андижан, Orzu Stoma Denta. Выберите удобный день и свободное время.",
    name: "Д-р Мунаджат Акбарова",
    specialty: "Стоматолог высшей категории, Терапевт, Ортопед и Имплантолог",
    degreeLabel: "Образование",
    degreeVal: "Бакалавриат ТГСИ · Магистратура АГМИ",
    expLabel: "Опыт",
    expVal: (y) => `${y} лет`,
    aboutLabel: "О враче",
    aboutVal: "Специалист по снятию острой боли, эстетическому пломбированию, циркониевым коронкам и дентальной имплантации. Отдельный приватный женский кабинет.",
    onlineHours: "Онлайн приём: 08:00 – 18:00",
    lunch: "Обед: 12:00 – 13:00",
    sunday: "Воскресенье: выходной",
    note: "Если в нужное вам время онлайн-запись недоступна, пожалуйста, позвоните в клинику и свяжитесь с администратором.",
  },
  en: {
    seoTitle: "Book Appointment | Dr. Munojat Akbarova — Orzu Stoma Denta",
    seoDesc: "Online appointment booking with Dr. Munojat Akbarova. Andijan, Orzu Stoma Denta. Select a convenient date and time.",
    name: "Dr. Munojat Akbarova",
    specialty: "Senior Dentist, Restorative Specialist, Prosthodontist & Implantologist",
    degreeLabel: "Education",
    degreeVal: "TSDI Bachelor · ASMI Master's Residency",
    expLabel: "Experience",
    expVal: (y) => `${y}+ years`,
    aboutLabel: "About the Doctor",
    aboutVal: "Specialist in pain-free restorative care, zirconia crowns, and dental implantology. Dedicated private treatment suite for women.",
    onlineHours: "Online booking: 08:00 – 18:00",
    lunch: "Lunch break: 12:00 – 13:00",
    sunday: "Sunday: closed",
    note: "If your preferred time is not listed, please call our clinic desk directly for assistance.",
  },
};

const Booking = () => {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const t = T[lang] || T.uz;
  const years = getYearsOfExperience();

  const initialService = searchParams.get("service") || null;
  const initialNote = searchParams.get("note") || "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: DOCTOR_INFO.clinicName,
    url: "https://drmunojat.uz/qabul",
    telephone: DOCTOR_INFO.phoneRaw,
    openingHours: OPENING_HOURS.display.uz,
  };

  return (
    <>
      <Seo
        page="booking"
        path="/qabul"
        title={t.seoTitle}
        description={t.seoDesc}
        schemaJson={schema}
      />

      <div className="min-h-screen bg-slate-50/70 pt-24 sm:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* ── 1. Doctor Profile Card (dentahouse.uz layout) ─────────── */}
          <article className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <figure className="lg:col-span-5 bg-slate-50 flex items-center justify-center p-5 sm:p-6 m-0">
                <img
                  src={assets.drMunojatLoupes}
                  alt={t.name}
                  width={420}
                  height={520}
                  className="w-full max-w-[360px] h-auto max-h-[440px] rounded-2xl object-cover object-[center_20%]"
                  loading="eager"
                  decoding="async"
                />
              </figure>

              <section className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center gap-5 text-left">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#930b0b]">
                    {t.name}
                  </h1>
                  <p className="text-slate-600 mt-1 text-sm sm:text-base">
                    {t.specialty}
                  </p>
                </header>

                <div className="grid grid-cols-2 gap-4 text-sm border-y border-slate-100 py-4">
                  <div>
                    <p className="text-slate-400 text-xs">{t.degreeLabel}</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{t.degreeVal}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">{t.expLabel}</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{t.expVal(years)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-xs mb-1">{t.aboutLabel}</p>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {t.aboutVal}
                  </p>
                </div>

                <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                  <li className="font-medium text-slate-800">• {t.onlineHours}</li>
                  <li>• {t.lunch}</li>
                  <li>• {t.sunday}</li>
                  <li className="pt-1 text-xs text-slate-500">{t.note}</li>
                </ul>
              </section>
            </div>
          </article>

          {/* ── 2. Inline Date & Time Slot Picker (dentahouse.uz style) ─ */}
          <InlineBookingSection
            initialService={initialService}
            initialNote={initialNote}
            sectionId="uchrashuv-vaqti"
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
