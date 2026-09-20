import { useEffect, useContext } from "react";
import { useLanguage } from "../context/LanguageContext";
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
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://drmunojat.uz/logo.png",
  schemaJson,
  noindex = false,
}) => {
  const { lang } = useLanguage();

  /* Callers build schemaJson inline, so it is a new object on every render.
     Key the effect on its serialised form instead of its identity, otherwise
     the script tag is torn down and rebuilt on each keystroke of a page form. */
  const schemaKey = schemaJson ? JSON.stringify(schemaJson) : null;

  const isPrerender = useContext(PrerenderContext);

  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // 2. Meta description
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute("content", description);
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", description);
      }
      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) {
        twDesc.setAttribute("content", description);
      }
    }

    // 3. Meta keywords
    if (keywords) {
      let kwMeta = document.querySelector('meta[name="keywords"]');
      if (kwMeta) {
        kwMeta.setAttribute("content", keywords);
      }
    }

    // 4. Canonical
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      }
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute("content", canonical);
      }
    }

    // 5. OpenGraph Title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", title);
      }
      let twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) {
        twTitle.setAttribute("content", title);
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
  }, [title, description, keywords, canonical, schemaKey, lang, noindex]);

  /* Static render: hand this route's head data to the prerenderer as an inert
     marker. It is lifted into <head> and stripped from the body afterwards, so
     it never reaches a browser. Escaping "<" keeps the payload from closing
     the script tag early while staying valid JSON. */
  if (isPrerender) {
    const payload = JSON.stringify({
      title,
      description,
      keywords,
      canonical,
      ogImage,
      schemaJson: schemaKey,
      noindex,
    }).split("<").join(String.raw`\u003c`);
    return <script type={SEO_MARKER_TYPE} dangerouslySetInnerHTML={{ __html: payload }} />;
  }

  return null;
};

export default Seo;
