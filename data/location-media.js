(function () {
  "use strict";

  const gallery = (prefix, count) => Array.from({ length: count }, (_, index) =>
    `/assets/gallery-${prefix}-${String(index + 1).padStart(2, "0")}.jpg`);

  const galleries = {
    gnomes: gallery("gnomes", 5),
    rynek: ["/assets/rynek-market-square.jpg"],
    townHall: ["/assets/old-town-hall-wroclaw.jpg"],
    university: gallery("university", 5),
    aula: [
      "/assets/gallery-university-02.jpg",
      "/assets/gallery-university-04.jpg",
      "/assets/gallery-university-01.jpg",
      "/assets/gallery-university-03.jpg",
      "/assets/gallery-university-05.jpg"
    ],
    marketHall: [...gallery("hala", 6), "/assets/feels-familiar/hala-chalka.jpg", "/assets/feels-familiar/hala-bakery.jpg"],
    chatka: ["/assets/feels-familiar/chatka-placki.jpg"],
    "pan-precel-olawska": ["/assets/feels-familiar/pan-precel-bag.jpg", "/assets/feels-familiar/pan-precel-olawska.jpg"],
    "dobra-paczkarnia-kuznicza": ["/assets/feels-familiar/dobra-paczkarnia-kuznicza.jpg", "/assets/feels-familiar/dobra-paczkarnia-display.jpg"],
    "jolie-kurzy-targ": ["/assets/feels-familiar/jolie-hummus-pita.jpg", "/assets/feels-familiar/jolie-kurzy-targ.jpg", "/assets/feels-familiar/jolie-interior.jpg"],
    cathedral: ["/assets/gallery-cathedral-01.jpg"],
    ostrow: [
      "/assets/gallery-cathedral-03.jpg",
      "/assets/gallery-cathedral-04.jpg",
      "/assets/gallery-cathedral-05.jpg",
      "/assets/gallery-cathedral-06.jpg",
      "/assets/gallery-cathedral-02.jpg",
      "/assets/gallery-cathedral-01.jpg"
    ],
    sandBridge: ["/assets/gallery-cathedral-02.jpg"],
    nfm: gallery("nfm", 3),
    opera: ["/assets/gallery-opera-05.jpg", "/assets/gallery-opera-06.jpg"],
    boguslawskiego: gallery("boguslawskiego", 6),
    hydropolis: Array.from({ length: 10 }, (_, index) =>
      `/assets/hydropolis-${String(index + 1).padStart(2, "0")}.jpg`),
    panorama: gallery("panorama", 4),
    stulecia: [
      "/assets/gallery-stulecia-02.jpg",
      "/assets/gallery-stulecia-03.jpg",
      "/assets/gallery-stulecia-04.jpg"
    ],
    japanese: gallery("japanese", 6),
    wroclavia: gallery("wroclavia", 5),
    renoma: gallery("renoma", 5),
    ossolineum: [
      "/assets/ossolineum-cover.jpg",
      "/assets/ossolineum-angelus-building.jpg",
      "/assets/ossolineum-stained-glass.jpg",
      "/assets/ossolineum-garden.jpg",
      "/assets/ossolineum-angelus.jpg",
      "/assets/ossolineum-garden-framed.jpg",
      "/assets/ossolineum-gate.jpg",
      "/assets/ossolineum-dwarf.jpg"
    ]
  };

  const videos = {
    rynek: [
      {
        src: "/assets/video-rynek-fountains.mp4",
        title: { he: "המזרקות בכיכר השוק", en: "Market Square fountains", pl: "Fontanny na Rynku", de: "Brunnen auf dem Marktplatz", cs: "Fontány na Rynku" }
      },
      {
        src: "/assets/video-rynek-cinema.mp4",
        title: { he: "קולנוע פתוח בכיכר", en: "Open-air cinema in the square", pl: "Kino plenerowe na Rynku", de: "Open-Air-Kino auf dem Marktplatz", cs: "Letní kino na náměstí" }
      }
    ],
    ossolineum: [{
      src: "/assets/video-ossolineum-garden.mp4",
      title: { he: "הגן והחצר של האוסולינאום", en: "Ossolineum garden and courtyard", pl: "Ogród i dziedziniec Ossolineum", de: "Garten und Innenhof des Ossolineums", cs: "Zahrada a nádvoří Ossolinea" }
    }],
    stulecia: [{
      src: "/assets/video-stulecia-fountain.mp4",
      title: { he: "המזרקה ליד Hala Stulecia", en: "The fountain beside Centennial Hall", pl: "Fontanna przy Hali Stulecia", de: "Der Brunnen an der Jahrhunderthalle", cs: "Fontána u Haly století" }
    }]
  };

  const facebook = {
    rynek: "https://www.facebook.com/61591964083308/posts/122107696491398802/",
    university: "https://www.facebook.com/61591964083308/posts/122109914649398802/",
    ostrow: "https://www.facebook.com/61591964083308/posts/122109921771398802/",
    ossolineum: "https://www.facebook.com/61591964083308/posts/122111795823398802/",
    marketHall: "https://www.facebook.com/photo/?fbid=122110916907398802",
    opera: "https://www.facebook.com/photo/?fbid=122108355723398802",
    boguslawskiego: "https://www.facebook.com/61591964083308/posts/122109385623398802/",
    hydropolis: "https://www.facebook.com/61591964083308/posts/122107706685398802/",
    panorama: "https://www.facebook.com/61591964083308/posts/122109893193398802/",
    hala: "https://www.facebook.com/61591964083308/posts/122115263553398802/",
    japanese: "https://www.facebook.com/61591964083308/posts/122109906747398802/",
    familiar: "https://www.facebook.com/61591964083308/posts/122111800983398802/"
  };

  const instagram = {
    rynek: "https://www.instagram.com/wroclaw.lowersilesia/p/Dbc4V7NnBl_/",
    university: "https://www.instagram.com/p/DbgEDzmnDcY/",
    ostrow: "https://www.instagram.com/p/DbgE00LnOKH/",
    ossolineum: "https://www.instagram.com/wroclaw.lowersilesia/p/DbxOsQ_nEQt/",
    marketHall: "https://www.instagram.com/wroclaw.lowersilesia/p/DbpTgt_HFkH/",
    boguslawskiego: "https://www.instagram.com/wroclaw.lowersilesia/p/Dbc11E7HIcn/",
    hydropolis: "https://www.instagram.com/p/Dbf-GySnOyi/",
    panorama: "https://www.instagram.com/p/Dbf-y1HHDum/",
    hala: "https://www.instagram.com/wroclaw.lowersilesia/p/DcTdbhVjM1Y/",
    japanese: "https://www.instagram.com/p/DbgCVSbnL0Q/",
    familiar: "https://www.instagram.com/wroclaw.lowersilesia/p/DbxYEOqjBXH/"
  };

  const canonicalResources = (placeId, videoTitles = []) => {
    const place = window.WROC_CATALOG?.getPlace?.(placeId);
    if (!place) return {};

    return {
      get facebook() { return window.WROC_CATALOG.getSocialPost(place, "facebook")?.url; },
      get instagram() { return window.WROC_CATALOG.getSocialPost(place, "instagram")?.url; },
      ...(place.media?.photos?.length ? { gallery: place.media.photos } : {}),
      ...(place.media?.videos?.length ? {
        videos: place.media.videos.map((src, index) => ({
          src,
          title: videoTitles[index] || place.media.metadata?.[src]?.title || place.name,
        })),
      } : {}),
    };
  };

  const resources = {
    konspira: canonicalResources("konspira"),
    "hostel-krasnal-wroclaw": canonicalResources("hostel-krasnal-wroclaw"),
    "marietta-focacceria-wroclaw": canonicalResources("marietta-focacceria-wroclaw"),
    "olio-pizza-napoletana-wroclaw": canonicalResources("olio-pizza-napoletana-wroclaw"),
    "movenpick-grand-hotel-wroclaw": canonicalResources("movenpick-grand-hotel-wroclaw"),
    "the-cyrus-hotel-wroclaw": canonicalResources("the-cyrus-hotel-wroclaw"),
    "entre-hotel-wroclaw": canonicalResources("entre-hotel-wroclaw"),
    "absynt-aparthotel-garbary-wroclaw": canonicalResources("absynt-aparthotel-garbary-wroclaw"),
    "apartamenty-marina-topacz-wroclaw": canonicalResources("apartamenty-marina-topacz-wroclaw"),
    "boogie-aparthouse-garbary": canonicalResources("boogie-aparthouse-garbary"),
    "hotel-traffic-wroclaw": canonicalResources("hotel-traffic-wroclaw"),
    "korona-hotel": canonicalResources("korona-hotel"),

    "charlotte": canonicalResources("charlotte"),
    "fc-caffe-kuznicza": canonicalResources("fc-caffe-kuznicza"),
    "dominikan": canonicalResources("dominikan"),
    "slodowa": canonicalResources("slodowa"),
    "pasaz": canonicalResources("pasaz"),
    "kawiarenka-sw-jadwigi": canonicalResources("kawiarenka-sw-jadwigi", [{"he": "דלפק בית הקפה", "en": "Café counter", "pl": "Lada kawiarni", "de": "Cafétresen", "cs": "Pult kavárny"}, {"he": "חדר תחת קמרונות לבנים", "en": "Brick-vaulted room", "pl": "Sala z ceglanym sklepieniem", "de": "Raum mit Backsteingewölbe", "cs": "Místnost s cihlovou klenbou"}, {"he": "פסל הציפור בגן בית הקפה", "en": "Bird sculpture in the café garden", "pl": "Rzeźba ptaka w ogrodzie kawiarni", "de": "Vogelskulptur im Cafégarten", "cs": "Ptačí plastika v zahradě kavárny"}, {"he": "שבשבת צבעונית בגן", "en": "Colourful garden pinwheel", "pl": "Kolorowy wiatraczek w ogrodzie", "de": "Buntes Windrad im Garten", "cs": "Barevný větrník v zahradě"}, {"he": "פרחי הגן", "en": "Garden flowers", "pl": "Kwiaty w ogrodzie", "de": "Gartenblumen", "cs": "Květiny v zahradě"}, {"he": "שביל וגדרות חיות בגן", "en": "Garden path and hedges", "pl": "Ścieżka i żywopłoty w ogrodzie", "de": "Gartenweg und Hecken", "cs": "Zahradní cesta a živé ploty"}, {"he": "הגן ובנייני מתחם בית הקפה", "en": "Garden and café complex buildings", "pl": "Ogród i budynki kompleksu kawiarni", "de": "Garten und Gebäude des Cafékomplexes", "cs": "Zahrada a budovy areálu kavárny"}, {"he": "מבט מקרוב על צמחי הגן", "en": "A closer look at garden plants", "pl": "Rośliny w ogrodzie z bliska", "de": "Gartenpflanzen aus der Nähe", "cs": "Pohled zblízka na zahradní rostliny"}, {"he": "קפה ועוגה בביקור שלנו", "en": "Coffee and cake during our visit", "pl": "Kawa i ciasto podczas naszej wizyty", "de": "Kaffee und Kuchen bei unserem Besuch", "cs": "Káva a moučník během naší návštěvy"}]),
    "mania-al-taglio-kuznicza": canonicalResources("mania-al-taglio-kuznicza"),
    "park-szczytnicki-wroclaw": canonicalResources("park-szczytnicki-wroclaw", [{"he": "הליכה בשביל בין עצי הפארק", "en": "A tree-lined park path", "pl": "Alejka wśród parkowych drzew", "de": "Parkweg zwischen Bäumen", "cs": "Cesta mezi parkovými stromy"}, {"he": "עץ לצד שביל הפארק", "en": "A tree beside the park path", "pl": "Drzewo przy parkowej alejce", "de": "Ein Baum am Parkweg", "cs": "Strom u parkové cesty"}]),
    "magnolia": canonicalResources("magnolia"),
    "fashion-outlet": canonicalResources("fashion-outlet"),
    "ato-ramen": canonicalResources("ato-ramen"),
    bastion: canonicalResources("bastion"),
    "cafe-berg-wroclaw": canonicalResources("cafe-berg-wroclaw"),
    "bru-coffee-bakehouse-wroclaw": canonicalResources("bru-coffee-bakehouse-wroclaw"),
    "gustaw-restaurant-wroclaw": canonicalResources("gustaw-restaurant-wroclaw"),
    "lodziarnia-roma": canonicalResources("lodziarnia-roma"),
    "pizza-si": canonicalResources("pizza-si"),
    "czarna-magia": canonicalResources("czarna-magia"),
    "mala-czarna-paderewskiego": canonicalResources("mala-czarna-paderewskiego"),
    "four-domes": canonicalResources("four-domes", [
      { he: "הכיפה והחזית של ביתן ארבע הכיפות", en: "Dome and facade of the Four Domes Pavilion", pl: "Kopuła i fasada Pawilonu Czterech Kopuł", de: "Kuppel und Fassade des Vier-Kuppel-Pavillons", cs: "Kupole a průčelí Pavilonu čtyř kopulí" },
      { he: "מבט חזיתי על ביתן ארבע הכיפות", en: "Front view of the Four Domes Pavilion", pl: "Widok na Pawilon Czterech Kopuł od frontu", de: "Frontalansicht des Vier-Kuppel-Pavillons", cs: "Čelní pohled na Pavilon čtyř kopulí" },
    ]),
    "aleja-bielany": canonicalResources("aleja-bielany"),
    pedet: canonicalResources("pedet", [
      { he: "PeDeT מבפנים", en: "Inside PeDeT", pl: "Wnętrze PeDeT", de: "Im PeDeT", cs: "Uvnitř PeDeT" },
      { he: "הופעה במתחם PeDeT", en: "Live music at PeDeT", pl: "Muzyka na żywo w PeDeT", de: "Live-Musik im PeDeT", cs: "Živá hudba v PeDeT" },
      { he: "אווירה ב־PeDeT", en: "The atmosphere at PeDeT", pl: "Atmosfera w PeDeT", de: "Atmosphäre im PeDeT", cs: "Atmosféra v PeDeT" },
    ]),
    "wieza-cisnien-borek": canonicalResources("wieza-cisnien-borek"),
    "rynek": canonicalResources("rynek"),
    "town-hall": canonicalResources("town-hall"),
    "dwarf-info": canonicalResources("dwarf-info"),
    papa: { guideVideos: { he: "https://youtube.com/shorts/Eyns7Gj66d0", en: "https://youtube.com/shorts/pIzp5Bmb9ck" }, facebook: facebook.rynek, instagram: instagram.rynek, gallery: ["/assets/gallery-gnomes-01.jpg", "/assets/gallery-gnomes-02.jpg", "/assets/gallery-gnomes-03.jpg", "/assets/gallery-gnomes-04.jpg", "/assets/gallery-gnomes-05.jpg", "/assets/papa-gnomes-01.jpg", "/assets/papa-gnomes-02.jpg", "/assets/papa-gnomes-03.jpg", "/assets/papa-gnomes-04.jpg", "/assets/papa-gnomes-05.jpg", "/assets/papa-gnomes-06.jpg", "/assets/papa-gnomes-07.jpg", "/assets/papa-gnomes-08.jpg", "/assets/papa-gnomes-09.jpg", "/assets/papa-gnomes-10.jpg", "/assets/papa-gnomes-11.jpg", "/assets/papa-gnomes-12.jpg", "/assets/papa-gnomes-13.jpg", "/assets/papa-gnomes-14.jpg", "/assets/papa-gnomes-15.jpg"], videos: [{"src": "https://youtube.com/shorts/gQoBaOkFAd0", "title": {"he": "פרט מההליכה בעקבות הגמדים", "en": "A moment from our dwarf walk", "pl": "Fragment spaceru szlakiem krasnali", "de": "Ein Moment vom Zwergenspaziergang", "cs": "Chvilka z procházky za trpaslíky"}}, {"src": "https://youtube.com/shorts/_m2XyzWQD7Q", "title": {"he": "גמד מהסיור שלנו", "en": "Dwarf sculpture from our walk", "pl": "Krasnal z naszego spaceru", "de": "Zwergenfigur auf unserem Spaziergang", "cs": "Trpaslík z naší procházky"}}, {"src": "https://youtube.com/shorts/Hl6Jbr2fRW4", "title": {"he": "גמד מנגן בכינור", "en": "Violinist dwarf", "pl": "Krasnal skrzypek", "de": "Geigenspielender Zwerg", "cs": "Trpaslík houslista"}}, {"src": "https://youtube.com/shorts/ONT976zS3a8", "title": {"he": "גמד מנגן בסקסופון", "en": "Saxophonist dwarf", "pl": "Krasnal saksofonista", "de": "Saxophonspielender Zwerg", "cs": "Trpaslík saxofonista"}}, {"src": "https://youtube.com/shorts/X73FCz5ZhAw", "title": {"he": "גמד מנגן בנבל", "en": "Harpist dwarf", "pl": "Krasnal harfista", "de": "Harfenspielender Zwerg", "cs": "Trpaslík harfista"}}, {"src": "https://youtube.com/shorts/MEdz8wAlpME", "title": {"he": "גמד עם גלגל אופניים", "en": "Dwarf with a bicycle wheel", "pl": "Krasnal z kołem rowerowym", "de": "Zwerg mit einem Fahrradreifen", "cs": "Trpaslík s kolem jízdního kola"}}] },
    university: { facebook: facebook.university, instagram: instagram.university, gallery: galleries.university },
    aula: { facebook: facebook.university, instagram: instagram.university, gallery: galleries.aula },
    "math-tower": canonicalResources("math-tower"),
    ossolineum: { facebook: facebook.ossolineum, instagram: instagram.ossolineum, gallery: galleries.ossolineum, videos: videos.ossolineum },
    "hala-targowa": canonicalResources("hala-targowa"),
    "market-hall": canonicalResources("hala-targowa"),
    chatka: { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries.chatka, ...canonicalResources("chatka") },
    "pan-precel": { facebook: facebook.familiar, instagram: instagram.familiar },
    "pan-precel-olawska": { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries["pan-precel-olawska"] },
    "dobra-paczkarnia-kuznicza": { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries["dobra-paczkarnia-kuznicza"] },
    "jolie-kurzy-targ": { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries["jolie-kurzy-targ"] },
    "jolie-plac-solny": { facebook: facebook.familiar, instagram: instagram.familiar },
    "most-piaskowy": { gallery: galleries.sandBridge },
    ostrow: { facebook: facebook.ostrow, instagram: instagram.ostrow, gallery: galleries.ostrow },
    cathedral: { facebook: facebook.ostrow, instagram: instagram.ostrow, gallery: galleries.cathedral },
    "ostrow-cathedral": { facebook: facebook.ostrow, instagram: instagram.ostrow, gallery: galleries.ostrow },
    hydropolis: { facebook: facebook.hydropolis, instagram: instagram.hydropolis, gallery: galleries.hydropolis },
    panorama: { facebook: facebook.panorama, instagram: instagram.panorama, gallery: galleries.panorama },
    hala: canonicalResources("hala", [
      { he: "היכל המאה והאזור שסביבו", en: "Centennial Hall and its surroundings", pl: "Hala Stulecia i jej otoczenie", de: "Jahrhunderthalle und Umgebung", cs: "Hala století a její okolí" },
      { he: "המזרקה ליד Hala Stulecia", en: "The fountain beside Centennial Hall", pl: "Fontanna przy Hali Stulecia", de: "Der Brunnen an der Jahrhunderthalle", cs: "Fontána u Haly století" },
    ]),
    fountain: canonicalResources("fountain"),
    "pergola": canonicalResources("pergola"),
    "fc-caffe-kuznicza": canonicalResources("fc-caffe-kuznicza"),
    "stadion-olimpijski-wroclaw": canonicalResources("stadion-olimpijski-wroclaw"),
    "morskie-oko-wroclaw": canonicalResources("morskie-oko-wroclaw"),
    japanese: { facebook: facebook.japanese, instagram: instagram.japanese, gallery: [...galleries.japanese, "/assets/japanese-visit-07.jpg", "/assets/japanese-visit-08.jpg"], guideVideos: { he:"https://youtube.com/shorts/x39Gu8wchuA", en:"https://youtube.com/shorts/anSJzrqzqqg" }, videos: ["https://youtube.com/shorts/Ni0GwsP-uMg", "https://youtube.com/shorts/OMuXVtwAkAA"] },
    "wroclavia": canonicalResources("wroclavia"),
    "wroclavia-station": canonicalResources("wroclavia"),
    glowny: canonicalResources("glowny", [
      { he: "חזית תחנת Wrocław Główny", en: "Wrocław Główny exterior", pl: "Fasada dworca Wrocław Główny", de: "Fassade des Hauptbahnhofs Wrocław", cs: "Průčelí nádraží Wrocław Główny" },
      { he: "התחנה והכיכר שלפניה", en: "The station and its forecourt", pl: "Dworzec i plac przed nim", de: "Der Bahnhof und sein Vorplatz", cs: "Nádraží a přednádražní prostor" }
    ]),
    "zoo-wroclaw": canonicalResources("zoo-wroclaw", [
      { he: "Afrykarium והעולם התת־מימי", en: "Afrykarium underwater experience", pl: "Podwodny świat Afrykarium", de: "Unterwasserwelt des Afrykariums", cs: "Podvodní svět Afrykaria" },
      { he: "בעל חיים בתנועה מתחת למים", en: "Aquatic animal in motion", pl: "Zwierzę wodne w ruchu", de: "Wassertier in Bewegung", cs: "Vodní zvíře v pohybu" }
    ]),
    "renoma": canonicalResources("renoma"),
    nfm: { gallery: galleries.nfm },
    opera: { facebook: facebook.opera, gallery: galleries.opera },
    "culture-evening": { facebook: facebook.opera, gallery: [...galleries.opera, ...galleries.nfm] },
    boguslawskiego: { facebook: facebook.boguslawskiego, instagram: instagram.boguslawskiego, gallery: galleries.boguslawskiego }
  };

  // Cafe-specific views only; the housing-estate gallery is independent.
  resources.wuwa = { videos: ["/assets/wuwa-cafe-visit-01.mp4"], guideVideos: { he:"https://youtube.com/shorts/tEbmB6OWe90", en:"https://youtube.com/shorts/4EnO5yNkQxc" }, gallery: ["/assets/wuwa-estate-18.jpg", "/assets/wuwa-estate-19.jpg", "/assets/wuwa-estate-20.jpg"] };
  resources["arche-klasztor"] = canonicalResources("arche-klasztor");
  resources["wroclaw-botanical-garden"] = canonicalResources("wroclaw-botanical-garden");
  for(const id of ["fc-caffe-kuznicza", "czarna-magia", "jatki", "domek-nad-fosa-wroclaw"]) resources[id]=canonicalResources(id);
  for (const id of ["altus", "puro", "herbal", "ac-hotel", "boogie-aparthouse-garbary", "art-hotel", "entre-hotel-wroclaw", "joyinn-aparthotel-wroclaw", "dwor-polski-hotel-wroclaw", "wyndham-wroclaw-old-town", "tulip-hotels-wroclaw-patio"]) resources[id] = canonicalResources(id);
  // These existing points use their complete canonical galleries in every route.
  for (const id of ["rynek", "town-hall", "university", "aula", "math-tower", "ossolineum", "jas-malgosia", "most-piaskowy", "wyspa-piasek", "most-tumski"]) {
    resources[id] = canonicalResources(id);
  }
  for (const [id, media] of Object.entries(resources)) {
    const place = window.WROC_CATALOG?.getPlace?.(id);
    if (!place) continue;
    for (const platform of ["facebook", "instagram"]) {
      const legacy = media[platform];
      Object.defineProperty(media, platform, { enumerable: true, configurable: true,
        get: () => window.WROC_CATALOG?.getSocialPost?.(place, platform)?.url });
    }
  }
  resources["mostek-pokutnic-wroclaw"] = canonicalResources("mostek-pokutnic-wroclaw");
  for(const id of ["bar-mis","bar-mleczny-mewa-wroclaw","rozowa-krowa-milk-bar-wroclaw"])resources[id]=canonicalResources(id);
  for(const id of ["papa","opera","nfm","la-maddalena","bb-hotel-wroclaw-old-town","el-gato-odrzanska-wroclaw","stary-mlyn-rynek-wroclaw","pan-precel-express-grunwaldzki","pomiedzy-cafe-bistro-wroclaw"])resources[id]=canonicalResources(id);
  window.WROC_LOCATION_MEDIA = resources;
})();

