import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const artifact = resolve(root, "dist/client");

const requiredFiles = [
  "data/place-catalog.js",
  "data/locations.js",
  "data/premium-route.js",
  "data/moshe-route.js",
  "data/lifestyle-places.js",
  "data/lower-silesia-excursions.js",
];

for (const relativePath of requiredFiles) {
  const absolutePath = resolve(artifact, relativePath);
  const file = await stat(absolutePath).catch(() => null);
  if (!file?.isFile() || file.size === 0) {
    throw new Error(`Pages artifact is missing required canonical asset: ${relativePath}`);
  }
}

const pages = [
  ["products/interactive-maps/map.html", "data/locations.js"],
  ["products/interactive-maps/premium.html", "data/premium-route.js"],
  ["products/interactive-maps/moshe.html", "data/moshe-route.js"],
  ["products/interactive-maps/lifestyle.html", "data/lifestyle-places.js"],
  ["products/interactive-maps/excursions.html", "data/lower-silesia-excursions.js"],
];

for (const [pagePath, routeDataPath] of pages) {
  const html = await readFile(resolve(artifact, pagePath), "utf8");
  const catalogIndex = html.indexOf('/data/place-catalog.js');
  const routeDataIndex = html.indexOf(`/${routeDataPath}`);

  if (catalogIndex === -1) {
    throw new Error(`${pagePath} does not reference /data/place-catalog.js`);
  }
  if (routeDataIndex === -1) {
    throw new Error(`${pagePath} does not reference /${routeDataPath}`);
  }
  if (catalogIndex > routeDataIndex) {
    throw new Error(`${pagePath} loads the canonical catalog after its route data`);
  }
}

console.log("Pages artifact verified: canonical catalog assets are present, non-empty, and ordered correctly.");
