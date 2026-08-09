(function () {
  "use strict";

  // Phase 1 public launch: all map products are open without authentication.
  // The historical access/payment backend remains dormant for a reversible future phase.
  const supported = ["he", "en", "pl", "de", "cs"];
  const copy = {
    he: { currentFree: "כל המסלולים והמפות זמינים כרגע ללא תשלום.", openFourDays: "פתיחת מסלול 4 הימים", freeBadge: "כרגע ללא תשלום", launchNote: "פשוט בוחרים מסלול ומתחילים לטייל." },
    en: { currentFree: "All routes and maps are currently available free of charge.", openFourDays: "Open the 4-day route", freeBadge: "Currently free", launchNote: "Simply choose a route and start exploring." },
    pl: { currentFree: "Wszystkie trasy i mapy są obecnie dostępne bezpłatnie.", openFourDays: "Otwórz trasę na 4 dni", freeBadge: "Obecnie bezpłatnie", launchNote: "Wybierz trasę i ruszaj w drogę." },
    de: { currentFree: "Alle Routen und Karten sind derzeit kostenlos verfügbar.", openFourDays: "4-Tage-Route öffnen", freeBadge: "Derzeit kostenlos", launchNote: "Einfach eine Route wählen und losgehen." },
    cs: { currentFree: "Všechny trasy a mapy jsou nyní k dispozici zdarma.", openFourDays: "Otevřít čtyřdenní trasu", freeBadge: "Nyní zdarma", launchNote: "Stačí si vybrat trasu a vyrazit." }
  };

  function normalizeLanguage(language) { return supported.includes(language) ? language : "he"; }
  function languageFromPage() {
    const requested = new URLSearchParams(window.location.search).get("lang");
    const saved = localStorage.getItem("wroclaw24-language");
    return normalizeLanguage(requested || saved || document.documentElement.lang);
  }
  function text(key, language = languageFromPage()) { return copy[normalizeLanguage(language)][key] || copy.he[key] || key; }
  function isFreeNow() { return true; }
  async function authorize() { return { allowed: true, free: true, phase: "public-launch" }; }

  function updateHomePromotion(language = languageFromPage()) {
    const normalized = normalizeLanguage(language);
    const badge = document.getElementById("campaign-price-badge");
    const price = document.getElementById("campaign-price");
    const terms = document.getElementById("campaign-terms");
    const purchase = document.getElementById("campaign-purchase");
    const note = document.getElementById("campaign-note");
    if (badge) badge.textContent = text("freeBadge", normalized);
    if (price) price.innerHTML = "<strong>0</strong><span>PLN</span>";
    if (terms) terms.textContent = text("currentFree", normalized);
    if (purchase) {
      purchase.textContent = text("openFourDays", normalized);
      purchase.href = `/products/interactive-maps/premium.html?lang=${normalized}`;
    }
    if (note) note.textContent = text("launchNote", normalized);
  }

  window.WROC_CAMPAIGN_ACCESS = { authorize, isFreeNow, languageFromPage, text, updateHomePromotion };
  document.addEventListener("DOMContentLoaded", () => updateHomePromotion());
  document.addEventListener("wroc-language-change", (event) => updateHomePromotion(event.detail?.language));
})();
