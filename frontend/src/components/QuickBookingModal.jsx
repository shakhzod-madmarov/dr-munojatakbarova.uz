import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { IconClock, IconCheckCircle, IconPhone, IconTelegram } from "./MedicalIcons";
import { useModalA11y } from "../hooks/useModalA11y";
import { getA11yLabels } from "../constants/a11yLabels";

const dates = [
  { id: "today", uz: "Bugun (Shoshilinch)", ru: "Сегодня (Срочно)", en: "Today (Urgent)" },
  { id: "tomorrow", uz: "Ertaga", ru: "Завтра", en: "Tomorrow" },
  { id: "next", uz: "Indinga", ru: "Послезавtra", en: "In 2 Days" },
];

const timeSlots = ["09:30", "11:00", "14:00", "16:00", "17:30"];

const servicesList = [
  { id: "implantatsiya", uz: "Titan Dental Implantatsiya", ru: "Титановая имплантация", en: "Titanium Dental Implant" },
  { id: "tish-davolash", uz: "Tish Davolash & 4 Davlat Plombalari", ru: "Лечение зубов и пломбы (4 страны)", en: "Tooth Treatment & 4-Country Fillings" },
  { id: "ortopediya", uz: "Old & Orqa Tish Karonkalari", ru: "Коронки на передние и жевательные зубы", en: "Crowns for Front & Back Teeth" },
  { id: "oqartirish", uz: "ZOOM 4 Tish Oqartirish", ru: "ZOOM 4 Отбеливание зубов", en: "ZOOM 4 Teeth Whitening" },
  { id: "xirurgiya", uz: "Og'riqsiz Tish Olish & Jarrohlik", ru: "Бережное удаление зубов", en: "Painless Tooth Extraction" },
  { id: "korik", uz: "Profilaktik Ko'rik & Konsultatsiya", ru: "Осмотр и консультация", en: "Checkup & Consultation" },
];

