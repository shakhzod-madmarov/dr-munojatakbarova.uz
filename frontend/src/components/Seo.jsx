import { useEffect, useContext } from "react";
import { useLanguage, LANGS, DEFAULT_LANG, localizePath } from "../context/LanguageContext";
import { getPageSeo, PAGE_KEYWORDS } from "../constants/seo";

export const SITE_ORIGIN = "https://drmunojat.uz";

/** Absolute URL for a canonical (Uzbek) path in a given language. */
/* GitHub Pages serves /about from /about/index.html and 301s /about to
   /about/. A canonical that redirects away from itself is a contradiction, so
   every absolute URL the site publishes - canonical, og:url, hreflang, sitemap
   - carries the trailing slash Pages actually serves. Internal links are left
   alone: in-app navigation never hits the redirect. */
const withTrailingSlash = (path) => (path.endsWith("/") ? path : path + "/");

export const urlFor = (path, lang) =>
  SITE_ORIGIN + withTrailingSlash(localizePath(path, lang));
import { PrerenderContext, SEO_MARKER_TYPE } from "../context/SeoCollector";

/* The indexable defaults, matching index.html. Every route sets the robots tags
   outright rather than saving and restoring whatever was there: the 404 page is
   prerendered with "noindex" already in its HTML, so a capture-and-restore would
   read "noindex" as the value to go back to and leave the whole session
   deindexed after the user navigated away from it. */
const ROBOTS_INDEXABLE = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const GOOGLEBOT_INDEXABLE = "index, follow, max-image-preview:large";
const ROBOTS_NOINDEX = "noindex, follow";

/**
 * Dynamic SEO & Semantic Head Manager for Single Page Application
 * Injects canonical, title, description, keywords, OpenGraph, Twitter, and custom JSON-LD schemas
 */
const Seo = ({
  /* `page` looks copy up from constants/seo for the active language; `path` is
     the canonical Uzbek path and drives canonical plus hreflang. Explicit
     title/description still win, for pages that build their own (service
     detail). */
  page,
  path,
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://drmunojat.uz/logo.png",
  schemaJson,
  noindex = false,
}) => {
  const { lang } = useLanguage();

  const copy = page ? getPageSeo(page, lang) : null;
  const resolvedTitle = title || copy?.title;
  const resolvedDescription = description || copy?.description;
  const resolvedKeywords = keywords || PAGE_KEYWORDS[lang];
  const resolvedCanonical = canonical || (path ? urlFor(path, lang) : undefined);
  /* Now that each language has its own URL, hreflang finally means something.
     x-default points at Uzbek, the unprefixed default. */
  const alternates = path
    ? LANGS.map((code) => ({ hreflang: code, href: urlFor(path, code) }))
        .concat([{ hreflang: "x-default", href: urlFor(path, DEFAULT_LANG) }])
    : null;

  /* Callers build schemaJson inline, so it is a new object on every render.
     Key the effect on its serialised form instead of its identity, otherwise
     the script tag is torn down and rebuilt on each keystroke of a page form. */
  const schemaKey = schemaJson ? JSON.stringify(schemaJson) : null;

  const isPrerender = useContext(PrerenderContext);

  useEffect(() => {
    // 1. Title
    if (resolvedTitle) {
      document.title = resolvedTitle;
    }

    // 2. Meta description
    if (resolvedDescription) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute("content", resolvedDescription);
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", resolvedDescription);
      }
      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) {
        twDesc.setAttribute("content", resolvedDescription);
      }
    }

    // 3. Meta keywords
    if (resolvedKeywords) {
      let kwMeta = document.querySelector('meta[name="keywords"]');
      if (kwMeta) {
        kwMeta.setAttribute("content", resolvedKeywords);
      }
    }

    // 4. Canonical
    if (resolvedCanonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", resolvedCanonical);
      }
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute("content", resolvedCanonical);
      }
    }

    // 5. OpenGraph Title
    if (resolvedTitle) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", resolvedTitle);
      }
      let twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) {
        twTitle.setAttribute("content", resolvedTitle);
      }
    }

    /* 6. Custom JSON-LD schema injection for specific specialty / sub-page.
       On a prerendered page this route's schema is already in <head>. Drop it
       first so the client-managed tag replaces it instead of duplicating it. */
    document
      .querySelectorAll('script[data-prerendered="true"]')
      .forEach((node) => node.remove());

    let scriptTag = null;
    if (schemaKey) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.id = "dynamic-page-schema";
      scriptTag.innerHTML = schemaKey;
      document.head.appendChild(scriptTag);
    }

    // 7. Robots — set outright for this route, never inherited from the markup.
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const googlebotMeta = document.querySelector('meta[name="googlebot"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", noindex ? ROBOTS_NOINDEX : ROBOTS_INDEXABLE);
    }
    if (googlebotMeta) {
      googlebotMeta.setAttribute("content", noindex ? ROBOTS_NOINDEX : GOOGLEBOT_INDEXABLE);
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [resolvedTitle, resolvedDescription, resolvedKeywords, resolvedCanonical, schemaKey, lang, noindex]);

  /* Static render: hand this route's head data to the prerenderer as an inert
     marker. It is lifted into <head> and stripped from the body afterwards, so
     it never reaches a browser. Escaping "<" keeps the payload from closing
     the script tag early while staying valid JSON. */
  if (isPrerender) {
    const payload = JSON.stringify({
      title: resolvedTitle,
      description: resolvedDescription,
      keywords: resolvedKeywords,
      canonical: resolvedCanonical,
      alternates,
      ogImage,
      schemaJson: schemaKey,
      noindex,
      lang,
    }).split("<").join(String.raw`\u003c`);
    return <script type={SEO_MARKER_TYPE} dangerouslySetInnerHTML={{ __html: payload }} />;
  }

  return null;
};

export default Seo;
