export const digitsOnly = (value = "") => String(value || "").replace(/\D/g, "");

export const DMY_PLACEHOLDER = {
  uz: "KK.OO.YYYY",
  ru: "ДД.ММ.ГГГГ",
  en: "DD.MM.YYYY",
};

export const formatDmyInput = (value = "", prevValue = "") => {
  let raw = String(value || "");
  if (!raw.trim()) return "";

  // Support user typing a dot after 1 or 2 digits
  // e.g. "5." -> "05."
  if (/^\d\./.test(raw)) {
    raw = "0" + raw;
  }
  // e.g. "05.4." -> "05.04."
  if (/^(\d{2}\.)(\d)\./.test(raw)) {
    raw = raw.replace(/^(\d{2}\.)(\d)\./, "$10$2.");
  }

  let digits = digitsOnly(raw).slice(0, 8);
  const prevDigits = digitsOnly(prevValue);

  // If user pressed Backspace right after a dot (e.g. from "12." to "12"),
  // remove the last digit so Backspace doesn't get stuck on the dot.
  if (
    prevValue &&
    prevValue.endsWith(".") &&
    !raw.endsWith(".") &&
    digits.length === prevDigits.length &&
    digits.length > 0
  ) {
    digits = digits.slice(0, -1);
  }

  if (!digits) return "";

  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  let formatted = day;
  if (day.length === 2) {
    formatted += ".";
    if (month) {
      formatted += month;
      if (month.length === 2) {
        formatted += ".";
        if (year) {
          formatted += year;
        }
      }
    }
  }

  return formatted;
};

export const dmyToYmd = (dmy = "") => {
  const str = String(dmy || "").trim();
  if (!str) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  const match = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return "";

  const day = match[1].padStart(2, "0");
  const month = match[2].padStart(2, "0");
  const year = match[3];

  return `${year}-${month}-${day}`;
};

export const ymdToDmy = (ymd = "") => {
  const str = String(ymd || "").trim();
  if (!str) return "";

  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";

  return `${match[3]}.${match[2]}.${match[1]}`;
};

export const isValidDmy = (dmy = "") => {
  const str = String(dmy || "").trim();
  if (!str) return true; // Optional field is valid when empty

  const match = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const currentYear = new Date().getFullYear();
  if (year < 1910 || year > currentYear) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) return false;

  const dateObj = new Date(year, month - 1, day);
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  if (dateObj > now) return false;

  return true;
};

export const getDmyValidationError = (dmy = "", lang = "uz") => {
  const str = String(dmy || "").trim();
  if (!str) return null;

  const digits = digitsOnly(str);
  if (digits.length < 8) {
    if (lang === "ru") return "Введите полную дату: ДД.ММ.ГГГГ";
    if (lang === "en") return "Please enter full date: DD.MM.YYYY";
    return "Tug‘ilgan sanani to‘liq kiriting: KK.OO.YYYY";
  }

  const match = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    if (lang === "ru") return "Неверный формат даты (ДД.ММ.ГГГГ)";
    if (lang === "en") return "Invalid date format (DD.MM.YYYY)";
    return "Sana formati noto‘g‘ri (KK.OO.YYYY)";
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (month < 1 || month > 12) {
    if (lang === "ru") return "Месяц должен быть от 01 до 12";
    if (lang === "en") return "Month must be between 01 and 12";
    return "Oy 01 dan 12 gacha bo‘lishi kerak";
  }

  if (day < 1 || day > 31) {
    if (lang === "ru") return "День должен быть от 01 до 31";
    if (lang === "en") return "Day must be between 01 and 31";
    return "Kun 01 dan 31 gacha bo‘lishi kerak";
  }

  const currentYear = new Date().getFullYear();
  if (year < 1910 || year > currentYear) {
    if (lang === "ru") return `Год должен быть между 1910 и ${currentYear}`;
    if (lang === "en") return `Year must be between 1910 and ${currentYear}`;
    return `Yil 1910 va ${currentYear} oralig‘ida bo‘lishi kerak`;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    if (lang === "ru") return `В этом месяце только ${daysInMonth} дней`;
    if (lang === "en") return `This month has only ${daysInMonth} days`;
    return `Ushbu oyda faqat ${daysInMonth} kun mavjud`;
  }

  const dateObj = new Date(year, month - 1, day);
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  if (dateObj > now) {
    if (lang === "ru") return "Дата рождения не может быть в будущем";
    if (lang === "en") return "Date of birth cannot be in the future";
    return "Tug‘ilgan sana kelajakda bo‘lishi mumkin emas";
  }

  return null;
};

export const handleDmyPaste = (event, setter) => {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData)?.getData("text") || "";
  setter(formatDmyInput(paste));
};
