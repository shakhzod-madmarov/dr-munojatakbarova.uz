import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IconSparkleStar, IconShieldCheck, IconCheckCircle, IconPhone } from "./MedicalIcons";

const questions = [
  {
    step: 1,
    title: {
      uz: "1-Qadam: Tishingizda qanday asosiy muammo bor?",
      ru: "Шаг 1: Какая основная жалоба на зубы?",
      en: "Step 1: What is your primary dental concern?",
    },
    options: [
      { id: "yellow", uz: "Tishlar sarg'aygan, yorqinlik yetishmaydi", ru: "Пожелтение, нехватка белизны", en: "Yellowing, lacks brightness" },
      { id: "missing", uz: "Bitta yoki bir nechta tish yo'qotilgan", ru: "Отсутствует один или несколько зубов", en: "Missing one or more teeth" },
      { id: "pain", uz: "Tishda o'tkir og'riq yoki karies bor", ru: "Острая боль или кариес", en: "Acute toothache or cavity" },
      { id: "crooked", uz: "Old tishlar sinishi yoki notekisligi", ru: "Сколы или неровности передних зубов", en: "Chipped or uneven front teeth" },
    ],
  },
  {
    step: 2,
    title: {
      uz: "2-Qadam: Davolanishdan asosiy maqsadingiz nima?",
      ru: "Шаг 2: Какова главная цель лечения?",
      en: "Step 2: What is your primary treatment goal?",
    },
    options: [
      { id: "painless", uz: "100% Og'riqsiz va muloyim muolaja", ru: "100% Безболезненный бережный приём", en: "100% Painless and gentle care" },
      { id: "hollywood", uz: "Gollivud tabassumi (ideal estetika)", ru: "Голливудская улыбка (идеальная эстетика)", en: "Hollywood smile (ideal aesthetics)" },
      { id: "permanent", uz: "Uzoq yillar davomida mustahkam chaynash quvvati", ru: "Надёжная прочность на долгие годы", en: "Long-term durable chewing strength" },
      { id: "fast", uz: "1 seansda tezkor natija olish", ru: "Быстрый результат за 1 визит", en: "Fast results in 1 visit" },
    ],
  },
];

const plans = {
  yellow: {
    title: { uz: "ZOOM 4 Laser Tish Oqartirish", ru: "Лазерное Отбеливание ZOOM 4", en: "ZOOM 4 Laser Teeth Whitening" },
    duration: { uz: "Atigi 45 daqiqa (1 seans)", ru: "Всего 45 минут (1 визит)", en: "Just 45 mins (1 session)" },
    desc: {
      uz: "Emalga zarar yetkazmagan holda tishlarni o'z holatiga nisbatan xavfsiz oqartirish va yorqin qilish tizimi.",
      ru: "Безопасный способ осветлить зубы относительно исходного тона без повреждения эмали.",
      en: "The safest system to brighten teeth relative to their baseline tone without enamel wear.",
    },
  },
  missing: {
    title: { uz: "Titan Tish Implantation & Tsirkoniy", ru: "Имплантация и Циркониевая Коронка", en: "Titanium Implant & Zirconia Crown" },
    duration: { uz: "20 daqiqa (100% og'riqsiz operatsiya)", ru: "20 минут (без боли)", en: "20 mins (100% painless)" },
    desc: {
      uz: "Qo'shni sog'lom tishlarni charxlamasdan, yo'qotilgan tish o'rniga titan ildiz va tabiiy tsirkoniy toj o'rnatish.",
      ru: "Восстановление зуба титановым корнем на долгие годы без обточки соседних здоровых зубов.",
      en: "Long-term restoration of missing tooth with titanium root and custom natural zirconia crown.",
    },
  },
  pain: {
    title: { uz: "Karies & Pulpit Terapevtik Davolash", ru: "Лечение Кариеса и Пульпита", en: "Cavity & Root Canal Therapy" },
    duration: { uz: "30-50 daqiqa (Birinchi tashrifdayoq og'riq yo'qoladi)", ru: "30-50 минут", en: "30-50 mins" },
    desc: {
      uz: "Mikroanesteziya ostida tish og'rig'ini darhol to'xtatish va Germaniya fotopolimeri bilan tishni butunlay saqlab qolish.",
      ru: "Мгновенное снятие боли под мягкой анестезией и пломбирование нанокомпозитами из Германии.",
      en: "Instant pain relief under gentle anesthesia and invisible tooth preservation with German resins.",
    },
  },
  crooked: {
    title: { uz: "Old & Orqa Tish Karonkalari", ru: "Коронки на передние и жевательные зубы", en: "Dental Crowns (Front & Back)" },
    duration: { uz: "2-3 kun (2 seans)", ru: "2-3 дня (2 визита)", en: "2-3 days (2 visits)" },
    desc: {
      uz: "Old va orqa tishlarning yemirilishi, notekisligi va rangini Germaniya, Avstraliya va Xitoy karonkalari bilan uzoq yillarga mukammal tiklash.",
      ru: "Восстановление эстетики и жевательной функции коронками из Германии, Австралии и Китая на долгие годы.",
      en: "Flawless front and posterior restoration with crowns from Germany, Australia, and China for lasting years.",
    },
  },
};

