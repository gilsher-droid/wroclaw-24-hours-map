(function () {
  "use strict";

  const API_ORIGIN = "https://api.wroc-love.com";
  const FREE_UNTIL_ISO = "2027-01-01T00:00:00+01:00";
  const FREE_UNTIL = Date.parse(FREE_UNTIL_ISO);
  const supported = ["he", "en", "pl"];

  const copy = {
    he: {
      freeUntil: "גישה חינם עד 31 בדצמבר 2026",
      openFourDays: "פתיחת מסלול 4 הימים בחינם",
      paidAfter: "החל מ־1 בינואר 2027 תידרש רכישה או כניסה עם קוד.",
      freeBadge: "חינם עד סוף 2026"
    },
    en: {
      freeUntil: "Free access until 31 December 2026",
      openFourDays: "Open the free 4-day route",
      paidAfter: "From 1 January 2027, a purchase or access code will be required.",
      freeBadge: "Free until the end of 2026"
    },
    pl: {
      freeUntil: "Bezpłatny dostęp do 31 grudnia 2026",
      openFourDays: "Otwórz bezpłatną trasę na 4 dni",
      paidAfter: "Od 1 stycznia 2027 wymagany będzie zakup lub kod dostępu.",
      freeBadge: "Bezpłatnie do końca 2026"
    }
  };

  function normalizeLanguage(language) {
    return supported.includes(language) ? language : "he";
  }

  function isFreeNow(now = Date.now()) {
    return now < FREE_UNTIL;
  }

  function languageFromPage() {
    const requested = new URLSearchParams(window.location.search).get("lang");
    const saved = localStorage.getItem("wroclaw24-language");
    return normalizeLanguage(requested || saved || document.documentElement.lang);
  }

  function text(key, language = languageFromPage()) {
    return copy[normalizeLanguage(language)][key] || copy.he[key] || key;
  }

  function accessUrl(language = languageFromPage()) {
    return `/access.html?lang=${normalizeLanguage(language)}`;
  }

  async function authorize(language = languageFromPage()) {
    const normalized = normalizeLanguage(language);
    if (isFreeNow()) {
      return { allowed: true, free: true, expiresAt: FREE_UNTIL_ISO };
    }
    try {
      const response = await fetch(`${API_ORIGIN}/api/access/status`, { credentials: "include" });
      const result = await response.json();
      if (result.active) return { allowed: true, free: false, ...result };
    } catch (_) {
      // Fall through to the access page when paid access cannot be verified.
    }
    window.location.replace(accessUrl(normalized));
    return { allowed: false, free: false, expiresAt: null };
  }

  function updateHomePromotion(language = languageFromPage()) {
    if (!isFreeNow()) return;
    const normalized = normalizeLanguage(language);
    const badge = document.getElementById("campaign-price-badge");
    const price = document.getElementById("campaign-price");
    const terms = document.getElementById("campaign-terms");
    const purchase = document.getElementById("campaign-purchase");
    const note = document.getElementById("campaign-note");
    if (badge) badge.textContent = text("freeBadge", normalized);
    if (price) price.innerHTML = `<strong>0</strong><span>₪</span>`;
    if (terms) terms.textContent = text("freeUntil", normalized);
    if (purchase) {
      purchase.textContent = text("openFourDays", normalized);
      purchase.href = `/premium.html?lang=${normalized}`;
    }
    if (note) note.textContent = text("paidAfter", normalized);
  }

  window.WROC_CAMPAIGN_ACCESS = {
    API_ORIGIN,
    FREE_UNTIL,
    FREE_UNTIL_ISO,
    authorize,
    isFreeNow,
    languageFromPage,
    text,
    updateHomePromotion
  };

  document.addEventListener("DOMContentLoaded", () => updateHomePromotion());
  document.addEventListener("wroc-language-change", (event) => updateHomePromotion(event.detail?.language));
})();
