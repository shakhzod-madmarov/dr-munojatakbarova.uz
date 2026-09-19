import React from "react";

export const IconShieldCheck = ({ className = "w-4 h-4 text-amber-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

export const IconPrivacyLock = ({ className = "w-4 h-4 text-rose-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const IconLocationPin = ({ className = "w-4 h-4 text-red-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export const IconSparkleStar = ({ className = "w-4 h-4 text-amber-300" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </svg>
);

export const IconToothCrown = ({ className = "w-4 h-4 text-amber-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 17l1.5-10 4.5 5 4-8 4 8 4.5-5L22 17H2z"/>
    <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/>
  </svg>
);

export const IconStethoscope = ({ className = "w-4 h-4 text-rose-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);

export const IconGraduationCap = ({ className = "w-4 h-4 text-red-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export const IconClock = ({ className = "w-4 h-4 text-amber-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export const IconPhone = ({ className = "w-4 h-4 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export const IconTelegram = ({ className = "w-4 h-4 text-sky-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.88 7.97-3.44 3.8-1.58 4.59-1.86 5.11-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.02.07-.02.21-.04.37z"/>
  </svg>
);

export const IconInstagram = ({ className = "w-4 h-4 text-pink-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export const IconCheckCircle = ({ className = "w-4 h-4 text-emerald-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export const IconAward = ({ className = "w-4 h-4 text-amber-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

export const IconTooth = ({ className = "w-4 h-4 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 6 4 6 7c0 2 .5 4 1 6l1.5 7c.3 1.2 1.5 2 2.5 2h2c1 0 2.2-.8 2.5-2l1.5-7c.5-2 1-4 1-6 0-3-2-5-6-5z"/>
    <path d="M9 7c1 1 2 1 3 1s2 0 3-1"/>
  </svg>
);

export const IconMicroscope = ({ className = "w-4 h-4 text-teal-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8"/>
    <path d="M3 22h18"/>
    <path d="M14 22a7 7 0 1 0 0-14h-1"/>
    <path d="M9 14h2"/>
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
  </svg>
);

export const IconGoogle = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
  </svg>
);

export const IconYandex = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#FC3F1D" />
    <path d="M14.6 5h-2.9c-2.3 0-3.7 1.4-3.7 3.4 0 1.6.8 2.6 2.1 3.2l-2.4 6.4h2.2l2.2-6h1.2v6h2V5h-0.7zm-0.7 5.2h-1.8c-1.1 0-1.7-.5-1.7-1.6 0-1 .6-1.6 1.7-1.6h1.8v3.2z" fill="white"/>
  </svg>
);

/* ─── DEDICATED CLINICAL DENTAL SPECIALTY ICONS (100% AUTHENTIC DENTAL) ─ */

export const DentalToothMolar = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4.5 9c-.3-3 1.5-6 4-6.8 2-.6 4 .5 5.5.5s3.5-1.1 5.5-.5c2.5.8 4.3 3.8 4 6.8-.4 4.2-2.5 7.5-3.5 12-.5 2.2-2.5 2-3.5-.5-1-2.5-1.5-5-2.5-5s-1.5 2.5-2.5 5c-1 2.5-3 2.7-3.5.5-1-4.5-3.1-7.8-3.5-12z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M8.5 7.5c1.5.8 5.5.8 7 0M12 8v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const DentalVeneerCrown = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 5C6 3.5 7.2 2 9 2h6c1.8 0 3 1.5 3 3v8.5c0 4.5-2.5 8.5-6 8.5s-6-4-6-8.5V5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path
      d="M8.5 5.5c1-1 5-1 6 0 .8 3.5-.2 8-2.5 10.5-2.3-2.5-3.3-7-3.5-10.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.25"
    />
    <path d="M17 5l.7 1.5L19.2 7.2l-1.5.7L17 9.4l-.7-1.5L14.8 7.2l1.5-.7L17 5z" fill="currentColor"/>
  </svg>
);

export const DentalImplantFixture = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 2.5h10c.8 0 1.5.6 1.3 1.4l-.9 4.1H6.6l-.9-4.1C5.5 3.1 6.2 2.5 7 2.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <rect x="8.5" y="8" width="7" height="2.2" rx="0.5" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.3"/>
    <path
      d="M9 10.2h6l-1 9.8-2 1.5-2-1.5-1-9.8z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <line x1="8" y1="12.5" x2="16" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8.5" y1="15" x2="15.5" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="9" y1="17.5" x2="15" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DentalWhiteningZoom = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M5.5 7.5c0-2.5 1.5-4.5 4-4.8 1.5-.2 2.5.5 3 .5s1.5-.7 3-.5c2.5.3 4 2.3 4 4.8 0 4-1.5 8-4.5 11.5-.7 1-1.8 1-2.5 0-3-3.5-4-7.5-4-11.5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path d="M12.5 6.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6z" fill="currentColor"/>
    <path d="M19 3l-1.8 1.8M20.5 7.5h-2.5M18.5 12l-1.8-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const DentalSurgeryExtraction = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L4.5 5.2v6c0 5 3.3 9.3 7.5 10.3 4.2-1 7.5-5.3 7.5-10.3v-6L12 2z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M9 8c0-1.2.8-2 1.8-2s1.2.4 1.7.4 1-.4 1.7-.4 1.8.8 1.8 2c0 1.8-1 3.5-2 5.5-.4.8-.8.8-1.2 0-1-2-2-3.7-2-5.5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.25"
    />
    <path d="M9.5 15.5h5M12 13v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IconTherapeuticTooth = DentalToothMolar;
export const IconVeneerTooth = DentalVeneerCrown;
export const IconDentalImplant = DentalImplantFixture;
export const IconCosmeticSmile = DentalWhiteningZoom;
export const IconLaserWhitening = DentalWhiteningZoom;
export const IconAtraumaticSurgery = DentalSurgeryExtraction;
export const IconSurgicalScalpel = DentalSurgeryExtraction;

export const IconAirflowHygiene = ({ className = "w-5 h-5 text-teal-500" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3C8.5 3 6 5.5 6 9.5c0 3.5 1.5 7.5 3.5 11 1 1.8 1.8 1.5 2.5 1.5s1.5.3 2.5-1.5c2-3.5 3.5-7.5 3.5-11C18 5.5 15.5 3 12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
    <path d="M4 8c2 0 4 1 5 3M3 12c3 0 5 1.5 6 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="15" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="17" cy="12" r="1" fill="currentColor"/>
  </svg>
);

export const IconDigitalXray = ({ className = "w-5 h-5 text-indigo-600" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.08"/>
    <path d="M12 6c-2 0-3 1.2-3 2.5 0 1.5.8 3 1.5 5.5.5 1.8 1 2 1.5 2s1-.2 1.5-2c.7-2.5 1.5-4 1.5-5.5 0-1.3-1-2.5-3-2.5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.25"/>
    <line x1="7" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="15" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconVolumeUp = ({ className = "w-4 h-4 text-current" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

export const IconVolumeMute = ({ className = "w-4 h-4 text-current" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);

export const IconPlay = ({ className = "w-4 h-4 text-current" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

export const IconPause = ({ className = "w-4 h-4 text-current" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1"/>
    <rect x="14" y="4" width="4" height="16" rx="1"/>
  </svg>
);

export const IconVideo = ({ className = "w-4 h-4 text-current" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);
