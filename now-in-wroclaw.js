(function () {
  "use strict";

  const supportedLanguages = Object.freeze(["he", "en", "pl", "de", "cs"]);
  const labels = Object.freeze({
    he: { title: "עכשיו בוורוצלב", previous: "המבזק הקודם", next: "המבזק הבא", source: "לפרטים" },
    en: { title: "Now in Wrocław", previous: "Previous update", next: "Next update", source: "Details" },
    pl: { title: "Teraz we Wrocławiu", previous: "Poprzednia informacja", next: "Następna informacja", source: "Szczegóły" },
    de: { title: "Jetzt in Wrocław", previous: "Vorherige Meldung", next: "Nächste Meldung", source: "Details" },
    cs: { title: "Právě ve Vratislavi", previous: "Předchozí zpráva", next: "Další zpráva", source: "Podrobnosti" },
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
        <div class="wroc-now__item" aria-live="polite">
          <span class="wroc-now__category" aria-hidden="true"></span>
          <span class="wroc-now__text"></span>
          <a class="wroc-now__link" target="_blank" rel="noopener"></a>
        </div>
        <div class="wroc-now__controls">
          <button class="wroc-now__button" type="button" data-now-previous><span aria-hidden="true">‹</span></button>
          <span class="wroc-now__position" aria-hidden="true"></span>
          <button class="wroc-now__button" type="button" data-now-next><span aria-hidden="true">›</span></button>
        </div>
      </div>`;

    let index = 0;

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
      link.hidden = !item.url;
      if (item.url) link.href = item.url;
      else link.removeAttribute("href");

      const previous = ticker.querySelector("[data-now-previous]");
      const next = ticker.querySelector("[data-now-next]");
      previous.setAttribute("aria-label", copy.previous);
      next.setAttribute("aria-label", copy.next);
      ticker.querySelector(".wroc-now__position").textContent = `${index + 1}/${items.length}`;
      ticker.querySelector(".wroc-now__controls").hidden = items.length < 2;
    }

    ticker.querySelector("[data-now-previous]").addEventListener("click", () => {
      index = (index - 1 + items.length) % items.length;
      render();
    });
    ticker.querySelector("[data-now-next]").addEventListener("click", () => {
      index = (index + 1) % items.length;
      render();
    });
    ticker.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const forward = event.key === (ticker.dir === "rtl" ? "ArrowLeft" : "ArrowRight");
      index = (index + (forward ? 1 : -1) + items.length) % items.length;
      render();
    });

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
