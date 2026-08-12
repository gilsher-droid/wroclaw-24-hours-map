(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => ({ he, en, pl, de, cs });
  const canonicalPlaceIds = ["ksiaz-castle", "church-of-peace-swidnica"];
  const wroclaw = { lat: 51.1079, lng: 17.0385 };
  const swidnicaCenter = { lat: 50.8422, lng: 16.4877 };

  const excursion = {
    id: "ksiaz-swidnica-day-trip",
    slug: "ksiaz-castle-swidnica",
    title: t(
      "טירת קשונז׳ ושווידניצה — יום של טירה, היסטוריה ואתר מורשת",
      "Książ Castle and Świdnica — a day of castle, history and heritage",
      "Zamek Książ i Świdnica — dzień zamku, historii i dziedzictwa",
      "Schloss Książ und Świdnica — ein Tag voller Schloss, Geschichte und Kulturerbe",
      "Zámek Książ a Svídnice — den plný zámku, historie a dědictví"
    ),
    summary: t(
      "טיול יום מלא שמחבר בין אחת הטירות המרשימות בפולין, כנסיית עץ יוצאת דופן ואתר מורשת עולמית, וזמן חופשי במרכז שווידניצה.",
      "A full-day trip combining one of Poland’s most impressive castles, an exceptional timber UNESCO site and free time in central Świdnica.",
      "Całodniowa wycieczka łącząca jeden z najpiękniejszych zamków w Polsce, wyjątkowy drewniany obiekt UNESCO i czas wolny w centrum Świdnicy.",
      "Ein ganztägiger Ausflug zu einem der eindrucksvollsten Schlösser Polens, einer außergewöhnlichen hölzernen UNESCO-Stätte und mit Freizeit im Zentrum von Świdnica.",
      "Celodenní výlet spojující jeden z nejpůsobivějších polských zámků, výjimečnou dřevěnou památku UNESCO a volný čas v centru Svídnice."
    ),
    meta: {
      duration: "full-day",
      startsAt: "wroclaw",
      region: "lower-silesia",
      tags: ["history", "architecture", "culture", "heritage", "castles", "photography"],
    },
    heroMedia: { canonicalPlaceId: "ksiaz-castle", photoIndex: 0 },
    canonicalPlaceIds,
    routePoints: [
      { id: "wroclaw-start", kind: "context", label: t("וורוצלב", "Wrocław", "Wrocław", "Wrocław", "Vratislav"), coordinates: wroclaw },
      { id: "ksiaz-stop", kind: "place", canonicalPlaceId: "ksiaz-castle" },
      { id: "church-stop", kind: "place", canonicalPlaceId: "church-of-peace-swidnica" },
      { id: "swidnica-center", kind: "editorial", label: t("מרכז שווידניצה", "Central Świdnica", "Centrum Świdnicy", "Zentrum von Świdnica", "Centrum Svídnice"), coordinates: swidnicaCenter },
      { id: "wroclaw-return", kind: "context", label: t("חזרה לוורוצלב", "Return to Wrocław", "Powrót do Wrocławia", "Rückfahrt nach Wrocław", "Návrat do Vratislavi"), coordinates: wroclaw },
    ],
    travel: {
      recommendedMode: "car",
      estimates: [
        { from: "wroclaw-start", to: "ksiaz-stop", minutes: "65–80" },
        { from: "ksiaz-stop", to: "church-stop", minutes: "20–30" },
        { from: "swidnica-center", to: "wroclaw-return", minutes: "60–75" },
      ],
      note: t(
        "רכב הוא הדרך המעשית ביותר לשלב את כל התחנות ביום אחד. זמני הנסיעה משוערים ותלויים בתנועה, בדרך ובאמצעי התחבורה. אפשר לבדוק חלופות תחבורה באופן עצמאי; WROC-LOVE אינו מספק שירותי הסעה.",
        "A car is the most practical way to combine all stops in one day. Travel times are estimates and depend on traffic, route and transport mode. Check public-transport alternatives independently; WROC-LOVE does not provide transport.",
        "Samochód to najbardziej praktyczny sposób połączenia wszystkich punktów jednego dnia. Czasy przejazdu są orientacyjne i zależą od ruchu, trasy oraz środka transportu. Alternatywy komunikacją publiczną sprawdź samodzielnie; WROC-LOVE nie świadczy usług transportowych.",
        "Mit dem Auto lassen sich alle Stationen am praktischsten an einem Tag verbinden. Die Fahrzeiten sind Richtwerte und hängen von Verkehr, Route und Verkehrsmittel ab. Alternativen mit öffentlichen Verkehrsmitteln bitte selbst prüfen; WROC-LOVE bietet keinen Transportdienst an.",
        "Auto je nejpraktičtější způsob, jak spojit všechny zastávky během jednoho dne. Jízdní doby jsou orientační a závisí na dopravě, trase a dopravním prostředku. Alternativy veřejnou dopravou si ověřte samostatně; WROC-LOVE dopravu nezajišťuje."
      ),
    },
    navigation: {
      googleMaps: "https://www.google.com/maps/dir/?api=1&origin=Wroc%C5%82aw%2C%20Poland&destination=Wroc%C5%82aw%2C%20Poland&waypoints=50.8422222%2C16.2916667%7C50.8465028%2C16.4918111&travelmode=driving",
    },
    editorial: {
      why: t(
        "השילוב עובד בזכות הניגוד: מתחילים בטירה גדולה ובנוף ירוק, ממשיכים אל חלל עץ אינטימי ועשיר בפרטים, ומסיימים בהליכה חופשית בעיר נעימה שאינה מרגישה כמו עוד תחנה תיירותית.",
        "The combination works through contrast: a grand castle and green landscape, an intimate timber interior rich in detail, then an unhurried walk through a pleasant city that does not feel like just another tourist stop.",
        "Siłą tego połączenia jest kontrast: monumentalny zamek i zielony krajobraz, kameralne drewniane wnętrze pełne detali, a na koniec swobodny spacer po przyjemnym mieście.",
        "Der Reiz liegt im Kontrast: ein großes Schloss in grüner Landschaft, ein intimer, detailreicher Holzraum und zum Abschluss ein entspannter Spaziergang durch eine angenehme Stadt.",
        "Kouzlo spočívá v kontrastu: velký zámek v zelené krajině, intimní dřevěný interiér plný detailů a nakonec pohodová procházka příjemným městem."
      ),
      forWhom: t(
        "מתאים במיוחד למי שאוהב היסטוריה, אדריכלות, תרבות, אתרי מורשת וצילום, ומוכן להקדיש יום מלא מחוץ לוורוצלב.",
        "Best for travellers who enjoy history, architecture, culture, heritage and photography, and are ready to devote a full day beyond Wrocław.",
        "Najlepszy dla osób lubiących historię, architekturę, kulturę, dziedzictwo i fotografię, gotowych przeznaczyć cały dzień poza Wrocławiem.",
        "Ideal für Reisende mit Interesse an Geschichte, Architektur, Kultur, Kulturerbe und Fotografie, die einen ganzen Tag außerhalb Wrocławs verbringen möchten.",
        "Vhodné pro milovníky historie, architektury, kultury, památek a fotografování, kteří chtějí strávit celý den mimo Vratislav."
      ),
      practical: t(
        "בדקו מראש שעות פתיחה וכרטיסים בשני האתרים. השאירו מרווח בין התחנות, נעלו נעליים נוחות והקדישו למרכז שווידניצה זמן גמיש לקפה, ארוחה או שיטוט.",
        "Check opening hours and tickets for both sites in advance. Leave buffer time between stops, wear comfortable shoes and keep the central Świdnica segment flexible for coffee, a meal or a wander.",
        "Sprawdź wcześniej godziny otwarcia i bilety do obu obiektów. Zostaw zapas czasu między punktami, załóż wygodne buty, a pobyt w centrum Świdnicy potraktuj elastycznie.",
        "Öffnungszeiten und Tickets für beide Sehenswürdigkeiten vorab prüfen. Zeitpuffer einplanen, bequeme Schuhe tragen und den Aufenthalt im Zentrum von Świdnica flexibel für Kaffee, Essen oder einen Spaziergang halten.",
        "Předem si ověřte otevírací dobu a vstupenky na obě místa. Nechte si časovou rezervu, vezměte si pohodlné boty a pobyt v centru Svídnice ponechte flexibilní."
      ),
    },
    steps: [
      { id: "depart", title: t("יציאה מוורוצלב", "Depart Wrocław", "Wyjazd z Wrocławia", "Abfahrt aus Wrocław", "Odjezd z Vratislavi"), duration: t("כ־65–80 דקות", "About 65–80 min", "Około 65–80 min", "Etwa 65–80 Min.", "Přibližně 65–80 min") },
      { id: "ksiaz", canonicalPlaceId: "ksiaz-castle", title: t("טירת קשונז׳", "Książ Castle", "Zamek Książ", "Schloss Książ", "Zámek Książ"), duration: t("2.5–3.5 שעות", "2.5–3.5 hours", "2,5–3,5 godz.", "2,5–3,5 Std.", "2,5–3,5 hod.") },
      { id: "transfer", title: t("נסיעה לשווידניצה", "Drive to Świdnica", "Przejazd do Świdnicy", "Fahrt nach Świdnica", "Přejezd do Svídnice"), duration: t("כ־20–30 דקות", "About 20–30 min", "Około 20–30 min", "Etwa 20–30 Min.", "Přibližně 20–30 min") },
      { id: "church", canonicalPlaceId: "church-of-peace-swidnica", title: t("כנסיית השלום", "Church of Peace", "Kościół Pokoju", "Friedenskirche", "Kostel míru"), duration: t("45–60 דקות", "45–60 min", "45–60 min", "45–60 Min.", "45–60 min") },
      { id: "center", title: t("מרכז שווידניצה", "Central Świdnica", "Centrum Świdnicy", "Zentrum von Świdnica", "Centrum Svídnice"), duration: t("60–90 דקות", "60–90 min", "60–90 min", "60–90 Min.", "60–90 min") },
      { id: "return", title: t("חזרה לוורוצלב", "Return to Wrocław", "Powrót do Wrocławia", "Rückfahrt nach Wrocław", "Návrat do Vratislavi"), duration: t("כ־60–75 דקות", "About 60–75 min", "Około 60–75 min", "Etwa 60–75 Min.", "Přibližně 60–75 min") },
    ],
  };

  const product = {
    id: "lower-silesia-excursions",
    type: "excursions",
    title: t("טיולים בשלזיה התחתית", "Lower Silesia excursions", "Wycieczki po Dolnym Śląsku", "Ausflüge in Niederschlesien", "Výlety po Dolním Slezsku"),
    status: t("טיול אחד מוכן", "One excursion ready", "Jedna wycieczka gotowa", "Ein Ausflug ist bereit", "Jeden výlet je připraven"),
    excursions: [excursion],
    canonicalPlaceIds,
  };

  if (window.WROC_CATALOG?.registerProduct) {
    window.WROC_CATALOG.registerProduct({ id: product.id, type: product.type, places: canonicalPlaceIds.map((id) => ({ id })) });
  }

  window.WROC_LOWER_SILESIA_EXCURSIONS = Object.freeze(product);
})();
