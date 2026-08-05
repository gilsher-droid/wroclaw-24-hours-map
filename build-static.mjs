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

for (const file of ["index.html", "styles.css", "app.js"]) {
  await cp(resolve(root, file), resolve(client, file));
}
await cp(resolve(root, "data"), resolve(client, "data"), { recursive: true });
await cp(resolve(root, "assets"), resolve(client, "assets"), { recursive: true });
await writeFile(resolve(client, ".nojekyll"), "");

await writeFile(resolve(server, "index.js"), `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    const url = new URL(request.url);
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  }
};\n`);

console.log("Static site built in dist/");
