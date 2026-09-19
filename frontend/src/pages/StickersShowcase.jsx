import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export const StickersShowcase = () => {
  const [selectedStyle, setSelectedStyle] = useState("all");

  const cardsData = [
    {
      id: "ortopediya",
      title: "Old va Orqa Tish Karonkalari",
      sub: "Germaniya, Avstraliya va Xitoy Tsirkoniyasi",
      image: assets.treatmentWhitening,
      brand: "TSIRKONIY & KERAMIKA",
      origin: "GERMANY · AUSTRALIA · CHINA",
      guarantee: "UZOQ YILLIK KAFOLAT",
      specs: "Xitoy · Germaniya · Avstraliya",
      accent: "amber",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M12 2C8 2 5 4.5 5 8.5c0 3.2 1.4 7.2 3.5 11 1.2 2.2 2.5 2.5 3.5 2.5s2.3-.3 3.5-2.5c2.1-3.8 3.5-7.8 3.5-11C19 4.5 16 2 12 2z" fill="#ffffff" stroke="#d97706" strokeWidth="1.5"/>
          <path d="M12 6v6m-3-3h6" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "implantatsiya",
      title: "Biotitan Dental Implantatsiya",
      sub: "Janubiy Koreya Xirurgik Protokoli",
      image: assets.treatmentImplant,
      brand: "STRAUMANN & OSSTEM",
      origin: "KOREA",
      guarantee: "UZOQ YILLIK KAFOLAT",
      specs: "Grade-4 Titan · 99.2% Integratsiya",
      accent: "sky",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M7 2h10l-1.5 4h-7L7 2zM9 8.5h6l-1 12.5-2 1.5-2-1.5-1-12.5z" fill="#0284c7"/>
          <line x1="8" y1="12" x2="16" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="8.5" y1="15" x2="15.5" y2="15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "tish-oqartirish",
      title: "Philips ZOOM 4 Fotootbelivaniye",
      sub: "Sovuq Lazer bilan Tabiiy Yorqin Oqlik",
      image: assets.heroSmile,
      brand: "PHILIPS ZOOM® 4",
      origin: "USA",
      guarantee: "TABIIY YORQIN OQLIK",
      specs: "Sovuq LED · Emalga 100% Xavfsiz",
      accent: "blue",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <circle cx="12" cy="12" r="9" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5"/>
          <path d="M12 4v4m0 8v4m-8-8h4m8 0h4" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" fill="#0284c7"/>
        </svg>
      ),
    },
    {
      id: "xirurgiya",
      title: "Piezotome® Ultrasonik Jarrohlik",
      sub: "Atravmatik, Shishlarsiz Aql Tishini Olish",
      image: assets.treatmentSurgery,
      brand: "PIEZOTOME® SURGERY",
      origin: "FRANCE",
      guarantee: "0 SHISH & 0 OG'RIQ",
      specs: "Ultrasonik Mikro-Tig' · Tez Bitish",
      accent: "purple",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M4 20l7-7m0 0l2-2 3 3-2 2-3-3z" stroke="#9333ea" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 7l3-3M20 5l-2-2" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  /* 🏷️ RENDER STICKER ACCORDING TO STYLE */
  const renderSticker = (item, styleType) => {
    switch (styleType) {
      // 1. DENTAL LAB SECURITY SEAL
      case "style1":
        return (
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-900 rounded-lg p-1.5 pr-3 shadow-[0_6px_20px_rgba(0,0,0,0.25)] border border-slate-200 border-l-4 border-l-amber-500 hover:scale-105 transition-all select-none">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-amber-400 to-amber-600 p-1 flex items-center justify-center text-white shadow-xs shrink-0">
              {item.iconSvg}
            </div>
            <div className="flex flex-col text-left leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[10px] tracking-wider text-slate-900 uppercase">{item.brand}</span>
                <span className="text-[7.5px] font-bold text-amber-800 bg-amber-100/90 px-1 py-0.2 rounded border border-amber-300">{item.origin}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9.5px] font-black text-slate-800">{item.guarantee}</span>
                <span className="text-[7.5px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded border border-emerald-200">✓ CERTIFIED</span>
              </div>
            </div>
          </div>
        );

      // 2. DOCTOR'S CLINICAL ROUND STAMP
      case "style2":
        return (
          <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-white/90 bg-white/95 backdrop-blur-md p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] text-sky-950 flex flex-col items-center justify-center -rotate-6 hover:rotate-0 transition-transform duration-300 select-none">
            <div className="w-full h-full rounded-full border border-sky-600/70 flex flex-col items-center justify-center text-center p-1">
              <span className="text-[6.5px] font-black uppercase tracking-wider text-sky-900 leading-none">
                ★ DR. MUNOJAT ★
              </span>
              <div className="my-0.5 scale-75">
                {item.iconSvg}
              </div>
              <span className="text-[7.5px] font-black text-slate-900 leading-none uppercase">
                {item.guarantee}
              </span>
              <span className="text-[5.5px] font-extrabold text-emerald-700 tracking-tighter uppercase mt-0.5">
                TASDIQLANGAN
              </span>
            </div>
          </div>
        );

      // 3. DIE-CUT TOOTH VINYL STICKER
      case "style3":
        return (
          <div className="relative inline-flex items-center gap-2 bg-white text-slate-900 px-3 py-1.5 rounded-2xl shadow-[0_8px_22px_rgba(0,0,0,0.28)] border-2 border-white -rotate-2 hover:rotate-0 transition-transform duration-300 select-none">
            <div className="w-7 h-7 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs shrink-0">
              {item.iconSvg}
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-black text-[10.5px] text-slate-900 tracking-tight">{item.brand}</span>
              <span className="text-[8.5px] font-bold text-amber-700 mt-0.5">{item.guarantee} ★</span>
            </div>
          </div>
        );

      // 4. SWISS MINIMALIST TAG
      case "style4":
        return (
          <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full shadow-lg hover:bg-black transition-colors select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-extrabold uppercase tracking-wide">{item.brand}</span>
            <span className="text-[9px] text-white/50">|</span>
            <span className="text-[9.5px] font-bold text-emerald-300">{item.guarantee}</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top bar */}
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-red-900/60 border border-red-700 text-xs font-bold text-red-300 uppercase tracking-widest">
            Haqiqiy Jonli Namoyish
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            4 Xil Professional Stikerlarni Jonli Taqqoslash
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Haqiqiy klinik fotosuratlar ustida har bir stiker qanday ko'rinishini tekshiring:
          </p>

          {/* Filter Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {[
              { id: "all", label: "Hammasini Taqqoslash (Side-by-side)" },
              { id: "style1", label: "1. Dental Lab Kafolat Stikeri" },
              { id: "style2", label: "2. Dumaloq Klinik Muhr" },
              { id: "style3", label: "3. Tish Shaklidagi Stiker" },
              { id: "style4", label: "4. Shveysariya Minimalist Tag" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStyle(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedStyle === tab.id
                    ? "bg-[#930b0b] text-white shadow-lg border border-red-500 scale-105"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display */}
        {selectedStyle === "all" ? (
          /* SHOW ALL 4 STYLES ON A SINGLE HERO CARD */
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { type: "style1", title: "1-Variant: Dental Lab Kafolat Stikeri", desc: "Shveysariya / Koreya tish qutisidagi rasmiy autentifikatsiya yorlig'i." },
                { type: "style2", title: "2-Variant: Shifokorning Dumaloq Muhri", desc: "Doktorning bemor kartasiga shaxsan bosadigan dumaloq klinik pechati." },
                { type: "style3", title: "3-Variant: Tish Shaklidagi Vinil Stiker", desc: "Qalin oq konturli, xuddi rasm burchagiga qo'lda yopishtirilgan jismoniy stiker." },
                { type: "style4", title: "4-Variant: Shveysariya Minimalist Tag", desc: "Hech qanday og'ir fonsiz, bir qatorli yengil tibbiy tasmacha." },
              ].map((variant, idx) => (
                <div key={variant.type} className="bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{variant.title}</h3>
                    <span className="text-[11px] text-amber-400 font-semibold">{cardsData[idx].title}</span>
                  </div>
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80">
                    <img
                      src={cardsData[idx].image}
                      alt={cardsData[idx].title}
                      className="w-full h-full object-cover select-none"
                    />
                    {/* The Sticker */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      {renderSticker(cardsData[idx], variant.type)}
                    </div>
                    {/* Caption */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white/90 px-3.5 py-2 bg-black/60 backdrop-blur-md rounded-xl">
                      <span>{cardsData[idx].title}</span>
                      <span className="text-amber-400 font-bold">{cardsData[idx].specs}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {variant.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* SHOW SINGLE CHOSEN STYLE ACROSS ALL 4 CARDS */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardsData.map((item) => (
              <div key={item.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      {renderSticker(item, selectedStyle)}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.sub}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 text-[11px] text-emerald-400 font-bold">
                  ✓ {item.guarantee}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
          >
            ← Bosh sahifaga qaytish
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StickersShowcase;
