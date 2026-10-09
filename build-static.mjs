import { versionScriptUrls } from "./tools/version-script-urls.mjs";
import { cp, mkdir, rm, writeFile, readFile } from "node:fs/promises";
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
  "analytics-config.js",
  "analytics.js",
  "consent.css",
  "consent.js",
  "privacy.html",
  "privacy.js",
  "now-in-wroclaw.css",
  "now-in-wroclaw.js",
  "place-amenities.css",
  "guide-video.css",
  "guide-video.js",
  "youtube-video.js",
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
  "cultural.css",
  "cultural.js",
  "excursions.css",
  "excursions.js",
]) {
  await cp(resolve(root, file), resolve(client, file));
}

// Phase 1: access.js, checkout.js, admin.html and admin.js are deliberately
// retained in source control for reversibility, but are not shipped publicly.

for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html", "cultural.html"]) {
  const html = await readFile(resolve(root, file), "utf8");
  const scripts = await Promise.all(["/data/place-catalog.js", "/data/location-media.js", "/lifestyle.js"].map(async (url) => [url, await readFile(resolve(root, url.slice(1)))]));
  await writeFile(resolve(interactiveMaps, file), versionScriptUrls(html, scripts));
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
await writeFile(resolve(client, "excursions.html"), legacyRedirect("/products/interactive-maps/excursions.html", "טיולי יום מוורוצלב"));
await writeFile(resolve(client, "cultural.html"), legacyRedirect("/products/interactive-maps/cultural.html", "ההרפתקה התרבותית"));
await cp(resolve(root, "data"), resolve(client, "data"), { recursive: true });
await cp(resolve(root, "assets"), resolve(client, "assets"), { recursive: true, filter: (source) => !/\.(?:mp4|mov|webm|m4v|avi)$/i.test(source) });
await cp(resolve(root, "news"), resolve(client, "news"), { recursive: true });
await writeFile(resolve(client, ".nojekyll"), "");

// Social crawlers do not execute the site's client-side language switch.
// Stable language URLs give every shared map its own native-language preview.
const shareCopy = {
  he: { locale: "he_IL", open: "פתחו את המפה", title: "פחות זמן לתכנן, יותר זמן להתאהב בעיר", description: "מפות אינטראקטיביות לוורוצלב ולשלזיה התחתית, סיפורים מקומיים וסרטוני הדרכה.", maps: ["מפת 24 שעות בוורוצלב", "מפת ארבעה ימים בוורוצלב", "מפת הכריסמס בוורוצלב", "מפת הלייף סטייל בוורוצלב", "מפת טיולי יום מוורוצלב", "מפת התרבות בוורוצלב"] },
  en: { locale: "en_GB", open: "Open the map", title: "Less time planning, more time falling in love with the city", description: "Interactive maps of Wrocław and Lower Silesia, local stories and short video guides.", maps: ["24 hours in Wrocław", "Four days in Wrocław", "Christmas in Wrocław", "Wrocław lifestyle map", "Day trips from Wrocław", "Wrocław culture map"] },
  pl: { locale: "pl_PL", open: "Otwórz mapę", title: "Mniej planowania, więcej czasu na zakochanie się w mieście", description: "Interaktywne mapy Wrocławia i Dolnego Śląska, lokalne historie i krótkie filmy z przewodnikiem.", maps: ["Wrocław w 24 godziny", "Cztery dni we Wrocławiu", "Boże Narodzenie we Wrocławiu", "Wrocław — mapa stylu życia", "Wycieczki jednodniowe z Wrocławia", "Mapa kultury Wrocławia"] },
  de: { locale: "de_DE", open: "Karte öffnen", title: "Weniger planen, mehr Zeit, sich in die Stadt zu verlieben", description: "Interaktive Karten von Breslau und Niederschlesien, lokale Geschichten und kurze Videoführungen.", maps: ["Breslau in 24 Stunden", "Vier Tage in Breslau", "Weihnachten in Breslau", "Breslaus Lifestyle-Karte", "Tagesausflüge ab Breslau", "Breslaus Kulturkarte"] },
  cs: { locale: "cs_CZ", open: "Otevřít mapu", title: "Méně plánování, více času zamilovat se do města", description: "Interaktivní mapy Vratislavi a Dolního Slezska, místní příběhy a krátká videa s průvodcem.", maps: ["Vratislav za 24 hodin", "Čtyři dny ve Vratislavi", "Vánoce ve Vratislavi", "Vratislav — mapa životního stylu", "Jednodenní výlety z Vratislavi", "Kulturní mapa Vratislavi"] },
};
const shareMaps = ["map", "premium", "moshe", "lifestyle", "excursions", "cultural"];
const escapeHtml = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const [lang, copy] of Object.entries(shareCopy)) {
  const folder = resolve(client, "share", lang);
  await mkdir(folder, { recursive: true });
  for (const name of ["home", ...shareMaps]) {
    const target = name === "home" ? `/?lang=${lang}` : `/products/interactive-maps/${name}.html?lang=${lang}`;
    const title = name === "home" ? copy.title : copy.maps[shareMaps.indexOf(name)];
    const shareUrl = `https://wroc-love.com/share/${lang}/${name}.html`;
    await writeFile(resolve(folder, `${name}.html`), `<!doctype html>
<html lang="${lang}" dir="${lang === "he" ? "rtl" : "ltr"}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(copy.description)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(copy.description)}">
<meta property="og:locale" content="${copy.locale}">
<meta property="og:type" content="website"><meta property="og:url" content="${shareUrl}">
<meta property="og:image" content="https://wroc-love.com/assets/logo.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(copy.description)}">
<link rel="canonical" href="https://wroc-love.com${target}">
<script>const target=new URL(${JSON.stringify(target)},location.origin);for(const [key,value] of new URLSearchParams(location.search))if(key!=="lang")target.searchParams.set(key,value);location.replace(target.href+location.hash);</script>
</head><body><h1>${escapeHtml(title)}</h1><p>${escapeHtml(copy.description)}</p><a href="${target}">${copy.open}</a></body></html>\n`);
  }
}
await cp(resolve(root, "worker/site-worker.js"), resolve(server, "index.js"));

console.log("Static site built in dist/");
