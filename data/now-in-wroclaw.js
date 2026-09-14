(function () {
  "use strict";

  const title = (he, en, pl, de, cs) => Object.freeze({ he, en, pl, de, cs });

  window.WROC_NOW_IN_WROCLAW_ITEMS = Object.freeze([
    // Editorial expiry: review these weekly items after 21 September.
    // The promenade expiry is not an announced reopening date.
    Object.freeze({
      id: "promenada-staromiejska-works-2026-09",
      title: title(
        "עבודות בטיילת העיר העתיקה: הקטע בין Kołłątaja ל־Nowa סגור — היערכו למעקף",
        "Old Town Promenade works: the Kołłątaja–Nowa section is closed; plan a detour",
        "Remont Promenady Staromiejskiej: odcinek Kołłątaja–Nowa zamknięty; zaplanuj obejście",
        "Bauarbeiten an der Altstadtpromenade: Abschnitt Kołłątaja–Nowa gesperrt; Umweg einplanen",
        "Opravy Staroměstské promenády: úsek Kołłątaja–Nowa je uzavřen; počítejte s obchůzkou"
      ),
      url: "https://www.wroclaw.pl/zielony-wroclaw/rozpoczela-sie-renowacja-promenady-staromiejskiej",
      startDate: "2026-09-14",
      endDate: "2026-09-21",
      priority: "important",
      category: "transport",
    }),
    Object.freeze({
      id: "airport-electric-buses-106-129-2026-09",
      title: title(
        "קווי האוטובוס 106 ו־129 לשדה התעופה מופעלים כעת באוטובוסים חשמליים",
        "Airport bus routes 106 and 129 now run with electric buses",
        "Linie lotniskowe 106 i 129 są teraz obsługiwane autobusami elektrycznymi",
        "Die Flughafenlinien 106 und 129 fahren jetzt mit Elektrobussen",
        "Letištní linky 106 a 129 nyní obsluhují elektrobusy"
      ),
      url: "https://www.wroclaw.pl/komunikacja/autobusy-elektryczne-mpk-wroclaw-zapewniaja-obsluge-lotniska",
      startDate: "2026-09-14",
      endDate: "2026-09-21",
      priority: "normal",
      category: "airport",
    }),
    Object.freeze({
      id: "kantyna-august-opening-2026",
      title: title(
        "Kantyna נפתחה באוגוסט ב־Włodkowica 23: פרשנות עכשווית למטבח הפולני",
        "Kantyna opened in August at Włodkowica 23, serving modern Polish cuisine",
        "Kantyna otwarta w sierpniu przy Włodkowica 23: współczesna kuchnia polska",
        "Kantyna eröffnete im August in der Włodkowica 23 mit moderner polnischer Küche",
        "Kantyna otevřela v srpnu na Włodkowica 23 a nabízí moderní polskou kuchyni"
      ),
      url: "https://wroclawskiejedzenie.pl/2026/09/07/nowe-restauracje-we-wroclawiu-sierpien-26-zamkniecia/",
      startDate: "2026-09-14",
      endDate: "2026-09-21",
      priority: "normal",
      category: "city-update",
    }),
    Object.freeze({
      id: "westfield-wroclavia-rebrand-2026",
      title: title(
        "Wroclavia הופכת ל־Westfield Wroclavia ב־17 בספטמבר",
        "Wroclavia becomes Westfield Wroclavia on 17 September",
        "Wroclavia zmienia nazwę na Westfield Wroclavia 17 września",
        "Wroclavia wird am 17. September zu Westfield Wroclavia",
        "Wroclavia se 17. září mění na Westfield Wroclavia"
      ),
      url: "https://www.urw.com/news/allnews/wroclavia-centre-rebrand-westfield-wroclavia",
      startDate: "2026-09-07",
      endDate: "2026-09-17",
      priority: "normal",
      category: "city-update",
      relatedCanonicalPlaceId: "wroclavia",
    }),
    Object.freeze({
      id: "kinomural-nadodrze-2026",
      title: title(
        "Kinomural חוזר ל־Nadodrze ב־18–19 בספטמבר",
        "Kinomural returns to Nadodrze on 18–19 September",
        "Kinomural wraca na Nadodrze 18–19 września",
        "Kinomural kehrt am 18.–19. September nach Nadodrze zurück",
        "Kinomural se vrací do Nadodrze 18.–19. září"
      ),
      url: "https://www.wroclaw.pl/go/wydarzenia/rozrywka/1414303-kinomural-2026",
      startDate: "2026-09-07",
      endDate: "2026-09-19",
      priority: "normal",
      category: "event",
      relatedCanonicalExperienceId: "street-art-nadodrze-olbin",
    }),
    Object.freeze({
      id: "lower-silesia-rail-changes-autumn-2026",
      title: title(
        "שינויים זמניים ברכבות לכיוון Görlitz, Szklarska Poręba ו־Kudowa-Zdrój",
        "Temporary rail changes toward Görlitz, Szklarska Poręba and Kudowa-Zdrój",
        "Tymczasowe zmiany kolejowe w kierunku Görlitz, Szklarskiej Poręby i Kudowy-Zdroju",
        "Vorübergehende Bahnänderungen Richtung Görlitz, Szklarska Poręba und Kudowa-Zdrój",
        "Dočasné změny vlakových spojů směrem na Görlitz, Szklarskou Porębu a Kudowu-Zdrój"
      ),
      url: "https://www.wroclaw.pl/komunikacja/korekta-rozkladow-kolejowych-pkp-30-sierpnia",
      startDate: "2026-09-07",
      endDate: "2026-11-20",
      priority: "important",
      category: "transport",
    }),
  ]);
})();
