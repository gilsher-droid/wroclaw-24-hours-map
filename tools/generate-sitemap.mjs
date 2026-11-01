import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const SITE_ORIGIN = "https://wroc-love.com";

const privatePaths = [
  "/management/", "/personal-trips/", "/owner-dashboard/", "/api/",
  "/admin.html", "/access.html", "/checkout.html",
];
const excludedDirectories = new Set(["share", "assets", "data", "sandbox"]);
const excludedPages = new Set(["/personal-trip.html", "/404.html"]);
const escapeXml = value => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
})[character]);

function attributes(tag) {
  return Object.fromEntries(Array.from(tag.matchAll(
    /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g,
  ), ([, key, doubleQuoted, singleQuoted, unquoted]) => [
    key.toLowerCase(), doubleQuoted ?? singleQuoted ?? unquoted,
  ]));
}

function isPrivate(pathname) {
  return privatePaths.some(path => path.endsWith("/")
    ? pathname === path.slice(0, -1) || pathname.startsWith(path)
    : pathname === path);
}

function publicPath(file) {
  const pathname = new URL(file, `${SITE_ORIGIN}/`).pathname;
  return pathname.replace(/\/index\.html$/i, "/");
}

export function sitemapUrlFor(file, html) {
  const pathname = publicPath(file);
  if (isPrivate(pathname) || excludedPages.has(pathname) || /^\/google[\da-f]+\.html$/i.test(pathname)) return null;
  if (file.split("/").some(part => excludedDirectories.has(part))) return null;

  const head = html.split(/<\/head\s*>/i)[0].replace(/<!--[\s\S]*?-->/g, "");
  const meta = Array.from(head.matchAll(/<meta\b[^>]*>/gi), ([tag]) => attributes(tag));
  if (meta.some(item => /^(?:robots|googlebot)$/i.test(item.name || "")
    && /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(item.content || ""))) return null;
  if (meta.some(item => /^refresh$/i.test(item["http-equiv"] || ""))) return null;

  const canonical = Array.from(head.matchAll(/<link\b[^>]*>/gi), ([tag]) => attributes(tag))
    .find(item => (item.rel || "").toLowerCase().split(/\s+/).includes("canonical"));
  const ownUrl = new URL(pathname, SITE_ORIGIN);
  if (canonical) {
    let url;
    try { url = new URL((canonical.href || "").replaceAll("&amp;", "&"), ownUrl); }
    catch { return null; }
    // Do not submit redirect aliases, external canonicals or query variants.
    if (url.origin !== SITE_ORIGIN || url.username || url.password || url.search || url.hash
      || publicPath(url.pathname) !== pathname) return null;
  }
  return ownUrl.href;
}

export async function generateSitemap(clientDirectory) {
  const client = resolve(clientDirectory);
  const urls = new Set();
  async function visit(directory, prefix = "") {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = prefix + entry.name;
      if (entry.isDirectory()) {
        if (!excludedDirectories.has(entry.name) && !isPrivate(`/${file}/`)) {
          await visit(join(directory, entry.name), `${file}/`);
        }
      } else if (entry.isFile() && /\.html$/i.test(entry.name)) {
        const url = sitemapUrlFor(file, await readFile(join(directory, entry.name), "utf8"));
        if (url) urls.add(url);
      }
    }
  }
  await visit(client);
  const sorted = [...urls].sort();
  if (!sorted.length) throw new Error("No public pages found for sitemap");
  if (sorted.length > 50000) throw new Error("Sitemap requires splitting into an index");
  // Omit lastmod: a fresh build timestamp is not the page's modification date.
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + sorted.map(url => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")
    + "\n</urlset>\n";
  if (Buffer.byteLength(xml) > 50 * 1024 * 1024) throw new Error("Sitemap exceeds 50MB");
  const robots = "User-agent: *\nAllow: /\n"
    + privatePaths.map(path => `Disallow: ${path}`).join("\n")
    + `\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
  await writeFile(join(client, "sitemap.xml"), xml);
  await writeFile(join(client, "robots.txt"), robots);
  return sorted;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const urls = await generateSitemap(process.argv[2] || "dist/client");
  console.log(`Generated sitemap.xml and robots.txt for ${urls.length} public pages`);
}
