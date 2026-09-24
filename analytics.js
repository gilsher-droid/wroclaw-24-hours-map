(function () {
  "use strict";

  if (window.WROC_ANALYTICS) return;

  const config = window.WROC_ANALYTICS_CONFIG || {};
  const gaId = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || "") ? config.ga4MeasurementId : null;
  const pixelId = /^\d+$/.test(config.metaPixelId || "") ? config.metaPixelId : null;
  const productByPage = Object.freeze({
    "map.html": "wroclaw-24-hours",
    "premium.html": "wroclaw-four-days",
    "moshe.html": "wroclaw-christmas",
    "lifestyle.html": "lifestyle-guide",
    "excursions.html": "lower-silesia-excursions",
    "cultural.html": "cultural-adventure",
  });
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const allowedEvents = new Set([
    "interactive_maps_click", "map_open", "place_open", "experience_open",
    "news_ticker_click", "outbound_link_click",
  ]);
  const consent = { analytics: false, marketing: false };
  const sent = { gaPage: false, gaMap: false, pixelPage: false, pixelMap: false };
  const debug = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && new URLSearchParams(location.search).get("analytics_debug") === "1";
  let gaLoaded = false;
  let pixelLoaded = false;

  function language() {
    const current = document.documentElement.lang?.toLowerCase();
    if (["he", "en", "pl", "de", "cs"].includes(current)) return current;
    const query = new URLSearchParams(location.search).get("lang");
    return ["he", "en", "pl", "de", "cs"].includes(query) ? query : "he";
  }

  function productId(url = location) {
    if (!url.pathname.startsWith("/products/interactive-maps/")) return null;
    return productByPage[url.pathname.split("/").pop()] || null;
  }

  function incomingAttribution() {
    const params = new URLSearchParams(location.search);
    const attribution = {};
    for (const key of utmKeys) {
      const value = params.get(key)?.trim();
      if (value) attribution[key] = value.slice(0, 100);
    }
    return attribution;
  }

  function attribution() {
    const incoming = incomingAttribution();
    if (Object.keys(incoming).length) {
      if (consent.analytics) {
        try { sessionStorage.setItem("wroc-analytics-attribution", JSON.stringify(incoming)); } catch (_) { /* storage may be unavailable */ }
      }
      return incoming;
    }
    if (!consent.analytics) return {};
    try {
      const stored = JSON.parse(sessionStorage.getItem("wroc-analytics-attribution") || "{}");
      return Object.fromEntries(utmKeys.filter((key) => typeof stored[key] === "string").map((key) => [key, stored[key]]));
    } catch (_) { return {}; }
  }

  function context() {
    return { language: language(), site_language: language(), ...(productId() ? { product_id: productId() } : {}), ...attribution() };
  }

  function safePageLocation() {
    const url = new URL(location.href);
    for (const key of [...url.searchParams.keys()]) {
      if (key !== "lang" && !utmKeys.includes(key)) url.searchParams.delete(key);
    }
    url.hash = "";
    return url.href;
  }

  function loadGa() {
    if (!gaId || gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("config", gaId, { send_page_view: false, page_location: safePageLocation(), ...(debug ? { debug_mode: true } : {}) });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);
  }

  function loadPixel() {
    if (!pixelId || pixelLoaded) return;
    pixelLoaded = true;
    if (!window.fbq) {
      const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      window.fbq = fbq;
    }
    window.fbq("init", pixelId);
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  function emitInitialEvents() {
    const base = context();
    if (consent.analytics && gaId) {
      loadGa();
      if (!sent.gaPage) {
        window.gtag("event", "page_view", { ...base, page_location: safePageLocation(), send_to: gaId });
        sent.gaPage = true;
      }
      if (base.product_id && !sent.gaMap) {
        window.gtag("event", "map_open", { ...base, send_to: gaId });
        sent.gaMap = true;
      }
    }
    if (consent.marketing && pixelId) {
      loadPixel();
      if (!sent.pixelPage) { window.fbq("track", "PageView"); sent.pixelPage = true; }
      if (base.product_id && !sent.pixelMap) {
        window.fbq("track", "ViewContent", { content_ids: [base.product_id], content_type: "product" });
        sent.pixelMap = true;
      }
    }
  }

  function setConsent(next) {
    if (!next || typeof next !== "object") return;
    const previous = { ...consent };
    consent.analytics = next.analytics === true;
    consent.marketing = next.marketing === true;
    if (gaLoaded) window.gtag("consent", "update", { analytics_storage: consent.analytics ? "granted" : "denied" });
    if (pixelLoaded) window.fbq("consent", consent.marketing ? "grant" : "revoke");
    if ((previous.analytics && !consent.analytics) || (previous.marketing && !consent.marketing)) {
      if (previous.analytics && !consent.analytics) {
        try { sessionStorage.removeItem("wroc-analytics-attribution"); } catch (_) { /* storage may be unavailable */ }
      }
      if (typeof document.cookie === "string") {
        for (const entry of document.cookie.split(";")) {
          const name = entry.trim().split("=")[0];
          if ((previous.analytics && !consent.analytics && /^_ga(?:_|$)/.test(name)) ||
              (previous.marketing && !consent.marketing && /^_fb[pc]$/.test(name))) {
            for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${location.hostname}`]) {
              document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
            }
          }
        }
      }
    }
    emitInitialEvents();
  }

  function track(eventName, parameters = {}) {
    if (!allowedEvents.has(eventName)) return false;
    const safe = {};
    for (const [key, value] of Object.entries(parameters)) {
      if (/^[a-z][a-z0-9_]*$/.test(key) && (typeof value === "string" || typeof value === "number")) safe[key] = String(value).slice(0, 100);
    }
    if (consent.analytics && gaId) {
      loadGa();
      window.gtag("event", eventName, { ...context(), ...safe, send_to: gaId });
    }
    if (debug) console.info("[WROC analytics]", eventName, { ...context(), ...safe });
    return consent.analytics && Boolean(gaId);
  }

  function trackLink(link) {
    if (!link?.href) return;
    const target = new URL(link.href, location.href);
    const targetProduct = productId(target);
    if (target.origin === location.origin && targetProduct) {
      track("interactive_maps_click", {
        source_surface: link.closest("#wroc-now-in-wroclaw") ? "news_ticker" : link.closest(".site-product-navigation") ? "product_navigation" : productId() ? "map_product" : Object.keys(incomingAttribution()).length ? "campaign_landing" : "homepage",
        target_product: targetProduct,
      });
      return;
    }
    if (target.origin === location.origin || !/^https?:$/.test(target.protocol)) return;
    const ticker = link.closest("#wroc-now-in-wroclaw");
    if (ticker) {
      track("news_ticker_click", {
        news_id: link.dataset.newsId || "",
        category: link.dataset.newsCategory || "",
        related_canonical_place_id: link.dataset.canonicalPlaceId || "",
        related_canonical_experience_id: link.dataset.canonicalExperienceId || "",
      });
    }
    const domain = target.hostname.toLowerCase();
    const social = /(^|\.)(facebook|instagram)\.com$/.test(domain);
    track("outbound_link_click", {
      destination_domain: domain,
      link_type: social ? "social" : /(^|\.)(google\.com|maps\.app\.goo\.gl)$/.test(domain) ? "navigation" : "official_site",
      canonical_place_id: link.closest("[data-canonical-place-id]")?.dataset.canonicalPlaceId || link.closest("[data-place]")?.dataset.place || "",
    });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (link) trackLink(link);
  }, true);

  window.WROC_ANALYTICS = Object.freeze({ setConsent, track, context, status: () => ({ ...consent, gaConfigured: Boolean(gaId), pixelConfigured: Boolean(pixelId) }) });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", emitInitialEvents, { once: true });
  else emitInitialEvents();
})();
