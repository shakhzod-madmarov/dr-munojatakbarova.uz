import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Seo from "../components/Seo";
import confetti from "canvas-confetti";
import QRCode from "qrcode";
import {
  IconGoogle,
  IconYandex,
  IconTelegram,
  IconPhone,
  IconCheckCircle,
  IconSparkleStar,
} from "../components/MedicalIcons";
import { DOCTOR_INFO } from "../constants/doctor";

const TEXT = {
  uz: {
    title: "Qabulingiz qanday o‘tdi?",
    subtitle: "Dr. Munojat Akbarova xizmati va yangi tabassumingizni baholang",
    doctorRole: "Oliy toifali ayol stomatolog · Orzu Stoma Denta",
    promptStar: "Baho berish uchun yulduzchalardan birini bosing:",
    ratings: {
      5: "A‘lo darajada! Juda mamnunman 😍",
      4: "Yaxshi, ma‘qul bo‘ldi 😊",
      3: "O‘rtacha, kamchiliklar bor 😐",
      2: "Qoniqarsiz 🙁",
      1: "Umuman yoqmadi 😞",
    },
    positiveTitle: "Katta rahmat! O‘z fikringizni qayerda qoldirmoqchisiz?",
    positiveBody:
      "Sizning 5 yulduzli iliq sharhingiz boshqa ayollarga ham ishonchli va og‘riqsiz ayol stomatologni topishda katta yordam beradi.",
    googleBtn: "Google Xaritalarda baholash (5★)",
    yandexBtn: "Yandex Xaritalarda baholash (5★)",
    telegramBtn: "Shaxsiy minnatdorchilik (Telegram)",
    reviewTip:
      "💡 Maslahat: Sharhingizda 'Dr. Munojat', 'Ayol stomatolog' va qilingan muolajangizni (masalan: plomba, karonka, implant) eslatib o‘tsangiz, Google va Yandex tizimlari sharhingizni eng yuqoriga chiqaradi.",
    negativeTitle: "Kechirasiz! Qanday kamchilik yuz berdi?",
    negativeBody:
      "Har bir bemorimizning to‘liq rozi bo‘lishi biz uchun 1-o‘rinda. Iltimos, muammoni darhol hal qilishimiz uchun shaxsan Dr. Munojat Akbarovaga to‘g‘ridan-to‘g‘ri yozing yoki qo‘ng‘iroq qiling:",
    directTgBtn: "Dr. Munojatga shaxsan yozish (Telegram)",
    directCallBtn: "Shifokorga to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qilish",
    changeRating: "Boshqa baho tanlash",
    printStandTitle: "🏥 Qabulxona va ko‘zgu uchun chop etiladigan stend (QR)",
    printStandDesc:
      "Ushbu sahifani A5 yoki A4 qog‘ozga chop etib, klinika qabulxonasiga yoki shifokor ko‘zgusi yoniga akril stendda qo‘yish mumkin.",
    printBtn: "🖨️ Stendni chop etish (Print)",
    scanTitle: "QR-kodni skanerlang",
    scanSub: "Dr. Munojat Akbarovaga baho berish sahifasi",
  },
  ru: {
    title: "Как прошёл ваш приём?",
    subtitle: "Оцените приём и новую улыбку у Д-р Мунаджат Акбаровой",
    doctorRole: "Женский стоматолог высшей категории · Orzu Stoma Denta",
    promptStar: "Нажмите на звёздочки, чтобы поставить оценку:",
    ratings: {
      5: "Отлично! Очень довольна 😍",
      4: "Хорошо, всё понравилось 😊",
      3: "Нормально, есть замечания 😐",
      2: "Неудовлетворительно 🙁",
      1: "Совсем не понравилось 😞",
    },
    positiveTitle: "Большое спасибо! Где вам удобнее оставить отзыв?",
    positiveBody:
      "Ваш отзыв на 5 звёзд поможет другим женщинам и девушкам найти надёжного и деликатного женского стоматолога.",
    googleBtn: "Оценить в Google Maps (5★)",
    yandexBtn: "Оценить в Яндекс Картах (5★)",
    telegramBtn: "Написать лично в Telegram",
    reviewTip:
      "💡 Подсказка: Если в отзыве вы упомянете «Д-р Мунаджат», «женский стоматолог» и вашу процедуру (пломба, коронка, имплант), поиск Google и Яндекс будет рекомендовать врача ещё выше.",
    negativeTitle: "Приносим извинения! Что пошло не так?",
    negativeBody:
      "Для нас очень важен комфорт каждого пациента. Пожалуйста, напишите или позвоните лично Д-р Мунаджат Акбаровой, чтобы мы немедленно исправили ситуацию:",
    directTgBtn: "Написать лично врачу (Telegram)",
    directCallBtn: "Позвонить врачу напрямую",
    changeRating: "Выбрать другую оценку",
    printStandTitle: "🏥 Печатная стойка с QR-кодом для приёмной и зеркала",
    printStandDesc:
      "Эту страницу можно распечатать в формате A5/A4 для акриловой стойки на ресепшн или возле зеркала в кабинете.",
    printBtn: "🖨️ Распечатать стойку (Print)",
    scanTitle: "Отсканируйте QR-код",
    scanSub: "Страница оценки приёма Д-р Мунаджат",
  },
  en: {
    title: "How was your appointment?",
    subtitle: "Rate your experience and new smile with Dr. Munojat Akbarova",
    doctorRole: "Leading Female Dentist · Orzu Stoma Denta",
    promptStar: "Tap a star to share your rating:",
    ratings: {
      5: "Excellent! Completely satisfied 😍",
      4: "Good, satisfied 😊",
      3: "Average, minor issues 😐",
      2: "Unsatisfied 🙁",
      1: "Very disappointed 😞",
    },
    positiveTitle: "Thank you so much! Where would you like to post your review?",
    positiveBody:
      "Your 5-star review helps other women find a gentle, trusted, and private female dentist.",
    googleBtn: "Review on Google Maps (5★)",
    yandexBtn: "Review on Yandex Maps (5★)",
    telegramBtn: "Send a personal note via Telegram",
    reviewTip:
      "💡 Tip: Mentioning 'Dr. Munojat', 'Female dentist', and your procedure (e.g. filling, crown, implant) helps search engines recommend her at the top.",
    negativeTitle: "We sincerely apologize! What went wrong?",
    negativeBody:
      "Your complete comfort and satisfaction are our top priority. Please contact Dr. Munojat Akbarova directly so we can resolve this right away:",
    directTgBtn: "Message Dr. Munojat on Telegram",
    directCallBtn: "Call Doctor Directly",
    changeRating: "Change rating",
    printStandTitle: "🏥 Printable QR desk stand for reception and mirror",
    printStandDesc:
      "Print this page in A5 or A4 format for an acrylic stand on the reception desk or treatment room mirror.",
    printBtn: "🖨️ Print Stand",
    scanTitle: "Scan this QR code",
    scanSub: "Rate Dr. Munojat Akbarova",
  },
};

