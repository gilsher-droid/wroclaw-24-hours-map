import { createHash } from "node:crypto";

export function versionScriptUrls(html, scripts) {
  const versions = new Map(scripts.map(([url, content]) => [url, createHash("sha256").update(content).digest("hex").slice(0, 16)]));
  return html.replace(/(<script\b[^>]*\bsrc=")([^"?]+)(?:\?[^" ]*)?("[^>]*>)/g, (match, before, url, after) => versions.has(url) ? `${before}${url}?v=${versions.get(url)}${after}` : match);
}
