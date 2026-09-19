import { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const DEFAULT_LANG = "uz";
const STORAGE_KEY = "dr_munojat_language";

/* localStorage is unavailable while prerendering under Node, and throws outright
   in a browser with site data blocked. Never let either take the app down. */
const readStoredLang = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
};

const writeStoredLang = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Preference simply will not persist; the app still works. */
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(readStoredLang);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    writeStoredLang(newLang);
  };

  useEffect(() => {
    const handleStorage = () => {
      const current = readStoredLang();
      if (current !== lang) setLang(current);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: readStoredLang(),
      changeLanguage: (l) => {
        writeStoredLang(l);
        window.location.reload();
      },
    };
  }
  return ctx;
};
