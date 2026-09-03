(function () {
  "use strict";

  const product = "cultural-adventure";
  const baseUrl = "https://wroc-love.com/products/interactive-maps/cultural.html";
  const source = "instagram";
  const medium = "social";
  const campaign = "cultural_adventure";
  const definitions = [
    { id: "cultural-instagram-he", language: "he", market: "israel" },
    { id: "cultural-instagram-en", language: "en", market: "international" },
    { id: "cultural-instagram-pl", language: "pl", market: "poland" },
    { id: "cultural-instagram-de", language: "de", market: "germany" },
    { id: "cultural-instagram-cs", language: "cs", market: "czechia" },
  ];

  const byLanguage = Object.fromEntries(definitions.map((item) => [item.language, item]));

  function normalizeContent(language, content) {
    const value = String(content || language).trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "");
    if (!value) return language;
    return value === language || value.startsWith(`${language}_`) ? value : `${language}_${value}`;
  }

  function buildUrl(language, content = language) {
    if (!byLanguage[language]) throw new Error(`Unsupported Cultural Adventure campaign language: ${language}`);
    const url = new URL(baseUrl);
    url.searchParams.set("lang", language);
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    url.searchParams.set("utm_content", normalizeContent(language, content));
    return url.toString();
  }

  function readUrl(value) {
    const url = new URL(value, baseUrl);
    const language = url.searchParams.get("lang");
    if (!byLanguage[language]) return null;
    if (url.searchParams.get("utm_source") !== source) return null;
    if (url.searchParams.get("utm_medium") !== medium) return null;
    if (url.searchParams.get("utm_campaign") !== campaign) return null;
    return Object.freeze({
      ...byLanguage[language],
      product,
      source,
      medium,
      campaign,
      content: url.searchParams.get("utm_content") || language,
    });
  }

  const campaigns = Object.freeze(definitions.map((item) => Object.freeze({
    ...item,
    product,
    source,
    medium,
    campaign,
    destinationUrl: buildUrl(item.language),
  })));

  window.WROC_CULTURAL_INSTAGRAM_CAMPAIGNS = Object.freeze({
    id: "cultural-adventure-instagram",
    product,
    platform: source,
    baseUrl,
    campaigns,
    buildUrl,
    getCampaign(language) {
      return campaigns.find((item) => item.language === language) || null;
    },
    readUrl,
  });
})();
