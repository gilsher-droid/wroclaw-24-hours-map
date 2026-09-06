(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => Object.freeze({ he, en, pl, de, cs });
  const mediaFromPlace = (canonicalPlaceId, heroPhotoIndex = 0) => ({
    hero: { canonicalPlaceId, photoIndex: heroPhotoIndex },
    inheritFromCanonicalPlaceIds: [canonicalPlaceId],
    inheritSocial: true,
  });

  const experiences = [
    {
      id: "street-art-nadodrze-olbin",
      type: "area-exploration",
      categories: ["street-art"],
      name: t("אמנות רחוב בנדודז׳ה ואולבין", "Street art in Nadodrze and Ołbin", "Street art na Nadodrzu i Ołbinie", "Street Art in Nadodrze und Ołbin", "Street art v Nadodrze a Ołbinu"),
      description: t(
        "חוויית שיטוט בשכונות ולא כתובת יחידה; הפעילו את המסנן ובחרו אזור להתחיל ממנו.",
        "A neighbourhood exploration rather than one address; use the filter and choose an area to begin.",
        "Spacer po dzielnicach, a nie jeden adres; użyj filtra i wybierz obszar startowy.",
        "Ein Streifzug durch Viertel statt einer einzelnen Adresse; Filter wählen und ein Startgebiet aussuchen.",
        "Průzkum čtvrtí, nikoli jedna adresa; použijte filtr a vyberte si výchozí oblast."
      ),
      relatedCanonicalPlaceIds: [],
      productRefs: ["cultural-adventure"],
      mapPoints: [
        { id: "nadodrze", coordinates: [51.1192, 17.0325], label: "Nadodrze" },
        { id: "olbin", coordinates: [51.1190, 17.0500], label: "Ołbin" },
      ],
      media: null,
      social: [],
      metadata: { source: "WROC_CULTURAL_EXPERIENCES", fieldProductionGaps: ["photos", "video"] },
    },
    {
      id: "culture-evening",
      type: "cultural-performance",
      categories: ["music", "opera", "performance"],
      name: t("אופרה או NFM", "Opera or National Forum of Music", "Opera lub Narodowe Forum Muzyki", "Oper oder Nationales Musikforum", "Opera nebo Národní hudební fórum"),
      description: t(
        "בחרו מראש ערב תרבותי בוורוצלב — מופע באופרה או קונצרט ב־NFM — והזמינו כרטיסים ומקומות מתאימים.",
        "Choose a cultural evening in Wrocław—an opera performance or an NFM concert—and book suitable tickets and seats in advance.",
        "Wybierz wieczór kulturalny we Wrocławiu — spektakl operowy albo koncert w NFM — i wcześniej zarezerwuj bilety oraz odpowiednie miejsca.",
        "Wählen Sie einen Kulturabend in Wrocław – eine Opernaufführung oder ein Konzert im NFM – und reservieren Sie passende Karten und Plätze im Voraus.",
        "Vyberte si kulturní večer ve Vratislavi — operní představení nebo koncert v NFM — a předem si rezervujte vhodné vstupenky a místa."
      ),
      relatedCanonicalPlaceIds: ["opera", "nfm"],
      productRefs: ["wroclaw-christmas"],
      mapPoints: [],
      media: { inheritFromCanonicalPlaceIds: ["opera", "nfm"] },
      social: [{ platform: "facebook", url: "https://www.facebook.com/photo/?fbid=122108355723398802", sourceCanonicalPlaceId: "opera" }],
      metadata: { source: "wroclaw-christmas route stop", fieldProductionGaps: ["video", "instagram"] },
    },
    {
      id: "polinka-cable-car-ride",
      type: "transport-ride",
      categories: ["transport", "city-view"],
      name: t("נסיעה ברכבל Polinka", "Ride Polinka across the Oder", "Przejażdżka Polinką nad Odrą", "Fahrt mit der Polinka über die Oder", "Jízda Polinkou přes Odru"),
      description: t("חצו את נהר האודר ברכבל Polinka וצפו בעיר ובנהר מזווית אחרת.", "Cross the Oder on the Polinka cable car and see the city and river from a different angle.", "Przejedź Polinką nad Odrą i zobacz miasto oraz rzekę z innej perspektywy.", "Überqueren Sie die Oder mit der Polinka und erleben Sie Stadt und Fluss aus einer anderen Perspektive.", "Přejeďte Odru lanovkou Polinka a podívejte se na město i řeku z jiné perspektivy."),
      relatedCanonicalPlaceIds: ["polinka"],
      productRefs: ["wroclaw-four-days"],
      mapPoints: [], media: null, social: [],
      metadata: { source: "wroclaw-four-days polinka stop", fieldProductionGaps: ["photos", "video"] },
    },
    {
      id: "oder-river-cruise",
      type: "river-cruise",
      categories: ["river", "transport", "sightseeing"],
      name: t("שיט על נהר האודר", "Oder River cruise", "Rejs po Odrze", "Oder-Rundfahrt", "Plavba po Odře"),
      description: t("צאו לשיט תיירותי על האודר ממרינת Piaskowa וגלו את ורוצלב מהמים.", "Take a sightseeing cruise on the Oder from Piaskowa Marina and discover Wrocław from the water.", "Wyrusz w rejs po Odrze z Przystani Piaskowej i odkryj Wrocław od strony wody.", "Starten Sie an der Piaskowa Marina zu einer Rundfahrt auf der Oder und entdecken Sie Wrocław vom Wasser aus.", "Vydejte se z přístaviště Piaskowa na vyhlídkovou plavbu po Odře a poznejte Vratislav z vody."),
      relatedCanonicalPlaceIds: ["marina"],
      productRefs: ["wroclaw-four-days"],
      mapPoints: [], media: null, social: [],
      metadata: { source: "wroclaw-four-days marina stop", seasonal: true, fieldProductionGaps: ["photos", "video"] },
    },
    {
      id: "wroclaw-multimedia-fountain-show",
      type: "outdoor-show",
      categories: ["music", "light", "water", "performance"],
      name: t("מופע המזרקה המולטימדיאלית של ורוצלב", "Wrocław Multimedia Fountain show", "Pokaz Wrocławskiej Fontanny Multimedialnej", "Show am Multimedia-Brunnen Wrocław", "Představení Vratislavské multimediální fontány"),
      description: t("צפו במופע עונתי של מים, מוזיקה ואור במזרקה המולטימדיאלית של ורוצלב.", "Watch a seasonal show of water, music and light at Wrocław's Multimedia Fountain.", "Zobacz sezonowy pokaz wody, muzyki i światła przy Wrocławskiej Fontannie Multimedialnej.", "Erleben Sie am Multimedia-Brunnen Wrocław eine saisonale Show aus Wasser, Musik und Licht.", "Zažijte sezonní představení vody, hudby a světla u Vratislavské multimediální fontány."),
      relatedCanonicalPlaceIds: ["fountain"],
      productRefs: ["wroclaw-four-days"],
      mapPoints: [], media: mediaFromPlace("fountain"), social: [],
      metadata: { source: "wroclaw-four-days fountain stop", seasonal: true },
    },
    {
      id: "wroclaw-dwarf-hunt",
      type: "urban-discovery",
      categories: ["family", "walking", "city-game"],
      name: t("מחפשים את הגמדים של ורוצלב", "Hunt for Wrocław's dwarfs", "Poszukiwanie wrocławskich krasnali", "Auf der Suche nach Breslaus Zwergen", "Hledání vratislavských trpaslíků"),
      description: t("הפכו את מרכז העיר למשחק גילוי: בחרו כמה מהגמדים, חפשו אותם ברחובות ותנו לכל אחד להוביל אתכם לפינה אחרת.", "Turn the city centre into a discovery game: choose a few dwarfs, find them in the streets and let each one lead you to another corner of Wrocław.", "Zamień centrum miasta w grę: wybierz kilka krasnali, odnajdź je na ulicach i pozwól, by każdy poprowadził Cię do innego zakątka Wrocławia.", "Machen Sie die Innenstadt zum Entdeckungsspiel: Wählen Sie einige Zwerge, finden Sie sie in den Straßen und lassen Sie sich von jedem in eine andere Ecke Wrocławs führen.", "Proměňte centrum města v objevovací hru: vyberte si několik trpaslíků, najděte je v ulicích a nechte se každým zavést do jiné části Vratislavi."),
      relatedCanonicalPlaceIds: ["dwarf-info"],
      productRefs: ["wroclaw-four-days"],
      mapPoints: [], media: mediaFromPlace("dwarf-info"), social: [],
      metadata: { source: "wroclaw-four-days dwarf-info stop", scope: "city-wide" },
    },
    {
      id: "summer-bathing-and-relaxation",
      type: "seasonal-recreation",
      categories: ["swimming", "summer", "family", "relaxation", "outdoor"],
      name: t("רחצה ומנוחה קיצית במורסקיה אוקו", "Summer bathing and relaxation at Morskie Oko", "Letnie kąpiele i odpoczynek na Morskim Oku", "Sommerbad und Erholung am Morskie Oko", "Letní koupání a odpočinek u Morskie Oko"),
      description: t("בלו יום קיץ רגוע של רחצה, שמש ומנוחה במתחם מורסקיה אוקו בוורוצלב.", "Spend a relaxed summer visit swimming, resting and enjoying the outdoors at Wrocław's Morskie Oko bathing area.", "Spędź spokojny letni czas na kąpieli i odpoczynku na świeżym powietrzu w kąpielisku Morskie Oko.", "Verbringen Sie einen entspannten Sommertag mit Baden und Erholung im Freien am Morskie Oko in Wrocław.", "Užijte si klidný letní den koupáním a odpočinkem venku v areálu Morskie Oko ve Vratislavi."),
      relatedCanonicalPlaceIds: ["morskie-oko-wroclaw"],
      productRefs: ["wroclaw-four-days"],
      mapPoints: [], media: mediaFromPlace("morskie-oko-wroclaw"), social: [],
      metadata: { source: "CanonicalPlace.experiences[]", seasonal: true, season: "summer" },
    },
    {
      id: "underground-wwii-tunnels",
      type: "underground-heritage-visit",
      categories: ["history", "wwii", "underground", "immersive"],
      name: t("המנהרות התת־קרקעיות מתקופת מלחמת העולם השנייה בקשונז׳", "Książ underground WWII tunnels", "Podziemia z okresu II wojny światowej w Książu", "Unterirdische Tunnel aus dem Zweiten Weltkrieg in Książ", "Podzemní tunely z druhé světové války v Książi"),
      description: t("חוויית ביקור במסלול התת־קרקעי שמתחת לטירת קשונז׳, עם מעברים צרים, מדרגות ומשטחים לא אחידים.", "Experience the underground visitor route beneath Książ Castle, including narrow passages, stairs and uneven surfaces.", "Poznaj podziemną trasę pod Zamkiem Książ, obejmującą wąskie przejścia, schody i nierówne nawierzchnie.", "Erleben Sie die unterirdische Besucherroute unter Schloss Książ mit engen Passagen, Treppen und unebenen Flächen.", "Projděte návštěvnickou trasu pod zámkem Książ s úzkými průchody, schody a nerovnými povrchy."),
      relatedCanonicalPlaceIds: ["ksiaz-castle"],
      productRefs: ["lower-silesia-excursions"],
      mapPoints: [], media: null, social: [],
      metadata: { source: "CanonicalPlace.experiences[]", accessibility: "limited", fieldProductionGaps: ["tunnel-specific photos", "video"] },
    },
    {
      id: "wroclaw-prague-public-transport",
      type: "cross-border-public-transport-journey",
      categories: ["public-transport", "cross-border", "personal-story"],
      name: t("שיר שחלמתי על פראג", "A Song I Dreamed About Prague", "Piosenka, w której śniłem o Pradze", "Ein Lied, in dem ich von Prag träumte", "Píseň, ve které se mi zdálo o Praze"),
      description: t(
        "אחד הדברים שאני אוהב בוורוצלב הוא שלא תמיד צריך להישאר בוורוצלב. בבוקר יוצאים מהעיר, חוצים את הגבול לצ׳כיה, ממשיכים בתחבורה ציבורית — וכעבור כמה שעות מוצאים את עצמנו בפראג. לא נסענו הפעם כדי להכין מדריך לפראג. יש מספיק כאלה. עניין אותי דווקא המסע עצמו: כמה פשוט לקחת יום אחד בוורוצלב ולהפוך אותו ליום במדינה אחרת. המעבר מפולין לצ׳כיה כמעט בלתי מורגש. בדרך רואים את הגבול, מחליפים אמצעי תחבורה, קונים כרטיס ב־50 קרונות, ופתאום מגיעים לעיר אחרת לגמרי. שתינו קפה, הסתובבנו קצת במרכז פראג, וחזרנו. מבחינתי זאת עוד דרך להבין את ורוצלב: לא רק לפי מה שיש בתוכה, אלא גם לפי כל המקומות שאפשר להגיע אליהם ממנה. שיר שחלמתי על פראג. ויצאתי אליו מוורוצלב.",
        "One of the things I love about Wrocław is that you do not always have to stay in Wrocław. We left the city in the morning, crossed into Czechia and continued by public transport; a few hours later, we found ourselves in Prague. We did not go to make another Prague guide. There are enough of those. What interested me was the journey itself: how easily one day in Wrocław can become a day in another country. The move from Poland to Czechia was almost imperceptible. We saw the border, changed transport, bought a 50-koruna ticket and suddenly arrived in a completely different city. We drank coffee, wandered through central Prague for a while and returned. For me, this is another way to understand Wrocław: not only through what lies inside it, but through all the places it lets you reach. A song I dreamed about Prague—and I set out toward it from Wrocław.",
        "Jedną z rzeczy, które kocham we Wrocławiu, jest to, że nie zawsze trzeba w nim zostać. Rano wyjechaliśmy z miasta, przekroczyliśmy granicę z Czechami i ruszyliśmy dalej transportem publicznym; kilka godzin później znaleźliśmy się w Pradze. Nie pojechaliśmy tam, by tworzyć kolejny przewodnik po Pradze. Takich jest już dość. Interesowała mnie sama podróż: jak łatwo jeden dzień we Wrocławiu może stać się dniem w innym kraju. Przejście z Polski do Czech było prawie niezauważalne. Zobaczyliśmy granicę, zmieniliśmy środek transportu, kupiliśmy bilet za 50 koron i nagle znaleźliśmy się w zupełnie innym mieście. Wypiliśmy kawę, pospacerowaliśmy po centrum Pragi i wróciliśmy. Dla mnie to kolejny sposób rozumienia Wrocławia: nie tylko przez to, co jest w nim, ale też przez wszystkie miejsca, do których można z niego dotrzeć. Piosenka, w której śniłem o Pradze. I wyruszyłem do niej z Wrocławia.",
        "Was ich an Wrocław liebe: Man muss nicht immer in Wrocław bleiben. Morgens verließen wir die Stadt, überquerten die Grenze nach Tschechien und fuhren mit öffentlichen Verkehrsmitteln weiter; einige Stunden später waren wir in Prag. Wir fuhren nicht hin, um noch einen Prag-Reiseführer zu schreiben. Davon gibt es genug. Mich interessierte die Reise selbst: wie leicht aus einem Tag in Wrocław ein Tag in einem anderen Land werden kann. Der Übergang von Polen nach Tschechien war beinahe unmerklich. Wir sahen die Grenze, stiegen um, kauften eine Fahrkarte für 50 Kronen und befanden uns plötzlich in einer völlig anderen Stadt. Wir tranken Kaffee, schlenderten ein wenig durch das Prager Zentrum und kehrten zurück. Für mich ist das eine weitere Art, Wrocław zu verstehen: nicht nur durch das, was in der Stadt liegt, sondern auch durch all die Orte, die man von hier erreichen kann. Ein Lied, in dem ich von Prag träumte. Und von Wrocław aus brach ich dorthin auf.",
        "Na Vratislavi mám rád i to, že v ní člověk nemusí vždy zůstat. Ráno jsme vyjeli z města, překročili hranici do Česka a pokračovali veřejnou dopravou; o několik hodin později jsme se ocitli v Praze. Nejeli jsme tam vytvářet dalšího průvodce po Praze. Těch je dost. Zajímala mě samotná cesta: jak snadno lze jeden den ve Vratislavi proměnit v den v jiné zemi. Přechod z Polska do Česka byl téměř neznatelný. Viděli jsme hranici, přestoupili, koupili jízdenku za 50 korun a najednou dorazili do úplně jiného města. Dali jsme si kávu, chvíli se procházeli centrem Prahy a vrátili se. Pro mě je to další způsob, jak Vratislavi porozumět: nejen podle toho, co je uvnitř, ale i podle všech míst, kam se z ní dá dostat. Píseň, ve které se mi zdálo o Praze. A vydal jsem se za ní z Vratislavi."
      ),
      relatedCanonicalPlaceIds: [],
      productRefs: [],
      mapPoints: [],
      origin: { city: "Wrocław", countryCode: "PL" },
      destination: { city: "Prague", localName: "Praha", countryCode: "CZ" },
      media: {
        hero: { src: "/assets/experiences/prague/IMG_5399.JPG" },
        images: ["/assets/experiences/prague/IMG_5394.JPG", "/assets/experiences/prague/IMG_5399.JPG", "/assets/experiences/prague/IMG_5404.JPG", "/assets/experiences/prague/IMG_5412.PNG", "/assets/experiences/prague/IMG_5414.JPG", "/assets/experiences/prague/IMG_5423.JPG", "/assets/experiences/prague/IMG_5425.JPG", "/assets/experiences/prague/IMG_5428.JPG", "/assets/experiences/prague/IMG_5430.JPG", "/assets/experiences/prague/IMG_5431.JPG", "/assets/experiences/prague/IMG_5436.JPG", "/assets/experiences/prague/IMG_5441.JPG"],
        videos: ["/assets/experiences/prague/IMG_5406.mp4", "/assets/experiences/prague/IMG_5407.mp4", "/assets/experiences/prague/IMG_5409.mp4", "/assets/experiences/prague/IMG_5410.mp4", "/assets/experiences/prague/IMG_5411.mp4", "/assets/experiences/prague/IMG_5415.mp4", "/assets/experiences/prague/IMG_5416.mp4", "/assets/experiences/prague/IMG_5418.mp4"],
      },
      social: [],
      metadata: { source: "Travel to Prague", voice: "first-person", reviewedAssetCount: 31, selectedImageCount: 12, selectedVideoCount: 8 },
    },
    {
      id: "wroclaw-tram-ride",
      type: "urban-public-transport-ride",
      categories: ["public-transport", "local-life", "city-view"],
      name: t("נסיעה בטראם בוורוצלב", "Ride a tram in Wrocław", "Przejażdżka tramwajem po Wrocławiu", "Straßenbahnfahrt durch Wrocław", "Jízda tramvají po Vratislavi"),
      description: t("עלו על טראם וראו את ורוצלב בתנועה, בקצב שבו תושבי העיר עוברים בין המרכז, הנהר והשכונות.", "Ride through Wrocław as residents do, watching the city move between its centre, river and neighbourhoods from the tram.", "Przejedź się po Wrocławiu jak jego mieszkańcy i obserwuj z tramwaju, jak miasto zmienia się między centrum, rzeką i dzielnicami.", "Fahren Sie wie die Bewohner durch Wrocław und beobachten Sie aus der Straßenbahn, wie sich die Stadt zwischen Zentrum, Fluss und Vierteln verändert.", "Projeďte se Vratislaví jako místní a sledujte z tramvaje, jak se město proměňuje mezi centrem, řekou a čtvrtěmi."),
      relatedCanonicalPlaceIds: [],
      productRefs: [],
      mapPoints: [], media: null, social: [],
      metadata: { source: "independent experience informed by Four Days Day 3 tip", fieldProductionGaps: ["photos", "video"] },
    },
  ];

  const byId = Object.freeze(Object.fromEntries(experiences.map((experience) => [experience.id, Object.freeze(experience)])));
  const getExperience = (id) => byId[id] || null;
  const forProduct = (productId) => experiences.filter((experience) => experience.productRefs.includes(productId));
  const attachReference = (record, experienceId) => ({ ...record, canonicalExperienceId: getExperience(experienceId) ? experienceId : null });
  const resolveMedia = (experienceOrId) => {
    const experience = typeof experienceOrId === "string" ? getExperience(experienceOrId) : experienceOrId;
    if (!experience) return { images: [], videos: [], social: [] };
    const images = [...(experience.media?.images || [])];
    const videos = [...(experience.media?.videos || [])];
    const social = [...(experience.social || [])];
    for (const placeId of experience.media?.inheritFromCanonicalPlaceIds || []) {
      const place = window.WROC_CATALOG?.getPlace?.(placeId);
      images.push(...(place?.media?.photos || []));
      videos.push(...(place?.media?.videos || []));
      if (experience.media?.inheritSocial) {
        social.push(...(place?.socialPosts || []).map((post) => ({ ...post, sourceCanonicalPlaceId: placeId })));
      }
    }
    return { images: [...new Set(images)], videos: [...new Set(videos)], social };
  };

  window.WROC_EXPERIENCE_CATALOG = Object.freeze({
    version: 1,
    experiences: Object.freeze(experiences),
    byId,
    getExperience,
    forProduct,
    attachReference,
    resolveMedia,
  });
})();
