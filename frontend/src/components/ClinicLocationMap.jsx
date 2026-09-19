import { useLanguage } from "../context/LanguageContext";
import { IconLocationPin, IconPhone, IconClock, IconTelegram } from "./MedicalIcons";
import { OPENING_HOURS } from "../constants/doctor";

const ClinicLocationMap = () => {
  const { lang } = useLanguage();

  const t = {
    uz: {
      tag: "ANDIJON SHAHAR • ANIQ LOKATSIYA",
      title: "Orzu Stoma Denta — Dr. Munojat Akbarova",
      sub: "Andijon shahrida ayollar va qizlar uchun maxsus qulay, shinam va to'liq maxfiy stomatologiya klinikasi.",
      clinicName: "Orzu Stoma Denta",
      docName: "Dr. Munojat Akbarova Qabuli",
      address: "Andijon shahri, Orzu Stoma Denta klinikasi (Koordinatalar: 40.754205, 72.358426)",
      hours: OPENING_HOURS.withSunday.uz,
      yandexBtn: "Yandex Xaritada Ochish (Orzu Stoma Denta)",
      googleBtn: "Google Maps'da Ochish",
      landmarks: ["Orzu Stoma Denta", "Qulay avtoturargoh", "Shahar markaziga yaqin", "Jamoat transporti qulay"],
    },
    ru: {
      tag: "г. АНДИЖАН • ТОЧНАЯ ЛОКАЦИЯ",
      title: "Orzu Stoma Denta — Д-р Мунаджат Акбарова",
      sub: "Клиника стоматологии в Андижане — комфортный, современный и приватный приём для женщин.",
      clinicName: "Orzu Stoma Denta",
      docName: "Приём Д-р Мунаджат Акбаровой",
      address: "г. Андижан, клиника Orzu Stoma Denta (Координаты: 40.754205, 72.358426)",
      hours: OPENING_HOURS.withSunday.ru,
      yandexBtn: "Открыть в Яндекс Картах",
      googleBtn: "Открыть в Google Maps",
      landmarks: ["Orzu Stoma Denta", "Удобная парковка", "Центр города", "Остановки рядом"],
    },
    en: {
      tag: "ANDIJAN CITY • EXACT LOCATION",
      title: "Orzu Stoma Denta — Dr. Munojat Akbarova",
      sub: "Andijan City — modern, private, and comfortable dental care suite tailored for women.",
      clinicName: "Orzu Stoma Denta",
      docName: "Dr. Munojat Akbarova Dental Suite",
      address: "Andijan City, Orzu Stoma Denta clinic (Coordinates: 40.754205, 72.358426)",
      hours: OPENING_HOURS.withSunday.en,
      yandexBtn: "Open in Yandex Maps",
      googleBtn: "Open in Google Maps",
      landmarks: ["Orzu Stoma Denta", "Spacious Parking", "City Center", "Easy Transit Access"],
    },
  }[lang] || {};

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-white border-t border-slate-100" id="map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
            <IconLocationPin className="w-4 h-4 text-[#930b0b]" />
            <span>{t.tag}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mt-3 mb-3">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Grid: Map + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#120202] via-[#240404] to-[#450707] text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between border border-red-900/40">
            <div>
              <span className="text-[11px] font-black text-amber-300 uppercase tracking-widest block mb-2">
                KLINIKA VA BOG'LANISH
              </span>
              <h3 className="text-2xl font-black text-white mb-1">
                {t.clinicName}
              </h3>
              <p className="text-xs font-bold text-red-300 mb-6">
                {t.docName}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <IconLocationPin className="w-4 h-4 text-amber-300" />
                  </span>
                  <div>
                    <p className="text-[11px] text-red-200 font-bold uppercase tracking-wider">Manzil</p>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 leading-snug">{t.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <IconClock className="w-4 h-4 text-amber-300" />
                  </span>
                  <div>
                    <p className="text-[11px] text-red-200 font-bold uppercase tracking-wider">Qabul Vaqti</p>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 leading-snug">{t.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <IconPhone className="w-4 h-4 text-amber-300" />
                  </span>
                  <div>
                    <p className="text-[11px] text-red-200 font-bold uppercase tracking-wider">Telefon</p>
                    <a href="tel:+998941061555" className="text-base sm:text-lg font-black text-white hover:text-amber-200 transition-colors mt-0.5 block">
                      +998 (94) 106-15-55
                    </a>
                  </div>
                </div>
              </div>

              {/* Landmark badges */}
              <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-white/10">
                {t.landmarks.map((l, i) => (
                  <span key={i} className="bg-white/10 text-red-100 text-[11px] px-2.5 py-1 rounded-full border border-white/15">
                    ✓ {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="https://yandex.uz/maps/-/CTT8VGNR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all"
              >
                <IconLocationPin className="w-4 h-4 text-white" />
                <span>{t.yandexBtn}</span>
              </a>
            </div>
          </div>

          {/* Right Yandex Interactive Map Widget */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl relative min-h-[420px] flex items-center justify-center">
            
            {/* Real Official Yandex Map Widget for Orzu Stoma Denta */}
            <iframe
              title="Orzu Stoma Denta — Dr. Munojat Akbarova Andijon"
              src="https://yandex.uz/map-widget/v1/?ll=72.358478%2C40.754198&mode=search&oid=215888013765&ol=biz&z=16.63"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0, minHeight: "440px" }}
              allowFullScreen={true}
              className="w-full h-full object-cover"
            />

            {/* Floating Top Badge */}
            <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-white shadow-xl flex items-center gap-2 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fd1616] animate-ping" />
              <span className="text-xs font-black">Orzu Stoma Denta · Dr. Munojat</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ClinicLocationMap;
