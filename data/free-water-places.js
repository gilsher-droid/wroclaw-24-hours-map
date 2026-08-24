(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => ({ he, en, pl, de, cs });
  const sameName = (name) => t(name, name, name, name, name);
  const partnerPage = "https://pijkranowke.pl/pijkranowke-we-wroclawiu/";
  const partnerMap = "https://www.google.com/maps/d/u/0/viewer?mid=1GNf1xy7QrVeSWXMfm5_ey8eGdmtjyKQ";
  const waterPage = "https://pijkranowke.pl/sezon-poidelek-2026-oficjalnie-otwarty/";
  const waterMap = "https://www.google.com/maps/d/u/0/viewer?mid=1sHUPPy-KU-tg1usJ9eWeRDyZYx8r1_8";
  const languages = ["he", "en", "pl", "de", "cs"];
  const wroclawLocation = (lat, lng) => ({
    countryCode: "PL",
    regionId: "lower-silesia",
    cityId: "wroclaw",
    coordinates: { lat, lng },
  });

  const hospitalityDescription = t(
    "בית עסק המשתתף בתוכנית ‎#PijKranówkę של MPWiK ומגיש מי ברז ללא תשלום.",
    "A hospitality venue participating in MPWiK's #PijKranówkę programme and serving free tap water.",
    "Lokal uczestniczący w programie MPWiK #PijKranówkę i serwujący bezpłatną wodę z kranu.",
    "Ein Gastronomiebetrieb im MPWiK-Programm #PijKranówkę, der kostenloses Leitungswasser anbietet.",
    "Podnik zapojený do programu MPWiK #PijKranówkę, který nabízí kohoutkovou vodu zdarma.",
  );

  const hospitality = (id, localName, lat, lng, categories = ["eat", "drink"]) => ({
    id,
    aliases: [],
    localName,
    name: sameName(localName),
    description: hospitalityDescription,
    location: wroclawLocation(lat, lng),
    categories,
    placeType: "hospitality",
    amenities: { freeTapWater: true },
    links: { website: partnerPage },
    provenance: {
      contentType: "official-programme",
      factualSources: [
        { type: "official", url: partnerPage, checkedAt: "2026-08-24" },
        { type: "coordinates", url: partnerMap, checkedAt: "2026-08-24" },
      ],
    },
    status: "published",
    editorialPriority: "normal",
    languages,
  });

  const seasonalWaterDescription = t(
    "ברזייה ציבורית עונתית עם מי שתייה, מילוי בקבוקים וקערה לבעלי חיים.",
    "A seasonal public drinking fountain for direct drinking and bottle refills, with an animal bowl.",
    "Sezonowy zdrój uliczny do bezpośredniego picia i napełniania butelek, wyposażony w misę dla zwierząt.",
    "Ein saisonaler öffentlicher Trinkbrunnen zum direkten Trinken und Flaschenfüllen, mit Tierschale.",
    "Sezónní veřejné pítko pro přímé pití a doplnění lahví, s miskou pro zvířata.",
  );
  const seasonalAvailability = {
    seasonal: true,
    operatingPeriod: "summer",
    notes: t(
      "פועל בעונת הקיץ, לאחר התייצבות הטמפרטורות ועד לכפור הראשון בסתיו.",
      "Operates in the summer season after temperatures stabilize and until the first autumn frosts.",
      "Działa w sezonie letnim po ustabilizowaniu temperatur, do pierwszych jesiennych przymrozków.",
      "In Betrieb während der Sommersaison, sobald die Temperaturen stabil sind, bis zum ersten Herbstfrost.",
      "Funguje v letní sezóně po ustálení teplot až do prvních podzimních mrazů.",
    ),
  };

  const waterPoint = (id, localName, lat, lng) => ({
    id,
    aliases: [],
    localName,
    name: sameName(localName),
    description: seasonalWaterDescription,
    location: wroclawLocation(lat, lng),
    categories: ["water"],
    placeType: "waterRefillPoint",
    amenities: { potableWater: true, bottleRefill: true, petBowl: true },
    availability: seasonalAvailability,
    links: { website: waterPage },
    provenance: {
      contentType: "official-utility-data",
      factualSources: [
        { type: "official", url: waterPage, checkedAt: "2026-08-24" },
        { type: "coordinates", url: waterMap, checkedAt: "2026-08-24" },
      ],
    },
    status: "published",
    editorialPriority: "normal",
    languages,
  });

  const freeWaterHospitalityPlaces = [
    hospitality("bernard-bistro-wino", "Bernard Bistro Wino", 51.1101033, 17.0334619),
    hospitality("cafe-targowa", "Cafe Targowa", 51.1124915, 17.0408014),
    hospitality("figa-w-barbarze", "Figa w Barbarze", 51.1076305, 17.0327024),
    hospitality("pestka-bistro-wine-bar", "Pestka Bistro Wine Bar", 51.1092597, 17.0249216),
    hospitality("parrot-coffee-bema", "Parrot Coffee – Bema", 51.1176655, 17.0416121, ["drink", "eat"]),
    hospitality("wierzbowa-15", "Wierzbowa 15", 51.1049625, 17.0364118),
    hospitality("odra-centrum", "Odra Centrum", 51.1088208, 17.0522865, ["drink", "eat"]),
    hospitality("pijalni-wino-bistro", "Pijalni wino & bistro", 51.1116485, 17.0560644),
    hospitality("szkocka-cocktail-bar", "Szkocka Cocktail Bar", 51.108113, 17.0182427, ["drink"]),
    hospitality("restauracja-tarasowa", "Restauracja Tarasowa", 51.1079248, 17.0779726),
    hospitality("kaffe-bageri-stockholm", "Kaffe Bageri Stockholm", 51.1118211, 17.0365372, ["drink", "eat"]),
    hospitality("vegan-af-ramen", "Vegan AF Ramen", 51.1085829, 17.0354843, ["eat"]),
    hospitality("paloma-coffee", "Paloma Coffee", 51.1095621, 17.028772, ["drink", "eat"]),
    hospitality("meatologia-sikorskiego", "Meatologia – Sikorskiego 7B", 51.1143582, 17.0215859, ["eat"]),
    hospitality("meatologia-zwycieska", "Meatologia – Zwycięska 45", 51.0592058, 17.0132735, ["eat"]),
    hospitality("meatologia-wlodkowica", "Meatologia – Włodkowica 27", 51.1094764, 17.0232852, ["eat"]),
    hospitality("woda-cafe", "Woda café", 51.1034555, 17.0572822, ["drink", "eat"]),
    hospitality("ida-kuchnia-i-wino", "IDA Kuchnia i Wino", 51.1123705, 17.0290663),
    hospitality("browar-stu-mostow", "Browar Stu Mostów", 51.1318321, 17.0590298, ["drink"]),
    hospitality("bistro-stu-mostow", "Bistro Stu Mostów", 51.108564, 17.0331246),
    hospitality("concept-stu-mostow", "Concept Stu Mostów", 51.1316688, 17.0590539),
    hospitality("taproom-stu-mostow", "Taproom Stu Mostów", 51.1318489, 17.0592712),
    hospitality("concordia-taste", "Concordia Taste", 51.1161217, 17.038584),
    hospitality("ibis-styles-wroclaw-centrum", "ibis Styles Wrocław Centrum", 51.099513, 17.0400735, ["sleep", "eat", "drink"]),
  ];

  const publicWaterPlaces = [
    waterPoint("water-refill-plac-dominikanski", "Zdrój uliczny – plac Dominikański", 51.108268, 17.039112),
    waterPoint("water-refill-olawska-swidnicka", "Zdrój uliczny – Oławska / Świdnicka", 51.109077, 17.033129),
    waterPoint("water-refill-plac-solny", "Zdrój uliczny – plac Solny", 51.109702, 17.030002),
    waterPoint("water-refill-plac-teatralny", "Zdrój uliczny – plac Teatralny", 51.105322, 17.033381),
    waterPoint("water-refill-wyspa-slodowa", "Zdrój uliczny – Wyspa Słodowa", 51.115927, 17.038542),
    waterPoint("water-refill-park-tolpy", "Zdrój uliczny – Park Stanisława Tołpy", 51.119598, 17.051823),
    waterPoint("water-refill-hydropolis", "Zdrój uliczny – Hydropolis / Na Grobli", 51.104383, 17.056206),
    waterPoint("water-refill-hala-stulecia", "Zdrój uliczny – Hala Stulecia", 51.106724, 17.078534),
    waterPoint("water-refill-skwer-steinmetza", "Zdrój uliczny – Skwer Steinmetza", 51.112172, 17.085492),
    waterPoint("water-refill-rynek-psiego-pola", "Zdrój uliczny – Rynek Psiego Pola", 51.1462196, 17.1128093),
    waterPoint("water-refill-plac-nowy-targ", "Zdrój uliczny – plac Nowy Targ", 51.111522, 17.0378996),
    waterPoint("water-refill-zoo-afrykarium", "Zdrój uliczny – ZOO / Afrykarium", 51.1046684, 17.0754744),
    waterPoint("water-refill-plac-wolnosci", "Zdrój uliczny – plac Wolności", 51.106814, 17.0276229),
    waterPoint("water-refill-nmp-piasek", "Zdrój uliczny – NMP / Piasek", 51.1150037, 17.0411936),
    {
      id: "water-refill-wroclaw-airport",
      aliases: [],
      localName: "Poidełka – Port Lotniczy Wrocław",
      name: sameName("Poidełka – Port Lotniczy Wrocław"),
      description: t(
        "בנמל התעופה יש שלושה מתקני מי שתייה הפועלים כל השנה: באזור היציאות לאחר הבידוק, באזור איסוף הכבודה ובאולם הראשי.",
        "The airport has three year-round drinking-water devices: departures after security, arrivals by baggage claim, and the main terminal hall.",
        "Na lotnisku działają trzy całoroczne poidełka: w strefie odlotów po kontroli, przy odbiorze bagażu oraz w hali głównej terminalu.",
        "Am Flughafen gibt es drei ganzjährig betriebene Trinkwasserspender: im Abflugbereich nach der Kontrolle, bei der Gepäckausgabe und in der Haupthalle.",
        "Na letišti fungují tři celoroční pítka: v odletové zóně za kontrolou, u výdeje zavazadel a v hlavní hale terminálu.",
      ),
      location: wroclawLocation(51.1096937, 16.880719),
      categories: ["water"],
      placeType: "waterRefillPoint",
      amenities: { potableWater: true, bottleRefill: true },
      availability: {
        seasonal: false,
        notes: t(
          "שלושת המתקנים פועלים כל השנה.",
          "All three devices operate year-round.",
          "Wszystkie trzy urządzenia działają całorocznie.",
          "Alle drei Geräte sind ganzjährig in Betrieb.",
          "Všechna tři zařízení fungují celoročně.",
        ),
      },
      links: { website: waterPage },
      provenance: {
        contentType: "official-utility-data",
        note: "The official coordinate represents the terminal, not an individual device.",
        factualSources: [
          { type: "official", url: waterPage, checkedAt: "2026-08-24" },
          { type: "coordinates", url: waterMap, checkedAt: "2026-08-24" },
        ],
      },
      status: "published",
      editorialPriority: "normal",
      languages,
    },
  ];

  window.WROC_FREE_WATER_PLACE_SOURCE = [
    ...freeWaterHospitalityPlaces,
    ...publicWaterPlaces,
  ];
})();
