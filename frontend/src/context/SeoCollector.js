import { createContext } from "react";

/**
 * True only while the prerender script renders the tree under Node.
 *
 * <Seo> normally sets document.title and friends from an effect, but effects
 * never run during a static render. When this flag is set, <Seo> instead emits
 * its values as an inert marker element, which the prerenderer lifts out of the
 * body and writes into <head>. Passing the data out through the render output
 * keeps it one-way — no shared mutable object written to during render.
 */
export const PrerenderContext = createContext(false);

export const SEO_MARKER_TYPE = "application/x-seo-meta";
