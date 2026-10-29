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
  "id": "street-art-nadodrze-olbin",
  "type": "area-exploration",
  "categories": [
    "street-art"
  ],
  "name": {
    "he": "אמנות רחוב בנדודז׳ה ואולבין",
    "en": "Street art in Nadodrze and Ołbin",
    "pl": "Street art na Nadodrzu i Ołbinie",
    "de": "Street Art in Nadodrze und Ołbin",
    "cs": "Street art v Nadodrze a Ołbinu"
  },
  "description": {
    "he": "חוויית שיטוט בשכונות ולא כתובת יחידה; הפעילו את המסנן ובחרו אזור להתחיל ממנו.",
    "en": "A neighbourhood exploration rather than one address; use the filter and choose an area to begin.",
    "pl": "Spacer po dzielnicach, a nie jeden adres; użyj filtra i wybierz obszar startowy.",
    "de": "Ein Streifzug durch Viertel statt einer einzelnen Adresse; Filter wählen und ein Startgebiet aussuchen.",
    "cs": "Průzkum čtvrtí, nikoli jedna adresa; použijte filtr a vyberte si výchozí oblast."
  },
  "relatedCanonicalPlaceIds": [],
  "productRefs": [
    "cultural-adventure"
  ],
  "mapPoints": [
    {
      "id": "nadodrze",
      "coordinates": [
        51.1192,
        17.0325
      ],
      "label": "Nadodrze",
      "name": {
        "he": "נדאודז׳ה",
        "en": "Nadodrze",
        "pl": "Nadodrze",
        "de": "Nadodrze",
        "cs": "Nadodrze"
      },
      "aliases": [
        "Nadodrze",
        "Nadodje",
        "נדאודזה",
        "נדאודז׳ה",
        "נדודז׳ה"
      ],
      "description": {
        "he": "שכונה מצפון לעיר העתיקה, עם בתי מגורים היסטוריים, סדנאות, חצרות ואמנות ברחוב. בגלריה שלנו חזית הספרייה העירונית, שעליה צוירו מדפי ספרים. זהו פרט מתוך שיטוט בשכונה, ולא תיעוד של החצרות הצבעוניות. התחשבו בדיירים והיכנסו לחצרות רק היכן שהגישה מותרת.",
        "en": "A neighbourhood north of the Old Town, with historic tenements, workshops, courtyards and art in the streets. Our gallery shows the municipal library facade painted with bookshelves. It is a detail from a neighbourhood walk, not footage of the Colourful Courtyards. Respect residents and enter courtyards only where access is permitted.",
        "pl": "Osiedle na północ od Starego Miasta, z historycznymi kamienicami, pracowniami, podwórkami i sztuką na ulicach. Nasza galeria pokazuje fasadę biblioteki miejskiej ozdobioną malowanymi regałami książek. To detal ze spaceru po osiedlu, a nie dokumentacja Kolorowych Podwórek. Uszanuj mieszkańców i wchodź na podwórza tylko tam, gdzie dostęp jest dozwolony.",
        "de": "Ein Viertel nördlich der Altstadt mit historischen Mietshäusern, Werkstätten, Innenhöfen und Kunst im Straßenraum. Unsere Galerie zeigt die mit Bücherregalen bemalte Fassade der Stadtbibliothek. Sie dokumentiert ein Detail eines Viertelspaziergangs, nicht die Bunten Innenhöfe. Nehmen Sie Rücksicht auf Bewohner und betreten Sie Höfe nur bei erlaubtem Zugang.",
        "cs": "Čtvrť severně od Starého Města s historickými činžovními domy, dílnami, dvory a uměním v ulicích. Naše galerie ukazuje průčelí městské knihovny s namalovanými policemi knih. Jde o detail z procházky čtvrtí, nikoli o záběry Barevných dvorků. Respektujte obyvatele a vstupujte do dvorů jen tam, kde je to dovoleno."
      },
      "media": {
        "thumbnail": "/assets/experiences/nadodrze/nadodrze-library-facade.jpg",
        "photos": [
          "/assets/experiences/nadodrze/nadodrze-library-facade.jpg"
        ],
        "videos": [
          "https://youtube.com/shorts/tLQTKvqj7H0"
        ],
        "metadata": {
          "/assets/experiences/nadodrze/nadodrze-library-facade.jpg": {
            "original": true,
            "sourceFile": "WhatsApp Image 2026-10-01 at 09.20.30 (1).jpeg",
            "sourceSHA256": "261c6e974edbea8d2bb3b739af43ef4118b6d3b4489767dfd8ce126899586265",
            "alt": {
              "he": "חזית הספרייה עם ציורי מדפי ספרים בשכונת נדאודז׳ה",
              "en": "Library facade painted with bookshelves in Nadodrze",
              "pl": "Fasada biblioteki z malowanymi regałami na Nadodrzu",
              "de": "Bibliotheksfassade mit gemalten Bücherregalen in Nadodrze",
              "cs": "Průčelí knihovny s namalovanými policemi v Nadodrze"
            }
          },
          "https://youtube.com/shorts/tLQTKvqj7H0": {
            "original": true,
            "sourceSHA256": "92b8df0d5cf974786047562e9d779ffa03151b223b404b287537f9c530de94ef",
            "publicationSHA256": "3d512a2880b7e2f3fe51ae1e93cd52855b8004bf23ce086219ceb1dc569da24d",
            "audio": "Removed from publication copy; original preserved",
            "status": "public",
            "verifiedAt": "2026-10-18"
          }
        }
      },
      "social": [
  {
    "platform": "facebook",
    "language": "en",
    "url": "https://facebook.com/permalink.php?story_fbid=pfbid02VrJHkQfRNTqHvAXfsAzJHfUukbWXH28SR8gyxV7nR2TkaZjKXHo23nxLCejPk98Al&id=61595036942289",
    "verifiedAt": "2026-10-19T07:40:38.438Z"
  },
  {
    "platform": "instagram",
    "language": "en",
    "url": "https://www.instagram.com/wroclaw.lowersilesia/p/DeqvdJ0FXDK/",
    "verifiedAt": "2026-10-19T07:40:56.160Z"
  },
  {
    "platform": "facebook",
    "language": "he",
    "url": "https://facebook.com/permalink.php?story_fbid=pfbid027xWhszMqDaVprsSAYVzVp6923ojAApT1vjFbenbs8dhnACN4ZKTc8N296gMX6EFZl&id=61591964083308",
    "verifiedAt": "2026-10-19T07:49:40.472Z"
  },
  {
    "platform": "instagram",
    "language": "he",
    "url": "https://www.instagram.com/p/Deqwh2ejGOC/",
    "verifiedAt": "2026-10-19T07:49:49.594Z"
  },
  {
    "platform": "facebook",
    "language": "pl",
    "url": "https://facebook.com/permalink.php?story_fbid=pfbid0Z4B8ka7ztSyo88ngmpqxpFaznF7yx7iZPYqZ3UpX3mSsJDj6NKkNkzZy2t3GdTvdl&id=61595207664875",
    "verifiedAt": "2026-10-19T07:57:40.275Z"
  },
  {
    "platform": "instagram",
    "language": "pl",
    "url": "https://www.instagram.com/p/DeqxeNnDgGz/",
    "verifiedAt": "2026-10-19T07:57:41.641Z"
  },
  {
    "platform": "facebook",
    "language": "de",
    "url": "https://facebook.com/permalink.php?story_fbid=pfbid02XRALF2bumvwwBabMWgAAjeHS6uCLzqBMgVE1jLTJRnGH62jwnL8jbVCvzUEyXv8vl&id=61595239823399",
    "verifiedAt": "2026-10-19T08:02:48.455Z"
  },
  {
    "platform": "instagram",
    "language": "de",
    "url": "https://www.instagram.com/p/DeqyESNjuyI/",
    "verifiedAt": "2026-10-19T08:02:49.524Z"
  },
  {
    "platform": "facebook",
    "language": "cs",
    "url": "https://facebook.com/permalink.php?story_fbid=pfbid02FohbQi6UfKJ6P7TKXMKr4Xu2dZ4bgUBySrzdiUHgKwQLNuHpzszLpyfwNarxd7LEl&id=61594716405964",
    "verifiedAt": "2026-10-19T08:07:09.292Z"
  },
  {
    "platform": "instagram",
    "language": "cs",
    "url": "https://www.instagram.com/p/DeqylUrDJLM/",
    "verifiedAt": "2026-10-19T08:07:10.405Z"
  }
],
      "links": {
        "socialProfileFallback": false
      },
      "metadata": {
        "scope": "Nadodrze area only; not Olbin or Colourful Courtyards",
        "sourceAddress": "Łokietka13, Wrocław",
        "provenanceFile": "/data/nadodrze-media-provenance.json"
      }
    },
    {
      "id": "olbin",
      "coordinates": [
        51.119,
        17.05
      ],
      "label": "Ołbin"
    }
  ],
  "media": null,
  "social": [],
  "metadata": {
    "source": "WROC_CULTURAL_EXPERIENCES",
    "fieldProductionGaps": [
      "olbin-photos",
      "olbin-video"
    ],
    "nadodrzeEnrichment": "Existing nadodrze mapPoint enriched without creating a Place or pin"
  },
  "aliases": [
    "Nadodrze",
    "Nadodje",
    "Ołbin",
    "Olbin",
    "נדאודזה",
    "נדאודז׳ה",
    "נדודז׳ה",
    "אולבין"
  ]
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
      description: t("המזרקה המולטימדיאלית ליד היכל המאה מתכננת ערב סיום עונה בשבת, 24 באוקטובר. שני מחזורים יתחילו ב־18:00 וב־20:00, כ־70 דקות כל אחד, והכניסה חופשית. זהו אירוע עתידי. לאחר סיום העונה אין להסתמך על שעות הקיץ; העונה הבאה מתוכננת לאביב 2027.", "The Multimedia Fountain beside Centennial Hall plans its season finale for Saturday 24 October. Two rounds start at 18:00 and 20:00, about 70 minutes each, with free admission. This is an upcoming event. Summer show times should not be used after the season ends; the next season is planned for spring 2027.", "Fontanna Multimedialna przy Hali Stulecia planuje finał sezonu na sobotę 24 października. Dwie tury rozpoczną się o 18:00 i 20:00; każda potrwa około 70 minut. Wstęp wolny. To wydarzenie przyszłe. Po zakończeniu sezonu nie należy korzystać z letnich godzin pokazów; kolejny sezon jest planowany na wiosnę 2027.", "Der Multimedia-Brunnen an der Jahrhunderthalle plant sein Saisonfinale für Samstag, 24. Oktober. Zwei Durchgänge beginnen um 18:00 und 20:00 Uhr, jeweils etwa 70 Minuten. Der Eintritt ist frei. Die Veranstaltung steht noch bevor. Nach Saisonende gelten die Sommerzeiten nicht mehr; die nächste Saison ist für Frühjahr 2027 geplant.", "Multimediální fontána u Haly století plánuje finále sezony na sobotu 24. října. Dva bloky začnou v 18:00 a 20:00, každý potrvá asi 70 minut. Vstup je zdarma. Jde o budoucí akci. Po skončení sezony neplatí letní časy představení; další sezona je plánována na jaro 2027."),
      relatedCanonicalPlaceIds: ["fountain"],
      productRefs: ["wroclaw-four-days"],
      mapPoints: [], media: mediaFromPlace("fountain"), social: [],
      metadata: { source: "wroclaw-four-days fountain stop", seasonal: true, seasonEndDate: "2026-10-24", verifiedAt: "2026-10-19", sourceUrl: "https://www.wroclaw.pl/dla-mieszkanca/fontanna-multimedialna-wroclaw-noc-pokazow-zakonczenie-sezonu-harmonogram", finale: { status: "announced", startDate: "2026-10-24", endDate: "2026-10-24", times: ["18:00", "20:00"], durationMinutes: 70, admission: "free" } },
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
      mapPoints: [],
      media: {
        hero: { src: "/assets/ksiaz-castle-13.jpg" },
        images: ["/assets/ksiaz-castle-12.jpg", "/assets/ksiaz-castle-13.jpg"],
        videos: [],
      },
      social: [],
      metadata: {
        source: "CanonicalPlace.experiences[]",
        sourceLibraryFolder: "Posted Already/Ksians Castle",
        accessibility: "limited",
        selectedImageCount: 2,
        selectedVideoCount: 0,
        fieldProductionGaps: ["video"],
      },
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
      mapPoints: [],
      media: {
        hero: { src: "/assets/experiences/tram/IMG_4629.jpg" },
        images: [
          "/assets/experiences/tram/IMG_4019.jpg",
          "/assets/experiences/tram/IMG_4373.jpg",
          "/assets/experiences/tram/IMG_4374.jpg",
          "/assets/experiences/tram/IMG_4409.jpg",
          "/assets/experiences/tram/IMG_4416.jpg",
          "/assets/experiences/tram/IMG_4438.jpg",
          "/assets/experiences/tram/IMG_4474.jpg",
          "/assets/experiences/tram/IMG_4629.jpg",
          "/assets/experiences/tram/IMG_4653.jpg",
          "/assets/experiences/tram/IMG_4656.jpg",
          "/assets/experiences/tram/IMG_4723.jpg",
          "/assets/experiences/tram/IMG_4728.jpg",
          "/assets/experiences/tram/IMG_4941.jpg",
        ],
        videos: [
          "/assets/experiences/tram/IMG_4371.mp4",
          "/assets/experiences/tram/IMG_4434.mp4",
          "/assets/experiences/tram/IMG_4722.mp4",
          "/assets/experiences/tram/IMG_4725.mp4",
        ],
      },
      social: [],
      metadata: {
        source: "independent experience informed by Four Days Day 3 tip",
        sourceLibraryFolder: "Posted Already/The tram",
        reviewedAssetCount: 24,
        selectedImageCount: 13,
        selectedVideoCount: 4,
      },
    },
  ];


  // New public experience pages reuse existing canonical Place identities.
  const dwarfHunt = experiences.find(e => e.id === "wroclaw-dwarf-hunt");
  dwarfHunt.relatedCanonicalPlaceIds = ["papa", "dwarf-info", "mostek-pokutnic-wroclaw"];
  dwarfHunt.media = { hero: { canonicalPlaceId: "papa", photoIndex: 0 }, inheritFromCanonicalPlaceIds: ["papa", "dwarf-info", "mostek-pokutnic-wroclaw"], inheritSocial: true };
  dwarfHunt.metadata.sourceLibraryFolders = ["Gnomes", "פפה קרסנל", "מרכז המידע על הגמדים"];
  dwarfHunt.description = t("יוצאים לחפש את הגמדים ברחובות העיר. מתחילים בפאפא קרסנל, מציצים במרכז המידע על הגמדים וממשיכים לגלות דמויות קטנות בין הכיכרות והסמטאות. בגלריה תיעוד עשיר מהביקורים שלנו, ובהדרכה הסיפור שמאחורי הדמויות. התמונות הן אוסף עירוני, ולא כולן צולמו ליד המקומות המסומנים.", "Explore the city through its dwarfs. Begin with Papa Krasnal, visit the dwarf information centre and keep looking between squares and lanes. Browse our citywide visit collection and the guide explaining the story. Gallery images are not all located at the marked places.", "Odkrywaj miasto tropem krasnali. Zacznij od Papy Krasnala, zajrzyj do centrum informacji i szukaj kolejnych postaci na placach i uliczkach. Nasza galeria obejmuje różne miejsca w mieście, nie tylko zaznaczone punkty. Przewodnik opowiada historię krasnali.", "Entdecken Sie die Stadt auf den Spuren der Zwerge. Beginnen Sie bei Papa Krasnal, besuchen Sie das Informationszentrum und suchen Sie weiter auf Plätzen und in Gassen. Unsere stadtweite Sammlung zeigt nicht nur die markierten Orte. Der Reiseführer erzählt die Geschichte dahinter.", "Objevujte město po stopách trpaslíků. Začněte u Papy Krasnala, navštivte informační centrum a pokračujte náměstími a uličkami. Galerie zachycuje různá místa ve městě, nejen označené body. Průvodce vysvětluje příběh postaviček.");
  const bridgeNote = t("אפשר להמשיך גם לגשר המכשפות ולחפש שם את טקלה ומרטינקה; העלייה כרוכה במדרגות ובכניסה לפי תנאי המקום.", "Continue to the Witches’ Bridge to look for Tekla and Martynka; the ascent involves stairs and the venue’s admission conditions.", "Można też wejść na Mostek Pokutnic i poszukać Tekli oraz Martynki; wejście prowadzi schodami i podlega zasadom obiektu.", "Auch die Hexenbrücke mit Tekla und Martynka gehört zur Suche; der Aufstieg führt über Treppen und unterliegt den Eintrittsbedingungen vor Ort.", "Přidat lze také Most čarodějnic s Teklou a Martynkou; výstup vede po schodech a platí podmínky vstupu do objektu.");
  dwarfHunt.description = Object.fromEntries(["he","en","pl","de","cs"].map(lang => [lang, dwarfHunt.description[lang] + "\n" + bridgeNote[lang]]));
  const tramRide = experiences.find(e => e.id === "wroclaw-tram-ride");
  tramRide.media.images = tramRide.media.images.filter(src => !/IMG_(4409|4474|4728|4374|4653)\.jpg$/.test(src));
  tramRide.metadata.selectedImageCount = tramRide.media.images.length;
  tramRide.metadata.excludedPersonalImages = ["IMG_4409.JPG", "IMG_4474.JPG", "IMG_4728.JPG"];
  tramRide.metadata.nearDuplicateImages = ["IMG_4374.JPG", "IMG_4653.JPG"];
  tramRide.media.guideVideos = {};
  const streetAreas = experiences.find(e => e.id === "street-art-nadodrze-olbin");
  const refreshedNadodrze=streetAreas.mapPoints.find(p=>p.id==="nadodrze");
  const muralSource="/assets/experiences/nadodrze-walk/visit-15.jpg";
  if(!refreshedNadodrze.media.photos.includes(muralSource))refreshedNadodrze.media.photos.push(muralSource);
  refreshedNadodrze.media.metadata[muralSource]={"sourceFile": "Nadodje/WhatsApp Image 2026-10-19 at 08.41.54 (4).jpeg", "sourceSHA256": "f4c06bb82b4da6e8f9da66601cf1d1d63318b20335d671902d26342ead8ca671", "assetSHA256": "f88c88d18e82083942b0bad835ac169896043c05e20d581b7585a0fa7970b1d9", "reusedExistingAsset": true, "originalFullPicturePreserved": true, "familyForeground": false, "factualSource": "https://www.wroclaw.pl/dla-mieszkanca/murale-wroclaw-mapa", "verifiedAt": "2026-10-20T20:30:21.488031+00:00", "alt": {"he": "ציור קיר של הסופר מארק קרייבסקי בנדאודז׳ה", "en": "Marek Krajewski mural in Nadodrze", "pl": "Mural Marka Krajewskiego na Nadodrzu", "de": "Marek-Krajewski-Wandbild in Nadodrze", "cs": "Nástěnná malba Marka Krajewského na Nadodrzu"}};
  const muralCopy={"he": "בגלריה גם ציור הקיר של הסופר מארק קרייבסקי.\nJedności Narodowej 42/44A", "en": "The gallery also includes the mural of writer Marek Krajewski at Jedności Narodowej 42/44A.", "pl": "W galerii jest też mural pisarza Marka Krajewskiego przy Jedności Narodowej 42/44A.", "de": "Die Galerie zeigt auch das Wandbild des Schriftstellers Marek Krajewski an der Jedności Narodowej 42/44A.", "cs": "Galerie obsahuje také nástěnnou malbu spisovatele Marka Krajewského na adrese Jedności Narodowej 42/44A."};
  for(const lang of Object.keys(muralCopy))refreshedNadodrze.description[lang]+=" "+muralCopy[lang];

  streetAreas.metadata.childExperienceIds = ["nadodrze-neighbourhood-walk"];
  const n = streetAreas.mapPoints.find(p => p.id === "nadodrze");
  const o = streetAreas.mapPoints.find(p => p.id === "olbin");
  experiences.push(
    {
      id: "beach-bars-and-waterside-summer", type: "seasonal-leisure", categories: ["summer", "water", "beach-bars"],
      name: t("ביץ׳ ברים וקיץ ליד המים", "Beach bars and summer by the water", "Beach bary i lato nad wodą", "Beachbars und Sommer am Wasser", "Plážové bary a léto u vody"),
      description: t("כסאות נוח, חול, נוף לנהר ועצירה לאוכל או למשקה. חוויה קיצית ברחבי העיר, עם תמונות הביץ׳ ברים מהביקורים שלנו ואפשרות לשלב את מורסקיה אוקו לרחצה ולמנוחה. מורסקיה אוקו היא אתר רחצה נפרד ואינה בר על האודר. בדקו את עונת הפעילות ואת תנאי הכניסה לפני ביקור.", "Deckchairs, sand, river views and a stop for food or a drink. A citywide summer experience with our beach-bar visit photos and the option of Morskie Oko for bathing and relaxation. Morskie Oko is a separate bathing site, not an Oder beach bar. Check seasonal operation and entry conditions before visiting.", "Leżaki, piasek, widoki na rzekę i przerwa na jedzenie lub napój. Letnia przygoda w różnych częściach miasta, ze zdjęciami z naszych wizyt i możliwością odpoczynku na Morskim Oku. Morskie Oko to osobne kąpielisko, nie beach bar nad Odrą. Sprawdź sezon i warunki wejścia.", "Liegestühle, Sand, Flussblicke und eine Pause für Essen oder Getränke. Ein Sommererlebnis in verschiedenen Stadtteilen mit unseren Besuchsfotos und Morskie Oko zum Baden und Entspannen. Morskie Oko ist ein eigener Badeort, keine Oder-Beachbar. Saison und Zutrittsbedingungen vorher prüfen.", "Lehátka, písek, výhledy na řeku a zastávka na jídlo či pití. Letní zážitek v různých částech města s fotografiemi z našich návštěv a možností odpočinku na Morském Oku. Morskie Oko je samostatné koupaliště, nikoli bar na Odře. Ověřte sezonu a podmínky vstupu."),
      relatedCanonicalPlaceIds: ["morskie-oko-wroclaw"], productRefs: ["lifestyle-guide"], mapPoints: [], social: [],
      media: {hero:{src:"/assets/experiences/beach-bars/visit-43.jpg"},images:["/assets/experiences/beach-bars/visit-43.jpg","/assets/experiences/beach-bars/visit-37.jpg","/assets/experiences/beach-bars/visit-45.jpg"],videos:[],guideVideos:{},inheritFromCanonicalPlaceIds:["morskie-oko-wroclaw"],inheritSocial:true},
      metadata:{seasonal:true,season:"summer",sourceLibraryFolders:["Beach bars","מורסקי אוקו"],pendingIdentifications:["pictured riverside beach bar","bar near Biskupin","bar by the zoo"],pinPolicy:"Only verified canonical places. Unidentified bar photographs remain experience-level scenes."}
    },
    {
      id:"nadodrze-neighbourhood-walk",type:"area-exploration",categories:["neighbourhood","street-art","coffee"],
      name:t("שיטוט ברובע נדאודז׳ה", "Explore the Nadodrze neighbourhood", "Spacer po Nadodrzu", "Streifzug durch Nadodrze", "Procházka čtvrtí Nadodrze"),
      description:t("רובע אקלקטי שמגלים ברגל, בין חזיתות מעוטרות, אמנות רחוב, מעברים ופרטים קטנים מחיי הרחוב. משלבים עצירה בבית הקפה ברו ובגלידרייה רומא. הגלריה מבוססת על תיקיית הרובע ועל המקומות הקנוניים. כבדו את הדיירים והיכנסו לחצרות רק כשהגישה מותרת.", "Explore an eclectic neighbourhood on foot, with decorated facades, street art, passages and everyday street details. Stop at BRÚ and Lodziarnia Roma along the way. The gallery draws on the neighbourhood folder and existing canonical places. Respect residents and enter courtyards only where access is permitted.", "Odkrywaj pieszo eklektyczne Nadodrze: zdobione fasady, sztukę uliczną, przejścia i codzienne detale. Zatrzymaj się w BRÚ i Lodziarni Roma. Galeria korzysta z folderu dzielnicy i istniejących miejsc kanonicznych. Szanuj mieszkańców i wchodź na podwórza tylko tam, gdzie wolno.", "Erkunden Sie das vielseitige Viertel zu Fuß: verzierte Fassaden, Straßenkunst, Durchgänge und Alltagsdetails. Unterwegs bieten sich BRÚ und Lodziarnia Roma für eine Pause an. Die Galerie nutzt das Viertelarchiv und bestehende Orte. Privatsphäre respektieren und Höfe nur bei erlaubtem Zugang betreten.", "Poznejte pěšky eklektickou čtvrť: zdobené fasády, pouliční umění, průchody a každodenní detaily. Zastavte se v BRÚ a Lodziarnia Roma. Galerie využívá složku čtvrti a existující místa. Respektujte obyvatele a do dvorů vstupujte jen tam, kde je to dovoleno."),
      relatedCanonicalPlaceIds:["bru-coffee-bakehouse-wroclaw","lodziarnia-roma"],productRefs:["cultural-adventure","lifestyle-guide"],mapPoints:[n],social:[],
      media:{hero:{src:n.media.photos[0]},images:["/assets/experiences/nadodrze/nadodrze-library-facade.jpg", "/assets/experiences/nadodrze-walk/visit-01.jpg", "/assets/experiences/nadodrze-walk/visit-05.jpg", "/assets/experiences/nadodrze-walk/visit-10.jpg", "/assets/experiences/nadodrze-walk/visit-11.jpg", "/assets/experiences/nadodrze-walk/visit-12.jpg", "/assets/experiences/nadodrze-walk/visit-13.jpg", "/assets/experiences/nadodrze-walk/visit-15.jpg"],videos:[],guideVideos:{},inheritFromCanonicalPlaceIds:["bru-coffee-bakehouse-wroclaw","lodziarnia-roma"],inheritSocial:true},metadata:{sourceLibraryFolder:"Nadodje",parentExperienceId:streetAreas.id,scope:"Neighbourhood exploration, not only murals"}
    },

  );

  experiences.push({
    id: "wroclaw-milk-bars", type: "local-food-experience", categories: ["food", "local-life"],
    name: t("אוכלים במילק בארים", "Discover Wrocław milk bars", "Odkryj wrocławskie bary mleczne", "Breslaus Milchbars entdecken", "Objevte vratislavské mléčné bary"),
    description: t("שלושה מילק ברים, שלוש כתובות נפרדות: בר מיש ליד האוניברסיטה, בר מווה ברחוב דרובנרה ורוזובה קרובה ברחוב שווידניצקה. לכל מקום כרטיס משלו, ניווט ותמונות הביקור המתאימות לו.","Three milk bars at three separate addresses: Miś near the university, Mewa on Drobnera and Różowa Krowa on Świdnicka. Each has its own place card, navigation and correctly assigned visit photographs.","Trzy bary mleczne pod trzema różnymi adresami: Miś przy uniwersytecie, Mewa przy Drobnera i Różowa Krowa przy Świdnickiej. Każdy ma osobną kartę, nawigację i odpowiednio przypisane zdjęcia z wizyty.","Drei Milchbars an drei eigenen Adressen: Miś bei der Universität, Mewa an der Drobnera-Straße und Różowa Krowa an der Świdnicka-Straße. Jeder Betrieb hat eine eigene Karte, Navigation und zugeordnete Besuchsfotos.","Tři mléčné bary na třech různých adresách: Miś u univerzity, Mewa v ulici Drobnera a Różowa Krowa v ulici Świdnicka. Každý má vlastní kartu, navigaci a správně přiřazené fotografie z návštěvy."),
    relatedCanonicalPlaceIds: ["bar-mis","bar-mleczny-mewa-wroclaw","rozowa-krowa-milk-bar-wroclaw"], productRefs: ["lifestyle-guide"], mapPoints: [], social: [],
    media: {hero:{src:"/assets/experiences/milk-bars/visit-05.jpg"},images:["/assets/experiences/milk-bars/visit-02.jpg", "/assets/experiences/milk-bars/visit-03.jpg", "/assets/experiences/milk-bars/visit-04.jpg", "/assets/experiences/milk-bars/visit-05.jpg", "/assets/experiences/milk-bars/visit-07.jpg"],videos:[],guideVideos:{},inheritFromCanonicalPlaceIds:["bar-mis","bar-mleczny-mewa-wroclaw","rozowa-krowa-milk-bar-wroclaw"],inheritSocial:true},
    metadata: {sourceLibraryFolder:"מילק באר",pendingMedia:["One4.10-second visit remains unidentified and unpublished; one13.65-second RóżowaKrowa visit is verified Public via inherited canonical media."],pendingCanonicalPlaces:[]}
  });

  //21October additional visit media belongs to the experience, never a guessed physicalpin.
  for(const [id,delta] of Object.entries({"wroclaw-dwarf-hunt":{"images":["/assets/today-source-refresh-20261021/09-wroclaw-dwarf-hunt.jpg","/assets/today-source-refresh-20261021/10-wroclaw-dwarf-hunt.jpg","/assets/today-source-refresh-20261021/11-wroclaw-dwarf-hunt.jpg","/assets/today-source-refresh-20261021/12-wroclaw-dwarf-hunt.jpg","/assets/today-source-refresh-20261021/13-wroclaw-dwarf-hunt.jpg"],"metadata":{"/assets/today-source-refresh-20261021/09-wroclaw-dwarf-hunt.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 13.42.35.jpeg","sourceSHA256":"9649bd243cc5f9a0eabf555bf8f641e2b56050f4fb6833a2afbe3e4740816ece","assetSHA256":"b2099e41b044e57c2dc15c65140535aafbcde30bd066959c53e3bd15de8037a0","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"גמד עם מצלמת קולנוע וגלגל הגה","en":"Dwarf with a film camera and ship wheel","pl":"Krasnal z kamerą filmową i kołem sterowym","de":"Zwerg mit Filmkamera und Steuerrad","cs":"Trpaslík s filmovou kamerou a kormidlem"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"},"/assets/today-source-refresh-20261021/10-wroclaw-dwarf-hunt.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 14.06.04.jpeg","sourceSHA256":"59249a4f432a8f5e3cba4bf1bf5c43304b7c0e59a721171720b5988fc38647b8","assetSHA256":"1bb25f31f51ac213c0b857ea838b9568610cc0a2213064a85256caf3aa91a64a","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"שני גמדים סביב כדור אבן","en":"Two dwarfs around a stone sphere","pl":"Dwa krasnale przy kamiennej kuli","de":"Zwei Zwerge an einer Steinkugel","cs":"Dva trpaslíci u kamenné koule"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"},"/assets/today-source-refresh-20261021/11-wroclaw-dwarf-hunt.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 14.06.13.jpeg","sourceSHA256":"e57c1ad0c427dc535fe4bb1330f449c4d27e28ff21bbf645fc40990a2908cbee","assetSHA256":"0ce2f19633b9052687bcbb913fb5e9fd8000dc7b2c1bfb7210363c74834adb70","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"גמד קורא עיתון","en":"Dwarf reading a newspaper","pl":"Krasnal czytający gazetę","de":"Zeitung lesender Zwerg","cs":"Trpaslík čtoucí noviny"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"},"/assets/today-source-refresh-20261021/12-wroclaw-dwarf-hunt.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 14.06.14.jpeg","sourceSHA256":"5ef8c54960ecca8bcf03c2a91e25621a318a31465ed37d8a27a710d580bf9b38","assetSHA256":"0df4583ab3b18123ceee5bfd651c003102ecdd6fda53e57a475a2a44dde95435","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"גמד מנקה ארובות עם מברשת וכדור","en":"Chimney-sweep dwarf with a brush and ball","pl":"Krasnal kominiarz ze szczotką i kulą","de":"Schornsteinfeger-Zwerg mit Bürste und Kugel","cs":"Trpaslík kominík s kartáčem a koulí"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"},"/assets/today-source-refresh-20261021/13-wroclaw-dwarf-hunt.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 14.05.51.jpeg","sourceSHA256":"72b57972538bde8e135b8cb9936a3b5b2fa2efd447a2b697378bba898ca74154","assetSHA256":"1202a0d96f381ab91014927dc695559b353fffb4a2bfc282eb25b6f90bf0ee17","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"תקריב גמד דוחף כדור אבן","en":"Close view of a dwarf pushing a stone sphere","pl":"Zbliżenie krasnala pchającego kamienną kulę","de":"Nahaufnahme eines Zwergs an einer Steinkugel","cs":"Detail trpaslíka tlačícího kamennou kouli"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"}}},"wroclaw-tram-ride":{"images":["/assets/today-source-refresh-20261021/14-wroclaw-tram-ride.jpg","/assets/today-source-refresh-20261021/15-wroclaw-tram-ride.jpg"],"metadata":{"/assets/today-source-refresh-20261021/14-wroclaw-tram-ride.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/The tram/WhatsApp Image 2026-10-21 at 13.42.36 (1).jpeg","sourceSHA256":"571c328d6753f5c5650b164d63cbab3fe72e547f0e2dfb52711bf888fadb2dbe","assetSHA256":"9be1d966dfc06cc35cc0a21ee0eb6614a133bf5386198075f059746f4d8b0193","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"מושבים ומעבר בתוך טראם בוורוצלב","en":"Seats and aisle inside a Wrocław tram","pl":"Siedzenia i przejście we wrocławskim tramwaju","de":"Sitze und Gang in einer Breslauer Straßenbahn","cs":"Sedadla a ulička ve vratislavské tramvaji"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"},"/assets/today-source-refresh-20261021/15-wroclaw-tram-ride.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/The tram/WhatsApp Image 2026-10-21 at 13.42.36 (2).jpeg","sourceSHA256":"6532915fe302918bfeb503c0927a0df350a72ccd023c5e6420b24e818710267d","assetSHA256":"d4278ba76821c620f53907fe23917cd436c9b5479b15ad5d66553e565c34e9fd","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"טראם צהוב בתחנה בוורוצלב","en":"Yellow tram at a Wrocław stop","pl":"Żółty tramwaj na przystanku we Wrocławiu","de":"Gelbe Straßenbahn an einer Breslauer Haltestelle","cs":"Žlutá tramvaj na zastávce ve Vratislavi"},"verifiedAt":"2026-10-21T11:34:21.481565+00:00"}}}})){const e=experiences.find(x=>x.id===id);e.media.images=[...new Set([...(e.media.images||[]),...delta.images])];e.metadata={...(e.metadata||{}),sourceDeltaMedia20261021:delta.metadata};}
  {const e=experiences.find(x=>x.id==="wroclaw-dwarf-hunt");const visits=[{"id":3,"canonicalOrExperienceId":"wroclaw-dwarf-hunt","source":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Video 2026-10-21 at 14.06.17.mp4","sourceSHA256":"c71d0fa41406e78f4be38e6a9ab497aabaa24b195e2322feef617fc27a64436f","uploadPath":"/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/today-source-refresh-2026-10-21/upload-visits/visit-03.mp4","uploadSHA256":"9ddbb0c132e6bea8720cca750d23e718e535cbc6538b836f7477e59f7396a83b","duration":7.166667,"audioStreams":0,"fullOriginalPicturePreserved":true,"familyException":false,"title":"Wroclaw dwarfs | Syzyfki and stone ball | Wide visit | WROC-LOVE","description":"Original full-picture silent visit footage recorded by WROC-LOVE. Explore our interactive maps: https://wroc-love.com/?lang=en","visibility":"Public","youtubeId":"8_6jLl31M0s","url":"https://www.youtube.com/watch?v=8_6jLl31M0s","reopenedPublicVerified":true,"processing":"SD complete","copyright":"No issues found","communityGuidelines":"No issues found","verifiedAt":"2026-10-21T11:56:03.747Z","evidence":"youtube-03-public-reopened.txt"},{"id":4,"canonicalOrExperienceId":"wroclaw-dwarf-hunt","source":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Video 2026-10-21 at 14.06.08 (1).mp4","sourceSHA256":"b7ce3330b32260a244c0f5f9e748b32afc8e595d6ce2ae0dfa4484766f778001","uploadPath":"/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/today-source-refresh-2026-10-21/upload-visits/visit-04.mp4","uploadSHA256":"ad7fc979f10d176923fd30fba6b360dbb5923001f5e7c5bfa027e230f6499a0b","duration":5.733333,"audioStreams":0,"fullOriginalPicturePreserved":true,"familyException":false,"title":"Wroclaw dwarfs | Syzyfek pushing a stone ball | Close visit | WROC-LOVE","description":"Original full-picture silent visit footage recorded by WROC-LOVE. Explore our interactive maps: https://wroc-love.com/?lang=en","visibility":"Public","youtubeId":"AmOhNKFSpsw","url":"https://www.youtube.com/watch?v=AmOhNKFSpsw","reopenedPublicVerified":true,"processing":"SD complete","copyright":"No issues found","communityGuidelines":"No issues found","verifiedAt":"2026-10-21T11:56:03.747Z","evidence":"youtube-04-public-reopened.txt"}];e.media.videos=[...new Set([...(e.media.videos||[]),...visits.map(v=>v.url)])];e.metadata={...(e.metadata||{}),sourceDeltaVisits20261021:visits};}

  // Vega source identity resolved by Gil; preserve the single existing milk-bar experience.
  {const e=experiences.find(x=>x.id==="wroclaw-milk-bars");const id="vega-bar-weganski-wroclaw";e.description={"he": "ארבעה מקומות, ארבע כתובות נפרדות: בר מיש ליד האוניברסיטה, בר מווה ברחוב דרובנרה, רוזובה קרובה ברחוב שווידניצקה, וגם וגה במרכז הרינק כאפשרות טבעונית. לכל מקום כרטיס משלו, ניווט ותמונות ביקור המשויכות אליו.", "en": "Four places at four separate addresses: Miś near the university, Mewa on Drobnera, Różowa Krowa on Świdnicka and Vega in the Market Square area as a vegan option. Each has its own place card, navigation and correctly assigned visit photographs.", "pl": "Cztery miejsca pod czterema różnymi adresami: Miś przy uniwersytecie, Mewa przy Drobnera, Różowa Krowa przy Świdnickiej oraz Vega przy Rynku jako wegańska propozycja. Każde ma osobną kartę, nawigację i odpowiednio przypisane zdjęcia z wizyty.", "de": "Vier Lokale an vier verschiedenen Adressen: Miś bei der Universität, Mewa an der Drobnera-Straße, Różowa Krowa an der Świdnicka-Straße und Vega am Marktplatz als vegane Option. Jeder Betrieb hat eine eigene Karte, Navigation und zugeordnete Besuchsfotos.", "cs": "Čtyři podniky na čtyřech různých adresách: Miś u univerzity, Mewa v ulici Drobnera, Różowa Krowa v ulici Świdnicka a Vega u Rynku jako veganská možnost. Každý má vlastní kartu, navigaci a správně přiřazené fotografie z návštěvy."};e.relatedCanonicalPlaceIds=[...new Set([...e.relatedCanonicalPlaceIds,id])];e.media.inheritFromCanonicalPlaceIds=[...new Set([...e.media.inheritFromCanonicalPlaceIds,id])];e.metadata={...e.metadata,pendingMedia:["Vega4.10secondvisitidentifiedbyGil;awaitingseparateYouTubededup/Terms/publication."],vegaIdentityResolution:{userIdentifiedTwoSpecificSources:true,reusedFoodPhoto:"/assets/experiences/milk-bars/visit-03.jpg",distinctVeganOption:true,existingOtherMembersPreserved:true}};}
  // Coffee experience reuses canonical identities and their current media.
  experiences.push({
  "id": "coffee-lovers-wroclaw",
  "type": "local-food-experience",
  "categories": [
    "coffee",
    "local-life"
  ],
  "name": {
    "he": "וורוצלב לאוהבי קפה",
    "en": "Wrocław for coffee lovers",
    "pl": "Wrocław dla miłośników kawy",
    "de": "Breslau für Kaffeeliebhaber",
    "cs": "Vratislav pro milovníky kávy"
  },
  "description": {
    "he": "קפה הוא סיבה טובה לצאת לגלות עוד פינה בעיר. מחכה לכם מבחר בתי קפה שכבר ביקרנו בהם, מהעיר העתיקה ונדאודז׳ה ועד לאזור הפארקים ושכונת וו־ווה. בחרו עצירה לקפה ומאפה, חצר נעימה או מקום לשבת בו בין אתרים. זו מפת אפשרויות לבחירה, לא מסלול שחייבים להספיק ביום אחד. בכל מקום תמצאו את התמונות, הסרטונים והניווט שכבר משויכים אליו. שעות ותפריטים עשויים להשתנות, ולכן כדאי לבדוק לפני הביקור.",
    "en": "Coffee is a good reason to discover another corner of the city. Explore cafés we have visited, from the Old Town and Nadodrze to the park area and the WuWA estate. Choose a coffee-and-pastry stop, a pleasant courtyard or somewhere to sit between sights. This is a collection to choose from, not a route to complete in one day. Each place brings together its own visit photos, videos and navigation. Opening hours and menus may change, so check before visiting.",
    "pl": "Kawa to dobry pretekst, by odkryć kolejny zakątek miasta. Poznaj odwiedzone przez nas kawiarnie, od Starego Miasta i Nadodrza po okolice parków i osiedle WuWA. Wybierz kawę z wypiekiem, przyjemne podwórko lub przerwę między atrakcjami. To zbiór propozycji, a nie trasa do pokonania w jeden dzień. Każde miejsce ma własne zdjęcia, filmy i nawigację. Godziny otwarcia i menu mogą się zmieniać, więc sprawdź je przed wizytą.",
    "de": "Kaffee ist ein guter Anlass, eine weitere Ecke der Stadt zu entdecken. Erkunden Sie Cafés, die wir besucht haben: von der Altstadt und Nadodrze bis zur Parklandschaft und zur WuWA-Siedlung. Wählen Sie Kaffee mit Gebäck, einen gemütlichen Innenhof oder eine Pause zwischen Sehenswürdigkeiten. Dies ist eine Auswahl, keine Route für einen einzigen Tag. Jeder Ort bietet seine eigenen Besuchsfotos, Videos und Navigation. Öffnungszeiten und Speisekarten können sich ändern; prüfen Sie sie vor dem Besuch.",
    "cs": "Káva je dobrý důvod objevit další kout města. Prozkoumejte kavárny, které jsme navštívili, od Starého Města a Nadodrze až po okolí parků a sídliště WuWA. Vyberte si kávu s pečivem, příjemný dvůr nebo zastávku mezi památkami. Jde o nabídku možností, nikoli trasu na jediný den. Každé místo má vlastní fotografie, videa a navigaci. Otevírací doba i nabídka se mohou měnit, proto je před návštěvou ověřte."
  },
  "relatedCanonicalPlaceIds": [
    "czarna-magia",
    "el-gato-odrzanska-wroclaw",
    "fc-caffe-kuznicza",
    "central",
    "charlotte",
    "gniazdo",
    "cafe-berg-wroclaw",
    "barbara-wroclaw",
    "bru-coffee-bakehouse-wroclaw",
    "central-cafe-nadodrze",
    "parrot-coffee-bema",
    "pomiedzy-cafe-bistro-wroclaw",
    "kawiarenka-sw-jadwigi",
    "mala-czarna-paderewskiego",
    "wuwa"
  ],
  "productRefs": [
    "lifestyle-guide"
  ],
  "mapPoints": [],
  "social": [],
  "media": {
    "hero": {
      "canonicalPlaceId": "czarna-magia",
      "photoIndex": 3,
      "position": "50% 78%"
    },
    "inheritFromCanonicalPlaceIds": [
      "czarna-magia",
      "el-gato-odrzanska-wroclaw",
      "fc-caffe-kuznicza",
      "central",
      "charlotte",
      "gniazdo",
      "cafe-berg-wroclaw",
      "barbara-wroclaw",
      "bru-coffee-bakehouse-wroclaw",
      "central-cafe-nadodrze",
      "parrot-coffee-bema",
      "pomiedzy-cafe-bistro-wroclaw",
      "kawiarenka-sw-jadwigi",
      "mala-czarna-paderewskiego",
      "wuwa"
    ],
    "inheritSocial": true
  },
  "metadata": {
    "curatedAt": "2026-10-22",
    "scope": "Existing Wrocław city cafes with assigned original visit media; flexible collection, no compulsory day route.",
    "source": "Existing canonical place catalog and its media provenance. No new uploads or locations.",
    "userApproval": "User requested activating the previously future coffee-lovers experience on 2026-10-22."
  }
});

  // Include the user-identified café while inheriting its shared canonical media.
  {const e=experiences.find(x=>x.id==="coffee-lovers-wroclaw");if(e.relatedCanonicalPlaceIds.includes("cafe-lyk-wroclaw"))throw new Error("Duplicate cafe membership");e.relatedCanonicalPlaceIds.push("cafe-lyk-wroclaw");e.media.inheritFromCanonicalPlaceIds.push("cafe-lyk-wroclaw");}

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
    for (const point of experience.mapPoints || []) { images.push(...(point.media?.photos || [])); videos.push(...(point.media?.videos || [])); }
    const guides = [];
    if (experience.media?.guideVideos?.he || experience.media?.guideVideos?.en) guides.push({ experienceId: experience.id, editions: experience.media.guideVideos });
    for (const placeId of experience.media?.inheritFromCanonicalPlaceIds || []) {
      const editions = window.WROC_CATALOG?.getPlace(placeId)?.media?.guideVideos;
      if (editions?.he || editions?.en) guides.push({ canonicalPlaceId: placeId, editions });
    }
    return { images: [...new Set(images)], videos: [...new Set(videos)], social, guides };
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

(function(){const e=window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-dwarf-hunt");const asset="/assets/today-source-refresh-20261021/run3-45-wroclaw-dwarf-hunt.jpg";e.media.images=[...new Set([...e.media.images,asset])];e.media.metadata={...e.media.metadata,[asset]:{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 20.38.53 (10).jpeg","sourceSHA256":"96d263f258f0174defd3d3a49c1209f8090b1c9411872bdd5cd620ceca0c53ed","assetSHA256":"f08b1e166cdd6a3ea8525d8f87cb9afbaa0d4ecef36fdd8c8ecabb40dcc19be7","original":true,"originalFullPicturePreserved":true,"familyForeground":false,"familyExceptionApplied":false,"privacyClassification":"Place/detail photograph; incidental public passers-by are not posed personal portraits.","alt":{"he":"גמד אוחז מפתח, פרט מחיפוש הגמדים בעיר","en":"A dwarf holding a key, a detail from a city dwarf hunt","pl":"Krasnal z kluczem, detal z miejskich poszukiwań krasnali","de":"Zwerg mit einem Schlüssel, Detail einer Zwergensuche in der Stadt","cs":"Trpaslík s klíčem, detail z hledání trpaslíků ve městě"},"verifiedAt":"2026-10-21T17:55:35.224654+00:00","sourceRefreshRun":"2026-10-21-run3"}};})();

(()=>{const p=window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-dwarf-hunt");p.media.images.push(...["/assets/today-source-refresh-20261021/run4-080-wroclaw-dwarf-hunt.jpg", "/assets/today-source-refresh-20261021/run4-173-wroclaw-dwarf-hunt.jpg"]);Object.assign(p.media.metadata,{"/assets/today-source-refresh-20261021/run4-080-wroclaw-dwarf-hunt.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.05 (2).jpeg", "sourceSHA256": "2e8175c6331f3cc8334605508ac89f9436aaa5fe52ee0a3ea6f021d86bd0481a", "assetSHA256": "81f72c3cbdb53725248dc18a4cf5cf5fceeae7d201fd4bf7ec1eebcb94376ff0", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "גמד עם מסכות תיאטרון", "en": "Dwarf holding theatre masks", "pl": "Krasnal z maskami teatralnymi", "de": "Zwerg mit Theatermasken", "cs": "Trpaslík s divadelními maskami"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}, "/assets/today-source-refresh-20261021/run4-173-wroclaw-dwarf-hunt.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Gnomes/WhatsApp Image 2026-10-21 at 21.34.45 (2).jpeg", "sourceSHA256": "cb644d04e867615cec6dcd289795c6bdd159a528d960428794662160b33f7633", "assetSHA256": "e31bd9d534c1bc44907f89ecb079b6ed9683be4dc192f60aa048bbc42980f8c4", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "גמד מצולם במהלך חיפוש הגמדים", "en": "Dwarf photographed during our dwarf hunt", "pl": "Krasnal sfotografowany podczas poszukiwania krasnali", "de": "Zwerg auf unserer Zwergensuche fotografiert", "cs": "Trpaslík vyfotografovaný při hledání trpaslíků"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}});})();

(()=>{const p=window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-dwarf-hunt");for(const[src,m]of Object.entries(p.media.metadata))if(m.sourceRefreshRun==="2026-10-21-run4")m.familyForeground=false;})();

// The new dwarf fountain visit belongs only to the existing dwarf-hunt experience.
(function(){const e=window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-dwarf-hunt");const visits=[{"url": "https://www.youtube.com/watch?v=MuMa_Y5tpZQ", "metadata": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-21 at 21.12.27 (3).mp4", "sourceSHA256": "745ab952931a987d359b95a81ac75759ef23c195507b0742328d8c963aacd9f2", "uploadSHA256": "58e8025a82d5b2bad81888e184469892077039c4d752042b284a50c5e83e44db", "durationSeconds": 5.233333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "פרטי הגמדים במזרקה", "en": "Dwarf fountain details", "pl": "Detale krasnali przy fontannie", "de": "Details der Zwerge am Brunnen", "cs": "Detaily trpaslíků u kašny"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-161-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:47:12.146Z"}}];e.media.videos=[...new Set([...e.media.videos,...visits.map(x=>x.url)])];for(const x of visits)e.media.metadata[x.url]=x.metadata;const milk=window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-milk-bars");milk.metadata.pendingMedia.length=0;milk.metadata.vegaIdentityResolution.videoPublicUrl="https://www.youtube.com/watch?v=V1hFXIlvORA";})();

(function(){for(const m of Object.values(window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-dwarf-hunt").media.metadata))if(m.sourceRefreshRun==="2026-10-21-run4"&&m.status==="public"&&m.reopenedPublicVerified)Object.assign(m,{savedPublicVerified:true,reopenedVerified:true,originalFullPictureAndDurationPreserved:true});})();

// Preserve the explicit public-hosting proof required for direct experience visit videos.
(function(){const e=window.WROC_EXPERIENCE_CATALOG.getExperience("wroclaw-dwarf-hunt"),v={"path": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-21 at 21.12.27 (3).mp4", "bytes": 1176900, "mtimeNs": 1792606363608628200, "ctimeNs": 1792607217386430700, "birthtime": 1792606363.6080253, "change": "new-path", "folder": "Opera", "relativePath": "Opera/WhatsApp Video 2026-10-21 at 21.12.27 (3).mp4", "extension": ".mp4", "sha256": "745ab952931a987d359b95a81ac75759ef23c195507b0742328d8c963aacd9f2", "savedReferences": [], "sameHashCandidateCount": 1, "oldPathSameHash": [], "previousSamePathHash": null, "classification": "unrecorded-candidate-needs-visual-dedup", "index": 161, "state": "Exact source and silent work copy approved; awaiting exclusive UI handoff, not uploaded.", "reason": "Dwarf fountain with water flowing near Puppet Theatre; experience only, not Opera", "duration": 5.233333, "preview": "outputs/source-refresh-scan-2026-10-21-run4/video-161-0.jpg", "targetId": "wroclaw-dwarf-hunt", "sourceModified": false, "requiredAudio": "silent-visit-only", "originalFullPictureAndDuration": true, "guide": false, "publicationCompleted": false, "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/source-refresh-enrichment-2026-10-21-run4/upload-visits/run4-visit-161-wroclaw-dwarf-hunt.mp4", "uploadSHA256": "58e8025a82d5b2bad81888e184469892077039c4d752042b284a50c5e83e44db", "audioRemoved": true, "fullOriginalPictureAndDurationPreserved": true, "familyExceptionApplied": false, "title": "Wrocław dwarf hunt | Dwarf fountain details | Visit | WROC-LOVE", "description": "Original full-picture silent footage from our visit. Explore the place or experience in our interactive maps:\nhttps://wroc-love.com/?lang=en", "localizedTitle": {"he": "פרטי הגמדים במזרקה", "en": "Dwarf fountain details", "pl": "Detale krasnali przy fontannie", "de": "Details der Zwerge am Brunnen", "cs": "Detaily trpaslíků u kašny"}, "uploadOrder": 11, "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "youtubeId": "MuMa_Y5tpZQ", "url": "https://www.youtube.com/watch?v=MuMa_Y5tpZQ", "stage": "public-reopened-checks-clean", "copyright": "No issues found", "communityGuidelines": "No issues found", "reopenedPublicVerified": true, "visibility": "Public", "processing": "Standard Definition complete", "verifiedAt": "2026-10-21T20:47:12.146Z"};if(!e.metadata.sourceDeltaVisits20261021.some(x=>x.url===v.url))e.metadata.sourceDeltaVisits20261021.push(v);})();

// Full Nadodrze source-folder refresh, 2026-10-22.
(function(){const parent=window.WROC_EXPERIENCE_CATALOG.getExperience("street-art-nadodrze-olbin"),n=parent.mapPoints.find(p=>p.id==="nadodrze"),walk=window.WROC_EXPERIENCE_CATALOG.getExperience("nadodrze-neighbourhood-walk"),payload={"photos":["/assets/experiences/nadodrze/nadodrze-library-facade.jpg","/assets/experiences/nadodrze-walk/visit-01.jpg","/assets/experiences/nadodrze-walk/visit-05.jpg","/assets/experiences/nadodrze-walk/visit-10.jpg","/assets/experiences/nadodrze-walk/visit-11.jpg","/assets/experiences/nadodrze-walk/visit-12.jpg","/assets/experiences/nadodrze-walk/visit-13.jpg","/assets/experiences/nadodrze-walk/visit-15.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-02.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-07.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-10.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-12.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-15.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-26.jpg","/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-27.jpg"],"metadata":{"/assets/experiences/nadodrze/nadodrze-library-facade.jpg":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.30 (1).jpeg","sourceSHA256":"261c6e974edbea8d2bb3b739af43ef4118b6d3b4489767dfd8ce126899586265","alt":{"he":"חזית הספרייה עם מדפי הספרים המצוירים","en":"Library facade with painted bookshelves","pl":"Fasada biblioteki z malowanymi regałami","de":"Bibliotheksfassade mit gemalten Bücherregalen","cs":"Průčelí knihovny s malovanými knihovními policemi"},"assetSHA256":"262a008f8f7e2d682a59d73e19bb05187694c18146b3ca707795431799e22343","reusedExistingAsset":true,"originalFullPicturePreserved":true},"https://youtube.com/shorts/tLQTKvqj7H0":{"original":true,"sourceSHA256":"92b8df0d5cf974786047562e9d779ffa03151b223b404b287537f9c530de94ef","publicationSHA256":"3d512a2880b7e2f3fe51ae1e93cd52855b8004bf23ce086219ceb1dc569da24d","audio":"Removed from publication copy; original preserved","status":"public","verifiedAt":"2026-10-18"},"/assets/experiences/nadodrze-walk/visit-15.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.54 (4).jpeg","sourceSHA256":"f4c06bb82b4da6e8f9da66601cf1d1d63318b20335d671902d26342ead8ca671","assetSHA256":"f88c88d18e82083942b0bad835ac169896043c05e20d581b7585a0fa7970b1d9","reusedExistingAsset":true,"originalFullPicturePreserved":true,"familyForeground":false,"factualSource":"https://www.wroclaw.pl/dla-mieszkanca/murale-wroclaw-mapa","verifiedAt":"2026-10-20T20:30:21.488031+00:00","alt":{"he":"ציור הקיר של מארק קרייבסקי","en":"Marek Krajewski mural","pl":"Mural Marka Krajewskiego","de":"Marek-Krajewski-Wandbild","cs":"Nástěnná malba Marka Krajewského"}},"/assets/experiences/nadodrze-walk/visit-01.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-09-24 at 17.19.00 (2).jpeg","sourceSHA256":"24884e452e08859197f0f46b7c6653cb16d5587ee2ef5f9242baaaa2a3f0f0d6","assetSHA256":"8d8dd1a137ae29be9b9f10dc45cdcf3b4f44d40ea4f569867ef5cc913baf9bf7","reusedExistingAsset":true,"originalFullPicturePreserved":true,"alt":{"he":"ציור הקיר שער נדאודזה","en":"Gateway to Nadodrze mural","pl":"Mural Brama Nadodrza","de":"Wandbild Tor zu Nadodrze","cs":"Nástěnná malba Brána do Nadodrze"}},"/assets/experiences/nadodrze-walk/visit-11.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-05 at 18.25.00 (2).jpeg","sourceSHA256":"6cc40762df498c48a9b5ad61221aa2c06dc0edef367c8267f440c03c120c799a","assetSHA256":"84a448b0a96181c533c9b2b40b3d975cf0cb10fdf0f7f0d5d83d3e22ffde6a69","reusedExistingAsset":true,"originalFullPicturePreserved":true,"alt":{"he":"מבוא מעוטר בבניין בשכונה","en":"Decorated entrance hall in the neighbourhood","pl":"Zdobiona sień w kamienicy na osiedlu","de":"Verzierte Eingangshalle im Viertel","cs":"Zdobená vstupní hala v domě ve čtvrti"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"},"/assets/experiences/nadodrze-walk/visit-10.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.33 (3).jpeg","sourceSHA256":"a6d71c62337ed30749a3c9c5b5f8544d37c0ab6a204a9bc3ada0dc5748313a32","assetSHA256":"a7bfc9b189effbc93ed5eb4e1af999d003fe75058231a770a9952a62cf1a7ea1","reusedExistingAsset":true,"originalFullPicturePreserved":true,"alt":{"he":"פרטי תקרה מעל כניסה בביקור בשכונה","en":"Ceiling details above an entrance during our neighbourhood walk","pl":"Detale stropu nad wejściem podczas spaceru po osiedlu","de":"Deckendetails über einem Eingang beim Viertelspaziergang","cs":"Detaily stropu nad vchodem při procházce čtvrtí"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"},"/assets/experiences/nadodrze-walk/visit-12.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-05 at 18.25.00 (3).jpeg","sourceSHA256":"e555875c1d2c9fbbace90a2a1a3236889cd2464cc781da51e23a67a0fa245a3a","assetSHA256":"d504186ed1dbe16da868ba5e6e9d8e2ed028c73e4d5c7cfda9f446d02a835c36","reusedExistingAsset":true,"originalFullPicturePreserved":true,"alt":{"he":"חזיתות הבתים בשכונה בלילה","en":"Neighbourhood facades at night","pl":"Nocne elewacje kamienic na osiedlu","de":"Hausfassaden im Viertel bei Nacht","cs":"Průčelí domů ve čtvrti v noci"}},"/assets/experiences/nadodrze-walk/visit-13.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.45 (3).jpeg","sourceSHA256":"b24a6c4816ac9ea81e6c9968f4ef74a86132bfd9708bd479bbfce86e8300a004","assetSHA256":"9e87d988c6460e4b6660b8357ab616a5c4e0d205035845f258b94940d175a299","reusedExistingAsset":true,"originalFullPicturePreserved":true,"alt":{"he":"מדליון מפוסל על קיר המבוא","en":"Sculpted medallion on the entrance-hall wall","pl":"Rzeźbiony medalion na ścianie sieni","de":"Reliefmedaillon an der Wand der Eingangshalle","cs":"Reliéfní medailon na stěně vstupní haly"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"},"/assets/experiences/nadodrze-walk/visit-05.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.30 (2).jpeg","sourceSHA256":"44ce72a9fe66c4041c2ff28b1f421e964438c88c6720037d5f6771f7dcede533","assetSHA256":"f8ec41706d920b399cd419a922b0e75d652618601f33a3d1125cdd19c26aa9bd","reusedExistingAsset":true,"originalFullPicturePreserved":true,"alt":{"he":"מבט נוסף על חלון החנות והירקות","en":"Another view of the shop window and vegetables","pl":"Kolejny widok witryny sklepu i warzyw","de":"Weiterer Blick auf Schaufenster und Gemüse","cs":"Další pohled na výlohu a zeleninu"}},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-02.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.33 (1).jpeg","sha256":"34019918bcc15d6d7c4817542dc378bdd3c4b20d65b46f2f5d0577ac37de8cbb","bytes":488456,"sourceIndex":2,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-02.jpg","assetSHA256":"7e811bf2c0923080b5f0b089eb73e7a5010db2f4a43eaf428dda9150082684f2","originalDimensions":[1536,2048],"assetDimensions":[1350,1800],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.33 (1).jpeg","sourceSHA256":"34019918bcc15d6d7c4817542dc378bdd3c4b20d65b46f2f5d0577ac37de8cbb","familyExceptionApplied":false,"alt":{"he":"בית הספר הישן והבנייה החדשה בשדרות דרובנרה","en":"The former school facade and new buildings at Bulwar Drobnera","pl":"Dawna fasada szkoły i nowa zabudowa Bulwaru Drobnera","de":"Alte Schulfassade und Neubauten am Bulwar Drobnera","cs":"Bývalé školní průčelí a nová zástavba Bulwar Drobnera"}},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-07.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.30.jpeg","sha256":"df874468104c6a369e1b65cd63b38aaa888b3936b7fd425ca479b91bc734cfa8","bytes":691113,"sourceIndex":7,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-07.jpg","assetSHA256":"f275c08d656944980be9a93428142e3fba3a725c115a8e851e6caac8b7d22e09","originalDimensions":[1536,2048],"assetDimensions":[1350,1800],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.30.jpeg","sourceSHA256":"df874468104c6a369e1b65cd63b38aaa888b3936b7fd425ca479b91bc734cfa8","familyExceptionApplied":false,"alt":{"he":"חלון חנות וירקות עונתיים ברחוב","en":"Shop window and seasonal vegetables on the street","pl":"Witryna sklepu i sezonowe warzywa przy ulicy","de":"Schaufenster und saisonales Gemüse an der Straße","cs":"Výloha obchodu a sezónní zelenina v ulici"}},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-10.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.33 (2).jpeg","sha256":"cb9d480bcef48006a1ea83466df8dee37ce4ea89ff84d9d472d21124f30188ff","bytes":495666,"sourceIndex":10,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-10.jpg","assetSHA256":"3511ce429b52a5ec0b5cf84f7b7c10a7636f6ae0aa2435cc57eb80b4df0243a8","originalDimensions":[1536,2048],"assetDimensions":[1350,1800],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-01 at 09.20.33 (2).jpeg","sourceSHA256":"cb9d480bcef48006a1ea83466df8dee37ce4ea89ff84d9d472d21124f30188ff","familyExceptionApplied":false,"alt":{"he":"מבט נוסף על חזית בית הספר המשולבת בבנייה החדשה","en":"Another view of the school facade within the new development","pl":"Kolejny widok fasady szkoły w nowej zabudowie","de":"Weitere Ansicht der Schulfassade im Neubau","cs":"Další pohled na školní průčelí v nové zástavbě"}},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-12.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.45 (1).jpeg","sha256":"8e0f1eaf7e7ca2f20066c4b9194a3359a36e77d0e66d42bb36410a8fe8a15dbc","bytes":427064,"sourceIndex":12,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-12.jpg","assetSHA256":"c3919ec6acb8ea43a5f65772cfab3ce0d46dcb4bf36473c128ea935e8ad6dac9","originalDimensions":[1200,1600],"assetDimensions":[1200,1600],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.45 (1).jpeg","sourceSHA256":"8e0f1eaf7e7ca2f20066c4b9194a3359a36e77d0e66d42bb36410a8fe8a15dbc","familyExceptionApplied":false,"alt":{"he":"מבט רחב במבוא עם מדליון על הקיר","en":"Wider view of an entrance hall with a wall medallion","pl":"Szerszy widok sieni z medalionem ściennym","de":"Weiter Blick in eine Eingangshalle mit Wandmedaillon","cs":"Širší pohled do vstupní haly s nástěnným medailonem"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-15.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.44 (3).jpeg","sha256":"42c7471f3a2401d214f34056fa7fabae0354e822f23958ab94c42c0a77135c66","bytes":375724,"sourceIndex":15,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-15.jpg","assetSHA256":"69791f9405303693f6f2cc13c18c5d92af0294c89819cc4a16dd1fe3e366d067","originalDimensions":[1200,1600],"assetDimensions":[1200,1600],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.44 (3).jpeg","sourceSHA256":"42c7471f3a2401d214f34056fa7fabae0354e822f23958ab94c42c0a77135c66","familyExceptionApplied":false,"alt":{"he":"מדליון נוסף בקיר המבוא","en":"Another medallion on the entrance-hall wall","pl":"Kolejny medalion na ścianie sieni","de":"Weiteres Medaillon an der Wand der Eingangshalle","cs":"Další medailon na stěně vstupní haly"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-26.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.43 (1).jpeg","sha256":"ef2a7fcd460a87956487016ca387a7047ee48f77fdabc00e165afe3ac0bdb606","bytes":161270,"sourceIndex":26,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-26.jpg","assetSHA256":"f9fc5c09e27d4f947a23cdc2ce247829f3aa2cebb6f9bcc23ca3d4703b6b102a","originalDimensions":[1200,1600],"assetDimensions":[1200,1600],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.43 (1).jpeg","sourceSHA256":"ef2a7fcd460a87956487016ca387a7047ee48f77fdabc00e165afe3ac0bdb606","familyExceptionApplied":false,"alt":{"he":"מבט מן הצד על תבליט במבוא","en":"Side view of a relief in the entrance hall","pl":"Boczny widok płaskorzeźby w sieni","de":"Seitenansicht eines Reliefs in der Eingangshalle","cs":"Boční pohled na reliéf ve vstupní hale"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"},"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-27.jpg":{"source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.45 (4).jpeg","sha256":"01c21204f86f6f6648c02078ede7a1751f877b595ab9467228700152bbbba441","bytes":303465,"sourceIndex":27,"asset":"/assets/full-enrichment-20261022-neighbourhood-piast/nadodrze-27.jpg","assetSHA256":"9f3429be11d1f49e082030a137e04272fc87cdbe33c6e11fbcb223b5511d81c5","originalDimensions":[1200,1600],"assetDimensions":[1200,1600],"originalFullPicturePreserved":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.45 (4).jpeg","sourceSHA256":"01c21204f86f6f6648c02078ede7a1751f877b595ab9467228700152bbbba441","familyExceptionApplied":false,"alt":{"he":"מדליון דמות נוספת במבוא","en":"Another figure medallion in the entrance hall","pl":"Medalion kolejnej postaci w sieni","de":"Weiteres Figurenmedaillon in der Eingangshalle","cs":"Další figurální medailon ve vstupní hale"},"userIdentityApproval":"call_2657a02c83564f1e9a59c650baf0d4cb"}},"description":{"he":"שיטוט בשכונה שמצפון לעיר העתיקה, בין ציורי קיר, חזיתות בתי מגורים ופרטים מחיי הרחוב. בגלריה שער נדאודזה, הספרייה עם מדפי הספרים המצוירים, ציור הקיר של מארק קרייבסקי, מבוא מעוטר ומדליונים, חלון חנות וחזית בית הספר הישן המשולבת בבנייה החדשה לאורך דרובנרה. צילומי המבוא הם תיעוד ביקור, לא הזמנה להיכנס לשטח פרטי. כבדו את הדיירים והיכנסו רק כשהגישה מותרת.","en":"A walk through the neighbourhood north of the Old Town, with murals, residential facades and everyday street details. Our gallery includes the Gateway to Nadodrze mural, the painted-bookcase library, Marek Krajewski’s mural, a decorated entrance hall and medallions, a shop window and the former school facade integrated into the Bulwar Drobnera development. Entrance-hall pictures document our visit; they are not an invitation to enter private premises. Respect residents and enter only where access is permitted.","pl":"Spacer po osiedlu na północ od Starego Miasta, wśród murali, fasad kamienic i codziennych detali ulicy. Galeria pokazuje Bramę Nadodrza, bibliotekę z malowanymi regałami, mural Marka Krajewskiego, zdobioną sień z medalionami, witrynę sklepu oraz dawną fasadę szkoły wkomponowaną w Bulwar Drobnera. Zdjęcia sieni dokumentują naszą wizytę, nie zapraszają do wchodzenia na teren prywatny. Szanuj mieszkańców i wchodź tylko tam, gdzie wolno.","de":"Ein Spaziergang durch das Viertel nördlich der Altstadt, zwischen Wandbildern, Mietshausfassaden und Alltagsdetails. Unsere Galerie zeigt das Tor zu Nadodrze, die Bibliothek mit gemalten Bücherregalen, das Marek-Krajewski-Wandbild, eine verzierte Eingangshalle mit Medaillons, ein Schaufenster und die alte Schulfassade im Neubau Bulwar Drobnera. Die Hallenbilder dokumentieren unseren Besuch und sind keine Einladung auf Privatgelände. Bewohner respektieren und nur bei erlaubtem Zugang eintreten.","cs":"Procházka čtvrtí severně od Starého Města mezi nástěnnými malbami, průčelími domů a každodenními detaily ulice. Galerie ukazuje Bránu do Nadodrze, knihovnu s malovanými policemi, malbu Marka Krajewského, zdobenou vstupní halu s medailony, výlohu a staré školní průčelí v nové zástavbě Bulwar Drobnera. Snímky haly dokumentují naši návštěvu, nezvou ke vstupu na soukromý pozemek. Respektujte obyvatele a vstupujte jen tam, kde je to dovoleno."},"approval":{"callId":"call_2657a02c83564f1e9a59c650baf0d4cb","userWords":"כן, בנדאודז׳ה","source":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Image 2026-10-19 at 08.41.45 (1).jpeg","sourceSHA256":"8e0f1eaf7e7ca2f20066c4b9194a3359a36e77d0e66d42bb36410a8fe8a15dbc","scope":"This entrance hall and visually continuous medallions/ceiling/video group; generalneighbourhood captions, no invented address."}};n.media.photos=payload.photos;n.media.metadata={...n.media.metadata,...payload.metadata};n.description=payload.description;n.metadata={...n.metadata,fullSourceReview20261022:{sourceMediaCount:33,distinctPhotos:15,wrongNeighbourhoodExcluded:1,userEntranceHallIdentityApproval:payload.approval.callId}};walk.media.images=[...payload.photos];walk.media.metadata={...walk.media.metadata,...payload.metadata};})();

// Two approved Nadodrze visits, Public and reopened 2026-10-22.
(function(){const e=window.WROC_EXPERIENCE_CATALOG.getExperience("street-art-nadodrze-olbin"),n=e.mapPoints.find(p=>p.id==="nadodrze"),visits={"https://youtube.com/watch?v=c09wVjknDmY":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Video 2026-10-05 at 18.27.50.mp4","sourceSHA256":"0ecbed333af7448a0cfeecd56bfb661f7a3d678aa78fae222a39f59e6473f1b8","uploadSHA256":"54ca439a3c6f7ad64183f995ac4f5fc6c050cb97f37de6650701bd0dc007fc57","durationSeconds":5.966667,"silent":true,"fullPicturePreserved":true,"visibility":"Public","savedPublicVerified":true,"reopenedVerified":true,"copyrightCheck":"No issues found","communityGuidelinesCheck":"No issues found","approvalCall":"call_4531184b7798456fb4fe1e808ef9a361"},"https://youtube.com/watch?v=2Kgw0UAiO50":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Nadodje/WhatsApp Video 2026-10-05 at 18.27.56.mp4","sourceSHA256":"f0784eff189e569273507ad2a39150f8db74092dbf1ccfd07437c122171f67d1","uploadSHA256":"fd8b3b18e51f6a18a2c7054dcd33b71e32fa43c641f1964c09c41938217da480","durationSeconds":8.833333,"silent":true,"fullPicturePreserved":true,"visibility":"Public","savedPublicVerified":true,"reopenedVerified":true,"copyrightCheck":"No issues found","communityGuidelinesCheck":"No issues found","approvalCall":"call_4531184b7798456fb4fe1e808ef9a361"}};n.media.videos=[...new Set([...n.media.videos,...Object.keys(visits)])];n.media.metadata={...n.media.metadata,...visits};})();
