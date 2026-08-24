import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const client = resolve(root, "dist/client");
const server = resolve(root, "dist/server");
const interactiveMaps = resolve(client, "products/interactive-maps");

await rm(resolve(root, "dist"), { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await mkdir(resolve(client, "data"), { recursive: true });
await mkdir(resolve(client, "assets"), { recursive: true });
await mkdir(interactiveMaps, { recursive: true });

for (const file of [
  "index.html",
  "styles.css",
  "site-i18n.js",
  "site-actions.css",
  "site-actions.js",
  "place-amenities.css",
  "campaign-access.js",
  "map-styles.css",
  "app.js",
  "access.html",
  "access.css",
  "checkout.html",
  "premium.css",
  "premium.js",
  "lifestyle.css",
  "lifestyle.js",
  "excursions.css",
  "excursions.js",
]) {
  await cp(resolve(root, file), resolve(client, file));
}

// Phase 1: access.js, checkout.js, admin.html and admin.js are deliberately
// retained in source control for reversibility, but are not shipped publicly.

for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"]) {
  await cp(resolve(root, file), resolve(interactiveMaps, file));
}

const legacyRedirect = (target, title) => `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <title>${title} | Wroc-love</title>
    <link rel="canonical" href="https://wroc-love.com${target}" />
    <script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
  </head>
  <body><p><a href="${target}">המשך למפה</a></p></body>
</html>\n`;

await writeFile(resolve(client, "map.html"), legacyRedirect("/products/interactive-maps/map.html", "מסלול 24 שעות"));
await writeFile(resolve(client, "premium.html"), legacyRedirect("/products/interactive-maps/premium.html", "מסלול 4 ימים"));
await writeFile(resolve(client, "moshe.html"), legacyRedirect("/products/interactive-maps/moshe.html", "מסלול כריסמס"));
await writeFile(resolve(client, "lifestyle.html"), legacyRedirect("/products/interactive-maps/lifestyle.html", "לאכול, לשתות, לקנות ולישון"));
await writeFile(resolve(client, "excursions.html"), legacyRedirect("/products/interactive-maps/excursions.html", "טיולים בשלזיה התחתית"));
await cp(resolve(root, "data"), resolve(client, "data"), { recursive: true });
await cp(resolve(root, "assets"), resolve(client, "assets"), { recursive: true });
await writeFile(resolve(client, ".nojekyll"), "");

await cp(resolve(root, "worker/site-worker.js"), resolve(server, "index.js"));

console.log("Static site built in dist/");
