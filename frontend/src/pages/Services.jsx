import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import Seo from "../components/Seo";
import DentalSticker from "../components/DentalSticker";
import { getServicesTag } from "../constants/doctor";
import Interactive3DCostCalculator from "../components/Interactive3DCostCalculator";
import PatientCareGuides from "../components/PatientCareGuides";
import {
  IconPhone,
  IconCheckCircle,
} from "../components/MedicalIcons";

const Services = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const t = {
    uz: {
      tag: getServicesTag("uz"),
      heading: "Dr. Munojat Akbarova Xizmatlari",
      sub: "Andijon shahrida ayollar va qizlar uchun 100% og'riqsiz, maxfiy va Yevropa standartlaridagi estetik stomatologiya.",
      bookBtn: "Qabulga Yozilish: +998 (94) 106-15-55",
      moreBtn: "Batafsil ma'lumot",
    },
    ru: {
      tag: getServicesTag("ru"),
      heading: "Услуги Д-р Мунаджат Акбаровой",
      sub: "Стоматологические услуги европейского качества для женщин и девушек: 100% без боли.",
      bookBtn: "Запись на приём: +998 (94) 106-15-55",
      moreBtn: "Подробнее",
    },
    en: {
      tag: getServicesTag("en"),
      heading: "Dr. Munojat Akbarova Services",
      sub: "Painless, gentle aesthetic dental care tailored specifically for women in Andijan.",
      bookBtn: "Book Appointment: +998 (94) 106-15-55",
      moreBtn: "Learn more",
    },
  }[lang] || {};

  const services = [
    {
      slug: "ortopediya",
      title: { uz: "Old & Orqa Tish Karonkalari", ru: "Коронки для Зубов (Передние & Жевательные)", en: "Dental Crowns (Front & Back)" },
      desc: {
        uz: "Old va orqa tishlar uchun Germaniya, Avstraliya hamda Xitoyning mustahkam tsirkoniy va keramik karonkalari (tojlari). Tabiiy estetik jilo va uzoq yillik xizmat.",
        ru: "Высококачественные циркониевые и керамические коронки из Германии, Австралии и Китая для передних и жевательных зубов на долгие годы.",
        en: "Premium zirconia and ceramic crowns from Germany, Australia, and China for front and posterior teeth with long-lasting durability.",
      },
      image: assets.heroSmile,
      sealText: { uz: "3 DAVLAT", ru: "3 СТРАНЫ", en: "3 NATIONS" },
      sealSub: { uz: "KARONKA", ru: "КОРОНКИ", en: "CROWNS" },
      sealTheme: "gold",
      points: {
        uz: ["Old tishlar: tabiiy estetika", "Orqa tishlar: baquvvat chaynash", "Xitoy, Germaniya, Avstraliya materiallari"],
        ru: ["Передние зубы: естественная эстетика", "Жевательные: прочность при жевании", "Материалы: Китай, Германия, Австралия"],
        en: ["Front teeth: lifelike aesthetics", "Molars: strong chewing power", "Materials: China, Germany, Australia"],
      },
    },
    {
      slug: "implantatsiya",
      title: { uz: "Titan Tish Implantatsiyasi", ru: "Титановая Имплантация", en: "Titanium Dental Implants" },
      desc: {
        uz: "Yo'qotilgan tishlarni titan ildizlar bilan uzoq yillar davomida tiklash. Qo'shni sog'lom tishlar butunlay saqlanadi.",
        ru: "Восстановление зубов титановыми имплантами на долгие годы без обточки соседних зубов.",
        en: "Long-term durable replacement of missing teeth with certified titanium implants.",
      },
      image: assets.treatmentImplant,
      sealText: { uz: "UZOQ YIL", ru: "НА ГОДЫ", en: "LONG-TERM" },
      sealSub: { uz: "TITAN", ru: "ТИТАН", en: "TITANIUM" },
      sealTheme: "emerald",
      points: {
        uz: ["Qo'shni tishlar tegilmaydi", "100% og'riqsiz anesteziya", "Uzoq yillar mustahkamlik"],
        ru: ["Соседние зубы не трогаются", "Полная анестезия", "Надёжность на долгие годы"],
        en: ["Adjacent teeth untouched", "100% painless anesthesia", "Long-term durable osseointegration"],
      },
    },
    {
      slug: "tish-oqartirish",
      title: { uz: "ZOOM 4 Laser Tish Oqartirish", ru: "ZOOM 4 Лазерное Отбеливание", en: "Philips ZOOM 4 Whitening" },
      desc: {
        uz: "Sovuq LED lazer nuri bilan emalga zarar yetkazmagan holda tishlarning o'z holatiga nisbatan xavfsiz oqartirish va yorqin qilish.",
        ru: "Бережное осветление зубов относительно исходного оттенка холодным светом без повреждения эмали.",
        en: "Gentle cold laser LED technology brightening and whitening teeth relative to their natural baseline.",
      },
      image: assets.treatmentWhitening,
      sealText: { uz: "YORQIN", ru: "БЛЕСК", en: "BRIGHT" },
      sealSub: { uz: "TABASSUM", ru: "УЛЫБКА", en: "SMILE" },
      sealTheme: "gold",
      points: {
        uz: ["Tish o'z holatiga nisbatan oqartiriladi", "Emalga 100% xavfsiz", "1.5–2 yil saqlanadi"],
        ru: ["Осветление под свой тон", "Безопасно для эмали", "Стойкость 1.5-2 года"],
        en: ["Brightened to natural tone", "100% safe for enamel", "Lasts 1.5-2 years"],
      },
    },
    {
      slug: "tish-davolash",
      title: { uz: "Tish Davolash & 4 Davlat Plombalari", ru: "Лечение Зубов и Виды Пломб", en: "Tooth Pain Relief & Certified Fillings" },
      desc: {
        uz: "O'tkir tish og'rig'ini zudlik bilan qoldirish, ildiz kanallarini davolash hamda Germaniya (3M™), Yaponiya (Estelite), Koreya (DenFil) va Rossiya plombalari bilan 100% og'riqsiz davolash.",
        ru: "Снятие острой боли, лечение каналов и сертифицированные нано-пломбы из Германии (3M™), Японии (Estelite), Южной Кореи (DenFil) и России абсолютно без боли.",
        en: "Instant tooth pain relief, gentle root canals, and certified photopolymer fillings from Germany (3M™), Japan (Estelite), South Korea, and Russia.",
      },
      image: assets.clinicRoom,
      sealText: { uz: "4 DAVLAT", ru: "4 СТРАНЫ", en: "4 NATIONS" },
      sealSub: { uz: "PLOMBALAR", ru: "ПЛОМБЫ", en: "FILLINGS" },
      sealTheme: "gold",
      points: {
        uz: ["Germaniya, Yaponiya, Koreya, Rossiya plombalari", "Mikro-anesteziya: 100% og'riqsiz", "Tishning tabiiy anatomik shakli"],
        ru: ["Пломбы: Германия, Япония, Корея, Россия", "Бережная анестезия без боли", "Анатомическое восстановление эмали"],
        en: ["Fillings: Germany, Japan, Korea, Russia", "Gentle painless micro-anesthesia", "Restoration of natural tooth anatomy"],
      },
    },
    {
      slug: "xirurgiya",
      title: { uz: "Og'riqsiz Xirurgiya & Aql Tishlari", ru: "Хирургия и Зубы Мудрости", en: "Atraumatic Oral Surgery" },
      desc: {
        uz: "Aql tishlari va murakkab ildizlarni mikroxirurgik nozik usulda, og'riqsiz va shishsiz xavfsiz olish.",
        ru: "Бережное удаление зубов любой сложности без боли и без послеоперационных отёков.",
        en: "Gentle atraumatic tooth and wisdom extraction with zero pain and rapid healing.",
      },
      image: assets.treatmentSurgery,
      sealText: { uz: "0 SHISH", ru: "0 ОТЕКОВ", en: "0 SWELLING" },
      sealSub: { uz: "PIEZO", ru: "ПЬЕЗО", en: "PIEZO" },
      sealTheme: "emerald",
      points: {
        uz: ["Milk to'qimasi saqlanadi", "Muolaja paytida 0 sezgi", "Shishsiz tez bitish"],
        ru: ["Без травмы десны", "Полное отсутствие боли", "Быстрое заживление"],
        en: ["Bone & tissue preserved", "Zero pain during procedure", "Rapid healing"],
      },
    },
  ];

  return (
    <div className="pt-20 sm:pt-24 bg-[#faf8f8]">
      <Seo
        title="Dr. Munojat Akbarova Xizmatlari — Plomba, Davolash, Karonkalar, Implant | Andijon"
        description="Dr. Munojat Akbarova xizmatlari: tish og'rig'ini zudlik bilan qoldirish, 4 davlat plombalari, old va orqa tish karonkalari (Xitoy, Germaniya, Avstraliya), implantatsiya va ko'rik. Tel: +998 94 106-15-55"
        canonical="https://dr-munojatakbarova.uz/services"
      />

      {/* Hero Header */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10 bg-white border-b border-slate-200/60 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-black text-[#930b0b] uppercase tracking-widest bg-red-50 border border-red-200/80 px-4 py-1.5 rounded-full inline-block mb-3">
            {t.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3">
            {t.heading}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
            {t.sub}
          </p>
          <a
            href="tel:+998941061555"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#930b0b] to-[#fd1616] text-white font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 transition-all"
          >
            <IconPhone className="w-4 h-4 text-white" />
            <span>{t.bookBtn}</span>
          </a>
        </div>
      </section>

      {/* 5 Services Clinical Grid */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
              >
                <article itemScope itemType="https://schema.org/MedicalProcedure" className="flex flex-col h-full justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={s.image}
                        alt={`${s.title[lang]} — Dr. Munojat Akbarova Andijon`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        loading="lazy"
                        decoding="async"
                        itemProp="image"
                      />

                      {/* Left: Creative Die-Cut Dental Sticker */}
                      <div className="absolute top-3 left-3 z-10 pointer-events-none">
                        <DentalSticker type={s.slug} lang={lang} />
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h2 itemProp="name" className="font-black text-lg text-slate-900 group-hover:text-[#930b0b] transition-colors leading-snug">
                        {s.title[lang]}
                      </h2>
                      
                      <p itemProp="description" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {s.desc[lang]}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {s.points[lang].map((p, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <IconCheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                    <span>{t.moreBtn}</span>
                    <span>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Bottom Row: 2 Centered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.slice(3, 5).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
              >
                <article itemScope itemType="https://schema.org/MedicalProcedure" className="flex flex-col h-full justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={s.image}
                        alt={`${s.title[lang]} — Dr. Munojat Akbarova Andijon`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        loading="lazy"
                        decoding="async"
                        itemProp="image"
                      />

                      {/* Left: Creative Die-Cut Dental Sticker */}
                      <div className="absolute top-3 left-3 z-10 pointer-events-none">
                        <DentalSticker type={s.slug} lang={lang} />
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h2 itemProp="name" className="font-black text-lg text-slate-900 group-hover:text-[#930b0b] transition-colors leading-snug">
                        {s.title[lang]}
                      </h2>
                      
                      <p itemProp="description" className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {s.desc[lang]}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {s.points[lang].map((p, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <IconCheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 text-xs font-bold text-[#930b0b] flex items-center gap-1">
                    <span>{t.moreBtn}</span>
                    <span>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Treatment Calculator */}
      <Interactive3DCostCalculator />

      {/* Clinical Recovery & Aftercare Guides */}
      <PatientCareGuides />
    </div>
  );
};

export default Services;
