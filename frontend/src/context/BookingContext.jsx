import { createContext, useContext, useMemo, useState } from "react";
import QuickBookingModal from "../components/QuickBookingModal";

/**
 * One booking modal for the whole site.
 *
 * Several places used to collect a name and a phone number and then open
 * Telegram with the details typed into a message - a booking nobody's calendar
 * ever saw. They all open this instead, so every route to "book an appointment"
 * ends in the same place: a real free time in the dentist's MedInson calendar.
 *
 * It lives in a context because the forms that need it (a service page, the
 * cost calculator, the smile wizard, the contact page) sit at different depths,
 * and threading a callback through all of them would be its own small mess.
 */

const BookingContext = createContext({ openBooking: () => {} });

export const BookingProvider = ({ children }) => {
  const [request, setRequest] = useState(null);

  const value = useMemo(
    () => ({
      /**
       * openBooking("implantatsiya") or openBooking({ service, name, phone, note }).
       * Anything else - a click event, say - opens an empty form.
       */
      openBooking: (details) => {
        if (typeof details === "string") {
          setRequest({ service: details, name: "", phone: "", note: "" });
          return;
        }
        const safe = details && typeof details === "object" && !details.nativeEvent ? details : {};
        setRequest({
          service: safe.service || null,
          name: safe.name || "",
          phone: safe.phone || "",
          note: safe.note || "",
        });
      },
    }),
    [],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <QuickBookingModal
        isOpen={Boolean(request)}
        initialService={request?.service || null}
        initialName={request?.name || ""}
        initialPhone={request?.phone || ""}
        initialNote={request?.note || ""}
        onClose={() => setRequest(null)}
      />
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
