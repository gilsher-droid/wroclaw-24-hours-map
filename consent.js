(function () {
  "use strict";

  const maxAge = 180 * 24 * 60 * 60 * 1000;
  const copy = {
    he: { title: "בחירת פרטיות", intro: "נשתמש ב־Google Analytics למדידת שימוש באתר וב־Meta Pixel למדידת פעילות שמגיעה מפרסום, רק אם תבחרו לאשר. האתר פועל גם בלי מעקב.", analyticsOnly: "נשתמש ב־Google Analytics למדידת שימוש באתר רק אם תבחרו לאשר. האתר פועל גם בלי מדידה.", analytics: "מדידת שימוש (Google Analytics)", marketing: "מדידת פרסום (Meta Pixel)", accept: "אישור הכול", reject: "דחיית הכול", customize: "התאמה אישית", save: "שמירת הבחירה", settings: "הגדרות פרטיות", policy: "מדיניות פרטיות", close: "סגירה" },
    en: { title: "Privacy choices", intro: "We use Google Analytics to measure site usage and Meta Pixel to measure activity from ads only if you choose to allow them. The site works without tracking.", analyticsOnly: "We use Google Analytics to measure site usage only if you allow it. The site works without measurement.", analytics: "Usage analytics (Google Analytics)", marketing: "Ad measurement (Meta Pixel)", accept: "Accept all", reject: "Reject all", customize: "Customize", save: "Save choices", settings: "Privacy settings", policy: "Privacy notice", close: "Close" },
    pl: { title: "Wybór prywatności", intro: "Używamy Google Analytics do pomiaru korzystania z witryny i Meta Pixel do pomiaru ruchu z reklam tylko za Twoją zgodą. Strona działa bez śledzenia.", analyticsOnly: "Używamy Google Analytics do pomiaru korzystania z witryny tylko za Twoją zgodą. Strona działa również bez pomiaru.", analytics: "Statystyki (Google Analytics)", marketing: "Pomiar reklam (Meta Pixel)", accept: "Akceptuj wszystkie", reject: "Odrzuć wszystkie", customize: "Dostosuj", save: "Zapisz wybór", settings: "Ustawienia prywatności", policy: "Informacja o prywatności", close: "Zamknij" },
    de: { title: "Datenschutzauswahl", intro: "Wir nutzen Google Analytics für die Website-Nutzung und Meta Pixel für die Messung von Anzeigen nur mit Ihrer Einwilligung. Die Website funktioniert auch ohne Tracking.", analyticsOnly: "Wir nutzen Google Analytics zur Messung der Website-Nutzung nur mit Ihrer Einwilligung. Die Website funktioniert auch ohne Messung.", analytics: "Nutzungsanalyse (Google Analytics)", marketing: "Werbemessung (Meta Pixel)", accept: "Alle akzeptieren", reject: "Alle ablehnen", customize: "Anpassen", save: "Auswahl speichern", settings: "Datenschutzeinstellungen", policy: "Datenschutzhinweis", close: "Schließen" },
    cs: { title: "Volby soukromí", intro: "Google Analytics používáme k měření používání webu a Meta Pixel k měření návštěv z reklam pouze s vaším souhlasem. Web funguje i bez sledování.", analyticsOnly: "Google Analytics používáme k měření používání webu pouze s vaším souhlasem. Web funguje i bez měření.", analytics: "Analýza návštěvnosti (Google Analytics)", marketing: "Měření reklam (Meta Pixel)", accept: "Přijmout vše", reject: "Odmítnout vše", customize: "Přizpůsobit", save: "Uložit volbu", settings: "Nastavení soukromí", policy: "Ochrana soukromí", close: "Zavřít" },
  };
  const analytics = window.WROC_ANALYTICS;
  if (!analytics) return;
  const pixelConfigured = analytics.status().pixelConfigured;
  // A future Pixel activation uses a new consent key, so earlier GA-only choices cannot opt visitors into Meta.
  const key = pixelConfigured ? "wroc-love-consent-v2" : "wroc-love-consent-v1";

  function language() {
    const lang = document.documentElement.lang?.toLowerCase();
    return copy[lang] ? lang : "he";
  }

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (!saved || typeof saved.at !== "number" || Date.now() - saved.at > maxAge) return null;
      if (typeof saved.analytics !== "boolean" || typeof saved.marketing !== "boolean") return null;
      return { ...saved, marketing: pixelConfigured && saved.marketing };
    } catch (_) { return null; }
  }

  let choice = read();
  if (choice) analytics.setConsent(choice);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "wroc-consent-settings";
  const panel = document.createElement("section");
  panel.className = "wroc-consent-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.hidden = Boolean(choice);
  panel.innerHTML = '<div class="wroc-consent-head"><h2></h2><button type="button" data-action="close" hidden></button></div><p></p><div class="wroc-consent-options" hidden><label><input type="checkbox" data-category="analytics"><span></span></label><label><input type="checkbox" data-category="marketing"><span></span></label></div><a class="wroc-consent-policy"></a><div class="wroc-consent-actions"><button type="button" data-action="reject"></button><button type="button" data-action="customize"></button><button type="button" data-action="accept"></button><button type="button" data-action="save" hidden></button></div>';
  document.body.append(button, panel);
  panel.querySelector('[data-category="marketing"]').closest("label").hidden = !pixelConfigured;

  function translate() {
    const lang = language();
    const t = copy[lang];
    button.textContent = t.settings;
    panel.querySelector("h2").textContent = t.title;
    panel.querySelector("p").textContent = pixelConfigured ? t.intro : t.analyticsOnly;
    panel.querySelector('[data-category="analytics"] + span').textContent = t.analytics;
    panel.querySelector('[data-category="marketing"] + span').textContent = t.marketing;
    for (const action of ["accept", "reject", "customize", "save", "close"]) panel.querySelector(`[data-action="${action}"]`).textContent = t[action];
    const link = panel.querySelector(".wroc-consent-policy");
    link.textContent = t.policy;
    link.href = `/privacy.html?lang=${lang}`;
  }

  function show() {
    panel.hidden = false;
    panel.querySelector('[data-action="close"]').hidden = !choice;
    panel.querySelector('[data-category="analytics"]').checked = choice?.analytics || false;
    panel.querySelector('[data-category="marketing"]').checked = choice?.marketing || false;
    panel.querySelector(".wroc-consent-options").hidden = true;
    panel.querySelector('[data-action="save"]').hidden = true;
    panel.querySelector('[data-action="customize"]').hidden = false;
    panel.querySelector('[data-action="accept"]').hidden = false;
    panel.querySelector('[data-action="reject"]').hidden = false;
    translate();
    panel.querySelector("h2").tabIndex = -1;
    panel.querySelector("h2").focus();
  }

  function save(next) {
    choice = { analytics: next.analytics, marketing: pixelConfigured && next.marketing, at: Date.now() };
    try { localStorage.setItem(key, JSON.stringify(choice)); } catch (_) { /* choice stays in memory */ }
    analytics.setConsent(choice);
    panel.hidden = true;
    button.focus();
  }

  button.addEventListener("click", show);
  panel.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "accept") save({ analytics: true, marketing: true });
    if (action === "reject") save({ analytics: false, marketing: false });
    if (action === "close" && choice) { panel.hidden = true; button.focus(); }
    if (action === "customize") {
      panel.querySelector(".wroc-consent-options").hidden = false;
      panel.querySelector('[data-action="save"]').hidden = false;
      panel.querySelector('[data-action="customize"]').hidden = true;
      panel.querySelector('[data-action="accept"]').hidden = true;
    }
    if (action === "save") save({
      analytics: panel.querySelector('[data-category="analytics"]').checked,
      marketing: panel.querySelector('[data-category="marketing"]').checked,
    });
  });
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  translate();
})();