export default function FeedbackGate() {
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.uz;

  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [qrUrl, setQrUrl] = useState("");
  const [showPrintView, setShowPrintView] = useState(false);

  /* Generate high-res QR code for this feedback gateway */
  useEffect(() => {
    const targetUrl = "https://drmunojat.uz/baho";
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: "#930b0b",
        light: "#ffffff",
      },
    })
      .then(setQrUrl)
      .catch(() => setQrUrl(""));
  }, []);

  const handleSelectRating = (score) => {
    setRating(score);
    if (score >= 4) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffd700", "#930b0b", "#10b981", "#ffffff"],
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Seo
        page="feedback"
        path="/baho"
        title="Dr. Munojat Akbarova — Fikringizni qoldiring | Baho berish"
        description="Dr. Munojat Akbarova qabuli bo'yicha o'z fikringiz va sharhingizni qoldiring. Google va Yandex Xaritalarda baholash."
      />

      <div className="py-12 px-4 sm:px-6 max-w-3xl mx-auto">
        {/* ── Header Profile Card ────────────────────────────── */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src="/logo.png"
              alt="Dr. Munojat Akbarova"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-xl border-4 border-white mx-auto"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
              <IconCheckCircle className="w-5 h-5 text-white" />
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-[#930b0b]">
            <IconSparkleStar className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.doctorRole}</span>
          </div>
        </div>

        {/* ── Interactive 5-Star Card ──────────────────────── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            {t.promptStar}
          </p>

          <div
            className="flex justify-center items-center gap-2 sm:gap-4 mb-4"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hoverRating || rating || 0) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleSelectRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="p-1 transition-transform hover:scale-125 active:scale-95 focus:outline-none"
                  aria-label={`${star} yulduz`}
                >
                  <svg
                    className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                      active
                        ? "text-amber-400 fill-amber-400 drop-shadow-md"
                        : "text-slate-200 fill-slate-100"
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              );
            })}
          </div>

          {rating && (
            <p className="text-base font-bold text-slate-800 animate-fade-in">
              {t.ratings[rating]}
            </p>
          )}

          {/* ══════════ HIGH SATISFACTION (4 or 5 STARS) ══════════ */}
          {rating && rating >= 4 && (
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-6 text-left animate-fade-in-up">
              <div className="text-center">
                <span className="text-3xl">🎉</span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  {t.positiveTitle}
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  {t.positiveBody}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {/* Google Maps Review Link */}
                <a
                  href={DOCTOR_INFO.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50/50 shadow-sm hover:shadow-md transition font-bold text-xs text-slate-800"
                >
                  <IconGoogle className="w-5 h-5 flex-shrink-0" />
                  <span>{t.googleBtn}</span>
                </a>

                {/* Yandex Maps Review Link */}
                <a
                  href={DOCTOR_INFO.yandexMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white border-2 border-red-200 hover:border-red-500 hover:bg-red-50/50 shadow-sm hover:shadow-md transition font-bold text-xs text-slate-800"
                >
                  <IconYandex className="w-5 h-5 flex-shrink-0" />
                  <span>{t.yandexBtn}</span>
                </a>
              </div>

              {/* Personal Telegram Note */}
              <div className="text-center">
                <a
                  href={DOCTOR_INFO.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 hover:text-sky-700 underline underline-offset-4"
                >
                  <IconTelegram className="w-4 h-4 text-sky-500" />
                  <span>{t.telegramBtn}</span>
                </a>
              </div>

              {/* AI & Local SEO Keyword Tip */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed max-w-lg mx-auto">
                {t.reviewTip}
              </div>
            </div>
          )}

          {/* ══════════ PRIVATE CARE RESOLUTION (1, 2 or 3 STARS) ══════════ */}
          {rating && rating <= 3 && (
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4 max-w-md mx-auto text-left animate-fade-in-up">
              <div className="text-center">
                <span className="text-3xl">🩺</span>
                <h2 className="text-lg font-black text-slate-900 mt-2">
                  {t.negativeTitle}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {t.negativeBody}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={DOCTOR_INFO.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition"
                >
                  <IconTelegram className="w-4 h-4 text-white" />
                  <span>{t.directTgBtn}</span>
                </a>

                <a
                  href={`tel:${DOCTOR_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                >
                  <IconPhone className="w-4 h-4 text-white" />
                  <span>{t.directCallBtn}</span>
                </a>
              </div>
            </div>
          )}

          {rating && (
            <button
              type="button"
              onClick={() => setRating(null)}
              className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline"
            >
              {t.changeRating}
            </button>
          )}
        </div>

        {/* ── Printable Clinic Stand Preview ─────────────────── */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
            <div className="text-left">
              <h3 className="text-base font-bold text-slate-900">
                {t.printStandTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.printStandDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#930b0b] hover:bg-[#7a0909] text-white text-xs font-bold shadow-md transition cursor-pointer flex-shrink-0"
            >
              {t.printBtn}
            </button>
          </div>

          {/* Stand Mockup (Printable Area) */}
          <div className="print-area max-w-sm mx-auto p-6 rounded-3xl border-2 border-dashed border-red-200 bg-gradient-to-b from-red-50/40 to-white text-center shadow-inner">
            <img
              src="/logo.png"
              alt="Dr. Munojat Akbarova"
              className="w-16 h-16 rounded-2xl mx-auto shadow-md mb-2 object-cover border-2 border-white"
            />
            <h4 className="text-base font-black text-slate-900">
              Dr. Munojat Akbarova
            </h4>
            <p className="text-[11px] font-semibold text-[#930b0b] mb-4">
              Ayol Stomatolog · Orzu Stoma Denta
            </p>

            {qrUrl ? (
              <div className="p-3 bg-white rounded-2xl shadow-md inline-block border border-slate-100 mb-3">
                <img
                  src={qrUrl}
                  alt="QR Code"
                  className="w-44 h-44 mx-auto"
                />
              </div>
            ) : (
              <div className="w-44 h-44 bg-slate-100 animate-pulse rounded-2xl mx-auto mb-3" />
            )}

            <p className="text-xs font-black text-slate-900 uppercase tracking-wide">
              {t.scanTitle}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t.scanSub}
            </p>
            <p className="text-[9px] font-mono text-slate-400 mt-2">
              drmunojat.uz/baho
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
