(() => {
  const host = document.getElementById('home-excursions');
  if (!host) return;
  const copy = {
    he: ['בחרו את הטיול הבא שלכם', 'טיולים עצמאיים, מטירות ועיירות ועד עצירה בדרך לעיר. בכל מסלול מחכים לכם תחנות, תמונות, סרטונים וניווט.', 'גללו לצדדים וגלו את המסלולים', 'למסלול ולמפה', 'לכל הטיולים', 'טיולי יום, טיול עם לינה ועצירה בדרך לוורוצלב.', 'גלילה שמאלה', 'גלילה ימינה'],
    en: ['Choose your next adventure', 'Independent trips, from castles and historic towns to a stop on your way to Wrocław. Explore stops, photos, videos and navigation in each route.', 'Scroll sideways to explore the routes', 'Explore the route and map', 'Explore all excursions', 'Day trips, an overnight escape and a stop en route to Wrocław.', 'Scroll left', 'Scroll right'],
    pl: ['Wybierz kolejną wycieczkę', 'Samodzielne wyprawy do zamków i historycznych miast oraz przystanek w drodze do Wrocławia. Na trasach czekają przystanki, zdjęcia, filmy i nawigacja.', 'Przesuń w bok, aby odkryć trasy', 'Zobacz trasę i mapę', 'Wszystkie wycieczki', 'Wycieczki jednodniowe, wyjazd z noclegiem i przystanek w drodze do Wrocławia.', 'Przewiń w lewo', 'Przewiń w prawo'],
    de: ['Wählen Sie Ihren nächsten Ausflug', 'Individuelle Ausflüge zu Schlössern und historischen Städten sowie ein Zwischenstopp auf dem Weg nach Wrocław. Mit Stationen, Fotos, Videos und Navigation.', 'Seitlich scrollen und Routen entdecken', 'Route und Karte entdecken', 'Alle Ausflüge', 'Tagesausflüge, eine Reise mit Übernachtung und ein Zwischenstopp auf dem Weg nach Wrocław.', 'Nach links scrollen', 'Nach rechts scrollen'],
    cs: ['Vyberte si další výlet', 'Samostatné výlety za zámky a historickými městy i zastávka cestou do Vratislavi. Každá trasa nabízí zastávky, fotografie, videa a navigaci.', 'Posunutím do strany objevíte trasy', 'Prohlédnout trasu a mapu', 'Všechny výlety', 'Jednodenní výlety, výlet s přenocováním i zastávka cestou do Vratislavi.', 'Posunout doleva', 'Posunout doprava']
  };
  const hebrewTitles = ['קשונז׳ ושווידניצה', 'ברז׳ג וטירת מושנה', 'יאבור, קרפץ, וואנג וילניה גורה', 'צ׳וחה ובולסלבייץ, עם לינה בטירה', 'בדרך לוורוצלב עוצרים בלודז׳', 'סרברנה גורה וקלודזקו', 'בדרך לוורוצלב 2: עוצרים בפוזנן'];
  const hebrewSummaries = ['טירה מרשימה, עצירה בעיר היסטורית וכנסיית השלום בשווידניצה.', 'מורשת, אדריכלות ואווירת אגדה בטירה עטורת צריחים.', 'כנסיית השלום, עיירת ההרים, כנסיית העץ וואנג ומרכז ילניה גורה.', 'יומיים של טירה, טיול בוקר לסכר ועיר הקרמיקה הצבעונית.', 'ורשה היא נקודת המוצא. עוצרים לגלות את לודז׳ וממשיכים לוורוצלב.', 'שני מבצרים מרשימים, תצפיות וטיול בעיר העתיקה של קלודזקו.', 'יום בעיר העתיקה ובאי הקתדרלות, עם אוכל, קפה ואפשרות ללינה.'];
  const heroCopy = {
    he: ['ככה מטיילים עם המפה שלנו', 'מתוך המפה האמיתית', 'פותחים את המפה ומתחילים לגלות', 'לוחצים על מקום ומגלים תמונות, סרטונים, ניווט ופוסטים מהמקום.', 'מפת מרכז וורוצלב עם כרטיס כיכר השוק פתוח'],
    en: ['See how your map works', 'Our actual map', 'Open the map and start exploring', 'Tap a place to discover photos, videos, navigation and local posts.', 'Wrocław city map with the Market Square place card open'],
    pl: ['Zobacz, jak działa nasza mapa', 'Nasza prawdziwa mapa', 'Otwórz mapę i zacznij odkrywać', 'Wybierz miejsce, aby zobaczyć zdjęcia, filmy, nawigację i wpisy o nim.', 'Mapa centrum Wrocławia z otwartą kartą Rynku'],
    de: ['So funktioniert Ihre Karte', 'Unsere echte Karte', 'Karte öffnen und loslegen', 'Wählen Sie einen Ort für Fotos, Videos, Navigation und Beiträge.', 'Karte von Wrocław mit geöffneter Ortskarte des Marktplatzes'],
    cs: ['Podívejte se, jak mapa funguje', 'Naše skutečná mapa', 'Otevřít mapu a začít objevovat', 'Vyberte místo a objevte fotografie, videa, navigaci a příspěvky.', 'Mapa centra Vratislavi s otevřenou kartou náměstí Rynek']
  };
  const knownIds = ['ksiaz-swidnica-day-trip', 'brzeg-moszna-day-trip', 'jawor-karpacz-jelenia-gora-day-trip', 'czocha-boleslawiec-two-day-trip', 'warsaw-lodz-wroclaw', 'srebrna-gora-klodzko-day-trip', 'poznan-wroclaw-stopover'];
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text.replace(/[—–]/g, ",");
    return node;
  }
  function render() {
    const lang = copy[document.documentElement.lang] ? document.documentElement.lang : 'he';
    const c = copy[lang];
    const h = heroCopy[lang];
    ['title', 'badge', 'cta', 'caption'].forEach((key, i) => { document.getElementById(`hero-preview-${key}`).textContent = h[i]; });
    const heroImage = document.getElementById('hero-preview-image');
    heroImage.src = `/assets/home-map-preview/map-${lang}.webp`; heroImage.alt = h[4];
    document.getElementById('hero-preview-link').href = `/products/interactive-maps/map.html?lang=${lang}#map`;
    document.querySelector('.real-map-preview').setAttribute('aria-label', h[0]);
    const section = host.closest('section');
    section.querySelector('h2').textContent = c[0];
    section.querySelector('.section-heading > p').textContent = c[1];
    host.replaceChildren();
    const toolbar = el('div', 'home-excursions-toolbar');
    toolbar.append(el('p', '', c[2]));
    const arrows = el('div', 'home-excursions-arrows');
    const left = el('button', '', '←'), right = el('button', '', '→');
    left.type = right.type = 'button';
    left.setAttribute('aria-label', c[6]); right.setAttribute('aria-label', c[7]);
    arrows.append(left, right); toolbar.append(arrows);
    const rail = el('div', 'home-excursions-rail');
    rail.setAttribute('role', 'region'); rail.setAttribute('aria-label', c[4]);
    rail.tabIndex = 0;
    const trips = window.WROC_HOME_EXCURSIONS || [];
    for (const trip of trips) {
      const index = knownIds.indexOf(trip.id);
      const card = el('a', 'home-excursion');
      card.href = `/products/interactive-maps/excursions.html?lang=${lang}&trip=${encodeURIComponent(trip.id)}`;
      const img = el('img'); img.src = trip.photo; img.alt = ''; img.loading = 'lazy'; img.width = 580; img.height = 316;
      const body = el('div', 'home-excursion-body');
      body.append(el('h3', '', lang === 'he' ? hebrewTitles[index] || trip.title.he : trip.title[lang]), el('p', '', lang === 'he' ? hebrewSummaries[index] || trip.summary.he : trip.summary[lang]), el('span', 'home-excursion-cta', c[3]));
      card.append(img, body); rail.append(card);
    }
    const footer = el('div', 'home-excursions-footer');
    const all = el('a', 'button excursions-button', c[4]); all.href = `/products/interactive-maps/excursions.html?lang=${lang}`;
    footer.append(el('small', '', c[5]), all); host.append(toolbar, rail, footer);
    const move = direction => rail.scrollBy({ left: direction * (rail.querySelector('a')?.offsetWidth + 20 || 310), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    left.onclick = () => move(-1); right.onclick = () => move(1);
    const update = () => {
      const bounds = rail.getBoundingClientRect();
      const cards = [...rail.children].map(node => node.getBoundingClientRect());
      left.disabled = !cards.some(rect => rect.left < bounds.left - 5);
      right.disabled = !cards.some(rect => rect.right > bounds.right + 5);
    };
    rail.addEventListener('scroll', update, { passive: true });
    if (window.ResizeObserver) { observer?.disconnect(); observer = new ResizeObserver(update); observer.observe(rail); }
    requestAnimationFrame(update);
  }
  let observer;
  document.addEventListener('wroc-language-change', render);
  render();
})();
