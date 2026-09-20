/**
 * Prerender every indexable route to static HTML.
 *
 * Why: the app is client-rendered, so the shipped index.html had an empty body
 * and one homepage <title>/canonical for every URL. Crawlers that do not run
 * JavaScript (AI answer engines, Telegram/Facebook link previews) saw nothing,
 * and every route declared itself a duplicate of the homepage.
 *
 * Run after `vite build` and `vite build --ssr`. Routes come from site-config,
 * the same module the sitemap is generated from, so the set of URLs declared to
 * search engines and the set built as static HTML cannot drift apart.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES, SITE_ORIGIN, LANGS, DEFAULT_LANG, localizePath } from "./site-config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");


/* ── helpers ─────────────────────────────────────────────────────────────── */

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/* Values never contain ">", so [^>]* safely spans the multi-line, heavily
   padded tags in index.html without running past the end of the tag. */
const replaceContent = (html, matcher, value) => {
  if (value == null) return html;
  return html.replace(matcher, (tag) =>
    tag.replace(/content="[^"]*"/, `content="${escapeAttr(value)}"`)
  );
};

/* String.raw keeps the \s escapes intact while still interpolating the name. */
const setMetaName = (html, name, value) =>
  replaceContent(html, new RegExp(String.raw`<meta\s+name="${name}"[^>]*>`), value);

const setMetaProperty = (html, property, value) =>
  replaceContent(html, new RegExp(String.raw`<meta\s+property="${property}"[^>]*>`), value);

const setTitle = (html, value) =>
  value == null
    ? html
    : html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(value)}</title>`);

/* A null value strips the tag rather than leaving the template's homepage URL
   behind - a 404 that claims to be canonical to "/" is worse than none. */
const setCanonical = (html, value) =>
  value == null
    ? html.replace(/<link\s+rel="canonical"[^>]*>\s*/, "")
    : html.replace(/<link\s+rel="canonical"[^>]*>/, (tag) =>
        tag.replace(/href="[^"]*"/, `href="${escapeAttr(value)}"`)
      );

/* <html lang> must match the page, or a screen reader reads Russian with Uzbek
   pronunciation rules and search engines mis-attribute the language. */
const setHtmlLang = (html, lang) =>
  html.replace(/<html([^>]*)\s+lang="[^"]*"/, `<html$1 lang="${lang}"`);

/* Alternates go next to the canonical, which is where crawlers expect them. */
const injectAlternates = (html, alternates) => {
  if (!alternates || alternates.length === 0) return html;
  const tags = alternates
    .map((a) => `    <link rel="alternate" hreflang="${a.hreflang}" href="${escapeAttr(a.href)}" />`)
    .join("\n");
  return html.replace(/(<link\s+rel="canonical"[^>]*>)/, `$1\n${tags}`);
};

const setNoindex = (html) =>
  html
    .replace(/<meta\s+name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />')
    .replace(/<meta\s+name="googlebot"[^>]*>/, '<meta name="googlebot" content="noindex, follow" />');

/* JSON-LD goes inside a <script>, so HTML-escaping would corrupt it. Only the
   sequence that could close the tag early needs neutralising. */
const injectSchema = (html, json) => {
  if (!json) return html;
  const safe = json.split("<").join(String.raw`\u003c`);
  return html.replace(
    "</head>",
    `  <script type="application/ld+json" data-prerendered="true">${safe}</script>\n  </head>`
  );
};

/* ── main ────────────────────────────────────────────────────────────────── */

/* pathToFileURL: a bare Windows path like C:\... is not a valid ESM specifier. */
const { render } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);
const template = fs.readFileSync(templatePath, "utf-8");

if (!template.includes('<div id="root"></div>')) {
  console.error("prerender: could not find the empty #root div in dist/index.html");
  process.exit(1);
}

/* Hosts look for dist/404.html to serve with a real 404 status. It is built
   from the same catch-all route the SPA renders, so both agree. */
const NOT_FOUND_ROUTE = "/__not-found__";
/* Every page in every language, plus one 404. */
const routes = [
  ...ROUTES.flatMap((r) => LANGS.map((lang) => localizePath(r.path, lang))),
  NOT_FOUND_ROUTE,
];
console.log(`prerender: ${routes.length} routes (pages x languages + 404)\n`);

let failed = 0;

for (const route of routes) {
  let rendered;
  try {
    rendered = await render(route);
  } catch (error) {
    console.error(`  FAIL  ${route}  - ${error.message.split("\n")[0]}`);
    failed++;
    continue;
  }

  const { html, seo } = rendered;
  const textLength = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().length;

  /* Two guards, because "not empty" is not the same as "complete".
     A character floor catches a blank render. The <h1> check catches the subtler
     failure: the shell (nav, footer) renders but the page body does not, which
     is what React.lazy did here - every route still produced ~1,300 chars of
     chrome and sailed past a length-only check while carrying no content. */
  if (textLength < 200) {
    console.error(`  FAIL  ${route}  - rendered only ${textLength} chars of text`);
    failed++;
    continue;
  }
  if (!/<h1[\s>]/.test(html)) {
    console.error(`  FAIL  ${route}  - no <h1> in the render; the page body is missing`);
    failed++;
    continue;
  }

  /* A 404 must not claim a canonical - it is not a real URL. */
  const canonical =
    route === NOT_FOUND_ROUTE
      ? null
      : seo.canonical || SITE_ORIGIN + (route.endsWith("/") ? route : route + "/");

  let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  page = setTitle(page, seo.title);
  page = setMetaName(page, "description", seo.description);
  page = setMetaName(page, "keywords", seo.keywords);
  page = setCanonical(page, canonical);
  page = setMetaProperty(page, "og:title", seo.title);
  page = setMetaProperty(page, "og:description", seo.description);
  page = setMetaProperty(page, "og:url", canonical);
  page = setMetaProperty(page, "og:image", seo.ogImage);
  page = setMetaName(page, "twitter:title", seo.title);
  page = setMetaName(page, "twitter:description", seo.description);
  page = setMetaName(page, "twitter:image", seo.ogImage);
  if (seo.noindex) page = setNoindex(page);
  page = setHtmlLang(page, seo.lang || DEFAULT_LANG);
  page = injectAlternates(page, seo.alternates);
  page = injectSchema(page, seo.schemaJson);

  const outPath =
    route === "/"
      ? templatePath
      : route === NOT_FOUND_ROUTE
        ? path.join(distDir, "404.html")
        : path.join(distDir, route, "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page, "utf-8");

  const rel = path.relative(distDir, outPath).split(path.sep).join("/");
  console.log(
    `  ok    ${route.padEnd(30)} ${String(textLength).padStart(6)} chars  ->  dist/${rel}`
  );
}

if (failed > 0) {
  console.error(`\nprerender: ${failed} route(s) failed - not shipping a half-rendered build.`);
  process.exit(1);
}

console.log(`\nprerender: ${routes.length} routes written.`);
