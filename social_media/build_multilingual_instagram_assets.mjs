import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("/Users/rachelfiler/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const output = resolve(here, "output", "multilingual");
const background = resolve(root, "assets/og.png");
const logo = resolve(root, "assets/logo.png");
await mkdir(output, { recursive: true });

const palette = { navy: "#062b5c", deep: "#02152f", gold: "#e1ad4f", sky: "#9cd8ff", white: "#ffffff" };

const languages = {
  en: {
    maps: "3 smart maps for Wrocław",
    routes: "24 hours  •  4 days  •  Christmas",
    free: "FREE UNTIL 31 DECEMBER 2026",
    benefits: "LIVE MAP  •  NAVIGATION  •  TIPS",
    bio: "LINK IN BIO",
    q: "Travelling to Wrocław?",
    ready: "Your route is ready",
    interactive: ["3 INTERACTIVE MAPS", "IN ENGLISH"],
    pace: "Choose your own pace",
    live: "Live map",
    navigation: "Direct navigation to every stop",
    tips: "Practical recommendations and tips",
    phone: "Open on your phone and explore",
  },
  pl: {
    maps: "3 inteligentne mapy Wrocławia",
    routes: "24 godziny  •  4 dni  •  Boże Narodzenie",
    free: "BEZPŁATNIE DO 31 GRUDNIA 2026",
    benefits: "MAPA  •  NAWIGACJA  •  POLECENIA",
    bio: "LINK W BIO",
    q: "Wybierasz się do Wrocławia?",
    ready: "Twoja trasa jest gotowa",
    interactive: ["3 INTERAKTYWNE MAPY", "PO POLSKU"],
    pace: "Wybierz własne tempo",
    live: "Interaktywna mapa",
    navigation: "Nawigacja bezpośrednio do punktów",
    tips: "Praktyczne polecenia i wskazówki",
    phone: "Otwórz w telefonie i ruszaj",
  },
  de: {
    maps: "3 smarte Karten für Breslau",
    routes: "24 Stunden  •  4 Tage  •  Weihnachten",
    free: "KOSTENLOS BIS 31. DEZEMBER 2026",
    benefits: "KARTE  •  NAVIGATION  •  TIPPS",
    bio: "LINK IN DER BIO",
    q: "Reise nach Breslau geplant?",
    ready: "Deine Route ist fertig",
    interactive: ["3 INTERAKTIVE KARTEN", "AUF DEUTSCH"],
    pace: "Entdecke die Stadt in deinem Tempo",
    live: "Interaktive Karte",
    navigation: "Direkte Navigation zu jedem Stopp",
    tips: "Praktische Empfehlungen und Tipps",
    phone: "Am Smartphone öffnen und losgehen",
  },
  cs: {
    maps: "3 chytré mapy Vratislavi",
    routes: "24 hodin  •  4 dny  •  Vánoce",
    free: "ZDARMA DO 31. PROSINCE 2026",
    benefits: "MAPA  •  NAVIGACE  •  DOPORUČENÍ",
    bio: "ODKAZ V BIU",
    q: "Chystáte se do Vratislavi?",
    ready: "Vaše trasa je připravena",
    interactive: ["3 INTERAKTIVNÍ MAPY", "V ČEŠTINĚ"],
    pace: "Vyberte si vlastní tempo",
    live: "Interaktivní mapa",
    navigation: "Přímá navigace ke každé zastávce",
    tips: "Praktická doporučení a tipy",
    phone: "Otevřete v telefonu a vyrazte",
  },
};

const escapeXml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function textSvg(lines, options = {}) {
  const { y = 300, size = 72, color = palette.white, gap = Math.round(size * 1.2), weight = 800, family = "Arial, sans-serif" } = options;
  return lines.map((line, index) => `<text x="540" y="${y + index * gap}" text-anchor="middle" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`).join("");
}

const overlaySvg = (content) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">${content}</svg>`);

async function render(name, content, logoSize = 190) {
  const bg = await sharp(background).resize(1080, 1920, { fit: "cover", position: "east" }).png().toBuffer();
  const mark = await sharp(logo).resize(logoSize, logoSize).png().toBuffer();
  await sharp(bg).composite([
    { input: overlaySvg(`<rect width="1080" height="1920" fill="${palette.navy}" opacity="0.66"/><rect width="1080" height="920" fill="${palette.deep}" opacity="0.90"/>`) },
    { input: overlaySvg(content) },
    { input: mark, left: Math.round((1080 - logoSize) / 2), top: 55 },
  ]).png().toFile(resolve(output, name));
}

for (const [code, t] of Object.entries(languages)) {
  await render(`${code}-story.png`, `
    ${textSvg([t.maps], { y: 350, size: 66 })}
    ${textSvg([t.routes], { y: 485, size: 38, color: palette.sky })}
    <rect x="80" y="600" width="920" height="150" rx="75" fill="${palette.gold}"/>
    ${textSvg([t.free], { y: 694, size: 42, color: palette.navy })}
    ${textSvg([t.benefits], { y: 875, size: 37 })}
    <rect x="95" y="1480" width="890" height="235" rx="34" fill="${palette.deep}" opacity="0.92" stroke="${palette.gold}" stroke-width="3"/>
    ${textSvg(["wroc-love.com"], { y: 1585, size: 72 })}
    ${textSvg([t.bio], { y: 1670, size: 39, color: palette.gold })}
  `);

  await render(`${code}-reel-frame-1.png`, `${textSvg([t.q], { y: 390, size: 70 })}${textSvg([t.ready], { y: 525, size: 50, color: palette.gold })}${textSvg(["Wroc-love"], { y: 1580, size: 76, family: "Georgia, serif" })}`);
  await render(`${code}-reel-frame-2.png`, `${textSvg(t.interactive, { y: 350, size: 61, gap: 90 })}${textSvg([t.routes], { y: 575, size: 36, color: palette.sky })}<rect x="110" y="1445" width="860" height="150" rx="34" fill="${palette.deep}" opacity="0.90"/>${textSvg([t.pace], { y: 1542, size: 41, color: palette.gold })}`);
  await render(`${code}-reel-frame-3.png`, `${textSvg([t.live], { y: 330, size: 72 })}${textSvg([t.navigation], { y: 465, size: 45 })}${textSvg([t.tips], { y: 600, size: 43, color: palette.gold })}<rect x="110" y="1435" width="860" height="170" rx="40" fill="${palette.deep}" opacity="0.90"/>${textSvg([t.phone], { y: 1542, size: 39, color: palette.sky })}`);
  await render(`${code}-reel-frame-4.png`, `<rect x="65" y="300" width="950" height="180" rx="90" fill="${palette.gold}"/>${textSvg([t.free], { y: 410, size: 43, color: palette.navy })}${textSvg(["wroc-love.com"], { y: 650, size: 82 })}${textSvg([t.bio], { y: 770, size: 43, color: palette.sky })}${textSvg(["Wrocław & Lower Silesia"], { y: 1580, size: 44, color: palette.gold })}`);
}

console.log(output);
