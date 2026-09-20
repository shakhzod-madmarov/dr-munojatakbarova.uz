import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { IconClock, IconCheckCircle, IconPhone } from "./MedicalIcons";
import { useModalA11y } from "../hooks/useModalA11y";
import { getA11yLabels } from "../constants/a11yLabels";

const dates = [
  { id: "today", uz: "Bugun (Shoshilinch)", ru: "Сегодня (Срочно)", en: "Today (Urgent)" },
  { id: "tomorrow", uz: "Ertaga", ru: "Завтра", en: "Tomorrow" },
  { id: "next", uz: "Indinga", ru: "Послезавтра", en: "In 2 Days" },
];

const timeSlots = ["09:30", "11:00", "14:00", "16:00", "17:30"];

const QuickBookingModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const dialogRef = useModalA11y(isOpen, onClose);
  const [selectedDate, setSelectedDate] = useState("tomorrow");
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Implantatsiya");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error(lang === "uz" ? "Ism va telefon raqamingizni kiriting" : "Please enter your name and phone");
      return;
    }

    const dateLabel = dates.find((d) => d.id === selectedDate)?.[lang] || selectedDate;
    const msg = encodeURIComponent(
      `🦷 TEZKOR QABULGA YOZILISH (drmunojat.uz):\n` +
      `👤 Bemor: ${name}\n` +
      `📞 Tel: ${phone}\n` +
      `⚙️ Xizmat: ${service}\n` +
      `📅 Sana: ${dateLabel}\n` +
      `⏰ Vaqt: ${selectedTime}\n` +
      `📍 Manzil: Andijon`
    );
    window.open(`https://t.me/dr_munojat?text=${msg}`, "_blank", "noopener,noreferrer");
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#ffd700', '#fd1616', '#229ed9', '#ffffff'] });
    toast.success(lang === "uz" ? "Qabulingiz muvaffaqiyatli yuborildi!" : "Запись успешно отправлена!");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-100 animate-fade-in-up outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={a11y.close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-black transition-colors"
        >
          ✕
        </button>

        <span className="text-[10px] font-black text-[#930b0b] uppercase tracking-widest px-3 py-1 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
          1-CLICK NAVBATSIZ QABUL
        </span>
        <h3 id="modal-title" className="text-2xl font-black text-slate-900 mb-1">
          {lang === "uz" ? "Qabul Vaqtini Tanlang" : lang === "ru" ? "Выберите Время Приёма" : "Choose Appointment Slot"}
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          {lang === "uz" ? "Dr. Munojat Akbarova bilan to'g'ridan-to'g'ri bog'lanish" : "Direct private consultation with Dr. Munojat"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Day selection */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {lang === "uz" ? "Qulay Kun" : "День"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setSelectedDate(d.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border ${
                    selectedDate === d.id
                      ? "bg-[#930b0b] text-white border-[#930b0b] shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300"
                  }`}
                >
                  {d[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot selection */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {lang === "uz" ? "Qulay Soat" : "Время"}
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {timeSlots.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all text-center border ${
                    selectedTime === t
                      ? "bg-[#fd1616] text-white border-[#fd1616] shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div>
            <label htmlFor="quick-name" className="sr-only">
              {lang === "uz" ? "Ismingiz" : "Ваше имя"}
            </label>
            <input
              id="quick-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={lang === "uz" ? "Ismingiz (masalan: Malika)" : "Ваше имя"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900"
            />
          </div>

          <div>
            <label htmlFor="quick-phone" className="sr-only">
              {lang === "uz" ? "Telefon raqamingiz" : "Номер телефона"}
            </label>
            <input
              id="quick-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={lang === "uz" ? "Telefon raqamingiz (+998 90 ...)" : "Номер телефона"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 active:scale-95 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{lang === "uz" ? "Telegram orqali tasdiqlash" : "Подтвердить в Telegram"}</span>
          </button>

          <div className="pt-1 text-center">
            <a
              href="tel:+998941061555"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#930b0b] transition-colors"
            >
              <IconPhone className="w-3.5 h-3.5 text-[#930b0b]" />
              <span>{lang === "uz" ? "Yoki qo'ng'iroq qiling: +998 (94) 106-15-55" : "Или позвоните: +998 (94) 106-15-55"}</span>
            </a>
          </div>
        </form>

      </div>
    </div>
  );
};

export default QuickBookingModal;
