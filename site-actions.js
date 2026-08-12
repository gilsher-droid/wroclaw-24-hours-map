(function () {
  "use strict";

  const labels = {
    he: "עקבו אחרינו",
    en: "Follow us",
    pl: "Obserwuj nas",
    de: "Folgen Sie uns",
    cs: "Sledujte nás"
  };
  const navigationLabels = {
    he: { products: "כל המוצרים", how: "איך זה עובד", aria: "ניווט בין המוצרים" },
    en: { products: "All products", how: "How it works", aria: "Product navigation" },
    pl: { products: "Wszystkie produkty", how: "Jak to działa", aria: "Nawigacja produktów" },
    de: { products: "Alle Produkte", how: "So funktioniert es", aria: "Produktnavigation" },
    cs: { products: "Všechny produkty", how: "Jak to funguje", aria: "Navigace produktů" }
  };
  const productLinks = {
    he: ["24 שעות בוורוצלב", "וורוצלב – המסלול המלא ל־4 ימים", "וורוצלב בכריסמס – מסלול רגוע ל־3 ימים", "לאכול, לשתות, לקנות ולישון בוורוצלב", "טיולים בשלזיה התחתונה"],
    en: ["24 Hours in Wrocław", "Four Days in Wrocław", "Christmas in Wrocław", "Eat, drink, shop and stay", "Lower Silesia excursions"],
    pl: ["24 godziny we Wrocławiu", "Cztery dni we Wrocławiu", "Boże Narodzenie we Wrocławiu", "Jedzenie, napoje, zakupy i noclegi", "Wycieczki po Dolnym Śląsku"],
    de: ["24 Stunden in Wrocław", "Vier Tage in Wrocław", "Weihnachten in Wrocław", "Essen, Trinken, Einkaufen und Übernachten", "Ausflüge in Niederschlesien"],
    cs: ["24 hodin ve Vratislavi", "Čtyři dny ve Vratislavi", "Vánoce ve Vratislavi", "Jídlo, pití, nákupy a ubytování", "Výlety po Dolním Slezsku"]
  };
  const productPaths = ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"];
  const facebookUrl = "https://www.facebook.com/profile.php?id=61591964083308";
  const instagramUrl = "https://www.instagram.com/wroclaw.lowersilesia/";
  const shareSvg = '<svg class="site-action-svg share" viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"></circle><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="19" r="2.5"></circle><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"></path></svg>';
  const printSvg = '<svg class="site-action-svg print" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M7 14h10v7H7z"></path><path d="M17 11h.01"></path></svg>';

  function language() {
    const query = new URLSearchParams(location.search).get("lang");
    return labels[query] ? query : labels[document.documentElement.lang] ? document.documentElement.lang : "en";
  }

  function socialIcon(kind) {
    return `<span class="site-social-icon ${kind}" aria-hidden="true">${kind === "facebook" ? "f" : "◎"}</span>`;
  }

  function actionHost(header) {
    if (header.classList.contains("site-header")) return header.querySelector(":scope > nav") || header;
    if (header.classList.contains("topbar")) return header.querySelector(".top-actions") || header;
    if (header.classList.contains("premium-header")) return header.querySelector(".premium-tools") || header;
    if (header.classList.contains("lifestyle-header")) return header.querySelector(".header-actions") || header;
    return header;
  }

  function productMenuMarkup(lang) {
    const names = productLinks[lang];
    return productPaths.map((path, index) => `<a href="/products/interactive-maps/${path}?lang=${lang}">${names[index]}</a>`).join("");
  }

  function addProductNavigation() {
    const header = document.querySelector(".premium-header, .lifestyle-header, .topbar");
    if (!header || header.querySelector(".site-product-navigation")) return;
    const lang = language();
    const nav = document.createElement("nav");
    nav.className = "site-product-navigation";
    nav.setAttribute("aria-label", navigationLabels[lang].aria);
    nav.innerHTML = `<details class="site-product-menu"><summary>${navigationLabels[lang].products}</summary><div class="site-product-menu-panel">${productMenuMarkup(lang)}</div></details>` +
      `<a class="site-how-link" href="/?lang=${lang}#how">${navigationLabels[lang].how}</a>`;
    actionHost(header).prepend(nav);
  }

  function enhanceExistingSocialLinks() {
    document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"]').forEach((link) => {
      if (link.closest(".site-social-follow")) return;
      const kind = link.href.includes("instagram.com") ? "instagram" : "facebook";
      const brandIcon = link.querySelector(".brand-icon");
      const enhancedIcons = [...link.querySelectorAll(".site-social-icon")];
      if (brandIcon) {
        enhancedIcons.forEach((icon) => icon.remove());
        link.dataset.socialEnhanced = "true";
        return;
      }
      if (enhancedIcons.length) {
        enhancedIcons.slice(1).forEach((icon) => icon.remove());
        link.dataset.socialEnhanced = "true";
        return;
      }
      link.insertAdjacentHTML("afterbegin", socialIcon(kind));
      link.dataset.socialEnhanced = "true";
    });
  }

  function addHeaderSocials() {
    const header = document.querySelector(".site-header, .premium-header, .lifestyle-header, .topbar");
    if (!header || header.querySelector(".site-social-follow")) return;
    const nav = document.createElement("div");
    nav.className = "site-social-follow";
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", labels[language()]);
    nav.innerHTML = `<span class="site-social-label">${labels[language()]}</span>` +
      `<a href="${facebookUrl}" target="_blank" rel="noopener" aria-label="Facebook">${socialIcon("facebook")}</a>` +
      `<a href="${instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${socialIcon("instagram")}</a>`;
    const host = actionHost(header);
    host.appendChild(nav);
  }

  function replaceActionIcons() {
    document.querySelectorAll("#share-button").forEach((button) => { button.innerHTML = shareSvg; });
    document.querySelectorAll("#print-button").forEach((button) => { button.innerHTML = printSvg; });
    document.querySelectorAll("#share-button-bottom").forEach((button) => {
      if (!button.querySelector("svg")) button.insertAdjacentHTML("afterbegin", shareSvg);
    });
    document.querySelectorAll("#print-button-bottom").forEach((button) => {
      if (!button.querySelector("svg")) button.insertAdjacentHTML("afterbegin", printSvg);
    });
  }

  function refreshLanguage() {
    const lang = language();
    document.querySelectorAll(".site-social-follow").forEach((nav) => {
      nav.setAttribute("aria-label", labels[lang]);
      const text = nav.querySelector(".site-social-label");
      if (text) text.textContent = labels[lang];
    });
    document.querySelectorAll(".site-product-navigation").forEach((nav) => {
      nav.setAttribute("aria-label", navigationLabels[lang].aria);
      const summary = nav.querySelector("summary");
      const how = nav.querySelector(".site-how-link");
      const panel = nav.querySelector(".site-product-menu-panel");
      if (summary) summary.textContent = navigationLabels[lang].products;
      if (how) { how.textContent = navigationLabels[lang].how; how.href = `/?lang=${lang}#how`; }
      if (panel) panel.innerHTML = productMenuMarkup(lang);
    });
    document.querySelectorAll("[data-site-home]").forEach((link) => { link.href = `/?lang=${lang}`; });
  }

  function init() {
    addProductNavigation();
    addHeaderSocials();
    enhanceExistingSocialLinks();
    replaceActionIcons();
    refreshLanguage();
    new MutationObserver(refreshLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
