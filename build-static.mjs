import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const client = resolve(root, "dist/client");
const server = resolve(root, "dist/server");

await rm(resolve(root, "dist"), { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await mkdir(resolve(client, "data"), { recursive: true });
await mkdir(resolve(client, "assets"), { recursive: true });

for (const file of [
  "index.html",
  "styles.css",
  "map.html",
  "map-styles.css",
  "app.js",
  "access.html",
  "access.css",
  "access.js",
  "checkout.html",
  "checkout.js",
  "premium.html",
  "premium.css",
  "premium.js",
  "admin.html",
  "admin.js",
]) {
  await cp(resolve(root, file), resolve(client, file));
}
await cp(resolve(root, "data"), resolve(client, "data"), { recursive: true });
await cp(resolve(root, "assets"), resolve(client, "assets"), { recursive: true });
await writeFile(resolve(client, ".nojekyll"), "");

await cp(resolve(root, "worker/site-worker.js"), resolve(server, "index.js"));

console.log("Static site built in dist/");
