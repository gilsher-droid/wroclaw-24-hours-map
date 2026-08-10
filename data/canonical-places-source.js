(function () {
  "use strict";

  // Editorial source of truth for canonical places that do not need to belong
  // to an existing route or product. Every record added here must provide its
  // geography explicitly; no city is inferred by the catalog generator.
  window.WROC_CANONICAL_PLACE_SOURCE = [
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
        { platform: "facebook", url: "https://www.facebook.com/share/p/1BDCiqQbE1/" },
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
  ];
})();
