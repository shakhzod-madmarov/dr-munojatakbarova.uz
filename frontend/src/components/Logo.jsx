import { assets } from "../assets/assets";

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Signature Logo Emblem */}
      <div className="relative bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
        <img
          src={assets.logo}
          alt="Dr. Munojat Akbarova"
          className="h-8 sm:h-9 w-auto object-contain"
          width="130"
          height="38"
          loading="eager"
        />
      </div>

      {/* Brand Name Typography — hidden under 420px so the menu button always fits */}
      <div className="hidden min-[420px]:flex flex-col text-left">
        <span className="text-slate-900 font-black text-xs sm:text-sm tracking-wider uppercase leading-tight group-hover:text-[#930b0b] transition-colors flex items-center gap-1">
          <span>DR. MUNOJAT</span>
          <span className="text-[#fd1616] text-[10px]">★</span>
        </span>
        <span className="text-slate-500 text-[10px] sm:text-[11px] font-bold tracking-wide leading-tight">
          Ayol Stomatolog · Andijon
        </span>
      </div>
    </div>
  );
};

export default Logo;
