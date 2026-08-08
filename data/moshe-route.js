(function () {
  const l = (he, en, pl) => ({ he, en, pl, de: window.EXTRA_ROUTE_TRANSLATIONS?.de?.[en] || en, cs: window.EXTRA_ROUTE_TRANSLATIONS?.cs?.[en] || en });
  const stop = (id, day, order, coordinates, category, time, duration, optional, name, localName, description, tip) => ({
    id, day, order, coordinates, category, time, duration, optional, name, localName, description, tip
  });
  const rec = (id, coordinates, category, bestDay, name, localName, description) => ({ id, coordinates, category, bestDay, name, localName, description });

  window.PREMIUM_ROUTE_CONFIG = {
    storageKey: "wroc-moshe-day",
    ui: {
      he: {
        documentTitle: "וורוצלב בכריסמס – 3 ימים למשה ולבת זוגו | Wroc-love",
        brandSubtitle: "מסלול הכריסמס של משה",
        eyebrow: "וורוצלב בחורף, בקצב נוח",
        title: "שלושה ימי כריסמס. מסלול רגוע לזוג פנסיונרים.",
        subtitle: "מסלול אישי למשה ולבת זוגו: מרחקים קצרים, עצירות חמות, חלופות למזג אוויר חורפי ובלי עליות שאינן הכרחיות.",
        smartTip: "איך משתמשים במסלול בחורף",
        smartTipBody: "בחרו יום לפי מזג האוויר. התחילו מאוחר יחסית, עצרו להתחממות, ודלגו על כל תחנת רשות אם הרחובות חלקים או אם מתעייפים.",
        routeStops: "תחנות מותאמות לחורף", recommendations: "המלצות אוכל והתחממות",
        savePhone: "שמרו את מסלול הכריסמס בטלפון",
        closing: "שלושת הימים, המפות והניווט נשארים זמינים לאורך תקופת הגישה.",
        backTop: "חזרה לבחירת יום"
      },
      en: {
        documentTitle: "Christmas in Wrocław – 3 days for Moshe and his partner | Wroc-love",
        brandSubtitle: "Moshe’s Christmas route",
        eyebrow: "Winter Wrocław at a comfortable pace",
        title: "Three Christmas days. A relaxed route for a retired couple.",
        subtitle: "A personal route for Moshe and his partner: short distances, warm breaks, winter-weather alternatives and no unnecessary climbs.",
        smartTip: "How to use the winter route",
        smartTipBody: "Choose each day according to the weather. Start relatively late, warm up often and skip optional stops whenever streets are slippery or energy is low.",
        routeStops: "winter-friendly stops", recommendations: "food and warm-up picks",
        savePhone: "Save the Christmas route on your phone",
        closing: "All three days, maps and navigation remain available throughout the access period.",
        backTop: "Back to day selection"
      },
      pl: {
        documentTitle: "Boże Narodzenie we Wrocławiu – 3 dni dla Moszego i jego partnerki | Wroc-love",
        brandSubtitle: "Świąteczna trasa Moszego",
        eyebrow: "Zimowy Wrocław w wygodnym tempie",
        title: "Trzy świąteczne dni. Spokojna trasa dla pary emerytów.",
        subtitle: "Osobista trasa dla Moszego i jego partnerki: krótkie odcinki, ciepłe przerwy, alternatywy na zimową pogodę i bez zbędnych podejść.",
        smartTip: "Jak korzystać z zimowej trasy",
        smartTipBody: "Wybierajcie dzień według pogody. Zaczynajcie nieco później, róbcie przerwy w cieple i pomijajcie punkty opcjonalne przy śliskich ulicach lub zmęczeniu.",
        routeStops: "punktów dobrych zimą", recommendations: "jedzenie i ciepłe przerwy",
        savePhone: "Zapiszcie świąteczną trasę w telefonie",
        closing: "Wszystkie trzy dni, mapy i nawigacja są dostępne przez cały okres dostępu.",
        backTop: "Wróć do wyboru dnia"
      }
    }
  };

  window.PREMIUM_DAYS = [
    {
      id: 1,
      title: l("העיר העתיקה ושוק חג המולד", "Old Town and Christmas Market", "Stare Miasto i Jarmark Bożonarodzeniowy"),
      description: l("יום מעגלי וקצר בלב העיר העתיקה, עם אדריכלות, סמטאות ושוק הכריסמס בשעות האורות.", "A short circular day in the Old Town, with architecture, small lanes and the Christmas Market after the lights come on.", "Krótki, okrężny dzień na Starym Mieście: architektura, zaułki i Jarmark po zapaleniu świateł."),
      distance: "1.8 km", hours: "6–7 h", start: "10:00",
      advice: l("אל תגיעו לשוק מוקדם מדי; שמרו אותו לשעות אחר הצהריים והערב.", "Do not reach the market too early; save it for late afternoon and evening.", "Nie przychodźcie na jarmark zbyt wcześnie — zostawcie go na późne popołudnie i wieczór."),
      weather: l("בגשם או בקור חזק, האריכו את ההפסקה בבית קפה או ב־Galeria Dominikańska.", "In rain or strong cold, take a longer café break or warm up in Galeria Dominikańska.", "Przy deszczu lub silnym mrozie zróbcie dłuższą przerwę w kawiarni albo w Galerii Dominikańskiej."),
      tips: [
        l("העלייה למגדל אליזבת כוללת מדרגות רבות ואינה חלק חובה מהמסלול.", "St Elizabeth’s tower has many stairs and is not required.", "Wieża św. Elżbiety ma wiele schodów i nie jest obowiązkowa."),
        l("השוק עמוס בערב; לכו לאט והעדיפו את השוליים אם צפוף.", "The market is busy in the evening; walk slowly and use the outer lanes when crowded.", "Wieczorem jarmark jest zatłoczony; idźcie spokojnie i wybierajcie skrajne alejki."),
        l("בחרו מסעדה מראש כדי לא להמתין זמן רב בקור.", "Choose dinner in advance to avoid a long wait in the cold.", "Wybierzcie restaurację wcześniej, aby nie czekać długo na zimnie.")
      ]
    },
    {
      id: 2,
      title: l("האוניברסיטה ואוסטרוב טומסקי", "University and Ostrów Tumski", "Uniwersytet i Ostrów Tumski"),
      description: l("יום תרבותי שמתחיל במקומות מקורים ומסתיים בין הגשרים, פנסי הגז והקתדרלה.", "A cultural day beginning indoors and ending among bridges, gas lamps and the cathedral.", "Dzień kulturalny zaczynający się we wnętrzach, a kończący wśród mostów, latarni gazowych i katedry."),
      distance: "3.1 km", hours: "7 h", start: "09:45",
      advice: l("בדקו מראש את שעות Aula Leopoldina והגיעו לאוסטרוב טומסקי כחצי שעה לפני החשיכה.", "Check Aula Leopoldina’s hours and reach Ostrów Tumski about half an hour before dusk.", "Sprawdźcie godziny Auli Leopoldina i dotrzyjcie na Ostrów Tumski około pół godziny przed zmrokiem."),
      weather: l("אם המדרכות חלקות, ותרו על המגדל וקצרו את ההליכה בין האיים.", "If pavements are icy, skip the tower and shorten the island walk.", "Przy oblodzonych chodnikach pomińcie wieżę i skróćcie spacer po wyspach."),
      tips: [
        l("בחרו בין Aula Leopoldina למגדל המתמטי; אין צורך בשניהם.", "Choose either Aula Leopoldina or the Mathematical Tower; both are unnecessary.", "Wybierzcie Aulę Leopoldina albo Wieżę Matematyczną — nie trzeba zwiedzać obu."),
        l("Hala Targowa היא נקודת הצהריים וההתחממות הטובה ביום הזה.", "Hala Targowa is the best lunch and warm-up stop today.", "Hala Targowa to najlepsze miejsce na lunch i ogrzanie się."),
        l("הקתדרלה מרשימה גם מבחוץ; אין חובה לעלות לתצפית.", "The cathedral is impressive from outside; the viewpoint is optional.", "Katedra jest imponująca także z zewnątrz; punkt widokowy jest opcjonalny.")
      ]
    },
    {
      id: 3,
      title: l("מוזיאונים, קניות וערב תרבות", "Museums, shopping and a cultural evening", "Muzea, zakupy i wieczór kulturalny"),
      description: l("יום גמיש ומוגן יחסית ממזג האוויר, עם מוזיאונים, קניות נוחות ואפשרות לקונצרט או אופרה.", "A flexible, weather-protected day with museums, comfortable shopping and the option of a concert or opera.", "Elastyczny dzień dobrze chroniony przed pogodą: muzea, wygodne zakupy oraz koncert lub opera."),
      distance: "2.6 km", hours: "6–8 h", start: "10:00",
      advice: l("הזמינו מראש את Panorama Racławicka ובדקו הופעות באופרה או ב־NFM.", "Book Panorama Racławicka in advance and check the Opera or NFM programme.", "Zarezerwujcie wcześniej Panoramę Racławicką i sprawdźcie repertuar Opery lub NFM."),
      weather: l("ביום מושלג דלגו על Bastion Sakwowy ועברו בין המוזיאון, Renoma ו־Wroclavia בתחבורה.", "On a snowy day, skip Bastion Sakwowy and use transport between the museum, Renoma and Wroclavia.", "W śnieżny dzień pomińcie Bastion Sakwowy i skorzystajcie z transportu między muzeum, Renomą i Wroclavią."),
      tips: [
        l("Panorama Racławicka פועלת בשעות כניסה קבועות; אל תאחרו.", "Panorama Racławicka uses timed entry; do not arrive late.", "Panorama Racławicka ma wejścia na konkretne godziny — nie spóźnijcie się."),
        l("בחרו מרכז קניות אחד בלבד אם אינכם רוצים יום קניות ארוך.", "Choose just one shopping centre unless shopping is a priority.", "Wybierzcie jedno centrum handlowe, jeśli zakupy nie są priorytetem."),
        l("הזמינו מונית בחזרה אחרי מופע ערב אם קר או חלק.", "Take a taxi back after an evening performance if it is cold or icy.", "Po wieczornym wydarzeniu wybierzcie taksówkę, jeśli jest zimno lub ślisko.")
      ]
    }
  ];

  window.PREMIUM_STOPS = [
    stop("rynek",1,1,[51.10932,17.03167],"main","10:00","45 min",false,l("כיכר השוק","Market Square","Rynek"),"Rynek Wrocław",l("פתיחה רגועה בין החזיתות הצבעוניות והקישוטים העונתיים.","A relaxed opening among colourful façades and seasonal decorations.","Spokojny początek wśród kolorowych kamienic i świątecznych dekoracji."),l("הקיפו את הכיכר לפני שהעומס גדל.","Walk around the square before it gets busy.","Obejdźcie Rynek, zanim zrobi się tłoczno.")),
    stop("town-hall",1,2,[51.10993,17.03170],"architecture","10:50","20 min",false,l("בית העירייה העתיק","Old Town Hall","Stary Ratusz"),"Stary Ratusz",l("מבנה גותי מרשים בלב הכיכר, יפה במיוחד בעיטורי החורף.","An impressive Gothic landmark, especially attractive with winter decorations.","Imponujący gotycki zabytek, szczególnie piękny w zimowej oprawie."),l("הקיפו את המבנה בלי למהר.","Walk around the building without rushing.","Obejdźcie budynek bez pośpiechu.")),
    stop("jas-malgosia",1,3,[51.11091,17.03027],"architecture","11:20","20 min",false,l("בתי הנזל וגרטל","Hansel and Gretel Houses","Kamieniczki Jaś i Małgosia"),"Jaś i Małgosia",l("שני בתים צרים המחוברים בקשת ליד כנסיית אליזבת.","Two narrow houses joined by an arch beside St Elizabeth’s Church.","Dwie wąskie kamieniczki połączone bramą obok kościoła św. Elżbiety."),l("זו עצירת צילום קצרה ונוחה.","This is a short, easy photo stop.","To krótki i łatwy przystanek na zdjęcia.")),
    stop("elizabeth",1,4,[51.11108,17.03016],"viewpoint","11:45","30 min",true,l("כנסיית אליזבת","St Elizabeth’s Church","Kościół św. Elżbiety"),"Bazylika św. Elżbiety",l("הכנסייה עצמה שווה ביקור; העלייה למגדל כוללת מדרגות רבות.","The church itself is worth visiting; the tower requires many stairs.","Sam kościół jest wart odwiedzenia; wejście na wieżę wymaga pokonania wielu schodów."),l("למסלול נוח הישארו במפלס הרחוב.","For an easy route, remain at street level.","Dla wygodnej trasy pozostańcie na poziomie ulicy.")),
    stop("jatki",1,5,[51.11184,17.03024],"special","12:30","25 min",false,l("סמטת יאטקי","Jatki Alley","Stare Jatki"),"Stare Jatki",l("סמטה היסטורית קטנה עם גלריות ופסלי בעלי החיים.","A small historic alley with galleries and its animal monument.","Mała historyczna uliczka z galeriami i pomnikiem zwierząt."),l("אחרי התחנה עצרו לארוחה חמה.","Take a warm lunch break after this stop.","Po tym przystanku zróbcie przerwę na ciepły posiłek.")),
    stop("christmas-market",1,6,[51.10942,17.03202],"special","15:30","90 min",false,l("שוק חג המולד","Wrocław Christmas Market","Jarmark Bożonarodzeniowy"),"Wrocławski Jarmark Bożonarodzeniowy",l("חוזרים לכיכר כשהאורות נדלקים, לדוכנים, משקה חם ואווירת חג.","Return as the lights come on for stalls, a warm drink and Christmas atmosphere.","Wróćcie po zapaleniu świateł na stoiska, ciepły napój i świąteczną atmosferę."),l("שמרו חפצים קרוב לגוף והיזהרו במעברים הצפופים.","Keep belongings close and take care in crowded passages.","Trzymajcie rzeczy blisko siebie i uważajcie w tłocznych przejściach.")),
    stop("dominikan",1,7,[51.10802,17.04086],"shopping","17:30","45 min",true,l("Galeria Dominikańska – התחממות","Galeria Dominikańska warm-up","Galeria Dominikańska – przerwa w cieple"),"Galeria Dominikańska",l("תחנת רשות לשירותים, אוכל והתחממות לפני החזרה למלון.","An optional warm stop for toilets, food and a rest before returning to the hotel.","Opcjonalny ciepły przystanek na toaletę, jedzenie i odpoczynek przed powrotem do hotelu."),l("דלגו אם מזג האוויר נוח והאנרגיה טובה.","Skip it if the weather is comfortable and energy is good.","Pomińcie, jeśli pogoda jest dobra i macie energię.")),

    stop("university",2,1,[51.11399,17.03393],"culture","09:45","35 min",false,l("אוניברסיטת ורוצלב","University of Wrocław","Uniwersytet Wrocławski"),"Uniwersytet Wrocławski",l("מתחם בארוקי חשוב ופתיחה מקורה ונוחה ליום החורפי.","An important Baroque complex and a comfortable indoor start to the winter day.","Ważny barokowy kompleks i wygodny, ciepły początek zimowego dnia."),l("בדקו את מסלול הכניסה לפני הביקור.","Check the visitor entrance route in advance.","Sprawdźcie wcześniej trasę wejścia dla zwiedzających.")),
    stop("aula",2,2,[51.11371,17.03362],"culture","10:25","35 min",true,l("Aula Leopoldina","Aula Leopoldina","Aula Leopoldina"),"Aula Leopoldina",l("אולם בארוקי מפואר בתוך האוניברסיטה, בכפוף לשעות הפתיחה.","A magnificent Baroque hall inside the university, subject to opening hours.","Wspaniała barokowa aula na uniwersytecie, zależna od godzin otwarcia."),l("העדיפו אותה על המגדל ביום קר או חלק.","Prefer it to the tower on a cold or icy day.","W zimny lub śliski dzień wybierzcie ją zamiast wieży.")),
    stop("math-tower",2,3,[51.11391,17.03329],"viewpoint","11:10","30 min",true,l("מגדל המתמטיקה","Mathematical Tower","Wieża Matematyczna"),"Wieża Matematyczna",l("תצפית עירונית הכוללת מדרגות; מתאימה רק אם מזג האוויר והיכולת מאפשרים.","A city viewpoint involving stairs; choose it only if weather and mobility allow.","Punkt widokowy ze schodami; wybierzcie go tylko przy dobrej pogodzie i samopoczuciu."),l("אין צורך לבצע גם את המגדל וגם את Aula Leopoldina.","There is no need to do both the tower and Aula Leopoldina.","Nie trzeba zwiedzać zarówno wieży, jak i Auli Leopoldina.")),
    stop("ossolineum",2,4,[51.11343,17.03657],"culture","12:00","25 min",false,l("Ossolineum והחצר","Ossolineum and courtyard","Ossolineum i dziedziniec"),"Zakład Narodowy im. Ossolińskich",l("מוסד לאומי שנוסד בלבוב ב־1817 ושומר ספרים, כתבי יד ואוצרות תרבות פולניים; עצירה שקטה וקלה בדרך מזרחה.","A national institution founded in Lviv in 1817, preserving books, manuscripts and treasures of Polish culture; a quiet, low-effort stop on the way east.","Narodowa instytucja założona we Lwowie w 1817 roku, przechowująca książki, rękopisy i skarby polskiej kultury; spokojny, niewymagający przystanek po drodze na wschód."),l("עברו דרך השער אם החצר פתוחה; אם היא סגורה, ראו את החזית והמשיכו בלי להתעכב בקור.","Enter through the gate if the courtyard is open; if closed, see the façade and continue without waiting in the cold.","Jeśli dziedziniec jest otwarty, wejdźcie przez bramę; jeśli nie, zobaczcie fasadę i idźcie dalej bez czekania na zimnie.")),
    stop("hala-targowa",2,5,[51.11250,17.04075],"food","12:40","60 min",false,l("Hala Targowa","Wrocław Market Hall","Hala Targowa"),"Hala Targowa",l("שוק מקורה היסטורי שמתאים לארוחה קלה, קפה והתחממות.","A historic covered market ideal for a light meal, coffee and warming up.","Historyczna hala targowa dobra na lekki posiłek, kawę i ogrzanie się."),l("שבו לפני קטע ההליכה לאוסטרוב טומסקי.","Sit down before the walk to Ostrów Tumski.","Odpocznijcie przed spacerem na Ostrów Tumski.")),
    stop("wyspa-piasek",2,6,[51.11453,17.040199],"river","14:10","25 min",false,l("אי החול וגשר טומסקי","Sand Island and Tumski Bridge","Wyspa Piasek i Most Tumski"),"Wyspa Piasek",l("מעבר קצר בין האיים בדרך לרובע הקתדרלה.","A short passage between the islands on the way to the cathedral quarter.","Krótki odcinek między wyspami w drodze do dzielnicy katedralnej."),l("בקרח או שלג השתמשו בתחבורה וקצרו את הקטע.","Use transport and shorten this section in ice or snow.","Przy lodzie lub śniegu skorzystajcie z transportu i skróćcie ten odcinek.")),
    stop("ostrow-cathedral",2,7,[51.11422,17.04663],"architecture","15:00","75 min",false,l("אוסטרוב טומסקי והקתדרלה","Ostrów Tumski and the cathedral","Ostrów Tumski i katedra"),"Ostrów Tumski",l("רחובות שקטים, פנסי גז היסטוריים והקתדרלה המרשימה בשעת בין ערביים.","Quiet streets, historic gas lamps and the impressive cathedral around dusk.","Ciche uliczki, historyczne latarnie gazowe i imponująca katedra o zmierzchu."),l("חפשו את מדליק הפנסים, אך אל תמתינו בחוץ זמן רב בקור.","Look for the lamplighter, but do not wait outdoors too long in the cold.","Wypatrujcie latarnika, ale nie czekajcie zbyt długo na zimnie.")),

    stop("panorama",3,1,[51.11027,17.04457],"culture","10:00","45 min",false,l("Panorama Racławicka","Panorama Racławicka","Panorama Racławicka"),"Panorama Racławicka",l("ציור פנורמי עצום בביקור מתוזמן, מתאים במיוחד לבוקר חורפי.","A monumental panoramic painting with timed entry, ideal for a winter morning.","Monumentalne malowidło panoramiczne ze wstępem na konkretną godzinę, idealne na zimowy poranek."),l("הגיעו 15 דקות לפני שעת הכרטיס.","Arrive 15 minutes before the ticket time.","Przyjdźcie 15 minut przed godziną biletu.")),
    stop("national-museum",3,2,[51.11061,17.04725],"culture","11:05","75 min",true,l("המוזיאון הלאומי","National Museum in Wrocław","Muzeum Narodowe we Wrocławiu"),"Muzeum Narodowe we Wrocławiu",l("חלופה מקורה מצוינת ליום קר או גשום, במרחק קצר מהפנורמה.","An excellent indoor option for a cold or rainy day, close to the Panorama.","Świetna opcja pod dachem na zimny lub deszczowy dzień, blisko Panoramy."),l("דלגו אם אתם מעדיפים יותר זמן לקניות או להופעת ערב.","Skip it if shopping or an evening performance is a priority.","Pomińcie, jeśli wolicie więcej czasu na zakupy lub wieczorne wydarzenie.")),
    stop("bastion",3,3,[51.10519,17.03829],"viewpoint","12:45","30 min",true,l("Bastion Sakwowy","Bastion Sakwowy","Bastion Sakwowy"),"Bastion Sakwowy",l("תצפית קצרה על המרכז והחפיר, רק אם השבילים יבשים ובטוחים.","A short view over the centre and moat, only when paths are dry and safe.","Krótki widok na centrum i fosę, tylko gdy alejki są suche i bezpieczne."),l("בשלג או קרח דלגו ללא היסוס.","Skip without hesitation in snow or ice.","Przy śniegu lub lodzie pomińcie bez wahania.")),
    stop("renoma",3,4,[51.10394,17.03123],"shopping","13:30","75 min",false,l("Renoma","Renoma","Renoma"),"Renoma",l("מרכז קניות אייקוני ונוח להפסקת צהריים, קפה וקניות קלות.","An iconic shopping centre convenient for lunch, coffee and light shopping.","Ikoniczne centrum handlowe dobre na lunch, kawę i lekkie zakupy."),l("אפשר לסיים כאן אם אינכם מעוניינים בקניון נוסף.","You can finish here if another shopping centre is unnecessary.","Możecie zakończyć tutaj, jeśli nie chcecie odwiedzać kolejnego centrum.")),
    stop("culture-evening",3,5,[51.10775,17.02857],"culture","16:00","120 min",true,l("אופרה או NFM","Opera or National Forum of Music","Opera lub Narodowe Forum Muzyki"),"Opera Wrocławska / NFM",l("בחרו מראש הופעת אופרה או קונצרט חגיגי לפי התוכנית.","Choose an opera performance or festive concert in advance.","Wybierzcie wcześniej spektakl operowy lub świąteczny koncert."),l("הזמינו כרטיסים ומקומות ישיבה נגישים מראש.","Book tickets and accessible seating in advance.","Zarezerwujcie wcześniej bilety i wygodne miejsca.")),
    stop("wroclavia-station",3,6,[51.09858,17.03675],"shopping","16:30","90 min",true,l("Wroclavia ותחנת הרכבת","Wroclavia and the main station","Wroclavia i Dworzec Główny"),"Wroclavia / Wrocław Główny",l("קניון מודרני וחם ליד תחנת הרכבת המרשימה; חלופה טובה למזג אוויר קשה.","A warm modern mall beside the striking main station; a good bad-weather option.","Ciepłe nowoczesne centrum obok efektownego dworca; dobra opcja na złą pogodę."),l("הגיעו בתחבורה מ־Renoma כדי לחסוך הליכה.","Use transport from Renoma to save walking.","Przyjedźcie z Renomy komunikacją, aby ograniczyć chodzenie.")),
    stop("boguslawskiego",3,7,[51.10289,17.02979],"food","19:00","75 min",false,l("ארוחת ערב ברחוב בוגוסלבסקייגו","Dinner on Bogusławskiego Street","Kolacja przy ulicy Bogusławskiego"),"ul. Wojciecha Bogusławskiego",l("מסעדות מתחת לקשתות מסילת הרכבת, סיום נעים וחם לחופשת הכריסמס.","Restaurants beneath the railway arches for a warm, relaxed finish to the Christmas trip.","Restauracje pod arkadami kolejowymi na ciepłe, spokojne zakończenie świątecznego wyjazdu."),l("הזמינו שולחן מראש בערבי דצמבר.","Reserve a table for December evenings.","W grudniowe wieczory zarezerwujcie stolik."))
  ];

  window.PREMIUM_RECOMMENDATIONS = [
    rec("konspira",[51.10865,17.02845],"food",1,l("Konspira – אוכל פולני","Konspira – Polish food","Konspira – polskie jedzenie"),"Konspira",l("מנות פולניות ואווירה היסטורית ליד כיכר המלח.","Polish dishes and historic atmosphere near Salt Square.","Polskie dania i historyczna atmosfera przy placu Solnym.")),
    rec("charlotte",[51.10862,17.03121],"cafe",1,l("Charlotte – ארוחת בוקר","Charlotte – breakfast","Charlotte – śniadanie"),"Charlotte",l("מאפים, לחם וקפה במיקום מרכזי.","Pastries, bread and coffee in a central location.","Wypieki, pieczywo i kawa w centrum.")),
    rec("central",[51.10828,17.02460],"cafe",1,l("Central Cafe","Central Cafe","Central Cafe"),"Central Cafe",l("בית קפה נוח לארוחת בוקר או הפסקה ארוכה.","A comfortable café for breakfast or a longer rest.","Wygodna kawiarnia na śniadanie lub dłuższą przerwę.")),
    rec("wedel",[51.10942,17.03343],"dessert",1,l("E.Wedel – שוקו חם","E.Wedel – hot chocolate","E.Wedel – gorąca czekolada"),"Pijalnia Czekolady E.Wedel",l("שוקו חם וקינוחים בלב הכיכר.","Hot chocolate and desserts in the heart of the Rynek.","Gorąca czekolada i desery w sercu Rynku.")),
    rec("karmello",[51.10887,17.03230],"dessert",1,l("Karmello – שוקולד וקפה","Karmello – chocolate and coffee","Karmello – czekolada i kawa"),"Karmello Chocolatier",l("עצירת התחממות קצרה עם שוקולד וקפה.","A short warm-up stop for chocolate and coffee.","Krótka ciepła przerwa na czekoladę i kawę.")),
    rec("bulka",[51.10868,17.02370],"food",1,l("Bułka z Masłem","Bułka z Masłem","Bułka z Masłem"),"Bułka z Masłem Włodkowica",l("אוכל ובית קפה ברובע ארבע הדתות.","Food and café in the Four Denominations District.","Jedzenie i kawiarnia w Dzielnicy Czterech Wyznań.")),
    rec("sarah",[51.10877,17.02389],"food",1,l("Restauracja Sarah","Restauracja Sarah","Restauracja Sarah"),"Restauracja Sarah",l("מסעדה נעימה באזור הרובע היהודי.","A pleasant restaurant in the Jewish quarter.","Przyjemna restauracja w dzielnicy żydowskiej.")),
    rec("whiskey",[51.10904,17.03342],"food",1,l("Whiskey in the Jar","Whiskey in the Jar","Whiskey in the Jar"),"Whiskey in the Jar",l("ארוחת ערב תוססת בכיכר; מומלץ להזמין מקום.","A lively dinner on the Rynek; booking is recommended.","Żywa atmosfera na Rynku; warto zarezerwować stolik.")),
    rec("wuwa",[51.10709,17.08730],"cafe",3,l("WUWA Café – רק אם יוצאים מזרחה","WUWA Café – only if heading east","WUWA Café – tylko przy wyjeździe na wschód"),"WUWA Café",l("בית קפה נעים ליד Hala Stulecia; הגיעו בחשמלית או במונית.","A pleasant café near Centennial Hall; use a tram or taxi.","Przyjemna kawiarnia przy Hali Stulecia; dojedźcie tramwajem lub taksówką."))
  ];
})();
(function () {
  const l = (he, en, pl) => ({ he, en, pl, de: window.EXTRA_ROUTE_TRANSLATIONS?.de?.[en] || en, cs: window.EXTRA_ROUTE_TRANSLATIONS?.cs?.[en] || en });
  const stop = (id, day, order, coordinates, category, time, duration, optional, name, localName, description, tip) => ({
    id, day, order, coordinates, category, time, duration, optional, name, localName, description, tip
  });
  const rec = (id, coordinates, category, bestDay, name, localName, description) => ({ id, coordinates, category, bestDay, name, localName, description });

  window.PREMIUM_ROUTE_CONFIG = {
    storageKey: "wroc-moshe-day",
    ui: {
      he: {
        documentTitle: "וורוצלב בכריסמס – 3 ימים למשה ולבת זוגו | Wroc-love",
        brandSubtitle: "מסלול הכריסמס של משה",
        eyebrow: "וורוצלב בחורף, בקצב נוח",
        title: "שלושה ימי כריסמס. מסלול רגוע לזוג פנסיונרים.",
        subtitle: "מסלול אישי למשה ולבת זוגו: מרחקים קצרים, עצירות חמות, חלופות למזג אוויר חורפי ובלי עליות שאינן הכרחיות.",
        smartTip: "איך משתמשים במסלול בחורף",
        smartTipBody: "בחרו יום לפי מזג האוויר. התחילו מאוחר יחסית, עצרו להתחממות, ודלגו על כל תחנת רשות אם הרחובות חלקים או אם מתעייפים.",
        routeStops: "תחנות מותאמות לחורף", recommendations: "המלצות אוכל והתחממות",
        savePhone: "שמרו את מסלול הכריסמס בטלפון",
        closing: "שלושת הימים, המפות והניווט נשארים זמינים לאורך תקופת הגישה.",
        backTop: "חזרה לבחירת יום"
      },
      en: {
        documentTitle: "Christmas in Wrocław – 3 days for Moshe and his partner | Wroc-love",
        brandSubtitle: "Moshe’s Christmas route",
        eyebrow: "Winter Wrocław at a comfortable pace",
        title: "Three Christmas days. A relaxed route for a retired couple.",
        subtitle: "A personal route for Moshe and his partner: short distances, warm breaks, winter-weather alternatives and no unnecessary climbs.",
        smartTip: "How to use the winter route",
        smartTipBody: "Choose each day according to the weather. Start relatively late, warm up often and skip optional stops whenever streets are slippery or energy is low.",
        routeStops: "winter-friendly stops", recommendations: "food and warm-up picks",
        savePhone: "Save the Christmas route on your phone",
        closing: "All three days, maps and navigation remain available throughout the access period.",
        backTop: "Back to day selection"
      },
      pl: {
        documentTitle: "Boże Narodzenie we Wrocławiu – 3 dni dla Moszego i jego partnerki | Wroc-love",
        brandSubtitle: "Świąteczna trasa Moszego",
        eyebrow: "Zimowy Wrocław w wygodnym tempie",
        title: "Trzy świąteczne dni. Spokojna trasa dla pary emerytów.",
        subtitle: "Osobista trasa dla Moszego i jego partnerki: krótkie odcinki, ciepłe przerwy, alternatywy na zimową pogodę i bez zbędnych podejść.",
        smartTip: "Jak korzystać z zimowej trasy",
        smartTipBody: "Wybierajcie dzień według pogody. Zaczynajcie nieco później, róbcie przerwy w cieple i pomijajcie punkty opcjonalne przy śliskich ulicach lub zmęczeniu.",
        routeStops: "punktów dobrych zimą", recommendations: "jedzenie i ciepłe przerwy",
        savePhone: "Zapiszcie świąteczną trasę w telefonie",
        closing: "Wszystkie trzy dni, mapy i nawigacja są dostępne przez cały okres dostępu.",
        backTop: "Wróć do wyboru dnia"
      }
    }
  };

  window.PREMIUM_DAYS = [
    {
      id: 1,
      title: l("העיר העתיקה ושוק חג המולד", "Old Town and Christmas Market", "Stare Miasto i Jarmark Bożonarodzeniowy"),
      description: l("יום מעגלי וקצר בלב העיר העתיקה, עם אדריכלות, סמטאות ושוק הכריסמס בשעות האורות.", "A short circular day in the Old Town, with architecture, small lanes and the Christmas Market after the lights come on.", "Krótki, okrężny dzień na Starym Mieście: architektura, zaułki i Jarmark po zapaleniu świateł."),
      distance: "1.8 km", hours: "6–7 h", start: "10:00",
      advice: l("אל תגיעו לשוק מוקדם מדי; שמרו אותו לשעות אחר הצהריים והערב.", "Do not reach the market too early; save it for late afternoon and evening.", "Nie przychodźcie na jarmark zbyt wcześnie — zostawcie go na późne popołudnie i wieczór."),
      weather: l("בגשם או בקור חזק, האריכו את ההפסקה בבית קפה או ב־Galeria Dominikańska.", "In rain or strong cold, take a longer café break or warm up in Galeria Dominikańska.", "Przy deszczu lub silnym mrozie zróbcie dłuższą przerwę w kawiarni albo w Galerii Dominikańskiej."),
      tips: [
        l("העלייה למגדל אליזבת כוללת מדרגות רבות ואינה חלק חובה מהמסלול.", "St Elizabeth’s tower has many stairs and is not required.", "Wieża św. Elżbiety ma wiele schodów i nie jest obowiązkowa."),
        l("השוק עמוס בערב; לכו לאט והעדיפו את השוליים אם צפוף.", "The market is busy in the evening; walk slowly and use the outer lanes when crowded.", "Wieczorem jarmark jest zatłoczony; idźcie spokojnie i wybierajcie skrajne alejki."),
        l("בחרו מסעדה מראש כדי לא להמתין זמן רב בקור.", "Choose dinner in advance to avoid a long wait in the cold.", "Wybierzcie restaurację wcześniej, aby nie czekać długo na zimnie.")
      ]
    },
    {
      id: 2,
      title: l("האוניברסיטה ואוסטרוב טומסקי", "University and Ostrów Tumski", "Uniwersytet i Ostrów Tumski"),
      description: l("יום תרבותי שמתחיל במקומות מקורים ומסתיים בין הגשרים, פנסי הגז והקתדרלה.", "A cultural day beginning indoors and ending among bridges, gas lamps and the cathedral.", "Dzień kulturalny zaczynający się we wnętrzach, a kończący wśród mostów, latarni gazowych i katedry."),
      distance: "3.1 km", hours: "7 h", start: "09:45",
      advice: l("בדקו מראש את שעות Aula Leopoldina והגיעו לאוסטרוב טומסקי כחצי שעה לפני החשיכה.", "Check Aula Leopoldina’s hours and reach Ostrów Tumski about half an hour before dusk.", "Sprawdźcie godziny Auli Leopoldina i dotrzyjcie na Ostrów Tumski około pół godziny przed zmrokiem."),
      weather: l("אם המדרכות חלקות, ותרו על המגדל וקצרו את ההליכה בין האיים.", "If pavements are icy, skip the tower and shorten the island walk.", "Przy oblodzonych chodnikach pomińcie wieżę i skróćcie spacer po wyspach."),
      tips: [
        l("בחרו בין Aula Leopoldina למגדל המתמטי; אין צורך בשניהם.", "Choose either Aula Leopoldina or the Mathematical Tower; both are unnecessary.", "Wybierzcie Aulę Leopoldina albo Wieżę Matematyczną — nie trzeba zwiedzać obu."),
        l("Hala Targowa היא נקודת הצהריים וההתחממות הטובה ביום הזה.", "Hala Targowa is the best lunch and warm-up stop today.", "Hala Targowa to najlepsze miejsce na lunch i ogrzanie się."),
        l("הקתדרלה מרשימה גם מבחוץ; אין חובה לעלות לתצפית.", "The cathedral is impressive from outside; the viewpoint is optional.", "Katedra jest imponująca także z zewnątrz; punkt widokowy jest opcjonalny.")
      ]
    },
    {
      id: 3,
      title: l("מוזיאונים, קניות וערב תרבות", "Museums, shopping and a cultural evening", "Muzea, zakupy i wieczór kulturalny"),
      description: l("יום גמיש ומוגן יחסית ממזג האוויר, עם מוזיאונים, קניות נוחות ואפשרות לקונצרט או אופרה.", "A flexible, weather-protected day with museums, comfortable shopping and the option of a concert or opera.", "Elastyczny dzień dobrze chroniony przed pogodą: muzea, wygodne zakupy oraz koncert lub opera."),
      distance: "2.6 km", hours: "6–8 h", start: "10:00",
      advice: l("הזמינו מראש את Panorama Racławicka ובדקו הופעות באופרה או ב־NFM.", "Book Panorama Racławicka in advance and check the Opera or NFM programme.", "Zarezerwujcie wcześniej Panoramę Racławicką i sprawdźcie repertuar Opery lub NFM."),
      weather: l("ביום מושלג דלגו על Bastion Sakwowy ועברו בין המוזיאון, Renoma ו־Wroclavia בתחבורה.", "On a snowy day, skip Bastion Sakwowy and use transport between the museum, Renoma and Wroclavia.", "W śnieżny dzień pomińcie Bastion Sakwowy i skorzystajcie z transportu między muzeum, Renomą i Wroclavią."),
      tips: [
        l("Panorama Racławicka פועלת בשעות כניסה קבועות; אל תאחרו.", "Panorama Racławicka uses timed entry; do not arrive late.", "Panorama Racławicka ma wejścia na konkretne godziny — nie spóźnijcie się."),
        l("בחרו מרכז קניות אחד בלבד אם אינכם רוצים יום קניות ארוך.", "Choose just one shopping centre unless shopping is a priority.", "Wybierzcie jedno centrum handlowe, jeśli zakupy nie są priorytetem."),
        l("הזמינו מונית בחזרה אחרי מופע ערב אם קר או חלק.", "Take a taxi back after an evening performance if it is cold or icy.", "Po wieczornym wydarzeniu wybierzcie taksówkę, jeśli jest zimno lub ślisko.")
      ]
    }
  ];

  window.PREMIUM_STOPS = [
    stop("rynek",1,1,[51.10932,17.03167],"main","10:00","45 min",false,l("כיכר השוק","Market Square","Rynek"),"Rynek Wrocław",l("פתיחה רגועה בין החזיתות הצבעוניות והקישוטים העונתיים.","A relaxed opening among colourful façades and seasonal decorations.","Spokojny początek wśród kolorowych kamienic i świątecznych dekoracji."),l("הקיפו את הכיכר לפני שהעומס גדל.","Walk around the square before it gets busy.","Obejdźcie Rynek, zanim zrobi się tłoczno.")),
    stop("town-hall",1,2,[51.10993,17.03170],"architecture","10:50","20 min",false,l("בית העירייה העתיק","Old Town Hall","Stary Ratusz"),"Stary Ratusz",l("מבנה גותי מרשים בלב הכיכר, יפה במיוחד בעיטורי החורף.","An impressive Gothic landmark, especially attractive with winter decorations.","Imponujący gotycki zabytek, szczególnie piękny w zimowej oprawie."),l("הקיפו את המבנה בלי למהר.","Walk around the building without rushing.","Obejdźcie budynek bez pośpiechu.")),
    stop("jas-malgosia",1,3,[51.11091,17.03027],"architecture","11:20","20 min",false,l("בתי הנזל וגרטל","Hansel and Gretel Houses","Kamieniczki Jaś i Małgosia"),"Jaś i Małgosia",l("שני בתים צרים המחוברים בקשת ליד כנסיית אליזבת.","Two narrow houses joined by an arch beside St Elizabeth’s Church.","Dwie wąskie kamieniczki połączone bramą obok kościoła św. Elżbiety."),l("זו עצירת צילום קצרה ונוחה.","This is a short, easy photo stop.","To krótki i łatwy przystanek na zdjęcia.")),
    stop("elizabeth",1,4,[51.11108,17.03016],"viewpoint","11:45","30 min",true,l("כנסיית אליזבת","St Elizabeth’s Church","Kościół św. Elżbiety"),"Bazylika św. Elżbiety",l("הכנסייה עצמה שווה ביקור; העלייה למגדל כוללת מדרגות רבות.","The church itself is worth visiting; the tower requires many stairs.","Sam kościół jest wart odwiedzenia; wejście na wieżę wymaga pokonania wielu schodów."),l("למסלול נוח הישארו במפלס הרחוב.","For an easy route, remain at street level.","Dla wygodnej trasy pozostańcie na poziomie ulicy.")),
    stop("jatki",1,5,[51.11184,17.03024],"special","12:30","25 min",false,l("סמטת יאטקי","Jatki Alley","Stare Jatki"),"Stare Jatki",l("סמטה היסטורית קטנה עם גלריות ופסלי בעלי החיים.","A small historic alley with galleries and its animal monument.","Mała historyczna uliczka z galeriami i pomnikiem zwierząt."),l("אחרי התחנה עצרו לארוחה חמה.","Take a warm lunch break after this stop.","Po tym przystanku zróbcie przerwę na ciepły posiłek.")),
    stop("christmas-market",1,6,[51.10942,17.03202],"special","15:30","90 min",false,l("שוק חג המולד","Wrocław Christmas Market","Jarmark Bożonarodzeniowy"),"Wrocławski Jarmark Bożonarodzeniowy",l("חוזרים לכיכר כשהאורות נדלקים, לדוכנים, משקה חם ואווירת חג.","Return as the lights come on for stalls, a warm drink and Christmas atmosphere.","Wróćcie po zapaleniu świateł na stoiska, ciepły napój i świąteczną atmosferę."),l("שמרו חפצים קרוב לגוף והיזהרו במעברים הצפופים.","Keep belongings close and take care in crowded passages.","Trzymajcie rzeczy blisko siebie i uważajcie w tłocznych przejściach.")),
    stop("dominikan",1,7,[51.10802,17.04086],"shopping","17:30","45 min",true,l("Galeria Dominikańska – התחממות","Galeria Dominikańska warm-up","Galeria Dominikańska – przerwa w cieple"),"Galeria Dominikańska",l("תחנת רשות לשירותים, אוכל והתחממות לפני החזרה למלון.","An optional warm stop for toilets, food and a rest before returning to the hotel.","Opcjonalny ciepły przystanek na toaletę, jedzenie i odpoczynek przed powrotem do hotelu."),l("דלגו אם מזג האוויר נוח והאנרגיה טובה.","Skip it if the weather is comfortable and energy is good.","Pomińcie, jeśli pogoda jest dobra i macie energię.")),

    stop("university",2,1,[51.11399,17.03393],"culture","09:45","35 min",false,l("אוניברסיטת ורוצלב","University of Wrocław","Uniwersytet Wrocławski"),"Uniwersytet Wrocławski",l("מתחם בארוקי חשוב ופתיחה מקורה ונוחה ליום החורפי.","An important Baroque complex and a comfortable indoor start to the winter day.","Ważny barokowy kompleks i wygodny, ciepły początek zimowego dnia."),l("בדקו את מסלול הכניסה לפני הביקור.","Check the visitor entrance route in advance.","Sprawdźcie wcześniej trasę wejścia dla zwiedzających.")),
    stop("aula",2,2,[51.11371,17.03362],"culture","10:25","35 min",true,l("Aula Leopoldina","Aula Leopoldina","Aula Leopoldina"),"Aula Leopoldina",l("אולם בארוקי מפואר בתוך האוניברסיטה, בכפוף לשעות הפתיחה.","A magnificent Baroque hall inside the university, subject to opening hours.","Wspaniała barokowa aula na uniwersytecie, zależna od godzin otwarcia."),l("העדיפו אותה על המגדל ביום קר או חלק.","Prefer it to the tower on a cold or icy day.","W zimny lub śliski dzień wybierzcie ją zamiast wieży.")),
    stop("math-tower",2,3,[51.11391,17.03329],"viewpoint","11:10","30 min",true,l("מגדל המתמטיקה","Mathematical Tower","Wieża Matematyczna"),"Wieża Matematyczna",l("תצפית עירונית הכוללת מדרגות; מתאימה רק אם מזג האוויר והיכולת מאפשרים.","A city viewpoint involving stairs; choose it only if weather and mobility allow.","Punkt widokowy ze schodami; wybierzcie go tylko przy dobrej pogodzie i samopoczuciu."),l("אין צורך לבצע גם את המגדל וגם את Aula Leopoldina.","There is no need to do both the tower and Aula Leopoldina.","Nie trzeba zwiedzać zarówno wieży, jak i Auli Leopoldina.")),
    stop("ossolineum",2,4,[51.11343,17.03657],"culture","12:00","25 min",false,l("Ossolineum והחצר","Ossolineum and courtyard","Ossolineum i dziedziniec"),"Zakład Narodowy im. Ossolińskich",l("מוסד לאומי שנוסד בלבוב ב־1817 ושומר ספרים, כתבי יד ואוצרות תרבות פולניים; עצירה שקטה וקלה בדרך מזרחה.","A national institution founded in Lviv in 1817, preserving books, manuscripts and treasures of Polish culture; a quiet, low-effort stop on the way east.","Narodowa instytucja założona we Lwowie w 1817 roku, przechowująca książki, rękopisy i skarby polskiej kultury; spokojny, niewymagający przystanek po drodze na wschód."),l("עברו דרך השער אם החצר פתוחה; אם היא סגורה, ראו את החזית והמשיכו בלי להתעכב בקור.","Enter through the gate if the courtyard is open; if closed, see the façade and continue without waiting in the cold.","Jeśli dziedziniec jest otwarty, wejdźcie przez bramę; jeśli nie, zobaczcie fasadę i idźcie dalej bez czekania na zimnie.")),
    stop("hala-targowa",2,5,[51.11250,17.04075],"food","12:40","60 min",false,l("Hala Targowa","Wrocław Market Hall","Hala Targowa"),"Hala Targowa",l("שוק מקורה היסטורי שמתאים לארוחה קלה, קפה והתחממות.","A historic covered market ideal for a light meal, coffee and warming up.","Historyczna hala targowa dobra na lekki posiłek, kawę i ogrzanie się."),l("שבו לפני קטע ההליכה לאוסטרוב טומסקי.","Sit down before the walk to Ostrów Tumski.","Odpocznijcie przed spacerem na Ostrów Tumski.")),
    stop("wyspa-piasek",2,6,[51.11431,17.04327],"river","14:10","25 min",false,l("אי החול וגשר טומסקי","Sand Island and Tumski Bridge","Wyspa Piasek i Most Tumski"),"Wyspa Piasek",l("מעבר קצר בין האיים בדרך לרובע הקתדרלה.","A short passage between the islands on the way to the cathedral quarter.","Krótki odcinek między wyspami w drodze do dzielnicy katedralnej."),l("בקרח או שלג השתמשו בתחבורה וקצרו את הקטע.","Use transport and shorten this section in ice or snow.","Przy lodzie lub śniegu skorzystajcie z transportu i skróćcie ten odcinek.")),
    stop("ostrow-cathedral",2,7,[51.11422,17.04663],"architecture","15:00","75 min",false,l("אוסטרוב טומסקי והקתדרלה","Ostrów Tumski and the cathedral","Ostrów Tumski i katedra"),"Ostrów Tumski",l("רחובות שקטים, פנסי גז היסטוריים והקתדרלה המרשימה בשעת בין ערביים.","Quiet streets, historic gas lamps and the impressive cathedral around dusk.","Ciche uliczki, historyczne latarnie gazowe i imponująca katedra o zmierzchu."),l("חפשו את מדליק הפנסים, אך אל תמתינו בחוץ זמן רב בקור.","Look for the lamplighter, but do not wait outdoors too long in the cold.","Wypatrujcie latarnika, ale nie czekajcie zbyt długo na zimnie.")),

    stop("panorama",3,1,[51.11027,17.04457],"culture","10:00","45 min",false,l("Panorama Racławicka","Panorama Racławicka","Panorama Racławicka"),"Panorama Racławicka",l("ציור פנורמי עצום בביקור מתוזמן, מתאים במיוחד לבוקר חורפי.","A monumental panoramic painting with timed entry, ideal for a winter morning.","Monumentalne malowidło panoramiczne ze wstępem na konkretną godzinę, idealne na zimowy poranek."),l("הגיעו 15 דקות לפני שעת הכרטיס.","Arrive 15 minutes before the ticket time.","Przyjdźcie 15 minut przed godziną biletu.")),
    stop("national-museum",3,2,[51.11061,17.04725],"culture","11:05","75 min",true,l("המוזיאון הלאומי","National Museum in Wrocław","Muzeum Narodowe we Wrocławiu"),"Muzeum Narodowe we Wrocławiu",l("חלופה מקורה מצוינת ליום קר או גשום, במרחק קצר מהפנורמה.","An excellent indoor option for a cold or rainy day, close to the Panorama.","Świetna opcja pod dachem na zimny lub deszczowy dzień, blisko Panoramy."),l("דלגו אם אתם מעדיפים יותר זמן לקניות או להופעת ערב.","Skip it if shopping or an evening performance is a priority.","Pomińcie, jeśli wolicie więcej czasu na zakupy lub wieczorne wydarzenie.")),
    stop("bastion",3,3,[51.10519,17.03829],"viewpoint","12:45","30 min",true,l("Bastion Sakwowy","Bastion Sakwowy","Bastion Sakwowy"),"Bastion Sakwowy",l("תצפית קצרה על המרכז והחפיר, רק אם השבילים יבשים ובטוחים.","A short view over the centre and moat, only when paths are dry and safe.","Krótki widok na centrum i fosę, tylko gdy alejki są suche i bezpieczne."),l("בשלג או קרח דלגו ללא היסוס.","Skip without hesitation in snow or ice.","Przy śniegu lub lodzie pomińcie bez wahania.")),
    stop("renoma",3,4,[51.10394,17.03123],"shopping","13:30","75 min",false,l("Renoma","Renoma","Renoma"),"Renoma",l("מרכז קניות אייקוני ונוח להפסקת צהריים, קפה וקניות קלות.","An iconic shopping centre convenient for lunch, coffee and light shopping.","Ikoniczne centrum handlowe dobre na lunch, kawę i lekkie zakupy."),l("אפשר לסיים כאן אם אינכם מעוניינים בקניון נוסף.","You can finish here if another shopping centre is unnecessary.","Możecie zakończyć tutaj, jeśli nie chcecie odwiedzać kolejnego centrum.")),
    stop("culture-evening",3,5,[51.10775,17.02857],"culture","16:00","120 min",true,l("אופרה או NFM","Opera or National Forum of Music","Opera lub Narodowe Forum Muzyki"),"Opera Wrocławska / NFM",l("בחרו מראש הופעת אופרה או קונצרט חגיגי לפי התוכנית.","Choose an opera performance or festive concert in advance.","Wybierzcie wcześniej spektakl operowy lub świąteczny koncert."),l("הזמינו כרטיסים ומקומות ישיבה נגישים מראש.","Book tickets and accessible seating in advance.","Zarezerwujcie wcześniej bilety i wygodne miejsca.")),
    stop("wroclavia-station",3,6,[51.09858,17.03675],"shopping","16:30","90 min",true,l("Wroclavia ותחנת הרכבת","Wroclavia and the main station","Wroclavia i Dworzec Główny"),"Wroclavia / Wrocław Główny",l("קניון מודרני וחם ליד תחנת הרכבת המרשימה; חלופה טובה למזג אוויר קשה.","A warm modern mall beside the striking main station; a good bad-weather option.","Ciepłe nowoczesne centrum obok efektownego dworca; dobra opcja na złą pogodę."),l("הגיעו בתחבורה מ־Renoma כדי לחסוך הליכה.","Use transport from Renoma to save walking.","Przyjedźcie z Renomy komunikacją, aby ograniczyć chodzenie.")),
    stop("boguslawskiego",3,7,[51.10289,17.02979],"food","19:00","75 min",false,l("ארוחת ערב ברחוב בוגוסלבסקייגו","Dinner on Bogusławskiego Street","Kolacja przy ulicy Bogusławskiego"),"ul. Wojciecha Bogusławskiego",l("מסעדות מתחת לקשתות מסילת הרכבת, סיום נעים וחם לחופשת הכריסמס.","Restaurants beneath the railway arches for a warm, relaxed finish to the Christmas trip.","Restauracje pod arkadami kolejowymi na ciepłe, spokojne zakończenie świątecznego wyjazdu."),l("הזמינו שולחן מראש בערבי דצמבר.","Reserve a table for December evenings.","W grudniowe wieczory zarezerwujcie stolik."))
  ];

  window.PREMIUM_RECOMMENDATIONS = [
    rec("konspira",[51.10865,17.02845],"food",1,l("Konspira – אוכל פולני","Konspira – Polish food","Konspira – polskie jedzenie"),"Konspira",l("מנות פולניות ואווירה היסטורית ליד כיכר המלח.","Polish dishes and historic atmosphere near Salt Square.","Polskie dania i historyczna atmosfera przy placu Solnym.")),
    rec("charlotte",[51.10862,17.03121],"cafe",1,l("Charlotte – ארוחת בוקר","Charlotte – breakfast","Charlotte – śniadanie"),"Charlotte",l("מאפים, לחם וקפה במיקום מרכזי.","Pastries, bread and coffee in a central location.","Wypieki, pieczywo i kawa w centrum.")),
    rec("central",[51.10828,17.02460],"cafe",1,l("Central Cafe","Central Cafe","Central Cafe"),"Central Cafe",l("בית קפה נוח לארוחת בוקר או הפסקה ארוכה.","A comfortable café for breakfast or a longer rest.","Wygodna kawiarnia na śniadanie lub dłuższą przerwę.")),
    rec("wedel",[51.10942,17.03343],"dessert",1,l("E.Wedel – שוקו חם","E.Wedel – hot chocolate","E.Wedel – gorąca czekolada"),"Pijalnia Czekolady E.Wedel",l("שוקו חם וקינוחים בלב הכיכר.","Hot chocolate and desserts in the heart of the Rynek.","Gorąca czekolada i desery w sercu Rynku.")),
    rec("karmello",[51.10887,17.03230],"dessert",1,l("Karmello – שוקולד וקפה","Karmello – chocolate and coffee","Karmello – czekolada i kawa"),"Karmello Chocolatier",l("עצירת התחממות קצרה עם שוקולד וקפה.","A short warm-up stop for chocolate and coffee.","Krótka ciepła przerwa na czekoladę i kawę.")),
    rec("bulka",[51.10868,17.02370],"food",1,l("Bułka z Masłem","Bułka z Masłem","Bułka z Masłem"),"Bułka z Masłem Włodkowica",l("אוכל ובית קפה ברובע ארבע הדתות.","Food and café in the Four Denominations District.","Jedzenie i kawiarnia w Dzielnicy Czterech Wyznań.")),
    rec("sarah",[51.10877,17.02389],"food",1,l("Restauracja Sarah","Restauracja Sarah","Restauracja Sarah"),"Restauracja Sarah",l("מסעדה נעימה באזור הרובע היהודי.","A pleasant restaurant in the Jewish quarter.","Przyjemna restauracja w dzielnicy żydowskiej.")),
    rec("whiskey",[51.10904,17.03342],"food",1,l("Whiskey in the Jar","Whiskey in the Jar","Whiskey in the Jar"),"Whiskey in the Jar",l("ארוחת ערב תוססת בכיכר; מומלץ להזמין מקום.","A lively dinner on the Rynek; booking is recommended.","Żywa atmosfera na Rynku; warto zarezerwować stolik.")),
    rec("wuwa",[51.10709,17.08730],"cafe",3,l("WUWA Café – רק אם יוצאים מזרחה","WUWA Café – only if heading east","WUWA Café – tylko przy wyjeździe na wschód"),"WUWA Café",l("בית קפה נעים ליד Hala Stulecia; הגיעו בחשמלית או במונית.","A pleasant café near Centennial Hall; use a tram or taxi.","Przyjemna kawiarnia przy Hali Stulecia; dojedźcie tramwajem lub taksówką."))
  ];
})();
