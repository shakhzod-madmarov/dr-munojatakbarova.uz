import { useState, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import Seo from "../components/Seo";
import { useModalA11y } from "../hooks/useModalA11y";
import {
  IconInstagram,
} from "../components/MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

/* Gallery case studies — high-end certified clinical dental protocols */
const galleryItems = [
  {
    id: 1,
    category: "before_after",
    image: assets.treatmentWhitening,
    stickerType: "tish-oqartirish",
    sealText: { uz: "YORQIN", ru: "БЛЕСК", en: "BRIGHT" },
    sealSub: { uz: "ZOOM 4", ru: "ZOOM 4", en: "ZOOM 4" },
    sealTheme: "gold",
    label: {
      uz: "ZOOM 4 Tish Oqartirish (Oldin / Keyin — Tabiiy Yorqin Oqlik)",
      ru: "ZOOM 4 Отбеливание зубов (До / После — Естественная Белизна)",
      en: "ZOOM 4 Teeth Whitening (Before / After — Natural Radiant Glow)",
    },
    service: "Tish Oqartirish",
  },
  {
    id: 2,
    category: "before_after",
    image: assets.heroSmile,
    stickerType: "ortopediya",
    sealText: { uz: "3 DAVLAT", ru: "3 СТРАНЫ", en: "3 NATIONS" },
    sealSub: { uz: "KARONKA", ru: "КОРОНКИ", en: "CROWNS" },
    sealTheme: "gold",
    label: {
      uz: "Old va Orqa Tish Karonkalari (Tsirkoniy & Keramika)",
      ru: "Циркониевые коронки для передних и жевательных зубов",
      en: "Zirconia Crowns for Front & Posterior Teeth",
    },
    service: "Ortopediya",
  },
  {
    id: 3,
    category: "before_after",
    image: assets.treatmentImplant,
    stickerType: "implantatsiya",
    sealText: { uz: "UZOQ YIL", ru: "НА ГОДЫ", en: "LONG-TERM" },
    sealSub: { uz: "TITAN", ru: "ТИТАН", en: "TITANIUM" },
    sealTheme: "emerald",
    label: {
      uz: "Titan Tish Implanti & Tsirkoniy Toj",
      ru: "Титановый имплант и циркониевая коронка",
      en: "Titanium Dental Implant & Zirconia Crown",
    },
    service: "Implantatsiya",
  },
  {
    id: 4,
    category: "before_after",
    image: assets.hero3DTooth,
    stickerType: "tish-davolash",
    sealText: { uz: "0 OG'RIQ", ru: "0 БОЛИ", en: "0 PAIN" },
    sealSub: { uz: "NANO-3M", ru: "НАНО-3М", en: "NANO-3M" },
    sealTheme: "gold",
    label: {
      uz: "Old Tishlar Kariesini Badiiy Qayta Tiklash",
      ru: "Художественная реставрация передних зубов",
      en: "Aesthetic Restoration of Front Incisors",
    },
    service: "Tish Davolash",
  },
  {
    id: 5,
    category: "clinic",
    image: assets.clinicRoom,
    stickerType: "clinic_women",
    sealText: { uz: "MAXFIY", ru: "ПРИВАТНО", en: "PRIVATE" },
    sealSub: { uz: "100% ZONA", ru: "100% ЗОНА", en: "100% SUITE" },
    sealTheme: "ruby",
    label: {
      uz: "Andijondagi Shinam va Maxfiy Ayollar Kabineti",
      ru: "Уютный и приватный кабинет для женщин в Андижане",
      en: "Comfortable and Private Clinic Room for Women in Andijan",
    },
    service: "Klinika",
  },
  {
    id: 6,
    category: "clinic",
    image: assets.treatmentSurgery,
    stickerType: "xirurgiya",
    sealText: { uz: "0 SHISH", ru: "0 ОТЕКОВ", en: "0 SWELLING" },
    sealSub: { uz: "PIEZO", ru: "ПЬЕЗО", en: "PIEZO" },
    sealTheme: "emerald",
    label: {
      uz: "Zamonaviy Mikroxirurgiya va Steril Operatsiya Xonasi",
      ru: "Современный микрохирургический кабинет",
      en: "Modern Microsurgery and Sterile Clinic Suite",
    },
    service: "Xirurgiya",
  },
];

const FILTERS = [
  { key: "all", uz: "Barchasi", ru: "Все работы", en: "All Cases" },
  { key: "before_after", uz: "Oldin / Keyin", ru: "До / После", en: "Before / After" },
  { key: "clinic", uz: "Klinika & Sharoitlar", ru: "Кабинет и условия", en: "Clinic & Setup" },
];

const Gallery = () => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const lightboxRef = useModalA11y(Boolean(lightbox), closeLightbox);

  const t = {
    uz: {
      tag: "ISHLAR VA NATIJALAR GALEREYASI",
      heading: "Bemorlar Tabassumi & Klinik Natijalar",
      sub: "Andijonda ayollar va qizlar uchun bajarilgan tish oqartirish, vinirlar va implantatsiya natijalari.",
      notice: "Eng so'nggi video sharhlar va real natijalarni Dr. Munojatning rasmiy Instagram sahifasida kuzatib boring!",
      igBtn: "Instagram @dr_munojatakbarova",
    },
    ru: {
      tag: "ГАЛЕРЕЯ РАБОТ И РЕЗУЛЬТАТОВ",
      heading: "Улыбки Пациенток и Результаты",
      sub: "Результаты процедур для женщин в Андижане: отбеливание, виниры, коронки и импланты.",
      notice: "Смотрите свежие видео-отзывы и реальные клинические кейсы в официальном Instagram!",
      igBtn: "Instagram @dr_munojatakbarova",
    },
    en: {
      tag: "CLINICAL CASES & SMILE GALLERY",
      heading: "Patient Smiles & Clinical Results",
      sub: "Dental treatments, teeth whitening, veneers and implant results performed for women in Andijan.",
      notice: "Follow the latest video reviews and before/after cases on Dr. Munojat's official Instagram page!",
      igBtn: "Instagram @dr_munojatakbarova",
    },
  }[lang] || {};

  const filtered = filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <div className="bg-[#fff8f8]">
      <Seo
        title="Dr. Munojat Akbarova Galereyasi — Tish Oqartirish, Vinirlar va Implant Natijalari Andijon"
        description="Dr. Munojat Akbarova stomatologik ishlari va natijalari. ZOOM oqartirish, tsirkoniy karonkalar, titan implantatsiya va maxfiy ayollar xonasi suratlari."
        canonical="https://dr-munojatakbarova.uz/gallery"
      />

      {/* Header */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 bg-[#120202] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-black text-amber-300 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/15">
            {t.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-2">
            {t.heading}
          </h1>
          <p className="text-red-200/80 text-sm sm:text-base max-w-lg mx-auto">
            {t.sub}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === f.key
                    ? "bg-[#930b0b] text-white shadow-lg scale-105 border border-red-500"
                    : "bg-white/10 text-red-100 hover:bg-white/20 border border-white/15"
                }`}
              >
                {f[lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              /* A real <button>: this was a clickable <div>, so the lightbox
                 could not be opened by keyboard at all. */
              <button
                key={item.id}
                type="button"
                onClick={() => setLightbox(item)}
                aria-label={item.label[lang]}
                className="text-left bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#930b0b] focus-visible:ring-offset-2 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.label[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="p-5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-black text-[#930b0b] uppercase tracking-wider">
                        {item.service}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {item.category === "before_after" ? "Klinik Natija" : "Klinika"}
                      </span>
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#930b0b] transition-colors leading-snug">
                      {item.label[lang]}
                    </h3>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                  <span>Kattalashtirib ko'rish</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Instagram Callout */}
          <div className="mt-14 bg-gradient-to-r from-pink-50 via-rose-50 to-red-50 border border-pink-200 rounded-3xl p-8 text-center space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Jonli Video Natijalar Instagramda
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              {t.notice}
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/dr_munojatakbarova/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-110 transition-all"
              >
                <IconInstagram className="w-4 h-4 text-white" />
                <span>{t.igBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label[lang]}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxRef}
            tabIndex={-1}
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              aria-label={a11y.close}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-sm font-black hover:bg-[#fd1616] transition-colors"
            >
              ✕
            </button>

            <div className="relative aspect-[4/3] bg-slate-900">
              <img
                src={lightbox.image}
                alt={lightbox.label[lang]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#930b0b] uppercase tracking-wider">
                  {lightbox.service}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  ✓ Sertifikatlangan Klinik Natija
                </span>
              </div>
              <h3 className="font-black text-lg text-slate-900">
                {lightbox.label[lang]}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
