(function () {
  "use strict";

  const pedetPhotoSources = [
    ["12.57.34 (1)", "מבט רחב על חלל הישיבה ב־PeDeT", "Wide view of the PeDeT seating area"],
    ["12.56.36", "הבר והשולחן המרכזי ב־PeDeT", "The bar and communal table at PeDeT"],
    ["12.57.40 (1)", "אורחים והופעה חיה ב־PeDeT", "Guests and live music at PeDeT"],
    ["12.56.42 (2)", "נגן גיטרה מול שלט PeDeT", "Guitarist in front of the PeDeT sign"],
    ["12.56.42 (1)", "במה קטנה ושלט PeDeT מואר", "Small stage and illuminated PeDeT sign"],
    ["12.56.41", "דוכן אוכל בתוך מתחם PeDeT", "Food stall inside PeDeT"],
    ["12.56.41 (1)", "שורת דוכני אוכל ב־PeDeT", "Row of food stalls at PeDeT"],
    ["12.56.41 (2)", "מעבר בין דוכני האוכל ב־PeDeT", "Walkway between PeDeT food stalls"],
    ["12.56.42", "שלט הכניסה למתחם PeDeT", "PeDeT entrance sign"],
    ["12.57.34 (2)", "שולחן משותף ומקומות ישיבה ב־PeDeT", "Communal table and seating at PeDeT"],
    ["12.57.34 (3)", "דוכן אוכל במתחם Renoma ליד PeDeT", "Food stall in Renoma near PeDeT"],
    ["12.57.35 (1)", "לוגו PeDeT על קיר", "PeDeT logo on a wall"],
    ["12.57.35", "שלט PeDeT על קיר אפור", "PeDeT lettering on a grey wall"],
    ["12.57.40 (2)", "הבר ואזור הישיבה ב־PeDeT", "Bar and seating area at PeDeT"],
    ["12.57.40", "אורחים ליד הבר של PeDeT", "Guests by the PeDeT bar"],
  ];
  const pedetPhotos = pedetPhotoSources.map((_, index) => `/assets/pedet-${String(index + 1).padStart(2, "0")}.jpg`);
  const pedetVideoSources = ["12.56.40", "12.57.37", "12.57.39"];
  const pedetVideos = pedetVideoSources.map((_, index) => `/assets/video-pedet-${String(index + 1).padStart(2, "0")}.mp4`);

  // Editorial source of truth for canonical places that do not need to belong
  // to an existing route or product. Every record added here must provide its
  // geography explicitly; no city is inferred by the catalog generator.
  window.WROC_CANONICAL_PLACE_SOURCE = [
{
  "id": "warsaw-nozyk-synagogue",
  "localName": "Synagoga Nożyków w Warszawie",
  "name": {
    "he": "בית הכנסת נוז׳יק בוורשה",
    "en": "Nożyk Synagogue, Warsaw",
    "pl": "Synagoga Nożyków w Warszawie",
    "de": "Nożyk-Synagoge in Warschau",
    "cs": "Nożykova synagoga ve Varšavě"
  },
  "description": {
    "he": "בית הכנסת ברחוב טווארדה 6 הוא מקום תפילה פעיל ומוקד של הקהילה היהודית בוורשה. תמונות הביקור שלנו מציגות פרטים אדריכליים בפנים. לפני ביקור בדקו באתר הקהילה את אפשרויות הכניסה וכבדו את כללי המקום.",
    "en": "The synagogue at 6 Twarda Street is an active place of worship and a centre of Warsaw’s Jewish community. Our visit photos show architectural details inside. Check visitor access with the community and respect the rules of the site.",
    "pl": "Synagoga przy Twardej 6 jest czynnym miejscem modlitwy i ośrodkiem warszawskiej społeczności żydowskiej. Nasze zdjęcia pokazują detale architektoniczne wnętrza. Przed wizytą sprawdź zasady zwiedzania w gminie i uszanuj reguły miejsca.",
    "de": "Die Synagoge an der Twarda 6 ist ein aktives Gotteshaus und Zentrum der jüdischen Gemeinde Warschaus. Unsere Besuchsfotos zeigen architektonische Details im Inneren. Besuchsmöglichkeiten bei der Gemeinde prüfen und die Regeln vor Ort beachten.",
    "cs": "Synagoga v ulici Twarda 6 je aktivním místem modlitby a centrem varšavské židovské obce. Naše fotografie zachycují detaily interiéru. Před návštěvou ověřte přístup u obce a respektujte pravidla místa."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "masovian",
    "cityId": "warsaw",
    "coordinates": {
      "lat": 52.2360735,
      "lng": 21.0010467
    },
    "address": {
      "city": "Warszawa",
      "country": "Poland"
    }
  },
  "categories": [
    "history"
  ],
  "taxonomy": {
    "tags": [
      "warsaw",
      "optional-before-departure"
    ]
  },
  "links": {
    "website": "https://warszawa.jewish.org.pl/en/visit/warsaw/nozyk",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=52.2360735%2C21.0010467"
    },
    "socialProfileFallback": false
  },
  "media": {
    "photos": [
      "/assets/warsaw/warsaw-nozyk-synagogue-01.jpg",
      "/assets/warsaw/warsaw-nozyk-synagogue-02.jpg",
      "/assets/warsaw/warsaw-nozyk-synagogue-03.jpg",
      "/assets/warsaw/warsaw-nozyk-synagogue-04.jpg"
    ],
    "videos": [],
    "thumbnail": "/assets/warsaw/warsaw-nozyk-synagogue-01.jpg",
    "metadata": {
      "/assets/warsaw/warsaw-nozyk-synagogue-01.jpg": {
        "original": true,
        "sourceFile": "ווארשה/WhatsApp Image 2026-10-18 at 09.54.25.jpeg",
        "sourceSHA256": "e69eff48469e4ba0d4c6e793f5c22519f582ccce9260266d50d2626a8355e889",
        "assetSHA256": "19ff449f689e83b1f71e7318731ce605a7cb017ca54f32e8146426676ac34027",
        "alt": {
          "he": "בית הכנסת נוז׳יק בוורשה",
          "en": "Nożyk Synagogue, Warsaw",
          "pl": "Synagoga Nożyków w Warszawie",
          "de": "Nożyk-Synagoge in Warschau",
          "cs": "Nożykova synagoga ve Varšavě"
        },
        "familyForeground": false
      },
      "/assets/warsaw/warsaw-nozyk-synagogue-02.jpg": {
        "original": true,
        "sourceFile": "ווארשה/WhatsApp Image 2026-10-18 at 09.54.24 (2).jpeg",
        "sourceSHA256": "15fceabd6d62348adcea48e0b8a8bdca821559971dcb4ea5ca4374aa4ccbd62b",
        "assetSHA256": "b9eb04be22767c2c059a75b60112c205663fad2bb57b9e5f9fa911de1c1b9330",
        "alt": {
          "he": "בית הכנסת נוז׳יק בוורשה",
          "en": "Nożyk Synagogue, Warsaw",
          "pl": "Synagoga Nożyków w Warszawie",
          "de": "Nożyk-Synagoge in Warschau",
          "cs": "Nożykova synagoga ve Varšavě"
        },
        "familyForeground": false
      },
      "/assets/warsaw/warsaw-nozyk-synagogue-03.jpg": {
        "original": true,
        "sourceFile": "ווארשה/WhatsApp Image 2026-10-18 at 09.54.24 (5).jpeg",
        "sourceSHA256": "7410f7dadb7440ad9034186144fe2ba13446535e7edc9b4a26221e7bde286fc8",
        "assetSHA256": "3376b6d1e2c404f8acf161a91149bc9b61798a4eec6e0fe97cf59aa39385401d",
        "alt": {
          "he": "בית הכנסת נוז׳יק בוורשה",
          "en": "Nożyk Synagogue, Warsaw",
          "pl": "Synagoga Nożyków w Warszawie",
          "de": "Nożyk-Synagoge in Warschau",
          "cs": "Nożykova synagoga ve Varšavě"
        },
        "familyForeground": false
      },
      "/assets/warsaw/warsaw-nozyk-synagogue-04.jpg": {
        "original": true,
        "sourceFile": "ווארשה/WhatsApp Image 2026-10-05 at 18.24.29.jpeg",
        "sourceSHA256": "295346d89ac728b99577dddffb60ea5cdf6d751aeedb86eb8728b2138fa668b4",
        "assetSHA256": "237b73a7cac0961579d46d77ed631665682c863cac2552f69506c87b7464bc74",
        "alt": {
          "he": "בית הכנסת נוז׳יק בוורשה",
          "en": "Nożyk Synagogue, Warsaw",
          "pl": "Synagoga Nożyków w Warszawie",
          "de": "Nożyk-Synagoge in Warschau",
          "cs": "Nożykova synagoga ve Varšavě"
        },
        "familyForeground": false
      }
    }
  },
  "source": {
    "kind": "editorial-original-media",
    "coordinateSource": "https://www.openstreetmap.org/api/0.6/way/32792753/full",
    "verifiedAt": "2026-10-18"
  }
},
{
  "id": "warsaw-unknown-soldier",
  "localName": "Grób Nieznanego Żołnierza w Warszawie",
  "name": {
    "he": "קבר החייל האלמוני בוורשה",
    "en": "Tomb of the Unknown Soldier, Warsaw",
    "pl": "Grób Nieznanego Żołnierza w Warszawie",
    "de": "Grabmal des unbekannten Soldaten, Warschau",
    "cs": "Hrob neznámého vojína ve Varšavě"
  },
  "description": {
    "he": "אתר זיכרון בכיכר פילסודסקי, בתוך שרידי האכסדרה של הארמון הסקסוני. בתמונה שלנו נראים הקשתות ואש התמיד. זו עצירת התבוננות שקטה בסמוך לגן הסקסוני, ללא הבטחה לטקס בשעה מסוימת.",
    "en": "A memorial on Piłsudski Square, within the surviving arcade of the Saxon Palace. Our photo shows the arches and eternal flame. A quiet stop beside the Saxon Garden, without a promise of a ceremony at a particular time.",
    "pl": "Miejsce pamięci na placu Piłsudskiego, w zachowanej arkadzie Pałacu Saskiego. Nasze zdjęcie pokazuje łuki i wieczny ogień. Spokojny przystanek przy Ogrodzie Saskim, bez obietnicy ceremonii o określonej porze.",
    "de": "Gedenkstätte am Piłsudski-Platz in der erhaltenen Arkade des Sächsischen Palais. Unser Foto zeigt die Bögen und das ewige Feuer. Ein ruhiger Halt am Sächsischen Garten, ohne Zusage einer Zeremonie zu einer bestimmten Zeit.",
    "cs": "Památník na Piłsudského náměstí v dochované arkádě Saského paláce. Naše fotografie ukazuje oblouky a věčný oheň. Klidná zastávka u Saské zahrady bez příslibu obřadu v určitou hodinu."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "masovian",
    "cityId": "warsaw",
    "coordinates": {
      "lat": 52.2409544,
      "lng": 21.0113136
    },
    "address": {
      "city": "Warszawa",
      "country": "Poland"
    }
  },
  "categories": [
    "history"
  ],
  "taxonomy": {
    "tags": [
      "warsaw",
      "optional-before-departure"
    ]
  },
  "links": {
    "website": "https://go2warsaw.pl/en/warsaw-is-awash-with-greenery/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=52.2409544%2C21.0113136"
    },
    "socialProfileFallback": false
  },
  "media": {
    "photos": [
      "/assets/warsaw/warsaw-unknown-soldier-01.jpg"
    ],
    "videos": [],
    "thumbnail": "/assets/warsaw/warsaw-unknown-soldier-01.jpg",
    "metadata": {
      "/assets/warsaw/warsaw-unknown-soldier-01.jpg": {
        "original": true,
        "sourceFile": "ווארשה/WhatsApp Image 2026-10-05 at 18.24.20 (3).jpeg",
        "sourceSHA256": "c4f68efd877f985a20256c5af2d4d55555af323fd73c739da4988b609b390716",
        "assetSHA256": "179f0a0113e9686bd8e694a2d1cafaf2f46b1b044ebacd70a5c1a4c107e6613c",
        "alt": {
          "he": "קבר החייל האלמוני בוורשה",
          "en": "Tomb of the Unknown Soldier, Warsaw",
          "pl": "Grób Nieznanego Żołnierza w Warszawie",
          "de": "Grabmal des unbekannten Soldaten, Warschau",
          "cs": "Hrob neznámého vojína ve Varšavě"
        },
        "familyForeground": false
      }
    }
  },
  "source": {
    "kind": "editorial-original-media",
    "coordinateSource": "https://www.openstreetmap.org/api/0.6/way/72833763/full",
    "verifiedAt": "2026-10-18"
  }
},
{
  "id": "warsaw-saxon-garden-fountain",
  "localName": "Fontanna Wielka w Ogrodzie Saskim",
  "name": {
    "he": "המזרקה בגן הסקסוני בוורשה",
    "en": "Saxon Garden Fountain, Warsaw",
    "pl": "Fontanna Wielka w Ogrodzie Saskim",
    "de": "Große Fontäne im Sächsischen Garten",
    "cs": "Velká fontána v Saské zahradě"
  },
  "description": {
    "he": "המזרקה הגדולה בגן הסקסוני היא עצירה ירוקה במרכז ורשה, סמוך לקבר החייל האלמוני. בתמונת הביקור שלנו נראים אגן המזרקה ועצי הגן. פעולת המים תלויה בעונה ובתנאי התפעול.",
    "en": "The Great Fountain in the Saxon Garden offers a green stop in central Warsaw, close to the Tomb of the Unknown Soldier. Our visit photo shows the basin and surrounding trees. Water operation depends on season and operating conditions.",
    "pl": "Fontanna Wielka w Ogrodzie Saskim to zielony przystanek w centrum Warszawy, blisko Grobu Nieznanego Żołnierza. Zdjęcie z wizyty pokazuje jej basen i drzewa ogrodu. Działanie wody zależy od sezonu i warunków eksploatacji.",
    "de": "Die Große Fontäne im Sächsischen Garten bietet eine grüne Pause im Zentrum Warschaus, nahe dem Grabmal des unbekannten Soldaten. Unser Besuchsfoto zeigt das Becken und die Bäume. Der Wasserbetrieb hängt von Saison und Betriebsbedingungen ab.",
    "cs": "Velká fontána v Saské zahradě nabízí zelenou zastávku v centru Varšavy nedaleko Hrobu neznámého vojína. Fotografie zachycuje nádrž a okolní stromy. Provoz vody závisí na roční době a provozních podmínkách."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "masovian",
    "cityId": "warsaw",
    "coordinates": {
      "lat": 52.240792,
      "lng": 21.010229
    },
    "address": {
      "city": "Warszawa",
      "country": "Poland"
    }
  },
  "categories": [
    "park"
  ],
  "taxonomy": {
    "tags": [
      "warsaw",
      "optional-before-departure"
    ]
  },
  "links": {
    "website": "https://go2warsaw.pl/en/warsaw-is-awash-with-greenery/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=52.240792%2C21.010229"
    },
    "socialProfileFallback": false
  },
  "media": {
    "photos": [
      "/assets/warsaw/warsaw-saxon-garden-fountain-01.jpg"
    ],
    "videos": [],
    "thumbnail": "/assets/warsaw/warsaw-saxon-garden-fountain-01.jpg",
    "metadata": {
      "/assets/warsaw/warsaw-saxon-garden-fountain-01.jpg": {
        "original": true,
        "sourceFile": "ווארשה/WhatsApp Image 2026-10-05 at 18.24.20 (5).jpeg",
        "sourceSHA256": "c021043121b153191b2c41431374e20d2b635448046e173d6c19d750b2a852f4",
        "assetSHA256": "74889698846e4a477b2072944c3d4f14b1c0294f0f878ca2bebf78567f16774c",
        "alt": {
          "he": "המזרקה בגן הסקסוני בוורשה",
          "en": "Saxon Garden Fountain, Warsaw",
          "pl": "Fontanna Wielka w Ogrodzie Saskim",
          "de": "Große Fontäne im Sächsischen Garten",
          "cs": "Velká fontána v Saské zahradě"
        },
        "familyForeground": false
      }
    }
  },
  "source": {
    "kind": "editorial-original-media",
    "coordinateSource": "https://www.openstreetmap.org/api/0.6/way/72833745/full",
    "verifiedAt": "2026-10-18"
  }
},
{
  "id": "mania-al-taglio-kuznicza",
  "aliases": [
    "מניה",
    "מאניה",
    "Mania Kuźnicza",
    "Mania Al Taglio"
  ],
  "localName": "Mania Al Taglio • Kuźnicza",
  "name": {
    "he": "מניה אל טאליו, קוז׳ניצ׳ה",
    "en": "Mania Al Taglio • Kuźnicza",
    "pl": "Mania Al Taglio • Kuźnicza",
    "de": "Mania Al Taglio • Kuźnicza",
    "cs": "Mania Al Taglio • Kuźnicza"
  },
  "description": {
    "he": "פיצרייה ברחוב קוז׳ניצ׳ה בעיר העתיקה, המתמחה בפיצה רומאית מלבנית הנמכרת במנות. זהו סניף קוז׳ניצ׳ה של מניה, ולא הסניף שברחוב אולבסקה. בתמונת הביקור שלנו נראים החזית, שלט הניאון והתור בחוץ. אפשר לשלב עצירה לאוכל במהלך הליכה באזור האוניברסיטה וכיכר השוק. בדקו בתפריט הרשמי את ההיצע, המחירים ושעות הפתיחה; התמונה מתעדת את הביקור שלנו ולא מבטיחה עומס או מנות זהים כיום.",
    "en": "A pizzeria on Kuźnicza in the Old Town, specialising in rectangular Roman-style pizza sold by the slice. This is Mania’s Kuźnicza branch, distinct from its Oławska location. Our visit photograph shows the frontage, neon sign and queue outside. Consider a food stop while walking between the university area and Market Square. Check the official menu for the selection, prices and opening hours; our photograph records a visit rather than guaranteeing the same dishes or queue today.",
    "pl": "Pizzeria przy Kuźniczej na Starym Mieście, specjalizująca się w prostokątnej pizzy w stylu rzymskim sprzedawanej na kawałki. To lokal Manii przy Kuźniczej, odrębny od punktu przy Oławskiej. Zdjęcie z naszej wizyty pokazuje fasadę, neon i kolejkę przed wejściem. Może być przystankiem na jedzenie podczas spaceru między okolicą uniwersytetu a Rynkiem. Aktualny wybór, ceny i godziny otwarcia sprawdź w oficjalnym menu; fotografia dokumentuje wizytę i nie gwarantuje dzisiejszej oferty ani długości kolejki.",
    "de": "Pizzeria an der Kuźnicza in der Altstadt mit rechteckiger Pizza nach römischer Art, die stückweise verkauft wird. Gemeint ist die Filiale an der Kuźnicza, nicht der Standort an der Oławska. Unser Besuchsfoto zeigt die Fassade, die Leuchtschrift und die Schlange vor dem Eingang. Ein möglicher Essensstopp beim Spaziergang zwischen Universität und Rynek. Auswahl, Preise und Öffnungszeiten im offiziellen Menü prüfen; das Foto dokumentiert unseren Besuch und garantiert weder die heutige Auswahl noch eine bestimmte Warteschlange.",
    "cs": "Pizzerie v ulici Kuźnicza ve Starém Městě, zaměřená na obdélníkovou pizzu římského typu prodávanou po kusech. Jde o pobočku Manie v ulici Kuźnicza, nikoli o provozovnu v ulici Oławska. Fotografie z naší návštěvy ukazuje průčelí, neonový nápis a frontu před vchodem. Může posloužit jako zastávka na jídlo při procházce mezi univerzitní čtvrtí a Rynkem. Aktuální nabídku, ceny a otevírací dobu ověřte v oficiálním menu; fotografie zachycuje naši návštěvu a nezaručuje dnešní nabídku ani délku fronty."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1125673,
      "lng": 17.0345083
    },
    "address": {
      "street": "Kuźnicza 25",
      "postalCode": "50-147",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat"
  ],
  "taxonomy": {
    "tags": [
      "pizza",
      "roman-pizza",
      "old-town",
      "wroclaw"
    ]
  },
  "links": {
    "website": "https://mania.pizza/zamow/kuznicza/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1125673%2C17.0345083",
      "appleMaps": "https://maps.apple.com/?ll=51.1125673,17.0345083"
    },
    "socialProfileFallback": false
  },
  "media": {
    "photos": [
      "/assets/food-cafes/mania-al-taglio-kuznicza-01.jpg"
    ],
    "videos": [
      "/assets/mania-al-taglio-kuznicza-visit-01.mp4"
    ],
    "metadata": {
      "/assets/food-cafes/mania-al-taglio-kuznicza-01.jpg": {
        "original": true,
        "sourceFile": "mania/WhatsApp Image 2026-10-05 at 18.25.01.jpeg",
        "sourceSHA256": "b06824a6e50885a3d19f02d9191ebf4e1cc817219b99f61f49893caba3f8bbd0",
        "assetSHA256": "7498ce2b1c4054677377c494596505160195045a47ba16f3143b69f57c3c1de8",
        "alt": {
          "he": "חזית הפיצרייה ושלט הניאון בעת הביקור",
          "en": "Pizzeria frontage and neon sign during our visit",
          "pl": "Fasada pizzerii i neon podczas naszej wizyty",
          "de": "Fassade der Pizzeria und Leuchtschrift bei unserem Besuch",
          "cs": "Průčelí pizzerie a neonový nápis při naší návštěvě"
        },
        "heroCandidate": true
      },
      "/assets/mania-al-taglio-kuznicza-visit-01.mp4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/mania/WhatsApp Video 2026-10-05 at 18.25.02.mp4",
        "sourceSHA256": "ae7f607a5a803ecafe38f42471573b9b28a4bbce62c051307624b101b94c9d7d",
        "youtube": "https://youtube.com/shorts/JwK2shHUx8g",
        "visibility": "public",
        "checks": "complete-no-issues",
        "verifiedAt": "2026-10-18"
      }
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "factualSources": [
      {
        "url": "https://mania.pizza/zamow/kuznicza/",
        "verifiedAt": "2026-10-18",
        "scope": "official branch identity, Kuźnicza25 address, Roman pizza slices and official directions link"
      },
      {
        "url": "https://maps.app.goo.gl/aM9xSTgqLgq3gEB67",
        "verifiedAt": "2026-10-18",
        "scope": "official branch directions link redirects to place coordinates51.1125673,17.0345083"
      },
      {
        "url": "https://bubblejoy.pl/",
        "verifiedAt": "2026-10-18",
        "scope": "official indexed Kuźnicza25 branch corroborates adjacent BubbleJoy sign in source photographs"
      }
    ],
    "socialVerification": {
      "audit": "/data/mania-social-audit.json",
      "verifiedPosts": 0,
      "status": "no-exact-place-post-candidate-found-in-registry-or-accessible-documentation;not-exhaustive-account-absence"
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "park-szczytnicki-wroclaw",
  "aliases": [
    "Park Szczytnicki",
    "Szczytnicki Park",
    "Scheitniger Park",
    "פארק שטניצקי",
    "פארק שצ׳יטניצקי"
  ],
  "localName": "Park Szczytnicki",
  "name": {
    "he": "פארק שטניצקי",
    "en": "Szczytnicki Park",
    "pl": "Park Szczytnicki",
    "de": "Scheitniger Park",
    "cs": "Park Szczytnicki"
  },
  "description": {
    "he": "פארק נוף היסטורי במזרח ורוצלב, עם שדרות עצים, שבילים, מים ופינות שקטות להליכה. ראשיתו בגן שהוקם בשנת 1783, ובין האתרים שבשטחו כנסיית העץ של יוחנן מנפומוק. הגלריה מתעדת את הכנסייה, תעלת המים והעצים מהביקור שלנו. אפשר לשלבו ביום הביקור באזור היכל המאה. הגן היפני, היכל המאה והמזרקה נשארים נקודות נפרדות במפות, עם תנאי ביקור משלהם.",
    "en": "A historic landscape park in eastern Wrocław, with tree-lined paths, water and quiet spaces for a walk. Its origins go back to a garden established in 1783; the wooden Church of St John of Nepomuk is one of its landmarks. Our gallery shows the church, a watercourse and trees from our visit. Combine a walk with the Centennial Hall area. The Japanese Garden, hall and fountain remain separate map places with their own visiting arrangements.",
    "pl": "Zabytkowy park krajobrazowy we wschodnim Wrocławiu, z alejami drzew, wodą i spokojnymi miejscami na spacer. Jego początki sięgają ogrodu założonego w 1783 roku; jednym z obiektów jest drewniany kościół św. Jana Nepomucena. Nasza galeria pokazuje kościół, ciek wodny i drzewa podczas wizyty. Spacer można połączyć z okolicą Hali Stulecia. Ogród Japoński, hala i fontanna pozostają osobnymi punktami na mapach, z własnymi zasadami zwiedzania.",
    "de": "Historischer Landschaftspark im Osten Breslaus mit baumbestandenen Wegen, Wasser und ruhigen Spazierplätzen. Seine Anfänge reichen zu einem 1783 angelegten Garten zurück; zu seinen Bauwerken gehört die Holzkirche des heiligen Johannes Nepomuk. Unsere Galerie zeigt Kirche, Wasserlauf und Bäume bei unserem Besuch. Ein Spaziergang lässt sich mit der Umgebung der Jahrhunderthalle verbinden. Japanischer Garten, Halle und Brunnen bleiben eigene Kartenorte mit eigenen Besuchsbedingungen.",
    "cs": "Historický krajinářský park ve východní Vratislavi s alejemi stromů, vodou a klidnými místy k procházce. Jeho počátky sahají k zahradě založené roku 1783; jednou z památek je dřevěný kostel sv. Jana Nepomuckého. Naše galerie zachycuje kostel, vodní tok a stromy při návštěvě. Procházku lze spojit s okolím Haly století. Japonská zahrada, hala a fontána zůstávají samostatnými body na mapách s vlastními podmínkami návštěvy."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1081,
      "lng": 17.082
    },
    "address": {
      "street": "Park Szczytnicki, aleja Dąbska",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "park",
    "nature",
    "historical-landmark"
  ],
  "taxonomy": {
    "tags": [
      "park",
      "landscape-design",
      "walking",
      "trees",
      "history",
      "wooden-architecture",
      "wroclaw"
    ]
  },
  "links": {
    "website": "https://zzm.wroc.pl/obiektyzzmcp/park-szczytnicki/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1081%2C17.0820",
      "appleMaps": "https://maps.apple.com/?ll=51.1081,17.0820"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "representativeMapPoint": "Public park path by aleja Dąbska, source photo/video GPS cross-checked on OpenStreetMap against the Japanese Garden boundary; not the entire park centroid",
    "factualSources": [
      {
        "url": "https://zzm.wroc.pl/obiektyzzmcp/park-szczytnicki/",
        "verifiedAt": "2026-10-18",
        "scope": "municipal parks authority: identity, historic aliases, origin, landscape composition, street boundaries and wooden church; exhibition grounds remain distinct"
      },
      {
        "url": "https://www.wroclaw.pl/zielony-wroclaw/odkrywamy-wroclawskie-parki-park-szczytnicki-historia-miejsca",
        "verifiedAt": "2026-10-18",
        "scope": "municipal historical overview and named landmarks; historic prices/hours not reused"
      },
      {
        "url": "https://www.openstreetmap.org/#map=18/51.1081/17.0819",
        "verifiedAt": "2026-10-18",
        "scope": "visual geographic check of geo-tagged original tree/path footage: public park east of canal, outside Japanese Garden boundary"
      }
    ],
    "visitVideosPublished": 2
  },
  "media": {
    "photos": [
      "/assets/szczytnicki-park/szczytnicki-park-01.jpg",
      "/assets/szczytnicki-park/szczytnicki-park-02.jpg",
      "/assets/szczytnicki-park/szczytnicki-park-03.jpg",
      "/assets/szczytnicki-park/szczytnicki-park-04.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/QWyefecg6RQ",
      "https://youtube.com/shorts/jgKVkItk8z0"
    ],
    "metadata": {
      "/assets/szczytnicki-park/szczytnicki-park-01.jpg": {
        "original": true,
        "sourceFile": "פארק שטניצקי/WhatsApp Image 2026-09-24 at 19.21.11 (18).jpeg",
        "sourceSHA256": "39efb820de230b557caa474aada8cb0c525f622b967887122685ab0143831658",
        "publicationSHA256": "69f8565a8c24a672bff1bd53cd54750b2c647b226e954b27a8d6f21dec5e2ab6",
        "scene": "wooden church exterior",
        "heroCandidate": true
      },
      "/assets/szczytnicki-park/szczytnicki-park-02.jpg": {
        "original": true,
        "sourceFile": "פארק שטניצקי/WhatsApp Image 2026-09-24 at 17.33.32.jpeg",
        "sourceSHA256": "5755c10431626a6f10b8ce7bb314031ba68680ce19f329fd1a5606803c3a4fde",
        "publicationSHA256": "bb6ab534e682385a7fe8e95d120e4ee602cf4e5d78b6cace0273077f6425b635",
        "scene": "public park watercourse",
        "heroCandidate": false
      },
      "/assets/szczytnicki-park/szczytnicki-park-03.jpg": {
        "original": true,
        "sourceFile": "פארק שטניצקי/WhatsApp Image 2026-09-24 at 19.21.11 (17).jpeg",
        "sourceSHA256": "42e4250e021d6877df74aa5fa7c7628209b724de615d2f48a61507fc2e52eca4",
        "publicationSHA256": "e38830d9454d01b2ab4db4546c4693e5d654e4b6ed21ba84c30ee978615e3cb2",
        "scene": "wooden church and surrounding trees",
        "heroCandidate": false
      },
      "/assets/szczytnicki-park/szczytnicki-park-04.jpg": {
        "original": true,
        "sourceFile": "פארק שטניצקי/IMG_5795.JPG",
        "sourceSHA256": "33ed0195ce87925a63a58f3638c746a588d2f76672bcfbc590d823a10432aa7e",
        "publicationSHA256": "c7f0be96daede2baab04638144637df9e6cd58fcaf4cd5ccf8ed2a696918a546",
        "scene": "protected tree beside park path",
        "heroCandidate": false
      },
      "https://youtube.com/shorts/QWyefecg6RQ": {
        "original": true,
        "sourceFile": "פארק שטניצקי/IMG_5792.MOV",
        "sourceSHA256": "5c30575d344e03c14e4febd8df76e11ec7bcf7b6b52ef5eaa747b15a79495cc6",
        "publicationSHA256": "9949b54ee783b50b60e06913b8ed40790f2e46a7163465c42bf0a2b25f545ce2",
        "audio": "Removed from publication copy; original preserved",
        "status": "public",
        "verifiedAt": "2026-10-18"
      },
      "https://youtube.com/shorts/jgKVkItk8z0": {
        "original": true,
        "sourceFile": "פארק שטניצקי/IMG_5796 2.MOV",
        "sourceSHA256": "075e8dcbd55b7caece4308fccfdffc0b9d9dd4390e41f9676ebf55a58ce69925",
        "publicationSHA256": "fa89ededc4e81d3c5ba7958b8c5fc628a2aa4ad0e95bc438b70c376fa37b7794",
        "audio": "Removed from publication copy; original preserved",
        "status": "public",
        "verifiedAt": "2026-10-18"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "magnolia",
  "aliases": [
    "מגנוליה פארק",
    "מגנוליה"
  ],
  "localName": "Magnolia Park",
  "name": {
    "he": "מגנוליה פארק",
    "en": "Magnolia Park",
    "pl": "Magnolia Park",
    "de": "Magnolia Park",
    "cs": "Magnolia Park"
  },
  "description": {
    "he": "מרכז קניות ברחוב לגניצקה, עם חנויות, בתי קפה, מסעדות ושירותים במתחם אחד. בגלריית הביקור שלנו נראים הכניסה והמזרקה בחוץ, מעברי החנויות, ארוחה במתחם האוכל והחלל המרכזי המקורה בזכוכית. מתאים להפסקת קניות וארוחה מחוץ לעיר העתיקה, וגם כשמחפשים פעילות מקורה. בדקו באתר הרשמי את החנויות, ההגעה ושעות הפתיחה, ובמיוחד את ימי ראשון המסחריים והחגים. התמונות מציגות את הביקור שלנו, ולא תצוגות או מבצעים המובטחים כיום.",
    "en": "A shopping centre on Legnicka with shops, cafés, restaurants and services in one complex. Our visit gallery shows the entrance and outdoor fountain, shopping passages, a food-court meal and the central glass-roofed atrium. Consider a shopping and food break outside the Old Town, including when you want an indoor activity. Check the official website for stores, access and opening hours, especially trading Sundays and holidays. The photographs show our visit rather than displays or offers guaranteed today.",
    "pl": "Centrum handlowe przy ulicy Legnickiej ze sklepami, kawiarniami, restauracjami i usługami w jednym kompleksie. Galeria z naszej wizyty pokazuje wejście i fontannę na zewnątrz, pasaże sklepowe, posiłek w strefie gastronomicznej oraz centralne atrium pod szklanym dachem. To propozycja zakupów i przerwy na jedzenie poza Starym Miastem, również gdy szukasz aktywności pod dachem. Sklepy, dojazd i godziny otwarcia, zwłaszcza w niedziele handlowe i święta, sprawdź na oficjalnej stronie. Zdjęcia pokazują naszą wizytę, nie gwarantują dzisiejszych ekspozycji czy promocji.",
    "de": "Einkaufszentrum an der Legnicka mit Geschäften, Cafés, Restaurants und Dienstleistungen in einem Komplex. Unsere Besuchsgalerie zeigt den Eingang und den Brunnen im Freien, Einkaufspassagen, ein Essen im Gastronomiebereich und das zentrale Atrium unter einem Glasdach. Ein Einkaufs- und Essensstopp außerhalb der Altstadt, auch bei der Suche nach einer Aktivität im Innenraum. Geschäfte, Anreise und Öffnungszeiten, besonders an verkaufsoffenen Sonntagen und Feiertagen, auf der offiziellen Website prüfen. Die Fotos zeigen unseren Besuch und garantieren keine heutigen Ausstellungen oder Angebote.",
    "cs": "Nákupní centrum v ulici Legnicka s obchody, kavárnami, restauracemi a službami v jednom komplexu. Galerie z naší návštěvy ukazuje vstup a venkovní fontánu, nákupní pasáže, jídlo ve stravovací zóně a centrální atrium pod skleněnou střechou. Hodí se na nákupní a stravovací zastávku mimo Staré Město, také pokud hledáte aktivitu pod střechou. Obchody, příjezd a otevírací dobu, zejména o prodejních nedělích a svátcích, ověřte na oficiálním webu. Fotografie zachycují naši návštěvu a nezaručují dnešní expozice ani nabídky."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1187024,
      "lng": 16.9896567
    },
    "address": {
      "street": "Legnicka 58",
      "postalCode": "54-204",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "buy",
    "eat"
  ],
  "taxonomy": {
    "tags": [
      "shopping-centre",
      "food-court",
      "indoor",
      "wroclaw"
    ]
  },
  "links": {
    "website": "https://www.magnoliapark.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1187024%2C16.9896567",
      "appleMaps": "https://maps.apple.com/?ll=51.1187024,16.9896567"
    },
    "socialProfileFallback": false
  },
  "media": {
    "photos": [
      "/assets/food-cafes/magnolia-park-01.jpg",
      "/assets/food-cafes/magnolia-park-02.jpg",
      "/assets/food-cafes/magnolia-park-03.jpg",
      "/assets/food-cafes/magnolia-park-04.jpg",
      "/assets/food-cafes/magnolia-park-05.jpg",
      "/assets/food-cafes/magnolia-park-06.jpg",
      "/assets/food-cafes/magnolia-park-07.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/food-cafes/magnolia-park-01.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4906.JPG",
        "sourceSHA256": "b5caa6f85e8cdbeef7b557f64ba446cb0ae941ecc49cc0f67340be5046b375f0",
        "assetSHA256": "db1f5d1595462271fbdfb643126b2bae4ccc113467c74ae4e4c65a176833875b",
        "alt": {
          "he": "חזית מרכז הקניות והכניסה",
          "en": "Shopping centre frontage and entrance",
          "pl": "Fasada centrum handlowego i wejście",
          "de": "Fassade und Eingang des Einkaufszentrums",
          "cs": "Průčelí nákupního centra a vstup"
        },
        "heroCandidate": true
      },
      "/assets/food-cafes/magnolia-park-02.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4903.JPG",
        "sourceSHA256": "31012da1dc602d18a139faa31c39f3af520cd9e1b8de29f04fa09b423b3b75e0",
        "assetSHA256": "a0c367a7f6305c37d538aa4c2f26ebaf60725b2b4245b092cf2f87fa2090636a",
        "alt": {
          "he": "המזרקה והרחבה בחזית המרכז",
          "en": "Fountain and square in front of the centre",
          "pl": "Fontanna i plac przed centrum",
          "de": "Brunnen und Platz vor dem Center",
          "cs": "Fontána a prostranství před centrem"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/magnolia-park-03.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4912.JPG",
        "sourceSHA256": "7b8119118378891ae9242618dd6bb8fa684f364708b33a196099df6ee49baa24",
        "assetSHA256": "5e000d6ded5661c47c6b535241881d0cc2f538ba6c911b5a2f9c200490fc6734",
        "alt": {
          "he": "מעבר מקורה בין החנויות",
          "en": "Covered shopping passage",
          "pl": "Kryty pasaż handlowy",
          "de": "Überdachte Einkaufspassage",
          "cs": "Zastřešená nákupní pasáž"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/magnolia-park-04.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4913.JPG",
        "sourceSHA256": "706e85966424b6ce68354f90855520425a18f1135fe9321563533935426b6d13",
        "assetSHA256": "d46948167f40377911d7fb749e66984a450ca997b87c2a3b174e9bb15eb29fa6",
        "alt": {
          "he": "ארוחה במתחם האוכל במהלך הביקור",
          "en": "Meal in the food court during our visit",
          "pl": "Posiłek w strefie gastronomicznej podczas naszej wizyty",
          "de": "Essen im Gastronomiebereich bei unserem Besuch",
          "cs": "Jídlo ve stravovací zóně při naší návštěvě"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/magnolia-park-05.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4918.JPG",
        "sourceSHA256": "074748f500d0adb1cf9315a39ddf6562b339fe0d6ed7588e45e656f5bb6a2713",
        "assetSHA256": "e72cb7592880ca32489e0f55d61eab8e6c8a6f62592e0c32f1bd6b2c2ee70a1f",
        "alt": {
          "he": "החלל המרכזי והקירוי העגול",
          "en": "Central atrium and circular skylight",
          "pl": "Centralne atrium i okrągły świetlik",
          "de": "Zentrales Atrium und rundes Oberlicht",
          "cs": "Centrální atrium a kruhový světlík"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/magnolia-park-06.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4920.JPG",
        "sourceSHA256": "bc7e9362e83c015b8cd8f0cd0ffd6d357705c5b9233e1c8604ec1407fa9eada8",
        "assetSHA256": "b609dfad3cdc3f983f9ea19a8998a55e3059f045e35659f7208907b1a85b4db7",
        "alt": {
          "he": "מבט נוסף על הגלריות והמדרגות הנעות",
          "en": "Another view of galleries and escalators",
          "pl": "Dodatkowy widok galerii i schodów ruchomych",
          "de": "Weitere Ansicht der Galerien und Rolltreppen",
          "cs": "Další pohled na galerie a eskalátory"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/magnolia-park-07.jpg": {
        "original": true,
        "sourceFile": "Magnolia park/IMG_4923.JPG",
        "sourceSHA256": "70fb587518454c8fe83b459e212977983aa818bb16d59e46b929285e1c440c86",
        "assetSHA256": "3bd556c57035c0ba6e3aab267d27d91f3154f8c45002fa5739d6d43bc50d11d1",
        "alt": {
          "he": "אזור החנויות והחלל לתצוגות מתחלפות",
          "en": "Shopping area and temporary display space",
          "pl": "Strefa sklepów i przestrzeń wystaw czasowych",
          "de": "Einkaufsbereich und Fläche für wechselnde Präsentationen",
          "cs": "Nákupní zóna a prostor pro dočasné prezentace"
        },
        "heroCandidate": false
      }
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "factualSources": [
      {
        "url": "https://www.magnoliapark.pl/kontakt",
        "verifiedAt": "2026-10-18",
        "scope": "official identity,address Legnicka58, shopping and dining facilities; no mutable hours, stock or counts copied"
      },
      {
        "url": "https://geoportal.wroclaw.pl/poi/poi/1849",
        "verifiedAt": "2026-10-18",
        "scope": "municipal indexed identity/address only;2017contact details are historical and not reused"
      }
    ],
    "socialVerification": {
      "audit": "/data/magnolia-park-social-audit.json",
      "verifiedPosts": 10,
      "checkedAt": "2026-10-18"
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "fashion-outlet",
  "aliases": [
    "פשיון אאוטלט",
    "פאשן אאוטלט"
  ],
  "localName": "Wrocław Fashion Outlet",
  "name": {
    "he": "פאשן אאוטלט ורוצלב",
    "en": "Wrocław Fashion Outlet",
    "pl": "Wrocław Fashion Outlet",
    "de": "Wrocław Fashion Outlet",
    "cs": "Wrocław Fashion Outlet"
  },
  "description": {
    "he": "מרכז אאוטלט ברחוב גרניצ׳נה במערב ורוצלב, עם חנויות אופנה וספורט, בתי קפה ומקומות לאכול. בגלריית הביקור שלנו נראים החזית, מעברי החנויות, אזור הישיבה, החניה והשילוט ביום ובלילה. מתאים למי שרוצה להקדיש זמן לקניות מחוץ למסלול ההליכה בעיר העתיקה. בדקו באתר הרשמי אילו חנויות ומבצעים פעילים ומהן שעות הפתיחה, במיוחד בימי ראשון ובחגים. התמונות מתעדות ביקור קודם ואינן הבטחה למבצעים או למלאי הנוכחי.",
    "en": "An outlet shopping centre on Graniczna in western Wrocław, with fashion and sports shops, cafés and places to eat. Our visit gallery shows the frontage, shopping passages, seating, parking and signs by day and night. Consider a dedicated shopping stop outside the Old Town walking route. Check the official website for current shops, offers and opening hours, especially on Sundays and holidays. The photographs record an earlier visit and do not guarantee current offers or stock.",
    "pl": "Centrum outletowe przy ulicy Granicznej w zachodniej części Wrocławia, ze sklepami modowymi i sportowymi, kawiarniami i gastronomią. Galeria z naszej wizyty pokazuje fasadę, pasaże handlowe, strefę wypoczynku, parking oraz oznakowanie za dnia i nocą. To propozycja osobnego przystanku na zakupy poza pieszą trasą po Starym Mieście. Aktualne sklepy, promocje i godziny otwarcia, zwłaszcza w niedziele i święta, sprawdź na oficjalnej stronie. Zdjęcia z wcześniejszej wizyty nie gwarantują obecnych ofert ani dostępności towarów.",
    "de": "Outlet-Center an der Graniczna im Westen von Wrocław mit Mode- und Sportgeschäften, Cafés und Gastronomie. Unsere Besuchsgalerie zeigt die Fassade, Einkaufspassagen, Sitzplätze, den Parkplatz und Schilder bei Tag und Nacht. Ein eigener Einkaufsstopp außerhalb des Altstadtrundgangs bietet sich an. Aktuelle Geschäfte, Angebote und Öffnungszeiten, besonders an Sonn- und Feiertagen, auf der offiziellen Website prüfen. Die Fotos eines früheren Besuchs garantieren keine aktuellen Angebote oder Warenbestände.",
    "cs": "Outletové nákupní centrum v ulici Graniczna na západě Vratislavi s obchody s módou a sportovním zbožím, kavárnami a občerstvením. Galerie z naší návštěvy ukazuje průčelí, nákupní pasáže, posezení, parkoviště a označení ve dne i v noci. Hodí se pro samostatnou nákupní zastávku mimo pěší okruh Starým Městem. Aktuální obchody, nabídky a otevírací dobu, zejména o nedělích a svátcích, ověřte na oficiálním webu. Fotografie z dřívější návštěvy nezaručují současné nabídky ani dostupnost zboží."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1067753,
      "lng": 16.9451904
    },
    "address": {
      "street": "Graniczna 2",
      "postalCode": "54-610",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "buy",
    "eat"
  ],
  "taxonomy": {
    "tags": [
      "outlet-shopping",
      "fashion",
      "restaurants",
      "wroclaw"
    ]
  },
  "links": {
    "website": "https://www.wroclawfashionoutlet.com/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1067753%2C16.9451904",
      "appleMaps": "https://maps.apple.com/?ll=51.1067753,16.9451904"
    }
  },
  "media": {
    "photos": [
      "/assets/food-cafes/fashion-outlet-01.jpg",
      "/assets/food-cafes/fashion-outlet-02.jpg",
      "/assets/food-cafes/fashion-outlet-03.jpg",
      "/assets/food-cafes/fashion-outlet-04.jpg",
      "/assets/food-cafes/fashion-outlet-05.jpg",
      "/assets/food-cafes/fashion-outlet-06.jpg",
      "/assets/food-cafes/fashion-outlet-07.jpg",
      "/assets/food-cafes/fashion-outlet-08.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/food-cafes/fashion-outlet-01.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (14).jpeg",
        "sourceSHA256": "db81d96f3932f9b2b2cb6e527823f9263a6878d9bbcd11ed512081754b63275f",
        "assetSHA256": "02d20be27a041461409ced412c56ed5ce9f70625c8d08354a6689eb5ae93f23b",
        "alt": {
          "he": "חזית הכניסה למרכז האאוטלט",
          "en": "Outlet centre entrance frontage",
          "pl": "Fasada wejścia do centrum outletowego",
          "de": "Eingangsfront des Outlet-Centers",
          "cs": "Průčelí vstupu do outletového centra"
        },
        "heroCandidate": true
      },
      "/assets/food-cafes/fashion-outlet-02.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.21.11 (15).jpeg",
        "sourceSHA256": "a0be0d7f6ca63b2fe9772ae249e16606865d797d3200f418f57fc165879df032",
        "assetSHA256": "50e7b655f90c0810e19f4ad4a28554c87df7f359704e0e0aa7c139ead2a2a05a",
        "alt": {
          "he": "מבט רחב על הכניסה וסביבתה",
          "en": "Wide view of the entrance and surroundings",
          "pl": "Szeroki widok wejścia i otoczenia",
          "de": "Weitwinkelansicht des Eingangs und der Umgebung",
          "cs": "Široký pohled na vstup a okolí"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/fashion-outlet-03.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (15).jpeg",
        "sourceSHA256": "784391806b17f32c75366b2dd5c38fe43ce239016fc8c14c551c39c52c6b8ece",
        "assetSHA256": "cebd74c0f5c023b9ac6c5c5ee60709dd1ebf54d93eaafcebc0c63ad93dec91e7",
        "alt": {
          "he": "מעבר החנויות בתוך המרכז",
          "en": "Shopping passage inside the centre",
          "pl": "Pasaż sklepowy wewnątrz centrum",
          "de": "Einkaufspassage im Center",
          "cs": "Nákupní pasáž uvnitř centra"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/fashion-outlet-04.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (16).jpeg",
        "sourceSHA256": "1bbaf30858026dcfc03dee908e9aab216828d8cca663f40db5e42022e2733f11",
        "assetSHA256": "3dae73d010f16b54491e2b9895b8940047d0a17b606292a837bf73705a5fdac9",
        "alt": {
          "he": "תצוגת אופנה ומעבר מקורה",
          "en": "Fashion display and covered passage",
          "pl": "Ekspozycja mody i kryty pasaż",
          "de": "Modeausstellung und überdachte Passage",
          "cs": "Módní expozice a zastřešená pasáž"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/fashion-outlet-05.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (17).jpeg",
        "sourceSHA256": "55befb2b78476caad7323e7bb3141296ac677015f5f16ee549b58ad88e0d5859",
        "assetSHA256": "53d8cf84ec6b9814dfe8bb954b28179be8ed78fd3794bedbf2deaabfb9ae3b4a",
        "alt": {
          "he": "אזור ישיבה בין החנויות",
          "en": "Seating area between shops",
          "pl": "Strefa wypoczynku między sklepami",
          "de": "Sitzbereich zwischen den Geschäften",
          "cs": "Odpočinková zóna mezi obchody"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/fashion-outlet-06.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (11).jpeg",
        "sourceSHA256": "71bc9e44722487decfb79aa109dc0d207f63668bd46477372ba644d20db5741a",
        "assetSHA256": "71241c7a80d35230ce579db6136135fa8e204867f673524ce0f7378604a190ab",
        "alt": {
          "he": "החניה והגישה למרכז",
          "en": "Parking and approach to the centre",
          "pl": "Parking i dojazd do centrum",
          "de": "Parkplatz und Zufahrt zum Center",
          "cs": "Parkoviště a příjezd k centru"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/fashion-outlet-07.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (10).jpeg",
        "sourceSHA256": "8d7a966de5deb50327f6eeba5bc97f74ffadc61eefc1c919402132f8a15d7ebd",
        "assetSHA256": "5b25dc00b8f910e15bae1c15abc92252942c9563768f1d359da7ba02bfa5b0f2",
        "alt": {
          "he": "שלט המרכז בשעות היום",
          "en": "Centre sign in daylight",
          "pl": "Pylon centrum w świetle dziennym",
          "de": "Center-Schild bei Tageslicht",
          "cs": "Označení centra za denního světla"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/fashion-outlet-08.jpg": {
        "original": true,
        "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (18).jpeg",
        "sourceSHA256": "8cd360748180e497a87a12114d505b9f60c2e231a7a5f4f97f87c3f9349b7eb4",
        "assetSHA256": "03f181b6204084261553da996dfa67fa644fce367a56e6b5968011b3fca69c69",
        "alt": {
          "he": "שלט המרכז המואר בלילה",
          "en": "Illuminated centre sign at night",
          "pl": "Oświetlony pylon centrum nocą",
          "de": "Beleuchtetes Center-Schild bei Nacht",
          "cs": "Osvětlené označení centra v noci"
        },
        "heroCandidate": false
      }
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "factualSources": [
      {
        "url": "https://www.wroclawfashionoutlet.com/en/contact",
        "verifiedAt": "2026-10-18",
        "scope": "official centre identity and Graniczna2 address"
      },
      {
        "url": "https://www.wroclawfashionoutlet.com/en/practical-information",
        "verifiedAt": "2026-10-18",
        "scope": "official shopping/dining facilities and current opening information; no mutable hours, prices or promotions copied"
      }
    ]
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "ato-ramen",
  "aliases": [
    "אטו ראמן",
    "Ato Ramen WRO",
    "ATO RAMEN Wrocław"
  ],
  "localName": "Ato Ramen",
  "name": {
    "he": "אטו ראמן",
    "en": "Ato Ramen",
    "pl": "Ato Ramen",
    "de": "Ato Ramen",
    "cs": "Ato Ramen"
  },
  "description": {
    "he": "מסעדת ראמן ברחוב אודז׳נסקה בעיר העתיקה, סמוך לכיכר השוק ולסמטת יאטקי. זו עצירת אוכל שאפשר לשלב בין אתרי המרכז בלי לצאת מהאזור. בגלריית הביקור שלנו מופיעות קערות ראמן, משקה וחזית המסעדה המוארת בערב. התמונות מתעדות את הביקור שלנו ואינן מבטיחות תפריט, מחירים או זמני המתנה נוכחיים. בדקו את תפריט סניף ורוצלב ואת המידע העדכני באתר הרשמי לפני ההגעה.",
    "en": "A ramen restaurant on Odrzańska in the Old Town, close to Market Square and the Jatki lane. It makes a convenient food stop between central sights. Our visit gallery shows ramen bowls, a drink and the illuminated evening frontage. The photographs document our visit rather than a current menu, prices or waiting times. The restaurant lists its Wrocław address as Odrzańska 4-5. Check the Wrocław branch menu and current information on the official website before visiting.",
    "pl": "Restauracja z ramenem przy ulicy Odrzańskiej na Starym Mieście, blisko Rynku i Jatek. To dogodny przystanek na posiłek pomiędzy atrakcjami centrum. Galeria z naszej wizyty pokazuje miski ramenu, napój i oświetloną wieczorną fasadę. Zdjęcia dokumentują naszą wizytę, a nie aktualne menu, ceny czy czas oczekiwania. Restauracja podaje adres wrocławskiego lokalu: Odrzańska 4-5. Przed wizytą sprawdź menu oddziału we Wrocławiu i aktualne informacje na oficjalnej stronie.",
    "de": "Ramen-Restaurant an der Odrzańska in der Altstadt, nahe dem Marktplatz und der Gasse Jatki. Ein praktischer Essensstopp zwischen den Sehenswürdigkeiten im Zentrum. Unsere Besuchsgalerie zeigt Ramen-Schalen, ein Getränk und die abends beleuchtete Fassade. Die Fotos dokumentieren unseren Besuch, keine aktuelle Speisekarte, Preise oder Wartezeiten. Das Restaurant nennt für die Breslauer Filiale die Adresse Odrzańska 4-5. Prüfen Sie vor dem Besuch das Menü der Filiale Wrocław und aktuelle Angaben auf der offiziellen Website.",
    "cs": "Restaurace s ramenem v ulici Odrzańska ve Starém Městě, blízko hlavního náměstí a uličky Jatki. Hodí se jako zastávka na jídlo mezi památkami v centru. Galerie z naší návštěvy ukazuje misky ramenu, nápoj a večer osvětlené průčelí. Fotografie zachycují naši návštěvu, nikoli aktuální nabídku, ceny či čekací dobu. Restaurace uvádí pro vratislavskou pobočku adresu Odrzańska 4-5. Před návštěvou zkontrolujte menu pobočky Wrocław a aktuální informace na oficiálním webu."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1117934,
      "lng": 17.0312819
    },
    "address": {
      "street": "Odrzańska 4-5",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat"
  ],
  "taxonomy": {
    "tags": [
      "ramen",
      "japanese-food",
      "old-town",
      "wroclaw"
    ]
  },
  "links": {
    "website": "https://atoramen.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1117934%2C17.0312819",
      "appleMaps": "https://maps.apple.com/?ll=51.1117934,17.0312819"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "factualSources": [
      {
        "url": "https://atoramen.pl/",
        "verifiedAt": "2026-10-18",
        "scope": "official Wrocław branch identity, Odrzańska 4-5 address and links to branch-specific current menus; no fixed hours or prices copied"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/food-cafes/ato-ramen-bowl-01.jpg",
      "/assets/food-cafes/ato-ramen-bowls-02.jpg",
      "/assets/food-cafes/ato-ramen-exterior-03.jpg",
      "/assets/food-cafes/ato-ramen-drink-04.jpg"
    ],
    "videos": [
      "/assets/ato-ramen-visit-01.mp4",
      "/assets/ato-ramen-visit-02.mp4"
    ],
    "metadata": {
      "/assets/food-cafes/ato-ramen-bowl-01.jpg": {
        "original": true,
        "sourceFile": "אטו ראמן/WhatsApp Image 2026-10-01 at 09.24.02.jpeg",
        "sourceSHA256": "a1854ca35388f49643e004b201da8622deb81a0d0f2ef3b8febe0bdf6baca92b",
        "assetSHA256": "fd74c24996c0f14079cead2006198c65652e0087e10793451b53f336ec507a25",
        "alt": {
          "he": "קערת ראמן מהביקור שלנו",
          "en": "Ramen bowl from our visit",
          "pl": "Miska ramenu podczas naszej wizyty",
          "de": "Ramen-Schale bei unserem Besuch",
          "cs": "Miska ramenu při naší návštěvě"
        },
        "heroCandidate": true
      },
      "/assets/food-cafes/ato-ramen-bowls-02.jpg": {
        "original": true,
        "sourceFile": "אטו ראמן/WhatsApp Image 2026-10-01 at 09.24.02 (2).jpeg",
        "sourceSHA256": "1021627384b955ff921b130c1698f5b1c15f4471f4b6134414e4146b1d1bff71",
        "assetSHA256": "e236481164455f58c5426c10c4935fe9f230c423700322af142e471686673f96",
        "alt": {
          "he": "שתי קערות ראמן על שולחן המסעדה",
          "en": "Two ramen bowls on the restaurant table",
          "pl": "Dwie miski ramenu na stole w restauracji",
          "de": "Zwei Ramen-Schalen auf dem Restauranttisch",
          "cs": "Dvě misky ramenu na stole v restauraci"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/ato-ramen-exterior-03.jpg": {
        "original": true,
        "sourceFile": "אטו ראמן/WhatsApp Image 2026-10-01 at 09.23.59 (2).jpeg",
        "sourceSHA256": "e4444ecbb83675deffcc462d35f447eb600c2d49ca604e7572f23cf3f22715b7",
        "assetSHA256": "ebbbefe376102a2ef11784ac028665f0f707a88e234403386293d076330dfa8b",
        "alt": {
          "he": "חזית המסעדה המוארת בשעות הערב",
          "en": "Illuminated restaurant frontage in the evening",
          "pl": "Oświetlona fasada restauracji wieczorem",
          "de": "Beleuchtete Restaurantfront am Abend",
          "cs": "Osvětlené průčelí restaurace večer"
        },
        "heroCandidate": false
      },
      "/assets/food-cafes/ato-ramen-drink-04.jpg": {
        "original": true,
        "sourceFile": "אטו ראמן/WhatsApp Image 2026-10-01 at 09.24.03 (4).jpeg",
        "sourceSHA256": "f498980b3d5f901379bd5dfdd60294b7232607c4832cd595df55655ca7c3fb98",
        "assetSHA256": "f4b4031034505674b0598fbc871053ac9c872e0b3c5ef0956e01ce8b85edd613",
        "alt": {
          "he": "משקה שכבות צהוב ולבן מהביקור שלנו",
          "en": "Yellow and white layered drink from our visit",
          "pl": "Żółto-biały napój warstwowy podczas naszej wizyty",
          "de": "Gelb-weiß geschichtetes Getränk bei unserem Besuch",
          "cs": "Žlutobílý vrstvený nápoj při naší návštěvě"
        },
        "heroCandidate": false
      },
      "/assets/ato-ramen-visit-01.mp4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/אטו ראמן/WhatsApp Video 2026-10-01 at 09.24.01.mp4",
        "sourceSHA256": "434444d1ef9df4796f923566ade0bb51a773847d63953fc2be825966430ac3bb",
        "youtube": "https://youtube.com/shorts/dwtgXyi61i4",
        "visibility": "public",
        "checks": "complete-no-issues",
        "verifiedAt": "2026-10-18"
      },
      "/assets/ato-ramen-visit-02.mp4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/אטו ראמן/WhatsApp Video 2026-10-01 at 09.24.01 (1).mp4",
        "sourceSHA256": "eb8a1b0c657e3c1a159b697473a2c5375d75051eeb94ef83023a379ce14b2bd6",
        "youtube": "https://youtube.com/shorts/0_33qzP4ll8",
        "visibility": "public",
        "checks": "complete-no-issues",
        "verifiedAt": "2026-10-18"
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "bastion",
  "localName": "Bastion Sakwowy",
  "aliases": [
    "הבסטיון",
    "בסטיון",
    "בסטיון סאקבובי",
    "Sakwowy Bastion",
    "Wzgórze Partyzantów",
    "Partisan Hill",
    "Liebichshöhe"
  ],
  "name": {
    "he": "בסטיון סאקבובי",
    "en": "Sakwowy Bastion",
    "pl": "Bastion Sakwowy",
    "de": "Bastion Sakwowy",
    "cs": "Bašta Sakwowy"
  },
  "description": {
    "he": "מתחם היסטורי על גבעת הפרטיזנים לצד חפיר העיר, המשלב שרידי ביצורים עם קולונדה, מזרקה ומרפסות תצפית. הוא נפתח מחדש לאחר שיקום ביוני 2024. התמונות וסרטוני הביקור שלנו מציגים את המזרקה, הקשתות והעיר בשעת שקיעה. מתאים לעצירת אדריכלות ולהליכה קצרה לצד החפיר. בכריסמס דלגו אם המדרגות והשבילים מכוסים קרח.",
    "en": "Historic complex on Partisan Hill beside the city moat, combining former fortifications with a colonnade, fountain and viewing terraces. It reopened after restoration in June 2024. Our visit photos and clips show the fountain, arches and city at sunset. A useful architecture stop and short moat walk. On the Christmas route, skip it when steps or paths are icy.",
    "pl": "Historyczny kompleks na Wzgórzu Partyzantów przy fosie miejskiej, łączący dawne fortyfikacje z kolumnadą, fontanną i tarasami widokowymi. Po renowacji otwarto go ponownie w czerwcu 2024 roku. Nasze zdjęcia i filmy z wizyty pokazują fontannę, arkady i miasto o zachodzie słońca. Dobry przystanek architektoniczny i krótki spacer nad fosą. Na trasie bożonarodzeniowej pomiń go, gdy schody lub alejki są oblodzone.",
    "de": "Historische Anlage auf dem Partisanenhügel am Stadtgraben mit ehemaligen Befestigungen, Kolonnade, Brunnen und Aussichtsterrassen. Nach der Restaurierung wurde sie im Juni 2024 wiedereröffnet. Unsere Besuchsfotos und Videos zeigen Brunnen, Arkaden und Stadt im Abendlicht. Geeignet für einen Architekturhalt und einen kurzen Spaziergang am Graben. Auf der Weihnachtsroute bei vereisten Stufen oder Wegen auslassen.",
    "cs": "Historický areál na Partizánském návrší u městského příkopu spojuje někdejší opevnění s kolonádou, kašnou a vyhlídkovými terasami. Po obnově byl znovu otevřen v červnu 2024. Naše fotografie a videa z návštěvy ukazují kašnu, arkády a město při západu slunce. Hodí se jako architektonická zastávka a krátká procházka podél příkopu. Na vánoční trase jej vynechte, pokud jsou schody nebo cesty namrzlé."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.10519,
      "lng": 17.03829
    },
    "address": {
      "street": "ks. Piotra Skargi 18a",
      "postalCode": "50-082",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "viewpoint",
    "historical-landmark",
    "architecture"
  ],
  "taxonomy": {
    "tags": [
      "bastion",
      "colonnade",
      "fountain",
      "city-moat",
      "sunset",
      "architecture",
      "historical"
    ]
  },
  "links": {
    "website": "https://visitwroclaw.eu/en/atrakcje/sakwowy-bastion/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10519%2C17.03829",
      "appleMaps": "https://maps.apple.com/?ll=51.10519,17.03829"
    }
  },
  "media": {
    "photos": [
      "/assets/bastion-sakwowy-01.jpg",
      "/assets/bastion-sakwowy-02.jpg"
    ],
    "videos": [
      "/assets/bastion-sakwowy-visit-01.mp4",
      "/assets/bastion-sakwowy-visit-02.mp4",
      "/assets/bastion-sakwowy-visit-03.mp4",
      "/assets/bastion-sakwowy-visit-04.mp4",
      "/assets/bastion-sakwowy-visit-05.mp4"
    ],
    "metadata": {
      "/assets/bastion-sakwowy-01.jpg": {
        "original": true,
        "sourceFile": "בסטיון/WhatsApp Image 2026-10-05 at 18.26.58 (1).jpeg",
        "sourceSHA256": "f6e1263b48564b9ce7c7be890cb58829dc1c569ff122f14698cf9be0f1ad1723",
        "assetSHA256": "ed1fb818072b4e402ba6bd60bd9c474dcab02e435df5d29f95c4d10f6fb7f1d2",
        "alt": {
          "he": "מבט מהבסטיון אל העיר בשעת שקיעה",
          "en": "Sunset city view from the bastion",
          "pl": "Widok na miasto z bastionu o zachodzie słońca",
          "de": "Blick von der Bastion auf die Stadt bei Sonnenuntergang",
          "cs": "Pohled z bašty na město při západu slunce"
        },
        "heroCandidate": false
      },
      "/assets/bastion-sakwowy-02.jpg": {
        "original": true,
        "sourceFile": "בסטיון/WhatsApp Image 2026-10-05 at 18.26.58 (4).jpeg",
        "sourceSHA256": "8cbd174c57afebebe8900cbff48f7cec550e56b8fdec6179484046beeb21934d",
        "assetSHA256": "dd0af9a7c61c933e7b320e8cb4332f11e5ae198da42ef0896a1c26fede38fb20",
        "alt": {
          "he": "מבט רחב על הרחוב והעיר מן הבסטיון",
          "en": "Wide street and city view from the bastion",
          "pl": "Szeroki widok na ulicę i miasto z bastionu",
          "de": "Weiter Blick von der Bastion auf Straße und Stadt",
          "cs": "Široký pohled z bašty na ulici a město"
        },
        "heroCandidate": true
      },
      "/assets/bastion-sakwowy-representative.jpg": {
        "original": true,
        "derivedFromVisitVideo": true,
        "sourceFile": "בסטיון/WhatsApp Video 2026-10-05 at 18.26.59.mp4",
        "sourceSHA256": "ad58ea995af2f959ca95cf9c01b6810c92e1c096623d8cc6798c02f6ba82b887",
        "frameSeconds": 0.2,
        "frameCrop": "576x324 at x0,y330 after display rotation; full building retained, excess sky and road removed",
        "assetSHA256": "e2480ec77ea9acb6c67f3fa71686e35c18324bf2bacc2688ab7266cc72b92c79",
        "purpose": "Representative map popup image only. Existing two gallery images and five visit videos unchanged.",
        "alt": {
          "he": "המבנה הצהבהב של הבסטיון והקשתות במבט רחב",
          "en": "Wide view of the yellow bastion pavilion and arcades",
          "pl": "Szeroki widok żółtego pawilonu bastionu i arkad",
          "de": "Gesamtansicht des gelben Bastionspavillons mit Arkaden",
          "cs": "Celkový pohled na žlutý pavilon bašty s arkádami"
        }
      }
    },
    "thumbnail": "/assets/bastion-sakwowy-representative.jpg"
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "factualSources": [
      {
        "url": "https://visitwroclaw.eu/en/atrakcje/sakwowy-bastion/",
        "scope": "Official municipal tourism identity, address, moat setting, colonnade, fountain, terrace and former fortifications",
        "verifiedAt": "2026-10-18"
      },
      {
        "url": "https://www.wroclaw.pl/dla-mieszkanca/otwarcie-bastionu-sakwowego-kolejne-inwestycje-na-wzgorzu-partyzantow-etapy-rewitalizacja",
        "scope": "Municipal June 2024 reopening and restoration; historical article, current hours/events not inferred",
        "verifiedAt": "2026-10-18"
      }
    ]
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "cafe-berg-wroclaw",
  "aliases": [
    "Cafe Berg",
    "Café Berg",
    "Kawiarnia Cafe Berg",
    "קפה ברג",
    "קפה ברג ורוצלב",
    "Kiosk projektu Maxa Berga"
  ],
  "localName": "Cafe Berg",
  "name": {
    "he": "קפה ברג",
    "en": "Cafe Berg",
    "pl": "Cafe Berg",
    "de": "Café Berg",
    "cs": "Kavárna Berg"
  },
  "description": {
    "he": "בית קפה בקיוסק היסטורי שתכנן מקס ברג, לצד חפיר העיר בצומת הרחובות פיוטרה סקארגי ופודוואלה. המרפסת משקיפה על המים ועל גבעת הפרטיזנים שממול. בגלריה תמונות העוגה והישיבה ליד המים מהביקור שלנו. אפשר לשלב הפסקת קפה עם הליכה לאורך החפיר וביקור בבסטיון הסמוך. בדקו שעות פתיחה ותפריט באתר הרשמי לפני ההגעה.",
    "en": "A café in a historic kiosk designed by Max Berg, beside the city moat at Piotra Skargi and Podwale. The terrace looks over the water towards Wzgórze Partyzantów. Our gallery shows cake and waterside seating from our visit. Combine a coffee break with a moat walk and the nearby bastion. Check opening hours and the menu with the café before visiting.",
    "pl": "Kawiarnia w zabytkowym kiosku projektu Maxa Berga, nad fosą miejską u zbiegu ulic Piotra Skargi i Podwale. Taras wychodzi na wodę i Wzgórze Partyzantów. Nasza galeria pokazuje ciasto i stoliki nad wodą podczas wizyty. Przerwę na kawę można połączyć ze spacerem wzdłuż fosy i odwiedzinami pobliskiego bastionu. Przed przyjazdem sprawdź godziny otwarcia i menu u kawiarni.",
    "de": "Café in einem historischen Kiosk von Max Berg am Stadtgraben, an der Kreuzung Piotra Skargi und Podwale. Die Terrasse blickt über das Wasser zum Wzgórze Partyzantów. Unsere Galerie zeigt Kuchen und Sitzplätze am Wasser bei unserem Besuch. Eine Kaffeepause lässt sich mit einem Spaziergang am Graben und zur nahen Bastion verbinden. Öffnungszeiten und Speisekarte vorab beim Café prüfen.",
    "cs": "Kavárna v historickém kiosku navrženém Maxem Bergem u městského příkopu, na křižovatce ulic Piotra Skargi a Podwale. Terasa nabízí výhled přes vodu na Wzgórze Partyzantów. Naše galerie ukazuje dort a posezení u vody během návštěvy. Kávu lze spojit s procházkou podél příkopu a návštěvou blízké bašty. Před cestou ověřte otevírací dobu a nabídku u kavárny."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.103978840814904,
      "lng": 17.03740582927844
    },
    "address": {
      "street": "Piotra Skargi / Podwale",
      "postalCode": "50-001",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat",
    "drink",
    "historical-landmark"
  ],
  "taxonomy": {
    "tags": [
      "cafe",
      "cake",
      "waterside",
      "architecture",
      "max-berg",
      "historical",
      "wroclaw"
    ]
  },
  "links": {
    "website": "https://cafe-berg.pl/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.103978840814904%2C17.03740582927844",
      "appleMaps": "https://maps.apple.com/?ll=51.103978840814904,17.03740582927844"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "verifiedAt": "2026-10-18",
    "factualSources": [
      {
        "url": "https://cafe-berg.pl/o-nas",
        "scope": "official identity, intersection, Max Berg kiosk and view across moat; coordinates from the official embedded Google map",
        "verifiedAt": "2026-10-18"
      },
      {
        "url": "https://www.wroclaw.pl/przedsiebiorczy-wroclaw/cafe-berg-kawiarnia-nad-fosa-wroclaw",
        "scope": "municipal historical account and location, published 2023-04-01; historic hours not reused",
        "verifiedAt": "2026-10-18"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/food-cafes/cafe-berg-01.jpg",
      "/assets/food-cafes/cafe-berg-02.jpg",
      "/assets/food-cafes/cafe-berg-03.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/food-cafes/cafe-berg-01.jpg": {
        "original": true,
        "sourceFile": "קפה ברג/WhatsApp Image 2026-10-18 at 09.58.01 (5).jpeg",
        "sourceSHA256": "c824039f224559aedb887b78139bbf5f7503c73889b308ddd9389b715740035a",
        "assetSHA256": "b205be4229879fa16389cc4f17a6bf7c4987d389c43a19d060f94cb6977a48c1",
        "heroCandidate": true,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/cafe-berg-02.jpg": {
        "original": true,
        "sourceFile": "קפה ברג/WhatsApp Image 2026-10-18 at 09.58.01 (7).jpeg",
        "sourceSHA256": "a32514b50a58e6bcaddcb8c9b8ab23b98682f2f0afb4a14f0af0e870091b537e",
        "assetSHA256": "961ad513045a24adeb57bfdaef93c8ee25fe9a47f197bc204247d18a47376265",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/cafe-berg-03.jpg": {
        "original": true,
        "sourceFile": "קפה ברג/WhatsApp Image 2026-10-18 at 09.58.01 (8).jpeg",
        "sourceSHA256": "54ef6e101bf2da323c29279a54099f968f78d3ca94708da22969c85207ce276d",
        "assetSHA256": "b2e4ce4d7c9cc1dcfe5cfad1b76f4d9a62e5e41fdfaae1ecb3d3da4a1c5271b4",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "zamek-topacz",
  "aliases": [
    "Zamek Topacz",
    "Topacz Castle"
  ],
  "localName": "Zamek Topacz Resort & Art SPA",
  "name": {
    "he": "טירת טופץ׳",
    "en": "Zamek Topacz",
    "pl": "Zamek Topacz",
    "de": "Schloss Topacz",
    "cs": "Zámek Topacz"
  },
  "description": {
    "he": "מתחם טירה היסטורי בשלנזה, עם מלון, מסעדות ומוזיאון מוטורי. פעילות האורות היא אירוע עונתי נפרד; בדקו כניסה וכרטיסים אצל המפעיל.",
    "en": "Historic castle resort in Ślęza with a hotel, dining and a motor museum. The light park is a separate seasonal event; check entry and tickets with the operator.",
    "pl": "Zabytkowy kompleks zamkowy w Ślęzie z hotelem, restauracjami i muzeum motoryzacji. Park iluminacji jest osobnym wydarzeniem sezonowym; sprawdź wejścia i bilety u organizatora.",
    "de": "Historische Schlossanlage in Ślęza mit Hotel, Restaurants und Automobilmuseum. Der Lichterpark ist eine gesonderte Saisonveranstaltung; Einlass und Tickets beim Betreiber prüfen.",
    "cs": "Historický zámecký areál ve Ślęze s hotelem, restauracemi a muzeem automobilů. Světelný park je samostatná sezonní akce; ověřte vstup a vstupenky u pořadatele."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "sleza",
    "coordinates": {
      "lat": 51.0359459,
      "lng": 16.9891338
    },
    "address": {
      "street": "Templariuszy 1",
      "postalCode": "55-040",
      "city": "Ślęza",
      "country": "Poland"
    }
  },
  "categories": [
    "castle",
    "hotel",
    "museum"
  ],
  "links": {
    "website": "https://www.zamektopacz.pl/",
    "navigation": {"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.0359459%2C16.9891338","appleMaps":"https://maps.apple.com/?ll=51.0359459,16.9891338"}
  },
  "experiences": [
    {
      "id": "lumina-park-2026-10",
      "type": "seasonal-event",
      "name": {
        "he": "עונת האורות בטירת טופץ׳ מתוכננת להיפתח ב־16 באוקטובר",
        "en": "Lumina Park at Zamek Topacz: opening planned for 16 October",
        "pl": "Lumina Park w Zamku Topacz: otwarcie planowane na 16 października",
        "de": "Lumina Park am Schloss Topacz: Eröffnung für 16. Oktober angekündigt",
        "cs": "Lumina Park na zámku Topacz: otevření plánováno na 16. října"
      },
      "startDate": "2026-10-16",
      "endDate": "2027-02-14",
      "status": "announced",
      "sourceUrl": "https://luminapark.pl/wroclaw/",
      "verifiedAt": "2026-10-12"
    }
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://www.zamektopacz.pl/kontakt/skontaktuj-sie",
        "checkedAt": "2026-10-12"
      },
      {
        "type": "official",
        "url": "https://luminapark.pl/wroclaw/",
        "checkedAt": "2026-10-12"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.zamektopacz.pl/kontakt/skontaktuj-sie",
      "method": "Operator GeoCoordinates in JSON-LD; resort location, not seasonal event entrance.",
      "checkedAt": "2026-10-12"
    },
    "seasonalEntrance": {
      "pedestrian": "https://maps.app.goo.gl/3PuTRCS3DwTJATzx6",
      "note": "Lumina operator directs pedestrians via Templariuszy 1 and cars via Tulipanowa; use operator directions."
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "editorialPriority": "normal"
},
{
  "id": "wroclaw-botanical-garden",
  "aliases": [
    "Ogród Botaniczny Uniwersytetu Wrocławskiego",
    "Botanical Garden Wroclaw"
  ],
  "localName": "Ogród Botaniczny Uniwersytetu Wrocławskiego",
  "name": {
    "he": "הגן הבוטני בוורוצלב",
    "en": "Wrocław Botanical Garden",
    "pl": "Ogród Botaniczny we Wrocławiu",
    "de": "Botanischer Garten Breslau",
    "cs": "Botanická zahrada ve Vratislavi"
  },
  "description": {
    "he": "הגן הבוטני של אוניברסיטת ורוצלב, ליד אוסטרוב טומסקי. בדקו את שעות הפעילות והאירועים העונתיים באתר הגן.",
    "en": "The University of Wrocław Botanical Garden near Ostrów Tumski. Check the garden website for opening hours and seasonal events.",
    "pl": "Ogród Botaniczny Uniwersytetu Wrocławskiego przy Ostrowie Tumskim. Sprawdź godziny otwarcia i wydarzenia sezonowe na stronie ogrodu.",
    "de": "Botanischer Garten der Universität Breslau nahe der Dominsel. Öffnungszeiten und Saisonveranstaltungen auf der Gartenseite prüfen.",
    "cs": "Botanická zahrada Vratislavské univerzity poblíž Ostrówa Tumského. Otevírací dobu a sezonní akce ověřte na webu zahrady."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1159,
      "lng": 17.0478
    },
    "address": {
      "street": "Henryka Sienkiewicza 23",
      "postalCode": "50-335",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "garden",
    "nature"
  ],
  "links": {
    "website": "https://www.ogrodbotaniczny.wroclaw.pl/",
    "navigation": {"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.1159%2C17.0478","appleMaps":"https://maps.apple.com/?ll=51.1159,17.0478"}
  },
  "experiences": [
    {
      "id": "pumpkin-illuminations-2026-10",
      "type": "seasonal-event",
      "name": {
        "he": "דלעות מוארות בגן הבוטני: מתוכנן ל־13–18 באוקטובר",
        "en": "Dyniowe Iluminacje: planned for 13–18 October at the Botanical Garden",
        "pl": "Dyniowe Iluminacje: zaplanowane na 13–18 października w Ogrodzie Botanicznym",
        "de": "Kürbisilluminationen im Botanischen Garten: für 13.–18. Oktober angekündigt",
        "cs": "Dýňové iluminace v botanické zahradě: plánovány na 13.–18. října"
      },
      "startDate": "2026-10-13",
      "endDate": "2026-10-18",
      "status": "announced",
      "sourceUrl": "https://www.ogrodbotaniczny.wroclaw.pl/wydarzenia.html",
      "verifiedAt": "2026-10-12"
    }
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://www.ogrodbotaniczny.wroclaw.pl/kontakt.html",
        "checkedAt": "2026-10-12"
      },
      {
        "type": "official",
        "url": "https://www.ogrodbotaniczny.wroclaw.pl/wydarzenia.html",
        "checkedAt": "2026-10-12"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.ogrodbotaniczny.wroclaw.pl/kontakt.html",
      "method": "GPS coordinates published by the university garden; garden location, not a claimed entrance.",
      "checkedAt": "2026-10-12"
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "editorialPriority": "normal"
},
{
  "id": "przystanek-kowary",
  "aliases": [
    "Przystanek Kowary",
    "Muzeum Przystanek Kowary"
  ],
  "localName": "Muzeum Przystanek Kowary",
  "name": {
    "he": "מוזיאון תחנת קובארי",
    "en": "Przystanek Kowary Museum",
    "pl": "Muzeum Przystanek Kowary",
    "de": "Museum Przystanek Kowary",
    "cs": "Muzeum Przystanek Kowary"
  },
  "description": {
    "he": "מוזיאון בתחנת הרכבת ההיסטורית בקובארי, המוקדש לכרייה, שטיחים ומורשת הרכבת המקומית. הכניסה דרך לשכת התיירות ברחוב דבורצובה 8, ללא תשלום, בימים שלישי–ראשון בשעות 08:00–16:00. מדריך קולי בפולנית, אנגלית, גרמנית וצ׳כית; בדקו שעות לפני ההגעה.",
    "en": "Museum in Kowary’s historic railway station about mining, carpets and local railway heritage. Enter through Tourist Information at Dworcowa 8. Free admission, Tuesday–Sunday 08:00–16:00; audioguides in Polish, English, German and Czech. Check hours before visiting.",
    "pl": "Muzeum w dawnym dworcu w Kowarach poświęcone górnictwu, dywanom i kolei. Wejście przez Informację Turystyczną przy Dworcowej 8. Wstęp wolny, wtorek–niedziela 8:00–16:00; audioguide po polsku, angielsku, niemiecku i czesku. Sprawdź godziny przed wizytą.",
    "de": "Museum im historischen Bahnhof Kowary über Bergbau, Teppiche und Eisenbahngeschichte. Eingang über die Touristinformation, Dworcowa 8. Eintritt frei, Dienstag–Sonntag 08:00–16:00; Audioguides auf Polnisch, Englisch, Deutsch und Tschechisch. Öffnungszeiten vor dem Besuch prüfen.",
    "cs": "Muzeum v historickém nádraží v Kowarech o hornictví, kobercích a železnici. Vstup přes turistické informace na Dworcowa 8. Vstup zdarma, úterý–neděle 08:00–16:00; audioprůvodci polsky, anglicky, německy a česky. Před návštěvou ověřte hodiny."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "kowary",
    "coordinates": {
      "lat": 50.79803,
      "lng": 15.82576
    },
    "address": {
      "street": "Dworcowa 8",
      "postalCode": "58-530",
      "city": "Kowary",
      "country": "Poland"
    }
  },
  "categories": [
    "museum",
    "history"
  ],
  "links": {
    "website": "https://turysta.kowary.pl/informacja-turystyczna/",
    "navigation": {"googleMaps":"https://www.google.com/maps/search/?api=1&query=50.79803%2C15.82576","appleMaps":"https://maps.apple.com/?ll=50.79803,15.82576"}
  },
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://turysta.kowary.pl/informacja-turystyczna/",
        "checkedAt": "2026-10-12"
      },
      {
        "type": "regional-tourism",
        "url": "https://karkonosze.treespot.pl/de/item/print?category=80",
        "checkedAt": "2026-10-12"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://karkonosze.treespot.pl/de/item/print?category=80",
      "method": "Published GPS for Tourist Information at Dworcowa 8, the museum entrance explicitly identified by Kowary municipality.",
      "checkedAt": "2026-10-12"
    },
    "openingDate": "2026-04-28",
    "openingDateNote": "Municipality states museum operates from 28 April; earlier conversation stated 27 April. No new-opening claim published."
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "editorialPriority": "normal"
},
{
  "id": "arche-klasztor",
  "aliases": [
    "Arche Klasztor Wroclaw",
    "ארכה קלשטור",
    "ארכה קלשטור ורוצלב"
  ],
  "localName": "Arche Klasztor Wrocław",
  "name": {
    "he": "Arche Klasztor Wrocław",
    "en": "Arche Klasztor Wrocław",
    "pl": "Arche Klasztor Wrocław",
    "de": "Arche Klasztor Wrocław",
    "cs": "Arche Klasztor Wrocław"
  },
  "description": {
    "he": "מלון בוטיק במנזר משוחזר מהמאה ה־19 בשכונת Karłowice הירוקה, עם פארק, בית קפה ומסעדה הנכללת במדריך MICHELIN. חלק מהמתחם עדיין משמש מנזר פעיל. כתובת: Al. Jana Kasprowicza 64–66.",
    "en": "A boutique hotel in a restored 19th-century monastery in leafy Karłowice, with a park, café and a restaurant included in the MICHELIN Guide. Part of the complex is still an active monastery. Address: Al. Jana Kasprowicza 64–66.",
    "pl": "Hotel butikowy w odrestaurowanym XIX-wiecznym klasztorze na zielonych Karłowicach, z parkiem, kawiarnią i restauracją wyróżnioną obecnością w przewodniku MICHELIN. Część kompleksu nadal pełni funkcję czynnego klasztoru. Adres: Al. Jana Kasprowicza 64–66.",
    "de": "Ein Boutiquehotel in einem restaurierten Kloster aus dem 19. Jahrhundert im grünen Karłowice, mit Park, Café und einem Restaurant im Guide MICHELIN. Ein Teil des Komplexes wird weiterhin als aktives Kloster genutzt. Adresse: Al. Jana Kasprowicza 64–66.",
    "cs": "Butikový hotel v obnoveném klášteře z 19. století v zelené čtvrti Karłowice, s parkem, kavárnou a restaurací zařazenou do průvodce MICHELIN. Část komplexu stále slouží jako činný klášter. Adresa: Al. Jana Kasprowicza 64–66."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.138478,
      "lng": 17.0509769
    },
    "address": {
      "street": "Al. Jana Kasprowicza 64–66",
      "postalCode": "51-137",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "sleep",
    "eat",
    "drink"
  ],
  "taxonomy": {
    "tags": [
      "hotel",
      "restaurant",
      "cafe",
      "historic-building",
      "michelin-guide"
    ]
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://archeklasztorwroclaw.pl/en",
        "checkedAt": "2026-10-01",
        "note": "Restored monastery hotel, restaurant, cafés and park."
      },
      {
        "type": "official",
        "url": "https://archeklasztorwroclaw.pl/en/contact",
        "checkedAt": "2026-10-01",
        "note": "Official address and JSON-LD coordinates: 51.138478, 17.0509769."
      },
      {
        "type": "official",
        "url": "https://guide.michelin.com/pl/en/lower-silesian/wroclaw_2399695/restaurant/arche-klasztor",
        "checkedAt": "2026-10-01",
        "note": "Restaurant included in the MICHELIN Guide; no star claim."
      }
    ]
  },
  "socialPosts": [{"platform": "facebook", "url": "https://facebook.com/permalink.php?story_fbid=pfbid026ARddCkCLMWtYCZW6LDMyYD2CQgotXgV2SMXdpSp4RjaZvFaRBaiNLJ4bfvaY7whl&id=61591964083308", "language": "he"}, {"platform": "instagram", "url": "https://www.instagram.com/p/Dd8ty96FGmt/", "language": "he", "context": "historical-cross-account"}, {"platform": "facebook", "url": "https://www.facebook.com/groups/2525899074519424/posts/2603091250133539/", "language": "he", "context": "community-group"}],
  "links": {
    "website": "https://archeklasztorwroclaw.pl/",
    "michelin": "https://guide.michelin.com/pl/en/lower-silesian/wroclaw_2399695/restaurant/arche-klasztor"
  },
  "media": {
    "photos": [
      "/assets/arche-klasztor-01.jpg",
      "/assets/arche-klasztor-02.jpg",
      "/assets/arche-klasztor-03.jpg",
      "/assets/arche-klasztor-04.jpg",
      "/assets/arche-klasztor-05.jpg",
      "/assets/arche-klasztor-06.jpg",
      "/assets/arche-klasztor-07.jpg",
      "/assets/arche-klasztor-08.jpg",
      "/assets/arche-klasztor-09.jpg",
      "/assets/arche-klasztor-10.jpg",
      "/assets/arche-klasztor-11.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/arche-klasztor-01.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.17 (5).jpeg",
        "heroCandidate": true,
        "alt": {
          "he": "חזית המלון המוארת בלילה",
          "en": "Illuminated hotel exterior at night"
        }
      },
      "/assets/arche-klasztor-02.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.17.jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "דלת הכניסה ההיסטורית",
          "en": "Historic entrance door"
        }
      },
      "/assets/arche-klasztor-03.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.18 (3).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "קיר הפסיפס בחצר",
          "en": "Courtyard mosaic wall"
        }
      },
      "/assets/arche-klasztor-04.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.17 (3).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "גרם המדרגות ההיסטורי",
          "en": "Historic staircase"
        }
      },
      "/assets/arche-klasztor-05.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.17 (1).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "מזרקת האבן ואריחי הקיר",
          "en": "Stone fountain and wall tiles"
        }
      },
      "/assets/arche-klasztor-06.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.16.jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "תפריט בהשראת מתכוני הנזירות",
          "en": "Menu inspired by the nuns’ recipes"
        }
      },
      "/assets/arche-klasztor-07.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.15.jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "מנות על שולחן המסעדה",
          "en": "Dishes on the restaurant table"
        }
      },
      "/assets/arche-klasztor-08.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.15 (3).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "מנה עם עגבניות ורוטב ירוק",
          "en": "Dish with tomatoes and green sauce"
        }
      },
      "/assets/arche-klasztor-09.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.15 (2).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "מנה לצד ירקות ונבטים",
          "en": "Dish with vegetables and sprouts"
        }
      },
      "/assets/arche-klasztor-10.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 19.03.00 (1).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "שלט הכניסה למתחם",
          "en": "Entrance sign for the complex"
        }
      },
      "/assets/arche-klasztor-11.jpg": {
        "original": true,
        "sourceFile": "WhatsApp Image 2026-09-24 at 17.31.17 (4).jpeg",
        "heroCandidate": false,
        "alt": {
          "he": "צילום אישי בכניסה למלון",
          "en": "Personal photograph at the hotel entrance"
        }
      }
    }
  },
  "status": "published",
  "editorialPriority": "medium",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
      id: "aleja-bielany",
      aliases: [],
      localName: "Aleja Bielany",
      name: { he: "Aleja Bielany", en: "Aleja Bielany", pl: "Aleja Bielany", de: "Aleja Bielany", cs: "Aleja Bielany" },
      description: {
        he: "Aleja Bielany הוא מרכז קניות גדול בביילאני ורוצלבסקיה, מדרום לוורוצלב. תמצאו בו חנויות, מקומות לאכול ושירותים, בלב אזור קניות רחב יותר.",
        en: "Aleja Bielany is a large shopping centre in Bielany Wrocławskie, just south of Wrocław. It brings together shops, places to eat and services in a wider retail area.",
        pl: "Aleja Bielany to duże centrum handlowe w Bielanach Wrocławskich, tuż na południe od Wrocławia. Łączy sklepy, gastronomię i usługi w większej strefie handlowej.",
        de: "Aleja Bielany ist ein großes Einkaufszentrum in Bielany Wrocławskie, südlich von Wrocław. Geschäfte, Gastronomie und Dienstleistungen liegen hier in einem größeren Einkaufsgebiet beieinander.",
        cs: "Aleja Bielany je velké nákupní centrum v Bielanech Wrocławských jižně od Vratislavi. Nabízí obchody, občerstvení a služby v širší nákupní oblasti."
      },
      location: {
        countryCode: "PL", regionId: "lower-silesia", cityId: "bielany-wroclawskie",
        coordinates: { lat: 51.0489, lng: 16.95959 },
        address: { street: "Czekoladowa 7-9", postalCode: "55-040", city: "Bielany Wrocławskie", country: "Poland" }
      },
      categories: ["buy"],
      taxonomy: { tags: ["shopping", "shopping-centre"] },
      provenance: {
        contentType: "personal-visit", personalVisit: true, originalPhotography: true,
        factualSources: [
          { type: "official", url: "https://www.alejabielany.pl/pl/kontakt", checkedAt: "2026-09-25", note: "Official name and address." },
          { type: "coordinates", url: "https://www.alejabielany.pl/pl/jak-dojechac", checkedAt: "2026-09-25", note: "Official directions page embeds a map centred at 51.0489, 16.95959 for Aleja Bielany." }
        ]
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/share/p/1E6RkQAwRa/", language: "he" },
        { platform: "instagram", url: "https://www.instagram.com/p/DdtGmqajP3o/?img_index=1", language: "he", context: "historical-cross-account" }
      ],
      links: { website: "https://www.alejabielany.pl/pl/" },
      media: {
        photos: [1, 2, 3, 4, 5, 6].map((number) => `/assets/aleja-bielany-${String(number).padStart(2, "0")}.jpg`),
        videos: [],
        metadata: {
          "/assets/aleja-bielany-01.jpg": { original: true, heroCandidate: true, sourceFile: "WhatsApp Image 2026-09-24 at 19.21.11 (22).jpeg", alt: { he: "אותיות Aleja Bielany מעל מבנה באזור הקניות", en: "Aleja Bielany lettering on a structure in the shopping area", pl: "Napis Aleja Bielany na konstrukcji w strefie handlowej", de: "Schriftzug Aleja Bielany auf einer Konstruktion im Einkaufsgebiet", cs: "Nápis Aleja Bielany na konstrukci v nákupní oblasti" } },
          "/assets/aleja-bielany-02.jpg": { original: true, sourceFile: "WhatsApp Image 2026-09-24 at 19.21.11 (21).jpeg", alt: { he: "חזית וכניסה מוארות של Aleja Bielany בלילה", en: "Illuminated Aleja Bielany exterior and entrance at night", pl: "Oświetlona fasada i wejście do Alei Bielany nocą", de: "Beleuchtete Fassade und Eingang der Aleja Bielany bei Nacht", cs: "Osvětlené průčelí a vstup do Aleja Bielany v noci" } },
          "/assets/aleja-bielany-03.jpg": { original: true, sourceFile: "WhatsApp Image 2026-09-24 at 17.19.00 (1).jpeg", alt: { he: "שלט Aleja Bielany מואר לצד הכביש בלילה", en: "Illuminated Aleja Bielany roadside sign at night", pl: "Podświetlony pylon Aleja Bielany przy drodze nocą", de: "Beleuchteter Wegweiser der Aleja Bielany an der Straße bei Nacht", cs: "Osvětlený poutač Aleja Bielany u silnice v noci" } },
          "/assets/aleja-bielany-04.jpg": { original: true, sourceFile: "WhatsApp Image 2026-09-24 at 17.19.00 (3).jpeg", alt: { he: "כביש הגישה ושלט Aleja Bielany בלילה", en: "Approach road and Aleja Bielany sign at night", pl: "Droga dojazdowa i pylon Aleja Bielany nocą", de: "Zufahrtsstraße und Schild der Aleja Bielany bei Nacht", cs: "Příjezdová silnice a poutač Aleja Bielany v noci" } },
          "/assets/aleja-bielany-05.jpg": { original: true, sourceFile: "WhatsApp Image 2026-09-24 at 19.21.11 (20).jpeg", alt: { he: "שלט Aleja Bielany המואר מקרוב", en: "Close view of the illuminated Aleja Bielany sign", pl: "Zbliżenie na podświetlony pylon Aleja Bielany", de: "Nahaufnahme des beleuchteten Aleja Bielany Schildes", cs: "Detail osvětleného poutače Aleja Bielany" } },
          "/assets/aleja-bielany-06.jpg": { original: true, sourceFile: "WhatsApp Image 2026-09-24 at 19.21.11 (23).jpeg", alt: { he: "אזור הקניות סביב Aleja Bielany, עם IKEA בסמוך", en: "Shopping area around Aleja Bielany, with nearby IKEA", pl: "Okolica handlowa Alei Bielany z pobliską IKEA", de: "Einkaufsgebiet rund um Aleja Bielany mit IKEA in der Nähe", cs: "Nákupní oblast kolem Aleja Bielany s nedalekým obchodem IKEA" } }
        }
      },
      status: "published", editorialPriority: "medium", languages: ["he", "en", "pl", "de", "cs"]
    },
    {
      id: "pedet",
      aliases: [],
      localName: "PeDeT Food Hall",
      name: { he: "PeDeT Food Hall", en: "PeDeT Food Hall", pl: "PeDeT Food Hall", de: "PeDeT Food Hall", cs: "PeDeT Food Hall" },
      description: {
        he: "מתחם אוכל מעוצב בתוך Renoma עם מטבחים, קינוחים וקוקטיילים.",
        en: "A stylish food hall inside Renoma with varied cuisines, desserts and cocktails.",
        pl: "Stylowy food hall w Renomie z różnymi kuchniami, deserami i koktajlami.",
        de: "Eine stilvolle Food Hall in der Renoma mit Küchen, Desserts und Cocktails.",
        cs: "Stylová food hall v Renomě s různými kuchyněmi, dezerty a koktejly."
      },
      location: { countryCode: "PL", regionId: "lower-silesia", cityId: "wroclaw", coordinates: { lat: 51.1037104, lng: 17.0324564 } },
      categories: ["eat", "drink", "buy"],
      provenance: { contentType: "personal-visit", personalVisit: true, originalPhotography: true, originalVideo: true },
      media: {
        photos: pedetPhotos,
        videos: pedetVideos,
        metadata: {
          ...Object.fromEntries(pedetPhotos.map((path, index) => [path, {
            original: true,
            ...(index === 0 ? { heroCandidate: true } : {}),
            sourceFile: `WhatsApp Image 2026-09-25 at ${pedetPhotoSources[index][0]}.jpeg`,
            alt: { he: pedetPhotoSources[index][1], en: pedetPhotoSources[index][2] },
          }])),
          ...Object.fromEntries(pedetVideos.map((path, index) => [path, {
            original: true,
            sourceFile: `WhatsApp Video 2026-09-25 at ${pedetVideoSources[index]}.mp4`,
          }])),
        },
      },
      status: "published", editorialPriority: "medium", languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      "id": "wieza-cisnien-borek",
      "aliases": [
        "Wieża ciśnień przy alei Wiśniowej",
        "Wasserturm Kleinburg"
      ],
      "localName": "Wieża Ciśnień Borek",
      "name": {
        "he": "מגדל המים של בורק",
        "en": "Borek Water Tower",
        "pl": "Wieża Ciśnień Borek",
        "de": "Wasserturm Borek",
        "cs": "Vodárenská věž Borek"
      },
      "description": {
        "he": "מגדל המים של בורק נבנה בשנים 1904–1905 בתכנון קרל קלים כחלק ממערכת המים העירונית, ומתנשא לגובה של כ־62 מטר. קשתות גדולות, צריחים, מעבר מוגבה, פסלי אבן ומזרקה מעטרים את מבנה הלבנים האדומות. ב־1906 נפתחה בו גלריית תצפית לציבור; זהו פרט היסטורי, ואינו מעיד על גישה כיום. בגלריה שלנו מבטים על המגדל, המעבר הגבוה, המזרקה ותבליטי בעלי החיים. כדאי לשלב עצירת צילום חיצונית בסיור אדריכלי בשכונת בורק. לא אומתו כניסה לפנים המבנה, פעילות מסעדה או עלייה לתצפית כיום.",
        "en": "Built in 1904–1905 to Karl Klimm’s design for the municipal water system, this red-brick tower rises about 62 metres. Look for the monumental arches, spires, elevated passage, stone sculptures and fountain. A public viewing gallery opened in 1906; this is historical information, not confirmation of access today. Our gallery shows the tower, elevated passage, fountain and animal reliefs. Consider an exterior photography stop on an architectural walk through Borek. Current interior entry, restaurant operation and access to the viewing gallery have not been verified.",
        "pl": "Ceglana wieża wodociągowa projektu Karla Klimma powstała w latach 1904–1905 i ma około 62 metrów wysokości. Warto zwrócić uwagę na monumentalne łuki, wieżyczki, wysoko zawieszony łącznik, kamienne rzeźby i fontannę. Galerię widokową udostępniono publiczności w 1906 roku; to informacja historyczna, nie potwierdzenie obecnej dostępności. Nasza galeria pokazuje wieżę, wysoko zawieszony łącznik, fontannę i płaskorzeźby zwierząt. To przystanek na zdjęcia z zewnątrz podczas spaceru architektonicznego po Borku. Nie potwierdzono obecnej możliwości wejścia do wnętrza, działalności restauracji ani dostępu do galerii widokowej.",
        "de": "Der etwa 62 Meter hohe Backsteinturm entstand 1904–1905 nach Karl Klimms Entwurf für die städtische Wasserversorgung. Auffällig sind die großen Bögen, Turmspitzen, der hoch gelegene Verbindungsgang, Steinskulpturen und der Brunnen. 1906 öffnete eine öffentliche Aussichtsgalerie; diese historische Angabe bestätigt keinen heutigen Zugang. Unsere Galerie zeigt den Turm, den hoch gelegenen Verbindungsgang, den Brunnen und Tierreliefs. Der Außenbereich bietet einen Fotostopp auf einem Architekturspaziergang durch Borek. Ein heutiger Innenzugang, Restaurantbetrieb oder Zugang zur Aussichtsgalerie ist nicht bestätigt.",
        "cs": "Cihlová vodárenská věž vznikla v letech 1904–1905 podle návrhu Karla Klimma pro městský vodovod a měří přibližně 62 metrů. Zaujmou mohutné oblouky, věžičky, vyvýšená spojovací chodba, kamenné plastiky a kašna. Vyhlídková galerie se veřejnosti otevřela v roce 1906; jde o historický údaj, nikoli potvrzení dnešní přístupnosti. Naše galerie ukazuje věž, vyvýšenou spojovací chodbu, kašnu a zvířecí reliéfy. Vnější pohled lze zařadit jako fotografickou zastávku při architektonické procházce čtvrtí Borek. Současný vstup do interiéru, provoz restaurace ani přístup na vyhlídkovou galerii nejsou ověřeny."
      },
      "location": {
        "countryCode": "PL",
        "regionId": "lower-silesia",
        "cityId": "wroclaw",
        "coordinates": {
          "lat": 51.08533,
          "lng": 17.01765
        },
        "address": {
          "street": "Sudecka 125A",
          "postalCode": "53-128",
          "city": "Wrocław",
          "country": "Poland"
        }
      },
      "categories": [
        "architecture",
        "historical-landmark"
      ],
      "taxonomy": {
        "tags": [
          "architecture",
          "historical",
          "history",
          "photography"
        ]
      },
      "provenance": {
        "contentType": "personal-visit",
        "personalVisit": true,
        "originalPhotography": true,
        "factualSources": [
          {
            "type": "official",
            "url": "https://www.wroclaw.pl/dla-mieszkanca/najpiekniejsza-wieza-cisnien-w-polsce-to-jego-dzielo-sto-lat-temu-zmarl-karl-klimm-galeria",
            "checkedAt": "2026-09-23",
            "note": "Karl Klimm attribution."
          },
          {
            "type": "architecture",
            "url": "https://www.whitemad.pl/wieza-cisnien-borek-we-wroclawiu-jedna-z-najpiekniejszych-w-europie/",
            "checkedAt": "2026-09-23",
            "note": "1904–1905 construction, 62 m height, red-brick architecture and stone sculptures."
          },
          {
            "type": "local-history",
            "url": "https://tuwroclaw.com/artykul/odkrywamy-wroclaw-wieza-n1372617",
            "checkedAt": "2026-09-23",
            "note": "Municipal water-supply role and historic viewing gallery opened in June 1906. No current access claims."
          },
          {
            "type": "coordinates",
            "url": "https://mapcarta.com/29217282",
            "checkedAt": "2026-09-23",
            "note": "Tower-specific location from GeoNames 8435802: 51.08533, 17.01765; distinct from Borek neighborhood and shopping centre."
          },
          {
            "type": "address",
            "url": "https://geoportal.wroclaw.pl/poi/poi/2628",
            "checkedAt": "2026-09-23",
            "note": "Municipal indexed listing: Sudecka 125a, 53-128 Wrocław; direct retrieval unavailable during verification."
          },
          {
            "type": "official-reverification",
            "url": "https://www.wroclaw.pl/dla-mieszkanca/najpiekniejsza-wieza-cisnien-w-polsce-to-jego-dzielo-sto-lat-temu-zmarl-karl-klimm-galeria",
            "checkedAt": "2026-10-18",
            "note": "Municipal account confirms Karl Klimm and identifies the tower at Wiśniowa; municipal geoportal indexed address Sudecka125a corroborates the existing identity. Historical opening information is not reused as current access."
          }
        ],
        "verifiedAt": "2026-10-18",
        "currentAccessUnverified": true,
        "socialVerification": {
          "checkedAt": "2026-10-18T19:08:46Z",
          "audit": "/data/borek-social-audit.json",
          "verifiedPosts": 9,
          "missing": [
            "instagram:he"
          ],
          "fallbackDisabled": true
        }
      },
      "socialPosts": [
        {
          "platform": "facebook",
          "url": "https://www.facebook.com/share/p/19hnYF5mwX/",
          "language": "he"
        },
        {
          "platform": "instagram",
          "url": "https://www.instagram.com/p/DdoS5H8jIhZ/?img_index=1",
          "language": "he",
          "context": "historical-cross-account"
        }
      ],
      "media": {
        "photos": [
          "/assets/wieza-cisnien-borek-01.jpg",
          "/assets/wieza-cisnien-borek-02.jpg",
          "/assets/wieza-cisnien-borek-03.jpg",
          "/assets/wieza-cisnien-borek-04.jpg",
          "/assets/wieza-cisnien-borek-05.jpg",
          "/assets/wieza-cisnien-borek-06.jpg",
          "/assets/wieza-cisnien-borek-07.jpg",
          "/assets/wieza-cisnien-borek-08.jpg",
          "/assets/wieza-cisnien-borek-09.jpg",
          "/assets/wieza-cisnien-borek-10.jpg",
          "/assets/wieza-cisnien-borek-11.jpg",
          "/assets/wieza-cisnien-borek-12.jpg",
          "/assets/wieza-cisnien-borek-13.jpg",
          "/assets/wieza-cisnien-borek-14.jpg",
          "/assets/wieza-cisnien-borek-15.jpg",
          "/assets/wieza-cisnien-borek-16.jpg"
        ],
        "videos": [],
        "metadata": {
          "/assets/wieza-cisnien-borek-01.jpg": {
            "tags": [
              "architecture",
              "full-tower-fountain",
              "hero"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (3).jpeg",
            "heroCandidate": true,
            "sourceSHA256": "5928e1bb5650679323aa8d43495dd0dc4c59d0ba84f8ccf9ede2f367dc58e449",
            "assetSHA256": "5928e1bb5650679323aa8d43495dd0dc4c59d0ba84f8ccf9ede2f367dc58e449"
          },
          "/assets/wieza-cisnien-borek-02.jpg": {
            "tags": [
              "architecture",
              "street-context"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39 (4).jpeg",
            "sourceSHA256": "443fd43b1243ddcd1d03b6dd658f7044d12b39103da155c46dbf6bb884507131",
            "assetSHA256": "443fd43b1243ddcd1d03b6dd658f7044d12b39103da155c46dbf6bb884507131"
          },
          "/assets/wieza-cisnien-borek-03.jpg": {
            "tags": [
              "architecture",
              "entrance-exterior"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (2).jpeg",
            "sourceSHA256": "c8aa21641589e73f33e49cb5cba94b3247ea1785ec43cd82576b028611967e63",
            "assetSHA256": "c8aa21641589e73f33e49cb5cba94b3247ea1785ec43cd82576b028611967e63"
          },
          "/assets/wieza-cisnien-borek-04.jpg": {
            "tags": [
              "architecture",
              "arches"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (1).jpeg",
            "sourceSHA256": "202e79162e58c0fb9b2ac85ba4d51b80c522af723f591ba2130069a3f3dbf9a2",
            "assetSHA256": "202e79162e58c0fb9b2ac85ba4d51b80c522af723f591ba2130069a3f3dbf9a2"
          },
          "/assets/wieza-cisnien-borek-05.jpg": {
            "tags": [
              "architecture",
              "upper-facade"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39 (3).jpeg",
            "sourceSHA256": "8accae1eecf2f8f0ee05b5b17eefcb747020709cdd9b8f2b90685f74314b4bd4",
            "assetSHA256": "8accae1eecf2f8f0ee05b5b17eefcb747020709cdd9b8f2b90685f74314b4bd4"
          },
          "/assets/wieza-cisnien-borek-06.jpg": {
            "tags": [
              "architecture",
              "spires-passage"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (11).jpeg",
            "sourceSHA256": "5162f1e06a49f559e59fade7157d992dba623a7e78d7d231872b40b8231406f7",
            "assetSHA256": "5162f1e06a49f559e59fade7157d992dba623a7e78d7d231872b40b8231406f7"
          },
          "/assets/wieza-cisnien-borek-07.jpg": {
            "tags": [
              "architecture",
              "connecting-passage"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (10).jpeg",
            "sourceSHA256": "e749cfd8994f470a70d51236635a0e7a25d6df819d130179288614196d3a7ece",
            "assetSHA256": "e749cfd8994f470a70d51236635a0e7a25d6df819d130179288614196d3a7ece"
          },
          "/assets/wieza-cisnien-borek-08.jpg": {
            "tags": [
              "architecture",
              "spire"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39.jpeg",
            "sourceSHA256": "4482d5a5244ef81977e3a21fd833f6634cc85926e22e91477c6cba8096646039",
            "assetSHA256": "4482d5a5244ef81977e3a21fd833f6634cc85926e22e91477c6cba8096646039"
          },
          "/assets/wieza-cisnien-borek-09.jpg": {
            "tags": [
              "architecture",
              "inscription"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39 (2).jpeg",
            "sourceSHA256": "d5fe95f405780aa50d496886bb0cbdd9daa619a0bc10364238447af512f0b6ae",
            "assetSHA256": "d5fe95f405780aa50d496886bb0cbdd9daa619a0bc10364238447af512f0b6ae"
          },
          "/assets/wieza-cisnien-borek-10.jpg": {
            "tags": [
              "architecture",
              "animal-relief"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38.jpeg",
            "sourceSHA256": "ab7081678071df6fbcb078468a7c56d6c700a2359ccf165bbfc5468caf61b2e4",
            "assetSHA256": "ab7081678071df6fbcb078468a7c56d6c700a2359ccf165bbfc5468caf61b2e4"
          },
          "/assets/wieza-cisnien-borek-11.jpg": {
            "tags": [
              "architecture",
              "animal-relief-2"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (9).jpeg",
            "sourceSHA256": "91cadb14ffdec5092b8cba3f74961724305a7f15cf7fe40b9aa944ce51e331d9",
            "assetSHA256": "91cadb14ffdec5092b8cba3f74961724305a7f15cf7fe40b9aa944ce51e331d9"
          },
          "/assets/wieza-cisnien-borek-12.jpg": {
            "tags": [
              "architecture",
              "animal-relief-3"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (6).jpeg",
            "sourceSHA256": "e5359415e5e251486b09e4b94a9b49170701611bfafd1f239ff315d9e8fd29d6",
            "assetSHA256": "e5359415e5e251486b09e4b94a9b49170701611bfafd1f239ff315d9e8fd29d6"
          },
          "/assets/wieza-cisnien-borek-13.jpg": {
            "tags": [
              "architecture",
              "stone-emblem"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (8).jpeg",
            "sourceSHA256": "3a1f5916660c06bdf26e1c10f55d53d95bd25d67a0b143ebac1b2184aee5e030",
            "assetSHA256": "3a1f5916660c06bdf26e1c10f55d53d95bd25d67a0b143ebac1b2184aee5e030"
          },
          "/assets/wieza-cisnien-borek-14.jpg": {
            "tags": [
              "architecture",
              "roof-ornament"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (7).jpeg",
            "sourceSHA256": "565350e679fe96b11efa66347edd05a2028b883b1e60f619a2dd1a4e70b724fa",
            "assetSHA256": "565350e679fe96b11efa66347edd05a2028b883b1e60f619a2dd1a4e70b724fa"
          },
          "/assets/wieza-cisnien-borek-15.jpg": {
            "tags": [
              "architecture",
              "fountain"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (5).jpeg",
            "sourceSHA256": "830e9da5d1cedff4fcd868cab20c2e5044b27d207594016d9bf77dc2c8ae238f",
            "assetSHA256": "830e9da5d1cedff4fcd868cab20c2e5044b27d207594016d9bf77dc2c8ae238f"
          },
          "/assets/wieza-cisnien-borek-16.jpg": {
            "original": true,
            "sourceFile": "waterTower/IMG_2449 2.HEIC",
            "sourceSHA256": "69fdc396f504f547f79da96c7dcf884b19f3a559c0a593a84fbb936290551eaf",
            "assetSHA256": "14dd53bb609a96f48f5c26fbf8e69f79a3a9e25673d6060bb9492a6c4e0bdc51",
            "transformations": "HEIC decoded, visual orientation corrected by90degrees counterclockwise after EXIF transpose, resized proportionally, no crop",
            "alt": {
              "he": "מבט נוסף על תבליט חיות האבן בקשת המגדל",
              "en": "Additional view of the stone animal relief on the tower arch",
              "pl": "Dodatkowe ujęcie kamiennej płaskorzeźby zwierząt na łuku wieży",
              "de": "Weitere Ansicht des steinernen Tierreliefs am Turmbogen",
              "cs": "Další pohled na kamenný zvířecí reliéf na oblouku věže"
            }
          }
        }
      },
      "status": "published",
      "editorialPriority": "normal",
      "languages": [
        "he",
        "en",
        "pl",
        "de",
        "cs"
      ],
      "links": {
        "website": "https://www.wroclaw.pl/dla-mieszkanca/najpiekniejsza-wieza-cisnien-w-polsce-to-jego-dzielo-sto-lat-temu-zmarl-karl-klimm-galeria",
        "navigation": {
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.08533%2C17.01765",
          "appleMaps": "https://maps.apple.com/?ll=51.08533,17.01765"
        },
        "socialProfileFallback": false
      }
    },
    {
      "id": "prize-by-radisson-wroclaw-sky-tower",
      "aliases": [],
      "localName": "Prize by Radisson, Wroclaw Sky Tower",
      "name": {
        "he": "Prize by Radisson, Wroclaw Sky Tower",
        "en": "Prize by Radisson, Wroclaw Sky Tower",
        "pl": "Prize by Radisson, Wroclaw Sky Tower",
        "de": "Prize by Radisson, Wroclaw Sky Tower",
        "cs": "Prize by Radisson, Wroclaw Sky Tower"
      },
      "description": {
        "he": "מלון של מותג Prize by Radisson במתחם Sky Tower, עם 208 חדרים, ארוחת בוקר ובר הפועל בכל שעות היממה. המלון הוא עסק נפרד מאטרקציות המגדל.",
        "en": "A Prize by Radisson hotel within Sky Tower, with 208 rooms, breakfast and a 24-hour bar. The hotel is separate from the tower’s visitor attractions.",
        "pl": "Hotel marki Prize by Radisson w kompleksie Sky Tower, z 208 pokojami, śniadaniami i całodobowym barem. Hotel jest odrębny od atrakcji turystycznych wieżowca.",
        "de": "Ein Hotel der Marke Prize by Radisson im Sky Tower mit 208 Zimmern, Frühstück und einer rund um die Uhr geöffneten Bar. Eigenständig gegenüber den Besucherattraktionen des Turms.",
        "cs": "Hotel značky Prize by Radisson v komplexu Sky Tower nabízí 208 pokojů, snídaně a nepřetržitě otevřený bar. Hotel je samostatný podnik, odlišný od návštěvnických atrakcí věže."
      },
      "location": {
        "countryCode": "PL",
        "regionId": "lower-silesia",
        "cityId": "wroclaw",
        "coordinates": {
          "lat": 51.094799,
          "lng": 17.019579
        },
        "address": {
          "street": "Szczęśliwa 33",
          "postalCode": "53-445",
          "city": "Wrocław",
          "country": "Poland"
        }
      },
      "categories": [
        "sleep"
      ],
      "links": {
        "website": "https://www.radissonhotels.com/en-us/hotels/prize-by-radisson-wroclaw-sky-tower",
        "navigation": {
          "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.094799%2C17.019579",
          "appleMaps": "https://maps.apple.com/?ll=51.094799,17.019579&q=Prize%20by%20Radisson"
        }
      },
      "provenance": {
        "contentType": "verified-intake",
        "personalVisit": false,
        "factualSources": [
          {
            "type": "official",
            "url": "https://www.radissonhotels.com/en-us/hotels/prize-by-radisson-wroclaw-sky-tower",
            "checkedAt": "2026-09-22",
            "note": "Official hotel name, Szczęśliwa 33 address and 208 rooms."
          },
          {
            "type": "coordinates",
            "url": "https://www.cvent.com/venues/wroclaw/hotel/prize-by-radisson-wroclaw/venue-61e12c0c-5f20-4c36-8d65-e4ace6c13734",
            "checkedAt": "2026-09-22",
            "note": "Hotel supplier profile structured location: latitude 51.094799, longitude 17.019579; address matches official hotel."
          },
          {
            "type": "opening-confirmation",
            "url": "https://architektura.muratorplus.pl/projekty/to-ma-byc-wizytowka-marki-w-polsce-a-powierzchnia-biurowa-nie-jest-juz-potrzebna-zajeli-piec-pieter-w-sky-tower-za-projekt-wnetrz-odpowiada-tremend-aa-iM8f-rTGG-qKnw.html",
            "checkedAt": "2026-09-22",
            "note": "15 September report confirms opening; corroborated by active September accommodation offers."
          }
        ]
      },
      "media": {
        "photos": [],
        "videos": []
      },
      "status": "published",
      "editorialPriority": "normal",
      "languages": [
        "he",
        "en",
        "pl",
        "de",
        "cs"
      ]
    },
{
  "id": "hala",
  "aliases": [],
  "localName": "Hala Stulecia",
  "name": {
    "he": "היכל המאה",
    "en": "Centennial Hall",
    "pl": "Hala Stulecia",
    "de": "Jahrhunderthalle",
    "cs": "Hala století"
  },
  "description": {
    "he": "היכל המאה הוא מבנה משנת 1913 בתכנון מקס ברג, ואתר מורשת עולמית של אונסק״ו. בגלריה מבטים על החזית והכיפה, רחבת האיגליצה וההיכל מעבר לבריכת המזרקה. אפשר לשלב ביקור עם הפרגולה וביתן ארבע הכיפות הסמוכים. הכניסה לפנים ההיכל תלויה בלוח האירועים ובזמינות הביקורים; בדקו באתר הרשמי לפני ההגעה.",
    "en": "Designed by Max Berg and opened in 1913, Centennial Hall is a UNESCO World Heritage site. Our gallery shows its façade and dome, the Iglica plaza and views across the fountain basin. Combine it with the nearby Pergola and Four Domes Pavilion. Interior access depends on events and visitor availability; check the official site before arriving.",
    "pl": "Hala Stulecia, zaprojektowana przez Maxa Berga i otwarta w 1913 roku, jest obiektem światowego dziedzictwa UNESCO. Galeria pokazuje elewację i kopułę, plac z Iglicą oraz widoki zza niecki fontanny. Wizytę można połączyć z pobliską Pergolą i Pawilonem Czterech Kopuł. Dostęp do wnętrza zależy od wydarzeń i dostępności zwiedzania; sprawdź oficjalną stronę przed przyjazdem.",
    "de": "Die von Max Berg entworfene und 1913 eröffnete Jahrhunderthalle gehört zum UNESCO-Welterbe. Unsere Galerie zeigt Fassade und Kuppel, den Platz mit der Iglica und Blicke über das Wasserbecken. Ein Besuch lässt sich mit der nahen Pergola und dem Vier-Kuppel-Pavillon verbinden. Der Innenzugang hängt von Veranstaltungen und Besichtigungsmöglichkeiten ab; prüfen Sie vorher die offizielle Website.",
    "cs": "Hala století, navržená Maxem Bergem a otevřená v roce 1913, je památkou světového dědictví UNESCO. Galerie ukazuje průčelí a kupoli, prostranství s Iglicou a pohledy přes nádrž fontány. Návštěvu lze spojit s nedalekou Pergolou a Pavilonem čtyř kupolí. Přístup dovnitř závisí na akcích a dostupnosti prohlídek; před cestou ověřte oficiální web."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.10689,
      "lng": 17.07733
    },
    "address": {
      "street": "Wystawowa 1",
      "postalCode": "51-618",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture"
  ],
  "taxonomy": {
    "tags": [
      "architecture",
      "unesco",
      "historical",
      "photography"
    ]
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "originalVideo": true,
    "factualSources": [
      {
        "url": "https://whc.unesco.org/en/list/1165",
        "verifiedAt": "2026-10-18"
      },
      {
        "url": "https://halastulecia.pl/en/for-visitors/",
        "verifiedAt": "2026-10-18"
      }
    ]
  },
  "socialPosts": [
    {
      "platform": "facebook",
      "url": "https://www.facebook.com/61591964083308/posts/122115263553398802/"
    },
    {
      "platform": "instagram",
      "url": "https://www.instagram.com/wroclaw.lowersilesia/p/DcTdbhVjM1Y/"
    }
  ],
  "media": {
    "guideVideos": {"he": "https://youtube.com/shorts/y74YI_tgRq0", "en": "https://youtube.com/shorts/EOBJMMmLY_I"},
    "photos": [
      "/assets/hala-stulecia-01.jpg",
      "/assets/hala-stulecia-02.jpg",
      "/assets/hala-stulecia-03.jpg",
      "/assets/hala-stulecia-04.jpg",
      "/assets/hala-stulecia-05.jpg",
      "/assets/gallery-stulecia-02.jpg",
      "/assets/gallery-stulecia-03.jpg",
      "/assets/hala-refresh-oct18-01.jpg",
      "/assets/hala-refresh-oct18-02.jpg",
      "/assets/hala-refresh-oct18-03.jpg",
      "/assets/hala-refresh-oct18-04.jpg",
      "/assets/hala-refresh-oct18-05.jpg"
    ],
    "videos": [
      "/assets/hala-stulecia-visit.mp4",
      "/assets/video-stulecia-fountain.mp4",
      "/assets/hala-pergola-view-oct18.mp4",
      "/assets/hala-iglica-plaza-oct18.mp4"
    ],
    "metadata": {
      "/assets/hala-stulecia-01.jpg": {
        "tags": [
          "centennial-hall",
          "exterior",
          "architecture",
          "hero"
        ],
        "original": true,
        "heroCandidate": true,
        "sourceFile": "IMG_5063.JPG"
      },
      "/assets/hala-stulecia-02.jpg": {
        "tags": [
          "centennial-hall",
          "exterior",
          "flowers"
        ],
        "original": true,
        "sourceFile": "IMG_5062.JPG"
      },
      "/assets/hala-stulecia-03.jpg": {
        "tags": [
          "centennial-hall",
          "exterior",
          "landscape"
        ],
        "original": true,
        "sourceFile": "IMG_5059.JPG"
      },
      "/assets/hala-stulecia-04.jpg": {
        "tags": [
          "centennial-hall",
          "dwarf",
          "visitor-detail"
        ],
        "original": true,
        "sourceFile": "IMG_5064.JPG"
      },
      "/assets/hala-stulecia-05.jpg": {
        "tags": [
          "centennial-hall",
          "visitor-area",
          "food-truck"
        ],
        "original": true,
        "sourceFile": "IMG_5104.JPG"
      },
      "/assets/hala-stulecia-visit.mp4": {
        "tags": [
          "centennial-hall",
          "visitor-experience",
          "video"
        ],
        "original": true,
        "sourceFile": "IMG_5061.MOV"
      },
      "/assets/video-stulecia-fountain.mp4": {
        "tags": [
          "multimedia-fountain",
          "centennial-hall-area",
          "video"
        ],
        "original": true
      },
      "/assets/hala-refresh-oct18-01.jpg": {
        "original": true,
        "sourceFile": "IMG_0990.JPG",
        "sourceSHA256": "51d2278a03c46c69638beaad16ffa17900d0f076a931c38722cc942c3158f86d",
        "tags": [
          "centennial-hall",
          "exterior",
          "architecture"
        ]
      },
      "/assets/hala-refresh-oct18-02.jpg": {
        "original": true,
        "sourceFile": "IMG_5826.JPG",
        "sourceSHA256": "0975afe74165ba6b256e7dac2880b8d61d6f5f293c93319e8ff25d7ca41b19fc",
        "tags": [
          "centennial-hall",
          "exterior",
          "architecture"
        ]
      },
      "/assets/hala-refresh-oct18-03.jpg": {
        "original": true,
        "sourceFile": "IMG_5831.JPG",
        "sourceSHA256": "57827cd9e6f3bda451aec3eaf0742d4efcb3619c01d925623296e39b1f13b34d",
        "tags": [
          "centennial-hall",
          "exterior",
          "architecture"
        ]
      },
      "/assets/hala-refresh-oct18-04.jpg": {
        "original": true,
        "sourceFile": "IMG_5852.JPG",
        "sourceSHA256": "3683a22a40ed230c92ca9cdd6cfb2513821a59e31434048eac61fe05ea06e5b8",
        "tags": [
          "centennial-hall",
          "exterior",
          "architecture"
        ]
      },
      "/assets/hala-refresh-oct18-05.jpg": {
        "original": true,
        "sourceFile": "IMG_5853.JPG",
        "sourceSHA256": "027690a89d788de97a032eda83d19de2af33c959e4610c3ffea96dd6f0f1ce51",
        "tags": [
          "centennial-hall",
          "exterior",
          "architecture"
        ]
      },
      "/assets/hala-pergola-view-oct18.mp4": {
        "original": true,
        "sourceFile": "IMG_5828.MOV",
        "sourceSHA256": "f1da2b16ec7fcadeca4d15906a362e1d80a34114a4748238585ffa3b937a5bdc",
        "tags": [
          "centennial-hall",
          "visit-video"
        ]
      },
      "/assets/hala-iglica-plaza-oct18.mp4": {
        "original": true,
        "sourceFile": "IMG_5851.MOV",
        "sourceSHA256": "a5dddfb802740aff44863691d47e2337b0971b1f9aba39d777bce83a386c1a79",
        "tags": [
          "centennial-hall",
          "visit-video"
        ]
      }
    }
  },
  "status": "published",
  "editorialPriority": "high",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "links": {
    "website": "https://halastulecia.pl/en/for-visitors/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10689%2C17.07733",
      "appleMaps": "https://maps.apple.com/?ll=51.10689,17.07733"
    }
  }
},
    {
      id: "ksiaz-castle",
      aliases: [],
      localName: "Zamek Książ w Wałbrzychu",
      name: {
        he: "טירת קשונז׳",
        en: "Książ Castle",
        pl: "Zamek Książ w Wałbrzychu",
        de: "Schloss Fürstenstein (Książ)",
        cs: "Zámek Książ",
      },
      description: {
        he: "אחת הטירות המרשימות בשלזיה התחתית, המשלבת ארכיטקטורה מפוארת, חדרים ואולמות היסטוריים, תצפיות אל היערות, טרסות וגנים מטופחים וסיפור היסטורי יוצא דופן. מתחת לטירה מסתתרת גם מערכת מנהרות מתקופת מלחמת העולם השנייה. מקום שכדאי להקדיש לו ביקור משמעותי ולא רק עצירת צילום.",
        en: "One of Lower Silesia’s most impressive castles, combining grand architecture, historic rooms and halls, views over the forests, terraces and carefully maintained gardens with an extraordinary story. Beneath the castle lies a tunnel system dating from the Second World War. This is a place worth giving meaningful time to, not just stopping for a photograph.",
        pl: "Jeden z najbardziej imponujących zamków Dolnego Śląska, łączący okazałą architekturę, historyczne komnaty i sale, widoki na lasy, tarasy i starannie utrzymane ogrody z niezwykłą historią. Pod zamkiem kryje się także system tuneli z okresu II wojny światowej. To miejsce, któremu warto poświęcić więcej czasu, a nie tylko zatrzymać się na zdjęcie.",
        de: "Eines der beeindruckendsten Schlösser Niederschlesiens: Prächtige Architektur, historische Räume und Säle, Ausblicke über die Wälder, Terrassen und gepflegte Gärten verbinden sich hier mit einer außergewöhnlichen Geschichte. Unter dem Schloss verbirgt sich zudem ein Tunnelsystem aus der Zeit des Zweiten Weltkriegs. Ein Ort, für den man sich bewusst Zeit nehmen sollte – nicht nur für einen Fotostopp.",
        cs: "Jeden z nejpůsobivějších zámků Dolního Slezska spojuje velkolepou architekturu, historické komnaty a sály, výhledy na lesy, terasy a pečlivě udržované zahrady s mimořádným příběhem. Pod zámkem se navíc ukrývá systém tunelů z období druhé světové války. Tomuto místu stojí za to věnovat více času, ne se zastavit jen kvůli fotografii.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "walbrzych",
        coordinates: { lat: 50.8422222, lng: 16.2916667 },
        address: {
          street: "Piastów Śląskich 1",
          postalCode: "58-306",
          city: "Wałbrzych",
          country: "Poland",
        },
      },
      categories: ["castle", "garden", "historical-landmark", "scenic-viewpoint"],
      taxonomy: {
        tags: [
          "history", "architecture", "castles", "gardens", "photography",
          "wwii-history", "nature-scenery", "cultural", "historical",
          "scenic", "romantic", "immersive", "lower-silesia",
          "outside-wroclaw", "excursion",
        ],
      },
      suitability: {
        recommendedFor: ["couples", "adults", "families", "culture-lovers", "history-lovers", "photographers"],
        walkingIntensity: "moderate",
        familyFriendly: true,
        couples: true,
        romantic: true,
        indoorOutdoor: "both",
        rainFriendly: "partial",
        accessibility: {
          level: "partial",
          notes: {
            he: "הנגישות משתנה בין חללי הטירה, הטרסות והמנהרות; יש מדרגות, שיפועים ומשטחים לא אחידים.",
            en: "Accessibility varies across the castle interiors, terraces and tunnels; expect stairs, slopes and uneven surfaces.",
            pl: "Dostępność różni się w zależności od wnętrz, tarasów i tuneli; występują schody, pochyłości i nierówne nawierzchnie.",
            de: "Die Zugänglichkeit variiert zwischen Innenräumen, Terrassen und Tunneln; es gibt Treppen, Steigungen und unebene Flächen.",
            cs: "Přístupnost se liší mezi interiéry, terasami a tunely; počítejte se schody, svahy a nerovným povrchem.",
          },
        },
      },
      visit: {
        durationMinutes: 180,
        bestTimeOfDay: ["morning", "afternoon"],
        seasonalSuitability: ["spring", "summer", "autumn", "winter"],
      },
      links: {
        website: "https://www.ksiaz.walbrzych.pl/",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=50.8422222%2C16.2916667",
          appleMaps: "https://maps.apple.com/?ll=50.8422222,16.2916667&q=Zamek%20Ksi%C4%85%C5%BC",
        },
      },
      experiences: [
        {
          id: "castle-interiors",
          tags: ["cultural", "historical", "immersive"],
          accessibility: {
            level: "partial",
            notes: {
              he: "במבנה ההיסטורי יש מדרגות והנגישות משתנה בין מסלולי הביקור.",
              en: "The historic building includes stairs, and access varies between visitor routes.",
              pl: "W historycznym budynku są schody, a dostępność różni się między trasami zwiedzania.",
              de: "Das historische Gebäude umfasst Treppen; die Zugänglichkeit variiert je nach Besucherroute.",
              cs: "V historické budově jsou schody a přístupnost se liší podle návštěvnické trasy.",
            },
          },
        },
        {
          id: "terraces-and-gardens",
          tags: ["gardens", "scenic", "romantic", "photography"],
          accessibility: {
            level: "partial",
            notes: {
              he: "הטרסות והגנים כוללים מדרגות, שיפועים ומשטחים לא אחידים.",
              en: "The terraces and gardens include stairs, slopes and uneven surfaces.",
              pl: "Tarasy i ogrody obejmują schody, pochyłości i nierówne nawierzchnie.",
              de: "Die Terrassen und Gärten umfassen Treppen, Steigungen und unebene Flächen.",
              cs: "Terasy a zahrady zahrnují schody, svahy a nerovné povrchy.",
            },
          },
        },
        {
          id: "underground-wwii-tunnels",
          tags: ["wwii-history", "historical", "immersive"],
          accessibility: {
            level: "limited",
            notes: {
              he: "המסלול התת־קרקעי עשוי לכלול מדרגות, מעברים צרים ומשטחים לא אחידים.",
              en: "The underground route may include stairs, narrow passages and uneven surfaces.",
              pl: "Trasa podziemna może obejmować schody, wąskie przejścia i nierówne nawierzchnie.",
              de: "Die unterirdische Route kann Treppen, enge Passagen und unebene Flächen umfassen.",
              cs: "Podzemní trasa může zahrnovat schody, úzké průchody a nerovné povrchy.",
            },
          },
        },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        factualSources: [
          { type: "official", url: "https://www.ksiaz.walbrzych.pl/", checkedAt: "2026-08-10" },
          { type: "address", url: "https://www.ksiaz.walbrzych.pl/en/turystyka/kontakt", checkedAt: "2026-08-10" },
          { type: "coordinates", url: "https://www.wikidata.org/wiki/Q738109", checkedAt: "2026-08-10", note: "50°50′32″N, 16°17′30″E" },
        ],
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/share/p/19UBPN184V/" },
        { platform: "instagram", url: "https://www.instagram.com/p/Dbhy7ROHMi_/?img_index=1" },
      ],
      media: {
        photos: [
          "/assets/ksiaz-castle-01.jpg", "/assets/ksiaz-castle-02.jpg", "/assets/ksiaz-castle-03.jpg",
          "/assets/ksiaz-castle-04.jpg", "/assets/ksiaz-castle-05.jpg", "/assets/ksiaz-castle-06.jpg",
          "/assets/ksiaz-castle-07.jpg", "/assets/ksiaz-castle-08.jpg", "/assets/ksiaz-castle-09.jpg",
          "/assets/ksiaz-castle-10.jpg", "/assets/ksiaz-castle-11.jpg", "/assets/ksiaz-castle-12.jpg",
          "/assets/ksiaz-castle-13.jpg",
        ],
        videos: [],
        metadata: {
          "/assets/ksiaz-castle-01.jpg": { tags: ["castle", "exterior", "architecture", "hero"], original: true, heroCandidate: true },
          "/assets/ksiaz-castle-02.jpg": { tags: ["castle", "architecture", "exterior"], original: true },
          "/assets/ksiaz-castle-03.jpg": { tags: ["castle", "courtyard", "architecture"], original: true },
          "/assets/ksiaz-castle-04.jpg": { tags: ["castle", "exterior", "nature-scenery"], original: true },
          "/assets/ksiaz-castle-05.jpg": { tags: ["terraces", "architecture", "viewpoint"], original: true },
          "/assets/ksiaz-castle-06.jpg": { tags: ["castle", "architecture", "courtyard"], original: true },
          "/assets/ksiaz-castle-07.jpg": { tags: ["gardens", "nature-scenery"], original: true },
          "/assets/ksiaz-castle-08.jpg": { tags: ["gardens", "landscape"], original: true },
          "/assets/ksiaz-castle-09.jpg": { tags: ["gardens", "fountain", "terraces"], original: true },
          "/assets/ksiaz-castle-10.jpg": { tags: ["gardens", "fountain", "nature-scenery"], original: true },
          "/assets/ksiaz-castle-11.jpg": { tags: ["gardens", "landscape"], original: true },
          "/assets/ksiaz-castle-12.jpg": { tags: ["underground", "wwii-history", "tunnels"], original: true },
          "/assets/ksiaz-castle-13.jpg": { tags: ["underground", "wwii-history", "tunnels"], original: true },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "glowny",
      aliases: ["wroclaw-glowny", "dworzec-wroclaw-glowny", "wroclaw-main-railway-station"],
      localName: "Wrocław Główny",
      name: {
        he: "תחנת הרכבת המרכזית של ורוצלב",
        en: "Wrocław Main Railway Station",
        pl: "Wrocław Główny",
        de: "Hauptbahnhof Wrocław",
        cs: "Hlavní nádraží Wrocław",
      },
      description: {
        he: "תחנת הרכבת המרכזית של ורוצלב היא שער התחבורה הראשי לעיר וגם נקודת ציון אדריכלית מרשימה. היא שימושית להגעה, להמשך נסיעה ולחיבור לחשמליות ולאוטובוסים; גם בלי נסיעה ברכבת, שווה להביט בחזית ובאולמות ההיסטוריים.",
        en: "Wrocław’s main railway station is the city’s principal rail gateway and a striking architectural landmark. It is useful for arrivals, onward journeys and connections to trams and buses; even without a train to catch, the façade and historic halls merit a look.",
        pl: "Wrocław Główny to najważniejsza brama kolejowa miasta i zarazem wyrazisty zabytek architektury. Przydaje się przy przyjeździe, dalszej podróży i przesiadkach na tramwaje lub autobusy; nawet bez pociągu warto zobaczyć fasadę i historyczne hale.",
        de: "Der Hauptbahnhof Wrocław ist das wichtigste Bahntor der Stadt und zugleich ein markantes Architekturdenkmal. Er ist praktisch für Ankunft, Weiterreise und den Umstieg auf Straßenbahn oder Bus; auch ohne Zugfahrt lohnen Fassade und historische Hallen einen Blick.",
        cs: "Hlavní nádraží Wrocław je hlavní železniční branou města a zároveň výraznou architektonickou památkou. Hodí se pro příjezd, další cestu i přestup na tramvaj či autobus; i bez jízdy vlakem stojí za pohled jeho fasáda a historické haly.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.09858, lng: 17.03675 },
        address: {
          street: "Marszałka Józefa Piłsudskiego 105",
          postalCode: "50-085",
          city: "Wrocław",
          country: "Poland",
        },
      },
      categories: ["station", "historical-landmark"],
      taxonomy: {
        tags: ["transport", "architecture", "history", "city", "wroclaw", "travel-hub"],
      },
      suitability: {
        recommendedFor: ["families", "couples", "solo", "adults", "rail-travellers"],
        walkingIntensity: "low",
        familyFriendly: true,
        couples: true,
        romantic: false,
        indoorOutdoor: "both",
        rainFriendly: true,
        accessibility: {
          level: "good",
          notes: {
            he: "בתחנה קיימים שירותי נגישות; מומלץ לבדוק מראש את זמינות המעליות ואת סידורי הסיוע לנסיעה הספציפית.",
            en: "Accessibility services are available at the station; check lift availability and assistance arrangements for your specific journey in advance.",
            pl: "Na stacji dostępne są udogodnienia i usługi asysty; przed podróżą warto sprawdzić działanie wind i zasady pomocy dla konkretnego połączenia.",
            de: "Am Bahnhof stehen barrierefreie Einrichtungen und Hilfsangebote zur Verfügung; prüfen Sie vor der Reise die Verfügbarkeit der Aufzüge und die Assistenz für Ihre Verbindung.",
            cs: "Na nádraží jsou k dispozici bezbariérové služby; před cestou si ověřte provoz výtahů a možnosti asistence pro konkrétní spoj.",
          },
        },
      },
      visit: {
        durationMinutes: 20,
        bestTimeOfDay: ["morning", "afternoon", "evening"],
        seasonalSuitability: ["spring", "summer", "autumn", "winter"],
      },
      links: {
        website: "https://www.pkp.pl/pl/?id=156&option=com_content&view=article",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=51.09858%2C17.03675",
          appleMaps: "https://maps.apple.com/?ll=51.09858,17.03675&q=Wroc%C5%82aw%20G%C5%82%C3%B3wny",
        },
      },
      experiences: [
        {
          id: "arrival-and-onward-travel",
          tags: ["transport", "travel-hub", "city"],
          accessibility: { level: "good", notes: null },
        },
        {
          id: "station-architecture",
          tags: ["architecture", "history", "historical"],
          accessibility: { level: "good", notes: null },
        },
        {
          id: "bwa-wroclaw-glowny-gallery",
          tags: ["art", "contemporary-art", "gallery"],
          accessibility: { level: "good", notes: null },
        },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        factualSources: [
          { type: "official", url: "https://www.pkp.pl/pl/?id=156&option=com_content&view=article", checkedAt: "2026-08-15" },
          { type: "history", url: "https://www.wroclaw.pl/dla-mieszkanca/dworzec-wroclaw-glowny-perla-architektury-przemyslowej", checkedAt: "2026-08-15" },
          { type: "accessibility", url: "https://pkp.pl/pl/bez-barier?option=com_withoutbarriers&station=Wroc%C5%82aw+G%C5%82%C3%B3wny", checkedAt: "2026-08-15" },
          { type: "coordinates", url: "https://www.pkp.pl/pl/?id=156&option=com_content&view=article", checkedAt: "2026-08-15", note: "Existing approved product coordinate preserved; official station page lists 51.098333, 17.037222." },
        ],
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/share/r/1Kx6Fvn9c2/" },
        { platform: "instagram", url: "https://www.instagram.com/wroclaw.lowersilesia/p/DcEIRe9DA_7/" },
      ],
      media: {
        photos: [
          "/assets/wroclaw-glowny-exterior-b870acd8.jpg",
          "/assets/wroclaw-glowny-interior-922f25cf.jpg",
        ],
        videos: [
          "/assets/wroclaw-glowny-video-01.mp4",
          "/assets/wroclaw-glowny-video-02.mp4",
        ],
        metadata: {
          "/assets/wroclaw-glowny-exterior-b870acd8.jpg": { tags: ["station", "exterior", "architecture", "hero"], original: true, heroCandidate: true },
          "/assets/wroclaw-glowny-interior-922f25cf.jpg": { tags: ["station", "interior", "hall"], original: true },
          "/assets/wroclaw-glowny-video-01.mp4": { tags: ["station", "exterior", "video"], original: true },
          "/assets/wroclaw-glowny-video-02.mp4": { tags: ["station", "exterior", "video"], original: true },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "morskie-oko-wroclaw",
      aliases: ["kapielisko-morskie-oko-wroclaw"],
      localName: "Kąpielisko Morskie Oko",
      name: {
        he: "מורסקיה אוקו – ורוצלב",
        en: "Morskie Oko — Wrocław",
        pl: "Kąpielisko Morskie Oko",
        de: "Morskie Oko – Breslau",
        cs: "Morskie Oko – Vratislav",
      },
      description: {
        he: "אגם רחצה עירוני עם חוף חולי, מדשאות ומרחב ירוק בוורוצלב. מקום מקומי ונינוח לשחייה, מנוחה ובילוי משפחתי בקיץ; בעונת הרחצה כדאי לבדוק מראש שעות פתיחה ותנאי כניסה.",
        en: "An urban bathing lake with a sandy beach, lawns and greenery in Wrocław. A relaxed local place for swimming, resting and family time in summer; check current opening hours and entry conditions during the bathing season.",
        pl: "Miejskie kąpielisko z piaszczystą plażą, trawnikami i zielenią we Wrocławiu. Spokojne, lokalne miejsce na pływanie, odpoczynek i rodzinne lato; w sezonie warto sprawdzić aktualne godziny otwarcia i zasady wstępu.",
        de: "Ein städtischer Badesee mit Sandstrand, Liegewiesen und viel Grün in Breslau. Ein entspannter lokaler Ort zum Schwimmen, Erholen und für Familien im Sommer; während der Badesaison aktuelle Öffnungszeiten und Eintrittsbedingungen prüfen.",
        cs: "Městské koupaliště s písečnou pláží, trávníky a zelení ve Vratislavi. Klidné místní místo na koupání, odpočinek a rodinné léto; v sezoně je vhodné ověřit aktuální otevírací dobu a podmínky vstupu.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.1232536, lng: 17.0828961 },
        address: {
          street: "Fryderyka Chopina 27",
          postalCode: "51-609",
          city: "Wrocław",
          country: "Poland",
        },
      },
      categories: ["lake", "swimming", "urban-nature", "family-activity"],
      taxonomy: {
        tags: [
          "lake", "swimming", "summer", "family", "relaxation", "outdoor",
          "nature-scenery", "local-experience", "wroclaw", "lower-silesia",
        ],
      },
      suitability: {
        recommendedFor: ["families", "couples", "solo", "adults", "children", "summer-visitors"],
        walkingIntensity: "low",
        familyFriendly: true,
        couples: true,
        romantic: false,
        indoorOutdoor: "outdoor",
        rainFriendly: false,
        accessibility: { level: "partial", notes: null },
      },
      visit: {
        durationMinutes: 120,
        bestTimeOfDay: ["morning", "afternoon"],
        seasonalSuitability: ["summer"],
      },
      links: {
        website: "https://geoportal.wroclaw.pl/poi/poi/1835",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=51.1232536%2C17.0828961",
          appleMaps: "https://maps.apple.com/?ll=51.1232536,17.0828961&q=K%C4%85pielisko%20Morskie%20Oko",
        },
      },
      experiences: [
        {
          id: "summer-bathing-and-relaxation",
          tags: ["swimming", "summer", "family", "relaxation", "outdoor"],
          accessibility: { level: "partial", notes: null },
        },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        originalVideo: true,
        factualSources: [
          { type: "official", url: "https://geoportal.wroclaw.pl/poi/poi/1835", checkedAt: "2026-08-11" },
          { type: "coordinates", url: "https://www.openstreetmap.org/way/310593115", checkedAt: "2026-08-11" },
        ],
      },
      socialPosts: [],
      media: {
        photos: [
          "/assets/morskie-oko-01.jpg", "/assets/morskie-oko-02.jpg", "/assets/morskie-oko-03.jpg", "/assets/morskie-oko-04.jpg", "/assets/morskie-oko-05.jpg",
          "/assets/morskie-oko-06.jpg", "/assets/morskie-oko-07.jpg", "/assets/morskie-oko-08.jpg", "/assets/morskie-oko-09.jpg", "/assets/morskie-oko-10.jpg",
          "/assets/morskie-oko-11.jpg", "/assets/morskie-oko-12.jpg", "/assets/morskie-oko-13.jpg", "/assets/morskie-oko-14.jpg", "/assets/morskie-oko-15.jpg",
          "/assets/morskie-oko-16.jpg", "/assets/morskie-oko-17.jpg", "/assets/morskie-oko-18.jpg", "/assets/morskie-oko-19.jpg", "/assets/morskie-oko-20.jpg",
          "/assets/morskie-oko-21.jpg", "/assets/morskie-oko-22.jpg", "/assets/morskie-oko-23.jpg", "/assets/morskie-oko-24.jpg", "/assets/morskie-oko-25.jpg",
          "/assets/morskie-oko-26.jpg", "/assets/morskie-oko-27.jpg", "/assets/morskie-oko-28.jpg", "/assets/morskie-oko-29.jpg", "/assets/morskie-oko-30.jpg",
          "/assets/morskie-oko-31.jpg", "/assets/morskie-oko-32.jpg", "/assets/morskie-oko-33.jpg", "/assets/morskie-oko-34.jpg", "/assets/morskie-oko-35.jpg",
        ],
        videos: [
          "/assets/morskie-oko-video-01.mp4", "/assets/morskie-oko-video-02.mov",
          "/assets/morskie-oko-video-03.mov", "/assets/morskie-oko-video-04.mov",
        ],
        metadata: {
          "/assets/morskie-oko-01.jpg": { tags: ["lake", "swimming", "summer", "hero"], original: true, heroCandidate: true },
          "/assets/morskie-oko-video-01.mp4": { tags: ["lake", "swimming", "summer"], original: true },
          "/assets/morskie-oko-video-02.mov": { tags: ["lake", "swimming", "summer"], original: true },
          "/assets/morskie-oko-video-03.mov": { tags: ["lake", "swimming", "summer"], original: true },
          "/assets/morskie-oko-video-04.mov": { tags: ["lake", "swimming", "summer"], original: true },
        },
      },
      status: "published",
      editorialPriority: "medium",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "stadion-olimpijski-wroclaw",
      aliases: ["olympic-stadium-wroclaw"],
      localName: "Stadion Olimpijski we Wrocławiu",
      name: {
        he: "האצטדיון האולימפי של ורוצלב",
        en: "Wrocław Olympic Stadium",
        pl: "Stadion Olimpijski we Wrocławiu",
        de: "Olympiastadion Breslau",
        cs: "Olympijský stadion ve Vratislavi",
      },
      description: {
        he: "מתחם ספורט היסטורי בוורוצלב, שנבנה בשנים 1926–1928 לפי תכנונו של ריכרד קונווירץ. למרות שמו לא נערכו בו משחקים אולימפיים; כיום הוא מזוהה במיוחד עם ספידוויי ופעילות ספורטיבית, ומעניין גם בזכות אדריכלות הלבנים וההיסטוריה המקומית.",
        en: "A historic sports complex in Wrocław, built in 1926–1928 to a design by Richard Konwiarz. Despite its name, it never hosted the Olympic Games; today it is closely associated with speedway and sport, and is also worth seeing for its brick architecture and local history.",
        pl: "Historyczny kompleks sportowy we Wrocławiu, zbudowany w latach 1926–1928 według projektu Richarda Konwiarza. Mimo nazwy nie odbyły się tu igrzyska olimpijskie; dziś obiekt kojarzy się przede wszystkim ze sportem żużlowym, a uwagę zwracają także ceglana architektura i lokalna historia.",
        de: "Ein historischer Sportkomplex in Breslau, erbaut 1926–1928 nach einem Entwurf von Richard Konwiarz. Trotz seines Namens fanden hier keine Olympischen Spiele statt; heute ist die Anlage vor allem mit Speedway und Sport verbunden und zudem wegen ihrer Backsteinarchitektur und lokalen Geschichte sehenswert.",
        cs: "Historický sportovní areál ve Vratislavi, postavený v letech 1926–1928 podle návrhu Richarda Konwiarze. Navzdory názvu se zde olympijské hry nekonaly; dnes je spojen především se speedwayem a sportem a zaujme také cihlovou architekturou a místní historií.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.1195926, lng: 17.0966604 },
        address: {
          street: "Ignacego Jana Paderewskiego 35",
          postalCode: "51-612",
          city: "Wrocław",
          country: "Poland",
        },
      },
      categories: ["stadium", "sports-complex", "historical-landmark", "architecture"],
      taxonomy: {
        tags: [
          "stadium", "sports", "architecture", "brick-architecture", "history",
          "local-history", "speedway", "american-football", "local-experience",
          "wroclaw", "lower-silesia",
        ],
      },
      suitability: {
        recommendedFor: ["architecture-lovers", "history-lovers", "sports-fans", "local-history", "photographers"],
        walkingIntensity: "low",
        familyFriendly: true,
        couples: true,
        romantic: false,
        indoorOutdoor: "outdoor",
        rainFriendly: false,
        accessibility: { level: "partial", notes: null },
      },
      visit: {
        durationMinutes: 45,
        bestTimeOfDay: ["morning", "afternoon"],
        seasonalSuitability: ["spring", "summer", "autumn", "winter"],
      },
      links: {
        website: "https://www.wroclaw.pl/sport/stadion-olimpijski",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=51.1195926%2C17.0966604",
          appleMaps: "https://maps.apple.com/?ll=51.1195926,17.0966604&q=Stadion%20Olimpijski%20we%20Wroc%C5%82awiu",
        },
      },
      experiences: [
        {
          id: "historic-sports-complex",
          tags: ["sports", "architecture", "history", "local-experience"],
          accessibility: { level: "partial", notes: null },
        },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        originalVideo: false,
        factualSources: [
          { type: "official", url: "https://www.wroclaw.pl/sport/stadion-olimpijski", checkedAt: "2026-08-11" },
          { type: "coordinates", url: "https://www.openstreetmap.org/way/224222485", checkedAt: "2026-08-11" },
        ],
      },
      socialPosts: [],
      media: {
        photos: [
          "/assets/stadion-olimpijski-01.jpg", "/assets/stadion-olimpijski-02.jpg", "/assets/stadion-olimpijski-03.jpg", "/assets/stadion-olimpijski-04.jpg",
          "/assets/stadion-olimpijski-05.jpg", "/assets/stadion-olimpijski-06.jpg", "/assets/stadion-olimpijski-07.jpg", "/assets/stadion-olimpijski-08.jpg",
          "/assets/stadion-olimpijski-09.jpg", "/assets/stadion-olimpijski-10.jpg", "/assets/stadion-olimpijski-11.jpg", "/assets/stadion-olimpijski-12.jpg",
          "/assets/stadion-olimpijski-13.jpg", "/assets/stadion-olimpijski-14.jpg",
        ],
        videos: [],
        metadata: {
          "/assets/stadion-olimpijski-01.jpg": { tags: ["stadium", "architecture", "history", "hero"], original: true, heroCandidate: true },
        },
      },
      status: "published",
      editorialPriority: "medium",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
  "id": "church-of-peace-swidnica",
  "aliases": [
    "kosciol-pokoju-swidnica",
    "peace-church-swidnica"
  ],
  "localName": "Kościół Pokoju w Świdnicy",
  "name": {
    "he": "כנסיית השלום בשווידניצה",
    "en": "Church of Peace in Świdnica",
    "pl": "Kościół Pokoju w Świdnicy",
    "de": "Friedenskirche in Świdnica",
    "cs": "Kostel míru ve Svídnici"
  },
  "description": {
    "he": "אחד המקומות המיוחדים בשלזיה התחתית: כנסיית עץ מרשימה שמבחוץ נראית כמעט צנועה, ובפנים נפתחת לחלל עשיר, מפורט ומפתיע. הכנסייה היא חלק מאתר המורשת העולמית של אונסק״ו ומצדיקה נסיעה לשווידניצה בזכות האדריכלות, ההיסטוריה והאווירה השקטה שלה.",
    "en": "One of Lower Silesia’s most distinctive places: an impressive timber church that seems almost modest outside, then opens into a richly detailed and surprising interior. Part of a UNESCO World Heritage site, it is worth the journey to Świdnica for its architecture, history and calm atmosphere.",
    "pl": "Jedno z najbardziej wyjątkowych miejsc na Dolnym Śląsku: imponujący drewniany kościół, który z zewnątrz wydaje się niemal skromny, a wewnątrz zachwyca bogactwem detali. Obiekt wpisany na Listę Światowego Dziedzictwa UNESCO jest wart podróży do Świdnicy ze względu na architekturę, historię i spokojną atmosferę.",
    "de": "Einer der außergewöhnlichsten Orte Niederschlesiens: eine beeindruckende Holzkirche, die außen beinahe schlicht wirkt und innen einen reich ausgestatteten, überraschenden Raum eröffnet. Als Teil des UNESCO-Welterbes lohnt sie die Fahrt nach Świdnica wegen ihrer Architektur, Geschichte und ruhigen Atmosphäre.",
    "cs": "Jedno z nejvýjimečnějších míst Dolního Slezska: působivý dřevěný kostel, který zvenku působí téměř skromně, ale uvnitř překvapí bohatstvím detailů. Jako součást světového dědictví UNESCO stojí za cestu do Svídnice díky architektuře, historii a klidné atmosféře."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "swidnica",
    "coordinates": {
      "lat": 50.8465028,
      "lng": 16.4918111
    },
    "address": {
      "street": "plac Pokoju 6",
      "postalCode": "58-100",
      "city": "Świdnica",
      "country": "Poland"
    }
  },
  "categories": [
    "religious-heritage",
    "historical-landmark",
    "wooden-architecture",
    "unesco-world-heritage"
  ],
  "taxonomy": {
    "tags": [
      "culture",
      "history",
      "architecture",
      "religious-heritage",
      "wooden-architecture",
      "unesco",
      "photography",
      "contemplative",
      "lower-silesia",
      "outside-wroclaw"
    ]
  },
  "suitability": {
    "recommendedFor": [
      "culture-lovers",
      "history-lovers",
      "architecture-lovers",
      "couples",
      "adults",
      "photographers"
    ],
    "walkingIntensity": "low",
    "familyFriendly": true,
    "couples": true,
    "romantic": false,
    "indoorOutdoor": "both",
    "rainFriendly": "partial",
    "accessibility": {
      "level": "partial",
      "notes": {
        "he": "הגישה למתחם אפשרית, אך משטחים היסטוריים ותנאי הכניסה עשויים להשתנות; מומלץ לברר ישירות לפני הביקור.",
        "en": "The site can be accessed, but historic surfaces and entry conditions may vary; confirm directly before visiting.",
        "pl": "Dostęp do obiektu jest możliwy, ale historyczne nawierzchnie i warunki wejścia mogą się różnić; warto potwierdzić je przed wizytą.",
        "de": "Das Gelände ist zugänglich, historische Oberflächen und Zugangsbedingungen können jedoch variieren; bitte vor dem Besuch direkt nachfragen.",
        "cs": "Areál je přístupný, historické povrchy a podmínky vstupu se však mohou lišit; před návštěvou je ověřte přímo."
      }
    }
  },
  "visit": {
    "durationMinutes": 60,
    "bestTimeOfDay": [
      "morning",
      "afternoon"
    ],
    "seasonalSuitability": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ]
  },
  "links": {
    "website": "https://kosciolpokoju.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=50.8465028%2C16.4918111",
      "appleMaps": "https://maps.apple.com/?ll=50.8465028,16.4918111&q=Ko%C5%9Bci%C3%B3%C5%82%20Pokoju%20w%20%C5%9Awidnicy"
    }
  },
  "experiences": [
    {
      "id": "timber-church-and-interior",
      "tags": [
        "cultural",
        "historical",
        "architectural",
        "contemplative",
        "unique"
      ],
      "accessibility": {
        "level": "partial",
        "notes": "See place accessibility notes."
      }
    }
  ],
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalContent": true,
    "originalPhotography": true,
    "originalVideo": false,
    "factualSources": [
      {
        "type": "official",
        "url": "https://kosciolpokoju.pl/",
        "checkedAt": "2026-08-12"
      },
      {
        "type": "address",
        "url": "https://kosciolpokoju.pl/kontakt/",
        "checkedAt": "2026-08-12"
      },
      {
        "type": "unesco",
        "url": "https://whc.unesco.org/en/list/1054/",
        "checkedAt": "2026-08-12"
      },
      {
        "type": "coordinates",
        "url": "https://whc.unesco.org/en/list/1054/maps/",
        "checkedAt": "2026-08-12",
        "note": "50°50′47.41″N, 16°29′30.52″E"
      }
    ]
  },
  "socialPosts": [
    {
      "platform": "facebook",
      "url": "https://www.facebook.com/groups/2525899074519424/posts/2533682413741090/"
    },
    {
      "platform": "facebook",
      "url": "https://www.facebook.com/share/p/1HatdkPSmz/"
    },
    {
      "platform": "instagram",
      "url": "https://www.instagram.com/p/Dbf-bApnAo5/?img_index=1"
    }
  ],
  "media": {
    "photos": [
      "/assets/church-of-peace-swidnica-01.jpg",
      "/assets/church-of-peace-swidnica-02.jpg",
      "/assets/church-of-peace-swidnica-03.jpg",
      "/assets/church-of-peace-swidnica-04.jpg",
      "/assets/church-of-peace-swidnica-05.jpg",
      "/assets/church-of-peace-swidnica-06.jpg",
      "/assets/church-of-peace-swidnica-07.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/church-of-peace-swidnica-01.jpg": {
        "tags": [
          "church-exterior",
          "wooden-architecture",
          "heritage",
          "hero"
        ],
        "original": true,
        "heroCandidate": true
      },
      "/assets/church-of-peace-swidnica-02.jpg": {
        "tags": [
          "church-interior",
          "religious-art",
          "heritage"
        ],
        "original": true
      },
      "/assets/church-of-peace-swidnica-03.jpg": {
        "tags": [
          "church-interior",
          "wooden-architecture",
          "religious-art"
        ],
        "original": true
      },
      "/assets/church-of-peace-swidnica-04.jpg": {
        "tags": [
          "church-exterior",
          "wooden-architecture",
          "swidnica"
        ],
        "original": true
      },
      "/assets/church-of-peace-swidnica-05.jpg": {
        "tags": [
          "church-interior",
          "architecture",
          "heritage"
        ],
        "original": true
      },
      "/assets/church-of-peace-swidnica-06.jpg": {
        "tags": [
          "church-interior",
          "religious-art",
          "architecture"
        ],
        "original": true
      },
      "/assets/church-of-peace-swidnica-07.jpg": {
        "tags": [
          "church-exterior",
          "heritage",
          "lower-silesia"
        ],
        "original": true
      }
    }
  },
  "status": "published",
  "editorialPriority": "high",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
      id: "walbrzych-market-square",
      aliases: ["walbrzych-city-centre", "rynek-walbrzych"],
      localName: "Rynek w Wałbrzychu",
      name: { he: "כיכר השוק של Wałbrzych", en: "Wałbrzych Market Square", pl: "Rynek w Wałbrzychu", de: "Marktplatz von Wałbrzych", cs: "Tržní náměstí ve Valbřichu" },
      description: {
        he: "עצירה עירונית קצרה בכיכר ההיסטורית של Wałbrzych, המתאימה לקפה, הליכה והיכרות ראשונה עם העיר.",
        en: "A short urban stop in Wałbrzych’s historic market square for coffee, a walk and a first look at the city.",
        pl: "Krótki miejski przystanek na historycznym rynku Wałbrzycha — na kawę, spacer i pierwsze spotkanie z miastem.",
        de: "Ein kurzer Stadtstopp auf dem historischen Marktplatz von Wałbrzych – für Kaffee, einen Spaziergang und einen ersten Eindruck.",
        cs: "Krátká městská zastávka na historickém náměstí ve Valbřichu – na kávu, procházku a první seznámení s městem."
      },
      location: { countryCode: "PL", regionId: "lower-silesia", cityId: "walbrzych", coordinates: { lat: 50.7662241, lng: 16.2829578 }, address: { street: "Rynek", postalCode: "58-300", city: "Wałbrzych", country: "Poland" } },
      categories: ["city-center", "historic-square"], taxonomy: { tags: ["city", "history", "architecture", "coffee-break", "lower-silesia", "outside-wroclaw"] },
      suitability: { recommendedFor: ["adults", "couples", "families"], walkingIntensity: "low", familyFriendly: true, couples: true, romantic: false, indoorOutdoor: "outdoor", rainFriendly: "low", accessibility: { level: "partial", notes: { he: "מרחב עירוני פתוח; שיפועים וריצוף היסטורי עשויים להשפיע על הנגישות.", en: "An open urban space; slopes and historic paving may affect accessibility.", pl: "Otwarta przestrzeń miejska; nachylenia i historyczna nawierzchnia mogą wpływać na dostępność.", de: "Offener Stadtraum; Gefälle und historisches Pflaster können die Zugänglichkeit beeinflussen.", cs: "Otevřený městský prostor; sklon a historická dlažba mohou ovlivnit přístupnost." } } },
      visit: { durationMinutes: 50, bestTimeOfDay: ["afternoon"], seasonalSuitability: ["spring", "summer", "autumn", "winter"] },
      links: { navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=50.7662241%2C16.2829578", appleMaps: "https://maps.apple.com/?ll=50.7662241,16.2829578&q=Rynek%20w%20Wa%C5%82brzychu" } },
      experiences: [{ id: "historic-market-square", tags: ["city", "architecture", "coffee-break"], accessibility: { level: "partial", notes: "See place accessibility notes." } }],
      provenance: { contentType: "editorial-intake", personalVisit: false, originalContent: true, originalPhotography: false, originalVideo: false, factualSources: [{ type: "coordinates", url: "https://www.openstreetmap.org/way/36818415", checkedAt: "2026-08-12" }] },
      socialPosts: [], media: { photos: [], videos: [], metadata: {} }, status: "published", editorialPriority: "medium", languages: ["he", "en", "pl", "de", "cs"]
    },
    {
      id: "kaplica-czaszek-czermna",
      aliases: ["skull-chapel", "chapel-of-skulls", "kaplica-czaszek-w-czermnej", "kaplica-czaszek-kudowa-zdroj"],
      localName: "Kaplica Czaszek w Czermnej",
      name: {
        he: "קפלת הגולגולות בצ׳רמנה",
        en: "Skull Chapel in Czermna",
        pl: "Kaplica Czaszek w Czermnej",
        de: "Schädelkapelle in Czermna",
        cs: "Kostnice v Čermné",
      },
      description: {
        he: "קפלת עצמות יוצאת דופן מהמאה ה־18 בצ׳רמנה, שקירותיה ותקרתה מכוסים באלפי גולגולות ועצמות אדם. זהו אתר זיכרון קטן, עוצמתי ומטלטל למי שמתעניין בהיסטוריה, במורשת דתית ובמקומות חריגים.",
        en: "An unusual 18th-century ossuary chapel in Czermna, with walls and ceiling lined with thousands of human skulls and bones. Small, powerful and unsettling, it suits visitors interested in history, religious heritage and unusual places.",
        pl: "Niezwykła XVIII-wieczna kaplica-kostnica w Czermnej, której ściany i sufit pokrywają tysiące ludzkich czaszek i kości. To niewielkie, mocne i poruszające miejsce pamięci dla osób zainteresowanych historią, dziedzictwem religijnym i nietypowymi miejscami.",
        de: "Eine außergewöhnliche Beinhauskapelle aus dem 18. Jahrhundert in Czermna, deren Wände und Decke mit Tausenden menschlicher Schädel und Knochen bedeckt sind. Ein kleiner, eindringlicher und bewegender Erinnerungsort für alle, die sich für Geschichte, religiöses Erbe und ungewöhnliche Orte interessieren.",
        cs: "Neobvyklá kostnice z 18. století v Čermné, jejíž stěny a strop pokrývají tisíce lidských lebek a kostí. Je to malé, silné a znepokojivé pietní místo pro návštěvníky se zájmem o historii, náboženské dědictví a neobvyklá místa.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "kudowa-zdroj",
        coordinates: { lat: 50.45153, lng: 16.24193 },
        address: {
          street: "Stanisława Moniuszki 8a",
          postalCode: "57-350",
          city: "Kudowa-Zdrój",
          locality: "Czermna",
          country: "Poland",
        },
      },
      categories: ["religious-heritage", "historical-landmark", "architecture"],
      taxonomy: {
        tags: [
          "culture", "history", "architecture", "religious-heritage", "cultural",
          "historical", "photography", "unique", "lower-silesia", "outside-wroclaw",
        ],
      },
      suitability: {
        recommendedFor: ["adults", "culture-lovers", "history-lovers", "photographers"],
        walkingIntensity: "low",
        familyFriendly: null,
        couples: true,
        romantic: false,
        indoorOutdoor: "indoor",
        rainFriendly: true,
        accessibility: {
          level: null,
          notes: {
            he: "תנאי הנגישות לא אומתו; מומלץ לברר ישירות לפני הביקור.",
            en: "Accessibility conditions have not been verified; confirm directly before visiting.",
            pl: "Warunki dostępności nie zostały zweryfikowane; przed wizytą warto potwierdzić je bezpośrednio.",
            de: "Die Zugangsbedingungen wurden nicht verifiziert; bitte vor dem Besuch direkt nachfragen.",
            cs: "Podmínky přístupnosti nebyly ověřeny; před návštěvou je ověřte přímo.",
          },
        },
      },
      visit: {
        durationMinutes: 30,
        bestTimeOfDay: ["morning", "afternoon"],
        seasonalSuitability: ["spring", "summer", "autumn", "winter"],
      },
      links: {
        website: "https://kaplicaczaszek.pl/",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=50.45153%2C16.24193",
          appleMaps: "https://maps.apple.com/?ll=50.45153,16.24193&q=Kaplica%20Czaszek%20w%20Czermnej",
        },
      },
      experiences: [
        {
          id: "ossuary-chapel-interior",
          tags: ["cultural", "historical", "religious-heritage", "unique"],
          accessibility: { level: null, notes: "See place accessibility notes." },
        },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        originalVideo: false,
        factualSources: [
          { type: "official", url: "https://kudowa.pl/kaplica-czaszek.html", checkedAt: "2026-08-12" },
          { type: "address", url: "https://kaplicaczaszek.pl/dojazd/", checkedAt: "2026-08-12" },
          { type: "coordinates", url: "https://www.wikidata.org/wiki/Q2879740", checkedAt: "2026-08-12", note: "50°27′5.508″N, 16°14′30.948″E" },
        ],
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/share/p/1LmJyCrvFT/" },
        { platform: "instagram", url: "https://www.instagram.com/p/Dbf9RSWnOB8/?img_index=1" },
      ],
      media: {
        photos: [
          "/assets/kaplica-czaszek-01.jpg", "/assets/kaplica-czaszek-02.jpg",
          "/assets/kaplica-czaszek-03.jpg", "/assets/kaplica-czaszek-04.jpg",
        ],
        videos: [],
        metadata: {
          "/assets/kaplica-czaszek-01.jpg": { tags: ["chapel-exterior", "religious-heritage", "architecture", "hero"], original: true, heroCandidate: true },
          "/assets/kaplica-czaszek-02.jpg": { tags: ["chapel-exterior", "architecture", "visitor-context"], original: true },
          "/assets/kaplica-czaszek-03.jpg": { tags: ["chapel-exterior", "architecture", "visitor-context"], original: true },
          "/assets/kaplica-czaszek-04.jpg": { tags: ["chapel-surroundings", "architecture", "lower-silesia"], original: true },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "fountain",
      aliases: ["multimedia-fountain"],
      localName: "Wrocławska Fontanna Multimedialna",
      name: {
        he: "המזרקה המולטימדיאלית של ורוצלב",
        en: "Wrocław Multimedia Fountain",
        pl: "Wrocławska Fontanna Multimedialna",
        de: "Multimedia-Brunnen Wrocław",
        cs: "Vratislavská multimediální fontána",
      },
      description: {
        he: "מזרקה עונתית גדולה ליד אולם המאה, עם מופעי מים, מוזיקה ואור בשעות המתפרסמות מראש.",
        en: "A large seasonal fountain beside Centennial Hall, with scheduled water, music and light shows.",
        pl: "Duża sezonowa fontanna przy Hali Stulecia z zaplanowanymi pokazami wody, muzyki i światła.",
        de: "Ein großer saisonaler Brunnen an der Jahrhunderthalle mit angekündigten Wasser-, Musik- und Lichtshows.",
        cs: "Velká sezonní fontána u Haly století s plánovanými vodními, hudebními a světelnými představeními.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.10832, lng: 17.07948 },
        address: { street: "Wystawowa 1", postalCode: "51-618", city: "Wrocław", country: "Poland" },
      },
      categories: ["river"],
      taxonomy: { tags: ["water-show", "seasonal", "outdoor", "evening"] },
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalPhotography: true,
        originalVideo: true,
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/share/r/1ANYoSUn3J/" },
        { platform: "instagram", url: "https://www.instagram.com/p/DctbD99jLvg/?img_index=1" },
      ],
      media: {
        guideVideos: { he: "https://youtube.com/shorts/O4te9Tsw3FU", en: "https://youtube.com/shorts/wYu3-sO5WkE" },
        photos: [
          "/assets/multimedia-fountain-01.jpg",
          "/assets/multimedia-fountain-02.jpg",
          "/assets/multimedia-fountain-03.jpg",
          "/assets/multimedia-fountain-04.jpg",
          "/assets/multimedia-fountain-05.jpg",
          "/assets/multimedia-fountain-06.jpg",
          "/assets/multimedia-fountain-07.jpg",
        ],
        videos: [
          "/assets/multimedia-fountain-01.mp4",
          "/assets/multimedia-fountain-02.mp4",
          "/assets/multimedia-fountain-03.mp4",
          "/assets/video-stulecia-fountain.mp4",
          "https://youtube.com/shorts/KR_7B_LUe-w",
          "https://youtube.com/shorts/F8dmjvigNcc",
          "https://youtube.com/watch?v=j8HliEzlKG0",
          "https://youtube.com/shorts/U7TyifQyg7k",
        ],
        metadata: {
          "/assets/multimedia-fountain-01.jpg": { tags: ["multimedia-fountain", "water-show", "rainbow", "hero"], original: true, heroCandidate: true, sourceFile: "IMG_5099.JPG" },
          "/assets/multimedia-fountain-02.jpg": { tags: ["multimedia-fountain", "water-show", "rainbow", "visitor-experience"], original: true, sourceFile: "IMG_5087.JPG" },
          "/assets/multimedia-fountain-03.jpg": { tags: ["multimedia-fountain", "water-show", "rainbow", "visitor-experience"], original: true, sourceFile: "IMG_5095.JPG" },
          "/assets/multimedia-fountain-04.jpg": { tags: ["multimedia-fountain", "centennial-hall", "wide-view"], original: true, sourceFile: "WhatsApp Image 2026-07-22 at 14.44.51.jpeg" },
          "/assets/multimedia-fountain-05.jpg": { tags: ["multimedia-fountain", "centennial-hall", "water-show"], original: true, sourceFile: "WhatsApp Image 2026-07-22 at 14.44.51 (2).jpeg" },
          "/assets/multimedia-fountain-06.jpg": { tags: ["multimedia-fountain", "splash-zone", "families"], original: true, sourceFile: "IMG_5077.JPG" },
          "/assets/multimedia-fountain-07.jpg": { tags: ["multimedia-fountain", "visitor-area", "bicycles"], original: true, sourceFile: "IMG_5078.JPG" },
          "/assets/multimedia-fountain-01.mp4": { tags: ["multimedia-fountain", "water-show", "video"], original: true, sourceFile: "IMG_5096.MOV" },
          "/assets/multimedia-fountain-02.mp4": { tags: ["multimedia-fountain", "water-show", "video"], original: true, sourceFile: "IMG_5084.MOV" },
          "/assets/multimedia-fountain-03.mp4": { tags: ["multimedia-fountain", "water-show", "video"], original: true, sourceFile: "IMG_5088.MOV" },
          "/assets/video-stulecia-fountain.mp4": { tags: ["multimedia-fountain", "centennial-hall-area", "video"], original: true },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "pergola",
      aliases: ["pergola-wroclawska"],
      localName: "Pergola Wrocławska",
      name: {
        he: "הפרגולה של ורוצלב",
        en: "Wrocław Pergola",
        pl: "Pergola Wrocławska",
        de: "Pergola Wrocław",
        cs: "Vratislavská pergola",
      },
      description: {
        he: "טיילת אדריכלית מוצלת ועטופה בצמחייה ליד אולם המאה, המתאימה להליכה רגועה ולמנוחה בין האתרים שבאזור.",
        en: "A shaded, plant-covered architectural promenade beside Centennial Hall, ideal for a relaxed walk and a pause between nearby sights.",
        pl: "Zacieniona, porośnięta zielenią promenada architektoniczna przy Hali Stulecia, dobra na spokojny spacer i odpoczynek między pobliskimi atrakcjami.",
        de: "Eine schattige, begrünte Architekturpromenade an der Jahrhunderthalle – ideal für einen ruhigen Spaziergang und eine Pause zwischen den Sehenswürdigkeiten der Umgebung.",
        cs: "Stinná architektonická promenáda porostlá zelení u Haly století, vhodná ke klidné procházce a odpočinku mezi okolními památkami.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.10882, lng: 17.07762 },
        address: { street: "Wystawowa 1", postalCode: "51-618", city: "Wrocław", country: "Poland" },
      },
      categories: ["architecture", "nature"],
      taxonomy: { tags: ["architecture", "walking", "photography", "outdoor", "green-space"] },
      suitability: {
        recommendedFor: ["couples", "families", "architecture-lovers", "photographers"],
        walkingIntensity: "easy",
        familyFriendly: true,
        couples: true,
        solo: true,
        romantic: true,
        indoorOutdoor: "outdoor",
        rainFriendly: "partial",
        accessibility: {
          level: "good",
          notes: {
            he: "הטיילת ברובה מישורית, אך ייתכנו משטחים לא אחידים ועומס באירועים.",
            en: "The promenade is mostly level, though some surfaces may be uneven and events can make it busy.",
            pl: "Promenada jest w większości płaska, choć miejscami nawierzchnia może być nierówna, a podczas wydarzeń bywa tłoczno.",
            de: "Die Promenade ist überwiegend eben; einzelne Flächen können jedoch uneben sein, und bei Veranstaltungen kann es voll werden.",
            cs: "Promenáda je převážně rovná, místy však může být povrch nerovný a během akcí zde bývá rušno.",
          },
        },
      },
      visit: {
        durationMinutes: 30,
        bestTimeOfDay: ["morning", "afternoon", "evening"],
        seasonalSuitability: ["spring", "summer", "autumn"],
      },
      links: {
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=51.10882%2C17.07762",
          appleMaps: "https://maps.apple.com/?ll=51.10882,17.07762&q=Pergola%20Wroc%C5%82awska",
        },
      },
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/share/p/1CHRnrqLwQ/" },
        { platform: "instagram", url: "https://www.instagram.com/p/Dcn4ySrisOr/?img_index=1" },
      ],
      media: {
        photos: [
          "/assets/pergola-wroclawska-01.jpg",
          "/assets/pergola-wroclawska-02.jpg",
          "/assets/pergola-wroclawska-03.jpg",
        ],
        videos: [],
        metadata: {
          "/assets/pergola-wroclawska-01.jpg": { tags: ["pergola", "architecture", "greenery", "hero"], original: true, heroCandidate: true, sourceFile: "IMG_5068.JPG" },
          "/assets/pergola-wroclawska-02.jpg": { tags: ["pergola", "architecture", "greenery", "promenade"], original: true, sourceFile: "IMG_5073.JPG" },
          "/assets/pergola-wroclawska-03.jpg": { tags: ["pergola", "architecture", "greenery", "visitor-experience"], original: true, sourceFile: "IMG_5074.JPG" },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "wedrowcy-kolejowa-63",
      aliases: [],
      localName: "Wędrowcy",
      name: {
        he: "Wędrowcy – אמנות ציבורית ברחוב קולייובה 63",
        en: "Wędrowcy — public artwork at Kolejowa 63",
        pl: "Wędrowcy — instalacja przy Kolejowej 63",
        de: "Wędrowcy – Kunstwerk an der Kolejowa 63",
        cs: "Wędrowcy – umělecká instalace na Kolejowé 63",
      },
      description: {
        he: "מיצב ציבורי מונומנטלי של אנה שפאקובסקה־קויאבסקה על קיר וארובת בית הדוודים לשעבר במתחם Kraftpost. היצירה כבר קיימת; המטה העתידי של BWA ורוצלב במקום עדיין אינו פתוח.",
        en: "Anna Szpakowska-Kujawska’s monumental public installation on the wall and chimney of the former boiler house at the Kraftpost complex. The artwork is in place; the future BWA Wrocław venue here is not yet open.",
        pl: "Monumentalna instalacja Anny Szpakowskiej-Kujawskiej na ścianie i kominie dawnej kotłowni w kompleksie Kraftpost. Dzieło już istnieje; przyszła siedziba BWA Wrocław w tym miejscu nie jest jeszcze otwarta.",
        de: "Monumentale öffentliche Installation von Anna Szpakowska-Kujawska an Wand und Schornstein des ehemaligen Kesselhauses im Kraftpost-Komplex. Das Kunstwerk ist bereits zu sehen; der künftige Standort von BWA Wrocław ist noch nicht eröffnet.",
        cs: "Monumentální veřejná instalace Anny Szpakowské-Kujawské na stěně a komíně bývalé kotelny v areálu Kraftpost. Dílo již existuje; budoucí sídlo BWA Wrocław zde zatím není otevřeno.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.104343, lng: 17.015783 },
        address: {
          street: "Kolejowa 63",
          postalCode: "53-510",
          city: "Wrocław",
          country: "Poland",
        },
      },
      categories: ["art"],
      taxonomy: { tags: ["art-contemporary", "street-art", "public-art", "outdoor-art"] },
      links: {
        website: "https://bwa.wroc.pl/wydarzenie/kraftpostfest-wedrowcy/",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=51.104343%2C17.015783",
          appleMaps: "https://maps.apple.com/?ll=51.104343,17.015783&q=W%C4%99drowcy",
        },
      },
      provenance: {
        contentType: "editorial-intake",
        personalVisit: false,
        originalContent: true,
        originalPhotography: false,
        originalVideo: false,
        factualSources: [
          { type: "official", url: "https://bwa.wroc.pl/wydarzenie/kraftpostfest-wedrowcy/", checkedAt: "2026-09-07" },
          { type: "city", url: "https://www.wroclaw.pl/kultura/dzis-kraftpostfest-wedrowcy-anna-szpakowska-kujawska", checkedAt: "2026-09-07" },
          { type: "coordinates", url: "https://pl.near-place.com/poczta-polska-sa-pol-wt-we-wroclawiu-mechanika-pojazdowa-stacja-kontroli-pojazdow-kolejowa-63-wroclaw", checkedAt: "2026-09-07", note: "Address-level coordinates for Kolejowa 63." },
        ],
      },
      status: "published",
      editorialPriority: "normal",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "wroclavia",
      aliases: ["Wroclavia"],
      localName: "Westfield Wroclavia",
      name: {
        he: "Westfield Wroclavia",
        en: "Westfield Wroclavia",
        pl: "Westfield Wroclavia",
        de: "Westfield Wroclavia",
        cs: "Westfield Wroclavia",
      },
      description: {
        he: "מרכז גדול ומודרני ליד התחנה המרכזית, עם מותגים בינלאומיים ומתחם אוכל רחב.",
        en: "A large modern centre by the main station, with international brands and a broad food court.",
        pl: "Duże nowoczesne centrum przy dworcu, z międzynarodowymi markami i rozbudowaną strefą gastronomiczną.",
        de: "Ein großes modernes Zentrum am Hauptbahnhof mit internationalen Marken und Food Court.",
        cs: "Velké moderní centrum u hlavního nádraží s mezinárodními značkami a food courtem.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.0964311, lng: 17.0348417 },
      },
      categories: ["buy", "eat", "shopping"],
      provenance: {
        contentType: "official-name-update",
        factualSources: [
          { type: "official", url: "https://www.urw.com/news/allnews/wroclavia-centre-rebrand-westfield-wroclavia", checkedAt: "2026-09-22", note: "Official rebrand effective 2026-09-17; existing identity, aliases and product references retained." },
        ],
      },
      status: "published",
      editorialPriority: "normal",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    {
      id: "zoo-wroclaw",
      aliases: ["wroclaw-zoo", "zoo-wrocław"],
      localName: "ZOO Wrocław",
      name: {
        he: "גן החיות של ורוצלב",
        en: "ZOO Wrocław",
        pl: "ZOO Wrocław",
        de: "Zoo Wrocław",
        cs: "Zoo Wrocław",
      },
      description: {
        he: "גן החיות הוותיק ביותר בפולין הוא ביקור של כמה שעות, לא עצירה קצרה. לצד בעלי החיים והמרחבים הירוקים, Afrykarium מציג מערכות אקולוגיות מימיות של אפריקה ונכלל בכרטיס הכניסה הרגיל.",
        en: "Poland’s oldest zoo is a several-hour visit, not a quick stop. Alongside its animals and green grounds, the Afrykarium presents African aquatic ecosystems and is included with standard zoo admission.",
        pl: "Najstarszy ogród zoologiczny w Polsce to miejsce na kilka godzin, a nie krótki przystanek. Oprócz zwierząt i zielonych terenów warto zobaczyć Afrykarium poświęcone afrykańskim ekosystemom wodnym, dostępne w ramach zwykłego biletu do zoo.",
        de: "Der älteste Zoo Polens ist ein Besuch für mehrere Stunden, kein kurzer Zwischenstopp. Neben Tieren und grünen Anlagen zeigt das im normalen Eintritt enthaltene Afrykarium afrikanische Wasserökosysteme.",
        cs: "Nejstarší zoologická zahrada v Polsku je návštěva na několik hodin, ne krátká zastávka. Kromě zvířat a zeleného areálu nabízí Afrykarium africké vodní ekosystémy a je zahrnuto v běžné vstupence do zoo.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.10565, lng: 17.0762194 },
        address: {
          street: "Zygmunta Wróblewskiego 1-5",
          postalCode: "51-618",
          city: "Wrocław",
          country: "Poland",
        },
      },
      categories: ["zoo", "family-attraction", "nature"],
      taxonomy: {
        tags: ["animals", "afrykarium", "aquarium", "family", "photography", "nature", "wroclaw", "east-wroclaw"],
      },
      suitability: {
        recommendedFor: ["families", "couples", "solo", "adults", "children", "animal-lovers", "photographers"],
        walkingIntensity: "moderate",
        familyFriendly: true,
        couples: true,
        solo: true,
        romantic: false,
        indoorOutdoor: "both",
        rainFriendly: "partial",
        accessibility: {
          level: "partial",
          notes: {
            he: "Afrykarium ומספר ביתנים מרכזיים מותאמים לכיסאות גלגלים; בביתנים היסטוריים מסוימים הנגישות חלקית.",
            en: "The Afrykarium and several major pavilions are wheelchair accessible; access remains partial in some historic buildings.",
            pl: "Afrykarium i kilka głównych pawilonów są dostępne dla osób na wózkach; w niektórych zabytkowych budynkach dostępność pozostaje częściowa.",
            de: "Das Afrykarium und mehrere große Pavillons sind rollstuhlgerecht; in einigen historischen Gebäuden ist der Zugang nur teilweise möglich.",
            cs: "Afrykarium a několik hlavních pavilonů jsou přístupné pro vozíčkáře; v některých historických budovách je přístupnost pouze částečná.",
          },
        },
      },
      visit: {
        durationMinutes: 240,
        bestTimeOfDay: ["morning", "afternoon"],
        seasonalSuitability: ["spring", "summer", "autumn", "winter"],
      },
      links: {
        website: "https://zoo.wroclaw.pl/en/",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=51.10565%2C17.0762194",
          appleMaps: "https://maps.apple.com/?ll=51.10565,17.0762194&q=ZOO%20Wroc%C5%82aw",
        },
      },
      experiences: [
        { id: "afrykarium", tags: ["aquarium", "aquatic", "immersive", "family"] },
        { id: "zoo-grounds", tags: ["animals", "nature", "walking", "photography"] },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        originalVideo: true,
        factualSources: [
          { type: "official", url: "https://zoo.wroclaw.pl/en/", checkedAt: "2026-08-21" },
          { type: "history", url: "https://zoo.wroclaw.pl/wystawa-160-lat-zoo-wroclaw-pod-dworcem-wroclaw-glowny/", checkedAt: "2026-08-21" },
          { type: "address-coordinates", url: "https://zoo.wroclaw.pl/en/arrival/", checkedAt: "2026-08-21", note: "Official GPS: 51°06′20.34″N 17°04′34.39″E" },
          { type: "accessibility", url: "https://zoo.wroclaw.pl/zwiedzanie/osoby-z-niepelnosprawnosciami/", checkedAt: "2026-08-21" },
        ],
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/61591964083308/posts/122114783229398802/" },
        { platform: "facebook", url: "https://www.facebook.com/groups/2525899074519424/posts/2563503317425666/" },
        { platform: "instagram", url: "https://www.instagram.com/wroclaw.lowersilesia/p/DcTZronDED-/" },
      ],
      media: {
        photos: [
          "/assets/zoo-wroclaw-01.jpg", "/assets/zoo-wroclaw-02.jpg",
          "/assets/zoo-wroclaw-03.jpg", "/assets/zoo-wroclaw-04.jpg",
          "/assets/zoo-wroclaw-05.jpg", "/assets/zoo-wroclaw-06.jpg",
          "/assets/zoo-wroclaw-07.jpg", "/assets/zoo-wroclaw-08.jpg",
        ],
        videos: [
          "/assets/zoo-wroclaw-afrykarium.mp4",
          "/assets/zoo-wroclaw-aquatic-animal.mp4",
        ],
        metadata: {
          "/assets/zoo-wroclaw-01.jpg": { tags: ["elephant", "large-animal", "hero"], original: true, heroCandidate: true, sourceFile: "IMG_5048.JPG" },
          "/assets/zoo-wroclaw-02.jpg": { tags: ["large-animal", "outdoor-exhibit"], original: true, sourceFile: "IMG_4975.JPG" },
          "/assets/zoo-wroclaw-03.jpg": { tags: ["zoo-environment", "animal-exhibit"], original: true, sourceFile: "IMG_4995.JPG" },
          "/assets/zoo-wroclaw-04.jpg": { tags: ["afrykarium", "underwater-tunnel", "visitor-experience"], original: true, sourceFile: "IMG_5018.JPG" },
          "/assets/zoo-wroclaw-05.jpg": { tags: ["okapi", "animal"], original: true, sourceFile: "IMG_5033.JPG" },
          "/assets/zoo-wroclaw-06.jpg": { tags: ["afrykarium", "aquarium", "fish"], original: true, sourceFile: "IMG_5042.JPG" },
          "/assets/zoo-wroclaw-07.jpg": { tags: ["chimpanzee", "primate"], original: true, sourceFile: "IMG_5044.JPG" },
          "/assets/zoo-wroclaw-08.jpg": { tags: ["zoo-environment", "walking-route"], original: true, sourceFile: "IMG_5049.JPG" },
          "/assets/zoo-wroclaw-afrykarium.mp4": { tags: ["afrykarium", "underwater", "aquatic"], original: true, sourceFile: "IMG_4998.MOV" },
          "/assets/zoo-wroclaw-aquatic-animal.mp4": { tags: ["aquatic-animal", "movement", "underwater"], original: true, sourceFile: "IMG_5020.MOV" },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
    },
    // Brzeg and Moszna are in Opole Voivodeship. Media provenance for every
    // assets below are recorded in the Brzeg/Moszna media and guide-video provenance manifests.
    {
  "id": "brzeg-castle",
  "localName": "Zamek Piastów Śląskich w Brzegu",
  "aliases": [
    "zamek-piastow-slaskich-brzeg"
  ],
  "name": {
    "he": "טירת פיאסט בברז׳ג",
    "en": "Brzeg Castle",
    "pl": "Zamek Piastów Śląskich w Brzegu",
    "de": "Piastenschloss Brieg",
    "cs": "Zámek slezských Piastovců v Brzegu"
  },
  "description": {
    "he": "טירת פיאסט בברז׳ג משמשת כיום את מוזיאון פיאסט השלזיים. כדאי להתחיל בחזית השער המעוטרת ולהמשיך לחצר הקשתות.",
    "en": "Brzeg Castle houses the Museum of the Silesian Piasts. Start at the decorated entrance and continue into the arcaded courtyard.",
    "pl": "W zamku mieści się Muzeum Piastów Śląskich. Warto zacząć od zdobionej bramy i przejść na krużgankowy dziedziniec.",
    "de": "Im Schloss befindet sich das Museum der schlesischen Piasten. Der Besuch beginnt am verzierten Tor und führt in den Arkadenhof.",
    "cs": "Na zámku sídlí Muzeum slezských Piastovců. Začněte u zdobené brány a pokračujte na arkádové nádvoří."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "opole",
    "cityId": "brzeg",
    "coordinates": {
      "lat": 50.86387,
      "lng": 17.46659
    },
    "address": {
      "street": "Plac Zamkowy 1",
      "postalCode": "49-300",
      "city": "Brzeg",
      "country": "Poland"
    }
  },
  "categories": [
    "castle",
    "museum",
    "historical-landmark"
  ],
  "taxonomy": {
    "tags": [
      "architecture",
      "history",
      "excursion",
      "outside-wroclaw"
    ]
  },
  "links": {
    "website": "https://zamek.brzeg.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=50.86387%2C17.46659"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://zamek.brzeg.pl/kontakt",
        "checkedAt": "2026-09-28"
      },
      {
        "type": "coordinates",
        "url": "https://www.openstreetmap.org/way/230535120",
        "checkedAt": "2026-09-28"
      }
    ]
  },
  "socialPosts": [],
  "media": {
    "photos": [
      "/assets/brzeg-castle-courtyard.jpeg",
      "/assets/brzeg-castle-entrance.jpeg",
      "/assets/brzeg-castle-facade.jpeg",
      "/assets/brzeg-enrichment/brzeg-castle-014.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-015.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-017.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-019.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-020.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-021.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-022.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-023.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-025.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-027.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-028.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-029.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-030.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-031.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-032.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-033.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-034.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-035.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-036.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-037.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-038.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-039.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-040.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-041.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-042.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-043.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-044.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-045.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-046.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-047.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-048.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-049.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-051.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-057.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-058.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-061.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-065.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-066.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-069.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-070.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-073.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-075.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-076.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-077.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-078.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-079.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-080.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-081.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-082.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-084.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-088.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-089.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-091.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-092.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-093.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-094.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-095.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-096.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-097.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-098.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-099.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-100.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-101.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-102.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-103.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-104.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-105.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-106.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-107.jpg",
      "/assets/brzeg-enrichment/brzeg-castle-109.jpg"
    ],
    "videos": [],
    "guideVideos": {
      "he": "https://youtube.com/shorts/IYllRzq9VJs",
      "en": "https://youtube.com/shorts/zbpTMh2Fe2c"
    },
    "metadata": {
      "/assets/brzeg-enrichment/brzeg-castle-014.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.50.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-015.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.52 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-017.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.53 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-019.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.53 (3).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-020.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.56 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-021.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.56 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-022.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.56 (3).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-023.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.57 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-025.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.58 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-027.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.00 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-028.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.00 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-029.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.00 (3).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-030.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-031.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (11).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-032.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-033.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (3).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-034.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (5).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-035.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (6).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-036.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-037.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-038.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (14).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-039.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (15).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-040.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (4).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-041.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (5).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-042.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.31 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-043.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.31.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-044.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.32 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-045.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.32.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-046.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.33 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-047.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.33.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-048.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.35 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-049.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.35.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-051.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.38 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-057.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.43 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-058.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.43 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-061.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.31.07 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-065.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.26 (3).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-066.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.26 (4).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-069.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.27 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-070.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.27 (4).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-073.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.32 (4).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-075.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (10).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-076.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (11).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-077.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (12).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-078.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (13).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-079.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (14).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-080.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (17).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-081.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (18).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-082.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (19).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-084.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (20).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-088.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (36).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-089.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (37).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-091.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (9).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-092.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (10).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-093.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (11).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-094.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (12).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-095.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (13).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-096.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (14).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-097.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-098.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (21).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-099.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (22).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-100.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (3).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-101.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (4).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-102.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (5).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-103.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (6).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-104.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (7).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-105.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (8).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-106.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (9).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-107.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-castle-109.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-castle-courtyard.jpeg": {
        "sourceFile": "Brzeg/FORCODEX/02-castle-courtyard.jpeg",
        "original": true,
        "heroCandidate": true
      },
      "/assets/brzeg-castle-entrance.jpeg": {
        "sourceFile": "Brzeg/FORCODEX/01-castle-entrance.jpeg",
        "original": true
      },
      "/assets/brzeg-castle-facade.jpeg": {
        "sourceFile": "Brzeg/FORCODEX/03-facade-details.jpeg",
        "original": true
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "brzeg-holy-cross-church",
  "localName": "Kościół Podwyższenia Krzyża Świętego w Brzegu",
  "aliases": [],
  "name": {
    "he": "כנסיית רוממות הצלב הקדוש בברז׳ג",
    "en": "Holy Cross Church, Brzeg",
    "pl": "Kościół Podwyższenia Krzyża Świętego w Brzegu",
    "de": "Kreuzerhöhungskirche in Brieg",
    "cs": "Kostel Povýšení svatého Kříže v Brzegu"
  },
  "description": {
    "he": "כנסייה הסמוכה לטירה; בצילומי הביקור נראים החזית והחלל המעוטר שלה.",
    "en": "A church close to the castle; the visit photographs show its exterior and ornate interior.",
    "pl": "Kościół niedaleko zamku; zdjęcia z wizyty pokazują elewację i bogato zdobione wnętrze.",
    "de": "Eine Kirche nahe dem Schloss; die Besuchsfotos zeigen Außenansicht und reich geschmückten Innenraum.",
    "cs": "Kostel poblíž zámku; fotografie z návštěvy ukazují průčelí i zdobený interiér."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "opole",
    "cityId": "brzeg",
    "coordinates": {
      "lat": 50.8634,
      "lng": 17.46746
    }
  },
  "categories": [
    "church",
    "historical-landmark"
  ],
  "taxonomy": {
    "tags": [
      "architecture",
      "excursion",
      "outside-wroclaw"
    ]
  },
  "links": {
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=50.8634%2C17.46746"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "originalVideo": true,
    "factualSources": [
      {
        "type": "coordinates",
        "url": "https://www.openstreetmap.org/way/230535122",
        "checkedAt": "2026-09-28"
      }
    ]
  },
  "socialPosts": [],
  "media": {
    "photos": [
      "/assets/brzeg-holy-cross-exterior.jpeg",
      "/assets/brzeg-holy-cross-interior.jpeg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-050.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-053.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-054.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-068.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-074.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-083.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-086.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-087.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-090.jpg",
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-148.jpg"
    ],
    "videos": [
      "/assets/brzeg-holy-cross-interior.mp4"
    ],
    "metadata": {
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-050.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.38 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-053.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.39 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-054.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.39.jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-068.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.27 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-074.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (1).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-083.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (2).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-086.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (24).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-087.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (26).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-090.jpg": {
        "sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (4).jpeg",
        "original": true
      },
      "/assets/brzeg-enrichment/brzeg-holy-cross-church-148.jpg": {
        "sourceFile": "Brzeg/WhatsApp Image 2026-09-24 at 19.05.33 (27).jpeg",
        "original": true
      },
      "/assets/brzeg-holy-cross-exterior.jpeg": {
        "sourceFile": "Brzeg/FORCODEX/04-church-exterior.jpeg",
        "original": true
      },
      "/assets/brzeg-holy-cross-interior.jpeg": {
        "sourceFile": "Brzeg/FORCODEX/05-church-interior.jpeg",
        "original": true
      },
      "/assets/brzeg-holy-cross-interior.mp4": {
        "sourceFile": "Brzeg/FORCODEX/VIDEO-church-interior.mp4",
        "original": true
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
      id: "brzeg-town-hall", localName: "Ratusz w Brzegu", aliases: [],
      name: { he: "בית העירייה של ברז׳ג", en: "Brzeg Town Hall", pl: "Ratusz w Brzegu", de: "Rathaus Brieg", cs: "Radnice v Brzegu" },
      description: { he: "בית העירייה עומד בלב כיכר השוק של ברז׳ג. זו עצירה נוחה בהליכה בין הטירה למרכז הישן.", en: "The town hall stands in Brzeg's market square, an easy stop on a walk through the historic centre.", pl: "Ratusz stoi pośrodku brzeskiego rynku i jest naturalnym przystankiem spaceru przez starówkę.", de: "Das Rathaus steht mitten auf dem Marktplatz und liegt auf dem Weg durch die Altstadt.", cs: "Radnice stojí uprostřed brzeského náměstí a hodí se jako zastávka při procházce centrem." },
      location: { countryCode: "PL", regionId: "opole", cityId: "brzeg", coordinates: { lat: 50.8618, lng: 17.46958 } },
      categories: ["historical-landmark", "architecture"], taxonomy: { tags: ["architecture", "excursion", "outside-wroclaw"] },
      links: { website: "https://brzeg.pl/ratusz-w-brzegu/", navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=Ratusz%20w%20Brzegu" } },
      provenance: { contentType: "editorial", factualSources: [{ type: "official", url: "https://brzeg.pl/ratusz-w-brzegu/", checkedAt: "2026-09-28" }] },
      socialPosts: [], media: { photos: [], videos: [] }, status: "published", languages: ["he", "en", "pl", "de", "cs"] },
    {
      id: "brzeg-oder-gate", localName: "Brama Odrzańska", aliases: [],
      name: { he: "שער האודרה בברז׳ג", en: "Oder Gate, Brzeg", pl: "Brama Odrzańska w Brzegu", de: "Odertor in Brieg", cs: "Odřanská brána v Brzegu" },
      description: { he: "שער האודרה הוא נקודת סיום ליד הטירה ונהר האודרה.", en: "The Oder Gate is a useful end point near the castle and the Oder River.", pl: "Brama Odrzańska to wygodne zakończenie spaceru w pobliżu zamku i Odry.", de: "Das Odertor eignet sich als Endpunkt des Spaziergangs nahe Schloss und Oder.", cs: "Odřanská brána je vhodným zakončením procházky poblíž zámku a Odry." },
      location: { countryCode: "PL", regionId: "opole", cityId: "brzeg", coordinates: { lat: 50.86501, lng: 17.46659 } },
      categories: ["historical-landmark", "architecture"], taxonomy: { tags: ["excursion", "outside-wroclaw"] },
      links: { navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=50.86501%2C17.46659" } },
      provenance: { contentType: "editorial", factualSources: [{ type: "official", url: "https://brzeg.pl/sport-i-turystyka/szlaki-turystyczne/", checkedAt: "2026-09-28" }, { type: "coordinates", url: "https://www.openstreetmap.org/node/3928164427", checkedAt: "2026-09-28" }] },
      socialPosts: [], media: { photos: ["/assets/brzeg-enrichment/brzeg-oder-gate-110.jpg"], videos: [], metadata: {"/assets/brzeg-enrichment/brzeg-oder-gate-110.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (3).jpeg", "original": true}}, guideVideos: { he: "https://youtube.com/shorts/hvnoxm3reWo", en: "https://youtube.com/shorts/xs3NY7q0OX4" } }, status: "published", languages: ["he", "en", "pl", "de", "cs"] },
    {
  "id": "moszna-castle",
  "localName": "Zamek Moszna",
  "aliases": [],
  "name": {
    "he": "טירת מושנה",
    "en": "Moszna Castle",
    "pl": "Zamek Moszna",
    "de": "Schloss Moschen",
    "cs": "Zámek Moszna"
  },
  "description": {
    "he": "טירת מושנה היא מוקד הביקור השני ביום הטיול. אפשר לבקר בחללים הפתוחים לקהל ולצאת משם לפארק.",
    "en": "Moszna Castle is the second main destination of the day. Visit the areas open to guests, then continue into the park.",
    "pl": "Zamek Moszna to drugi główny cel dnia. Po zwiedzaniu dostępnych wnętrz można przejść do parku.",
    "de": "Schloss Moschen ist das zweite Hauptziel des Tages. Nach dem Besuch der zugänglichen Räume geht es in den Park.",
    "cs": "Zámek Moszna je druhým hlavním cílem dne. Po návštěvě přístupných prostor pokračujte do parku."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "opole",
    "cityId": "moszna",
    "coordinates": {
      "lat": 50.44079,
      "lng": 17.76793
    },
    "address": {
      "street": "Zamkowa 1",
      "postalCode": "47-370",
      "city": "Moszna",
      "country": "Poland"
    }
  },
  "categories": [
    "castle",
    "historical-landmark"
  ],
  "taxonomy": {
    "tags": [
      "architecture",
      "excursion",
      "outside-wroclaw"
    ]
  },
  "links": {
    "website": "https://mosznazamek.pl/zwiedzanie/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=50.44079%2C17.76793"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "originalVideo": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://mosznazamek.pl/kontakt/",
        "checkedAt": "2026-09-28"
      },
      {
        "type": "coordinates",
        "url": "https://www.openstreetmap.org/way/73054209",
        "checkedAt": "2026-09-28"
      }
    ]
  },
  "socialPosts": [],
  "media": {
    "photos": [
      "/assets/moszna-castle-hero.jpeg",
      "/assets/moszna-castle-approach.jpeg",
      "/assets/moszna-castle-entrance.jpeg",
      "/assets/moszna-enrichment/moszna-castle-002.jpg",
      "/assets/moszna-enrichment/moszna-castle-004.jpg",
      "/assets/moszna-enrichment/moszna-castle-009.jpg",
      "/assets/moszna-enrichment/moszna-castle-010.jpg",
      "/assets/moszna-enrichment/moszna-castle-040.jpg",
      "/assets/moszna-enrichment/moszna-castle-053.jpg",
      "/assets/moszna-enrichment/moszna-castle-054.jpg",
      "/assets/moszna-enrichment/moszna-castle-058.jpg",
      "/assets/moszna-enrichment/moszna-castle-060.jpg",
      "/assets/moszna-enrichment/moszna-castle-061.jpg",
      "/assets/moszna-enrichment/moszna-castle-062.jpg",
      "/assets/moszna-enrichment/moszna-castle-001.jpg",
      "/assets/moszna-enrichment/moszna-castle-005.jpg",
      "/assets/moszna-enrichment/moszna-castle-049.jpg",
      "/assets/moszna-enrichment/moszna-castle-050.jpg",
      "/assets/moszna-enrichment/moszna-castle-051.jpg",
      "/assets/moszna-enrichment/moszna-castle-052.jpg",
      "/assets/moszna-enrichment/moszna-castle-055.jpg",
      "/assets/moszna-enrichment/moszna-castle-069.jpg",
      "/assets/moszna-enrichment/moszna-castle-033.jpg",
      "/assets/moszna-enrichment/moszna-castle-034.jpg",
      "/assets/moszna-enrichment/moszna-castle-035.jpg",
      "/assets/moszna-enrichment/moszna-castle-036.jpg",
      "/assets/moszna-enrichment/moszna-castle-037.jpg",
      "/assets/moszna-enrichment/moszna-castle-043.jpg",
      "/assets/moszna-enrichment/moszna-castle-044.jpg",
      "/assets/moszna-enrichment/moszna-castle-045.jpg",
      "/assets/moszna-enrichment/moszna-castle-046.jpg",
      "/assets/moszna-enrichment/moszna-castle-047.jpg",
      "/assets/moszna-enrichment/moszna-castle-048.jpg",
      "/assets/moszna-enrichment/moszna-castle-013.jpg",
      "/assets/moszna-enrichment/moszna-castle-017.jpg",
      "/assets/moszna-enrichment/moszna-castle-018.jpg",
      "/assets/moszna-enrichment/moszna-castle-015.jpg",
      "/assets/moszna-enrichment/moszna-castle-020.jpg",
      "/assets/moszna-enrichment/moszna-castle-022.jpg",
      "/assets/moszna-enrichment/moszna-castle-025.jpg",
      "/assets/moszna-enrichment/moszna-castle-063.jpg",
      "/assets/moszna-enrichment/moszna-castle-064.jpg",
      "/assets/moszna-enrichment/moszna-castle-065.jpg",
      "/assets/moszna-enrichment/moszna-castle-067.jpg"
    ],
    "videos": [
      "/assets/moszna-castle-video.mp4"
    ],
    "guideVideos": {
      "he": "https://youtube.com/shorts/5ghRWvbwU6Q",
      "en": "https://youtube.com/shorts/UqqWiyXRk00"
    },
    "metadata": {
      "/assets/moszna-enrichment/moszna-castle-002.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (1).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-004.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-009.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.51.jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-010.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.52.jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-040.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (15).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-053.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (8).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-054.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (9).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-058.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (17).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-060.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (20).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-061.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (21).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-062.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (24).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-001.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.25.jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-005.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (4).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-049.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-050.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-051.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (4).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-052.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (5).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-055.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (10).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-069.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (9).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-033.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.25 (1).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-034.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.25 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-035.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.25 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-036.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.26 (1).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-037.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.26 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-043.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (18).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-044.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (19).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-045.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (20).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-046.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (21).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-047.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (22).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-048.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.21 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-013.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.17 (1).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-017.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.18 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-018.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.18 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-015.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.17 (4).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-020.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.19 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-022.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.20 (1).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-025.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.22 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-063.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-064.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (4).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-065.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (5).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-067.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (7).jpeg",
        "original": true
      },
      "/assets/moszna-castle-hero.jpeg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (16).jpeg",
        "original": true,
        "heroCandidate": true
      },
      "/assets/moszna-castle-approach.jpeg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (11).jpeg",
        "original": true
      },
      "/assets/moszna-castle-entrance.jpeg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (14).jpeg",
        "original": true
      },
      "/assets/moszna-castle-video.mp4": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Video 2026-09-24 at 17.26.50.mp4",
        "original": true
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "moszna-castle-park",
  "localName": "Park Zamkowy w Mosznej",
  "aliases": [],
  "name": {
    "he": "פארק טירת מושנה",
    "en": "Moszna Castle Park",
    "pl": "Park Zamkowy w Mosznej",
    "de": "Schlosspark Moschen",
    "cs": "Zámecký park v Moszně"
  },
  "description": {
    "he": "הפארק מקיף את הטירה וכולל שבילים, מדשאות, עצים ומקווי מים. זה המקום לסיים בו את הביקור במושנה.",
    "en": "The park around the castle has paths, lawns, trees and water features. It makes a calm finish to the Moszna visit.",
    "pl": "Park wokół zamku ma alejki, trawniki, drzewa i wodę. To spokojne zakończenie wizyty w Mosznej.",
    "de": "Der Park am Schloss bietet Wege, Rasenflächen, Bäume und Wasseranlagen. Hier lässt sich der Besuch ruhig ausklingen.",
    "cs": "Park kolem zámku nabízí cesty, trávníky, stromy i vodní plochy. Je to klidné zakončení návštěvy Moszny."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "opole",
    "cityId": "moszna",
    "coordinates": {
      "lat": 50.44079,
      "lng": 17.76793
    },
    "address": {
      "street": "Zamkowa 1",
      "postalCode": "47-370",
      "city": "Moszna",
      "country": "Poland"
    }
  },
  "categories": [
    "park",
    "garden"
  ],
  "taxonomy": {
    "tags": [
      "nature",
      "walking",
      "excursion",
      "outside-wroclaw"
    ]
  },
  "links": {
    "website": "https://mosznazamek.pl/zwiedzanie-parku/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Park%20Zamkowy%20w%20Mosznej"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://mosznazamek.pl/zwiedzanie-parku/",
        "checkedAt": "2026-09-28"
      }
    ]
  },
  "socialPosts": [],
  "media": {
    "photos": [
      "/assets/moszna-park-view.jpeg",
      "/assets/moszna-park-garden.jpeg",
      "/assets/moszna-enrichment/moszna-castle-park-012.jpg",
      "/assets/moszna-enrichment/moszna-castle-park-024.jpg",
      "/assets/moszna-enrichment/moszna-castle-park-027.jpg",
      "/assets/moszna-enrichment/moszna-castle-park-038.jpg",
      "/assets/moszna-enrichment/moszna-castle-park-041.jpg",
      "/assets/moszna-enrichment/moszna-castle-park-068.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/moszna-enrichment/moszna-castle-park-012.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.53 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-park-024.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.21 (2).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-park-027.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.22.jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-park-038.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.27 (3).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-park-041.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (16).jpeg",
        "original": true
      },
      "/assets/moszna-enrichment/moszna-castle-park-068.jpg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (8).jpeg",
        "original": true
      },
      "/assets/moszna-park-view.jpeg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.21 (1).jpeg",
        "original": true
      },
      "/assets/moszna-park-garden.jpeg": {
        "sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (2).jpeg",
        "original": true
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "jawor-church-of-peace",
  "localName": "Kościół Pokoju w Jaworze",
  "name": {
    "he": "כנסיית השלום ביאבור",
    "en": "Church of Peace in Jawor",
    "pl": "Kościół Pokoju w Jaworze",
    "de": "Friedenskirche in Jawor",
    "cs": "Kostel míru v Jaworu"
  },
  "description": {
    "he": "תחנת הפתיחה ביאבור: ביקור בכנסיית העץ, בחלל הפנימי ובחצר. התמונות שלנו מתעדות את היציעים, הציורים והפרטים מקרוב. בדקו שעות ביקור וכרטיסים באתר הכנסייה.",
    "en": "Begin the Jawor visit at the timber Church of Peace. Our photographs explore its galleries, painted interior, details and grounds. Check visiting hours and tickets on the church website.",
    "pl": "Początek wizyty w Jaworze przy drewnianym Kościele Pokoju. Nasze zdjęcia pokazują empory, malowane wnętrze, detale i otoczenie. Godziny zwiedzania i bilety sprawdź na stronie kościoła.",
    "de": "Der Besuch in Jawor beginnt an der hölzernen Friedenskirche. Unsere Fotos zeigen Emporen, bemalte Innenräume, Details und das Gelände. Besuchszeiten und Eintritt auf der Kirchenseite prüfen.",
    "cs": "Návštěva Jaworu začíná u dřevěného Kostela míru. Naše fotografie ukazují empory, malovaný interiér, detaily i okolí. Otevírací dobu a vstupenky ověřte na webu kostela."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "jawor",
    "coordinates": {
      "lat": 51.0539315,
      "lng": 16.1891045
    }
  },
  "categories": [
    "church"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "architecture",
      "photography"
    ]
  },
  "links": {
    "website": "https://kosciolpokojujawor.com/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Ko%C5%9Bci%C3%B3%C5%82%20Pokoju%20w%20Jaworze"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://kosciolpokojujawor.com/",
        "checkedAt": "2026-10-16"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/",
      "method": "Nominatim exact named-place result, cross-checked official address; central town point for walking stops",
      "checkedAt": "2026-10-16"
    }
  },
  "media": {
    "guideVideos": {
      "he": "https://youtube.com/shorts/NovPV4iArX8",
      "en": "https://youtube.com/shorts/JAXpHFfZH74"
    },
    "photos": [
      "/assets/excursion-three/jawor-church-of-peace-01.jpg",
      "/assets/excursion-three/jawor-church-of-peace-02.jpg",
      "/assets/excursion-three/jawor-church-of-peace-03.jpg",
      "/assets/excursion-three/jawor-church-of-peace-04.jpg",
      "/assets/excursion-three/jawor-church-of-peace-06.jpg",
      "/assets/excursion-three/jawor-church-of-peace-07.jpg",
      "/assets/excursion-three/jawor-church-of-peace-08.jpg",
      "/assets/excursion-three/jawor-church-of-peace-09.jpg",
      "/assets/excursion-three/jawor-church-of-peace-10.jpg",
      "/assets/excursion-three/jawor-church-of-peace-12.jpg",
      "/assets/excursion-three/jawor-church-of-peace-13.jpg",
      "/assets/excursion-three/jawor-church-of-peace-14.jpg",
      "/assets/excursion-three/jawor-church-of-peace-15.jpg",
      "/assets/excursion-three/jawor-church-of-peace-16.jpg",
      "/assets/excursion-three/jawor-church-of-peace-17.jpg",
      "/assets/excursion-three/jawor-church-of-peace-18.jpg",
      "/assets/excursion-three/jawor-church-of-peace-19.jpg",
      "/assets/excursion-three/jawor-church-of-peace-21.jpg",
      "/assets/excursion-three/jawor-church-of-peace-22.jpg",
      "/assets/excursion-three/jawor-church-of-peace-23.jpg",
      "/assets/excursion-three/jawor-church-of-peace-24.jpg",
      "/assets/excursion-three/jawor-church-of-peace-25.jpg",
      "/assets/excursion-three/jawor-church-of-peace-26.jpg",
      "/assets/excursion-three/jawor-church-of-peace-27.jpg",
      "/assets/excursion-three/jawor-church-of-peace-28.jpg",
      "/assets/excursion-three/jawor-church-of-peace-29.jpg",
      "/assets/excursion-three/jawor-church-of-peace-30.jpg",
      "/assets/excursion-three/jawor-church-of-peace-31.jpg",
      "/assets/excursion-three/jawor-church-of-peace-32.jpg",
      "/assets/excursion-three/jawor-church-of-peace-33.jpg",
      "/assets/excursion-three/jawor-church-of-peace-34.jpg",
      "/assets/excursion-three/jawor-church-of-peace-35.jpg",
      "/assets/excursion-three/jawor-church-of-peace-36.jpg",
      "/assets/excursion-three/jawor-church-of-peace-37.jpg",
      "/assets/excursion-three/jawor-church-of-peace-38.jpg",
      "/assets/excursion-three/jawor-church-of-peace-39.jpg",
      "/assets/excursion-three/jawor-church-of-peace-40.jpg",
      "/assets/excursion-three/jawor-church-of-peace-41.jpg",
      "/assets/excursion-three/jawor-church-of-peace-42.jpg",
      "/assets/excursion-three/jawor-church-of-peace-43.jpg",
      "/assets/excursion-three/jawor-church-of-peace-44.jpg",
      "/assets/excursion-three/jawor-church-of-peace-45.jpg",
      "/assets/excursion-three/jawor-church-of-peace-46.jpg",
      "/assets/excursion-three/jawor-church-of-peace-47.jpg",
      "/assets/excursion-three/jawor-church-of-peace-48.jpg",
      "/assets/excursion-three/jawor-church-of-peace-49.jpg",
      "/assets/excursion-three/jawor-church-of-peace-50.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/dUxZB14ZIIs"
    ],
    "metadata": {
      "/assets/excursion-three/jawor-church-of-peace-01.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.12.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-02.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.11.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-03.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.13.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-04.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.14 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-06.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.15 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-07.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.15 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-08.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.15 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-09.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.15 (4).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-10.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.15 (5).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-12.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.48 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-13.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.48.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-14.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.49 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-15.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.49.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-16.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.50.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-17.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.51 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-18.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.51 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-19.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.51 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-21.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.51 (5).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-22.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.51.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-23.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.52.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-24.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.57.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-25.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.58.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-26.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.59 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-27.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.59 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-28.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.59 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-29.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.26.00.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-30.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-31.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (15).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-32.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (16).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-33.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (17).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-34.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (18).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-35.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (19).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-36.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-37.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.03 (4).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-38.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-39.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (10).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-40.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (11).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-41.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (12).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-42.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-43.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (25).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-44.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (28).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-45.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (29).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-46.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (30).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-47.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (31).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-48.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (32).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-49.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (34).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-church-of-peace-50.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 19.10.05 (8).jpeg",
        "original": true
      },
      "https://youtube.com/shorts/dUxZB14ZIIs": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Video 2026-09-24 at 17.25.54.mp4",
        "sourceSHA256": "197b87b01f3a1c8102e4b984be332386f0af5cff5be4044d586d874f1100516f",
        "youtube": "https://youtube.com/shorts/dUxZB14ZIIs",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "jawor-market-square",
  "localName": "Rynek w Jaworze",
  "name": {
    "he": "כיכר העיר יאבור",
    "en": "Jawor Market Square",
    "pl": "Rynek w Jaworze",
    "de": "Marktplatz in Jawor",
    "cs": "Náměstí v Jaworu"
  },
  "description": {
    "he": "ממשיכים להליכה בכיכר העיר ובסביבת בית העירייה. תחנה עירונית קצרה בין הביקור בכנסייה לבין המשך היום.",
    "en": "Continue with a walk around the market square and town hall, a short urban stop within the Jawor visit.",
    "pl": "Spacer po rynku i wokół ratusza, krótki miejski przystanek podczas wizyty w Jaworze.",
    "de": "Ein Spaziergang über den Marktplatz und am Rathaus, ein kurzer Stadtstopp beim Besuch in Jawor.",
    "cs": "Procházka po náměstí kolem radnice, krátká městská zastávka během návštěvy Jaworu."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "jawor",
    "coordinates": {
      "lat": 51.0503785,
      "lng": 16.1942221
    }
  },
  "categories": [
    "city-centre"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "architecture",
      "photography"
    ]
  },
  "links": {
    "website": "https://jawor.pl/dla-turysty/zabytki/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Rynek%20w%20Jaworze"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://jawor.pl/dla-turysty/zabytki/",
        "checkedAt": "2026-10-16"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/",
      "method": "Nominatim exact named-place result, cross-checked official address; central town point for walking stops",
      "checkedAt": "2026-10-16"
    }
  },
  "media": {
    "photos": [
      "/assets/excursion-three/jawor-market-square-01.jpg",
      "/assets/excursion-three/jawor-market-square-02.jpg",
      "/assets/excursion-three/jawor-market-square-03.jpg",
      "/assets/excursion-three/jawor-market-square-04.jpg",
      "/assets/excursion-three/jawor-market-square-05.jpg",
      "/assets/excursion-three/jawor-market-square-06.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/excursion-three/jawor-market-square-01.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כיכר העיר/WhatsApp Image 2026-09-24 at 19.10.05 (14).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-market-square-02.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כיכר העיר/WhatsApp Image 2026-09-24 at 17.23.41 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-market-square-03.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כיכר העיר/WhatsApp Image 2026-09-24 at 19.10.05 (23).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-market-square-04.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כיכר העיר/WhatsApp Image 2026-09-24 at 19.10.05 (38).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-market-square-05.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כיכר העיר/WhatsApp Image 2026-09-24 at 19.10.05 (49).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-market-square-06.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.11 (1).jpeg",
        "original": true
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "jawor-piast-castle",
  "localName": "Zamek Piastowski w Jaworze",
  "name": {
    "he": "טירת הפיאסט ביאבור",
    "en": "Piast Castle in Jawor",
    "pl": "Zamek Piastowski w Jaworze",
    "de": "Piastenschloss in Jawor",
    "cs": "Piastovský zámek v Jaworu"
  },
  "description": {
    "he": "עצירה ליד מתחם טירת הפיאסט ביאבור. החומרים מהביקור מציגים חזיתות, חצר ופרטים של המבנה; אין כאן הבטחה לכניסה לחללים פנימיים.",
    "en": "A stop by the Piast Castle complex in Jawor. Visit photographs show façades, the courtyard and building details; interior access is not assumed.",
    "pl": "Przystanek przy kompleksie Zamku Piastowskiego w Jaworze. Zdjęcia z wizyty pokazują elewacje, dziedziniec i detale; nie zakładamy dostępu do wnętrz.",
    "de": "Halt am Piastenschloss in Jawor. Die Besuchsfotos zeigen Fassaden, Innenhof und Baudetails; Zugang zu Innenräumen wird nicht vorausgesetzt.",
    "cs": "Zastávka u Piastovského zámku v Jaworu. Fotografie zachycují průčelí, nádvoří a detaily; přístup do interiéru nepředpokládáme."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "jawor",
    "coordinates": {
      "lat": 51.0498699,
      "lng": 16.1904138
    }
  },
  "categories": [
    "castle"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "architecture",
      "photography"
    ]
  },
  "links": {
    "website": "https://jawor.pl/dla-turysty/zabytki/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Zamek%20Piastowski%20w%20Jaworze"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://jawor.pl/dla-turysty/zabytki/",
        "checkedAt": "2026-10-16"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/",
      "method": "Nominatim exact named-place result, cross-checked official address; central town point for walking stops",
      "checkedAt": "2026-10-16"
    }
  },
  "media": {
    "photos": [
      "/assets/excursion-three/jawor-piast-castle-01.jpg",
      "/assets/excursion-three/jawor-piast-castle-02.jpg",
      "/assets/excursion-three/jawor-piast-castle-03.jpg",
      "/assets/excursion-three/jawor-piast-castle-04.jpg",
      "/assets/excursion-three/jawor-piast-castle-05.jpg",
      "/assets/excursion-three/jawor-piast-castle-06.jpg",
      "/assets/excursion-three/jawor-piast-castle-07.jpg",
      "/assets/excursion-three/jawor-piast-castle-08.jpg",
      "/assets/excursion-three/jawor-piast-castle-09.jpg",
      "/assets/excursion-three/jawor-piast-castle-10.jpg",
      "/assets/excursion-three/jawor-piast-castle-12.jpg",
      "/assets/excursion-three/jawor-piast-castle-13.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/excursion-three/jawor-piast-castle-01.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 17.23.40.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-02.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 17.23.40 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-03.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 17.23.41 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-04.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 17.23.41 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-05.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 17.23.41.jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-06.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (15).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-07.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (16).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-08.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (17).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-09.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (18).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-10.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (19).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-12.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (21).jpeg",
        "original": true
      },
      "/assets/excursion-three/jawor-piast-castle-13.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (22).jpeg",
        "original": true
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "karpacz-centre",
  "localName": "Centrum Karpacza",
  "name": {
    "he": "מרכז קרפץ",
    "en": "Karpacz town centre",
    "pl": "Centrum Karpacza",
    "de": "Zentrum von Karpacz",
    "cs": "Centrum Karpacze"
  },
  "description": {
    "he": "אחרי יאבור נוסעים לקרפץ. כאן מטיילים במרכז העיירה ובמדרחוב, עם זמן להפסקה, אוכל ונוף הררי. הביקור בכנסיית וואנג מוצג בנפרד, כתחנה הבאה.",
    "en": "After Jawor, drive to Karpacz for a walk through the centre and pedestrian street, with a break for food and mountain views. Wang Church is the next, separate stop.",
    "pl": "Po Jaworze przejazd do Karpacza: spacer po centrum i deptaku, przerwa na jedzenie oraz górskie widoki. Świątynia Wang jest kolejnym, osobnym przystankiem.",
    "de": "Nach Jawor geht es nach Karpacz: Spaziergang durch Zentrum und Fußgängerzone, Zeit für eine Pause, Essen und Bergblicke. Die Wang-Kirche folgt als eigener Halt.",
    "cs": "Po Jaworu následuje Karpacz: procházka centrem a pěší zónou, přestávka na jídlo a horské výhledy. Kostel Wang je další samostatnou zastávkou."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "karpacz",
    "coordinates": {
      "lat": 50.7749665,
      "lng": 15.7539066
    }
  },
  "categories": [
    "city-centre"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "architecture",
      "photography"
    ]
  },
  "links": {
    "website": "https://www.karpacz.pl/deptak",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Centrum%20Karpacza"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://www.karpacz.pl/deptak",
        "checkedAt": "2026-10-16"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/",
      "method": "Nominatim exact named-place result, cross-checked official address; central town point for walking stops",
      "checkedAt": "2026-10-16"
    }
  },
  "media": {
    "guideVideos": {
      "he": "https://youtube.com/shorts/gQlJjc241gk",
      "en": "https://youtube.com/shorts/4WgaQo6HmWg"
    },
    "photos": [
      "/assets/excursion-three/karpacz-centre-01.jpg",
      "/assets/excursion-three/karpacz-centre-02.jpg",
      "/assets/excursion-three/karpacz-centre-03.jpg",
      "/assets/excursion-three/karpacz-centre-05.jpg",
      "/assets/excursion-three/karpacz-centre-06.jpg",
      "/assets/excursion-three/karpacz-centre-07.jpg",
      "/assets/excursion-three/karpacz-centre-08.jpg",
      "/assets/excursion-three/karpacz-centre-09.jpg",
      "/assets/excursion-three/karpacz-centre-10.jpg",
      "/assets/excursion-three/karpacz-centre-11.jpg",
      "/assets/excursion-three/karpacz-centre-14.jpg",
      "/assets/excursion-three/karpacz-centre-15.jpg",
      "/assets/excursion-three/karpacz-centre-16.jpg",
      "/assets/excursion-three/karpacz-centre-17.jpg",
      "/assets/excursion-three/karpacz-centre-19.jpg",
      "/assets/excursion-three/karpacz-centre-20.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/j3ORWLifr1o",
      "https://youtube.com/shorts/h4pIjvZ6BX4",
      "https://youtube.com/shorts/4MA7MiQFBOQ",
      "https://youtube.com/shorts/oM_7bgKXiQM",
      "https://youtube.com/shorts/_MZ5mwPlMko",
      "https://youtube.com/shorts/uubAo80A9oU",
      "https://youtube.com/shorts/BXiPB2FmM9I",
      "https://youtube.com/shorts/sckZg-I6mrw",
      "https://youtube.com/shorts/qyrmAaZneoo",
      "https://youtube.com/shorts/UiSnqPoyKbU",
      "https://youtube.com/shorts/IX_mBF0YCAk",
      "https://youtube.com/shorts/APA9JFyAhCo",
      "https://youtube.com/shorts/POUbYhobU9o"
    ],
    "metadata": {
      "/assets/excursion-three/karpacz-centre-01.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.27.55.jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-02.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.26.12.jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-03.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.26.14 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-05.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.26.15.jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-06.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.26.21.jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-07.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.27.47 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-08.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.27.54 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-09.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.27.54 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-10.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.27.54.jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-11.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.27.56 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-14.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.28 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-15.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.36 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-16.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.36 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-17.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.36 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-19.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.41.jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-20.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.46 (1).jpeg",
        "original": true
      },
      "https://youtube.com/shorts/j3ORWLifr1o": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.07.mp4",
        "sourceSHA256": "23a1b4e8cd21b037e759af5294a9ee751cce1b1d937ad472ef057a71598682e3",
        "youtube": "https://youtube.com/shorts/j3ORWLifr1o",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:51:31.762Z"
      },
      "https://youtube.com/shorts/h4pIjvZ6BX4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.08.mp4",
        "sourceSHA256": "f51a4f525d6e5071b9ffaf8ca3b606308c7b02d94a5a3395f897ebbd07ebab61",
        "youtube": "https://youtube.com/shorts/h4pIjvZ6BX4",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:51:44.950Z"
      },
      "https://youtube.com/shorts/4MA7MiQFBOQ": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.11.mp4",
        "sourceSHA256": "e30373e4bc65aef216380d0423f862ed9fe4e96b342af9034150feed846c3dad",
        "youtube": "https://youtube.com/shorts/4MA7MiQFBOQ",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:52:44.488Z"
      },
      "https://youtube.com/shorts/oM_7bgKXiQM": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.14.mp4",
        "sourceSHA256": "ae04afedbc1212b0741f3199dcc762b132078870b7aabe8aabe47ec366bc2b6a",
        "youtube": "https://youtube.com/shorts/oM_7bgKXiQM",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:53:15.625Z"
      },
      "https://youtube.com/shorts/_MZ5mwPlMko": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.16.mp4",
        "sourceSHA256": "b47b789364912a606885cc800009a39b1c8fb7786942b935e6ae811a2d726f73",
        "youtube": "https://youtube.com/shorts/_MZ5mwPlMko",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:53:19.258Z"
      },
      "https://youtube.com/shorts/uubAo80A9oU": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.19 (1).mp4",
        "sourceSHA256": "3c4985d768c6f166257f6a6d3979ed91ee845dbd2cd683ffbff5e63cc7ebe2b3",
        "youtube": "https://youtube.com/shorts/uubAo80A9oU",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:53:44.384Z"
      },
      "https://youtube.com/shorts/BXiPB2FmM9I": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.19.mp4",
        "sourceSHA256": "604aa9123ff7862f1d2d192b00c5e6dc4dfacd35935f32cd3214f2a73a7e1234",
        "youtube": "https://youtube.com/shorts/BXiPB2FmM9I",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:56:01.438Z"
      },
      "https://youtube.com/shorts/sckZg-I6mrw": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.21.mp4",
        "sourceSHA256": "12682abae7b56dc3d5b63839e20a33ae29a6db0b1b91e69656d3d74dfe997906",
        "youtube": "https://youtube.com/shorts/sckZg-I6mrw",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:56:40.184Z"
      },
      "https://youtube.com/shorts/qyrmAaZneoo": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.26.23.mp4",
        "sourceSHA256": "ea8f34a3678f1c4b72c0cb2a476c8dcc4d06b9244d0413f3bf222dd2303dd1df",
        "youtube": "https://youtube.com/shorts/qyrmAaZneoo",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:57:20.299Z"
      },
      "https://youtube.com/shorts/UiSnqPoyKbU": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-01 at 09.27.48.mp4",
        "sourceSHA256": "692e9708718bd9a3ce9803ef29514d7458893be09006b459b2a712ff941fa873",
        "youtube": "https://youtube.com/shorts/UiSnqPoyKbU",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:57:47.794Z"
      },
      "https://youtube.com/shorts/IX_mBF0YCAk": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-05 at 18.33.32.mp4",
        "sourceSHA256": "d6bc20a00ede80c1564af1bf7fef7510ef12516b159a9a67eb0ad7c4975a9f98",
        "youtube": "https://youtube.com/shorts/IX_mBF0YCAk",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:58:18.897Z"
      },
      "https://youtube.com/shorts/APA9JFyAhCo": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-05 at 18.33.39.mp4",
        "sourceSHA256": "cae0a6f0f7bbfe8592ee22403e02620ab3e8a4bc13f11baa3d86138b415b51dd",
        "youtube": "https://youtube.com/shorts/APA9JFyAhCo",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:59:28.433Z"
      },
      "https://youtube.com/shorts/POUbYhobU9o": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Video 2026-10-05 at 18.33.41.mp4",
        "sourceSHA256": "a9f6ed3fa696e53bc2c9bb0cdd7fbf36c9f8354b4a7af23e106d74228acf1aa7",
        "youtube": "https://youtube.com/shorts/POUbYhobU9o",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T08:59:41.682Z"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "wang-church",
  "localName": "Świątynia Wang",
  "name": {
    "he": "כנסיית וואנג",
    "en": "Wang Church",
    "pl": "Świątynia Wang",
    "de": "Stabkirche Wang",
    "cs": "Kostel Wang"
  },
  "description": {
    "he": "תחנה נפרדת אחרי מרכז קרפץ: כנסיית העץ וואנג והסביבה שלה. התמונות מהביקור מציגות את המבנה, גילופי העץ והחצר. בדקו באתר הכנסייה את תנאי הביקור העדכניים.",
    "en": "A separate stop after central Karpacz: Wang timber church and its surroundings. Visit photographs show the building, carved wood and grounds. Check current visiting arrangements on the church website.",
    "pl": "Osobny przystanek po centrum Karpacza: drewniana świątynia Wang i jej otoczenie. Zdjęcia pokazują budowlę, rzeźbione drewno i teren wokół kościoła. Aktualne zasady zwiedzania sprawdź na stronie świątyni.",
    "de": "Ein eigener Halt nach dem Zentrum von Karpacz: die hölzerne Wang-Kirche mit ihrem Gelände. Die Fotos zeigen Gebäude, Holzschnitzereien und Umgebung. Aktuelle Besuchsregeln auf der Kirchenseite prüfen.",
    "cs": "Samostatná zastávka po centru Karpacze: dřevěný kostel Wang a jeho okolí. Fotografie ukazují stavbu, dřevořezby a areál. Aktuální podmínky návštěvy ověřte na webu kostela."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "karpacz",
    "coordinates": {
      "lat": 50.7773866,
      "lng": 15.7241515
    }
  },
  "categories": [
    "church"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "architecture",
      "photography"
    ]
  },
  "links": {
    "website": "https://wang.com.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=%C5%9Awi%C4%85tynia%20Wang"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://wang.com.pl/",
        "checkedAt": "2026-10-16"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/",
      "method": "Nominatim exact named-place result, cross-checked official address; central town point for walking stops",
      "checkedAt": "2026-10-16"
    }
  },
  "media": {
    "guideVideos": {
      "he": "https://youtube.com/shorts/MinjLfDR-nc",
      "en": "https://youtube.com/shorts/I0yVmZFViio"
    },
    "photos": [
      "/assets/excursion-three/wang-church-01.jpg",
      "/assets/excursion-three/wang-church-02.jpg",
      "/assets/excursion-three/wang-church-05.jpg",
      "/assets/excursion-three/wang-church-06.jpg",
      "/assets/excursion-three/wang-church-07.jpg",
      "/assets/excursion-three/wang-church-08.jpg",
      "/assets/excursion-three/wang-church-10.jpg",
      "/assets/excursion-three/wang-church-11.jpg",
      "/assets/excursion-three/wang-church-13.jpg",
      "/assets/excursion-three/wang-church-14.jpg",
      "/assets/excursion-three/wang-church-15.jpg",
      "/assets/excursion-three/wang-church-17.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/PBh_F_4H7SQ",
      "https://youtube.com/shorts/i1UFkfYKFh0",
      "https://youtube.com/shorts/so7pYtZsK3k",
      "https://youtube.com/shorts/q_pxUoqEJp4",
      "https://youtube.com/shorts/QI-4x24ay14",
      "https://youtube.com/shorts/h6IkQaZWXfg",
      "https://youtube.com/shorts/1ium43jP47c",
      "https://youtube.com/shorts/Kz_UzOKr9zA",
      "https://youtube.com/shorts/EAtJ1omLGGM",
      "https://youtube.com/shorts/HEMwHjvesPY",
      "https://youtube.com/shorts/QZgpH_l4Sjo",
      "https://youtube.com/shorts/fSIh-ulFhqA",
      "https://youtube.com/shorts/yG4yLJlOS9Q",
      "https://youtube.com/shorts/MY2mECOq9_Q",
      "https://youtube.com/shorts/eT4DJ_wCEX0",
      "https://youtube.com/shorts/c0JQMmmXGpo",
      "https://youtube.com/shorts/UUB2CQEg4AM"
    ],
    "metadata": {
      "/assets/excursion-three/wang-church-01.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.56 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-02.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.47.jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-05.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.56 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-06.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.56 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-07.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.56 (4).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-08.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.56 (5).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-10.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.56.jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-11.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.57 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-13.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.26.01 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-14.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.26.01 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-15.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.26.01.jpeg",
        "original": true
      },
      "/assets/excursion-three/wang-church-17.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-05 at 18.33.02.jpeg",
        "original": true
      },
      "https://youtube.com/shorts/PBh_F_4H7SQ": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.22.28.mp4",
        "sourceSHA256": "c1bba87cbc0bea62b62d2566d1219be85059c5877537fcfc7f739e0784b3ec57",
        "youtube": "https://youtube.com/shorts/PBh_F_4H7SQ",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:00:00.908Z"
      },
      "https://youtube.com/shorts/i1UFkfYKFh0": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.48 (1).mp4",
        "sourceSHA256": "ec4dd09af01cac048694595253cefea384f325716c6ff2deeb44ffa816dfa297",
        "youtube": "https://youtube.com/shorts/i1UFkfYKFh0",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:03:26.706Z"
      },
      "https://youtube.com/shorts/so7pYtZsK3k": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.48.mp4",
        "sourceSHA256": "3a675ace7020343f574ab14637a6fb3c67bcc8955d14ae1bd008c58b0ae1b124",
        "youtube": "https://youtube.com/shorts/so7pYtZsK3k",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:04:05.828Z"
      },
      "https://youtube.com/shorts/q_pxUoqEJp4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.49.mp4",
        "sourceSHA256": "0fd4f84d301a52994ba4f5b9021a62ad75b4887a66196c3c24463dbeb13f3529",
        "youtube": "https://youtube.com/shorts/q_pxUoqEJp4",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:04:21.105Z"
      },
      "https://youtube.com/shorts/QI-4x24ay14": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.50.mp4",
        "sourceSHA256": "1f77338267679129e7f1f89ed1d98773d3317b839a13d2c99c610bed465d2357",
        "youtube": "https://youtube.com/shorts/QI-4x24ay14",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:04:33.522Z"
      },
      "https://youtube.com/shorts/h6IkQaZWXfg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.51.mp4",
        "sourceSHA256": "2768816bc4cf073c7e13d6fc0f16f40066cdef27708f73c04775ed97c571eed9",
        "youtube": "https://youtube.com/shorts/h6IkQaZWXfg",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:04:47.729Z"
      },
      "https://youtube.com/shorts/1ium43jP47c": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.52.mp4",
        "sourceSHA256": "3ef6e553a47eb68f2b0d8bbb72939a0ea8489a502fc360729f6c4972c886d482",
        "youtube": "https://youtube.com/shorts/1ium43jP47c",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:05:04.436Z"
      },
      "https://youtube.com/shorts/Kz_UzOKr9zA": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.53.mp4",
        "sourceSHA256": "b1b0d200932ca83b2b18597d625a18e10603d1a8d94e27ef426777f442480470",
        "youtube": "https://youtube.com/shorts/Kz_UzOKr9zA",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:05:19.902Z"
      },
      "https://youtube.com/shorts/EAtJ1omLGGM": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.54.mp4",
        "sourceSHA256": "8ef38b3db439d4eaec5e9a34d3020637dd04ef3b017578632e965053c27c6701",
        "youtube": "https://youtube.com/shorts/EAtJ1omLGGM",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:05:32.200Z"
      },
      "https://youtube.com/shorts/HEMwHjvesPY": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.55.mp4",
        "sourceSHA256": "82d063c17dcf805d51bf616221845bae7e3d9e849641b0dd82fc72a855150499",
        "youtube": "https://youtube.com/shorts/HEMwHjvesPY",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:06:09.675Z"
      },
      "https://youtube.com/shorts/QZgpH_l4Sjo": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.57.mp4",
        "sourceSHA256": "92f01bbc43b6ba121b9a9327adcb37ed031c546afb986e33039a09cc1ae04f69",
        "youtube": "https://youtube.com/shorts/QZgpH_l4Sjo",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:06:27.317Z"
      },
      "https://youtube.com/shorts/fSIh-ulFhqA": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.25.59.mp4",
        "sourceSHA256": "dece63bfee1b7b71bf11b8b81a3942aa814679c6567836c59bc80587fdcdadfc",
        "youtube": "https://youtube.com/shorts/fSIh-ulFhqA",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:07:00.330Z"
      },
      "https://youtube.com/shorts/yG4yLJlOS9Q": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.26.00.mp4",
        "sourceSHA256": "378bbd9d0de7d557cdb1b3dde27d0fb2bc80fb51cb926725670d090889813087",
        "youtube": "https://youtube.com/shorts/yG4yLJlOS9Q",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:07:12.029Z"
      },
      "https://youtube.com/shorts/MY2mECOq9_Q": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.26.02.mp4",
        "sourceSHA256": "bfc869400261ae4d69bfbb6d6a7255a57802000eb81a88244377fea7a714d596",
        "youtube": "https://youtube.com/shorts/MY2mECOq9_Q",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:07:32.331Z"
      },
      "https://youtube.com/shorts/eT4DJ_wCEX0": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.26.03.mp4",
        "sourceSHA256": "f3c51eea24f086e3cf9c11caa67f5ec6bd431b68b6f3d9d9c403f8a436691813",
        "youtube": "https://youtube.com/shorts/eT4DJ_wCEX0",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:08:17.991Z"
      },
      "https://youtube.com/shorts/c0JQMmmXGpo": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-01 at 09.26.05.mp4",
        "sourceSHA256": "0e357f7021ecf8e529c6238aadcb67e4b2d7d3723f19928c82e416d87b855260",
        "youtube": "https://youtube.com/shorts/c0JQMmmXGpo",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:08:32.028Z"
      },
      "https://youtube.com/shorts/UUB2CQEg4AM": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.32.57.mp4",
        "sourceSHA256": "119af6e24da07c22ab8306ea396f95b12c7483bb64a658e092f957d62b8a9615",
        "youtube": "https://youtube.com/shorts/UUB2CQEg4AM",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:13:04.209Z"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
    {
  "id": "jelenia-gora-market-square",
  "localName": "Rynek i stare miasto w Jeleniej Górze",
  "name": {
    "he": "ילניה גורה, הכיכר והעיר העתיקה",
    "en": "Jelenia Góra market square and old town",
    "pl": "Rynek i stare miasto w Jeleniej Górze",
    "de": "Marktplatz und Altstadt von Jelenia Góra",
    "cs": "Náměstí a historické centrum Jelení Hory"
  },
  "description": {
    "he": "התחנה האחרונה לפני החזרה לוורוצלב: הליכה בכיכר ובסמטאות העיר העתיקה של ילניה גורה. בחומרי הביקור שלנו מופיעים בית העירייה, חזיתות צבעוניות, דוכנים ואווירת הרחוב. אירועים ודוכנים שתועדו אינם מובטחים בכל ביקור.",
    "en": "The final stop before returning to Wrocław: a walk around Jelenia Góra market square and old-town streets. Our visit photographs show the town hall, colourful façades, stalls and street life. Recorded events and stalls are not guaranteed on every visit.",
    "pl": "Ostatni przystanek przed powrotem do Wrocławia: spacer po rynku i uliczkach starego miasta Jeleniej Góry. Nasze zdjęcia pokazują ratusz, kolorowe kamienice, stoiska i życie uliczne. Uwiecznione wydarzenia i stoiska nie są stałą ofertą.",
    "de": "Letzter Halt vor der Rückfahrt nach Wrocław: Spaziergang über den Marktplatz und durch die Altstadt von Jelenia Góra. Unsere Fotos zeigen Rathaus, bunte Fassaden, Stände und Straßenleben. Die dokumentierten Veranstaltungen und Stände finden nicht ständig statt.",
    "cs": "Poslední zastávka před návratem do Vratislavi: procházka náměstím a uličkami historického centra Jelení Hory. Naše fotografie ukazují radnici, barevné domy, stánky a život v ulicích. Zachycené akce a stánky nejsou stálou nabídkou."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "jelenia-gora",
    "coordinates": {
      "lat": 50.9035044,
      "lng": 15.7344539
    }
  },
  "categories": [
    "city-centre"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "architecture",
      "photography"
    ]
  },
  "links": {
    "website": "https://turystyka.jeleniagora.pl/content/ratusz-miejski-i-siedem-dom%C3%B3w",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Rynek%20i%20stare%20miasto%20w%20Jeleniej%20G%C3%B3rze"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://turystyka.jeleniagora.pl/content/ratusz-miejski-i-siedem-dom%C3%B3w",
        "checkedAt": "2026-10-16"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/",
      "method": "Nominatim exact named-place result, cross-checked official address; central town point for walking stops",
      "checkedAt": "2026-10-16"
    }
  },
  "media": {
    "guideVideos": {
      "he": "https://youtube.com/shorts/kv047H3sRvA",
      "en": "https://youtube.com/shorts/G8QVSsk1ABk"
    },
    "photos": [
      "/assets/excursion-three/jelenia-gora-market-square-01.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-02.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-03.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-04.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-05.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-06.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-07.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-09.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-11.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-12.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-13.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-14.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-15.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-16.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-17.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-18.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-19.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-20.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-22.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-23.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-24.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-27.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-28.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-29.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-31.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-32.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-33.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/evb3VZTBi70",
      "https://youtube.com/shorts/1aNhfN1NoaY",
      "https://youtube.com/shorts/83HHNnaimbo",
      "https://youtube.com/shorts/pRYkflDphOk",
      "https://youtube.com/shorts/10pxz2NLcyU",
      "https://youtube.com/shorts/GcAlPb9lUn4",
      "https://youtube.com/shorts/XgCNgAVm92U"
    ],
    "metadata": {
      "/assets/excursion-three/jelenia-gora-market-square-01.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.22 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-02.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.09 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-03.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.10.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-04.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.11 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-05.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.11 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-06.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.11 (3).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-07.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.11 (4).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-09.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.22 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-11.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.22 (4).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-12.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.23 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-13.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.23 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-14.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.23.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-15.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.24.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-16.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.25 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-17.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.25.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-18.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.27 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-19.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.27 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-20.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.27.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-22.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.30 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-23.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.30.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-24.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.31 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-27.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.32 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-28.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.32.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-29.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.33 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-31.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.33.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-32.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.36 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-33.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.36.jpeg",
        "original": true
      },
      "https://youtube.com/shorts/evb3VZTBi70": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.24.10.mp4",
        "sourceSHA256": "5e8d9d0b29481f6d83ae90bf9649218c3ffa25451e8e24c1a14d30031a252662",
        "youtube": "https://youtube.com/shorts/evb3VZTBi70",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:14:25.083Z"
      },
      "https://youtube.com/shorts/1aNhfN1NoaY": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.25.24.mp4",
        "sourceSHA256": "a7d481ae05d91b0679edf48c2acbb8882bf1291f2fc12548147f020234fc14d4",
        "youtube": "https://youtube.com/shorts/1aNhfN1NoaY",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:14:44.846Z"
      },
      "https://youtube.com/shorts/83HHNnaimbo": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.25.26.mp4",
        "sourceSHA256": "6e27e9e8c1591ea50aef8da3e3c6cfa4d3bea3c148a160486da61a8d169e01d7",
        "youtube": "https://youtube.com/shorts/83HHNnaimbo",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:14:58.527Z"
      },
      "https://youtube.com/shorts/pRYkflDphOk": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.25.29.mp4",
        "sourceSHA256": "06c2f2f31cf99309f9ff151e019b921fec6436c221f1fa991ca1059a1cebd643",
        "youtube": "https://youtube.com/shorts/pRYkflDphOk",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:15:24.633Z"
      },
      "https://youtube.com/shorts/10pxz2NLcyU": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.25.32.mp4",
        "sourceSHA256": "c8c91d66b4b5e8f089b0d9aa409c34727178e23bc942a6d54cd70f830a0c6a77",
        "youtube": "https://youtube.com/shorts/10pxz2NLcyU",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:15:50.881Z"
      },
      "https://youtube.com/shorts/GcAlPb9lUn4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.25.34.mp4",
        "sourceSHA256": "83339ab96703a3a06666532915a0832c7056b173e5028220a422b16f75bde588",
        "youtube": "https://youtube.com/shorts/GcAlPb9lUn4",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:16:01.466Z"
      },
      "https://youtube.com/shorts/XgCNgAVm92U": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Video 2026-10-01 at 09.25.35.mp4",
        "sourceSHA256": "2efeba2183594941568b32bbecb9ff612e2130ad7c987372915f86266154f5bd",
        "youtube": "https://youtube.com/shorts/XgCNgAVm92U",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:16:27.749Z"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "czocha-castle",
  "localName": "Zamek Czocha",
  "aliases": [],
  "name": {
    "he": "טירת צ׳וחה ולינה בטירה",
    "en": "Czocha Castle and overnight stay",
    "pl": "Zamek Czocha i nocleg w zamku",
    "de": "Burg Czocha mit Übernachtung",
    "cs": "Hrad Czocha s přenocováním"
  },
  "description": {
    "he": "ביקרנו בטירת צ׳וחה ולננו בטירה. בגלריה תמצאו את החצרות, החללים ההיסטוריים, מזנון ארוחת הבוקר ועוגת התפוחים שאכלנו במקום. את ההליכה לסכר אנחנו ממליצים לעשות בבוקר למחרת, אחרי ארוחת הבוקר.",
    "en": "We visited Czocha Castle and stayed overnight. Our gallery includes the courtyards, historic interiors, breakfast buffet and the apple cake we enjoyed here. We recommend the dam walk the following morning, after breakfast.",
    "pl": "Zwiedziliśmy zamek Czocha i spędziliśmy w nim noc. Galeria pokazuje dziedzińce, zabytkowe wnętrza, bufet śniadaniowy i jedzoną na miejscu szarlotkę. Spacer do zapory polecamy następnego ranka po śniadaniu.",
    "de": "Wir besuchten Burg Czocha und übernachteten dort. Die Galerie zeigt Innenhöfe, historische Räume, das Frühstücksbuffet und unseren Apfelkuchen vor Ort. Den Spaziergang zur Talsperre empfehlen wir am nächsten Morgen nach dem Frühstück.",
    "cs": "Navštívili jsme hrad Czocha a přenocovali v něm. Galerie ukazuje nádvoří, historické interiéry, snídaňový bufet a jablečný koláč, který jsme tu ochutnali. Procházku k přehradě doporučujeme následující ráno po snídani."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "sucha-lesna",
    "coordinates": {
      "lat": 51.0306821,
      "lng": 15.3035811
    }
  },
  "categories": [
    "castle",
    "historical-landmark"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "original-photography"
    ]
  },
  "links": {
    "website": "https://zamekczocha.com/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Zamek+Czocha"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://zamekczocha.com/",
        "checkedAt": "2026-10-16"
      },
      {
        "type": "coordinates",
        "url": "https://www.openstreetmap.org/way/1329470087",
        "checkedAt": "2026-10-16"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/czocha-boleslawiec/czocha-castle-001.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-103.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-104.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-111.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-112.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-113.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-114.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-122.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-133.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-134.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-135.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-083.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-141.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-142.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-012.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-013.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-016.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-017.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-019.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-022.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-023.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-024.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-026.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-029.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-030.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-032.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-033.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-034.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-036.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-037.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-038.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-039.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-046.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-047.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-048.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-050.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-052.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-055.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-056.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-058.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-059.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-060.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-061.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-063.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-064.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-065.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-067.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-069.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-070.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-075.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-078.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-079.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-082.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-085.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-087.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-088.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-100.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-115.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-116.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-118.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-119.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-120.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-121.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-130.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-137.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-138.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-139.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-140.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-144.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-147.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-158.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-159.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-160.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-161.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-162.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-163.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-165.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-166.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-167.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-168.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-169.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-172.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-173.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-180.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-181.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-182.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-183.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-184.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-185.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-186.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-187.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-188.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-189.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-190.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-191.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-192.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-193.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-195.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-197.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-198.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-199.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-200.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-201.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-205.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-206.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-208.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-209.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-210.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-212.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-213.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-214.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-215.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-216.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-219.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-220.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-221.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-222.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-223.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-224.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-225.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-226.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-227.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-232.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-233.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-234.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-235.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-236.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-239.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-240.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-241.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-242.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-245.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-246.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-247.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-249.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-250.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-253.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-254.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-255.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-257.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-258.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-259.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-260.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-262.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-263.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-265.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-266.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-267.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-269.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-271.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-272.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-273.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-274.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-278.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-279.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-280.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-281.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-284.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-286.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-287.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-288.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-289.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-290.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-291.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-292.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-293.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-295.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-296.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-297.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-298.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-299.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-300.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-302.jpg",
      "/assets/czocha-boleslawiec/czocha-castle-303.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/L1Z0nIxGFsU",
      "https://youtube.com/shorts/LQZA0KUMTyM"
    ],
    "metadata": {
      "/assets/czocha-boleslawiec/czocha-castle-001.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.31.jpeg",
        "sourceSHA256": "0e4dd548b2f0432de64a9726d581b9d63c58840f75e4a72f9bdcdbaec08457d6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-103.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.37.jpeg",
        "sourceSHA256": "131a18bdf5170351d385cc4a9663797e0253911c5896dfd990c2f2e45d6daa54",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-104.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.38.jpeg",
        "sourceSHA256": "0b10bd510c0b44351f5ca77a42dbd5fdd3a62336679567425478a753effa68fc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-111.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.10.06 (13).jpeg",
        "sourceSHA256": "443e7c22febce586d1f9c7ff1e9ecb4afade1cec5bb69eefd563c3faa4c9f096",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-112.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.10.06 (14).jpeg",
        "sourceSHA256": "b4d962bef463c84a3dde24b5019d8b594302bacfcced968c07202fb72d70afaf",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-113.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.10.06 (15).jpeg",
        "sourceSHA256": "33ee41bbc7b48ebc3be010eb457fbf95b2fb9e25b35bd065d80b05d482fa8663",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-114.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.10.06 (8).jpeg",
        "sourceSHA256": "3c309655012bacff3ca39caf3b9691d278ed48ba0e31204f930876acf31997ab",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-122.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (13).jpeg",
        "sourceSHA256": "058da1bf174f4cd9cbfb65ec8c93f35f2cd88a0cb41159bf2102577ba3f4a838",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-133.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.20 (1).jpeg",
        "sourceSHA256": "7a7a15e92c0280762366b157f7bcc6af50b373430309baf59b7324917a5128fe",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-134.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.20 (2).jpeg",
        "sourceSHA256": "85e43ee2179487e78f044666bf218e2ecd3842cf0352d60fa61b2a1352ef428f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-135.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.20 (3).jpeg",
        "sourceSHA256": "b3871aa3e0b99489aa6314be789c8cfcac448660112f76ce53ac52e697731550",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-083.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.33 (2).jpeg",
        "sourceSHA256": "74a1fb21b9b8d905535c68352b246b76235a7148f5286857a45e7c1006128580",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-141.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (14).jpeg",
        "sourceSHA256": "c8ad6724395e06370012be2549f175355137ba07e548b31bda8ba620a6696ec2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-142.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (15).jpeg",
        "sourceSHA256": "80fe154800f334b02c3f853516934f983e6ac7aeafbfcb778e19fb3e2c0eda51",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-012.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.37 (4).jpeg",
        "sourceSHA256": "b14738402a033c13b584dcf2f6cf83ff2a11d06de9fa4736fc7573a7bd581e1c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-013.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.37.jpeg",
        "sourceSHA256": "7af35ba34c80c0ff97faa82480f0cdd73627d09f38ad901a9e142a042cae6400",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-016.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.38.jpeg",
        "sourceSHA256": "8da77dfda1ad6a58965340a5817941a9bc8b4470c6501a756175c6d292078de8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-017.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.39 (1).jpeg",
        "sourceSHA256": "0f319de8ea61a91f034df0fc10d8dfb2b575c801b21868bdd88f4ec5cac9818a",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-019.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.39 (3).jpeg",
        "sourceSHA256": "d01239ebfdc19524d4f3bf9c5580835726507d64dff815a9c1aef7c95ae8cf3a",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-022.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.40 (2).jpeg",
        "sourceSHA256": "ab30350071d0ea08ba49a379a444d9f0400281aa4ce14bc10dfb0a19d000e2c5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-023.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.40 (3).jpeg",
        "sourceSHA256": "2431637aa6a8306c51bd4d35e1a24b16dd5e078d903247712becbdfa7c5b5c96",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-024.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.40.jpeg",
        "sourceSHA256": "2ab0cc19a4b6b3d7beb3d898dec0d174eb38c757782df5e4abf493b3eefc3e00",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-026.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.41 (2).jpeg",
        "sourceSHA256": "3e13eaa7de7c7fde8aff144f068a6e427fba158e5b47bffe64785b4545aedee6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-029.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.42 (2).jpeg",
        "sourceSHA256": "867bf0aa9e21c1633c6de3a83f14e013a34ead7c2fa6480affab2d2f974e7ec2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-030.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.42 (3).jpeg",
        "sourceSHA256": "b2b7f1f8ac366dbba03bd0aa044491ea6c242323ce6c3029973579e843f8b4c1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-032.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.42 (5).jpeg",
        "sourceSHA256": "2b11c7c7ef9812d1fcdab2d4eefbed1a8d076fcea7bdcf8fa6c5daac3f0985d5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-033.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.42 (6).jpeg",
        "sourceSHA256": "5f6344312b9c786052bfc49c0bcc58e7678238a3a5d51d29954c736c78babc37",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-034.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.42 (7).jpeg",
        "sourceSHA256": "9a55441ee704188b7288e4e9c16b0a0c252407e21e1a61888b0be4e72c29b3ae",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-036.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.43 (1).jpeg",
        "sourceSHA256": "14e123fecd7d94fdf6e20adeb90b0be82fbe0eba511cefc1be457a5b66338de0",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-037.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.43.jpeg",
        "sourceSHA256": "15ab957a69d399a717b11aee89cd28c84aeb7d5be6f3c5b7153c86b9baff925d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-038.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.45 (1).jpeg",
        "sourceSHA256": "5c8c96b51048dc91e4d2e560df5e608476dc65f6d18cb1610cf106cb6169ec89",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-039.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.45.jpeg",
        "sourceSHA256": "53575236c09d8e954f333721fa4311b8f2d42ccd45a76706fa07c13a97b5b6a9",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-046.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.48.jpeg",
        "sourceSHA256": "67ec48e8beedc280762a7a2905e20e1bf205bbbeb6cb932b06889f9bf029aeee",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-047.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.49 (1).jpeg",
        "sourceSHA256": "d17e5c3b49879e4ef0108c8647f37d1ef6eb2128e2b0c20000ec158a12f6069d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-048.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.49.jpeg",
        "sourceSHA256": "88cbdec602c553e1fa527df7c10c31c938505577985aa3a002ebec80122b092a",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-050.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.50 (2).jpeg",
        "sourceSHA256": "e1fb13731b8db2cc1d2ec477d807de925ae971e73d2ad5e07898d124d00c0b13",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-052.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.50.jpeg",
        "sourceSHA256": "23fc69755bf4d2e1e7c1e2d8a1ce11ea2dac48dbbea867621919af9f45cbe40c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-055.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.51 (3).jpeg",
        "sourceSHA256": "dec776dd36669c71303fcdb54f67f7adff818295dd7e0de050c3a3aecba75d63",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-056.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.51 (4).jpeg",
        "sourceSHA256": "902029164083657cf7d75d685d1ae16eba92750de88a9bb5d72048033be6d73e",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-058.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.51.jpeg",
        "sourceSHA256": "d0fea793ede2c946c8c203573c507223614bd06a7694ec290abace4a48ba484f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-059.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.52 (1).jpeg",
        "sourceSHA256": "5108426151c1982348472334901d4d1c00995c15a77c8fd01697fc6e0e24835d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-060.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.52 (2).jpeg",
        "sourceSHA256": "b6fe3fe04a9522e5873a788b1fb0af3e4ffced3154d7178dab74fa542bdc9b24",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-061.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.52 (3).jpeg",
        "sourceSHA256": "c25c8a97abc35aa4629f6a5749c53df8cac52ba70959271e905b2eb3a60f8b01",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-063.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.52 (5).jpeg",
        "sourceSHA256": "bdbca3916d11dd5ecb9cf19d24748953bbcc41a57c43732242e317e83738f742",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-064.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.21.52.jpeg",
        "sourceSHA256": "11496125bce771ca7c4ec51ef1b98f617310c9b87b56689e9c3d824ea1c1a94b",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-065.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.25.jpeg",
        "sourceSHA256": "a40ef033249aeec23587a15db48460a7978e8a322188aeeb60b79bdcb491e9c3",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-067.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.26 (2).jpeg",
        "sourceSHA256": "135070a335c1550c9b8fbae3bd025227abae20765de1f800cd7013a2fc43e84d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-069.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.27 (1).jpeg",
        "sourceSHA256": "f681fd31b282dab6080ad522b3039256018dd302fd328799ecc1a11eb6696aef",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-070.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.27 (2).jpeg",
        "sourceSHA256": "e6899dd11106cb39b08c496e7aaa0adb99a7054051737ddd3a3777eef0b86f61",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-075.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.30 (1).jpeg",
        "sourceSHA256": "c56e60d4089dcea0cd1851fd2b8bd09e9a2ad62fca547dab903912a60e6c2c48",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-078.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.31 (2).jpeg",
        "sourceSHA256": "e2f9d39565e96e99b12e7da3ae75fec5a65636bac7364ecfe96b16b0cf4a2e02",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-079.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.31.jpeg",
        "sourceSHA256": "23b4565f789d35ebcbe05cfc807dd5109194eaacf139553689aa4dfbdfff5c5d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-082.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.33 (1).jpeg",
        "sourceSHA256": "65be628cb40804257ddb0710df05c65c9447e4295c28c0cc47c05d3a1ce39558",
        "visitCategory": "apple-cake"
      },
      "/assets/czocha-boleslawiec/czocha-castle-085.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.34 (1).jpeg",
        "sourceSHA256": "a24d46b1ce2d5309b7b436174d734258e3d3afc07879a33b103b936a7c4eb1a0",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-087.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.34.jpeg",
        "sourceSHA256": "3fbd3529e5b5e99d60a27efc1ec6362ca921262de5ddcbfa4926f8ca8d0721a0",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-088.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.35 (1).jpeg",
        "sourceSHA256": "4c26ecd143275ae20a236f45e60b132443709d444260e3536046160605ac003f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-100.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.37 (1).jpeg",
        "sourceSHA256": "8de02d741e2663c51ca04952a89ed77682dc0f60792a4bfd5587b0b97995a1f8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-115.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.17 (1).jpeg",
        "sourceSHA256": "c0e7cd681dd07a9736ce2d9153019bd5f59e6e9094885c7533fb73f5caaf4d81",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-116.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.17 (2).jpeg",
        "sourceSHA256": "3c28fcb95f136f77b9e234ea1aa74eb5553d38e2048b46c87d74c9a4c88dd87b",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-118.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (1).jpeg",
        "sourceSHA256": "35c1bd6628b01e4c43390939dbe9c5b45199de04fb3c4a528f1ee97610370439",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-119.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (10).jpeg",
        "sourceSHA256": "df4f3166a559917c4b081d9a1ce7d198985096a8a7bc096ca3683769dec42b41",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-120.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (11).jpeg",
        "sourceSHA256": "13918aa96e91396d0b82d2530dcb4e021df366e1254493ff06d14ae6bdf620c1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-121.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (12).jpeg",
        "sourceSHA256": "f437ed579c5808229062b346f932e22b8f4bf8005fa80d8efc72bd35226b1d00",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-130.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (22).jpeg",
        "sourceSHA256": "88d90467b60b0d1d1858cdd1bdb62c24b0dfd0b85cabdb089659e97bb1072ab2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-137.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (10).jpeg",
        "sourceSHA256": "be9cb1f0c58d067d04608750fac7bd0231e62a09fde3e87f3cc4e55bc79191a2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-138.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (11).jpeg",
        "sourceSHA256": "05a44164a2d3ac5d4848165ef99fc70bd73ea6316bca0c33483b57af0bde1809",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-139.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (12).jpeg",
        "sourceSHA256": "4537df8812110f5c261e68479091de1bfb1a1d4626f662653b8bf747429d44aa",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-140.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (13).jpeg",
        "sourceSHA256": "764f11b7d52e97f29892f37f1fbcad5437c0ac530e4b536fe6b275c4b971edfc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-144.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (17).jpeg",
        "sourceSHA256": "4df74bc6a694a2434800c86084efa7ed27faed592c4040143526b5d8d55e652c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-147.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (2).jpeg",
        "sourceSHA256": "2aba8ca70e227932dfd7bfdaaeedb61eb0536c909617023b29d89a1e47079bd7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-158.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (32).jpeg",
        "sourceSHA256": "82ebe9d96684c93e3f5ffe476efe97d6d2d8dc14f84989efc46993bebd2847d1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-159.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (33).jpeg",
        "sourceSHA256": "2bec65b3a4b26b3f4f63e6a34922b99f7495ba263fc9b3ca39b3b2ab3a913eb1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-160.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (34).jpeg",
        "sourceSHA256": "9620d920f62086e96f33ffe63aef4af2cc979a482ddc90c4070fcad75e5a1a51",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-161.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (35).jpeg",
        "sourceSHA256": "fb47abbb339cd1cb9093469104af099192591c2fcd3af9bc4ff8bdf45edf7202",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-162.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (36).jpeg",
        "sourceSHA256": "c88db0adba0a194458772d2017cf9ff508bb9af9c13d124ae12dbf63ebf006db",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-163.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.21 (37).jpeg",
        "sourceSHA256": "c4508a2c8471e87fce8063926d4864395449b6420a825880bc1eb21c33502c0d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-165.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (10).jpeg",
        "sourceSHA256": "3e7de99af1d30ed61e8d5087fa936a17e0a128c25b80e6b46882dca9fb69c393",
        "visitCategory": "breakfast"
      },
      "/assets/czocha-boleslawiec/czocha-castle-166.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (11).jpeg",
        "sourceSHA256": "3b0dd2cd71cc57d47442b7a6d4ee99362a9385ce7d79506979cfa8c769d1a9b4",
        "visitCategory": "breakfast"
      },
      "/assets/czocha-boleslawiec/czocha-castle-167.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (12).jpeg",
        "sourceSHA256": "5c8de4c55542b757fa19b9880bb706a98c541a0d7d2ec96bbe54732b8cc3bd6f",
        "visitCategory": "breakfast"
      },
      "/assets/czocha-boleslawiec/czocha-castle-168.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (13).jpeg",
        "sourceSHA256": "4e47b62cc99fe760e3d28de7c5a78fa31e80e42dd8c232834fee8ecbfcdb6352",
        "visitCategory": "breakfast"
      },
      "/assets/czocha-boleslawiec/czocha-castle-169.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (14).jpeg",
        "sourceSHA256": "e76bf13074bd3d12fbc76a3f08e292f3d50473787b95111e36cdf84b804b397a",
        "visitCategory": "breakfast"
      },
      "/assets/czocha-boleslawiec/czocha-castle-172.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (18).jpeg",
        "sourceSHA256": "9d7b3eac5a65235db9dcd343bffd92b135fc1b63473a251f3ca8e136dd0c3cb2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-173.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.22 (19).jpeg",
        "sourceSHA256": "7dc9beefbf0379fb492617624a3adc0947d0277a41381f70a59b7739e7e889cb",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-180.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (1).jpeg",
        "sourceSHA256": "0ee00f4adeafac41b0386f986b03863c09f90cb3c7be2adca5dabaef907ad6a6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-181.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (11).jpeg",
        "sourceSHA256": "4d934a28d9991783ff97b7883f12b08cf35699a96a2e3cd5a7c95a05b684717d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-182.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (12).jpeg",
        "sourceSHA256": "7bbff3bc9c8b1521bc2d8dca9b59913bd4df86a7624a497aa360055366c6dae7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-183.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (13).jpeg",
        "sourceSHA256": "1c239f3d8dc9c9af4713a14fdaf7b9af6bc20b95f156a1640b01fd2f6417dd1e",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-184.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (14).jpeg",
        "sourceSHA256": "34e0dd429f49ed4626b662e19edc71939467f268ebdcc15066fd534d0c6de48d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-185.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (15).jpeg",
        "sourceSHA256": "83eaac66b167ded713c58b0a9d4d8f11e26523c3f33fa01480dda0c25edb3d92",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-186.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (16).jpeg",
        "sourceSHA256": "c22eea580bc1e56173b76c2671769a8cd9ce20b7ccacf4f445e66388e51cd9e6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-187.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (17).jpeg",
        "sourceSHA256": "f716a86442247e2e5ab0c3751ad4bd21f13bbe573d5fa49179442e0b51f18413",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-188.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.20 (9).jpeg",
        "sourceSHA256": "3e8a3998e8d6ad3d19c42bfbf0cb2f9aa13d1e29d8dae333aa526d983f4fa4c0",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-189.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (1).jpeg",
        "sourceSHA256": "900c0a5df91461a751f64608c02464232f1294f002f502f9c19a7caecd4da32b",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-190.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (10).jpeg",
        "sourceSHA256": "b81f5882b8f1dff034d16a99f597b5038e2dbdf15efa9695892e8d5c0dbffd73",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-191.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (11).jpeg",
        "sourceSHA256": "703a4ac39321402a344c8dc9eb465ca266847b5b651acd60af61625d5b7dae0c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-192.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (13).jpeg",
        "sourceSHA256": "398674438936e390b72cd6b3347b5581c42ea87bf34efe038cf2aa21b10dd4ff",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-193.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (14).jpeg",
        "sourceSHA256": "02ef3d4520b8f906fe070eaacf60fe98b7de52c97dc062dbda90c46ae22c4111",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-195.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (16).jpeg",
        "sourceSHA256": "9b58801a97db71ccc42c22a9cadcc430fa8766e863a05aa120bf324956b8f347",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-197.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (18).jpeg",
        "sourceSHA256": "e442a3272951fb4145a977c3f87b8d83ca2dfa009f7e5a54f128f7f455221f12",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-198.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (19).jpeg",
        "sourceSHA256": "75ec2e85fd930f2b2c958ce9ca30d527223fc3ffbd824cd0d594e78b9c1ea7b8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-199.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.21 (20).jpeg",
        "sourceSHA256": "751a2e2ce7e7096f19321b659935c10d3596512a027872d6b00b85f5e364f482",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-200.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.22 (1).jpeg",
        "sourceSHA256": "00f77ccd5ceeb58fba9443876ebd3b14e6680d5c806b4ce6827a67cfa898741c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-201.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.22 (10).jpeg",
        "sourceSHA256": "87eddd1b8c6cb488ab11ec8b19fdf504db6044475a3b1b18e020f64c67a63424",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-205.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.22 (2).jpeg",
        "sourceSHA256": "322c89a5bec1afb7b61bfc893b1edd0d0240037b037f753b6aad78177a2abc61",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-206.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.15.22 (7).jpeg",
        "sourceSHA256": "107838461c94fffbb692f88ca6b92cfe8949eac447e2acd9ab3620d5668bc13f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-208.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.19.57 (2).jpeg",
        "sourceSHA256": "d190bba98c52965d24cae832c61847f00cc9a7e9981aad0e2acd4bdb96e6445d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-209.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.19.57 (4).jpeg",
        "sourceSHA256": "327bac2ed92c9d448f2ac580529a317e42ccd0ee089ce6c5de9b406f5c93a785",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-210.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.23 (1).jpeg",
        "sourceSHA256": "5605ba5478d38eafd55876f52a620774308a16ffd2ae27099df2b5dd955c310c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-212.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (1).jpeg",
        "sourceSHA256": "479cb76046f50b16aeec118f1458e06729caa9d7fe3529f0b038d35045c794ac",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-213.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (10).jpeg",
        "sourceSHA256": "cb5628dc85679e72935f669f9f0c819e8136a64b3f4ced86488571867963fc25",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-214.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (11).jpeg",
        "sourceSHA256": "70107bd45172238d28ace347718a03bcbf3e47a8b28b24f77af8b338af2f4912",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-215.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (12).jpeg",
        "sourceSHA256": "38a814359bfbccfc10e22c48ceda57b6d33100dedfe7e3503344031168e38936",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-216.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (13).jpeg",
        "sourceSHA256": "1a54b4395b3fac0451ba17b7251c8023ec4b21e948e89764846cfb38b3f6c90f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-219.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (2).jpeg",
        "sourceSHA256": "c48bca674f13a7a6c6a1b3e17f1f443d8af7298ebdc3e88804d6e743cbce28ba",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-220.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (3).jpeg",
        "sourceSHA256": "e9354b853efa772930924aae7131b210d7228cae617944aa1e1fc2e4013d8412",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-221.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (4).jpeg",
        "sourceSHA256": "43189961ca9900e7ff862515c00f7eaa93a0680559988afd5f46ca6864210a8e",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-222.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (5).jpeg",
        "sourceSHA256": "b3b38db92f1c2eafbfd39bec547925d95c58a32a910992398244d7594dc706e7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-223.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (6).jpeg",
        "sourceSHA256": "d2fdccd59f5babd34c62d3063aeee981211120a681f053bd5a366e600d410973",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-224.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (7).jpeg",
        "sourceSHA256": "40645250d41b06cca47b1f1d99f0ff01d3af9ac2858558b2ab6a30602d475155",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-225.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (8).jpeg",
        "sourceSHA256": "9590683a1f093fa76f67b1ab97dac0e7324a2119a77b38a88076c374cb4244f4",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-226.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25 (9).jpeg",
        "sourceSHA256": "c51cc01b2bf56b2198737a3af975154f7c4d85adb9366403aa3beedb95717166",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-227.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.20.25.jpeg",
        "sourceSHA256": "267c95cf1d9d1d9e4023a6f4d2d1eb7dd229a7ef1159c9858b5298fb425077da",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-232.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.18 (1).jpeg",
        "sourceSHA256": "c7fed243feff8a6aae3235bc44a0dd008e6a36406810ab8bfd8c3a8c5bf586c1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-233.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.18 (2).jpeg",
        "sourceSHA256": "031fac4769734e704a4766e1fa1bd7b6bd3f62a185458316b079430184465276",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-234.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.18.jpeg",
        "sourceSHA256": "e5697281c3d4328bf6f3968aa6b90136798c570b3e570fb3d2d3a5064205eefe",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-235.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.19 (1).jpeg",
        "sourceSHA256": "a82a2571820fa24efc1935c37486fba2b61b46152c851053fcb33abc94e72edb",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-236.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.19 (2).jpeg",
        "sourceSHA256": "18e65dadceb782cf9461e83541002cdb5441e5a75f58d3cf2a0e9c9bc963bc34",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-239.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.19.jpeg",
        "sourceSHA256": "5d4eee587f8ebc167d6ab3a8f88e070669f25dd746cf366174b1048061a8b070",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-240.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.20 (1).jpeg",
        "sourceSHA256": "9eec2630b672940f8a50583c1bb650a840c5929ce3a9b52bea279a3b7d4614e1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-241.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.20 (2).jpeg",
        "sourceSHA256": "a32b6752bdd684865488966169c1643809023cd7bf59f41390663fc20ba0e74a",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-242.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.20 (3).jpeg",
        "sourceSHA256": "06131e41ac7b479d0b5dd0501a44815980c4fe574042750ecb5844e6d98eadd2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-245.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.21 (2).jpeg",
        "sourceSHA256": "0a5574c8d244c03e1293f6fc76a60e0fa1ab01876b65cacb63b9bff410d236e6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-246.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.21 (3).jpeg",
        "sourceSHA256": "3d95c732e0fee370b3da65eca5709c558a36869de45d515fd6d2617598238efc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-247.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.21.jpeg",
        "sourceSHA256": "1d031d8556e1f5c780167e1e9494a8f0da5a2feca6fdbf5ee488795eb8039891",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-249.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.22.jpeg",
        "sourceSHA256": "6bae28f24d85a17f85cfafa6d691a303271f4b4730aa05ceedbb6b485a220add",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-250.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.23 (1).jpeg",
        "sourceSHA256": "b212184288a3ef7c0015ba79bbf65adf8b3aff3a8c03d7b46f78569d6a23ba50",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-253.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.23 (4).jpeg",
        "sourceSHA256": "ec7df8055bc7f01f3d81c255452422e5352e3f3097d189ec56a6785f3df3e062",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-254.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.23.jpeg",
        "sourceSHA256": "57a5dd1af6d5059aa1bcfa7e331ce3fc186e787a2a29f9f949b914fe92f5d039",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-255.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.24 (1).jpeg",
        "sourceSHA256": "135e3feb4b1e2cd37ebc559597e9decef0e801342ae240b65ff08ee09d72bb43",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-257.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.25.jpeg",
        "sourceSHA256": "8a421fcf3ff5780ea3e65d20fcf4d878e1ac27b62b0e964ff0ea8e93f05b48f3",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-258.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.26 (1).jpeg",
        "sourceSHA256": "7ca68bc24323a2ec6934717f0c61862ad59587bd875d03d138685f9935f27695",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-259.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.26.jpeg",
        "sourceSHA256": "2f3cbd7197fd664c9ae790f2386d8130a2500eab20f4da400e66e3ed7bac1622",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-260.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.27 (1).jpeg",
        "sourceSHA256": "1fbb8b045579f09da04f0c4c6d94691ad95ccf612197cd8be48c9ed8afa8e3fc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-262.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.27 (3).jpeg",
        "sourceSHA256": "e40fd85b659f184ba4c4cd8856ded55e77959b15226cc0cc47c8d8e527878194",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-263.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.27 (4).jpeg",
        "sourceSHA256": "85ef15482fce8c3b2b6b6c8145e9f0459b0bcde9d5d871a6210e02243583a964",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-265.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.28 (1).jpeg",
        "sourceSHA256": "32d0a235b8721880d03d09202d1c0e3be3b93c721a156d612e9b97689e4154aa",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-266.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.28 (2).jpeg",
        "sourceSHA256": "15e75ef4c6e030b5b6daae06bda0f3c6c00204859c394e5756fac67734a95ee0",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-267.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.28 (3).jpeg",
        "sourceSHA256": "f0642dd07411647a39076dc5ce02b173ada0970facf0c3a49f8749c994fdedb2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-269.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.28.jpeg",
        "sourceSHA256": "d7a158f16ba44373bd279db91d23dbb21188b9092e7f2f8758b701a25f7ff2df",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-271.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.29 (2).jpeg",
        "sourceSHA256": "e2829d9037fb57a08a20a99a8cf3a8f2253b75263a321c0c9b158b92385a7c62",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-272.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.29 (3).jpeg",
        "sourceSHA256": "3219978586ef78a979aee1fd1ee9684e2f3410bec9646b8414a1dab241a8f890",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-273.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.29.jpeg",
        "sourceSHA256": "547b05ddaa470f314ed4054f51abfcf5c4b19058ca335435586ab6093916a7af",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-274.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.30 (1).jpeg",
        "sourceSHA256": "5ebb82161da7d6ec6b829ed0e7fcb252baed00e0e136a8d6d372d945ee856868",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-278.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.30.jpeg",
        "sourceSHA256": "230c3265b2e14f76aac8e40fb9242503a7988d1b9e4eb9265b6ecef24f74a9f1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-279.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.31 (1).jpeg",
        "sourceSHA256": "227238d057f567051ebf977cd956b8f44cac87e60384ef9dbea18e8fa6cc36f5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-280.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.31 (2).jpeg",
        "sourceSHA256": "f40ff9040efc8f15a499f862b57a9b48b7f67aa2555f065a1263b459846f057e",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-281.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.31 (3).jpeg",
        "sourceSHA256": "5e6bf2699bf1488f58e6a1fb085acd6b55719b7ff1a63e4e23ead2cb8767335c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-284.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.32 (1).jpeg",
        "sourceSHA256": "26cf3c0f44c434c5a1375dbccc3cfa0d195e7e5640223b702971e874f37296ad",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-286.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.32 (3).jpeg",
        "sourceSHA256": "d792fa9bc43ddeed0bc7632802a24d485fce6afc9d4509b725e71b99b5eb526c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-287.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.32 (4).jpeg",
        "sourceSHA256": "799b5044729f6f468f1ffd96cea80374e0a1f3161234f2971f9d29d081e49710",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-288.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.32.jpeg",
        "sourceSHA256": "f1a69553ac941bf1fb0bdb39a582964076bf59c47d08362ce679037f7ce716b6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-289.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.33 (1).jpeg",
        "sourceSHA256": "973dcef0d1f00a0fb838aeb7215ec68719151e32068f97805cdd1f99d116fea6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-290.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.33 (2).jpeg",
        "sourceSHA256": "40730d34bde374692ffe8ac80b45b169b2b3c41df1ac78c70868164904b9c664",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-291.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.33 (3).jpeg",
        "sourceSHA256": "84c54f019f7029c98f10c4df604787cbf9b9016d7a1d46f28951ffc37333f35c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-292.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.33 (4).jpeg",
        "sourceSHA256": "22e34067053ef24eda27a7daa2b2b373ade5c3a64574549238ed8ab6a8d3e016",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-293.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.33.jpeg",
        "sourceSHA256": "9c85690389d713bd07f8ecb578a645bf1b7fa25c63648d4fb04b1ed8646827df",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-295.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.34 (2).jpeg",
        "sourceSHA256": "157a75513020534734071afb167097bd4b3a97c19e9c827fd7ba445f9100ce09",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-296.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.34 (3).jpeg",
        "sourceSHA256": "279069b4a78a9a409fd993b211e0bf465463f30195be17db67a2324feee5ad61",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-297.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.34.jpeg",
        "sourceSHA256": "c80c6b1334d3413c5909c9776747a9e80f6eed38c9a9670293fa9158d1c1882c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-298.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.35 (1).jpeg",
        "sourceSHA256": "329e411429f714c7c7d73afb317bf5f2b6bb91ca7d2ba30424a479fa40507ee2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-299.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.35 (2).jpeg",
        "sourceSHA256": "aef99aa22d749ec7c7b8f9db862069d4792ad00fe96dbd3e1a49498f9a96496b",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-300.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.35 (3).jpeg",
        "sourceSHA256": "23305f8126c5e94d5face964046afb2ea61f6914d3abe8255072b82a9ab34a8a",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-302.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.35.jpeg",
        "sourceSHA256": "b0feca7baf5492ed046bfa5d828c30ee80314b83b32a1a33e89fd6e5c7d54895",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/czocha-castle-303.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.21.36.jpeg",
        "sourceSHA256": "49cfd03c3885c8c9616da715a6defb1390d1191e1f8077203c8b4dd27cdcb6bd",
        "visitCategory": "place-visit"
      },
      "https://youtube.com/shorts/L1Z0nIxGFsU": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Czocha Castle/WhatsApp Video 2026-09-24 at 17.21.29.mp4",
        "sourceSHA256": "97bf88e9c61b75117cfd6b7e55d6f35287e14c80c92794a6e38e8371152f6705",
        "youtube": "https://youtube.com/shorts/L1Z0nIxGFsU",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      },
      "https://youtube.com/shorts/LQZA0KUMTyM": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Czocha Castle/WhatsApp Video 2026-09-24 at 17.21.30.mp4",
        "sourceSHA256": "19083b2e568bfeb19434b0c6220920ca7e327033fb6799f357d43d0281d36e69",
        "youtube": "https://youtube.com/shorts/LQZA0KUMTyM",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},{
  "id": "lesnianska-dam",
  "localName": "Zapora Leśniańska",
  "aliases": [],
  "name": {
    "he": "סכר לשנה ואגם לשניאנסקיה",
    "en": "Leśniańska Dam and reservoir",
    "pl": "Zapora Leśniańska i jezioro",
    "de": "Marklissa-Talsperre und Stausee",
    "cs": "Leśniańská přehrada a nádrž"
  },
  "description": {
    "he": "הסכר שעל נהר הקוויסה הוא יעד ההליכה שלנו בבוקר שאחרי הלינה בטירה. יוצאים אחרי ארוחת הבוקר, נהנים ממראות האגם והעמק וחוזרים לטירה לאסוף את הרכב לפני ההמשך לבולסלבייץ.",
    "en": "The dam on the Kwisa is our morning walk after the castle overnight stay. Set out after breakfast, enjoy the reservoir and valley views, then return to the castle for the car before continuing to Bolesławiec.",
    "pl": "Zapora na Kwisie jest celem naszego porannego spaceru po noclegu w zamku. Wyruszamy po śniadaniu, oglądamy jezioro i dolinę, a następnie wracamy do zamku po samochód przed wyjazdem do Bolesławca.",
    "de": "Die Talsperre an der Queis ist das Ziel unseres Morgenspaziergangs nach der Burgübernachtung. Nach dem Frühstück geht es zu See und Talblick, danach zurück zur Burg zum Auto und weiter nach Bolesławiec.",
    "cs": "Přehrada na Kwise je cílem ranní procházky po přenocování na hradě. Vyrazíme po snídani, užijeme si výhledy na nádrž a údolí a vrátíme se k hradu pro auto před cestou do Bolesławce."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "lesna",
    "coordinates": {
      "lat": 51.0306373,
      "lng": 15.2907543
    }
  },
  "categories": [
    "historical-landmark",
    "nature"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "original-photography"
    ]
  },
  "links": {
    "website": "https://lesna.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Zapora+Le%C5%9Bnia%C5%84ska"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://lesna.pl/",
        "checkedAt": "2026-10-16"
      },
      {
        "type": "coordinates",
        "url": "https://www.openstreetmap.org/way/221036091",
        "checkedAt": "2026-10-16"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/czocha-boleslawiec/lesnianska-dam-093.jpg",
      "/assets/czocha-boleslawiec/lesnianska-dam-096.jpg",
      "/assets/czocha-boleslawiec/lesnianska-dam-126.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/uFeL9yIz0VM"
    ],
    "metadata": {
      "/assets/czocha-boleslawiec/lesnianska-dam-093.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.36 (2).jpeg",
        "sourceSHA256": "93dacdfeacd9798017a43369aa2dbe59a340c5aa2a2cb97496eef3a9ed1d3a63",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/lesnianska-dam-096.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 17.23.36 (5).jpeg",
        "sourceSHA256": "7a6b00c06423af53bef3416a8a1f4290624291f9ca6ef5274aca920a726658ea",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/lesnianska-dam-126.jpg": {
        "original": true,
        "sourceFile": "Czocha Castle/WhatsApp Image 2026-09-24 at 19.12.19 (18).jpeg",
        "sourceSHA256": "9170e075d6a7917319279bd9ddb428d50d98dbc5c0598e289f80b19cba8bb3dd",
        "visitCategory": "place-visit"
      },
      "https://youtube.com/shorts/uFeL9yIz0VM": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Czocha Castle/WhatsApp Video 2026-09-24 at 17.21.27.mp4",
        "sourceSHA256": "992a5c6cc5dc945c1ee44b329bc1c9f514fad711c304f5a5ee6c23295751a12d",
        "youtube": "https://youtube.com/shorts/uFeL9yIz0VM",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},{
  "id": "boleslawiec-old-town",
  "localName": "Rynek i stare miasto w Bolesławcu",
  "aliases": [],
  "name": {
    "he": "בולסלבייץ, הכיכר והעיר העתיקה",
    "en": "Bolesławiec market square and old town",
    "pl": "Rynek i stare miasto w Bolesławcu",
    "de": "Marktplatz und Altstadt von Bolesławiec",
    "cs": "Náměstí a historické centrum Bolesławce"
  },
  "description": {
    "he": "אחרי הסכר ממשיכים לבולסלבייץ. מטיילים בכיכר ובין חזיתות הבתים, מגלים את הפרטים הקרמיים בעיר ומשלבים את מוזיאון הקרמיקה לפני החזרה לוורוצלב.",
    "en": "After the dam we continue to Bolesławiec. Walk through the square and colourful streets, look for ceramic details around town and include the Ceramics Museum before returning to Wrocław.",
    "pl": "Po spacerze przy zaporze jedziemy do Bolesławca. Spacerujemy po rynku i uliczkach, wypatrujemy ceramicznych detali i odwiedzamy Muzeum Ceramiki przed powrotem do Wrocławia.",
    "de": "Nach dem Besuch der Talsperre fahren wir nach Bolesławiec. Marktplatz, bunte Häuser und keramische Details lassen sich mit dem Keramikmuseum verbinden, bevor es zurück nach Wrocław geht.",
    "cs": "Po návštěvě přehrady pokračujeme do Bolesławce. Projdeme náměstí a barevné uličky, všímáme si keramických detailů a před návratem do Vratislavi navštívíme Muzeum keramiky."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "boleslawiec",
    "coordinates": {
      "lat": 51.262998,
      "lng": 15.564833
    }
  },
  "categories": [
    "historical-landmark",
    "architecture"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "original-photography"
    ]
  },
  "links": {
    "website": "https://boleslawiec.eu/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Rynek+i+stare+miasto+w+Boles%C5%82awcu"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://boleslawiec.eu/",
        "checkedAt": "2026-10-16"
      },
      {
        "type": "coordinates",
        "url": "https://dolnoslaskie.szlaki.pttk.pl/2523-dolnoslaskie-boleslawiec-rynek-i-ratusz",
        "checkedAt": "2026-10-16"
      }
    ]
  },
  "media": {
    "guideVideos": {"he": "https://youtube.com/shorts/0OvV3ic5ukk", "en": "https://youtube.com/shorts/WUcLYYodyrg"},
    "photos": [
      "/assets/czocha-boleslawiec/boleslawiec-old-town-069.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-001.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-002.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-008.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-009.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-015.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-023.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-024.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-027.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-031.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-032.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-061.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-066.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-067.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-074.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-075.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-080.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-081.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-082.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-084.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-087.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-091.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-092.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-093.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-095.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-108.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-110.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-134.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-139.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-140.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-old-town-141.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/YMyuRk3Fm7o",
      "https://youtube.com/shorts/ut4a1jalggk",
      "https://youtube.com/shorts/8omNiWR6tVI",
      "https://youtube.com/shorts/lu3GKpKwjE4"
    ],
    "metadata": {
      "/assets/czocha-boleslawiec/boleslawiec-old-town-069.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.16 (1).jpeg",
        "sourceSHA256": "d25d8f2ce39ac01ce14a37cb560519d705e35b076f2dd4908867d5c99f75a365",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-001.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.26.jpeg",
        "sourceSHA256": "6cb6169e2a677cd587c3c5a5cdfecb788c55603598a087d4282e00319c474f13",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-002.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.27 (1).jpeg",
        "sourceSHA256": "c9bdfaf96c3ff0381f82d049912f282be68709e18004129687bca4e6ecd0b4cc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-008.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.30.jpeg",
        "sourceSHA256": "b71066cb603c2e0e799fe7ad71fda36f5308eb82d793f5fbf1a743e07efd64d2",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-009.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.31 (1).jpeg",
        "sourceSHA256": "d5a8e3ef2affb40276e69c3d6abb41fc4d47232bd784e8f80375f67d379bce8d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-015.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.40 (1).jpeg",
        "sourceSHA256": "22308c88eb8f815cc458a7bebd73c2e344b1a2a009ac8d33fd7b9e7339840abc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-023.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.45 (1).jpeg",
        "sourceSHA256": "b38753584ecfddfed25719679942c8ad57367b953d4da37b55fe264d46cbe98f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-024.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.45 (2).jpeg",
        "sourceSHA256": "c6c6ab27cfef6376233ec430a0e11cb167baf271b7a92ad6579c2a497ecb5567",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-027.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.46 (2).jpeg",
        "sourceSHA256": "72e29c13cbbb5aff290f2c132c427109df8834f4cdbf1fa970f98939f07c1e98",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-031.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.47 (2).jpeg",
        "sourceSHA256": "f86e3fbd70a1a07de5787b5a36b3be11780c1a7d1a918195b1505bde7e4bef10",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-032.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.47 (3).jpeg",
        "sourceSHA256": "bb75f46794dd08a2254e6b4bbf72ad9316da001b7034ce5bce0fa1d9e36a4400",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-061.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.11 (1).jpeg",
        "sourceSHA256": "7703bc595d8fe84ae0668ea09248bdb5941826d857bce775781489bff55b0f03",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-066.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.13 (1).jpeg",
        "sourceSHA256": "5269cb636fbc93e77e72348210715817dc42f7a2267bc0e9404b9bbf328f42b7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-067.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.13 (2).jpeg",
        "sourceSHA256": "3a009487fde383626476dd2aa9ed09e9d848ea5a3cf6a1ca08b7f536e039a759",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-074.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.19 (2).jpeg",
        "sourceSHA256": "16cda5ab975147919a25fdca8706e2588693bc8a9a06b5e0d699b81bd4e4f4e5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-075.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.19 (3).jpeg",
        "sourceSHA256": "147bd6f44130e252a17c64d0d4d24906dc29488c32cc3525d2b09b8b9e3eaaf6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-080.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.23 (2).jpeg",
        "sourceSHA256": "8ea5f7b4ce140a0fc74ec7feb9bb21e98d0f1bfd33423e051e41e5c0ffa1f2f5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-081.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.23.jpeg",
        "sourceSHA256": "9ef3db81f64866bb8a972fc3d8de80c89fa9d450fa77951242f6efe77c5822f1",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-082.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.24 (1).jpeg",
        "sourceSHA256": "09833e29dc7cdc20c787492027b67532684cc3d72e88e318e390ccd957936a19",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-084.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.21.25.jpeg",
        "sourceSHA256": "8cc7d29d6ad881f6e5b49b4425e407b4ed28185180dd1ce49800b77056add0ff",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-087.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.26 (7).jpeg",
        "sourceSHA256": "caf8330dc48b327b195fe217722e11e30cb54b1a5359b51caef9c0bf38f74a70",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-091.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (10).jpeg",
        "sourceSHA256": "6aa5968e89d99d6bb11f1dcd318250429a0b8fd48decab3c5998039162b693cc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-092.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (11).jpeg",
        "sourceSHA256": "8eac7015836d60e827f877d5266c88982d4f74449263ecf0c418b09794399147",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-093.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (12).jpeg",
        "sourceSHA256": "e8f41be1b2ef099b95105ad7056e5fdfbe65d27a75bb9f2fbf153e0ac39f9ade",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-095.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (14).jpeg",
        "sourceSHA256": "61f4ee685c3e4d1c6ca6476bf92758faf082bba2494226dbe27c2881b5f028ed",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-108.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (6).jpeg",
        "sourceSHA256": "b3926894856dce1fc9e0b536ea67a6f85a4500d880bcf9c740de191e50e2e0f9",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-110.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (8).jpeg",
        "sourceSHA256": "2b0ba90906a4b3ddca5db2f0bc3f8c80029c1c5a859113ab241d58c905e1f2e8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-134.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (18).jpeg",
        "sourceSHA256": "aee4d5f60ed432f0bda4226d73a2460534f7a666d6820a6aa9dabbe25b30a655",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-139.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (22).jpeg",
        "sourceSHA256": "eb1751e0eaa1b82646fce0e2b12b931ba40d729a2c20e1e501f684f9992a83ab",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-140.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (23).jpeg",
        "sourceSHA256": "64c83dd072181942c0052fb49b5e85721c46612bd4c61c728689292be51870be",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-old-town-141.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (24).jpeg",
        "sourceSHA256": "e8eea2bf55f576730b7a4fe35418b09d4feb4e3d5384730623061c1ded94f443",
        "visitCategory": "place-visit"
      },
      "https://youtube.com/shorts/YMyuRk3Fm7o": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Bolesławiec/המדריך שלנו/WhatsApp Video 2026-09-24 at 17.19.29.mp4",
        "sourceSHA256": "587e176be26333a025bedb18b4c93c59ff55694cc365cccd2e0a0fdf392e9ca8",
        "youtube": "https://youtube.com/shorts/YMyuRk3Fm7o",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      },
      "https://youtube.com/shorts/ut4a1jalggk": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Bolesławiec/המדריך שלנו/WhatsApp Video 2026-09-24 at 17.19.32.mp4",
        "sourceSHA256": "f198e172d163a2d281f65a8fdbf79c18428d81d04507ac022403db13a2d0a545",
        "youtube": "https://youtube.com/shorts/ut4a1jalggk",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      },
      "https://youtube.com/shorts/8omNiWR6tVI": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Bolesławiec/המדריך שלנו/WhatsApp Video 2026-09-24 at 17.21.15.mp4",
        "sourceSHA256": "76a039676a2fb6b68a239da490a1481210586482dba17d6c8996c32a611f2d7d",
        "youtube": "https://youtube.com/shorts/8omNiWR6tVI",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      },
      "https://youtube.com/shorts/lu3GKpKwjE4": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Bolesławiec/המדריך שלנו/WhatsApp Video 2026-09-24 at 17.21.21.mp4",
        "sourceSHA256": "72a1b97ada2cab7669d3721a718b239db50eebe8c7747e78c6d94455850e64a0",
        "youtube": "https://youtube.com/shorts/lu3GKpKwjE4",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},{
  "id": "boleslawiec-ceramics-museum",
  "localName": "Muzeum Ceramiki w Bolesławcu",
  "aliases": [],
  "name": {
    "he": "מוזיאון הקרמיקה בבולסלבייץ",
    "en": "Ceramics Museum in Bolesławiec",
    "pl": "Muzeum Ceramiki w Bolesławcu",
    "de": "Keramikmuseum in Bolesławiec",
    "cs": "Muzeum keramiky v Bolesławci"
  },
  "description": {
    "he": "ביקור במוזיאון הקרמיקה משלים את ההיכרות עם בולסלבייץ. בגלריה נמצאים צילומי התצוגות, כלי הקרמיקה והבניין מהביקור שלנו. לפני הנסיעה יש לבדוק שעות פתיחה וכרטיסים באתר המוזיאון.",
    "en": "The Ceramics Museum adds context to our Bolesławiec visit. Our photographs show the exhibitions, ceramic pieces and museum building. Check current opening hours and tickets on the museum website before travelling.",
    "pl": "Muzeum Ceramiki dopełnia spacer po Bolesławcu. Nasze zdjęcia pokazują wystawy, wyroby ceramiczne i budynek muzeum. Przed wyjazdem sprawdź aktualne godziny otwarcia i bilety na stronie muzeum.",
    "de": "Das Keramikmuseum ergänzt unseren Besuch in Bolesławiec. Unsere Fotos zeigen Ausstellungen, Keramikstücke und das Museumsgebäude. Aktuelle Öffnungszeiten und Eintrittskarten vorab auf der Museumsseite prüfen.",
    "cs": "Muzeum keramiky doplňuje naši návštěvu Bolesławce. Fotografie ukazují expozice, keramické předměty a budovu muzea. Před cestou si ověřte aktuální otevírací dobu a vstupenky na webu muzea."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "boleslawiec",
    "coordinates": {
      "lat": 51.265045,
      "lng": 15.5556335
    }
  },
  "categories": [
    "museum",
    "culture"
  ],
  "taxonomy": {
    "tags": [
      "excursion",
      "outside-wroclaw",
      "original-photography"
    ]
  },
  "links": {
    "website": "https://muzeum.boleslawiec.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=Muzeum+Ceramiki+w+Boles%C5%82awcu"
    }
  },
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "type": "official",
        "url": "https://muzeum.boleslawiec.pl/",
        "checkedAt": "2026-10-16"
      },
      {
        "type": "coordinates",
        "url": "https://muzeum.boleslawiec.pl/dojazd-muzeum/",
        "checkedAt": "2026-10-16"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-058.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-057.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-037.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-038.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-039.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-041.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-042.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-043.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-044.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-045.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-046.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-047.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-048.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-049.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-052.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-053.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-055.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-060.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-099.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-100.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-102.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-103.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-104.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-113.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-114.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-115.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-117.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-118.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-119.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-122.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-123.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-124.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-125.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-136.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-144.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-145.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-147.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-148.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-149.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-150.jpg",
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-152.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/AREkvigE0pI"
    ],
    "metadata": {
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-058.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.56 (2).jpeg",
        "sourceSHA256": "4e32cdfeb13eeb1d601baf4620e6bf455dc1d7fc57b0c4016e03e2ea7d376ae5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-057.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.56 (1).jpeg",
        "sourceSHA256": "83a6a7b38f4af029cbac3fd02034e1cb7339ab0e9e5b6f5768ca394e54374a5b",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-037.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.49 (1).jpeg",
        "sourceSHA256": "cba321f76545b5113c536cd3be4c08a65253db57faab265d7b439caa155c2852",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-038.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.49.jpeg",
        "sourceSHA256": "b31d6a39d8a66fd17b4450aa413b4c3a346e9f2b350cb09ab494f76e6425f8da",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-039.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.50 (1).jpeg",
        "sourceSHA256": "f673d1756c4cb47fdd7812131e44fe729a18ce1fbb94812e3ce7b583637b48bc",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-041.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.50 (3).jpeg",
        "sourceSHA256": "f34bfd89726f7478052182cae3466d8ed71fe468117a732292ee463816bfd065",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-042.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.50.jpeg",
        "sourceSHA256": "496cb1fc1a8a54b702007cf3e1dfdd07b48d28b3c738816c26d9079c0ef2253f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-043.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (1).jpeg",
        "sourceSHA256": "5ab75198889e019193f4ab2a325a257ca5372192ac4cec793636bc38afe2c0ba",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-044.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (2).jpeg",
        "sourceSHA256": "74a067a959a1a2d98942315a76df79f77f49d47be145ba06550bcd10264b56b8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-045.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (3).jpeg",
        "sourceSHA256": "e645bfe8a81b0580778d5f13d22cd900b27a99446cf36646ea394352ce733526",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-046.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (4).jpeg",
        "sourceSHA256": "c4b832b8bf34ea4661e44288127c764ce60fa10f35ecf7a013e8a83871041d0f",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-047.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (5).jpeg",
        "sourceSHA256": "471343b7960bbd87b11fc0d57b9c5fa4c2d98615acc3ed0a6087113c25763e08",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-048.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (6).jpeg",
        "sourceSHA256": "e60c65a087052ada7b40fedba5c2b35fef20978b45baf4019a192bae595cf413",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-049.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.51 (7).jpeg",
        "sourceSHA256": "ea45259dc477ba71e2afbd39f22b7796c854adf2b0745271baca34ed29831dc9",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-052.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.52 (2).jpeg",
        "sourceSHA256": "24b91672c26e84f5b1e933d888e2dab98944c2823188c96a39a630fcbf521f52",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-053.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.52.jpeg",
        "sourceSHA256": "45f960bebc1361238bd6c23d35bfd0e5c88ead60fbe3449ef7791f8305634bdd",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-055.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.55 (2).jpeg",
        "sourceSHA256": "b08bbf4eb8a09981cb1b5e5b239d0969dc783e4f39a77e9598910ffa149fad0c",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-060.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 17.19.56 (4).jpeg",
        "sourceSHA256": "867342abc7df6471a2c16726ee9d1c594d4c6c6166cf348fd9e5716bb1b5d437",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-099.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (18).jpeg",
        "sourceSHA256": "bfba31d4be9b882cb1b9342e51c1d89326ac463200f1800348b01b78a4a48064",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-100.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (19).jpeg",
        "sourceSHA256": "8100edba8f0573e154166b8af050844d214dd95677e177f170eda42bbe7f60b7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-102.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (20).jpeg",
        "sourceSHA256": "4005b123653706f327245e0e139344d618fc410c11c4096a7335eeba9c755c5a",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-103.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (21).jpeg",
        "sourceSHA256": "3c0e95fe7faba714808603e3338e079a34c4d17af67e9d6577f0527be65d911d",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-104.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.29 (22).jpeg",
        "sourceSHA256": "142669abde06bfcd65934315f91a6126e5e3467d2394008a114194eb404b65b8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-113.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (1).jpeg",
        "sourceSHA256": "5f5ba26ea705e484ac602a0fccb27b095b313b2df38813d448cf7cb6243cd61b",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-114.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (10).jpeg",
        "sourceSHA256": "25b210603a437a05336c5f93b0c5439b509ad1a16638bf444e954b7b627f83ab",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-115.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (11).jpeg",
        "sourceSHA256": "07726cadeb25f4c28992703298c279c2875f94e4a3d6cf7ddf49e86a6c8c62a6",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-117.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (3).jpeg",
        "sourceSHA256": "1700fbbe1a1974ecb243a6d4437d9449a799e17f8f305f764a8256e88e997595",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-118.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (4).jpeg",
        "sourceSHA256": "602044c7eea45632af56a0cb9c942c191ab03f6d2bcfaff72a49028e04b562a7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-119.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (5).jpeg",
        "sourceSHA256": "bd26e1728c509cef43f6c436033724a677a99f424b29108a204b68ca4f870e91",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-122.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (8).jpeg",
        "sourceSHA256": "e41476e0a7d20d366c4653ca81c71d767b35d50a33679d6c9e8702729251e2af",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-123.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30 (9).jpeg",
        "sourceSHA256": "6c89d484636925332f35e393f8be8f02a1e7fdc51d71e0d07376ca6daecee2a5",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-124.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.30.jpeg",
        "sourceSHA256": "81ea1e9aa363c00da11deb29273addc23221f755b28922a3a5159c74fa02bafd",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-125.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (1).jpeg",
        "sourceSHA256": "856c7376a44d2a6feb242a2736ef702281c58ffe29557ed22d677b83da868c7e",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-136.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (2).jpeg",
        "sourceSHA256": "40ab73bc68c03abd4e78c022974bdd31f0fe50ace4171b4f70be4d1697593c88",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-144.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (3).jpeg",
        "sourceSHA256": "5715bb938df0e7f1e6ba42d9f99948c884b8d6d6d552e8c4cad36198200e6fdf",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-145.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (4).jpeg",
        "sourceSHA256": "ed3309312fd4aff4de595b0de4795d21d55c0f23b82712ec71e3767edc6cc7b7",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-147.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (6).jpeg",
        "sourceSHA256": "cc2b7eb7c644ad8272a7f036ca3ea7afa2318d7310e92c7a40388dbf53950657",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-148.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (7).jpeg",
        "sourceSHA256": "7884584d02a37793fefacee9f63432f8eb8ec74ea9ddd2c2c2278419bcd01ed8",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-149.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (8).jpeg",
        "sourceSHA256": "5dd04ef5c1a3e6d924b1c9215ddd1b09413bbe9f701bf087a9d2ce43a5e85343",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-150.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-09-24 at 19.20.31 (9).jpeg",
        "sourceSHA256": "730c9f9ceb1c274bd5a394fb7c5309c16071916624ed250633b333a031826a46",
        "visitCategory": "place-visit"
      },
      "/assets/czocha-boleslawiec/boleslawiec-ceramics-museum-152.jpg": {
        "original": true,
        "sourceFile": "Bolesławiec/WhatsApp Image 2026-10-05 at 18.25.00 (1).jpeg",
        "sourceSHA256": "bade5554336fc85ab7f14651b5baefa1745e6cade2cdfee89a73909826411058",
        "visitCategory": "place-visit"
      },
      "https://youtube.com/shorts/AREkvigE0pI": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Bolesławiec/המדריך שלנו/WhatsApp Video 2026-09-24 at 17.19.53.mp4",
        "sourceSHA256": "9988168ea94035f98d6dd4a4ec4b7fc83f5adfa2d4c77e36d8e16e8eadcaf0d7",
        "youtube": "https://youtube.com/shorts/AREkvigE0pI",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "pizza-si",
  "localName": "Pizza Si",
  "name": {
    "he": "פיצה סי",
    "en": "Pizza Si",
    "pl": "Pizza Si",
    "de": "Pizza Si",
    "cs": "Pizza Si"
  },
  "description": {
    "he": "פיצרייה איטלקית ברחוב בוגוסלבסקייגו, מתחת למסילת הרכבת. בגלריה תמונות מהארוחה שלנו, עם פיצה וסלט.",
    "en": "Italian pizzeria on Bogusławskiego Street beneath the railway. Our visit gallery shows pizza and salad.",
    "pl": "Włoska pizzeria przy ulicy Bogusławskiego, pod nasypem kolejowym. Galeria z naszej wizyty przedstawia pizzę i sałatkę.",
    "de": "Italienische Pizzeria an der Straße Bogusławskiego unter dem Bahndamm. Unsere Besuchsgalerie zeigt Pizza und Salat.",
    "cs": "Italská pizzerie v ulici Bogusławskiego pod železničním náspem. Galerie z naší návštěvy ukazuje pizzu a salát."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.0999236,
      "lng": 17.0299738
    },
    "address": {
      "street": "Bogusławskiego 89-91",
      "postalCode": "50-031",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat"
  ],
  "links": {
    "website": "https://pizza-si.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.0999236%2C17.0299738",
      "appleMaps": "https://maps.apple.com/?ll=51.0999236,17.0299738"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "url": "https://pizza-si.pl/",
        "verifiedAt": "2026-10-17"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/food-cafes/pizza-si-01.jpg",
      "/assets/food-cafes/pizza-si-02.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/food-cafes/pizza-si-01.jpg": {
        "original": true,
        "sourceFile": "פיצה סי/WhatsApp Image 2026-10-01 at 09.23.56 (5).jpeg",
        "sourceSHA256": "691310b7126801e837f99c94c249a0e1a8391d0dcc069532fc9e386a68a076e4",
        "heroCandidate": true,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/pizza-si-02.jpg": {
        "original": true,
        "sourceFile": "פיצה סי/WhatsApp Image 2026-07-30 at 16.04.00 (1).jpeg",
        "sourceSHA256": "72c226c7894e434dd623109a1c6ed990c9d4df2b505973f1dd9d3166dcfb3389",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "czarna-magia",
  "localName": "Czarna Magia",
  "name": {
    "he": "צ׳ארנה מגיה",
    "en": "Czarna Magia Café",
    "pl": "Czarna Magia",
    "de": "Café Czarna Magia",
    "cs": "Kavárna Czarna Magia"
  },
  "description": {
    "he": "בית קפה וארוחות בוקר בעיר העתיקה, סמוך לכיכר השוק. בגלריה מהביקור שלנו תמצאו את שלט המקום, חלל הישיבה המקומר, קפה וארוחת בוקר.",
    "en": "An Old Town café and breakfast spot near Market Square. Our visit gallery includes the café sign, vaulted seating area, coffee and breakfast.",
    "pl": "Kawiarnia i miejsce na śniadanie na Starym Mieście, niedaleko Rynku. Galeria z naszej wizyty pokazuje szyld, sklepione wnętrze, kawę i śniadanie.",
    "de": "Café und Frühstückslokal in der Altstadt nahe dem Rynek. Unsere Besuchsgalerie zeigt das Schild, den gewölbten Gastraum, Kaffee und Frühstück.",
    "cs": "Kavárna se snídaněmi ve Starém Městě poblíž Rynku. Galerie z naší návštěvy ukazuje vývěsní štít, klenutý interiér, kávu a snídani."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1101717,
      "lng": 17.02932
    },
    "address": {
      "street": "Kiełbaśnicza 2",
      "postalCode": "50-108",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat",
    "drink"
  ],
  "links": {
    "website": "https://www.facebook.com/czarnamagiacafe/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1101717%2C17.02932",
      "appleMaps": "https://maps.apple.com/?ll=51.1101717,17.02932"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "url": "https://dialogfestival.pl/en/recommended-places/",
        "verifiedAt": "2026-10-17"
      },
      {
        "url": "https://www.openstreetmap.org/node/6402930598",
        "verifiedAt": "2026-10-17",
        "scope": "coordinates"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/food-cafes/czarna-magia-01.jpg",
      "/assets/food-cafes/czarna-magia-02.jpg",
      "/assets/food-cafes/czarna-magia-03.jpg",
      "/assets/food-cafes/czarna-magia-04.jpg",
      "/assets/food-cafes/czarna-magia-05.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/food-cafes/czarna-magia-01.jpg": {
        "original": true,
        "sourceFile": "צארנה מגיה/WhatsApp Image 2026-10-05 at 18.28.04 (7).jpeg",
        "sourceSHA256": "49eb4c1561364ef9bc81e25599c275587f600412e9eec26fac0d65e929e50a03",
        "heroCandidate": true,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/czarna-magia-02.jpg": {
        "original": true,
        "sourceFile": "צארנה מגיה/WhatsApp Image 2026-10-01 at 09.20.41.jpeg",
        "sourceSHA256": "042f0d6af17d964639172219be30c8e702ccdd0802a0ce8593850db48238ed0e",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/czarna-magia-03.jpg": {
        "original": true,
        "sourceFile": "צארנה מגיה/WhatsApp Image 2026-10-01 at 09.20.40.jpeg",
        "sourceSHA256": "aec58c502e95105630c5a351b48d1a40e8585d4987e15d32b66523fd288772df",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/czarna-magia-04.jpg": {
        "original": true,
        "sourceFile": "צארנה מגיה/WhatsApp Image 2026-10-01 at 09.20.41 (3).jpeg",
        "sourceSHA256": "cb108846381312ba4c0cd3b0e6a07c20bf314cc5a70b55f10d1436c514301e25",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/czarna-magia-05.jpg": {
        "original": true,
        "sourceFile": "צארנה מגיה/WhatsApp Image 2026-10-01 at 09.20.40 (1).jpeg",
        "sourceSHA256": "09c44cc76fd3f4d0fce754475ae896bf455ac66e7984b7029ac1463dab615f08",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "mala-czarna-paderewskiego",
  "aliases": [
    "mala-czarna",
    "Mała Czarna",
    "Mala Czarna",
    "מאלה צארנה",
    "מלה צארנה"
  ],
  "localName": "Mała Czarna",
  "name": {
    "he": "מאלה צארנה",
    "en": "Mała Czarna Café",
    "pl": "Mała Czarna",
    "de": "Café Mała Czarna",
    "cs": "Kavárna Mała Czarna"
  },
  "description": {
    "he": "בית קפה ובית קלייה ליד שער הכניסה למתחם האצטדיון האולימפי. בגלריה מהביקור שלנו תמצאו את דלפק המקום, מדפי הקפה וכוסות הקפה.",
    "en": "A café and local coffee roastery by the entrance gate to the Olympic Stadium complex. Our visit gallery shows the café counter, coffee shelves and cups of coffee.",
    "pl": "Kawiarnia i lokalna palarnia kawy przy bramie kompleksu Stadionu Olimpijskiego. Galeria z naszej wizyty pokazuje ladę, półki z kawą i czarki z kawą.",
    "de": "Café und lokale Kaffeerösterei am Eingang zum Olympiastadion-Komplex. Unsere Besuchsgalerie zeigt die Theke, Kaffeeregale und Kaffeetassen.",
    "cs": "Kavárna a místní pražírna kávy u vstupní brány do areálu Olympijského stadionu. Galerie z naší návštěvy ukazuje pult, police s kávou a šálky kávy."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1174365,
      "lng": 17.0905595
    },
    "address": {
      "street": "al. Ignacego Jana Paderewskiego 35",
      "postalCode": "51-612",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat",
    "drink"
  ],
  "links": {
    "website": "https://malaczarna.coffee/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1174365%2C17.0905595",
      "appleMaps": "https://maps.apple.com/?ll=51.1174365,17.0905595"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "branchConfirmedByOwnerAt": "2026-10-17",
    "factualSources": [
      {
        "url": "https://malaczarna.coffee/kawiarnie/",
        "verifiedAt": "2026-10-17",
        "scope": "official café address in indexed listing; branch confirmed by owner"
      },
      {
        "url": "https://www.openstreetmap.org/node/4780068506",
        "verifiedAt": "2026-10-17",
        "scope": "café coordinates and street number, live Overpass lookup"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/food-cafes/mala-czarna-01.jpg",
      "/assets/food-cafes/mala-czarna-02.jpg"
    ],
    "videos": ["https://youtube.com/watch?v=xUGky_l826A"],
    "metadata": {
"https://youtube.com/watch?v=xUGky_l826A": {
  "original": true,
  "sourceFile": "מלה צארנה/WhatsApp Video 2026-10-01 at 09.26.16 (1).mp4",
  "sourceSHA256": "7d1870fe0c44bcac241dc3d0d867c2498e5450bf99ea7e3675fb8ac7e1c05a48",
  "publicationSHA256": "676da979ea5256a00a02ac33d74f5670367498f4f3119f5fc059a7c68b7018f7",
  "audio": "removed from publication copy; original preserved",
  "status": "public",
  "verifiedAt": "2026-10-17"
},
      "/assets/food-cafes/mala-czarna-01.jpg": {
        "original": true,
        "sourceFile": "מלה צארנה/WhatsApp Image 2026-09-24 at 17.26.00 (6).jpeg",
        "sourceSHA256": "2c44bf859c22f74c180153b6f6ad30739346a612bcd36a69200c99254022bb0d",
        "heroCandidate": true,
        "visitCategory": "food-and-cafe"
      },
      "/assets/food-cafes/mala-czarna-02.jpg": {
        "original": true,
        "sourceFile": "מלה צארנה/WhatsApp Image 2026-09-24 at 19.09.56 (1).jpeg",
        "sourceSHA256": "4c51e2f12d2d71b145e4ef1da3dec2a4664de78e621ca05ce1fed6f6e1381068",
        "heroCandidate": false,
        "visitCategory": "food-and-cafe"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "lodziarnia-roma",
  "localName": "Lodziarnia Roma",
  "name": {
    "he": "גלידריית רומא",
    "en": "Lodziarnia Roma",
    "pl": "Lodziarnia Roma",
    "de": "Eisdiele Roma",
    "cs": "Zmrzlinárna Roma"
  },
  "description": {
    "he": "גלידרייה בשכונת נדאודז׳ה. בגלריה תמונות וסרטונים מהביקור שלנו, עם ויטרינת הגלידות, תפריט הביקור וחזית המקום. הטעמים והמחירים המופיעים בצילומים משקפים את מועד הביקור.",
    "en": "An ice-cream shop in Nadodrze. Our visit gallery shows the ice-cream counter, the menu from our visit and the exterior. Flavours and prices shown reflect the visit date.",
    "pl": "Lodziarnia na Nadodrzu. W galerii z naszej wizyty są zdjęcia i filmy lady z lodami, ówczesnego menu i elewacji lokalu. Smaki i ceny na zdjęciach dotyczą dnia wizyty.",
    "de": "Eine Eisdiele in Nadodrze. Unsere Besuchsgalerie zeigt die Eistheke, die damalige Speisekarte und die Außenansicht. Abgebildete Sorten und Preise beziehen sich auf den Besuchszeitpunkt.",
    "cs": "Zmrzlinárna ve čtvrti Nadodrze. Galerie z naší návštěvy ukazuje pult se zmrzlinou, tehdejší nabídku a průčelí podniku. Vyobrazené příchutě a ceny odpovídají době návštěvy."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.117917,
      "lng": 17.0343499
    }
  },
  "categories": [
    "drink"
  ],
  "media": {
    "photos": [
      "/assets/food-cafes/lodziarnia-roma-01.jpg",
      "/assets/food-cafes/lodziarnia-roma-02.jpg",
      "/assets/food-cafes/lodziarnia-roma-03.jpg"
    ],
    "videos": [
      "/assets/lodziarnia-roma-visit-01.mp4",
      "/assets/lodziarnia-roma-visit-02.mp4",
      "/assets/lodziarnia-roma-visit-03.mp4",
      "/assets/lodziarnia-roma-visit-04.mp4"
    ],
    "metadata": {
      "/assets/food-cafes/lodziarnia-roma-01.jpg": {
        "original": true,
        "sourceFile": "גלידריה רומא/WhatsApp Image 2026-10-01 at 09.20.35 (1).jpeg",
        "sourceSHA256": "fe2e19aaa9e575e85fc34d27d16611dd5fc8d3d7195fe02e7ef951754b9af347",
        "heroCandidate": true,
        "personalPhotoException": false,
        "personalPhotoExceptionAuthorizedAt": null
      },
      "/assets/food-cafes/lodziarnia-roma-02.jpg": {
        "original": true,
        "sourceFile": "גלידריה רומא/WhatsApp Image 2026-10-01 at 09.20.35 (3).jpeg",
        "sourceSHA256": "943bb5391ec1a94b21a0efe7879a59d2c72217ec3ed95bc5607879d8164cdcd1",
        "heroCandidate": false,
        "personalPhotoException": false,
        "personalPhotoExceptionAuthorizedAt": null
      },
      "/assets/food-cafes/lodziarnia-roma-03.jpg": {
        "original": true,
        "sourceFile": "גלידריה רומא/WhatsApp Image 2026-10-01 at 09.20.33.jpeg",
        "sourceSHA256": "040c1aaf753914c8b6d82d796eb283ea7bb266dd29171f8e1ba1240b13b549ae",
        "heroCandidate": false,
        "personalPhotoException": true,
        "personalPhotoExceptionAuthorizedAt": "2026-10-18"
      }
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "personalMediaException": {
      "authorizedAt": "2026-10-18",
      "scope": "User expressly permits personal media from Roma folder only"
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "chatka",
  "aliases": [
    "Chatka przy Jatkach",
    "Chatka Przy Jatkach",
    "צ׳אטקה",
    "צאטקה"
  ],
  "localName": "Chatka przy Jatkach",
  "name": {
    "he": "צ׳אטקה ליד יאטקי",
    "en": "Chatka przy Jatkach",
    "pl": "Chatka przy Jatkach",
    "de": "Chatka przy Jatkach",
    "cs": "Chatka przy Jatkach"
  },
  "description": {
    "he": "מסעדה למטבח פולני מסורתי בעיר העתיקה, סמוך לסמטת יאטקי ולכיכר השוק. בגלריית הביקור שלנו נראים פירוגי על מגש עץ, לביבות תפוחי אדמה ברוטב פטריות ואווירת הארוחה בפנים. התמונות מתעדות את הביקור שלנו, ולא תפריט או מחירים עדכניים. הכתובת ופרטי הביקור מופיעים באתר הרשמי. לפני ביקור בדקו שם את שעות הפתיחה והזמנת השולחן.",
    "en": "A traditional Polish restaurant in the Old Town, close to the Jatki lane and Market Square. Our visit gallery shows pierogi on a wooden platter, potato pancakes with mushroom sauce and the indoor dining atmosphere. The photographs document our visit rather than a current menu or prices. The restaurant lists its entrance address as Odrzańska 6–7. Check the official website for current opening hours and table reservations.",
    "pl": "Restauracja z tradycyjną kuchnią polską na Starym Mieście, blisko Jatek i Rynku. Galeria z naszej wizyty pokazuje pierogi na drewnianej desce, placki ziemniaczane z sosem grzybowym i atmosferę posiłku we wnętrzu. Zdjęcia dokumentują naszą wizytę, a nie aktualne menu czy ceny. Restauracja podaje adres wejść: Odrzańska 6–7. Przed wizytą sprawdź godziny otwarcia i rezerwacje na oficjalnej stronie.",
    "de": "Ein Restaurant mit traditioneller polnischer Küche in der Altstadt, nahe der Gasse Jatki und dem Marktplatz. Unsere Besuchsgalerie zeigt Pierogi auf einer Holzplatte, Kartoffelpuffer mit Pilzsauce und die Atmosphäre beim Essen im Innenraum. Die Fotos dokumentieren unseren Besuch und sind keine aktuelle Speisekarte oder Preisliste. Das Restaurant nennt als Eingangsadresse Odrzańska 6–7. Aktuelle Öffnungszeiten und Tischreservierungen finden Sie auf der offiziellen Website.",
    "cs": "Restaurace s tradiční polskou kuchyní ve Starém Městě, blízko uličky Jatki a hlavního náměstí. Galerie z naší návštěvy ukazuje pirohy na dřevěném tácu, bramboráky s houbovou omáčkou a atmosféru stolování uvnitř. Fotografie zachycují naši návštěvu, nikoli aktuální jídelní lístek či ceny. Restaurace uvádí adresu vstupů Odrzańska 6–7. Před návštěvou ověřte otevírací dobu a rezervace na oficiálním webu."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1119289,
      "lng": 17.0313524
    },
    "address": {
      "street": "Odrzańska 6–7",
      "postalCode": "50-113",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "eat"
  ],
  "links": {
    "website": "https://chatkaprzyjatkach.pl/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1119289%2C17.0313524",
      "appleMaps": "https://maps.apple.com/?ll=51.1119289,17.0313524"
    }
  },
  "provenance": {
    "personalVisit": true,
    "originalPhotography": true,
    "factualSources": [
      {
        "url": "https://chatkaprzyjatkach.pl/",
        "verifiedAt": "2026-10-18",
        "scope": "official restaurant identity, traditional Polish cuisine, address Odrzańska 6–7; no fixed hours or prices copied"
      },
      {
        "url": "https://geoportal.wroclaw.pl/poi/poi/2306",
        "verifiedAt": "2026-10-18",
        "scope": "municipal restaurant identity at Odrzańska 7; historical directory last modified 2013, not used for current phone or opening times"
      }
    ]
  },
  "media": {
    "photos": [
      "/assets/food-cafes/chatka-pierogi-01.jpg",
      "/assets/feels-familiar/chatka-placki.jpg",
      "/assets/food-cafes/chatka-visit-02.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/food-cafes/chatka-pierogi-01.jpg": {
        "original": true,
        "sourceFile": "Chatka/IMG_0948.JPG",
        "sourceSHA256": "638422334bd660b0a5c3b649f7e1ea1e2d515e8617f7962422e6527025e120dc",
        "publicationSHA256": "5a74c6cbd42827de56890d1cee6a146bda06c52549523038b33a7dd9585f575b",
        "alt": {
          "he": "מגש פירוגי מעוטר בשמיר וברוטב, מהביקור שלנו במסעדה",
          "en": "Pierogi platter with dill and sauce during our restaurant visit",
          "pl": "Półmisek pierogów z koperkiem i sosem podczas naszej wizyty",
          "de": "Pierogi-Platte mit Dill und Sauce bei unserem Restaurantbesuch",
          "cs": "Tác pirohů s koprem a omáčkou při naší návštěvě restaurace"
        },
        "heroCandidate": true,
        "personalPhotoExceptionApplied": false
      },
      "/assets/food-cafes/chatka-visit-02.jpg": {
        "original": true,
        "sourceFile": "Chatka/IMG_0950.JPG",
        "sourceSHA256": "5d4a46bec422a713dfad94fcb12ba8c32f98062f4c193450bba99893fc8a3641",
        "publicationSHA256": "3396409ff0ac00a62d7aab27223e94d6f952f2755334caf0b79f92073ec5cd07",
        "alt": {
          "he": "סועדת ומגש פירוגי בחלל המסעדה, מהביקור שלנו",
          "en": "Diner and pierogi platter inside the restaurant during our visit",
          "pl": "Osoba przy stole i półmisek pierogów we wnętrzu restauracji podczas naszej wizyty",
          "de": "Gast am Tisch mit Pierogi-Platte im Restaurant bei unserem Besuch",
          "cs": "Host u stolu s tácem pirohů v interiéru restaurace při naší návštěvě"
        },
        "heroCandidate": false,
        "personalPhotoExceptionApplied": true
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
},
{
  "id": "lodz-manufaktura",
  "localName": "Manufaktura",
  "name": {
    "he": "מנופקטורה",
    "en": "Manufaktura",
    "pl": "Manufaktura",
    "de": "Manufaktura",
    "cs": "Manufaktura"
  },
  "description": {
    "he": "מתחם מפעלי הטקסטיל לשעבר שהפך למוקד של תרבות, קניות ומסעדות. התחילו ברחבה בין מבני הלבנים והמשיכו פנימה לפי הזמן והרצון. התמונות וסרטון הביקור שלנו מציגים את החוץ ואת חלל המרכז המסחרי.",
    "en": "A former textile factory complex, now a place for culture, shopping and food. Begin in the courtyard between the brick buildings, then explore indoors if time allows. Our visit photos and video show both the exterior and the shopping-centre interior.",
    "pl": "Dawny kompleks fabryk włókienniczych, dziś miejsce kultury, zakupów i jedzenia. Zacznij na placu między ceglanymi budynkami, potem zajrzyj do środka, jeśli masz czas. Nasze zdjęcia i film pokazują przestrzeń zewnętrzną oraz wnętrze centrum handlowego.",
    "de": "Ehemaliger Textilfabrikkomplex mit Kultur, Einkaufsmöglichkeiten und Gastronomie. Beginnen Sie auf dem Platz zwischen den Backsteinbauten und gehen Sie bei genügend Zeit hinein. Unsere Fotos und der Besuchsfilm zeigen Außenbereiche und das Einkaufszentrum.",
    "cs": "Bývalý komplex textilních továren, dnes místo kultury, obchodů a restaurací. Začněte na prostranství mezi cihlovými budovami a podle času pokračujte dovnitř. Naše fotografie a video zachycují venkovní prostor i interiér obchodního centra."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7794621,
      "lng": 19.444461
    },
    "address": {
      "street": "Drewnowska 58",
      "city": "Łódź",
      "country": "Poland"
    }
  },
  "categories": [
    "culture",
    "shopping",
    "food"
  ],
  "links": {
    "website": "https://lodz.travel/en/tourism/what-to-see/manufaktura/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7794621%2C19.444461",
      "appleMaps": "https://maps.apple.com/?ll=51.7794621,19.444461"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-manufaktura-01.jpg",
      "/assets/lodz-arrival/lodz-manufaktura-02.jpg",
      "/assets/lodz-arrival/lodz-manufaktura-03.jpg",
      "/assets/lodz-arrival/lodz-manufaktura-04.jpg"
    ],
    "videos": ["/assets/lodz-manufaktura-visit-01.mp4"],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-manufaktura-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.01 (10).jpeg",
        "sourceSHA256": "e83320d698f4a0a57eb4033d74ae16b9b1d7682283cae79bf6261b5f8b33671b",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-manufaktura-02.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.01 (11).jpeg",
        "sourceSHA256": "5857b7d0895fca6a7239fc3877d882e6f6293054ce49f7bced856b9da112d04b",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-manufaktura-03.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.01 (23).jpeg",
        "sourceSHA256": "401d94567da9ad90fd42fca829a07881f88531b88e7cf4cc36af897b78f77f6f",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-manufaktura-04.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.01 (4).jpeg",
        "sourceSHA256": "866004c8627cbf6cc55e92a127d1f312d04eb69c671a2273113db837c088c6ed",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://lodz.travel/en/tourism/what-to-see/manufaktura/",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/way/27148381",
      "checkedAt": "2026-10-18",
      "method": "Named OpenStreetMap feature matched to official address and original imagery; street representative point uses original GPS."
    }
  }
},{
  "id": "lodz-freedom-square",
  "localName": "Plac Wolności",
  "name": {
    "he": "כיכר החירות בלודז׳",
    "en": "Freedom Square, Łódź",
    "pl": "Plac Wolności w Łodzi",
    "de": "Freiheitsplatz in Łódź",
    "cs": "Náměstí Svobody v Lodži"
  },
  "description": {
    "he": "כיכר החירות מסמנת את הקצה הצפוני של רחוב פיוטרקובסקה. עצרו להתרשם מחזיתות המבנים ומהכנסייה הצהובה שבתמונות שלנו, ואז המשיכו אל חצר המראות הסמוכה.",
    "en": "Freedom Square marks the northern end of Piotrkowska Street. Pause to see the surrounding facades and the yellow church in our photos, then continue to nearby Rose Passage.",
    "pl": "Plac Wolności wyznacza północny koniec ulicy Piotrkowskiej. Obejrzyj okoliczne fasady i żółty kościół z naszych zdjęć, a potem przejdź do pobliskiego Pasażu Róży.",
    "de": "Der Freiheitsplatz liegt am nördlichen Ende der Piotrkowska. Betrachten Sie die Fassaden und die gelbe Kirche auf unseren Fotos und gehen Sie anschließend zum nahen Rosenpassage.",
    "cs": "Náměstí Svobody leží na severním konci Piotrkowské ulice. Prohlédněte si okolní průčelí a žlutý kostel z našich fotografií a pokračujte do nedaleké Růžové pasáže."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7767836,
      "lng": 19.4546995
    },
    "address": {
      "street": "Plac Wolności",
      "city": "Łódź",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture",
    "culture"
  ],
  "links": {
    "website": "https://lodz.travel/files/lot/public/user_upload/Lodz_na_weekend_pol_ang_v2024_net.pdf",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7767836%2C19.4546995",
      "appleMaps": "https://maps.apple.com/?ll=51.7767836,19.4546995"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-freedom-square-01.jpg",
      "/assets/lodz-arrival/lodz-freedom-square-02.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-freedom-square-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.01 (13).jpeg",
        "sourceSHA256": "f92a0bcd0aa0821a169d711b4ecc977cd060877d68d27f9d63daa93234f66fd3",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-freedom-square-02.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 17.35.12 (1).jpeg",
        "sourceSHA256": "76ae03d5196a1e27cc99e93472877678cf71eb13c98b28f35727c54440f7f11f",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://lodz.travel/files/lot/public/user_upload/Lodz_na_weekend_pol_ang_v2024_net.pdf",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/way/1249182058",
      "checkedAt": "2026-10-18",
      "method": "Named OpenStreetMap feature matched to official address and original imagery; street representative point uses original GPS."
    }
  }
},{
  "id": "lodz-rose-passage",
  "localName": "Pasaż Róży",
  "name": {
    "he": "חצר המראות",
    "en": "Rose Passage",
    "pl": "Pasaż Róży",
    "de": "Rosenpassage",
    "cs": "Růžová pasáž"
  },
  "description": {
    "he": "חצר שדפנותיה כוסו בפסיפס של שברי מראות, ביצירתה של האמנית יואנה רייקובסקה. האור וההשתקפויות הופכים מעבר קטן לעצירה מיוחדת. הכניסה מרחוב פיוטרקובסקה מספר 3. בדקו את שעות הגישה לפני ההגעה.",
    "en": "Joanna Rajkowska transformed this courtyard with a mosaic of mirror fragments. Light and reflections turn a small passage into a memorable stop. Enter from 3 Piotrkowska Street and check access hours before visiting.",
    "pl": "Joanna Rajkowska pokryła ściany tego podwórza mozaiką z fragmentów luster. Światło i odbicia zmieniają niewielki pasaż w wyjątkowy przystanek. Wejście od Piotrkowskiej 3. Przed wizytą sprawdź godziny dostępu.",
    "de": "Joanna Rajkowska verwandelte diesen Hof mit einem Mosaik aus Spiegelfragmenten. Licht und Spiegelungen machen den kleinen Durchgang zu einem besonderen Halt. Zugang über Piotrkowska 3. Zugangszeiten vor dem Besuch prüfen.",
    "cs": "Joanna Rajkowska proměnila tento dvůr mozaikou z úlomků zrcadel. Světlo a odrazy vytvářejí z malé pasáže působivou zastávku. Vstup z Piotrkowské 3. Před návštěvou ověřte přístupové hodiny."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7758847,
      "lng": 19.4536534
    },
    "address": {
      "street": "Piotrkowska 3",
      "city": "Łódź",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture",
    "culture"
  ],
  "links": {
    "website": "https://lodz.travel/turystyka/co-zobaczyc/ulica-piotrkowska/pasaz-rozy/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7758847%2C19.4536534",
      "appleMaps": "https://maps.apple.com/?ll=51.7758847,19.4536534"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-rose-passage-01.jpg",
      "/assets/lodz-arrival/lodz-rose-passage-02.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-rose-passage-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.02 (6).jpeg",
        "sourceSHA256": "515d0ccd88bf5a329f78c6fba805ccff36b9f1891f76fea560485b740a3d639e",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-rose-passage-02.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 17.35.12.jpeg",
        "sourceSHA256": "75b30791773b4b80a417a54f22c9c8e0f6eb928cc5cf6364036c9c6d37009446",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://lodz.travel/turystyka/co-zobaczyc/ulica-piotrkowska/pasaz-rozy/",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/relation/12609642",
      "checkedAt": "2026-10-18",
      "method": "Named OpenStreetMap feature matched to official address and original imagery; street representative point uses original GPS."
    }
  }
},{
  "id": "lodz-gutenberg-house",
  "localName": "Kamienica pod Gutenbergiem",
  "name": {
    "he": "בית גוטנברג",
    "en": "Gutenberg House",
    "pl": "Kamienica pod Gutenbergiem",
    "de": "Gutenberg-Haus",
    "cs": "Gutenbergův dům"
  },
  "description": {
    "he": "בית מספר 86 ברחוב פיוטרקובסקה בולט בחזית הצבעונית, בפסל גוטנברג ובדרקוני המתכת. זו עצירת התבוננות וצילום מבחוץ, ולא הבטחה לביקור בתוך הבניין. חפשו את הפרטים מעל השער.",
    "en": "Number 86 Piotrkowska stands out for its colourful facade, Gutenberg statue and metal dragons. This is an exterior architecture and photo stop, not a promised interior visit. Look for the details above the gateway.",
    "pl": "Kamienica przy Piotrkowskiej 86 wyróżnia się barwną fasadą, figurą Gutenberga i metalowymi smokami. To przystanek na oglądanie architektury z zewnątrz, bez obietnicy zwiedzania wnętrz. Wypatrz detale nad bramą.",
    "de": "Piotrkowska 86 fällt durch die farbige Fassade, die Gutenberg-Figur und Metalldrachen auf. Dieser Halt dient dem Betrachten der Außenarchitektur, ohne zugesicherte Innenbesichtigung. Achten Sie auf die Details über dem Tor.",
    "cs": "Dům v Piotrkowské 86 vyniká barevnou fasádou, sochou Gutenberga a kovovými draky. Jde o zastávku u vnější architektury, nikoli příslib prohlídky interiéru. Hledejte detaily nad průjezdem."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7668862,
      "lng": 19.4570933
    },
    "address": {
      "street": "Piotrkowska 86",
      "city": "Łódź",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture",
    "culture"
  ],
  "links": {
    "website": "https://lodz.travel/en/tourism/what-to-see/piotrkowska-street/the-gutenberg-tenement-house/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7668862%2C19.4570933",
      "appleMaps": "https://maps.apple.com/?ll=51.7668862,19.4570933"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-gutenberg-house-01.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-gutenberg-house-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.02 (24).jpeg",
        "sourceSHA256": "75e2314269c84f79cdb68a5498b6d9adbf5215195e155d4eb2f9b8838518d251",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://lodz.travel/en/tourism/what-to-see/piotrkowska-street/the-gutenberg-tenement-house/",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/node/7566036517",
      "checkedAt": "2026-10-18",
      "method": "Named OpenStreetMap feature matched to official address and original imagery; street representative point uses original GPS."
    }
  }
},{
  "id": "lodz-piotrkowska",
  "localName": "Ulica Piotrkowska",
  "name": {
    "he": "רחוב פיוטרקובסקה",
    "en": "Piotrkowska Street",
    "pl": "Ulica Piotrkowska",
    "de": "Piotrkowska-Straße",
    "cs": "Piotrkowská ulice"
  },
  "description": {
    "he": "הקטע המצולם של הרחוב משלב בתי מידות, פסלי רחוב ומקומות לעצירת קפה או ארוחה. המסלול שלנו מתרכז בחלק הצפוני והמרכזי, ולא בכל אורכו של הרחוב. מכאן חוזרים למנופקטורה לפני המשך הנסיעה לוורוצלב.",
    "en": "Our photographed stretch combines ornate townhouses, street sculptures and places to pause for coffee or a meal. This walk covers the northern and central sections, not the entire street. Return to Manufaktura before continuing to Wrocław.",
    "pl": "Na sfotografowanym przez nas odcinku są ozdobne kamienice, rzeźby uliczne oraz miejsca na kawę i posiłek. Spacer obejmuje część północną i środkową, nie całą ulicę. Wróć do Manufaktury przed dalszą podróżą do Wrocławia.",
    "de": "Unser fotografierter Abschnitt verbindet prächtige Stadthäuser, Straßenskulpturen und Möglichkeiten für Kaffee oder Essen. Der Spaziergang umfasst den nördlichen und mittleren Teil, nicht die ganze Straße. Vor der Weiterfahrt nach Wrocław geht es zurück zur Manufaktura.",
    "cs": "Náš fotografovaný úsek spojuje zdobené městské domy, pouliční sochy a místa na kávu či jídlo. Procházka vede severní a střední částí, nikoli celou ulicí. Před pokračováním do Vratislavi se vraťte k Manufaktuře."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7654694,
      "lng": 19.4573028
    },
    "address": {
      "street": "Piotrkowska",
      "city": "Łódź",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture",
    "culture"
  ],
  "links": {
    "website": "https://lodz.travel/en/tourism/what-to-see/piotrkowska-street/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7654694%2C19.4573028",
      "appleMaps": "https://maps.apple.com/?ll=51.7654694,19.4573028"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-piotrkowska-01.jpg",
      "/assets/lodz-arrival/lodz-piotrkowska-02.jpg",
      "/assets/lodz-arrival/lodz-piotrkowska-03.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-piotrkowska-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/IMG_5722.JPG",
        "sourceSHA256": "c6de12a01d8d7131858ad8b7c6a8eb10b43ade82f25c01bddf306b2e2177c83e",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-piotrkowska-02.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 17.34.37 (2).jpeg",
        "sourceSHA256": "05e85f914b23bbf2ac285540cd6cce76f899e84c0fbc725016ac24b0850581e5",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      },
      "/assets/lodz-arrival/lodz-piotrkowska-03.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/WhatsApp Image 2026-09-24 at 19.02.02 (8).jpeg",
        "sourceSHA256": "5196707c5af41a242fc1567a1639dba9ded0668e5dc1a2e711d0e883e348d90f",
        "reviewedAt": "2026-10-18",
        "review": "Visually inspected; no posed family portrait; repeated views excluded."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://lodz.travel/en/tourism/what-to-see/piotrkowska-street/",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "user-original IMG_5722.JPG EXIF GPS; photographed representative street segment",
      "checkedAt": "2026-10-18",
      "method": "Named OpenStreetMap feature matched to official address and original imagery; street representative point uses original GPS."
    }
  }
},
{
  "id": "lodz-old-market",
  "localName": "Stary Rynek",
  "name": {
    "he": "השוק הישן של לודז׳",
    "en": "Łódź Old Market Square",
    "pl": "Stary Rynek w Łodzi",
    "de": "Alter Markt in Łódź",
    "cs": "Staré tržiště v Lodži"
  },
  "description": {
    "he": "כיכר השוק הישן הייתה חלק מאזור הגטו בזמן הכיבוש הגרמני. בביקור שלנו צילמנו את המרחב הציבורי כפי שהוא נראה כיום. זו תחנת מעבר בין מנופקטורה לבין האזור ההיסטורי של הגטו, ולא שחזור של מראהו בזמן המלחמה.",
    "en": "The Old Market Square lay within the ghetto area during the German occupation. Our photo shows the public space as it looks today. This is a stop between Manufaktura and the historical ghetto area, not a reconstruction of its wartime appearance.",
    "pl": "Stary Rynek znajdował się na terenie getta podczas okupacji niemieckiej. Nasze zdjęcie pokazuje współczesną przestrzeń publiczną. To przystanek między Manufakturą a historycznym obszarem getta, a nie rekonstrukcja wyglądu z czasów wojny.",
    "de": "Der Alte Markt lag während der deutschen Besatzung im Ghettogebiet. Unser Foto zeigt den heutigen öffentlichen Raum. Dieser Halt verbindet Manufaktura und das historische Ghettogebiet, ohne das damalige Aussehen zu rekonstruieren.",
    "cs": "Staré tržiště leželo za německé okupace na území ghetta. Naše fotografie ukazuje dnešní veřejný prostor. Jde o zastávku mezi Manufakturou a historickou oblastí ghetta, nikoli rekonstrukci válečné podoby."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7815222,
      "lng": 19.4537361
    }
  },
  "categories": [
    "history",
    "heritage",
    "remembrance"
  ],
  "links": {
    "website": "https://lodz.travel/files/public/user_upload/MINI_ATRAKCJE__TURYSTYCZNE_POL.pdf",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7815222%2C19.4537361"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-old-market-01.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-old-market-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/IMG_5724.JPG",
        "sourceSHA256": "abd90e27ddd06aff583e631d292ad8d6cff88ee1e97a3d61429c74cdc1b5c59c",
        "reviewedAt": "2026-10-18",
        "review": "Original visual and GPS inspection; no posed family portrait. Pavement marker photo includes only unidentifiable shoes."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://lodz.travel/files/public/user_upload/MINI_ATRAKCJE__TURYSTYCZNE_POL.pdf",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "Original IMG_5724.JPG EXIF GPS; photographed square viewpoint",
      "checkedAt": "2026-10-18"
    }
  }
},{
  "id": "lodz-church-square",
  "localName": "Plac Kościelny",
  "name": {
    "he": "כיכר הכנסייה באזור הגטו לשעבר",
    "en": "Church Square in the former ghetto",
    "pl": "Plac Kościelny na terenie dawnego getta",
    "de": "Kirchplatz im ehemaligen Ghetto",
    "cs": "Kostelní náměstí v bývalém ghettu"
  },
  "description": {
    "he": "כנסיית הלבנים האדומות של עליית מרים ניצבת בכיכר הכנסייה, שהייתה בתוך גטו לודז׳. הצילום שלנו מציג את חזיתה מבחוץ. התחנה נועדה להתבוננות במקום ולסיפור האזור, ואינה כוללת התחייבות לכניסה לכנסייה.",
    "en": "The red-brick Church of the Assumption stands on Church Square, within the former Łódź ghetto. Our photograph shows its exterior. This stop introduces the site and its historical setting, without promising interior access.",
    "pl": "Ceglany kościół Wniebowzięcia NMP stoi przy placu Kościelnym, na terenie dawnego getta łódzkiego. Nasze zdjęcie przedstawia fasadę. Przystanek przybliża miejsce i jego kontekst historyczny, bez gwarancji wejścia do środka.",
    "de": "Die rote Backsteinkirche Mariä Himmelfahrt steht am Kirchplatz im ehemaligen Ghetto von Łódź. Unser Foto zeigt die Außenansicht. Der Halt erläutert den Ort und seinen historischen Kontext, ohne zugesicherten Innenzugang.",
    "cs": "Červený cihlový kostel Nanebevzetí Panny Marie stojí na Kostelním náměstí v bývalém lodžském ghettu. Naše fotografie ukazuje exteriér. Zastávka představuje místo a historické souvislosti, bez příslibu vstupu dovnitř."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7831681,
      "lng": 19.4538249
    }
  },
  "categories": [
    "history",
    "heritage",
    "remembrance"
  ],
  "links": {
    "website": "https://mariacka-lodz.com.pl/?p=2408",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7831681%2C19.4538249"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-church-square-01.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-church-square-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/IMG_5726.JPG",
        "sourceSHA256": "25a44c47425c210003aab6e7d680791cb72ad8abf78ff630152ff4675d05d6e0",
        "reviewedAt": "2026-10-18",
        "review": "Original visual and GPS inspection; no posed family portrait. Pavement marker photo includes only unidentifiable shoes."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://mariacka-lodz.com.pl/?p=2408",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/way/103281496",
      "checkedAt": "2026-10-18"
    }
  }
},{
  "id": "lodz-ghetto-baluty",
  "localName": "Bałuty / Litzmannstadt Ghetto",
  "name": {
    "he": "אזור גטו לודז׳ לשעבר, באלוטי",
    "en": "Former Łódź Ghetto, Bałuty",
    "pl": "Obszar dawnego getta łódzkiego, Bałuty",
    "de": "Ehemaliges Ghetto Łódź, Bałuty",
    "cs": "Bývalé lodžské ghetto, Bałuty"
  },
  "description": {
    "he": "תחנת זיכרון באזור שוק באלוטי ורחובות זגיירסקה ולימנובסקייגו, שבהם צילמנו גם את סימון הגטו במדרכה. באזור זה התקיימו מוסדות מנהל מרכזיים של גטו ליצמנשטט בשנים 1940–1944. הסיכה מסמנת נקודת ביקור עכשווית באזור, ולא את מלוא גבולות הגטו.",
    "en": "A remembrance stop near Bałucki Market and Zgierska and Limanowskiego streets, where we also photographed a pavement ghetto marker. Central administrative institutions of the Litzmannstadt Ghetto operated in this area in 1940–1944. The pin represents a present-day visiting point, not the full ghetto boundary.",
    "pl": "Przystanek pamięci w okolicy Bałuckiego Rynku oraz ulic Zgierskiej i Limanowskiego, gdzie sfotografowaliśmy także oznaczenie getta w chodniku. W tej okolicy działały główne instytucje administracyjne getta Litzmannstadt w latach 1940–1944. Pinezka wskazuje współczesny punkt odwiedzin, nie całe granice getta.",
    "de": "Erinnerungsort am Bałucki-Markt sowie den Straßen Zgierska und Limanowskiego, wo wir auch eine Gehwegmarkierung des Ghettos fotografierten. Hier befanden sich 1940–1944 zentrale Verwaltungseinrichtungen des Ghettos Litzmannstadt. Die Markierung zeigt einen heutigen Besuchspunkt, nicht die vollständige Ghettogrenze.",
    "cs": "Pietní zastávka u tržiště Bałucki a ulic Zgierska a Limanowskiego, kde jsme fotografovali i označení ghetta v chodníku. V této oblasti působily v letech 1940–1944 ústřední správní instituce ghetta Litzmannstadt. Špendlík označuje dnešní místo návštěvy, nikoli celé hranice ghetta."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lodz",
    "cityId": "lodz",
    "coordinates": {
      "lat": 51.7869694,
      "lng": 19.4518556
    }
  },
  "categories": [
    "history",
    "heritage",
    "remembrance"
  ],
  "links": {
    "website": "https://www.centrumdialogu.com/en/information-for-the-deaf?catid=91&id=776%3Athe-baucki-market&view=article",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.7869694%2C19.4518556"
    }
  },
  "media": {
    "photos": [
      "/assets/lodz-arrival/lodz-ghetto-baluty-01.jpg",
      "/assets/lodz-arrival/lodz-ghetto-baluty-03.jpg"
    ],
    "videos": [],
    "photoProvenance": {
      "/assets/lodz-arrival/lodz-ghetto-baluty-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/IMG_5735.JPG",
        "sourceSHA256": "68a11ec40de0d431ca093c96f6a7f00c742990726cc425a78cfe3c1170892757",
        "reviewedAt": "2026-10-18",
        "review": "Original visual and GPS inspection; no posed family portrait. Pavement marker photo includes only unidentifiable shoes."
      },
      "/assets/lodz-arrival/lodz-ghetto-baluty-03.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/לודז/IMG_5730.JPG",
        "sourceSHA256": "6d59838d69d15ee517ab9bb2eaeea3d3e53888f515d94b27f19cd4d7c99066b3",
        "reviewedAt": "2026-10-18",
        "review": "Original visual and GPS inspection; no posed family portrait. Pavement marker photo includes only unidentifiable shoes."
      }
    }
  },
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://www.centrumdialogu.com/en/information-for-the-deaf?catid=91&id=776%3Athe-baucki-market&view=article",
        "checkedAt": "2026-10-18"
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "Original IMG_5735.JPG EXIF GPS and visible Zgierska / Limanowskiego street signs",
      "checkedAt": "2026-10-18"
    }
  }
},
{
  "id": "kawiarenka-sw-jadwigi",
  "localName": "Kawiarenka św. Jadwigi",
  "name": {
    "he": "בית הקפה הדוויגה הקדושה",
    "en": "St Hedwig’s Café",
    "pl": "Kawiarenka św. Jadwigi",
    "de": "Café der heiligen Hedwig",
    "cs": "Kavárna svaté Hedviky"
  },
  "description": {
    "he": "בית קפה במתחם נוטרדאם שבאוסטרוב טומסקי, עם קפה ועוגות הנאפות במקום. בתמונות הביקור שלנו נראים חדרי לבנים מקומרים, ריהוט עץ וגן עם ערוגות ושולחנות תחת שמשיות. מתאים להפסקת קפה בין הסיורים באזור הקתדרלה. בית הקפה הוא יעד נפרד מהמנזר ומהאתר הארכאולוגי שבמתחם. בדקו ישירות שעות פתיחה וגישה לגן לפני ההגעה.\nKawiarenka św. Jadwigi\nDom Notre Dame\nul. św. Marcina 12, Wrocław",
    "en": "A café at Dom Notre Dame on Ostrów Tumski, serving coffee and cakes baked on site. Our visit photographs show brick-vaulted rooms, wooden furniture and a garden with planted beds and tables under parasols. A useful coffee break while exploring the cathedral quarter. The café is a separate destination from the monastery and the archaeological site in the complex. Check opening hours and garden access directly before visiting. Address: ul. św. Marcina 12, Wrocław.",
    "pl": "Kawiarenka w Domu Notre Dame na Ostrowie Tumskim, z kawą i ciastami wypiekanymi na miejscu. Nasze zdjęcia z wizyty pokazują ceglane sklepienia, drewniane meble oraz ogród z rabatami i stolikami pod parasolami. To propozycja przerwy na kawę podczas spaceru po okolicy katedry. Kawiarnia jest odrębnym celem od klasztoru i stanowiska archeologicznego w kompleksie. Przed przyjazdem sprawdź bezpośrednio godziny otwarcia i dostęp do ogrodu. Adres: ul. św. Marcina 12, Wrocław.",
    "de": "Ein Café im Dom Notre Dame auf Ostrów Tumski mit Kaffee und vor Ort gebackenen Kuchen. Unsere Besuchsfotos zeigen Räume mit Backsteingewölben, Holzmöbel und einen Garten mit Beeten und Tischen unter Sonnenschirmen. Eine Kaffeepause beim Rundgang durch das Domviertel. Das Café ist ein eigenständiges Ziel neben dem Kloster und der archäologischen Stätte im Komplex. Öffnungszeiten und Gartenzugang vor dem Besuch direkt erfragen. Adresse: ul. św. Marcina 12, Wrocław.",
    "cs": "Kavárna v Domě Notre Dame na Ostrově Tumski s kávou a moučníky pečenými přímo na místě. Naše fotografie z návštěvy zachycují místnosti s cihlovými klenbami, dřevěný nábytek a zahradu se záhony a stolky pod slunečníky. Tip na přestávku na kávu při procházce kolem katedrály. Kavárna je samostatným cílem vedle kláštera a archeologického areálu v komplexu. Před návštěvou si přímo ověřte otevírací dobu a přístup do zahrady. Adresa: ul. św. Marcina 12, Wrocław."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1160449,
      "lng": 17.0433953
    },
    "address": {
      "street": "ul. św. Marcina 12",
      "postalCode": "50-327",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "aliases": [
    "kawiarenka-jadwigi",
    "kawiarenka-sw-jadwigi-wroclaw",
    "st-hedwigs-cafe",
    "בית קפה במנזר"
  ],
  "categories": [
    "cafe",
    "coffee",
    "dessert"
  ],
  "links": {
    "website": "https://www.ndwroclaw.com/kawiarnia",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1160449%2C17.0433953",
      "appleMaps": "https://maps.apple.com/?ll=51.1160449,17.0433953&q=Kawiarenka%20%C5%9Bw.%20Jadwigi"
    }
  },
  "media": {
    "thumbnail": "/assets/food-cafes/jadwigi-cafe-thumbnail.jpg",
    "photos": [
      "/assets/food-cafes/jadwigi-cafe-01.jpg",
      "/assets/food-cafes/jadwigi-cafe-02.jpg",
      "/assets/food-cafes/jadwigi-cafe-03.jpg",
      "/assets/food-cafes/jadwigi-cafe-04.jpg",
      "/assets/food-cafes/jadwigi-cafe-05.jpg",
      "/assets/food-cafes/jadwigi-cafe-07.jpg",
      "/assets/food-cafes/jadwigi-cafe-08.jpg"
    ],
    "videos": [
      "/assets/food-cafes/jadwigi-visit-01.mp4",
      "/assets/food-cafes/jadwigi-visit-02.mp4",
      "/assets/food-cafes/jadwigi-visit-03.mp4",
      "/assets/food-cafes/jadwigi-visit-04.mp4",
      "/assets/food-cafes/jadwigi-visit-05.mp4",
      "/assets/food-cafes/jadwigi-visit-06.mp4",
      "/assets/food-cafes/jadwigi-visit-07.mp4",
      "/assets/food-cafes/jadwigi-visit-08.mp4",
      "/assets/food-cafes/jadwigi-visit-09.mp4"
    ],
    "photoProvenance": {
      "/assets/food-cafes/jadwigi-cafe-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.59.jpeg",
        "sourceSHA256": "4f2b3b92bbb91047a31f9b7a2171fe6d02db86c54ea57600ba3e6e859cecbc6f",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-02.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.22.10 (1).jpeg",
        "sourceSHA256": "f9d4da85633309ad2b9fef4bcb7f39b33ddaa99999038a8687e3375027bc7031",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-03.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-05 at 18.28.41 (6).jpeg",
        "sourceSHA256": "82b8d83edd878877f8abe24671a217255d39e4e8e36c5116ebef027cd021e691",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-04.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.53.jpeg",
        "sourceSHA256": "b337de9a72bf16ead5c2949634af84441c36591b00bf6b76d2849b07ba4870ea",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-05.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.22.06.jpeg",
        "sourceSHA256": "0d686d6e587cc287eacb73e409bb3df8ee6f916667c3e6b1d287ef3f5b761ea9",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-07.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.22.05.jpeg",
        "sourceSHA256": "964ec3aba8fe7dc8dc7f73e105288c374e613d94d362edc8fa144d655cc11480",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-08.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.58.jpeg",
        "sourceSHA256": "33a4f1016c66d81eae76d7d9b62411bd310bff3b5674ae98db1391c2c440ba5c",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded."
      },
      "/assets/food-cafes/jadwigi-cafe-thumbnail.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.59.jpeg",
        "sourceSHA256": "4f2b3b92bbb91047a31f9b7a2171fe6d02db86c54ea57600ba3e6e859cecbc6f",
        "reviewedAt": "2026-10-18",
        "review": "Representative landscape crop from original garden photograph; café umbrellas, garden and central building remain visible. Full original view retained in gallery."
      }
    },
    "metadata": {
      "/assets/food-cafes/jadwigi-cafe-01.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.59.jpeg",
        "sourceSHA256": "4f2b3b92bbb91047a31f9b7a2171fe6d02db86c54ea57600ba3e6e859cecbc6f",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "גן בית הקפה והשמשיות לצד מבני המתחם",
          "en": "Café garden and parasols beside the buildings",
          "pl": "Ogród kawiarni i parasole przy budynkach",
          "de": "Cafégarten und Sonnenschirme neben den Gebäuden",
          "cs": "Zahrada kavárny a slunečníky u budov"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-02.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.22.10 (1).jpeg",
        "sourceSHA256": "f9d4da85633309ad2b9fef4bcb7f39b33ddaa99999038a8687e3375027bc7031",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "חדר בית הקפה תחת קמרונות לבנים",
          "en": "Café room beneath brick vaults",
          "pl": "Sala kawiarni pod ceglanym sklepieniem",
          "de": "Caféraum unter Backsteingewölben",
          "cs": "Místnost kavárny pod cihlovými klenbami"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-03.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-05 at 18.28.41 (6).jpeg",
        "sourceSHA256": "82b8d83edd878877f8abe24671a217255d39e4e8e36c5116ebef027cd021e691",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "שולחנות עץ ותמונות בחדר בית הקפה",
          "en": "Wooden tables and pictures in the café room",
          "pl": "Drewniane stoliki i obrazy w sali kawiarni",
          "de": "Holztische und Bilder im Caféraum",
          "cs": "Dřevěné stolky a obrazy v kavárně"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-04.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.53.jpeg",
        "sourceSHA256": "b337de9a72bf16ead5c2949634af84441c36591b00bf6b76d2849b07ba4870ea",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "מעבר מוצל בצמחייה בגן בית הקפה",
          "en": "A leafy passage in the café garden",
          "pl": "Zielone przejście w ogrodzie kawiarni",
          "de": "Begrünter Durchgang im Cafégarten",
          "cs": "Zelený průchod v zahradě kavárny"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-05.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.22.06.jpeg",
        "sourceSHA256": "0d686d6e587cc287eacb73e409bb3df8ee6f916667c3e6b1d287ef3f5b761ea9",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "דלפק הקפה וקיר הלבנים",
          "en": "The café counter and brick wall",
          "pl": "Lada kawiarni i ceglana ściana",
          "de": "Cafétresen und Backsteinwand",
          "cs": "Pult kavárny a cihlová zeď"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-07.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.22.05.jpeg",
        "sourceSHA256": "964ec3aba8fe7dc8dc7f73e105288c374e613d94d362edc8fa144d655cc11480",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "ערוגות וגדרות חיות בגן בית הקפה",
          "en": "Planted beds and hedges in the café garden",
          "pl": "Rabaty i żywopłoty w ogrodzie kawiarni",
          "de": "Beete und Hecken im Cafégarten",
          "cs": "Záhony a živé ploty v zahradě kavárny"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-08.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.58.jpeg",
        "sourceSHA256": "33a4f1016c66d81eae76d7d9b62411bd310bff3b5674ae98db1391c2c440ba5c",
        "reviewedAt": "2026-10-18",
        "review": "Visually matched to official café gallery: garden, café seating and vaulted interiors; posed personal portraits excluded.",
        "alt": {
          "he": "פרחים צהובים מעל שפת הלבנים בגן",
          "en": "Yellow flowers above a brick garden border",
          "pl": "Żółte kwiaty przy ceglanym obrzeżu",
          "de": "Gelbe Blumen am Beetrand aus Backstein",
          "cs": "Žluté květy u cihlového okraje záhonu"
        }
      },
      "/assets/food-cafes/jadwigi-cafe-thumbnail.jpg": {
        "source": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר/WhatsApp Image 2026-10-01 at 09.20.59.jpeg",
        "sourceSHA256": "4f2b3b92bbb91047a31f9b7a2171fe6d02db86c54ea57600ba3e6e859cecbc6f",
        "reviewedAt": "2026-10-18",
        "review": "Representative landscape crop from original garden photograph; café umbrellas, garden and central building remain visible. Full original view retained in gallery.",
        "alt": {
          "he": "גן בית הקפה והשמשיות לצד מבני המתחם",
          "en": "Café garden and parasols beside the buildings",
          "pl": "Ogród kawiarni i parasole przy budynkach",
          "de": "Cafégarten und Sonnenschirme neben den Gebäuden",
          "cs": "Zahrada kavárny a slunečníky u budov"
        }
      },
      "/assets/food-cafes/jadwigi-visit-01.mp4": {
        "title": {
          "he": "דלפק בית הקפה",
          "en": "Café counter",
          "pl": "Lada kawiarni",
          "de": "Cafétresen",
          "cs": "Pult kavárny"
        },
        "sourceSHA256": "91bef484195596e23e8a4800e574539d9dfc2542f2ae64d01315c1527d446aaf",
        "uploadSHA256": "af4c42934e1165fc90b179cf75cc3563897ba1b502cc626fbb669cc0631b7445",
        "originalDurationSeconds": 6.733333,
        "youtubeId": "IVBHDnnD8D0",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-02.mp4": {
        "title": {
          "he": "חדר תחת קמרונות לבנים",
          "en": "Brick-vaulted room",
          "pl": "Sala z ceglanym sklepieniem",
          "de": "Raum mit Backsteingewölbe",
          "cs": "Místnost s cihlovou klenbou"
        },
        "sourceSHA256": "93f50482c9be3b47ced5dccf4385acd8dcf08b6fd18ef67156c24811d00104a6",
        "uploadSHA256": "628be5120c9edd7ded384422f47411d610c6876d1816089a86bdeb9db8aa5768",
        "originalDurationSeconds": 2.866667,
        "youtubeId": "PLp2IWBStZI",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-03.mp4": {
        "title": {
          "he": "פסל הציפור בגן בית הקפה",
          "en": "Bird sculpture in the café garden",
          "pl": "Rzeźba ptaka w ogrodzie kawiarni",
          "de": "Vogelskulptur im Cafégarten",
          "cs": "Ptačí plastika v zahradě kavárny"
        },
        "sourceSHA256": "64d27ab7d50db2be6d8b2917c9d7087170de617dde44de49d39c198569f2d58e",
        "uploadSHA256": "5c815d4ca623b8b0f50143ed2ab9315aae5a436b5f4dd03dcc55593861eb212b",
        "originalDurationSeconds": 4.833333,
        "youtubeId": "4ch3e2-8_GM",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-04.mp4": {
        "title": {
          "he": "שבשבת צבעונית בגן",
          "en": "Colourful garden pinwheel",
          "pl": "Kolorowy wiatraczek w ogrodzie",
          "de": "Buntes Windrad im Garten",
          "cs": "Barevný větrník v zahradě"
        },
        "sourceSHA256": "9c671deb00daaad4a1553835390994acbccbbaeacb63e129b947cb4ee9d2469c",
        "uploadSHA256": "a58941a0a480850607dbcf59314fbbd18dcfdec9fe850ea9d6114064bbdb9d9d",
        "originalDurationSeconds": 3.266667,
        "youtubeId": "81jhRnGNqDY",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-05.mp4": {
        "title": {
          "he": "פרחי הגן",
          "en": "Garden flowers",
          "pl": "Kwiaty w ogrodzie",
          "de": "Gartenblumen",
          "cs": "Květiny v zahradě"
        },
        "sourceSHA256": "baab954b71a8cf04f6e01f2d1b92c6ae432e01c7be2a0a5e739df32276f49a30",
        "uploadSHA256": "66b8f12d89b98e96fea28c27571214a507b1600078200d5074cce35ac8e52b9a",
        "originalDurationSeconds": 6.066667,
        "youtubeId": "70fTYo2LVjA",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-06.mp4": {
        "title": {
          "he": "שביל וגדרות חיות בגן",
          "en": "Garden path and hedges",
          "pl": "Ścieżka i żywopłoty w ogrodzie",
          "de": "Gartenweg und Hecken",
          "cs": "Zahradní cesta a živé ploty"
        },
        "sourceSHA256": "aeacafcb0fca2c2227e718cac4d2024eeb4d93fec1589ad40f9b3ba4e8d1228f",
        "uploadSHA256": "37db1c8a234ced4f6dc925b7aa6e4f24ac040d0ab9be29531a9e5aecfdc15bea",
        "originalDurationSeconds": 4.0,
        "youtubeId": "Ly0PIKBKHzQ",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-07.mp4": {
        "title": {
          "he": "הגן ובנייני מתחם בית הקפה",
          "en": "Garden and café complex buildings",
          "pl": "Ogród i budynki kompleksu kawiarni",
          "de": "Garten und Gebäude des Cafékomplexes",
          "cs": "Zahrada a budovy areálu kavárny"
        },
        "sourceSHA256": "bfc0e7c7de9f1aff0d600ea2d95f7ecf998830f5c3267769f05d43055acc69ab",
        "uploadSHA256": "1c52435583a6ac6270deb38c25d1b6ff310f63c452ab912916b2fb395b999be9",
        "originalDurationSeconds": 7.125,
        "youtubeId": "HvpsxHDp5sA",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-08.mp4": {
        "title": {
          "he": "מבט מקרוב על צמחי הגן",
          "en": "A closer look at garden plants",
          "pl": "Rośliny w ogrodzie z bliska",
          "de": "Gartenpflanzen aus der Nähe",
          "cs": "Pohled zblízka na zahradní rostliny"
        },
        "sourceSHA256": "d91d874a1521fd9e71d6a72b021e2f25459715d927739563f760a70c555921ec",
        "uploadSHA256": "e0650fb0f32a6c0dfa6da7f3350fd98084d3cf42c9b8f56aeb4c250026c9b69f",
        "originalDurationSeconds": 3.566667,
        "youtubeId": "cPsYNR_MhgQ",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      },
      "/assets/food-cafes/jadwigi-visit-09.mp4": {
        "title": {
          "he": "קפה ועוגה בביקור שלנו",
          "en": "Coffee and cake during our visit",
          "pl": "Kawa i ciasto podczas naszej wizyty",
          "de": "Kaffee und Kuchen bei unserem Besuch",
          "cs": "Káva a moučník během naší návštěvy"
        },
        "sourceSHA256": "3a2bf411df023b93e52961ffb4074a1834f6e4f705d4cbdffe9c2a2afa6dbce0",
        "uploadSHA256": "4bc90868d82b38a2521340561f481ec33deacfd612203319c2383fda77929ab9",
        "originalDurationSeconds": 3.933333,
        "youtubeId": "HqoVMQUWySQ",
        "reviewedAt": "2026-10-18",
        "audio": "omitted-background-conversation"
      }
    }
  },
  "socialPosts": [],
  "status": "published",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "factualSources": [
      {
        "type": "official",
        "url": "https://www.ndwroclaw.com/kawiarnia",
        "checkedAt": "2026-10-18",
        "note": "Official café name, coffee, on-site baking and garden; visually compared official garden photographs with original visit media."
      },
      {
        "type": "official",
        "url": "https://www.ndwroclaw.com/kontakt",
        "checkedAt": "2026-10-18",
        "note": "Official address and reservation contacts."
      }
    ],
    "coordinateVerification": {
      "sourceUrl": "https://www.openstreetmap.org/node/13749056601",
      "checkedAt": "2026-10-18",
      "note": "OSM café POI matches exact name and official street address; separate from monastery and church."
    },
    "sourceFolder": "/Users/rachelfiler/Desktop/Wroclaw/בית קפה במנזר",
    "personalMediaPermission": false
  },
  "sourceUrls": []
},
{
  "id": "math-tower",
  "aliases": [
    "mathematical-tower",
    "Wieża Matematyczna",
    "המגדל המתמטי"
  ],
  "localName": "Wieża Matematyczna",
  "name": {
    "he": "המגדל המתמטי",
    "en": "Mathematical Tower",
    "pl": "Wieża Matematyczna",
    "de": "Mathematischer Turm",
    "cs": "Matematická věž"
  },
  "description": {
    "he": "המגדל במוזיאון אוניברסיטת ורוצלב שימש מצפה כוכבים מ־1791. מרפסת התצפית בגובה כ־42 מטרים משקיפה על העיר. תמונות הביקור שלנו מציגות את המגדל המואר מבחוץ, פסל במרפסת ומבט מהנהר. העלייה במדרגות, ללא מעלית למגדל. בדקו שעות, כרטיסים ותנאי פתיחת המרפסת; המוזיאון סגור בימי רביעי, בחגים רשמיים ובערב חג המולד.\nWieża Matematyczna\npl. Uniwersytecki 1, Wrocław",
    "en": "The University of Wrocław Museum tower housed an observatory from 1791; its viewing terrace is about 42 m above the city. Our visit photos show the illuminated exterior, a terrace statue and riverside context. Stairs only, with no lift to the tower. Check tickets, hours and terrace access; the museum closes Wednesdays, public holidays and Christmas Eve.\npl. Uniwersytecki 1, Wrocław",
    "pl": "Wieża Muzeum Uniwersytetu Wrocławskiego mieściła obserwatorium od 1791 roku; taras widokowy znajduje się około 42 m nad miastem. Nasze zdjęcia pokazują oświetloną wieżę z zewnątrz, rzeźbę na tarasie i widok od Odry. Wejście schodami, bez windy na wieżę. Sprawdźcie bilety, godziny i dostęp do tarasu; muzeum jest nieczynne w środy, święta państwowe i Wigilię.\npl. Uniwersytecki 1, Wrocław",
    "de": "Der Turm des Universitätsmuseums beherbergte ab 1791 eine Sternwarte; seine Aussichtsterrasse liegt etwa 42 m über der Stadt. Unsere Besuchsfotos zeigen den beleuchteten Turm von außen, eine Terrassenfigur und den Blick von der Oder. Aufstieg über Treppen, kein Aufzug zum Turm. Tickets, Öffnungszeiten und Terrassenzugang prüfen; mittwochs, an gesetzlichen Feiertagen und Heiligabend bleibt das Museum geschlossen.\npl. Uniwersytecki 1, Wrocław",
    "cs": "Věž univerzitního muzea sloužila od roku 1791 jako hvězdárna; vyhlídková terasa leží asi 42 m nad městem. Naše fotografie ukazují osvětlenou věž zvenčí, sochu na terase a pohled od Odry. Výstup po schodech, bez výtahu na věž. Ověřte vstupenky, otevírací dobu a přístup na terasu; muzeum má zavřeno ve středu, o státních svátcích a na Štědrý den.\npl. Uniwersytecki 1, Wrocław"
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.11391,
      "lng": 17.03329
    },
    "address": {"street": "pl. Uniwersytecki 1", "city": "Wrocław", "countryCode": "PL", "postalCode": "50-137"}
  },
  "categories": [
    "viewpoint",
    "museum",
    "history",
    "architecture"
  ],
  "taxonomy": {
    "tags": [
      "museums-history",
      "architecture-design"
    ]
  },
  "links": {
    "website": "https://muzeum.uni.wroc.pl/plan-zwiedzania/wieza-matematyczna/",
    "socialProfileFallback": false,
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.11391%2C17.03329",
      "appleMaps": "https://maps.apple.com/?ll=51.11391,17.03329&q=Wie%C5%BCa%20Matematyczna"
    }
  },
  "media": {
    "photos": [
      "/assets/mathematical-tower-night.jpg",
      "/assets/mathematical-tower-statue.jpg",
      "/assets/mathematical-tower-riverside.jpg",
      "/assets/gallery-university-01.jpg",
      "/assets/gallery-university-03.jpg"
    ],
    "videos": [],
    "thumbnail": "/assets/mathematical-tower-night.jpg",
    "metadata": {
      "/assets/mathematical-tower-night.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/MATHEMATICAL TOWER/WhatsApp Image 2026-10-19 at 08.41.47 (1).jpeg",
        "alt": {
          "he": "המגדל המתמטי מואר בלילה במבט מהרחוב",
          "en": "Mathematical Tower illuminated at night from the street",
          "pl": "Wieża Matematyczna nocą widziana z ulicy",
          "de": "Mathematischer Turm bei Nacht von der Straße",
          "cs": "Matematická věž v noci z ulice"
        }
      },
      "/assets/mathematical-tower-statue.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/MATHEMATICAL TOWER/WhatsApp Image 2026-10-19 at 08.41.46 (3).jpeg",
        "alt": {
          "he": "פסל במרפסת המגדל המוארת",
          "en": "Statue on the illuminated tower terrace",
          "pl": "Rzeźba na oświetlonym tarasie wieży",
          "de": "Figur auf der beleuchteten Turmterrasse",
          "cs": "Socha na osvětlené terase věže"
        }
      },
      "/assets/mathematical-tower-riverside.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/university/WhatsApp Image 2026-10-19 at 08.41.52 (1).jpeg",
        "alt": {
          "he": "המגדל ובניין האוניברסיטה מעל הנהר בלילה",
          "en": "Tower and university building above the river at night",
          "pl": "Wieża i gmach uniwersytetu nad rzeką nocą",
          "de": "Turm und Universitätsgebäude über dem Fluss bei Nacht",
          "cs": "Věž a univerzitní budova nad řekou v noci"
        }
      }
    }
  },
  "status": "published",
  "provenance": {
    "verifiedAt": "2026-10-19",
    "sourceFolder": "/Users/rachelfiler/Desktop/Wroclaw/MATHEMATICAL TOWER",
    "factualSources": [
      {
        "url": "https://muzeum.uni.wroc.pl/plan-zwiedzania/wieza-matematyczna/",
        "facts": [
          "Museum tower and former astronomical observatory",
          "Observatory founded1791",
          "Viewing terrace about42m",
          "Imperial stairs lead to tower"
        ]
      },
      {
        "url": "https://muzeum.uni.wroc.pl/godziny-otwarcia/",
        "facts": [
          "No elevator to tower",
          "Closed Wednesdays, public holidays, HolySaturday,ChristmasEve",
          "Ticket office closes30minutes before museum"
        ]
      },
      {
        "url": "https://muzeum.uni.wroc.pl/muzeum/kontakt/",
        "facts": [
          "Museum address pl.Uniwersytecki1"
        ]
      }
    ],
    "personalMediaPermission": false
  }
},
  ];
  const towerLegacyPosts = [
  {
    "platform": "facebook",
    "url": "https://www.facebook.com/61591964083308/posts/122109914649398802/",
    "routingExcluded": true
  },
  {
    "platform": "instagram",
    "url": "https://www.instagram.com/p/DbgEDzmnDcY/",
    "routingExcluded": true
  }
];
  window.WROC_CANONICAL_PLACE_SOURCE.find(record => record.id === "math-tower").socialPosts = towerLegacyPosts;
  const october19Refreshes = {
  "pedet": {
    "id": "pedet",
    "localName": "PeDeT Food Hall",
    "name": {
      "he": "מתחם האוכל פדט",
      "en": "PeDeT Food Hall",
      "pl": "PeDeT Food Hall",
      "de": "PeDeT Food Hall",
      "cs": "PeDeT Food Hall"
    },
    "description": {
      "he": "מתחם אוכל ובר בחלל משותף, בתוך בית הכלבו רנומה. אפשר לבחור אוכל ממטבחים שונים ולשבת יחד באזור הישיבה, או לעצור למשקה. בגלריה שלנו נראים הדוכנים, הבר והופעה חיה בזמן הביקור. תוכנית האירועים משתנה, ולכן כדאי לבדוק אותה לפני שמגיעים במיוחד להופעה.\nPeDeT Food Hall\nRenoma\nŚwidnicka 40, Wrocław",
      "en": "A food hall and bar inside the Renoma department store, with different cuisines around a shared seating area. Our visit gallery shows food counters, the bar and a live performance. A practical indoor meal or drinks stop. Check the current programme before coming specifically for music. Address: Świdnicka 40, Wrocław.",
      "pl": "Food hall i bar w domu towarowym Renoma, z różnymi kuchniami wokół wspólnej przestrzeni do siedzenia. Nasza galeria z wizyty pokazuje lokale gastronomiczne, bar i występ na żywo. To propozycja na posiłek lub drinka pod dachem. Przed przyjściem specjalnie na muzykę sprawdź aktualny program. Adres: Świdnicka 40, Wrocław.",
      "de": "Food Hall und Bar im Kaufhaus Renoma, mit verschiedenen Küchen rund um einen gemeinsamen Sitzbereich. Unsere Besuchsgalerie zeigt die Gastronomie, die Bar und einen Liveauftritt. Eine Möglichkeit für eine Mahlzeit oder ein Getränk im Innenbereich. Wer eigens wegen der Musik kommt, sollte das aktuelle Programm prüfen. Adresse: Świdnicka 40, Wrocław.",
      "cs": "Food hall a bar v obchodním domě Renoma, s různými kuchyněmi kolem společného posezení. Naše galerie z návštěvy ukazuje gastronomické provozy, bar a živé vystoupení. Zastávka na jídlo nebo nápoj pod střechou. Pokud přicházíte přímo za hudbou, ověřte si aktuální program. Adresa: Świdnicka 40, Wrocław."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1037104,
        "lng": 17.0324564
      },
      "address": {
        "street": "Świdnicka 40",
        "city": "Wrocław",
        "postalCode": "50-024",
        "countryCode": "PL"
      }
    },
    "categories": [
      "buy",
      "drink",
      "eat"
    ],
    "sourceUrls": [],
    "aliases": [
      "PEDET",
      "PeDeT",
      "PeDeT Renoma"
    ],
    "status": "published",
    "editorialPriority": "medium",
    "taxonomy": {
      "categories": [
        "buy",
        "drink",
        "eat"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://renoma-wroclaw.pl/pedet/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1037104%2C17.0324564",
        "appleMaps": "https://maps.apple.com/?ll=51.1037104,17.0324564&q=PeDeT%20Food%20Hall"
      },
      "socialProfileFallback": false
    },
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "contentType": "personal-visit",
      "personalVisit": true,
      "originalPhotography": true,
      "originalVideo": true,
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://renoma-wroclaw.pl/pedet/",
          "checked": "2026-10-19",
          "supports": [
            "food hall,bar,music/events",
            "current programme link, historically dated events not treated as current"
          ]
        },
        {
          "url": "https://renoma-wroclaw.pl/",
          "checked": "2026-10-19",
          "supports": [
            "Świdnicka40 address",
            "Renoma building"
          ]
        },
        {
          "url": "https://renoma-wroclaw.pl/godziny-otwarcia/",
          "checked": "2026-10-19",
          "supports": [
            "food vendors MonThu11-21,FriSat11-22,Sun11-21",
            "bar MonThu11-23,FriSat11-01,Sun11-23"
          ]
        }
      ],
      "personalMediaPermission": false
    },
    "media": {
      "photos": [
        "/assets/pedet-01.jpg",
        "/assets/pedet-02.jpg",
        "/assets/pedet-03.jpg",
        "/assets/pedet-04.jpg",
        "/assets/pedet-05.jpg",
        "/assets/pedet-06.jpg",
        "/assets/pedet-07.jpg",
        "/assets/pedet-08.jpg",
        "/assets/pedet-09.jpg",
        "/assets/pedet-10.jpg",
        "/assets/pedet-11.jpg",
        "/assets/pedet-12.jpg",
        "/assets/pedet-13.jpg",
        "/assets/pedet-14.jpg",
        "/assets/pedet-15.jpg"
      ],
      "videos": [
        "/assets/video-pedet-01.mp4",
        "/assets/video-pedet-02.mp4",
        "/assets/video-pedet-03.mp4"
      ],
      "metadata": {
        "/assets/pedet-01.jpg": {
          "original": true,
          "heroCandidate": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.34 (1).jpeg",
          "alt": {
            "he": "מבט רחב על אזור הישיבה במתחם האוכל",
            "en": "Wide view of the food hall seating area",
            "pl": "Szeroki widok strefy siedzącej food hallu",
            "de": "Weitblick über den Sitzbereich der Food Hall",
            "cs": "Celkový pohled na posezení ve food hallu"
          }
        },
        "/assets/pedet-02.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.36.jpeg",
          "alt": {
            "he": "הבר והשולחן המשותף במתחם האוכל",
            "en": "Bar and communal table in the food hall",
            "pl": "Bar i wspólny stół w food hallu",
            "de": "Bar und Gemeinschaftstisch in der Food Hall",
            "cs": "Bar a společný stůl ve food hallu"
          }
        },
        "/assets/pedet-03.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.40 (1).jpeg",
          "alt": {
            "he": "אזור הישיבה והופעה חיה בזמן ביקורנו",
            "en": "Seating area and live performance during our visit",
            "pl": "Strefa siedząca i występ na żywo podczas naszej wizyty",
            "de": "Sitzbereich und Liveauftritt während unseres Besuchs",
            "cs": "Posezení a živé vystoupení během naší návštěvy"
          }
        },
        "/assets/pedet-04.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.42 (2).jpeg",
          "alt": {
            "he": "גיטריסט מול השלט המואר של המתחם",
            "en": "Guitarist in front of the illuminated PeDeT sign",
            "pl": "Gitarzysta przed podświetlonym napisem PeDeT",
            "de": "Gitarrist vor dem beleuchteten PeDeT-Schriftzug",
            "cs": "Kytarista před osvětleným nápisem PeDeT"
          }
        },
        "/assets/pedet-05.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.42 (1).jpeg",
          "alt": {
            "he": "מבט נוסף על הבמה הקטנה במתחם",
            "en": "Another view of the small stage",
            "pl": "Kolejny widok niewielkiej sceny",
            "de": "Weiterer Blick auf die kleine Bühne",
            "cs": "Další pohled na malou scénu"
          }
        },
        "/assets/pedet-06.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.41.jpeg",
          "alt": {
            "he": "שלט דוכן האוכל האיטלקי במתחם",
            "en": "Italian food counter sign in the food hall",
            "pl": "Szyld włoskiego lokalu gastronomicznego",
            "de": "Schild des italienischen Gastronomiestands",
            "cs": "Označení italského gastronomického stánku"
          }
        },
        "/assets/pedet-07.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.41 (1).jpeg",
          "alt": {
            "he": "שורת דוכני אוכל ומעבר פנימי",
            "en": "Row of food counters and interior walkway",
            "pl": "Rząd lokali gastronomicznych i wewnętrzne przejście",
            "de": "Reihe der Gastronomiestände und innerer Durchgang",
            "cs": "Řada gastronomických stánků a vnitřní průchod"
          }
        },
        "/assets/pedet-08.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.41 (2).jpeg",
          "alt": {
            "he": "מבט לאורך המעבר בין דוכני האוכל",
            "en": "View along the passage between food counters",
            "pl": "Widok wzdłuż przejścia między lokalami",
            "de": "Blick entlang des Gangs zwischen den Gastronomieständen",
            "cs": "Pohled podél průchodu mezi gastronomickými stánky"
          }
        },
        "/assets/pedet-09.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.56.42.jpeg",
          "alt": {
            "he": "השלט בכניסה למתחם האוכל",
            "en": "Sign at the food hall entrance",
            "pl": "Napis przy wejściu do food hallu",
            "de": "Schriftzug am Eingang zur Food Hall",
            "cs": "Nápis u vstupu do food hallu"
          }
        },
        "/assets/pedet-10.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.34 (2).jpeg",
          "alt": {
            "he": "השולחן המשותף והישיבה לאורך המתחם",
            "en": "Communal table and seating along the food hall",
            "pl": "Wspólny stół i miejsca do siedzenia w food hallu",
            "de": "Gemeinschaftstisch und Sitzplätze entlang der Food Hall",
            "cs": "Společný stůl a posezení podél food hallu"
          }
        },
        "/assets/pedet-11.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.34 (3).jpeg",
          "alt": {
            "he": "חזית מסעדה סמוכה במתחם רנומה",
            "en": "Front of a neighbouring restaurant in Renoma",
            "pl": "Front sąsiedniej restauracji w Renomie",
            "de": "Front eines benachbarten Restaurants in der Renoma",
            "cs": "Průčelí sousední restaurace v Renomě"
          }
        },
        "/assets/pedet-12.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.35 (1).jpeg",
          "alt": {
            "he": "סמל המתחם על הקיר",
            "en": "PeDeT logo on the wall",
            "pl": "Logo PeDeT na ścianie",
            "de": "PeDeT-Logo an der Wand",
            "cs": "Logo PeDeT na stěně"
          }
        },
        "/assets/pedet-13.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.35.jpeg",
          "alt": {
            "he": "שם מתחם האוכל על קיר אפור",
            "en": "Food hall name on a grey wall",
            "pl": "Nazwa food hallu na szarej ścianie",
            "de": "Name der Food Hall an einer grauen Wand",
            "cs": "Název food hallu na šedé stěně"
          }
        },
        "/assets/pedet-14.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.40 (2).jpeg",
          "alt": {
            "he": "הבר ואזור הישיבה בשעת הביקור",
            "en": "Bar and seating area during our visit",
            "pl": "Bar i strefa siedząca podczas naszej wizyty",
            "de": "Bar und Sitzbereich während unseres Besuchs",
            "cs": "Bar a posezení během naší návštěvy"
          }
        },
        "/assets/pedet-15.jpg": {
          "original": true,
          "sourceFile": "WhatsApp Image 2026-09-25 at 12.57.40.jpeg",
          "alt": {
            "he": "מבט נוסף לאורך הבר ואזור הישיבה",
            "en": "Another view along the bar and seating area",
            "pl": "Kolejny widok baru i strefy siedzącej",
            "de": "Weiterer Blick entlang der Bar und des Sitzbereichs",
            "cs": "Další pohled podél baru a posezení"
          }
        },
        "/assets/video-pedet-01.mp4": {
          "original": true,
          "sourceFile": "WhatsApp Video 2026-09-25 at 12.56.40.mp4"
        },
        "/assets/video-pedet-02.mp4": {
          "original": true,
          "sourceFile": "WhatsApp Video 2026-09-25 at 12.57.37.mp4"
        },
        "/assets/video-pedet-03.mp4": {
          "original": true,
          "sourceFile": "WhatsApp Video 2026-09-25 at 12.57.39.mp4"
        }
      }
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0Yegs3zyk229PCi2BWLpgwKB4BC8M7cGDwtomZv5hksFxAfcv4T52eQGCt8kA92jel&id=61595207664875",
        "verifiedAt": "2026-10-06T23:14:57.941919+00:00"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02A2RFEkpm8mGAndBWrRCtgE2ErkTFUA31KZEihnMrC3KZAMabHW8bZpxNFnUEXYykl&id=61595239823399",
        "verifiedAt": "2026-10-07T14:17:09.335766+00:00"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.de/p/DeMjEb6FO-Z/",
        "verifiedAt": "2026-10-07T14:17:09.335766+00:00"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid034fiT8BLtL7iEV4Y5tHyLroNpAX4btjbERsJ772utbiiQaQ7qk5NrpQUNwyTet47Jl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid028jwLAY6TzJhVXEutJCeCVyGdc81NNtP7mjtj1bfvwLgjuTxHZxVEpiNLPyFv59C7l&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/p/DePRHIWjEqw/",
        "verifiedAt": "2026-10-08"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRCa4AjODJ/",
        "verifiedAt": "2026-10-09T08:05:35.568Z"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid09HB4rfQaHmxjeBz4kJtNdgX5eKnjbboW2hdW9qUhB5vWVvBCYxh9nAsumMNVZQf5l&id=61591964083308",
        "verifiedAt": "2026-10-09T19:11:25.733Z"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeUATwilaWF/",
        "verifiedAt": "2026-10-10T11:46:00.592Z"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/61591964083308/posts/122108686497398802/",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0Yegs3zyk229PCi2BWLpgwKB4BC8M7cGDwtomZv5hksFxAfcv4T52eQGCt8kA92jel&id=61595207664875",
        "verifiedAt": "2026-10-06T23:14:57.941919+00:00"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02A2RFEkpm8mGAndBWrRCtgE2ErkTFUA31KZEihnMrC3KZAMabHW8bZpxNFnUEXYykl&id=61595239823399",
        "verifiedAt": "2026-10-07T14:17:09.335766+00:00"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.de/p/DeMjEb6FO-Z/",
        "verifiedAt": "2026-10-07T14:17:09.335766+00:00"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid034fiT8BLtL7iEV4Y5tHyLroNpAX4btjbERsJ772utbiiQaQ7qk5NrpQUNwyTet47Jl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid028jwLAY6TzJhVXEutJCeCVyGdc81NNtP7mjtj1bfvwLgjuTxHZxVEpiNLPyFv59C7l&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/p/DePRHIWjEqw/",
        "verifiedAt": "2026-10-08"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRCa4AjODJ/",
        "verifiedAt": "2026-10-09T08:05:35.568Z"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid09HB4rfQaHmxjeBz4kJtNdgX5eKnjbboW2hdW9qUhB5vWVvBCYxh9nAsumMNVZQf5l&id=61591964083308",
        "verifiedAt": "2026-10-09T19:11:25.733Z"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeUATwilaWF/",
        "verifiedAt": "2026-10-10T11:46:00.592Z"
      }
    ]
  },
  "renoma": {
    "id": "renoma",
    "localName": "Renoma",
    "name": {
      "he": "מרכז הקניות רנומה",
      "en": "Renoma Department Store",
      "pl": "Dom Handlowy Renoma",
      "de": "Kaufhaus Renoma",
      "cs": "Obchodní dům Renoma"
    },
    "description": {
      "he": "בית הכלבו רנומה נפתח ב־1930 ומציע כיום קניות ואוכל במבנה מודרניסטי ייחודי. כדאי להביט בחזית המעוגלת, באריחים ובעיטורי ראשי האדם, וגם בחלל הפנימי ובנברשות. מתחם האוכל פדט נמצא בתוכו, אך הוא נקודה נפרדת במפה. שעות החנויות והמסעדות שונות, וביום ראשון יש לבדוק אם החנויות פתוחות.\nRenoma\nŚwidnicka 40, Wrocław",
      "en": "Opened in 1930, Renoma combines shopping and dining with distinctive modernist architecture. Look at the curved façade, tiles and sculpted portrait heads, then the interior and chandeliers. PeDeT Food Hall is inside but has its own map point. Shops and restaurants have different hours; check Sunday retail opening before visiting. Address: Świdnicka 40, Wrocław.",
      "pl": "Otwarta w 1930 roku Renoma łączy zakupy i gastronomię z charakterystyczną architekturą modernistyczną. Warto obejrzeć zaokrągloną elewację, płytki i rzeźbiarskie głowy, a także wnętrze i żyrandole. PeDeT znajduje się wewnątrz, ale ma osobny punkt na mapie. Sklepy i gastronomia mają różne godziny; sprawdź handel w niedzielę. Adres: Świdnicka 40, Wrocław.",
      "de": "Die 1930 eröffnete Renoma verbindet Einkauf und Gastronomie mit markanter modernistischer Architektur. Sehenswert sind die geschwungene Fassade, Fliesen und Porträtköpfe sowie Innenraum und Kronleuchter. Die PeDeT Food Hall liegt im Gebäude, hat jedoch einen eigenen Kartenpunkt. Geschäfte und Gastronomie haben unterschiedliche Zeiten; die Sonntagsöffnung vorher prüfen. Adresse: Świdnicka 40, Wrocław.",
      "cs": "Renoma, otevřená v roce 1930, spojuje nakupování a gastronomii s výraznou modernistickou architekturou. Prohlédněte si zaoblenou fasádu, obklady a sochařské hlavy, také interiér a lustry. PeDeT je uvnitř, ale má vlastní bod na mapě. Obchody a gastronomie mají odlišné hodiny; ověřte si nedělní otevření obchodů. Adresa: Świdnicka 40, Wrocław."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1038569,
        "lng": 17.0319662
      },
      "address": {"street": "Świdnicka 40", "city": "Wrocław", "countryCode": "PL", "postalCode": "50-024"}
    },
    "categories": [
      "buy",
      "drink",
      "eat",
      "shopping"
    ],
    "sourceUrls": [],
    "aliases": [
      "renoma-rec"
    ],
    "status": "published",
    "editorialPriority": null,
    "taxonomy": {
      "categories": [
        "buy",
        "drink",
        "eat",
        "shopping"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://renoma-wroclaw.pl/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1038569%2C17.0319662",
        "appleMaps": "https://maps.apple.com/?ll=51.1038569,17.0319662&q=Renoma"
      },
      "socialProfileFallback": false
    },
    "media": {
      "photos": [
        "/assets/gallery-renoma-01.jpg",
        "/assets/gallery-renoma-02.jpg",
        "/assets/renoma-refresh-oct19-01.jpg",
        "/assets/renoma-refresh-oct19-02.jpg",
        "/assets/renoma-refresh-oct19-03.jpg",
        "/assets/renoma-refresh-oct19-04.jpg",
        "/assets/renoma-refresh-oct19-05.jpg",
        "/assets/renoma-refresh-oct19-06.jpg",
        "/assets/renoma-refresh-oct19-07.jpg",
        "/assets/renoma-refresh-oct19-08.jpg",
        "/assets/renoma-refresh-oct19-09.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/renoma-refresh-oct19-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-01 at 09.28.23 (3).jpeg",
          "sourceSHA256": "bafffd042f04ff15644c34cb8f1c47c39f8d9002e3825eb04450fcf2364a4bd2",
          "assetSHA256": "dd1adb38b0d23ba257a6f20f9cef719930fefa1988c3b1d6cfe038521a149f86"
        },
        "/assets/renoma-refresh-oct19-02.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-01 at 09.28.23 (4).jpeg",
          "sourceSHA256": "49b1e9c6f45d691a087841a131eeaf7aca78cddd3b4abd5a3f6ade2b1da51948",
          "assetSHA256": "c89f64badd0194cde0b0e1e37b5dfb75928f03672cf849751a4d1bd8d50233af"
        },
        "/assets/renoma-refresh-oct19-03.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-05 at 18.26.39 (4).jpeg",
          "sourceSHA256": "b4787817263dec9a8f12baf1650893b22ca234124055ee1af5a8f27aba20af8d",
          "assetSHA256": "bf5e279ef5a8d0231e8eaf01c8cc1b986cdef932806c3d99e9b840e9d2b144d8"
        },
        "/assets/renoma-refresh-oct19-04.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-05 at 18.27.38 (5).jpeg",
          "sourceSHA256": "0d709a1424d9a54ceebe3bebf942b013682ed71bf274252cdcc85e01438b9e9e",
          "assetSHA256": "bc0dc7dfc8c4c99af2d40f8460fa0490b37a5daf429aa4eb908af2f3569503ca"
        },
        "/assets/renoma-refresh-oct19-05.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-19 at 10.15.24 (2).jpeg",
          "sourceSHA256": "7875d9764f2e26d063d39c79f2e4c95571e9f69f7a6bd25f4686aebee7e4523a",
          "assetSHA256": "e488b674943e1a124532739ca24ae40f101362325caf8e79563d33f188a68832"
        },
        "/assets/renoma-refresh-oct19-06.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-19 at 10.15.24 (6).jpeg",
          "sourceSHA256": "f9b430d1f78e1a4698879223ba27b99101b5dcf01aeddbe8fe8683bdf812338f",
          "assetSHA256": "88786e5d61d8a3fdb417b72c5ff2896b3583105801c2abcfb01c0a334563c2c8"
        },
        "/assets/renoma-refresh-oct19-07.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-19 at 10.15.24 (8).jpeg",
          "sourceSHA256": "614b1eb301f776e00e652f2d10db057c756ba57e4e4170ad45535f7f68062af2",
          "assetSHA256": "79a83ec030a55ec2b0c35970299bdc954607b812b26405ef053c661bd8a8f322"
        },
        "/assets/renoma-refresh-oct19-08.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-19 at 10.15.24 (11).jpeg",
          "sourceSHA256": "736c92c6d34c0c30cf73924e75f0504b14add10097c078325b10af14bf559393",
          "assetSHA256": "d4590ad4c2a44bf336ca3b9d3b32655ba14dee712b1142d1192812fc526231a6"
        },
        "/assets/renoma-refresh-oct19-09.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Renoma/WhatsApp Image 2026-10-19 at 10.15.24.jpeg",
          "sourceSHA256": "5816425c1615aad0c61a03bf4e4d96f5d2cc63ee46d14cec5ce55c940e8f3d01",
          "assetSHA256": "307123435e659eb5bfcaf3a66f34876393415df3841a6972b8b8da235ee87f2a"
        }
      },
      "thumbnail": "/assets/renoma-refresh-oct19-07.jpg"
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0TRrAY16heWNSiP5iDDzcAwhSKLi7Hu6cUn2NT15wMBUzKL2Pu5FGAA8h3u5tjKpYl&id=61595207664875",
        "verifiedAt": "2026-10-06T23:21:52.803528+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02yE6dPEX7WGCb8Fou82HrK1fWqpagf1L1az57vRSFp6F5K23tZM7yiCYwXcHqX9Lpl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMoMKgDmiX/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0a1KW7A2aHNKgpXgheWtWeHpCcDQD6injwUUCuDktDeZu7dFinCh7gKspQFGRBVNVl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DePSGrFAKmY/",
        "verifiedAt": "2026-10-08T15:44:44.092Z"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRG3F0FyOF/",
        "verifiedAt": "2026-10-09T08:44:42.572Z"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02P8JcXrq2697rvposrx8KMvfzoVW3wuxk6cumAYsunoffRzsZrq7GBgixJFDfyJNLl&id=61595239823399",
        "verifiedAt": "2026-10-10T14:49:02.619Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.de/p/DeUYdZtDATM/",
        "verifiedAt": "2026-10-10T15:18:10.572293+00:00"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUu8FTkUSS/",
        "verifiedAt": "2026-10-10T18:32:08.208Z"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/61591964083308/posts/122110542891398802/",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0TRrAY16heWNSiP5iDDzcAwhSKLi7Hu6cUn2NT15wMBUzKL2Pu5FGAA8h3u5tjKpYl&id=61595207664875",
        "verifiedAt": "2026-10-06T23:21:52.803528+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02yE6dPEX7WGCb8Fou82HrK1fWqpagf1L1az57vRSFp6F5K23tZM7yiCYwXcHqX9Lpl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMoMKgDmiX/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0a1KW7A2aHNKgpXgheWtWeHpCcDQD6injwUUCuDktDeZu7dFinCh7gKspQFGRBVNVl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DePSGrFAKmY/",
        "verifiedAt": "2026-10-08T15:44:44.092Z"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRG3F0FyOF/",
        "verifiedAt": "2026-10-09T08:44:42.572Z"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02P8JcXrq2697rvposrx8KMvfzoVW3wuxk6cumAYsunoffRzsZrq7GBgixJFDfyJNLl&id=61595239823399",
        "verifiedAt": "2026-10-10T14:49:02.619Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.de/p/DeUYdZtDATM/",
        "verifiedAt": "2026-10-10T15:18:10.572293+00:00"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUu8FTkUSS/",
        "verifiedAt": "2026-10-10T18:32:08.208Z"
      }
    ],
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://renoma-wroclaw.pl/o-renomie/",
          "checked": "2026-10-19",
          "facts": [
            "Opened2April1930",
            "sculptedportraitheads",
            "restoredceramicfacade"
          ]
        },
        {
          "url": "https://renoma-wroclaw.pl/press/great-return-of-fashion-brands-to-renoma/?lang=en",
          "checked": "2026-10-19",
          "facts": [
            "Historicalopening1930",
            "modernistarchitecture",
            "HermannDernburg"
          ],
          "historicalPressRelease": true
        },
        {
          "url": "https://renoma-wroclaw.pl/",
          "checked": "2026-10-19",
          "facts": [
            "AddressŚwidnicka40",
            "parkingCzysta",
            "buildingaccessibility"
          ]
        },
        {
          "url": "https://renoma-wroclaw.pl/godziny-otwarcia/",
          "checked": "2026-10-19",
          "facts": [
            "ShoppingMonSat9-21,tradingSun10-20",
            "Separatefoodhours"
          ]
        }
      ],
      "personalMediaPermission": false
    }
  },
  "wroclavia": {
    "id": "wroclavia",
    "localName": "Westfield Wroclavia",
    "name": {
      "he": "Westfield Wroclavia",
      "en": "Westfield Wroclavia",
      "pl": "Westfield Wroclavia",
      "de": "Westfield Wroclavia",
      "cs": "Westfield Wroclavia"
    },
    "description": {
      "he": "מרכז קניות מודרני ליד תחנת הרכבת המרכזית, עם חנויות, מסעדות ובתי קפה. יש בו גם קולנוע ומתקני פנאי, ולכן אפשר לשלב קניות והפסקה תחת קורת גג אחת. הסרטון שלנו מציג את הכניסה המוארת בלילה. בימי ראשון ללא מסחר חלק משירותי הבילוי והאוכל פועלים, ויש לבדוק כל עסק בנפרד.\nWestfield Wroclavia\nSucha 1, Wrocław",
      "en": "A modern shopping centre by the main railway station, with shops, restaurants, cafés, cinema and leisure facilities. It combines shopping with an indoor break. Our clip shows the illuminated entrance at night. Selected dining and entertainment remain open on non-trading Sundays; check each venue separately. Address: Sucha 1, Wrocław.",
      "pl": "Nowoczesne centrum handlowe przy dworcu głównym, ze sklepami, restauracjami, kawiarniami, kinem i rozrywką. Łączy zakupy z odpoczynkiem pod dachem. Nasz film pokazuje podświetlone wejście nocą. W niedziele niehandlowe działają wybrane lokale gastronomiczne i rozrywkowe; sprawdź każdy z nich oddzielnie. Adres: Sucha 1, Wrocław.",
      "de": "Modernes Einkaufszentrum am Hauptbahnhof mit Geschäften, Restaurants, Cafés, Kino und Freizeitangeboten. Einkauf und eine Pause im Innenbereich lassen sich verbinden. Unser Clip zeigt den beleuchteten Eingang bei Nacht. An verkaufsfreien Sonntagen öffnen ausgewählte Gastronomie- und Freizeitbetriebe; die jeweiligen Zeiten einzeln prüfen. Adresse: Sucha 1, Wrocław.",
      "cs": "Moderní nákupní centrum u hlavního nádraží s obchody, restauracemi, kavárnami, kinem a zábavou. Nákupy lze spojit s přestávkou pod střechou. Náš klip ukazuje osvětlený vstup v noci. O neprodejních nedělích fungují vybrané gastronomické a zábavní provozy; každý si ověřte zvlášť. Adresa: Sucha 1, Wrocław."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.0964311,
        "lng": 17.0348417
      },
      "address": {"street": "Sucha 1", "city": "Wrocław", "countryCode": "PL", "postalCode": "50-086"}
    },
    "categories": [
      "buy",
      "eat",
      "shopping"
    ],
    "sourceUrls": [],
    "aliases": [
      "Wroclavia",
      "wroclavia-rec",
      "wroclavia-station"
    ],
    "status": "published",
    "editorialPriority": "normal",
    "taxonomy": {
      "categories": [
        "buy",
        "eat",
        "shopping"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://www.westfield.com/en/poland/wroclavia",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.0964311%2C17.0348417",
        "appleMaps": "https://maps.apple.com/?ll=51.0964311,17.0348417&q=Westfield%20Wroclavia"
      },
      "socialProfileFallback": false
    },
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "contentType": "official-name-update",
      "factualSources": [
        {
          "url": "https://www.westfield.com/en/poland/wroclavia",
          "checked": "2026-10-19"
        },
        {
          "url": "https://www.westfield.com/en/poland/wroclavia/news/opening-hours-on-non-commercial-sundays/112423",
          "checked": "2026-10-19"
        },
        {
          "url": "https://cm.westfield.com/en/poland/wroclavia/contact-us",
          "checked": "2026-10-19"
        },
        {
          "url": "https://www.westfield.com/en/poland/wroclavia/shops/services",
          "checked": "2026-10-19"
        }
      ],
      "verifiedAt": "2026-10-19",
      "personalMediaPermission": false
    },
    "media": {
      "photos": [
        "/assets/gallery-wroclavia-01.jpg",
        "/assets/gallery-wroclavia-02.jpg",
        "/assets/gallery-wroclavia-03.jpg",
        "/assets/gallery-wroclavia-04.jpg",
        "/assets/gallery-wroclavia-05.jpg",
        "/assets/wroclavia-refresh-oct19-01.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/wroclavia-refresh-oct19-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/WROCLAWIA/WhatsApp Image 2026-07-30 at 16.04.06.jpeg",
          "sourceSHA256": "b980a5674d1bcdb9007c9c25fbf78494d57b4bffa65c87dd653dc6995329ee55",
          "assetSHA256": "2f0d2591e403d6aaf7a643b6cc9e72ba781f4d077a1887f679dc132f689eca00"
        }
      },
      "thumbnail": "/assets/gallery-wroclavia-01.jpg"
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02jrNuKgdwJ61vwM5vjAa7Xv79ozSSfbBZ7hgh2K6eAn8F2eNUYBNskm5uY78qLQJil&id=61595207664875",
        "verifiedAt": "2026-10-06T23:20:51.066723+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0w7M61tjhHb2WBPx7e2n4uNhtFrUgs2xSUBT4vqpE2cxFQQ1frfh4rvAHa9FUmc6Wl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0xxGFnJd4AKZBtd5iW5hXRVf3AFsYwAsjunpcrM4imAEEKLAdMkCwA9ZNReGR23tKl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/p/DeOt7mQHcTI/",
        "verifiedAt": "2026-10-08"
      },
      {
        "language": "pl",
        "platform": "instagram",
        "url": "https://www.instagram.com/p/DePYM3oDd6y/",
        "verifiedAt": "2026-10-08T16:39:22.083Z"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRMKpzFm-Z/",
        "verifiedAt": "2026-10-09T09:32:51.995981+00:00"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02Y4WJWHQXN7ir8p15rX5HJdDrXJKsJjWoGkG6u5BL6AvASFGgagn8woRHfG2cwvuTl&id=61591964083308",
        "verifiedAt": "2026-10-09T16:40:23.324Z"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid036XWNFvBk9k9FrNe4BHX5oJkiCMnquVEnxKTkeJQ7sXs39ahGmvLPyCPVz6PMKjgLl&id=61595239823399",
        "verifiedAt": "2026-10-10T14:52:04.874Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeUX8QrDfY9/",
        "verifiedAt": "2026-10-10T15:11:52.455Z"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUvWGxkQrh/",
        "verifiedAt": "2026-10-10T18:36:10.004Z"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/61591964083308/posts/122110542891398802/",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02jrNuKgdwJ61vwM5vjAa7Xv79ozSSfbBZ7hgh2K6eAn8F2eNUYBNskm5uY78qLQJil&id=61595207664875",
        "verifiedAt": "2026-10-06T23:20:51.066723+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0w7M61tjhHb2WBPx7e2n4uNhtFrUgs2xSUBT4vqpE2cxFQQ1frfh4rvAHa9FUmc6Wl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0xxGFnJd4AKZBtd5iW5hXRVf3AFsYwAsjunpcrM4imAEEKLAdMkCwA9ZNReGR23tKl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/p/DeOt7mQHcTI/",
        "verifiedAt": "2026-10-08"
      },
      {
        "language": "pl",
        "platform": "instagram",
        "url": "https://www.instagram.com/p/DePYM3oDd6y/",
        "verifiedAt": "2026-10-08T16:39:22.083Z"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRMKpzFm-Z/",
        "verifiedAt": "2026-10-09T09:32:51.995981+00:00"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02Y4WJWHQXN7ir8p15rX5HJdDrXJKsJjWoGkG6u5BL6AvASFGgagn8woRHfG2cwvuTl&id=61591964083308",
        "verifiedAt": "2026-10-09T16:40:23.324Z"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid036XWNFvBk9k9FrNe4BHX5oJkiCMnquVEnxKTkeJQ7sXs39ahGmvLPyCPVz6PMKjgLl&id=61595239823399",
        "verifiedAt": "2026-10-10T14:52:04.874Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeUX8QrDfY9/",
        "verifiedAt": "2026-10-10T15:11:52.455Z"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUvWGxkQrh/",
        "verifiedAt": "2026-10-10T18:36:10.004Z"
      }
    ]
  },
  "pasaz": {
    "id": "pasaz",
    "localName": "Pasaż Grunwaldzki",
    "name": {
      "he": "Pasaż Grunwaldzki",
      "en": "Pasaż Grunwaldzki",
      "pl": "Pasaż Grunwaldzki",
      "de": "Pasaż Grunwaldzki",
      "cs": "Pasaż Grunwaldzki"
    },
    "description": {
      "he": "מרכז קניות ואוכל בכיכר גרונדוולדזקי, עם חנויות, בתי קפה וקולנוע. נוח להגיע בתחבורה הציבורית אל תחנות הכיכר. בגלריה מוצגים הכניסה, הסביבה ופעילות יצירה שתועדה בעת ביקורנו; אין בכך הבטחה שהפעילות מתקיימת כיום. לפני ביקור ביום ראשון יש לבדוק את שעות החנויות והעסקים הפתוחים.\nPasaż Grunwaldzki\nPlac Grunwaldzki 22, Wrocław",
      "en": "Shopping and dining centre on Grunwaldzki Square, with shops, cafés and a cinema. Public transport stops serve the square. Our gallery shows the entrance, surroundings and a craft activity recorded during our visit, not a current event promise. Check Sunday retail opening and individual venues before visiting. Address: Plac Grunwaldzki 22, Wrocław.",
      "pl": "Centrum zakupów i gastronomii przy placu Grunwaldzkim, ze sklepami, kawiarniami i kinem. Przy placu zatrzymuje się komunikacja miejska. Galeria pokazuje wejście, otoczenie i warsztaty uchwycone podczas naszej wizyty, nie zapowiedź bieżącego wydarzenia. Przed wizytą w niedzielę sprawdź otwarcie sklepów i poszczególnych lokali. Adres: Plac Grunwaldzki 22, Wrocław.",
      "de": "Einkaufs- und Gastronomiezentrum am Grunwaldzki-Platz mit Geschäften, Cafés und Kino. Öffentliche Verkehrsmittel halten am Platz. Unsere Galerie zeigt Eingang, Umgebung und während unseres Besuchs dokumentiertes Basteln, keine Zusage einer aktuellen Veranstaltung. Vor einem Sonntagsbesuch die Öffnung der Geschäfte und einzelnen Betriebe prüfen. Adresse: Plac Grunwaldzki 22, Wrocław.",
      "cs": "Nákupní a gastronomické centrum na náměstí Grunwaldzki s obchody, kavárnami a kinem. Na náměstí zastavuje veřejná doprava. Galerie ukazuje vstup, okolí a tvořivou aktivitu zachycenou při naší návštěvě, nikoli příslib aktuální akce. Před nedělní návštěvou ověřte otevření obchodů a jednotlivých provozoven. Adresa: Plac Grunwaldzki 22, Wrocław."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1121562,
        "lng": 17.0597204
      },
      "address": {"street": "Plac Grunwaldzki 22", "city": "Wrocław", "countryCode": "PL", "postalCode": "50-363"}
    },
    "categories": [
      "buy",
      "eat"
    ],
    "sourceUrls": [],
    "aliases": [],
    "status": "published",
    "editorialPriority": null,
    "taxonomy": {
      "categories": [
        "buy",
        "eat"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://pasazgrunwaldzki.pl/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1121562%2C17.0597204",
        "appleMaps": "https://maps.apple.com/?ll=51.1121562,17.0597204&q=Pasa%C5%BC%20Grunwaldzki"
      },
      "socialProfileFallback": false
    },
    "media": {
      "photos": [
        "/assets/pasaz-refresh-oct19-01.jpg",
        "/assets/pasaz-refresh-oct19-02.jpg",
        "/assets/pasaz-refresh-oct19-03.jpg",
        "/assets/pasaz-refresh-oct19-04.jpg",
        "/assets/pasaz-refresh-oct19-05.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/pasaz-refresh-oct19-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PASSAGE GRUNWALDI/WhatsApp Image 2026-10-05 at 18.26.34 (4).jpeg",
          "sourceSHA256": "6f566c0563fa49e115c3812f02f7e693ffac83b70ef0ccab1b49034471f999b0",
          "assetSHA256": "571ecbb54d8fa8da328bf0025bdf64eafca4b8adcc899fe07387c9e724224a81"
        },
        "/assets/pasaz-refresh-oct19-02.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PASSAGE GRUNWALDI/WhatsApp Image 2026-10-05 at 18.26.34 (6).jpeg",
          "sourceSHA256": "cbc4eb8490f28beec1cd8d44c2165096e43011dcad6274f0ed1d8a3fc02ffb2c",
          "assetSHA256": "d1032a897a2cd6614e848e545ea0feff56dddce77dab1102022ebbcd6213a9e3"
        },
        "/assets/pasaz-refresh-oct19-03.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PASSAGE GRUNWALDI/WhatsApp Image 2026-10-19 at 08.41.55 (1).jpeg",
          "sourceSHA256": "07873433ee7e273bbb564369f412887b1c9ad8e10704e63d3a974d8cf30cabf3",
          "assetSHA256": "8939e899f7c85b9f2e9533209b1f43a61bdf91df961ccc4c6725776c7b2ab7cd"
        },
        "/assets/pasaz-refresh-oct19-04.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PASSAGE GRUNWALDI/WhatsApp Image 2026-10-19 at 08.41.55 (2).jpeg",
          "sourceSHA256": "494c2093bb69cd5e41d11fb7c6336523e5e45e66810117b263bbc439bf567ca9",
          "assetSHA256": "86135921b78cd387c26b43fd678656584d648879bae6fd733450e9d56a8de0f4"
        },
        "/assets/pasaz-refresh-oct19-05.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PASSAGE GRUNWALDI/WhatsApp Image 2026-10-19 at 08.41.55 (7).jpeg",
          "sourceSHA256": "8c4a2fa55ca4085639974930686e02f7a60e5059d488d49a19413dc0d9f442e7",
          "assetSHA256": "995931c8028268b3c15472c320c907c753798ad051da44b877988df65272eec6"
        }
      },
      "thumbnail": "/assets/pasaz-refresh-oct19-01.jpg"
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0ZPHDnGxwvLsLVX4C75rFtnwh3o1NEqhUEYxXjsbWbkTxQPLrgkRpqiUd9d17EMQnl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02Lkv7Dxp8qrQjVamvnRMPwZGAjGXuDo6JXP1dpmJdM64k3CVsMbxbc7NKz7f2vr1Rl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02UPyx8f3zv9Qd5aE84HG72B1DMZf2Z8YUnxGPg8uNNNLC7eT5znDvVfpowDJ7UgHUl&id=61595239823399",
        "verifiedAt": "2026-10-08T14:24:13.626965+00:00"
      },
      {
        "language": "pl",
        "platform": "facebook",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid08aDfzxTndg1ApvtgBy3bmZLhNFQoitGWgGmQGb35id88PtHfUsPxw5HFGRgeTqjDl&id=61595207664875",
        "verifiedAt": "2026-10-08T16:27:57.155Z"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/61591964083308/posts/122110542891398802/",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0ZPHDnGxwvLsLVX4C75rFtnwh3o1NEqhUEYxXjsbWbkTxQPLrgkRpqiUd9d17EMQnl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02Lkv7Dxp8qrQjVamvnRMPwZGAjGXuDo6JXP1dpmJdM64k3CVsMbxbc7NKz7f2vr1Rl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02UPyx8f3zv9Qd5aE84HG72B1DMZf2Z8YUnxGPg8uNNNLC7eT5znDvVfpowDJ7UgHUl&id=61595239823399",
        "verifiedAt": "2026-10-08T14:24:13.626965+00:00"
      },
      {
        "language": "pl",
        "platform": "facebook",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid08aDfzxTndg1ApvtgBy3bmZLhNFQoitGWgGmQGb35id88PtHfUsPxw5HFGRgeTqjDl&id=61595207664875",
        "verifiedAt": "2026-10-08T16:27:57.155Z"
      }
    ],
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://pasazgrunwaldzki.pl/",
          "checked": "2026-10-19"
        },
        {
          "url": "https://pasazgrunwaldzki.pl/informacje/",
          "checked": "2026-10-19"
        },
        {
          "url": "https://pasazgrunwaldzki.pl/kontakt/",
          "checked": "2026-10-19"
        }
      ],
      "personalMediaPermission": false
    }
  },
  "pergola": {
    "id": "pergola",
    "localName": "Pergola Wrocławska",
    "name": {
      "he": "הפרגולה של ורוצלב",
      "en": "Wrocław Pergola",
      "pl": "Pergola Wrocławska",
      "de": "Pergola Wrocław",
      "cs": "Vratislavská pergola"
    },
    "description": {
      "he": "טיילת עמודים מקושתת בתכנון הנס פֶּלציג, בצדו הצפון־מזרחי של היכל המאה. הצמחייה המטפסת יוצרת צל ומסגרת לתצפית אל בריכת המזרקה. מקום להליכה רגועה בין אתרי המתחם. הגישה חופשית בכפוף למגבלות אירועים; בדקו עדכונים לפני הביקור.",
      "en": "Hans Poelzig designed this curved colonnade northeast of Centennial Hall. Climbing greenery shades the promenade and frames views towards the fountain basin. It makes a relaxed walking stop between nearby sights. Public access is free, subject to event restrictions; check current notices.",
      "pl": "Łukowata kolumnada projektu Hansa Poelziga leży na północny wschód od Hali Stulecia. Pnącza ocieniają promenadę i obramowują widok na nieckę fontanny. To spokojny przystanek między pobliskimi atrakcjami. Wstęp jest bezpłatny, z możliwymi ograniczeniami podczas wydarzeń; sprawdź aktualne komunikaty.",
      "de": "Hans Poelzig entwarf diese geschwungene Säulenpromenade nordöstlich der Jahrhunderthalle. Kletterpflanzen spenden Schatten und rahmen den Blick zum Brunnenbecken. Ein ruhiger Zwischenstopp beim Spaziergang durch das Gelände. Der öffentliche Zugang ist kostenlos, kann bei Veranstaltungen aber eingeschränkt sein; aktuelle Hinweise beachten.",
      "cs": "Zakřivenou sloupovou promenádu severovýchodně od Haly století navrhl Hans Poelzig. Popínavé rostliny poskytují stín a rámují výhled k nádrži fontány. Hodí se ke klidné zastávce mezi okolními památkami. Veřejný vstup je bezplatný, při akcích však může být omezen; ověřte aktuální oznámení."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.10882,
        "lng": 17.07762
      },
      "address": {"street": "Wystawowa 1", "city": "Wrocław", "countryCode": "PL", "postalCode": "51-618"}
    },
    "categories": [
      "architecture",
      "nature"
    ],
    "sourceUrls": [],
    "aliases": [
      "pergola-wroclawska"
    ],
    "status": "published",
    "editorialPriority": "high",
    "taxonomy": {
      "categories": [
        "architecture",
        "nature"
      ],
      "tags": [
        "architecture",
        "walking",
        "photography",
        "outdoor",
        "green-space"
      ]
    },
    "suitability": {
      "recommendedFor": [
        "couples",
        "families",
        "architecture-lovers",
        "photographers"
      ],
      "walkingIntensity": "easy",
      "familyFriendly": true,
      "couples": true,
      "solo": true,
      "romantic": true,
      "indoorOutdoor": "outdoor",
      "rainFriendly": "partial",
      "budgetLevel": null,
      "accessibility": {
        "level": "good",
        "notes": {
          "he": "הטיילת ברובה מישורית, אך ייתכנו משטחים לא אחידים ועומס באירועים.",
          "en": "The promenade is mostly level, though some surfaces may be uneven and events can make it busy.",
          "pl": "Promenada jest w większości płaska, choć miejscami nawierzchnia może być nierówna, a podczas wydarzeń bywa tłoczno.",
          "de": "Die Promenade ist überwiegend eben; einzelne Flächen können jedoch uneben sein, und bei Veranstaltungen kann es voll werden.",
          "cs": "Promenáda je převážně rovná, místy však může být povrch nerovný a během akcí zde bývá rušno."
        }
      }
    },
    "visit": {
      "durationMinutes": 30,
      "bestTimeOfDay": [
        "morning",
        "afternoon",
        "evening"
      ],
      "seasonalSuitability": [
        "spring",
        "summer",
        "autumn"
      ],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://halastulecia.pl/zwiedzanie/pergola/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10882%2C17.07762",
        "appleMaps": "https://maps.apple.com/?ll=51.10882,17.07762&q=Pergola%20Wroc%C5%82awska"
      },
      "socialProfileFallback": false
    },
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "contentType": "personal-visit",
      "personalVisit": true,
      "originalContent": true,
      "originalPhotography": true,
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://halastulecia.pl/zwiedzanie/pergola/",
          "checkedAt": "2026-10-19",
          "supports": [
            "Hans Poelzig",
            "northeast of Hall",
            "curved colonnade",
            "climbing greenery"
          ]
        },
        {
          "url": "https://www.halastulecia.pl/wp-content/uploads/2020/12/HS_regulamin_pergoli_www.pdf",
          "checkedAt": "2026-10-19",
          "supports": [
            "address",
            "free public access",
            "event restrictions"
          ]
        }
      ],
      "personalMediaPermission": false
    },
    "media": {
      "photos": [
        "/assets/pergola-wroclawska-01.jpg",
        "/assets/pergola-wroclawska-04.jpg",
        "/assets/pergola-wroclawska-05.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/pergola-wroclawska-01.jpg": {
          "tags": [
            "pergola",
            "architecture",
            "greenery",
            "hero"
          ],
          "original": true,
          "heroCandidate": true,
          "sourceFile": "IMG_5068.JPG"
        },
        "/assets/pergola-wroclawska-02.jpg": {
          "tags": [
            "pergola",
            "architecture",
            "greenery",
            "promenade"
          ],
          "original": true,
          "sourceFile": "IMG_5073.JPG"
        },
        "/assets/pergola-wroclawska-03.jpg": {
          "tags": [
            "pergola",
            "architecture",
            "greenery",
            "visitor-experience"
          ],
          "original": true,
          "sourceFile": "IMG_5074.JPG"
        },
        "/assets/pergola-wroclawska-04.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Pergola/IMG_5811.JPG",
          "sourceSHA256": "f417d7567f216609609bdc7b8c522e1101bab9f7f5e35662f974a3d6cc3e206b",
          "assetSHA256": "418ceaa0d04f859b41f8714cdc5a6a0b68603471b8d7995cfe650ee3ce95b522"
        },
        "/assets/pergola-wroclawska-05.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Pergola/IMG_5813.JPG",
          "sourceSHA256": "a0b3b27b810e68ba9bd91e0d5bc0cfca1fbb218d39457cdd5f65a539764818e7",
          "assetSHA256": "35d4141c2fcfaea2cc24e44dcef80b25ab3ad1fced76486e477c690e1a8a5b91"
        }
      }
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0PBubtq5LoHRZqauEt2AxHHKPjbGjNhXShCarFr5ogphMk9iHW8vfEF9TfE2F47mdl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeK81I8Dq1T/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02Na5vs8d6rwMAA36q35BkKgcUEwnh5RDVkMKgpGQ2xdT5z8SSiFig3gqkMSsG8i3Vl&id=61595239823399",
        "verifiedAt": "2026-10-06T23:21:49.553281+00:00"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02vNkfpPrKx9P9izcQjcpP1SNoaq9tXZEWDxnNCEz32yLTC7wAaDJ7V6bU836zHiDml&id=61595207664875",
        "verifiedAt": "2026-10-07T00:05:33.503827+00:00"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeLBl7ajYMt/",
        "verifiedAt": "2026-10-07T00:05:33.503827+00:00"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.de/p/DeMa3xtDvbr/",
        "verifiedAt": "2026-10-07T13:03:39.472349+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02Mzn17KRqi5sJhmoVc5hmDy7JAoKDERNTXrnmPReC7miwDF9D4WDY4YcZycdWgVdJl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMqvYBj5jO/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0dgwGcWr9XoWXfW5GRqkXRUEdQ1ZArZ8ykio6KKCQi8tRLzLNjFap26ed7TvSuUMKl&id=61591964083308",
        "verifiedAt": "2026-10-09T20:04:09.107Z"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/share/p/1CHRnrqLwQ/",
        "routingExcluded": true
      },
      {
        "platform": "instagram",
        "url": "https://www.instagram.com/p/Dcn4ySrisOr/?img_index=1",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0PBubtq5LoHRZqauEt2AxHHKPjbGjNhXShCarFr5ogphMk9iHW8vfEF9TfE2F47mdl&id=61595036942289",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeK81I8Dq1T/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02Na5vs8d6rwMAA36q35BkKgcUEwnh5RDVkMKgpGQ2xdT5z8SSiFig3gqkMSsG8i3Vl&id=61595239823399",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02vNkfpPrKx9P9izcQjcpP1SNoaq9tXZEWDxnNCEz32yLTC7wAaDJ7V6bU836zHiDml&id=61595207664875",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeLBl7ajYMt/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.de/p/DeMa3xtDvbr/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02Mzn17KRqi5sJhmoVc5hmDy7JAoKDERNTXrnmPReC7miwDF9D4WDY4YcZycdWgVdJl&id=61594716405964",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMqvYBj5jO/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0dgwGcWr9XoWXfW5GRqkXRUEdQ1ZArZ8ykio6KKCQi8tRLzLNjFap26ed7TvSuUMKl&id=61591964083308",
        "verifiedAt": "2026-10-19"
      }
    ]
  },
  "rynek": {
    "id": "rynek",
    "localName": "Rynek Wrocław",
    "name": {
      "he": "כיכר השוק של ורוצלב",
      "en": "Wrocław Market Square",
      "pl": "Rynek we Wrocławiu",
      "de": "Breslauer Marktplatz",
      "cs": "Vratislavské náměstí"
    },
    "description": {
      "he": "כיכר השוק היא לב העיר העתיקה, מוקפת חזיתות צבעוניות, בתי קפה וסמטאות. הביקור שלנו כולל מבטים על הבתים, מזרקת הזכוכית והכיכר בשעות שונות. בית העירייה העתיק מופיע גם כנקודה נפרדת. הדוכנים והאירועים שבתיעוד הם מביקורים קודמים ואינם פעילות קבועה.",
      "en": "The Market Square is the heart of the Old Town, surrounded by colourful façades, cafés and side streets. Our visit views show its buildings, glass fountain and changing atmosphere. The Old Town Hall has a separate point. Recorded stalls and events are historical, not permanent fixtures.",
      "pl": "Rynek jest sercem Starego Miasta, otoczonym kolorowymi kamienicami, kawiarniami i bocznymi uliczkami. Nasze zdjęcia pokazują fasady, szklaną fontannę i atmosferę różnych pór dnia. Stary Ratusz ma osobny punkt. Utrwalone stoiska i wydarzenia pochodzą z dawnych wizyt, nie są stałą ofertą.",
      "de": "Der Marktplatz bildet das Herz der Altstadt, umgeben von farbigen Fassaden, Cafés und Seitenstraßen. Unsere Aufnahmen zeigen Häuser, Glasbrunnen und wechselnde Stimmungen. Das Alte Rathaus hat einen eigenen Kartenpunkt. Abgebildete Stände und Veranstaltungen stammen von früheren Besuchen und sind kein dauerhaftes Angebot.",
      "cs": "Rynek je srdcem Starého Města, obklopeným barevnými domy, kavárnami a bočními uličkami. Naše snímky ukazují fasády, skleněnou fontánu a proměny atmosféry. Stará radnice má samostatný bod. Zachycené stánky a akce pocházejí z dřívějších návštěv a nejsou stálou nabídkou."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.10932,
        "lng": 17.03167
      }
    },
    "categories": [
      "main",
      "special",
      "start"
    ],
    "sourceUrls": [],
    "aliases": [
      "christmas-market"
    ],
    "status": "published",
    "editorialPriority": null,
    "taxonomy": {
      "categories": [
        "main",
        "special",
        "start"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://visitwroclaw.eu/en/atrakcje/market-square-and-town-hall/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10932%2C17.03167",
        "appleMaps": "https://maps.apple.com/?ll=51.10932,17.03167&q=Rynek%20Wroc%C5%82aw"
      },
      "socialProfileFallback": false
    },
    "media": {
      "photos": [
        "/assets/rynek-market-square.jpg",
        "/assets/old-town-hall-wroclaw.jpg",
        "/assets/rynek-refresh-oct19-01.jpg",
        "/assets/rynek-refresh-oct19-02.jpg",
        "/assets/rynek-refresh-oct19-03.jpg",
        "/assets/rynek-refresh-oct19-04.jpg",
        "/assets/rynek-refresh-oct19-05.jpg",
        "/assets/rynek-refresh-oct19-06.jpg",
        "/assets/rynek-refresh-oct19-07.jpg",
        "/assets/rynek-refresh-oct19-08.jpg"
      ],
      "videos": [
        {
          "src": "/assets/video-rynek-fountains.mp4",
          "title": {
            "he": "המזרקות בכיכר השוק",
            "en": "Market Square fountains",
            "pl": "Fontanny na Rynku",
            "de": "Brunnen auf dem Marktplatz",
            "cs": "Fontány na Rynku"
          }
        },
        {
          "src": "/assets/video-rynek-cinema.mp4",
          "title": {
            "he": "קולנוע פתוח בכיכר",
            "en": "Open-air cinema in the square",
            "pl": "Kino plenerowe na Rynku",
            "de": "Open-Air-Kino auf dem Marktplatz",
            "cs": "Letní kino na náměstí"
          }
        }
      ],
      "metadata": {
        "/assets/rynek-refresh-oct19-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_1045.JPG",
          "sourceSHA256": "5b9de0505d5c1bbd4e19c983e0717df1286f1082925a03f7496a1adc873e37e5",
          "assetSHA256": "7d5abf9bb10203d318f363fc34c51b5c550af936844bc1ad4d404b0f0d8e8c18"
        },
        "/assets/rynek-refresh-oct19-02.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4675.JPG",
          "sourceSHA256": "20bb9d1a6fe9565ff4960d09bf65d774f707f1a8af9f5fece11d7debbd89467b",
          "assetSHA256": "ba2183cd178e07cb49f3437452a455e1395623d43ce504c1a1c3da5310cf8dfc"
        },
        "/assets/rynek-refresh-oct19-03.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4680.JPG",
          "sourceSHA256": "ed18865a793fcf4bf99b04cf565f02f38b360cfc7d4238d3d850ca01db65b598",
          "assetSHA256": "dad8bcefd850935e0f06d65dbd05ad869cec84df83b9762dc5450d4aba8b76c7"
        },
        "/assets/rynek-refresh-oct19-04.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4681.JPG",
          "sourceSHA256": "9d45452ea98a3cadb86bc19a1cfdeeebc15e82e43e1c5df10110344f798b7942",
          "assetSHA256": "c496b3b1f096f0ef16a1bb3ace53c4620b12084013dec4b86c7b259b5d58c5af"
        },
        "/assets/rynek-refresh-oct19-05.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4684.JPG",
          "sourceSHA256": "9f1ddeb6fb3ccfd17377fbb945f8ddf817995b0346d7b1ff456ebcdf658e535a",
          "assetSHA256": "0670e023bca2b8515def2d0908f7e228b5ca576a71dcbe877167abb2762f7c78"
        },
        "/assets/rynek-refresh-oct19-06.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4714.JPG",
          "sourceSHA256": "92f4faad39febffdea290b46f4e5b5532488fd1ec2fbb90c832c7ec394185cab",
          "assetSHA256": "3d0e189cc1ca141376fdc5aa5033dce328a5216b5c33a7fdd4ad33ccbf7f559b"
        },
        "/assets/rynek-refresh-oct19-07.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/WhatsApp Image 2026-10-05 at 18.31.33 (1).jpeg",
          "sourceSHA256": "cee5deb9c4bc0b6c8e14ea6fab20ecf05451c35e5b898b63cdb86a17735a0ca9",
          "assetSHA256": "632153598fa4dfc1a6d9b15b11ddba731b72c8bb3c979c9522028d40aa7892b4"
        },
        "/assets/rynek-refresh-oct19-08.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/WhatsApp Image 2026-10-19 at 08.42.09 (10).jpeg",
          "sourceSHA256": "8bedaab5fa58c4f7ad0dda6abebfee665149b55ca230177e78e023d6cf4e8f37",
          "assetSHA256": "9579844537ebfebd95e2ea5adc16b7fa94940fd7ab561a52ba5bcb7eed9d2c18"
        }
      }
    },
    "socialPosts": [
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeKYP2JFY-c/",
        "verifiedAt": "2026-10-06"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02r7cQXktM43CrwyNJ1R5vvRSjEg5mf7J5Ed4x6kFCQP9iHiDfDG7bM6kHeckNAs6bl&id=61595207664875",
        "verifiedAt": "2026-10-06"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0KeheAnHiYwKPBqobsFupCg6PbrbjFSttmhaKYJF1NAjUZqNb1mZq1RrNm4xTfhWql&id=61595239823399",
        "verifiedAt": "2026-10-06"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeKgn3cFf66/",
        "verifiedAt": "2026-10-06"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0FkkD9Tk1kqxigyX8Dr8T4VSjwfRvUcrhgg8T7SYKEsfAE4C4oPoMrgJATUVEwm4ol&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/wroclaw.lowersilesia/p/DeKxgIVEf4_/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeK0ECXAFUv/",
        "verifiedAt": "2026-10-06T22:10:26.054724+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02g2uAzg2zZWEJU8mHXJo4SWHWMnQM9hQiWjqsbJKCq4xMbgagFoXHjEgYU9quv3Bdl&id=61594716405964",
        "verifiedAt": "2026-10-06T22:27:16.195800+00:00"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02WQQDdwErPyTsbADcmp5ivHoKiw175FEYFeaDBbhiZWw288FbDRWy35a36JsjM9R8l&id=61591964083308",
        "verifiedAt": "2026-10-09T19:13:08.945Z"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeR_sDMG2RQ/",
        "verifiedAt": "2026-10-10T07:46:20.834361+00:00"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeKYP2JFY-c/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02r7cQXktM43CrwyNJ1R5vvRSjEg5mf7J5Ed4x6kFCQP9iHiDfDG7bM6kHeckNAs6bl&id=61595207664875",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0KeheAnHiYwKPBqobsFupCg6PbrbjFSttmhaKYJF1NAjUZqNb1mZq1RrNm4xTfhWql&id=61595239823399",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeKgn3cFf66/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0FkkD9Tk1kqxigyX8Dr8T4VSjwfRvUcrhgg8T7SYKEsfAE4C4oPoMrgJATUVEwm4ol&id=61595036942289",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/wroclaw.lowersilesia/p/DeKxgIVEf4_/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeK0ECXAFUv/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02g2uAzg2zZWEJU8mHXJo4SWHWMnQM9hQiWjqsbJKCq4xMbgagFoXHjEgYU9quv3Bdl&id=61594716405964",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "he",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02WQQDdwErPyTsbADcmp5ivHoKiw175FEYFeaDBbhiZWw288FbDRWy35a36JsjM9R8l&id=61591964083308",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeR_sDMG2RQ/",
        "verifiedAt": "2026-10-19"
      }
    ],
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://visitwroclaw.eu/en/atrakcje/market-square-and-town-hall/",
          "checkedAt": "2026-10-19",
          "supports": [
            "central square",
            "cafés",
            "pedestrian access",
            "Town Hall within square"
          ]
        },
        {
          "url": "https://muzeum.miejskie.wroclaw.pl/en/museum/sztuki-mieszczenskiej/",
          "checkedAt": "2026-10-19",
          "supports": [
            "Gothic Old Town Hall",
            "Museum of Bourgeois Art",
            "Rynek address"
          ],
          "caution": "Source contains visibly malformed hours and inconsistent postal codes; do not copy hours/prices/postal codes"
        }
      ],
      "personalMediaPermission": false
    }
  },
  "slodowa": {
    "id": "slodowa",
    "localName": "Wyspa Słodowa",
    "name": {
      "he": "אי סלודובה",
      "en": "Słodowa Island",
      "pl": "Wyspa Słodowa",
      "de": "Insel Słodowa",
      "cs": "Ostrov Słodowa"
    },
    "description": {
      "he": "אי ירוק בלב זרועות האודר, עם מדשאות, עצים וגדות המשמשות להליכה ולמפגש. הגשרים להולכי רגל מחברים אותו לגדות ולאיים הסמוכים. תמונות הביקור שלנו מציגות את שלט האי, המים והעצים באור ערב, ואת גשר הולכי הרגל כחלק מהסביבה. תחנת מילוי המים והברים הסמוכים הם מקומות נפרדים.\nWyspa Słodowa",
      "en": "A green island between branches of the Oder, with lawns, trees and banks for walking and meeting friends. Footbridges connect it to nearby banks and islands. Our evening visit photos show the island sign, water, trees and a footbridge in context. The water-refill point and nearby bars remain separate places.",
      "pl": "Zielona wyspa między odnogami Odry, z trawnikami, drzewami i brzegami sprzyjającymi spacerom oraz spotkaniom. Kładki łączą ją z pobliskimi nabrzeżami i wyspami. Nasze wieczorne zdjęcia pokazują tablicę wyspy, wodę, drzewa i kładkę w otoczeniu. Punkt poboru wody i pobliskie bary pozostają osobnymi miejscami.",
      "de": "Eine grüne Insel zwischen Oderarmen, mit Rasenflächen, Bäumen und Ufern zum Spazierengehen und Treffen. Fußgängerbrücken verbinden sie mit den benachbarten Ufern und Inseln. Unsere abendlichen Besuchsfotos zeigen das Inselschild, Wasser, Bäume und eine Brücke im Umfeld. Trinkwasserstelle und nahe Bars bleiben eigenständige Orte.",
      "cs": "Zelený ostrov mezi rameny Odry s trávníky, stromy a břehy pro procházky a setkávání. Lávky jej propojují s okolními nábřežími a ostrovy. Naše večerní fotografie ukazují tabuli ostrova, vodu, stromy a lávku v okolní krajině. Pítko a blízké bary zůstávají samostatnými místy."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1169,
        "lng": 17.03737
      }
    },
    "categories": [
      "river"
    ],
    "sourceUrls": [],
    "aliases": [],
    "status": "published",
    "editorialPriority": null,
    "taxonomy": {
      "categories": [
        "river"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://zzm.wroc.pl/obiektyzzmcp/wyspa-slodowa/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1169%2C17.03737",
        "appleMaps": "https://maps.apple.com/?ll=51.1169,17.03737&q=Wyspa%20S%C5%82odowa"
      },
      "socialProfileFallback": false
    },
    "media": {
      "photos": [
        "/assets/wyspa-slodowa/wyspa-slodowa-01.jpg",
        "/assets/wyspa-slodowa/wyspa-slodowa-02.jpg",
        "/assets/wyspa-slodowa/wyspa-slodowa-03.jpg",
        "/assets/wyspa-slodowa/wyspa-slodowa-04.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/wyspa-slodowa/wyspa-slodowa-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/STUDENTS ISLAND - WYSPA SLODOWA/WhatsApp Image 2026-10-19 at 08.41.46 (1).jpeg",
          "sourceSHA256": "43f5bf689c4fb06d92cde8f870991fc07674b185218dbb543d6c8ca823305a40",
          "assetSHA256": "4b1663eb09bac6caec943c943421dad7b31adef332609f40bb0234d8006df3a1"
        },
        "/assets/wyspa-slodowa/wyspa-slodowa-02.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/STUDENTS ISLAND - WYSPA SLODOWA/WhatsApp Image 2026-10-19 at 08.41.46 (2).jpeg",
          "sourceSHA256": "f7b424151314541c0cd95ee80f4a3ee07c6d0f82a72422a948e91f93432cadca",
          "assetSHA256": "69f905d5a33a9e61688c240caa5f172f533998e0ca61c0bb10f8f086c621aec9"
        },
        "/assets/wyspa-slodowa/wyspa-slodowa-03.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/STUDENTS ISLAND - WYSPA SLODOWA/WhatsApp Image 2026-10-19 at 08.41.47 (3).jpeg",
          "sourceSHA256": "e46439af06d38ce9cdc86fd9b6a0f1bfdc1c9ad6d214af6787f4fc3df86c9350",
          "assetSHA256": "b5871cba52183e1c59580f373223a9f1e4930dd07e31740ba4d4bcee2bf6571c"
        },
        "/assets/wyspa-slodowa/wyspa-slodowa-04.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/STUDENTS ISLAND - WYSPA SLODOWA/WhatsApp Image 2026-10-19 at 08.41.49 (3).jpeg",
          "sourceSHA256": "5b28427315c7dc51f2478e3e3f05e1f675f97a4c405e7710f882d63a903909e5",
          "assetSHA256": "1abb078762312792c21b5b6f89283caee00c7ae2d65c59ebd488224d25aea2b9"
        }
      },
      "thumbnail": "/assets/wyspa-slodowa/wyspa-slodowa-01.jpg"
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0M1Scc96KkK1hWEzeduag3dyNj3W2yrsutuLLr6tm9S3exu2jtQ98zXwXckmZsKmMl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0ngQumK9b8tSR51qva9E3FJaA1geZPfhbn5CnB6Nz4oKWtes9sb5efF3PBrvvqvdDl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02qG93ZBdYLnCaFDxv55C1NSefUeXtj8syhFPwsx9DSU1656TY5AFfRnjXLAsveQiyl&id=61595207664875",
        "verifiedAt": "2026-10-08T15:26:30.761Z"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0M1Scc96KkK1hWEzeduag3dyNj3W2yrsutuLLr6tm9S3exu2jtQ98zXwXckmZsKmMl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0ngQumK9b8tSR51qva9E3FJaA1geZPfhbn5CnB6Nz4oKWtes9sb5efF3PBrvvqvdDl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02qG93ZBdYLnCaFDxv55C1NSefUeXtj8syhFPwsx9DSU1656TY5AFfRnjXLAsveQiyl&id=61595207664875",
        "verifiedAt": "2026-10-08T15:26:30.761Z"
      }
    ],
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://zzm.wroc.pl/obiektyzzmcp/wyspa-slodowa/",
          "checked": "2026-10-19",
          "supports": [
            "IslandbetweenOderbranches",
            "Publicrecreational lawns/trees",
            "Footbridgeconnections",
            "Socialmeetingandculturaluse"
          ]
        },
        {
          "url": "https://visitwroclaw.eu/poznaj-i-zwiedzaj/atrakcje/wyspa-slodowa",
          "checked": "2026-10-19",
          "supports": [
            "Tourismidentity"
          ]
        }
      ],
      "personalMediaPermission": false
    }
  },
  "dominikan": {
    "id": "dominikan",
    "localName": "Galeria Dominikańska",
    "name": {
      "he": "Galeria Dominikańska",
      "en": "Galeria Dominikańska",
      "pl": "Galeria Dominikańska",
      "de": "Galeria Dominikańska",
      "cs": "Galeria Dominikańska"
    },
    "description": {
      "he": "מרכז קניות בכיכר דומיניקנסקי, בקרבת העיר העתיקה, עם חנויות, סופרמרקט ואזור אוכל. תצלומי הביקור שלנו מציגים את החזית ואת האטריום המקורה עם הדרגנועים. מתאים לעצירת קניות או אוכל במהלך טיול במרכז. בדקו באתר הרשמי שעות פעילות וחנויות עדכניות, במיוחד בימי ראשון ובחגים.",
      "en": "A shopping centre at Plac Dominikański near the Old Town, with shops, a supermarket and dining. Our visit photographs show the frontage and covered atrium with escalators. A practical shopping or food stop during a central walk. Check current stores and opening arrangements, especially Sundays and holidays.",
      "pl": "Centrum handlowe przy placu Dominikańskim, blisko Starego Miasta, ze sklepami, supermarketem i gastronomią. Nasze zdjęcia pokazują fasadę i zadaszone atrium ze schodami ruchomymi. Przydatny przystanek na zakupy lub posiłek podczas spaceru po centrum. Aktualne sklepy i godziny, zwłaszcza w niedziele i święta, sprawdź na oficjalnej stronie.",
      "de": "Einkaufszentrum am Plac Dominikański nahe der Altstadt mit Geschäften, Supermarkt und Gastronomie. Unsere Besuchsfotos zeigen die Fassade und das überdachte Atrium mit Rolltreppen. Ein praktischer Einkaufs- oder Essensstopp beim Innenstadtspaziergang. Aktuelle Geschäfte und Öffnungszeiten, besonders an Sonn- und Feiertagen, auf der offiziellen Website prüfen.",
      "cs": "Nákupní centrum na náměstí Dominikański poblíž Starého Města s obchody, supermarketem a občerstvením. Naše snímky ukazují průčelí a zastřešené atrium s eskalátory. Praktická zastávka na nákupy či jídlo při procházce centrem. Aktuální obchody a otevírací dobu, zejména v neděli a o svátcích, ověřte na oficiálním webu."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1081196,
        "lng": 17.039349
      },
      "address": {
        "street": "Plac Dominikański 3",
        "postalCode": "50-159",
        "city": "Wrocław",
        "country": "Poland"
      }
    },
    "categories": [
      "buy",
      "eat",
      "shopping"
    ],
    "sourceUrls": [],
    "aliases": [
      "galeria-dominikanska",
      "galeria-dominikana",
      "גלריה דומיניקנסקה",
      "גלריה דומיניקנה"
    ],
    "status": "published",
    "editorialPriority": null,
    "taxonomy": {
      "categories": [
        "buy",
        "eat",
        "shopping"
      ],
      "tags": []
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://galeria-dominikanska.pl/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1081196%2C17.039349",
        "appleMaps": "https://maps.apple.com/?ll=51.1081196,17.039349&q=Galeria%20Dominika%C5%84ska"
      },
      "socialProfileFallback": false
    },
    "media": {
      "photos": [
        "/assets/galeria-dominikanska-01.jpg",
        "/assets/galeria-dominikanska-02.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/galeria-dominikanska-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/GALERIA DOMINIKANA/WhatsApp Image 2026-07-30 at 16.05.23.jpeg",
          "sourceSHA256": "919c88d4338d09c80da83b061d6afa6a5b34a3d090885d5567b902e53f6a0864",
          "assetSHA256": "79d44cd85b4c413950fb5bebb997b7522c40508de305d602c8118dd650223851"
        },
        "/assets/galeria-dominikanska-02.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/GALERIA DOMINIKANA/WhatsApp Image 2026-07-30 at 16.05.23 (1).jpeg",
          "sourceSHA256": "8eaeb63587f210982114e45a103d623ad40903849b1a5ab2d330df62901bc2b5",
          "assetSHA256": "a64e4a33909504777c8a12ffe7b359303a93110c95ff348025510eac319ba303"
        }
      },
      "thumbnail": "/assets/galeria-dominikanska-01.jpg"
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0z2jPJzh3MFxZxnqY77cU3RrWcFyEYP33pafk8KPG7jzxoqfV2trojqWoqDMRDWVUl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid027GKL3ePA9Uxun1kGbKNeN4EhYmbfwh39hu9hsLLtKs728oKPtmmrDHNnEj4stb6Zl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0pxzdvb36264kXQdXhikSjbkKELV3XDxoDE8AowLGnheHigcXxDbkpb7TBLYj5PEsl&id=61595207664875",
        "verifiedAt": "2026-10-07T17:47:10.872858+00:00"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0UkjWLPMLjmijcNQrsdiW9LtTSwVTzejGZ4VjJzkpYUurPRhwkpNv5QGGppTbuxNCl&id=61595239823399",
        "verifiedAt": "2026-10-08T14:06:51.154559+00:00"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/61591964083308/posts/122110542891398802/",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0z2jPJzh3MFxZxnqY77cU3RrWcFyEYP33pafk8KPG7jzxoqfV2trojqWoqDMRDWVUl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid027GKL3ePA9Uxun1kGbKNeN4EhYmbfwh39hu9hsLLtKs728oKPtmmrDHNnEj4stb6Zl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid0pxzdvb36264kXQdXhikSjbkKELV3XDxoDE8AowLGnheHigcXxDbkpb7TBLYj5PEsl&id=61595207664875",
        "verifiedAt": "2026-10-07T17:47:10.872858+00:00"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0UkjWLPMLjmijcNQrsdiW9LtTSwVTzejGZ4VjJzkpYUurPRhwkpNv5QGGppTbuxNCl&id=61595239823399",
        "verifiedAt": "2026-10-08T14:06:51.154559+00:00"
      }
    ],
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://galeria-dominikanska.pl/",
          "checkedAt": "2026-10-19"
        },
        {
          "url": "https://geoportal.wroclaw.pl/poi/poi/1939",
          "checkedAt": "2026-10-19"
        }
      ],
      "personalMediaPermission": false
    }
  },
  "fashion-outlet": {
    "id": "fashion-outlet",
    "localName": "Wrocław Fashion Outlet",
    "name": {
      "he": "פאשן אאוטלט ורוצלב",
      "en": "Wrocław Fashion Outlet",
      "pl": "Wrocław Fashion Outlet",
      "de": "Wrocław Fashion Outlet",
      "cs": "Wrocław Fashion Outlet"
    },
    "description": {
      "he": "מרכז אאוטלט ברחוב גרניצ׳נה במערב ורוצלב, עם חנויות אופנה וספורט, בתי קפה ומקומות לאכול. בגלריית הביקור שלנו נראים החזית, מעברי החנויות, אזור הישיבה, החניה והשילוט ביום ובלילה. מתאים למי שרוצה להקדיש זמן לקניות מחוץ למסלול ההליכה בעיר העתיקה. בדקו באתר הרשמי אילו חנויות ומבצעים פעילים ומהן שעות הפתיחה, במיוחד בימי ראשון ובחגים. התמונות מתעדות ביקור קודם ואינן הבטחה למבצעים או למלאי הנוכחי.",
      "en": "An outlet shopping centre on Graniczna in western Wrocław, with fashion and sports shops, cafés and places to eat. Our visit gallery shows the frontage, shopping passages, seating, parking and signs by day and night. Consider a dedicated shopping stop outside the Old Town walking route. Check the official website for current shops, offers and opening hours, especially on Sundays and holidays. The photographs record an earlier visit and do not guarantee current offers or stock.",
      "pl": "Centrum outletowe przy ulicy Granicznej w zachodniej części Wrocławia, ze sklepami modowymi i sportowymi, kawiarniami i gastronomią. Galeria z naszej wizyty pokazuje fasadę, pasaże handlowe, strefę wypoczynku, parking oraz oznakowanie za dnia i nocą. To propozycja osobnego przystanku na zakupy poza pieszą trasą po Starym Mieście. Aktualne sklepy, promocje i godziny otwarcia, zwłaszcza w niedziele i święta, sprawdź na oficjalnej stronie. Zdjęcia z wcześniejszej wizyty nie gwarantują obecnych ofert ani dostępności towarów.",
      "de": "Outlet-Center an der Graniczna im Westen von Wrocław mit Mode- und Sportgeschäften, Cafés und Gastronomie. Unsere Besuchsgalerie zeigt die Fassade, Einkaufspassagen, Sitzplätze, den Parkplatz und Schilder bei Tag und Nacht. Ein eigener Einkaufsstopp außerhalb des Altstadtrundgangs bietet sich an. Aktuelle Geschäfte, Angebote und Öffnungszeiten, besonders an Sonn- und Feiertagen, auf der offiziellen Website prüfen. Die Fotos eines früheren Besuchs garantieren keine aktuellen Angebote oder Warenbestände.",
      "cs": "Outletové nákupní centrum v ulici Graniczna na západě Vratislavi s obchody s módou a sportovním zbožím, kavárnami a občerstvením. Galerie z naší návštěvy ukazuje průčelí, nákupní pasáže, posezení, parkoviště a označení ve dne i v noci. Hodí se pro samostatnou nákupní zastávku mimo pěší okruh Starým Městem. Aktuální obchody, nabídky a otevírací dobu, zejména o nedělích a svátcích, ověřte na oficiálním webu. Fotografie z dřívější návštěvy nezaručují současné nabídky ani dostupnost zboží."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1067753,
        "lng": 16.9451904
      },
      "address": {
        "street": "Graniczna 2",
        "postalCode": "54-610",
        "city": "Wrocław",
        "country": "Poland"
      }
    },
    "categories": [
      "buy",
      "eat"
    ],
    "sourceUrls": [],
    "aliases": [
      "פאשן אאוטלט",
      "פשיון אאוטלט"
    ],
    "status": "published",
    "editorialPriority": null,
    "taxonomy": {
      "categories": [
        "buy",
        "eat"
      ],
      "tags": [
        "outlet-shopping",
        "fashion",
        "restaurants",
        "wroclaw"
      ]
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://www.wroclawfashionoutlet.com/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1067753%2C16.9451904",
        "appleMaps": "https://maps.apple.com/?ll=51.1067753,16.9451904"
      },
      "socialProfileFallback": false
    },
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "provenance": {
      "personalVisit": true,
      "originalPhotography": true,
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://www.wroclawfashionoutlet.com/en/practical-information",
          "checkedAt": "2026-10-19",
          "supports": [
            "Graniczna 2,54-610 Wrocław",
            "shopping and dining",
            "individual restaurant hours vary"
          ]
        },
        {
          "url": "https://www.wroclawfashionoutlet.com/en/shops",
          "checkedAt": "2026-10-19",
          "supports": [
            "current operator store directory"
          ]
        }
      ],
      "personalMediaPermission": false
    },
    "media": {
      "photos": [
        "/assets/food-cafes/fashion-outlet-01.jpg",
        "/assets/food-cafes/fashion-outlet-02.jpg",
        "/assets/food-cafes/fashion-outlet-03.jpg",
        "/assets/food-cafes/fashion-outlet-04.jpg",
        "/assets/food-cafes/fashion-outlet-05.jpg",
        "/assets/food-cafes/fashion-outlet-06.jpg",
        "/assets/food-cafes/fashion-outlet-07.jpg",
        "/assets/food-cafes/fashion-outlet-08.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/food-cafes/fashion-outlet-01.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (14).jpeg",
          "sourceSHA256": "db81d96f3932f9b2b2cb6e527823f9263a6878d9bbcd11ed512081754b63275f",
          "assetSHA256": "02d20be27a041461409ced412c56ed5ce9f70625c8d08354a6689eb5ae93f23b",
          "alt": {
            "he": "חזית הכניסה למרכז האאוטלט",
            "en": "Outlet centre entrance frontage",
            "pl": "Fasada wejścia do centrum outletowego",
            "de": "Eingangsfront des Outlet-Centers",
            "cs": "Průčelí vstupu do outletového centra"
          },
          "heroCandidate": true
        },
        "/assets/food-cafes/fashion-outlet-02.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.21.11 (15).jpeg",
          "sourceSHA256": "a0be0d7f6ca63b2fe9772ae249e16606865d797d3200f418f57fc165879df032",
          "assetSHA256": "50e7b655f90c0810e19f4ad4a28554c87df7f359704e0e0aa7c139ead2a2a05a",
          "alt": {
            "he": "מבט רחב על הכניסה וסביבתה",
            "en": "Wide view of the entrance and surroundings",
            "pl": "Szeroki widok wejścia i otoczenia",
            "de": "Weitwinkelansicht des Eingangs und der Umgebung",
            "cs": "Široký pohled na vstup a okolí"
          },
          "heroCandidate": false
        },
        "/assets/food-cafes/fashion-outlet-03.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (15).jpeg",
          "sourceSHA256": "784391806b17f32c75366b2dd5c38fe43ce239016fc8c14c551c39c52c6b8ece",
          "assetSHA256": "cebd74c0f5c023b9ac6c5c5ee60709dd1ebf54d93eaafcebc0c63ad93dec91e7",
          "alt": {
            "he": "מעבר החנויות בתוך המרכז",
            "en": "Shopping passage inside the centre",
            "pl": "Pasaż sklepowy wewnątrz centrum",
            "de": "Einkaufspassage im Center",
            "cs": "Nákupní pasáž uvnitř centra"
          },
          "heroCandidate": false
        },
        "/assets/food-cafes/fashion-outlet-04.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (16).jpeg",
          "sourceSHA256": "1bbaf30858026dcfc03dee908e9aab216828d8cca663f40db5e42022e2733f11",
          "assetSHA256": "3dae73d010f16b54491e2b9895b8940047d0a17b606292a837bf73705a5fdac9",
          "alt": {
            "he": "תצוגת אופנה ומעבר מקורה",
            "en": "Fashion display and covered passage",
            "pl": "Ekspozycja mody i kryty pasaż",
            "de": "Modeausstellung und überdachte Passage",
            "cs": "Módní expozice a zastřešená pasáž"
          },
          "heroCandidate": false
        },
        "/assets/food-cafes/fashion-outlet-05.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (17).jpeg",
          "sourceSHA256": "55befb2b78476caad7323e7bb3141296ac677015f5f16ee549b58ad88e0d5859",
          "assetSHA256": "53d8cf84ec6b9814dfe8bb954b28179be8ed78fd3794bedbf2deaabfb9ae3b4a",
          "alt": {
            "he": "אזור ישיבה בין החנויות",
            "en": "Seating area between shops",
            "pl": "Strefa wypoczynku między sklepami",
            "de": "Sitzbereich zwischen den Geschäften",
            "cs": "Odpočinková zóna mezi obchody"
          },
          "heroCandidate": false
        },
        "/assets/food-cafes/fashion-outlet-06.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (11).jpeg",
          "sourceSHA256": "71bc9e44722487decfb79aa109dc0d207f63668bd46477372ba644d20db5741a",
          "assetSHA256": "71241c7a80d35230ce579db6136135fa8e204867f673524ce0f7378604a190ab",
          "alt": {
            "he": "החניה והגישה למרכז",
            "en": "Parking and approach to the centre",
            "pl": "Parking i dojazd do centrum",
            "de": "Parkplatz und Zufahrt zum Center",
            "cs": "Parkoviště a příjezd k centru"
          },
          "heroCandidate": false
        },
        "/assets/food-cafes/fashion-outlet-07.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (10).jpeg",
          "sourceSHA256": "8d7a966de5deb50327f6eeba5bc97f74ffadc61eefc1c919402132f8a15d7ebd",
          "assetSHA256": "5b25dc00b8f910e15bae1c15abc92252942c9563768f1d359da7ba02bfa5b0f2",
          "alt": {
            "he": "שלט המרכז בשעות היום",
            "en": "Centre sign in daylight",
            "pl": "Pylon centrum w świetle dziennym",
            "de": "Center-Schild bei Tageslicht",
            "cs": "Označení centra za denního světla"
          },
          "heroCandidate": false
        },
        "/assets/food-cafes/fashion-outlet-08.jpg": {
          "original": true,
          "sourceFile": "FashionOutlet/WhatsApp Image 2026-09-24 at 19.03.00 (18).jpeg",
          "sourceSHA256": "8cd360748180e497a87a12114d505b9f60c2e231a7a5f4f97f87c3f9349b7eb4",
          "assetSHA256": "03f181b6204084261553da996dfa67fa644fce367a56e6b5968011b3fca69c69",
          "alt": {
            "he": "שלט המרכז המואר בלילה",
            "en": "Illuminated centre sign at night",
            "pl": "Oświetlony pylon centrum nocą",
            "de": "Beleuchtetes Center-Schild bei Nacht",
            "cs": "Osvětlené označení centra v noci"
          },
          "heroCandidate": false
        }
      }
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0y5gxNrJdT65Hx2hoN1zuuqMLhDLTkdTZ5wyS1VNU7H9bivvBkHoR4PZYobJ8hBcAl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0225SeRJ64VFdo6pT42qxSj8WmATUy4D4PHUq7syAKGMeLjEMmcdQ2yrcUQMpJHmv8l&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02DH8kACeRCNniy7ijpmCmq6WED23WsbMqZpehPag3wn3nr5ZJ6EFaaRHaaah5QBKMl&id=61595207664875",
        "verifiedAt": "2026-10-08T13:49:47.255Z"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02jdGppbi5jKEqwf69oW6RtKDku6RifEXF1Axw3xmG6Jum1iwbT9heM86WB4qBwCiFl&id=61595239823399",
        "verifiedAt": "2026-10-08T14:15:04.416768+00:00"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRneIqDUWT/",
        "verifiedAt": "2026-10-09T13:30:03.451Z"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeTsEVcD0KE/",
        "verifiedAt": "2026-10-10T08:48:53.112Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeUU5cHDyxM/",
        "verifiedAt": "2026-10-10T15:08:34.803Z"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/p/DeUh8VcjNsj/",
        "verifiedAt": "2026-10-10T16:40:36.281Z"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUvLXGEXoN/",
        "verifiedAt": "2026-10-10T18:34:11.796Z"
      },
      {
        "platform": "facebook",
        "url": "https://www.facebook.com/61591964083308/posts/122110542891398802/",
        "routingExcluded": true
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0y5gxNrJdT65Hx2hoN1zuuqMLhDLTkdTZ5wyS1VNU7H9bivvBkHoR4PZYobJ8hBcAl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0225SeRJ64VFdo6pT42qxSj8WmATUy4D4PHUq7syAKGMeLjEMmcdQ2yrcUQMpJHmv8l&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02DH8kACeRCNniy7ijpmCmq6WED23WsbMqZpehPag3wn3nr5ZJ6EFaaRHaaah5QBKMl&id=61595207664875",
        "verifiedAt": "2026-10-08T13:49:47.255Z"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02jdGppbi5jKEqwf69oW6RtKDku6RifEXF1Axw3xmG6Jum1iwbT9heM86WB4qBwCiFl&id=61595239823399",
        "verifiedAt": "2026-10-08T14:15:04.416768+00:00"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeRneIqDUWT/",
        "verifiedAt": "2026-10-09T13:30:03.451Z"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeTsEVcD0KE/",
        "verifiedAt": "2026-10-10T08:48:53.112Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeUU5cHDyxM/",
        "verifiedAt": "2026-10-10T15:08:34.803Z"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/p/DeUh8VcjNsj/",
        "verifiedAt": "2026-10-10T16:40:36.281Z"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUvLXGEXoN/",
        "verifiedAt": "2026-10-10T18:34:11.796Z"
      }
    ]
  },
  "fc-caffe-kuznicza": {
    "id": "fc-caffe-kuznicza",
    "aliases": [
      "CAFE FC",
      "Cafe FC",
      "FC CAFFE",
      "FC Caffe",
      "קפה אף סי",
      "קפה אפ סי"
    ],
    "localName": "FC Caffe",
    "name": {
      "he": "קפה אף סי",
      "en": "FC Caffe",
      "pl": "FC Caffe",
      "de": "FC Caffe",
      "cs": "FC Caffe"
    },
    "description": {
      "he": "בית קפה ברחוב קוז׳ניצ׳ה, עם קפה, ארוחות בוקר ועוגות לפי אתר המקום. תמונת הביקור שלנו מציגה את השלט העגול, החזית הפתוחה ושולחנות הישיבה ברחוב. אפשר לשלב הפסקה בדרך בין אזור האוניברסיטה לכיכר השוק.\nFC Caffe\nKuźnicza 30, Wrocław",
      "en": "A café on Kuźnicza serving coffee, breakfast and cakes according to its website. Our visit photograph shows the round sign, open frontage and street-side tables. A possible pause between the university area and Market Square.\nKuźnicza 30, Wrocław",
      "pl": "Kawiarnia przy Kuźniczej, oferująca według własnej strony kawę, śniadania i ciasta. Nasze zdjęcie z wizyty pokazuje okrągły szyld, otwartą fasadę i stoliki na ulicy. Można połączyć przerwę ze spacerem między uniwersytetem a Rynkiem.\nKuźnicza 30, Wrocław",
      "de": "Ein Café an der Kuźnicza mit Kaffee, Frühstück und Kuchen laut eigener Website. Unser Besuchsfoto zeigt das runde Schild, die offene Front und Tische am Straßenrand. Eine mögliche Pause zwischen Universitätsviertel und Rynek.\nKuźnicza 30, Wrocław",
      "cs": "Kavárna v ulici Kuźnicza s kávou, snídaněmi a zákusky podle vlastního webu. Naše fotografie z návštěvy ukazuje kulatý vývěsní štít, otevřené průčelí a stolky u ulice. Možná zastávka mezi univerzitou a Rynkem.\nKuźnicza 30, Wrocław"
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.1132329,
        "lng": 17.0346388
      },
      "address": {"street": "Kuźnicza 30", "city": "Wrocław", "countryCode": "PL", "postalCode": "50-138"}
    },
    "categories": [
      "cafe",
      "food",
      "drink"
    ],
    "links": {
      "socialProfileFallback": false,
      "website": "https://fccaffe.eatbu.com/?lang=pl",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1132329%2C17.0346388",
        "appleMaps": "https://maps.apple.com/?ll=51.1132329,17.0346388&q=FC%20Caffe"
      }
    },
    "media": {
      "photos": [
        "/assets/food-cafes/fc-caffe-kuznicza-01.jpg"
      ],
      "videos": [],
      "metadata": {
        "/assets/food-cafes/fc-caffe-kuznicza-01.jpg": {
          "original": true,
          "sourceSHA256": "f0cb850e810a6ac3ae64808e31669cc41eca3196d40704590d4f011e5af96f69",
          "assetSHA256": "a44078db11d5aacdd7697404627b3e5630ae00ccf2d524942f9188db15ff8952"
        }
      },
      "thumbnail": "/assets/food-cafes/fc-caffe-kuznicza-01.jpg"
    },
    "status": "published",
    "sourceUrls": [],
    "provenance": {
      "verifiedAt": "2026-10-19",
      "factualSources": [
        {
          "url": "https://fccaffe.eatbu.com/?lang=pl",
          "checked": "2026-10-19",
          "supports": [
            "Brand",
            "Kuźnicza30",
            "Coffee,breakfast,cakes",
            "Outdoorseating"
          ]
        },
        {
          "url": "https://sprawdzadres.pl/dolnoslaskie/wroclaw/kuznicza/30",
          "checked": "2026-10-19",
          "supports": [
            "Addresscoordinatecandidate"
          ]
        }
      ],
      "personalMediaPermission": false
    },
    "socialPosts": []
  }
};
  window.WROC_CANONICAL_PLACE_SOURCE = window.WROC_CANONICAL_PLACE_SOURCE.map(record => october19Refreshes[record.id] || record);
  for (const [id, record] of Object.entries(october19Refreshes)) {
    if (!window.WROC_CANONICAL_PLACE_SOURCE.some(existing => existing.id === id)) window.WROC_CANONICAL_PLACE_SOURCE.push(record);
  }
  // Removed gallery associations remain in the refresh provenance, not active media metadata.
  for (const record of window.WROC_CANONICAL_PLACE_SOURCE) {
    if (record.media?.videos) record.media.videos = record.media.videos.map(video => typeof video === "string" ? video : video.src);
    if (!record.media?.metadata) continue;
    const active = new Set([...(record.media.photos || []), ...(record.media.videos || []).map(video => typeof video === "string" ? video : video.src), record.media.thumbnail]);
    record.media.metadata = Object.fromEntries(Object.entries(record.media.metadata).filter(([asset]) => active.has(asset)));
  }
  const pergolaPublishedVisits = [
  "https://youtube.com/shorts/rWgg4GMPnLM",
  "https://youtube.com/shorts/zjWtn3ecZb8",
  "https://youtube.com/shorts/LpABCG98A30",
  "https://youtube.com/shorts/2JEVLuDY4cc",
  "https://youtube.com/shorts/gSVC14ucEB4",
  "https://youtube.com/shorts/WFQyRKD66YQ"
];
  const refreshedPergola = window.WROC_CANONICAL_PLACE_SOURCE.find(record => record.id === "pergola");
  refreshedPergola.media.videos = [...new Set([...(refreshedPergola.media.videos || []), ...pergolaPublishedVisits])];

  const stadiumOctober19Refresh = {
  "id": "stadion-olimpijski-wroclaw",
  "aliases": [
    "olympic-stadium-wroclaw"
  ],
  "localName": "Stadion Olimpijski we Wrocławiu",
  "name": {
    "he": "האצטדיון האולימפי של ורוצלב",
    "en": "Wrocław Olympic Stadium",
    "pl": "Stadion Olimpijski we Wrocławiu",
    "de": "Olympiastadion Breslau",
    "cs": "Olympijský stadion ve Vratislavi"
  },
  "description": {
    "he": "האצטדיון האולימפי הוא לב מתחם ספורט היסטורי בשכונת זלשיה. הוא תוכנן בידי ריכרד קונווירץ ונבנה בשנים 1926 עד 1928. אדריכלות הלבנים, שער הכניסה, הרחבה והשבילים המוצלים מציעים מבט אחר על העיר. המקום מזוהה עם מרוצי ספידוויי ופוטבול אמריקאי. גלריית הביקור שלנו מציגה את הכניסה, הרחבה והשטחים הסמוכים בקיץ ובסתיו. אפשר להתרשם מהחוץ; כניסה ליציעים ולמגרש תלויה באירועים ובהסדרי האתר, ויש לבדוק זאת לפני הביקור.",
    "en": "At the heart of a historic sports complex in Zalesie, this stadium was designed by Richard Konwiarz and built in 1926 to 1928. Brick architecture, an entrance gateway, a broad courtyard and shaded paths reveal another side of Wrocław. The venue is associated with speedway and American football. Our visit gallery shows the entrance, courtyard and adjoining grounds in summer and autumn. The exterior can be explored; access to the stands and field depends on events and venue arrangements, so check before visiting.",
    "pl": "Stadion stanowi serce historycznego kompleksu sportowego na Zalesiu. Zaprojektował go Richard Konwiarz, a budowa trwała od 1926 do 1928 roku. Ceglana architektura, brama wejściowa, rozległy dziedziniec i zacienione alejki pokazują inne oblicze Wrocławia. Obiekt jest związany z żużlem i futbolem amerykańskim. Galeria z naszej wizyty przedstawia wejście, dziedziniec i sąsiednie tereny latem oraz jesienią. Można oglądać obiekt z zewnątrz; dostęp do trybun i boiska zależy od wydarzeń i zasad obiektu, dlatego warto sprawdzić go przed wizytą.",
    "de": "Das Stadion bildet das Herz einer historischen Sportanlage im Stadtteil Zalesie. Richard Konwiarz entwarf den Bau, der von 1926 bis 1928 entstand. Backsteinarchitektur, Eingangstor, weitläufiger Vorplatz und schattige Wege zeigen eine andere Seite Breslaus. Die Anlage ist mit Speedway und American Football verbunden. Unsere Besuchsgalerie zeigt Eingang, Vorplatz und angrenzendes Gelände im Sommer und Herbst. Die Außenbereiche lassen sich besichtigen; der Zugang zu Tribünen und Spielfeld hängt von Veranstaltungen und den Regelungen der Anlage ab und sollte vorab geprüft werden.",
    "cs": "Stadion tvoří srdce historického sportovního areálu ve čtvrti Zalesie. Navrhl jej Richard Konwiarz a vznikl v letech 1926 až 1928. Cihlová architektura, vstupní brána, rozlehlé nádvoří a stinné cesty ukazují jinou tvář Vratislavi. Areál je spojen s plochou dráhou a americkým fotbalem. Naše návštěvní galerie zachycuje vstup, nádvoří a přilehlé prostory v létě i na podzim. Exteriér lze prohlížet; přístup na tribuny a hřiště závisí na akcích a pravidlech areálu, proto si jej před návštěvou ověřte."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1195926,
      "lng": 17.0966604
    },
    "address": {
      "street": "Ignacego Jana Paderewskiego 35",
      "postalCode": "51-612",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "stadium",
    "sports-complex",
    "historical-landmark",
    "architecture"
  ],
  "taxonomy": {
    "tags": [
      "stadium",
      "sports",
      "architecture",
      "brick-architecture",
      "history",
      "local-history",
      "speedway",
      "american-football",
      "local-experience",
      "wroclaw",
      "lower-silesia"
    ]
  },
  "suitability": {
    "recommendedFor": [
      "architecture-lovers",
      "history-lovers",
      "sports-fans",
      "local-history",
      "photographers"
    ],
    "walkingIntensity": "low",
    "familyFriendly": true,
    "couples": true,
    "romantic": false,
    "indoorOutdoor": "outdoor",
    "rainFriendly": false,
    "accessibility": {
      "level": "partial",
      "notes": null
    }
  },
  "visit": {
    "durationMinutes": 45,
    "bestTimeOfDay": [
      "morning",
      "afternoon"
    ],
    "seasonalSuitability": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ]
  },
  "links": {
    "website": "https://www.wroclaw.pl/sport/stadion-olimpijski",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1195926%2C17.0966604",
      "appleMaps": "https://maps.apple.com/?ll=51.1195926,17.0966604&q=Stadion%20Olimpijski%20we%20Wroc%C5%82awiu"
    },
    "socialProfileFallback": false
  },
  "experiences": [
    {
      "id": "historic-sports-complex",
      "tags": [
        "sports",
        "architecture",
        "history",
        "local-experience"
      ],
      "accessibility": {
        "level": "partial",
        "notes": null
      }
    }
  ],
  "provenance": {
    "contentType": "personal-visit",
    "personalVisit": true,
    "originalContent": true,
    "originalPhotography": true,
    "originalVideo": false,
    "factualSources": [
      {
        "url": "https://www.wroclaw.pl/sport/stadion-olimpijski",
        "checkedAt": "2026-10-19",
        "supports": "Zalesie sports complex, Konwiarz, address Paderewskiego35, speedway and American football. Old transport and capacity excluded due inconsistencies with other official page."
      },
      {
        "url": "https://www.wroclaw.pl/dla-mieszkanca/stadion-olimpijski-poznaj-wroclaw",
        "checkedAt": "2026-10-19",
        "supports": "1926-1928 construction; external visits possible; event-related stadium use."
      },
      {
        "url": "https://www.wroclaw.pl/dla-mieszkanca/rocznica-urodzin-architekta-richarda-konwiarza-za-projekt-stadionu-dostal-medal-olimpijski",
        "checkedAt": "2026-10-19",
        "supports": "Historic gateway, later clock tower and stands; architectural sports venue rather than a generic park."
      }
    ],
    "verifiedAt": "2026-10-19"
  },
  "socialPosts": [],
  "media": {
    "photos": [
      "/assets/stadion-olimpijski-01.jpg",
      "/assets/stadion-olimpijski-02.jpg",
      "/assets/stadion-olimpijski-03.jpg",
      "/assets/stadion-olimpijski-04.jpg",
      "/assets/stadion-olimpijski-05.jpg",
      "/assets/stadion-olimpijski-06.jpg",
      "/assets/stadion-olimpijski-07.jpg",
      "/assets/stadion-olimpijski-08.jpg",
      "/assets/stadion-olimpijski-09.jpg",
      "/assets/stadion-olimpijski-10.jpg",
      "/assets/stadion-olimpijski-11.jpg",
      "/assets/stadion-olimpijski-12.jpg",
      "/assets/stadion-olimpijski-13.jpg",
      "/assets/stadion-olimpijski-14.jpg",
      "/assets/stadion-olimpijski-15.jpg",
      "/assets/stadion-olimpijski-16.jpg",
      "/assets/stadion-olimpijski-17.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/stadion-olimpijski-01.jpg": {
        "tags": [
          "stadium",
          "architecture",
          "history",
          "hero"
        ],
        "original": true,
        "heroCandidate": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4560.JPG",
        "sourceSHA256": "094838871f8607407b7d8dfbf35d5c873e0f157bbac0e14183da71aeda1dff84",
        "assetSHA256": "492682b3825b2d8570309075f6a814776a4d9d5fb9677a8c5c01a0d702c5cc9a",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-02.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4562.JPG",
        "sourceSHA256": "e78999e2aa2c83c841289fd83fde7d88de08baf323ea3740b4f1e6ac664f8e9e",
        "assetSHA256": "c7c68ee2b5bcc5ec4667f4001af308f02d26642057ccd2b1474eefc78a0a0602",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-03.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4563.JPG",
        "sourceSHA256": "aab4ff4f298c2031e02ee86e9ea9793a2e37c9d7e9ac05600cb9d7f4034af783",
        "assetSHA256": "4f8f8e27749c2014cb3d59daa123a058ad33af2a22e7a355fd856256acba71d4",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-04.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4564.JPG",
        "sourceSHA256": "104d245b505894e37458e590e62eb76e1e45cd2091fa777f56c7eebe31c2b0ea",
        "assetSHA256": "05233e09a3775d171a4d15847421352f71b01fe93f97371906e2e80e2ff3a1f8",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-05.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4565.JPG",
        "sourceSHA256": "5777130b37c076f35f1e995e7109fdb2e13604642e7508d10a8c8245e1010344",
        "assetSHA256": "5dc8554ff7e9b8365a4128f75bde0393f898a8c05ae2793a8e0aba1f867e847b",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-06.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4566.JPG",
        "sourceSHA256": "e8705b5a39e4fbcbc7dcbae87de80df92a2f5ee5de58142e70ad2238343b5c88",
        "assetSHA256": "627d38295b84d3cac9decff09d35469b7626605c3f97703127b0fd391535cb29",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-07.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4567.JPG",
        "sourceSHA256": "c7b588ed78f9f7b6cd2a7320621aa47eeb65bfab4e6447020bfa772621d2c69c",
        "assetSHA256": "68615b188f23669e8da19f3b509665aaf75cee28df8d8ae028fea765eccd4b09",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-08.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4568.JPG",
        "sourceSHA256": "163a6181466fa73e0ae34cd2350660bc594a62c601ccb51bd56a18d4bae819ed",
        "assetSHA256": "e333cb3d29bc06be54d94c8d9d210f84b8ebe9ae7102fb5c5cb62e7ad3ee5a2a",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-09.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4569.JPG",
        "sourceSHA256": "cefb8cfaaf5958048cd851177b2c43d1dbad22a2ea83336481c65d7b80a8633d",
        "assetSHA256": "b528c9b0a3b4db8b293510506545099b471a74acee3db11cb463e4f5d6a1cc5b",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-10.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4570.JPG",
        "sourceSHA256": "d4bf521f3ce53221620a3abccb3ed9ce4315999e9987e92e0f7361c97c90c3cd",
        "assetSHA256": "35fe7237db66761bddf550a7fe7409a124401cff390704181396bb8ad7a3d519",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-11.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4571.JPG",
        "sourceSHA256": "c0bca9568fed0a8e11ae9f1407fa6a350e3e7adc43f19fe981a21ba2dd626b78",
        "assetSHA256": "d49a5493362a2a67da2e3e0793f6fdaf0ac7e5d68987e1af29dafd810832b17e",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-12.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4572.JPG",
        "sourceSHA256": "ed07c8ae9afc344f49617547120e6f6c4cd2bfe6f2e5b4b27d8a7aa3d6a29827",
        "assetSHA256": "62c9253e950163f1df1484095874d9bb6cbeba03fe7685198af54b6a5c2ee6b1",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-13.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4573.JPG",
        "sourceSHA256": "3db3adc83946e6e64a2d411be603af50092dbf381fd51c8b95f81c0e8193684f",
        "assetSHA256": "ce99848596837aa77274f7cbc92277855d8701182481b454e96ad5a685e1bc70",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-14.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/IMG_4574.JPG",
        "sourceSHA256": "ea2636c42da8ce4d1a7c5318526d8ed2ea26ddee6e2a7610ecd9339fca248f24",
        "assetSHA256": "f43fc615caa1c7454081d739d2d71eb53ec4692a1f93292d803b96dc8b9a3540",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-15.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/WhatsApp Image 2026-10-19 at 10.28.44.jpeg",
        "sourceSHA256": "60ca4c636374e649e6cc03b94e6457eaf2a0d411f41f77cece3ae96a343f8640",
        "assetSHA256": "ebc03edb9b25b15c7e36bc80690354130b1ed1de599bba28d6c4ce6e79073780",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-16.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/WhatsApp Image 2026-10-19 at 10.28.46 (2).jpeg",
        "sourceSHA256": "447e6070d5120311c143092315679eae9d01b2bc529a8297c64ce490acd9ad95",
        "assetSHA256": "297909525691e12f5c8888162d606abf6130388963d7cce1ab278a9a63fa89c4",
        "orientation": "EXIF normalized, full frame"
      },
      "/assets/stadion-olimpijski-17.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Olympic Park/WhatsApp Image 2026-10-19 at 10.28.46 (4).jpeg",
        "sourceSHA256": "b7701514162a504bbca8b12178c87cb3ce561e9baa36aa350294767b8370f3ba",
        "assetSHA256": "170887a860aac756105bd43e0ab2ac2c89d8e774eade45dcdbff9d5c5cf28e8d",
        "orientation": "EXIF normalized, full frame"
      }
    },
    "thumbnail": "/assets/stadion-olimpijski-09.jpg"
  },
  "status": "published",
  "editorialPriority": "medium",
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ]
};
  window.WROC_CANONICAL_PLACE_SOURCE = window.WROC_CANONICAL_PLACE_SOURCE.map(record => record.id === "stadion-olimpijski-wroclaw" ? stadiumOctober19Refresh : record);
})();
