(function () {
  "use strict";

  const supportedLanguages = new Set(["he", "en", "pl", "de", "cs"]);
  const cache = new Map();
  let trigger = null;
  let previousOverflow = "";

  const labels = {
    he: { close: "סגירה", translatedFrom: "תורגם מ{language}", open: "פתיחת הפוסט המקורי ב־{platform}", language: { he: "עברית", en: "אנגלית", pl: "פולנית", de: "גרמנית", cs: "צ׳כית" } },
    en: { close: "Close", translatedFrom: "Translated from {language}", open: "Open original post on {platform}", language: { he: "Hebrew", en: "English", pl: "Polish", de: "German", cs: "Czech" } },
    pl: { close: "Zamknij", translatedFrom: "Przetłumaczono z języka {language}", open: "Otwórz oryginalny post na {platform}", language: { he: "hebrajskiego", en: "angielskiego", pl: "polskiego", de: "niemieckiego", cs: "czeskiego" } },
    de: { close: "Schließen", translatedFrom: "Aus dem {language} übersetzt", open: "Originalbeitrag auf {platform} öffnen", language: { he: "Hebräischen", en: "Englischen", pl: "Polnischen", de: "Deutschen", cs: "Tschechischen" } },
    cs: { close: "Zavřít", translatedFrom: "Přeloženo z {language}", open: "Otevřít původní příspěvek na {platform}", language: { he: "hebrejštiny", en: "angličtiny", pl: "polštiny", de: "němčiny", cs: "češtiny" } },
  };

  const attributeEscape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);

  function currentLanguage() {
    const language = String(document.documentElement.lang || "he").toLowerCase().split("-")[0];
    return supportedLanguages.has(language) ? language : "he";
  }

  function direction(language) {
    return language === "he" ? "rtl" : "ltr";
  }

  function getPost(placeOrId, platform, url) {
    const place = typeof placeOrId === "string"
      ? window.WROC_CATALOG?.getPlace?.(placeOrId)
      : placeOrId;
    const posts = Array.isArray(place?.socialPosts) ? place.socialPosts : [];
    return posts.find((post) => post.platform === platform && (!url || post.url === url)) || null;
  }

  function linkAttributes(placeOrId, platform, url) {
    const post = getPost(placeOrId, platform, url);
    if (!post?.contentRef || !post?.originalLanguage) return "";
    return ` data-social-platform="${attributeEscape(post.platform)}" data-social-original-language="${attributeEscape(post.originalLanguage)}" data-social-content-ref="${attributeEscape(post.contentRef)}"`;
  }

  function ensureDialog() {
    let modal = document.getElementById("social-preview-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "social-preview-modal";
    modal.className = "social-preview";
    modal.hidden = true;
    modal.innerHTML = `
      <button class="social-preview__backdrop" type="button" data-social-preview-close tabindex="-1" aria-hidden="true"></button>
      <section class="social-preview__dialog" role="dialog" aria-modal="true" aria-labelledby="social-preview-title" aria-describedby="social-preview-origin social-preview-content">
        <header class="social-preview__header">
          <h2 id="social-preview-title"></h2>
          <button class="social-preview__close" type="button" data-social-preview-close aria-label=""></button>
        </header>
        <p class="social-preview__origin" id="social-preview-origin"></p>
        <div class="social-preview__content" id="social-preview-content"></div>
        <a class="social-preview__open" data-social-preview-open target="_blank" rel="noopener noreferrer"></a>
      </section>`;
    document.body.append(modal);
    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-social-preview-close]")) closeDialog();
    });
    return modal;
  }

  function closeDialog() {
    const modal = document.getElementById("social-preview-modal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = previousOverflow;
    document.removeEventListener("keydown", handleDialogKeydown);
    const focusTarget = trigger;
    trigger = null;
    focusTarget?.focus();
  }

  function focusableElements(modal) {
    return [...modal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hidden && element.getAttribute("aria-hidden") !== "true");
  }

  function handleDialogKeydown(event) {
    const modal = document.getElementById("social-preview-modal");
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = focusableElements(modal);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openDialog({ platform, url, originalLanguage, content, language, sourceLink }) {
    const modal = ensureDialog();
    const copy = labels[language] || labels.en;
    const platformName = platform === "instagram" ? "Instagram" : "Facebook";
    const originLanguage = copy.language[originalLanguage] || originalLanguage.toUpperCase();
    const close = modal.querySelector(".social-preview__close");
    const open = modal.querySelector("[data-social-preview-open]");

    modal.lang = language;
    modal.dir = direction(language);
    modal.querySelector("#social-preview-title").textContent = platformName;
    modal.querySelector("#social-preview-origin").textContent = copy.translatedFrom.replace("{language}", originLanguage);
    modal.querySelector("#social-preview-content").textContent = content;
    close.textContent = "×";
    close.setAttribute("aria-label", copy.close);
    open.href = url;
    open.textContent = copy.open.replace("{platform}", platformName);

    trigger = sourceLink;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.hidden = false;
    document.addEventListener("keydown", handleDialogKeydown);
    close.focus();
  }

  async function loadContent(contentRef) {
    if (!cache.has(contentRef)) {
      cache.set(contentRef, fetch(`/data/social-content/${encodeURIComponent(contentRef)}.json`, {
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      }).then((response) => {
        if (!response.ok) throw new Error("Social content unavailable");
        return response.json();
      }).catch((error) => {
        cache.delete(contentRef);
        throw error;
      }));
    }
    return cache.get(contentRef);
  }

  function openOriginal(url) {
    window.location.assign(url);
  }

  document.addEventListener("click", async (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest("a[data-social-content-ref]");
    if (!link || event.defaultPrevented) return;

    const language = currentLanguage();
    const originalLanguage = link.dataset.socialOriginalLanguage;
    const contentRef = link.dataset.socialContentRef;
    if (!contentRef || language === originalLanguage) return;

    event.preventDefault();
    try {
      const resource = await loadContent(contentRef);
      const content = resource?.content?.[language];
      if (!content || resource.originalLanguage !== originalLanguage) throw new Error("Translation unavailable");
      openDialog({
        platform: link.dataset.socialPlatform,
        url: link.href,
        originalLanguage,
        content,
        language,
        sourceLink: link,
      });
    } catch {
      openOriginal(link.href);
    }
  });

  window.WROC_SOCIAL_PREVIEW = Object.freeze({ getPost, linkAttributes, directionForLanguage: direction });
})();