(function(){for(const id of ["central","central-cafe-nadodrze"]){const p=window.WROC_CATALOG?.getPlace(id);if(p)window.WROC_LOCATION_MEDIA[id]={gallery:p.media.photos,videos:[],get facebook(){return window.WROC_CATALOG.getSocialPost(p,"facebook")?.url;},get instagram(){return window.WROC_CATALOG.getSocialPost(p,"instagram")?.url;}}}})();

(function(){const p=window.WROC_CATALOG?.getPlace("parrot-coffee-bema");if(p)window.WROC_LOCATION_MEDIA[p.id]={gallery:p.media.photos,videos:[],get facebook(){return window.WROC_CATALOG.getSocialPost(p,"facebook")?.url;},get instagram(){return window.WROC_CATALOG.getSocialPost(p,"instagram")?.url;}}})();

(function(){const p=window.WROC_CATALOG?.getPlace("boguslawskiego");if(p)window.WROC_LOCATION_MEDIA[p.id]={gallery:p.media.photos,videos:p.media.videos,get facebook(){return window.WROC_CATALOG.getSocialPost(p,"facebook")?.url;},get instagram(){return window.WROC_CATALOG.getSocialPost(p,"instagram")?.url;}}})();

// Refresh only canonical media arrays; retain existing social and guide resources.
(()=>{for(const id of ["lodziarnia-roma", "renoma", "four-denominations-district", "wroclaw-puppet-theatre", "nfm", "czarna-magia", "kawiarenka-sw-jadwigi", "woosabi", "royal-palace-wroclaw", "ostrow", "most-tumski", "cathedral", "gniazdo", "india-concept-wroclaw"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(!p)continue;const r=window.WROC_LOCATION_MEDIA[id]||{};r.gallery=p.media.photos;r.videos=p.media.videos||[];window.WROC_LOCATION_MEDIA[id]=r;}})();

(()=>{const p=window.WROC_CATALOG?.getPlace?.("woosabi-swidnicka-wroclaw");if(p)window.WROC_LOCATION_MEDIA[p.id]={gallery:p.media.photos,videos:p.media.videos};})();

(()=>{for(const id of ["st-martin-church-wroclaw", "piastowska-pieczec-wroclaw", "lwia-brama-restaurant-wroclaw"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(p)window.WROC_LOCATION_MEDIA[id]={gallery:p.media.photos,videos:p.media.videos};}})();

(()=>{for(const id of ["most-pomorski-poludniowy-wroclaw"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(p)window.WROC_LOCATION_MEDIA[id]={gallery:p.media.photos,videos:p.media.videos};}})();

// Vega reuses the correctly identified food photograph, without a duplicate asset.
(function(){const p=window.WROC_CATALOG?.getPlace("vega-bar-weganski-wroclaw");if(p)window.WROC_LOCATION_MEDIA[p.id]={...(window.WROC_LOCATION_MEDIA[p.id]||{}),gallery:p.media.photos,videos:p.media.videos||[]};})();

// All newly published visits, including video-only deltas, reach the actual map media adapters.
(function(){for(const id of ["boleslawiec-old-town", "cathedral", "fc-caffe-kuznicza", "lwia-brama-restaurant-wroclaw", "most-tumski", "opera", "ostrow", "vega-bar-weganski-wroclaw", "wroclaw-puppet-theatre"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(p)window.WROC_LOCATION_MEDIA[id]={...(window.WROC_LOCATION_MEDIA[id]||{}),gallery:p.media.photos,videos:p.media.videos};}})();

// Preserve historical source URLs for catalog generation, separately from public actions.
window.WROC_LOCATION_MEDIA_SOURCE_SOCIAL = Object.fromEntries(Object.entries(window.WROC_LOCATION_MEDIA).map(([id,media]) => [id, {facebook:media.facebook,instagram:media.instagram}]));

// Place actions never reuse a raw account/profile URL from a legacy media adapter.
(function(){for(const[id,media]of Object.entries(window.WROC_LOCATION_MEDIA)){for(const platform of["facebook","instagram"])Object.defineProperty(media,platform,{enumerable:true,configurable:true,get:()=>{const place=window.WROC_CATALOG?.getPlace?.(id);return place?window.WROC_CATALOG.getSocialPost(place,platform)?.url:undefined;}});}})();

// Preserve Japanese Garden guide/social actions while exposing the complete canonical gallery.
(function(){const p=window.WROC_CATALOG?.getPlace?.("japanese");if(p)window.WROC_LOCATION_MEDIA.japanese={...(window.WROC_LOCATION_MEDIA.japanese||{}),gallery:p.media.photos,videos:p.media.videos};})();

// Full canonical Panorama gallery also reaches route cards and map popups.
(function(){const p=window.WROC_CATALOG?.getPlace?.("panorama");if(p)window.WROC_LOCATION_MEDIA.panorama={...(window.WROC_LOCATION_MEDIA.panorama||{}),gallery:p.media.photos};})();

// Expose every recovered original cafe photograph through the existing WuWA route/card adapter.
(function(){const p=window.WROC_CATALOG?.getPlace?.("wuwa");if(p)window.WROC_LOCATION_MEDIA.wuwa={...(window.WROC_LOCATION_MEDIA.wuwa||{}),gallery:p.media.photos};})();

// Keep the complete canonical visit playlists on actual map/card actions, retaining existing resource descriptors.
(function(){for(const id of ["pan-tadeusz-museum", "zyjnia-bwa-wroclaw", "rynek", "cafe-berg-wroclaw", "wuwa-estate"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(!p)continue;const r=window.WROC_LOCATION_MEDIA[id]||{};r.gallery=p.media.photos;r.videos=p.media.videos;window.WROC_LOCATION_MEDIA[id]=r;}})();

// Full new photo galleries on the existing cafe map cards; retain social/guide descriptors.
(function(){for(const id of ["czarna-magia", "india-concept-wroclaw", "mania-al-taglio-kuznicza", "stary-mlyn-rynek-wroclaw", "pan-precel"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(!p)continue;const r=window.WROC_LOCATION_MEDIA[id]||{};r.gallery=p.media.photos;r.videos=p.media.videos;window.WROC_LOCATION_MEDIA[id]=r;}})();

// Expose complete cafe/mall galleries through existing card actions; retain resource descriptors.
(function(){for(const id of ["mala-czarna-paderewskiego", "pasaz", "pizza-si", "woosabi-swidnicka-wroclaw"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(!p)continue;const r=window.WROC_LOCATION_MEDIA[id]||{};r.gallery=p.media.photos;window.WROC_LOCATION_MEDIA[id]=r;}})();

// The Lifestyle gallery reads the same original photo as the canonical record.
(function () {
  const place = window.WROC_CATALOG?.getPlace?.("forum-kulinarne-wroclaw");
  if (place) window.WROC_LOCATION_MEDIA[place.id] = { gallery: place.media.photos, videos: place.media.videos };
})();

// Keep the approved Oławska gallery on existing actions without changing posts or guides.
(function () {
  const place = window.WROC_CATALOG?.getPlace?.("pan-precel-olawska");
  if (place && window.WROC_LOCATION_MEDIA?.[place.id]) {
    window.WROC_LOCATION_MEDIA[place.id].gallery = place.media.photos;
  }
})();

// Keep complete named-inbox galleries on existing map and card actions.
(function(){for(const id of ["university", "ato-ramen", "wyspa-piasek", "town-hall", "dominikan", "papa", "most-piaskowy", "ostrow", "hala-targowa", "cafe-targowa", "jas-malgosia", "rynek", "dunikowski", "solny", "wroclaw-botanical-garden", "art-hotel", "doubletree", "korona-hotel", "panorama"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(!p)continue;const r=window.WROC_LOCATION_MEDIA[id]||{};r.gallery=p.media.photos;window.WROC_LOCATION_MEDIA[id]=r;}})();

// Append only the three verified Public visits, retaining existing descriptors.
(function(){for(const id of ["rynek","wroclaw-botanical-garden"]){const p=window.WROC_CATALOG?.getPlace?.(id);if(!p)continue;const r=window.WROC_LOCATION_MEDIA[id]||{};r.videos=r.videos||[];for(const src of p.media.videos){if(!r.videos.some(v=>(typeof v==="string"?v:v.src)===src)){r.videos.push({src,title:p.media.metadata[src].title});}}window.WROC_LOCATION_MEDIA[id]=r;}})();

// Reflect the canonical photo reassignment in existing aliases, including an empty source gallery.
(function(){for(const canonicalId of ["dunikowski","marina"]){const p=window.WROC_CATALOG?.getPlace(canonicalId);if(!p)continue;for(const id of [canonicalId,...Object.entries(window.WROC_CATALOG.aliases).filter(([,target])=>target===canonicalId).map(([alias])=>alias)]){const r=window.WROC_LOCATION_MEDIA[id];if(r)r.gallery=p.media.photos;else window.WROC_LOCATION_MEDIA[id]={gallery:p.media.photos};}}})();

// Refresh both itinerary appearances from the canonical promenade gallery.
(function(){const p=window.WROC_CATALOG?.getPlace("dunikowski");if(!p)return;for(const id of ["dunikowski","dunikowski-final"]){const r=window.WROC_LOCATION_MEDIA[id]||{};r.gallery=p.media.photos;window.WROC_LOCATION_MEDIA[id]=r;}})();

// Shared photographs for the newly requested music venue and city garden.
(function(){for(const id of ["klub-lacznik-wroclaw","copernicus-park-wroclaw"]){const p=window.WROC_CATALOG?.getPlace(id);if(p)window.WROC_LOCATION_MEDIA[id]={gallery:p.media.photos,videos:p.media.videos};}})();

(function(){const p=window.WROC_CATALOG?.getPlace("cafe-lyk-wroclaw");if(p)window.WROC_LOCATION_MEDIA[p.id]={gallery:p.media.photos,videos:p.media.videos};})();
