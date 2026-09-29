export const PHONE_PLACEHOLDER = "+998 (__) ___-__-__";
export const UZ_PHONE_PATTERN = /^\+998\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;

export const digitsOnly = (value = "") => String(value || "").replace(/\D/g, "");

export const extractUzLocalPhoneDigits = (value = "") => {
  let digits = digitsOnly(value);

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "");
  }

  return digits.slice(0, 9);
};

export const formatUzPhone = (value = "", prevValue = "") => {
  const raw = String(value || "");
  if (!raw.trim()) return "";

  let local = extractUzLocalPhoneDigits(raw);

  // If user pressed Backspace right after the closing parenthesis "+998 (XX)",
  // remove the second operator digit so Backspace never gets stuck on ")".
  if (
    prevValue &&
    prevValue.endsWith(")") &&
    !raw.endsWith(")") &&
    local.length === 2 &&
    extractUzLocalPhoneDigits(prevValue) === local
  ) {
    local = local.slice(0, 1);
  }

  if (!local) {
    return "";
  }

  const a = local.slice(0, 2);
  const b = local.slice(2, 5);
  const c = local.slice(5, 7);
  const d = local.slice(7, 9);

  let formatted = "+998";
  if (a) {
    formatted += ` (${a}`;
    if (a.length === 2) formatted += ")";
  }
  if (b) formatted += ` ${b}`;
  if (c) formatted += `-${c}`;
  if (d) formatted += `-${d}`;
  return formatted;
};

export const normalizeUzPhone = (value = "") => {
  const local = extractUzLocalPhoneDigits(value);
  return local.length === 9 ? `+998${local}` : null;
};

export const isUzPhoneComplete = (value = "") =>
  UZ_PHONE_PATTERN.test(String(value || "").trim()) ||
  extractUzLocalPhoneDigits(value).length === 9;

export const handleUzPhonePaste = (event, setter) => {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData("text");
  setter(formatUzPhone(paste));
};
