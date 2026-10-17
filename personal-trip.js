(() => {
  'use strict';
  const copies = window.WROC_PERSONAL_COPY;
  const query = new URLSearchParams(location.search);
  let language = copies[query.get('lang')] ? query.get('lang') : 'he';
  let step = 0, demo = 'oldtown', map, layer, busy = false;
  const form = document.querySelector('#trip-form');
  const steps = [...form.querySelectorAll('[data-step]')];
  const status = document.querySelector('#form-status');
  const requestId = crypto.randomUUID();
  const interests = ['culture', 'foodInterest', 'nature', 'architecture', 'shopping', 'daytrip'];
  const demos = { oldtown: ['rynek', 'czarna-magia', 'university'], green: ['japanese', 'hala', 'fountain'] };
  const text = key => copies[language][key];
  const node = (tag, value, className) => { const el = document.createElement(tag); if (value != null) el.textContent = value; if (className) el.className = className; return el; };

  function selectedInterests() { return [...form.querySelectorAll('[name="interests"]:checked')].map(el => el.value); }
  function summary() {
    const values = Object.fromEntries(new FormData(form));
    const selectedLabel = name => form.elements[name].selectedOptions[0].textContent;
    return [
      [text('arrival'), values.arrival || text('unknown')],
      [text('days'), values.days], [text('adults'), values.adults], [text('children'), values.children],
      [text('base'), values.base || text('unknown')], [text('transport'), selectedLabel('transport')],
      [text('preferences'), selectedInterests().map(text).join(', ') || text('allInterests')],
      [text('pace'), selectedLabel('pace')], [text('budget'), selectedLabel('budget')],
      [text('food'), values.preferences || text('allInterests')], [text('name'), values.name],
      [text('email'), values.email], [text('notes'), values.notes || text('allInterests')]
    ];
  }
  function renderReview() {
    const target = document.querySelector('#request-review'); target.replaceChildren();
    for (const [key, value] of summary()) { target.append(node('dt', key)); const dd = node('dd', value); if (key === text('email')) dd.dir = 'ltr'; target.append(dd); }
  }
  function showStep(value, focus = true) {
    step = value; steps.forEach((el, i) => { el.hidden = i !== step; });
    document.querySelectorAll('[data-step-label]').forEach(el => { if (Number(el.dataset.stepLabel) === step) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current'); });
    document.querySelector('#previous').hidden = step === 0;
    document.querySelector('#next').hidden = step === 3;
    document.querySelector('#send').hidden = step !== 3;
    status.textContent = '';
    if (step === 3) renderReview();
    if (focus) { const heading = steps[step].querySelector('legend'); heading.tabIndex = -1; heading.focus(); }
  }
  function validStep(index) {
    const invalid = [...steps[index].querySelectorAll('input,select,textarea')].find(el => !el.checkValidity());
    if (invalid) { showStep(index, false); status.textContent = text('required'); invalid.reportValidity(); return false; }
    return true;
  }
  function renderDemo() {
    const stops = demos[demo].map(id => window.WROC_CATALOG?.getPlace(id)).filter(Boolean);
    const container = document.querySelector('#demo-stops'); container.replaceChildren();
    if (window.L && !map) {
      map = L.map('demo-map', { scrollWheelZoom: false }).setView([51.109, 17.035], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      layer = L.layerGroup().addTo(map);
    }
    layer?.clearLayers();
    const bounds = [];
    stops.forEach((place, index) => {
      const title = place.name[language] || place.localName;
      const photo = place.media.photos[0];
      const coordinates = [place.location.coordinates.lat, place.location.coordinates.lng];
      bounds.push(coordinates);
      const row = node('article', null, 'demo-stop');
      if (photo) { const image = node('img'); image.src = photo; image.alt = title; image.loading = 'lazy'; row.append(image); }
      const content = node('div'); const heading = node('h3', `${index + 1}. ${title}`); content.append(heading);
      content.append(node('p', place.id === 'czarna-magia' ? text('exampleCafe') : text('exampleCulture')));
      const actions = node('div');
      const navigate = node('a', text('navigate')); navigate.href = `https://www.google.com/maps/search/?api=1&query=${coordinates.join(',')}`; navigate.target = '_blank'; navigate.rel = 'noopener'; actions.append(navigate);
      let marker;
      if (map) {
        marker = L.marker(coordinates, { icon: L.divIcon({ className: 'demo-marker', html: String(index + 1), iconSize: [32, 32] }) }).addTo(layer);
        const popup = node('div'); popup.dir = language === 'he' ? 'rtl' : 'ltr';
        if (photo) { const image = node('img'); image.src = photo; image.alt = title; popup.append(image); }
        popup.append(node('strong', title));
        marker.bindPopup(popup);
        const show = node('button', text('showMap')); show.type = 'button'; show.style.marginInlineStart = '14px';
        show.addEventListener('click', () => { map.setView(coordinates, 16); marker.openPopup(); document.querySelector('#demo-map').scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }); actions.append(show);
      }
      content.append(actions); row.append(content); container.append(row);
    });
    if (map && bounds.length) { L.polyline(bounds, { color: '#bd903e', dashArray: '6 8', weight: 3 }).addTo(layer); map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 }); }
    document.querySelectorAll('[data-demo]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.demo === demo)));
  }
  function setLanguage(next) {
    if (!copies[next]) return;
    const checked = selectedInterests(); language = next;
    document.documentElement.lang = language; document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.title = `${text('eyebrow')} | Wroc-love`;
    document.querySelectorAll('[data-copy]').forEach(el => { el.textContent = text(el.dataset.copy); });
    document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', text(el.dataset.label)); });
    document.querySelectorAll('[data-lang]').forEach(el => { el.setAttribute('aria-pressed', String(el.dataset.lang === language)); });
    document.querySelectorAll('[data-home]').forEach(el => { el.href = `/?lang=${language}`; });
    document.querySelectorAll('[data-maps]').forEach(el => { el.href = `/?lang=${language}#products`; });
    document.querySelectorAll('[data-privacy]').forEach(el => { el.href = `/privacy.html?lang=${language}`; });
    const target = document.querySelector('#interests'); target.replaceChildren();
    for (const interest of interests) { const label = node('label'); const input = node('input'); input.type = 'checkbox'; input.name = 'interests'; input.value = interest; input.checked = checked.includes(interest); label.append(input, node('span', text(interest))); target.append(label); }
    if (step === 3) renderReview(); renderDemo();
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState({}, '', url);
    document.querySelector('meta[name="description"]').content = text('lead');
    document.querySelector('meta[property="og:title"]').content = `${text('eyebrow')} | Wroc-love`;
    document.querySelector('meta[property="og:description"]').content = text('lead');
  }
  document.querySelectorAll('[data-lang]').forEach(el => el.addEventListener('click', () => setLanguage(el.dataset.lang)));
  document.querySelectorAll('[data-demo]').forEach(el => el.addEventListener('click', () => { demo = el.dataset.demo; renderDemo(); }));
  document.querySelector('#next').addEventListener('click', () => { if (validStep(step)) showStep(Math.min(step + 1, 3)); });
  document.querySelector('#previous').addEventListener('click', () => showStep(Math.max(0, step - 1)));
  form.elements.arrival.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy) return;
    if (step !== 3) { if (validStep(step)) showStep(step + 1); return; }
    for (let i = 0; i < 3; i++) if (!validStep(i)) return;
    const values = Object.fromEntries(new FormData(form));
    const payload = { ...values, interests: selectedInterests(), consent: form.elements.consent.checked, language, requestId, version: 1 };
    busy = true; document.querySelector('#send').disabled = true; document.querySelector('#previous').disabled = true; status.textContent = text('busy');
    try {
      const response = await fetch('https://api.wroc-love.com/trip-requests/index.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'omit', signal: AbortSignal.timeout(20000) });
      let result; try { result = await response.json(); } catch { throw new Error('error'); }
      if (!response.ok || result.accepted !== true || !/^WL-[A-F0-9]{12}$/.test(result.reference || '')) throw new Error(response.status === 429 ? 'rateLimit' : response.status === 503 ? 'serverUnavailable' : 'error');
      form.hidden = true; const success = document.querySelector('#success'); success.hidden = false;
      document.querySelector('#request-reference').textContent = result.reference; success.focus();
    } catch (error) { status.textContent = text(copies[language][error.message] ? error.message : 'error'); }
    finally { busy = false; document.querySelector('#send').disabled = false; document.querySelector('#previous').disabled = false; }
  });
  setLanguage(language); showStep(0, false);
})();
