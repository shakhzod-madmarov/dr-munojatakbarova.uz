import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import { PrerenderContext, SEO_MARKER_TYPE } from "./context/SeoCollector";
import "./index.css";

/* [^] matches any character including newlines, so this pattern needs no
   backslash escapes - which a template literal would swallow anyway. */
const MARKER = new RegExp(
  "<script type=\"" + SEO_MARKER_TYPE + "\">([^]*?)</script>",
  "g"
);

/**
 * Render one route to static HTML for the prerender step.
 *
 * Returns the markup for #root plus the head data <Seo> emitted, with the
 * marker elements stripped so they never reach a browser.
 *
 * No <React.StrictMode>: it exists to surface client-side effect bugs in
 * development and has nothing to contribute to a one-shot static render.
 */
export function render(url) {
  const raw = renderToString(
    <PrerenderContext.Provider value={true}>
      <StaticRouter location={url}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StaticRouter>
    </PrerenderContext.Provider>
  );

  let seo = {};
  for (const match of raw.matchAll(MARKER)) {
    try {
      seo = { ...seo, ...JSON.parse(match[1]) };
    } catch {
      /* A malformed marker just means this route keeps the template defaults. */
    }
  }

  return { html: raw.replace(MARKER, ""), seo };
}
