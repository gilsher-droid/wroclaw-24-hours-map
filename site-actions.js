(function () {
  "use strict";

  const labels = {
    he: "עקבו אחרינו",
    en: "Follow us",
    pl: "Obserwuj nas",
    de: "Folgen Sie uns",
    cs: "Sledujte nás"
  };
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

  function enhanceExistingSocialLinks() {
    document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"]').forEach((link) => {
      if (link.closest(".site-social-follow") || link.dataset.socialEnhanced) return;
      const kind = link.href.includes("instagram.com") ? "instagram" : "facebook";
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
    const host = header.classList.contains("site-header") ? header.querySelector(":scope > nav") || header : header;
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
    document.querySelectorAll(".site-social-follow").forEach((nav) => {
      nav.setAttribute("aria-label", labels[language()]);
      const text = nav.querySelector(".site-social-label");
      if (text) text.textContent = labels[language()];
    });
  }

  function init() {
    addHeaderSocials();
    enhanceExistingSocialLinks();
    replaceActionIcons();
    refreshLanguage();
    new MutationObserver(refreshLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
