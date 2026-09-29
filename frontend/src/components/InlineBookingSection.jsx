import { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import {
  IconClock,
  IconCheckCircle,
  IconPhone,
  IconTelegram,
  IconLocationPin as IconMapPin,
} from "./MedicalIcons";
import { DOCTOR_INFO } from "../constants/doctor";
import {
  fetchDentistAvailability,
  submitDentistBooking,
  buildWorkingHoursSchedule,
} from "../lib/medinsonBooking";
import {
  formatUzPhone,
  PHONE_PLACEHOLDER,
  isUzPhoneComplete,
  handleUzPhonePaste,
} from "../utils/phone";

/* ── Helpers ─────────────────────────────────────────────────────────── */

const pad2 = (n) => String(n).padStart(2, "0");

const WEEKDAY_SHORT = {
  uz: ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"],
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const todayYmd = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const parseYmd = (s) => {
  const [y, m, d] = String(s || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const formatDayPill = (ymd, lang) => {
  const date = parseYmd(ymd);
  if (!date) return ymd;
  const wds = WEEKDAY_SHORT[lang] || WEEKDAY_SHORT.uz;
  return `${wds[date.getDay()]} ${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}`;
};

const formatDmy = (ymd) => {
  const [y, m, d] = String(ymd || "").split("-");
  if (!y || !m || !d) return ymd;
  return `${d}.${m}.${y}`;
};

export const CLASSIC_SERVICES = [
  {
    id: "korik",
    uz: "Ko'rik va konsultatsiya",
    ru: "Осмотр и консультация",
    en: "Consultation & Check-up",
  },
  {
    id: "tish-davolash",
    uz: "Tish davolash va plomba",
    ru: "Лечение зубов и пломбирование",
    en: "Restorative Care & Fillings",
  },
  {
    id: "ortopediya",
    uz: "Tish karonkalari",
    ru: "Зубные коронки",
    en: "Dental Crowns",
  },
  {
    id: "implantatsiya",
    uz: "Dental implantatsiya",
    ru: "Дентальная имплантация",
    en: "Dental Implants",
  },
  {
    id: "tish-oqartirish",
    uz: "Tish oqartirish",
    ru: "Профессиональное отбеливание",
    en: "Teeth Whitening",
  },
  {
    id: "xirurgiya",
    uz: "Tish olish",
    ru: "Удаление зуба",
    en: "Tooth Extraction",
  },
];

const TEXT = {
  uz: {
    kicker: "Onlayn qabul",
    heading: "Uchrashuv vaqtini tanlang",
    sub: "Qulay kun va bo'sh soatni tanlab, Dr. Munojat Akbarova qabuliga yoziling.",
    hoursLabel: "Dush–Shan 08:00–18:00",
    lunchLabel: "Tushlik 12:00–13:00",
    sundayClosed: "Yakshanba: dam olish kuni",
    serviceLabel: "Xizmat yo'nalishi",
    dayGroupLabel: "Qabul kunlari",
    timeGroupLabel: "Bo'sh soatlar",
    selectedSlotLabel: "Tanlangan vaqt:",
    nameLabel: "Ism va familiya",
    phoneLabel: "Telefon raqami",
    dobLabel: "Tug'ilgan sana",
    optional: "ixtiyoriy",
    dobHint: "Bir raqamdan bir nechta oila a'zosi foydalansa, kartangizni aniq topishga yordam beradi",
    noteLabel: "Shikoyat yoki izoh",
    namePlaceholder: "Masalan: Malika Yusupova",
    phonePlaceholder: "+998 90 123 45 67",
    notePlaceholder: "Tish og'rig'i, plomba, karonka yoki implant bo'yicha murojaat...",
    submit: "Tasdiqlash va Yozilish",
    submitting: "Yuborilmoqda...",
    needName: "Iltimos, ism va telefon raqamingizni kiriting",
    needTime: "Iltimos, sana va vaqtni tanlang",
    invalidPhone: "Iltimos, to'liq telefon raqamini kiriting (kamida 9 ta raqam)",
    taken: "Bu vaqt band qilindi. Iltimos, boshqa soatni tanlang.",
    tooMany: "So'rovlar juda ko'p. Biroz kutib qayta urinib ko'ring.",
    failed: "So'rovni yuborib bo'lmadi. Iltimos, telefon orqali bog'laning.",
    orCall: "Administrator bilan bog'lanish:",
    successBadge: "Qabul so'rovi yuborildi",
    successTitle: "Navbatingiz ro'yxatga olindi",
    successBody: "So'rovingiz Dr. Munojat Akbarovaning MedInson tizimiga yetkazildi. Tez orada tasdiqlash uchun siz bilan bog'lanamiz.",
    summaryPatient: "Bemor",
    summaryPhone: "Telefon",
    summaryService: "Xizmat",
    summaryWhen: "Sana va soat",
    botTitle: "📲 Telegram eslatmani yoqing",
    botDesc: "Qabul vaqti yaqinlashganda Telegram orqali avtomatik eslatma olish uchun quyidagi tugmani bosing va botda START tugmasini bosing.",
    botBtn: "Telegram botga ulanish ↗",
    newBooking: "Yangi vaqt tanlash",
  },
  ru: {
    kicker: "Онлайн запись",
    heading: "Выберите время приёма",
    sub: "Выберите удобный день и свободное время для записи к Д-р Мунаджат Акбаровой.",
    hoursLabel: "Пн–Сб 08:00–18:00",
    lunchLabel: "Обед 12:00–13:00",
    sundayClosed: "Воскресенье: выходной",
    serviceLabel: "Направление лечения",
    dayGroupLabel: "Дни приёма",
    timeGroupLabel: "Свободное время",
    selectedSlotLabel: "Выбранное время:",
    nameLabel: "Имя и фамилия",
    phoneLabel: "Номер телефона",
    dobLabel: "Дата рождения",
    optional: "необязательно",
    dobHint: "Помогает различить членов семьи с общим номером телефона",
    noteLabel: "Жалоба или комментарий",
    namePlaceholder: "Например: Малика Юсупова",
    phonePlaceholder: "+998 90 123 45 67",
    notePlaceholder: "Зубная боль, пломба, коронка или консультация по имплантации...",
    submit: "Подтвердить запись",
    submitting: "Отправка...",
    needName: "Пожалуйста, укажите имя и номер телефона",
    needTime: "Пожалуйста, выберите дату и время",
    invalidPhone: "Введите корректный номер телефона (минимум 9 цифр)",
    taken: "Это время уже занято. Пожалуйста, выберите другое.",
    tooMany: "Слишком много попыток. Попробуйте чуть позже.",
    failed: "Не удалось отправить запрос. Пожалуйста, позвоните нам.",
    orCall: "Связаться с администратором:",
    successBadge: "Заявка отправлена",
    successTitle: "Ваша запись принята",
    successBody: "Запрос передан в систему MedInson Д-р Мунаджат Акбаровой. Клиника свяжется с вами для подтверждения.",
    summaryPatient: "Пациент",
    summaryPhone: "Телефон",
    summaryService: "Услуга",
    summaryWhen: "Дата и время",
    botTitle: "📲 Включите напоминания в Telegram",
    botDesc: "Нажмите кнопку ниже и запустите бота (START), чтобы автоматически получать напоминания о приёме.",
    botBtn: "Подключиться к Telegram боту ↗",
    newBooking: "Выбрать другое время",
  },
  en: {
    kicker: "Online Appointment",
    heading: "Select an Appointment Time",
    sub: "Choose a convenient date and available hour with Dr. Munojat Akbarova.",
    hoursLabel: "Mon–Sat 08:00–18:00",
    lunchLabel: "Lunch 12:00–13:00",
    sundayClosed: "Sunday: closed",
    serviceLabel: "Type of Service",
    dayGroupLabel: "Available Dates",
    timeGroupLabel: "Available Hours",
    selectedSlotLabel: "Selected time:",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    dobLabel: "Date of birth",
    optional: "optional",
    dobHint: "Helps distinguish family members sharing one phone number",
    noteLabel: "Note or symptom",
    namePlaceholder: "e.g. Malika Yusupova",
    phonePlaceholder: "+998 90 123 45 67",
    notePlaceholder: "Toothache, filling, crown, or implant consultation...",
    submit: "Confirm Appointment",
    submitting: "Submitting...",
    needName: "Please enter your name and phone number",
    needTime: "Please select a date and time",
    invalidPhone: "Please enter a valid phone number (at least 9 digits)",
    taken: "That slot was just taken. Please choose another time.",
    tooMany: "Too many attempts. Please wait a moment.",
    failed: "Could not send request. Please call us directly.",
    orCall: "Call the clinic desk:",
    successBadge: "Request Sent",
    successTitle: "Appointment Request Received",
    successBody: "Your request has been sent to Dr. Munojat Akbarova's MedInson calendar. We will contact you shortly to confirm.",
    summaryPatient: "Patient",
    summaryPhone: "Phone",
    summaryService: "Service",
    summaryWhen: "Date & Time",
    botTitle: "📲 Enable Telegram reminders",
    botDesc: "Tap the button below and press START in the bot to receive automatic appointment reminders.",
    botBtn: "Connect to Telegram bot ↗",
    newBooking: "Book another time",
  },
};

const InlineBookingSection = ({
  initialService = null,
  initialName = "",
  initialPhone = "",
  initialNote = "",
  sectionId = "uchrashuv-vaqti",
  compact = false,
}) => {
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.uz;

  /* Initialize with instant 10-day working hours schedule so SSR & first paint
     immediately display selectable dates & free hours without a blank flash. */
  const initialSchedule = useMemo(() => buildWorkingHoursSchedule({}, 10), []);

  const [days, setDays] = useState(initialSchedule);
  const [liveMeta, setLiveMeta] = useState(null);
  const [selectedDate, setSelectedDate] = useState(initialSchedule[0]?.date || "");
  const [selectedTime, setSelectedTime] = useState(initialSchedule[0]?.times?.[0] || "");

  const [service, setService] = useState(
    CLASSIC_SERVICES.some((s) => s.id === initialService)
      ? initialService
      : CLASSIC_SERVICES[0].id,
  );
  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState(initialPhone ? formatUzPhone(initialPhone) : "");
  const [dob, setDob] = useState("");
  const [note, setNote] = useState(initialNote || "");
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [botLink, setBotLink] = useState("");
  const [botQr, setBotQr] = useState("");

  useEffect(() => {
    if (initialService && CLASSIC_SERVICES.some((s) => s.id === initialService)) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialName) setName(initialName);
    if (initialPhone) setPhone(formatUzPhone(initialPhone));
    if (initialNote) setNote(initialNote);
  }, [initialName, initialPhone, initialNote]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qService = params.get("service");
      const qNote = params.get("note");
      if (qService && CLASSIC_SERVICES.some((s) => s.id === qService)) {
        setService(qService);
      }
      if (qNote) {
        setNote(qNote);
      }
    } catch {
      /* ignore */
    }

    const onPrefill = (e) => {
      const detail = e?.detail || {};
      if (detail.service && CLASSIC_SERVICES.some((s) => s.id === detail.service)) {
        setService(detail.service);
      }
      if (detail.name) setName(detail.name);
      if (detail.phone) setPhone(formatUzPhone(detail.phone));
      if (detail.note) setNote(detail.note);
    };
    window.addEventListener("medinson-prefill-booking", onPrefill);
    return () => window.removeEventListener("medinson-prefill-booking", onPrefill);
  }, []);

  const loadAvailability = useCallback(async () => {
    try {
      const data = await fetchDentistAvailability();
      setLiveMeta({ clinic: data?.clinic || null, dentist: data?.dentist || null });
      const fetchedDays = Array.isArray(data?.days) && data.days.length > 0
        ? data.days
        : buildWorkingHoursSchedule(data, 10);

      setDays(fetchedDays);
      setSelectedDate((cur) => {
        const match = fetchedDays.find((d) => d.date === cur);
        return match ? match.date : fetchedDays[0]?.date || "";
      });
    } catch {
      /* Keep initial schedule */
    }
  }, []);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  const activeDay = useMemo(
    () => days.find((d) => d.date === selectedDate) || days[0] || null,
    [days, selectedDate],
  );

  useEffect(() => {
    if (!activeDay) return;
    if (!selectedTime || !activeDay.times.includes(selectedTime)) {
      setSelectedTime(activeDay.times[0] || "");
    }
  }, [activeDay, selectedTime]);

  const serviceObj = CLASSIC_SERVICES.find((s) => s.id === service) || CLASSIC_SERVICES[0];
  const serviceLabel = serviceObj[lang] || serviceObj.uz;

  const clinicName =
    liveMeta?.clinic?.name || liveMeta?.dentist?.clinicName || DOCTOR_INFO.clinicName;
  const clinicAddress =
    liveMeta?.clinic?.address ||
    liveMeta?.dentist?.address ||
    "Darxon MFY, Xalqlar Do'stligi 931, Andijon";

  const handlePhoneChange = (e) => {
    const formatted = formatUzPhone(e.target.value, phone);
    setPhone(formatted);
    if (errors.phone && isUzPhoneComplete(formatted)) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handlePhoneBlur = () => {
    if (phone.trim() && !isUzPhoneComplete(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone:
          lang === "uz"
            ? "Telefon formati noto‘g‘ri. Masalan: +998 (94) 106-15-55"
            : lang === "ru"
              ? "Неверный формат. Например: +998 (94) 106-15-55"
              : "Invalid format. Example: +998 (94) 106-15-55",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = t.needName;
    }
    if (!phone.trim() || !isUzPhoneComplete(phone)) {
      nextErrors.phone =
        lang === "uz"
          ? "Telefon formati noto‘g‘ri. Masalan: +998 (94) 106-15-55"
          : lang === "ru"
            ? "Неверный формат. Например: +998 (94) 106-15-55"
            : "Invalid format. Example: +998 (94) 106-15-55";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error(nextErrors.name || nextErrors.phone);
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error(t.needTime);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitDentistBooking({
        date: selectedDate,
        time: selectedTime,
        name: name.trim(),
        phone: phone.trim(),
        dob: dob.trim(),
        note: note.trim() ? `${serviceLabel} — ${note.trim()}` : serviceLabel,
      });

      if (result.telegramUrl) {
        setBotLink(result.telegramUrl);
        import("qrcode")
          .then((mod) =>
            (mod.default || mod).toDataURL(result.telegramUrl, {
              margin: 2,
              width: 180,
            }),
          )
          .then(setBotQr)
          .catch(() => setBotQr(""));
      }

      setIsSuccess(true);
      loadAvailability();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#930b0b", "#d97706", "#10b981"],
      });
    } catch (err) {
      if (err?.status === 409) {
        toast.error(t.taken);
        setSelectedTime("");
        loadAvailability();
      } else if (err?.status === 429) {
        toast.error(t.tooMany);
      } else {
        toast.error(t.failed);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setBotLink("");
    setBotQr("");
    setName("");
    setPhone("");
    setDob("");
    setNote("");
    setErrors({});
  };

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className="scroll-mt-24 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 lg:p-10"
    >
      {/* ── Classic Professional Header ──────────────────────────────── */}
      <div className="border-b border-slate-200/80 pb-5 mb-6 text-left sm:text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#930b0b] mb-1.5">
          {t.kicker}
        </p>
        <h2
          id={`${sectionId}-title`}
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
        >
          {t.heading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl sm:mx-auto">
          {t.sub}
        </p>

        {/* Clean, classic metadata line — zero cartoon emojis */}
        <div className="mt-3.5 flex flex-wrap items-center sm:justify-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#930b0b]" />
            <span>{clinicName}</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <IconClock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>
              {t.hoursLabel} ({t.lunchLabel})
            </span>
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1 text-slate-600">
            <IconMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{clinicAddress}</span>
          </span>
        </div>
      </div>

      {isSuccess ? (
        /* ══════════ SUCCESS VIEW ══════════ */
        <div className="max-w-lg mx-auto py-4 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
            <IconCheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 mb-1">
              {t.successBadge}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              {t.successBody}
            </p>
          </div>

          <dl className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2.5 text-slate-700">
            <div className="flex justify-between border-b border-slate-200/70 pb-2">
              <dt className="text-slate-500">{t.summaryPatient}:</dt>
              <dd className="font-semibold text-slate-900">{name}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-2">
              <dt className="text-slate-500">{t.summaryPhone}:</dt>
              <dd className="font-semibold text-slate-900">{phone}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-2">
              <dt className="text-slate-500">{t.summaryService}:</dt>
              <dd className="font-semibold text-slate-900">{serviceLabel}</dd>
            </div>
            <div className="flex justify-between pt-0.5">
              <dt className="text-slate-500">{t.summaryWhen}:</dt>
              <dd className="font-bold text-[#930b0b]">
                {formatDmy(selectedDate)} · {selectedTime}
              </dd>
            </div>
          </dl>

          {botLink && (
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 space-y-3 text-left">
              <p className="text-xs font-bold text-sky-950">{t.botTitle}</p>
              {botQr && (
                <img
                  src={botQr}
                  alt={t.botTitle}
                  width={160}
                  height={160}
                  className="mx-auto rounded-xl bg-white p-2 border border-slate-200 block"
                />
              )}
              <p className="text-xs text-sky-900/80 leading-relaxed">{t.botDesc}</p>
              <a
                href={botLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <IconTelegram className="w-4 h-4 text-white" />
                <span>{t.botBtn}</span>
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            {t.newBooking}
          </button>
        </div>
      ) : (
        /* ══════════ INLINE CALENDAR + TIME GRID + FORM ══════════ */
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* 1. Date Pills Strip (dentahouse.uz style: Se 29.09, Ch 30.09, Pa 01.10...) */}
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2.5 text-left sm:text-center">
              {t.dayGroupLabel}
            </p>
            <div
              className="flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center snap-x snap-mandatory"
              role="group"
              aria-label={t.dayGroupLabel}
            >
              {days.map((day) => {
                const isActive = day.date === selectedDate;
                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day.date);
                    }}
                    aria-pressed={isActive}
                    className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                      isActive
                        ? "bg-[#930b0b] text-white border-[#930b0b] shadow-xs"
                        : "bg-slate-100 text-slate-700 border-slate-200/80 hover:bg-slate-200/70"
                    }`}
                  >
                    {formatDayPill(day.date, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Free Time Slots Grid (dentahouse.uz 6-column layout) */}
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2.5 text-left sm:text-center">
              {t.timeGroupLabel}
            </p>
            {activeDay && activeDay.times.length > 0 && (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3"
                role="group"
                aria-label={t.timeGroupLabel}
              >
                {activeDay.times.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={isSelected}
                      className={`py-3 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                        isSelected
                          ? "bg-[#930b0b] text-white border-[#930b0b] shadow-xs scale-[1.01]"
                          : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Classic Service Pills (No native OS <select> dropdown) */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-2.5">
              {t.serviceLabel}
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
              role="group"
              aria-label={t.serviceLabel}
            >
              {CLASSIC_SERVICES.map((item) => {
                const isSelected = service === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setService(item.id)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-slate-50/80 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{item[lang] || item.uz}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Patient Form Fields */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left items-start">
            <div>
              <label
                htmlFor={`${sectionId}-name`}
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {t.nameLabel}
              </label>
              <input
                id={`${sectionId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name && e.target.value.trim().length >= 2) {
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }
                }}
                required
                className={`w-full h-[50px] px-4 rounded-2xl border text-sm text-slate-800 placeholder:text-slate-400 bg-white outline-none transition ${
                  errors.name
                    ? "border-red-500 ring-2 ring-red-500/10"
                    : "border-slate-200 focus:border-[#930b0b]/60 focus:ring-2 focus:ring-[#930b0b]/10"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 font-semibold">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${sectionId}-phone`}
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {t.phoneLabel}
              </label>
              <input
                id={`${sectionId}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={19}
                placeholder={PHONE_PLACEHOLDER}
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                onPaste={(e) => handleUzPhonePaste(e, setPhone)}
                required
                className={`w-full h-[50px] px-4 rounded-2xl border text-sm font-medium tracking-wide text-slate-800 placeholder:text-slate-400 bg-white outline-none transition ${
                  errors.phone
                    ? "border-red-500 ring-2 ring-red-500/10"
                    : "border-slate-200 focus:border-[#930b0b]/60 focus:ring-2 focus:ring-[#930b0b]/10"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 font-semibold">{errors.phone}</p>
              )}
            </div>

            {!compact && (
              <div>
                <label
                  htmlFor={`${sectionId}-dob`}
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {t.dobLabel}{" "}
                  <span className="font-normal text-slate-400">({t.optional})</span>
                </label>
                <input
                  id={`${sectionId}-dob`}
                  name="bday"
                  type="date"
                  autoComplete="bday"
                  max={todayYmd()}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full h-[50px] px-4 rounded-2xl border border-slate-200 focus:border-[#930b0b]/60 focus:ring-2 focus:ring-[#930b0b]/10 outline-none text-sm text-slate-800 bg-white transition"
                />
                <p className="mt-1 text-[11px] text-slate-400">{t.dobHint}</p>
              </div>
            )}

            <div className={compact ? "sm:col-span-2" : ""}>
              <label
                htmlFor={`${sectionId}-note`}
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {t.noteLabel}{" "}
                <span className="font-normal text-slate-400">({t.optional})</span>
              </label>
              <input
                id={`${sectionId}-note`}
                name="note"
                type="text"
                maxLength={500}
                placeholder={t.notePlaceholder}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-[50px] px-4 rounded-2xl border border-slate-200 focus:border-[#930b0b]/60 focus:ring-2 focus:ring-[#930b0b]/10 outline-none text-sm text-slate-800 placeholder:text-slate-400 bg-white transition"
              />
            </div>
          </div>

          {/* 5. Selected Time Summary + Confirm CTA (dentahouse.uz style) */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-left">
              <p className="text-xs text-slate-500">
                {t.selectedSlotLabel}{" "}
                <strong className="text-slate-900 font-bold text-sm">
                  {formatDmy(selectedDate)} / {selectedTime}
                </strong>{" "}
                <span className="text-slate-400">·</span>{" "}
                <span className="text-[#930b0b] font-semibold">{serviceLabel}</span>
              </p>
              <a
                href={`tel:${DOCTOR_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#930b0b] mt-1 transition-colors"
              >
                <IconPhone className="w-3.5 h-3.5 text-[#930b0b]" />
                <span>
                  {t.orCall} {DOCTOR_INFO.phone}
                </span>
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl bg-[#930b0b] hover:bg-[#7a0909] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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
          </div>
        </form>
      )}
    </section>
  );
};

export default InlineBookingSection;
