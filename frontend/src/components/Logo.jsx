import { assets } from "../assets/assets";

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none group ${className}`}>
      {/* Signature Logo Tooth Emblem */}
      <img
        src={assets.logo}
        alt="Dr. Munojat Akbarova"
        className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        width="130"
        height="38"
        loading="eager"
      />

      {/* Brand Typography — always clearly visible and responsive */}
      <div className="flex flex-col text-left">
        <span className="text-slate-900 font-black text-[11px] sm:text-xs md:text-sm tracking-wider uppercase leading-tight group-hover:text-[#930b0b] transition-colors flex items-center gap-1">
          <span>DR. MUNOJAT</span>
          <span className="text-[#fd1616] text-[9px] sm:text-[10px]">★</span>
        </span>
        <span className="text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-tight leading-tight">
          Ayol Stomatolog · Andijon
        </span>
      </div>
    </div>
  );
};

export default Logo;
