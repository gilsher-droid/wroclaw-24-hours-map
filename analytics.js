(function () {
  "use strict";

  if (window.WROC_ANALYTICS) return;

  const config = window.WROC_ANALYTICS_CONFIG || {};
  const testing = new URLSearchParams(location.search).get("analytics_test") === "1";
  const gaId = !testing && /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || "") ? config.ga4MeasurementId : null;
  const pixelId = !testing && /^\d+$/.test(config.metaPixelId || "") ? config.metaPixelId : null;
  const productByPage = Object.freeze({
    "map.html": "wroclaw-24-hours",
    "premium.html": "wroclaw-four-days",
    "moshe.html": "wroclaw-christmas",
    "lifestyle.html": "lifestyle-guide",
    "excursions.html": "lower-silesia-excursions",
    "cultural.html": "cultural-adventure",
    "guides.html": "guided-city-map",
  });
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const allowedEvents = new Set([
    "interactive_maps_click", "map_open", "place_open", "experience_open",
    "news_ticker_click", "outbound_link_click",
    "page_view", "place_impression", "photo_open", "photo_view", "video_open", "guide_open",
    "video_start", "video_progress", "video_complete", "ai_open", "ai_service_click",
    "nearby_open", "nearby_search", "navigation_click", "social_click", "booking_click",
    "personal_map_request", "community_submit", "place_save",
  ]);
  const collector = config.firstPartyEndpoint === "https://api.wroc-love.com/place-events/" ? config.firstPartyEndpoint : null;
  const publicHost = /^(www\.)?wroc-love\.com$/.test(location.hostname);
  const query = new URLSearchParams(location.search);
  let excluded = false;
  try {
    if (query.get("analytics_exclude") === "1") sessionStorage.setItem("wroc-analytics-exclude", "1");
    if (query.get("analytics_exclude") === "0") sessionStorage.removeItem("wroc-analytics-exclude");
    excluded = sessionStorage.getItem("wroc-analytics-exclude") === "1";
  } catch (_) { excluded = query.get("analytics_exclude") === "1"; }
  const queue = [];
  let flushTimer;
  function flush() {
    if (!consent.analytics || excluded) { queue.length = 0; return; }
    if (!collector || !publicHost || !queue.length || typeof window.fetch !== "function") return;
    const batch = queue.splice(0, 20);
    window.fetch(collector, { method: "POST", mode: "cors", credentials: "omit", keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ version: 1, consent: true, test: query.get("analytics_test") === "1", events: batch }),
    }).catch(() => {});
  }
  function collect(event, parameters) {
    if (!collector || !publicHost || !consent.analytics || excluded) return;
    const fields = ["canonical_place_id", "canonical_experience_id", "product_id", "site_language", "source_surface", "link_type", "provider", "media_kind", "video_percent", "category", "radius_band", "traffic_source"];
    const row = { event };
    for (const key of fields) if (parameters[key] !== undefined) row[key] = parameters[key];
    queue.push(row);
    if (queue.length >= 20) flush();
    else if (!flushTimer && typeof window.setTimeout === "function") flushTimer = window.setTimeout(() => { flushTimer = null; flush(); }, 1000);
  }
  const consent = { analytics: false, marketing: false };
  const sent = { gaPage: false, gaMap: false, gaPlace: false, pixelPage: false, pixelMap: false };
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

  function selectedGuidePlace() {
    if (productId() !== "guided-city-map") return null;
    const id = new URLSearchParams(location.search).get("place");
    return id && /^[a-z0-9-]{1,100}$/.test(id) && document.getElementById?.("guided-place-" + id)?.dataset.canonicalPlaceId === id ? id : null;
  }

  function context() {
    const path = location.pathname.split("/").pop();
    const surface = path === "nearby.html" ? "nearby" : path === "experiences.html" ? "experiences" : path === "personal-trip.html" ? "personal_trip" : productId() ? "map" : "website";
    const traffic = attribution().utm_source?.toLowerCase();
    return { ...(selectedGuidePlace() ? { canonical_place_id: selectedGuidePlace() } : {}), language: language(), site_language: language(), source_surface: surface, traffic_source: ["facebook", "instagram", "google", "bing", "youtube"].includes(traffic) ? traffic : traffic ? "other" : "direct", ...(productId() ? { product_id: productId() } : {}), ...attribution() };
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
    if (excluded) return;
    const base = context();
    if (consent.analytics && (gaId || collector)) {
      if (gaId) loadGa();
      if (!sent.gaPage) {
        track("page_view", { page_location: safePageLocation() });
        sent.gaPage = true;
      }
      if ((base.product_id || ["nearby", "experiences"].includes(base.source_surface)) && !sent.gaMap) {
        track("map_open");
        sent.gaMap = true;
      }
      if (selectedGuidePlace() && !sent.gaPlace) {
        track("place_open", { canonical_place_id: selectedGuidePlace(), source_surface: "guided_map_deeplink" });
        sent.gaPlace = true;
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
    if (!consent.analytics) queue.length = 0;
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
    if (typeof window.dispatchEvent === "function" && typeof CustomEvent === "function") window.dispatchEvent(new CustomEvent("wroc:analytics-consent"));
  }

  function track(eventName, parameters = {}) {
    if (excluded || !allowedEvents.has(eventName)) return false;
    const safe = {};
    for (const [key, value] of Object.entries(parameters)) {
      if (/^(canonical_place_id|canonical_experience_id|product_id|target_product|source_surface|destination_domain|link_type|news_id|category|related_canonical_place_id|related_canonical_experience_id|provider|media_kind|video_percent|radius_band|page_location)$/.test(key) && (typeof value === "string" || typeof value === "number")) safe[key] = String(value).slice(0, key === "page_location" ? 2000 : 100);
    }
    collect(eventName, { ...context(), ...safe });
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
      canonical_place_id: window.WROC_TELEMETRY?.placeFor(link) || link.closest("[data-canonical-place-id]")?.dataset.canonicalPlaceId || link.closest("[data-place]")?.dataset.place || "",
    });
    const canonical = window.WROC_TELEMETRY?.placeFor(link);
    const kind = social ? "social_click" : /(^|\.)(google\.com|maps\.app\.goo\.gl|maps\.apple\.com)$/.test(domain) ? "navigation_click" : /(^|\.)(booking\.com|getyourguide\.com|tiqets\.com|ticketmaster\.[a-z.]+)$/.test(domain) ? "booking_click" : null;
    if (kind) track(kind, { canonical_place_id: canonical || "", provider: social ? domain.includes("instagram") ? "instagram" : "facebook" : "", link_type: kind.replace("_click", "") });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (link) trackLink(link);
  }, true);

  window.addEventListener?.("pagehide", flush);
  window.WROC_ANALYTICS = Object.freeze({ setConsent, track, context, flush, status: () => ({ ...consent, excluded, gaConfigured: Boolean(gaId), pixelConfigured: Boolean(pixelId) }) });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", emitInitialEvents, { once: true });
  else emitInitialEvents();
})();