const SmileAssessmentWizard = () => {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState("yellow");
  const [goal, setGoal] = useState("painless");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const currentPlan = plans[concern] || plans.yellow;

  const handleBooking = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    const msg = encodeURIComponent(
      `📋 TABASSUM TASHXIS TESTI (drmunojat.uz):\n` +
      `👤 Bemor: ${name}\n` +
      `📞 Tel: ${phone}\n` +
      `🎯 Muammo: ${concern}\n` +
      `⭐ Tavsiya: ${currentPlan.title[lang]}\n` +
      `📍 Manzil: Andijon`
    );
    window.open(`https://t.me/dr_munojat?text=${msg}`, "_blank", "noopener,noreferrer");
    setName("");
    setPhone("");
  };

  return (
    <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-white border-t border-slate-100" id="smile-wizard">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-black text-[#930b0b] uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-100/70 border border-red-200">
            <IconSparkleStar className="w-4 h-4 text-[#930b0b]" />
            <span>{lang === "uz" ? "INTERAKTIV TASHXIS TESTI" : lang === "ru" ? "ОНЛАЙН ТЕСТ УЛЫБКИ" : "SMILE ASSESSMENT"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mt-3 mb-4">
            {lang === "uz" ? "Sizga Qaysi Muolaja Eng Mos Keladi?" : lang === "ru" ? "Какая процедура подходит именно вам?" : "Which Treatment Is Best For You?"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {lang === "uz" ? "30 soniyada 2 ta savolga javob bering va o'zingizga mos davolash rejasini bilib oling." :
             lang === "ru" ? "Ответьте на 2 простых вопроса за 30 секунд и получите индивидуальный план лечения." :
             "Answer 2 quick questions in 30 seconds to get your personalized treatment blueprint."}
          </p>
        </div>

        {/* Wizard Container Card */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? "bg-[#fd1616] text-white" : "bg-slate-200 text-slate-500"}`}>1</span>
              <span className="text-xs font-bold text-slate-700">{lang === "uz" ? "Muammo" : "Проблема"}</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? "bg-[#fd1616] text-white" : "bg-slate-200 text-slate-500"}`}>2</span>
              <span className="text-xs font-bold text-slate-700">{lang === "uz" ? "Maqsad" : "Цель"}</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 3 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>3</span>
              <span className="text-xs font-bold text-slate-700">{lang === "uz" ? "Natija" : "План"}</span>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{questions[0].title[lang]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {questions[0].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setConcern(opt.id); setStep(2); }}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#fd1616] text-left transition-all shadow-xs hover:shadow-md cursor-pointer group"
                  >
                    <p className="font-bold text-sm text-slate-900 group-hover:text-[#930b0b] transition-colors">{opt[lang]}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{questions[1].title[lang]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {questions[1].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setGoal(opt.id); setStep(3); }}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#fd1616] text-left transition-all shadow-xs hover:shadow-md cursor-pointer group"
                  >
                    <p className="font-bold text-sm text-slate-900 group-hover:text-[#930b0b] transition-colors">{opt[lang]}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 pt-2 block cursor-pointer"
              >
                ← {lang === "uz" ? "Oldingi savolga qaytish" : "Назад"}
              </button>
            </div>
          )}

          {/* STEP 3: RESULT & TELEGRAM BOOKING */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <IconCheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
                    {lang === "uz" ? "Sizga Tavsiya Etilgan Muolaja" : "Рекомендуемый план"}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">{currentPlan.title[lang]}</h4>
                <p className="text-xs font-bold text-slate-500 mb-3">⏱️ {currentPlan.duration[lang]}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{currentPlan.desc[lang]}</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === "uz" ? "Ushbu muolaja bo'yicha bepul maslahatga yozilish:" : "Записаться на консультацию по этому плану:"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label htmlFor="wizard-name" className="sr-only">
                    {lang === "uz" ? "Ismingiz" : lang === "ru" ? "Ваше имя" : "Your name"}
                  </label>
                  <input
                    id="wizard-name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    placeholder={lang === "uz" ? "Ismingiz (masalan: Dildora)" : "Ваше имя"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#fd1616]"
                  />
                  <label htmlFor="wizard-phone" className="sr-only">
                    {lang === "uz" ? "Telefon raqamingiz" : lang === "ru" ? "Номер телефона" : "Phone number"}
                  </label>
                  <input
                    id="wizard-phone"
                    name="tel"
                    autoComplete="tel"
                    type="tel"
                    placeholder={lang === "uz" ? "Telefoningiz (+998 90 ...)" : "Номер телефона"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#fd1616]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full min-h-[48px] bg-gradient-to-r from-[#930b0b] to-[#fd1616] hover:brightness-110 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>✈️ Telegram orqali qabulga yozilish</span>
                </button>
              </form>

              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 block text-center w-full cursor-pointer"
              >
                🔄 {lang === "uz" ? "Testni qaytadan boshlash" : "Пройти тест заново"}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default SmileAssessmentWizard;
