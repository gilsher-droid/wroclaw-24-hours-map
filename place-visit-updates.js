(function () {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const labels = {he:'עדכון ביקור ומקור',en:'Visitor update and source',pl:'Informacja dla odwiedzających i źródło',de:'Besucherhinweis und Quelle',cs:'Informace pro návštěvníky a zdroj'};
  const reviewLabels = {he:'עדכון העונה דורש בדיקה מחדש. בדקו אצל המפעיל את התוכנית הנוכחית.',en:'Seasonal information needs rechecking. Confirm the current programme with the operator.',pl:'Informacje sezonowe wymagają ponownego sprawdzenia. Potwierdź aktualny program u zarządcy.',de:'Die Saisonangaben müssen erneut geprüft werden. Bitte das aktuelle Programm beim Betreiber bestätigen.',cs:'Sezonní informace vyžadují nové ověření. Ověřte aktuální program u provozovatele.'};
  const local = (value, language) => value?.[language] || value?.en || '';
  // The destination's calendar controls expiry, regardless of the traveller's timezone.
  function localDate(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Warsaw',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
    const value = type => parts.find(part => part.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
  }
  function forPlace(id, now = new Date()) {
    const day = localDate(now);
    const canonicalId = window.WROC_CATALOG?.resolveId?.(id) || id;
    return (window.WROC_PLACE_VISIT_UPDATES || []).filter(update => update.canonicalPlaceId === canonicalId && update.validFrom <= day && (!update.validTo || day <= update.validTo));
  }
  function html(id, language = 'he', now = new Date()) {
    const lang = labels[language] ? language : 'en';
    return forPlace(id, now).map(update => {
      const review = update.reviewAfter && localDate(now) > update.reviewAfter ? `<p data-review-required="true">${escape(reviewLabels[lang])}</p>` : '';
      const article = update.articleUrl.replace('.html#', (lang === 'he' ? '' : `-${lang}`) + '.html#');
      return `<aside class="place-note canonical-visit-update" role="note" data-visit-update="${escape(update.id)}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"><strong>${escape(local(update.title,lang))}</strong><p>${escape(local(update.text,lang))}</p>${review}<a href="${escape(article)}">${escape(labels[lang])}</a></aside>`;
    }).join('');
  }
  window.WROC_PLACE_VISITS = Object.freeze({localDate,forPlace,html});
})();
