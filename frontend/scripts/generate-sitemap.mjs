/**
 * Generate dist/sitemap.xml with asset URLs that actually resolve.
 *
 * The hand-written public/sitemap.xml pointed at unhashed ".jpg" paths such as
 * /assets/treatment_implant.jpg, while the build emits
 * /assets/treatment_implant-EUoIaf_F.webp - so 6 of its 8 image URLs were 404s.
 * Here every image is resolved through the Vite build manifest, which means the
 * sitemap references exactly the files the pages themselves load.
 *
 * Run after `vite build` (needs dist/.vite/manifest.json).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE_ORIGIN, LANGS, DEFAULT_LANG, localizePath } from "./site-config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const manifestPath = path.join(distDir, ".vite", "manifest.json");

const xmlEscape = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

/* Files under public/ are copied verbatim, so they keep their own name. Files
   under src/assets are content-hashed and must come from the manifest. */
const resolveAsset = (src) => {
  if (src.startsWith("public/")) {
    const rel = src.slice("public/".length);
    if (!fs.existsSync(path.join(distDir, rel))) return null;
    return "/" + rel;
  }
  const entry = manifest[src];
  if (!entry || !entry.file) return null;
  return "/" + entry.file;
};

const urlFor = (routePath, lang = DEFAULT_LANG) => SITE_ORIGIN + localizePath(routePath, lang);

const lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
lines.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml"');
lines.push('        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');
lines.push("");

let unresolved = 0;

/* One <url> per page per language. Each entry lists every language variant,
   which is what tells a search engine these are translations of one page
   rather than competing duplicates. */
for (const route of ROUTES) {
  for (const lang of LANGS) {
  const loc = urlFor(route.path, lang);
  lines.push("  <url>");
  lines.push(`    <loc>${xmlEscape(loc)}</loc>`);
  if (route.lastmod) lines.push(`    <lastmod>${route.lastmod}</lastmod>`);
  if (route.changefreq) lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
  if (route.priority) lines.push(`    <priority>${route.priority}</priority>`);

  if (route.hreflang) {
    for (const alt of LANGS) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${alt}" href="${xmlEscape(urlFor(route.path, alt))}"/>`);
    }
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(urlFor(route.path, DEFAULT_LANG))}"/>`);
  }

  if (route.image) {
    const href = resolveAsset(route.image.src);
    if (!href) {
      console.error(`  WARN  ${route.path}: could not resolve image "${route.image.src}" - omitted`);
      unresolved++;
    } else {
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${xmlEscape(SITE_ORIGIN + href)}</image:loc>`);
      if (route.image.title) lines.push(`      <image:title>${xmlEscape(route.image.title)}</image:title>`);
      if (route.image.caption) lines.push(`      <image:caption>${xmlEscape(route.image.caption)}</image:caption>`);
      lines.push("    </image:image>");
    }
  }

  lines.push("  </url>");
  lines.push("");
  }
}

lines.push("</urlset>");

const outPath = path.join(distDir, "sitemap.xml");
fs.writeFileSync(outPath, lines.join("\n"), "utf-8");

console.log(`sitemap: ${ROUTES.length * LANGS.length} urls (${ROUTES.length} pages x ${LANGS.length} languages) -> dist/sitemap.xml`);
if (unresolved > 0) {
  console.error(`sitemap: ${unresolved} image(s) could not be resolved.`);
  process.exit(1);
}
