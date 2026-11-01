import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { generateSitemap, sitemapUrlFor } from "../tools/generate-sitemap.mjs";

test("public file URLs honor canonical pages and indexing directives", () => {
  assert.equal(sitemapUrlFor("index.html", "<head></head>"), "https://wroc-love.com/");
  assert.equal(sitemapUrlFor("news/index.html", ""), "https://wroc-love.com/news/");
  assert.equal(sitemapUrlFor("news/de.html", '<link href="/news/de.html" rel="canonical">'), "https://wroc-love.com/news/de.html");
  for (const head of [
    '<meta content="follow, noindex" name="robots">',
    "<META NAME='GOOGLEBOT' CONTENT='none'>",
    '<meta http-equiv="Refresh" content="0; url=/">',
    '<link rel="canonical" href="https://example.com/">',
    '<link rel="canonical" href="/different.html">',
    '<link rel="canonical" href="/news/de.html?lang=de">',
  ]) assert.equal(sitemapUrlFor("news/de.html", `<head>${head}</head>`), null, head);
  assert.equal(sitemapUrlFor("news/de.html", '<!-- <meta name="robots" content="noindex"> -->'), "https://wroc-love.com/news/de.html");
});

test("build output yields deterministic public-only XML and crawl instructions", async t => {
  const root = await mkdtemp(join(tmpdir(), "wroc-sitemap-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const files = {
    "index.html": "<head></head>",
    "products/interactive-maps/map.html": "<head></head>",
    "news/2026-11-01-de.html": "<html lang=de><head></head></html>",
    "news/a&b.html": "<head></head>",
    "map.html": '<meta http-equiv="refresh" content="0; url=/products/interactive-maps/map.html">',
    "hidden.html": '<meta name="robots" content="noindex">',
    "management/social-analytics/index.html": "private",
    "personal-trips/customer/index.html": "private",
    "owner-dashboard/index.html": "private",
    "api/customer.html": "private",
    "admin.html": "private", "access.html": "login", "checkout.html": "checkout",
    "personal-trip.html": "request form", "404.html": "error",
    "google0123456789abcdef.html": "google-site-verification: public verification file",
    "share/he/home.html": "preview", "assets/example.html": "asset",
    "data/example.html": "data", "sandbox/example.html": "private",
  };
  for (const [file, html] of Object.entries(files)) {
    await mkdir(dirname(join(root, file)), { recursive: true });
    await writeFile(join(root, file), html);
  }
  await symlink(join(root, "admin.html"), join(root, "linked.html"));
  const expected = ["https://wroc-love.com/", "https://wroc-love.com/news/2026-11-01-de.html",
    "https://wroc-love.com/news/a&b.html", "https://wroc-love.com/products/interactive-maps/map.html"];
  assert.deepEqual(await generateSitemap(root), expected);
  const xml = await readFile(join(root, "sitemap.xml"), "utf8");
  assert.match(xml, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  assert.match(xml, /news\/a&amp;b\.html/);
  assert.doesNotMatch(xml, /lastmod|management|personal-trip|checkout|share\/|hidden|linked/);
  const robots = await readFile(join(root, "robots.txt"), "utf8");
  assert.match(robots, /^User-agent: \*\nAllow: \/\n/);
  assert.match(robots, /Disallow: \/management\//);
  assert.match(robots, /Sitemap: https:\/\/wroc-love\.com\/sitemap\.xml\n$/);
  assert.doesNotMatch(robots, /Disallow: \/(?:assets|data)\//);
  assert.deepEqual(await generateSitemap(root), expected);
  assert.equal(await readFile(join(root, "sitemap.xml"), "utf8"), xml);
  await writeFile(join(root, "news/new.html"), "<head></head>");
  assert.equal((await generateSitemap(root)).length, expected.length + 1);
});

test("an empty output fails instead of publishing an empty sitemap", async t => {
  const root = await mkdtemp(join(tmpdir(), "wroc-sitemap-empty-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await assert.rejects(generateSitemap(root), /No public pages/);
});
