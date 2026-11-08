# Business analytics contract

`Presenting to` defaults to **All businesses**. Business and canonical-place filters apply to authenticated first-party event counters, never to the website-wide GA4 cards or geographic layers.

## Classification

`tools/business-place-mapping.mjs` reads structured canonical `categories`, `placeType`, and `dining.venueTypes`. It never reads place names or descriptions. The generated collector catalog retains classification evidence, unclassified IDs, and multi-category IDs. Broad `eat`, `drink`, `sleep`, `dessert`, and `museums-history` labels are insufficient. Missing explicit ice-cream classification means unavailable classification, not zero demand. All includes unclassified places and non-business sights. Overlapping categories must not be added together.

## Events and dimensions

Existing consent-controlled `analytics.js` sends canonical place ID, canonical experience ID, map `product_id`, site language, surface, coarse tagged traffic source, link type, media kind, category and provider when applicable. The anonymous first-party collector validates and aggregates them. It does not retain user identifiers, country or campaign attribution. Private customer maps are excluded.

- `map_open`: website/map activity; a deep-link place context never makes this a business opening.
- `place_impression`: a place card visible at least 25% for 600 ms; once per canonical place per page.
- `place_open`: opening the place experience/card.
- `outbound_link_click`: outbound action, including navigation.
- `navigation_click`: navigation action; do not add it to outbound clicks.

GA4 event-scoped definitions for `canonical_place_id`, `canonical_experience_id`, `product_id` and `site_language` were verified in the native property interface on 8 November 2026. `category` was not registered. Property 555641784 and measurement G-6FWP69HHWG were verified against the website stream. Registration is not proof that every historical event included a value. Place-filtered GA4 user/country/source/campaign reports are not imported by this module. First-party counters cannot supply deduplicated users. Do not sum per-place users to invent a category user count.

## Windows and missing data

`place-report?view=business` serves complete Europe/Warsaw calendar dates for 7/28/90 days and the immediately preceding non-overlapping window. The presentation anchors these to the latest imported GA4 cutoff and labels the separate timezones and collection dates. A period total requires recorded daily files throughout the window and a start after the initial partial collection day. Missing history/files are unavailable, not zero. Actual recorded subsets are available separately and explicitly labelled partial. Historical globe layers keep their original dates.

The first verified retained counter event is 4 November 2026; 5 November is the first potentially complete calendar day. Protected `business-coverage.json` preserves this observation after file retention rolls over, without inventing missing history. There is no automatic refresh schedule or new GA4 configuration. Existing counter retention limits comparisons.

## Deployment and verification

The private `website.js` contains owner snapshots and must never be committed. `tools/patch-business-presentation.py` accepts a freshly backed-up private readback, checks version anchors, and appends the generic module. Install the patched private script, `business-analytics.php`, the existing authenticated report controller, generated catalog, and private coverage metadata. Keep owner authentication and refreshed snapshots intact. Preserve all affected originals before replacement.

Run `python3 tests/business-analytics.test.py`, the existing collector tests, and the mapping tests. Fixtures cover independent category/place/language/map filters, overlaps, complete comparisons, missing versus zero, malformed data, and exclusion of `test-*` counters. A controlled live check uses the existing `analytics_test=1` mode, with consent, and verifies one canonical `place_open` in test counters. This mode disables GA4/Meta delivery and never enters production business totals. Keep private receipts and screenshots outside public Git.

These are online interactions, not physical visits, reservations, purchases, or paying customers.
