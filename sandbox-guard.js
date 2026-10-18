(() => {
  'use strict';
  window.WROC_SANDBOX = true;
  const copy = {
    he: ['סביבת בדיקה בלבד. האתר החי לא השתנה.', 'בדיקה בלבד: הטופס לא נשלח ולא נוצרה בקשה אמיתית.'],
    en: ['Sandbox only. The live site is unchanged.', 'Test only: this form was not sent and no real request was created.'],
    pl: ['Środowisko testowe. Witryna produkcyjna pozostaje bez zmian.', 'Tylko test: formularz nie został wysłany i nie utworzono prawdziwego zgłoszenia.'],
    de: ['Testumgebung. Die Live-Website bleibt unverändert.', 'Nur ein Test: Das Formular wurde nicht versendet und keine echte Anfrage erstellt.'],
    cs: ['Testovací prostředí. Živý web zůstává beze změn.', 'Pouze test: formulář nebyl odeslán a skutečný požadavek nebyl vytvořen.']
  };
  const text = () => copy[document.documentElement.lang] || copy.en;
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, options = {}) => {
    const raw = typeof input === 'string' || input instanceof URL ? input : input.url;
    const url = new URL(raw, location.href);
    const method = String(options.method || input?.method || 'GET').toUpperCase();
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) || url.hostname === 'api.wroc-love.com') {
      return Promise.reject(new Error('Sandbox: live server operations are disabled.'));
    }
    return nativeFetch(input, options);
  };
  navigator.sendBeacon = () => false;
  document.addEventListener('submit', event => {
    event.preventDefault(); event.stopImmediatePropagation();
    let status = event.target.querySelector('[data-sandbox-status]');
    if (!status) { status = document.createElement('p'); status.dataset.sandboxStatus = ''; status.setAttribute('role', 'status'); event.target.append(status); }
    status.textContent = text()[1];
  }, true);
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (['wroc-love.com', 'www.wroc-love.com'].includes(url.hostname)) {
      url.protocol = location.protocol; url.host = location.host; link.href = url.href;
    }
  }, true);
  function ready() {
    const bar = document.createElement('div'); bar.id = 'sandbox-notice'; bar.setAttribute('role', 'note');
    bar.style.cssText = 'position:sticky;top:0;z-index:100000;padding:10px 16px;background:#f3dc9a;color:#142b53;text-align:center;font:700 15px/1.4 system-ui;border-bottom:2px solid #142b53;';
    document.body.prepend(bar);
    const refresh = () => { bar.textContent = text()[0]; document.documentElement.dataset.environment = 'sandbox'; };
    refresh(); new MutationObserver(refresh).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
