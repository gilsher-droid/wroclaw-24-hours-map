window.LOCATIONS = [
  {
    id: "rynek", order: 1, coordinates: [51.10932, 17.03167], category: "start", optional: false, localName: "Rynek Wrocław",
    name: { he: "כיכר השוק של ורוצלב", en: "Wrocław Market Square", pl: "Rynek we Wrocławiu" },
    description: {
      he: "הלב של העיר העתיקה ונקודת פתיחה מצוינת. טיילו בין הבניינים הצבעוניים, עברו ליד בית העירייה וחפשו את הגמדים המפורסמים.",
      en: "The heart of the Old Town and an excellent starting point. Walk among the colourful façades, pass the Town Hall and look for the city’s famous dwarfs.",
      pl: "Serce Starego Miasta i doskonały punkt startowy. Przejdź wśród kolorowych kamienic, obok Ratusza i poszukaj słynnych krasnali."
    },
    recommendation: { he: "כדאי להתחיל כאן בקצב רגוע.", en: "Start here at a relaxed pace.", pl: "Warto zacząć tutaj w spokojnym tempie." },
    time: { he: "30–45 דקות", en: "30–45 minutes", pl: "30–45 minut" }
  },
  {
    id: "town-hall", order: 2, coordinates: [51.10993, 17.03170], category: "architecture", optional: false, localName: "Ratusz we Wrocławiu",
    name: { he: "בית העירייה העתיק", en: "Wrocław Old Town Hall", pl: "Ratusz we Wrocławiu" },
    description: { he: "מבנה גותי מרשים בלב הכיכר. מומלץ להקיף אותו ולראות את החזיתות השונות.", en: "An impressive Gothic landmark at the centre of the square. Walk around it to see its different façades.", pl: "Imponujący gotycki zabytek w centrum Rynku. Warto obejść go dookoła i zobaczyć różne elewacje." },
    recommendation: null,
    time: { he: "10–15 דקות", en: "10–15 minutes", pl: "10–15 minut" }
  },
  {
    id: "jas-malgosia", order: 3, coordinates: [51.11091, 17.03027], category: "architecture", optional: false, localName: "Kamieniczki Jaś i Małgosia",
    name: { he: "הנזל וגרטל", en: "Hansel and Gretel Houses", pl: "Kamieniczki Jaś i Małgosia" },
    description: { he: "שני הבתים הצרים והמפורסמים ליד כנסיית אליזבת הקדושה, המחוברים בשער בארוקי קטן.", en: "Two famous narrow houses beside St Elizabeth’s Church, joined by a small Baroque gateway.", pl: "Dwie słynne wąskie kamieniczki obok kościoła św. Elżbiety, połączone małą barokową bramą." },
    recommendation: null,
    time: { he: "10 דקות", en: "10 minutes", pl: "10 minut" }
  },
  {
    id: "jatki", order: 4, coordinates: [51.11184, 17.03024], category: "special", optional: false, localName: "Stare Jatki",
    name: { he: "סמטת יאטקי", en: "Jatki Alley", pl: "Stare Jatki" },
    description: { he: "סמטה היסטורית קטנה עם גלריות ואנדרטת בעלי החיים שנשחטו, אחת הפינות המיוחדות ליד הכיכר.", en: "A small historic alley with galleries and the memorable monument to slaughtered animals.", pl: "Niewielka historyczna uliczka z galeriami i charakterystycznym pomnikiem Ku Czci Zwierząt Rzeźnych." },
    recommendation: null,
    time: { he: "10–15 דקות", en: "10–15 minutes", pl: "10–15 minut" }
  },
  {
    id: "university", order: 5, coordinates: [51.11399, 17.03393], category: "culture", optional: false, localName: "Uniwersytet Wrocławski",
    name: { he: "אוניברסיטת ורוצלב", en: "University of Wrocław", pl: "Uniwersytet Wrocławski" },
    description: { he: "אחד המבנים המרשימים והחשובים בעיר, ממש סמוך לנהר, עם חזית בארוקית ארוכה.", en: "One of the city’s most important and impressive buildings, set beside the river with a long Baroque façade.", pl: "Jeden z najważniejszych i najbardziej okazałych budynków miasta, położony nad rzeką, z długą barokową fasadą." },
    recommendation: null,
    time: { he: "20–30 דקות", en: "20–30 minutes", pl: "20–30 minut" }
  },
  {
    id: "aula", order: 6, coordinates: [51.11371, 17.03362], category: "culture", optional: true, localName: "Aula Leopoldina",
    name: { he: "אולה לאופולדינה", en: "Aula Leopoldina", pl: "Aula Leopoldina" },
    description: { he: "אולם בארוקי מפואר בתוך האוניברסיטה. בדקו שעות פתיחה וכרטיסים; אם סגור, המשיכו בלי לעכב את המסלול.", en: "A magnificent Baroque ceremonial hall inside the university. Check opening hours and tickets; if closed, keep moving.", pl: "Wspaniała barokowa sala reprezentacyjna uniwersytetu. Sprawdź godziny otwarcia i bilety; jeśli jest zamknięta, kontynuuj trasę." },
    recommendation: { he: "תחנת רשות בהתאם לזמן ולשעות הפתיחה.", en: "Optional, depending on time and opening hours.", pl: "Opcjonalnie, zależnie od czasu i godzin otwarcia." },
    time: { he: "20–30 דקות", en: "20–30 minutes", pl: "20–30 minut" }
  },
  {
    id: "math-tower", order: 7, coordinates: [51.11391, 17.03329], category: "viewpoint", optional: true, localName: "Wieża Matematyczna",
    name: { he: "מגדל המתמטיקה", en: "Mathematical Tower", pl: "Wieża Matematyczna" },
    description: { he: "נקודת תצפית מעל מרכז ורוצלב. העלייה תלויה בשעות הפתיחה, במזג האוויר ובזמן שנותר.", en: "A viewpoint above central Wrocław. The climb depends on opening hours, weather and the time you have left.", pl: "Punkt widokowy nad centrum Wrocławia. Wejście zależy od godzin otwarcia, pogody i pozostałego czasu." },
    recommendation: { he: "בחרו בינו לבין אולה לאופולדינה אם היום עמוס.", en: "Choose this or Aula Leopoldina if the day feels full.", pl: "Przy napiętym planie wybierz tę wieżę albo Aulę Leopoldina." },
    time: { he: "20–30 דקות", en: "20–30 minutes", pl: "20–30 minut" }
  },
  {
    id: "ossolineum", order: 8, coordinates: [51.11343, 17.03657], category: "culture", optional: false, localName: "Zakład Narodowy im. Ossolińskich",
    name: { he: "אוסולינאום", en: "Ossolineum", pl: "Ossolineum" },
    description: { he: "מוסד לאומי שנוסד ב־1817 בלבוב ושומר ספרים, כתבי יד ואוצרות תרבות פולניים. עברו דרך השער אל החצר והגן השקטים.", en: "A national institution founded in Lviv in 1817, preserving books, manuscripts and treasures of Polish culture. Step through the gate into its quiet courtyard and garden.", pl: "Narodowa instytucja założona we Lwowie w 1817 roku, przechowująca książki, rękopisy i skarby polskiej kultury. Wejdź przez bramę na spokojny dziedziniec i do ogrodu." },
    recommendation: { he: "גם בלי ביקור בתערוכה, החצר והגן שווים עצירה קצרה; בדקו במקום אם המעבר פתוח.", en: "Even without visiting an exhibition, the courtyard and garden merit a short stop; check on arrival that access is open.", pl: "Nawet bez zwiedzania wystawy warto zatrzymać się na dziedzińcu i w ogrodzie; na miejscu sprawdź, czy przejście jest otwarte." },
    time: { he: "15–25 דקות", en: "15–25 minutes", pl: "15–25 minut" }
  },
  {
    id: "hala-targowa", order: 9, coordinates: [51.11250, 17.04075], category: "food", optional: false, localName: "Hala Targowa",
    name: { he: "השוק המקורה", en: "Wrocław Market Hall", pl: "Hala Targowa" },
    description: { he: "שוק מקומי מקורה עם תוצרת, פרחים, קפה, מאפים ואוכל פולני — עצירה טבעית באמצע היום.", en: "A covered local market with produce, flowers, coffee, pastries and Polish food — a natural midday break.", pl: "Zadaszone lokalne targowisko z warzywami, kwiatami, kawą, wypiekami i polskim jedzeniem — naturalna przerwa w połowie dnia." },
    recommendation: { he: "זו הנקודה הטובה במסלול לקפה או לארוחה קלה.", en: "This is the route’s best stop for coffee or a light meal.", pl: "To najlepszy punkt trasy na kawę lub lekki posiłek." },
    time: { he: "30–45 דקות", en: "30–45 minutes", pl: "30–45 minut" }
  },
  {
    id: "most-piaskowy", order: 10, coordinates: [51.113559, 17.039816], category: "river", optional: false, localName: "Most Piaskowy",
    name: { he: "גשר החול", en: "Sand Bridge", pl: "Most Piaskowy" },
    description: { he: "אחד המעברים היפים בין מרכז העיר לאזור האיים, עם מבט נהדר אל הנהר.", en: "One of the prettiest crossings between the city centre and the islands, with fine river views.", pl: "Jedno z najładniejszych przejść między centrum a wyspami, z przyjemnym widokiem na rzekę." },
    recommendation: null,
    time: { he: "10 דקות", en: "10 minutes", pl: "10 minut" }
  },
  {
    id: "wyspa-piasek", order: 11, coordinates: [51.11453, 17.040199], category: "river", optional: false, localName: "Wyspa Piasek",
    name: { he: "אי החול", en: "Sand Island", pl: "Wyspa Piasek" },
    description: { he: "אזור מעבר שקט ונעים בין מרכז העיר לאוסטרוב טומסקי, מוקף בזרועות האודר.", en: "A quiet, pleasant passage between the city centre and Ostrów Tumski, surrounded by branches of the Oder.", pl: "Spokojne, przyjemne przejście między centrum a Ostrowem Tumskim, otoczone ramionami Odry." },
    recommendation: null,
    time: { he: "10–15 דקות", en: "10–15 minutes", pl: "10–15 minut" }
  },
  {
    id: "most-tumski", order: 12, coordinates: [51.114714, 17.042248], category: "river", optional: false, localName: "Most Tumski",
    name: { he: "גשר טומסקי", en: "Tumski Bridge", pl: "Most Tumski" },
    description: { he: "הגשר שמוביל אל הלב ההיסטורי של אוסטרוב טומסקי.", en: "The bridge leading into the historic heart of Ostrów Tumski.", pl: "Most prowadzący do historycznego serca Ostrowa Tumskiego." },
    recommendation: null,
    time: { he: "10 דקות", en: "10 minutes", pl: "10 minut" }
  },
  {
    id: "ostrow", order: 13, coordinates: [51.11430, 17.04507], category: "main", optional: false, localName: "Ostrów Tumski",
    name: { he: "אוסטרוב טומסקי", en: "Ostrów Tumski", pl: "Ostrów Tumski" },
    description: { he: "האזור העתיק והאווירי של ורוצלב, עם רחובות שקטים, כנסיות ופנסי גז היסטוריים.", en: "Wrocław’s atmospheric historic quarter, with quiet lanes, churches and traditional gas lamps.", pl: "Nastrojowa historyczna część Wrocławia z cichymi uliczkami, kościołami i tradycyjnymi latarniami gazowymi." },
    recommendation: { he: "מומלץ להגיע לקראת הערב, כשהאור מתחיל להשתנות.", en: "Try to arrive toward evening as the light begins to change.", pl: "Najlepiej dotrzeć pod wieczór, gdy zaczyna zmieniać się światło." },
    time: { he: "45–60 דקות", en: "45–60 minutes", pl: "45–60 minut" }
  },
  {
    id: "cathedral", order: 14, coordinates: [51.11422, 17.04663], category: "architecture", optional: false, localName: "Archikatedra św. Jana Chrzciciela",
    name: { he: "קתדרלת יוחנן המטביל", en: "Cathedral of St John the Baptist", pl: "Archikatedra św. Jana Chrzciciela" },
    description: { he: "הקתדרלה המרכזית של אוסטרוב טומסקי ואחת התחנות המרשימות בעיר.", en: "The principal cathedral of Ostrów Tumski and one of the city’s most striking landmarks.", pl: "Główna katedra Ostrowa Tumskiego i jeden z najbardziej imponujących zabytków miasta." },
    recommendation: null,
    time: { he: "20–30 דקות", en: "20–30 minutes", pl: "20–30 minut" }
  }
];

