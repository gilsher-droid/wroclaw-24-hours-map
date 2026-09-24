# WROC-LOVE measurement audit and activation guide

Audit date: 24 September 2026. Source: `origin/main` at `0b955bc`, the seven live HTML entry pages at `wroc-love.com`, and the authorized Meta ad account's Events Manager.

## Current state before this change

| Area | Finding |
| --- | --- |
| GA4 / GTM | No Google tag, GA4 Measurement ID, or GTM container in the repository or any of the seven live entry pages. A Google Analytics account is accessible, but no WROC-LOVE web stream or Measurement ID was verified. |
| Meta Pixel / Dataset | No Pixel code or ID on the site. Events Manager for ad account `10203393291738788` shows **No data sources**. |
| Consent | No analytics or marketing consent interface or CMP in the site. The old access cookie code is unrelated and is not shipped in the current public site. |
| Events | No website analytics event dispatcher or custom interaction events. |
| UTMs | `data/cultural-instagram-campaigns.js` builds UTM links for that campaign. Existing language switches generally change only `lang` in the current URL. There is no cross-page attribution storage. |
| Architecture | Static HTML/JavaScript built into `dist/client` and deployed by GitHub Pages from `main`. Six product pages live under `/products/interactive-maps/`. |

## Prepared integration

The new WROC-LOVE GA4 property and web stream use Measurement ID `G-6FWP69HHWG`. Enhanced Measurement is disabled to avoid automatic duplicate events; `analytics.js` sends one manual page view. `analytics-config.js` contains that verified ID and the WROC-LOVE Website Meta Pixel ID `906515755669709`, obtained from Events Manager. Dataset settings show the intended ad account `10203393291738788` has access. The broad Conversions API option was turned off during dataset creation; this site uses the browser Pixel only. Automatic Advanced Matching and automatic website events are off, and the extra automatic page/product detail collection was turned off.

`analytics.js` is loaded on the homepage, the six map product pages, and the privacy page. The site's `consent.js` presents analytics consent in HE/EN/PL/DE/CS, with equal access to rejection and acceptance, and a persistent settings button for withdrawal. The marketing choice appears only when a verified Meta Pixel ID is configured. Consent is denied by default. The choice is stored locally for up to 180 days; no provider script loads until its relevant category is granted. On withdrawal, subsequent events stop and first-party GA/Meta cookies and session attribution are cleared where the browser permits. Enabling the Pixel switches to a new consent-storage key, prompting visitors again rather than treating an earlier GA-only choice as marketing consent.

The module sends one manual GA4 `page_view` per page, with automatic page views disabled, and one `map_open` per product page. With marketing consent, Meta receives one `PageView` and one product `ViewContent`. It does not send Purchase or Lead. Other events go to GA4 only. All event calls are dropped without the relevant consent. The module does not create a visitor identifier or fingerprint.

| Event | Trigger | Key parameters |
| --- | --- | --- |
| `page_view` | Initial page after analytics consent | `language`, sanitized `page_location`, UTM context |
| `interactive_maps_click` | Internal link to a map product | `source_surface`, `target_product`, `language`, UTM context |
| `map_open` | Product page after analytics consent | `product_id`, `language`, UTM context |
| `place_open` | User opens a map marker or place card | `canonical_place_id`, `product_id`, `language`, UTM context |
| `experience_open` | User opens a referenced route experience or cultural area experience | `canonical_experience_id`, `product_id`, `language`, UTM context |
| `news_ticker_click` | User opens a ticker item | `news_id`, `category`, related canonical IDs when present, `language` |
| `outbound_link_click` | User opens an external link | `destination_domain`, `link_type`, canonical place ID when present, `language` |

The exact product IDs come from the catalog: `wroclaw-24-hours`, `wroclaw-four-days`, `wroclaw-christmas`, `lifestyle-guide`, `lower-silesia-excursions`, and `cultural-adventure`. Some product pages do not have a separate place or experience opening interaction; those events are emitted only where a real user action exists.

GA4 receives both `language` and `site_language` with the current site language. Use the event-scoped `site_language` custom dimension for reporting; GA4's built-in `language` field is treated specially and did not appear as a normal event parameter in DebugView.

The GA4 property has event-scoped custom dimensions for `site_language`, `product_id`, `canonical_place_id`, and `canonical_experience_id`. Dimension values can take time to appear in standard reports. Standard UTM values support traffic-acquisition reports; the custom events can be inspected immediately in DebugView.

UTM source, medium, campaign, content, and term are read from the landing URL. After analytics consent, the current campaign context is kept in session storage for internal navigation and language changes. Internal links do not receive repeatedly appended UTMs. The `page_location` sent to GA4 contains only the path, `lang`, and standard UTM keys; unrelated query parameters and fragments are omitted. External destination URLs are never sent, only their domains. A local `?analytics_debug=1` flag logs custom events to the browser console on `localhost` or `127.0.0.1` only.

## Consent and Meta activation

The GA4-only release went live first with the Meta Pixel ID set to null. In that state the Meta script could not load and the marketing choice was hidden. The later Pixel activation changes the consent-storage key from v1 to v2, so every visitor is prompted again and an earlier GA-only choice never grants marketing consent. The five-language privacy notice and contact details (`Gil Sher`, `gil.sher@gmail.com`) should remain accurate for the site operator.

After explicit marketing consent, verify `PageView` and `ViewContent` in Meta Test Events on the public site. Meta cannot show a test event before a consented visit. The Pixel must remain associated with the intended ad account for ad reporting.

In a consented local preview, GA4 DebugView displayed one `page_view` and one `map_open` for the tested map page, plus `place_open` and `experience_open` after the corresponding interactions. The `map_open` parameters included `product_id`, `site_language=de`, and campaign UTM values. Meta Test Events also marked `PageView` and `ViewContent` as processed from the local cultural map after a separate marketing-only consent choice. Test production traffic after deployment.

## Verification after activation

1. In a fresh browser session, visit a Facebook-tagged URL such as `https://wroc-love.com/?lang=he&utm_source=facebook&utm_medium=paid_social&utm_campaign=wroclaw-water-tower-maps&utm_content=water-tower-he-facebook`. Decline consent and confirm there are no GA4 or Meta tag requests. Grant analytics and confirm one `page_view` in GA4 DebugView with Hebrew and the campaign values. Grant marketing and confirm one `PageView` in Meta Test Events.
2. Repeat with `utm_source=instagram` and a suitable `utm_content` value. Confirm that GA4 source/medium and campaign distinguish the two visits. Do not use the same live session to test first-touch attribution for both sources.
3. Click a product link. Confirm one `interactive_maps_click`, then one `map_open` with the catalog product ID. Open a marker/card and confirm one `place_open` with a canonical place ID. On the four-day or cultural product, open an experience and confirm `experience_open` with the registry ID.
4. Switch language and confirm subsequent events use the new `language` value while the same session's campaign context remains available. Check all five languages on desktop and mobile.
5. In Meta Ads Manager, compare impressions, link clicks, landing page views, CTR, CPC, and cost per landing page view. In GA4, compare users, sessions, source/medium, campaign, landing page, and the custom events. Expect platform counts to differ because of consent, blockers, and attribution methods.
