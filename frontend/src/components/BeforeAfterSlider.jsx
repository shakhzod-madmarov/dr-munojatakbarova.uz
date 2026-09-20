import { useState, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import { IconSparkleStar } from "./MedicalIcons";
import { getA11yLabels } from "../constants/a11yLabels";

const casesData = [
  {
    id: 1,
    serviceId: "oqartirish",
    title: {
      uz: "ZOOM 4 Laser Tish Oqartirish",
      ru: "ZOOM 4 Лазерное Отбеливание",
      en: "ZOOM 4 Laser Teeth Whitening",
    },
    subtitle: {
      uz: "1 seans (45 daqiqa) — Tishlar o'z holatiga nisbatan yorqin oqartirildi",
      ru: "1 сеанс (45 минут) — Естественное осветление и сияние",
      en: "1 session (45 mins) — Natural radiant smile brightness",
    },
    beforeImg: assets.treatmentWhitening,
    beforeFilter: "sepia(0.4) saturate(1.45) brightness(0.9) contrast(1.05)",
    afterImg: assets.treatmentWhitening,
    afterFilter: "none",
    beforeTag: { uz: "DAVOLASHDAN OLDIN", ru: "ДО ПРОЦЕДУРЫ", en: "BEFORE TREATMENT" },
    afterTag: { uz: "DAVOLASHDAN KEYIN", ru: "ПОСЛЕ ПРОЦЕДУРЫ", en: "AFTER TREATMENT" },
    afterTone: "A1 Enamel · Tabiiy Yorqin Oqlik",
    beforeTone: "A3.5 Sariq Emal",
  },
  {
    id: 2,
    serviceId: "ortopediya",
    title: {
      uz: "Old Tish Karonkalari (Tsirkoniy)",
      ru: "Циркониевые Коронки",
      en: "Zirconia Crowns",
    },
    subtitle: {
      uz: "Old tishlar simmetriyasi va tabiiy Gollivud tabassumi",
      ru: "Идеальная симметрия и натуральная голливудская улыбка",
      en: "Flawless front teeth symmetry & Hollywood smile",
    },
    beforeImg: assets.heroSmile,
    beforeFilter: "sepia(0.3) saturate(1.2) brightness(0.92) contrast(1.1)",
    afterImg: assets.heroSmile,
    afterFilter: "none",
    beforeTag: { uz: "DAVOLASHDAN OLDIN", ru: "ДО ПРОЦЕДУРЫ", en: "BEFORE TREATMENT" },
    afterTag: { uz: "DAVOLASHDAN KEYIN", ru: "ПОСЛЕ ПРОЦЕДУРЫ", en: "AFTER TREATMENT" },
    afterTone: "Germaniya Tsirkon Karonkasi",
    beforeTone: "Notekislik & Sariq Rang",
  },
];

const BeforeAfterSlider = ({ onOpenBooking }) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [sliderPos, setSliderPos] = useState(50);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = casesData[activeCaseIdx];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min((x / rect.width) * 100, 95));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#ffffff] relative overflow-hidden" aria-label={a11y.compareResults}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
            <IconSparkleStar className="w-4 h-4 text-[#930b0b]" />
            <span>{lang === "uz" ? "INTERAKTIV NATIJALAR" : lang === "ru" ? "РЕЗУЛЬТАТЫ ДО / ПОСЛЕ" : "BEFORE & AFTER"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mt-3 mb-4">
            {lang === "uz" ? "Haqiqiy O'zgarishni Ko'ring" :
             lang === "ru" ? "Увидьте реальное преображение" :
             "See Real Smile Transformations"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === "uz" ? "Slayderni surib, Dr. Munojat Akbarova qabulidagi muolajalarning bevosita natijasini taqqoslang." :
             lang === "ru" ? "Двигайте ползунок, чтобы оценить реальные результаты лечения у Д-р Мунаджат." :
             "Drag the slider handle to inspect real clinical before and after results."}
          </p>
        </div>

        {/* Case Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {casesData.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => { setActiveCaseIdx(idx); setSliderPos(50); }}
              className={`min-h-[44px] px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                activeCaseIdx === idx
                  ? "bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white shadow-lg shadow-red-900/30 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-[#930b0b]"
              }`}
            >
              <span>{c.title[lang]}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card with Real Photos */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 relative">
          
          <div className="text-center text-white mb-4">
            <h3 className="font-black text-lg sm:text-xl text-white">{activeCase.title[lang]}</h3>
            <p className="text-red-200/80 text-xs sm:text-sm mt-0.5">{activeCase.subtitle[lang]}</p>
          </div>

          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-black border border-white/10"
          >
            {/* AFTER Layer (Full Width background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activeCase.afterImg}
                alt={`${activeCase.title[lang]} — Dr. Munojat Akbarova muolajadan keyingi natija`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 bg-[#fd1616] text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                {activeCase.afterTag[lang]}
              </div>

              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-white text-xs font-bold">
                {activeCase.afterTone}
              </div>
            </div>

            {/* BEFORE Layer (Clipped by slider position) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img
                src={activeCase.beforeImg}
                alt={`${activeCase.title[lang]} — Muolajadan oldingi holat`}
                loading="lazy"
                decoding="async"
                style={{ filter: activeCase.beforeFilter || "none" }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 bg-slate-800 text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                {activeCase.beforeTag[lang]}
              </div>

              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-red-200 text-xs font-bold">
                {activeCase.beforeTone}
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#930b0b] to-[#fd1616] text-white flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Row */}
          {onOpenBooking && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-left">
                <p className="text-white font-bold text-sm">
                  {lang === "uz" ? "Siz ham xuddi shunday tabiiy tabassumga ega bo'lishni xohlaysizmi?" :
                   lang === "ru" ? "Хотите такую же безупречную улыбку?" :
                   "Do you want to achieve the exact same radiant smile?"}
                </p>
                <p className="text-red-200/70 text-xs mt-0.5">
                  {lang === "uz" ? "Dr. Munojat Akbarova qabuliga qulay vaqtni tanlang" :
                   lang === "ru" ? "Выберите удобное время на приём к Д-р Мунаджат" :
                   "Book your convenient appointment slot with Dr. Munojat"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenBooking(activeCase.serviceId)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e11d48] via-[#fd1616] to-[#ea580c] hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-900/40 active:scale-95 transition-all cursor-pointer"
              >
                {lang === "uz" ? "Aynan Shu Muolajaga Yozilish" :
                 lang === "ru" ? "Записаться на эту процедуру" :
                 "Book This Treatment"}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSlider;
