import { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import {
  IconClock,
  IconCheckCircle,
  IconPhone,
  IconTelegram,
} from "./MedicalIcons";
import { useModalA11y } from "../hooks/useModalA11y";
import { getA11yLabels } from "../constants/a11yLabels";

/* ─── Constants ──────────────────────────────────────────────────── */

const DENTIST_KEY = "dr_munojat_akbarova";
const API_BASE = "https://dentist-medinson-license.uz/api/public";
const TELEGRAM_URL = "https://t.me/dr_munojat";

/** Clinic default working slots (mon–sat). Used as fallback when API is
 *  unavailable or returns no data.  */
const DEFAULT_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

const SERVICES = [
  { id: "implantatsiya", uz: "Titan Dental Implantatsiya", ru: "Имплантация зуба", en: "Dental Implant" },
  { id: "tish-davolash", uz: "Tish Davolash & Plomba", ru: "Лечение зубов и пломбы", en: "Tooth Treatment & Fillings" },
  { id: "ortopediya", uz: "Tish Tojlari (Zirkoniy)", ru: "Зубные коронки (Циркониевые)", en: "Zirconia Crowns" },
  { id: "oqartirish", uz: "ZOOM 4 Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" },
  { id: "xirurgiya", uz: "Og'riqsiz Tish Olish", ru: "Бережное удаление зубов", en: "Painless Extraction" },
  { id: "korik", uz: "Ko'rik & Konsultatsiya", ru: "Осмотр и консультация", en: "Checkup & Consultation" },
];

/** Names for short-label weekday buttons */
const WEEKDAY_UZ = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];
const WEEKDAY_RU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const WEEKDAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad2 = (n) => String(n).padStart(2, "0");

/** Format a Date → "YYYY-MM-DD" in local timezone */
const toISOLocal = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/** Build the next N days starting from today (skip Sundays = clinic closed) */
const buildDays = (n = 7) => {
  const days = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  let count = 0;
  while (days.length < n) {
    // Sunday = 0 → skip
    if (cursor.getDay() !== 0) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
    if (++count > 60) break; // safety
  }
  return days;
};

/** Short label for a date in the day-picker strip */
const dayLabel = (date, lang) => {
  const names = lang === "ru" ? WEEKDAY_RU : lang === "en" ? WEEKDAY_EN : WEEKDAY_UZ;
  const day = names[date.getDay()];
  return { day, date: `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}` };
};

/* ─── Component ──────────────────────────────────────────────────── */

