(function () {
  "use strict";

  const gallery = (prefix, count) => Array.from({ length: count }, (_, index) =>
    `/assets/gallery-${prefix}-${String(index + 1).padStart(2, "0")}.jpg`);

  const galleries = {
    gnomes: gallery("gnomes", 5),
    rynek: ["/assets/rynek-market-square.jpg"],
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
    cathedral: gallery("cathedral", 6),
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
    ossolineum: "https://www.facebook.com/61591964083308/posts/122111795823398802/",
    marketHall: "https://www.facebook.com/photo/?fbid=122110916907398802",
    opera: "https://www.facebook.com/photo/?fbid=122108355723398802",
    boguslawskiego: "https://www.facebook.com/61591964083308/posts/122109385623398802/",
    hydropolis: "https://www.facebook.com/61591964083308/posts/122107706685398802/",
    panorama: "https://www.facebook.com/61591964083308/posts/122109893193398802/",
    familiar: "https://www.facebook.com/61591964083308/posts/122111800983398802/"
  };

  const instagram = {
    rynek: "https://www.instagram.com/wroclaw.lowersilesia/p/Dbc4V7NnBl_/",
    ossolineum: "https://www.instagram.com/wroclaw.lowersilesia/p/DbxOsQ_nEQt/",
    marketHall: "https://www.instagram.com/wroclaw.lowersilesia/p/DbpTgt_HFkH/",
    boguslawskiego: "https://www.instagram.com/wroclaw.lowersilesia/p/Dbc11E7HIcn/",
    hydropolis: "https://www.instagram.com/p/Dbf-GySnOyi/",
    panorama: "https://www.instagram.com/p/Dbf-y1HHDum/",
    familiar: "https://www.instagram.com/wroclaw.lowersilesia/p/DbxYEOqjBXH/"
  };

  const resources = {
    rynek: { gallery: galleries.rynek, videos: videos.rynek },
    "dwarf-info": { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes },
    papa: { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes },
    university: { gallery: galleries.university },
    aula: { gallery: galleries.aula },
    "math-tower": { gallery: galleries.university },
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
    "wyspa-piasek": { gallery: galleries.cathedral },
    ostrow: { gallery: galleries.cathedral },
    cathedral: { gallery: galleries.cathedral },
    "ostrow-cathedral": { gallery: galleries.cathedral },
    hydropolis: { facebook: facebook.hydropolis, instagram: instagram.hydropolis, gallery: galleries.hydropolis },
    panorama: { facebook: facebook.panorama, instagram: instagram.panorama, gallery: galleries.panorama },
    hala: { gallery: galleries.stulecia, videos: videos.stulecia },
    fountain: { gallery: galleries.stulecia, videos: videos.stulecia },
    wroclavia: { gallery: galleries.wroclavia },
    "wroclavia-station": { gallery: galleries.wroclavia },
    renoma: { gallery: galleries.renoma },
    nfm: { gallery: galleries.nfm },
    opera: { facebook: facebook.opera, gallery: galleries.opera },
    "culture-evening": { facebook: facebook.opera, gallery: [...galleries.opera, ...galleries.nfm] },
    boguslawskiego: { facebook: facebook.boguslawskiego, instagram: instagram.boguslawskiego, gallery: galleries.boguslawskiego }
  };

  window.WROC_LOCATION_MEDIA = resources;
})();
