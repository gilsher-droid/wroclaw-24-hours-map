(function () {
  "use strict";
  const copy = {
    he: { issue: "רקע המפה לא מוצג?", hide: "המשך ללא רקע מפה", unavailable: "רקע המפה אינו זמין כרגע. הסיכות, רשימת המקומות וקישורי הניווט נשארים זמינים." },
    en: { issue: "Map background not displaying?", hide: "Continue without the map background", unavailable: "The map background is unavailable. Pins, place lists and directions remain available." },
    pl: { issue: "Nie widać tła mapy?", hide: "Kontynuuj bez tła mapy", unavailable: "Tło mapy jest niedostępne. Znaczniki, lista miejsc i linki do nawigacji nadal działają." },
    de: { issue: "Kartenhintergrund nicht sichtbar?", hide: "Ohne Kartenhintergrund fortfahren", unavailable: "Der Kartenhintergrund ist nicht verfügbar. Markierungen, Ortslisten und Navigation bleiben verfügbar." },
    cs: { issue: "Nezobrazuje se podklad mapy?", hide: "Pokračovat bez podkladu mapy", unavailable: "Podklad mapy není dostupný. Značky, seznam míst a odkazy na navigaci zůstávají dostupné." }
  };
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
  const url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  function addTo(map, options = {}) {
    const container = map.getContainer();
    const notice = document.createElement("div");
    notice.className = "wroc-map-availability";
    const message = document.createElement("span");
    message.setAttribute("role", "status");
    const button = document.createElement("button");
    button.type = "button";
    notice.append(message, button);
    container.insertAdjacentElement("afterend", notice);
    let failed = false;
    function updateLanguage() {
      const language = document.documentElement.lang || options.language || "en";
      const text = copy[language] || copy.en;
      notice.dir = language === "he" ? "rtl" : "ltr";
      button.textContent = text.issue;
      button.title = text.hide;
      message.textContent = failed ? text.unavailable : "";
    }
    updateLanguage();
    const languageObserver = new MutationObserver(updateLanguage);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    const requests = new Map();
    const layer = window.L.tileLayer(url, {
      maxZoom: 19,
      ...options,
      // Only the origin is disclosed, including on private routes. Keep normal
      // browser caching and identification; do not proxy or rotate providers.
      referrerPolicy: "origin",
      attribution
    });
    // Image elements can render an access-denied picture even for HTTP 403.
    // Check the response status before giving Leaflet a renderable image. Fetch
    // keeps normal HTTP caching and the browser identity; no proxy or retries.
    layer.createTile = function (coords, done) {
      const image = document.createElement("img");
      image.alt = "";
      image.setAttribute("role", "presentation");
      const controller = new AbortController();
      const request = { controller, objectURL: null, finished: false };
      function finish(error) {
        if (request.finished) return;
        request.finished = true;
        if (request.objectURL) URL.revokeObjectURL(request.objectURL);
        requests.delete(image);
        done(error || null, image);
      }
      request.cancel = () => { const error = new Error("Map background request cancelled"); error.name = "AbortError"; controller.abort(); finish(error); };
      requests.set(image, request);
      fetch(this.getTileUrl(coords), { credentials: "omit", referrerPolicy: "origin", signal: controller.signal })
        .then(response => {
          if (!response.ok) throw new Error(`Map background HTTP ${response.status}`);
          return response.blob();
        })
        .then(blob => {
          if (request.finished) return;
          request.objectURL = URL.createObjectURL(blob);
          image.onload = () => finish();
          image.onerror = () => finish(new Error("Map background image could not be decoded"));
          image.src = request.objectURL;
        })
        .catch(finish);
      return image;
    };
    layer.on("tileunload", event => { requests.get(event.tile)?.cancel(); });
    function unavailable(event) {
      if (event?.error?.name === "AbortError") return;
      if (failed) return;
      failed = true;
      layer.off("tileerror", unavailable);
      map.removeLayer(layer);
      [...requests.values()].forEach(request => request.cancel());
      map.attributionControl?.addAttribution(attribution);
      container.classList.add("wroc-map-without-background");
      updateLanguage();
      button.hidden = true;
      notice.dataset.state = "unavailable";
    }
    // Stop on failure rather than leaving access-denied images or repeatedly
    // requesting them. A manual fallback also covers valid image responses
    // containing an error notice, which cannot be inferred from HTTP 200.
    button.addEventListener("click", unavailable);
    layer.on("tileerror", unavailable);
    map.on("unload", () => { languageObserver.disconnect(); notice.remove(); });
    layer.addTo(map);
    return layer;
  }
  window.WROC_MAP_TILES = Object.freeze({ addTo, url });
})();
