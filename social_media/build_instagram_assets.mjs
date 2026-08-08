import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("/Users/rachelfiler/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const output = resolve(here, "output");
const background = resolve(root, "assets/og.png");
const logo = resolve(root, "assets/logo.png");
await mkdir(output, { recursive: true });

const palette = { navy: "#062b5c", deep: "#02152f", gold: "#e1ad4f", sky: "#9cd8ff", white: "#ffffff" };

function textSvg(lines, options = {}) {
  const {
    y = 300,
    size = 72,
    color = palette.white,
    gap = Math.round(size * 1.2),
    weight = 800,
    family = "SF Hebrew, Arial, sans-serif",
  } = options;
  return lines.map((line, index) => `<text x="540" y="${y + index * gap}" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${color}">${line}</text>`).join("");
}

function overlaySvg(content) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">${content}</svg>`);
}

async function baseCanvas() {
  const bg = await sharp(background).resize(1080, 1920, { fit: "cover", position: "east" }).png().toBuffer();
  return sharp(bg).composite([{ input: overlaySvg(`<rect width="1080" height="1920" fill="${palette.navy}" opacity="0.66"/><rect y="0" width="1080" height="920" fill="${palette.deep}" opacity="0.90"/>`) }]);
}

async function render(name, content, logoSize = 190) {
  const mark = await sharp(logo).resize(logoSize, logoSize).png().toBuffer();
  const canvas = await baseCanvas();
  await canvas.composite([
    { input: overlaySvg(content) },
    { input: mark, left: Math.round((1080 - logoSize) / 2), top: 55 },
  ]).png().toFile(resolve(output, name));
}

await render("wroc-love-maps-story.png", `
  ${textSvg(["3 מפות חכמות לוורוצלב"], { y: 350, size: 76 })}
  ${textSvg(["24 שעות  •  4 ימים  •  כריסמס"], { y: 485, size: 44, color: palette.sky })}
  <rect x="110" y="600" width="860" height="150" rx="75" fill="${palette.gold}"/>
  ${textSvg(["חינם עד 31.12.2026"], { y: 695, size: 54, color: palette.navy })}
  ${textSvg(["מפה חיה  •  ניווט  •  המלצות"], { y: 875, size: 42 })}
  <rect x="95" y="1480" width="890" height="235" rx="34" fill="${palette.deep}" opacity="0.92" stroke="${palette.gold}" stroke-width="3"/>
  ${textSvg(["wroc-love.com"], { y: 1585, size: 72, family: "Arial, sans-serif" })}
  ${textSvg(["קישור בביו"], { y: 1670, size: 43, color: palette.gold })}
`);

await render("reel-frame-1.png", `
  ${textSvg(["נוסעים לוורוצלב?"], { y: 390, size: 84 })}
  ${textSvg(["המסלול כבר מוכן"], { y: 525, size: 55, color: palette.gold })}
  ${textSvg(["Wroc-love"], { y: 1580, size: 76, family: "Georgia, serif" })}
`);

await render("reel-frame-2.png", `
  ${textSvg(["3 מפות אינטראקטיביות", "בעברית"], { y: 350, size: 69, gap: 95 })}
  ${textSvg(["24 שעות  •  4 ימים  •  כריסמס"], { y: 575, size: 44, color: palette.sky })}
  <rect x="150" y="1445" width="780" height="150" rx="34" fill="${palette.deep}" opacity="0.90"/>
  ${textSvg(["בחרו את הקצב שלכם"], { y: 1542, size: 47, color: palette.gold })}
`);

await render("reel-frame-3.png", `
  ${textSvg(["מפה חיה"], { y: 330, size: 77 })}
  ${textSvg(["ניווט ישיר לכל תחנה"], { y: 465, size: 59 })}
  ${textSvg(["המלצות וטיפים שימושיים"], { y: 600, size: 50, color: palette.gold })}
  <rect x="145" y="1435" width="790" height="170" rx="40" fill="${palette.deep}" opacity="0.90"/>
  ${textSvg(["פותחים בטלפון ויוצאים לדרך"], { y: 1542, size: 43, color: palette.sky })}
`);

await render("reel-frame-4.png", `
  <rect x="105" y="300" width="870" height="180" rx="90" fill="${palette.gold}"/>
  ${textSvg(["חינם עד 31.12.2026"], { y: 410, size: 61, color: palette.navy })}
  ${textSvg(["wroc-love.com"], { y: 650, size: 82, family: "Arial, sans-serif" })}
  ${textSvg(["קישור בביו"], { y: 770, size: 49, color: palette.sky })}
  ${textSvg(["Wrocław &amp; Lower Silesia"], { y: 1580, size: 44, color: palette.gold, family: "Arial, sans-serif" })}
`);

console.log(output);
