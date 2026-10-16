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
      "aliases": [],
      "localName": "Wieża Ciśnień Borek",
      "name": {
        "he": "מגדל המים של בורק",
        "en": "Borek Water Tower",
        "pl": "Wieża Ciśnień Borek",
        "de": "Wasserturm Borek",
        "cs": "Vodárenská věž Borek"
      },
      "description": {
        "he": "מגדל המים של בורק נבנה בשנים 1904–1905 בתכנון קרל קלים כחלק ממערכת המים העירונית, ומתנשא לגובה של כ־62 מטר. קשתות גדולות, צריחים, מעבר מוגבה, פסלי אבן ומזרקה מעטרים את מבנה הלבנים האדומות. ב־1906 נפתחה בו גלריית תצפית לציבור; זהו פרט היסטורי, ואינו מעיד על גישה כיום.",
        "en": "Built in 1904–1905 to Karl Klimm’s design for the municipal water system, this red-brick tower rises about 62 metres. Look for the monumental arches, spires, elevated passage, stone sculptures and fountain. A public viewing gallery opened in 1906; this is historical information, not confirmation of access today.",
        "pl": "Ceglana wieża wodociągowa projektu Karla Klimma powstała w latach 1904–1905 i ma około 62 metrów wysokości. Warto zwrócić uwagę na monumentalne łuki, wieżyczki, wysoko zawieszony łącznik, kamienne rzeźby i fontannę. Galerię widokową udostępniono publiczności w 1906 roku; to informacja historyczna, nie potwierdzenie obecnej dostępności.",
        "de": "Der etwa 62 Meter hohe Backsteinturm entstand 1904–1905 nach Karl Klimms Entwurf für die städtische Wasserversorgung. Auffällig sind die großen Bögen, Turmspitzen, der hoch gelegene Verbindungsgang, Steinskulpturen und der Brunnen. 1906 öffnete eine öffentliche Aussichtsgalerie; diese historische Angabe bestätigt keinen heutigen Zugang.",
        "cs": "Cihlová vodárenská věž vznikla v letech 1904–1905 podle návrhu Karla Klimma pro městský vodovod a měří přibližně 62 metrů. Zaujmou mohutné oblouky, věžičky, vyvýšená spojovací chodba, kamenné plastiky a kašna. Vyhlídková galerie se veřejnosti otevřela v roce 1906; jde o historický údaj, nikoli potvrzení dnešní přístupnosti."
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
          }
        ]
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
          "/assets/wieza-cisnien-borek-15.jpg"
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
            "heroCandidate": true
          },
          "/assets/wieza-cisnien-borek-02.jpg": {
            "tags": [
              "architecture",
              "street-context"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39 (4).jpeg"
          },
          "/assets/wieza-cisnien-borek-03.jpg": {
            "tags": [
              "architecture",
              "entrance-exterior"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (2).jpeg"
          },
          "/assets/wieza-cisnien-borek-04.jpg": {
            "tags": [
              "architecture",
              "arches"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (1).jpeg"
          },
          "/assets/wieza-cisnien-borek-05.jpg": {
            "tags": [
              "architecture",
              "upper-facade"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39 (3).jpeg"
          },
          "/assets/wieza-cisnien-borek-06.jpg": {
            "tags": [
              "architecture",
              "spires-passage"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (11).jpeg"
          },
          "/assets/wieza-cisnien-borek-07.jpg": {
            "tags": [
              "architecture",
              "connecting-passage"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (10).jpeg"
          },
          "/assets/wieza-cisnien-borek-08.jpg": {
            "tags": [
              "architecture",
              "spire"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39.jpeg"
          },
          "/assets/wieza-cisnien-borek-09.jpg": {
            "tags": [
              "architecture",
              "inscription"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.39 (2).jpeg"
          },
          "/assets/wieza-cisnien-borek-10.jpg": {
            "tags": [
              "architecture",
              "animal-relief"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38.jpeg"
          },
          "/assets/wieza-cisnien-borek-11.jpg": {
            "tags": [
              "architecture",
              "animal-relief-2"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (9).jpeg"
          },
          "/assets/wieza-cisnien-borek-12.jpg": {
            "tags": [
              "architecture",
              "animal-relief-3"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (6).jpeg"
          },
          "/assets/wieza-cisnien-borek-13.jpg": {
            "tags": [
              "architecture",
              "stone-emblem"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (8).jpeg"
          },
          "/assets/wieza-cisnien-borek-14.jpg": {
            "tags": [
              "architecture",
              "roof-ornament"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (7).jpeg"
          },
          "/assets/wieza-cisnien-borek-15.jpg": {
            "tags": [
              "architecture",
              "fountain"
            ],
            "original": true,
            "sourceFile": "WhatsApp Image 2026-09-23 at 15.04.38 (5).jpeg"
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
      ]
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
      id: "hala",
      aliases: [],
      localName: "Hala Stulecia",
      name: {
        he: "Hala Stulecia",
        en: "Centennial Hall",
        pl: "Hala Stulecia",
        de: "Jahrhunderthalle",
        cs: "Hala století",
      },
      description: {
        he: "אתר מורשת עולמית של אונסק״ו ואחד המבנים האייקוניים בעיר.",
        en: "A UNESCO World Heritage site and one of the city’s iconic buildings.",
        pl: "Obiekt UNESCO i jeden z najbardziej ikonicznych budynków miasta.",
        de: "Ein UNESCO-Weltkulturerbe und eines der Wahrzeichen der Stadt.",
        cs: "Památka světového dědictví UNESCO a jedna z ikonických budov města.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "wroclaw",
        coordinates: { lat: 51.10689, lng: 17.07733 },
      },
      categories: ["architecture"],
      taxonomy: { tags: ["architecture", "unesco", "historical", "photography"] },
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalPhotography: true,
        originalVideo: true,
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/61591964083308/posts/122115263553398802/" },
        { platform: "instagram", url: "https://www.instagram.com/wroclaw.lowersilesia/p/DcTdbhVjM1Y/" },
      ],
      media: {
        photos: [
          "/assets/hala-stulecia-01.jpg",
          "/assets/hala-stulecia-02.jpg",
          "/assets/hala-stulecia-03.jpg",
          "/assets/hala-stulecia-04.jpg",
          "/assets/hala-stulecia-05.jpg",
          "/assets/gallery-stulecia-02.jpg",
          "/assets/gallery-stulecia-03.jpg",
          "/assets/gallery-stulecia-04.jpg",
        ],
        videos: [
          "/assets/hala-stulecia-visit.mp4",
          "/assets/video-stulecia-fountain.mp4",
        ],
        metadata: {
          "/assets/hala-stulecia-01.jpg": { tags: ["centennial-hall", "exterior", "architecture", "hero"], original: true, heroCandidate: true, sourceFile: "IMG_5063.JPG" },
          "/assets/hala-stulecia-02.jpg": { tags: ["centennial-hall", "exterior", "flowers"], original: true, sourceFile: "IMG_5062.JPG" },
          "/assets/hala-stulecia-03.jpg": { tags: ["centennial-hall", "exterior", "landscape"], original: true, sourceFile: "IMG_5059.JPG" },
          "/assets/hala-stulecia-04.jpg": { tags: ["centennial-hall", "dwarf", "visitor-detail"], original: true, sourceFile: "IMG_5064.JPG" },
          "/assets/hala-stulecia-05.jpg": { tags: ["centennial-hall", "visitor-area", "food-truck"], original: true, sourceFile: "IMG_5104.JPG" },
          "/assets/hala-stulecia-visit.mp4": { tags: ["centennial-hall", "visitor-experience", "video"], original: true, sourceFile: "IMG_5061.MOV" },
          "/assets/video-stulecia-fountain.mp4": { tags: ["multimedia-fountain", "centennial-hall-area", "video"], original: true },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
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
      id: "church-of-peace-swidnica",
      aliases: ["kosciol-pokoju-swidnica", "peace-church-swidnica"],
      localName: "Kościół Pokoju w Świdnicy",
      name: {
        he: "כנסיית השלום בשווידניצה",
        en: "Church of Peace in Świdnica",
        pl: "Kościół Pokoju w Świdnicy",
        de: "Friedenskirche in Świdnica",
        cs: "Kostel míru ve Svídnici",
      },
      description: {
        he: "אחד המקומות המיוחדים בשלזיה התחתית: כנסיית עץ מרשימה שמבחוץ נראית כמעט צנועה, ובפנים נפתחת לחלל עשיר, מפורט ומפתיע. הכנסייה היא חלק מאתר המורשת העולמית של אונסק״ו ומצדיקה נסיעה לשווידניצה בזכות האדריכלות, ההיסטוריה והאווירה השקטה שלה.",
        en: "One of Lower Silesia’s most distinctive places: an impressive timber church that seems almost modest outside, then opens into a richly detailed and surprising interior. Part of a UNESCO World Heritage site, it is worth the journey to Świdnica for its architecture, history and calm atmosphere.",
        pl: "Jedno z najbardziej wyjątkowych miejsc na Dolnym Śląsku: imponujący drewniany kościół, który z zewnątrz wydaje się niemal skromny, a wewnątrz zachwyca bogactwem detali. Obiekt wpisany na Listę Światowego Dziedzictwa UNESCO jest wart podróży do Świdnicy ze względu na architekturę, historię i spokojną atmosferę.",
        de: "Einer der außergewöhnlichsten Orte Niederschlesiens: eine beeindruckende Holzkirche, die außen beinahe schlicht wirkt und innen einen reich ausgestatteten, überraschenden Raum eröffnet. Als Teil des UNESCO-Welterbes lohnt sie die Fahrt nach Świdnica wegen ihrer Architektur, Geschichte und ruhigen Atmosphäre.",
        cs: "Jedno z nejvýjimečnějších míst Dolního Slezska: působivý dřevěný kostel, který zvenku působí téměř skromně, ale uvnitř překvapí bohatstvím detailů. Jako součást světového dědictví UNESCO stojí za cestu do Svídnice díky architektuře, historii a klidné atmosféře.",
      },
      location: {
        countryCode: "PL",
        regionId: "lower-silesia",
        cityId: "swidnica",
        coordinates: { lat: 50.8465028, lng: 16.4918111 },
        address: {
          street: "plac Pokoju 6",
          postalCode: "58-100",
          city: "Świdnica",
          country: "Poland",
        },
      },
      categories: ["religious-heritage", "historical-landmark", "wooden-architecture", "unesco-world-heritage"],
      taxonomy: {
        tags: [
          "culture", "history", "architecture", "religious-heritage", "wooden-architecture",
          "unesco", "photography", "contemplative", "lower-silesia", "outside-wroclaw",
        ],
      },
      suitability: {
        recommendedFor: ["culture-lovers", "history-lovers", "architecture-lovers", "couples", "adults", "photographers"],
        walkingIntensity: "low",
        familyFriendly: true,
        couples: true,
        romantic: false,
        indoorOutdoor: "both",
        rainFriendly: "partial",
        accessibility: { level: "partial", notes: {
          he: "הגישה למתחם אפשרית, אך משטחים היסטוריים ותנאי הכניסה עשויים להשתנות; מומלץ לברר ישירות לפני הביקור.",
          en: "The site can be accessed, but historic surfaces and entry conditions may vary; confirm directly before visiting.",
          pl: "Dostęp do obiektu jest możliwy, ale historyczne nawierzchnie i warunki wejścia mogą się różnić; warto potwierdzić je przed wizytą.",
          de: "Das Gelände ist zugänglich, historische Oberflächen und Zugangsbedingungen können jedoch variieren; bitte vor dem Besuch direkt nachfragen.",
          cs: "Areál je přístupný, historické povrchy a podmínky vstupu se však mohou lišit; před návštěvou je ověřte přímo."
        } },
      },
      visit: {
        durationMinutes: 60,
        bestTimeOfDay: ["morning", "afternoon"],
        seasonalSuitability: ["spring", "summer", "autumn", "winter"],
      },
      links: {
        website: "https://kosciolpokoju.pl/",
        navigation: {
          googleMaps: "https://www.google.com/maps/search/?api=1&query=50.8465028%2C16.4918111",
          appleMaps: "https://maps.apple.com/?ll=50.8465028,16.4918111&q=Ko%C5%9Bci%C3%B3%C5%82%20Pokoju%20w%20%C5%9Awidnicy",
        },
      },
      experiences: [
        {
          id: "timber-church-and-interior",
          tags: ["cultural", "historical", "architectural", "contemplative", "unique"],
          accessibility: { level: "partial", notes: "See place accessibility notes." },
        },
      ],
      provenance: {
        contentType: "personal-visit",
        personalVisit: true,
        originalContent: true,
        originalPhotography: true,
        originalVideo: false,
        factualSources: [
          { type: "official", url: "https://kosciolpokoju.pl/", checkedAt: "2026-08-12" },
          { type: "address", url: "https://kosciolpokoju.pl/kontakt/", checkedAt: "2026-08-12" },
          { type: "unesco", url: "https://whc.unesco.org/en/list/1054/", checkedAt: "2026-08-12" },
          { type: "coordinates", url: "https://whc.unesco.org/en/list/1054/maps/", checkedAt: "2026-08-12", note: "50°50′47.41″N, 16°29′30.52″E" },
        ],
      },
      socialPosts: [
        { platform: "facebook", url: "https://www.facebook.com/groups/2525899074519424/posts/2533682413741090/" },
        { platform: "facebook", url: "https://www.facebook.com/share/p/1HatdkPSmz/" },
        { platform: "instagram", url: "https://www.instagram.com/p/Dbf-bApnAo5/?img_index=1" },
      ],
      media: {
        photos: [
          "/assets/church-of-peace-swidnica-01.jpg", "/assets/church-of-peace-swidnica-02.jpg", "/assets/church-of-peace-swidnica-03.jpg",
          "/assets/church-of-peace-swidnica-04.jpg", "/assets/church-of-peace-swidnica-05.jpg", "/assets/church-of-peace-swidnica-06.jpg",
          "/assets/church-of-peace-swidnica-07.jpg", "/assets/church-of-peace-swidnica-08.jpg", "/assets/church-of-peace-swidnica-09.jpg",
        ],
        videos: [],
        metadata: {
          "/assets/church-of-peace-swidnica-01.jpg": { tags: ["church-exterior", "wooden-architecture", "heritage", "hero"], original: true, heroCandidate: true },
          "/assets/church-of-peace-swidnica-02.jpg": { tags: ["church-interior", "religious-art", "heritage"], original: true },
          "/assets/church-of-peace-swidnica-03.jpg": { tags: ["church-interior", "wooden-architecture", "religious-art"], original: true },
          "/assets/church-of-peace-swidnica-04.jpg": { tags: ["church-exterior", "wooden-architecture", "swidnica"], original: true },
          "/assets/church-of-peace-swidnica-05.jpg": { tags: ["church-interior", "architecture", "heritage"], original: true },
          "/assets/church-of-peace-swidnica-06.jpg": { tags: ["church-interior", "religious-art", "architecture"], original: true },
          "/assets/church-of-peace-swidnica-07.jpg": { tags: ["church-exterior", "heritage", "lower-silesia"], original: true },
          "/assets/church-of-peace-swidnica-08.jpg": { tags: ["church-interior", "heritage", "architecture"], original: true },
          "/assets/church-of-peace-swidnica-09.jpg": { tags: ["church-exterior", "wooden-architecture", "lower-silesia"], original: true },
        },
      },
      status: "published",
      editorialPriority: "high",
      languages: ["he", "en", "pl", "de", "cs"],
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
      id: "brzeg-castle", localName: "Zamek Piastów Śląskich w Brzegu", aliases: ["zamek-piastow-slaskich-brzeg"],
      name: { he: "טירת פיאסט בברז׳ג", en: "Brzeg Castle", pl: "Zamek Piastów Śląskich w Brzegu", de: "Piastenschloss Brieg", cs: "Zámek slezských Piastovců v Brzegu" },
      description: { he: "טירת פיאסט בברז׳ג משמשת כיום את מוזיאון פיאסט השלזיים. כדאי להתחיל בחזית השער המעוטרת ולהמשיך לחצר הקשתות.", en: "Brzeg Castle houses the Museum of the Silesian Piasts. Start at the decorated entrance and continue into the arcaded courtyard.", pl: "W zamku mieści się Muzeum Piastów Śląskich. Warto zacząć od zdobionej bramy i przejść na krużgankowy dziedziniec.", de: "Im Schloss befindet sich das Museum der schlesischen Piasten. Der Besuch beginnt am verzierten Tor und führt in den Arkadenhof.", cs: "Na zámku sídlí Muzeum slezských Piastovců. Začněte u zdobené brány a pokračujte na arkádové nádvoří." },
      location: { countryCode: "PL", regionId: "opole", cityId: "brzeg", coordinates: { lat: 50.86387, lng: 17.46659 }, address: { street: "Plac Zamkowy 1", postalCode: "49-300", city: "Brzeg", country: "Poland" } },
      categories: ["castle", "museum", "historical-landmark"], taxonomy: { tags: ["architecture", "history", "excursion", "outside-wroclaw"] },
      links: { website: "https://zamek.brzeg.pl/", navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=50.86387%2C17.46659" } },
      provenance: { contentType: "personal-visit", personalVisit: true, originalPhotography: true, factualSources: [{ type: "official", url: "https://zamek.brzeg.pl/kontakt", checkedAt: "2026-09-28" }, { type: "coordinates", url: "https://www.openstreetmap.org/way/230535120", checkedAt: "2026-09-28" }] },
      socialPosts: [], media: { photos: ["/assets/brzeg-castle-courtyard.jpeg", "/assets/brzeg-castle-entrance.jpeg", "/assets/brzeg-castle-facade.jpeg", "/assets/brzeg-enrichment/brzeg-castle-014.jpg", "/assets/brzeg-enrichment/brzeg-castle-015.jpg", "/assets/brzeg-enrichment/brzeg-castle-017.jpg", "/assets/brzeg-enrichment/brzeg-castle-019.jpg", "/assets/brzeg-enrichment/brzeg-castle-020.jpg", "/assets/brzeg-enrichment/brzeg-castle-021.jpg", "/assets/brzeg-enrichment/brzeg-castle-022.jpg", "/assets/brzeg-enrichment/brzeg-castle-023.jpg", "/assets/brzeg-enrichment/brzeg-castle-025.jpg", "/assets/brzeg-enrichment/brzeg-castle-027.jpg", "/assets/brzeg-enrichment/brzeg-castle-028.jpg", "/assets/brzeg-enrichment/brzeg-castle-029.jpg", "/assets/brzeg-enrichment/brzeg-castle-030.jpg", "/assets/brzeg-enrichment/brzeg-castle-031.jpg", "/assets/brzeg-enrichment/brzeg-castle-032.jpg", "/assets/brzeg-enrichment/brzeg-castle-033.jpg", "/assets/brzeg-enrichment/brzeg-castle-034.jpg", "/assets/brzeg-enrichment/brzeg-castle-035.jpg", "/assets/brzeg-enrichment/brzeg-castle-036.jpg", "/assets/brzeg-enrichment/brzeg-castle-037.jpg", "/assets/brzeg-enrichment/brzeg-castle-038.jpg", "/assets/brzeg-enrichment/brzeg-castle-039.jpg", "/assets/brzeg-enrichment/brzeg-castle-040.jpg", "/assets/brzeg-enrichment/brzeg-castle-041.jpg", "/assets/brzeg-enrichment/brzeg-castle-042.jpg", "/assets/brzeg-enrichment/brzeg-castle-043.jpg", "/assets/brzeg-enrichment/brzeg-castle-044.jpg", "/assets/brzeg-enrichment/brzeg-castle-045.jpg", "/assets/brzeg-enrichment/brzeg-castle-046.jpg", "/assets/brzeg-enrichment/brzeg-castle-047.jpg", "/assets/brzeg-enrichment/brzeg-castle-048.jpg", "/assets/brzeg-enrichment/brzeg-castle-049.jpg", "/assets/brzeg-enrichment/brzeg-castle-051.jpg", "/assets/brzeg-enrichment/brzeg-castle-057.jpg", "/assets/brzeg-enrichment/brzeg-castle-058.jpg", "/assets/brzeg-enrichment/brzeg-castle-059.jpg", "/assets/brzeg-enrichment/brzeg-castle-060.jpg", "/assets/brzeg-enrichment/brzeg-castle-061.jpg", "/assets/brzeg-enrichment/brzeg-castle-065.jpg", "/assets/brzeg-enrichment/brzeg-castle-066.jpg", "/assets/brzeg-enrichment/brzeg-castle-069.jpg", "/assets/brzeg-enrichment/brzeg-castle-070.jpg", "/assets/brzeg-enrichment/brzeg-castle-073.jpg", "/assets/brzeg-enrichment/brzeg-castle-075.jpg", "/assets/brzeg-enrichment/brzeg-castle-076.jpg", "/assets/brzeg-enrichment/brzeg-castle-077.jpg", "/assets/brzeg-enrichment/brzeg-castle-078.jpg", "/assets/brzeg-enrichment/brzeg-castle-079.jpg", "/assets/brzeg-enrichment/brzeg-castle-080.jpg", "/assets/brzeg-enrichment/brzeg-castle-081.jpg", "/assets/brzeg-enrichment/brzeg-castle-082.jpg", "/assets/brzeg-enrichment/brzeg-castle-084.jpg", "/assets/brzeg-enrichment/brzeg-castle-088.jpg", "/assets/brzeg-enrichment/brzeg-castle-089.jpg", "/assets/brzeg-enrichment/brzeg-castle-091.jpg", "/assets/brzeg-enrichment/brzeg-castle-092.jpg", "/assets/brzeg-enrichment/brzeg-castle-093.jpg", "/assets/brzeg-enrichment/brzeg-castle-094.jpg", "/assets/brzeg-enrichment/brzeg-castle-095.jpg", "/assets/brzeg-enrichment/brzeg-castle-096.jpg", "/assets/brzeg-enrichment/brzeg-castle-097.jpg", "/assets/brzeg-enrichment/brzeg-castle-098.jpg", "/assets/brzeg-enrichment/brzeg-castle-099.jpg", "/assets/brzeg-enrichment/brzeg-castle-100.jpg", "/assets/brzeg-enrichment/brzeg-castle-101.jpg", "/assets/brzeg-enrichment/brzeg-castle-102.jpg", "/assets/brzeg-enrichment/brzeg-castle-103.jpg", "/assets/brzeg-enrichment/brzeg-castle-104.jpg", "/assets/brzeg-enrichment/brzeg-castle-105.jpg", "/assets/brzeg-enrichment/brzeg-castle-106.jpg", "/assets/brzeg-enrichment/brzeg-castle-107.jpg", "/assets/brzeg-enrichment/brzeg-castle-109.jpg", "/assets/brzeg-enrichment/brzeg-castle-144.jpg"], videos: [], guideVideos: { he: "https://youtube.com/shorts/IYllRzq9VJs", en: "https://youtube.com/shorts/zbpTMh2Fe2c" }, metadata: { "/assets/brzeg-enrichment/brzeg-castle-014.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.50.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-015.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.52 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-017.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.53 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-019.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.53 (3).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-020.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.56 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-021.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.56 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-022.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.56 (3).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-023.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.57 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-025.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.58 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-027.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.00 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-028.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.00 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-029.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.00 (3).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-030.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-031.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (11).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-032.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-033.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (3).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-034.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (5).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-035.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01 (6).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-036.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.01.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-037.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-038.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (14).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-039.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (15).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-040.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (4).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-041.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.29.02 (5).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-042.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.31 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-043.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.31.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-044.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.32 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-045.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.32.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-046.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.33 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-047.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.33.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-048.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.35 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-049.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.35.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-051.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.38 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-057.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.43 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-058.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.43 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-059.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.43.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-060.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.31.06.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-061.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.31.07 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-065.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.26 (3).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-066.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.26 (4).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-069.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.27 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-070.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.27 (4).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-073.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.32 (4).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-075.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (10).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-076.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (11).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-077.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (12).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-078.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (13).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-079.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (14).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-080.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (17).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-081.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (18).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-082.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (19).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-084.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (20).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-088.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (36).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-089.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (37).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-091.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (9).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-092.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (10).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-093.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (11).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-094.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (12).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-095.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (13).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-096.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (14).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-097.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-098.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (21).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-099.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (22).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-100.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (3).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-101.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (4).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-102.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (5).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-103.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (6).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-104.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (7).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-105.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (8).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-106.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.34 (9).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-107.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-109.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-castle-144.jpg": {"sourceFile": "Brzeg/WhatsApp Image 2026-09-24 at 17.30.38 (3).jpeg", "original": true}, "/assets/brzeg-castle-courtyard.jpeg": { sourceFile: "Brzeg/FORCODEX/02-castle-courtyard.jpeg", original: true, heroCandidate: true }, "/assets/brzeg-castle-entrance.jpeg": { sourceFile: "Brzeg/FORCODEX/01-castle-entrance.jpeg", original: true }, "/assets/brzeg-castle-facade.jpeg": { sourceFile: "Brzeg/FORCODEX/03-facade-details.jpeg", original: true } } },
      status: "published", languages: ["he", "en", "pl", "de", "cs"] },
    {
      id: "brzeg-holy-cross-church", localName: "Kościół Podwyższenia Krzyża Świętego w Brzegu", aliases: [],
      name: { he: "כנסיית רוממות הצלב הקדוש בברז׳ג", en: "Holy Cross Church, Brzeg", pl: "Kościół Podwyższenia Krzyża Świętego w Brzegu", de: "Kreuzerhöhungskirche in Brieg", cs: "Kostel Povýšení svatého Kříže v Brzegu" },
      description: { he: "כנסייה הסמוכה לטירה; בצילומי הביקור נראים החזית והחלל המעוטר שלה.", en: "A church close to the castle; the visit photographs show its exterior and ornate interior.", pl: "Kościół niedaleko zamku; zdjęcia z wizyty pokazują elewację i bogato zdobione wnętrze.", de: "Eine Kirche nahe dem Schloss; die Besuchsfotos zeigen Außenansicht und reich geschmückten Innenraum.", cs: "Kostel poblíž zámku; fotografie z návštěvy ukazují průčelí i zdobený interiér." },
      location: { countryCode: "PL", regionId: "opole", cityId: "brzeg", coordinates: { lat: 50.8634, lng: 17.46746 } },
      categories: ["church", "historical-landmark"], taxonomy: { tags: ["architecture", "excursion", "outside-wroclaw"] },
      links: { navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=50.8634%2C17.46746" } },
      provenance: { contentType: "personal-visit", personalVisit: true, originalPhotography: true, originalVideo: true, factualSources: [{ type: "coordinates", url: "https://www.openstreetmap.org/way/230535122", checkedAt: "2026-09-28" }] },
      socialPosts: [], media: { photos: ["/assets/brzeg-holy-cross-exterior.jpeg", "/assets/brzeg-holy-cross-interior.jpeg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-050.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-053.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-054.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-055.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-056.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-068.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-074.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-083.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-086.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-087.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-090.jpg", "/assets/brzeg-enrichment/brzeg-holy-cross-church-148.jpg"], videos: ["/assets/brzeg-holy-cross-interior.mp4"], metadata: { "/assets/brzeg-enrichment/brzeg-holy-cross-church-050.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.38 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-053.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.39 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-054.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.39.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-055.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.42 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-056.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 17.30.42.jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-068.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.27 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-074.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (1).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-083.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (2).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-086.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (24).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-087.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (26).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-090.jpg": {"sourceFile": "Brzeg/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.33 (4).jpeg", "original": true}, "/assets/brzeg-enrichment/brzeg-holy-cross-church-148.jpg": {"sourceFile": "Brzeg/WhatsApp Image 2026-09-24 at 19.05.33 (27).jpeg", "original": true}, "/assets/brzeg-holy-cross-exterior.jpeg": { sourceFile: "Brzeg/FORCODEX/04-church-exterior.jpeg", original: true }, "/assets/brzeg-holy-cross-interior.jpeg": { sourceFile: "Brzeg/FORCODEX/05-church-interior.jpeg", original: true }, "/assets/brzeg-holy-cross-interior.mp4": { sourceFile: "Brzeg/FORCODEX/VIDEO-church-interior.mp4", original: true } } },
      status: "published", languages: ["he", "en", "pl", "de", "cs"] },
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
      id: "moszna-castle", localName: "Zamek Moszna", aliases: [],
      name: { he: "טירת מושנה", en: "Moszna Castle", pl: "Zamek Moszna", de: "Schloss Moschen", cs: "Zámek Moszna" },
      description: { he: "טירת מושנה היא מוקד הביקור השני ביום הטיול. אפשר לבקר בחללים הפתוחים לקהל ולצאת משם לפארק.", en: "Moszna Castle is the second main destination of the day. Visit the areas open to guests, then continue into the park.", pl: "Zamek Moszna to drugi główny cel dnia. Po zwiedzaniu dostępnych wnętrz można przejść do parku.", de: "Schloss Moschen ist das zweite Hauptziel des Tages. Nach dem Besuch der zugänglichen Räume geht es in den Park.", cs: "Zámek Moszna je druhým hlavním cílem dne. Po návštěvě přístupných prostor pokračujte do parku." },
      location: { countryCode: "PL", regionId: "opole", cityId: "moszna", coordinates: { lat: 50.44079, lng: 17.76793 }, address: { street: "Zamkowa 1", postalCode: "47-370", city: "Moszna", country: "Poland" } },
      categories: ["castle", "historical-landmark"], taxonomy: { tags: ["architecture", "excursion", "outside-wroclaw"] },
      links: { website: "https://mosznazamek.pl/zwiedzanie/", navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=50.44079%2C17.76793" } },
      provenance: { contentType: "personal-visit", personalVisit: true, originalPhotography: true, originalVideo: true, factualSources: [{ type: "official", url: "https://mosznazamek.pl/kontakt/", checkedAt: "2026-09-28" }, { type: "coordinates", url: "https://www.openstreetmap.org/way/73054209", checkedAt: "2026-09-28" }] },
      socialPosts: [], media: { photos: ["/assets/moszna-castle-hero.jpeg", "/assets/moszna-castle-approach.jpeg", "/assets/moszna-castle-entrance.jpeg", "/assets/moszna-enrichment/moszna-castle-002.jpg", "/assets/moszna-enrichment/moszna-castle-003.jpg", "/assets/moszna-enrichment/moszna-castle-004.jpg", "/assets/moszna-enrichment/moszna-castle-006.jpg", "/assets/moszna-enrichment/moszna-castle-009.jpg", "/assets/moszna-enrichment/moszna-castle-010.jpg", "/assets/moszna-enrichment/moszna-castle-011.jpg", "/assets/moszna-enrichment/moszna-castle-040.jpg", "/assets/moszna-enrichment/moszna-castle-053.jpg", "/assets/moszna-enrichment/moszna-castle-054.jpg", "/assets/moszna-enrichment/moszna-castle-058.jpg", "/assets/moszna-enrichment/moszna-castle-060.jpg", "/assets/moszna-enrichment/moszna-castle-061.jpg", "/assets/moszna-enrichment/moszna-castle-062.jpg", "/assets/moszna-enrichment/moszna-castle-001.jpg", "/assets/moszna-enrichment/moszna-castle-005.jpg", "/assets/moszna-enrichment/moszna-castle-049.jpg", "/assets/moszna-enrichment/moszna-castle-050.jpg", "/assets/moszna-enrichment/moszna-castle-051.jpg", "/assets/moszna-enrichment/moszna-castle-052.jpg", "/assets/moszna-enrichment/moszna-castle-055.jpg", "/assets/moszna-enrichment/moszna-castle-069.jpg", "/assets/moszna-enrichment/moszna-castle-033.jpg", "/assets/moszna-enrichment/moszna-castle-034.jpg", "/assets/moszna-enrichment/moszna-castle-035.jpg", "/assets/moszna-enrichment/moszna-castle-036.jpg", "/assets/moszna-enrichment/moszna-castle-037.jpg", "/assets/moszna-enrichment/moszna-castle-043.jpg", "/assets/moszna-enrichment/moszna-castle-044.jpg", "/assets/moszna-enrichment/moszna-castle-045.jpg", "/assets/moszna-enrichment/moszna-castle-046.jpg", "/assets/moszna-enrichment/moszna-castle-047.jpg", "/assets/moszna-enrichment/moszna-castle-048.jpg", "/assets/moszna-enrichment/moszna-castle-013.jpg", "/assets/moszna-enrichment/moszna-castle-017.jpg", "/assets/moszna-enrichment/moszna-castle-018.jpg", "/assets/moszna-enrichment/moszna-castle-014.jpg", "/assets/moszna-enrichment/moszna-castle-015.jpg", "/assets/moszna-enrichment/moszna-castle-020.jpg", "/assets/moszna-enrichment/moszna-castle-021.jpg", "/assets/moszna-enrichment/moszna-castle-022.jpg", "/assets/moszna-enrichment/moszna-castle-025.jpg", "/assets/moszna-enrichment/moszna-castle-028.jpg", "/assets/moszna-enrichment/moszna-castle-063.jpg", "/assets/moszna-enrichment/moszna-castle-064.jpg", "/assets/moszna-enrichment/moszna-castle-065.jpg", "/assets/moszna-enrichment/moszna-castle-066.jpg", "/assets/moszna-enrichment/moszna-castle-067.jpg"], videos: ["/assets/moszna-castle-video.mp4"], guideVideos: { he: "https://youtube.com/shorts/5ghRWvbwU6Q", en: "https://youtube.com/shorts/UqqWiyXRk00" }, metadata: { "/assets/moszna-enrichment/moszna-castle-002.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-003.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-004.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-006.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.28 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-009.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.51.jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-010.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.52.jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-011.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.53 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-040.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (15).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-053.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (8).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-054.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (9).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-058.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (17).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-060.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (20).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-061.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (21).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-062.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (24).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-001.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.25.jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-005.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.27 (4).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-049.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-050.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-051.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (4).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-052.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.27 (5).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-055.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (10).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-069.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (9).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-033.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.25 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-034.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.25 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-035.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.25 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-036.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.26 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-037.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.26 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-043.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (18).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-044.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (19).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-045.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (20).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-046.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (21).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-047.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (22).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-048.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.21 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-013.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.17 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-017.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.18 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-018.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.18 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-014.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.17 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-015.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.17 (4).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-020.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.19 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-021.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.19 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-022.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.20 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-025.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.22 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-028.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.23 (1).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-063.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-064.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (4).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-065.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (5).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-066.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (6).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-067.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (7).jpeg", "original": true}, "/assets/moszna-castle-hero.jpeg": { sourceFile: "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (16).jpeg", original: true, heroCandidate: true }, "/assets/moszna-castle-approach.jpeg": { sourceFile: "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (11).jpeg", original: true }, "/assets/moszna-castle-entrance.jpeg": { sourceFile: "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (14).jpeg", original: true }, "/assets/moszna-castle-video.mp4": { sourceFile: "Moszna Castle/FORCODEX/WhatsApp Video 2026-09-24 at 17.26.50.mp4", original: true } } },
      status: "published", languages: ["he", "en", "pl", "de", "cs"] },
    {
      id: "moszna-castle-park", localName: "Park Zamkowy w Mosznej", aliases: [],
      name: { he: "פארק טירת מושנה", en: "Moszna Castle Park", pl: "Park Zamkowy w Mosznej", de: "Schlosspark Moschen", cs: "Zámecký park v Moszně" },
      description: { he: "הפארק מקיף את הטירה וכולל שבילים, מדשאות, עצים ומקווי מים. זה המקום לסיים בו את הביקור במושנה.", en: "The park around the castle has paths, lawns, trees and water features. It makes a calm finish to the Moszna visit.", pl: "Park wokół zamku ma alejki, trawniki, drzewa i wodę. To spokojne zakończenie wizyty w Mosznej.", de: "Der Park am Schloss bietet Wege, Rasenflächen, Bäume und Wasseranlagen. Hier lässt sich der Besuch ruhig ausklingen.", cs: "Park kolem zámku nabízí cesty, trávníky, stromy i vodní plochy. Je to klidné zakončení návštěvy Moszny." },
      location: { countryCode: "PL", regionId: "opole", cityId: "moszna", coordinates: { lat: 50.44079, lng: 17.76793 }, address: { street: "Zamkowa 1", postalCode: "47-370", city: "Moszna", country: "Poland" } },
      categories: ["park", "garden"], taxonomy: { tags: ["nature", "walking", "excursion", "outside-wroclaw"] },
      links: { website: "https://mosznazamek.pl/zwiedzanie-parku/", navigation: { googleMaps: "https://www.google.com/maps/search/?api=1&query=Park%20Zamkowy%20w%20Mosznej" } },
      provenance: { contentType: "personal-visit", personalVisit: true, originalPhotography: true, factualSources: [{ type: "official", url: "https://mosznazamek.pl/zwiedzanie-parku/", checkedAt: "2026-09-28" }] },
      socialPosts: [], media: { photos: ["/assets/moszna-park-view.jpeg", "/assets/moszna-park-garden.jpeg", "/assets/moszna-enrichment/moszna-castle-park-012.jpg", "/assets/moszna-enrichment/moszna-castle-park-024.jpg", "/assets/moszna-enrichment/moszna-castle-park-026.jpg", "/assets/moszna-enrichment/moszna-castle-park-027.jpg", "/assets/moszna-enrichment/moszna-castle-park-038.jpg", "/assets/moszna-enrichment/moszna-castle-park-041.jpg", "/assets/moszna-enrichment/moszna-castle-park-042.jpg", "/assets/moszna-enrichment/moszna-castle-park-068.jpg"], videos: [], metadata: { "/assets/moszna-enrichment/moszna-castle-park-012.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.26.53 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-024.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.21 (2).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-026.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.22 (4).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-027.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.22.jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-038.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.27 (3).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-041.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (16).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-042.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.05.35 (17).jpeg", "original": true}, "/assets/moszna-enrichment/moszna-castle-park-068.jpg": {"sourceFile": "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (8).jpeg", "original": true}, "/assets/moszna-park-view.jpeg": { sourceFile: "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 17.28.21 (1).jpeg", original: true }, "/assets/moszna-park-garden.jpeg": { sourceFile: "Moszna Castle/FORCODEX/WhatsApp Image 2026-09-24 at 19.06.28 (2).jpeg", original: true } } },
      status: "published", languages: ["he", "en", "pl", "de", "cs"] },
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
      "/assets/excursion-three/jawor-church-of-peace-05.jpg",
      "/assets/excursion-three/jawor-church-of-peace-06.jpg",
      "/assets/excursion-three/jawor-church-of-peace-07.jpg",
      "/assets/excursion-three/jawor-church-of-peace-08.jpg",
      "/assets/excursion-three/jawor-church-of-peace-09.jpg",
      "/assets/excursion-three/jawor-church-of-peace-10.jpg",
      "/assets/excursion-three/jawor-church-of-peace-11.jpg",
      "/assets/excursion-three/jawor-church-of-peace-12.jpg",
      "/assets/excursion-three/jawor-church-of-peace-13.jpg",
      "/assets/excursion-three/jawor-church-of-peace-14.jpg",
      "/assets/excursion-three/jawor-church-of-peace-15.jpg",
      "/assets/excursion-three/jawor-church-of-peace-16.jpg",
      "/assets/excursion-three/jawor-church-of-peace-17.jpg",
      "/assets/excursion-three/jawor-church-of-peace-18.jpg",
      "/assets/excursion-three/jawor-church-of-peace-19.jpg",
      "/assets/excursion-three/jawor-church-of-peace-20.jpg",
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
      "/assets/excursion-three/jawor-church-of-peace-05.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.14.jpeg",
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
      "/assets/excursion-three/jawor-church-of-peace-11.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.24.15.jpeg",
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
      "/assets/excursion-three/jawor-church-of-peace-20.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/כנסיית השלום/WhatsApp Image 2026-09-24 at 17.25.51 (4).jpeg",
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
      "/assets/excursion-three/jawor-piast-castle-11.jpg",
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
      "/assets/excursion-three/jawor-piast-castle-11.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Jawor/מבצר הפיאסט ההרוס/WhatsApp Image 2026-09-24 at 19.10.05 (20).jpeg",
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
    "guideVideos": {"he": "https://youtube.com/shorts/gQlJjc241gk", "en": "https://youtube.com/shorts/4WgaQo6HmWg"},
    "photos": [
      "/assets/excursion-three/karpacz-centre-01.jpg",
      "/assets/excursion-three/karpacz-centre-02.jpg",
      "/assets/excursion-three/karpacz-centre-03.jpg",
      "/assets/excursion-three/karpacz-centre-04.jpg",
      "/assets/excursion-three/karpacz-centre-05.jpg",
      "/assets/excursion-three/karpacz-centre-06.jpg",
      "/assets/excursion-three/karpacz-centre-07.jpg",
      "/assets/excursion-three/karpacz-centre-08.jpg",
      "/assets/excursion-three/karpacz-centre-09.jpg",
      "/assets/excursion-three/karpacz-centre-10.jpg",
      "/assets/excursion-three/karpacz-centre-11.jpg",
      "/assets/excursion-three/karpacz-centre-12.jpg",
      "/assets/excursion-three/karpacz-centre-13.jpg",
      "/assets/excursion-three/karpacz-centre-14.jpg",
      "/assets/excursion-three/karpacz-centre-15.jpg",
      "/assets/excursion-three/karpacz-centre-16.jpg",
      "/assets/excursion-three/karpacz-centre-17.jpg",
      "/assets/excursion-three/karpacz-centre-18.jpg",
      "/assets/excursion-three/karpacz-centre-19.jpg",
      "/assets/excursion-three/karpacz-centre-20.jpg",
      "/assets/excursion-three/karpacz-centre-21.jpg",
      "/assets/excursion-three/karpacz-centre-22.jpg"
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
      "/assets/excursion-three/karpacz-centre-04.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-01 at 09.26.14.jpeg",
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
      "/assets/excursion-three/karpacz-centre-12.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.28 (1).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-13.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.28 (2).jpeg",
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
      "/assets/excursion-three/karpacz-centre-18.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.36.jpeg",
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
      "/assets/excursion-three/karpacz-centre-21.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.46 (4).jpeg",
        "original": true
      },
      "/assets/excursion-three/karpacz-centre-22.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/קרפץ/WhatsApp Image 2026-10-05 at 18.33.46 (6).jpeg",
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
      "/assets/excursion-three/wang-church-03.jpg",
      "/assets/excursion-three/wang-church-05.jpg",
      "/assets/excursion-three/wang-church-06.jpg",
      "/assets/excursion-three/wang-church-07.jpg",
      "/assets/excursion-three/wang-church-08.jpg",
      "/assets/excursion-three/wang-church-10.jpg",
      "/assets/excursion-three/wang-church-11.jpg",
      "/assets/excursion-three/wang-church-12.jpg",
      "/assets/excursion-three/wang-church-13.jpg",
      "/assets/excursion-three/wang-church-14.jpg",
      "/assets/excursion-three/wang-church-15.jpg",
      "/assets/excursion-three/wang-church-16.jpg",
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
      "https://youtube.com/shorts/D8HmY7lvWmk",
      "https://youtube.com/shorts/4uEHwuoId9c",
      "https://youtube.com/shorts/7WJ6rV3GKcs",
      "https://youtube.com/shorts/UUB2CQEg4AM",
      "https://youtube.com/shorts/k9i8mTVmHEI",
      "https://youtube.com/shorts/kX5L3MzXhzo",
      "https://youtube.com/shorts/LplVP7BLSUI"
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
      "/assets/excursion-three/wang-church-03.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.50 (1).jpeg",
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
      "/assets/excursion-three/wang-church-12.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-01 at 09.25.57.jpeg",
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
      "/assets/excursion-three/wang-church-16.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Image 2026-10-05 at 18.32.53 (1).jpeg",
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
      "https://youtube.com/shorts/D8HmY7lvWmk": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.32.32.mp4",
        "sourceSHA256": "e48e3065c1b7689d3e0c219d2e12fd012915dd4582303a4303f2238c6b5ff833",
        "youtube": "https://youtube.com/shorts/D8HmY7lvWmk",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:11:58.281Z"
      },
      "https://youtube.com/shorts/4uEHwuoId9c": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.32.54.mp4",
        "sourceSHA256": "8fbbe9a536463d0daa005a74b07ae0463268e295463b85f3846cc059ea233022",
        "youtube": "https://youtube.com/shorts/4uEHwuoId9c",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:12:40.605Z"
      },
      "https://youtube.com/shorts/7WJ6rV3GKcs": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.32.55.mp4",
        "sourceSHA256": "5801238fa0bdfca0372f60e18d8261b3336629c1f06c9a24736be7039dd39320",
        "youtube": "https://youtube.com/shorts/7WJ6rV3GKcs",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:12:51.149Z"
      },
      "https://youtube.com/shorts/UUB2CQEg4AM": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.32.57.mp4",
        "sourceSHA256": "119af6e24da07c22ab8306ea396f95b12c7483bb64a658e092f957d62b8a9615",
        "youtube": "https://youtube.com/shorts/UUB2CQEg4AM",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:13:04.209Z"
      },
      "https://youtube.com/shorts/k9i8mTVmHEI": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.32.59.mp4",
        "sourceSHA256": "ca3e211841388c33a751f2a60e60d3d047683ddeb48e59e9cec1d01d6dd63ba9",
        "youtube": "https://youtube.com/shorts/k9i8mTVmHEI",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:13:29.197Z"
      },
      "https://youtube.com/shorts/kX5L3MzXhzo": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.33.01.mp4",
        "sourceSHA256": "0bb9d13fec934763229e27cea38aa6749d1fc797ab42c659e0237fa7c26dd942",
        "youtube": "https://youtube.com/shorts/kX5L3MzXhzo",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:13:41.564Z"
      },
      "https://youtube.com/shorts/LplVP7BLSUI": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/וואנג/WhatsApp Video 2026-10-05 at 18.33.03.mp4",
        "sourceSHA256": "02db191f4b17877a7195eaea6982180995988480935c6228deffbacb8354f657",
        "youtube": "https://youtube.com/shorts/LplVP7BLSUI",
        "visibility": "Public",
        "checks": "completed, no issues",
        "verifiedAt": "2026-10-16T09:14:05.241Z"
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
      "/assets/excursion-three/jelenia-gora-market-square-08.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-09.jpg",
      "/assets/excursion-three/jelenia-gora-market-square-10.jpg",
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
      "/assets/excursion-three/jelenia-gora-market-square-21.jpg",
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
      "/assets/excursion-three/jelenia-gora-market-square-08.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.24.11.jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-09.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.22 (2).jpeg",
        "original": true
      },
      "/assets/excursion-three/jelenia-gora-market-square-10.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.22 (3).jpeg",
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
      "/assets/excursion-three/jelenia-gora-market-square-21.jpg": {
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/ילנה גורה/WhatsApp Image 2026-10-01 at 09.25.30 (1).jpeg",
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
  ];
})();
