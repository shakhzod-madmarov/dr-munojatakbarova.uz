import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalizedPath } from "./LanguageContext";

/**
 * Direct inline appointment booking across the site (never a popup modal).
 *
 * When a user clicks any "Qabulga yozilish" button:
 * - If the current page already contains the inline date & time selector
 *   (`#uchrashuv-vaqti`), it pre-selects the requested service/note and
 *   smoothly scrolls down to `#uchrashuv-vaqti`.
 * - Otherwise, it navigates directly to the dedicated `/qabul` inline
 *   booking page with the service pre-selected.
 */

const BookingContext = createContext({ openBooking: () => {} });

export const BookingProvider = ({ children }) => {
  const navigate = useNavigate();
  const lp = useLocalizedPath();

  const openBooking = useCallback(
    (details) => {
      let payload = { service: null, name: "", phone: "", note: "" };
      if (typeof details === "string") {
        payload.service = details;
      } else if (details && typeof details === "object" && !details.nativeEvent) {
        payload = {
          service: details.service || null,
          name: details.name || "",
          phone: details.phone || "",
          note: details.note || "",
        };
      }

      if (typeof window !== "undefined" && typeof document !== "undefined") {
        const inlineEl = document.getElementById("uchrashuv-vaqti");
        if (inlineEl) {
          window.dispatchEvent(
            new CustomEvent("medinson-prefill-booking", { detail: payload }),
          );
          inlineEl.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      const params = new URLSearchParams();
      if (payload.service) params.set("service", payload.service);
      if (payload.note) params.set("note", payload.note);
      const qs = params.toString();
      const targetPath = lp("/qabul") + (qs ? `?${qs}` : "");
      navigate(targetPath);

      if (typeof window !== "undefined") {
        setTimeout(() => {
          const el = document.getElementById("uchrashuv-vaqti");
          if (el) {
            window.dispatchEvent(
              new CustomEvent("medinson-prefill-booking", { detail: payload }),
            );
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
      }
    },
    [navigate, lp],
  );

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
