(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => ({ he, en, pl, de, cs });
  const nav = (lat, lng, label) => ({
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`,
    appleMaps: `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(label)}`,
  });
  const place = ({ id, aliases = [], localName, name, description, coordinates, address, categories, tags, website, experiences = [], socialPosts = [], media = null, provenance = null, socialProfileFallback = null }) => ({
    id,
    aliases,
    localName,
    name,
    description,
    location: {
      countryCode: "PL",
      regionId: "lower-silesia",
      cityId: "wroclaw",
      coordinates: { lat: coordinates[0], lng: coordinates[1] },
      ...(address ? { address } : {}),
    },
    categories,
    taxonomy: { tags },
    links: { website, navigation: nav(coordinates[0], coordinates[1], localName), ...(socialProfileFallback === false ? { socialProfileFallback: false } : {}) },
    ...(experiences.length ? { experiences } : {}),
    ...(socialPosts.length ? { socialPosts } : {}),
    ...(media ? { media } : {}),
    provenance: {
      contentType: "official-institution-audit",
      factualSources: [{ type: "official", url: website, checkedAt: "2026-08-29" }],
      ...(provenance || {}),
    },
    status: "published",
    editorialPriority: "normal",
    languages: ["he", "en", "pl", "de", "cs"],
  });

  const descriptions = {
    palace: t("ארמון מלכותי ובו תולדות ורוצלב ואמנות המדליות.", "A royal palace presenting Wrocław's history and medallic art.", "Pałac królewski z historią Wrocławia i sztuką medalierską.", "Königspalais mit Breslauer Geschichte und Medaillenkunst.", "Královský palác s dějinami Vratislavi a medailérským uměním."),
    arsenal: t("מתחם היסטורי המאכלס את המוזיאונים לארכאולוגיה ולצבא.", "A historic complex housing the archaeology and military museums.", "Historyczny zespół mieszczący muzea archeologiczne i militariów.", "Historischer Komplex mit Archäologie- und Militärmuseum.", "Historický areál s archeologickým a vojenským muzeem."),
    cemetery: t("בית קברות יהודי היסטורי שהוא גם מוזיאון לאמנות הקבורה.", "A historic Jewish cemetery and museum of funerary art.", "Historyczny cmentarz żydowski i muzeum sztuki cmentarnej.", "Historischer jüdischer Friedhof und Museum der Sepulkralkunst.", "Historický židovský hřbitov a muzeum funerálního umění."),
    theatreMuseum: t("מוזיאון לתולדות התיאטרון של ורוצלב וליצירת הנריק תומשבסקי.", "A museum of Wrocław theatre history and Henryk Tomaszewski's work.", "Muzeum historii wrocławskiego teatru i twórczości Henryka Tomaszewskiego.", "Museum zur Breslauer Theatergeschichte und zu Henryk Tomaszewski.", "Muzeum dějin vratislavského divadla a tvorby Henryka Tomaszewského."),
    architecture: t("מוזיאון לאדריכלות במנזר ברנרדיני לשעבר.", "An architecture museum in a former Bernardine monastery.", "Muzeum architektury w dawnym klasztorze bernardynów.", "Architekturmuseum in einem ehemaligen Bernhardinerkloster.", "Muzeum architektury v bývalém bernardinském klášteře."),
    contemporary: t("מוזיאון לאמנות עכשווית בבונקר האווירי בכיכר סטרזגומסקי.", "A contemporary-art museum in the former air-raid shelter at Strzegomski Square.", "Muzeum sztuki współczesnej w dawnym schronie przy pl. Strzegomskim.", "Museum für Gegenwartskunst im ehemaligen Luftschutzbunker am Strzegomski-Platz.", "Muzeum současného umění v bývalém krytu na Strzegomském náměstí."),
    tadeusz: t("מוזיאון ספרותי אינטראקטיבי בבית היסטורי בכיכר השוק.", "An interactive literary museum in a historic Market Square house.", "Interaktywne muzeum literackie w zabytkowej kamienicy przy Rynku.", "Interaktives Literaturmuseum in einem historischen Haus am Rynek.", "Interaktivní literární muzeum v historickém domě na Rynku."),
    depot: t("מרכז היסטוריה המספר את סיפורה של ורוצלב אחרי 1945.", "A history centre telling Wrocław's story after 1945.", "Centrum historii opowiadające o Wrocławiu po 1945 roku.", "Geschichtszentrum über Breslau nach 1945.", "Historické centrum vyprávějící příběh Vratislavi po roce 1945."),
    theatre: t("במת תיאטרון פעילה; מומלץ לבדוק את הרפרטואר הרשמי מראש.", "An active theatre venue; check the official programme in advance.", "Czynna scena teatralna; warto wcześniej sprawdzić oficjalny repertuar.", "Aktive Theaterbühne; das offizielle Programm vorab prüfen.", "Aktivní divadelní scéna; program si ověřte předem."),
    cinema: t("קולנוע רב־מסכי מרכזי המזוהה עם פסטיבל New Horizons.", "A major multi-screen cinema associated with the New Horizons festival.", "Wielosalowe kino związane z festiwalem Nowe Horyzonty.", "Großes Programmkino, verbunden mit dem New-Horizons-Festival.", "Velké multikino spojené s festivalem New Horizons."),
    gallery: t("גלריה של BWA ורוצלב לאמנות ועיצוב עכשוויים.", "A BWA Wrocław gallery for contemporary art and design.", "Galeria BWA Wrocław poświęcona sztuce i współczesnemu projektowaniu.", "Galerie von BWA Wrocław für Gegenwartskunst und Design.", "Galerie BWA Wrocław zaměřená na současné umění a design."),
    pharmacy: t("מוזיאון באוניברסיטה הרפואית המתאר את תולדות הרוקחות.", "A Medical University museum exploring the history of pharmacy.", "Muzeum Uniwersytetu Medycznego poświęcone historii farmacji.", "Museum der Medizinischen Universität zur Geschichte der Pharmazie.", "Muzeum lékařské univerzity věnované dějinám farmacie."),
    wuwa: t("שכונת המגורים הניסיונית WuWA — מסלול פתוח של אדריכלות מודרניסטית.", "The experimental WuWA housing estate — an open-air modernist architecture walk.", "Eksperymentalne osiedle WuWA — plenerowy spacer po architekturze modernistycznej.", "Die Versuchssiedlung WuWA – ein Rundgang durch moderne Architektur im Freien.", "Experimentální sídliště WuWA – venkovní procházka modernistickou architekturou."),
  };

  const cityMuseum = "https://muzeum.miejskie.wroclaw.pl/";
  window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE = [
    place({"id": "barbara-wroclaw", "aliases": ["barbara", "bar-barbara", "barbara-infopunkt", "wroclawski-instytut-kultury"], "localName": "Barbara", "name": {"he": "ברברה, מרכז תרבות ובית קפה", "en": "Barbara Cultural Centre and Café", "pl": "Barbara, przestrzeń kultury i kawiarnia", "de": "Barbara, Kulturzentrum und Café", "cs": "Barbara, kulturní centrum a kavárna"}, "description": {"he": "מרכז התרבות ובית הקפה ברברה שוכנים ברחוב שווידניצקה, במבנה מודרניסטי עם חלונות רחבים ועמודי פסיפס בשחור ולבן. המקום משמש את מכון התרבות של ורוצלב ומציע מפגשים, הרצאות, סדנאות, מרחב קריאה ובית קפה. שמו משמר את זכרו של בר ברברה שפעל כאן משנות השישים עד שנות התשעים ונקשר גם לפעילות האלטרנטיבה הכתומה. תמונות הביקור שלנו מציגות את השלט, החזית, חללי התצוגה ופרטים מההיסטוריה המקומית. בדקו באתר הרשמי את לוח האירועים ואת פרטי הביקור.\nBarbara\nŚwidnicka 8B, Wrocław", "en": "Barbara combines a cultural venue, reading space and café on Świdnicka Street. Its modernist interior features large windows and black-and-white mosaic columns. Run by the Wrocław Institute of Culture, it hosts meetings, talks and workshops. The name recalls the former Bar Barbara, active here from the 1960s to the 1990s and associated with the Orange Alternative. Our visit photographs show the sign, frontage, exhibition spaces and local-history details. Check the official programme and visitor information before coming.\nŚwidnicka 8B, Wrocław", "pl": "Barbara przy ulicy Świdnickiej łączy przestrzeń kultury, czytelnię i kawiarnię. Modernistyczne wnętrze wyróżniają duże witryny i czarno-białe kolumny mozaikowe. Wrocławski Instytut Kultury organizuje tu spotkania, wykłady i warsztaty. Nazwa przypomina dawny bar Barbara, działający od lat 60. do 90. i związany również z Pomarańczową Alternatywą. Nasze zdjęcia pokazują neon, fasadę, przestrzeń wystawową i detale lokalnej historii. Przed wizytą sprawdź oficjalny program i informacje dla gości.\nŚwidnicka 8B, Wrocław", "de": "Barbara verbindet einen Kulturort, einen Lesebereich und ein Café an der Świdnicka-Straße. Große Fenster und schwarz-weiße Mosaiksäulen prägen den modernistischen Innenraum. Das Breslauer Kulturinstitut veranstaltet hier Gespräche, Vorträge und Workshops. Der Name erinnert an die ehemalige Bar Barbara, die hier von den 1960er- bis in die 1990er-Jahre bestand und auch mit der Orangen Alternative verbunden war. Unsere Besuchsfotos zeigen das Schild, die Fassade, Ausstellungsräume und Details zur Ortsgeschichte. Aktuelles Programm und Besuchsinformationen stehen auf der offiziellen Website.\nŚwidnicka 8B, Wrocław", "cs": "Barbara v ulici Świdnicka spojuje kulturní prostor, čítárnu a kavárnu. Modernistický interiér charakterizují velká okna a černobílé mozaikové sloupy. Vratislavský kulturní institut zde pořádá setkání, přednášky a dílny. Název připomíná někdejší bar Barbara, který zde fungoval od 60. do 90. let a byl spojen také s Oranžovou alternativou. Naše fotografie ukazují neon, průčelí, výstavní prostory a detaily místní historie. Před návštěvou ověřte oficiální program a informace pro návštěvníky.\nŚwidnicka 8B, Wrocław"}, "coordinates": [51.10769750953518, 17.032835136772945], "address": {"street": "Świdnicka 8B", "postalCode": "50-067", "city": "Wrocław", "country": "Poland"}, "categories": ["culture", "architecture", "cafe"], "tags": ["art-contemporary", "architecture-design"], "website": "https://instytutkultury.pl/barbara/", "socialPosts": [], "socialProfileFallback": false, "media": {"photos": ["/assets/barbara-wroclaw-entrance.jpg", "/assets/barbara-wroclaw-neon-detail.jpg", "/assets/barbara-wroclaw-street-context.jpg", "/assets/barbara-wroclaw-exhibition-poster.jpg", "/assets/barbara-wroclaw-historic-menu-detail.jpg", "/assets/barbara-wroclaw-exhibition-room.jpg", "/assets/barbara-wroclaw-mosaic-column.jpg"], "videos": ["https://youtube.com/shorts/lX2mxhtVMi8", "https://youtube.com/shorts/w_vNteiYq4o", "https://youtube.com/shorts/QGne7T7L6og"], "metadata": {"/assets/barbara-wroclaw-neon-detail.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.15.47.jpeg", "sourceSHA256": "eeadf818e2240e6ce4d81eda30ae21da969123e2c1a78d3a49c85b77e414f580", "assetSHA256": "e0102950f115b3d7cf2bd39df664144e2129be9136aa459deb8d6caf2c975b61", "familyForeground": false, "heroCandidate": false, "alt": {"he": "תקריב של שלט הניאון של ברברה", "en": "Close view of Barbara’s neon sign", "pl": "Zbliżenie neonu Barbary", "de": "Nahaufnahme des Barbara-Neonschilds", "cs": "Detail neonového nápisu Barbara"}, "tags": ["barbara", "neon-detail"]}, "/assets/barbara-wroclaw-street-context.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.28.10 (1).jpeg", "sourceSHA256": "ee9759e931d2a572dc852eb4779f3fd2fd7ed995e0c5c05daeee2118a015c8a4", "assetSHA256": "2f0863fbbe9ad1cc6243f45603933e2b4f16dae8ab132c44bc7c4a7239862554", "familyForeground": false, "heroCandidate": false, "alt": {"he": "רחוב שווידניצקה והדגלים מול ברברה", "en": "Świdnicka Street and flags outside Barbara", "pl": "Ulica Świdnicka i flagi przed Barbarą", "de": "Świdnicka-Straße und Fahnen vor Barbara", "cs": "Ulice Świdnicka a vlajky před Barbarou"}, "tags": ["barbara", "street-context"]}, "/assets/barbara-wroclaw-entrance.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.28.10.jpeg", "sourceSHA256": "c6dcdf3c84fe4689879bb79d9371f012f6e1156fc11200e91e8fc1eba9139829", "assetSHA256": "70c29e239ae0e190777d75e327cd9524cee3f41c2e20e9e3a3a07de29ce5387c", "familyForeground": false, "heroCandidate": true, "alt": {"he": "החזית והשלט בכניסה למרכז התרבות ברברה", "en": "Facade and sign at the Barbara cultural centre entrance", "pl": "Fasada i szyld przy wejściu do Barbary", "de": "Fassade und Schild am Eingang des Kulturzentrums Barbara", "cs": "Průčelí a nápis u vstupu do kulturního centra Barbara"}, "tags": ["barbara", "entrance"]}, "/assets/barbara-wroclaw-exhibition-poster.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.28.11.jpeg", "sourceSHA256": "ac1a8c9dfe8f78cb45d862c4e3b1fbce4b4418b7518d3f17010c8e541aa81035", "assetSHA256": "3f681368af39a35ec11ebfa464d6029a8510a0435691674dacd9b33e1f5396ee", "familyForeground": false, "heroCandidate": false, "alt": {"he": "כרזת התערוכה בחלל הפנימי של ברברה", "en": "Exhibition poster inside Barbara", "pl": "Plakat wystawy we wnętrzu Barbary", "de": "Ausstellungsplakat im Innenraum von Barbara", "cs": "Plakát výstavy v interiéru Barbary"}, "tags": ["barbara", "exhibition-poster"]}, "/assets/barbara-wroclaw-historic-menu-detail.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.28.13.jpeg", "sourceSHA256": "97399204c7417018906b6d0e662404314129532ff965a7f37b7861547a3e175a", "assetSHA256": "959588c5652f19b884a82101124de0d378f9db3de0901e9d09396172ed24e3f7", "familyForeground": false, "heroCandidate": false, "alt": {"he": "פרט מתצוגת ההיסטוריה של בר ברברה", "en": "Detail of the display about the former Bar Barbara", "pl": "Fragment ekspozycji o dawnym barze Barbara", "de": "Detail der Ausstellung über die ehemalige Bar Barbara", "cs": "Detail expozice o někdejším baru Barbara"}, "tags": ["barbara", "historic-menu-detail"]}, "/assets/barbara-wroclaw-exhibition-room.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.28.14.jpeg", "sourceSHA256": "888bfe42f62623b596b576027d8692294c6b39d24ae7a944c87ef4ce4f266be2", "assetSHA256": "fca98a48d85910201940844e521d4d142e29c45dda14fae981132f28d37efb4a", "familyForeground": false, "heroCandidate": false, "alt": {"he": "חלל התערוכה והישיבה של ברברה", "en": "Exhibition and seating space at Barbara", "pl": "Przestrzeń wystawowa i miejsca do siedzenia w Barbarze", "de": "Ausstellungsbereich und Sitzplätze in Barbara", "cs": "Výstavní a odpočinkový prostor v Barbaře"}, "tags": ["barbara", "exhibition-room"]}, "/assets/barbara-wroclaw-mosaic-column.jpg": {"original": true, "sourceFile": "WhatsApp Image 2026-10-20 at 12.28.15.jpeg", "sourceSHA256": "eec0d4b27d81e1ecf838b662e92a8d5aab7579ebf4ebb79d6bb5f12b4e1e40fa", "assetSHA256": "f0eafc63f70c901b326119e5b76a72a2d36d45d047998ce90556d75e8d44f9f9", "familyForeground": false, "heroCandidate": false, "alt": {"he": "עמוד הפסיפס בשחור ולבן בתוך ברברה", "en": "Black-and-white mosaic column inside Barbara", "pl": "Czarno-biała kolumna mozaikowa w Barbarze", "de": "Schwarz-weiße Mosaiksäule in Barbara", "cs": "Černobílý mozaikový sloup v Barbaře"}, "tags": ["barbara", "mosaic-column"]}, "https://youtube.com/shorts/lX2mxhtVMi8": {"original": true, "sourceFile": "WhatsApp Video 2026-10-20 at 13.04.23.mp4", "sourceSHA256": "2987abfd3fe1709bf7be75f32e0a4ea583b51e503ec1fec587b3755e5696f08b", "uploadSHA256": "5ec439d49adecef0a2bd4e96ff3545b3cba01e8c446c845b635b19911e388032", "durationSeconds": 15.4, "audio": "removed in publication derivative", "visibility": "Public", "savedPublicVerified": true, "checks": "No issues found", "familyForeground": false, "alt": {"he": "סרטון ביקור בכניסה ובחלל התרבות של ברברה", "en": "Visit clip of Barbara’s entrance and cultural space", "pl": "Film z wejścia i przestrzeni kulturalnej Barbary", "de": "Besuchsclip vom Eingang und Kulturraum von Barbara", "cs": "Záběry vstupu a kulturního prostoru Barbary"}}, "https://youtube.com/shorts/w_vNteiYq4o": {"original": true, "sourceFile": "WhatsApp Video 2026-10-20 at 13.04.30.mp4", "sourceSHA256": "b1a3dad39016d7c316948a0486d1fb8a5f5c311e7c68d5ce7fa4cb36f4e673b9", "uploadSHA256": "bf8ee209bf584a2fdd2400c82a2ad5fae2dcbcbfc38fe9ab382aaa3c4a6afdf2", "durationSeconds": 5.8, "audio": "removed in publication derivative", "visibility": "Public", "savedPublicVerified": true, "checks": "No issues found", "familyForeground": false, "alt": {"he": "סרטון ביקור בלוח התרבות של ברברה", "en": "Visit clip of Barbara’s cultural noticeboard", "pl": "Film z tablicy wydarzeń kulturalnych w Barbarze", "de": "Besuchsclip der Kulturankündigungen in Barbara", "cs": "Záběry kulturní nástěnky v Barbaře"}}, "https://youtube.com/shorts/QGne7T7L6og": {"original": true, "sourceFile": "WhatsApp Video 2026-10-20 at 13.04.42.mp4", "sourceSHA256": "66b114ac1dc5f8fb130c5751f70e7966b0a8e8f5d55a856e034222681cdf4383", "uploadSHA256": "90970e1baad4b318946871333f019d85104b2e8a2af6d07d8fc1470e0ff127cb", "durationSeconds": 9.066667, "audio": "removed in publication derivative", "visibility": "Public", "savedPublicVerified": true, "checks": "No issues found", "familyForeground": false, "alt": {"he": "סרטון ביקור בלוח המודעות ובחלל הפנימי של ברברה", "en": "Visit clip of Barbara’s noticeboard and interior", "pl": "Film z tablicy ogłoszeń i wnętrza Barbary", "de": "Besuchsclip von Aushängen und Innenraum in Barbara", "cs": "Záběry nástěnky a interiéru Barbary"}}}, "thumbnail": "/assets/barbara-wroclaw-entrance.jpg", "guideVideos": {"he": "https://youtube.com/shorts/Eyns7Gj66d0", "en": "https://youtube.com/shorts/pIzp5Bmb9ck"}}, "provenance": {"contentType": "official-place-and-original-visit-photo-audit", "factualSources": [{"type": "official", "url": "https://instytutkultury.pl/barbara/", "checkedAt": "2026-10-20"}, {"type": "official-city-map", "url": "https://geoportal.wroclaw.pl/poi/poi/11427", "checkedAt": "2026-10-20", "coordinates": "EPSG2177 point6432270.460180425,5664075.808236006 converted toEPSG4326 withArcGIS GeometryServer"}], "mediaSource": "data/barbara-media-provenance.json", "familyException": false, "visitVideoPublication": "data/barbara-visit-publication-receipt.json", "sharedPapaGuides20261022": {"userRequestedReuse": true, "dedicatedBarbaraOnly": false, "sourceCanonicalId": "papa", "captionProvenance": "data/papa-guide-caption-provenance.json", "noNewUpload": true}, "guideContextLabel": {"he": "מדריך הגמדים שלנו, כולל ברברה", "en": "Our dwarf guide, including Barbara", "pl": "Nasz przewodnik po krasnalach, także o Barbarze", "de": "Unser Zwergenführer, auch über Barbara", "cs": "Náš průvodce trpaslíky, také o Barbaře"}}}),
    place({"id": "four-denominations-district", "aliases": ["four-religions", "four-temples", "district-of-mutual-respect", "dzielnica-czterech-wyznan", "dzielnica-czterech-swiatyn"], "localName": "Dzielnica Czterech Wyznań", "name": {"he": "רובע ארבע הדתות", "en": "Four Denominations District", "pl": "Dzielnica Czterech Wyznań", "de": "Viertel der vier Konfessionen", "cs": "Čtvrť čtyř vyznání"}, "description": {"he": "אזור הליכה קטן בעיר העתיקה, שבו נפגשות ארבע קהילות דתיות: יהודית, קתולית, לותרנית ואורתודוקסית. בין מקומות התפילה משתרעים רחובות, חצרות ובתי קפה, לצד עקבות של חיי התרבות והקהילה של ורוצלב. פסל כוכב הלכת מבדולח מסמן כניסה סמלית לאזור. מומלץ לשלב שיטוט ברחובות עם ביקור נפרד בבית הכנסת החסידה הלבנה; אפשרות הכניסה למקומות התפילה תלויה בכל מוסד ובפעילותו. זהו רובע תרבותי, ולא יחידה מנהלית נפרדת.", "en": "A compact walking area in the Old Town bringing together Jewish, Roman Catholic, Lutheran and Orthodox communities. Streets, courtyards and cafés connect places of worship with traces of Wrocław’s cultural and community life. The Crystal Planet sculpture marks a symbolic entrance. Combine an unhurried walk with a separate visit to the White Stork Synagogue; entry to each place of worship depends on its own arrangements and activities. This is a cultural quarter, not a separate administrative district.", "pl": "Niewielki obszar spacerowy na Starym Mieście łączy wspólnoty żydowską, rzymskokatolicką, ewangelicko-augsburską i prawosławną. Ulice, podwórza i kawiarnie prowadzą między świątyniami oraz śladami życia kulturalnego i społecznego Wrocławia. Symboliczne wejście wyznacza rzeźba Kryształowa Planeta. Spacer warto połączyć z osobną wizytą w Synagodze pod Białym Bocianem; dostęp do poszczególnych świątyń zależy od ich własnych zasad i odbywających się nabożeństw. Jest to dzielnica w znaczeniu kulturowym, nie odrębna jednostka administracyjna.", "de": "Ein kleines Spaziergebiet in der Altstadt verbindet jüdische, römisch-katholische, lutherische und orthodoxe Gemeinden. Straßen, Innenhöfe und Cafés führen zwischen Gotteshäusern und Spuren des kulturellen und gemeinschaftlichen Lebens Breslaus hindurch. Die Skulptur Kristallplanet markiert einen symbolischen Eingang. Ein ruhiger Rundgang lässt sich mit einem gesonderten Besuch der Synagoge zum Weißen Storch verbinden; der Zutritt zu den Gotteshäusern richtet sich nach den jeweiligen Regeln und Veranstaltungen. Es handelt sich um ein Kulturviertel, nicht um einen eigenständigen Verwaltungsbezirk.", "cs": "Malá pěší oblast ve Starém Městě propojuje židovskou, římskokatolickou, luterskou a pravoslavnou komunitu. Mezi svatyněmi vedou ulice, dvory a kavárny se stopami kulturního a společenského života Vratislavi. Symbolický vstup označuje socha Křišťálová planeta. Klidnou procházku lze spojit se samostatnou návštěvou synagogy U Bílého čápa; vstup do jednotlivých svatyní závisí na jejich pravidlech a probíhajících obřadech. Jde o kulturní čtvrť, nikoli samostatnou správní jednotku."}, "coordinates": [51.10968, 17.023753], "categories": ["area", "history", "architecture"], "tags": ["museums-history", "architecture-design"], "website": "https://www.fundacja4wyznan.pl/n/dzielnica/", "media": {"thumbnail": "/assets/four-denominations-district-crystal-planet.jpg", "photos": ["/assets/four-denominations-district-crystal-planet.jpg", "/assets/four-denominations-district-street.jpg", "/assets/four-denominations-district-wlodkowica-entrance.jpg", "/assets/four-denominations-district-plaque.jpg", "/assets/four-denominations-district-rotbaum-plaque.jpg"], "videos": ["https://www.youtube.com/watch?v=Eu84SKoKNZA", "https://www.youtube.com/watch?v=o6qgx0B_sU0", "https://www.youtube.com/watch?v=UOkQKcNFqBw"], "metadata": {"/assets/four-denominations-district-crystal-planet.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/IMG_1044.JPG", "sourceSHA256": "f5ded5bb2f18c4d035e8d07fad65f279e764f747925f5377bb2c86e184bdcae9", "assetSHA256": "c5c9e699c956430b03f3144467e22d679dc212f191c2e09e16dcb552a86efc88", "familyForeground": false, "alt": {"he": "פסל כוכב הלכת מבדולח בכניסה הסמלית לרובע", "en": "Crystal Planet sculpture at the symbolic district entrance", "pl": "Kryształowa Planeta przy symbolicznym wejściu do dzielnicy", "de": "Kristallplanet am symbolischen Eingang des Viertels", "cs": "Křišťálová planeta u symbolického vstupu do čtvrti"}}, "/assets/four-denominations-district-street.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-07-13 at 19.56.02 (1).jpeg", "sourceSHA256": "26891c678af3a4653702a1f8c99500ab44fe1b78cb010b75716ab4bfe1d54b39", "assetSHA256": "bcadc7676862e9801aeaabd2af60a8ef81c9d472c319132eec309ff923cd44db", "familyForeground": false, "alt": {"he": "רחוב אנטוני הקדוש ובתי הקפה ברובע", "en": "Saint Anthony Street and district cafés", "pl": "Ulica św. Antoniego i kawiarnie w dzielnicy", "de": "Świętego-Antoniego-Straße und Cafés im Viertel", "cs": "Ulice svatého Antonína a kavárny ve čtvrti"}}, "/assets/four-denominations-district-wlodkowica-entrance.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.01.jpeg", "sourceSHA256": "f7fe3903df3c350d5e9dd5ffc98c2d3773c0bc1e1f9e7e1266b723bc193d2ad6", "assetSHA256": "b154ae4b12fdeddaec607caa20a81950739f49d7b385e49ab4375123ac9a3257", "familyForeground": false, "alt": {"he": "כניסה לבניין ברחוב ולודקוביצה לצד לוח ההנצחה", "en": "Włodkowica doorway beside the memorial plaque", "pl": "Wejście przy ulicy Włodkowica obok tablicy pamiątkowej", "de": "Eingang an der Włodkowica-Straße neben der Gedenktafel", "cs": "Vchod v ulici Włodkowica vedle pamětní desky"}}, "/assets/four-denominations-district-plaque.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/IMG_1043.JPG", "sourceSHA256": "7e258188ebea1bb64b8c1d8f6314200be367053cf849cd68d14670d3a4ccde56", "assetSHA256": "f9950a8b65457277d2a0595db7e58e728a6a9e2a141e0cc0e23dc864009fde9d", "familyForeground": false, "alt": {"he": "לוח סמלי ארבע הדתות בריצוף הרובע", "en": "Four faith symbols in the district paving", "pl": "Symbole czterech wyznań w nawierzchni dzielnicy", "de": "Symbole der vier Konfessionen im Straßenpflaster", "cs": "Symboly čtyř vyznání v dlažbě čtvrti"}}, "/assets/four-denominations-district-rotbaum-plaque.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.00 (1).jpeg", "sourceSHA256": "95e34d14e2b84ad364db27bdc4f6fd1b38c28767dbecc55fba286fd0c62d7c78", "assetSHA256": "d933118b4ae5dc9fb2fde5e869c5b5e528ba489d1fb0ebf6e6cb6f21a0b41521", "familyForeground": false, "alt": {"he": "לוח הנצחה ליעקב וליה רוטבאום", "en": "Jakub and Lia Rotbaum memorial plaque", "pl": "Tablica upamiętniająca Jakuba i Lię Rotbaumów", "de": "Gedenktafel für Jakub und Lia Rotbaum", "cs": "Pamětní deska Jakuba a Lii Rotbaumových"}}}}, "socialProfileFallback": false, "address": {"city": "Wrocław", "country": "Poland"}, "provenance": {"contentType": "official-area-identity-and-original-visit-audit", "factualSources": [{"type": "official", "url": "https://dolnyslask.travel/obiekt/dzielnica-czterech-wyznan", "checkedAt": "2026-10-20", "scope": "District identity, official district coordinate anchor, Crystal Planet symbolic entrance"}, {"type": "official", "url": "https://www.fundacja4wyznan.pl/n/dzielnica/", "checkedAt": "2026-10-20", "scope": "Four faith communities and district streets"}], "mediaSource": "Original WROC-LOVE visit materials; data/district-synagogue-enrichment-provenance.json"}}),
    place({"id": "white-stork-synagogue-wroclaw", "aliases": ["white-stork-synagogue", "synagoga-pod-bialym-bocianem"], "localName": "Synagoga Pod Białym Bocianem", "name": {"he": "בית הכנסת החסידה הלבנה", "en": "White Stork Synagogue", "pl": "Synagoga Pod Białym Bocianem", "de": "Synagoge zum Weißen Storch", "cs": "Synagoga U Bílého čápa"}, "description": {"he": "בית הכנסת החסידה הלבנה נחנך בשנת 1829 בחצר ברובע ארבע הדתות, ותוכנן בסגנון נאו־קלאסי בידי קרל פרדיננד לנגהנס. לאחר פגיעות והזנחה שוקם ונפתח מחדש בשנת 2010. המקום קשור לחיי הקהילה היהודית ולזיכרון יהודי העיר. תמונות הביקור שלנו מציגות את החצר ופרטים במבני הקהילה הסמוכים. יש לברר את אפשרות הכניסה ואת הסיורים עם הקהילה היהודית לפני הביקור.", "en": "Opened in 1829, the White Stork Synagogue stands in a courtyard in the Four Denominations District. Carl Ferdinand Langhans designed its neoclassical building, restored and reopened in 2010 after damage and neglect. It is connected with Jewish community life and remembrance. Our visit photographs show the courtyard and details of the adjoining community buildings. Check visitor access and guided tours with the Jewish community before visiting.", "pl": "Synagoga Pod Białym Bocianem, otwarta w 1829 roku, znajduje się na dziedzińcu w Dzielnicy Czterech Wyznań. Jej neoklasycystyczny budynek zaprojektował Carl Ferdinand Langhans. Po zniszczeniach i zaniedbaniach został odrestaurowany i ponownie otwarty w 2010 roku. Miejsce wiąże się z życiem gminy żydowskiej i pamięcią o dawnych mieszkańcach. Nasze zdjęcia pokazują dziedziniec oraz detale sąsiednich budynków gminy. Możliwość wejścia i zwiedzania należy potwierdzić w gminie żydowskiej.", "de": "Die 1829 eröffnete Synagoge zum Weißen Storch liegt in einem Innenhof im Viertel der vier Konfessionen. Carl Ferdinand Langhans entwarf den neoklassizistischen Bau, der nach Beschädigungen und Vernachlässigung restauriert und 2010 wiedereröffnet wurde. Der Ort ist mit jüdischem Gemeindeleben und Erinnerung verbunden. Unsere Besuchsfotos zeigen den Hof und Details der angrenzenden Gemeindegebäude. Zugang und Führungen vorab bei der jüdischen Gemeinde erfragen.", "cs": "Synagoga U Bílého čápa, otevřená roku 1829, stojí ve dvoře ve čtvrti čtyř vyznání. Její neoklasicistní budovu navrhl Carl Ferdinand Langhans. Po poškození a zanedbání byla obnovena a znovu otevřena v roce 2010. Místo je spojeno se životem židovské obce a připomínkou její historie. Naše fotografie zachycují dvůr a detaily sousedních obecních budov. Možnosti vstupu a prohlídek si předem ověřte u židovské obce."}, "categories": ["history", "architecture", "religion"], "media": {"thumbnail": "/assets/white-stork/white-stork-01.jpg", "photos": ["/assets/white-stork/white-stork-01.jpg", "/assets/white-stork/white-stork-02.jpg", "/assets/white-stork/white-stork-03.jpg"], "videos": [], "metadata": {"/assets/white-stork/white-stork-01.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.01 (1).jpeg", "sourceSHA256": "d1b258c837c9e35e305a16a3c8924a843b51c2697bb93b3116ee555eb07f8fdc", "assetSHA256": "7a8875f7dd24e658167b455e3cc98bce1370e2866333180d2c5a812259174a42", "alt": {"he": "חצר בית הכנסת והמבנה הנאו־קלאסי ברקע", "en": "Synagogue courtyard with its neoclassical building in the background", "pl": "Dziedziniec synagogi z neoklasycystycznym budynkiem w tle", "de": "Synagogenhof mit dem neoklassizistischen Gebäude im Hintergrund", "cs": "Dvůr synagogy s neoklasicistní budovou v pozadí"}, "familyForeground": false}, "/assets/white-stork/white-stork-02.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.46.24.jpeg", "sourceSHA256": "201f6f3dcb102370e8488d40e272ad5499245465194fad525e17624aae493a0d", "assetSHA256": "89a057a72d1ca2739eae117b47af767577dd6860b476ec8ed2e6d1c418052d13", "alt": {"he": "חזית מבני הקהילה היהודית לצד בית הכנסת", "en": "Jewish community buildings beside the synagogue", "pl": "Budynki gminy żydowskiej przy synagodze", "de": "Gebäude der jüdischen Gemeinde neben der Synagoge", "cs": "Budovy židovské obce vedle synagogy"}, "familyForeground": false}, "/assets/white-stork/white-stork-03.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.56.02.jpeg", "sourceSHA256": "bbdc78b7c81e53331aeae5d8496f442e30aa812a385472f1b885e106024c7040", "assetSHA256": "d051775d9c9176b0971d652dc5815d08a1fa83b60a44b391f33edb6c0186e335", "alt": {"he": "חלונות צבעוניים במבני הקהילה שבחצר", "en": "Coloured windows in the community buildings around the courtyard", "pl": "Kolorowe okna w budynkach gminy wokół dziedzińca", "de": "Farbige Fenster der Gemeindegebäude am Innenhof", "cs": "Barevná okna obecních budov kolem dvora"}, "familyForeground": false}}}, "provenance": {"contentType": "official-history-and-original-visit-photo-audit", "factualSources": [{"url": "https://fbk.org.pl/synagoga_pod_bialym_bocianem/historia-synagogi/", "checkedAt": "2026-10-20", "scope": "1829,architect,2010restoration,religious-culturalcontext"}, {"url": "https://fbk.org.pl/synagoga_pod_bialym_bocianem/", "checkedAt": "2026-10-20", "scope": "Currentnotice:FBKnolongerhandlesvisits;contactJewishcommunity"}, {"url": "https://www.wikidata.org/wiki/Q481571", "checkedAt": "2026-10-20", "scope": "Coordinatecrosscheck"}, {"url": "https://zabytek.pl/pl/obiekty/wroclaw-synagoga-pod-bialym-bocianem", "checkedAt": "2026-10-20", "scope": "OfficialNationalHeritageInstitute identity,architecture,2010restoration andgeolocationviaGoogleMapsoutgoingdestination", "coordinateEvidence": "https://www.google.com/maps/dir/?api=1&destination=51.108468291071%2C17.025364605411"}], "officialWebsiteAccess": "Community website returned502 throughwebreader and NordVPN threat-protection page in browser on2026-10-20; not bypassed. Use accessible official BenteKahan synagogue notice, which directs visitor enquiries to Jewishcommunity; no openinghours asserted.", "addressNotes": "NIDpropertyaddressPawlaWlodkowica5a;Jewishcommunityvisitor/contactaddressWlodkowica7. Samecourtyardcomplex,notseparatesynagogue."}, "coordinates": [51.108468291071, 17.025364605411], "address": {"street": "Pawła Włodkowica 7", "postalCode": "50-072", "city": "Wrocław", "country": "Poland"}, "tags": ["museums-history", "architecture-design", "jewish-heritage"], "website": "https://fbk.org.pl/synagoga_pod_bialym_bocianem/", "socialProfileFallback": false}),
    place({ id:"royal-palace-wroclaw", localName:"Pałac Królewski", name:t("הארמון המלכותי", "Royal Palace", "Pałac Królewski", "Königspalais", "Královský palác"), description:descriptions.palace, coordinates:[51.1076223,17.0292728], address:{street:"Kazimierza Wielkiego 35",postalCode:"50-077",city:"Wrocław",country:"Poland"}, categories:["museum","history","art"], tags:["museums-history","art-contemporary","architecture-design"], website:cityMuseum, experiences:[{id:"historical-museum",tags:["history"]},{id:"museum-of-medallic-art",tags:["art","history"]}] }),
    place({ id:"municipal-arsenal-wroclaw", localName:"Arsenał Miejski", name:t("הארסנל העירוני", "Municipal Arsenal", "Arsenał Miejski", "Städtisches Arsenal", "Městský arzenál"), description:descriptions.arsenal, coordinates:[51.1127984,17.0268468], address:{street:"Antoniego Cieszyńskiego 9",postalCode:"50-136",city:"Wrocław",country:"Poland"}, categories:["museum","history"], tags:["museums-history","architecture-design"], website:cityMuseum, experiences:[{id:"archaeological-museum",tags:["history","archaeology"]},{id:"military-museum",tags:["history","military"]}] }),
    place({ id:"old-jewish-cemetery-wroclaw", localName:"Stary Cmentarz Żydowski", name:t("בית הקברות היהודי הישן", "Old Jewish Cemetery", "Stary Cmentarz Żydowski", "Alter Jüdischer Friedhof", "Starý židovský hřbitov"), description:descriptions.cemetery, coordinates:[51.0876535,17.0269459], address:{street:"Ślężna 37/39",postalCode:"53-301",city:"Wrocław",country:"Poland"}, categories:["museum","history","heritage"], tags:["museums-history","architecture-design"], website:"https://muzeum.miejskie.wroclaw.pl/museum/sztuki-cmentarnej/" }),
    place({ id:"henryk-tomaszewski-theatre-museum", localName:"Muzeum Teatru im. Henryka Tomaszewskiego", name:t("מוזיאון התיאטרון ע״ש הנריק תומשבסקי", "Henryk Tomaszewski Theatre Museum", "Muzeum Teatru im. Henryka Tomaszewskiego", "Henryk-Tomaszewski-Theatermuseum", "Divadelní muzeum Henryka Tomaszewského"), description:descriptions.theatreMuseum, coordinates:[51.1069642,17.0278621], address:{street:"plac Wolności 7A",postalCode:"50-071",city:"Wrocław",country:"Poland"}, categories:["museum","theatre"], tags:["museums-history","theatre-performing-arts"], website:cityMuseum }),
    place({ id:"museum-of-architecture-wroclaw", localName:"Muzeum Architektury we Wrocławiu", name:t("המוזיאון לאדריכלות", "Museum of Architecture", "Muzeum Architektury", "Architekturmuseum", "Muzeum architektury"), description:descriptions.architecture, coordinates:[51.1094652,17.0420402], address:{street:"Bernardyńska 5",postalCode:"50-156",city:"Wrocław",country:"Poland"}, categories:["museum","architecture"], tags:["museums-history","architecture-design"], website:"https://ma.wroc.pl/" }),
    place({ id:"wroclaw-contemporary-museum", localName:"Muzeum Współczesne Wrocław", name:t("המוזיאון לאמנות עכשווית", "Wrocław Contemporary Museum", "Muzeum Współczesne Wrocław", "Museum für Gegenwartskunst Wrocław", "Vratislavské muzeum současného umění"), description:descriptions.contemporary, coordinates:[51.113059,17.0047051], address:{street:"plac Strzegomski 2A",postalCode:"53-681",city:"Wrocław",country:"Poland"}, categories:["museum","art"], tags:["art-contemporary","architecture-design"], website:"https://muzeumwspolczesne.pl/" }),
    place({ id:"pan-tadeusz-museum", localName:"Muzeum Pana Tadeusza", name:t("מוזיאון פאן טדאוש", "Pan Tadeusz Museum", "Muzeum Pana Tadeusza", "Pan-Tadeusz-Museum", "Muzeum Pana Tadeusze"), description:descriptions.tadeusz, coordinates:[51.1104299,17.0302752], address:{street:"Rynek 6",postalCode:"50-106",city:"Wrocław",country:"Poland"}, categories:["museum","literature","history"], tags:["museums-history"], website:"https://muzeumpanatadeusza.ossolineum.pl/" }),
    place({ id:"depot-history-centre", localName:"Centrum Historii Zajezdnia", name:t("מרכז ההיסטוריה זאייזדניה", "Depot History Centre", "Centrum Historii Zajezdnia", "Geschichtszentrum Zajezdnia", "Historické centrum Zajezdnia"), description:descriptions.depot, coordinates:[51.0965976,16.9912403], address:{street:"Grabiszyńska 184",postalCode:"53-235",city:"Wrocław",country:"Poland"}, categories:["museum","history"], tags:["museums-history"], website:"https://zajezdnia.org/" }),
    place({ id:"polish-theatre-wroclaw", localName:"Teatr Polski we Wrocławiu", name:t("התיאטרון הפולני", "Polish Theatre in Wrocław", "Teatr Polski we Wrocławiu", "Polnisches Theater Wrocław", "Polské divadlo ve Vratislavi"), description:descriptions.theatre, coordinates:[51.101278,17.0260842], address:{street:"Gabrieli Zapolskiej 3",postalCode:"50-032",city:"Wrocław",country:"Poland"}, categories:["theatre"], tags:["theatre-performing-arts"], website:"https://teatrpolski.wroc.pl/" }),
    place({ id:"wroclaw-contemporary-theatre", localName:"Wrocławski Teatr Współczesny", name:t("התיאטרון העכשווי של ורוצלב", "Wrocław Contemporary Theatre", "Wrocławski Teatr Współczesny", "Zeitgenössisches Theater Wrocław", "Vratislavské současné divadlo"), description:descriptions.theatre, coordinates:[51.1122412,17.0289254], address:{street:"Rzeźnicza 12",postalCode:"50-132",city:"Wrocław",country:"Poland"}, categories:["theatre"], tags:["theatre-performing-arts"], website:"https://www.wteatrw.pl/" }),
    place({ id:"wroclaw-puppet-theatre", localName:"Wrocławski Teatr Lalek", name:t("תיאטרון הבובות של ורוצלב", "Wrocław Puppet Theatre", "Wrocławski Teatr Lalek", "Breslauer Puppentheater", "Vratislavské loutkové divadlo"), description:descriptions.theatre, coordinates:[51.105053,17.033054], address:{street:"plac Teatralny 4",postalCode:"50-051",city:"Wrocław",country:"Poland"}, categories:["theatre","family"], tags:["theatre-performing-arts"], website:"https://teatrlalek.wroclaw.pl/" }),
    place({ id:"song-of-the-goat-theatre", localName:"Teatr Pieśń Kozła", name:t("תיאטרון שירת העז", "Song of the Goat Theatre", "Teatr Pieśń Kozła", "Song of the Goat Theatre", "Divadlo Pieśń Kozła"), description:descriptions.theatre, coordinates:[51.1103079,17.0397134], address:{street:"Jana Ewangelisty Purkyniego 1",postalCode:"50-155",city:"Wrocław",country:"Poland"}, categories:["theatre"], tags:["theatre-performing-arts"], website:"https://piesnkozla.pl/" }),
    place({ id:"new-horizons-cinema", localName:"Kino Nowe Horyzonty", name:t("קולנוע ניו הורייזונס", "New Horizons Cinema", "Kino Nowe Horyzonty", "Kino Nowe Horyzonty", "Kino Nowe Horyzonty"), description:descriptions.cinema, coordinates:[51.109306,17.026094], address:{street:"Kazimierza Wielkiego 19A-21",postalCode:"50-077",city:"Wrocław",country:"Poland"}, categories:["cinema","film"], tags:["film"], website:"https://kinonh.pl/" }),
    place({"id": "zyjnia-bwa-wroclaw", "aliases": ["galeria-dizajn"], "localName": "Żyjnia BWA Wrocław", "name": {"he": "ז׳ייניה, גלריה לאמנות ועיצוב", "en": "Żyjnia BWA Wrocław", "pl": "Żyjnia BWA Wrocław", "de": "Żyjnia BWA Wrocław", "cs": "Żyjnia BWA Wrocław"}, "description": {"he": "גלריה לאמנות ועיצוב עכשוויים בלב העיר, המחברת בין תערוכות לבין מרחב למנוחה והתבוננות. המקום פועל כסלון עירוני בהשראת בתי המרפא של שלזיה התחתונה, ומעודד מפגש עם אמנות באמצעות הדמיון והחושים. התערוכות והמיצבים משתנים; התמונות וסרטוני הביקור מתעדים את מה שראינו במקום. כדאי לבדוק באתר הרשמי את התוכנית ושעות הפתיחה לפני הביקור.", "en": "A contemporary art and design gallery in central Wrocław combining exhibitions with a space for rest and reflection. Conceived as an urban living room inspired by Lower Silesian spa traditions, it invites visitors to experience art through imagination and the senses. Exhibitions and installations change; our photos and visit clips document the gallery as we experienced it. Check the official programme and opening hours before visiting.", "pl": "Galeria sztuki współczesnej i projektowania w centrum Wrocławia łączy wystawy z przestrzenią odpoczynku i refleksji. Rozwija ideę miejskiego salonu inspirowanego dolnośląskimi uzdrowiskami i zaprasza do odbioru sztuki poprzez wyobraźnię i zmysły. Wystawy i instalacje się zmieniają; nasze zdjęcia i filmy pokazują galerię podczas wizyty. Przed przyjściem sprawdź aktualny program i godziny otwarcia na oficjalnej stronie.", "de": "Eine Galerie für Gegenwartskunst und Design im Zentrum von Breslau, die Ausstellungen mit Raum für Ruhe und Betrachtung verbindet. Als städtischer Salon, inspiriert von den Kurtraditionen Niederschlesiens, lädt sie dazu ein, Kunst mit Fantasie und Sinnen zu erleben. Ausstellungen und Installationen wechseln; unsere Fotos und Besuchsvideos dokumentieren den damaligen Besuch. Aktuelles Programm und Öffnungszeiten vorab auf der offiziellen Website prüfen.", "cs": "Galerie současného umění a designu v centru Vratislavi spojuje výstavy s prostorem pro odpočinek a rozjímání. Rozvíjí myšlenku městského salonu inspirovaného dolnoslezskými lázněmi a zve k vnímání umění prostřednictvím představivosti a smyslů. Výstavy a instalace se mění; naše fotografie a videa zachycují galerii při návštěvě. Předem si ověřte aktuální program a otevírací dobu na oficiálním webu."}, "coordinates": [51.1086376, 17.0331186], "address": {"street": "Świdnicka 2-4", "postalCode": "50-067", "city": "Wrocław", "country": "Poland"}, "categories": ["gallery", "art", "design"], "tags": ["art-contemporary", "architecture-design"], "website": "https://bwa.wroc.pl/galeria/zyjnia/", "media": {"thumbnail": "/assets/zyjnia-bwa/zyjnia-refresh-oct20-01.jpg", "photos": ["/assets/zyjnia-bwa/zyjnia-refresh-oct20-01.jpg", "/assets/zyjnia-bwa/zyjnia-01.jpg", "/assets/zyjnia-bwa/zyjnia-02.jpg", "/assets/zyjnia-bwa/zyjnia-03.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-02.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-03.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-04.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-05.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-06.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-07.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-08.jpg", "/assets/zyjnia-bwa/zyjnia-refresh-oct20-09.jpg"], "videos": ["https://youtube.com/shorts/umUSV_b5q6w", "https://youtube.com/shorts/VWojyNlXCAI", "https://youtube.com/shorts/8otgPq47xtw", "https://youtube.com/shorts/CbgJvJMkd-k", "https://youtube.com/shorts/1Y75V_JyTJg", "https://youtube.com/shorts/C84x5KSdeqQ", "https://youtube.com/shorts/8QNaMIMs-As"], "metadata": {"/assets/zyjnia-bwa/zyjnia-01.jpg": {"sourceFile": "WhatsApp Image 2026-10-19 at 08.42.32.jpeg", "original": true, "alt": {"he": "חזית הגלריה ברחוב שווידניצקה", "en": "Gallery façade on Świdnicka street", "pl": "Fasada galerii przy ulicy Świdnickiej", "de": "Galeriefassade an der Świdnicka-Straße", "cs": "Průčelí galerie v ulici Świdnicka"}, "sha256Original": "3bcf19f09494de9aeaad65008ced033d0782855779ef2efa096510ab100c15aa"}, "/assets/zyjnia-bwa/zyjnia-02.jpg": {"sourceFile": "WhatsApp Image 2026-10-19 at 08.42.12 (3).jpeg", "original": true, "alt": {"he": "סביבת הגלריה ברחוב שווידניצקה", "en": "The gallery and its Świdnicka street setting", "pl": "Galeria i jej otoczenie przy ulicy Świdnickiej", "de": "Galerie und Umgebung an der Świdnicka-Straße", "cs": "Galerie a okolí v ulici Świdnicka"}, "sha256Original": "7ef8b41e5094ee90c001843da13699d3afdfaa53eb00765dd224f54fa77a053d"}, "/assets/zyjnia-bwa/zyjnia-03.jpg": {"sourceFile": "WhatsApp Image 2026-10-19 at 08.42.32 (3).jpeg", "original": true, "alt": {"he": "חלון ויטראז׳ ומעקה בחדר המדרגות", "en": "Stained-glass window and staircase railing", "pl": "Witraż i balustrada klatki schodowej", "de": "Buntglasfenster und Treppengeländer", "cs": "Vitrážové okno a zábradlí schodiště"}, "sha256Original": "d859a933a74c5a7b0fd40b997f24cd10f45e4326940df0abf7d9210763ec9602"}, "https://youtube.com/shorts/umUSV_b5q6w": {"title": {"he": "חלון הוויטראז׳ והמדרגות", "en": "Stained-glass staircase", "pl": "Witraż i schody", "de": "Buntglasfenster und Treppe", "cs": "Vitráž a schodiště"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.15.mp4", "sourceSha256": "4e5c772dcc6fcfbf920c5b9560492cec36cc7106de9eb8f13a3e201e3952bb34", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.769Z", "durationSeconds": 17.466667}, "https://youtube.com/shorts/VWojyNlXCAI": {"title": {"he": "חזית הגלריה וסביבתה ברחוב שווידניצקה", "en": "Gallery façade and Świdnicka street", "pl": "Fasada galerii i ulica Świdnicka", "de": "Galeriefassade und Świdnicka-Straße", "cs": "Průčelí galerie a ulice Świdnicka"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.10.mp4", "sourceSha256": "b02f4c71bd95026b9ce69e64f3f347e3d6fa9525a9abcad6b132b5b9749a55d1", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.771Z", "durationSeconds": 14.44}, "https://youtube.com/shorts/8otgPq47xtw": {"title": {"he": "פרט ממיצב הצדף", "en": "Shell installation detail", "pl": "Detal instalacji z muszlą", "de": "Detail einer Muschel-Installation", "cs": "Detail instalace s mušlí"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.18 (1).mp4", "sourceSha256": "4d039124e3a7ec1bae20703aa0b202ff5014ffad887979348367d3305f8b910f", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.771Z", "durationSeconds": 3.0}, "https://youtube.com/shorts/CbgJvJMkd-k": {"title": {"he": "תצוגה המזמינה להאט ולנוח", "en": "Pause and rest display", "pl": "Ekspozycja zachęcająca do odpoczynku", "de": "Ausstellung zum Innehalten und Ausruhen", "cs": "Expozice vybízející ke zpomalení a odpočinku"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.20.mp4", "sourceSha256": "2a33b41a2e6678f6954f20f4db521fca4136f400f0e2d2f64f2e3af0726c0aae", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.771Z", "durationSeconds": 5.566667}, "https://youtube.com/shorts/1Y75V_JyTJg": {"title": {"he": "חלל פנימי ודרך גישה לצד קיר אריחים", "en": "Tiled interior and ramp", "pl": "Wnętrze z płytkami i podjazd", "de": "Innenraum mit Fliesen und Rampe", "cs": "Interiér s obklady a rampou"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.21.mp4", "sourceSha256": "234cc8e63cb19fbaedebc6fdf8a6750700a08b9d59e9f485415bc0200873a491", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.771Z", "durationSeconds": 5.433333}, "https://youtube.com/shorts/C84x5KSdeqQ": {"title": {"he": "פרט בקיר הקרמיקה", "en": "Ceramic wall detail", "pl": "Detal ściany ceramicznej", "de": "Detail der Keramikwand", "cs": "Detail keramické stěny"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.18.mp4", "sourceSha256": "78565c9e4bef659600ebb57a11d42d7024b2afcaee65a7de8e72fc68b4cac66d", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.771Z", "durationSeconds": 3.6}, "https://youtube.com/shorts/8QNaMIMs-As": {"title": {"he": "מיצב וידאו שתועד בביקור שלנו", "en": "Video installation during our visit", "pl": "Instalacja wideo podczas naszej wizyty", "de": "Videoinstallation bei unserem Besuch", "cs": "Videoinstalace při naší návštěvě"}, "sourceFile": "WhatsApp Video 2026-10-05 at 18.26.24.mp4", "sourceSha256": "872279b782a6c5ae1615c40c1433142822cf3de5072fd4deebc2f9c284941d47", "originalPicture": true, "audio": "omitted", "publicVerifiedAt": "2026-10-20T08:29:37.771Z", "durationSeconds": 17.966667}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-01.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.17.jpeg", "sourceSHA256": "113e5efbbd306ffa3a786fcf0745b30ba05c7eed0f0d32e81e81d50dbb9d4349", "assetSHA256": "3485c2cb15eb57eff4f26d74cb65ffd714481eeaafa3ce51968d63e8bc0cde9e", "alt": {"he": "חזית הגלריה עם שלטי המקום והכניסה הצהובה", "en": "Gallery façade with its signs and yellow entrance", "pl": "Fasada galerii z szyldami i żółtym wejściem", "de": "Galeriefassade mit Beschriftung und gelbem Eingang", "cs": "Průčelí galerie s nápisy a žlutým vstupem"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-02.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (10).jpeg", "sourceSHA256": "dfed7da734946f75b526882f4e917fe0348d0b3014f66ce946af20ae1b97da59", "assetSHA256": "3a51ca323870d6eeaba22eb66d92a9da2acc1d3eae6107d3bae58173fe648bf6", "alt": {"he": "עבודת טקסטיל ירוקה מתצוגת הגלריה בעת הביקור", "en": "Green textile artwork displayed during our gallery visit", "pl": "Zielona praca tekstylna podczas naszej wizyty w galerii", "de": "Grünes Textilkunstwerk während unseres Galeriebesuchs", "cs": "Zelené textilní dílo při naší návštěvě galerie"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-03.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (2).jpeg", "sourceSHA256": "241777346b2f939e9ab0c627686e94dd15a4ca70e187025a6dfcf1e0138280c1", "assetSHA256": "921ed27997287f6593686e1c53c39dec7c72a926bea408ceeefd86ed50be3bbe", "alt": {"he": "כרזה ממוסגרת עם הכיתוב ארבעה ביוני, יום החירות", "en": "Framed poster reading 4 June, Freedom Day", "pl": "Oprawiony plakat z napisem 4 czerwca, Dzień Wolności", "de": "Gerahmtes Plakat mit der Aufschrift 4. Juni, Tag der Freiheit", "cs": "Zarámovaný plakát s nápisem 4. června, Den svobody"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-04.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (3).jpeg", "sourceSHA256": "2f80eb2cf3a8ba355de6498f5b1d8a59581f6841ef2ede5bbdbc4d7bc4b48a21", "assetSHA256": "43fe467945a6dbb016ad98ab5013db24205852489ca6de218be42a98f4176d91", "alt": {"he": "שלט הכוונה פנימי בגלריה בין שתי הכניסות", "en": "Interior gallery wayfinding between the two entrances", "pl": "Oznakowanie wewnętrzne galerii między dwoma wejściami", "de": "Wegweiser in der Galerie zwischen den beiden Eingängen", "cs": "Vnitřní rozcestník galerie mezi dvěma vstupy"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-05.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (4).jpeg", "sourceSHA256": "c771dfa99377ab9dc66cb6e156b0613ec72bbfbb83e7910cf2cfd9c6c7b9a1aa", "assetSHA256": "ab3c0720b7c83559f04eeae37db1879fa2106c9d9f4c0760e33fcccadd4d5406", "alt": {"he": "שתי עבודות צילום ממוסגרות בתצוגה", "en": "Two framed photographic works on display", "pl": "Dwie oprawione prace fotograficzne na wystawie", "de": "Zwei gerahmte fotografische Arbeiten in der Ausstellung", "cs": "Dvě zarámovaná fotografická díla na výstavě"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-06.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (5).jpeg", "sourceSHA256": "839d232a35711b046ed5f9ef28545a4a4fb038c8776121327ccac6884e25480b", "assetSHA256": "57a18f2a9f504c6f32672a059fbad7e50744cb4a23e4e378b65d3990990fd698", "alt": {"he": "עבודת צילום במסגרת צהובה בתצוגה", "en": "Photographic artwork in a yellow frame", "pl": "Praca fotograficzna w żółtej ramie", "de": "Fotografisches Werk in einem gelben Rahmen", "cs": "Fotografické dílo ve žlutém rámu"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-07.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (6).jpeg", "sourceSHA256": "a933d8c4b69ffc7aa35e6edafca1633f921c90864ad8ff1f1d1c0a93597d91ad", "assetSHA256": "0a24115129c7f8d1172f893150266becc394d0aeefdc75fabb4f2538a63d2677", "alt": {"he": "מיצב אור עגול על קיר הגלריה", "en": "Circular light installation on the gallery wall", "pl": "Okrągła instalacja świetlna na ścianie galerii", "de": "Runde Lichtinstallation an der Galeriewand", "cs": "Kruhová světelná instalace na stěně galerie"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-08.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (7).jpeg", "sourceSHA256": "ac2b4421f4f44e8f83e6bff60beaba8169e8d4802137c861c98923c371e5b7eb", "assetSHA256": "059325bd5e3873dfa5a9f74b5f2d85223cdca35ec5c9ada6029a6d656fa63627", "alt": {"he": "אריחים צבעוניים וספסל בחלל הגלריה", "en": "Colourful tiles and a bench in the gallery", "pl": "Kolorowe płytki i ławka we wnętrzu galerii", "de": "Bunte Fliesen und eine Bank im Galerieraum", "cs": "Barevné obklady a lavice v galerii"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}, "/assets/zyjnia-bwa/zyjnia-refresh-oct20-09.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/BWA/WhatsApp Image 2026-10-20 at 13.11.05 (8).jpeg", "sourceSHA256": "9cda2a3f02c1872777170c86627a79edc531a1671d3c0f022284b1437dbcc52b", "assetSHA256": "55c3dce8fa2537d05f6edd93bcbf4614c47bf4418fde13ab2c9bc01b0d29ad4d", "alt": {"he": "עבודת טקסטיל צבעונית על קיר ירוק", "en": "Colourful textile artwork on a green wall", "pl": "Kolorowa praca tekstylna na zielonej ścianie", "de": "Buntes Textilkunstwerk an einer grünen Wand", "cs": "Barevné textilní dílo na zelené stěně"}, "familyForeground": false, "selectionReason": "Gallery exterior or exhibition detail; identity confirmed by façade signs, Żyjnia wayfinding and matching interior tiles; no personal posed subjects", "sourceDirectory": "BWA"}}, "guideVideos": {"he": "https://youtube.com/shorts/ZO-A54BIZQk", "en": "https://youtube.com/shorts/BAueoGqdcC4"}}, "provenance": {"factualSources": [{"type": "official", "url": "https://bwa.wroc.pl/galeria/zyjnia/", "checkedAt": "2026-10-20"}], "mediaSource": "Original WROC-LOVE visit photographs and videos; see data/zyjnia-enrichment-provenance.json", "refreshSource": "data/bwa-refresh-provenance.json"}, "socialProfileFallback": false}),
    place({ id:"sic-gallery-bwa-wroclaw", localName:"Galeria SiC! BWA Wrocław", name:t("גלריית SiC! BWA", "SiC! Gallery BWA Wrocław", "Galeria SiC! BWA Wrocław", "Galerie SiC! BWA Wrocław", "Galerie SiC! BWA Wrocław"), description:descriptions.gallery, coordinates:[51.1025544,17.0287526], address:{street:"plac Kościuszki 9/10",postalCode:"50-028",city:"Wrocław",country:"Poland"}, categories:["gallery","art","design"], tags:["art-contemporary","architecture-design"], website:"https://bwa.wroc.pl/" }),
    place({ id:"studio-bwa-wroclaw", localName:"Studio BWA Wrocław", name:t("סטודיו BWA ורוצלב", "Studio BWA Wrocław", "Studio BWA Wrocław", "Studio BWA Wrocław", "Studio BWA Wrocław"), description:descriptions.gallery, coordinates:[51.1102855,17.0245017], address:{street:"Ruska 46A",postalCode:"50-079",city:"Wrocław",country:"Poland"}, categories:["gallery","art"], tags:["art-contemporary"], website:"https://bwa.wroc.pl/" }),
    place({ id:"museum-of-pharmacy-wroclaw", localName:"Muzeum Farmacji Uniwersytetu Medycznego", name:t("מוזיאון הרוקחות", "Museum of Pharmacy", "Muzeum Farmacji", "Pharmazie-Museum", "Muzeum farmacie"), description:descriptions.pharmacy, coordinates:[51.1097389,17.0340548], address:{street:"Kurzy Targ 4",postalCode:"50-103",city:"Wrocław",country:"Poland"}, categories:["museum","history"], tags:["museums-history"], website:"https://umw.edu.pl/pl/muzeum-farmacji" }),
    place({ id:"wuwa-estate", localName:"Osiedle WuWA", name:t("שכונת WuWA", "WuWA Housing Estate", "Osiedle WuWA", "WuWA-Siedlung", "Sídliště WuWA"), description:descriptions.wuwa, coordinates:[51.1066175,17.0855336], address:{street:"Zielonego Dębu 21",postalCode:"51-621",city:"Wrocław",country:"Poland"}, categories:["architecture","area"], tags:["architecture-design"], website:"https://wuwa.eu/", socialPosts:[{platform:"facebook",url:"https://www.facebook.com/share/p/19G81XL7j2/"},{platform:"instagram",url:"https://www.instagram.com/p/Dcq_ageDDb4/?img_index=1"}], media:{photos:["/assets/wuwa-estate-14.jpg","/assets/wuwa-estate-21.jpg","/assets/wuwa-estate-11.jpg","/assets/wuwa-estate-12.jpg","/assets/wuwa-estate-13.jpg","/assets/wuwa-estate-15.jpg","/assets/wuwa-estate-22.jpg","/assets/wuwa-estate-16.jpg","/assets/wuwa-estate-17.jpg","/assets/wuwa-estate-18.jpg","/assets/wuwa-estate-19.jpg","/assets/wuwa-estate-20.jpg","/assets/wuwa-estate-02.jpg","/assets/wuwa-estate-05.jpg","/assets/wuwa-estate-06.jpg","/assets/wuwa-estate-07.jpg","/assets/wuwa-estate-08.jpg","/assets/wuwa-estate-09.jpg","/assets/wuwa-estate-10.jpg"],guideVideos:{he:"https://youtube.com/shorts/tEbmB6OWe90",en:"https://youtube.com/shorts/4EnO5yNkQxc"},videos:["/assets/wuwa-cafe-visit-01.mp4","/assets/wuwa-estate-visit-01.mp4","/assets/wuwa-estate-visit-02.mp4","/assets/wuwa-estate-visit-03.mp4","/assets/wuwa-estate-visit-04.mp4","/assets/wuwa-estate-visit-05.mp4","/assets/wuwa-estate-visit-06.mp4","/assets/wuwa-estate-visit-07.mp4"],metadata:{
      "/assets/wuwa-estate-visit-01.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.33.50.mp4",sourceSha256:"45cd628a34b22b2325190627b1947df68fbb8f18efc8730607d8a05a67505553"},
      "/assets/wuwa-estate-visit-02.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.33.54.mp4",sourceSha256:"3d4f09848c8f587550cc2a04bbc5daf2a0b37279995b8dba4c45b64b396eb2ae"},
      "/assets/wuwa-estate-visit-03.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.34.01.mp4",sourceSha256:"c7066316e231fb008e298e76e22f2948df0e88b170071780429028a788285a30"},
      "/assets/wuwa-estate-visit-04.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.34.02.mp4",sourceSha256:"0ba0ca75b8d60a0bf7e4d8896ea0fe70999305f967753cbfcc8a70c3f9ff0e0f"},
      "/assets/wuwa-estate-visit-05.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.34.22.mp4",sourceSha256:"4f1a5faf3c4e549683d5e32d57112304bd968f9469aa5d8fa4a26907efecbcbd"},
      "/assets/wuwa-estate-visit-06.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.34.23.mp4",sourceSha256:"3673c702ad4035608c7ec88fe0a4291ec255ed2c05a97f023b48174dd11cd9a0"},
      "/assets/wuwa-estate-visit-07.mp4":{tags:["wuwa","visit-clip"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.34.26.mp4",sourceSha256:"a3f32558cd113c206155ade57902cf3b5eb5435735c09b3ee889e4930349c11c"},
      "/assets/wuwa-cafe-visit-01.mp4":{tags:["wuwa-cafe","visitor-stop","tram"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.34.30.mp4",sourceSha256:"f6ebd79d501c4ca6c6e140f72fffff64b98e93cef7e6ef725c3b8d1b33114dae"},
      "/assets/wuwa-estate-02.jpg":{tags:["wuwa","park","pond","landscape"],original:true,editedToRemovePeople:true,sourceFile:"Untitled - 19 July 2026 at 11.40.26.jpeg"},
      "/assets/wuwa-estate-05.jpg":{tags:["wuwa","park","landscape"],original:true,sourceFile:"IMG_4590.JPG"},
      "/assets/wuwa-estate-06.jpg":{tags:["wuwa-cafe","visitor-stop","menu"],original:true,sourceFile:"IMG_4578.JPG"},
      "/assets/wuwa-estate-07.jpg":{tags:["wuwa-cafe","visitor-stop","food"],original:true,sourceFile:"IMG_4582.JPG"},
      "/assets/wuwa-estate-08.jpg":{tags:["wuwa","entrance-sign","personal-visit"],original:true,sourceFile:"WhatsApp Image 2026-07-18 at 11.39.48.jpeg"},
      "/assets/wuwa-estate-09.jpg":{tags:["wuwa","modernist-interior","visitor-detail"],original:true,sourceFile:"WhatsApp Image 2026-07-18 at 11.41.26 (1).jpeg"},
      "/assets/wuwa-estate-10.jpg":{tags:["wuwa","park","personal-visit"],original:true,sourceFile:"WhatsApp Image 2026-07-18 at 11.41.26.jpeg"},
      "/assets/wuwa-estate-11.jpg":{tags:["wuwa", "park-hotel", "modernist-architecture"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.49.jpeg",sourceSha256:"ec4b039c6cf612b16fb2491e3c9755a324fad58048e8203457d58e3414eeab9f",alt:t("חזית המלון בשכונת המגורים הניסיונית","Park Hotel facade at the experimental housing estate","Fasada Park Hotelu na osiedlu eksperymentalnym","Fassade des Park Hotels in der experimentellen Wohnsiedlung","Průčelí Park Hotelu na experimentálním sídlišti")},
      "/assets/wuwa-estate-12.jpg":{tags:["wuwa", "modernist-architecture", "residential-facade"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.53 (1).jpeg",sourceSha256:"b4c0395b636e8d58748ad4377322309a59f943abd777fdc180d0dd6519c1b3b7",alt:t("חזית מגורים מודרניסטית לצד הרחוב","Modernist residential facade beside the street","Modernistyczna fasada mieszkalna przy ulicy","Modernistische Wohnhausfassade an der Straße","Modernistické průčelí obytného domu u ulice")},
      "/assets/wuwa-estate-13.jpg":{tags:["wuwa", "modernist-architecture", "blue-window-band"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.57 (1).jpeg",sourceSha256:"7f0f8ee219315805703a32d5e120ad833784c1f0bb257d45b726f5d2c74f1f6a",alt:t("בית מודרניסטי עם פס כחול וחלונות אופקיים","Modernist house with a blue band and horizontal windows","Modernistyczny dom z niebieskim pasem i poziomymi oknami","Modernistisches Haus mit blauem Band und horizontalen Fenstern","Modernistický dům s modrým pásem a vodorovnými okny")},
      "/assets/wuwa-estate-14.jpg":{tags:["wuwa", "architecture-model", "visitor-information", "hero"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.58 (1).jpeg",sourceSha256:"035a5c6c220bf1d59cc77f1b304e8a3cca1b00c1a2a515b90f47bd6fbcbad440",alt:t("הדגם האדריכלי של שכונת המגורים הניסיונית","Architectural model of the experimental housing estate","Model architektoniczny osiedla eksperymentalnego","Architekturmodell der experimentellen Wohnsiedlung","Architektonický model experimentálního sídliště"),heroCandidate:true},
      "/assets/wuwa-estate-15.jpg":{tags:["wuwa", "architecture-model", "detail"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.58 (3).jpeg",sourceSha256:"19da5cae8c8424bd724f5af124c828a4988cfd9860a7f828304b676b20b0538a",alt:t("פרט של בתים טוריים בדגם האדריכלי","Detail of terraced houses in the architectural model","Detal domów szeregowych w modelu architektonicznym","Detail der Reihenhäuser im Architekturmodell","Detail řadových domů v architektonickém modelu")},
      "/assets/wuwa-estate-16.jpg":{tags:["wuwa", "architecture-exhibition", "visitor-information"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.34.25 (1).jpeg",sourceSha256:"956724f26b5394ec99f9fd6c3f5fb34cc010938102f1110e09383f46417bf399",alt:t("לוחות תצוגה של תערוכת אדריכלות בחוץ","Outdoor architecture exhibition display panels","Plansze plenerowej wystawy architektonicznej","Tafeln einer Architekturausstellung im Freien","Panely venkovní výstavy architektury")},
      "/assets/wuwa-estate-17.jpg":{tags:["wuwa", "modernist-architecture", "landscape"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.34.25.jpeg",sourceSha256:"a831d4a065e33e882937ffdfb9a99228aced1d4bae75d12471259a544eeb007c",alt:t("בניין מגורים מודרניסטי לצד ערוגות וגינה","Modernist residential building beside planted beds and a garden","Modernistyczny budynek mieszkalny przy rabatach i ogrodzie","Modernistisches Wohngebäude neben Pflanzbeeten und Garten","Modernistický obytný dům u záhonů a zahrady")},
      "/assets/wuwa-estate-18.jpg":{tags:["wuwa-cafe", "food", "visitor-stop"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.26.10 (2).jpeg",sourceSha256:"d98d3d1cc92ae595c5dc038114d73388f3dd367a148ba3778741d29e496bc508",alt:t("עוגה וקפה בהפסקה בבית הקפה של השכונה","Cake and coffee during a stop at WuWA café","Ciasto i kawa podczas przerwy w kawiarni WuWA","Kuchen und Kaffee bei einer Pause im WuWA Café","Dort a káva během zastávky v kavárně WuWA")},
      "/assets/wuwa-estate-19.jpg":{tags:["wuwa-cafe", "terrace", "visitor-stop"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 19.02.58.jpeg",sourceSha256:"331dacf2341a96e0890d90e6e6dd4086a79115b4bc49f269648d5f3ab62faadb",alt:t("כיסא נוח ממותג בבית הקפה של השכונה","Branded deckchair at WuWA café","Leżak z logo kawiarni WuWA","Liegestuhl mit dem Logo des WuWA Cafés","Lehátko s logem kavárny WuWA")},
      "/assets/wuwa-estate-20.jpg":{tags:["wuwa-cafe", "terrace", "tram", "visitor-stop"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 19.02.58 (5).jpeg",sourceSha256:"6bd89e0faba3b34f33db8c5712531013d78f8094a8ec35dad40c5a021ac2c41b",alt:t("מבט מהמרפסת של בית הקפה אל החשמלית הכחולה","View from the WuWA café terrace towards a blue tram","Widok z tarasu kawiarni WuWA na niebieski tramwaj","Blick von der Terrasse des WuWA Cafés auf eine blaue Straßenbahn","Pohled z terasy kavárny WuWA na modrou tramvaj")},
      "/assets/wuwa-estate-21.jpg":{tags:["wuwa", "entrance-sign", "architecture"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.53.jpeg",sourceSha256:"b835c68f7b5e7df7e52a0790929b00ebf86fdf2876997ed19a339a4f2d832e09",alt:t("שלט הכניסה הלבן של שכונת המגורים בין העצים","White WuWA entrance sign among the trees","Biały napis WuWA przy wejściu wśród drzew","Weißer WuWA Schriftzug am Eingang zwischen den Bäumen","Bílý nápis WuWA u vstupu mezi stromy")},
      "/assets/wuwa-estate-22.jpg":{tags:["wuwa", "architecture-model", "curved-building-detail"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.33.59 (1).jpeg",sourceSha256:"37a77bf619d64de1d950867b562642cd916e0ef8ea61a1ec23d7b0090bfb0032",alt:t("פרט של מבנה מעוגל בדגם האדריכלי של השכונה","Curved building detail in the estate architectural model","Detal zakrzywionego budynku w modelu architektonicznym osiedla","Detail eines gebogenen Gebäudes im Architekturmodell der Siedlung","Detail zakřivené budovy v architektonickém modelu sídliště")}
    }}, provenance:{contentType:"personal-visit",personalVisit:true,originalPhotography:true,editedPhotography:true} }),

    place({ id:"town-hall", localName:"Ratusz we Wrocławiu", name:t("בית העירייה העתיק", "Wrocław Old Town Hall", "Ratusz we Wrocławiu", "Altes Rathaus Breslau", "Stará radnice ve Vratislavi"), description:t("בית עירייה גותי ובתוכו המוזיאון לאמנות בורגנית.", "A Gothic town hall housing the Museum of Bourgeois Art.", "Gotycki ratusz mieszczący Muzeum Sztuki Mieszczańskiej.", "Gotisches Rathaus mit dem Museum der Bürgerlichen Kunst.", "Gotická radnice s Muzeem měšťanského umění."), coordinates:[51.10993,17.0317], categories:["architecture","museum","history"], tags:["museums-history","architecture-design"], website:cityMuseum, experiences:[{id:"museum-of-bourgeois-art",tags:["art","history"]}] }),
    place({ id:"panorama", localName:"Panorama Racławicka", name:t("פנורמת רצלאביצה", "Racławice Panorama", "Panorama Racławicka", "Panorama von Racławice", "Racławické panorama"), description:t("ציור פנורמי מונומנטלי בביקור בשעה מוזמנת.", "A monumental panoramic painting visited at a reserved time.", "Monumentalne malowidło panoramiczne zwiedzane o zarezerwowanej godzinie.", "Monumentales Panoramagemälde mit festem Besuchstermin.", "Monumentální panoramatický obraz s návštěvou v rezervovaném čase."), coordinates:[51.11027,17.04457], categories:["museum","history","art"], tags:["museums-history","art-contemporary"], website:"https://mnwr.pl/oddzialy/panorama-raclawicka/" }),
    place({ id:"national-museum", localName:"Muzeum Narodowe we Wrocławiu", name:t("המוזיאון הלאומי בוורוצלב", "National Museum in Wrocław", "Muzeum Narodowe we Wrocławiu", "Nationalmuseum Breslau", "Národní muzeum ve Vratislavi"), description:t("אוספי אמנות שלזית ופולנית בבניין היסטורי עטוי קיסוס.", "Silesian and Polish art collections in a historic ivy-covered building.", "Zbiory sztuki śląskiej i polskiej w zabytkowym budynku porośniętym bluszczem.", "Schlesische und polnische Kunst in einem historischen, efeubewachsenen Gebäude.", "Sbírky slezského a polského umění v historické budově porostlé břečťanem."), coordinates:[51.11061,17.04725], categories:["museum","art","history"], tags:["museums-history","art-contemporary"], website:"https://mnwr.pl/", experiences: [{"id":"peace-churches-silverwork-2026","type":"temporary-exhibition","name":{"he":"תערוכת אוצרות כנסיות השלום פתוחה עד 30 בדצמבר","en":"Churches of Peace silverwork: on view until 30 December","pl":"Złotnictwo kościołów pokoju: wystawa do 30 grudnia","de":"Goldschmiedekunst der Friedenskirchen: Ausstellung bis 30. Dezember","cs":"Zlatnictví kostelů míru: výstava do 30. prosince"},"description":{"he":"תערוכת הצורפות מכנסיות השלום ביאבור ובשווידניצה מוצגת במוזיאון הלאומי בוורוצלב מ־1 באוקטובר עד 30 בדצמבר 2026. הכניסה לתערוכה חופשית. הזדמנות לחבר בין הביקור במוזיאון לבין כנסיות המורשת בשלזיה התחתית; בדקו את שעות המוזיאון לפני ההגעה.","en":"The National Museum in Wrocław presents silverwork from the Churches of Peace in Jawor and Świdnica from 1 October to 30 December 2026. Admission to this temporary exhibition is free. Pair the museum visit with the historic churches in Lower Silesia; check museum opening hours before visiting.","pl":"Muzeum Narodowe we Wrocławiu prezentuje złotnictwo kościołów pokoju w Jaworze i Świdnicy od 1 października do 30 grudnia 2026. Wstęp na wystawę czasową jest bezpłatny. Połącz wizytę w muzeum z poznawaniem dolnośląskich kościołów; sprawdź godziny muzeum.","de":"Das Nationalmuseum Breslau zeigt vom 1. Oktober bis 30. Dezember 2026 Goldschmiedekunst aus den Friedenskirchen in Jawor und Świdnica. Der Eintritt zu dieser Sonderausstellung ist frei. Verbinden Sie den Museumsbesuch mit den historischen Kirchen in Niederschlesien; Öffnungszeiten prüfen.","cs":"Národní muzeum ve Vratislavi vystavuje zlatnické práce z kostelů míru v Jaworu a Świdnici od 1. října do 30. prosince 2026. Vstup na tuto dočasnou výstavu je zdarma. Návštěvu lze spojit s poznáváním historických kostelů v Dolním Slezsku; ověřte otevírací dobu muzea."},"startDate":"2026-10-01","endDate":"2026-12-30","status":"confirmed","sourceUrl":"https://mnwr.pl/nowozytne-zlotnictwo-slaskich-kosciolow-pokoju/","verifiedAt":"2026-10-12","tags":["art","history","temporary-exhibition"]}], provenance: { factualSources: [{ type: "official", url: "https://mnwr.pl/", checkedAt: "2026-10-12" }, { type: "official", url: "https://mnwr.pl/nowozytne-zlotnictwo-slaskich-kosciolow-pokoju/", checkedAt: "2026-10-12" }] } }),
    place({ id:"four-domes", localName:"Pawilon Czterech Kopuł", name:t("ביתן ארבע הכיפות", "Four Domes Pavilion", "Pawilon Czterech Kopuł", "Vier-Kuppel-Pavillon", "Pavilon čtyř kopulí"), description:t("שלוחה לאמנות עכשווית של המוזיאון הלאומי במבנה מודרניסטי.", "The National Museum's contemporary-art branch in a modernist building.", "Oddział sztuki współczesnej Muzeum Narodowego w modernistycznym budynku.", "Abteilung für Gegenwartskunst des Nationalmuseums in einem modernen Gebäude.", "Pobočka současného umění Národního muzea v modernistické budově."), coordinates:[51.10805,17.07527], categories:["museum","art","architecture"], tags:["art-contemporary","architecture-design"], website:"https://mnwr.pl/oddzialy/pawilon-czterech-kopul/", socialPosts:[{platform:"facebook",url:"https://www.facebook.com/share/p/1CAQHdKSat/"},{platform:"instagram",url:"https://www.instagram.com/p/DcqyG24DMHg/"},{platform:"instagram",language:"en",url:"https://www.instagram.com/wroclaw.lowersilesia/reel/DeALvKfB6Xw/"}], media:{photos:["/assets/four-domes-pavilion-02.jpg","/assets/four-domes-pavilion-01.jpg","/assets/four-domes-pavilion-03.jpg"],videos:["/assets/video-four-domes-pavilion-01.mp4","/assets/video-four-domes-pavilion-02.mp4"],guideVideos:{he:"https://youtube.com/shorts/cs7AmJhitLo",en:"https://youtube.com/shorts/Ud5KD21e5kE"},metadata:{
      "/assets/four-domes-pavilion-01.jpg":{tags:["four-domes-pavilion","architecture","side-view"],original:true,sourceFile:"IMG_5067.JPG",alt:t("מבט צדדי על אחת הכיפות והאכסדרה של הפביליון", "Side view of a dome and colonnade at the pavilion", "Boczny widok kopuły i kolumnady pawilonu", "Seitenansicht einer Kuppel und Kolonnade des Pavillons", "Boční pohled na kupoli a kolonádu pavilonu")},
      "/assets/four-domes-pavilion-02.jpg":{tags:["four-domes-pavilion","architecture","front-facade","hero"],original:true,heroCandidate:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.32.03.jpeg",alt:t("החזית והכיפה של ביתן ארבע הכיפות", "Front facade and dome of the Four Domes Pavilion", "Fasada i kopuła Pawilonu Czterech Kopuł", "Fassade und Kuppel des Vier-Kuppel-Pavillons", "Průčelí a kupole Pavilonu čtyř kopulí")},
      "/assets/four-domes-pavilion-03.jpg":{tags:["four-domes-pavilion","architecture","angled-facade"],original:true,sourceFile:"WhatsApp Image 2026-09-24 at 17.32.03 (1).jpeg",alt:t("חזית ביתן ארבע הכיפות במבט אלכסוני", "Angled view of the Four Domes Pavilion facade", "Fasada Pawilonu Czterech Kopuł z ukosa", "Schrägansicht der Fassade des Vier-Kuppel-Pavillons", "Šikmý pohled na průčelí Pavilonu čtyř kopulí")},
      "/assets/video-four-domes-pavilion-01.mp4":{tags:["four-domes-pavilion","exterior","facade-pan"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.32.00.mp4"},
      "/assets/video-four-domes-pavilion-02.mp4":{tags:["four-domes-pavilion","exterior","front-facade"],original:true,sourceFile:"WhatsApp Video 2026-09-24 at 17.32.01.mp4"}
    }}, provenance:{contentType:"personal-visit",personalVisit:true,originalPhotography:true} }),
    place({ id:"nfm", localName:"Narodowe Forum Muzyki", name:t("הפורום הלאומי למוזיקה", "National Forum of Music", "Narodowe Forum Muzyki", "Nationales Musikforum", "Národní hudební fórum"), description:t("אולם הקונצרטים המרכזי בעיר, עם תוכנית קלאסית ועכשווית.", "The city's main concert hall, with classical and contemporary programmes.", "Główna sala koncertowa miasta z repertuarem klasycznym i współczesnym.", "Wichtigster Konzertsaal der Stadt mit klassischem und zeitgenössischem Programm.", "Hlavní koncertní sál města s klasickým i současným programem."), coordinates:[51.10775,17.02857], categories:["music","architecture"], tags:["music-opera","architecture-design"], website:"https://nfm.wroclaw.pl/", socialPosts:[{platform:"facebook",url:"https://www.facebook.com/share/p/1C4YQxxtU1/"},{platform:"instagram",url:"https://www.instagram.com/p/DcrATSoDN-C/?img_index=1"}] }),
    place({ id:"opera", localName:"Opera Wrocławska", name:t("האופרה של ורוצלב", "Wrocław Opera", "Opera Wrocławska", "Oper Breslau", "Vratislavská opera"), description:t("בית אופרה היסטורי פעיל בלב העיר.", "An active historic opera house in the city centre.", "Czynny historyczny gmach opery w centrum miasta.", "Aktives historisches Opernhaus im Stadtzentrum.", "Aktivní historická operní budova v centru města."), coordinates:[51.10672,17.03254], categories:["music","theatre","architecture"], tags:["music-opera","theatre-performing-arts","architecture-design"], website:"https://opera.wroclaw.pl/", socialPosts:[{platform:"instagram",url:"https://www.instagram.com/p/DcrGVaJDCs3/?img_index=1"}] }),
    place({ id:"aula", localName:"Aula Leopoldina", name:t("אולה לאופולדינה", "Aula Leopoldina", "Aula Leopoldina", "Aula Leopoldina", "Aula Leopoldina"), description:t("אולם בארוקי מפואר כחלק ממוזיאון אוניברסיטת ורוצלב.", "A magnificent Baroque hall within the University of Wrocław Museum.", "Wspaniała barokowa sala w Muzeum Uniwersytetu Wrocławskiego.", "Prachtvoller Barocksaal im Museum der Universität Breslau.", "Velkolepý barokní sál v Muzeu Vratislavské univerzity."), coordinates:[51.11371,17.03362], categories:["museum","history","architecture"], tags:["museums-history","architecture-design"], website:"https://muzeum.uni.wroc.pl/", experiences:[{id:"aula-leopoldina",tags:["architecture","history"]},{id:"oratorium-marianum",tags:["architecture","music"]},{id:"mathematical-tower",tags:["history","viewpoint"]},{id:"university-exhibition-rooms",tags:["history"]}], media:{photos:["/assets/gallery-university-02.jpg","/assets/gallery-university-04.jpg","/assets/gallery-university-01.jpg","/assets/gallery-university-03.jpg","/assets/gallery-university-05.jpg","/assets/aula-leopoldina-01.jpg","/assets/aula-leopoldina-02.jpg","/assets/aula-leopoldina-03.jpg"],videos:[],metadata:{
      "/assets/aula-leopoldina-01.jpg":{tags:["aula-leopoldina","baroque-interior","fresco","hero"],original:true,heroCandidate:true,sourceFile:"741112977_10244931966859705_8938826148654997271_n.jpg"},
      "/assets/aula-leopoldina-02.jpg":{tags:["aula-leopoldina","baroque-interior","seating"],original:true,sourceFile:"740052756_10244931966979708_3788905547594391614_n.jpg"},
      "/assets/aula-leopoldina-03.jpg":{tags:["university-of-wroclaw","exterior","architecture"],original:true,sourceFile:"740486966_10244931965779678_2232032539844803280_n.jpg"}
    }}, provenance:{contentType:"personal-visit",personalVisit:true,originalPhotography:true} }),
  ];
  const panTadeuszRefresh = {
  "description": {
    "he": "מוזיאון לספרות ולהיסטוריה פולנית בבית ״תחת השמש הזהובה״ שבכיכר השוק. המוזיאון הוא שלוחה של אוסולינאום, ובמרכזו כתב היד של ״פאן טדאוש״ מאת אדם מיצקביץ׳. התצוגות משלבות חפצים מקוריים ומולטימדיה ועוסקות גם בהיסטוריה של המאה העשרים ובמשורר תדאוש רוז׳ביץ׳. תמונות הביקור שלנו מתעדות את החזית המוארת ואת שלט הכניסה, ולא את חללי התצוגה. פרטי הביקור המעודכנים מופיעים באתר המוזיאון.\nMuzeum Pana Tadeusza\nRynek 6, Wrocław",
    "en": "A museum of Polish literature and history in the Under the Golden Sun house on Market Square. Part of the Ossolineum, it centres on Adam Mickiewicz’s Pan Tadeusz manuscript. Original objects and multimedia displays also explore twentieth-century history and the poet Tadeusz Różewicz. Our visit photographs show the illuminated facade and entrance plaque, rather than the exhibition rooms. See the museum website for current visiting details.\nRynek 6, Wrocław",
    "pl": "Muzeum literatury i historii Polski w kamienicy Pod Złotym Słońcem przy Rynku. Oddział Ossolineum, którego najważniejszym eksponatem jest rękopis Pana Tadeusza Adama Mickiewicza. Oryginalne obiekty i multimedia przybliżają również historię XX wieku oraz twórczość Tadeusza Różewicza. Nasze zdjęcia z wizyty przedstawiają oświetloną fasadę i tablicę przy wejściu, a nie sale wystawowe. Aktualne informacje dla zwiedzających znajdują się na stronie muzeum.\nRynek 6, Wrocław",
    "de": "Ein Museum zur polnischen Literatur und Geschichte im Haus Zur Goldenen Sonne am Rynek. Die Einrichtung gehört zum Ossolineum; im Mittelpunkt steht Adam Mickiewiczs Handschrift des Pan Tadeusz. Originalobjekte und Multimedia beleuchten außerdem die Geschichte des 20. Jahrhunderts und den Dichter Tadeusz Różewicz. Unsere Besuchsfotos zeigen die beleuchtete Fassade und die Tafel am Eingang, nicht die Ausstellungsräume. Aktuelle Besuchsinformationen stehen auf der Museumswebsite.\nRynek 6, Wrocław",
    "cs": "Muzeum polské literatury a historie v domě U Zlatého slunce na hlavním náměstí. Je součástí Ossolinea a jeho ústředním exponátem je rukopis Pana Tadeáše Adama Mickiewicze. Původní předměty a multimédia přibližují také dějiny 20. století a básníka Tadeusze Różewicze. Naše fotografie z návštěvy zachycují osvětlené průčelí a tabulku u vstupu, nikoli výstavní sály. Aktuální informace pro návštěvníky jsou na webu muzea.\nRynek 6, Wrocław"
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.1104299,
      "lng": 17.0302752
    },
    "address": {"street": "Rynek 6", "city": "Wrocław", "countryCode": "PL", "postalCode": "50-106"}
  },
  "links": {
    "website": "https://muzeumpanatadeusza.ossolineum.pl/en/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1104299%2C17.0302752",
      "appleMaps": "https://maps.apple.com/?q=Muzeum%20Pana%20Tadeusza&ll=51.1104299,17.0302752"
    },
    "socialProfileFallback": false
  },
  "media": {
    "photos": [
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-01.jpg",
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-02.jpg",
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-03.jpg",
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-04.jpg",
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-05.jpg"
    ],
    "videos": [
      "https://youtube.com/shorts/BTXtNDsF_8M"
    ],
    "thumbnail": "/assets/pan-tadeusz-museum/pan-tadeusz-museum-03.jpg",
    "metadata": {
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-01.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PAN TADEUSCH/WhatsApp Image 2026-10-19 at 08.41.52 (10).jpeg",
        "sourceSHA256": "55d8faf7be8441b7cc251221cc0e2ef79b3b86f8cfbf51deb154168e5ac6dd5e",
        "assetSHA256": "407e2b13672579ac91914550c49f07fbc8a4a63d1d922b42e09fe41143b4db26",
        "alt": {
          "he": "שלט וסמל המוזיאון על דלת הכניסה",
          "en": "Museum name and symbol on the entrance door",
          "pl": "Nazwa i symbol muzeum na drzwiach wejściowych",
          "de": "Museumsname und Symbol an der Eingangstür",
          "cs": "Název a symbol muzea na vstupních dveřích"
        }
      },
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-02.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PAN TADEUSCH/WhatsApp Image 2026-10-19 at 08.41.52 (12).jpeg",
        "sourceSHA256": "42ef8330b521991c4c1d4a7cc8858ac08a3676310b7673d3081d52a632a1562d",
        "assetSHA256": "0c91321e68b35f936af18b86c264e5c914b6e99bc74ea4fc1c5b9a437d871865",
        "alt": {
          "he": "חזית המוזיאון המוארת ומסגרת הכניסה מזווית נמוכה",
          "en": "Illuminated museum facade and entrance surround from below",
          "pl": "Oświetlona fasada muzeum i portal widziane z dołu",
          "de": "Beleuchtete Museumsfassade und Eingangsportal von unten",
          "cs": "Osvětlené průčelí muzea a vstupní portál zdola"
        }
      },
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-03.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PAN TADEUSCH/WhatsApp Image 2026-10-19 at 08.41.52 (13).jpeg",
        "sourceSHA256": "f3761e029fbe729b4dd1f071d2b7d1a694d3005423ec78642b353b73975f8b93",
        "assetSHA256": "c564159238eeed1d3cee4018172001fc72fe324bdef3078105a3e7f7f7a0fe47",
        "alt": {
          "he": "חזית בית השמש הזהובה שבה שוכן המוזיאון",
          "en": "Facade of the Under the Golden Sun house containing the museum",
          "pl": "Fasada kamienicy Pod Złotym Słońcem, siedziby muzeum",
          "de": "Fassade des Museumshauses Zur Goldenen Sonne",
          "cs": "Průčelí domu U Zlatého slunce, sídla muzea"
        }
      },
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-04.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PAN TADEUSCH/WhatsApp Image 2026-10-19 at 08.41.52 (2).jpeg",
        "sourceSHA256": "ec99416c67f618503fcd461798f184a5cde26517b848bc0de76e70dddbb32160",
        "assetSHA256": "c611848767cb7a7a040c8f1803c6efef73d776a577709c5ce01103a7cb4b51d3",
        "alt": {
          "he": "לוחית שם מוזיאון פאן טדאוש ליד הכניסה",
          "en": "Pan Tadeusz Museum name plaque beside the entrance",
          "pl": "Tablica z nazwą Muzeum Pana Tadeusza przy wejściu",
          "de": "Namensschild des Pan-Tadeusz-Museums am Eingang",
          "cs": "Tabulka s názvem Muzea Pana Tadeusze u vchodu"
        }
      },
      "/assets/pan-tadeusz-museum/pan-tadeusz-museum-05.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/PAN TADEUSCH/WhatsApp Image 2026-10-19 at 08.41.52 (7).jpeg",
        "sourceSHA256": "68e600bdbc47acec9cd47b102f926e28fe29f1b14b197e3990a42aff83cae9fa",
        "assetSHA256": "4aea67f4252d9a559ad062d64daa7950a33f03d5f77cf28ece4c5ef0835ec3a0",
        "alt": {
          "he": "החזית המוארת של המוזיאון בכיכר השוק בלילה",
          "en": "Illuminated museum frontage on Market Square at night",
          "pl": "Oświetlona nocą fasada muzeum przy Rynku",
          "de": "Nachts beleuchtete Museumsfront am Rynek",
          "cs": "Noční osvětlené průčelí muzea na Rynku"
        }
      }
    }
  },
  "provenance": {
    "contentType": "official-institution-audit",
    "factualSources": [
      {
        "type": "official",
        "url": "https://muzeumpanatadeusza.ossolineum.pl/",
        "checkedAt": "2026-08-29"
      }
    ],
    "verifiedAt": "2026-10-19",
    "sourceFolder": "/Users/rachelfiler/Desktop/Wroclaw/PAN TADEUSCH",
    "personalMediaPermission": false,
    "videoReceipt": "data/pan-tadeusz-enrichment-provenance.json"
  }
};
  window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE = window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.map((record) => record.id === "pan-tadeusz-museum" ? { ...record, ...panTadeuszRefresh } : record);
  const october19CultureRefreshes = {
  "town-hall": {
    "id": "town-hall",
    "localName": "Ratusz we Wrocławiu",
    "name": {
      "he": "בית העירייה העתיק",
      "en": "Wrocław Old Town Hall",
      "pl": "Ratusz we Wrocławiu",
      "de": "Altes Rathaus Breslau",
      "cs": "Stará radnice ve Vratislavi"
    },
    "description": {
      "he": "בית העירייה העתיק בכיכר השוק הוא מבנה גותי ובו המוזיאון לאמנות בורגנית. התעכבו על השעון, הגמלונים והפיסול בחזיתות. התמונות שלנו מציגות את המבנה ביום ובערב. ביקור בפנים כפוף לשעות המוזיאון ולתערוכות; בדקו את האתר הרשמי לפני ההגעה.",
      "en": "The Gothic Old Town Hall on the Market Square houses the Museum of Bourgeois Art. Look closely at its clock, gables and carved façades. Our photographs show daytime and evening views. Interior visits depend on museum opening and exhibitions; check the official website before arriving.",
      "pl": "Gotycki Stary Ratusz na Rynku mieści Muzeum Sztuki Mieszczańskiej. Zwróćcie uwagę na zegar, szczyty i rzeźbione elewacje. Nasze zdjęcia pokazują budynek za dnia i wieczorem. Zwiedzanie wnętrz zależy od godzin muzeum i wystaw; przed wizytą sprawdźcie oficjalną stronę.",
      "de": "Das gotische Alte Rathaus am Marktplatz beherbergt das Museum der Bürgerlichen Kunst. Achten Sie auf Uhr, Giebel und Fassadenschmuck. Unsere Fotos zeigen Tages- und Abendansichten. Innenbesichtigungen richten sich nach Museumsöffnungszeiten und Ausstellungen; prüfen Sie vorab die offizielle Website.",
      "cs": "Gotická Stará radnice na Rynku hostí Muzeum měšťanského umění. Všimněte si hodin, štítů a zdobených fasád. Naše fotografie zachycují denní i večerní pohledy. Návštěva interiéru závisí na otevírací době muzea a výstavách; před cestou ověřte oficiální web."
    },
    "location": {
      "countryCode": "PL",
      "regionId": "lower-silesia",
      "cityId": "wroclaw",
      "coordinates": {
        "lat": 51.10993,
        "lng": 17.0317
      }
    },
    "categories": [
      "architecture",
      "history",
      "museum"
    ],
    "sourceUrls": [],
    "aliases": [],
    "status": "published",
    "editorialPriority": "normal",
    "taxonomy": {
      "categories": [
        "architecture",
        "history",
        "museum"
      ],
      "tags": [
        "museums-history",
        "architecture-design"
      ]
    },
    "suitability": {
      "recommendedFor": [],
      "walkingIntensity": null,
      "familyFriendly": null,
      "couples": null,
      "solo": null,
      "romantic": null,
      "indoorOutdoor": null,
      "rainFriendly": null,
      "budgetLevel": null,
      "accessibility": {
        "level": null,
        "notes": null
      }
    },
    "visit": {
      "durationMinutes": null,
      "bestTimeOfDay": [],
      "seasonalSuitability": [],
      "openingHoursNotes": null
    },
    "links": {
      "website": "https://muzeum.miejskie.wroclaw.pl/en/museum/sztuki-mieszczenskiej/",
      "navigation": {
        "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10993%2C17.0317",
        "appleMaps": "https://maps.apple.com/?ll=51.10993,17.0317&q=Ratusz%20we%20Wroc%C5%82awiu"
      },
      "socialProfileFallback": false
    },
    "transport": {
      "carRequired": null,
      "publicTransportNotes": null,
      "parkingNotes": null,
      "drivingTimeFromWroclawMinutes": null
    },
    "languages": [
      "he",
      "en",
      "pl",
      "de",
      "cs"
    ],
    "experiences": [
      {
        "id": "museum-of-bourgeois-art",
        "tags": [
          "art",
          "history"
        ]
      }
    ],
    "provenance": {
      "contentType": "official-institution-audit",
      "factualSources": [
        {
          "url": "https://visitwroclaw.eu/en/atrakcje/market-square-and-town-hall/",
          "checkedAt": "2026-10-19",
          "supports": [
            "central square",
            "cafés",
            "pedestrian access",
            "Town Hall within square"
          ]
        },
        {
          "url": "https://muzeum.miejskie.wroclaw.pl/en/museum/sztuki-mieszczenskiej/",
          "checkedAt": "2026-10-19",
          "supports": [
            "Gothic Old Town Hall",
            "Museum of Bourgeois Art",
            "Rynek address"
          ],
          "caution": "Source contains visibly malformed hours and inconsistent postal codes; do not copy hours/prices/postal codes"
        }
      ],
      "verifiedAt": "2026-10-19",
      "personalMediaPermission": false,
      "visitVideoPublicationReceipt": "data/renoma-rynek-townhall-visit-publication.json"
    },
    "media": {
      "photos": [
        "/assets/old-town-hall-wroclaw.jpg",
        "/assets/town-hall-refresh-oct19-01.jpg",
        "/assets/town-hall-refresh-oct19-02.jpg"
      ],
      "videos": [
        "https://youtube.com/shorts/a6Hx2tj5Dzg"
      ],
      "metadata": {
        "/assets/town-hall-refresh-oct19-01.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4717.JPG",
          "sourceSHA256": "dedc7b9e6589a3c470bb6096e3e799c062650e30f4c0bdb17513488e46c8d0ef",
          "assetSHA256": "93e6fd517daee150ab8c6e50a7687b646c8b08ef4de20005a4592e1631ed00e8"
        },
        "/assets/town-hall-refresh-oct19-02.jpg": {
          "original": true,
          "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Rynek/WhatsApp Image 2026-10-19 at 08.42.09 (13).jpeg",
          "sourceSHA256": "0d20823d01b95b570253d44025132179487c76de51e32728a6850ac1218072ac",
          "assetSHA256": "b26914a29954b2e0c43cbe2ff803a732cc55bd12d7fc4f8990e6a82ba2123978"
        }
      }
    },
    "socialPosts": [
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02LEfYBpkZggr1eW6Xi6S8V5zU6q4ZYS5Hp2HUcT4RhLYih7jqVZMfGn3HVkatao66l&id=61595207664875",
        "verifiedAt": "2026-10-06T23:24:19.550729+00:00"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0j3RGBm11XgUCo3woiec6vgRksebyjTBeo4GuUrHs7EDia1tm518LS2jdhx2U1TJVl&id=61595239823399",
        "verifiedAt": "2026-10-07T06:29:27.948641+00:00"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02h3exwi5k2HW2dRQZk6kLteBFzEAn92VTVs23Y8qfkGE2QswVk9zB5M3gnJzM8k3Sl&id=61594716405964",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMh5J1jbJy/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeMldstj8FP/",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02adMixpC3DKFekh3ranhYzvdA6zcuJWoLo8F57zW8PUcRf3u8dEf14HTsLoXRqzUjl&id=61595036942289",
        "verifiedAt": "2026-10-07"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeTnoF3je_J/",
        "verifiedAt": "2026-10-10T08:10:12.781Z"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeUTwPkjyOh/",
        "verifiedAt": "2026-10-10T14:35:33.948Z"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUtnbDkfUF/",
        "verifiedAt": "2026-10-10T18:21:14.623Z"
      },
      {
        "platform": "facebook",
        "language": "pl",
        "url": "https://facebook.com/permalink.php?story_fbid=pfbid02LEfYBpkZggr1eW6Xi6S8V5zU6q4ZYS5Hp2HUcT4RhLYih7jqVZMfGn3HVkatao66l&id=61595207664875",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "de",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0j3RGBm11XgUCo3woiec6vgRksebyjTBeo4GuUrHs7EDia1tm518LS2jdhx2U1TJVl&id=61595239823399",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "cs",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02h3exwi5k2HW2dRQZk6kLteBFzEAn92VTVs23Y8qfkGE2QswVk9zB5M3gnJzM8k3Sl&id=61594716405964",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "cs",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMh5J1jbJy/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "en",
        "url": "https://www.instagram.com/p/DeMldstj8FP/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "facebook",
        "language": "en",
        "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02adMixpC3DKFekh3ranhYzvdA6zcuJWoLo8F57zW8PUcRf3u8dEf14HTsLoXRqzUjl&id=61595036942289",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "pl",
        "url": "https://www.instagram.com/p/DeTnoF3je_J/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "de",
        "url": "https://www.instagram.com/p/DeUTwPkjyOh/",
        "verifiedAt": "2026-10-19"
      },
      {
        "platform": "instagram",
        "language": "he",
        "url": "https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUtnbDkfUF/",
        "verifiedAt": "2026-10-19"
      }
    ]
  }
};
  window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE = window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.map(record => october19CultureRefreshes[record.id] || record);
  // Removed gallery associations remain in the refresh provenance, not active media metadata.
  for (const record of window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE) {
    if (record.media?.videos) record.media.videos = record.media.videos.map(video => typeof video === "string" ? video : video.src);
    if (!record.media?.metadata) continue;
    const active = new Set([...(record.media.photos || []), ...(record.media.videos || []).map(video => typeof video === "string" ? video : video.src), record.media.thumbnail]);
    record.media.metadata = Object.fromEntries(Object.entries(record.media.metadata).filter(([asset]) => active.has(asset)));
  }
})();

// District refresh20261020
(function(){ const replacement={
  "id": "four-denominations-district",
  "localName": "Dzielnica Czterech Wyznań",
  "name": {
    "he": "רובע ארבע הדתות",
    "en": "Four Denominations District",
    "pl": "Dzielnica Czterech Wyznań",
    "de": "Viertel der vier Konfessionen",
    "cs": "Čtvrť čtyř vyznání"
  },
  "description": {
    "he": "אזור הליכה קטן בעיר העתיקה, שבו נפגשות ארבע קהילות דתיות: יהודית, קתולית, לותרנית ואורתודוקסית. בין מקומות התפילה משתרעים רחובות, חצרות ובתי קפה, לצד עקבות של חיי התרבות והקהילה של ורוצלב. פסל כוכב הלכת מבדולח מסמן כניסה סמלית לאזור. מומלץ לשלב שיטוט ברחובות עם ביקור נפרד בבית הכנסת החסידה הלבנה; אפשרות הכניסה למקומות התפילה תלויה בכל מוסד ובפעילותו. זהו רובע תרבותי, ולא יחידה מנהלית נפרדת.",
    "en": "A compact walking area in the Old Town bringing together Jewish, Roman Catholic, Lutheran and Orthodox communities. Streets, courtyards and cafés connect places of worship with traces of Wrocław’s cultural and community life. The Crystal Planet sculpture marks a symbolic entrance. Combine an unhurried walk with a separate visit to the White Stork Synagogue; entry to each place of worship depends on its own arrangements and activities. This is a cultural quarter, not a separate administrative district.",
    "pl": "Niewielki obszar spacerowy na Starym Mieście łączy wspólnoty żydowską, rzymskokatolicką, ewangelicko-augsburską i prawosławną. Ulice, podwórza i kawiarnie prowadzą między świątyniami oraz śladami życia kulturalnego i społecznego Wrocławia. Symboliczne wejście wyznacza rzeźba Kryształowa Planeta. Spacer warto połączyć z osobną wizytą w Synagodze pod Białym Bocianem; dostęp do poszczególnych świątyń zależy od ich własnych zasad i odbywających się nabożeństw. Jest to dzielnica w znaczeniu kulturowym, nie odrębna jednostka administracyjna.",
    "de": "Ein kleines Spaziergebiet in der Altstadt verbindet jüdische, römisch-katholische, lutherische und orthodoxe Gemeinden. Straßen, Innenhöfe und Cafés führen zwischen Gotteshäusern und Spuren des kulturellen und gemeinschaftlichen Lebens Breslaus hindurch. Die Skulptur Kristallplanet markiert einen symbolischen Eingang. Ein ruhiger Rundgang lässt sich mit einem gesonderten Besuch der Synagoge zum Weißen Storch verbinden; der Zutritt zu den Gotteshäusern richtet sich nach den jeweiligen Regeln und Veranstaltungen. Es handelt sich um ein Kulturviertel, nicht um einen eigenständigen Verwaltungsbezirk.",
    "cs": "Malá pěší oblast ve Starém Městě propojuje židovskou, římskokatolickou, luterskou a pravoslavnou komunitu. Mezi svatyněmi vedou ulice, dvory a kavárny se stopami kulturního a společenského života Vratislavi. Symbolický vstup označuje socha Křišťálová planeta. Klidnou procházku lze spojit se samostatnou návštěvou synagogy U Bílého čápa; vstup do jednotlivých svatyní závisí na jejich pravidlech a probíhajících obřadech. Jde o kulturní čtvrť, nikoli samostatnou správní jednotku."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.10968,
      "lng": 17.023753
    },
    "address": {
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture",
    "area",
    "history"
  ],
  "sourceUrls": [],
  "aliases": [
    "district-of-mutual-respect",
    "dzielnica-czterech-swiatyn",
    "dzielnica-czterech-wyznan",
    "four-religions",
    "four-temples"
  ],
  "sourceRecords": [],
  "coordinateCandidates": [],
  "status": "published",
  "editorialPriority": "normal",
  "taxonomy": {
    "categories": [
      "architecture",
      "area",
      "history"
    ],
    "tags": [
      "museums-history",
      "architecture-design"
    ]
  },
  "suitability": {
    "recommendedFor": [],
    "walkingIntensity": null,
    "familyFriendly": null,
    "couples": null,
    "solo": null,
    "romantic": null,
    "indoorOutdoor": null,
    "rainFriendly": null,
    "budgetLevel": null,
    "accessibility": {
      "level": null,
      "notes": null
    }
  },
  "visit": {
    "durationMinutes": null,
    "bestTimeOfDay": [],
    "seasonalSuitability": [],
    "openingHoursNotes": null
  },
  "links": {
    "website": "https://www.fundacja4wyznan.pl/n/dzielnica/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10968%2C17.023753",
      "appleMaps": "https://maps.apple.com/?ll=51.10968,17.023753&q=Dzielnica%20Czterech%20Wyzna%C5%84"
    },
    "socialProfileFallback": false
  },
  "transport": {
    "carRequired": null,
    "publicTransportNotes": null,
    "parkingNotes": null,
    "drivingTimeFromWroclawMinutes": null
  },
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "contentType": "official-area-identity-and-original-visit-audit",
    "factualSources": [
      {
        "type": "official",
        "url": "https://dolnyslask.travel/obiekt/dzielnica-czterech-wyznan",
        "checkedAt": "2026-10-20",
        "scope": "District identity, official district coordinate anchor, Crystal Planet symbolic entrance"
      },
      {
        "type": "official",
        "url": "https://www.fundacja4wyznan.pl/n/dzielnica/",
        "checkedAt": "2026-10-20",
        "scope": "Four faith communities and district streets"
      }
    ],
    "mediaSource": "Original WROC-LOVE visit materials; data/district-synagogue-enrichment-provenance.json"
  },
  "media": {
    "thumbnail": "/assets/four-denominations-district-crystal-planet.jpg",
    "photos": [
      "/assets/four-denominations-district-crystal-planet.jpg",
      "/assets/four-denominations-district-street.jpg",
      "/assets/four-denominations-district-wlodkowica-entrance.jpg",
      "/assets/four-denominations-district-plaque.jpg",
      "/assets/four-denominations-district-rotbaum-plaque.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-01.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-02.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-03.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-04.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-05.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-06.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-07.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-08.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-09.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-10.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-11.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-12.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-13.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-14.jpg",
      "/assets/four-denominations-refresh/four-denominations-refresh-15.jpg"
    ],
    "videos": [
      "https://www.youtube.com/watch?v=Eu84SKoKNZA",
      "https://www.youtube.com/watch?v=o6qgx0B_sU0",
      "https://www.youtube.com/watch?v=UOkQKcNFqBw",
      "https://youtube.com/shorts/ExcXaGEwCz0",
      "https://youtube.com/shorts/ZKCrh7ZNZFU",
      "https://youtube.com/shorts/FgmfsnmETco",
      "https://youtube.com/shorts/maNHvOKVA_s",
      "https://youtube.com/shorts/sZjy6-Xfj8I",
      "https://youtube.com/shorts/hp5UfkhbhUc"
    ],
    "metadata": {
      "/assets/four-denominations-district-crystal-planet.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/IMG_1044.JPG",
        "sourceSHA256": "f5ded5bb2f18c4d035e8d07fad65f279e764f747925f5377bb2c86e184bdcae9",
        "assetSHA256": "c5c9e699c956430b03f3144467e22d679dc212f191c2e09e16dcb552a86efc88",
        "familyForeground": false,
        "alt": {
          "he": "פסל כוכב הלכת מבדולח בכניסה הסמלית לרובע",
          "en": "Crystal Planet sculpture at the symbolic district entrance",
          "pl": "Kryształowa Planeta przy symbolicznym wejściu do dzielnicy",
          "de": "Kristallplanet am symbolischen Eingang des Viertels",
          "cs": "Křišťálová planeta u symbolického vstupu do čtvrti"
        }
      },
      "/assets/four-denominations-district-street.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-07-13 at 19.56.02 (1).jpeg",
        "sourceSHA256": "26891c678af3a4653702a1f8c99500ab44fe1b78cb010b75716ab4bfe1d54b39",
        "assetSHA256": "bcadc7676862e9801aeaabd2af60a8ef81c9d472c319132eec309ff923cd44db",
        "familyForeground": false,
        "alt": {
          "he": "רחוב אנטוני הקדוש ובתי הקפה ברובע",
          "en": "Saint Anthony Street and district cafés",
          "pl": "Ulica św. Antoniego i kawiarnie w dzielnicy",
          "de": "Świętego-Antoniego-Straße und Cafés im Viertel",
          "cs": "Ulice svatého Antonína a kavárny ve čtvrti"
        }
      },
      "/assets/four-denominations-district-wlodkowica-entrance.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.01.jpeg",
        "sourceSHA256": "f7fe3903df3c350d5e9dd5ffc98c2d3773c0bc1e1f9e7e1266b723bc193d2ad6",
        "assetSHA256": "b154ae4b12fdeddaec607caa20a81950739f49d7b385e49ab4375123ac9a3257",
        "familyForeground": false,
        "alt": {
          "he": "כניסה לבניין ברחוב ולודקוביצה לצד לוח ההנצחה",
          "en": "Włodkowica doorway beside the memorial plaque",
          "pl": "Wejście przy ulicy Włodkowica obok tablicy pamiątkowej",
          "de": "Eingang an der Włodkowica-Straße neben der Gedenktafel",
          "cs": "Vchod v ulici Włodkowica vedle pamětní desky"
        }
      },
      "/assets/four-denominations-district-plaque.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/IMG_1043.JPG",
        "sourceSHA256": "7e258188ebea1bb64b8c1d8f6314200be367053cf849cd68d14670d3a4ccde56",
        "assetSHA256": "f9950a8b65457277d2a0595db7e58e728a6a9e2a141e0cc0e23dc864009fde9d",
        "familyForeground": false,
        "alt": {
          "he": "לוח סמלי ארבע הדתות בריצוף הרובע",
          "en": "Four faith symbols in the district paving",
          "pl": "Symbole czterech wyznań w nawierzchni dzielnicy",
          "de": "Symbole der vier Konfessionen im Straßenpflaster",
          "cs": "Symboly čtyř vyznání v dlažbě čtvrti"
        }
      },
      "/assets/four-denominations-district-rotbaum-plaque.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.00 (1).jpeg",
        "sourceSHA256": "95e34d14e2b84ad364db27bdc4f6fd1b38c28767dbecc55fba286fd0c62d7c78",
        "assetSHA256": "d933118b4ae5dc9fb2fde5e869c5b5e528ba489d1fb0ebf6e6cb6f21a0b41521",
        "familyForeground": false,
        "alt": {
          "he": "לוח הנצחה ליעקב וליה רוטבאום",
          "en": "Jakub and Lia Rotbaum memorial plaque",
          "pl": "Tablica upamiętniająca Jakuba i Lię Rotbaumów",
          "de": "Gedenktafel für Jakub und Lia Rotbaum",
          "cs": "Pamětní deska Jakuba a Lii Rotbaumových"
        }
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-01.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.26.54.jpeg",
        "sourceSHA256": "38acc7d15088674b078efb4f9927605088eb8d44614da25f5267a78c69492068",
        "assetSHA256": "ca6e9dab66f46d7c1dcc5c6bbe75fa14b6b55faed97acc4e2d621a0254b8601d",
        "familyForeground": false,
        "alt": {
          "he": "פרט פנס וחיפוי במעבר פוקויהוף",
          "en": "Lantern and tile detail in Pokoyhof",
          "pl": "Detal latarni i okładziny w Pokoyhof",
          "de": "Laternen- und Fliesendetail im Pokoyhof",
          "cs": "Detail lucerny a obkladu v Pokoyhof"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-02.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.07 (1).jpeg",
        "sourceSHA256": "9b95889d06a50324aa62191ebcb19c3e2178d831ac0ed4a3d9ef3ca77aafd419",
        "assetSHA256": "41e17d06464d91b5bd17907033b55d844c88e68d80366f75514e314307268de2",
        "familyForeground": false,
        "alt": {
          "he": "רחוב ברובע ארבע הדתות",
          "en": "Street in the Four Denominations District",
          "pl": "Ulica w Dzielnicy Czterech Wyznań",
          "de": "Straße im Viertel der vier Konfessionen",
          "cs": "Ulice ve čtvrti čtyř vyznání"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-03.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.07.jpeg",
        "sourceSHA256": "5696da22d47f008ee04cd41f7353cf04373b90c9f63fcd2a7d559e6b46b69e4a",
        "assetSHA256": "43c83c08a4baf52db69d09253869e4d4c7f570d11b85863145cbdf70c4b1000e",
        "familyForeground": false,
        "alt": {
          "he": "פסיפס השם פוקויהוף מעל השער",
          "en": "Pokoyhof name mosaic above the gate",
          "pl": "Mozaikowy napis Pokoyhof nad bramą",
          "de": "Pokoyhof-Mosaikschrift über dem Tor",
          "cs": "Mozaikový nápis Pokoyhof nad branou"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-04.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.12.jpeg",
        "sourceSHA256": "29c11d4f0edb058a7ee64e12d1c7e541c41156dc535538a124aeb6b7d4c0865f",
        "assetSHA256": "4ec775a0950652daec81a6d0da6842ad293165de13aef1522c43ea52f9baa8b5",
        "familyForeground": false,
        "alt": {
          "he": "חזית כנסיית אנטוניוס ברחוב",
          "en": "St Anthony church façade on the street",
          "pl": "Fasada kościoła św. Antoniego przy ulicy",
          "de": "Fassade der Antoniuskirche an der Straße",
          "cs": "Průčelí kostela svatého Antonína v ulici"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-05.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.13 (1).jpeg",
        "sourceSHA256": "39b57f856917d6bab38964465d76e1ef84fc01b20584b494a89a91bec1551d90",
        "assetSHA256": "abceabd94dffe9ee719aa6ede8b5260796b6eac946f4d55c0ba31565e6bd2e5b",
        "familyForeground": false,
        "alt": {
          "he": "דלת מעוטרת בחזית בניין ברובע",
          "en": "Decorated doorway in a district façade",
          "pl": "Ozdobne drzwi w kamienicy dzielnicy",
          "de": "Verzierte Tür in einer Viertelfassade",
          "cs": "Zdobené dveře v průčelí čtvrti"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-06.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.13.jpeg",
        "sourceSHA256": "82366bbbfd51f65b398f132d9cf7354baab0de46aa36c2f6814a230e0bb96390",
        "assetSHA256": "02201eaf3ca332318a5a9dd2d34e2f97857805c7279fc597ae3a85bbe5957b58",
        "familyForeground": false,
        "alt": {
          "he": "מעבר מקורה עם ציורי קיר",
          "en": "Covered passage with wall paintings",
          "pl": "Kryte przejście z malowidłami",
          "de": "Überdachter Durchgang mit Wandmalerei",
          "cs": "Krytý průchod s nástěnnými malbami"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-07.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.14 (1).jpeg",
        "sourceSHA256": "6938b4c7ab93b552e693101f66bb57576cc393df40034fc6f6a47e532fa5d905",
        "assetSHA256": "7027b427d768583d0935ee10d8bb02439d2171b109526bfd00abfaba4e3ef22d",
        "familyForeground": false,
        "alt": {
          "he": "חזית בית ברחוב ברובע",
          "en": "Building façade on a district street",
          "pl": "Fasada kamienicy przy ulicy dzielnicy",
          "de": "Hausfassade an einer Straße im Viertel",
          "cs": "Průčelí domu v ulici čtvrti"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-08.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.14 (2).jpeg",
        "sourceSHA256": "5792ad91ef5f7520ec212c103383ff66c3d437a1a13d9ed2808952e8570bcc22",
        "assetSHA256": "741eb15b1b6f667bdf51c35e69c9f92f8c55e9f10b8ea40acd4afc5ccb76edd2",
        "familyForeground": false,
        "alt": {
          "he": "כניסת בית קפה ברחוב ברובע",
          "en": "Café entrance on a district street",
          "pl": "Wejście do kawiarni w dzielnicy",
          "de": "Caféeingang an einer Viertelstraße",
          "cs": "Vstup do kavárny v ulici čtvrti"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-09.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.14.jpeg",
        "sourceSHA256": "409aaa9ee67a322c75b04e483d287ef14681a33720542c44c4099eb4f3e3abf4",
        "assetSHA256": "fa9238ff6b48a35fd8a7782767cd9fd94a8587fec15c2e18b5c4bb561c610d29",
        "familyForeground": false,
        "alt": {
          "he": "רצף חזיתות היסטוריות ברחוב",
          "en": "Historic façades along the street",
          "pl": "Historyczne fasady wzdłuż ulicy",
          "de": "Historische Fassaden entlang der Straße",
          "cs": "Historická průčelí podél ulice"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-10.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.15 (1).jpeg",
        "sourceSHA256": "72082f7f41b52d9dbd4dcb4732e2c50a0d00c810562a0d982f32c2a08c8dbb3c",
        "assetSHA256": "de82bed4b933d5fec1a4a0c444135fd5865aeac409b3dab9b11ac58156b17ea3",
        "familyForeground": false,
        "alt": {
          "he": "שולחנות בחצר מעבר ברובע",
          "en": "Tables in a district passage courtyard",
          "pl": "Stoliki na dziedzińcu pasażu w dzielnicy",
          "de": "Tische im Hof einer Viertelpassage",
          "cs": "Stolky na dvoře pasáže ve čtvrti"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-11.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.15.jpeg",
        "sourceSHA256": "c3c69939534bbfc1651e680a34045cf6a96ac2acf0ac570dd697c47ca7bb30bf",
        "assetSHA256": "d614c87fe4e76d5fb55ac6437aa3eef17acd727fd640e045e1b6410a7af9802c",
        "familyForeground": false,
        "alt": {
          "he": "חזית כניסה צבעונית ברחוב",
          "en": "Colourful entrance frontage on the street",
          "pl": "Kolorowe wejście przy ulicy",
          "de": "Bunter Eingangsbereich an der Straße",
          "cs": "Barevné vstupní průčelí v ulici"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-12.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.19.jpeg",
        "sourceSHA256": "a8fdf4b3513bb738cdff42af19607b8fa4905a3bcf5edd1eb43b41137ec6881a",
        "assetSHA256": "0c92a97404acfdcbc05c9cfd51c13b0c325c366b14e6fb91d26520321c20747a",
        "familyForeground": false,
        "alt": {
          "he": "חלון עגול ופרטי חזית ברובע",
          "en": "Round window and façade details in the district",
          "pl": "Okrągłe okno i detale fasady w dzielnicy",
          "de": "Rundes Fenster und Fassadendetails im Viertel",
          "cs": "Kulaté okno a detaily průčelí ve čtvrti"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-13.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.22.jpeg",
        "sourceSHA256": "062132c9178036799427649c2338c5d659c7676a958738c6f9d47ac3658aece3",
        "assetSHA256": "bdf00e01d5282c5797f5437a9993b74db9f1086965424546299507a600674bff",
        "familyForeground": false,
        "alt": {
          "he": "לוח מידע על ההיסטוריה של רחוב אנטוניוס",
          "en": "Interpretation plaque about St Anthony Street history",
          "pl": "Tablica o historii ulicy św. Antoniego",
          "de": "Informationstafel zur Geschichte der Antoniusstraße",
          "cs": "Informační deska o historii ulice svatého Antonína"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-14.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.23 (1).jpeg",
        "sourceSHA256": "61c325b3a0fe603a1ecbafdf6ab570cce0c218a0dabd586d972af1d1db4e01b7",
        "assetSHA256": "1ebb4e51c80d24ef96e30b177804dcaebeb744cfbfc74724ed35fad207bf0418",
        "familyForeground": false,
        "alt": {
          "he": "דגם רחוב אנטוניוס על לוח ההסבר",
          "en": "St Anthony Street relief model on the interpretation plaque",
          "pl": "Model ulicy św. Antoniego na tablicy",
          "de": "Reliefmodell der Antoniusstraße auf der Tafel",
          "cs": "Reliéfní model ulice svatého Antonína na desce"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/four-denominations-refresh/four-denominations-refresh-15.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.24.jpeg",
        "sourceSHA256": "202162a80366399365354c8eff1c0daf8c75cb412af8fc69ec217cda67c3b08a",
        "assetSHA256": "666849e538fb33d95bb1a9b24cc0994350825b27a8c0b9a1a51e879228a01fab",
        "familyForeground": false,
        "alt": {
          "he": "חזית כנסייה ומגדל ברובע",
          "en": "Church façade and tower in the district",
          "pl": "Fasada kościoła i wieża w dzielnicy",
          "de": "Kirchenfassade und Turm im Viertel",
          "cs": "Průčelí kostela a věž ve čtvrti"
        },
        "verifiedAt": "2026-10-20"
      },
      "https://youtube.com/shorts/ExcXaGEwCz0": {
        "index": 1,
        "title": {
          "he": "פרט פנס ואריחים בחזית",
          "en": "Lantern and tile façade detail",
          "pl": "Latarnia i detale okładziny fasady",
          "de": "Laterne und Fliesendetail der Fassade",
          "cs": "Lucerna a detail obkladu průčelí"
        },
        "filename": "four-denominations-refresh-visit-01.mp4",
        "id": "ExcXaGEwCz0",
        "url": "https://youtube.com/shorts/ExcXaGEwCz0",
        "state": "public-reopened-verified",
        "durationSeconds": 5.033333,
        "sourceSHA256": "cf2d3b41e8898eaa143f4b1d7772d9887035beb2770ff0a6ca8056e40cc092b5",
        "uploadSHA256": "7df59e3df2b27c21bf35a6cc8124d19a4469e9b44cd6bee0d233fde3645c9216",
        "checksComplete": true,
        "visibility": "Public",
        "savedPublicVerified": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.10.mp4",
        "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-01.mp4",
        "originalSourcePreserved": true,
        "audioRemoved": true,
        "evidence": [
          "visit-1-checks.txt",
          "visit-1-published.txt",
          "visit-1-public-reopened.txt",
          "visit-1-public-reopened.png"
        ],
        "youtubeTitle": "Façade detail"
      },
      "https://youtube.com/shorts/ZKCrh7ZNZFU": {
        "index": 2,
        "title": {
          "he": "שער הכניסה למעבר פוקויהוף",
          "en": "Pokoyhof passage entrance",
          "pl": "Wejście do Pasażu Pokoyhof",
          "de": "Eingang zur Pokoyhof-Passage",
          "cs": "Vstup do pasáže Pokoyhof"
        },
        "filename": "four-denominations-refresh-visit-02.mp4",
        "id": "ZKCrh7ZNZFU",
        "url": "https://youtube.com/shorts/ZKCrh7ZNZFU",
        "state": "public-reopened-verified",
        "durationSeconds": 4.4,
        "sourceSHA256": "3792da87942a2a96334753319447a58b352dd7e35772c64114b32f8295163bb6",
        "uploadSHA256": "ae1dfe314970904564d836c6d009a0a95608206141dcdb21aa589a3f87b48fa9",
        "checksComplete": true,
        "visibility": "Public",
        "savedPublicVerified": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.16.mp4",
        "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-02.mp4",
        "originalSourcePreserved": true,
        "audioRemoved": true,
        "evidence": [
          "visit-2-checks.txt",
          "visit-2-published.txt",
          "visit-2-public-reopened.txt",
          "visit-2-public-reopened.png"
        ],
        "youtubeTitle": "Pokoyhof entrance"
      },
      "https://youtube.com/shorts/FgmfsnmETco": {
        "index": 3,
        "title": {
          "he": "פסל כוכב הלכת מבדולח",
          "en": "Crystal Planet sculpture",
          "pl": "Rzeźba Kryształowa Planeta",
          "de": "Skulptur Kristallplanet",
          "cs": "Plastika Křišťálová planeta"
        },
        "filename": "four-denominations-refresh-visit-03.mp4",
        "id": "FgmfsnmETco",
        "url": "https://youtube.com/shorts/FgmfsnmETco",
        "state": "public-reopened-verified",
        "durationSeconds": 4.566667,
        "sourceSHA256": "41c149c2aea7ebc68432005c33d6f980c731999d7bca87de3280da4135d4d35e",
        "uploadSHA256": "0e810cb28fa30892803440d65ecd615c373f63ac07d7e99e10dbfb0bee5b5287",
        "checksComplete": true,
        "visibility": "Public",
        "savedPublicVerified": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.22.mp4",
        "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-03.mp4",
        "originalSourcePreserved": true,
        "audioRemoved": true,
        "evidence": [
          "visit-3-checks.txt",
          "visit-3-published.txt",
          "visit-3-public-reopened.txt",
          "visit-3-public-reopened.png"
        ],
        "youtubeTitle": "Crystal Planet"
      },
      "https://youtube.com/shorts/maNHvOKVA_s": {
        "index": 4,
        "title": {
          "he": "מעבר מקורה ברובע",
          "en": "Covered district passage",
          "pl": "Kryte przejście w dzielnicy",
          "de": "Überdachter Durchgang im Viertel",
          "cs": "Krytý průchod ve čtvrti"
        },
        "filename": "four-denominations-refresh-visit-04.mp4",
        "id": "maNHvOKVA_s",
        "url": "https://youtube.com/shorts/maNHvOKVA_s",
        "state": "public-reopened-verified",
        "durationSeconds": 3.9,
        "sourceSHA256": "b8cbf425e6fc03e2f0bfbb93448f3c22832fc2d9d3bfe29f6a6c479f751c54a9",
        "uploadSHA256": "e513bae63e699a2b2801e57caae89e5fafb11a22d78420e73bd400108283c1c2",
        "checksComplete": true,
        "visibility": "Public",
        "savedPublicVerified": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.24.mp4",
        "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-04.mp4",
        "originalSourcePreserved": true,
        "audioRemoved": true,
        "evidence": [
          "visit-4-checks.txt",
          "visit-4-published.txt",
          "visit-4-public-reopened.txt",
          "visit-4-public-reopened.png"
        ],
        "youtubeTitle": "Passage"
      },
      "https://youtube.com/shorts/sZjy6-Xfj8I": {
        "index": 5,
        "title": {
          "he": "חצר ובנייני הקהילה ברובע",
          "en": "Courtyard and community buildings",
          "pl": "Dziedziniec i budynki gminy",
          "de": "Hof und Gemeindegebäude",
          "cs": "Dvůr a komunitní budovy"
        },
        "id": "sZjy6-Xfj8I",
        "url": "https://youtube.com/shorts/sZjy6-Xfj8I",
        "state": "public-reopened-verified",
        "durationSeconds": 8.7,
        "sourceSHA256": "507f1c4d85231d1c1cde08b6ee5409e0ab36b3cad7887ef726f6df7b6389257a",
        "uploadSHA256": "45207fe4c7a5fe7eea57f2775dd4b9527337a71b842567fe94ef87ae198401e8",
        "checksComplete": true,
        "visibility": "Public",
        "savedPublicVerified": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.30.mp4",
        "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-05.mp4",
        "originalSourcePreserved": true,
        "audioRemoved": true,
        "evidence": [
          "visit-5-checks.txt",
          "visit-5-published.txt",
          "visit-5-public-reopened.txt",
          "visit-5-public-reopened.png"
        ],
        "youtubeTitle": "Courtyard"
      },
      "https://youtube.com/shorts/hp5UfkhbhUc": {
        "index": 6,
        "title": {
          "he": "חזית כנסיית אנטוניוס",
          "en": "St Anthony church façade",
          "pl": "Fasada kościoła św. Antoniego",
          "de": "Fassade der Antoniuskirche",
          "cs": "Průčelí kostela svatého Antonína"
        },
        "id": "hp5UfkhbhUc",
        "url": "https://youtube.com/shorts/hp5UfkhbhUc",
        "state": "public-reopened-verified",
        "durationSeconds": 4.066667,
        "sourceSHA256": "6e50b6947967c9f3dadedabd4f884af7cabb82dffbf18bd6ec7201ae7c80e77a",
        "uploadSHA256": "e717dde6f3936b255a46b0f230eb779b5f360f5702a8abb6e439f59a9a54efc1",
        "checksComplete": true,
        "visibility": "Public",
        "savedPublicVerified": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.37.mp4",
        "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-06.mp4",
        "originalSourcePreserved": true,
        "audioRemoved": true,
        "evidence": [
          "visit-6-checks.txt",
          "visit-6-published.txt",
          "visit-6-public-reopened.txt",
          "visit-6-public-reopened.png"
        ],
        "youtubeTitle": "Church façade"
      }
    },
    "guideVideos": {
      "he": "https://youtube.com/shorts/rSn6kJy3gQE",
      "en": "https://youtube.com/shorts/oqziuQx8hLQ"
    }
  },
  "socialPosts": []
}; window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.map(record=>record.id===replacement.id?replacement:record); })();

// White Stork refresh20261020
(function(){ const replacement={
  "id": "white-stork-synagogue-wroclaw",
  "localName": "Synagoga Pod Białym Bocianem",
  "name": {
    "he": "בית הכנסת החסידה הלבנה",
    "en": "White Stork Synagogue",
    "pl": "Synagoga Pod Białym Bocianem",
    "de": "Synagoge zum Weißen Storch",
    "cs": "Synagoga U Bílého čápa"
  },
  "description": {
    "he": "בית הכנסת החסידה הלבנה נחנך בשנת 1829 בחצר ברובע ארבע הדתות, ותוכנן בסגנון נאו־קלאסי בידי קרל פרדיננד לנגהנס. לאחר פגיעות והזנחה שוקם ונפתח מחדש בשנת 2010. המקום קשור לחיי הקהילה היהודית ולזיכרון יהודי העיר. תמונות הביקור שלנו מציגות את החצר, חזית בית הכנסת, הדלת עם מגן הדוד ולוחות הזיכרון וההסבר, לצד מבני הקהילה הסמוכים. יש לברר את אפשרות הכניסה ואת הסיורים עם הקהילה היהודית לפני הביקור.",
    "en": "Opened in 1829, the White Stork Synagogue stands in a courtyard in the Four Denominations District. Carl Ferdinand Langhans designed its neoclassical building, restored and reopened in 2010 after damage and neglect. It is connected with Jewish community life and remembrance. Our visit photographs show the courtyard, synagogue façade, doorway with the Star of David, memorial and information plaques, and adjoining community buildings. Check visitor access and guided tours with the Jewish community before visiting.",
    "pl": "Synagoga Pod Białym Bocianem, otwarta w 1829 roku, znajduje się na dziedzińcu w Dzielnicy Czterech Wyznań. Jej neoklasycystyczny budynek zaprojektował Carl Ferdinand Langhans. Po zniszczeniach i zaniedbaniach został odrestaurowany i ponownie otwarty w 2010 roku. Miejsce wiąże się z życiem gminy żydowskiej i pamięcią o dawnych mieszkańcach. Nasze zdjęcia pokazują dziedziniec, fasadę synagogi, drzwi z Gwiazdą Dawida, tablice pamięci i informacyjne oraz sąsiednie budynki gminy. Możliwość wejścia i zwiedzania należy potwierdzić w gminie żydowskiej.",
    "de": "Die 1829 eröffnete Synagoge zum Weißen Storch liegt in einem Innenhof im Viertel der vier Konfessionen. Carl Ferdinand Langhans entwarf den neoklassizistischen Bau, der nach Beschädigungen und Vernachlässigung restauriert und 2010 wiedereröffnet wurde. Der Ort ist mit jüdischem Gemeindeleben und Erinnerung verbunden. Unsere Besuchsfotos zeigen den Hof, die Synagogenfassade, die Tür mit dem Davidstern, Gedenk- und Informationstafeln sowie angrenzende Gemeindegebäude. Zugang und Führungen vorab bei der jüdischen Gemeinde erfragen.",
    "cs": "Synagoga U Bílého čápa, otevřená roku 1829, stojí ve dvoře ve čtvrti čtyř vyznání. Její neoklasicistní budovu navrhl Carl Ferdinand Langhans. Po poškození a zanedbání byla obnovena a znovu otevřena v roce 2010. Místo je spojeno se životem židovské obce a připomínkou její historie. Naše fotografie zachycují dvůr, průčelí synagogy, dveře s Davidovou hvězdou, pamětní a informační desky i sousední komunitní budovy. Možnosti vstupu a prohlídek si předem ověřte u židovské obce."
  },
  "location": {
    "countryCode": "PL",
    "regionId": "lower-silesia",
    "cityId": "wroclaw",
    "coordinates": {
      "lat": 51.108468291071,
      "lng": 17.025364605411
    },
    "address": {
      "street": "Pawła Włodkowica 7",
      "postalCode": "50-072",
      "city": "Wrocław",
      "country": "Poland"
    }
  },
  "categories": [
    "architecture",
    "history",
    "religion"
  ],
  "sourceUrls": [],
  "aliases": [
    "synagoga-pod-bialym-bocianem",
    "white-stork-synagogue"
  ],
  "sourceRecords": [],
  "coordinateCandidates": [],
  "status": "published",
  "editorialPriority": "normal",
  "taxonomy": {
    "categories": [
      "architecture",
      "history",
      "religion"
    ],
    "tags": [
      "museums-history",
      "architecture-design",
      "jewish-heritage"
    ]
  },
  "suitability": {
    "recommendedFor": [],
    "walkingIntensity": null,
    "familyFriendly": null,
    "couples": null,
    "solo": null,
    "romantic": null,
    "indoorOutdoor": null,
    "rainFriendly": null,
    "budgetLevel": null,
    "accessibility": {
      "level": null,
      "notes": null
    }
  },
  "visit": {
    "durationMinutes": null,
    "bestTimeOfDay": [],
    "seasonalSuitability": [],
    "openingHoursNotes": null
  },
  "links": {
    "website": "https://fbk.org.pl/synagoga_pod_bialym_bocianem/",
    "navigation": {
      "googleMaps": "https://www.google.com/maps/search/?api=1&query=51.108468291071%2C17.025364605411",
      "appleMaps": "https://maps.apple.com/?ll=51.108468291071,17.025364605411&q=Synagoga%20Pod%20Bia%C5%82ym%20Bocianem"
    },
    "socialProfileFallback": false
  },
  "transport": {
    "carRequired": null,
    "publicTransportNotes": null,
    "parkingNotes": null,
    "drivingTimeFromWroclawMinutes": null
  },
  "languages": [
    "he",
    "en",
    "pl",
    "de",
    "cs"
  ],
  "provenance": {
    "contentType": "official-history-and-original-visit-photo-audit",
    "factualSources": [
      {
        "url": "https://fbk.org.pl/synagoga_pod_bialym_bocianem/historia-synagogi/",
        "checkedAt": "2026-10-20",
        "scope": "1829,architect,2010restoration,religious-culturalcontext"
      },
      {
        "url": "https://fbk.org.pl/synagoga_pod_bialym_bocianem/",
        "checkedAt": "2026-10-20",
        "scope": "Currentnotice:FBKnolongerhandlesvisits;contactJewishcommunity"
      },
      {
        "url": "https://www.wikidata.org/wiki/Q481571",
        "checkedAt": "2026-10-20",
        "scope": "Coordinatecrosscheck"
      },
      {
        "url": "https://zabytek.pl/pl/obiekty/wroclaw-synagoga-pod-bialym-bocianem",
        "checkedAt": "2026-10-20",
        "scope": "OfficialNationalHeritageInstitute identity,architecture,2010restoration andgeolocationviaGoogleMapsoutgoingdestination",
        "coordinateEvidence": "https://www.google.com/maps/dir/?api=1&destination=51.108468291071%2C17.025364605411"
      }
    ],
    "officialWebsiteAccess": "Community website returned502 throughwebreader and NordVPN threat-protection page in browser on2026-10-20; not bypassed. Use accessible official BenteKahan synagogue notice, which directs visitor enquiries to Jewishcommunity; no openinghours asserted.",
    "addressNotes": "NIDpropertyaddressPawlaWlodkowica5a;Jewishcommunityvisitor/contactaddressWlodkowica7. Samecourtyardcomplex,notseparatesynagogue."
  },
  "media": {
    "thumbnail": "/assets/white-stork/white-stork-01.jpg",
    "photos": [
      "/assets/white-stork/white-stork-01.jpg",
      "/assets/white-stork/white-stork-02.jpg",
      "/assets/white-stork/white-stork-03.jpg",
      "/assets/white-stork/white-stork-refresh-01.jpg",
      "/assets/white-stork/white-stork-refresh-02.jpg",
      "/assets/white-stork/white-stork-refresh-03.jpg",
      "/assets/white-stork/white-stork-refresh-04.jpg",
      "/assets/white-stork/white-stork-refresh-05.jpg"
    ],
    "videos": [],
    "metadata": {
      "/assets/white-stork/white-stork-01.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.01 (1).jpeg",
        "sourceSHA256": "d1b258c837c9e35e305a16a3c8924a843b51c2697bb93b3116ee555eb07f8fdc",
        "assetSHA256": "7a8875f7dd24e658167b455e3cc98bce1370e2866333180d2c5a812259174a42",
        "alt": {
          "he": "חצר בית הכנסת והמבנה הנאו־קלאסי ברקע",
          "en": "Synagogue courtyard with its neoclassical building in the background",
          "pl": "Dziedziniec synagogi z neoklasycystycznym budynkiem w tle",
          "de": "Synagogenhof mit dem neoklassizistischen Gebäude im Hintergrund",
          "cs": "Dvůr synagogy s neoklasicistní budovou v pozadí"
        },
        "familyForeground": false
      },
      "/assets/white-stork/white-stork-02.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.46.24.jpeg",
        "sourceSHA256": "201f6f3dcb102370e8488d40e272ad5499245465194fad525e17624aae493a0d",
        "assetSHA256": "89a057a72d1ca2739eae117b47af767577dd6860b476ec8ed2e6d1c418052d13",
        "alt": {
          "he": "חזית מבני הקהילה היהודית לצד בית הכנסת",
          "en": "Jewish community buildings beside the synagogue",
          "pl": "Budynki gminy żydowskiej przy synagodze",
          "de": "Gebäude der jüdischen Gemeinde neben der Synagoge",
          "cs": "Budovy židovské obce vedle synagogy"
        },
        "familyForeground": false
      },
      "/assets/white-stork/white-stork-03.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.56.02.jpeg",
        "sourceSHA256": "bbdc78b7c81e53331aeae5d8496f442e30aa812a385472f1b885e106024c7040",
        "assetSHA256": "d051775d9c9176b0971d652dc5815d08a1fa83b60a44b391f33edb6c0186e335",
        "alt": {
          "he": "חלונות צבעוניים במבני הקהילה שבחצר",
          "en": "Coloured windows in the community buildings around the courtyard",
          "pl": "Kolorowe okna w budynkach gminy wokół dziedzińca",
          "de": "Farbige Fenster der Gemeindegebäude am Innenhof",
          "cs": "Barevná okna obecních budov kolem dvora"
        },
        "familyForeground": false
      },
      "/assets/white-stork/white-stork-refresh-01.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-10-20 at 16.27.16.jpeg",
        "sourceSHA256": "3a6390f8fb7405c2a2e915287484d75eae3725b420b9a9ab3b27d9c2e8e83fc7",
        "assetSHA256": "cf24e8f8cc54680f29014518f30a3196de843d21fd2b45295c06a408c128da6b",
        "familyForeground": false,
        "alt": {
          "he": "לוח הנצחה למגורשים מחצר בית הכנסת",
          "en": "Memorial plaque to those deported from the synagogue courtyard",
          "pl": "Tablica pamięci deportowanych z dziedzińca synagogi",
          "de": "Gedenktafel für die vom Synagogenhof Deportierten",
          "cs": "Pamětní deska deportovaným ze dvora synagogy"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/white-stork/white-stork-refresh-02.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-10-20 at 16.27.10.jpeg",
        "sourceSHA256": "fbe1a1e9a0a8fd302ab088104ef5168477a6f79920d90cea03c4813e1f0e00dc",
        "assetSHA256": "d570c23d0f66b33e736fa326cff5c0e595275190362e4422fe102262cfdb78b7",
        "familyForeground": false,
        "alt": {
          "he": "החצר וחזית בית הכנסת החסידה הלבנה",
          "en": "Courtyard and White Stork Synagogue façade",
          "pl": "Dziedziniec i fasada Synagogi pod Białym Bocianem",
          "de": "Hof und Fassade der Synagoge Zum Weißen Storch",
          "cs": "Dvůr a průčelí synagogy U Bílého čápa"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/white-stork/white-stork-refresh-03.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-10-20 at 16.27.08.jpeg",
        "sourceSHA256": "f87c62f539c526468c001479eb7821e418d4739f7ffe258987aca4651ce7741b",
        "assetSHA256": "969913743aeaba5e2bdb3c87f4a8c90a328aa049d1a8f787c1f4d5747756205d",
        "familyForeground": false,
        "alt": {
          "he": "בית הכנסת ובנייני הקהילה סביב החצר",
          "en": "Synagogue and community buildings around the courtyard",
          "pl": "Synagoga i budynki gminy wokół dziedzińca",
          "de": "Synagoge und Gemeindegebäude um den Hof",
          "cs": "Synagoga a komunitní budovy kolem dvora"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/white-stork/white-stork-refresh-04.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-10-20 at 16.26.58.jpeg",
        "sourceSHA256": "088b85e9f0a05920a2b3a64d95ae74632102da0f2d82482a94c397ce3f2171a1",
        "assetSHA256": "490350486522aa9d1fff71d8456982346e9966a4dc74029529620ba5fe683e74",
        "familyForeground": false,
        "alt": {
          "he": "לוח זיהוי והיסטוריה בחזית בית הכנסת",
          "en": "Identity and history plaque on the synagogue façade",
          "pl": "Tablica z nazwą i historią na fasadzie synagogi",
          "de": "Namens- und Geschichtstafel an der Synagogenfassade",
          "cs": "Deska s názvem a historií na průčelí synagogy"
        },
        "verifiedAt": "2026-10-20"
      },
      "/assets/white-stork/white-stork-refresh-05.jpg": {
        "original": true,
        "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-10-20 at 16.26.59.jpeg",
        "sourceSHA256": "77feff7dfc33d8724c5a98a26d8bc127f302afc3ae4b731dab8bc93fcc43762e",
        "assetSHA256": "6ae5f504e5513752091c7d969ba4808f63f961ad0a37df2384fc80868785d6c3",
        "familyForeground": false,
        "alt": {
          "he": "מגן דוד מעל דלת בית הכנסת",
          "en": "Star of David above the synagogue door",
          "pl": "Gwiazda Dawida nad drzwiami synagogi",
          "de": "Davidstern über der Synagogentür",
          "cs": "Davidova hvězda nad dveřmi synagogy"
        },
        "verifiedAt": "2026-10-20"
      }
    }
  },
  "socialPosts": []
}; window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.map(record=>record.id===replacement.id?replacement:record); })();

//21October source-delta refresh; preserve separate canonical cultural registry.
(function(){const records=[{"id":"opera","localName":"Opera Wrocławska","name":{"he":"האופרה של ורוצלב","en":"Wrocław Opera","pl":"Opera Wrocławska","de":"Oper Breslau","cs":"Vratislavská opera"},"description":{"he":"בית אופרה היסטורי פעיל בלב העיר.","en":"An active historic opera house in the city centre.","pl":"Czynny historyczny gmach opery w centrum miasta.","de":"Aktives historisches Opernhaus im Stadtzentrum.","cs":"Aktivní historická operní budova v centru města."},"location":{"countryCode":"PL","regionId":"lower-silesia","cityId":"wroclaw","coordinates":{"lat":51.10672,"lng":17.03254}},"categories":["architecture","music","theatre"],"sourceUrls":[],"aliases":[],"sourceRecords":[{"productId":"wroclaw-24-hours","kind":"route-stop","sourceId":"opera"}],"coordinateCandidates":[{"productId":"wroclaw-24-hours","sourceId":"opera","lat":51.10672,"lng":17.03254}],"status":"published","editorialPriority":"normal","taxonomy":{"categories":["architecture","music","theatre"],"tags":["music-opera","theatre-performing-arts","architecture-design"]},"suitability":{"recommendedFor":[],"walkingIntensity":null,"familyFriendly":null,"couples":null,"solo":null,"romantic":null,"indoorOutdoor":null,"rainFriendly":null,"budgetLevel":null,"accessibility":{"level":null,"notes":null}},"visit":{"durationMinutes":null,"bestTimeOfDay":[],"seasonalSuitability":[],"openingHoursNotes":null},"links":{"website":"https://opera.wroclaw.pl/","navigation":{"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.10672%2C17.03254","appleMaps":"https://maps.apple.com/?ll=51.10672,17.03254&q=Opera%20Wroc%C5%82awska"}},"transport":{"carRequired":null,"publicTransportNotes":null,"parkingNotes":null,"drivingTimeFromWroclawMinutes":null},"languages":["he","en","pl","de","cs"],"provenance":{"contentType":"official-institution-audit","factualSources":[{"type":"official","url":"https://opera.wroclaw.pl/","checkedAt":"2026-08-29"}],"refresh20261021":{"sources":[{"url":"https://www.opera.wroclaw.pl/kontakt","supports":"Official institution identity and address Świdnicka35; no hours copied"}],"action":"Added new full-picture visit photograph; preserved identity, prior media and validlinks","checkedAt":"2026-10-21T11:30:11.255080+00:00"}},"media":{"photos":["/assets/gallery-opera-05.jpg","/assets/gallery-opera-06.jpg","/assets/today-source-refresh-20261021/opera-01.jpg"],"videos":[],"metadata":{"/assets/today-source-refresh-20261021/opera-01.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Image 2026-10-19 at 08.42.06.jpeg","sourceSHA256":"cbe65aea7047663905d4af0fc75684371026197a1508f4776c01a7cd58d7b424","assetSHA256":"5f0d720318c53aee88e8cf0156d0d01841b91ea46f19ce3afe6816319dcdaca5","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"דגם מבנה האופרה ברחוב","en":"Model of the opera building in the street","pl":"Model budynku opery w przestrzeni ulicy","de":"Modell des Opernhauses im Straßenraum","cs":"Model operní budovy v ulici"},"verifiedAt":"2026-10-21T11:30:11.255080+00:00","original":true,"familyForeground":false}},"thumbnail":"/assets/gallery-opera-05.jpg"},"socialPosts":[{"platform":"facebook","language":"pl","url":"https://facebook.com/permalink.php?story_fbid=pfbid02Z8kgxs3fBBWm21rF1HhaxvyXqs4cv1W1KhPQmxcND991g7VVKxJMDXYVPCFR4vTxl&id=61595207664875","verifiedAt":"2026-10-06T23:18:30.335855+00:00"},{"platform":"facebook","language":"de","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0zRLHCGbDPckmCMWhYqUNZx3QcDXw8pnK42Dzvm1XG5FVCcab4zWMhjA2TYsjn39l&id=61595239823399","verifiedAt":"2026-10-06T23:25:41.633457+00:00"},{"platform":"facebook","language":"cs","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02y1sCWXzMXSoLSEVfQ4U6yRvAm82CSq4Ft6dZ8e5JU4GnXcSV6iFHyLjuzuH9bpR4l&id=61594716405964","verifiedAt":"2026-10-07"},{"platform":"instagram","language":"en","url":"https://www.instagram.com/p/DeMm2qnlLRJ/","verifiedAt":"2026-10-07"},{"platform":"facebook","language":"en","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0ShhCD1Qo8tRT5fzNzJBNDP6HqpSoxNjh1P7KVq9iaNzJMUkpybznT9Q6CVzZ2GNpl&id=61595036942289","verifiedAt":"2026-10-07"},{"platform":"instagram","language":"de","url":"https://www.instagram.com/p/DeMpfnYj-zN/","verifiedAt":"2026-10-07T15:11:03.812718+00:00"},{"platform":"instagram","language":"cs","url":"https://www.instagram.com/p/DeOF5bFCVkv/","verifiedAt":"2026-10-08"},{"platform":"facebook","language":"he","url":"https://www.facebook.com/61591964083308/posts/122108359197398802/","verifiedAt":"2026-10-09T01:42:27.437Z"},{"platform":"instagram","language":"pl","url":"https://www.instagram.com/p/DeT6b4dj9Oo/","verifiedAt":"2026-10-10T10:54:06.740Z"},{"platform":"instagram","url":"https://www.instagram.com/p/DcrGVaJDCs3/?img_index=1","routingExcluded":true},{"platform":"facebook","url":"https://www.facebook.com/photo/?fbid=122108355723398802"}]},{"id":"nfm","localName":"Narodowe Forum Muzyki","name":{"he":"הפורום הלאומי למוזיקה","en":"National Forum of Music","pl":"Narodowe Forum Muzyki","de":"Nationales Musikforum","cs":"Národní hudební fórum"},"description":{"he":"אולם הקונצרטים המרכזי בעיר, עם תוכנית קלאסית ועכשווית.","en":"The city's main concert hall, with classical and contemporary programmes.","pl":"Główna sala koncertowa miasta z repertuarem klasycznym i współczesnym.","de":"Wichtigster Konzertsaal der Stadt mit klassischem und zeitgenössischem Programm.","cs":"Hlavní koncertní sál města s klasickým i současným programem."},"location":{"countryCode":"PL","regionId":"lower-silesia","cityId":"wroclaw","coordinates":{"lat":51.10775,"lng":17.02857}},"categories":["architecture","music"],"sourceUrls":[],"aliases":[],"sourceRecords":[{"productId":"wroclaw-24-hours","kind":"route-stop","sourceId":"nfm"}],"coordinateCandidates":[{"productId":"wroclaw-24-hours","sourceId":"nfm","lat":51.10775,"lng":17.02857}],"status":"published","editorialPriority":"normal","taxonomy":{"categories":["architecture","music"],"tags":["music-opera","architecture-design"]},"suitability":{"recommendedFor":[],"walkingIntensity":null,"familyFriendly":null,"couples":null,"solo":null,"romantic":null,"indoorOutdoor":null,"rainFriendly":null,"budgetLevel":null,"accessibility":{"level":null,"notes":null}},"visit":{"durationMinutes":null,"bestTimeOfDay":[],"seasonalSuitability":[],"openingHoursNotes":null},"links":{"website":"https://nfm.wroclaw.pl/","navigation":{"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.10775%2C17.02857","appleMaps":"https://maps.apple.com/?ll=51.10775,17.02857&q=Narodowe%20Forum%20Muzyki"}},"transport":{"carRequired":null,"publicTransportNotes":null,"parkingNotes":null,"drivingTimeFromWroclawMinutes":null},"languages":["he","en","pl","de","cs"],"provenance":{"contentType":"official-institution-audit","factualSources":[{"type":"official","url":"https://nfm.wroclaw.pl/","checkedAt":"2026-08-29"}],"refresh20261021":{"sources":[{"url":"https://www.nfm.wroclaw.pl/kontakt","supports":"Official NFM name and plac Wolności1 address"},{"url":"https://www.nfm.wroclaw.pl/o-nas/budynek","supports":"Official musical architectural inspiration and string-instrument envelope"}],"action":"Added new full-picture visit photograph; preserved identity, prior media and validlinks","checkedAt":"2026-10-21T11:30:11.255080+00:00"}},"media":{"photos":["/assets/gallery-nfm-01.jpg","/assets/gallery-nfm-02.jpg","/assets/gallery-nfm-03.jpg","/assets/today-source-refresh-20261021/nfm-01.jpg"],"videos":["https://www.youtube.com/watch?v=_Dez_yfkVVQ"],"metadata":{"/assets/today-source-refresh-20261021/nfm-01.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-19 at 08.42.00.jpeg","sourceSHA256":"5e1278a9f7519917226f18dc334b407a542723aecf01bec6f608d2547e4edaa7","assetSHA256":"0115bcc12c63d38d56c2db36ecf281bc5684e7c3663e24b39667a29bb8433553","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"החזית האדומה־חומה של הפורום הלאומי למוזיקה","en":"Reddish-brown façade of the National Forum of Music","pl":"Czerwono-brązowa fasada Narodowego Forum Muzyki","de":"Rotbraune Fassade des Nationalen Musikforums","cs":"Červenohnědá fasáda Národního hudebního fóra"},"verifiedAt":"2026-10-21T11:30:11.255080+00:00","original":true,"familyForeground":false},"https://www.youtube.com/watch?v=_Dez_yfkVVQ":{"title":{"he":"NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE","en":"NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE","pl":"NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE","de":"NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE","cs":"NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE"},"sourceSHA256":"3406f6f11ab8a40e8a80fb581ef90739018ee2f738142c01d024067c2a612ea3","uploadSHA256":"ab3aa32d1a80612c887dd8436558659627668b76fb157e68c5b9f83d52ac9d40","originalFullPicturePreserved":true,"audioStreams":0,"familyExceptionApplied":false,"visibility":"Public","reopenedPublicVerified":true,"checks":"Copyright and Community Guidelines complete: no issues found","verifiedAt":"2026-10-21T11:56:03.747Z"}},"thumbnail":"/assets/gallery-nfm-01.jpg"},"socialPosts":[{"platform":"facebook","language":"pl","url":"https://facebook.com/permalink.php?story_fbid=pfbid02nnJty31FqZX2J3jmXKXYEsC3L6wdC14kk3SBMfyw1AkExKHzub9Ur78N2BdAJ6dol&id=61595207664875","verifiedAt":"2026-10-06T23:17:27.632328+00:00"},{"platform":"facebook","language":"de","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02as1UNutmRETqDwaaLhFnASu3sSGkm6YXuwHEcm2frbFS1Dn6H6zfz1pTLQh7cjHKl&id=61595239823399","verifiedAt":"2026-10-06T23:23:36.915916+00:00"},{"platform":"facebook","language":"en","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02CNbxAFLcyLKi4DekY7QhVSVkoxvBoG5fMMCMb7vKZiFLSfMUP9sdpWStaz3oaJiPl&id=61595036942289","verifiedAt":"2026-10-07"},{"platform":"facebook","language":"cs","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0TBekCtd6oLi3gnT41ecz1taVw4Y97K4ZXr8x1VDFZdUsdbjbUzJhQDDfWeZpxxPYl&id=61594716405964","verifiedAt":"2026-10-07"},{"platform":"instagram","language":"en","url":"https://www.instagram.com/p/DeMjER3lKpn/","verifiedAt":"2026-10-07"},{"platform":"instagram","language":"de","url":"https://www.instagram.com/p/DeMpEByFEH1/","verifiedAt":"2026-10-07T15:07:43.253189+00:00"},{"platform":"instagram","language":"cs","url":"https://www.instagram.com/p/DeM5aYvjcZA/","verifiedAt":"2026-10-07"},{"platform":"facebook","language":"he","url":"https://www.facebook.com/61591964083308/posts/122117365257398802/","verifiedAt":"2026-10-09T00:42:44.577Z"},{"platform":"instagram","language":"pl","url":"https://www.instagram.com/p/DeT6y0OlcwE/","verifiedAt":"2026-10-10T10:57:32.950Z"},{"platform":"facebook","url":"https://www.facebook.com/share/p/1C4YQxxtU1/"},{"platform":"instagram","url":"https://www.instagram.com/p/DcrATSoDN-C/?img_index=1","routingExcluded":true}]},{"id":"royal-palace-wroclaw","localName":"Pałac Królewski","name":{"he":"הארמון המלכותי","en":"Royal Palace","pl":"Pałac Królewski","de":"Königspalais","cs":"Královský palác"},"description":{"he":"ארמון מלכותי ובו תולדות ורוצלב ואמנות המדליות.","en":"A royal palace presenting Wrocław's history and medallic art.","pl":"Pałac królewski z historią Wrocławia i sztuką medalierską.","de":"Königspalais mit Breslauer Geschichte und Medaillenkunst.","cs":"Královský palác s dějinami Vratislavi a medailérským uměním."},"location":{"countryCode":"PL","regionId":"lower-silesia","cityId":"wroclaw","coordinates":{"lat":51.1076223,"lng":17.0292728},"address":{"street":"Kazimierza Wielkiego 35","postalCode":"50-077","city":"Wrocław","country":"Poland"}},"categories":["art","history","museum"],"sourceUrls":[],"aliases":[],"sourceRecords":[],"coordinateCandidates":[],"status":"published","editorialPriority":"normal","taxonomy":{"categories":["art","history","museum"],"tags":["museums-history","art-contemporary","architecture-design"]},"suitability":{"recommendedFor":[],"walkingIntensity":null,"familyFriendly":null,"couples":null,"solo":null,"romantic":null,"indoorOutdoor":null,"rainFriendly":null,"budgetLevel":null,"accessibility":{"level":null,"notes":null}},"visit":{"durationMinutes":null,"bestTimeOfDay":[],"seasonalSuitability":[],"openingHoursNotes":null},"links":{"website":"https://muzeum.miejskie.wroclaw.pl/","navigation":{"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.1076223%2C17.0292728","appleMaps":"https://maps.apple.com/?ll=51.1076223,17.0292728&q=Pa%C5%82ac%20Kr%C3%B3lewski"}},"transport":{"carRequired":null,"publicTransportNotes":null,"parkingNotes":null,"drivingTimeFromWroclawMinutes":null},"languages":["he","en","pl","de","cs"],"experiences":[{"id":"historical-museum","tags":["history"]},{"id":"museum-of-medallic-art","tags":["art","history"]}],"provenance":{"contentType":"official-institution-audit","factualSources":[{"type":"official","url":"https://muzeum.miejskie.wroclaw.pl/","checkedAt":"2026-08-29"}],"refresh20261021":{"sources":[{"url":"https://muzeum.miejskie.wroclaw.pl/museum/historyczne/","supports":"Official Historical Museum housed in Royal Palace, 1000yearsWroclaw exhibition"},{"url":"https://muzeum.miejskie.wroclaw.pl/exhibition/skrocone-godziny-otwarcia/","supports":"Official institution-address pairing only; historical temporaryhours NOT reused"}],"action":"Added new full-picture visit photograph; preserved identity, prior media and validlinks","checkedAt":"2026-10-21T11:30:11.255080+00:00"}},"media":{"photos":["/assets/today-source-refresh-20261021/royal-palace-wroclaw-01.jpg"],"videos":[],"metadata":{"/assets/today-source-refresh-20261021/royal-palace-wroclaw-01.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/מוזיאון וורוצלב/WhatsApp Image 2026-10-21 at 14.06.06.jpeg","sourceSHA256":"fb9286589577e9ed19bca8bdf94254bd9ed69f4ec683a77a16520397624323bc","assetSHA256":"dce7fbaa3009829bec76f0fc5e438ddc8ed87416fa3fdfa3525147a6d09b18f8","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"חזית הארמון המלכותי והגג האדום","en":"Royal Palace façade and red roof","pl":"Fasada Pałacu Królewskiego i czerwony dach","de":"Fassade des Königspalais und rotes Dach","cs":"Průčelí Královského paláce a červená střecha"},"verifiedAt":"2026-10-21T11:30:11.255080+00:00","original":true,"familyForeground":false}},"thumbnail":"/assets/today-source-refresh-20261021/royal-palace-wroclaw-01.jpg"},"socialPosts":[{"platform":"facebook","language":"cs","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02SuVFWufPonYcKLpZMJQmifBYL7WNvS9rVAipEfobJNwUpa43aY3qN2QpJFeQrhVtl&id=61594716405964","verifiedAt":"2026-10-07"},{"platform":"facebook","language":"en","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0kp5Q2GTACFan4oKVzt5p8AD5TA9wHRid96kJqcGm9vnE5JsZynDsNtsNVV14CsP1l&id=61595036942289","verifiedAt":"2026-10-07"},{"platform":"facebook","language":"pl","url":"https://facebook.com/permalink.php?story_fbid=pfbid0AsM55F8AA3fJL7ArkA35Dh4bT3QNfJHGfbD7nb2JDAuG6aBTACAuAuZHe2cYcSbZl&id=61595207664875","verifiedAt":"2026-10-08T15:11:35.951Z"}]},{"id":"henryk-tomaszewski-theatre-museum","localName":"Muzeum Teatru im. Henryka Tomaszewskiego","name":{"he":"מוזיאון התיאטרון ע״ש הנריק תומשבסקי","en":"Henryk Tomaszewski Theatre Museum","pl":"Muzeum Teatru im. Henryka Tomaszewskiego","de":"Henryk-Tomaszewski-Theatermuseum","cs":"Divadelní muzeum Henryka Tomaszewského"},"description":{"he":"מוזיאון לתולדות התיאטרון של ורוצלב וליצירת הנריק תומשבסקי.","en":"A museum of Wrocław theatre history and Henryk Tomaszewski's work.","pl":"Muzeum historii wrocławskiego teatru i twórczości Henryka Tomaszewskiego.","de":"Museum zur Breslauer Theatergeschichte und zu Henryk Tomaszewski.","cs":"Muzeum dějin vratislavského divadla a tvorby Henryka Tomaszewského."},"location":{"countryCode":"PL","regionId":"lower-silesia","cityId":"wroclaw","coordinates":{"lat":51.1069642,"lng":17.0278621},"address":{"street":"plac Wolności 7A","postalCode":"50-071","city":"Wrocław","country":"Poland"}},"categories":["museum","theatre"],"sourceUrls":[],"aliases":[],"sourceRecords":[],"coordinateCandidates":[],"status":"published","editorialPriority":"normal","taxonomy":{"categories":["museum","theatre"],"tags":["museums-history","theatre-performing-arts"]},"suitability":{"recommendedFor":[],"walkingIntensity":null,"familyFriendly":null,"couples":null,"solo":null,"romantic":null,"indoorOutdoor":null,"rainFriendly":null,"budgetLevel":null,"accessibility":{"level":null,"notes":null}},"visit":{"durationMinutes":null,"bestTimeOfDay":[],"seasonalSuitability":[],"openingHoursNotes":null},"links":{"website":"https://muzeum.miejskie.wroclaw.pl/","navigation":{"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.1069642%2C17.0278621","appleMaps":"https://maps.apple.com/?ll=51.1069642,17.0278621&q=Muzeum%20Teatru%20im.%20Henryka%20Tomaszewskiego"}},"transport":{"carRequired":null,"publicTransportNotes":null,"parkingNotes":null,"drivingTimeFromWroclawMinutes":null},"languages":["he","en","pl","de","cs"],"provenance":{"contentType":"official-institution-audit","factualSources":[{"type":"official","url":"https://muzeum.miejskie.wroclaw.pl/","checkedAt":"2026-08-29"}],"refresh20261021":{"sources":[{"url":"https://www.wroclaw.pl/nasz-wroclaw/partner/muzeum-teatru-im-henryka-tomaszewskiego-wroclaw","supports":"Official city partner page institution identity, theatre history, Tomaszewski founder"},{"url":"https://muzeum.miejskie.wroclaw.pl/wp-content/uploads/2020/01/oferta-Muzeum-Teatru.pdf","supports":"Museum primary brochure plac Wolności7a"}],"action":"Added new full-picture visit photograph; preserved identity, prior media and validlinks","checkedAt":"2026-10-21T11:30:11.255080+00:00"}},"media":{"photos":["/assets/today-source-refresh-20261021/henryk-tomaszewski-theatre-museum-01.jpg"],"videos":[],"metadata":{"/assets/today-source-refresh-20261021/henryk-tomaszewski-theatre-museum-01.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/THEATER MUSEUM/WhatsApp Image 2026-10-19 at 08.42.07 (3).jpeg","sourceSHA256":"a01974e1ac05e674d91d9b3c24767d60f2b4db213d2c12b66d1b74e3c5f09595","assetSHA256":"14b8101a4082b081da690f0e7198c2dde7456a1c595a266665cb101907a9ae47","originalFullPicturePreserved":true,"familyExceptionApplied":false,"alt":{"he":"חזית מוזיאון התיאטרון לצד כיכר וולנושצ׳י","en":"The Theatre Museum façade beside plac Wolności","pl":"Fasada Muzeum Teatru przy placu Wolności","de":"Fassade des Theatermuseums am plac Wolności","cs":"Průčelí Divadelního muzea u placu Wolności"},"verifiedAt":"2026-10-21T11:30:11.255080+00:00","original":true,"familyForeground":false}},"thumbnail":"/assets/today-source-refresh-20261021/henryk-tomaszewski-theatre-museum-01.jpg"},"socialPosts":[{"platform":"facebook","language":"cs","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0k8YRSuEk8A36w6mu5CKPxnwPi8pBswawrVTLSq5fxj73seJVq9v1ch5qxwr4j35Wl&id=61594716405964","verifiedAt":"2026-10-07T06:27:53.385594+00:00"},{"platform":"facebook","language":"en","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02qV2THs3r3nMSwba861JC8LEfMoDXq3mf1k7oxAEi2k16WJKX8zxsSnyUHKM82PfUl&id=61595036942289","verifiedAt":"2026-10-07"},{"platform":"facebook","language":"pl","url":"https://facebook.com/permalink.php?story_fbid=pfbid091zYLnabjJGGcBeqdzWQhdBnE734Uj4MZhvJbJorFQPgvXekCy464vNYdQcJTJ7nl&id=61595207664875","verifiedAt":"2026-10-08T13:59:18.794Z"},{"platform":"facebook","language":"de","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02cDCpmjChefEV95RbnEvGePwryBMCwQ3doGvrYdDZxE2j3iiS4bhogCBgX1oj53Kul&id=61595239823399","verifiedAt":"2026-10-08T14:36:11.696186+00:00"}]}];const ids=new Set(records.map(p=>p.id));window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.filter(p=>!ids.has(p.id));window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.push(...records);})();

// Run4 reviewedsourcephoto delta, originalmediaandidentitypreserved.
(()=>{const records=[{"id": "four-denominations-district", "localName": "Dzielnica Czterech Wyznań", "name": {"he": "רובע ארבע הדתות", "en": "Four Denominations District", "pl": "Dzielnica Czterech Wyznań", "de": "Viertel der vier Konfessionen", "cs": "Čtvrť čtyř vyznání"}, "description": {"he": "אזור הליכה קטן בעיר העתיקה, שבו נפגשות ארבע קהילות דתיות: יהודית, קתולית, לותרנית ואורתודוקסית. בין מקומות התפילה משתרעים רחובות, חצרות ובתי קפה, לצד עקבות של חיי התרבות והקהילה של ורוצלב. פסל כוכב הלכת מבדולח מסמן כניסה סמלית לאזור. מומלץ לשלב שיטוט ברחובות עם ביקור נפרד בבית הכנסת החסידה הלבנה; אפשרות הכניסה למקומות התפילה תלויה בכל מוסד ובפעילותו. זהו רובע תרבותי, ולא יחידה מנהלית נפרדת.", "en": "A compact walking area in the Old Town bringing together Jewish, Roman Catholic, Lutheran and Orthodox communities. Streets, courtyards and cafés connect places of worship with traces of Wrocław’s cultural and community life. The Crystal Planet sculpture marks a symbolic entrance. Combine an unhurried walk with a separate visit to the White Stork Synagogue; entry to each place of worship depends on its own arrangements and activities. This is a cultural quarter, not a separate administrative district.", "pl": "Niewielki obszar spacerowy na Starym Mieście łączy wspólnoty żydowską, rzymskokatolicką, ewangelicko-augsburską i prawosławną. Ulice, podwórza i kawiarnie prowadzą między świątyniami oraz śladami życia kulturalnego i społecznego Wrocławia. Symboliczne wejście wyznacza rzeźba Kryształowa Planeta. Spacer warto połączyć z osobną wizytą w Synagodze pod Białym Bocianem; dostęp do poszczególnych świątyń zależy od ich własnych zasad i odbywających się nabożeństw. Jest to dzielnica w znaczeniu kulturowym, nie odrębna jednostka administracyjna.", "de": "Ein kleines Spaziergebiet in der Altstadt verbindet jüdische, römisch-katholische, lutherische und orthodoxe Gemeinden. Straßen, Innenhöfe und Cafés führen zwischen Gotteshäusern und Spuren des kulturellen und gemeinschaftlichen Lebens Breslaus hindurch. Die Skulptur Kristallplanet markiert einen symbolischen Eingang. Ein ruhiger Rundgang lässt sich mit einem gesonderten Besuch der Synagoge zum Weißen Storch verbinden; der Zutritt zu den Gotteshäusern richtet sich nach den jeweiligen Regeln und Veranstaltungen. Es handelt sich um ein Kulturviertel, nicht um einen eigenständigen Verwaltungsbezirk.", "cs": "Malá pěší oblast ve Starém Městě propojuje židovskou, římskokatolickou, luterskou a pravoslavnou komunitu. Mezi svatyněmi vedou ulice, dvory a kavárny se stopami kulturního a společenského života Vratislavi. Symbolický vstup označuje socha Křišťálová planeta. Klidnou procházku lze spojit se samostatnou návštěvou synagogy U Bílého čápa; vstup do jednotlivých svatyní závisí na jejich pravidlech a probíhajících obřadech. Jde o kulturní čtvrť, nikoli samostatnou správní jednotku."}, "location": {"countryCode": "PL", "regionId": "lower-silesia", "cityId": "wroclaw", "coordinates": {"lat": 51.10968, "lng": 17.023753}, "address": {"city": "Wrocław", "country": "Poland"}}, "categories": ["architecture", "area", "history"], "sourceUrls": [], "aliases": ["district-of-mutual-respect", "dzielnica-czterech-swiatyn", "dzielnica-czterech-wyznan", "four-religions", "four-temples"], "sourceRecords": [], "coordinateCandidates": [], "status": "published", "editorialPriority": "normal", "taxonomy": {"categories": ["architecture", "area", "history"], "tags": ["museums-history", "architecture-design"]}, "suitability": {"recommendedFor": [], "walkingIntensity": null, "familyFriendly": null, "couples": null, "solo": null, "romantic": null, "indoorOutdoor": null, "rainFriendly": null, "budgetLevel": null, "accessibility": {"level": null, "notes": null}}, "visit": {"durationMinutes": null, "bestTimeOfDay": [], "seasonalSuitability": [], "openingHoursNotes": null}, "links": {"website": "https://www.fundacja4wyznan.pl/n/dzielnica/", "navigation": {"googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10968%2C17.023753", "appleMaps": "https://maps.apple.com/?ll=51.10968,17.023753&q=Dzielnica%20Czterech%20Wyzna%C5%84"}, "socialProfileFallback": false}, "transport": {"carRequired": null, "publicTransportNotes": null, "parkingNotes": null, "drivingTimeFromWroclawMinutes": null}, "languages": ["he", "en", "pl", "de", "cs"], "provenance": {"contentType": "official-area-identity-and-original-visit-audit", "factualSources": [{"type": "official", "url": "https://dolnyslask.travel/obiekt/dzielnica-czterech-wyznan", "checkedAt": "2026-10-20", "scope": "District identity, official district coordinate anchor, Crystal Planet symbolic entrance"}, {"type": "official", "url": "https://www.fundacja4wyznan.pl/n/dzielnica/", "checkedAt": "2026-10-20", "scope": "Four faith communities and district streets"}], "mediaSource": "Original WROC-LOVE visit materials; data/district-synagogue-enrichment-provenance.json"}, "media": {"thumbnail": "/assets/four-denominations-district-crystal-planet.jpg", "photos": ["/assets/four-denominations-district-crystal-planet.jpg", "/assets/four-denominations-district-street.jpg", "/assets/four-denominations-district-wlodkowica-entrance.jpg", "/assets/four-denominations-district-plaque.jpg", "/assets/four-denominations-district-rotbaum-plaque.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-01.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-02.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-03.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-04.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-05.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-06.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-07.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-08.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-09.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-10.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-11.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-12.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-13.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-14.jpg", "/assets/four-denominations-refresh/four-denominations-refresh-15.jpg", "/assets/today-source-refresh-20261021/run4-046-four-denominations-district.jpg"], "videos": ["https://www.youtube.com/watch?v=Eu84SKoKNZA", "https://www.youtube.com/watch?v=o6qgx0B_sU0", "https://www.youtube.com/watch?v=UOkQKcNFqBw", "https://youtube.com/shorts/ExcXaGEwCz0", "https://youtube.com/shorts/ZKCrh7ZNZFU", "https://youtube.com/shorts/FgmfsnmETco", "https://youtube.com/shorts/maNHvOKVA_s", "https://youtube.com/shorts/sZjy6-Xfj8I", "https://youtube.com/shorts/hp5UfkhbhUc"], "guideVideos": {"he": "https://youtube.com/shorts/rSn6kJy3gQE", "en": "https://youtube.com/shorts/oqziuQx8hLQ"}, "metadata": {"/assets/four-denominations-district-crystal-planet.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/IMG_1044.JPG", "sourceSHA256": "f5ded5bb2f18c4d035e8d07fad65f279e764f747925f5377bb2c86e184bdcae9", "assetSHA256": "c5c9e699c956430b03f3144467e22d679dc212f191c2e09e16dcb552a86efc88", "familyForeground": false, "alt": {"he": "פסל כוכב הלכת מבדולח בכניסה הסמלית לרובע", "en": "Crystal Planet sculpture at the symbolic district entrance", "pl": "Kryształowa Planeta przy symbolicznym wejściu do dzielnicy", "de": "Kristallplanet am symbolischen Eingang des Viertels", "cs": "Křišťálová planeta u symbolického vstupu do čtvrti"}}, "/assets/four-denominations-district-street.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-07-13 at 19.56.02 (1).jpeg", "sourceSHA256": "26891c678af3a4653702a1f8c99500ab44fe1b78cb010b75716ab4bfe1d54b39", "assetSHA256": "bcadc7676862e9801aeaabd2af60a8ef81c9d472c319132eec309ff923cd44db", "familyForeground": false, "alt": {"he": "רחוב אנטוני הקדוש ובתי הקפה ברובע", "en": "Saint Anthony Street and district cafés", "pl": "Ulica św. Antoniego i kawiarnie w dzielnicy", "de": "Świętego-Antoniego-Straße und Cafés im Viertel", "cs": "Ulice svatého Antonína a kavárny ve čtvrti"}}, "/assets/four-denominations-district-wlodkowica-entrance.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.01.jpeg", "sourceSHA256": "f7fe3903df3c350d5e9dd5ffc98c2d3773c0bc1e1f9e7e1266b723bc193d2ad6", "assetSHA256": "b154ae4b12fdeddaec607caa20a81950739f49d7b385e49ab4375123ac9a3257", "familyForeground": false, "alt": {"he": "כניסה לבניין ברחוב ולודקוביצה לצד לוח ההנצחה", "en": "Włodkowica doorway beside the memorial plaque", "pl": "Wejście przy ulicy Włodkowica obok tablicy pamiątkowej", "de": "Eingang an der Włodkowica-Straße neben der Gedenktafel", "cs": "Vchod v ulici Włodkowica vedle pamětní desky"}}, "/assets/four-denominations-district-plaque.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/IMG_1043.JPG", "sourceSHA256": "7e258188ebea1bb64b8c1d8f6314200be367053cf849cd68d14670d3a4ccde56", "assetSHA256": "f9950a8b65457277d2a0595db7e58e728a6a9e2a141e0cc0e23dc864009fde9d", "familyForeground": false, "alt": {"he": "לוח סמלי ארבע הדתות בריצוף הרובע", "en": "Four faith symbols in the district paving", "pl": "Symbole czterech wyznań w nawierzchni dzielnicy", "de": "Symbole der vier Konfessionen im Straßenpflaster", "cs": "Symboly čtyř vyznání v dlažbě čtvrti"}}, "/assets/four-denominations-district-rotbaum-plaque.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/white storck aynagiague/WhatsApp Image 2026-07-13 at 19.48.00 (1).jpeg", "sourceSHA256": "95e34d14e2b84ad364db27bdc4f6fd1b38c28767dbecc55fba286fd0c62d7c78", "assetSHA256": "d933118b4ae5dc9fb2fde5e869c5b5e528ba489d1fb0ebf6e6cb6f21a0b41521", "familyForeground": false, "alt": {"he": "לוח הנצחה ליעקב וליה רוטבאום", "en": "Jakub and Lia Rotbaum memorial plaque", "pl": "Tablica upamiętniająca Jakuba i Lię Rotbaumów", "de": "Gedenktafel für Jakub und Lia Rotbaum", "cs": "Pamětní deska Jakuba a Lii Rotbaumových"}}, "/assets/four-denominations-refresh/four-denominations-refresh-01.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.26.54.jpeg", "sourceSHA256": "38acc7d15088674b078efb4f9927605088eb8d44614da25f5267a78c69492068", "assetSHA256": "ca6e9dab66f46d7c1dcc5c6bbe75fa14b6b55faed97acc4e2d621a0254b8601d", "familyForeground": false, "alt": {"he": "פרט פנס וחיפוי במעבר פוקויהוף", "en": "Lantern and tile detail in Pokoyhof", "pl": "Detal latarni i okładziny w Pokoyhof", "de": "Laternen- und Fliesendetail im Pokoyhof", "cs": "Detail lucerny a obkladu v Pokoyhof"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-02.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.07 (1).jpeg", "sourceSHA256": "9b95889d06a50324aa62191ebcb19c3e2178d831ac0ed4a3d9ef3ca77aafd419", "assetSHA256": "41e17d06464d91b5bd17907033b55d844c88e68d80366f75514e314307268de2", "familyForeground": false, "alt": {"he": "רחוב ברובע ארבע הדתות", "en": "Street in the Four Denominations District", "pl": "Ulica w Dzielnicy Czterech Wyznań", "de": "Straße im Viertel der vier Konfessionen", "cs": "Ulice ve čtvrti čtyř vyznání"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-03.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.07.jpeg", "sourceSHA256": "5696da22d47f008ee04cd41f7353cf04373b90c9f63fcd2a7d559e6b46b69e4a", "assetSHA256": "43c83c08a4baf52db69d09253869e4d4c7f570d11b85863145cbdf70c4b1000e", "familyForeground": false, "alt": {"he": "פסיפס השם פוקויהוף מעל השער", "en": "Pokoyhof name mosaic above the gate", "pl": "Mozaikowy napis Pokoyhof nad bramą", "de": "Pokoyhof-Mosaikschrift über dem Tor", "cs": "Mozaikový nápis Pokoyhof nad branou"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-04.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.12.jpeg", "sourceSHA256": "29c11d4f0edb058a7ee64e12d1c7e541c41156dc535538a124aeb6b7d4c0865f", "assetSHA256": "4ec775a0950652daec81a6d0da6842ad293165de13aef1522c43ea52f9baa8b5", "familyForeground": false, "alt": {"he": "חזית כנסיית אנטוניוס ברחוב", "en": "St Anthony church façade on the street", "pl": "Fasada kościoła św. Antoniego przy ulicy", "de": "Fassade der Antoniuskirche an der Straße", "cs": "Průčelí kostela svatého Antonína v ulici"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-05.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.13 (1).jpeg", "sourceSHA256": "39b57f856917d6bab38964465d76e1ef84fc01b20584b494a89a91bec1551d90", "assetSHA256": "abceabd94dffe9ee719aa6ede8b5260796b6eac946f4d55c0ba31565e6bd2e5b", "familyForeground": false, "alt": {"he": "דלת מעוטרת בחזית בניין ברובע", "en": "Decorated doorway in a district façade", "pl": "Ozdobne drzwi w kamienicy dzielnicy", "de": "Verzierte Tür in einer Viertelfassade", "cs": "Zdobené dveře v průčelí čtvrti"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-06.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.13.jpeg", "sourceSHA256": "82366bbbfd51f65b398f132d9cf7354baab0de46aa36c2f6814a230e0bb96390", "assetSHA256": "02201eaf3ca332318a5a9dd2d34e2f97857805c7279fc597ae3a85bbe5957b58", "familyForeground": false, "alt": {"he": "מעבר מקורה עם ציורי קיר", "en": "Covered passage with wall paintings", "pl": "Kryte przejście z malowidłami", "de": "Überdachter Durchgang mit Wandmalerei", "cs": "Krytý průchod s nástěnnými malbami"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-07.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.14 (1).jpeg", "sourceSHA256": "6938b4c7ab93b552e693101f66bb57576cc393df40034fc6f6a47e532fa5d905", "assetSHA256": "7027b427d768583d0935ee10d8bb02439d2171b109526bfd00abfaba4e3ef22d", "familyForeground": false, "alt": {"he": "חזית בית ברחוב ברובע", "en": "Building façade on a district street", "pl": "Fasada kamienicy przy ulicy dzielnicy", "de": "Hausfassade an einer Straße im Viertel", "cs": "Průčelí domu v ulici čtvrti"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-08.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.14 (2).jpeg", "sourceSHA256": "5792ad91ef5f7520ec212c103383ff66c3d437a1a13d9ed2808952e8570bcc22", "assetSHA256": "741eb15b1b6f667bdf51c35e69c9f92f8c55e9f10b8ea40acd4afc5ccb76edd2", "familyForeground": false, "alt": {"he": "כניסת בית קפה ברחוב ברובע", "en": "Café entrance on a district street", "pl": "Wejście do kawiarni w dzielnicy", "de": "Caféeingang an einer Viertelstraße", "cs": "Vstup do kavárny v ulici čtvrti"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-09.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.14.jpeg", "sourceSHA256": "409aaa9ee67a322c75b04e483d287ef14681a33720542c44c4099eb4f3e3abf4", "assetSHA256": "fa9238ff6b48a35fd8a7782767cd9fd94a8587fec15c2e18b5c4bb561c610d29", "familyForeground": false, "alt": {"he": "רצף חזיתות היסטוריות ברחוב", "en": "Historic façades along the street", "pl": "Historyczne fasady wzdłuż ulicy", "de": "Historische Fassaden entlang der Straße", "cs": "Historická průčelí podél ulice"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-10.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.15 (1).jpeg", "sourceSHA256": "72082f7f41b52d9dbd4dcb4732e2c50a0d00c810562a0d982f32c2a08c8dbb3c", "assetSHA256": "de82bed4b933d5fec1a4a0c444135fd5865aeac409b3dab9b11ac58156b17ea3", "familyForeground": false, "alt": {"he": "שולחנות בחצר מעבר ברובע", "en": "Tables in a district passage courtyard", "pl": "Stoliki na dziedzińcu pasażu w dzielnicy", "de": "Tische im Hof einer Viertelpassage", "cs": "Stolky na dvoře pasáže ve čtvrti"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-11.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.15.jpeg", "sourceSHA256": "c3c69939534bbfc1651e680a34045cf6a96ac2acf0ac570dd697c47ca7bb30bf", "assetSHA256": "d614c87fe4e76d5fb55ac6437aa3eef17acd727fd640e045e1b6410a7af9802c", "familyForeground": false, "alt": {"he": "חזית כניסה צבעונית ברחוב", "en": "Colourful entrance frontage on the street", "pl": "Kolorowe wejście przy ulicy", "de": "Bunter Eingangsbereich an der Straße", "cs": "Barevné vstupní průčelí v ulici"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-12.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.19.jpeg", "sourceSHA256": "a8fdf4b3513bb738cdff42af19607b8fa4905a3bcf5edd1eb43b41137ec6881a", "assetSHA256": "0c92a97404acfdcbc05c9cfd51c13b0c325c366b14e6fb91d26520321c20747a", "familyForeground": false, "alt": {"he": "חלון עגול ופרטי חזית ברובע", "en": "Round window and façade details in the district", "pl": "Okrągłe okno i detale fasady w dzielnicy", "de": "Rundes Fenster und Fassadendetails im Viertel", "cs": "Kulaté okno a detaily průčelí ve čtvrti"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-13.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.22.jpeg", "sourceSHA256": "062132c9178036799427649c2338c5d659c7676a958738c6f9d47ac3658aece3", "assetSHA256": "bdf00e01d5282c5797f5437a9993b74db9f1086965424546299507a600674bff", "familyForeground": false, "alt": {"he": "לוח מידע על ההיסטוריה של רחוב אנטוניוס", "en": "Interpretation plaque about St Anthony Street history", "pl": "Tablica o historii ulicy św. Antoniego", "de": "Informationstafel zur Geschichte der Antoniusstraße", "cs": "Informační deska o historii ulice svatého Antonína"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-14.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.23 (1).jpeg", "sourceSHA256": "61c325b3a0fe603a1ecbafdf6ab570cce0c218a0dabd586d972af1d1db4e01b7", "assetSHA256": "1ebb4e51c80d24ef96e30b177804dcaebeb744cfbfc74724ed35fad207bf0418", "familyForeground": false, "alt": {"he": "דגם רחוב אנטוניוס על לוח ההסבר", "en": "St Anthony Street relief model on the interpretation plaque", "pl": "Model ulicy św. Antoniego na tablicy", "de": "Reliefmodell der Antoniusstraße auf der Tafel", "cs": "Reliéfní model ulice svatého Antonína na desce"}, "verifiedAt": "2026-10-20"}, "/assets/four-denominations-refresh/four-denominations-refresh-15.jpg": {"original": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-20 at 16.27.24.jpeg", "sourceSHA256": "202162a80366399365354c8eff1c0daf8c75cb412af8fc69ec217cda67c3b08a", "assetSHA256": "666849e538fb33d95bb1a9b24cc0994350825b27a8c0b9a1a51e879228a01fab", "familyForeground": false, "alt": {"he": "חזית כנסייה ומגדל ברובע", "en": "Church façade and tower in the district", "pl": "Fasada kościoła i wieża w dzielnicy", "de": "Kirchenfassade und Turm im Viertel", "cs": "Průčelí kostela a věž ve čtvrti"}, "verifiedAt": "2026-10-20"}, "https://youtube.com/shorts/ExcXaGEwCz0": {"index": 1, "title": {"he": "פרט פנס ואריחים בחזית", "en": "Lantern and tile façade detail", "pl": "Latarnia i detale okładziny fasady", "de": "Laterne und Fliesendetail der Fassade", "cs": "Lucerna a detail obkladu průčelí"}, "filename": "four-denominations-refresh-visit-01.mp4", "id": "ExcXaGEwCz0", "url": "https://youtube.com/shorts/ExcXaGEwCz0", "state": "public-reopened-verified", "durationSeconds": 5.033333, "sourceSHA256": "cf2d3b41e8898eaa143f4b1d7772d9887035beb2770ff0a6ca8056e40cc092b5", "uploadSHA256": "7df59e3df2b27c21bf35a6cc8124d19a4469e9b44cd6bee0d233fde3645c9216", "checksComplete": true, "visibility": "Public", "savedPublicVerified": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.10.mp4", "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-01.mp4", "originalSourcePreserved": true, "audioRemoved": true, "evidence": ["visit-1-checks.txt", "visit-1-published.txt", "visit-1-public-reopened.txt", "visit-1-public-reopened.png"], "youtubeTitle": "Façade detail"}, "https://youtube.com/shorts/ZKCrh7ZNZFU": {"index": 2, "title": {"he": "שער הכניסה למעבר פוקויהוף", "en": "Pokoyhof passage entrance", "pl": "Wejście do Pasażu Pokoyhof", "de": "Eingang zur Pokoyhof-Passage", "cs": "Vstup do pasáže Pokoyhof"}, "filename": "four-denominations-refresh-visit-02.mp4", "id": "ZKCrh7ZNZFU", "url": "https://youtube.com/shorts/ZKCrh7ZNZFU", "state": "public-reopened-verified", "durationSeconds": 4.4, "sourceSHA256": "3792da87942a2a96334753319447a58b352dd7e35772c64114b32f8295163bb6", "uploadSHA256": "ae1dfe314970904564d836c6d009a0a95608206141dcdb21aa589a3f87b48fa9", "checksComplete": true, "visibility": "Public", "savedPublicVerified": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.16.mp4", "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-02.mp4", "originalSourcePreserved": true, "audioRemoved": true, "evidence": ["visit-2-checks.txt", "visit-2-published.txt", "visit-2-public-reopened.txt", "visit-2-public-reopened.png"], "youtubeTitle": "Pokoyhof entrance"}, "https://youtube.com/shorts/FgmfsnmETco": {"index": 3, "title": {"he": "פסל כוכב הלכת מבדולח", "en": "Crystal Planet sculpture", "pl": "Rzeźba Kryształowa Planeta", "de": "Skulptur Kristallplanet", "cs": "Plastika Křišťálová planeta"}, "filename": "four-denominations-refresh-visit-03.mp4", "id": "FgmfsnmETco", "url": "https://youtube.com/shorts/FgmfsnmETco", "state": "public-reopened-verified", "durationSeconds": 4.566667, "sourceSHA256": "41c149c2aea7ebc68432005c33d6f980c731999d7bca87de3280da4135d4d35e", "uploadSHA256": "0e810cb28fa30892803440d65ecd615c373f63ac07d7e99e10dbfb0bee5b5287", "checksComplete": true, "visibility": "Public", "savedPublicVerified": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.22.mp4", "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-03.mp4", "originalSourcePreserved": true, "audioRemoved": true, "evidence": ["visit-3-checks.txt", "visit-3-published.txt", "visit-3-public-reopened.txt", "visit-3-public-reopened.png"], "youtubeTitle": "Crystal Planet"}, "https://youtube.com/shorts/maNHvOKVA_s": {"index": 4, "title": {"he": "מעבר מקורה ברובע", "en": "Covered district passage", "pl": "Kryte przejście w dzielnicy", "de": "Überdachter Durchgang im Viertel", "cs": "Krytý průchod ve čtvrti"}, "filename": "four-denominations-refresh-visit-04.mp4", "id": "maNHvOKVA_s", "url": "https://youtube.com/shorts/maNHvOKVA_s", "state": "public-reopened-verified", "durationSeconds": 3.9, "sourceSHA256": "b8cbf425e6fc03e2f0bfbb93448f3c22832fc2d9d3bfe29f6a6c479f751c54a9", "uploadSHA256": "e513bae63e699a2b2801e57caae89e5fafb11a22d78420e73bd400108283c1c2", "checksComplete": true, "visibility": "Public", "savedPublicVerified": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.24.mp4", "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-04.mp4", "originalSourcePreserved": true, "audioRemoved": true, "evidence": ["visit-4-checks.txt", "visit-4-published.txt", "visit-4-public-reopened.txt", "visit-4-public-reopened.png"], "youtubeTitle": "Passage"}, "https://youtube.com/shorts/sZjy6-Xfj8I": {"index": 5, "title": {"he": "חצר ובנייני הקהילה ברובע", "en": "Courtyard and community buildings", "pl": "Dziedziniec i budynki gminy", "de": "Hof und Gemeindegebäude", "cs": "Dvůr a komunitní budovy"}, "id": "sZjy6-Xfj8I", "url": "https://youtube.com/shorts/sZjy6-Xfj8I", "state": "public-reopened-verified", "durationSeconds": 8.7, "sourceSHA256": "507f1c4d85231d1c1cde08b6ee5409e0ab36b3cad7887ef726f6df7b6389257a", "uploadSHA256": "45207fe4c7a5fe7eea57f2775dd4b9527337a71b842567fe94ef87ae198401e8", "checksComplete": true, "visibility": "Public", "savedPublicVerified": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.30.mp4", "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-05.mp4", "originalSourcePreserved": true, "audioRemoved": true, "evidence": ["visit-5-checks.txt", "visit-5-published.txt", "visit-5-public-reopened.txt", "visit-5-public-reopened.png"], "youtubeTitle": "Courtyard"}, "https://youtube.com/shorts/hp5UfkhbhUc": {"index": 6, "title": {"he": "חזית כנסיית אנטוניוס", "en": "St Anthony church façade", "pl": "Fasada kościoła św. Antoniego", "de": "Fassade der Antoniuskirche", "cs": "Průčelí kostela svatého Antonína"}, "id": "hp5UfkhbhUc", "url": "https://youtube.com/shorts/hp5UfkhbhUc", "state": "public-reopened-verified", "durationSeconds": 4.066667, "sourceSHA256": "6e50b6947967c9f3dadedabd4f884af7cabb82dffbf18bd6ec7201ae7c80e77a", "uploadSHA256": "e717dde6f3936b255a46b0f230eb779b5f360f5702a8abb6e439f59a9a54efc1", "checksComplete": true, "visibility": "Public", "savedPublicVerified": true, "sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Video 2026-10-20 at 16.28.37.mp4", "uploadPath": "/Users/rachelfiler/Documents/Codex/2026-10-16/x20/outputs/four-denominations-refresh-2026-10-20/prepared-visits/four-denominations-refresh-visit-06.mp4", "originalSourcePreserved": true, "audioRemoved": true, "evidence": ["visit-6-checks.txt", "visit-6-published.txt", "visit-6-public-reopened.txt", "visit-6-public-reopened.png"], "youtubeTitle": "Church façade"}, "/assets/today-source-refresh-20261021/run4-046-four-denominations-district.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/4 religions/WhatsApp Image 2026-10-21 at 21.12.01 (8).jpeg", "sourceSHA256": "9d3013396a062c3979baa0cec03ae8c97f52c2773ef0d4eece40d46a296e3ec5", "assetSHA256": "612b74f41fc62af30312b40360cce63af466d1644256e8ce65108021176ddfe0", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "חזית כנסייה ברובע ארבע הדתות", "en": "Church facade in the Four Denominations District", "pl": "Fasada kościoła w Dzielnicy Czterech Wyznań", "de": "Kirchenfassade im Viertel der vier Konfessionen", "cs": "Průčelí kostela ve čtvrti čtyř vyznání"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}}}, "socialPosts": []}, {"id": "wroclaw-puppet-theatre", "localName": "Wrocławski Teatr Lalek", "name": {"he": "תיאטרון הבובות של ורוצלב", "en": "Wrocław Puppet Theatre", "pl": "Wrocławski Teatr Lalek", "de": "Breslauer Puppentheater", "cs": "Vratislavské loutkové divadlo"}, "description": {"he": "במת תיאטרון פעילה; מומלץ לבדוק את הרפרטואר הרשמי מראש.", "en": "An active theatre venue; check the official programme in advance.", "pl": "Czynna scena teatralna; warto wcześniej sprawdzić oficjalny repertuar.", "de": "Aktive Theaterbühne; das offizielle Programm vorab prüfen.", "cs": "Aktivní divadelní scéna; program si ověřte předem."}, "location": {"countryCode": "PL", "regionId": "lower-silesia", "cityId": "wroclaw", "coordinates": {"lat": 51.105053, "lng": 17.033054}, "address": {"street": "plac Teatralny 4", "postalCode": "50-051", "city": "Wrocław", "country": "Poland"}}, "categories": ["family", "theatre"], "sourceUrls": [], "aliases": [], "sourceRecords": [], "coordinateCandidates": [], "status": "published", "editorialPriority": "normal", "taxonomy": {"categories": ["family", "theatre"], "tags": ["theatre-performing-arts"]}, "suitability": {"recommendedFor": [], "walkingIntensity": null, "familyFriendly": null, "couples": null, "solo": null, "romantic": null, "indoorOutdoor": null, "rainFriendly": null, "budgetLevel": null, "accessibility": {"level": null, "notes": null}}, "visit": {"durationMinutes": null, "bestTimeOfDay": [], "seasonalSuitability": [], "openingHoursNotes": null}, "links": {"website": "https://teatrlalek.wroclaw.pl/", "navigation": {"googleMaps": "https://www.google.com/maps/search/?api=1&query=51.105053%2C17.033054", "appleMaps": "https://maps.apple.com/?ll=51.105053,17.033054&q=Wroc%C5%82awski%20Teatr%20Lalek"}}, "transport": {"carRequired": null, "publicTransportNotes": null, "parkingNotes": null, "drivingTimeFromWroclawMinutes": null}, "languages": ["he", "en", "pl", "de", "cs"], "provenance": {"contentType": "official-institution-audit", "factualSources": [{"type": "official", "url": "https://teatrlalek.wroclaw.pl/", "checkedAt": "2026-08-29"}]}, "media": {"photos": ["/assets/today-source-refresh-20261021/run4-081-wroclaw-puppet-theatre.jpg", "/assets/today-source-refresh-20261021/run4-083-wroclaw-puppet-theatre.jpg", "/assets/today-source-refresh-20261021/run4-084-wroclaw-puppet-theatre.jpg", "/assets/today-source-refresh-20261021/run4-088-wroclaw-puppet-theatre.jpg"], "videos": [], "metadata": {"/assets/today-source-refresh-20261021/run4-081-wroclaw-puppet-theatre.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.05 (4).jpeg", "sourceSHA256": "21cb2279572d16c9a52853ff9ecde986e886f54d910dd2cb424a671177dac56b", "assetSHA256": "635aec1e8e77b98712d5b5f1c06808f209dcb60c77c123b02841c74bfada805d", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "חזית צדדית של תיאטרון הבובות", "en": "Side facade of the Puppet Theatre", "pl": "Boczna elewacja Teatru Lalek", "de": "Seitenfassade des Puppentheaters", "cs": "Boční průčelí loutkového divadla"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}, "/assets/today-source-refresh-20261021/run4-083-wroclaw-puppet-theatre.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.05 (3).jpeg", "sourceSHA256": "3e19841ddac8fbbf85e2a49ae3e99db604549356685445b428edd8b2607d63f2", "assetSHA256": "cac39e761a9f48ea5e6ee8ca1a665bf88e25142731074c841a6197fc9cfa76f3", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "הכניסה לתיאטרון הבובות", "en": "Entrance to the Puppet Theatre", "pl": "Wejście do Teatru Lalek", "de": "Eingang zum Puppentheater", "cs": "Vstup do loutkového divadla"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}, "/assets/today-source-refresh-20261021/run4-084-wroclaw-puppet-theatre.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.04 (7).jpeg", "sourceSHA256": "b2c7126c7f199cabc96843f471f972c81b54158baef36c2b57b9be1fda8e7a21", "assetSHA256": "6f40af69a666e4e4f26a2e8c1937992dc1ec164a8d4442e55e300e1d92a42538", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "פרט מעל חזית תיאטרון הבובות", "en": "Detail above the Puppet Theatre facade", "pl": "Detal nad fasadą Teatru Lalek", "de": "Detail über der Fassade des Puppentheaters", "cs": "Detail nad průčelím loutkového divadla"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}, "/assets/today-source-refresh-20261021/run4-088-wroclaw-puppet-theatre.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.04 (8).jpeg", "sourceSHA256": "43b9f2ddff3e096f3c9303bd9146d6d60796c4040156a78bb11808b905baeb6b", "assetSHA256": "cd91a3c3a1729cd5cf517761d1751de46135790090e560602bca99df5e8ddcc8", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "מזרקת הגמדים ליד תיאטרון הבובות", "en": "Dwarf fountain beside the Puppet Theatre", "pl": "Fontanna krasnali przy Teatrze Lalek", "de": "Zwergenbrunnen neben dem Puppentheater", "cs": "Kašna s trpaslíky u loutkového divadla"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}}}, "socialPosts": [{"platform": "facebook", "language": "cs", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid057bkMRNhNuDJwMbemvanmJBLJyKmtL9Xe87Q283vPZ1dHFuJVqrP28cPy4TAeszol&id=61594716405964", "verifiedAt": "2026-10-07"}, {"platform": "facebook", "language": "en", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02GxK3xaFPY6TehYaJwFwAUA7PUPus3GRgZfyPo9TU75cRzszfXYRpp7VwPQEiNZHFl&id=61595036942289", "verifiedAt": "2026-10-07"}, {"platform": "facebook", "language": "pl", "url": "https://facebook.com/permalink.php?story_fbid=pfbid0AVBCvsGoresiHWxyM3gcpKAGdkTGxasEhicqmjdsieC1YZZyUZTfJrtZqUgWJUZrl&id=61595207664875", "verifiedAt": "2026-10-08T14:14:12.963Z"}]}, {"id": "nfm", "localName": "Narodowe Forum Muzyki", "name": {"he": "הפורום הלאומי למוזיקה", "en": "National Forum of Music", "pl": "Narodowe Forum Muzyki", "de": "Nationales Musikforum", "cs": "Národní hudební fórum"}, "description": {"he": "אולם הקונצרטים המרכזי בעיר, עם תוכנית קלאסית ועכשווית.", "en": "The city's main concert hall, with classical and contemporary programmes.", "pl": "Główna sala koncertowa miasta z repertuarem klasycznym i współczesnym.", "de": "Wichtigster Konzertsaal der Stadt mit klassischem und zeitgenössischem Programm.", "cs": "Hlavní koncertní sál města s klasickým i současným programem."}, "location": {"countryCode": "PL", "regionId": "lower-silesia", "cityId": "wroclaw", "coordinates": {"lat": 51.10775, "lng": 17.02857}}, "categories": ["architecture", "music"], "sourceUrls": [], "aliases": [], "sourceRecords": [{"productId": "wroclaw-24-hours", "kind": "route-stop", "sourceId": "nfm"}], "coordinateCandidates": [{"productId": "wroclaw-24-hours", "sourceId": "nfm", "lat": 51.10775, "lng": 17.02857}], "status": "published", "editorialPriority": "normal", "taxonomy": {"categories": ["architecture", "music"], "tags": ["music-opera", "architecture-design"]}, "suitability": {"recommendedFor": [], "walkingIntensity": null, "familyFriendly": null, "couples": null, "solo": null, "romantic": null, "indoorOutdoor": null, "rainFriendly": null, "budgetLevel": null, "accessibility": {"level": null, "notes": null}}, "visit": {"durationMinutes": null, "bestTimeOfDay": [], "seasonalSuitability": [], "openingHoursNotes": null}, "links": {"website": "https://nfm.wroclaw.pl/", "navigation": {"googleMaps": "https://www.google.com/maps/search/?api=1&query=51.10775%2C17.02857", "appleMaps": "https://maps.apple.com/?ll=51.10775,17.02857&q=Narodowe%20Forum%20Muzyki"}}, "transport": {"carRequired": null, "publicTransportNotes": null, "parkingNotes": null, "drivingTimeFromWroclawMinutes": null}, "languages": ["he", "en", "pl", "de", "cs"], "provenance": {"contentType": "official-institution-audit", "factualSources": [{"type": "official", "url": "https://nfm.wroclaw.pl/", "checkedAt": "2026-08-29"}], "refresh20261021": {"sources": [{"url": "https://www.nfm.wroclaw.pl/kontakt", "supports": "Official NFM name and plac Wolności1 address"}, {"url": "https://www.nfm.wroclaw.pl/o-nas/budynek", "supports": "Official musical architectural inspiration and string-instrument envelope"}], "action": "Added new full-picture visit photograph; preserved identity, prior media and validlinks", "checkedAt": "2026-10-21T11:30:11.255080+00:00"}}, "media": {"thumbnail": "/assets/gallery-nfm-01.jpg", "photos": ["/assets/gallery-nfm-01.jpg", "/assets/gallery-nfm-02.jpg", "/assets/gallery-nfm-03.jpg", "/assets/today-source-refresh-20261021/nfm-01.jpg", "/assets/today-source-refresh-20261021/run4-169-nfm.jpg"], "videos": ["https://www.youtube.com/watch?v=_Dez_yfkVVQ"], "metadata": {"/assets/today-source-refresh-20261021/nfm-01.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-19 at 08.42.00.jpeg", "sourceSHA256": "5e1278a9f7519917226f18dc334b407a542723aecf01bec6f608d2547e4edaa7", "assetSHA256": "0115bcc12c63d38d56c2db36ecf281bc5684e7c3663e24b39667a29bb8433553", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "alt": {"he": "החזית האדומה־חומה של הפורום הלאומי למוזיקה", "en": "Reddish-brown façade of the National Forum of Music", "pl": "Czerwono-brązowa fasada Narodowego Forum Muzyki", "de": "Rotbraune Fassade des Nationalen Musikforums", "cs": "Červenohnědá fasáda Národního hudebního fóra"}, "verifiedAt": "2026-10-21T11:30:11.255080+00:00", "original": true, "familyForeground": false}, "https://www.youtube.com/watch?v=_Dez_yfkVVQ": {"title": {"he": "NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE", "en": "NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE", "pl": "NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE", "de": "NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE", "cs": "NFM Wroclaw | Exterior and tree-lined walkway | Visit | WROC-LOVE"}, "sourceSHA256": "3406f6f11ab8a40e8a80fb581ef90739018ee2f738142c01d024067c2a612ea3", "uploadSHA256": "ab3aa32d1a80612c887dd8436558659627668b76fb157e68c5b9f83d52ac9d40", "originalFullPicturePreserved": true, "audioStreams": 0, "familyExceptionApplied": false, "visibility": "Public", "reopenedPublicVerified": true, "checks": "Copyright and Community Guidelines complete: no issues found", "verifiedAt": "2026-10-21T11:56:03.747Z"}, "/assets/today-source-refresh-20261021/run4-169-nfm.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-21 at 21.12.04 (6).jpeg", "sourceSHA256": "a6c03a08e60a59ccfa3ffed1ca7413f45e4f153e958e0b069657b17e32112715", "assetSHA256": "d2c93cff94f0bfedddd725b2fcc28f066b95946187febbc50b73e71e8bf38a5a", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "כיכר ליד הפורום הלאומי למוזיקה", "en": "Square beside the National Forum of Music", "pl": "Plac przy Narodowym Forum Muzyki", "de": "Platz am Nationalen Musikforum", "cs": "Náměstí u Národního hudebního fóra"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}}}, "socialPosts": [{"platform": "facebook", "language": "pl", "url": "https://facebook.com/permalink.php?story_fbid=pfbid02nnJty31FqZX2J3jmXKXYEsC3L6wdC14kk3SBMfyw1AkExKHzub9Ur78N2BdAJ6dol&id=61595207664875", "verifiedAt": "2026-10-06T23:17:27.632328+00:00"}, {"platform": "facebook", "language": "de", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02as1UNutmRETqDwaaLhFnASu3sSGkm6YXuwHEcm2frbFS1Dn6H6zfz1pTLQh7cjHKl&id=61595239823399", "verifiedAt": "2026-10-06T23:23:36.915916+00:00"}, {"platform": "facebook", "language": "en", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02CNbxAFLcyLKi4DekY7QhVSVkoxvBoG5fMMCMb7vKZiFLSfMUP9sdpWStaz3oaJiPl&id=61595036942289", "verifiedAt": "2026-10-07"}, {"platform": "facebook", "language": "cs", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0TBekCtd6oLi3gnT41ecz1taVw4Y97K4ZXr8x1VDFZdUsdbjbUzJhQDDfWeZpxxPYl&id=61594716405964", "verifiedAt": "2026-10-07"}, {"platform": "instagram", "language": "en", "url": "https://www.instagram.com/p/DeMjER3lKpn/", "verifiedAt": "2026-10-07"}, {"platform": "instagram", "language": "de", "url": "https://www.instagram.com/p/DeMpEByFEH1/", "verifiedAt": "2026-10-07T15:07:43.253189+00:00"}, {"platform": "instagram", "language": "cs", "url": "https://www.instagram.com/p/DeM5aYvjcZA/", "verifiedAt": "2026-10-07"}, {"platform": "facebook", "language": "he", "url": "https://www.facebook.com/61591964083308/posts/122117365257398802/", "verifiedAt": "2026-10-09T00:42:44.577Z"}, {"platform": "instagram", "language": "pl", "url": "https://www.instagram.com/p/DeT6y0OlcwE/", "verifiedAt": "2026-10-10T10:57:32.950Z"}, {"platform": "facebook", "url": "https://www.facebook.com/share/p/1C4YQxxtU1/"}, {"platform": "instagram", "url": "https://www.instagram.com/p/DcrATSoDN-C/?img_index=1", "routingExcluded": true}]}, {"id": "royal-palace-wroclaw", "localName": "Pałac Królewski", "name": {"he": "הארמון המלכותי", "en": "Royal Palace", "pl": "Pałac Królewski", "de": "Königspalais", "cs": "Královský palác"}, "description": {"he": "ארמון מלכותי ובו תולדות ורוצלב ואמנות המדליות.", "en": "A royal palace presenting Wrocław's history and medallic art.", "pl": "Pałac królewski z historią Wrocławia i sztuką medalierską.", "de": "Königspalais mit Breslauer Geschichte und Medaillenkunst.", "cs": "Královský palác s dějinami Vratislavi a medailérským uměním."}, "location": {"countryCode": "PL", "regionId": "lower-silesia", "cityId": "wroclaw", "coordinates": {"lat": 51.1076223, "lng": 17.0292728}, "address": {"street": "Kazimierza Wielkiego 35", "postalCode": "50-077", "city": "Wrocław", "country": "Poland"}}, "categories": ["art", "history", "museum"], "sourceUrls": [], "aliases": [], "sourceRecords": [], "coordinateCandidates": [], "status": "published", "editorialPriority": "normal", "taxonomy": {"categories": ["art", "history", "museum"], "tags": ["museums-history", "art-contemporary", "architecture-design"]}, "suitability": {"recommendedFor": [], "walkingIntensity": null, "familyFriendly": null, "couples": null, "solo": null, "romantic": null, "indoorOutdoor": null, "rainFriendly": null, "budgetLevel": null, "accessibility": {"level": null, "notes": null}}, "visit": {"durationMinutes": null, "bestTimeOfDay": [], "seasonalSuitability": [], "openingHoursNotes": null}, "links": {"website": "https://muzeum.miejskie.wroclaw.pl/", "navigation": {"googleMaps": "https://www.google.com/maps/search/?api=1&query=51.1076223%2C17.0292728", "appleMaps": "https://maps.apple.com/?ll=51.1076223,17.0292728&q=Pa%C5%82ac%20Kr%C3%B3lewski"}}, "transport": {"carRequired": null, "publicTransportNotes": null, "parkingNotes": null, "drivingTimeFromWroclawMinutes": null}, "languages": ["he", "en", "pl", "de", "cs"], "experiences": [{"id": "historical-museum", "tags": ["history"]}, {"id": "museum-of-medallic-art", "tags": ["art", "history"]}], "provenance": {"contentType": "official-institution-audit", "factualSources": [{"type": "official", "url": "https://muzeum.miejskie.wroclaw.pl/", "checkedAt": "2026-08-29"}], "refresh20261021": {"sources": [{"url": "https://muzeum.miejskie.wroclaw.pl/museum/historyczne/", "supports": "Official Historical Museum housed in Royal Palace, 1000yearsWroclaw exhibition"}, {"url": "https://muzeum.miejskie.wroclaw.pl/exhibition/skrocone-godziny-otwarcia/", "supports": "Official institution-address pairing only; historical temporaryhours NOT reused"}], "action": "Added new full-picture visit photograph; preserved identity, prior media and validlinks", "checkedAt": "2026-10-21T11:30:11.255080+00:00"}}, "media": {"thumbnail": "/assets/today-source-refresh-20261021/royal-palace-wroclaw-01.jpg", "photos": ["/assets/today-source-refresh-20261021/royal-palace-wroclaw-01.jpg", "/assets/today-source-refresh-20261021/run4-120-royal-palace-wroclaw.jpg", "/assets/today-source-refresh-20261021/run4-121-royal-palace-wroclaw.jpg"], "videos": [], "metadata": {"/assets/today-source-refresh-20261021/royal-palace-wroclaw-01.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/מוזיאון וורוצלב/WhatsApp Image 2026-10-21 at 14.06.06.jpeg", "sourceSHA256": "fb9286589577e9ed19bca8bdf94254bd9ed69f4ec683a77a16520397624323bc", "assetSHA256": "dce7fbaa3009829bec76f0fc5e438ddc8ed87416fa3fdfa3525147a6d09b18f8", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "alt": {"he": "חזית הארמון המלכותי והגג האדום", "en": "Royal Palace façade and red roof", "pl": "Fasada Pałacu Królewskiego i czerwony dach", "de": "Fassade des Königspalais und rotes Dach", "cs": "Průčelí Královského paláce a červená střecha"}, "verifiedAt": "2026-10-21T11:30:11.255080+00:00", "original": true, "familyForeground": false}, "/assets/today-source-refresh-20261021/run4-120-royal-palace-wroclaw.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/מוזיאון וורוצלב/WhatsApp Image 2026-10-21 at 21.12.01 (9).jpeg", "sourceSHA256": "d50e8e46b8b85751dc39a388a06663501c641a0b74edc5c4990cafd70accf426", "assetSHA256": "8128e45b3fff5fb31341bcd5aad0254e890226d7b1b50b02460e4755204d5e39", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "חזית הארמון המלכותי והשער", "en": "Royal Palace facade and gate", "pl": "Fasada Pałacu Królewskiego i brama", "de": "Fassade und Tor des Königspalastes", "cs": "Průčelí Královského paláce a brána"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}, "/assets/today-source-refresh-20261021/run4-121-royal-palace-wroclaw.jpg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/מוזיאון וורוצלב/WhatsApp Image 2026-10-21 at 21.34.48 (2).jpeg", "sourceSHA256": "4708d73c384136f3a75ccc67e3c33d55dbb404ee8eca3ef8317fb9d879ad9dc3", "assetSHA256": "ed684ccfb15f9e5a772342dfdfefa322015dde85c7bf151625e82eb051a6c929", "originalFullPicturePreserved": true, "familyExceptionApplied": false, "privacyClassification": "Place/detail photograph; incidental public visitors are not posed personal portraits", "alt": {"he": "הארמון המלכותי מכיוון הגן", "en": "Royal Palace seen from the garden", "pl": "Pałac Królewski od strony ogrodu", "de": "Königspalast vom Garten aus", "cs": "Královský palác ze zahrady"}, "sourceRefreshRun": "2026-10-21-run4", "verifiedAt": "2026-10-21T19:16:56.109643+00:00"}}}, "socialPosts": [{"platform": "facebook", "language": "cs", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02SuVFWufPonYcKLpZMJQmifBYL7WNvS9rVAipEfobJNwUpa43aY3qN2QpJFeQrhVtl&id=61594716405964", "verifiedAt": "2026-10-07"}, {"platform": "facebook", "language": "en", "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0kp5Q2GTACFan4oKVzt5p8AD5TA9wHRid96kJqcGm9vnE5JsZynDsNtsNVV14CsP1l&id=61595036942289", "verifiedAt": "2026-10-07"}, {"platform": "facebook", "language": "pl", "url": "https://facebook.com/permalink.php?story_fbid=pfbid0AsM55F8AA3fJL7ArkA35Dh4bT3QNfJHGfbD7nb2JDAuG6aBTACAuAuZHe2cYcSbZl&id=61595207664875", "verifiedAt": "2026-10-08T15:11:35.951Z"}]}];for(const p of records){const i=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.findIndex(x=>x.id===p.id);if(i<0)window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.push(p);else window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE[i]=p;}})();

(()=>{for(const p of window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE)for(const[src,m]of Object.entries(p.media?.metadata||{}))if(m.sourceRefreshRun==="2026-10-21-run4"&&src.endsWith('.jpg'))m.familyForeground=false;})();

// Run4: cultural-only records receive the same verified media as route/lifestyle source records.
(function(){const guides={"cathedral": {"id": "cathedral", "guideVideos": {"he": "https://www.youtube.com/watch?v=rIIVnc_dzN4", "en": "https://www.youtube.com/watch?v=ULG-y1kQgWM"}, "provenance": {"receipt": "outputs/cathedral-video-guides-2026-10-21/youtube-publication-receipt.json", "publicReopened": true, "checksNoIssues": true, "originalFullPictureAndAudioPreserved": true, "nativeCaptions": [{"language": "he", "path": "outputs/cathedral-video-guides-2026-10-21/caption-package/cathedral-he.srt", "cues": 23, "sha256": "7fe72b16e0a5041fc335113ed05997040b1b66d9848aa6bafabaa1a767f303fd", "videoId": "rIIVnc_dzN4", "published": true, "reopened": true, "evidence": "he-captions-reopened.txt"}, {"language": "en", "path": "outputs/cathedral-video-guides-2026-10-21/caption-package/cathedral-en.srt", "cues": 22, "sha256": "e6e3511b09fc05103e5c3c24a217c0733a90c85cbd7a17894ffda744b67fb775", "videoId": "ULG-y1kQgWM", "published": true, "reopened": true, "evidence": "en-captions-reopened.txt"}, {"language": "de", "path": "outputs/cathedral-video-guides-2026-10-21/caption-package/cathedral-de.srt", "cues": 22, "sha256": "82f7cee9e44beaea42650d8ce96649a7ebae085a445d1f8b82792310d3076c24", "videoId": "ULG-y1kQgWM", "published": true, "reopened": true, "evidence": "de-captions-reopened.txt"}, {"language": "pl", "path": "outputs/cathedral-video-guides-2026-10-21/caption-package/cathedral-pl.srt", "cues": 22, "sha256": "66779eeff16439e962d0f5c9a0c09b2cd49ae13f3df0fd55261a1d1b7bab8ec9", "videoId": "ULG-y1kQgWM", "published": true, "reopened": true, "evidence": "pl-captions-reopened.txt"}, {"language": "cs", "path": "outputs/cathedral-video-guides-2026-10-21/caption-package/cathedral-cs.srt", "cues": 22, "sha256": "0452f4899d52fcb67c058ecb97582607f3bd357946e193b4c2e41c062e11292c", "videoId": "ULG-y1kQgWM", "published": true, "reopened": true, "evidence": "cs-captions-reopened.txt"}], "approvalCall": "call_94b51d2e9e6b4090a0f3e5266c18bd43"}}, "ostrow": {"id": "ostrow", "guideVideos": {"he": "https://www.youtube.com/watch?v=oBjOT3Ubaro", "en": "https://www.youtube.com/watch?v=C9Wyg2MB1nk"}, "provenance": {"receipt": "outputs/ostrow-video-guides-2026-10-21/youtube-publication-receipt.json", "publicVisibilityConfirmedByWorker": true, "checksNoIssues": true, "originalFullPictureAndAudioPreserved": true, "nativeCaptions": [{"language": "he", "videoId": "oBjOT3Ubaro", "path": "outputs/ostrow-video-guides-2026-10-21/caption-package/ostrow-he.srt", "sha256": "e89731856cd591eb86ffcaae828c07da1577cab0a3ae34f91ddb39df3b4bd3c6", "cues": 25, "published": true, "reopened": true, "evidence": "he-captions-reopened.txt"}, {"language": "en", "videoId": "C9Wyg2MB1nk", "path": "outputs/ostrow-video-guides-2026-10-21/caption-package/ostrow-en.srt", "sha256": "ebd716431d846b7aec188d61fcef4369028ade53cb00cd678fdf3dddbaf8562f", "cues": 23, "published": true, "reopened": true, "evidence": "en-captions-reopened.txt"}, {"language": "pl", "videoId": "C9Wyg2MB1nk", "path": "outputs/ostrow-video-guides-2026-10-21/caption-package/ostrow-pl.srt", "sha256": "23146590f32c3c64b31c01c47c3f86a4bc98b4f2d86b975945463be53a6f017b", "cues": 24, "published": true, "reopened": true, "evidence": "pl-captions-reopened.txt"}, {"language": "de", "videoId": "C9Wyg2MB1nk", "path": "outputs/ostrow-video-guides-2026-10-21/caption-package/ostrow-de.srt", "sha256": "50e7df758d0b622e8366941fe5b7753fd8f172c385261be71582e5324e94b95d", "cues": 23, "published": true, "reopened": true, "evidence": "de-captions-reopened.txt"}, {"language": "cs", "videoId": "C9Wyg2MB1nk", "path": "outputs/ostrow-video-guides-2026-10-21/caption-package/ostrow-cs.srt", "sha256": "d10696a288c848d7caeae47828124820dd77c2882ca8011fdec07c94f77c247d", "cues": 23, "published": true, "reopened": true, "evidence": "cs-captions-reopened.txt"}], "approvalCall": "call_94b51d2e9e6b4090a0f3e5266c18bd43", "publicReopened": true, "publicEvidence": ["he-public-details.txt", "en-public-details.txt"]}}, "nfm": {"id": "nfm", "guideVideos": {"he": "https://www.youtube.com/watch?v=VyqYqyW2h8E", "en": "https://www.youtube.com/watch?v=aABow6nYRjs"}, "provenance": {"receipt": "outputs/nfm-video-guides-2026-10-21/youtube-publication-receipt.json", "publicReopened": true, "publicEvidence": ["he-public-details.txt", "en-public-details.txt"], "checksNoIssues": true, "checksEvidence": ["he-checks-clean.txt", "en-checks-clean.txt"], "originalFullPictureAndAudioPreserved": true, "nativeCaptions": [{"language": "he", "videoId": "VyqYqyW2h8E", "path": "outputs/nfm-video-guides-2026-10-21/caption-package/nfm-he.srt", "sha256": "4d0194b1eae6241c1a5804fc17af49e78bdef425da46bbb960054cf810ce4383", "cues": 20, "published": true, "reopened": true, "evidence": "he-captions-reopened.txt"}, {"language": "en", "videoId": "aABow6nYRjs", "path": "outputs/nfm-video-guides-2026-10-21/caption-package/nfm-en.srt", "sha256": "e09444ad8d9167676c19ec8aa5dd8cce756c78eb8c9d8453099b0842bdcb08cf", "cues": 23, "published": true, "reopened": true, "evidence": "en-captions-reopened.txt"}, {"language": "pl", "videoId": "aABow6nYRjs", "path": "outputs/nfm-video-guides-2026-10-21/caption-package/nfm-pl.srt", "sha256": "e9c809cc88a103886e549732fdca414382bd410690932a3cb1def1b806d657eb", "cues": 23, "published": true, "reopened": true, "evidence": "pl-captions-reopened.txt"}, {"language": "de", "videoId": "aABow6nYRjs", "path": "outputs/nfm-video-guides-2026-10-21/caption-package/nfm-de.srt", "sha256": "97354822ff457e4f794843f0a293f2488b289db9ba3bbd01f776911e4e08c6bb", "cues": 24, "published": true, "reopened": true, "evidence": "de-captions-reopened.txt"}, {"language": "cs", "videoId": "aABow6nYRjs", "path": "outputs/nfm-video-guides-2026-10-21/caption-package/nfm-cs.srt", "sha256": "2146760482eb4057a15ada7ae9a54d85869eb9c0365710d5aa630f33afccdd6c", "cues": 21, "published": true, "reopened": true, "evidence": "cs-captions-reopened.txt"}], "approvalCall": "call_94b51d2e9e6b4090a0f3e5266c18bd43"}}, "most-tumski": {"id": "most-tumski", "guideVideos": {"he": "https://www.youtube.com/watch?v=8ZjWUCCHy8g", "en": "https://www.youtube.com/watch?v=B94yaegj-eU"}, "provenance": {"receipt": "outputs/most-tumski-video-guides-2026-10-21/youtube-publication-receipt.json", "publicReopened": true, "publicEvidence": ["he-public-details.txt", "en-public-details.txt"], "checksNoIssues": true, "checksEvidence": ["he-checks-clean.txt", "en-checks-clean.txt"], "originalFullPictureAndAudioPreserved": true, "nativeCaptions": [{"language": "he", "videoId": "8ZjWUCCHy8g", "path": "outputs/most-tumski-video-guides-2026-10-21/captions/most-tumski-he.srt", "sha256": "8caacfe62e8d5ae91b35141b2d648a112b3d90d5cbbf7657ae4fccd11df0fdd0", "cues": 27, "published": true, "reopened": true, "evidence": "he-captions-reopened.txt"}, {"language": "en", "videoId": "B94yaegj-eU", "path": "outputs/most-tumski-video-guides-2026-10-21/captions/most-tumski-en.srt", "sha256": "0b0d28f90051efb234c59bdc63a4d743275c33a82e11574bf39683dc907f0c95", "cues": 26, "published": true, "reopened": true, "evidence": "en-captions-reopened.txt"}, {"language": "pl", "videoId": "B94yaegj-eU", "path": "outputs/most-tumski-video-guides-2026-10-21/captions/most-tumski-pl.srt", "sha256": "f0a023272e4d58fa6d2b6592b45769d7ff1791c921a3e6db4736f3536476f3ba", "cues": 26, "published": true, "reopened": true, "evidence": "pl-captions-reopened.txt"}, {"language": "de", "videoId": "B94yaegj-eU", "path": "outputs/most-tumski-video-guides-2026-10-21/captions/most-tumski-de.srt", "sha256": "bf573da9c5d0297883b01e2b3c83f9067062fde2ab6f3d2b5115e0386114367a", "cues": 27, "published": true, "reopened": true, "evidence": "de-captions-reopened.txt"}, {"language": "cs", "videoId": "B94yaegj-eU", "path": "outputs/most-tumski-video-guides-2026-10-21/captions/most-tumski-cs.srt", "sha256": "9a576030828147d7a5e7f6cbe92f431d2c6f641b189f3b8689410edbf2b4099a", "cues": 26, "published": true, "reopened": true, "evidence": "cs-captions-reopened.txt"}], "approvalCall": "call_b62ae12263a84eb891e28ab25704a6e0"}}, "wroclaw-puppet-theatre": {"id": "wroclaw-puppet-theatre", "guideVideos": {"he": "https://www.youtube.com/watch?v=kYCAhQSVYEA", "en": "https://www.youtube.com/watch?v=mPJDEfSH7kY"}, "provenance": {"receipt": "outputs/wroclaw-puppet-theatre-video-guides-2026-10-21/youtube-publication-receipt.json", "publicReopened": true, "publicEvidence": ["he-public-details.txt", "en-public-details.txt"], "checksNoIssues": true, "checksEvidence": ["he-checks-clean.txt", "en-checks-clean.txt"], "originalFullPictureAndAudioPreserved": true, "nativeCaptions": [{"language": "he", "videoId": "kYCAhQSVYEA", "path": "outputs/wroclaw-puppet-theatre-video-guides-2026-10-21/captions/wroclaw-puppet-theatre-he.srt", "sha256": "0627cd74e338110adddcf8e2a9b2222eda5a2ef4e9a2971bf79f31690c0bac5b", "cues": 16, "published": true, "reopened": true, "evidence": "he-captions-reopened.txt"}, {"language": "en", "videoId": "mPJDEfSH7kY", "path": "outputs/wroclaw-puppet-theatre-video-guides-2026-10-21/captions/wroclaw-puppet-theatre-en.srt", "sha256": "1fb9ba2b4e891e55028cabb88f46d52bf31b33a5361af6c2bba5290baeb78cc3", "cues": 12, "published": true, "reopened": true, "evidence": "en-captions-reopened.txt"}, {"language": "pl", "videoId": "mPJDEfSH7kY", "path": "outputs/wroclaw-puppet-theatre-video-guides-2026-10-21/captions/wroclaw-puppet-theatre-pl.srt", "sha256": "be74ddf8f84846eb5b80e451a610e4091df8ca52d2c9db1f76932c9f50425e19", "cues": 12, "published": true, "reopened": true, "evidence": "pl-captions-reopened.txt"}, {"language": "de", "videoId": "mPJDEfSH7kY", "path": "outputs/wroclaw-puppet-theatre-video-guides-2026-10-21/captions/wroclaw-puppet-theatre-de.srt", "sha256": "b9b30b420d8a45b23ae2bebf1f027872354217e02676c794a5ab210238d5e898", "cues": 12, "published": true, "reopened": true, "evidence": "de-captions-reopened.txt"}, {"language": "cs", "videoId": "mPJDEfSH7kY", "path": "outputs/wroclaw-puppet-theatre-video-guides-2026-10-21/captions/wroclaw-puppet-theatre-cs.srt", "sha256": "3d21f6dc575f2deb8625863bce24e32061aff805b77aaf593f20d180789b6c79", "cues": 12, "published": true, "reopened": true, "evidence": "cs-captions-reopened.txt"}], "approvalCall": "call_b62ae12263a84eb891e28ab25704a6e0"}}};const visits={"cathedral": {"videos": ["https://www.youtube.com/watch?v=6hP8rHe3MLE", "https://www.youtube.com/watch?v=eegtceD9xiE"], "metadata": {"https://www.youtube.com/watch?v=6hP8rHe3MLE": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/כנסיית יוחנן המטביל באי הקצרדלות/WhatsApp Video 2026-10-21 at 20.49.02 (14).mp4", "sourceSHA256": "cc07a60a1722252713212921423eb355e6f5f9ced14438c63f0fc034a45213a0", "uploadSHA256": "de0b5d2d9f42850300bd01075c1657af8d74605dacd572d4e470bb0b2e732867", "durationSeconds": 7.633333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "חזית קתדרלת יוחנן המטביל", "en": "St John the Baptist Cathedral frontage", "pl": "Fasada katedry św. Jana Chrzciciela", "de": "Fassade der Kathedrale Johannes des Täufers", "cs": "Průčelí katedrály svatého Jana Křtitele"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-101-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:33.371Z"}, "https://www.youtube.com/watch?v=eegtceD9xiE": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/כנסיית יוחנן המטביל באי הקצרדלות/WhatsApp Video 2026-10-21 at 21.34.50.mp4", "sourceSHA256": "65c3a12256a6ce98cd677ca3cb181489e32f7ea9b1465c8967e0175b4be9e2d2", "uploadSHA256": "8b14f23ea6c1aa37bc78a7aa907be04f23391bf04a481d96d8563d79121288ee", "durationSeconds": 8.633333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "שער הקתדרלה וסביבתו", "en": "Cathedral portal and surroundings", "pl": "Portal katedry i otoczenie", "de": "Domportal und Umgebung", "cs": "Portál katedrály a okolí"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-109-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:35.774Z"}}}, "ostrow": {"videos": ["https://www.youtube.com/watch?v=M9P8fPs5-8o", "https://www.youtube.com/watch?v=Lx6Lxbx0csk"], "metadata": {"https://www.youtube.com/watch?v=M9P8fPs5-8o": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Kathedral Island/WhatsApp Video 2026-10-21 at 21.34.51 (2).mp4", "sourceSHA256": "a98cd1d09cbff71d133461b3240f92c889297f02aadd6b40c235cfeb9d77e4f3", "uploadSHA256": "30c0249085c3e7bfc351e77028e7897acadc59f6dca836092730230fca50a673", "durationSeconds": 8.866667, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "פנס גז ושביל באי הקתדרלות", "en": "Gas lamp and lane on Cathedral Island", "pl": "Latarnia gazowa i uliczka na Ostrowie Tumskim", "de": "Gaslaterne und Gasse auf der Dominsel", "cs": "Plynová lampa a ulička na Katedrálním ostrově"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-15-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:38.035Z"}, "https://www.youtube.com/watch?v=Lx6Lxbx0csk": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Kathedral Island/WhatsApp Video 2026-10-21 at 21.34.51.mp4", "sourceSHA256": "2c911d79370f81a0d67c7fd10f84780f7edb968d6bcbade94fe141fd3001ad80", "uploadSHA256": "5f190ee3411ac2819bfd72a07eeb1988567cecfabb543058632c72a89db77579", "durationSeconds": 5.266667, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "הכיכר והאנדרטה באי הקתדרלות", "en": "Square and monument on Cathedral Island", "pl": "Plac i pomnik na Ostrowie Tumskim", "de": "Platz und Denkmal auf der Dominsel", "cs": "Náměstí a pomník na Katedrálním ostrově"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-37-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:40.304Z"}}}, "most-tumski": {"videos": ["https://www.youtube.com/watch?v=3Sxf4k4DkiM", "https://www.youtube.com/watch?v=9nOC5KsNCqQ"], "metadata": {"https://www.youtube.com/watch?v=3Sxf4k4DkiM": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/גשר מוסט/WhatsApp Video 2026-10-21 at 21.34.54 (1).mp4", "sourceSHA256": "5808d118b66ffff7b05efcdc2321bb4495c3c5b8a1b718a864968f9c7092e0ff", "uploadSHA256": "237d943f543fbbabbe1ba8a7a398a9a5894967f01e451fcd5ad23f44a07b8c91", "durationSeconds": 10.633333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "מעקה המנעולים בגשר טומסקי", "en": "Lock-covered railing at Tumski Bridge", "pl": "Balustrada z kłódkami przy Moście Tumskim", "de": "Geländer mit Schlössern an der Dombrücke", "cs": "Zábradlí se zámky u Tumského mostu"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-91-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:51.337Z"}, "https://www.youtube.com/watch?v=9nOC5KsNCqQ": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/גשר מוסט/WhatsApp Video 2026-10-21 at 21.34.52 (2).mp4", "sourceSHA256": "bd6b3ecde88ada94ca54d2c2b69ab2530817c847d5f982689ae1ee4ed457bbb5", "uploadSHA256": "ed87c866abfbadf085b776a7539d2ea21b0175fb2465afdb1cf1cec57729f1f4", "durationSeconds": 4.5, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "פסל גמד ליד גשר טומסקי", "en": "Dwarf sculpture by Tumski Bridge", "pl": "Krasnal przy Moście Tumskim", "de": "Zwergenfigur an der Dombrücke", "cs": "Trpaslík u Tumského mostu"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-95-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:53.673Z"}}}, "fc-caffe-kuznicza": {"videos": ["https://www.youtube.com/watch?v=8jaImuM4Qrs"], "metadata": {"https://www.youtube.com/watch?v=8jaImuM4Qrs": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/FC CAFFE/WhatsApp Video 2026-10-21 at 21.34.54 (2).mp4", "sourceSHA256": "46bdf6373a35ec7a1f448ac8252e3d5ee6b5691a39e039b03572a7771dcd55b5", "uploadSHA256": "b09adf7b7957f7c6d02f5414c5ea7a5f50dedd8d0687872560d9ca50403cf365", "durationSeconds": 7.366667, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "חזית בית הקפה והשולחנות בחוץ", "en": "Café frontage and outdoor tables", "pl": "Fasada kawiarni i stoliki na zewnątrz", "de": "Caféfassade und Tische im Freien", "cs": "Průčelí kavárny a venkovní stolky"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-42-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:55.985Z"}}}, "wroclaw-puppet-theatre": {"videos": ["https://www.youtube.com/watch?v=SIftmDgclcE"], "metadata": {"https://www.youtube.com/watch?v=SIftmDgclcE": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Video 2026-10-21 at 21.12.24.mp4", "sourceSHA256": "4c662b046b2a57632ef4fb3d477514af4f8e20df4c4f4ff173a58819d1fafa3f", "uploadSHA256": "8481c7567ac1c9ee1d463339a168734650abca45fe4c695960ddee6d69c87b69", "durationSeconds": 4.4, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "רחבת תיאטרון הבובות והמזרקה", "en": "Puppet Theatre forecourt and fountain", "pl": "Plac przed Teatrem Lalek i fontanna", "de": "Vorplatz des Puppentheaters und Brunnen", "cs": "Prostranství před loutkovým divadlem a kašna"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-85-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:46:58.460Z"}}}, "boleslawiec-old-town": {"videos": ["https://www.youtube.com/watch?v=l2XcfLeTE2A"], "metadata": {"https://www.youtube.com/watch?v=l2XcfLeTE2A": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Bolesławiec/WhatsApp Video 2026-10-21 at 21.34.58.mp4", "sourceSHA256": "3e10cc0522b86a01aeb80cee0430fe8c372dc4468e0f46535c7fd3034ea39e02", "uploadSHA256": "50c0e78daa2408d8c8c037a5005d299c1aa6ece95a18b056f1148d957c6eefc4", "durationSeconds": 67.933333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "תצוגת קרמיקה מבולסלבייץ", "en": "Bolesławiec pottery display", "pl": "Ekspozycja ceramiki bolesławieckiej", "de": "Ausstellung von Bunzlauer Keramik", "cs": "Vystavená boleslavská keramika"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-89-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:47:00.917Z"}}}, "opera": {"videos": ["https://www.youtube.com/watch?v=zmtTl9CcIyg"], "metadata": {"https://www.youtube.com/watch?v=zmtTl9CcIyg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-21 at 21.12.23 (1).mp4", "sourceSHA256": "217a36ff1afcfdfd3c181059975aa36cfefb36e863d357190cb8f902aba93a07", "uploadSHA256": "7e49d4e62d023e4afc04d17bc8c78dcd937b56dc95b23e4b88460d86d3e09a37", "durationSeconds": 5.233333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "חזית האופרה של ורוצלב", "en": "Wrocław Opera frontage", "pl": "Fasada Opery Wrocławskiej", "de": "Fassade der Breslauer Oper", "cs": "Průčelí Vratislavské opery"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-160-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:47:09.818Z"}}}, "lwia-brama-restaurant-wroclaw": {"videos": ["https://www.youtube.com/watch?v=0t_8oeQrNwg"], "metadata": {"https://www.youtube.com/watch?v=0t_8oeQrNwg": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Kathedral Island/WhatsApp Video 2026-10-21 at 20.49.02 (6).mp4", "sourceSHA256": "8c00eebcd8a21b4f880e295251b0b801a8405a18d0d16c44dc9d91dca6da557d", "uploadSHA256": "312c327a24119f087782055f6605f0c20e9ce8899d1b16757f3bb33a2a9fd982", "durationSeconds": 7.233333, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "חצר המסעדה והבתים סביבה", "en": "Restaurant courtyard and surrounding houses", "pl": "Dziedziniec restauracji i otaczające domy", "de": "Restauranthof und umliegende Häuser", "cs": "Dvůr restaurace a okolní domy"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_65a7df2f3175410ba11f553c66b0419b", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-16-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:47:14.487Z"}}}, "vega-bar-weganski-wroclaw": {"videos": ["https://www.youtube.com/watch?v=V1hFXIlvORA"], "metadata": {"https://www.youtube.com/watch?v=V1hFXIlvORA": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/מילק באר/WhatsApp Video 2026-10-05 at 18.26.02.mp4", "sourceSHA256": "73d3d82f43d474effa8716ee9facc278d40a928bfb671d8bea0aa03bf6feb955", "uploadSHA256": "8e04420d2120ba57e1240723f16f5c40527b6140a1fd1f8a8b3388cb3cc1e6c8", "durationSeconds": 4.1, "originalFullPicturePreserved": true, "familyForeground": false, "familyExceptionApplied": false, "status": "public", "visibility": "Public", "reopenedPublicVerified": true, "sdProcessingComplete": true, "copyright": "No issues found", "communityGuidelines": "No issues found", "title": {"he": "פירוגי וחלל הבר הטבעוני וגה", "en": "Pierogi and Vega vegan bar interior", "pl": "Pierogi i wnętrze baru wegańskiego Vega", "de": "Pierogi und Innenraum der veganen Bar Vega", "cs": "Pirohy a interiér veganského baru Vega"}, "original": true, "tags": ["visit"], "sourceRefreshRun": "2026-10-21-run4", "approvalCall": "call_835e4e0904764db392752daa5eb966ac", "publicEvidence": "outputs/source-refresh-enrichment-2026-10-21-run4/visit-vega-public-reopened.txt", "silent": true, "audioRemoved": true, "verifiedAt": "2026-10-21T20:47:16.948Z"}}}};window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.map(r=>{const g=guides[r.id],v=visits[r.id];if(!g&&!v)return r;return {...r,media:{...r.media,...(g?{guideVideos:g.guideVideos}:{}),...(v?{videos:[...new Set([...(r.media.videos||[]),...v.videos])],metadata:{...r.media.metadata,...v.metadata}}:{})},provenance:{...r.provenance,...(g?{run4GuidePublication:g.provenance}:{})}};});})();

// Compatible explicit verification fields for the thirteen new, fully preserved silent visits.
(function(){for(const p of window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE)for(const m of Object.values(p.media?.metadata||{}))if(m.sourceRefreshRun==="2026-10-21-run4"&&m.status==="public"&&m.reopenedPublicVerified)Object.assign(m,{savedPublicVerified:true,reopenedVerified:true,originalFullPictureAndDurationPreserved:true});})();

//22October Theatre Museum enrichment; preserve the single physical identity and media.
(function(){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(p=>p.id==="henryk-tomaszewski-theatre-museum");if(p){p.description={"he":"מוזיאון לתולדות התיאטרון בוורוצלב, באגף הדרומי לשעבר של הארמון המלכותי. התצוגה עוסקת בבמת העיר ובמורשת הנריק תומשבסקי, מייסד תיאטרון הפנטומימה של ורוצלב. במוזיאון שוחזרה דירתו, ובה פריטים מאוסף הבובות שלו. צילום הביקור שלנו מציג את החזית והכניסה מכיכר וולנושצ׳י. זהו מוזיאון נפרד מתיאטרון הבובות.\nplac Wolności 7A, Wrocław","en":"A museum of Wrocław theatre history in the former southern wing of the Royal Palace. Explore the city’s stage heritage and Henryk Tomaszewski, founder of Wrocław Pantomime Theatre. His apartment is reconstructed with items from his doll collection. Our visit photograph shows the façade and entrance from plac Wolności. This is a separate museum from the Puppet Theatre.\nplac Wolności 7A, Wrocław","pl":"Muzeum historii wrocławskiego teatru w dawnym południowym skrzydle Pałacu Królewskiego. Przybliża dorobek miejskiej sceny oraz Henryka Tomaszewskiego, twórcy Wrocławskiego Teatru Pantomimy. Odtworzono tu jego mieszkanie z przedmiotami z kolekcji lalek. Nasza fotografia z wizyty przedstawia fasadę i wejście od placu Wolności. To odrębne muzeum, nie Teatr Lalek.\nplac Wolności 7A, Wrocław","de":"Ein Museum zur Breslauer Theatergeschichte im ehemaligen Südflügel des Königsschlosses. Es stellt die Bühnenkunst der Stadt und Henryk Tomaszewski, den Gründer des Breslauer Pantomimentheaters, vor. Seine Wohnung wurde mit Objekten seiner Puppensammlung nachgebildet. Unser Besuchsfoto zeigt Fassade und Eingang am plac Wolności. Das Museum ist vom Puppentheater getrennt.\nplac Wolności 7A, Wrocław","cs":"Muzeum dějin vratislavského divadla v někdejším jižním křídle Královského paláce. Představuje městskou divadelní scénu a Henryka Tomaszewského, zakladatele Vratislavského divadla pantomimy. Jeho byt byl rekonstruován s předměty ze sbírky panenek. Naše fotografie z návštěvy zachycuje průčelí a vstup z náměstí Wolności. Jde o jiné muzeum než loutkové divadlo.\nplac Wolności 7A, Wrocław"};p.links.website="https://muzeum.miejskie.wroclaw.pl/museum/teatru/";p.provenance.theatreMuseumRefresh20261022={"checkedAt":"2026-10-22T05:09:21.448054+00:00","sources":["https://muzeum.miejskie.wroclaw.pl/museum/teatru/","https://muzeum.miejskie.wroclaw.pl/en/museum/teatru/","https://www.wroclaw.pl/nasz-wroclaw/partner/muzeum-teatru-im-henryka-tomaszewskiego-wroclaw"],"sourcePhotoDecision":"Two source photographs are the same full-frame picture in different encodings; existing asset retained, no duplicate added.","guideAuthorization":"English original only, five native captions including Hebrew. No Hebrew recording exists."};}})();

// One authorized English source, with native captions in all five map languages.
(function(){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(p=>p.id==="henryk-tomaszewski-theatre-museum");if(p){p.media.guideVideos={en:"https://www.youtube.com/watch?v=p8SO_3lpuxM"};p.provenance.theatreMuseumGuide20261022={"receipt":"outputs/theatre-museum-video-guide-2026-10-22/youtube-publication-receipt.json","videoId":"p8SO_3lpuxM","sourceSHA256":"5d5beff082f59ea120098aab5404fc9a9ca5bf40f955df6033ad92835c2493c1","uploadSHA256":"5d5beff082f59ea120098aab5404fc9a9ca5bf40f955df6033ad92835c2493c1","durationSeconds":25.9,"audioLanguage":"en","englishOnlyExplicitlyAuthorized":true,"noHebrewAudioRecording":true,"sourceEndingPartialAcceptedByUser":true,"originalFullPictureAndAudioPreserved":true,"publicReopened":true,"checksNoIssues":true,"nativeCaptions":[{"language":"en","videoId":"p8SO_3lpuxM","sourceAudioLanguage":"en","path":"outputs/theatre-museum-video-guide-2026-10-22/captions/theatre-museum-en.srt","sha256":"83fc31991fd8082684120b0f2ffe269ec3251d38d453403461bb5531d88db4ff","cues":6,"published":true,"reopened":true,"evidence":"outputs/theatre-museum-video-guide-2026-10-22/en-captions-reopened.txt"},{"language":"he","videoId":"p8SO_3lpuxM","sourceAudioLanguage":"en","path":"outputs/theatre-museum-video-guide-2026-10-22/captions/theatre-museum-he.srt","sha256":"8f857358d017de81fab4f57cbe474fb59dcaf2a6c67d212d77f9a208149b33e5","cues":6,"published":true,"reopened":true,"evidence":"outputs/theatre-museum-video-guide-2026-10-22/he-captions-reopened.txt"},{"language":"pl","videoId":"p8SO_3lpuxM","sourceAudioLanguage":"en","path":"outputs/theatre-museum-video-guide-2026-10-22/captions/theatre-museum-pl.srt","sha256":"91cff3e089b7c013b76c63d52a503f4ae17c874460ece5294834161cbb5e1071","cues":6,"published":true,"reopened":true,"evidence":"outputs/theatre-museum-video-guide-2026-10-22/pl-captions-reopened.txt"},{"language":"de","videoId":"p8SO_3lpuxM","sourceAudioLanguage":"en","path":"outputs/theatre-museum-video-guide-2026-10-22/captions/theatre-museum-de.srt","sha256":"100ce893618ca8dee439fe277722478ccab1803002e7215832064e0994e8c26f","cues":6,"published":true,"reopened":true,"evidence":"outputs/theatre-museum-video-guide-2026-10-22/de-captions-reopened.txt"},{"language":"cs","videoId":"p8SO_3lpuxM","sourceAudioLanguage":"en","path":"outputs/theatre-museum-video-guide-2026-10-22/captions/theatre-museum-cs.srt","sha256":"d0ae5a1fc50b6a55ca20a7d5833000f528ec77fc7fa83a3c136a2ab604cda9cc","cues":6,"published":true,"reopened":true,"evidence":"outputs/theatre-museum-video-guide-2026-10-22/cs-captions-reopened.txt"}],"approvalCall":"call_802c4623e5124f478c17a8c9dffbd0e9"};}})();

// Full source-folder photo refresh requested on 2026-10-22.
(function(){const records=[{"id":"town-hall","localName":"Ratusz we Wrocławiu","name":{"he":"בית העירייה העתיק","en":"Wrocław Old Town Hall","pl":"Ratusz we Wrocławiu","de":"Altes Rathaus Breslau","cs":"Stará radnice ve Vratislavi"},"description":{"he":"בית העירייה העתיק בכיכר השוק הוא מבנה גותי ובו המוזיאון לאמנות בורגנית. התעכבו על השעון, הגמלונים והפיסול בחזיתות. התמונות שלנו מציגות את המבנה ביום ובערב. ביקור בפנים כפוף לשעות המוזיאון ולתערוכות; בדקו את האתר הרשמי לפני ההגעה.","en":"The Gothic Old Town Hall on the Market Square houses the Museum of Bourgeois Art. Look closely at its clock, gables and carved façades. Our photographs show daytime and evening views. Interior visits depend on museum opening and exhibitions; check the official website before arriving.","pl":"Gotycki Stary Ratusz na Rynku mieści Muzeum Sztuki Mieszczańskiej. Zwróćcie uwagę na zegar, szczyty i rzeźbione elewacje. Nasze zdjęcia pokazują budynek za dnia i wieczorem. Zwiedzanie wnętrz zależy od godzin muzeum i wystaw; przed wizytą sprawdźcie oficjalną stronę.","de":"Das gotische Alte Rathaus am Marktplatz beherbergt das Museum der Bürgerlichen Kunst. Achten Sie auf Uhr, Giebel und Fassadenschmuck. Unsere Fotos zeigen Tages- und Abendansichten. Innenbesichtigungen richten sich nach Museumsöffnungszeiten und Ausstellungen; prüfen Sie vorab die offizielle Website.","cs":"Gotická Stará radnice na Rynku hostí Muzeum měšťanského umění. Všimněte si hodin, štítů a zdobených fasád. Naše fotografie zachycují denní i večerní pohledy. Návštěva interiéru závisí na otevírací době muzea a výstavách; před cestou ověřte oficiální web."},"location":{"countryCode":"PL","regionId":"lower-silesia","cityId":"wroclaw","coordinates":{"lat":51.10993,"lng":17.0317}},"categories":["architecture","history","museum"],"sourceUrls":[],"aliases":[],"sourceRecords":[{"productId":"wroclaw-24-hours","kind":"route-stop","sourceId":"town-hall"},{"productId":"wroclaw-christmas","kind":"route-stop","sourceId":"town-hall"}],"coordinateCandidates":[{"productId":"wroclaw-24-hours","sourceId":"town-hall","lat":51.10993,"lng":17.0317},{"productId":"wroclaw-christmas","sourceId":"town-hall","lat":51.10993,"lng":17.0317}],"status":"published","editorialPriority":"normal","taxonomy":{"categories":["architecture","history","museum"],"tags":["museums-history","architecture-design"]},"suitability":{"recommendedFor":[],"walkingIntensity":null,"familyFriendly":null,"couples":null,"solo":null,"romantic":null,"indoorOutdoor":null,"rainFriendly":null,"budgetLevel":null,"accessibility":{"level":null,"notes":null}},"visit":{"durationMinutes":null,"bestTimeOfDay":[],"seasonalSuitability":[],"openingHoursNotes":null},"links":{"website":"https://muzeum.miejskie.wroclaw.pl/en/museum/sztuki-mieszczenskiej/","navigation":{"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.10993%2C17.0317","appleMaps":"https://maps.apple.com/?ll=51.10993,17.0317&q=Ratusz%20we%20Wroc%C5%82awiu"},"socialProfileFallback":false},"transport":{"carRequired":null,"publicTransportNotes":null,"parkingNotes":null,"drivingTimeFromWroclawMinutes":null},"languages":["he","en","pl","de","cs"],"experiences":[{"id":"museum-of-bourgeois-art","tags":["art","history"]}],"provenance":{"contentType":"official-institution-audit","factualSources":[{"url":"https://visitwroclaw.eu/en/atrakcje/market-square-and-town-hall/","checkedAt":"2026-10-19","supports":["central square","cafés","pedestrian access","Town Hall within square"]},{"url":"https://muzeum.miejskie.wroclaw.pl/en/museum/sztuki-mieszczenskiej/","checkedAt":"2026-10-19","supports":["Gothic Old Town Hall","Museum of Bourgeois Art","Rynek address"],"caution":"Source contains visibly malformed hours and inconsistent postal codes; do not copy hours/prices/postal codes"}],"verifiedAt":"2026-10-19","personalMediaPermission":false,"visitVideoPublicationReceipt":"data/renoma-rynek-townhall-visit-publication.json","fullPhotoRefresh20261022":{"sourceOriginalsModified":false,"noArbitraryPhotoLimit":true,"localPreparationOnly":true}},"media":{"photos":["/assets/old-town-hall-wroclaw.jpg","/assets/town-hall-refresh-oct19-01.jpg","/assets/town-hall-refresh-oct19-02.jpg","/assets/rynek-refresh-oct19-07.jpg","/assets/full-enrichment-20261022/rynek-38.jpg"],"videos":["https://youtube.com/shorts/a6Hx2tj5Dzg"],"metadata":{"/assets/town-hall-refresh-oct19-01.jpg":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Rynek/IMG_4717.JPG","sourceSHA256":"dedc7b9e6589a3c470bb6096e3e799c062650e30f4c0bdb17513488e46c8d0ef","assetSHA256":"93e6fd517daee150ab8c6e50a7687b646c8b08ef4de20005a4592e1631ed00e8","originalFullPicturePreserved":true,"familyForeground":false,"alt":{"he":"בית העירייה העתיק והכיכר סביבו","en":"The Old Town Hall and its surrounding square","pl":"Stary Ratusz i otaczający go plac","de":"Das Alte Rathaus und der umgebende Platz","cs":"Stará radnice a okolní náměstí"}},"/assets/town-hall-refresh-oct19-02.jpg":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Rynek/WhatsApp Image 2026-10-21 at 14.06.05 (2).jpeg","sourceSHA256":"dd2841f5ed76ca624c923c0d0964350cf56337637c4d2fa42589540ea24440bd","assetSHA256":"b26914a29954b2e0c43cbe2ff803a732cc55bd12d7fc4f8990e6a82ba2123978","originalFullPicturePreserved":true,"familyForeground":false,"alt":{"he":"בית העירייה העתיק והכיכר סביבו","en":"The Old Town Hall and its surrounding square","pl":"Stary Ratusz i otaczający go plac","de":"Das Alte Rathaus und der umgebende Platz","cs":"Stará radnice a okolní náměstí"}},"/assets/rynek-refresh-oct19-07.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Rynek/WhatsApp Image 2026-10-05 at 18.31.33 (1).jpeg","sourceSHA256":"cee5deb9c4bc0b6c8e14ea6fab20ecf05451c35e5b898b63cdb86a17735a0ca9","assetSHA256":"632153598fa4dfc1a6d9b15b11ddba731b72c8bb3c979c9522028d40aa7892b4","originalFullPicturePreserved":true,"familyForeground":false,"alt":{"he":"בית העירייה העתיק והכיכר סביבו","en":"The Old Town Hall and its surrounding square","pl":"Stary Ratusz i otaczający go plac","de":"Das Alte Rathaus und der umgebende Platz","cs":"Stará radnice a okolní náměstí"}},"/assets/full-enrichment-20261022/rynek-38.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Rynek/WhatsApp Image 2026-10-21 at 14.06.05 (1).jpeg","sourceSHA256":"cc5a8ede0961c5eb94af9f15e7c7eb5314300c39a1149cb309b8dd501d660bbc","assetSHA256":"fb51dcb08a3b8e021c023074ccf1185a22fdd9cb754b6124a93655d0c158b868","originalFullPicturePreserved":true,"familyForeground":false,"alt":{"he":"בית העירייה העתיק והכיכר סביבו","en":"The Old Town Hall and its surrounding square","pl":"Stary Ratusz i otaczający go plac","de":"Das Alte Rathaus und der umgebende Platz","cs":"Stará radnice a okolní náměstí"}}}},"socialPosts":[{"platform":"facebook","language":"pl","url":"https://facebook.com/permalink.php?story_fbid=pfbid02LEfYBpkZggr1eW6Xi6S8V5zU6q4ZYS5Hp2HUcT4RhLYih7jqVZMfGn3HVkatao66l&id=61595207664875","verifiedAt":"2026-10-19"},{"platform":"facebook","language":"de","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0j3RGBm11XgUCo3woiec6vgRksebyjTBeo4GuUrHs7EDia1tm518LS2jdhx2U1TJVl&id=61595239823399","verifiedAt":"2026-10-19"},{"platform":"facebook","language":"cs","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02h3exwi5k2HW2dRQZk6kLteBFzEAn92VTVs23Y8qfkGE2QswVk9zB5M3gnJzM8k3Sl&id=61594716405964","verifiedAt":"2026-10-19"},{"platform":"instagram","language":"cs","url":"https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeMh5J1jbJy/","verifiedAt":"2026-10-19"},{"platform":"instagram","language":"en","url":"https://www.instagram.com/p/DeMldstj8FP/","verifiedAt":"2026-10-19"},{"platform":"facebook","language":"en","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid02adMixpC3DKFekh3ranhYzvdA6zcuJWoLo8F57zW8PUcRf3u8dEf14HTsLoXRqzUjl&id=61595036942289","verifiedAt":"2026-10-19"},{"platform":"instagram","language":"pl","url":"https://www.instagram.com/p/DeTnoF3je_J/","verifiedAt":"2026-10-19"},{"platform":"instagram","language":"de","url":"https://www.instagram.com/p/DeUTwPkjyOh/","verifiedAt":"2026-10-19"},{"platform":"instagram","language":"he","url":"https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUtnbDkfUF/","verifiedAt":"2026-10-19"}]},{"id":"aula","localName":"Aula Leopoldina","name":{"he":"אולה לאופולדינה","en":"Aula Leopoldina","pl":"Aula Leopoldina","de":"Aula Leopoldina","cs":"Aula Leopoldina"},"description":{"he":"אולם בארוקי מפואר כחלק ממוזיאון אוניברסיטת ורוצלב.","en":"A magnificent Baroque hall within the University of Wrocław Museum.","pl":"Wspaniała barokowa sala w Muzeum Uniwersytetu Wrocławskiego.","de":"Prachtvoller Barocksaal im Museum der Universität Breslau.","cs":"Velkolepý barokní sál v Muzeu Vratislavské univerzity."},"location":{"countryCode":"PL","regionId":"lower-silesia","cityId":"wroclaw","coordinates":{"lat":51.11371,"lng":17.03362}},"categories":["architecture","culture","history","museum"],"sourceUrls":[],"aliases":[],"sourceRecords":[{"productId":"wroclaw-24-hours","kind":"route-stop","sourceId":"aula"},{"productId":"wroclaw-four-days","kind":"route-stop","sourceId":"aula"},{"productId":"wroclaw-christmas","kind":"route-stop","sourceId":"aula"}],"coordinateCandidates":[{"productId":"wroclaw-24-hours","sourceId":"aula","lat":51.11371,"lng":17.03362},{"productId":"wroclaw-four-days","sourceId":"aula","lat":51.11423,"lng":17.03375},{"productId":"wroclaw-christmas","sourceId":"aula","lat":51.11371,"lng":17.03362}],"status":"published","editorialPriority":"normal","taxonomy":{"categories":["architecture","culture","history","museum"],"tags":["museums-history","architecture-design"]},"suitability":{"recommendedFor":[],"walkingIntensity":null,"familyFriendly":null,"couples":null,"solo":null,"romantic":null,"indoorOutdoor":null,"rainFriendly":null,"budgetLevel":null,"accessibility":{"level":null,"notes":null}},"visit":{"durationMinutes":null,"bestTimeOfDay":[],"seasonalSuitability":[],"openingHoursNotes":null},"links":{"website":"https://muzeum.uni.wroc.pl/plan-zwiedzania/aula-leopoldina/","navigation":{"googleMaps":"https://www.google.com/maps/search/?api=1&query=51.11371%2C17.03362","appleMaps":"https://maps.apple.com/?ll=51.11371,17.03362&q=Aula%20Leopoldina"}},"transport":{"carRequired":null,"publicTransportNotes":null,"parkingNotes":null,"drivingTimeFromWroclawMinutes":null},"languages":["he","en","pl","de","cs"],"experiences":[{"id":"aula-leopoldina","tags":["architecture","history"]},{"id":"oratorium-marianum","tags":["architecture","music"]},{"id":"mathematical-tower","tags":["history","viewpoint"]},{"id":"university-exhibition-rooms","tags":["history"]}],"provenance":{"contentType":"personal-visit","factualSources":[{"type":"official","url":"https://muzeum.uni.wroc.pl/","checkedAt":"2026-08-29"}],"personalVisit":true,"originalPhotography":true,"fullPhotoRefresh20261022":{"sourceOriginalsModified":false,"noArbitraryPhotoLimit":true,"localPreparationOnly":true}},"media":{"photos":["/assets/gallery-university-02.jpg","/assets/gallery-university-04.jpg","/assets/gallery-university-01.jpg","/assets/gallery-university-03.jpg","/assets/gallery-university-05.jpg","/assets/aula-leopoldina-01.jpg","/assets/aula-leopoldina-02.jpg","/assets/aula-leopoldina-03.jpg"],"videos":[],"metadata":{"/assets/aula-leopoldina-01.jpg":{"tags":["aula-leopoldina","baroque-interior","fresco","hero"],"original":true,"heroCandidate":true,"sourceFile":"741112977_10244931966859705_8938826148654997271_n.jpg"},"/assets/aula-leopoldina-02.jpg":{"tags":["aula-leopoldina","baroque-interior","seating"],"original":true,"sourceFile":"740052756_10244931966979708_3788905547594391614_n.jpg"},"/assets/aula-leopoldina-03.jpg":{"tags":["university-of-wroclaw","exterior","architecture"],"original":true,"sourceFile":"740486966_10244931965779678_2232032539844803280_n.jpg"}},"thumbnail":"/assets/aula-leopoldina-01.jpg"},"socialPosts":[{"platform":"facebook","language":"pl","url":"https://facebook.com/permalink.php?story_fbid=pfbid02XFsXk3DTRyen3r7181WETGsvYd2UrCqnUEZnphBbY3KBfT4uw3r7pYHM38Sy6h25l&id=61595207664875","verifiedAt":"2026-10-06"},{"platform":"instagram","language":"pl","url":"https://www.instagram.com/p/DeKWP2eDNkm/","verifiedAt":"2026-10-06"},{"platform":"facebook","language":"de","url":"https://facebook.com/permalink.php?story_fbid=pfbid02KcBttu2jmZJY2UmNBSbHkjmYnefrN1zZRLtg4hSnJf8iN4udRpWHQXXvYFPSdpual&id=61595239823399","verifiedAt":"2026-10-06"},{"platform":"instagram","language":"de","url":"https://www.instagram.com/p/DeKd1gglsdS/","verifiedAt":"2026-10-06"},{"platform":"facebook","language":"en","url":"https://facebook.com/permalink.php?story_fbid=pfbid02BVVZ1Q86VfXEz379fYALCCkiYCbpwhC6unAMfieoPMt59Hoe8o2Wur3kqMV7e3bwl&id=61595036942289","verifiedAt":"2026-10-07"},{"platform":"instagram","language":"en","url":"https://www.instagram.com/wroclaw.lowersilesia/p/DeKwU9LHfVz/","verifiedAt":"2026-10-07"},{"platform":"instagram","language":"cs","url":"https://www.instagram.com/wroclaw.lowersilesia.cs/p/DeKzDv9jRWu/","verifiedAt":"2026-10-06T22:00:58.646296+00:00"},{"platform":"facebook","language":"cs","url":"https://www.facebook.com/permalink.php?story_fbid=pfbid0ZwPStdDb289bhB1dWQ9QTm82d3QhxJsWTAaNEDysk7eQzng2X5n9gTJxi9vuZP51l&id=61594716405964","verifiedAt":"2026-10-06T22:29:02.899058+00:00"},{"platform":"facebook","language":"he","url":"https://facebook.com/permalink.php?story_fbid=pfbid031ioVuUTo7QM3u5vaEo1MUJRcUaEjR1HHheDXh7mjizSNkAhNBKJV5AhbeLdei37fl&id=61591964083308","verifiedAt":"2026-10-09T05:30:27.092Z"},{"platform":"facebook","url":"https://www.facebook.com/61591964083308/posts/122109914649398802/"},{"platform":"instagram","url":"https://www.instagram.com/p/DbgEDzmnDcY/","routingExcluded":true}]}];const ids=new Set(records.map(p=>p.id));window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.filter(p=>!ids.has(p.id));window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.push(...records);})();

// Full-source round: preserve every distinct relevant visit photograph.
(function(){const patches={"nfm":{"photos":["/assets/round24h-20261022/nfm-03.jpg","/assets/round24h-20261022/nfm-04.jpg","/assets/round24h-20261022/nfm-11.jpg","/assets/round24h-20261022/nfm-05.jpg"],"metadata":{"/assets/round24h-20261022/nfm-03.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-05 at 18.27.03 (4).jpeg","sourceSHA256":"fa948352456ca9dcaf6e28216aba76a608a17b1e5c6af5b5eae0849b82660703","assetSHA256":"d6266f69b1f8903567186da1b4d2c17a08b3afebedef1f6a72ec8a31ac0891c2","originalFullPicturePreserved":true,"alt":{"he":"הכיכר והפילהרמונית במבט מהרחוב","en":"Street view across the square toward NFM","pl":"Widok z ulicy przez plac w stronę NFM","de":"Straßenblick über den Platz zum NFM","cs":"Pohled z ulice přes náměstí k NFM"}},"/assets/round24h-20261022/nfm-04.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-05 at 18.27.31 (2).jpeg","sourceSHA256":"34119a390c39b259ca55cbceaf9721b31571d8811ac58d15e4253815072341d8","assetSHA256":"36f8bac845ac902ef35abcbc7923da3b2893a3169a93e4750779ffb951dc5709","originalFullPicturePreserved":true,"alt":{"he":"חזית הפילהרמונית והכיכר","en":"NFM facade and forecourt","pl":"Fasada NFM i plac przed wejściem","de":"NFM-Fassade und Vorplatz","cs":"Průčelí NFM a prostranství před ním"}},"/assets/round24h-20261022/nfm-11.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-21 at 21.34.48 (1).jpeg","sourceSHA256":"9c026aa0b6b61983b80954b92967d49db5cf2b27ed047ab22639de5a116bca2a","assetSHA256":"14d345a3e202d0725775feac60f779bd6cf57e8dbe4d3ce2dc71f58b0d4a9568","originalFullPicturePreserved":true,"alt":{"he":"הכניסה לפילהרמונית מכיוון הרחוב","en":"NFM entrance viewed from the street","pl":"Wejście do NFM od strony ulicy","de":"NFM-Eingang von der Straße aus","cs":"Vstup do NFM z pohledu od ulice"}},"/assets/round24h-20261022/nfm-05.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Image 2026-10-05 at 18.27.31 (4).jpeg","sourceSHA256":"11f64311d938d61fe9fbeebabecfaa50f4584fe5d6809c34c2283e658307e07a","assetSHA256":"ae4d3bb6daf0a2585df96bec317925bbc826022264430d242777c285c93a0252","originalFullPicturePreserved":true,"privacyReview":"Incidental public passersby, not posed personal/family portrait; parent visual review2026-10-22","alt":{"he":"רחבת הפילהרמונית ועוברי אורח בעת הביקור","en":"NFM forecourt with passersby during our visit","pl":"Plac przed NFM z przechodniami podczas wizyty","de":"NFM-Vorplatz mit Passanten beim Besuch","cs":"Prostranství před NFM s kolemjdoucími při návštěvě"}}}},"opera":{"photos":["/assets/round24h-20261022/opera-02.jpg","/assets/round24h-20261022/opera-03.jpg","/assets/round24h-20261022/opera-04.jpg","/assets/round24h-20261022/opera-05.jpg","/assets/round24h-20261022/opera-06.jpg","/assets/round24h-20261022/opera-09.jpg","/assets/round24h-20261022/opera-10.jpg","/assets/round24h-20261022/opera-27.jpg"],"metadata":{"/assets/round24h-20261022/opera-02.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/Firefly_Gemini Flash_remove my parents and my wifr from the picture 822849.png","sourceSHA256":"19f40d733d6df49d50a15b7424c6fa3f6b28331adcf0cc4ba6312438ec75521e","assetSHA256":"5e058373f40f5b680fa7c008a2bcb94d458d6fe999202969207aa844761927e2","originalFullPicturePreserved":true,"alt":{"he":"מבט ממרפסת האופרה לרחוב","en":"Street view from the opera terrace","pl":"Widok ulicy z tarasu opery","de":"Straßenblick von der Opernterrasse","cs":"Pohled na ulici z terasy opery"}},"/assets/round24h-20261022/opera-03.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/Firefly_Gemini Flash_remove my parents from the picture 368452.png","sourceSHA256":"92b2a11443a4ed6bd2819bb5fc3a9469472c3a96a9f71e5d9d77a3695b87d56a","assetSHA256":"b1cfd64db1c30f9d36d50ee2547e83be3db9557749f94d2173f8534f42a813ba","originalFullPicturePreserved":true,"alt":{"he":"מקומות הישיבה באופרה בעת הביקור","en":"Opera seating during our visit","pl":"Widownia opery podczas wizyty","de":"Sitzplätze in der Oper beim Besuch","cs":"Hlediště opery během návštěvy"}},"/assets/round24h-20261022/opera-04.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/IMG_0997.JPG","sourceSHA256":"e8c840eb4b7a147d9bbe84bc931c9cc9527332ff7721df3283837eebd34196bc","assetSHA256":"71dd593ee36ec18f56c8234744f4cefb1a142992471fd932ce0f2cdfe786feb9","originalFullPicturePreserved":true,"alt":{"he":"הבמה והאולם באופרה","en":"Opera stage and auditorium","pl":"Scena i widownia opery","de":"Bühne und Zuschauerraum der Oper","cs":"Jeviště a hlediště opery"}},"/assets/round24h-20261022/opera-05.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/IMG_1015.JPG","sourceSHA256":"bcb1bd3a4a89fa16cc19836dd7cc2199a740b9ef9e05c96d3924f7931333b051","assetSHA256":"a2b7d78481dfb65cc7b7b6847f0a6b6be898a4b025369144a6f3f5b3651172fb","originalFullPicturePreserved":true,"alt":{"he":"המרפסת ועמודי חזית האופרה","en":"Opera terrace and facade columns","pl":"Taras opery i kolumny fasady","de":"Opernterrasse und Fassadensäulen","cs":"Terasa opery a sloupy průčelí"}},"/assets/round24h-20261022/opera-06.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/IMG_1019.JPG","sourceSHA256":"66adb0b1114802afcb7d17a5fcf3fa80b2af3336f9d211c2d5512a0ac669b4ff","assetSHA256":"91ef464c2f3e7e7d053814b799883d19e8dd68ce3b09895c867b48f8c304b943","originalFullPicturePreserved":true,"alt":{"he":"אמנים על הבמה בסיום מופע האופרה","en":"Performers taking a curtain call at the opera","pl":"Artyści podczas ukłonów na scenie opery","de":"Künstler beim Schlussapplaus in der Oper","cs":"Účinkující při děkovačce v opeře"}},"/assets/round24h-20261022/opera-09.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Image 2026-10-05 at 18.25.44.jpeg","sourceSHA256":"510e74b06c93438f793d75304e748874696c40f3e8780c4748c20d5b5d4e98b4","assetSHA256":"6f8f1f804adf97f5bfe33dbff74fd7be8ca518b6a0871aec207d23c973d99caf","originalFullPicturePreserved":true,"alt":{"he":"דגם האופרה ברחוב, מבט מהצד","en":"Street-side opera model, side view","pl":"Uliczna makieta opery, widok z boku","de":"Opernmodell an der Straße, Seitenansicht","cs":"Pouliční model opery, pohled z boku"}},"/assets/round24h-20261022/opera-10.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Image 2026-10-05 at 18.26.28.jpeg","sourceSHA256":"1844cf003fa67556a2e52087e90f78acf206518b166258afb65a65dab63e5d8c","assetSHA256":"f87503d0450cc32a8d7f2f8d17f4df6728bfe72f278b05e380e66b84aa5b3180","originalFullPicturePreserved":true,"alt":{"he":"מבט מהרחוב אל בניין האופרה","en":"Street view toward the opera building","pl":"Widok z ulicy na budynek opery","de":"Straßenblick auf das Operngebäude","cs":"Pohled z ulice na budovu opery"}},"/assets/round24h-20261022/opera-27.jpg":{"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Opera/opera4.JPG","sourceSHA256":"e0bd09990e4e712c5abd9a7bd32113098ff4aaf5fa471dd39b47c4ca59eb0063","assetSHA256":"2bfae8d5a3b934a907186f7399513f33e2e3933dc1d7e6fbd306806538cca1f0","originalFullPicturePreserved":true,"alt":{"he":"חזית האופרה מכיוון פינת הרחוב","en":"Opera facade from the street corner","pl":"Fasada opery od narożnika ulicy","de":"Opernfassade von der Straßenecke aus","cs":"Průčelí opery od nároží ulice"}}}}};for(const[id,patch]of Object.entries(patches)){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(x=>x.id===id);if(!p)throw new Error("Missing round canonical: "+id);p.media.photos=[...new Set([...p.media.photos,...patch.photos])];p.media.metadata={...(p.media.metadata||{}),...patch.metadata};p.provenance={...(p.provenance||{}),fullSourceRound20261022:{noQuantityCuration:true,sourceOriginalsUnchanged:true,addedPhotos:patch.photos}};}})();

// Approved full-picture silent visits; all Public and reopened, no duplicate uploads.
(function(){const patches={"nfm": {"videos": ["https://www.youtube.com/watch?v=4b_wsFf3HVs", "https://www.youtube.com/watch?v=-4uBHGzLYzY", "https://www.youtube.com/watch?v=KEEYJ40vI3Y", "https://www.youtube.com/watch?v=n4IB1Q3oeKA"], "metadata": {"https://www.youtube.com/watch?v=4b_wsFf3HVs": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Video 2026-10-05 at 18.25.42.mp4", "sourceSHA256": "8f45241fd6a798c912062d20da15f500b7b4ee9a6456c8de0de0682c5146b5b8", "uploadSHA256": "60860d0c30600284d53522ad4cc0d4498a1504e1f1c46c523cee87f0bff78bac", "durationSeconds": 10.988333, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור בפילהרמונית 1", "en": "National Forum of Music visit 1", "pl": "Wizyta w NFM 1", "de": "NFM-Besuch 1", "cs": "Návštěva NFM 1"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}, "https://www.youtube.com/watch?v=-4uBHGzLYzY": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Video 2026-10-05 at 18.25.43.mp4", "sourceSHA256": "84594b51a663290decb1970b80b033f12256786b4f7c77c506ec369447528f5b", "uploadSHA256": "18909a127d5c48ca1ad02654ae022ba851c059a65bd8829d5467a994401af9dc", "durationSeconds": 3.5, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור בפילהרמונית 2", "en": "National Forum of Music visit 2", "pl": "Wizyta w NFM 2", "de": "NFM-Besuch 2", "cs": "Návštěva NFM 2"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}, "https://www.youtube.com/watch?v=KEEYJ40vI3Y": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Video 2026-10-05 at 18.27.00.mp4", "sourceSHA256": "0a99b45375caa6ce374c2663a098e7361a74795ea8af159e541e6140418d6f4e", "uploadSHA256": "9e4a1c0faf1a429a1999094c638bfde106d48d8c316a995b5db04938c2657a0f", "durationSeconds": 2.933333, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור בפילהרמונית 3", "en": "National Forum of Music visit 3", "pl": "Wizyta w NFM 3", "de": "NFM-Besuch 3", "cs": "Návštěva NFM 3"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}, "https://www.youtube.com/watch?v=n4IB1Q3oeKA": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/philarmonic/WhatsApp Video 2026-10-05 at 18.27.10.mp4", "sourceSHA256": "1f27d7ac3f4bfa94a37cd214cc7278d475c5259937c67fe4c5dbb459b18929d1", "uploadSHA256": "9c2c7143d300762e05dfd188a44f54bdb6e0bbbae946bbe62ab611b68b728161", "durationSeconds": 4.133333, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור בפילהרמונית 4", "en": "National Forum of Music visit 4", "pl": "Wizyta w NFM 4", "de": "NFM-Besuch 4", "cs": "Návštěva NFM 4"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}}}, "opera": {"videos": ["https://www.youtube.com/watch?v=0OsaQW4XOhI", "https://www.youtube.com/watch?v=4A5AVlbk7xM", "https://www.youtube.com/watch?v=I8_pnHoo9qs", "https://www.youtube.com/watch?v=gAF7NpDlYPw"], "metadata": {"https://www.youtube.com/watch?v=0OsaQW4XOhI": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-05 at 18.25.45.mp4", "sourceSHA256": "319f51d0b581683ae5874ab391ecb69c7259e7935822678093640d16b1802b8b", "uploadSHA256": "a2a67fbc17731753a2bd8e68f5a9408bd54c439e3dbd7479231c1c313f9c44ff", "durationSeconds": 4.233333, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור באופרה 1", "en": "Opera visit 1", "pl": "Wizyta w operze 1", "de": "Opernbesuch 1", "cs": "Návštěva opery 1"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}, "https://www.youtube.com/watch?v=4A5AVlbk7xM": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-05 at 18.26.26.mp4", "sourceSHA256": "b3071c202abcbeecb67d7aa0c9761b525521c9a530b1a6a1de9b45d8562c10ec", "uploadSHA256": "1dac632804119f61d88df8004e7b2c2c96f5ac13cbee6d68f57777907af4d975", "durationSeconds": 2.233333, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור באופרה 2", "en": "Opera visit 2", "pl": "Wizyta w operze 2", "de": "Opernbesuch 2", "cs": "Návštěva opery 2"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}, "https://www.youtube.com/watch?v=I8_pnHoo9qs": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-05 at 18.26.27.mp4", "sourceSHA256": "fe1b22fa8863f8f96e631002a6b7c3dbaf5def80fa15f9fe0ac3479e50bbea3e", "uploadSHA256": "83afc412d60f77487c7b9367e7cddd27e74940c798895e060fa34942fb0a3744", "durationSeconds": 4.066667, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור באופרה 3", "en": "Opera visit 3", "pl": "Wizyta w operze 3", "de": "Opernbesuch 3", "cs": "Návštěva opery 3"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}, "https://www.youtube.com/watch?v=gAF7NpDlYPw": {"sourceFile": "/Users/rachelfiler/Desktop/Wroclaw/Opera/WhatsApp Video 2026-10-21 at 21.12.23 (2).mp4", "sourceSHA256": "f5c792ef8b94b4e47455d983d767383c340a69cdfb9f3018ec1542c0aa09d365", "uploadSHA256": "1b974d7cd1130295a0e56e54fd19b18c9682a0e71017e7eb303e665fd63f580d", "durationSeconds": 3.7, "silent": true, "originalFullPicturePreserved": true, "visibility": "Public", "publicReopened": true, "sdComplete": true, "approvalCall": "call_36fcb8731b5c4ec6bafd9fb64a45beb1", "title": {"he": "ביקור באופרה 4", "en": "Opera visit 4", "pl": "Wizyta w operze 4", "de": "Opernbesuch 4", "cs": "Návštěva opery 4"}, "checksEvidenceMode": "Content Notices dash +ClaimsNoImpact +SDcomplete; uploadwizardbadges unavailable afterPrivateSave", "noCurrentRestrictions": true}}}};for(const[id,patch]of Object.entries(patches)){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(x=>x.id===id);if(!p)throw new Error("Missing roundvideo place:"+id);p.media.videos=[...new Set([...p.media.videos,...patch.videos])];p.media.metadata={...(p.media.metadata||{}),...patch.metadata};}})();

// Full-source theatre detail additions to the existing cultural canonical record.
(function(){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(p=>p.id==="wroclaw-puppet-theatre");for(const x of [{"asset":"/assets/round24h-20261022/puppet-03.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.05 (1).jpeg","sourceSHA256":"7005b047ad8bbfd47b4fc24b74c0fdc46caa4485c94262b6dbd5346e7913eec4","assetSHA256":"c81fd1b7206f8a23cc6f2e43020ee2c27ef63dc998b19df4b35aba852d2a7ec7","originalFullPicturePreserved":true,"sourceDimensions":[1200,1600],"assetDimensions":[1200,1600],"transformation":"Full-frame JPEG max2400px; orientation normalized; no crop; original preserved","alt":{"he":"פרט מפוסל באזור תיאטרון הבובות","en":"Sculptural detail beside the Puppet Theatre","pl":"Detal rzeźbiarski obok Teatru Lalek","de":"Skulpturales Detail am Puppentheater","cs":"Sochařský detail u loutkového divadla"},"caption":{"he":"פרט מפוסל באזור תיאטרון הבובות","en":"Sculptural detail beside the Puppet Theatre","pl":"Detal rzeźbiarski obok Teatru Lalek","de":"Skulpturales Detail am Puppentheater","cs":"Sochařský detail u loutkového divadla"},"approvalCall":null,"privacyClassification":"Place/detail image, incidental public passers-by permitted"}},{"asset":"/assets/round24h-20261022/puppet-04.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.05 (2).jpeg","sourceSHA256":"2e8175c6331f3cc8334605508ac89f9436aaa5fe52ee0a3ea6f021d86bd0481a","assetSHA256":"fc20a5dc5d243292000fa2f9b7dcfca06f9cea46f009bebba313cd3bff0a41ef","originalFullPicturePreserved":true,"sourceDimensions":[1200,1600],"assetDimensions":[1200,1600],"transformation":"Full-frame JPEG max2400px; orientation normalized; no crop; original preserved","alt":{"he":"דמות מפוסלת ליד תיאטרון הבובות","en":"Sculpted figure beside the Puppet Theatre","pl":"Rzeźbiona postać obok Teatru Lalek","de":"Skulpturale Figur am Puppentheater","cs":"Sochařská postava u loutkového divadla"},"caption":{"he":"דמות מפוסלת ליד תיאטרון הבובות","en":"Sculpted figure beside the Puppet Theatre","pl":"Rzeźbiona postać obok Teatru Lalek","de":"Skulpturale Figur am Puppentheater","cs":"Sochařská postava u loutkového divadla"},"approvalCall":null,"privacyClassification":"Place/detail image, incidental public passers-by permitted"}},{"asset":"/assets/round24h-20261022/puppet-07.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/תיאטרון הבובות/WhatsApp Image 2026-10-21 at 21.12.05.jpeg","sourceSHA256":"3379c9c885aac8c73dbcee183cd29f685f5a8d3681041760e2a1e6643956d3d7","assetSHA256":"1a4f08ee37c76b7fdfe1446defa8c75db8b97eadda23cf689cd8bc7af1a17ede","originalFullPicturePreserved":true,"sourceDimensions":[1200,1600],"assetDimensions":[1200,1600],"transformation":"Full-frame JPEG max2400px; orientation normalized; no crop; original preserved","alt":{"he":"דמות נוספת בפיסול שליד תיאטרון הבובות","en":"Another sculpted figure beside the Puppet Theatre","pl":"Kolejna rzeźbiona postać obok Teatru Lalek","de":"Weitere skulpturale Figur am Puppentheater","cs":"Další sochařská postava u loutkového divadla"},"caption":{"he":"דמות נוספת בפיסול שליד תיאטרון הבובות","en":"Another sculpted figure beside the Puppet Theatre","pl":"Kolejna rzeźbiona postać obok Teatru Lalek","de":"Weitere skulpturale Figur am Puppentheater","cs":"Další sochařská postava u loutkového divadla"},"approvalCall":null,"privacyClassification":"Place/detail image, incidental public passers-by permitted"}}]){if(!p.media.photos.includes(x.asset))p.media.photos.push(x.asset);p.media.metadata[x.asset]=x.metadata;}})();

//23October safe WuWA estate photo delta; partial source access tracked separately.
(function(){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(x=>x.id==="wuwa-estate");if(!p)throw new Error("Missing existing WuWA estate");for(const x of [{"asset":"/assets/round-other-20261023/wuwa-estate-00.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5760 2.JPG","sourceSHA256":"62d34a95b7f7f1d60d7c4990e42740fe7dfcad5d8b3b02aa613ccba4c55550c0","assetSHA256":"bbbc7f3e2335a1cb40b2cbf4ee95eed6fd1b1540b96cd22c4281fce29fae922b","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"דלת השירותים במתחם הביקור","en":"Visitor-facility door in the estate","pl":"Drzwi toalety na terenie zespołu","de":"Tür der Besuchertoilette im Gelände","cs":"Dveře návštěvnické toalety v areálu"},"caption":{"he":"דלת השירותים במתחם הביקור","en":"Visitor-facility door in the estate","pl":"Drzwi toalety na terenie zespołu","de":"Tür der Besuchertoilette im Gelände","cs":"Dveře návštěvnické toalety v areálu"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-08.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5776 2.JPG","sourceSHA256":"c88fbe0158df7e5d60d6924525042d10fe1e3dc6469137a624d06f1589431d1c","assetSHA256":"6ab3345a53d91c9792e6c3b292638038e52393029305f9c91eb5930d456911d4","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"caption":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-12.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5778 2.JPG","sourceSHA256":"3d6b7c7ac8e6e6d5621a3e22f864bc4b21a9f9b3c2889e970454cf2a6bcd7b79","assetSHA256":"2eb98b96d757fcbde9fa3783aae8ce57d002dc0dacf7c5e26430c71ca0677384","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"caption":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-14.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5779 2.JPG","sourceSHA256":"a2dc2edbee6f2a4e44de5ba5b2b0c15bde2b8b2a2e0b2307588fdf623d3eef37","assetSHA256":"8a651042cbbdfc714228ad6fa07d3b93eb527a8955debf0e7350360f3d414093","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"caption":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-18.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5781 2.JPG","sourceSHA256":"2255a25eb14b411a266fd0f154fc569931ed74475cfaf56ed90b6f17247bcd72","assetSHA256":"e7c8a68830770fee31b8aaa65c65af1c38bb18a02f232750619c4ad04eba3283","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"פרט חזית מגורים בשכונת וו־ווה","en":"Residential façade detail in WuWA","pl":"Fragment elewacji mieszkalnej na osiedlu WuWA","de":"Detail einer Wohnhausfassade in WuWA","cs":"Detail obytné fasády ve WuWA"},"caption":{"he":"פרט חזית מגורים בשכונת וו־ווה","en":"Residential façade detail in WuWA","pl":"Fragment elewacji mieszkalnej na osiedlu WuWA","de":"Detail einer Wohnhausfassade in WuWA","cs":"Detail obytné fasády ve WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-22.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5785 2.JPG","sourceSHA256":"8c0ac5b0b709667eda3b86824de832396326f5d5a8ef0b8d4f1555ef18e1dc96","assetSHA256":"9c19bae0060024133c35ead759e4569da0dead979730bd66a78b04c60324cadb","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"מבט לאורך הגישה למבנה בשכונה","en":"Approach to a building in the estate","pl":"Dojście do budynku na osiedlu","de":"Zugang zu einem Gebäude der Siedlung","cs":"Přístup k budově v sídlišti"},"caption":{"he":"מבט לאורך הגישה למבנה בשכונה","en":"Approach to a building in the estate","pl":"Dojście do budynku na osiedlu","de":"Zugang zu einem Gebäude der Siedlung","cs":"Přístup k budově v sídlišti"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-30.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/IMG_5791 2.JPG","sourceSHA256":"8b45b50a1c8adc47f1da4fcc8413f24df3406cf18ffeb5eba4942e6c7ca47606","assetSHA256":"8933d6b9b43b15d56aff57e75109a38bd2406c9477297e3475ca09344b17131a","sourceDimensions":[3024,4032],"assetDimensions":[1800,2400],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"חזית פארק הוטל בתוך מתחם וו־ווה","en":"Park Hotel frontage within the WuWA ensemble","pl":"Fasada Park Hotelu w zespole WuWA","de":"Fassade des Park Hotels im WuWA-Ensemble","cs":"Průčelí Park Hotelu v souboru WuWA"},"caption":{"he":"חזית פארק הוטל בתוך מתחם וו־ווה","en":"Park Hotel frontage within the WuWA ensemble","pl":"Fasada Park Hotelu w zespole WuWA","de":"Fassade des Park Hotels im WuWA-Ensemble","cs":"Průčelí Park Hotelu v souboru WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-92.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/פוסט ישן/IMG_4587.JPG","sourceSHA256":"766d52a2be055c0fdb101fc5af2d3696546bca08ac723e21558270e4e728b768","assetSHA256":"4b2585c8cc417ca15801927f04a8da8c9cce367b388ce39e5deb60fb93d1dec3","sourceDimensions":[1426,1902],"assetDimensions":[1426,1902],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"caption":{"he":"דגם האדריכלות בשכונת וו־ווה","en":"Architectural model in the WuWA estate","pl":"Makieta architektoniczna osiedla WuWA","de":"Architekturmodell der WuWA-Siedlung","cs":"Architektonický model sídliště WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}},{"asset":"/assets/round-other-20261023/wuwa-estate-93.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/WUWA/פוסט ישן/IMG_4589.JPG","sourceSHA256":"d0688331e84f19adc8f250dc8a8875732496f8dfd9226faa4884377b3e06a2a1","assetSHA256":"2704d91cb5c5fa2ecc246e2e3ecb459a2f930c21ec0b15db9e69b371d936c39d","sourceDimensions":[1426,1902],"assetDimensions":[1426,1902],"originalFullPicturePreserved":true,"transformation":"Full-frame JPEG max2400px; original retained; no crop or image editing","alt":{"he":"חזית פארק הוטל בתוך מתחם וו־ווה","en":"Park Hotel frontage within the WuWA ensemble","pl":"Fasada Park Hotelu w zespole WuWA","de":"Fassade des Park Hotels im WuWA-Ensemble","cs":"Průčelí Park Hotelu v souboru WuWA"},"caption":{"he":"חזית פארק הוטל בתוך מתחם וו־ווה","en":"Park Hotel frontage within the WuWA ensemble","pl":"Fasada Park Hotelu w zespole WuWA","de":"Fassade des Park Hotels im WuWA-Ensemble","cs":"Průčelí Park Hotelu v souboru WuWA"},"privacyClassification":"Place visit or meal detail; incidental public figures/reflections allowed, no posed portrait or family context selected"}}]){if(!p.media.photos.includes(x.asset))p.media.photos.push(x.asset);p.media.metadata[x.asset]=x.metadata;}})();

// Existing full equestrian dwarf photograph reused for the Panorama visit.
(function(){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(x=>x.id==="panorama");p.media={"photos":["/assets/gallery-panorama-01.jpg","/assets/gallery-panorama-02.jpg","/assets/gallery-panorama-03.jpg","/assets/gallery-panorama-04.jpg"],"videos":[]};})();


(function(){const patches={"panorama":[{"url":"/assets/papa-gnomes-07.jpg","metadata":{"original":true,"sourceFile":"/Users/rachelfiler/Desktop/Wroclaw/Rotunda/WhatsApp Image 2026-07-14 at 12.07.52.jpeg","sourceSHA256":"face872a4142ef4b5f7ff1608e8d39e9582d16b9235fa4b943016c1f8a05d6ea","originalFullPicturePreserved":true,"sourceFolderReview":"full-source review, all distinct relevant place images retained; duplicates reused and personal images held separately","alt":{"he":"פסל הגמד על הסוס ליד הפנורמה","en":"Equestrian dwarf sculpture beside the Panorama","pl":"Figurka krasnala na koniu przy Panoramie","de":"Reitende Zwergenfigur neben dem Panorama","cs":"Soška trpaslíka na koni u Panoramy"},"title":{"he":"פסל הגמד על הסוס ליד הפנורמה","en":"Equestrian dwarf sculpture beside the Panorama","pl":"Figurka krasnala na koniu przy Panoramie","de":"Reitende Zwergenfigur neben dem Panorama","cs":"Soška trpaslíka na koni u Panoramy"},"reuseExistingAsset":true}}]};for(const[id,items]of Object.entries(patches)){const p=window.WROC_CULTURAL_CANONICAL_PLACE_SOURCE.find(x=>x.id===id);if(!p)throw new Error("Missing canonical photo target:"+id);p.media.metadata=p.media.metadata||{};for(const item of items){if(!p.media.photos.includes(item.url))p.media.photos.push(item.url);p.media.metadata[item.url]=Object.assign({},p.media.metadata[item.url]||{},item.metadata);}}})();
