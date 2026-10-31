import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "../context/LanguageContext";
import { useBooking } from "../context/BookingContext";
import Seo from "../components/Seo";
import InlineBookingSection from "../components/InlineBookingSection";
import DentalSticker from "../components/DentalSticker";
import { assets } from "../assets/assets";
import {
  IconDentalImplant,
  IconTherapeuticTooth,
  IconVeneerTooth,
  IconSurgicalScalpel,
  IconCosmeticSmile,
  IconShieldCheck,
  IconPrivacyLock,
  IconPhone,
  IconCheckCircle,
  IconSparkleStar,
} from "../components/MedicalIcons";
import { toast } from "react-toastify";

import { detailedSpecialties } from "../constants/specialties";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const lp = useLocalizedPath();

  const specialty = detailedSpecialties[slug] || detailedSpecialties["implantatsiya"];

  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", notes: "" });
  const { openBooking } = useBooking();

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      toast.error(
        lang === "uz" ? "Ismingiz va telefon raqamingizni kiriting" :
        lang === "ru" ? "Введите имя и номер телефона" :
        "Please enter your name and phone number"
      );
      return;
    }
    /* Hand the patient to the real calendar instead of opening Telegram
       with the details typed into a message, which no calendar ever saw.
       They pick a free time and it lands in the dentist's MedInson app. */
    openBooking({
      service: specialty.slug,
      name: bookingForm.name,
      phone: bookingForm.phone,
      note: bookingForm.notes,
    });
  };

  const otherSpecialties = Object.values(detailedSpecialties).filter((s) => s.slug !== specialty.slug);

  const pathPrefix = lang === "uz" ? "" : `/${lang}`;
  const serviceCanonicalUrl = `https://drmunojat.uz${pathPrefix}/services/${specialty.slug}`;
  const homeCanonicalUrl = `https://drmunojat.uz${pathPrefix}`;
  const servicesCanonicalUrl = `https://drmunojat.uz${pathPrefix}/services`;

  const breadcrumbHome = lang === "uz" ? "Bosh sahifa" : lang === "ru" ? "Главная" : "Home";
  const breadcrumbServices = lang === "uz" ? "Xizmatlar" : lang === "ru" ? "Услуги" : "Services";

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalProcedure", "MedicalWebPage"],
        "@id": `${serviceCanonicalUrl}#procedure`,
        "name": specialty.title[lang],
        "description": specialty.metaDescription[lang],
        "url": serviceCanonicalUrl,
        "procedureType": "Dental",
        "provider": {
          "@type": ["Dentist", "Physician"],
          "@id": "https://drmunojat.uz/about#doctor",
          "name": "Dr. Munojat Akbarova",
          "jobTitle": lang === "uz" ? "Oliy Toifali Shifokor-Stomatolog" : lang === "ru" ? "Врач-стоматолог высшей категории" : "Female Dental Specialist",
          "telephone": "+998941061555",
          "sameAs": [
            "https://g.page/r/CXp3o79wS1FnEBM",
            "https://yandex.uz/maps/org/138661792687/",
            "https://www.instagram.com/dr_munojatakbarova/",
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shabnam ko'chasi, 11",
            "addressLocality": "Andijon",
            "addressRegion": "Andijon viloyati",
            "postalCode": "170100",
            "addressCountry": "UZ",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceCanonicalUrl}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": breadcrumbHome,
            "item": homeCanonicalUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": breadcrumbServices,
            "item": servicesCanonicalUrl,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": specialty.title[lang],
            "item": serviceCanonicalUrl,
          },
        ],
      },
      ...(specialty.faqs && specialty.faqs[lang] && specialty.faqs[lang].length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${serviceCanonicalUrl}#faq`,
              "mainEntity": specialty.faqs[lang].map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <Seo
        title={specialty.seoTitle[lang]}
        description={specialty.metaDescription[lang]}
        keywords={`${specialty.title[lang]}, ${specialty.slug} Andijon, ayol stomatolog Andijon, Dr Munojat Akbarova`}
        path={`/services/${specialty.slug}`}
        schemaJson={schemaJson}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-14 bg-[#0d0101] overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#930b0b]/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#fd1616]/15 rounded-full blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-red-300/70 mb-6 font-semibold">
            <Link to={lp("/")} className="hover:text-white transition-colors">{breadcrumbHome}</Link>
            <span>/</span>
            <Link to={lp("/services")} className="hover:text-white transition-colors">{breadcrumbServices}</Link>
            <span>/</span>
            <span className="text-[#fd1616]">{specialty.title[lang]}</span>
          </nav>

          <span className="section-tag mb-4 inline-block">{typeof specialty.badge === "object" ? specialty.badge[lang] : specialty.badge}</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            {specialty.title[lang]}
          </h1>
          <p className="text-red-200/80 text-base sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {specialty.subtitle[lang]}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#book"
              className="btn-crimson min-h-[50px] px-8 py-3.5 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <span className="flex items-center gap-2"><IconPhone className="w-4 h-4 text-white" /> {lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться на Приём" : "Book Appointment"}</span>
            </a>
            <a
              href="tel:+998941061555"
              className="btn-ghost min-h-[50px] px-8 py-3.5 text-sm sm:text-base inline-flex items-center gap-2"
            >
              <span>+998 (94) 106-15-55</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 bg-[#fff8f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

          {/* Overview Block */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#930b0b] to-[#fd1616] rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505]">
                {lang === "uz" ? "Muolaja Haqida To'liq Ma'lumot" : lang === "ru" ? "О Процедуре" : "Clinical Overview"}
              </h2>
            </div>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {specialty.overview[lang]}
            </p>

            {/* Indications */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50/40 rounded-2xl p-6 border border-red-100">
              <h3 className="font-black text-base text-[#930b0b] mb-4 flex items-center gap-2">
                <IconSparkleStar className="w-5 h-5 text-[#930b0b]" />
                <span>{lang === "uz" ? "Kimlarga Tavsiya Etiladi?" : lang === "ru" ? "Кому показана процедура?" : "Who is this procedure for?"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.indications[lang].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <span className="text-[#fd1616] font-black">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Materials Section (e.g. 4 Countries Plombalar) */}
          {specialty.materials && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="section-tag">
                  {lang === "uz" ? "PLOMBA MATERIALLARI" : lang === "ru" ? "МАТЕРИАЛЫ ПЛОМБ" : "FILLING SYSTEMS"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                  {specialty.materials.title[lang]}
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {specialty.materials.subtitle[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {specialty.materials.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between hover:border-red-300 hover:shadow-md transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800">
                          <span className={`w-2 h-2 rounded-full ${item.flagColor} shrink-0`} />
                          <span>{item.country[lang]}</span>
                        </span>
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-[#930b0b]">
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-black text-base text-slate-900 mb-2 leading-tight">
                        {item.brand}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {item.desc[lang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 space-y-1.5">
                      {item.features[lang].map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step by Step Timeline */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="section-tag">
                {lang === "uz" ? "BOSQICHMA-BOSQICH" : lang === "ru" ? "ЭТАПЫ" : "STEP-BY-STEP"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                {lang === "uz" ? "Muolaja Qanday O'tkaziladi?" : lang === "ru" ? "Как проходит процедура?" : "How is the procedure performed?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {specialty.steps[lang].map((step, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 flex flex-col relative group hover:border-[#930b0b]/40 hover:shadow-red-sm transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#930b0b] to-[#fd1616] text-white flex items-center justify-center text-xs font-black mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-black text-sm text-[#1a0505] mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="section-tag">
                {lang === "uz" ? "TAQQOSLASH" : lang === "ru" ? "СРАВНЕНИЕ" : "COMPARISON"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                {specialty.comparison.title[lang]}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#1a0505] text-white">
                    {specialty.comparison.headers[lang].map((h, i) => (
                      <th key={i} className="p-4 font-black text-xs uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {specialty.comparison.rows[lang].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="p-4 font-bold text-slate-800">{row[0]}</td>
                      <td className="p-4 font-semibold text-[#930b0b] bg-red-50/40">{row[1]}</td>
                      <td className="p-4 text-slate-500">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Specialty FAQ */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-soft">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="section-tag">
                {lang === "uz" ? "SAVOL VA JAVOBLAR" : lang === "ru" ? "ВОПРОСЫ" : "FAQ"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1a0505] mt-2">
                {specialty.title[lang]} — {lang === "uz" ? "Tez-tez beriladigan savollar" : lang === "ru" ? "Частые вопросы" : "FAQ"}
              </h2>
            </div>

            <div className="space-y-4">
              {specialty.faqs[lang].map((faq, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                  <h3 className="font-black text-base text-[#1a0505] mb-2 flex items-start gap-2">
                    <span className="text-[#fd1616]">❓</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Inline Booking Section */}
          <div id="book">
            <InlineBookingSection sectionId="uchrashuv-vaqti" initialService={specialty.slug} />
          </div>

          {/* Other Specialties navigation */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1a0505] mb-6 text-center">
              {lang === "uz" ? "Boshqa Xizmatlarimiz" : lang === "ru" ? "Другие Услуги" : "Explore Other Services"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherSpecialties.map((other) => {
                const specialtyMedia = {
                  ortopediya: { image: assets.heroSmile },
                  implantatsiya: { image: assets.treatmentImplant },
                  "tish-oqartirish": { image: assets.treatmentWhitening },
                  "tish-davolash": { image: assets.clinicRoom },
                  xirurgiya: { image: assets.treatmentSurgery },
                };
                const media = specialtyMedia[other.slug] || specialtyMedia["implantatsiya"];

                return (
                  <Link
                    key={other.slug}
                    to={lp(`/services/${other.slug}`)}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-[#930b0b]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Clinical Procedure Photo Header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={media.image}
                          alt={other.title[lang]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                          <DentalSticker type={other.slug} lang={lang} />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-1.5">
                        <h4 className="font-black text-sm text-[#1a0505] group-hover:text-[#930b0b] transition-colors leading-snug">
                          {other.title[lang]}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {other.subtitle[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                      <span>{lang === "uz" ? "Batafsil ma'lumot" : lang === "ru" ? "Подробнее" : "Learn more"}</span>
                      <span>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
