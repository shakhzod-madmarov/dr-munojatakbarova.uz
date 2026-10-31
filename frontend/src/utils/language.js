export const LANGS = ["uz", "ru", "en"];
export const DEFAULT_LANG = "uz";

/**
 * Language lives in the URL, not in storage.
 *
 * It used to be held in localStorage, which meant all three languages shared a
 * single URL. Search engines can only index one version of one URL, so the
 * Russian and English copy - the whole Russian-speaking side of Google and
 * Yandex, which matters a great deal in Uzbekistan - was never reachable, and
 * hreflang annotations pointing at one address were invalid.
 *
 * Uzbek stays unprefixed so existing links keep working; ru and en are served
 * from /ru and /en.
 */
export const langFromPath = (pathname = "/") => {
  const segment = (pathname || "/").split("/")[1];
  return LANGS.includes(segment) && segment !== DEFAULT_LANG ? segment : DEFAULT_LANG;
};

/** Turn a canonical (Uzbek) path into its equivalent in `lang`. */
export const localizePath = (path = "/", lang = DEFAULT_LANG) => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
};

/** Strip any language prefix, giving the canonical Uzbek path. */
export const stripLangPrefix = (pathname = "/") => {
  const segment = (pathname || "/").split("/")[1];
  if (!LANGS.includes(segment) || segment === DEFAULT_LANG) return pathname || "/";
  const rest = pathname.slice(segment.length + 1);
  return rest === "" ? "/" : rest;
};
