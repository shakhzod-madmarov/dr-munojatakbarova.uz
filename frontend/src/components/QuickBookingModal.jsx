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
import { DOCTOR_INFO } from "../constants/doctor";
import { availabilityUrl, requestUrl, BOOKING_TIMEOUT_MS } from "../constants/booking";
import { canSeal, makeLinkToken, hashLinkToken, sealBookingDetails } from "../utils/sealBooking";

/* ─── Constants ──────────────────────────────────────────────────── */

/**
 * Every time shown here comes from the dentist's own calendar.
 *
 * This form used to invent a default timetable whenever the server did not
 * answer, so a patient could pick 15:30 on a day the clinic was shut and be
 * told it was booked. Nothing is offered now unless MedInson says it is free;
 * when the server cannot be reached the patient is given the phone number
 * instead of a guess.
 */
const SERVICES = [
  /* A consultation leads: it is the right default for somebody who has not
     said what they need, and for any booking that arrives without a
     service attached to it. */
  { id: "korik", uz: "Ko'rik & Konsultatsiya", ru: "Осмотр и консультация", en: "Checkup & Consultation" },
  { id: "implantatsiya", uz: "Titan Dental Implantatsiya", ru: "Имплантация зуба", en: "Dental Implant" },
  { id: "tish-davolash", uz: "Tish Davolash & Plomba", ru: "Лечение зубов и пломбы", en: "Tooth Treatment & Fillings" },
  { id: "ortopediya", uz: "Tish Tojlari (Zirkoniy)", ru: "Зубные коронки (Циркониевые)", en: "Zirconia Crowns" },
  { id: "tish-oqartirish", uz: "ZOOM 4 Oqartirish", ru: "ZOOM 4 Отбеливание", en: "ZOOM 4 Whitening" },
  { id: "xirurgiya", uz: "Og'riqsiz Tish Olish", ru: "Бережное удаление зубов", en: "Painless Extraction" },
];

