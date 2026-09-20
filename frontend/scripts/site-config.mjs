/**
 * Single source of truth for the site's indexable routes.
 *
 * Both the sitemap generator and the prerenderer read this, so the set of URLs
 * declared to search engines and the set actually built as static HTML cannot
 * drift apart.
 *
 * `image.src` is a path into src/assets. Vite content-hashes those filenames at
 * build time, so the generator resolves each one through the build manifest
 * rather than guessing - the previous hand-written sitemap pointed at
 * "/assets/treatment_implant.jpg" and every one of those URLs 404'd.
 */

export const SITE_ORIGIN = "https://drmunojat.uz";

/* Bumped deliberately, not auto-set to the build date: stamping "changed today"
   on every page at every deploy is a signal search engines learn to discount. */
const LASTMOD = "2026-09-08";

/* Language lives in localStorage, not in the URL, so every language shares one
   address. hreflang annotations that all resolve to the same URL are invalid and
   ignored by search engines, so none are emitted. Flip this to true once the
   site actually serves per-language URLs. */
const TRILINGUAL = false;

export const ROUTES = [
  {
    path: "/",
    lastmod: LASTMOD,
    changefreq: "weekly",
    priority: "1.00",
    hreflang: TRILINGUAL,
    xDefault: true,
    image: {
      src: "public/logo.png",
      title: "Dr. Munojat Akbarova - Andijondagi Yetakchi Ayol Stomatolog",
      caption: "Dr. Munojat Akbarova - Ayollar uchun stomatologiya Andijon, Orzu Stoma Denta",
    },
  },
  {
    path: "/services",
    lastmod: LASTMOD,
    changefreq: "weekly",
    priority: "0.95",
    hreflang: TRILINGUAL,
  },
  {
    path: "/services/implantatsiya",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.90",
    hreflang: TRILINGUAL,
    image: {
      src: "src/assets/treatment_implant.webp",
      title: "Tish Implantatsiyasi Andijon - Dr. Munojat Akbarova | Titan Implant",
      caption: "Titan implantlar bilan yo'qotilgan tishlarni uzoq yillar davomida tiklash - Dr. Munojat Akbarova, Andijon",
    },
  },
  {
    path: "/services/tish-davolash",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.90",
    hreflang: TRILINGUAL,
    image: {
      src: "src/assets/clinic_room.webp",
      title: "Tish Davolash Andijon - Dr. Munojat Akbarova | 4 Davlat Plombalari 100% Og'riqsiz",
      caption: "Germaniya, Yaponiya, Koreya va Rossiya plombalari bilan 100% og'riqsiz davolash - Dr. Munojat Akbarova, Andijon",
    },
  },
  {
    path: "/services/ortopediya",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.90",
    hreflang: TRILINGUAL,
    image: {
      src: "src/assets/hero_smile.webp",
      title: "Old va Orqa Tish Karonkalari Andijon - Dr. Munojat Akbarova | Xitoy, Germaniya, Avstraliya",
      caption: "Xitoy, Germaniya va Avstraliya tsirkoniy hamda keramik karonkalari - Dr. Munojat Akbarova, Andijon",
    },
  },
  {
    path: "/services/xirurgiya",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.90",
    hreflang: TRILINGUAL,
    image: {
      src: "src/assets/treatment_surgery.webp",
      title: "Og'riqsiz Tish Xirurgiyasi Andijon - Dr. Munojat Akbarova | Aql Tishi",
      caption: "Og'riqsiz mikroxirurgik tish olish - Dr. Munojat Akbarova, Andijon",
    },
  },
  {
    path: "/services/tish-oqartirish",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.90",
    hreflang: TRILINGUAL,
    image: {
      src: "src/assets/treatment_whitening.webp",
      title: "ZOOM 4 Tish Oqartirish Andijon - Dr. Munojat Akbarova | Tabiiy Yorqin Oqlik",
      caption: "Philips ZOOM 4 bilan tishlarni tabiiy va xavfsiz yorqin oqartirish - Dr. Munojat Akbarova, Andijon",
    },
  },
  {
    path: "/about",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.85",
    hreflang: TRILINGUAL,
    image: {
      src: "public/logo.png",
      title: "Dr. Munojat Akbarova haqida - Andijondagi yetakchi ayol stomatolog",
    },
  },
  {
    path: "/gallery",
    lastmod: LASTMOD,
    changefreq: "weekly",
    priority: "0.80",
    /* Must be an image the page actually shows; patient_nodira was declared
       here but never rendered anywhere. */
    image: {
      src: "src/assets/treatment_whitening.webp",
      title: "Tish davolash natijalari - Dr. Munojat Akbarova Andijon",
    },
  },
  {
    path: "/contact",
    lastmod: LASTMOD,
    changefreq: "monthly",
    priority: "0.85",
    hreflang: TRILINGUAL,
  },
];
