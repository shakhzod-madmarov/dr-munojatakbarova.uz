import { DOCTOR_INFO } from "./doctor";

/**
 * Translated accessible names for the controls that repeat across the site.
 *
 * These were hardcoded Uzbek everywhere, so a visitor who switched the site to
 * Russian or English got `<html lang="ru">` with Uzbek announced by their screen
 * reader - the wrong language, read with the wrong pronunciation rules.
 *
 * Visible copy stays where it is; this covers names only assistive tech hears.
 */
const LABELS = {
  uz: {
    close: "Yopish",
    openMenu: "Asosiy menyuni ochish",
    closeMenu: "Menyuni yopish",
    mainNav: "Asosiy navigatsiya",
    mobileNav: "Mobil navigatsiya",
    home: "Dr. Munojat Akbarova — bosh sahifa",
    call: `Qo'ng'iroq qilish: ${DOCTOR_INFO.phone}`,
    telegram: `Telegram orqali yozish: ${DOCTOR_INFO.telegramHandle}`,
    instagram: "Instagram sahifasiga o'tish",
    yandexMap: "Yandex Xaritada ko'rish",
    googleMap: "Google Xaritada ko'rish",
    yandexReview: "Yandex Xaritada baho berish",
    googleReview: "Google Xaritalarda baho berish",
    openBooking: "Qabulga yozilish oynasini ochish",
    quickActions: "Tezkor aloqa va yozilish tugmalari",
    compareResults: "Natijalar taqqoslashi",
    treatmentPlan: "Klinik muolaja rejasi",
    aboutDoctor: "Bosh shifokor haqida",
    unmute: "Ovozni yoqish",
    mute: "Ovozni o'chirish",
  },
  ru: {
    close: "Закрыть",
    openMenu: "Открыть главное меню",
    closeMenu: "Закрыть меню",
    mainNav: "Главная навигация",
    mobileNav: "Мобильная навигация",
    home: "Д-р Мунаджат Акбарова — главная",
    call: `Позвонить: ${DOCTOR_INFO.phone}`,
    telegram: `Написать в Telegram: ${DOCTOR_INFO.telegramHandle}`,
    instagram: "Перейти в Instagram",
    yandexMap: "Открыть в Яндекс Картах",
    googleMap: "Открыть в Google Картах",
    yandexReview: "Оставить отзыв в Яндекс Картах",
    googleReview: "Оставить отзыв в Google Картах",
    openBooking: "Открыть форму записи на приём",
    quickActions: "Кнопки быстрой связи и записи",
    compareResults: "Сравнение результатов",
    treatmentPlan: "План лечения",
    aboutDoctor: "О враче",
    unmute: "Включить звук",
    mute: "Выключить звук",
  },
  en: {
    close: "Close",
    openMenu: "Open main menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    home: "Dr. Munojat Akbarova — home",
    call: `Call: ${DOCTOR_INFO.phone}`,
    telegram: `Message on Telegram: ${DOCTOR_INFO.telegramHandle}`,
    instagram: "Open Instagram profile",
    yandexMap: "Open in Yandex Maps",
    googleMap: "Open in Google Maps",
    yandexReview: "Leave a review on Yandex Maps",
    googleReview: "Leave a review on Google Maps",
    openBooking: "Open the appointment booking form",
    quickActions: "Quick contact and booking buttons",
    compareResults: "Before and after comparison",
    treatmentPlan: "Treatment plan",
    aboutDoctor: "About the doctor",
    unmute: "Turn sound on",
    mute: "Turn sound off",
  },
};

export const getA11yLabels = (lang) => LABELS[lang] || LABELS.uz;
