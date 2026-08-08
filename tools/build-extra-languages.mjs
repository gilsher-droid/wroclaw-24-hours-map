import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (name) => fs.readFileSync(new URL(name, root), "utf8");

function extractObject(source, marker) {
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${marker}`);
  const open = source.indexOf("{", start + marker.length);
  let depth = 0, quote = "", escaped = false;
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "{") depth += 1;
    else if (ch === "}" && --depth === 0) return source.slice(open, i + 1);
  }
  throw new Error(`Unclosed ${marker}`);
}

function runData(name) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(read(name), context);
  return context.window;
}

function collectEnglish(value, target = new Set()) {
  if (!value || typeof value !== "object") return target;
  if (typeof value.en === "string") target.add(value.en);
  for (const child of Object.values(value)) collectEnglish(child, target);
  return target;
}

async function translate(text, language) {
  if (!text || /^\d+(?:[–—-]\d+)?(?:\.\d+)?\s*(?:km|h|min)?$/i.test(text)) return text;
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  Object.entries({ client: "gtx", sl: "en", tl: language, dt: "t", q: text }).forEach(([key, value]) => url.searchParams.set(key, value));
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) {
      const body = await response.json();
      return body[0].map((part) => part[0]).join("");
    }
    await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
  }
  throw new Error(`Translation failed: ${language} ${text.slice(0, 50)}`);
}

async function translateMany(strings, language) {
  const entries = [...strings];
  const output = {};
  let cursor = 0;
  const workers = Array.from({ length: 8 }, async () => {
    while (cursor < entries.length) {
      const text = entries[cursor++];
      output[text] = await translate(text, language);
    }
  });
  await Promise.all(workers);
  return output;
}

function mapObject(value, dictionary) {
  if (typeof value === "string") return dictionary[value] || value;
  if (Array.isArray(value)) return value.map((item) => mapObject(item, dictionary));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mapObject(item, dictionary)]));
  return value;
}

const siteSource = read("site-i18n.js");
const site = vm.runInNewContext(`(${extractObject(siteSource, "const translations =")})`);
Object.assign(site.en, vm.runInNewContext(`(${extractObject(siteSource, "Object.assign(translations.en,")})`));
const map = runData("data/translations.js").TRANSLATIONS;
const locations = runData("data/locations.js").LOCATIONS;
const premium = runData("data/premium-route.js");
const moshe = runData("data/moshe-route.js");
const routeStrings = new Set();
[locations, premium.PREMIUM_DAYS, premium.PREMIUM_STOPS, premium.PREMIUM_RECOMMENDATIONS, moshe.PREMIUM_DAYS, moshe.PREMIUM_STOPS, moshe.PREMIUM_RECOMMENDATIONS].forEach((value) => collectEnglish(value, routeStrings));
const allEnglish = new Set([...routeStrings]);
const collectPlain = (value) => {
  if (typeof value === "string") allEnglish.add(value);
  else if (Array.isArray(value)) value.forEach(collectPlain);
  else if (value && typeof value === "object") Object.values(value).forEach(collectPlain);
};
collectPlain(site.en);
collectPlain(map.en);
const premiumUi = vm.runInNewContext(`(${extractObject(read("premium.js"), "const ui =")})`);
collectPlain(premiumUi.en);
collectPlain(premium.PREMIUM_ROUTE_CONFIG?.ui?.en);
collectPlain(moshe.PREMIUM_ROUTE_CONFIG?.ui?.en);

const de = await translateMany(allEnglish, "de");
const cs = await translateMany(allEnglish, "cs");
const generated = `/* Generated from the English source strings. Do not edit by hand. */\n` +
  `window.EXTRA_SITE_TRANSLATIONS=${JSON.stringify({ de: mapObject(site.en, de), cs: mapObject(site.en, cs) }, null, 2)};\n` +
  `window.EXTRA_MAP_TRANSLATIONS=${JSON.stringify({ de: mapObject(map.en, de), cs: mapObject(map.en, cs) }, null, 2)};\n` +
  `window.EXTRA_ROUTE_TRANSLATIONS=${JSON.stringify({ de, cs }, null, 2)};\n`;
fs.writeFileSync(new URL("data/extra-languages.js", root), generated);
console.log(`Generated German and Czech translations for ${allEnglish.size} source strings.`);
