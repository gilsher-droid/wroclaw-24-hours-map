(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => ({ he, en, pl, de, cs });
  const nav = (lat, lng, label) => ({
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`,
    appleMaps: `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(label)}`,
  });
  const place = ({ id, aliases = [], localName, name, description, coordinates, address, categories, tags, website, experiences = [], socialPosts = [], media = null, provenance = null }) => ({
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
    links: { website, navigation: nav(coordinates[0], coordinates[1], localName) },
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
    place({ id:"zyjnia-bwa-wroclaw", aliases:["galeria-dizajn"], localName:"Żyjnia BWA Wrocław", name:t("ז׳ייניה BWA", "Żyjnia BWA Wrocław", "Żyjnia BWA Wrocław", "Żyjnia BWA Wrocław", "Żyjnia BWA Wrocław"), description:descriptions.gallery, coordinates:[51.1086376,17.0331186], address:{street:"Świdnicka 2-4",postalCode:"50-067",city:"Wrocław",country:"Poland"}, categories:["gallery","art","design"], tags:["art-contemporary","architecture-design"], website:"https://bwa.wroc.pl/" }),
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
