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

  const brzegMosznaPlaceIds = ["brzeg-st-nicholas-church", "brzeg-castle", "brzeg-holy-cross-church", "brzeg-town-hall", "brzeg-oder-gate", "moszna-castle", "moszna-castle-park"];
  // A–J follow the tourist trail photographed by the user. Coordinates for
  // route-only features are approximate placements derived from that map;
  // navigation links use the named destinations instead of these placements.
  const brzegWalkingRoute = [
    { id: "A", kind: "place", canonicalPlaceId: "brzeg-castle" },
    { id: "B", kind: "place", canonicalPlaceId: "brzeg-holy-cross-church" },
    { id: "C", kind: "place", canonicalPlaceId: "brzeg-town-hall" },
    { id: "D", kind: "waypoint", label: t("האנדרטה ליד רחוב דלוגה", "Monument near Długa Street", "Pomnik przy ulicy Długiej", "Denkmal an der Długa-Straße", "Pomník u ulice Długa"), coordinates: { lat: 50.86021, lng: 17.47051 }, approximate: true },
    { id: "E", kind: "place", canonicalPlaceId: "brzeg-st-nicholas-church" },
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
    "he": "יאבור, קרפץ, וואנג וילניה גורה",
    "en": "Jawor, Karpacz, Wang and Jelenia Góra",
    "pl": "Jawor, Karpacz, Wang i Jelenia Góra",
    "de": "Jawor, Karpacz, Wang und Jelenia Góra",
    "cs": "Jawor, Karpacz, Wang a Jelení Hora"
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

  const czochaBoleslawiec = {
  "id": "czocha-boleslawiec-two-day-trip",
  "slug": "czocha-overnight-boleslawiec",
  "title": {
    "he": "יומיים בטירת צ׳וחה ובולסלבייץ, עם לינה בטירה",
    "en": "Two days: Czocha Castle overnight and Bolesławiec",
    "pl": "Dwa dni: nocleg na zamku Czocha i Bolesławiec",
    "de": "Zwei Tage: Burgübernachtung Czocha und Bolesławiec",
    "cs": "Dva dny: noc na hradě Czocha a Bolesławiec"
  },
  "summary": {
    "he": "יום ראשון בטירה ולינה במקום. ביום השני אוכלים ארוחת בוקר, יוצאים להליכה לסכר וממשיכים לבולסלבייץ ולמוזיאון הקרמיקה לפני החזרה לוורוצלב.",
    "en": "A castle visit and overnight stay on day one. After breakfast on day two, walk to the dam, then continue to Bolesławiec and its Ceramics Museum before returning to Wrocław.",
    "pl": "Pierwszy dzień to zamek i nocleg. Drugiego dnia po śniadaniu spacer do zapory, następnie Bolesławiec i Muzeum Ceramiki przed powrotem do Wrocławia.",
    "de": "Am ersten Tag Burgbesuch und Übernachtung. Nach dem Frühstück am zweiten Tag zur Talsperre spazieren, dann Bolesławiec und das Keramikmuseum besuchen und nach Wrocław zurückfahren.",
    "cs": "První den návštěva hradu a přenocování. Druhý den po snídani procházka k přehradě, potom Bolesławiec a Muzeum keramiky před návratem do Vratislavi."
  },
  "meta": {
    "duration": "two-days",
    "days": 2,
    "nights": 1,
    "startsAt": "wroclaw",
    "region": "lower-silesia",
    "tags": [
      "castles",
      "overnight",
      "walking",
      "ceramics"
    ]
  },
  "durationLabel": {
    "he": "יומיים ולילה בטירה",
    "en": "Two days, one castle night",
    "pl": "Dwa dni i noc w zamku",
    "de": "Zwei Tage, eine Nacht in der Burg",
    "cs": "Dva dny a noc na hradě"
  },
  "heroMedia": {
    "canonicalPlaceId": "czocha-castle",
    "photoIndex": 0
  },
  "canonicalPlaceIds": [
    "czocha-castle",
    "lesnianska-dam",
    "boleslawiec-old-town",
    "boleslawiec-ceramics-museum"
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
      "id": "czocha-castle",
      "kind": "place",
      "canonicalPlaceId": "czocha-castle"
    },
    {
      "id": "lesnianska-dam",
      "kind": "place",
      "canonicalPlaceId": "lesnianska-dam"
    },
    {
      "id": "boleslawiec-old-town",
      "kind": "place",
      "canonicalPlaceId": "boleslawiec-old-town"
    },
    {
      "id": "boleslawiec-ceramics-museum",
      "kind": "place",
      "canonicalPlaceId": "boleslawiec-ceramics-museum"
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
  "days": [
    {
      "day": 1,
      "title": {
        "he": "יום ראשון: הטירה ולינה בטירה",
        "en": "Day 1: castle visit and overnight stay",
        "pl": "Dzień 1: zamek i nocleg",
        "de": "Tag 1: Burgbesuch und Übernachtung",
        "cs": "Den 1: návštěva hradu a přenocování"
      }
    },
    {
      "day": 2,
      "title": {
        "he": "יום שני: ארוחת בוקר, הסכר ובולסלבייץ",
        "en": "Day 2: breakfast, dam walk and Bolesławiec",
        "pl": "Dzień 2: śniadanie, zapora i Bolesławiec",
        "de": "Tag 2: Frühstück, Talsperre und Bolesławiec",
        "cs": "Den 2: snídaně, přehrada a Bolesławiec"
      }
    }
  ],
  "travel": {
    "recommendedMode": "car",
    "estimates": [],
    "segments": [
      {
        "from": "wroclaw-start",
        "to": "czocha-castle",
        "mode": "car",
        "day": 1
      },
      {
        "from": "czocha-castle",
        "to": "lesnianska-dam",
        "mode": "walking",
        "day": 2
      },
      {
        "from": "lesnianska-dam",
        "to": "czocha-castle",
        "mode": "walking",
        "day": 2
      },
      {
        "from": "czocha-castle",
        "to": "boleslawiec-old-town",
        "mode": "car",
        "day": 2
      },
      {
        "from": "boleslawiec-old-town",
        "to": "boleslawiec-ceramics-museum",
        "mode": "walking",
        "day": 2
      },
      {
        "from": "boleslawiec-ceramics-museum",
        "to": "wroclaw-return",
        "mode": "car",
        "day": 2
      }
    ],
    "note": {
      "he": "מסלול של יומיים ברכב עם לילה שהוזמן מראש בטירה. את ההליכה לסכר עושים בבוקר אחרי ארוחת הבוקר וחוזרים לטירה לאסוף את הרכב. בדקו מסלול הליכה וזמני נסיעה בניווט עדכני; הקו במפה מציג את סדר התחנות.",
      "en": "A two-day car trip with a castle overnight stay booked in advance. Walk to the dam after breakfast and return to the castle for the car. Check the walking route and driving times in current navigation; the map line shows the stop order.",
      "pl": "Dwudniowa wycieczka samochodem z wcześniej zarezerwowanym noclegiem w zamku. Po śniadaniu spacer do zapory i powrót po samochód. Trasę pieszą i czasy przejazdów sprawdź w aktualnej nawigacji; linia na mapie pokazuje kolejność punktów.",
      "de": "Zweitägige Autoreise mit vorab gebuchter Burgübernachtung. Nach dem Frühstück zur Talsperre spazieren und zum Auto zurückkehren. Fußweg und Fahrzeiten in der aktuellen Navigation prüfen; die Kartenlinie zeigt die Reihenfolge.",
      "cs": "Dvoudenní výlet autem s předem rezervovaným noclehem na hradě. Po snídani pěšky k přehradě a zpět pro auto. Pěší trasu a jízdní doby ověřte v aktuální navigaci; čára na mapě ukazuje pořadí zastávek."
    },
    "options": [
      {
        "mode": "car",
        "title": {
          "he": "רכב והליכה",
          "en": "Car and walking",
          "pl": "Samochód i spacer",
          "de": "Auto und Spaziergänge",
          "cs": "Auto a pěší úseky"
        },
        "description": {
          "he": "מסלול של יומיים ברכב עם לילה שהוזמן מראש בטירה. את ההליכה לסכר עושים בבוקר אחרי ארוחת הבוקר וחוזרים לטירה לאסוף את הרכב. בדקו מסלול הליכה וזמני נסיעה בניווט עדכני; הקו במפה מציג את סדר התחנות.",
          "en": "A two-day car trip with a castle overnight stay booked in advance. Walk to the dam after breakfast and return to the castle for the car. Check the walking route and driving times in current navigation; the map line shows the stop order.",
          "pl": "Dwudniowa wycieczka samochodem z wcześniej zarezerwowanym noclegiem w zamku. Po śniadaniu spacer do zapory i powrót po samochód. Trasę pieszą i czasy przejazdów sprawdź w aktualnej nawigacji; linia na mapie pokazuje kolejność punktów.",
          "de": "Zweitägige Autoreise mit vorab gebuchter Burgübernachtung. Nach dem Frühstück zur Talsperre spazieren und zum Auto zurückkehren. Fußweg und Fahrzeiten in der aktuellen Navigation prüfen; die Kartenlinie zeigt die Reihenfolge.",
          "cs": "Dvoudenní výlet autem s předem rezervovaným noclehem na hradě. Po snídani pěšky k přehradě a zpět pro auto. Pěší trasu a jízdní doby ověřte v aktuální navigaci; čára na mapě ukazuje pořadí zastávek."
        }
      }
    ],
    "accessibility": []
  },
  "navigation": {
    "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=Wroc%C5%82aw%2C+Poland&destination=Wroc%C5%82aw%2C+Poland&waypoints=Zamek+Czocha%7CRynek+Boles%C5%82awiec%7CMuzeum+Ceramiki+Zgorzelecka+28+Boles%C5%82awiec&travelmode=driving",
    "morningWalk": "https://www.google.com/maps/dir/?api=1&origin=Zamek+Czocha&destination=Zapora+Le%C5%9Bnia%C5%84ska&travelmode=walking"
  },
  "editorial": {
    "why": {
      "he": "לילה בטירה מאפשר ליהנות ממנה בלי לדחוס את הכול ליום אחד. בבוקר משלבים טבע וסכר, ובהמשך כיכר עירונית וקרמיקה בבולסלבייץ.",
      "en": "Sleeping in the castle gives the visit room to breathe. The next morning combines a reservoir walk with the town square and ceramics in Bolesławiec.",
      "pl": "Nocleg w zamku pozwala zwiedzać bez pośpiechu. Następny dzień łączy spacer nad jeziorem z rynkiem i ceramiką Bolesławca.",
      "de": "Die Burgübernachtung lässt Raum für den Besuch. Am nächsten Morgen folgen ein Spaziergang am Stausee und danach Altstadt und Keramik in Bolesławiec.",
      "cs": "Noc na hradě umožňuje návštěvu bez spěchu. Další den spojuje procházku u přehrady s náměstím a keramikou v Bolesławci."
    },
    "forWhom": {
      "he": "למי שאוהבים טירות, לינה עם אופי, הליכה ונופי אגם, וגם עיר נעימה וקרמיקה.",
      "en": "For travellers who enjoy castles, atmospheric overnight stays, walks, lake views and ceramics.",
      "pl": "Dla miłośników zamków, klimatycznych noclegów, spacerów, jezior i ceramiki.",
      "de": "Für alle, die Burgen, besondere Übernachtungen, Spaziergänge, Seen und Keramik mögen.",
      "cs": "Pro milovníky hradů, osobitých noclehů, procházek, jezer a keramiky."
    },
    "practical": {
      "he": "הזמינו לינה וסיור בטירה מראש ובדקו את תנאי ההזמנה. בדקו שעות פתיחת המוזיאון ביום הביקור. ההליכה לסכר תלויה במזג האוויר ובמצב השבילים. נעלו נעליים נוחות והשאירו זמן לחזרה לרכב.",
      "en": "Book the castle stay and tour in advance and check the booking terms. Check museum hours for your visit day. The dam walk depends on weather and path conditions. Wear suitable shoes and allow time to return to the car.",
      "pl": "Zarezerwuj nocleg i zwiedzanie zamku oraz sprawdź warunki rezerwacji. Sprawdź godziny muzeum w dniu wizyty. Spacer do zapory zależy od pogody i stanu ścieżek. Załóż wygodne buty i zostaw czas na powrót do samochodu.",
      "de": "Burgübernachtung und Führung vorab buchen und Buchungsbedingungen prüfen. Museumszeiten am Besuchstag kontrollieren. Der Spaziergang hängt von Wetter und Wegzustand ab. Geeignete Schuhe tragen und Zeit für den Rückweg zum Auto lassen.",
      "cs": "Nocleh a prohlídku hradu rezervujte předem a ověřte podmínky. Zkontrolujte otevírací dobu muzea v den návštěvy. Procházka závisí na počasí a stavu cest. Vezměte vhodné boty a nechte si čas na návrat k autu."
    }
  },
  "steps": [
    {
      "id": "depart",
      "day": 1,
      "title": {
        "he": "נסיעה מוורוצלב לטירת צ׳וחה",
        "en": "Drive from Wrocław to Czocha Castle",
        "pl": "Przejazd z Wrocławia do zamku Czocha",
        "de": "Fahrt von Wrocław zur Burg Czocha",
        "cs": "Cesta z Vratislavi na hrad Czocha"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "mapPointId": "wroclaw-start"
    },
    {
      "id": "castle",
      "day": 1,
      "title": {
        "he": "ביקור בטירה ובחצרות",
        "en": "Explore the castle and courtyards",
        "pl": "Zwiedzanie zamku i dziedzińców",
        "de": "Burg und Innenhöfe erkunden",
        "cs": "Prohlídka hradu a nádvoří"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "czocha-castle"
    },
    {
      "id": "overnight",
      "day": 1,
      "title": {
        "he": "ערב ולינה בטירה",
        "en": "Evening and overnight at the castle",
        "pl": "Wieczór i nocleg w zamku",
        "de": "Abend und Übernachtung in der Burg",
        "cs": "Večer a noc na hradě"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "czocha-castle"
    },
    {
      "id": "breakfast",
      "day": 2,
      "title": {
        "he": "ארוחת בוקר בטירה",
        "en": "Breakfast at the castle",
        "pl": "Śniadanie w zamku",
        "de": "Frühstück in der Burg",
        "cs": "Snídaně na hradě"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "czocha-castle"
    },
    {
      "id": "dam",
      "day": 2,
      "title": {
        "he": "הליכת בוקר לסכר אחרי ארוחת הבוקר",
        "en": "Morning dam walk after breakfast",
        "pl": "Poranny spacer do zapory po śniadaniu",
        "de": "Morgenspaziergang zur Talsperre nach dem Frühstück",
        "cs": "Ranní procházka k přehradě po snídani"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "lesnianska-dam"
    },
    {
      "id": "return-car",
      "day": 2,
      "title": {
        "he": "חזרה לטירה ואיסוף הרכב",
        "en": "Return to the castle for the car",
        "pl": "Powrót do zamku po samochód",
        "de": "Zurück zur Burg zum Auto",
        "cs": "Návrat k hradu pro auto"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "czocha-castle"
    },
    {
      "id": "town",
      "day": 2,
      "title": {
        "he": "נסיעה לבולסלבייץ והליכה בעיר העתיקה",
        "en": "Continue to Bolesławiec and walk the old town",
        "pl": "Przejazd do Bolesławca i spacer po starówce",
        "de": "Weiter nach Bolesławiec und Altstadtspaziergang",
        "cs": "Cesta do Bolesławce a procházka centrem"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "boleslawiec-old-town"
    },
    {
      "id": "museum",
      "day": 2,
      "title": {
        "he": "מוזיאון הקרמיקה",
        "en": "Visit the Ceramics Museum",
        "pl": "Muzeum Ceramiki",
        "de": "Besuch im Keramikmuseum",
        "cs": "Muzeum keramiky"
      },
      "duration": {
        "he": "בקצב שלכם",
        "en": "At your own pace",
        "pl": "We własnym tempie",
        "de": "Im eigenen Tempo",
        "cs": "Vlastním tempem"
      },
      "canonicalPlaceId": "boleslawiec-ceramics-museum"
    },
    {
      "id": "home",
      "day": 2,
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
      },
      "mapPointId": "wroclaw-return"
    }
  ]
};

  czochaBoleslawiec.walkingRoute = {
  "city": "boleslawiec",
  "title": {
    "he": "מסלול הליכה בבולסלבייץ",
    "en": "Bolesławiec city walk",
    "pl": "Spacer po Bolesławcu",
    "de": "Stadtspaziergang durch Bolesławiec",
    "cs": "Procházka Bolesławcem"
  },
  "summary": {
    "he": "אחרי הליכת הבוקר לסכר והנסיעה לעיר: מסלול נבחר של תשע תחנות מתוך השביל המצולם, סביב הכיכר והטיילות. המספרים שלנו הם סדר ההליכה; בכל תחנה מופיעים גם מספרי השלט.",
    "en": "After the morning dam walk and drive to town: nine selected stops from the photographed trail, around the square and promenades. Our numbers show the walking order; each stop also shows the board numbers.",
    "pl": "Po porannym spacerze do zapory i dojeździe do miasta: dziewięć wybranych przystanków ze sfotografowanego szlaku, wokół Rynku i promenad. Nasze numery oznaczają kolejność spaceru; podajemy też numery z tablicy.",
    "de": "Nach Morgenspaziergang zur Talsperre und Fahrt in die Stadt: neun ausgewählte Stationen des fotografierten Weges um Markt und Promenaden. Unsere Nummern zeigen die Reihenfolge, dazu stehen die Nummern der Tafel.",
    "cs": "Po ranní procházce k přehradě a přejezdu do města: devět vybraných zastávek z vyfotografované stezky kolem náměstí a promenád. Naše čísla označují pořadí, uvádíme i čísla z tabule."
  },
  "note": {
    "he": "הקו מציג סדר תחנות, לא שביל ניווט מדויק. השתמשו בניווט להליכה בכל מקטע ועקבו אחר המעברים והשילוט במקום. הביקורים בתוך מבנים אינם כלולים בזמן ההליכה.",
    "en": "The line shows stop order, not a precise navigable path. Use walking directions for each leg and follow local crossings and signs. Indoor visits are additional.",
    "pl": "Linia wskazuje kolejność, nie dokładny przebieg ścieżki. Korzystaj z nawigacji pieszej dla odcinków oraz miejscowych przejść i oznaczeń. Wizyty we wnętrzach są dodatkowe.",
    "de": "Die Linie zeigt die Reihenfolge, keinen exakten Navigationsweg. Fußgängernavigation je Abschnitt sowie örtliche Übergänge und Schilder nutzen. Innenbesuche kommen hinzu.",
    "cs": "Čára ukazuje pořadí, nikoli přesnou navigační trasu. Použijte pěší navigaci jednotlivých úseků a místní přechody a značení. Návštěvy interiérů jsou navíc."
  },
  "closedLoop": true,
  "geometryAccuracy": "stop-order-only",
  "points": [
    {
      "id": "1",
      "kind": "place",
      "label": {
        "he": "כיכר השוק ובית העירייה",
        "en": "Market Square and Town Hall",
        "pl": "Rynek i ratusz",
        "de": "Marktplatz und Rathaus",
        "cs": "Náměstí a radnice"
      },
      "description": {
        "he": "פותחים בהדרכה שלנו, מקיפים את בית העירייה ומסתכלים על החזיתות הצבעוניות. כאן גם מסיימים את הלולאה.",
        "en": "Start with our guide, circle the town hall and look at the colourful façades. The loop also finishes here.",
        "pl": "Zacznij od naszego przewodnika, obejdź ratusz i obejrzyj kolorowe fasady. Tutaj kończy się też pętla.",
        "de": "Mit unserem Video beginnen, das Rathaus umrunden und die bunten Fassaden betrachten. Hier endet auch die Runde.",
        "cs": "Začněte naším průvodcem, obejděte radnici a prohlédněte si barevné fasády. Zde okruh také končí."
      },
      "boardNumbers": [
        1,
        2,
        37
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/ratusz/",
      "canonicalPlaceId": "boleslawiec-old-town",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.262998%2C15.564833&destination=51.2647291%2C15.5642461&travelmode=walking"
    },
    {
      "id": "2",
      "kind": "waypoint",
      "label": {
        "he": "התיאטרון הישן והמזרקה",
        "en": "Old Theatre and fountain",
        "pl": "Teatr Stary i fontanna",
        "de": "Altes Theater und Brunnen",
        "cs": "Staré divadlo a kašna"
      },
      "description": {
        "he": "ממשיכים צפונה אל התיאטרון והמזרקה שלפניו. זו עצירה חיצונית קצרה לאורך השביל העירוני.",
        "en": "Continue north to the theatre and the fountain in front. A short outdoor stop on the city trail.",
        "pl": "Idź na północ do teatru i stojącej przed nim fontanny. To krótki przystanek na zewnątrz.",
        "de": "Nach Norden zum Theater und dem Brunnen davor gehen. Ein kurzer Halt im Freien am Stadtweg.",
        "cs": "Pokračujte na sever k divadlu a kašně před ním. Krátká venkovní zastávka na městské trase."
      },
      "boardNumbers": [
        6,
        7
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/",
      "coordinates": {
        "lat": 51.2647291,
        "lng": 15.5642461
      },
      "coordinateSource": "https://www.openstreetmap.org/way/197405068",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2647291%2C15.5642461&destination=51.2641104%2C15.5623199&travelmode=walking"
    },
    {
      "id": "3",
      "kind": "waypoint",
      "label": {
        "he": "מבנה המרחצאות ההיסטורי",
        "en": "Historic municipal baths",
        "pl": "Dawne Miejskie Zakłady Kąpielowe",
        "de": "Historisches Stadtbad",
        "cs": "Historické městské lázně"
      },
      "description": {
        "he": "פונים מערבה אל מבנה המרחצאות. המסלול כולל מבט מבחוץ, לא ביקור בבריכה.",
        "en": "Turn west towards the historic baths. The route includes an exterior view, not a swimming visit.",
        "pl": "Skręć na zachód ku dawnym łaźniom. Trasa obejmuje oglądanie budynku z zewnątrz, nie wizytę na basenie.",
        "de": "Nach Westen zum historischen Bad gehen. Vorgesehen ist die Außenansicht, kein Schwimmbadbesuch.",
        "cs": "Zamiřte na západ k historickým lázním. Trasa zahrnuje pohled zvenčí, nikoli návštěvu bazénu."
      },
      "boardNumbers": [
        11
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/",
      "coordinates": {
        "lat": 51.2641104,
        "lng": 15.5623199
      },
      "coordinateSource": "https://www.openstreetmap.org/way/304663933",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2641104%2C15.5623199&destination=51.2622126%2C15.5615349&travelmode=walking"
    },
    {
      "id": "4",
      "kind": "waypoint",
      "label": {
        "he": "הכנסייה בכיכר הטירה",
        "en": "Church at Castle Square",
        "pl": "Kościół przy placu Zamkowym",
        "de": "Kirche am Schlossplatz",
        "cs": "Kostel na Zámeckém náměstí"
      },
      "description": {
        "he": "ממשיכים דרומה אל הכנסייה שבכיכר הטירה, המסומנת במפת השלט כמספר 16.",
        "en": "Continue south to the church on Castle Square, marked 16 on the photographed board.",
        "pl": "Idź na południe do kościoła przy placu Zamkowym, oznaczonego na tablicy numerem 16.",
        "de": "Nach Süden zur Kirche am Schlossplatz gehen, auf der fotografierten Tafel mit 16 markiert.",
        "cs": "Pokračujte na jih ke kostelu na Zámeckém náměstí, na vyfotografované tabuli označenému číslem 16."
      },
      "boardNumbers": [
        16
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/kosciol-pw-matki-bozej-nieustajacej-pomocy-dawny-kosciol-ewangelicki/",
      "coordinates": {
        "lat": 51.2622126,
        "lng": 15.5615349
      },
      "coordinateSource": "https://www.openstreetmap.org/way/197405071",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2622126%2C15.5615349&destination=51.2617077%2C15.5621161&travelmode=walking"
    },
    {
      "id": "5",
      "kind": "waypoint",
      "label": {
        "he": "החומות והמגדלים",
        "en": "Town walls and towers",
        "pl": "Fortyfikacje i baszty",
        "de": "Stadtmauer und Türme",
        "cs": "Hradby a bašty"
      },
      "description": {
        "he": "עוקבים אחר הטיילת דרומה אל שרידי הביצורים. הסיכה ממוקמת ליד שלט ההסבר על החומות והמגדלים.",
        "en": "Follow the promenade south to the fortifications. The pin is beside the walls-and-towers information board.",
        "pl": "Podążaj promenadą na południe do fortyfikacji. Punkt znajduje się przy tablicy o murach i basztach.",
        "de": "Der Promenade nach Süden zu den Befestigungen folgen. Der Punkt liegt an der Infotafel zu Mauern und Türmen.",
        "cs": "Jděte promenádou na jih k opevnění. Bod je u informační tabule o hradbách a baštách."
      },
      "boardNumbers": [
        22
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/fortyfikacje-miejskie/",
      "coordinates": {
        "lat": 51.2617077,
        "lng": 15.5621161
      },
      "coordinateSource": "https://www.openstreetmap.org/node/3894735102",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2617077%2C15.5621161&destination=51.2617804%2C15.564&travelmode=walking"
    },
    {
      "id": "6",
      "kind": "waypoint",
      "label": {
        "he": "המרכז לטכניקות כדרות עתיקות",
        "en": "Centre for Old Pottery Techniques",
        "pl": "Centrum Dawnych Technik Garncarskich",
        "de": "Zentrum für alte Töpfertechniken",
        "cs": "Centrum starých hrnčířských technik"
      },
      "description": {
        "he": "ממשיכים מזרחה אל מרכז הכדרות. כניסה פנימה היא תוספת לבחירה, בהתאם לפתיחה ולכרטיסים. זה אינו מוזיאון הקרמיקה החדש.",
        "en": "Continue east to the pottery centre. Going inside is optional, subject to opening and tickets. This is not the new Ceramics Museum.",
        "pl": "Idź na wschód do centrum garncarstwa. Wejście jest opcjonalne, zależne od godzin i biletów. To nie nowa siedziba Muzeum Ceramiki.",
        "de": "Nach Osten zum Töpferzentrum gehen. Ein Besuch innen ist optional und von Öffnung und Tickets abhängig. Dies ist nicht das neue Keramikmuseum.",
        "cs": "Pokračujte na východ k hrnčířskému centru. Vstup je volitelný podle otevírací doby a vstupenek. Nejde o nové Muzeum keramiky."
      },
      "boardNumbers": [
        24
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/",
      "coordinates": {
        "lat": 51.2617804,
        "lng": 15.564
      },
      "coordinateSource": "https://www.openstreetmap.org/way/304649863",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2617804%2C15.564&destination=51.2612358%2C15.5646957&travelmode=walking"
    },
    {
      "id": "7",
      "kind": "waypoint",
      "label": {
        "he": "אנדרטת קוטוזוב",
        "en": "Kutuzov monument",
        "pl": "Pomnik Kutuzowa",
        "de": "Kutusow-Denkmal",
        "cs": "Kutuzovův pomník"
      },
      "description": {
        "he": "ממשיכים לאורך החלק הדרומי של השביל אל האנדרטה, המסומנת בשלט כמספר 26.",
        "en": "Continue along the southern part of the trail to the monument, numbered 26 on the board.",
        "pl": "Idź południową częścią szlaku do pomnika oznaczonego na tablicy numerem 26.",
        "de": "Am südlichen Abschnitt des Weges zum Denkmal gehen, auf der Tafel als 26 bezeichnet.",
        "cs": "Pokračujte jižní částí stezky k pomníku, na tabuli označenému číslem 26."
      },
      "boardNumbers": [
        26
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/",
      "coordinates": {
        "lat": 51.2612358,
        "lng": 15.5646957
      },
      "coordinateSource": "https://www.openstreetmap.org/node/3092221677",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2612358%2C15.5646957&destination=51.2611112%2C15.5662188&travelmode=walking"
    },
    {
      "id": "8",
      "kind": "waypoint",
      "label": {
        "he": "תחנת מזג האוויר והטיילת",
        "en": "Weather station and promenade",
        "pl": "Pogodynka i promenada",
        "de": "Wettersäule und Promenade",
        "cs": "Meteorologický sloupek a promenáda"
      },
      "description": {
        "he": "עוצרים ליד תחנת מזג האוויר והמגדל. אפשר להמשיך מעט לאורך הטיילת אל מזרקת האנפה הסמוכה.",
        "en": "Stop by the weather station and tower. You can continue a little along the promenade to the nearby heron fountain.",
        "pl": "Zatrzymaj się przy pogodynce i baszcie. Można podejść promenadą do pobliskiej fontanny z czaplą.",
        "de": "An Wettersäule und Turm halten. Ein kurzer Abstecher auf der Promenade führt zum nahen Reiherbrunnen.",
        "cs": "Zastavte u meteorologického sloupku a bašty. Promenádou lze krátce dojít k blízké kašně s volavkou."
      },
      "boardNumbers": [
        28,
        29
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/",
      "coordinates": {
        "lat": 51.2611112,
        "lng": 15.5662188
      },
      "coordinateSource": "https://www.openstreetmap.org/node/8999646381",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2611112%2C15.5662188&destination=51.2623425%2C15.5666728&travelmode=walking"
    },
    {
      "id": "9",
      "kind": "waypoint",
      "label": {
        "he": "הבזיליקה וחזרה לכיכר",
        "en": "Basilica and return to the square",
        "pl": "Bazylika i powrót na Rynek",
        "de": "Basilika und zurück zum Markt",
        "cs": "Bazilika a návrat na náměstí"
      },
      "description": {
        "he": "ממשיכים צפונה לבזיליקה, ואז חוזרים לכיכר השוק. השאירו זמן לקפה או לחנויות הקרמיקה לפי בחירתכם.",
        "en": "Continue north to the basilica, then return to Market Square. Leave time for coffee or ceramics shops of your choice.",
        "pl": "Idź na północ do bazyliki, a potem wróć na Rynek. Zostaw czas na kawę lub wybrane sklepy z ceramiką.",
        "de": "Nach Norden zur Basilika und dann zurück zum Marktplatz gehen. Zeit für Kaffee oder Keramikgeschäfte nach Wahl lassen.",
        "cs": "Pokračujte na sever k bazilice a pak se vraťte na náměstí. Nechte si čas na kávu nebo obchody s keramikou dle výběru."
      },
      "boardNumbers": [
        33
      ],
      "sourceUrl": "https://muzeum.boleslawiec.pl/zabytki/kosciol-pw-wniebowziecia-najswietszej-maryi-panny-i-sw-mikolaja/",
      "coordinates": {
        "lat": 51.2623425,
        "lng": 15.5666728
      },
      "coordinateSource": "https://www.openstreetmap.org/way/197358819",
      "nextNavigation": "https://www.google.com/maps/dir/?api=1&origin=51.2623425%2C15.5666728&destination=51.262998%2C15.564833&travelmode=walking"
    }
  ],
  "navigation": {
    "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=51.262998%2C15.564833&destination=51.2622126%2C15.5615349&waypoints=51.2647291%2C15.5642461%7C51.2641104%2C15.5623199&travelmode=walking",
    "segments": [
      {
        "from": "1",
        "to": "4",
        "url": "https://www.google.com/maps/dir/?api=1&origin=51.262998%2C15.564833&destination=51.2622126%2C15.5615349&waypoints=51.2647291%2C15.5642461%7C51.2641104%2C15.5623199&travelmode=walking"
      },
      {
        "from": "4",
        "to": "7",
        "url": "https://www.google.com/maps/dir/?api=1&origin=51.2622126%2C15.5615349&destination=51.2612358%2C15.5646957&waypoints=51.2617077%2C15.5621161%7C51.2617804%2C15.564&travelmode=walking"
      },
      {
        "from": "7",
        "to": "1",
        "url": "https://www.google.com/maps/dir/?api=1&origin=51.2612358%2C15.5646957&destination=51.262998%2C15.564833&waypoints=51.2611112%2C15.5662188%7C51.2623425%2C15.5666728&travelmode=walking"
      }
    ]
  },
  "guidePlaceId": "boleslawiec-old-town",
  "sourcePhotos": [
    "/assets/czocha-boleslawiec/boleslawiec-old-town-067.jpg",
    "/assets/czocha-boleslawiec/boleslawiec-old-town-110.jpg"
  ],
  "extension": {
    "canonicalPlaceId": "boleslawiec-ceramics-museum",
    "description": {
      "he": "אחרי החזרה לכיכר אפשר להמשיך למוזיאון הקרמיקה הנוכחי, בנקודה הקיימת שלנו. זו תוספת מחוץ ללולאה, ולא מבנה המוזיאון הישן שמסומן בשלט. בדקו פתיחה וכרטיסים לפני ההגעה.",
      "en": "After returning to the square, continue optionally to the current Ceramics Museum using our existing place card. This extension is outside the loop, not the former museum building on the board. Check opening and tickets.",
      "pl": "Po powrocie na Rynek można wybrać się do obecnej siedziby Muzeum Ceramiki, korzystając z istniejącej karty miejsca. To dodatek poza pętlą, nie dawny budynek muzeum z tablicy. Sprawdź godziny i bilety.",
      "de": "Nach der Rückkehr zum Markt optional zum heutigen Keramikmuseum auf unserer vorhandenen Ortskarte weitergehen. Diese Erweiterung liegt außerhalb der Runde, nicht im früheren Museumsgebäude auf der Tafel. Öffnung und Tickets prüfen.",
      "cs": "Po návratu na náměstí lze pokračovat k současnému Muzeu keramiky přes naši existující kartu místa. Jde o rozšíření mimo okruh, nikoli bývalou budovu muzea z tabule. Ověřte otevření a vstupenky."
    }
  }
};

  const warsawLodz = {
  "id": "warsaw-lodz-wroclaw",
  "initialMapFocus": "local-stops",
  "departurePlaceIds": [
    "warsaw-nozyk-synagogue",
    "warsaw-unknown-soldier",
    "warsaw-saxon-garden-fountain"
  ],
  "showDestinationMarker": true,
  "slug": "warsaw-lodz-wroclaw",
  "title": {
    "he": "בדרך לוורוצלב עוצרים בלודז׳",
    "en": "Stop in Łódź on the way to Wrocław",
    "pl": "W drodze do Wrocławia zatrzymaj się w Łodzi",
    "de": "Auf dem Weg nach Wrocław in Łódź anhalten",
    "cs": "Cestou do Vratislavi se zastavte v Lodži"
  },
  "summary": {
    "he": "יוצאים מוורשה, עוצרים בלודז׳ למורשת היהודית באזור הגטו לשעבר, למנופקטורה, לחצר המראות ולרחוב פיוטרקובסקה, וממשיכים לוורוצלב.",
    "en": "Leave Warsaw, stop in Łódź for Jewish heritage in the former ghetto, Manufaktura, Rose Passage and Piotrkowska, then continue to Wrocław.",
    "pl": "Wyjazd z Warszawy, postój w Łodzi: dziedzictwo żydowskie dawnego getta, Manufaktura, Pasaż Róży i Piotrkowska, potem droga do Wrocławia.",
    "de": "Von Warschau über Łódź mit jüdischer Geschichte im ehemaligen Ghetto, Manufaktura, Rosenpassage und Piotrkowska nach Wrocław.",
    "cs": "Z Varšavy přes Lodž: židovské dědictví v bývalém ghettu, Manufaktura, Růžová pasáž a Piotrkowská, dále do Vratislavi."
  },
  "meta": {
    "duration": "full-day",
    "startsAt": "warsaw",
    "region": "lodz",
    "tags": [
      "city-walk",
      "architecture",
      "photography",
      "food",
      "shopping"
    ]
  },
  "durationLabel": {
    "he": "יום נסיעה עם עצירה של כ־5–6 שעות",
    "en": "Travel day with a 5–6 hour stop",
    "pl": "Dzień podróży z postojem na 5–6 godzin",
    "de": "Reisetag mit 5–6 Stunden Aufenthalt",
    "cs": "Cestovní den se zastávkou na 5–6 hodin"
  },
  "startsLabel": {
    "he": "יציאה מוורשה",
    "en": "Start in Warsaw",
    "pl": "Start w Warszawie",
    "de": "Start in Warschau",
    "cs": "Start ve Varšavě"
  },
  "regionLabel": {
    "he": "לודז׳, בדרך לוורוצלב",
    "en": "Łódź, en route to Wrocław",
    "pl": "Łódź, w drodze do Wrocławia",
    "de": "Łódź, auf dem Weg nach Wrocław",
    "cs": "Lodž, cestou do Vratislavi"
  },
  "heroMedia": {
    "canonicalPlaceId": "lodz-manufaktura",
    "photoIndex": 0
  },
  "canonicalPlaceIds": [
    "lodz-manufaktura",
    "lodz-old-market",
    "lodz-church-square",
    "lodz-ghetto-baluty",
    "lodz-roa-weasels-mural",
    "lodz-freedom-square",
    "lodz-rose-passage",
    "lodz-gutenberg-house",
    "lodz-piotrkowska"
  ],
  "routePoints": [
    {
      "id": "warsaw-start",
      "kind": "context",
      "label": {
        "he": "יציאה מוורשה",
        "en": "Depart Warsaw",
        "pl": "Wyjazd z Warszawy",
        "de": "Abfahrt aus Warschau",
        "cs": "Odjezd z Varšavy"
      },
      "coordinates": {
        "lat": 52.2297,
        "lng": 21.0122
      }
    },
    {
      "id": "lodz-manufaktura",
      "kind": "place",
      "canonicalPlaceId": "lodz-manufaktura"
    },
    {
      "id": "lodz-old-market",
      "kind": "place",
      "canonicalPlaceId": "lodz-old-market"
    },
    {
      "id": "lodz-church-square",
      "kind": "place",
      "canonicalPlaceId": "lodz-church-square"
    },
    {
      "id": "lodz-ghetto-baluty",
      "kind": "place",
      "canonicalPlaceId": "lodz-ghetto-baluty"
    },
    {
      "id": "lodz-roa-weasels-mural",
      "kind": "place",
      "canonicalPlaceId": "lodz-roa-weasels-mural"
    },
    {
      "id": "lodz-freedom-square",
      "kind": "place",
      "canonicalPlaceId": "lodz-freedom-square"
    },
    {
      "id": "lodz-rose-passage",
      "kind": "place",
      "canonicalPlaceId": "lodz-rose-passage"
    },
    {
      "id": "lodz-gutenberg-house",
      "kind": "place",
      "canonicalPlaceId": "lodz-gutenberg-house"
    },
    {
      "id": "lodz-piotrkowska",
      "kind": "place",
      "canonicalPlaceId": "lodz-piotrkowska"
    },
    {
      "id": "manufaktura-return",
      "kind": "context",
      "label": {
        "he": "חזרה לרכב במנופקטורה",
        "en": "Return to the car at Manufaktura",
        "pl": "Powrót do samochodu w Manufakturze",
        "de": "Zurück zum Auto an der Manufaktura",
        "cs": "Zpět k autu u Manufaktury"
      },
      "coordinates": {
        "lat": 51.7794621,
        "lng": 19.444461
      },
      "hideMarker": true
    },
    {
      "id": "wroclaw-arrival",
      "kind": "context",
      "label": {
        "he": "הגעה לוורוצלב",
        "en": "Arrive in Wrocław",
        "pl": "Przyjazd do Wrocławia",
        "de": "Ankunft in Wrocław",
        "cs": "Příjezd do Vratislavi"
      },
      "coordinates": {
        "lat": 51.1079,
        "lng": 17.0385
      }
    }
  ],
  "walkingRoute": {
    "title": {
      "he": "המסלול הרגלי בלודז׳",
      "en": "The Łódź city walk",
      "pl": "Spacer po Łodzi",
      "de": "Stadtrundgang durch Łódź",
      "cs": "Procházka Lodží"
    },
    "summary": {
      "he": "ממנופקטורה הולכים צפונה דרך השוק הישן וכיכר הכנסייה לאזור שוק באלוטי בגטו לשעבר. ממשיכים דרומה אל כיכר החירות, חצר המראות ורחוב פיוטרקובסקה, וחוזרים לרכב. למסלול קצר יותר אפשר לצמצם את הקטע הדרומי.",
      "en": "From Manufaktura walk north via the Old Market and Church Square to Bałuty in the former ghetto. Continue south to Freedom Square, Rose Passage and Piotrkowska, then return to the car. Shorten the southern section if you have less time.",
      "pl": "Z Manufaktury idź na północ przez Stary Rynek i plac Kościelny na Bałuty, na teren dawnego getta. Dalej na południe do placu Wolności, Pasażu Róży i Piotrkowskiej, potem wróć do samochodu. Przy mniejszej ilości czasu skróć odcinek południowy.",
      "de": "Von Manufaktura nordwärts über Alten Markt und Kirchplatz nach Bałuty im ehemaligen Ghetto. Danach südwärts zu Freiheitsplatz, Rosenpassage und Piotrkowska, zurück zum Auto. Bei wenig Zeit den südlichen Abschnitt kürzen.",
      "cs": "Od Manufaktury severně přes Staré tržiště a Kostelní náměstí na Bałuty v bývalém ghettu. Dále na jih na náměstí Svobody, Růžovou pasáž a Piotrkowskou, pak zpět k autu. Při nedostatku času zkraťte jižní část."
    },
    "closedLoop": true,
    "geometryAccuracy": "stop-order-only",
    "points": [
      {
        "id": "1",
        "canonicalPlaceId": "lodz-manufaktura"
      },
      {
        "id": "2",
        "canonicalPlaceId": "lodz-old-market"
      },
      {
        "id": "3",
        "canonicalPlaceId": "lodz-church-square"
      },
      {
        "id": "4",
        "canonicalPlaceId": "lodz-ghetto-baluty"
      },
      {
        "id": "5",
        "canonicalPlaceId": "lodz-roa-weasels-mural"
      },
      {
        "id": "6",
        "canonicalPlaceId": "lodz-freedom-square"
      },
      {
        "id": "7",
        "canonicalPlaceId": "lodz-rose-passage"
      },
      {
        "id": "8",
        "canonicalPlaceId": "lodz-gutenberg-house"
      },
      {
        "id": "9",
        "canonicalPlaceId": "lodz-piotrkowska"
      }
    ],
    "navigation": {
      "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=51.7794621%2C19.444461&destination=51.7794621%2C19.444461&travelmode=walking&waypoints=51.7815222%2C19.4537361%7C51.7831681%2C19.4538249%7C51.7869694%2C19.4518556%7C51.7780469%2C19.4546196%7C51.7767836%2C19.4546995%7C51.7758847%2C19.4536534%7C51.7668862%2C19.4570933%7C51.7654694%2C19.4573028",
      "segments": [
        {
          "from": "1",
          "to": "4",
          "url": "https://www.google.com/maps/dir/?api=1&origin=51.7794621%2C19.444461&destination=51.7869694%2C19.4518556&waypoints=51.7815222%2C19.4537361%7C51.7831681%2C19.4538249&travelmode=walking"
        },
        {
          "from": "4",
          "to": "7",
          "url": "https://www.google.com/maps/dir/?api=1&origin=51.7869694%2C19.4518556&destination=51.7758847%2C19.4536534&waypoints=51.7780469%2C19.4546196%7C51.7767836%2C19.4546995&travelmode=walking"
        },
        {
          "from": "7",
          "to": "1",
          "url": "https://www.google.com/maps/dir/?api=1&origin=51.7758847%2C19.4536534&destination=51.7794621%2C19.444461&waypoints=51.7668862%2C19.4570933%7C51.7654694%2C19.4573028&travelmode=walking"
        }
      ]
    },
    "note": {
      "he": "הקו מציג את סדר התחנות, ולא תוואי הליכה מדויק. פתחו ניווט להולכי רגל לקבלת מסלול רחובות עדכני.",
      "en": "The line shows stop order, not an exact walking path. Open walking directions for current street routing.",
      "pl": "Linia pokazuje kolejność przystanków, nie dokładny przebieg spaceru. Otwórz nawigację pieszą, aby sprawdzić aktualną trasę ulicami.",
      "de": "Die Linie zeigt die Reihenfolge, keinen exakten Fußweg. Für die aktuelle Straßenführung die Fußgängernavigation öffnen.",
      "cs": "Čára ukazuje pořadí zastávek, nikoli přesnou pěší trasu. Aktuální cestu ulicemi zobrazí pěší navigace."
    }
  },
  "navigation": {
    "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=Warsaw%2C+Poland&destination=Wroc%C5%82aw%2C+Poland&travelmode=driving&waypoints=51.7794621%2C19.444461"
  },
  "editorial": {
    "why": {
      "he": "העצירה מחברת בין זיכרון המורשת היהודית באזור הגטו לשעבר לבין העיר של היום: מתחם המפעלים במנופקטורה, חצר המראות ואדריכלות רחוב פיוטרקובסקה. משאירים גם זמן למנוחה ולארוחה.",
      "en": "The stop connects Jewish remembrance in the former ghetto with the city today: Manufaktura’s former factories, Rose Passage and Piotrkowska architecture. Leave time for a rest and a meal.",
      "pl": "Postój łączy pamięć o żydowskim dziedzictwie dawnego getta ze współczesnym miastem: pofabryczną Manufakturą, Pasażem Róży i architekturą Piotrkowskiej. Zostaw czas na odpoczynek i posiłek.",
      "de": "Der Halt verbindet jüdisches Gedenken im ehemaligen Ghetto mit der heutigen Stadt: den Fabrikbauten der Manufaktura, der Rosenpassage und der Architektur der Piotrkowska. Zeit für Pause und Essen einplanen.",
      "cs": "Zastávka spojuje připomínku židovského dědictví bývalého ghetta s dnešním městem: továrnami Manufaktury, Růžovou pasáží a architekturou Piotrkowské. Ponechte čas na odpočinek a jídlo."
    },
    "forWhom": {
      "he": "לנוסעים מוורשה לוורוצלב ברכב, שמוכנים להקדיש כמה שעות לעיר בדרך. אם יוצאים מאוחר, קצרו את ההליכה ושמרו זמן לנסיעה.",
      "en": "For travellers driving from Warsaw to Wrocław who can spare several hours for a city stop. If departing late, shorten the walk and preserve driving time.",
      "pl": "Dla podróżujących samochodem z Warszawy do Wrocławia, którzy mają kilka godzin na miasto po drodze. Przy późnym wyjeździe skróć spacer i zachowaj czas na jazdę.",
      "de": "Für Autofahrer von Warschau nach Wrocław mit einigen Stunden Zeit für einen Stadtstopp. Bei später Abfahrt den Spaziergang kürzen und Fahrzeit einplanen.",
      "cs": "Pro cestující autem z Varšavy do Vratislavi, kteří mají několik hodin na město po cestě. Při pozdním odjezdu zkraťte procházku a ponechte čas na jízdu."
    },
    "practical": {
      "he": "התמונות הן מהביקור שלנו. בדקו חניה, זמני נסיעה ופתיחת מקומות ביום הנסיעה. הארוחות והקניות אינן כלולות בזמן הליכה קבוע. אין צורך להיכנס לכל מוזיאון כדי ליהנות מהמסלול.",
      "en": "The photos are from our visit. Check parking, traffic and venue opening on your travel day. Allow your own time for food and shopping. You do not need to enter every museum to enjoy the walk.",
      "pl": "Zdjęcia pochodzą z naszej wizyty. W dniu podróży sprawdź parking, ruch i otwarcie obiektów. Dodaj czas na jedzenie i zakupy. Nie trzeba odwiedzać każdego muzeum, aby cieszyć się spacerem.",
      "de": "Die Fotos stammen von unserem Besuch. Am Reisetag Parken, Verkehr und Öffnung prüfen. Zusätzliche Zeit für Essen und Einkäufe einplanen. Für einen schönen Rundgang muss man nicht jedes Museum betreten.",
      "cs": "Fotografie pocházejí z naší návštěvy. V den cesty ověřte parkování, dopravu a otevření míst. Přidejte čas na jídlo a nákupy. Pro příjemnou procházku nemusíte navštívit každé muzeum."
    }
  },
  "travel": {
    "recommendedMode": "car",
    "segments": [],
    "estimates": [],
    "note": {
      "he": "ניווט הנהיגה עובר מוורשה דרך מנופקטורה לוורוצלב. הוסיפו אליו עצירה של כ־5–6 שעות בלודז׳. משך הנהיגה ייבדק בניווט בזמן הנסיעה, ללא הבטחה לשעת הגעה.",
      "en": "Driving directions run from Warsaw via Manufaktura to Wrocław. Add a 5–6 hour stop in Łódź. Check driving time in navigation on the day; no fixed arrival time is promised.",
      "pl": "Trasa samochodowa prowadzi z Warszawy przez Manufakturę do Wrocławia. Dodaj postój na 5–6 godzin w Łodzi. Czas jazdy sprawdź w nawigacji w dniu podróży; bez gwarantowanej godziny przyjazdu.",
      "de": "Die Autoroute führt von Warschau über die Manufaktura nach Wrocław. Dazu 5–6 Stunden Aufenthalt in Łódź einplanen. Fahrzeit am Reisetag in der Navigation prüfen; ohne garantierte Ankunftszeit.",
      "cs": "Autotrasa vede z Varšavy přes Manufakturu do Vratislavi. Přidejte zastávku na 5–6 hodin v Lodži. Dobu jízdy ověřte v navigaci v den cesty; bez zaručeného času příjezdu."
    },
    "options": [
      {
        "mode": "car",
        "title": {
          "he": "רכב והמשך הדרך",
          "en": "Car and onward travel",
          "pl": "Samochód i dalsza podróż",
          "de": "Auto und Weiterfahrt",
          "cs": "Auto a pokračování cesty"
        },
        "description": {
          "he": "התחילו את העצירה במנופקטורה ובדקו שם את החניה. אחרי הסיור חזרו לרכב והמשיכו לוורוצלב לפי הניווט.",
          "en": "Start the stop at Manufaktura and check parking there. After the walk, return to the car and continue to Wrocław using current navigation.",
          "pl": "Zacznij postój przy Manufakturze i sprawdź parking. Po spacerze wróć do samochodu i jedź do Wrocławia według aktualnej nawigacji.",
          "de": "An der Manufaktura beginnen und die Parkbedingungen prüfen. Nach dem Rundgang zum Auto zurückkehren und mit aktueller Navigation nach Wrocław weiterfahren.",
          "cs": "Začněte u Manufaktury a ověřte parkování. Po procházce se vraťte k autu a pokračujte do Vratislavi podle aktuální navigace."
        }
      },
      {
        "mode": "walking",
        "title": {
          "he": "הסיור בעיר ברגל",
          "en": "Explore the city on foot",
          "pl": "Zwiedzanie pieszo",
          "de": "Zu Fuß durch die Stadt",
          "cs": "Prohlídka pěšky"
        },
        "description": {
          "he": "המסלול הרגלי מחבר את התחנות באזור הגטו לשעבר ואת מרכז העיר. לביקור מקוצר בחרו תחנות לפי הזמן והשאירו מרווח לארוחה ולחזרה לרכב.",
          "en": "The walking loop connects the former ghetto area with the city centre. For a shorter visit choose stops to fit your time and leave a buffer for food and the return to the car.",
          "pl": "Pętla piesza łączy teren dawnego getta z centrum. Przy krótszej wizycie wybierz punkty według czasu i zostaw zapas na posiłek oraz powrót do auta.",
          "de": "Der Rundgang verbindet das ehemalige Ghettogebiet mit dem Zentrum. Für einen kürzeren Besuch Stationen nach Zeit auswählen und Puffer für Essen und Rückweg lassen.",
          "cs": "Pěší okruh spojuje bývalé ghetto s centrem. Při kratší návštěvě vyberte zastávky podle času a ponechte rezervu na jídlo a návrat k autu."
        }
      }
    ],
    "accessibility": []
  },
  "steps": [
    {
      "id": "depart",
      "mapPointId": "warsaw-start",
      "title": {
        "he": "יציאה מוורשה",
        "en": "Depart Warsaw",
        "pl": "Wyjazd z Warszawy",
        "de": "Abfahrt aus Warschau",
        "cs": "Odjezd z Varšavy"
      },
      "duration": {
        "he": "לפי הניווט ביום הנסיעה",
        "en": "Check navigation on the day",
        "pl": "Według nawigacji w dniu podróży",
        "de": "Navigation am Reisetag prüfen",
        "cs": "Podle navigace v den cesty"
      }
    },
    {
      "id": "lodz-manufaktura",
      "canonicalPlaceId": "lodz-manufaktura",
      "title": {
        "he": "מנופקטורה",
        "en": "Manufaktura",
        "pl": "Manufaktura",
        "de": "Manufaktura",
        "cs": "Manufaktura"
      },
      "duration": {
        "he": "45–60 דקות",
        "en": "45–60 min",
        "pl": "45–60 min",
        "de": "45–60 Min.",
        "cs": "45–60 min"
      }
    },
    {
      "id": "lodz-old-market",
      "canonicalPlaceId": "lodz-old-market",
      "title": {
        "he": "השוק הישן של לודז׳",
        "en": "Łódź Old Market Square",
        "pl": "Stary Rynek w Łodzi",
        "de": "Alter Markt in Łódź",
        "cs": "Staré tržiště v Lodži"
      },
      "duration": {
        "he": "15–20 דקות",
        "en": "15–20 min",
        "pl": "15–20 min",
        "de": "15–20 Min.",
        "cs": "15–20 min"
      }
    },
    {
      "id": "lodz-church-square",
      "canonicalPlaceId": "lodz-church-square",
      "title": {
        "he": "כיכר הכנסייה באזור הגטו לשעבר",
        "en": "Church Square in the former ghetto",
        "pl": "Plac Kościelny na terenie dawnego getta",
        "de": "Kirchplatz im ehemaligen Ghetto",
        "cs": "Kostelní náměstí v bývalém ghettu"
      },
      "duration": {
        "he": "15–20 דקות",
        "en": "15–20 min",
        "pl": "15–20 min",
        "de": "15–20 Min.",
        "cs": "15–20 min"
      }
    },
    {
      "id": "lodz-ghetto-baluty",
      "canonicalPlaceId": "lodz-ghetto-baluty",
      "title": {
        "he": "אזור גטו לודז׳ לשעבר, באלוטי",
        "en": "Former Łódź Ghetto, Bałuty",
        "pl": "Obszar dawnego getta łódzkiego, Bałuty",
        "de": "Ehemaliges Ghetto Łódź, Bałuty",
        "cs": "Bývalé lodžské ghetto, Bałuty"
      },
      "duration": {
        "he": "15–20 דקות",
        "en": "15–20 min",
        "pl": "15–20 min",
        "de": "15–20 Min.",
        "cs": "15–20 min"
      }
    },
    {
      "id": "roa-mural",
      "canonicalPlaceId": "lodz-roa-weasels-mural",
      "title": {
        "he": "ציור הקיר הסמורים והביצים (לבחירה)",
        "en": "ROA weasels mural (optional)",
        "pl": "Mural ROA Łasice kradną jajka (opcjonalnie)",
        "de": "ROA-Wandbild mit Wieseln und Eiern (optional)",
        "cs": "Mural ROA s lasičkami a vejci (volitelně)"
      },
      "duration": {
        "he": "עצירה קצרה לצפייה מבחוץ",
        "en": "Brief outdoor viewing stop",
        "pl": "Krótki przystanek na obejrzenie z zewnątrz",
        "de": "Kurzer Halt zur Betrachtung von außen",
        "cs": "Krátká zastávka na pohled zvenčí"
      }
    },
    {
      "id": "lodz-freedom-square",
      "canonicalPlaceId": "lodz-freedom-square",
      "title": {
        "he": "כיכר החירות בלודז׳",
        "en": "Freedom Square, Łódź",
        "pl": "Plac Wolności w Łodzi",
        "de": "Freiheitsplatz in Łódź",
        "cs": "Náměstí Svobody v Lodži"
      },
      "duration": {
        "he": "15–30 דקות",
        "en": "15–30 min",
        "pl": "15–30 min",
        "de": "15–30 Min.",
        "cs": "15–30 min"
      }
    },
    {
      "id": "lodz-rose-passage",
      "canonicalPlaceId": "lodz-rose-passage",
      "title": {
        "he": "חצר המראות",
        "en": "Rose Passage",
        "pl": "Pasaż Róży",
        "de": "Rosenpassage",
        "cs": "Růžová pasáž"
      },
      "duration": {
        "he": "15–30 דקות",
        "en": "15–30 min",
        "pl": "15–30 min",
        "de": "15–30 Min.",
        "cs": "15–30 min"
      }
    },
    {
      "id": "lodz-gutenberg-house",
      "canonicalPlaceId": "lodz-gutenberg-house",
      "title": {
        "he": "בית גוטנברג",
        "en": "Gutenberg House",
        "pl": "Kamienica pod Gutenbergiem",
        "de": "Gutenberg-Haus",
        "cs": "Gutenbergův dům"
      },
      "duration": {
        "he": "15–30 דקות",
        "en": "15–30 min",
        "pl": "15–30 min",
        "de": "15–30 Min.",
        "cs": "15–30 min"
      }
    },
    {
      "id": "lodz-piotrkowska",
      "canonicalPlaceId": "lodz-piotrkowska",
      "title": {
        "he": "רחוב פיוטרקובסקה",
        "en": "Piotrkowska Street",
        "pl": "Ulica Piotrkowska",
        "de": "Piotrkowska-Straße",
        "cs": "Piotrkowská ulice"
      },
      "duration": {
        "he": "15–30 דקות",
        "en": "15–30 min",
        "pl": "15–30 min",
        "de": "15–30 Min.",
        "cs": "15–30 min"
      }
    },
    {
      "id": "return",
      "canonicalPlaceId": "lodz-manufaktura",
      "title": {
        "he": "ארוחה או קפה וחזרה לרכב",
        "en": "Meal or coffee and return to the car",
        "pl": "Posiłek lub kawa i powrót do samochodu",
        "de": "Essen oder Kaffee und zurück zum Auto",
        "cs": "Jídlo či káva a návrat k autu"
      },
      "duration": {
        "he": "השאירו זמן גמיש להליכה ולמנוחה",
        "en": "Leave flexible time for walking and a break",
        "pl": "Zostaw zapas czasu na spacer i odpoczynek",
        "de": "Zeit für Fußweg und Pause einplanen",
        "cs": "Ponechte čas na chůzi a odpočinek"
      }
    },
    {
      "id": "arrival",
      "mapPointId": "wroclaw-arrival",
      "title": {
        "he": "ממשיכים לוורוצלב",
        "en": "Continue to Wrocław",
        "pl": "Dalsza droga do Wrocławia",
        "de": "Weiter nach Wrocław",
        "cs": "Pokračování do Vratislavi"
      },
      "duration": {
        "he": "לפי הניווט ביום הנסיעה",
        "en": "Check navigation on the day",
        "pl": "Według nawigacji w dniu podróży",
        "de": "Navigation am Reisetag prüfen",
        "cs": "Podle navigace v den cesty"
      }
    }
  ]
};

  const srebrnaKlodzko = {
  "id": "srebrna-gora-klodzko-day-trip",
  "slug": "srebrna-gora-klodzko",
  "title": {
    "he": "סרברנה גורה וקלודזקו: מבצרים, תצפיות ועיר עתיקה",
    "en": "Srebrna Góra and Kłodzko: fortresses, views and an old town",
    "pl": "Srebrna Góra i Kłodzko: twierdze, panoramy i stare miasto",
    "de": "Silberberg und Kłodzko: Festungen, Aussichten und Altstadt",
    "cs": "Stříbrná Hora a Kladsko: pevnosti, výhledy a staré město"
  },
  "summary": {
    "he": "יוצאים מוורוצלב אל המבצר ההררי בסרברנה גורה, ממשיכים למבצר קלודזקו ומסיימים ברינק וברחובות העיר. יום מלא ברכב, עם בחירה כמה להעמיק בכל אתר.",
    "en": "Drive from Wrocław to the mountain fortress at Srebrna Góra, continue to Kłodzko Fortress and finish in the market square and old streets. A full driving day with room to choose how deeply to explore.",
    "pl": "Z Wrocławia do górskiej twierdzy w Srebrnej Górze, dalej do Twierdzy Kłodzko i na koniec spacer po rynku oraz starych ulicach. Pełny dzień samochodem, z elastycznym zakresem zwiedzania.",
    "de": "Von Wrocław zur Bergfestung Silberberg, weiter zur Festung Kłodzko und zum Abschluss über Marktplatz und Altstadtgassen. Ein ganzer Tag mit dem Auto und frei wählbarer Besichtigungstiefe.",
    "cs": "Z Vratislavi k horské pevnosti Stříbrná Hora, dále do Kladské pevnosti a nakonec na náměstí a do starých ulic. Celodenní cesta autem s volitelným rozsahem prohlídek."
  },
  "meta": {
    "duration": "full-day",
    "startsAt": "wroclaw",
    "region": "lower-silesia",
    "tags": [
      "history",
      "fortresses",
      "old-town",
      "photography"
    ]
  },
  "heroMedia": {
    "canonicalPlaceId": "srebrna-gora-fortress",
    "photoIndex": 0
  },
  "canonicalPlaceIds": [
    "srebrna-gora-fortress",
    "klodzko-fortress",
    "klodzko-old-town"
  ],
  "initialMapFocus": "local-stops",
  "routePoints": [
    {
      "id": "wroclaw-start",
      "kind": "context",
      "coordinates": {
        "lat": 51.1079,
        "lng": 17.0385
      },
      "label": {
        "he": "יציאה מוורוצלב",
        "en": "Depart Wrocław",
        "pl": "Wyjazd z Wrocławia",
        "de": "Abfahrt aus Wrocław",
        "cs": "Odjezd z Vratislavi"
      }
    },
    {
      "id": "srebrna-gora-fortress",
      "kind": "place",
      "canonicalPlaceId": "srebrna-gora-fortress"
    },
    {
      "id": "klodzko-fortress",
      "kind": "place",
      "canonicalPlaceId": "klodzko-fortress"
    },
    {
      "id": "klodzko-old-town",
      "kind": "place",
      "canonicalPlaceId": "klodzko-old-town"
    },
    {
      "id": "wroclaw-return",
      "kind": "context",
      "coordinates": {
        "lat": 51.1079,
        "lng": 17.0385
      },
      "label": {
        "he": "חזרה לוורוצלב",
        "en": "Return to Wrocław",
        "pl": "Powrót do Wrocławia",
        "de": "Rückfahrt nach Wrocław",
        "cs": "Návrat do Vratislavi"
      }
    }
  ],
  "navigation": {
    "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=Wroc%C5%82aw%2CPoland&destination=Wroc%C5%82aw%2CPoland&waypoints=50.572949%2C16.6479108%7CParking%20Czeska%2C%20K%C5%82odzko&travelmode=driving"
  },
  "travel": {
    "recommendedMode": "car",
    "estimates": [],
    "note": {
      "he": "צאו מוקדם ובדקו ניווט חי. בסרברנה גורה החניה במעבר ההרים וממנה עולים ברגל כ־15 עד 25 דקות. בקלודזקו העדיפו את המבצר לפני שיטוט ארוך בעיר כדי להספיק לכניסה האחרונה. קישור הנהיגה מגיע לאזורי החניה, והסיורים עצמם ברגל.",
      "en": "Leave early and check live navigation. At Srebrna Góra, park at the pass and allow a 15 to 25 minute uphill walk. In Kłodzko visit the fortress before a long city walk to meet last admission. Driving directions lead to parking areas; sightseeing is on foot.",
      "pl": "Wyjedź wcześnie i sprawdź aktualną nawigację. W Srebrnej Górze zaparkuj na przełęczy i dolicz 15 do 25 minut podejścia. W Kłodzku odwiedź twierdzę przed dłuższym spacerem po mieście, aby zdążyć na ostatnie wejście. Trasa samochodowa prowadzi do parkingów; zwiedzanie odbywa się pieszo.",
      "de": "Früh starten und aktuelle Navigation prüfen. In Silberberg am Pass parken und 15 bis 25 Minuten Aufstieg einplanen. In Kłodzko vor dem langen Stadtspaziergang die Festung besuchen, um den letzten Einlass zu erreichen. Die Autoroute führt zu Parkplätzen; besichtigt wird zu Fuß.",
      "cs": "Vyjeďte brzy a ověřte aktuální navigaci. Ve Stříbrné Hoře zaparkujte v sedle a počítejte s 15 až 25 minutami stoupání. V Kladsku navštivte pevnost před delší procházkou městem, abyste stihli poslední vstup. Autotrasa vede k parkovištím; prohlídky jsou pěší."
    },
    "options": [
      {
        "mode": "car",
        "title": {
          "he": "ברכב וברגל",
          "en": "By car and on foot",
          "pl": "Samochodem i pieszo",
          "de": "Mit dem Auto und zu Fuß",
          "cs": "Autem a pěšky"
        },
        "description": {
          "he": "החניה והסיור הם חלקים נפרדים. בסרברנה גורה משאירים את הרכב במעבר ההרים ועולים למבצר; בקלודזקו הולכים בין המבצר לרינק. שמרו זמן גם לנסיעות ולארוחה.",
          "en": "Parking and sightseeing are separate. Leave the car at the mountain pass for Srebrna Góra and walk uphill; in Kłodzko walk between the fortress and the market square. Allow extra time for driving and a meal.",
          "pl": "Parking i zwiedzanie to oddzielne etapy. W Srebrnej Górze zostaw auto na przełęczy i podejdź do twierdzy; w Kłodzku przejdź między twierdzą a rynkiem. Dodaj czas na przejazdy i posiłek.",
          "de": "Parken und Besichtigen getrennt einplanen. In Silberberg am Pass parken und zur Festung aufsteigen; in Kłodzko zwischen Festung und Marktplatz zu Fuß gehen. Fahrten und Essenspause zusätzlich einplanen.",
          "cs": "Parkování a prohlídky jsou oddělené. Ve Stříbrné Hoře nechte auto v sedle a vyjděte k pevnosti; v Kladsku jděte mezi pevností a náměstím pěšky. Přidejte čas na jízdu a jídlo."
        }
      }
    ],
    "accessibility": []
  },
  "editorial": {
    "why": {
      "he": "שני מבצרים שונים ומרכז עיר אחד משלבים נוף הררי, היסטוריה צבאית ואדריכלות עירונית. סיימו בקצב רגוע סביב הרינק, בלי להוסיף עוד יעדי חובה.",
      "en": "Two different fortresses and one old town combine mountain scenery, military history and urban architecture. Finish slowly around the market square without adding more compulsory stops.",
      "pl": "Dwie różne twierdze i jedno stare miasto łączą górskie widoki, historię wojskową i architekturę. Zakończ spokojnie przy rynku, bez kolejnych obowiązkowych przystanków.",
      "de": "Zwei unterschiedliche Festungen und eine Altstadt verbinden Berglandschaft, Militärgeschichte und Architektur. Rund um den Marktplatz entspannt ausklingen lassen, ohne weitere Pflichtstopps.",
      "cs": "Dvě různé pevnosti a jedno staré město spojují horskou krajinu, vojenskou historii a architekturu. Zakončete v klidu kolem náměstí bez dalších povinných zastávek."
    },
    "forWhom": {
      "he": "לאוהבי מבצרים, תצפיות והיסטוריה שמוכנים ליום פעיל. יש עליות, מדרגות וריצוף לא אחיד. בקצב משפחתי או רגוע בחרו מסלול אחד בכל מבצר והשאירו את המנהרות כאפשרות.",
      "en": "For fortress, view and history lovers ready for an active day. Expect slopes, stairs and uneven paving. For a slower or family pace, choose one route per fortress and keep tunnels optional.",
      "pl": "Dla miłośników twierdz, widoków i historii gotowych na aktywny dzień. Są podejścia, schody i nierówne nawierzchnie. Przy spokojnym lub rodzinnym tempie wybierz jedną trasę w każdej twierdzy, a podziemia pozostaw jako opcję.",
      "de": "Für Festungs-, Aussichts- und Geschichtsfreunde mit Lust auf einen aktiven Tag. Steigungen, Treppen und unebene Wege einplanen. Bei gemütlichem oder familiärem Tempo je eine Festungsroute wählen und Tunnel optional lassen.",
      "cs": "Pro milovníky pevností, výhledů a historie připravené na aktivní den. Čekají vás stoupání, schody a nerovné povrchy. Při pomalejším či rodinném tempu zvolte jednu trasu v každé pevnosti a podzemí nechte jako možnost."
    },
    "practical": {
      "he": "בדקו שעות פתיחה, שפת הסיור והכניסה האחרונה בשני המבצרים לפני היציאה. הזמנים כאן הם הקצאת זמן מומלצת ולא שעות סיור מוזמנות. אם מתעכבים, קצרו את הביקור במבצר השני ושמרו זמן למרכז קלודזקו.",
      "en": "Check opening hours, tour language and last admission at both fortresses before departure. Suggested durations are planning allowances, not booked departure times. If delayed, shorten the second fortress visit and preserve time for central Kłodzko.",
      "pl": "Przed wyjazdem sprawdź otwarcie, język zwiedzania i ostatnie wejście do obu twierdz. Podane czasy są zaleceniami planistycznymi, nie rezerwacją. Przy opóźnieniu skróć drugą twierdzę i zachowaj czas na centrum Kłodzka.",
      "de": "Öffnungszeiten, Führungssprache und letzten Einlass beider Festungen vorab prüfen. Die Zeitangaben sind Planungshilfen, keine gebuchten Termine. Bei Verspätung die zweite Festung kürzer besuchen und Zeit für Kłodzko bewahren.",
      "cs": "Před odjezdem ověřte otevření, jazyk prohlídek a poslední vstup do obou pevností. Uvedené časy jsou plánovací doporučení, nikoli rezervace. Při zpoždění zkraťte druhou pevnost a ponechte čas na centrum Kladska."
    }
  },
  "steps": [
    {
      "id": "depart",
      "mapPointId": "wroclaw-start",
      "title": {
        "he": "יציאה מוורוצלב",
        "en": "Depart Wrocław",
        "pl": "Wyjazd z Wrocławia",
        "de": "Abfahrt aus Wrocław",
        "cs": "Odjezd z Vratislavi"
      },
      "duration": {
        "he": "יציאה מוקדמת, לפי הניווט",
        "en": "Early departure, check navigation",
        "pl": "Wczesny wyjazd, sprawdź nawigację",
        "de": "Frühe Abfahrt, Navigation prüfen",
        "cs": "Brzký odjezd, ověřte navigaci"
      }
    },
    {
      "id": "srebrna-gora-fortress",
      "canonicalPlaceId": "srebrna-gora-fortress",
      "title": {
        "he": "מבצר סרברנה גורה",
        "en": "Srebrna Góra Fortress",
        "pl": "Twierdza Srebrna Góra",
        "de": "Festung Silberberg",
        "cs": "Pevnost Stříbrná Hora"
      },
      "duration": {
        "he": "כשעתיים וחצי כולל הליכה מהחניה",
        "en": "About 2.5 hours including the parking walk",
        "pl": "Około 2,5 godziny z podejściem",
        "de": "Etwa 2,5 Stunden mit Parkplatzweg",
        "cs": "Asi 2,5 hodiny včetně chůze z parkoviště"
      }
    },
    {
      "id": "klodzko-fortress",
      "canonicalPlaceId": "klodzko-fortress",
      "title": {
        "he": "מבצר קלודזקו",
        "en": "Kłodzko Fortress",
        "pl": "Twierdza Kłodzko",
        "de": "Festung Glatz",
        "cs": "Kladská pevnost"
      },
      "duration": {
        "he": "כשעה וחצי עד שעתיים, לפי המסלול",
        "en": "About 1.5 to 2 hours, depending on route",
        "pl": "Około 1,5 do 2 godzin, zależnie od trasy",
        "de": "Etwa 1,5 bis 2 Stunden, je nach Route",
        "cs": "Asi 1,5 až 2 hodiny podle trasy"
      }
    },
    {
      "id": "klodzko-old-town",
      "canonicalPlaceId": "klodzko-old-town",
      "title": {
        "he": "מרכז קלודזקו והרינק",
        "en": "Kłodzko Old Town and Market Square",
        "pl": "Stare Miasto i Rynek w Kłodzku",
        "de": "Altstadt und Marktplatz von Kłodzko",
        "cs": "Staré město a náměstí v Kladsku"
      },
      "duration": {
        "he": "כשעה וחצי עד שעתיים, ועוד זמן לארוחה",
        "en": "About 1.5 to 2 hours, plus a meal break",
        "pl": "Około 1,5 do 2 godzin i przerwa na posiłek",
        "de": "Etwa 1,5 bis 2 Stunden plus Essenspause",
        "cs": "Asi 1,5 až 2 hodiny a přestávka na jídlo"
      }
    },
    {
      "id": "return",
      "mapPointId": "wroclaw-return",
      "title": {
        "he": "חזרה לוורוצלב",
        "en": "Return to Wrocław",
        "pl": "Powrót do Wrocławia",
        "de": "Rückfahrt nach Wrocław",
        "cs": "Návrat do Vratislavi"
      },
      "duration": {
        "he": "לפי ניווט חי ותנאי הדרך",
        "en": "Check live navigation and road conditions",
        "pl": "Według nawigacji i warunków drogowych",
        "de": "Aktuelle Navigation und Straßenverhältnisse prüfen",
        "cs": "Podle navigace a podmínek na silnici"
      }
    }
  ],
  "regionalInspiration": {
    "photo": "/assets/srebrna-klodzko/klodzko-region-reference.jpg",
    "title": {
      "he": "רעיונות להמשך בחבל קלודזקו",
      "en": "More ideas around the Kłodzko region",
      "pl": "Pomysły na kolejne dni w ziemi kłodzkiej",
      "de": "Weitere Ideen im Glatzer Land",
      "cs": "Další tipy v Kladsku a okolí"
    },
    "description": {
      "he": "מפת האטרקציות שצילמנו בדרך נותנת מבט על האזור: מבצרים, עיירות, מערות ואתרים נוספים. אלה רעיונות ליום אחר, ואינם תחנות נוספות במסלול הזה. לחצו להגדלה.",
      "en": "The attraction map photographed on our trip gives a regional overview of fortresses, towns, caves and other places. These are ideas for another day, not extra stops on this route. Select the image to enlarge.",
      "pl": "Mapa atrakcji sfotografowana podczas naszej podróży pokazuje twierdze, miasta, jaskinie i inne miejsca w regionie. To pomysły na inny dzień, nie kolejne punkty tej trasy. Kliknij, aby powiększyć.",
      "de": "Die unterwegs fotografierte Attraktionskarte zeigt Festungen, Städte, Höhlen und weitere Orte der Region. Ideen für einen anderen Tag, keine zusätzlichen Stationen dieser Route. Zum Vergrößern auf das Bild klicken.",
      "cs": "Mapa atrakcí vyfotografovaná během naší cesty ukazuje pevnosti, města, jeskyně a další místa v regionu. Jde o tipy na jiný den, nikoli další zastávky této trasy. Kliknutím obrázek zvětšíte."
    },
    "note": {
      "he": "מקור המפה המצולמת הוא אתר נא ויפאד. זו תמונה מביקור קודם; פרסומות, הנחות ופרטי קשר שבתמונה אינם מידע עדכני מאומת.",
      "en": "Photographed map by naWypad.pl, from an earlier visit. Advertisements, discounts and contact details in the image have not been verified as current.",
      "pl": "Sfografowana mapa naWypad.pl pochodzi z wcześniejszej wizyty. Reklamy, rabaty i dane kontaktowe na zdjęciu nie zostały zweryfikowane jako aktualne.",
      "de": "Fotografierte Karte von naWypad.pl aus einem früheren Besuch. Werbung, Rabatte und Kontaktdaten im Bild sind nicht auf Aktualität geprüft.",
      "cs": "Vyfotografovaná mapa naWypad.pl z dřívější návštěvy. Reklamy, slevy a kontaktní údaje na snímku nejsou ověřeny jako aktuální."
    }
  }
};

  const poznanStopover = {
  "id": "poznan-wroclaw-stopover",
  "slug": "poznan-wroclaw-stopover",
  "title": {
    "he": "בדרך לוורוצלב 2: עוצרים בפוזנן",
    "en": "On the way to Wrocław 2: a stop in Poznań",
    "pl": "W drodze do Wrocławia 2: przystanek Poznań",
    "de": "Auf dem Weg nach Wrocław 2: Zwischenstopp in Poznań",
    "cs": "Cestou do Vratislavi 2: zastávka v Poznani"
  },
  "summary": {
    "he": "יום בפוזנן בין כיכר השוק ובית העירייה, סמטאות העיר העתיקה, אי הקתדרלות וציור הקיר בשרודקה, עם בחירה של עצירת אוכל או קפה בדרך.",
    "en": "A day in Poznań linking the Old Market Square and Town Hall, Old Town streets, Cathedral Island and the Śródka mural, with a choice of food or coffee stops.",
    "pl": "Dzień w Poznaniu: Stary Rynek i ratusz, uliczki Starego Miasta, Ostrów Tumski i mural na Śródce, z wybraną przerwą na jedzenie lub kawę.",
    "de": "Ein Tag in Poznań mit Altem Markt und Rathaus, Altstadtgassen, Dominsel und Śródka-Wandbild sowie einer Pause zum Essen oder Kaffee.",
    "cs": "Den v Poznani se Starým náměstím a radnicí, uličkami Starého Města, Tumským ostrovem a malbou ve Śródce, s vybranou zastávkou na jídlo či kávu."
  },
  "initialMapFocus": "local-stops",
  "showDestinationMarker": true,
  "meta": {
    "duration": "full-day",
    "startsAt": "poznan",
    "region": "wielkopolska",
    "tags": [
      "city-walk",
      "architecture",
      "heritage",
      "food",
      "photography"
    ]
  },
  "durationLabel": {
    "he": "כ־5 עד 7 שעות בעיר, ועוד זמן לנסיעה",
    "en": "About 5 to 7 hours in the city, plus travel",
    "pl": "Około 5 do 7 godzin w mieście, plus podróż",
    "de": "Etwa 5 bis 7 Stunden in der Stadt, zuzüglich Anreise",
    "cs": "Asi 5 až 7 hodin ve městě a čas na cestu"
  },
  "startsLabel": {
    "he": "ההליכה מתחילה בפוזנן",
    "en": "The walk starts in Poznań",
    "pl": "Spacer zaczyna się w Poznaniu",
    "de": "Der Rundgang beginnt in Poznań",
    "cs": "Procházka začíná v Poznani"
  },
  "regionLabel": {
    "he": "פוזנן, פולין גדולה",
    "en": "Poznań, Greater Poland",
    "pl": "Poznań, Wielkopolska",
    "de": "Poznań, Großpolen",
    "cs": "Poznaň, Velkopolsko"
  },
  "heroMedia": {
    "canonicalPlaceId": "poznan-old-market-square",
    "photoIndex": 0
  },
  "canonicalPlaceIds": [
    "poznan-old-market-square",
    "poznan-town-hall",
    "poznan-fara",
    "poznan-cathedral-island",
    "poznan-bishop-jordan-bridge",
    "poznan-srodka-mural"
  ],
  "optionalPlaceIds": [
    "poznan-stary-browar",
    "charlotte-poznan-krysiewicza",
    "pierozak-polwiejska-poznan",
    "pyraland-poznan",
    "stary-mlyn-zamkowa-poznan",
    "nifty-puro-poznan",
    "puro-poznan-stare-miasto",
    "poznan-posnania",
    "poznan-citadel-park",
    "poznan-lake-malta",
    "poznan-righteous-square",
    "poznan-new-synagogue",
    "poznan-royal-castle",
    "poznan-imperial-castle",
    "caffe-da-vinci-poznan",
    "pod-lampionami-poznan",
    "poznan-jewish-quarter",
    "ryczka-polna-poznan",
    "slodko-slona-cafe-poznan",
    "ghiacci-cafe-poznan",
    "raj-szycia-poznan",
    "poznan-old-zoo",
    "poznan-new-zoo",
    "poznan-jezyce-market",
    "poznan-little-prince-mural",
    "poznan-collegium-minus",
    "poznan-franciscan-church-st-anthony"
  ],
  "routePoints": [
    {
      "id": "poznan-stop-1",
      "kind": "place",
      "canonicalPlaceId": "poznan-old-market-square"
    },
    {
      "id": "poznan-stop-2",
      "kind": "place",
      "canonicalPlaceId": "poznan-town-hall"
    },
    {
      "id": "poznan-stop-3",
      "kind": "place",
      "canonicalPlaceId": "poznan-fara"
    },
    {
      "id": "poznan-stop-4",
      "kind": "place",
      "canonicalPlaceId": "poznan-cathedral-island"
    },
    {
      "id": "poznan-stop-5",
      "kind": "place",
      "canonicalPlaceId": "poznan-bishop-jordan-bridge"
    },
    {
      "id": "poznan-stop-6",
      "kind": "place",
      "canonicalPlaceId": "poznan-srodka-mural"
    }
  ],
  "walkingRoute": {
    "city": "poznan",
    "title": {
      "he": "המסלול הרגלי בפוזנן",
      "en": "The Poznań city walk",
      "pl": "Spacer po Poznaniu",
      "de": "Stadtrundgang durch Poznań",
      "cs": "Procházka Poznaní"
    },
    "summary": {
      "he": "מכיכר השוק ובית העירייה עוברים ליד כנסיית פארה, ממשיכים לאי הקתדרלות וחוצים את גשר ירדן אל ציור הקיר בשרודקה. עצירות האוכל והמלון מופיעות בנפרד לבחירה.",
      "en": "Walk from the Old Market Square and Town Hall past the Fara church, continue to Cathedral Island and cross Bishop Jordan Bridge to the Śródka mural. Food and hotel options are listed separately.",
      "pl": "Od Starego Rynku i ratusza przez okolice Fary na Ostrów Tumski, a następnie przez most Biskupa Jordana do muralu na Śródce. Jedzenie i hotel to osobne opcje.",
      "de": "Vom Alten Markt und Rathaus an der Fara vorbei zur Dominsel, dann über die Jordanbrücke zum Śródka-Wandbild. Essen und Hotel stehen als eigene Optionen zur Auswahl.",
      "cs": "Od Starého náměstí a radnice kolem Fary na Tumský ostrov, přes most biskupa Jordana k malbě ve Śródce. Jídlo a hotel jsou uvedeny jako samostatné možnosti."
    },
    "closedLoop": false,
    "geometryAccuracy": "stop-order-only",
    "points": [
      {
        "id": "1",
        "canonicalPlaceId": "poznan-old-market-square"
      },
      {
        "id": "2",
        "canonicalPlaceId": "poznan-town-hall"
      },
      {
        "id": "3",
        "canonicalPlaceId": "poznan-fara"
      },
      {
        "id": "4",
        "canonicalPlaceId": "poznan-cathedral-island"
      },
      {
        "id": "5",
        "canonicalPlaceId": "poznan-bishop-jordan-bridge"
      },
      {
        "id": "6",
        "canonicalPlaceId": "poznan-srodka-mural"
      }
    ],
    "navigation": {
      "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=Stary+Rynek+Pozna%C5%84&destination=Mural+%C5%9Ar%C3%B3dka+Pozna%C5%84&waypoints=Ratusz+Pozna%C5%84%7CFara+Pozna%C5%84%7CKatedra+Pozna%C5%84%7CMost+Biskupa+Jordana+Pozna%C5%84&travelmode=walking"
    },
    "note": {
      "he": "הקו מציג את סדר התחנות. פתחו ניווט להולכי רגל לקבלת דרך ברחובות. תכננו בנפרד את הדרך מתחנת הרכבת ואת החזרה אליה.",
      "en": "The line shows stop order. Open walking directions for street routing. Plan the journey from and back to the railway station separately.",
      "pl": "Linia pokazuje kolejność punktów. Nawigacja piesza wyznaczy trasę ulicami. Osobno zaplanuj dojazd z dworca i powrót na dworzec.",
      "de": "Die Linie zeigt die Reihenfolge. Die Fußgängernavigation liefert den Straßenweg. Den Weg vom und zum Bahnhof separat planen.",
      "cs": "Čára ukazuje pořadí míst. Pěší navigace zobrazí cestu ulicemi. Cestu z nádraží a návrat na něj naplánujte zvlášť."
    }
  },
  "navigation": {
    "googleMaps": "https://www.google.com/maps/dir/?api=1&origin=Stary+Rynek+Pozna%C5%84&destination=Mural+%C5%9Ar%C3%B3dka+Pozna%C5%84&waypoints=Ratusz+Pozna%C5%84%7CFara+Pozna%C5%84%7CKatedra+Pozna%C5%84%7CMost+Biskupa+Jordana+Pozna%C5%84&travelmode=walking"
  },
  "editorial": {
    "why": {
      "he": "פוזנן מתאימה לעצירה עירונית עם כיכר שוק צבעונית, אדריכלות, היסטוריה ואוכל. המסלול מחבר את העיר העתיקה עם אי הקתדרלות ושרודקה, ומשאיר מקום לבחור הפסקת קפה או ארוחה.",
      "en": "Poznań offers a colourful market square, architecture, history and food. This walk connects the Old Town with Cathedral Island and Śródka, with room to choose a coffee or meal stop.",
      "pl": "Poznań łączy kolorowy rynek, architekturę, historię i jedzenie. Spacer prowadzi ze Starego Miasta na Ostrów Tumski i Śródkę, z miejscem na kawę lub posiłek.",
      "de": "Poznań verbindet einen farbenfrohen Markt mit Architektur, Geschichte und Essen. Der Spaziergang führt von der Altstadt zur Dominsel und nach Śródka, mit Zeit für Kaffee oder eine Mahlzeit.",
      "cs": "Poznaň nabízí barevné náměstí, architekturu, historii a jídlo. Procházka spojuje Staré Město s Tumským ostrovem a Śródkou a ponechává čas na kávu nebo jídlo."
    },
    "forWhom": {
      "he": "למי שמגיע דרך פוזנן וממשיך לוורוצלב, או למי שמקדיש יום נפרד להלוך וחזור מוורוצלב. פוזנן נמצאת בפולין גדולה. היא אינה עצירה על הדרך הישירה מוורשה לוורוצלב.",
      "en": "For travellers arriving via Poznań before continuing to Wrocław, or taking a separate return day trip from Wrocław. Poznań is in Greater Poland and is not a stop on the direct Warsaw to Wrocław route.",
      "pl": "Dla przyjeżdżających przez Poznań w drodze do Wrocławia albo na osobną jednodniową wycieczkę z powrotem do Wrocławia. Poznań leży w Wielkopolsce, poza bezpośrednią trasą Warszawa / Wrocław.",
      "de": "Für eine Anreise über Poznań nach Wrocław oder einen eigenen Tagesausflug mit Rückkehr nach Wrocław. Poznań liegt in Großpolen, abseits der direkten Route Warschau / Wrocław.",
      "cs": "Pro příjezd přes Poznaň do Vratislavi nebo samostatný jednodenní výlet z Vratislavi s návratem. Poznaň leží ve Velkopolsku mimo přímou trasu Varšava / Vratislav."
    },
    "practical": {
      "he": "הקדישו כחמש עד שבע שעות בעיר לפי קצב ההליכה וההפסקות. זהו אומדן לתכנון, ללא זמני נסיעה. בחרו עצירת אוכל אחת וקפה לפי הרצון. בדקו פתיחה, מזג אוויר ורכבות לתאריך הנסיעה. ביקור בבית העירייה במסלול הוא מבחוץ; המוזיאון סגור לשיפוץ.",
      "en": "Allow around five to seven hours in the city depending on pace and breaks, excluding travel. Choose one meal stop and coffee if desired. Check opening, weather and date-specific trains. The Town Hall stop is outside; its museum is closed for renovation.",
      "pl": "Zaplanuj około pięciu do siedmiu godzin w mieście, zależnie od tempa i przerw, bez podróży. Wybierz jeden posiłek i ewentualnie kawę. Sprawdź otwarcie, pogodę i pociągi na konkretny dzień. Ratusz oglądamy z zewnątrz; muzeum jest zamknięte z powodu remontu.",
      "de": "Je nach Tempo und Pausen etwa fünf bis sieben Stunden in der Stadt einplanen, ohne Anreise. Eine Essenspause und bei Bedarf Kaffee wählen. Öffnung, Wetter und Züge für das Reisedatum prüfen. Das Rathaus wird außen besichtigt; sein Museum ist wegen Renovierung geschlossen.",
      "cs": "Podle tempa a přestávek počítejte asi s pěti až sedmi hodinami ve městě bez cesty. Vyberte jednu zastávku na jídlo a případně kávu. Ověřte otevření, počasí a vlaky na konkrétní den. Radnici navštívíme zvenku; muzeum je kvůli rekonstrukci zavřené."
    }
  },
  "travel": {
    "recommendedMode": "train",
    "segments": [],
    "estimates": [],
    "note": {
      "he": "אפשר לעצור בפוזנן לפני המשך לוורוצלב, או לצאת מוורוצלב ולחזור אליה באותו יום. בנסיעת יום ברכבת בדקו מראש הלוך וחזור והשאירו זמן בעיר ובתחנות. אין כאן התחייבות לרכבת, למחיר או לשעת הגעה.",
      "en": "Stop in Poznań before continuing to Wrocław, or travel from Wrocław and return the same day. For a train day trip, check outward and return services and allow time in the city and at stations. No specific train, fare or arrival time is promised.",
      "pl": "Zatrzymaj się w Poznaniu przed dalszą podróżą do Wrocławia albo przyjedź z Wrocławia i wróć tego samego dnia. Sprawdź pociągi w obie strony i zostaw czas w mieście oraz na dworcach. Bez gwarancji konkretnego pociągu, ceny czy godziny przyjazdu.",
      "de": "In Poznań vor der Weiterfahrt nach Wrocław halten oder von Wrocław anreisen und am selben Tag zurückkehren. Für einen Bahnausflug Hin- und Rückfahrt prüfen und Zeit in der Stadt und an Bahnhöfen einplanen. Kein bestimmter Zug, Preis oder Ankunftszeit wird zugesichert.",
      "cs": "Zastavte se v Poznani před pokračováním do Vratislavi nebo přijeďte z Vratislavi a vraťte se tentýž den. Ověřte vlaky oběma směry a ponechte čas ve městě i na nádražích. Bez příslibu konkrétního vlaku, ceny nebo příjezdu."
    },
    "options": [
      {
        "mode": "train",
        "title": {
          "he": "רכבת והליכה בעיר",
          "en": "Train and city walk",
          "pl": "Pociąg i spacer",
          "de": "Bahn und Stadtspaziergang",
          "cs": "Vlak a pěší procházka"
        },
        "description": {
          "he": "בדקו רכבות הלוך וחזור לתאריך שלכם. תחנת פוזנן גלובני נפרדת מתחילת ההליכה בעיר העתיקה; בחרו הליכה, תחבורה עירונית או מונית ביניהן.",
          "en": "Check outward and return trains for your date. Poznań Główny station is separate from the Old Town walk; choose walking, local transport or a taxi between them.",
          "pl": "Sprawdź pociągi w obie strony na swój termin. Poznań Główny jest poza początkiem spaceru po Starym Mieście; dojście, komunikację miejską lub taksówkę zaplanuj osobno.",
          "de": "Hin- und Rückzüge für Ihr Datum prüfen. Poznań Główny liegt außerhalb des Altstadtrundgangs; Fußweg, Nahverkehr oder Taxi separat planen.",
          "cs": "Ověřte vlaky oběma směry na svůj termín. Poznań Główny leží mimo začátek procházky Starým Městem; pěší cestu, MHD nebo taxi naplánujte zvlášť."
        }
      },
      {
        "mode": "car",
        "title": {
          "he": "עצירה ברכב והמשך לוורוצלב",
          "en": "Drive, stop and continue to Wrocław",
          "pl": "Postój autem i dalej do Wrocławia",
          "de": "Autostopp und Weiterfahrt nach Wrocław",
          "cs": "Zastávka autem a pokračování do Vratislavi"
        },
        "description": {
          "he": "בדקו חניה מחוץ למדרחובים ומגבלות כניסה לעיר העתיקה. ניווט הנהיגה והניווט הרגלי הם שני מסלולים נפרדים.",
          "en": "Check parking outside pedestrian streets and Old Town access rules. Driving and walking navigation are separate routes.",
          "pl": "Sprawdź parking poza deptakami i zasady wjazdu na Stare Miasto. Nawigacja samochodowa i piesza to osobne trasy.",
          "de": "Parkplätze außerhalb der Fußgängerzonen und Zufahrtsregeln prüfen. Auto- und Fußgängernavigation sind getrennte Routen.",
          "cs": "Ověřte parkování mimo pěší zóny a pravidla vjezdu do Starého Města. Navigace autem a pěšky jsou samostatné trasy."
        }
      },
      {
        "mode": "overnight",
        "title": {
          "he": "אפשר גם להישאר ללילה",
          "en": "An overnight stay is also possible",
          "pl": "Można zostać na noc",
          "de": "Auch mit Übernachtung möglich",
          "cs": "Lze zůstat i přes noc"
        },
        "description": {
          "he": "המלון המומלץ והמסעדה שלו מופיעים כאפשרויות לבחירה. בדקו זמינות ומחיר ישירות מול המלון; לינה אינה חלק מחייב של המסלול.",
          "en": "The recommended hotel and its restaurant are optional. Check availability and rates directly with the hotel; an overnight stay is not required for this walk.",
          "pl": "Polecany hotel i jego restauracja są opcjonalne. Dostępność i cenę sprawdź bezpośrednio w hotelu; nocleg nie jest wymagany.",
          "de": "Das empfohlene Hotel und sein Restaurant sind optional. Verfügbarkeit und Preise direkt beim Hotel prüfen; eine Übernachtung ist nicht erforderlich.",
          "cs": "Doporučený hotel a jeho restaurace jsou volitelné. Dostupnost a cenu ověřte přímo v hotelu; nocleh není nutnou součástí procházky."
        }
      }
    ],
    "accessibility": []
  },
  "steps": [
    {
      "id": "market",
      "canonicalPlaceId": "poznan-old-market-square",
      "title": {
        "he": "כיכר השוק ובית העירייה",
        "en": "Old Market Square and Town Hall",
        "pl": "Stary Rynek i ratusz",
        "de": "Alter Markt und Rathaus",
        "cs": "Staré náměstí a radnice"
      },
      "duration": {
        "he": "הליכה בין הבתים והכיכר, בקצב שלכם",
        "en": "Explore the square at your own pace",
        "pl": "Spacer po rynku we własnym tempie",
        "de": "Den Platz im eigenen Tempo erkunden",
        "cs": "Procházka náměstím vlastním tempem"
      }
    },
    {
      "id": "fara",
      "canonicalPlaceId": "poznan-fara",
      "title": {
        "he": "פארה וסמטאות העיר העתיקה",
        "en": "Fara and Old Town streets",
        "pl": "Fara i uliczki Starego Miasta",
        "de": "Fara und Altstadtgassen",
        "cs": "Fara a uličky Starého Města"
      },
      "duration": {
        "he": "עצירה אדריכלית; כניסה בהתאם לפתיחה ולתפילות",
        "en": "Architecture stop; entry depends on opening and services",
        "pl": "Architektura; wejście zależnie od otwarcia i nabożeństw",
        "de": "Architektur; Einlass je nach Öffnung und Gottesdiensten",
        "cs": "Architektura; vstup podle otevření a bohoslužeb"
      }
    },
    {
      "id": "cathedral",
      "canonicalPlaceId": "poznan-cathedral-island",
      "title": {
        "he": "אי הקתדרלות",
        "en": "Cathedral Island",
        "pl": "Ostrów Tumski",
        "de": "Dominsel",
        "cs": "Tumský ostrov"
      },
      "duration": {
        "he": "המשיכו אל האי והקדישו זמן לסביבת הקתדרלה",
        "en": "Continue to the island and explore the cathedral surroundings",
        "pl": "Przejdź na wyspę i obejrzyj otoczenie katedry",
        "de": "Zur Insel gehen und das Umfeld des Doms erkunden",
        "cs": "Pokračujte na ostrov a prohlédněte okolí katedrály"
      }
    },
    {
      "id": "jordan",
      "canonicalPlaceId": "poznan-bishop-jordan-bridge",
      "title": {
        "he": "חוצים את גשר ירדן",
        "en": "Cross Bishop Jordan Bridge",
        "pl": "Przejście mostem Biskupa Jordana",
        "de": "Über die Jordanbrücke",
        "cs": "Přes most biskupa Jordana"
      },
      "duration": {
        "he": "מבט אל הנהר והמשך לשרודקה",
        "en": "River views on the way to Śródka",
        "pl": "Widoki na rzekę w drodze na Śródkę",
        "de": "Flussblick auf dem Weg nach Śródka",
        "cs": "Výhledy na řeku cestou do Śródky"
      }
    },
    {
      "id": "srodka",
      "canonicalPlaceId": "poznan-srodka-mural",
      "title": {
        "he": "שרודקה וציור הקיר",
        "en": "Śródka and its mural",
        "pl": "Śródka i mural",
        "de": "Śródka und das Wandbild",
        "cs": "Śródka a nástěnná malba"
      },
      "duration": {
        "he": "סיום ההליכה; תכננו מכאן חזרה לתחנה או למלון",
        "en": "End of the walk; plan your return to the station or hotel",
        "pl": "Koniec spaceru; zaplanuj powrót na dworzec lub do hotelu",
        "de": "Ende des Rundgangs; Rückweg zu Bahnhof oder Hotel planen",
        "cs": "Konec procházky; naplánujte návrat na nádraží nebo do hotelu"
      }
    }
  ],
  "localOnlyMap": true
};

  const product = {
    id: "lower-silesia-excursions",
    type: "excursions",
    title: t("טיולים מוורוצלב", "Excursions from Wrocław", "Wycieczki z Wrocławia", "Ausflüge ab Wrocław", "Výlety z Vratislavi"),
    status: t("שבעה טיולים מוכנים", "Seven excursions ready", "Siedem wycieczek gotowych", "Sieben Ausflüge verfügbar", "Sedm výletů připraveno"),
    excursions: [excursion, brzegMoszna, jaworKarpacz, czochaBoleslawiec, warsawLodz, srebrnaKlodzko, poznanStopover],
    canonicalPlaceIds: [...canonicalPlaceIds, ...brzegMosznaPlaceIds, ...jaworKarpacz.canonicalPlaceIds, ...czochaBoleslawiec.canonicalPlaceIds, ...warsawLodz.canonicalPlaceIds, ...warsawLodz.departurePlaceIds, ...srebrnaKlodzko.canonicalPlaceIds, ...poznanStopover.canonicalPlaceIds, ...poznanStopover.optionalPlaceIds],
  };

  if (window.WROC_CATALOG?.registerProduct) {
    window.WROC_CATALOG.registerProduct({ id: product.id, type: product.type, places: product.canonicalPlaceIds.map((id) => ({ id })) });
  }

  window.WROC_LOWER_SILESIA_EXCURSIONS = Object.freeze(product);
})();