const WEEKDAYS = {
  uz: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const TEXT = {
  uz: {
    badge: "MEDINSON · TEZKOR QABUL",
    title: "Qabul Vaqtini Tanlang",
    subtitle: "Dr. Munojat Akbarova qabuliga to'g'ridan-to'g'ri yozilish",
    service: "Xizmat Turi",
    day: "Qulay Kun",
    time: "Qulay Soat",
    today: "bugun",
    loading: "Bo'sh vaqtlar yuklanmoqda...",
    noTimes: "Hozircha bo'sh vaqt yo'q. Iltimos, qo'ng'iroq qiling.",
    offline: "Bo'sh vaqtlarni ko'rsatib bo'lmadi. Iltimos, qo'ng'iroq qiling yoki Telegram orqali yozing.",
    retry: "Qayta urinish",
    namePlaceholder: "Ismingiz (masalan: Malika)",
    phonePlaceholder: "Telefon: +998 90 123 45 67",
    submit: "Qabulga Yozilish",
    submitting: "Yuborilmoqda...",
    needName: "Iltimos, ism va telefon raqamingizni kiriting",
    needTime: "Iltimos, qulay vaqtni tanlang",
    taken: "Bu vaqtni kimdir band qildi. Iltimos, boshqa vaqtni tanlang.",
    tooMany: "Juda ko'p urinish. Biroz kutib, qayta urinib ko'ring.",
    failed: "So'rovni yuborib bo'lmadi. Iltimos, qo'ng'iroq qiling.",
    sentBadge: "SO'ROV YUBORILDI",
    sentTitle: "So'rovingiz Qabul Qilindi!",
    sentBody:
      "So'rovingiz Dr. Munojat Akbarovaning MedInson Stomatolog tizimiga tushdi. Klinika tez orada tasdiqlash uchun bog'lanadi.",
    patient: "Bemor:",
    phoneLabel: "Tel:",
    serviceLabel: "Xizmat:",
    when: "Sana / Vaqt:",
    telegramReminder: "Telegram orqali eslatma olish (ixtiyoriy)",
    close: "Yopish",
    callUs: "Yoki qo'ng'iroq:",
    dobPlaceholder: "Tug'ilgan sana",
    dobHint: "Klinikada sizni to'g'ri topishimiz uchun",
    needDob: "Iltimos, tug'ilgan sanangizni kiriting",
    invalidPhone: "Iltimos, to'liq telefon raqamingizni kiriting (kamida 9 ta raqam)",
    notePlaceholder: "Izoh yoki shikoyat (ixtiyoriy)",
    botTitle: "Eslatma olish uchun botga ulaning",
    botBody: "QR kodni telefoningiz kamerasi bilan skanerlang yoki tugmani bosing. Shundan keyin qabul haqida eslatmalar Telegramga keladi.",
    botOpen: "Telegramda ochish",
  },
  ru: {
    badge: "MEDINSON · БЫСТРАЯ ЗАПИСЬ",
    title: "Выберите Время Приёма",
    subtitle: "Прямая запись к Д-р Мунаджат Акбаровой",
    service: "Тип услуги",
    day: "Выберите день",
    time: "Время",
    today: "сегодня",
    loading: "Загружаем свободное время...",
    noTimes: "Свободного времени пока нет. Пожалуйста, позвоните нам.",
    offline: "Не удалось показать свободное время. Позвоните или напишите в Telegram.",
    retry: "Повторить",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "Телефон: +998 90 123 45 67",
    submit: "Записаться на Приём",
    submitting: "Отправка...",
    needName: "Пожалуйста, введите имя и номер телефона",
    needTime: "Пожалуйста, выберите время",
    taken: "Это время только что заняли. Выберите другое.",
    tooMany: "Слишком много попыток. Подождите немного и повторите.",
    failed: "Не удалось отправить заявку. Пожалуйста, позвоните нам.",
    sentBadge: "ЗАЯВКА ОТПРАВЛЕНА",
    sentTitle: "Заявка Принята!",
    sentBody:
      "Заявка передана в систему MedInson Стоматолог Д-р Мунаджат Акбаровой. Клиника свяжется с вами для подтверждения.",
    patient: "Пациент:",
    phoneLabel: "Телефон:",
    serviceLabel: "Услуга:",
    when: "Дата / Время:",
    telegramReminder: "Получить напоминание в Telegram (опция)",
    close: "Закрыть",
    callUs: "Или позвоните:",
    dobPlaceholder: "Дата рождения",
    dobHint: "Чтобы мы точно нашли вас в клинике",
    needDob: "Пожалуйста, укажите дату рождения",
    invalidPhone: "Пожалуйста, введите полный номер телефона (минимум 9 цифр)",
    notePlaceholder: "Комментарий или жалоба (необязательно)",
    botTitle: "Подключитесь к боту для напоминаний",
    botBody: "Отсканируйте QR-код камерой телефона или нажмите кнопку. После этого напоминания о приёме придут в Telegram.",
    botOpen: "Открыть в Telegram",
  },
  en: {
    badge: "MEDINSON · QUICK BOOKING",
    title: "Choose Appointment Slot",
    subtitle: "Direct booking with Dr. Munojat Akbarova",
    service: "Service Type",
    day: "Choose Day",
    time: "Time Slot",
    today: "today",
    loading: "Loading free times...",
    noTimes: "No free times at the moment. Please give us a call.",
    offline: "Free times could not be loaded. Please call us or message on Telegram.",
    retry: "Try again",
    namePlaceholder: "Your name",
    phonePlaceholder: "Phone: +998 90 123 45 67",
    submit: "Book Appointment",
    submitting: "Submitting...",
    needName: "Please enter your name and phone number",
    needTime: "Please select a time slot",
    taken: "That time was just taken. Please pick another.",
    tooMany: "Too many attempts. Please wait a moment and try again.",
    failed: "The request could not be sent. Please give us a call.",
    sentBadge: "REQUEST SENT",
    sentTitle: "Request Received!",
    sentBody:
      "Your request reached Dr. Munojat Akbarova's MedInson system. The clinic will call you to confirm.",
    patient: "Patient:",
    phoneLabel: "Phone:",
    serviceLabel: "Service:",
    when: "Date / Time:",
    telegramReminder: "Get Telegram Reminder (Optional)",
    close: "Close",
    callUs: "Or call:",
    dobPlaceholder: "Date of birth",
    dobHint: "So the clinic finds the right record for you",
    needDob: "Please enter your date of birth",
    invalidPhone: "Please enter a valid phone number (at least 9 digits)",
    notePlaceholder: "Note or symptom (optional)",
    botTitle: "Connect to the bot for reminders",
    botBody: "Scan the QR code with your phone camera, or tap the button. Appointment reminders will then arrive on Telegram.",
    botOpen: "Open in Telegram",
  },
};

/**
 * What the clinic reads beside the appointment.
 *
 * Callers pass whatever extra they hold - a treatment plan, a typed message
 * - and some of those repeat the service they already chose, so an identical
 * note is dropped rather than printed twice.
 */
const buildNote = (serviceLabel, extra) => {
  const note = String(extra || "").trim();
  if (!note || note.toLowerCase() === serviceLabel.toLowerCase()) return serviceLabel;
  return `${serviceLabel} — ${note}`;
};

const pad2 = (n) => String(n).padStart(2, "0");

/** Parse "YYYY-MM-DD" as a local date, never as UTC midnight. */
const parseYmd = (value) => {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const todayYmd = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
};

const dayLabel = (ymd, lang) => {
  const date = parseYmd(ymd);
  if (!date) return { day: "", date: ymd };
  const names = WEEKDAYS[lang] || WEEKDAYS.uz;
  return {
    day: names[date.getDay()],
    date: `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}`,
  };
};

/* ─── Component ──────────────────────────────────────────────────── */

/**
 * Ask MedInson for the free times, the key to seal a booking to, and which bot
 * to send the patient to afterwards. Throws when the clinic cannot be reached,
 * so the caller decides what to show - this never invents a timetable.
 */
const fetchAvailability = async () => {
  const res = await fetch(availabilityUrl(), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(BOOKING_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return {
    days: (Array.isArray(data?.days) ? data.days : [])
      .map((day) => ({
        date: String(day?.date || ""),
        times: Array.isArray(day?.times) ? day.times.filter(Boolean) : [],
      }))
      .filter((day) => day.date && day.times.length > 0),
    /* Absent when the clinic runs an older app that cannot decrypt yet. The
       booking then goes as it used to rather than failing. */
    publicKey: typeof data?.publicKey === "string" ? data.publicKey : "",
    botUsername: typeof data?.botUsername === "string" ? data.botUsername : "",
  };
};

/**
 * Mounted only while the modal is open, so every opening starts clean: fresh
 * free times, no half-typed name from last time, and no effect copying a prop
 * into state.
 */
const BookingDialog = ({ onClose, initialService, initialName, initialPhone, initialNote }) => {
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.uz;
  const a11y = getA11yLabels(lang);
  const dialogRef = useModalA11y(true, onClose);

  const [service, setService] = useState(initialService || SERVICES[0].id);
  /* "loading" | "ready" | "offline" - never a guessed timetable. */
  const [status, setStatus] = useState("loading");
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState(initialPhone || "");
  /* The clinic asks for a date of birth at the desk, so the website asks for
     it too: it is what tells a returning patient from a relative sharing
     their phone, and without it every family booking makes a new record. */
  const [dob, setDob] = useState("");
  const [note, setNote] = useState(initialNote || "");
  const [clinicKey, setClinicKey] = useState("");
  const [botUsername, setBotUsername] = useState("");
  const [botLink, setBotLink] = useState("");
  const [botQr, setBotQr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ── Free times, straight from the dentist's calendar ───────── */
  const applyAvailability = useCallback((result) => {
    const free = result.days;
    setDays(free);
    setClinicKey(result.publicKey || "");
    setBotUsername(result.botUsername || "");
    setStatus("ready");
    /* Keep the patient's day if it still has free times, otherwise move to the
       first day that does. */
    setSelectedDate((current) =>
      free.some((day) => day.date === current) ? current : free[0]?.date || "",
    );
  }, []);

  /* Nothing is set synchronously here: the dialog already mounts in its loading
     state, and the rest lands when the clinic answers. */
  useEffect(() => {
    let cancelled = false;
    fetchAvailability()
      .then((result) => {
        if (!cancelled) applyAvailability(result);
      })
      .catch(() => {
        if (cancelled) return;
        setDays([]);
        setStatus("offline");
      });
    return () => {
      cancelled = true;
    };
  }, [applyAvailability]);

  /** Re-read the calendar after a retry, or after somebody took a slot. */
  const reloadAvailability = async () => {
    setStatus("loading");
    try {
      applyAvailability(await fetchAvailability());
    } catch {
      setDays([]);
      setStatus("offline");
    }
  };

  /* ── Derived ────────────────────────────────────────────────── */
  const activeDay = useMemo(
    () => days.find((day) => day.date === selectedDate) || null,
    [days, selectedDate],
  );
  const serviceObj = SERVICES.find((item) => item.id === service) || SERVICES[0];
  const serviceLabel = serviceObj[lang] || serviceObj.uz;

  /* Telegram is a way to reach the clinic, not a way to book. It is offered
     when the server is unreachable and as an optional reminder afterwards. */
  const telegramUrl = `${DOCTOR_INFO.telegram}?text=${encodeURIComponent(
    `Assalomu alaykum Dr. Munojat! ${serviceLabel} bo'yicha qabulga yozilmoqchiman.`,
  )}`;

  const pickDay = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim().length < 2 || !phone.trim()) {
      toast.error(t.needName);
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      toast.error(t.invalidPhone);
      return;
    }
    if (!dob.trim()) {
      toast.error(t.needDob);
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error(t.needTime);
      return;
    }

    setIsSubmitting(true);
    try {
      const details = {
        name: name.trim(),
        phone: phone.trim(),
        dob: dob.trim(),
        note: buildNote(serviceLabel, note),
      };

      /* A one-time secret the clinic's app will register against this patient,
         so the code shown afterwards connects them to the right record. */
      const linkToken = clinicKey && canSeal() ? makeLinkToken() : "";
      const linkTokenHash = linkToken ? await hashLinkToken(linkToken) : "";

      /* Sealed in this browser when the clinic published a key, so the server
         in between stores bytes it cannot read. Sent plainly only when that is
         impossible - an older clinic app, or a browser without WebCrypto -
         because refusing the booking would help nobody. */
      const payload = linkToken
        ? {
            sealed: await sealBookingDetails({ ...details, linkToken }, clinicKey),
            ...(linkTokenHash ? { linkTokenHash } : {}),
          }
        : details;

      const res = await fetch(requestUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(BOOKING_TIMEOUT_MS),
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          ...payload,
          source: window.location.hostname,
        }),
      });

      if (res.status === 201) {
        if (linkToken && botUsername) {
          const link = `https://t.me/${botUsername}?start=${linkToken}`;
          setBotLink(link);
          /* Loaded only once a booking succeeds, so the library never costs
             anybody who is just looking at the times. */
          import("qrcode")
            .then((mod) => (mod.default || mod).toDataURL(link, { margin: 2, width: 220 }))
            .then(setBotQr)
            .catch(() => setBotQr(""));
        }
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#ffd700", "#fd1616", "#229ed9", "#10b981", "#ffffff"],
        });
        return;
      }

      /* 409 means somebody else took this time between loading the form and
         submitting it. Reload so the patient picks from what is still free. */
      if (res.status === 409) {
        toast.error(t.taken);
        setSelectedTime("");
        await reloadAvailability();
        return;
      }

      toast.error(res.status === 429 ? t.tooMany : t.failed);
    } catch {
      toast.error(t.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = Boolean(
    name.trim().length >= 2 &&
    phone.replace(/\D/g, "").length >= 9 &&
    dob.trim() &&
    selectedDate &&
    selectedTime,
  );
  const noSlotsAvailable = status === "offline" || (status === "ready" && days.length === 0);

  /* ─────────────────────── JSX ────────────────────────────────── */
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl border-2 border-red-100 animate-fade-in-up outline-none my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={a11y.close}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-black transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* ══════════ SENT VIEW ══════════ */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <IconCheckCircle className="w-9 h-9 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block">
              {t.sentBadge}
            </span>
            <h3 className="text-2xl font-black text-slate-900">{t.sentTitle}</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">{t.sentBody}</p>

            <dl className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <dt className="text-slate-500">{t.patient}</dt>
                <dd className="font-bold text-slate-900">{name}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <dt className="text-slate-500">{t.phoneLabel}</dt>
                <dd className="font-bold text-slate-900">{phone}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <dt className="text-slate-500">{t.serviceLabel}</dt>
                <dd className="font-bold text-slate-900">{serviceLabel}</dd>
              </div>
              <div className="flex justify-between pt-0.5">
                <dt className="text-slate-500">{t.when}</dt>
                <dd className="font-bold text-[#930b0b]">
                  {selectedDate} · {selectedTime}
                </dd>
              </div>
            </dl>

            {botLink ? (
              /* The clinic's own bot, tied to this booking by a one-time code.
                 Scanning it is what lets reminders reach them at all: the app
                 skips anyone whose Telegram is not connected, so a patient who
                 books online and walks away would otherwise be the only kind
                 who never gets reminded. */
              <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4 space-y-3">
                <p className="text-xs font-black text-sky-900">{t.botTitle}</p>
                {botQr && (
                  <img
                    src={botQr}
                    alt={t.botTitle}
                    width={176}
                    height={176}
                    className="mx-auto rounded-xl bg-white p-2 shadow-sm"
                  />
                )}
                <p className="text-[11px] text-sky-800 leading-relaxed">{t.botBody}</p>
                <a
                  href={botLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <IconTelegram className="w-4 h-4 text-white" />
                  <span>{t.botOpen}</span>
                </a>
              </div>
            ) : null}

            <div className="space-y-2 pt-1">
              {!botLink && (
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <IconTelegram className="w-4 h-4 text-white" />
                  <span>{t.telegramReminder}</span>
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        ) : (
          /* ══════════ BOOKING FORM ══════════ */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] font-black text-[#930b0b] uppercase tracking-widest px-3 py-1 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
                {t.badge}
              </span>
              <h3 id="booking-modal-title" className="text-2xl font-black text-slate-900 mb-1">
                {t.title}
              </h3>
              <p className="text-xs text-slate-500">{t.subtitle}</p>
            </div>

            {/* Service selector */}
            <div>
              <label
                htmlFor="bk-service"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {t.service}
              </label>
              <select
                id="bk-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-bold text-slate-900 bg-white cursor-pointer"
              >
                {SERVICES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item[lang] || item.uz}
                  </option>
                ))}
              </select>
            </div>

            {noSlotsAvailable ? (
              /* No invented timetable. When the server is unreachable or all
                 published slots are currently taken, offer direct phone/Telegram
                 contact and a retry button instead of an unsubmittable form. */
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-3">
                <p className="font-semibold leading-relaxed">
                  {status === "offline" ? t.offline : t.noTimes}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${DOCTOR_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#930b0b] text-white font-bold hover:brightness-110 transition-all"
                  >
                    <IconPhone className="w-3.5 h-3.5 text-white" />
                    <span>{DOCTOR_INFO.phone}</span>
                  </a>
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#229ED9] text-white font-bold hover:brightness-110 transition-all"
                  >
                    <IconTelegram className="w-3.5 h-3.5 text-white" />
                    <span>Telegram</span>
                  </a>
                  <button
                    type="button"
                    onClick={reloadAvailability}
                    className="inline-flex items-center px-3 py-2 rounded-xl bg-white border-2 border-amber-300 text-amber-900 font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    {t.retry}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* ── Day strip ──────────────────────────────── */}
                <div>
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.day}
                  </p>
                  {status === "loading" ? (
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-[58px] w-[54px] rounded-2xl bg-slate-100 animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-hide"
                      role="group"
                      aria-label={t.day}
                    >
                      {days.map((day) => {
                        const { day: weekday, date: dayNumber } = dayLabel(day.date, lang);
                        const isActive = day.date === selectedDate;
                        const isToday = day.date === todayYmd();
                        return (
                          <button
                            key={day.date}
                            type="button"
                            onClick={() => pickDay(day.date)}
                            aria-pressed={isActive}
                            className={`shrink-0 snap-start flex flex-col items-center px-3 py-2 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer min-w-[54px] ${
                              isActive
                                ? "bg-[#930b0b] text-white border-[#930b0b] shadow-md scale-[1.04]"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50"
                            }`}
                          >
                            <span className="uppercase tracking-wide text-[10px] opacity-70">{weekday}</span>
                            <span className="text-sm font-black mt-0.5">{dayNumber}</span>
                            {isToday && (
                              <span
                                className={`text-[9px] mt-0.5 font-bold ${
                                  isActive ? "text-yellow-300" : "text-[#930b0b]"
                                }`}
                              >
                                {t.today}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ── Time grid ──────────────────────────────── */}
                <div>
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t.time}
                  </p>
                  {status === "loading" ? (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2" aria-label={t.loading}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="h-9 rounded-xl bg-slate-100 animate-pulse" />
                      ))}
                    </div>
                  ) : !activeDay ? (
                    <p className="text-xs text-slate-500 py-2">{t.noTimes}</p>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2" role="group" aria-label={t.time}>
                      {activeDay.times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          aria-pressed={selectedTime === time}
                          className={`py-2 rounded-xl text-xs font-bold transition-all text-center border-2 cursor-pointer ${
                            selectedTime === time
                              ? "bg-[#fd1616] text-white border-[#fd1616] shadow-md scale-[1.04]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Patient details ────────────────────────────── */}
                <div className="space-y-3">
                  <div>
                    <label htmlFor="bk-name" className="sr-only">
                      {t.namePlaceholder}
                    </label>
                    <input
                      id="bk-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="sr-only">
                      {t.phonePlaceholder}
                    </label>
                    <input
                      id="bk-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={t.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-dob" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t.dobPlaceholder}
                    </label>
                    <input
                      id="bk-dob"
                      name="bday"
                      type="date"
                      autoComplete="bday"
                      max={todayYmd()}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      aria-describedby="bk-dob-hint"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900"
                    />
                    <p id="bk-dob-hint" className="mt-1 text-[10px] text-slate-400">{t.dobHint}</p>
                  </div>
                  <div>
                    <label htmlFor="bk-note" className="sr-only">
                      {t.notePlaceholder}
                    </label>
                    <input
                      id="bk-note"
                      name="note"
                      type="text"
                      maxLength={240}
                      placeholder={t.notePlaceholder}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-semibold text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {selectedTime && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <IconCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {selectedDate} · {selectedTime} — {serviceLabel}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className="w-full min-h-[50px] bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <IconClock className="w-4 h-4 text-white" />
                      <span>{t.submit}</span>
                    </>
                  )}
                </button>

                <div className="pt-1 text-center">
                  <a
                    href={`tel:${DOCTOR_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#930b0b] transition-colors"
                  >
                    <IconPhone className="w-3.5 h-3.5 text-[#930b0b]" />
                    <span>
                      {t.callUs} {DOCTOR_INFO.phone}
                    </span>
                  </a>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

/**
 * The modal is just a gate. Keeping the dialog unmounted while closed is what
 * lets it hold no stale state, so there is nothing to reset on the way out.
 */
const QuickBookingModal = ({ isOpen, onClose, initialService, initialName, initialPhone, initialNote }) => {
  if (!isOpen) return null;
  return (
    <BookingDialog
      onClose={onClose}
      initialService={initialService}
      initialName={initialName}
      initialPhone={initialPhone}
      initialNote={initialNote}
    />
  );
};

export default QuickBookingModal;
