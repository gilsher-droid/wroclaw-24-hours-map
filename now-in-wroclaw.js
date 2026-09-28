(function () {
  "use strict";

  const supportedLanguages = Object.freeze(["he", "en", "pl", "de", "cs"]);
  const labels = Object.freeze({
    he: { title: "עכשיו בוורוצלב", pause: "השהיית המבזקים", play: "הפעלת המבזקים", source: "לכתבת השבוע" },
    en: { title: "Now in Wrocław", pause: "Pause news", play: "Resume news", source: "Source" },
    pl: { title: "Teraz we Wrocławiu", pause: "Wstrzymaj wiadomości", play: "Wznów wiadomości", source: "Źródło" },
    de: { title: "Jetzt in Wrocław", pause: "Meldungen anhalten", play: "Meldungen fortsetzen", source: "Quelle" },
    cs: { title: "Právě ve Vratislavi", pause: "Pozastavit zprávy", play: "Spustit zprávy", source: "Zdroj" },
  });

  function dateOnly(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
  }

  function dayStart(value) {
    const date = value == null ? new Date() : new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  function isActive(item, now) {
    const today = dayStart(now);
    const start = dateOnly(item.startDate);
    const end = dateOnly(item.endDate);
    return (!start || today >= start) && (!end || today <= end);
  }

  function activeItems(items, now) {
    return (items || []).filter((item) => isActive(item, now));
  }

  function currentLanguage() {
    const query = new URLSearchParams(window.location.search).get("lang");
    const pageLanguage = document.documentElement.lang;
    return supportedLanguages.includes(query) ? query : supportedLanguages.includes(pageLanguage) ? pageLanguage : "en";
  }

  function createTicker(items) {
    const ticker = document.createElement("aside");
    ticker.id = "wroc-now-in-wroclaw";
    ticker.className = "wroc-now";
    ticker.setAttribute("aria-labelledby", "wroc-now-title");
    ticker.innerHTML = `
      <div class="wroc-now__inner">
        <strong class="wroc-now__title" id="wroc-now-title"></strong>
        <div class="wroc-now__item">
          <span class="wroc-now__category" aria-hidden="true"></span>
          <span class="wroc-now__text"></span>
          <a class="wroc-now__link"></a>
        </div>
        <div class="wroc-now__controls">
          <span class="wroc-now__position" aria-hidden="true"></span>
          <button class="wroc-now__button" type="button" data-now-pause aria-pressed="false"></button>
        </div>
        <ul class="wroc-now__reduced-list"></ul>
      </div>`;

    let index = 0;
    let paused = false;
    let hovering = false;
    let focused = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauseButton = ticker.querySelector("[data-now-pause]");
    const reducedList = ticker.querySelector(".wroc-now__reduced-list");

    function itemUrl(item, language) {
      return language === "he" && item.articleUrl ? item.articleUrl : item.url;
    }

    function render() {
      const language = currentLanguage();
      const copy = labels[language];
      const item = items[index];
      const rtl = language === "he";
      ticker.lang = language;
      ticker.dir = rtl ? "rtl" : "ltr";
      ticker.querySelector(".wroc-now__title").textContent = copy.title;
      ticker.querySelector(".wroc-now__text").textContent = item.title[language];
      ticker.querySelector(".wroc-now__category").dataset.category = item.category;
      ticker.dataset.priority = item.priority || "normal";

      const link = ticker.querySelector(".wroc-now__link");
      link.textContent = copy.source;
      link.hidden = !itemUrl(item, language);
      link.dataset.newsId = item.id;
      link.dataset.newsCategory = item.category || "";
      link.dataset.canonicalPlaceId = item.relatedCanonicalPlaceId || "";
      link.dataset.canonicalExperienceId = item.relatedCanonicalExperienceId || "";
      if (itemUrl(item, language)) link.href = itemUrl(item, language);
      else link.removeAttribute("href");
      link.target = language === "he" ? "_self" : "_blank";
      link.rel = language === "he" ? "" : "noopener";
      pauseButton.textContent = paused ? "▶" : "Ⅱ";
      pauseButton.setAttribute("aria-label", paused ? copy.play : copy.pause);
      pauseButton.setAttribute("aria-pressed", String(paused));
      ticker.querySelector(".wroc-now__position").textContent = `${index + 1}/${items.length}`;
      ticker.querySelector(".wroc-now__controls").hidden = items.length < 2 || motion.matches;
      reducedList.replaceChildren();
      if (motion.matches) {
        for (const news of items) {
          const row = document.createElement("li");
          const anchor = document.createElement("a");
          anchor.textContent = news.title[language];
          anchor.href = itemUrl(news, language);
          if (language !== "he") { anchor.target = "_blank"; anchor.rel = "noopener"; }
          row.append(anchor);
          reducedList.append(row);
        }
      }
    }

    pauseButton.addEventListener("click", () => {
      paused = !paused;
      render();
    });
    ticker.addEventListener("mouseenter", () => { hovering = true; });
    ticker.addEventListener("mouseleave", () => { hovering = false; });
    ticker.addEventListener("focusin", () => { focused = true; });
    ticker.addEventListener("focusout", () => { focused = ticker.contains(document.activeElement); });
    motion.addEventListener("change", render);
    if (items.length > 1) window.setInterval(() => {
      if (paused || hovering || focused || motion.matches || document.hidden) return;
      index = (index + 1) % items.length;
      render();
    }, 12000);

    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
    render();
    return ticker;
  }

  function mount(options) {
    if (typeof document === "undefined" || document.getElementById("wroc-now-in-wroclaw")) return null;
    const items = activeItems(options?.items || window.WROC_NOW_IN_WROCLAW_ITEMS, options?.now);
    if (!items.length) return null;
    const ticker = createTicker(items);
    const skipLink = document.body.querySelector(":scope > .skip-link");
    if (skipLink) skipLink.insertAdjacentElement("afterend", ticker);
    else document.body.prepend(ticker);
    return ticker;
  }

  window.WROC_NOW_IN_WROCLAW = Object.freeze({ supportedLanguages, dateOnly, isActive, activeItems, mount });

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mount());
    else mount();
  }
})();