const getCalculatedDateString = (dateId) => {
  const d = new Date();
  if (dateId === "tomorrow") d.setDate(d.getDate() + 1);
  else if (dateId === "next") d.setDate(d.getDate() + 2);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const QuickBookingModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const dialogRef = useModalA11y(isOpen, onClose);
  
  const [selectedDate, setSelectedDate] = useState("tomorrow");
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [service, setService] = useState(servicesList[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const currentServiceObj = servicesList.find((s) => s.id === service) || servicesList[0];
  const serviceLabel = currentServiceObj[lang] || currentServiceObj.uz;
  const dateObj = dates.find((d) => d.id === selectedDate);
  const dateLabel = dateObj ? dateObj[lang] : selectedDate;
  const isoDate = getCalculatedDateString(selectedDate);
  const displayDateStr = `${isoDate} (${dateLabel})`;

  const telegramMsg = encodeURIComponent(
    `🦷 TEZKOR QABULGA YOZILISH (drmunojat.uz):\n` +
    `👤 Bemor: ${name.trim()}\n` +
    `📞 Tel: ${phone.trim()}\n` +
    `⚙️ Xizmat: ${serviceLabel}\n` +
    `📅 Sana: ${displayDateStr}\n` +
    `⏰ Vaqt: ${selectedTime}\n` +
    `📍 Manzil: Orzu Stoma Denta, Andijon`
  );
  const telegramUrl = `https://t.me/dr_munojat?text=${telegramMsg}`;

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setHasError(false);
    setIsLoading(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error(
        lang === "uz"
          ? "Iltimos, ismingiz va telefon raqamingizni kiriting"
          : lang === "ru"
          ? "Пожалуйста, введите ваше имя и номер телефона"
          : "Please enter your name and phone number"
      );
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const payload = {
      dentistKey: "dr_munojat_akbarova",
      patientName: name.trim(),
      patientPhone: phone.trim(),
      date: displayDateStr,
      time: selectedTime,
      service: serviceLabel,
      source: "drmunojat.uz",
    };

    try {
      const response = await fetch("https://dentist-medinson-license.uz/api/public/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.ok || data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#ffd700", "#fd1616", "#229ed9", "#10b981", "#ffffff"],
        });
        toast.success(
          lang === "uz"
            ? "Qabulingiz muvaffaqiyatli qabul qilindi!"
            : lang === "ru"
            ? "Запись успешно принята!"
            : "Your appointment has been successfully booked!"
        );
      } else {
        // Server returned non-ok response
        console.warn("MedInson API response status:", response.status, data);
        setHasError(true);
        toast.info(
          lang === "uz"
            ? "Buyurtma shakllantirildi. Telegram orqali tasdiqlashingiz mumkin."
            : "Заявка сформирована. Вы можете подтвердить через Telegram."
        );
      }
    } catch (err) {
      console.error("Booking submission network error:", err);
      setHasError(true);
      toast.warn(
        lang === "uz"
          ? "Server bilan aloqada uzilish bo'ldi. Zudlik bilan Telegram orqali yuboring!"
          : "Связь с сервером прервалась. Отправьте через Telegram!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-100 animate-fade-in-up outline-none my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          aria-label={a11y.close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-black transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* ════════════ SUCCESS VIEW ════════════ */}
        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <IconCheckCircle className="w-9 h-9 text-emerald-600" />
            </div>
            
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block">
              {lang === "uz" ? "QABUL QILINDI" : lang === "ru" ? "УСПЕШНО ЗАПИСАНО" : "SUCCESSFULLY BOOKED"}
            </span>

            <h3 className="text-2xl font-black text-slate-900">
              {lang === "uz"
                ? "Qabulingiz Muvaffaqiyatli Yozildi!"
                : lang === "ru"
                ? "Запись Успешно Оформлена!"
                : "Appointment Confirmed!"}
            </h3>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {lang === "uz"
                ? "Ma'lumotlaringiz Dr. Munojat Akbarovaning MedInson Stomatolog tizimiga uzatildi. Tez orada siz bilan bog'lanamiz."
                : lang === "ru"
                ? "Ваша заявка передана в систему MedInson Стоматолог Д-р Мунаджат Акбаровой. Мы скоро свяжемся с вами."
                : "Your request was received by Dr. Munojat Akbarova's MedInson clinical system. We will contact you shortly."}
            </p>

            {/* Summary card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <span className="text-slate-500">{lang === "uz" ? "Bemor:" : "Пациент:"}</span>
                <span className="font-bold text-slate-900">{name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <span className="text-slate-500">{lang === "uz" ? "Telefon:" : "Телефон:"}</span>
                <span className="font-bold text-slate-900">{phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1">
                <span className="text-slate-500">{lang === "uz" ? "Xizmat:" : "Услуга:"}</span>
                <span className="font-bold text-slate-900">{serviceLabel}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-500">{lang === "uz" ? "Sana va Vaqt:" : "Дата и время:"}</span>
                <span className="font-bold text-[#930b0b]">{displayDateStr} · {selectedTime}</span>
              </div>
            </div>

            {/* Optional Telegram reminder button */}
            <div className="pt-2 space-y-2">
              <a
                href={telegramUrl}
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
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {lang === "uz" ? "Oynani yopish" : lang === "ru" ? "Закрыть окно" : "Close"}
              </button>
            </div>
          </div>
        ) : (
          /* ════════════ BOOKING FORM VIEW ════════════ */
          <>
            <span className="text-[10px] font-black text-[#930b0b] uppercase tracking-widest px-3 py-1 rounded-full bg-red-50 border border-red-200 inline-block mb-3">
              1-CLICK NAVBATSIZ QABUL · MEDINSON
            </span>
            <h3 id="modal-title" className="text-2xl font-black text-slate-900 mb-1">
              {lang === "uz" ? "Qabul Vaqtini Tanlang" : lang === "ru" ? "Выберите Время Приёма" : "Choose Appointment Slot"}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {lang === "uz"
                ? "Dr. Munojat Akbarova qabuliga tezkor va to'g'ridan-to'g'ri yozilish"
                : "Direct private booking with Dr. Munojat Akbarova"}
            </p>

            {hasError && (
              <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-2">
                <p className="font-semibold">
                  {lang === "uz"
                    ? "Serverda vaqtinchalik sinxronizatsiya kutilmoqda. Qabulingizni zudlik bilan Telegram orqali tasdiqlashingiz mumkin:"
                    : "Сервер ожидает синхронизации. Вы можете подтвердить запись напрямую через Telegram:"}
                </p>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#229ED9] hover:underline"
                >
                  <IconTelegram className="w-4 h-4" />
                  <span>{lang === "uz" ? "Telegram'da 1-bosishda tasdiqlash ↗" : "Подтвердить в Telegram в 1 клик ↗"}</span>
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label htmlFor="service-select" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === "uz" ? "Stomatologik Xizmat Turi" : lang === "ru" ? "Тип услуги" : "Service Type"}
                </label>
                <select
                  id="service-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#fd1616] focus:outline-none text-xs font-bold text-slate-900 bg-white"
                >
                  {servicesList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s[lang] || s.uz}
                    </option>
                  ))}
                </select>
              </div>

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
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
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
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all text-center border cursor-pointer ${
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

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>
                      {lang === "uz" ? "Yuborilmoqda..." : lang === "ru" ? "Отправка..." : "Submitting..."}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <IconClock className="w-4 h-4 text-white" />
                    <span>
                      {lang === "uz" ? "Qabulga Yozilish" : lang === "ru" ? "Записаться на Приём" : "Book Appointment"}
                    </span>
                  </div>
                )}
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
          </>
        )}

      </div>
    </div>
  );
};

export default QuickBookingModal;
