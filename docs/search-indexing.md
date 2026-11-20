# Public map entry canonical URLs

The homepage, Nearby and Experiences opt in to `public-page-seo.js`. These static
pages translate their content in the browser, so their canonical link is injected
from the selected language, rather than publishing an incorrect static Hebrew
canonical and changing it afterward. Hebrew uses the bare route; the other four
supported languages keep `?lang=...`. Each variant has reciprocal language
alternates and a Hebrew default. The sitemap includes the same five canonical
URLs for each of these three public pages.

Tracking, filter and selected-card parameters do not create canonical pages.
The visitor's URL and deep-link behaviour are unchanged. In-page language changes
update the canonical to match the displayed language. An existing explicit
server-rendered canonical is respected. The helper cannot run on private routes.

Keep the intentional noindex and sitemap exclusions on personal maps, owner and
admin pages, redirect aliases and social-preview entries. A successful live fetch
of the old trip-album compatibility page resolves its former 404; its noindex
does not need removal. Google validation and indexing are separate asynchronous
outcomes and must be verified in Search Console after deployment.

References:
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/specialty/international/localized-versions
