import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
/* Pages are imported eagerly on purpose. React.lazy was tried here and broke
   prerendering: renderToString cannot suspend, so every route emitted its
   Suspense fallback and the static HTML lost its content (10,219 -> 1,341
   chars on the home page). Splitting these needs streaming SSR
   (renderToPipeableStream), not a preload before renderToString. */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import StickersShowcase from "./pages/StickersShowcase";
import NotFound from "./pages/NotFound";
import FloatingActionHub from "./components/FloatingActionHub";
import QuickBookingModal from "./components/QuickBookingModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage, LANGS, DEFAULT_LANG } from "./context/LanguageContext";

/* Sync <html lang="..."> with active UI language for SEO and a11y */
/* Enforce authentic logo favicon in tab dynamically to bypass browser caching */
const FaviconEnforcer = () => {
  useEffect(() => {
    const existing = document.querySelector("link[rel*='icon']");
    if (existing) {
      existing.href = `/favicon-32x32.png?v=${Date.now()}`;
    }
  }, []);
  return null;
};

/* Scroll to the top on route change only. This used to live in <Seo>, where it
   re-fired on every render and yanked the page up while users typed. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    /* "instant", not "auto": index.css sets html { scroll-behavior: smooth },
       and "auto" defers to it, which animates the jump across the whole page. */
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const LangSync = () => {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
};

const App = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff8f8] text-slate-900">
      <LangSync />
      <ScrollToTop />
      <FaviconEnforcer />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        theme="dark"
        toastStyle={{ background: "#1a0505", borderLeft: "4px solid #fd1616" }}
      />

      <Nav onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-grow w-full">
        <Routes>
          {/* Every page exists at three addresses: unprefixed Uzbek, /ru and
              /en. Defining them once per language keeps the three in step. */}
          {LANGS.flatMap((code) => {
            const at = (path) =>
              code === DEFAULT_LANG ? path : `/${code}${path === "/" ? "" : path}`;
            return [
              <Route key={`${code}-home`} path={at("/")} element={<Home onOpenBooking={() => setIsBookingOpen(true)} />} />,
              <Route key={`${code}-about`} path={at("/about")} element={<About onOpenBooking={() => setIsBookingOpen(true)} />} />,
              <Route key={`${code}-services`} path={at("/services")} element={<Services onOpenBooking={() => setIsBookingOpen(true)} />} />,
              <Route key={`${code}-detail`} path={at("/services/:slug")} element={<ServiceDetail />} />,
              <Route key={`${code}-gallery`} path={at("/gallery")} element={<Gallery />} />,
              <Route key={`${code}-contact`} path={at("/contact")} element={<Contact />} />,
            ];
          })}
          <Route path="/stickers-preview" element={<StickersShowcase />} />
          {/* Catch-all. Without this, unknown URLs rendered an empty <main>
              carrying the homepage's title and canonical - a soft 404. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Modern Floating Action Hub */}
      <FloatingActionHub onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Global 1-Click Quick Booking Modal */}
      <QuickBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;
