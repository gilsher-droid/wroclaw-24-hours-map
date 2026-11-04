(function () {
  'use strict';
  if (window.WROC_SANDBOX || location.hostname === 'api.wroc-love.com' || window.WROC_TELEMETRY) return;
  const analytics = () => window.WROC_ANALYTICS;
  const enabled = () => analytics()?.status().analytics && !analytics().status().excluded;
  const track = (name, data = {}) => analytics()?.track(name, data);
  function canonical(id) {
    if (!id || !/^[a-zA-Z0-9_-]{1,100}$/.test(id)) return '';
    return window.WROC_CATALOG?.getPlace(id)?.id || '';
  }
  function placeFor(element) {
    if (!element) return '';
    const node = element.closest?.('[data-canonical-place-id],[data-panel-place],[data-result],[data-nb-place],[data-place],[data-location],[data-place-gallery],[data-gallery],[data-open-gallery],[data-open-video],[data-video],[data-clips],[data-focus-place],[data-place-ai],[data-canonical-place]');
    if (node) {
      const d = node.dataset;
      if (d.placeAi) { try { return canonical(JSON.parse(d.placeAi).id); } catch (_) { return ''; } }
      const direct=canonical(d.canonicalPlaceId || d.panelPlace || d.result || d.nbPlace || d.place || d.location || d.placeGallery || d.gallery || d.openGallery || d.openVideo || d.video || d.clips || d.focusPlace || d.canonicalPlace);if(direct)return direct;
    }
    const wrapper=element.closest?.('.leaflet-popup-content,.place-card,article');
    try {const button=wrapper?.querySelector('[data-place-ai]');if(button){const id=canonical(JSON.parse(button.dataset.placeAi).id);if(id)return id;}}catch(_){}
    const guide = element.closest?.('[data-guide-video-src]');
    if (guide) return Object.values(window.WROC_CATALOG?.places || {}).find(p => Object.values(p.media?.guideVideos || {}).includes(guide.dataset.guideVideoSrc))?.id || '';
    return '';
  }
  let media = { canonical_place_id: '', media_kind: 'visit' };
  let apiLoading = false;
  const players = new Map(), seenFrames = new WeakMap(), seenPhotos = new WeakMap();
  const impressions = new Set(), watched = new WeakSet(), timers = new Map();
  let observer, visibilityObserver;
  const cardSelector = '.experience-place-card[data-canonical-place-id],.place-card[data-place],.guided-place[data-canonical-place-id],#nearby-results [data-result],[data-panel-place]';
  function inspectCard(el) {
    const id = placeFor(el);
    if (!id || impressions.has(id) || timers.has(el)) return;
    timers.set(el, setTimeout(() => {
      timers.delete(el);
      if (!enabled() || !el.isConnected || impressions.has(id)) return;
      impressions.add(id); track('place_impression', { canonical_place_id: id });
    }, 600));
  }
  function videoApi() {
    if (apiLoading || window.YT?.Player) return;
    apiLoading = true;
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { previous?.(); scan(); };
    const script = document.createElement('script'); script.src = 'https://www.youtube.com/iframe_api'; script.async = true;
    document.head.appendChild(script);
  }
  function wireVideo(frame) {
    let url;
    try { url = new URL(frame.src); } catch (_) { return; }
    if (!/^https:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(url.origin + url.pathname)) return;
    const source = url.pathname;
    if (seenFrames.get(frame) === source) return;
    if (frame.dataset.telemetrySource !== source) {
      frame.dataset.telemetrySource = source;
      frame.dataset.telemetryPlace = placeFor(frame) || media.canonical_place_id;
      frame.dataset.telemetryKind = frame.closest('.guide-video-dialog') ? 'guide' : media.media_kind;
    }
    if (!url.searchParams.has('enablejsapi')) { url.searchParams.set('enablejsapi', '1'); url.searchParams.set('origin', location.origin); frame.src = url.href; }
    if (!window.YT?.Player) { videoApi(); return; }
    seenFrames.set(frame, source);
    const old = players.get(frame); if (old) clearInterval(old.timer);
    const data = { canonical_place_id: frame.dataset.telemetryPlace, media_kind: frame.dataset.telemetryKind || 'visit' };
    const state = { timer: null, started: false, complete: false, milestones: new Set(), player: null };
    function progress() {
      if (!enabled() || !frame.isConnected) { clearInterval(state.timer); state.timer = null; return; }
      if (!state.started) return;
      const duration = state.player?.getDuration?.(), current = state.player?.getCurrentTime?.();
      if (!(duration > 0) || !Number.isFinite(current)) return;
      const percent = current / duration * 100;
      for (const point of [25, 50, 75]) if (percent >= point && !state.milestones.has(point)) { state.milestones.add(point); track('video_progress', { ...data, video_percent: point }); }
    }
    try {
      state.player = new window.YT.Player(frame, { events: { onStateChange(event) {
        if (!enabled()) return;
        if (event.data === 1) {
          if (!state.started) { state.started = true; track('video_start', data); }
          if (!state.timer) state.timer = setInterval(progress, 1500);
        } else {
          progress(); clearInterval(state.timer); state.timer = null;
          if (event.data === 0 && state.started && !state.complete) { state.complete = true; track('video_complete', { ...data, video_percent: 100 }); }
        }
      } } });
      players.set(frame, state);
    } catch (_) { seenFrames.delete(frame); }
  }
  function scan() {
    if (!enabled()) return;
    if (visibilityObserver) document.querySelectorAll(cardSelector).forEach(el => { if (!watched.has(el)) { watched.add(el); visibilityObserver.observe(el); } });
    document.querySelectorAll('#canonical-media-stage img,#gallery-stage img,.gallery-stage img,#gallery-image,.gallery-main img,.excursion-media-stage img,#guided-media-content img,#media-content img').forEach(img => {
      if (img.closest('[hidden],dialog:not([open])') || !img.complete || !img.naturalWidth) return;
      if (!img.src || seenPhotos.get(img) === img.src) return;
      seenPhotos.set(img, img.src); track('photo_view', { canonical_place_id: placeFor(img) || media.canonical_place_id });
    });
    document.querySelectorAll('iframe[src*="youtube"]').forEach(wireVideo);
    for (const [frame, state] of players) if (!frame.isConnected) { clearInterval(state.timer); players.delete(frame); }
  }
  function start() {
    if (!enabled()) { for (const timer of timers.values()) clearTimeout(timer); timers.clear(); for (const p of players.values()) { clearInterval(p.timer); p.timer = null; } visibilityObserver?.disconnect(); return; }
    if (!visibilityObserver && typeof IntersectionObserver !== 'undefined') visibilityObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= .25) inspectCard(entry.target);
      else { clearTimeout(timers.get(entry.target)); timers.delete(entry.target); }
    }), { threshold: [.25] });
    // Re-observe after a consent withdrawal and later grant.
    if (visibilityObserver) document.querySelectorAll(cardSelector).forEach(el => visibilityObserver.observe(el));
    if (!observer && typeof MutationObserver !== 'undefined') { observer = new MutationObserver(scan); observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'open', 'hidden'] }); }
    scan();
  }
  document.addEventListener('click', event => {
    const b = event.target.closest?.('button,a'); if (!b) return;
    const id = placeFor(b);
    const photo = b.matches('[data-place-panel-action="photos"],[data-gallery],[data-open-gallery],.open-gallery,[data-place-gallery]:not([data-media-kind="videos"])');
    const video = b.matches('[data-place-panel-action="videos"],[data-video],[data-clips],[data-open-video],.open-video,[data-place-gallery][data-media-kind="videos"]');
    const guide = b.matches('[data-guide-video-src]');
    if (photo || video || guide) { media = { canonical_place_id: id, media_kind: guide ? 'guide' : 'visit' }; track(photo ? 'photo_open' : guide ? 'guide_open' : 'video_open', media); }
    if (b.matches('#nearby-results-link')) track('nearby_open');
  }, true);
  document.addEventListener('load', event => {if(event.target.tagName === 'IMG')scan();}, true);
  window.addEventListener('wroc:analytics-consent', start);
  window.WROC_TELEMETRY = Object.freeze({ placeFor });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
