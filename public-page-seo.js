(() => {
  "use strict";
  const languages = ["he", "en", "pl", "de", "cs"];
  const pathname = location.pathname === "/index.html" ? "/" : location.pathname;
  if (!["/", "/nearby.html", "/experiences.html"].includes(pathname)) return;

  const canonicalUrl = language => {
    const url = new URL(pathname, "https://wroc-love.com");
    if (language !== "he") url.searchParams.set("lang", language);
    return url.href;
  };
  const link = (rel, language) => {
    const selector = language
      ? `link[rel="${rel}"][hreflang="${language}"]`
      : `link[rel="${rel}"]`;
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", rel);
      if (language) element.setAttribute("hreflang", language);
      element.setAttribute("data-wroc-public-seo", "");
      document.head.appendChild(element);
    }
    return element;
  };
  function update(requestedLanguage) {
    const existing = document.head.querySelector('link[rel="canonical"]');
    // Respect any future server-rendered canonical instead of creating a conflict.
    if (existing && !existing.hasAttribute("data-wroc-public-seo")) return;
    const requested = requestedLanguage || new URLSearchParams(location.search).get("lang");
    const language = languages.includes(requested) ? requested : "he";
    link("canonical").setAttribute("href", canonicalUrl(language));
    for (const code of languages) link("alternate", code).setAttribute("href", canonicalUrl(code));
    link("alternate", "x-default").setAttribute("href", canonicalUrl("he"));
  }
  update();
  document.addEventListener("wroc-language-change", event => update(event.detail?.language));
  window.addEventListener("popstate", () => update());
})();