window.EVENING_LOCATIONS = [
  {
    id: "nfm", coordinates: [51.10775, 17.02857], localName: "Narodowe Forum Muzyki",
    name: { he: "הפורום הלאומי למוזיקה", en: "National Forum of Music", pl: "Narodowe Forum Muzyki" },
    description: { he: "אחד ממוסדות התרבות המרכזיים בעיר. בדקו אם מתקיים מופע בערב הביקור.", en: "One of the city’s leading cultural venues. Check whether a performance is scheduled for your evening.", pl: "Jedna z najważniejszych instytucji kultury w mieście. Sprawdź, czy wieczorem odbywa się koncert." }
  },
  {
    id: "opera", coordinates: [51.10672, 17.03254], localName: "Opera Wrocławska",
    name: { he: "האופרה של ורוצלב", en: "Wrocław Opera", pl: "Opera Wrocławska" },
    description: { he: "מבנה תרבותי מרכזי במרכז העיר. כדאי לבדוק מראש את תוכנית ההופעות.", en: "A major cultural venue in the city centre. Check the current programme in advance.", pl: "Ważna scena kulturalna w centrum miasta. Warto wcześniej sprawdzić aktualny repertuar." }
  },
  {
    id: "boguslawskiego", coordinates: [51.10289, 17.02979], localName: "ul. Wojciecha Bogusławskiego",
    name: { he: "רחוב המסעדות בוגוסלבסקייגו", en: "Bogusławskiego restaurant street", pl: "Ulica Wojciecha Bogusławskiego" },
    description: { he: "מסעדות וברים מתחת לקשתות מסילת הרכבת — מקום נעים לסיים בו את היום.", en: "Restaurants and bars beneath the railway arches — an easy place to end the day.", pl: "Restauracje i bary pod arkadami kolejowymi — dobre miejsce na zakończenie dnia." }
  },
  {
    id: "glowny", coordinates: [51.09858, 17.03675], localName: "Wrocław Główny",
    name: { he: "תחנת הרכבת המרכזית", en: "Wrocław Main Railway Station", pl: "Wrocław Główny" },
    description: { he: "תחנה מרשימה המזכירה טירה. שלבו אותה בסיום רק אם היא רלוונטית להמשך הנסיעה.", en: "A striking station that resembles a castle. Add it at the end only if it suits your onward journey.", pl: "Efektowny dworzec przypominający zamek. Dodaj go na końcu tylko wtedy, gdy pasuje do dalszej podróży." }
  }
];

[window.LOCATIONS, window.EVENING_LOCATIONS].forEach((items) => items.forEach((item) => {
  ["name", "description", "recommendation", "time"].forEach((field) => {
    const value = item[field];
    if (!value || typeof value !== "object" || !value.en) return;
    value.de = window.EXTRA_ROUTE_TRANSLATIONS?.de?.[value.en] || value.en;
    value.cs = window.EXTRA_ROUTE_TRANSLATIONS?.cs?.[value.en] || value.en;
  });
}));

if (window.WROC_CATALOG?.registerProduct) {
  const registered = window.WROC_CATALOG.registerProduct({
    id: "wroclaw-24-hours",
    type: "single-day-route",
    stops: window.LOCATIONS,
    recommendations: window.EVENING_LOCATIONS,
  });
  window.LOCATIONS = registered.stops;
  window.EVENING_LOCATIONS = registered.recommendations;
}

[window.LOCATIONS, window.EVENING_LOCATIONS].forEach((items) => items.forEach((item) => {
  item.resources = window.WROC_LOCATION_MEDIA?.[item.id] || {};
}));
