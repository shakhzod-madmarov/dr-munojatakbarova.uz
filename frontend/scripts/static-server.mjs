import http from "node:http";
import fs from "node:fs";
import path from "node:path";

/**
 * Local stand-in for the production host, so the prerendered output can be
 * checked the way search engines will actually see it.
 *
 * Resolution order matches nginx:
 *   try_files $uri $uri/index.html /404.html;
 *   error_page 404 /404.html;
 *
 * Note there is no SPA fallback to index.html. Every real route is prerendered
 * to its own file, so an unmatched path is genuinely not found and must answer
 * 404 - falling back to index.html is what produced soft 404s before.
 */
const dist = process.argv[2];
const types = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".mp4": "video/mp4",
  ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json",
};

const send = (res, status, file) => {
  res.writeHead(status, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  for (const candidate of [path.join(dist, urlPath), path.join(dist, urlPath, "index.html")]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      send(res, 200, candidate);
      return;
    }
  }
  const notFound = path.join(dist, "404.html");
  if (fs.existsSync(notFound)) {
    send(res, 404, notFound);
    return;
  }
  res.writeHead(404); res.end("not found");
}).listen(4174, () => console.log("static server on http://localhost:4174"));
