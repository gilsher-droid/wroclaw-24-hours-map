# WROC-LOVE management dashboard

Open `/management/social-analytics/` from the website footer. The dashboard is in English and compares the Hebrew, English, German, Polish and Czech Facebook and Instagram accounts over 7, 28 and 90 days.

The initial dataset was measured on 16 October 2026 through existing Meta Business Suite access. Reporting windows end on 15 October in Pacific Time. This is a measured snapshot, not a live Meta connection. Current follower counts and the public Hebrew group snapshot are distinct from period metrics. The website's GA4 sessions and conversions remain unverified.

The user explicitly approved publishing these measured statistics in the public repository. The dashboard is public. `noindex` discourages indexing but is not authentication. Meta source links still require the viewer's own Meta permissions. No credentials, account tokens, paid connectors or publishing controls are included.

## Use and update

- Select 7, 28 or 90 days. Only the chosen period preference is remembered locally.
- Expand the metric table for viewers, page/profile visits and follows.
- Download the current snapshot as JSON or the selected period as CSV.
- Load an updated JSON snapshot locally. Validation checks channel identity, dates, window lengths, source identifiers and metric values. Invalid imports leave the current data intact. Imports affect only that tab; nothing is uploaded or published.
- To publish an update, replace `snapshot.json`, regenerate `snapshot.js` with the command below, and commit both files through the normal website deployment process. Recheck source definitions, rounding, paid distribution and time zones. Original October audience/content evidence remains explicitly dated and is hidden after a local import.

Run from the repository root:

```sh
node -e 'const fs=require("node:fs");const p="management/social-analytics/";const s=JSON.parse(fs.readFileSync(p+"snapshot.json","utf8"));require("./"+p+"schema.js");WrocSocialSchema.validateSnapshot(s);fs.writeFileSync(p+"snapshot.js","window.WROC_LOVE_SNAPSHOT = "+JSON.stringify(s,null,2)+";\n")'
```

Each channel's `data[days].f` (Facebook) and `.i` (Instagram) contain six values, in order: views, viewers, interactions, link clicks, page/profile visits, and new follows. Use `null` for unavailable values. A string ending in `K` retains the rounded value shown by Meta. English Instagram views exclude the crossposted Facebook component; do not add platform viewers into a combined unique audience.

`build-static.mjs` copies the management directory into the public site artifact. No automatic analytics collection or scheduling is configured. Automatic updates would need a separately authorized, working data connection; a browser login alone does not provide a server-side API connection.
