import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import vm from "node:vm";
import { generateSitemap, sitemapUrlsFor } from "../tools/generate-sitemap.mjs";

const script = await readFile(new URL("../public-page-seo.js", import.meta.url), "utf8");
const languages = ["he", "en", "pl", "de", "cs"];
const routes = ["/", "/nearby.html", "/experiences.html"];
function page(href, existing = []) {
  const elements = existing;
  const handlers = new Map();
  const element = attributes => ({
    attributes: { ...attributes },
    setAttribute(key, value) { this.attributes[key] = value; },
    hasAttribute(key) { return Object.hasOwn(this.attributes, key); },
  });
  const head = {
    appendChild(node) { elements.push(node); },
    querySelector(selector) {
      const filters = [...selector.matchAll(/\[([^=]+)="([^"]*)"\]/g)];
      return elements.find(node => filters.every(([, key, value]) => node.attributes[key] === value)) || null;
    },
  };
  const location = new URL(href);
  const context = {
    URL, URLSearchParams, location,
    document: { head, createElement: () => element({}), addEventListener: (name, fn) => handlers.set(name, fn) },
    window: { addEventListener: (name, fn) => handlers.set(name, fn) },
  };
  vm.runInNewContext(script, context);
  return { elements, handlers, context, head, element };
}
const canonical = state => state.head.querySelector('link[rel="canonical"]').attributes.href;

test("all reported public routes have one same-language canonical, matching the sitemap", () => {
  for (const route of routes) for (const language of languages) {
    const href = `https://wroc-love.com${route}?lang=${language}&utm_campaign=paid&place=rynek#map`;
    const state = page(href);
    const expected = `https://wroc-love.com${route}${language === "he" ? "" : `?lang=${language}`}`;
    assert.equal(canonical(state), expected);
    assert.equal(state.context.location.href, href, "visitor navigation and attribution remain untouched");
    assert.equal(state.elements.filter(x => x.attributes.rel === "canonical").length, 1);
    assert.deepEqual(sitemapUrlsFor(route === "/" ? "index.html" : route.slice(1), '<head><script data-public-page-seo src="/public-page-seo.js?v=hash"></script></head>'),
      languages.map(code => `https://wroc-love.com${route}${code === "he" ? "" : `?lang=${code}`}`));
  }
});

test("language alternates are reciprocal and include self and a default", () => {
  for (const language of languages) {
    const state = page(`https://wroc-love.com/nearby.html?lang=${language}`);
    const alternates = state.elements.filter(x => x.attributes.rel === "alternate");
    assert.equal(alternates.length, 6);
    for (const code of languages) assert.equal(alternates.find(x => x.attributes.hreflang === code).attributes.href,
      `https://wroc-love.com/nearby.html${code === "he" ? "" : `?lang=${code}`}`);
    assert.equal(alternates.find(x => x.attributes.hreflang === "x-default").attributes.href, "https://wroc-love.com/nearby.html");
  }
});

test("language changes and history navigation update one canonical without adding duplicates", () => {
  const state = page("https://wroc-love.com/?lang=he");
  state.handlers.get("wroc-language-change")({ detail: { language: "pl" } });
  assert.equal(canonical(state), "https://wroc-love.com/?lang=pl");
  state.context.location.search = "?lang=de&utm_source=facebook";
  state.handlers.get("popstate")();
  assert.equal(canonical(state), "https://wroc-love.com/?lang=de");
  vm.runInNewContext(script, state.context);
  assert.equal(state.elements.length, 7);
});

test("unknown language and index alias normalize without copying filters, fragments or tracking", () => {
  assert.equal(canonical(page("https://wroc-love.com/index.html?lang=invalid&next=https://example.com#private")), "https://wroc-love.com/");
  assert.equal(canonical(page("https://wroc-love.com/experiences.html?lang=he&experience=ostrow-tumski-lamplighter")), "https://wroc-love.com/experiences.html");
});

test("private routes and explicit server canonicals are never rewritten", () => {
  for (const route of ["/personal-trip.html", "/owner-dashboard/", "/management/social-analytics/", "/trip-album.html", "/share/he/home.html"]) {
    assert.equal(page(`https://wroc-love.com${route}?lang=en`).elements.length, 0);
  }
  const existing = { attributes: { rel: "canonical", href: "https://wroc-love.com/" }, hasAttribute() { return false; } };
  const state = page("https://wroc-love.com/?lang=en", [existing]);
  assert.equal(canonical(state), "https://wroc-love.com/");
  assert.equal(state.elements.length, 1);
});

test("opt-in is explicit and cannot include private or noindex pages in a sitemap", () => {
  const marker = '<script src="/public-page-seo.js" data-public-page-seo></script>';
  assert.deepEqual(sitemapUrlsFor("index.html", `<head><!-- ${marker} --></head>`), ["https://wroc-love.com/"]);
  assert.deepEqual(sitemapUrlsFor("index.html", `<head><meta name="robots" content="noindex">${marker}</head>`), []);
  assert.deepEqual(sitemapUrlsFor("personal-trip.html", `<head>${marker}</head>`), []);
});

test("the three actual page heads opt in and their metadata script is shipped and versioned", async () => {
  for (const file of ["index.html", "nearby.html", "experiences.html"]) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    const head = html.split("</head>")[0];
    assert.match(head, /<script src="\/public-page-seo\.js" data-public-page-seo><\/script>/);
    assert.doesNotMatch(head, /rel=["']canonical["']/);
  }
  const build = await readFile(new URL("../build-static.mjs", import.meta.url), "utf8");
  assert.match(build, /"public-page-seo\.js"/);
  assert.match(build, /"\/public-page-seo\.js"/);
});

test("built sitemap includes all fifteen public canonical variants and no selected-card URLs", async () => {
  const root = await mkdtemp(join(tmpdir(), "wroc-public-seo-"));
  // Temp fixtures contain only these small public HTML files.
  try {
    for (const file of ["index.html", "nearby.html", "experiences.html"]) {
      await writeFile(join(root, file), await readFile(new URL(`../${file}`, import.meta.url), "utf8"));
    }
    const urls = await generateSitemap(root);
    assert.equal(urls.length, 15);
    assert.equal(new Set(urls).size, 15);
    assert.ok(urls.includes("https://wroc-love.com/nearby.html?lang=en"));
    assert.ok(urls.includes("https://wroc-love.com/experiences.html"));
    assert.ok(urls.every(url => !/experience=|place=|utm_|#/.test(url)));
  } finally {
    const { rm } = await import("node:fs/promises");
    await rm(root, { recursive: true, force: true });
  }
});
