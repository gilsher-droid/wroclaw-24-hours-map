(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => ({ he, en, pl, de, cs });
  const canonicalPlaceIds = ["ksiaz-castle", "walbrzych-market-square", "church-of-peace-swidnica"];
  const wroclaw = { lat: 51.1079, lng: 17.0385 };
  const swidnicaCenter = { lat: 50.8422, lng: 16.4877 };

  const excursion = {
    id: "ksiaz-swidnica-day-trip",
    slug: "ksiaz-castle-swidnica",
    title: t(
      "טירת קשונז׳, Wałbrzych ושווידניצה — יום של טירה, ערים ואתר מורשת",
      "Książ Castle, Wałbrzych and Świdnica — a day of castle, cities and heritage",
      "Zamek Książ, Wałbrzych i Świdnica — dzień zamku, miast i dziedzictwa",
      "Schloss Książ, Wałbrzych und Świdnica — ein Tag voller Schloss, Städte und Kulturerbe",
      "Zámek Książ, Valbřich a Svídnice — den plný zámku, měst a dědictví"
    ),
    summary: t(
      "טיול יום מלא שמשלב טירה מרשימה, עצירה עירונית ב־Wałbrzych, כנסיית עץ יוצאת דופן וזמן חופשי במרכז שווידניצה.",
      "A full-day trip combining an impressive castle, an urban stop in Wałbrzych, an exceptional timber church and free time in central Świdnica.",
      "Całodniowa wycieczka łącząca imponujący zamek, miejski przystanek w Wałbrzychu, wyjątkowy drewniany kościół i czas wolny w centrum Świdnicy.",
      "Ein ganztägiger Ausflug mit einem eindrucksvollen Schloss, einem Stadtstopp in Wałbrzych, einer außergewöhnlichen Holzkirche und Freizeit im Zentrum von Świdnica.",
      "Celodenní výlet spojující působivý zámek, městskou zastávku ve Valbřichu, výjimečný dřevěný kostel a volný čas v centru Svídnice."
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
      { id: "walbrzych-stop", kind: "place", canonicalPlaceId: "walbrzych-market-square" },
      { id: "church-stop", kind: "place", canonicalPlaceId: "church-of-peace-swidnica" },
      { id: "swidnica-center", kind: "editorial", label: t("מרכז שווידניצה", "Central Świdnica", "Centrum Świdnicy", "Zentrum von Świdnica", "Centrum Svídnice"), coordinates: swidnicaCenter },
      { id: "wroclaw-return", kind: "context", label: t("חזרה לוורוצלב", "Return to Wrocław", "Powrót do Wrocławia", "Rückfahrt nach Wrocław", "Návrat do Vratislavi"), coordinates: wroclaw },
    ],
    travel: {
      recommendedMode: "car",
      estimates: [
        { from: "wroclaw-start", to: "ksiaz-stop", minutes: "65–80" },
        { from: "ksiaz-stop", to: "walbrzych-stop", minutes: "20–30" },
        { from: "walbrzych-stop", to: "church-stop", minutes: "35–45" },
        { from: "church-stop", to: "swidnica-center", minutes: "5–10" },
        { from: "swidnica-center", to: "wroclaw-return", minutes: "60–75" },
      ],
      note: t(
        "רכב הוא הדרך המעשית ביותר לשלב את כל התחנות ביום אחד. זמני הנסיעה משוערים ותלויים בתנועה, בדרך ובאמצעי התחבורה. אפשר לבדוק חלופות תחבורה באופן עצמאי; WROC-LOVE אינו מספק שירותי הסעה.",
        "A car is the most practical way to combine all stops in one day. Travel times are estimates and depend on traffic, route and transport mode. Check public-transport alternatives independently; WROC-LOVE does not provide transport.",
        "Samochód to najbardziej praktyczny sposób połączenia wszystkich punktów jednego dnia. Czasy przejazdu są orientacyjne i zależą od ruchu, trasy oraz środka transportu. Alternatywy komunikacją publiczną sprawdź samodzielnie; WROC-LOVE nie świadczy usług transportowych.",
        "Mit dem Auto lassen sich alle Stationen am praktischsten an einem Tag verbinden. Die Fahrzeiten sind Richtwerte und hängen von Verkehr, Route und Verkehrsmittel ab. Alternativen mit öffentlichen Verkehrsmitteln bitte selbst prüfen; WROC-LOVE bietet keinen Transportdienst an.",
        "Auto je nejpraktičtější způsob, jak spojit všechny zastávky během jednoho dne. Jízdní doby jsou orientační a závisí na dopravě, trase a dopravním prostředku. Alternativy veřejnou dopravou si ověřte samostatně; WROC-LOVE dopravu nezajišťuje."
      ),
      options: [
        { mode: "car", title: t("רכב", "Car", "Samochód", "Auto", "Auto"), description: t("האפשרות המעשית ביותר לכל המסלול ביום אחד.", "The most practical option for the full itinerary in one day.", "Najpraktyczniejsza opcja na całą trasę jednego dnia.", "Die praktischste Option für die gesamte Route an einem Tag.", "Nejpraktičtější možnost pro celou trasu během jednoho dne.") },
        { mode: "train", title: t("רכבת", "Train", "Pociąg", "Bahn", "Vlak"), description: t("רכבת מוורוצלב ל־Wałbrzych או לשווידניצה, בשילוב אוטובוס מקומי או מונית בין התחנות.", "Train from Wrocław to Wałbrzych or Świdnica, combined with local bus or taxi between stops.", "Pociąg z Wrocławia do Wałbrzycha lub Świdnicy, dalej lokalnym autobusem albo taksówką.", "Bahn von Wrocław nach Wałbrzych oder Świdnica, kombiniert mit Bus oder Taxi vor Ort.", "Vlak z Vratislavi do Valbřichu nebo Svídnice, dále místním autobusem či taxi.") },
        { mode: "bus", title: t("אוטובוס", "Bus", "Autobus", "Bus", "Autobus"), description: t("אפשר לשלב קווים אזוריים ומקומיים; יש לבדוק לוחות זמנים ביום הנסיעה.", "Regional and local buses can be combined; check the current timetable on your travel day.", "Można łączyć autobusy regionalne i miejskie; sprawdź aktualny rozkład w dniu podróży.", "Regional- und Stadtbusse lassen sich kombinieren; Fahrplan am Reisetag prüfen.", "Lze kombinovat regionální a místní autobusy; jízdní řád ověřte v den cesty.") },
        { mode: "taxi", title: t("מונית", "Taxi", "Taksówka", "Taxi", "Taxi"), description: t("פתרון גמיש לקטעים בין התחנה, הטירה והערים; מומלץ להזמין מראש.", "A flexible option between stations, the castle and the towns; advance booking is advisable.", "Elastyczna opcja między dworcem, zamkiem i miastami; warto zamówić wcześniej.", "Flexibel zwischen Bahnhof, Schloss und Städten; Vorbestellung empfohlen.", "Flexibilní spojení mezi nádražím, zámkem a městy; doporučujeme objednat předem.") }
      ],
      accessibility: [
        { canonicalPlaceId: "ksiaz-castle", level: "partial" },
        { canonicalPlaceId: "walbrzych-market-square", level: "partial" },
        { canonicalPlaceId: "church-of-peace-swidnica", level: "partial" },
        { label: t("מרכז שווידניצה", "Central Świdnica", "Centrum Świdnicy", "Zentrum von Świdnica", "Centrum Svídnice"), level: "partial" }
      ],
    },
    navigation: {
      googleMaps: "https://www.google.com/maps/dir/?api=1&origin=Wroc%C5%82aw%2C%20Poland&destination=Wroc%C5%82aw%2C%20Poland&waypoints=50.8422222%2C16.2916667%7C50.7662241%2C16.2829578%7C50.8465028%2C16.4918111%7C50.8422%2C16.4877&travelmode=driving",
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
      { id: "depart", mapPointId: "wroclaw-start", title: t("יציאה מוורוצלב", "Depart Wrocław", "Wyjazd z Wrocławia", "Abfahrt aus Wrocław", "Odjezd z Vratislavi"), duration: t("כ־65–80 דקות", "About 65–80 min", "Około 65–80 min", "Etwa 65–80 Min.", "Přibližně 65–80 min") },
      { id: "ksiaz", canonicalPlaceId: "ksiaz-castle", title: t("טירת קשונז׳", "Książ Castle", "Zamek Książ", "Schloss Książ", "Zámek Książ"), duration: t("2.5–3.5 שעות", "2.5–3.5 hours", "2,5–3,5 godz.", "2,5–3,5 Std.", "2,5–3,5 hod.") },
      { id: "walbrzych", canonicalPlaceId: "walbrzych-market-square", title: t("ביקור ב־Wałbrzych", "Visit Wałbrzych", "Wizyta w Wałbrzychu", "Besuch in Wałbrzych", "Návštěva Valbřichu"), duration: t("45–60 דקות", "45–60 min", "45–60 min", "45–60 Min.", "45–60 min") },
      { id: "transfer", mapPointId: "swidnica-center", title: t("נסיעה לשווידניצה", "Continue to Świdnica", "Przejazd do Świdnicy", "Weiterfahrt nach Świdnica", "Přejezd do Svídnice"), duration: t("כ־35–45 דקות", "About 35–45 min", "Około 35–45 min", "Etwa 35–45 Min.", "Přibližně 35–45 min") },
      { id: "church", canonicalPlaceId: "church-of-peace-swidnica", title: t("כנסיית השלום", "Church of Peace", "Kościół Pokoju", "Friedenskirche", "Kostel míru"), duration: t("45–60 דקות", "45–60 min", "45–60 min", "45–60 Min.", "45–60 min") },
      { id: "center", mapPointId: "swidnica-center", title: t("מרכז שווידניצה", "Central Świdnica", "Centrum Świdnicy", "Zentrum von Świdnica", "Centrum Svídnice"), duration: t("60–90 דקות", "60–90 min", "60–90 min", "60–90 Min.", "60–90 min") },
      { id: "return", mapPointId: "wroclaw-return", title: t("חזרה לוורוצלב", "Return to Wrocław", "Powrót do Wrocławia", "Rückfahrt nach Wrocław", "Návrat do Vratislavi"), duration: t("כ־60–75 דקות", "About 60–75 min", "Około 60–75 min", "Etwa 60–75 Min.", "Přibližně 60–75 min") },
    ],
  };

  const brzegMosznaPlaceIds = ["brzeg-castle", "brzeg-holy-cross-church", "brzeg-town-hall", "brzeg-oder-gate", "moszna-castle", "moszna-castle-park"];
  // A–J follow the tourist trail photographed by the user. Coordinates for
  // route-only features are approximate placements derived from that map;
  // navigation links use the named destinations instead of these placements.
  const brzegWalkingRoute = [
    { id: "A", kind: "place", canonicalPlaceId: "brzeg-castle" },
    { id: "B", kind: "place", canonicalPlaceId: "brzeg-holy-cross-church" },
    { id: "C", kind: "place", canonicalPlaceId: "brzeg-town-hall" },
    { id: "D", kind: "waypoint", label: t("האנדרטה ליד רחוב דלוגה", "Monument near Długa Street", "Pomnik przy ulicy Długiej", "Denkmal an der Długa-Straße", "Pomník u ulice Długa"), coordinates: { lat: 50.86021, lng: 17.47051 }, approximate: true },
    { id: "E", kind: "waypoint", label: t("כנסיית ניקולאי הקדוש", "St. Nicholas Church", "Kościół św. Mikołaja", "Nikolaikirche", "Kostel sv. Mikuláše"), coordinates: { lat: 50.86011, lng: 17.47089 } },
    { id: "F", kind: "waypoint", label: t("מסעדת Wozownia", "Wozownia restaurant", "Restauracja Wozownia", "Restaurant Wozownia", "Restaurace Wozownia"), coordinates: { lat: 50.85796, lng: 17.47223 }, approximate: true },
    { id: "G", kind: "waypoint", label: t("המזרקה בפארק המרכזי", "Central Park fountain", "Fontanna w Parku Centralnym", "Brunnen im Zentralpark", "Fontána v centrálním parku"), coordinates: { lat: 50.85878, lng: 17.47041 }, approximate: true },
    { id: "H", kind: "waypoint", label: t("האמפיתיאטרון", "Amphitheatre", "Amfiteatr", "Amphitheater", "Amfiteátr"), coordinates: { lat: 50.86271, lng: 17.46531 }, approximate: true },
    { id: "I", kind: "waypoint", label: t("המזרקה בפארק ליד רחוב ורוצלבסקה", "Fountain by Wrocławska Street", "Fontanna przy ulicy Wrocławskiej", "Brunnen an der Wrocławska-Straße", "Fontána u ulice Wrocławska"), coordinates: { lat: 50.86359, lng: 17.46408 }, approximate: true },
    { id: "J", kind: "place", canonicalPlaceId: "brzeg-oder-gate" },
  ];

  const brzegMoszna = {
    id: "brzeg-moszna-day-trip",
    slug: "brzeg-moszna-day-trip",
    title: t("טיול יום לברז׳ג ומושנה מוורוצלב", "Brzeg & Moszna Day Trip from Wrocław", "Jednodniowa wycieczka z Wrocławia do Brzegu i Mosznej", "Tagesausflug von Wrocław nach Brzeg und Moszna", "Jednodenní výlet z Vratislavi do Brzegu a Moszny"),
    summary: t("יום טיול מוורוצלב דרך טירת ברז׳ג, המרכז הישן ומסלול הליכה בפארקים, אל טירת מושנה והפארק המקיף אותה.", "A full-day excursion from Wrocław through Brzeg Castle, the historic centre and a park walk, then Moszna Castle and its surrounding park.", "Całodniowa wycieczka z Wrocławia przez zamek w Brzegu, stare miasto i parki do zamku w Mosznej i otaczającego go parku.", "Ein Tagesausflug ab Wrocław über das Schloss Brzeg, die Altstadt und die Parks zum Schloss Moschen mit seinem Park.", "Celodenní výlet z Vratislavi přes zámek v Brzegu, historické centrum a parky k zámku Moszna a jeho parku."),
    meta: { duration: "full-day", startsAt: "wroclaw", region: "opole", tags: ["castles", "architecture", "walking", "parks", "outside-wroclaw"] },
    heroMedia: { canonicalPlaceId: "moszna-castle", photoIndex: 0 },
    canonicalPlaceIds: brzegMosznaPlaceIds,
    routePoints: [
      { id: "wroclaw-start", kind: "context", label: t("וורוצלב", "Wrocław", "Wrocław", "Wrocław", "Vratislav"), coordinates: wroclaw },
      { id: "brzeg", kind: "place", canonicalPlaceId: "brzeg-castle" },
      { id: "moszna", kind: "place", canonicalPlaceId: "moszna-castle" },
      { id: "wroclaw-return", kind: "context", label: t("חזרה לוורוצלב", "Return to Wrocław", "Powrót do Wrocławia", "Rückfahrt nach Wrocław", "Návrat do Vratislavi"), coordinates: wroclaw },
    ],
    walkingRoute: { city: "brzeg", points: brzegWalkingRoute, geometryAccuracy: "approximate-waypoints", navigation: { googleMaps: "https://www.google.com/maps/dir/?api=1&origin=Zamek%20Piast%C3%B3w%20%C5%9Al%C4%85skich%20w%20Brzegu&destination=Brama%20Odrza%C5%84ska%20Brzeg&waypoints=Ko%C5%9Bci%C3%B3%C5%82%20Podwy%C5%BCszenia%20Krzy%C5%BCa%20%C5%9Awi%C4%99tego%20w%20Brzegu%7CRatusz%20w%20Brzegu%7CKo%C5%9Bci%C3%B3%C5%82%20%C5%9Bw.%20Miko%C5%82aja%20w%20Brzegu%7CRestauracja%20Wozownia%20Brzeg%7CAmfiteatr%20Brzeg&travelmode=walking" } },
    travel: {
      recommendedMode: "car",
      segments: [{ from: "wroclaw-start", to: "brzeg", mode: "car" }, { from: "brzeg", to: "moszna", mode: "car" }, { from: "moszna", to: "wroclaw-return", mode: "car" }],
      estimates: [],
      note: t("רכב הוא הדרך המעשית לשלב את שני היעדים ביום אחד. בדקו את זמני הנסיעה ביום היציאה; המסלול בתוך ברז׳ג מיועד להליכה.", "A car is the practical way to combine both destinations in one day. Check live driving times before leaving; the Brzeg route is on foot.", "Samochód ułatwia połączenie obu miejsc w jeden dzień. Sprawdź aktualny czas przejazdu przed wyjazdem; trasa po Brzegu jest piesza.", "Mit dem Auto lassen sich beide Ziele an einem Tag verbinden. Prüfen Sie die aktuelle Fahrzeit vor der Abfahrt; die Route in Brzeg ist ein Spaziergang.", "Auto usnadňuje spojení obou míst během jednoho dne. Před odjezdem ověřte aktuální dobu jízdy; trasa v Brzegu je pěší."),
      options: [{ mode: "car", title: t("רכב", "Car", "Samochód", "Auto", "Auto"), description: t("נסיעה בין וורוצלב, ברז׳ג ומושנה; הליכה בתוך ברז׳ג ובפארק מושנה.", "Drive between Wrocław, Brzeg and Moszna; walk in Brzeg and Moszna Castle Park.", "Przejazdy między Wrocławiem, Brzegiem i Moszną; spacer po Brzegu i parku w Mosznej.", "Fahrten zwischen Wrocław, Brzeg und Moszna; Spaziergänge in Brzeg und im Schlosspark.", "Přejezdy mezi Vratislaví, Brzegem a Mosznou; procházky v Brzegu a zámeckém parku.") }],
      accessibility: [],
    },
    navigation: { googleMaps: "https://www.google.com/maps/dir/?api=1&origin=Wroc%C5%82aw%2C%20Poland&destination=Wroc%C5%82aw%2C%20Poland&waypoints=Zamek%20Piast%C3%B3w%20%C5%9Al%C4%85skich%20w%20Brzegu%7CZamek%20Moszna&travelmode=driving" },
    editorial: {
      why: t("בברז׳ג משלבים טירה ומרכז עירוני עם הליכה דרך הפארקים; במושנה ממשיכים לטירה ולפארק שלה.", "Brzeg pairs a castle and historic centre with a walk through parks; Moszna adds its castle and park.", "Brzeg łączy zamek i starówkę ze spacerem przez parki; w Mosznej czekają zamek i park.", "Brzeg verbindet Schloss und Altstadt mit einem Parkspaziergang; in Moszna folgen Schloss und Park.", "Brzeg spojuje zámek a historické centrum s procházkou parky; v Moszně navazuje zámek a park."),
      forWhom: t("למי שנהנים מאדריכלות, טירות והליכה עירונית בקצב עצמאי.", "For travellers who enjoy architecture, castles and an independent town walk.", "Dla osób lubiących architekturę, zamki i samodzielne spacery po mieście.", "Für Reisende, die Architektur, Schlösser und selbstständige Stadtspaziergänge mögen.", "Pro cestovatele, kteří mají rádi architekturu, zámky a samostatné procházky městem."),
      practical: t("בדקו מראש שעות פתיחה וכרטיסים באתרים הרשמיים של הטירות. נקודות המשנה במפת ההליכה משוערות; השתמשו בניווט המקומי בין התחנות.", "Check current opening hours and tickets on the castles' official sites. Minor walking-route points are approximate; use local navigation between stops.", "Sprawdź godziny i bilety na oficjalnych stronach zamków. Mniejsze punkty spaceru są orientacyjne; między przystankami korzystaj z nawigacji.", "Öffnungszeiten und Tickets auf den offiziellen Schlossseiten prüfen. Kleinere Punkte des Spaziergangs sind ungefähr verortet; nutzen Sie die Navigation vor Ort.", "Otevírací dobu a vstupenky ověřte na oficiálních stránkách zámků. Menší body pěší trasy jsou orientační; mezi zastávkami použijte navigaci."),
    },
    steps: [
      { id: "depart", mapPointId: "brzeg", title: t("נסיעה מוורוצלב לברז׳ג", "Drive from Wrocław to Brzeg", "Przejazd z Wrocławia do Brzegu", "Fahrt von Wrocław nach Brzeg", "Cesta z Vratislavi do Brzegu"), duration: t("זמן נסיעה לפי ניווט עדכני", "Check live driving time", "Sprawdź aktualny czas przejazdu", "Aktuelle Fahrzeit prüfen", "Ověřte aktuální dobu jízdy") },
      { id: "brzeg-castle", canonicalPlaceId: "brzeg-castle", title: t("טירת ברז׳ג", "Brzeg Castle", "Zamek w Brzegu", "Schloss Brzeg", "Zámek v Brzegu"), duration: t("ביקור לפי שעות הפתיחה", "Visit during opening hours", "Zwiedzanie w godzinach otwarcia", "Besuch während der Öffnungszeiten", "Návštěva během otevírací doby") },
      { id: "brzeg-walk", mapWalkingOverview: true, title: t("מסלול הליכה A–J בברז׳ג", "Brzeg A–J walking route", "Spacer po Brzegu A–J", "Spaziergang A–J durch Brzeg", "Pěší trasa A–J v Brzegu"), duration: t("בקצב עצמאי", "At your own pace", "We własnym tempie", "Im eigenen Tempo", "Vlastním tempem") },
      { id: "transfer", mapPointId: "moszna", title: t("נסיעה למושנה", "Drive to Moszna", "Przejazd do Mosznej", "Fahrt nach Moszna", "Cesta do Moszny"), duration: t("זמן נסיעה לפי ניווט עדכני", "Check live driving time", "Sprawdź aktualny czas przejazdu", "Aktuelle Fahrzeit prüfen", "Ověřte aktuální dobu jízdy") },
      { id: "moszna-castle", canonicalPlaceId: "moszna-castle", title: t("טירת מושנה", "Moszna Castle", "Zamek Moszna", "Schloss Moschen", "Zámek Moszna"), duration: t("ביקור לפי שעות הפתיחה", "Visit during opening hours", "Zwiedzanie w godzinach otwarcia", "Besuch während der Öffnungszeiten", "Návštěva během otevírací doby") },
      { id: "moszna-park", canonicalPlaceId: "moszna-castle-park", title: t("פארק טירת מושנה", "Moszna Castle Park", "Park Zamkowy w Mosznej", "Schlosspark Moschen", "Zámecký park v Moszně"), duration: t("הליכה חופשית", "Free walk", "Swobodny spacer", "Freier Spaziergang", "Volná procházka") },
      { id: "return", mapPointId: "wroclaw-return", title: t("חזרה לוורוצלב", "Return to Wrocław", "Powrót do Wrocławia", "Rückfahrt nach Wrocław", "Návrat do Vratislavi"), duration: t("זמן נסיעה לפי ניווט עדכני", "Check live driving time", "Sprawdź aktualny czas przejazdu", "Aktuelle Fahrzeit prüfen", "Ověřte aktuální dobu jízdy") },
    ],
  };

  const jaworKarpacz = {
  "id": "jawor-karpacz-jelenia-gora-day-trip",
  "slug": "jawor-karpacz-wang-jelenia-gora",
  "title": {
    "he": "יום טיול 3: יאבור, קרפץ, וואנג וילניה גורה",
    "en": "Day trip 3: Jawor, Karpacz, Wang and Jelenia Góra",
    "pl": "Wycieczka 3: Jawor, Karpacz, Wang i Jelenia Góra",
    "de": "Tagesausflug 3: Jawor, Karpacz, Wang und Jelenia Góra",
    "cs": "Výlet 3: Jawor, Karpacz, Wang a Jelení Hora"
  },
  "summary": {
    "he": "מוורוצלב לכנסיית השלום ולמרכז יאבור, ממשיכים לקרפץ, עוצרים בנפרד בכנסיית וואנג ומסיימים בילניה גורה לפני החזרה.",
    "en": "From Wrocław to the Church of Peace and central Jawor, then Karpacz, a separate visit to Wang Church and a final walk in Jelenia Góra before returning.",
    "pl": "Z Wrocławia do Kościoła Pokoju i centrum Jawora, dalej Karpacz, osobna wizyta w świątyni Wang i spacer po Jeleniej Górze przed powrotem.",
    "de": "Von Wrocław zur Friedenskirche und ins Zentrum von Jawor, weiter nach Karpacz, ein eigener Besuch der Wang-Kirche und zum Abschluss Jelenia Góra.",
    "cs": "Z Vratislavi ke Kostelu míru a do centra Jaworu, dále Karpacz, samostatná návštěva kostela Wang a závěrečná procházka Jelení Horou."
  },
  "meta": {
    "duration": "full-day",
    "startsAt": "wroclaw",
    "region": "lower-silesia",
    "tags": [
      "history",
      "architecture",
      "mountains",
      "photography"
    ]
  },
  "heroMedia": {
    "canonicalPlaceId": "jawor-church-of-peace",
    "photoIndex": 0
  },
  "canonicalPlaceIds": [
    "jawor-church-of-peace",
    "jawor-market-square",
    "jawor-piast-castle",
    "karpacz-centre",
    "wang-church",
    "jelenia-gora-market-square"
  ],
  "routePoints": [
    {
      "id": "wroclaw-start",
      "kind": "context",
      "label": {
        "he": "וורוצלב",
        "en": "Wrocław",
        "pl": "Wrocław",
        "de": "Wrocław",
        "cs": "Vratislav"
      },
      "coordinates": {
        "lat": 51.1079,
        "lng": 17.0385
      }
    },
    {
      "id": "jawor-church-of-peace",
      "kind": "place",
      "canonicalPlaceId": "jawor-church-of-peace"
    },
    {
      "id": "jawor-market-square",
      "kind": "place",
      "canonicalPlaceId": "jawor-market-square"
    },
    {
      "id": "jawor-piast-castle",
      "kind": "place",
      "canonicalPlaceId": "jawor-piast-castle"
    },
    {
      "id": "karpacz-centre",
      "kind": "place",
      "canonicalPlaceId": "karpacz-centre"
    },
    {
      "id": "wang-church",
      "kind": "place",
      "canonicalPlaceId": "wang-church"
    },
    {
      "id": "jelenia-gora-market-square",
      "kind": "place",
      "canonicalPlaceId": "jelenia-gora-market-square"
    },
    {
      "id": "wroclaw-return",
      "kind": "context",
      "label": {
        "he": "חזרה לוורוצלב",
        "en": "Return to Wrocław",
        "pl": "Powrót do Wrocławia",
        "de": "Rückfahrt nach Wrocław",
        "cs": "Návrat do Vratislavi"
      },
      "coordinates": {
        "lat": 51.1079,
        "lng": 17.0385
      }
    }
  ],
  "travel": {
    "recommendedMode": "car",
    "segments": [
      {
        "from": "wroclaw-start",
        "to": "jawor-church-of-peace",
        "mode": "car"
      },
      {
        "from": "jawor-church-of-peace",
        "to": "jawor-market-square",
        "mode": "walking"
      },
      {
        "from": "jawor-market-square",
        "to": "jawor-piast-castle",
        "mode": "walking"
      },
      {
        "from": "jawor-piast-castle",
        "to": "karpacz-centre",
        "mode": "car"
      },
      {
        "from": "karpacz-centre",
        "to": "wang-church",
        "mode": "car"
      },
      {
        "from": "wang-church",
        "to": "jelenia-gora-market-square",
        "mode": "car"
      },
      {
        "from": "jelenia-gora-market-square",
        "to": "wroclaw-return",
        "mode": "car"
      }
    ],
    "estimates": [],
    "note": {
      "he": "זהו יום מלא ברכב, לפי סדר הביקור שלנו. השאירו זמן לנסיעות ולהליכה בין התחנות. בדקו בניווט את זמני הנסיעה ביום היציאה; הקו במפה מציג את סדר התחנות ואינו מסלול כביש מדויק.",
      "en": "This is a full driving day in our visit order. Allow time for travel and walking. Check live driving times before departure; the map line shows the stop order rather than exact roads.",
      "pl": "To całodniowa trasa samochodem w kolejności naszej wizyty. Zostaw czas na przejazdy i spacery. Sprawdź aktualne czasy jazdy; linia na mapie pokazuje kolejność, a nie dokładny przebieg dróg.",
      "de": "Ein voller Ausflugstag mit dem Auto in unserer Besuchsreihenfolge. Zeit für Fahrten und Spaziergänge einplanen. Aktuelle Fahrzeiten prüfen; die Kartenlinie zeigt die Reihenfolge, nicht den genauen Straßenverlauf.",
      "cs": "Celodenní výlet autem v pořadí naší návštěvy. Počítejte s přejezdy i chůzí. Ověřte aktuální jízdní doby; čára v mapě ukazuje pořadí zastávek, nikoli přesnou silniční trasu."
    },
    "options": [
      {
        "mode": "car",
        "title": {
          "he": "רכב",
          "en": "Car",
          "pl": "Samochód",
          "de": "Auto",
          "cs": "Auto"
        },
        "description": {
          "he": "נסיעה בין הערים והליכה בכל תחנה. וואנג היא עצירה נפרדת אחרי מרכז קרפץ.",
          "en": "Drive between towns and walk at each stop. Wang is a separate stop after central Karpacz.",
          "pl": "Przejazdy między miastami i spacery na miejscu. Wang to osobny przystanek po centrum Karpacza.",
          "de": "Fahrten zwischen den Städten, Spaziergänge vor Ort. Wang folgt als eigener Halt nach dem Zentrum von Karpacz.",
          "cs": "Přejezdy mezi městy a procházky na místě. Wang je samostatný bod po centru Karpacze."
        }
      }
    ],
    "accessibility": []
  },
  "navigation": {
    "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=Wroc%C5%82aw%2CPoland&destination=Wroc%C5%82aw%2CPoland&waypoints=51.0539315%2C16.1891045%7C50.7749665%2C15.7539066%7C50.7773866%2C15.7241515%7C50.9035044%2C15.7344539&travelmode=driving"
  },
  "editorial": {
    "why": {
      "he": "יום שמתחיל בפרטי העץ והציורים של כנסיית השלום, ממשיך לרחובות יאבור ולנוף ההררי של קרפץ, ועובר דרך וואנג אל הכיכר הצבעונית של ילניה גורה.",
      "en": "A day moving from the timber details and paintings of the Church of Peace through Jawor streets and mountain-town Karpacz, via Wang to the colourful square of Jelenia Góra.",
      "pl": "Od drewnianych detali i malowideł Kościoła Pokoju przez ulice Jawora i górski Karpacz, następnie Wang i kolorowy rynek Jeleniej Góry.",
      "de": "Von Holzdetails und Malereien der Friedenskirche über die Straßen von Jawor und das Bergstädtchen Karpacz, weiter über Wang zum bunten Markt von Jelenia Góra.",
      "cs": "Od dřevěných detailů a maleb Kostela míru přes ulice Jaworu a horskou Karpacz, dále přes Wang k barevnému náměstí Jelení Hory."
    },
    "forWhom": {
      "he": "למי שאוהבים כנסיות מיוחדות, אדריכלות, עיירות וצילום, ומעדיפים לשלב כמה תחנות ביום מלא מחוץ לוורוצלב.",
      "en": "For travellers who enjoy distinctive churches, architecture, towns and photography, combining several stops in a full day outside Wrocław.",
      "pl": "Dla miłośników niezwykłych kościołów, architektury, miasteczek i fotografii, którzy chcą połączyć kilka miejsc w całodniowej wycieczce.",
      "de": "Für alle, die besondere Kirchen, Architektur, kleine Städte und Fotografie mögen und mehrere Stationen an einem vollen Tag verbinden möchten.",
      "cs": "Pro milovníky neobvyklých kostelů, architektury, měst a fotografování, kteří chtějí spojit několik zastávek během celého dne."
    },
    "practical": {
      "he": "בדקו מראש שעות ביקור בכנסיית השלום ובוואנג. השאירו מרווח לנסיעות ולהפסקות והתאימו את משך ההליכות לקצב שלכם. התמונות מתעדות את הביקור שלנו ואינן מבטיחות שדוכנים או אירועים יתקיימו ביום שלכם.",
      "en": "Check visiting hours at the Church of Peace and Wang in advance. Allow travel buffers and breaks, and adapt walks to your pace. Photographs document our visit; stalls or events may not take place on your day.",
      "pl": "Sprawdź godziny zwiedzania Kościoła Pokoju i Wang. Zostaw zapas na przejazdy i przerwy, dostosuj spacery do własnego tempa. Zdjęcia dokumentują nasz pobyt, a nie stałą dostępność stoisk czy wydarzeń.",
      "de": "Besuchszeiten der Friedenskirche und von Wang vorab prüfen. Puffer für Fahrten und Pausen einplanen, Spaziergänge dem eigenen Tempo anpassen. Fotos dokumentieren unseren Besuch; Stände und Veranstaltungen sind nicht ständig vorhanden.",
      "cs": "Předem ověřte návštěvní dobu Kostela míru a Wangu. Nechte rezervu na přejezdy a přestávky, procházky přizpůsobte svému tempu. Fotografie dokumentují náš pobyt; stánky či akce nemusí být v den vaší návštěvy."
    }
  },
  "steps": [
    {
      "id": "wroclaw-start",
      "title": {
        "he": "וורוצלב",
        "en": "Wrocław",
        "pl": "Wrocław",
        "de": "Wrocław",
        "cs": "Vratislav"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "jawor-church-of-peace",
      "canonicalPlaceId": "jawor-church-of-peace",
      "title": {
        "he": "כנסיית השלום ביאבור",
        "en": "Church of Peace in Jawor",
        "pl": "Kościół Pokoju w Jaworze",
        "de": "Friedenskirche in Jawor",
        "cs": "Kostel míru v Jaworu"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "jawor-market-square",
      "canonicalPlaceId": "jawor-market-square",
      "title": {
        "he": "כיכר העיר יאבור",
        "en": "Jawor Market Square",
        "pl": "Rynek w Jaworze",
        "de": "Marktplatz in Jawor",
        "cs": "Náměstí v Jaworu"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "jawor-piast-castle",
      "canonicalPlaceId": "jawor-piast-castle",
      "title": {
        "he": "טירת הפיאסט ביאבור",
        "en": "Piast Castle in Jawor",
        "pl": "Zamek Piastowski w Jaworze",
        "de": "Piastenschloss in Jawor",
        "cs": "Piastovský zámek v Jaworu"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "karpacz-centre",
      "canonicalPlaceId": "karpacz-centre",
      "title": {
        "he": "מרכז קרפץ",
        "en": "Karpacz town centre",
        "pl": "Centrum Karpacza",
        "de": "Zentrum von Karpacz",
        "cs": "Centrum Karpacze"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "wang-church",
      "canonicalPlaceId": "wang-church",
      "title": {
        "he": "כנסיית וואנג",
        "en": "Wang Church",
        "pl": "Świątynia Wang",
        "de": "Stabkirche Wang",
        "cs": "Kostel Wang"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "jelenia-gora-market-square",
      "canonicalPlaceId": "jelenia-gora-market-square",
      "title": {
        "he": "ילניה גורה, הכיכר והעיר העתיקה",
        "en": "Jelenia Góra market square and old town",
        "pl": "Rynek i stare miasto w Jeleniej Górze",
        "de": "Marktplatz und Altstadt von Jelenia Góra",
        "cs": "Náměstí a historické centrum Jelení Hory"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    },
    {
      "id": "wroclaw-return",
      "title": {
        "he": "חזרה לוורוצלב",
        "en": "Return to Wrocław",
        "pl": "Powrót do Wrocławia",
        "de": "Rückfahrt nach Wrocław",
        "cs": "Návrat do Vratislavi"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      }
    }
  ]
};

  const product = {
    id: "lower-silesia-excursions",
    type: "excursions",
    title: t("טיולי יום מוורוצלב", "Day trips from Wrocław", "Wycieczki jednodniowe z Wrocławia", "Tagesausflüge ab Wrocław", "Jednodenní výlety z Vratislavi"),
    status: t("שלושה טיולים מוכנים", "Three excursions ready", "Trzy wycieczki gotowe", "Drei Ausflüge verfügbar", "Tři výlety připraveny"),
    excursions: [excursion, brzegMoszna, jaworKarpacz],
    canonicalPlaceIds: [...canonicalPlaceIds, ...brzegMosznaPlaceIds, ...jaworKarpacz.canonicalPlaceIds],
  };

  if (window.WROC_CATALOG?.registerProduct) {
    window.WROC_CATALOG.registerProduct({ id: product.id, type: product.type, places: product.canonicalPlaceIds.map((id) => ({ id })) });
  }

  window.WROC_LOWER_SILESIA_EXCURSIONS = Object.freeze(product);
})();