const QuickBookingModal = ({ isOpen, onClose, initialService }) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const dialogRef = useModalA11y(isOpen, onClose);

  /* ── Static day list (rebuilt when modal opens) ─────────────── */
  const days = useMemo(() => buildDays(7), [isOpen]); // eslint-disable-line

  /* ── State ──────────────────────────────────────────────────── */
  const [service, setService] = useState(initialService || SERVICES[0].id);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState(null); // null = loading
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  /* ── Sync service when modal opened from a CTA ──────────────── */
  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService, isOpen]);

  /* ── Reset selection when day changes ───────────────────────── */
  useEffect(() => {
    setSelectedTime("");
  }, [selectedDayIndex]);

  /* ── Fetch availability from MedInson for the selected day ───── */
  const fetchSlots = useCallback(async (dayDate) => {
    setAvailableSlots(null); // loading
    const dateStr = toISOLocal(dayDate);
    try {
      const res = await fetch(
        `${API_BASE}/availability?dentistKey=${DENTIST_KEY}&date=${dateStr}`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (res.ok) {
        const data = await res.json();
        const slots = Array.isArray(data.slots)
          ? data.slots
              .filter((s) => s && (typeof s === "string" || s.available !== false))
              .map((s) => (typeof s === "string" ? s : s.time))
          : null;
        setAvailableSlots(slots && slots.length > 0 ? slots : DEFAULT_SLOTS);
      } else {
        setAvailableSlots(DEFAULT_SLOTS);
      }
    } catch {
      // Network error or CORS → use clinic default schedule
      setAvailableSlots(DEFAULT_SLOTS);
    }
  }, []);

  /* ── Load slots when day changes or modal opens ─────────────── */
  useEffect(() => {
    if (!isOpen) return;
    fetchSlots(days[selectedDayIndex]);
  }, [isOpen, selectedDayIndex, fetchSlots, days]);

  /* ── Derived values ─────────────────────────────────────────── */
  const selectedDay = days[selectedDayIndex];
  const selectedDateStr = selectedDay ? toISOLocal(selectedDay) : "";
  const serviceObj = SERVICES.find((s) => s.id === service) || SERVICES[0];
  const serviceLabel = serviceObj[lang] || serviceObj.uz;

  const telegramMsg = encodeURIComponent(
    `🦷 QABUL UCHUN SO'ROV (drmunojat.uz)\n` +
      `👤 Bemor: ${name.trim()}\n` +
      `📞 Tel: ${phone.trim()}\n` +
      `⚙️ Xizmat: ${serviceLabel}\n` +
      `📅 Sana: ${selectedDateStr}\n` +
      `⏰ Vaqt: ${selectedTime}\n` +
      `📍 Orzu Stoma Denta, Andijon`
  );
  const telegramFallbackUrl = `${TELEGRAM_URL}?text=${telegramMsg}`;

  /* ── Handlers ───────────────────────────────────────────────── */
  const handleClose = () => {
    setIsSuccess(false);
    setHasError(false);
    setIsSubmitting(false);
    setSelectedTime("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error(
        lang === "uz"
          ? "Iltimos, ism va telefon raqamingizni kiriting"
          : lang === "ru"
          ? "Пожалуйста, введите имя и номер телефона"
          : "Please enter your name and phone number"
      );
      return;
    }
    if (!selectedTime) {
      toast.error(
        lang === "uz"
          ? "Iltimos, qulay vaqtni tanlang"
          : lang === "ru"
          ? "Пожалуйста, выберите время"
          : "Please select a time slot"
      );
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    const payload = {
      dentistKey: DENTIST_KEY,
      patientName: name.trim(),
      patientPhone: phone.trim(),
      date: selectedDateStr,
      time: selectedTime,
      service: serviceLabel,
      source: "drmunojat.uz",
    };

    try {
      const res = await fetch(`${API_BASE}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok || data.ok || data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#ffd700", "#fd1616", "#229ed9", "#10b981", "#ffffff"],
        });
        toast.success(
          lang === "uz"
            ? "Qabulingiz muvaffaqiyatli qabul qilindi! 🎉"
            : lang === "ru"
            ? "Запись успешно принята! 🎉"
            : "Appointment successfully booked! 🎉"
        );
      } else {
        setHasError(true);
        toast.info(
          lang === "uz"
            ? "So'rov yuborildi. Telegram orqali tasdiqlashingiz mumkin."
            : "Заявка отправлена. Подтвердите через Telegram."
        );
      }
    } catch {
      setHasError(true);
      toast.warn(
        lang === "uz"
          ? "Internet ulanmadi. Telegram orqali yuboring!"
          : "Нет связи с сервером. Отправьте через Telegram!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Guard ──────────────────────────────────────────────────── */
  if (!isOpen) return null;

  /* ─────────────────────── JSX ────────────────────────────────── */
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl border-2 border-red-100 animate-fade-in-up outline-none my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label={a11y.close}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-black transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* ══════════ SUCCESS VIEW ══════════ */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <IconCheckCircle className="w-9 h-9 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block">
              {lang === "uz" ? "QABUL QILINDI" : lang === "ru" ? "УСПЕШНО" : "CONFIRMED"}
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              {lang === "uz"
                ? "Qabulingiz Yozildi!"
                : lang === "ru"
                ? "Запись Оформлена!"
                : "Appointment Confirmed!"}
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {lang === "uz"
                ? "Ma'lumotlaringiz Dr. Munojat Akbarovaning MedInson Stomatolog tizimiga uzatildi."
                : lang === "ru"
                ? "Ваша заявка передана в систему MedInson Стоматолог Д-р Мунаджат Акбаровой."
                : "Your request was received by Dr. Munojat Akbarova's MedInson system."}
            </p>

            {/* Summary card */}
            <dl className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <dt className="text-slate-500">{lang === "uz" ? "Bemor:" : "Пациент:"}</dt>
                <dd className="font-bold text-slate-900">{name}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <dt className="text-slate-500">{lang === "uz" ? "Tel:" : "Телефон:"}</dt>
                <dd className="font-bold text-slate-900">{phone}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <dt className="text-slate-500">{lang === "uz" ? "Xizmat:" : "Услуга:"}</dt>
                <dd className="font-bold text-slate-900">{serviceLabel}</dd>
              </div>
              <div className="flex justify-between pt-0.5">
                <dt className="text-slate-500">{lang === "uz" ? "Sana / Vaqt:" : "Дата / Время:"}</dt>
                <dd className="font-bold text-[#930b0b]">{selectedDateStr} · {selectedTime}</dd>
              </div>
            </dl>

            <div className="space-y-2 pt-1">
              <a
                href={telegramFallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <IconTelegram className="w-4 h-4 text-white" />
                <span>
                  {lang === "uz"
                    ? "Telegram orqali eslatma olish (ixtiyoriy)"
                    : lang === "ru"
                    ? "Получить напоминание в Telegram (опция)"
                    : "Get Telegram Reminder (Optional)"}
                </span>
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {lang === "uz" ? "Yopish" : lang === "ru" ? "Закрыть" : "Close"}
              </button>
            </div>
          </div>

        ) : (
          /* ══════════ BOOKING FORM ══════════ */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div>
              <span className="text-[10px] font-black text-[#930b0b] uppercase tracking-widest px-3 py-1 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
                MEDINSON · TEZKOR QABUL
              </span>
              <h3
                id="booking-modal-title"
                className="text-2xl font-black text-slate-900 mb-1"
              >
                {lang === "uz"
                  ? "Qabul Vaqtini Tanlang"
                  : lang === "ru"
                  ? "Выберите Время Приёма"
                  : "Choose Appointment Slot"}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === "uz"
                  ? "Dr. Munojat Akbarova qabuliga to'g'ridan-to'g'ri yozilish"
                  : lang === "ru"
                  ? "Прямая запись к Д-р Мунаджат Акбаровой"
                  : "Direct booking with Dr. Munojat Akbarova"}
              </p>
            </div>

            {/* Error fallback banner */}
            {hasError && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-2">
                <p className="font-semibold">
                  {lang === "uz"
                    ? "Server bilan aloqada muammo. Telegram orqali tasdiqlang:"
                    : "Проблема с сервером. Подтвердите через Telegram:"}
                </p>
                <a
                  href={telegramFallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#229ED9] hover:underline"
                >
                  <IconTelegram className="w-4 h-4" />
                  <span>{lang === "uz" ? "Telegram'da tasdiqlash ↗" : "Подтвердить в Telegram ↗"}</span>
                </a>
              </div>
            )}

            {/* Service selector */}
            <div>
              <label
                htmlFor="bk-service"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {lang === "uz" ? "Xizmat Turi" : lang === "ru" ? "Тип услуги" : "Service Type"}
              </label>
              <select
                id="bk-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-bold text-slate-900 bg-white cursor-pointer"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s[lang] || s.uz}
                  </option>
                ))}
              </select>
            </div>

            {/* ── Day strip (dentahouse.uz-style) ────────────── */}
            <div>
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                {lang === "uz" ? "Qulay Kun" : lang === "ru" ? "Выберите день" : "Choose Day"}
              </p>
              <div
                className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-hide"
                role="group"
                aria-label={lang === "uz" ? "Kun tanlash" : "Выбор дня"}
              >
                {days.map((d, idx) => {
                  const { day: wdName, date: dateNum } = dayLabel(d, lang);
                  const isActive = idx === selectedDayIndex;
                  const isToday = toISOLocal(d) === toISOLocal(new Date());
                  return (
                    <button
                      key={toISOLocal(d)}
                      type="button"
                      onClick={() => setSelectedDayIndex(idx)}
                      className={`shrink-0 snap-start flex flex-col items-center px-3 py-2 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer min-w-[54px] ${
                        isActive
                          ? "bg-[#930b0b] text-white border-[#930b0b] shadow-md scale-[1.04]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50"
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="uppercase tracking-wide text-[10px] opacity-70">{wdName}</span>
                      <span className="text-sm font-black mt-0.5">{dateNum}</span>
                      {isToday && (
                        <span className={`text-[9px] mt-0.5 font-bold ${isActive ? "text-yellow-300" : "text-[#930b0b]"}`}>
                          {lang === "uz" ? "bugun" : lang === "ru" ? "сегодня" : "today"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Time slot grid ─────────────────────────────── */}
            <div>
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                {lang === "uz" ? "Qulay Soat" : lang === "ru" ? "Время" : "Time Slot"}
              </p>

              {availableSlots === null ? (
                /* Loading skeleton */
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-9 rounded-xl bg-slate-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : availableSlots.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-3">
                  {lang === "uz"
                    ? "Bu kunda bo'sh vaqt yo'q. Boshqa kunni tanlang."
                    : "В этот день нет свободного времени. Выберите другой день."}
                </p>
              ) : (
                <div
                  className="grid grid-cols-4 sm:grid-cols-5 gap-2"
                  role="group"
                  aria-label={lang === "uz" ? "Vaqt tanlash" : "Выбор времени"}
                >
                  {availableSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      aria-pressed={selectedTime === t}
                      className={`py-2 rounded-xl text-xs font-bold transition-all text-center border-2 cursor-pointer ${
                        selectedTime === t
                          ? "bg-[#fd1616] text-white border-[#fd1616] shadow-md scale-[1.04]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Patient details ────────────────────────────── */}
            <div className="space-y-3">
              <div>
                <label htmlFor="bk-name" className="sr-only">
                  {lang === "uz" ? "Ismingiz" : "Ваше имя"}
                </label>
                <input
                  id="bk-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={
                    lang === "uz"
                      ? "Ismingiz (masalan: Malika)"
                      : lang === "ru"
                      ? "Ваше имя"
                      : "Your name"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label htmlFor="bk-phone" className="sr-only">
                  {lang === "uz" ? "Telefon raqamingiz" : "Номер телефона"}
                </label>
                <input
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={
                    lang === "uz"
                      ? "Telefon: +998 90 123 45 67"
                      : lang === "ru"
                      ? "Телефон: +998 90 123 45 67"
                      : "Phone: +998 90 123 45 67"
                  }
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* ── Selected summary chip ──────────────────────── */}
            {selectedTime && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <IconCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {selectedDateStr} · {selectedTime} — {serviceLabel}
                </span>
              </div>
            )}

            {/* ── Submit ─────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[50px] bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>
                    {lang === "uz"
                      ? "Yuborilmoqda..."
                      : lang === "ru"
                      ? "Отправка..."
                      : "Submitting..."}
                  </span>
                </>
              ) : (
                <>
                  <IconClock className="w-4 h-4 text-white" />
                  <span>
                    {lang === "uz"
                      ? "Qabulga Yozilish"
                      : lang === "ru"
                      ? "Записаться на Приём"
                      : "Book Appointment"}
                  </span>
                </>
              )}
            </button>

            {/* Phone link */}
            <div className="pt-1 text-center">
              <a
                href="tel:+998941061555"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#930b0b] transition-colors"
              >
                <IconPhone className="w-3.5 h-3.5 text-[#930b0b]" />
                <span>
                  {lang === "uz"
                    ? "Yoki qo'ng'iroq: +998 (94) 106-15-55"
                    : lang === "ru"
                    ? "Или позвоните: +998 (94) 106-15-55"
                    : "Or call: +998 (94) 106-15-55"}
                </span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuickBookingModal;
