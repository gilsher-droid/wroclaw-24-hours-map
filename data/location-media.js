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
    tumskiBridge: ["/assets/gallery-cathedral-02.jpg"],
    nfm: gallery("nfm", 3),
    opera: gallery("opera", 6),
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
    const facebookPost = place.socialPosts?.find((post) => post.platform === "facebook")?.url;
    const instagramPost = place.socialPosts?.find((post) => post.platform === "instagram")?.url;
    return {
      ...(facebookPost ? { facebook: facebookPost } : {}),
      ...(instagramPost ? { instagram: instagramPost } : {}),
      ...(place.media?.photos?.length ? { gallery: place.media.photos } : {}),
      ...(place.media?.videos?.length ? {
        videos: place.media.videos.map((src, index) => ({
          src,
          title: videoTitles[index] || place.name,
        })),
      } : {}),
    };
  };

  const resources = {
    rynek: { gallery: [...galleries.rynek, ...galleries.townHall], videos: videos.rynek },
    "town-hall": { gallery: galleries.townHall },
    "dwarf-info": { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes },
    papa: { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes },
    university: { facebook: facebook.university, instagram: instagram.university, gallery: galleries.university },
    aula: { facebook: facebook.university, instagram: instagram.university, gallery: galleries.aula },
    "math-tower": { facebook: facebook.university, instagram: instagram.university, gallery: galleries.university },
    ossolineum: { facebook: facebook.ossolineum, instagram: instagram.ossolineum, gallery: galleries.ossolineum, videos: videos.ossolineum },
    "hala-targowa": { facebook: facebook.marketHall, instagram: instagram.marketHall, gallery: galleries.marketHall },
    "market-hall": { facebook: facebook.marketHall, instagram: instagram.marketHall, gallery: galleries.marketHall },
    chatka: { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries.chatka },
    "pan-precel": { facebook: facebook.familiar, instagram: instagram.familiar },
    "pan-precel-olawska": { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries["pan-precel-olawska"] },
    "dobra-paczkarnia-kuznicza": { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries["dobra-paczkarnia-kuznicza"] },
    "jolie-kurzy-targ": { facebook: facebook.familiar, instagram: instagram.familiar, gallery: galleries["jolie-kurzy-targ"] },
    "jolie-plac-solny": { facebook: facebook.familiar, instagram: instagram.familiar },
    "most-tumski": { gallery: galleries.tumskiBridge },
    "tumski-bridge": { gallery: galleries.tumskiBridge },
    ostrow: { facebook: facebook.ostrow, instagram: instagram.ostrow, gallery: galleries.ostrow },
    cathedral: { facebook: facebook.ostrow, instagram: instagram.ostrow, gallery: galleries.cathedral },
    "ostrow-cathedral": { facebook: facebook.ostrow, instagram: instagram.ostrow, gallery: galleries.ostrow },
    hydropolis: { facebook: facebook.hydropolis, instagram: instagram.hydropolis, gallery: galleries.hydropolis },
    panorama: { facebook: facebook.panorama, instagram: instagram.panorama, gallery: galleries.panorama },
    hala: { facebook: facebook.hala, instagram: instagram.hala, gallery: galleries.stulecia, videos: videos.stulecia },
    fountain: { gallery: galleries.stulecia, videos: videos.stulecia },
    japanese: { facebook: facebook.japanese, instagram: instagram.japanese, gallery: galleries.japanese },
    wroclavia: { gallery: galleries.wroclavia },
    "wroclavia-station": { gallery: galleries.wroclavia },
    glowny: canonicalResources("glowny", [
      { he: "חזית תחנת Wrocław Główny", en: "Wrocław Główny exterior", pl: "Fasada dworca Wrocław Główny", de: "Fassade des Hauptbahnhofs Wrocław", cs: "Průčelí nádraží Wrocław Główny" },
      { he: "התחנה והכיכר שלפניה", en: "The station and its forecourt", pl: "Dworzec i plac przed nim", de: "Der Bahnhof und sein Vorplatz", cs: "Nádraží a přednádražní prostor" }
    ]),
    "zoo-wroclaw": canonicalResources("zoo-wroclaw", [
      { he: "Afrykarium והעולם התת־מימי", en: "Afrykarium underwater experience", pl: "Podwodny świat Afrykarium", de: "Unterwasserwelt des Afrykariums", cs: "Podvodní svět Afrykaria" },
      { he: "בעל חיים בתנועה מתחת למים", en: "Aquatic animal in motion", pl: "Zwierzę wodne w ruchu", de: "Wassertier in Bewegung", cs: "Vodní zvíře v pohybu" }
    ]),
    renoma: { gallery: galleries.renoma },
    nfm: { gallery: galleries.nfm },
    opera: { facebook: facebook.opera, gallery: galleries.opera },
    "culture-evening": { facebook: facebook.opera, gallery: [...galleries.opera, ...galleries.nfm] },
    boguslawskiego: { facebook: facebook.boguslawskiego, instagram: instagram.boguslawskiego, gallery: galleries.boguslawskiego }
  };

  window.WROC_LOCATION_MEDIA = resources;
})();
