(function () {
  "use strict";

  const gallery = (prefix, count) => Array.from({ length: count }, (_, index) =>
    `/assets/gallery-${prefix}-${String(index + 1).padStart(2, "0")}.jpg`);

  const galleries = {
    gnomes: gallery("gnomes", 5),
    university: gallery("university", 5),
    marketHall: gallery("hala", 6),
    cathedral: gallery("cathedral", 6),
    nfm: gallery("nfm", 3),
    opera: gallery("opera", 6),
    boguslawskiego: gallery("boguslawskiego", 6),
    stulecia: gallery("stulecia", 4),
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
    ossolineum: "https://www.facebook.com/61591964083308/posts/122111788125398802/",
    marketHall: "https://www.facebook.com/photo/?fbid=122110916907398802",
    opera: "https://www.facebook.com/photo/?fbid=122108355723398802",
    boguslawskiego: "https://www.facebook.com/61591964083308/posts/122109385623398802/"
  };

  const instagram = {
    rynek: "https://www.instagram.com/wroclaw.lowersilesia/p/Dbc4V7NnBl_/",
    ossolineum: "https://www.instagram.com/wroclaw.lowersilesia/p/DbxOsQ_nEQt/",
    marketHall: "https://www.instagram.com/wroclaw.lowersilesia/p/DbpTgt_HFkH/",
    boguslawskiego: "https://www.instagram.com/wroclaw.lowersilesia/p/Dbc11E7HIcn/"
  };

  const resources = {
    rynek: { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes, videos: videos.rynek },
    "dwarf-info": { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes },
    papa: { facebook: facebook.rynek, instagram: instagram.rynek, gallery: galleries.gnomes },
    university: { gallery: galleries.university },
    aula: { gallery: galleries.university },
    "math-tower": { gallery: galleries.university },
    ossolineum: { facebook: facebook.ossolineum, instagram: instagram.ossolineum, gallery: galleries.ossolineum, videos: videos.ossolineum },
    "hala-targowa": { facebook: facebook.marketHall, instagram: instagram.marketHall, gallery: galleries.marketHall },
    "market-hall": { facebook: facebook.marketHall, instagram: instagram.marketHall, gallery: galleries.marketHall },
    "most-tumski": { gallery: galleries.cathedral },
    "tumski-bridge": { gallery: galleries.cathedral },
    "wyspa-piasek": { gallery: galleries.cathedral },
    ostrow: { gallery: galleries.cathedral },
    cathedral: { gallery: galleries.cathedral },
    "ostrow-cathedral": { gallery: galleries.cathedral },
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
