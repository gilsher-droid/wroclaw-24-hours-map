(() => {
  const supported = ["he", "en", "pl", "de", "cs"];
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  const saved = localStorage.getItem("wroclaw24-language");
  let language = supported.includes(requested) ? requested : supported.includes(saved) ? saved : "he";

  const translations = {
    en: {
      "מסלולים חכמים למטיילים ישראלים": "Smart routes for travellers",
      "ניווט ראשי": "Main navigation",
      "מסלול חינמי": "Free route",
      "מסלול 4 ימים": "4-day route",
      "איך זה עובד": "How it works",
      "כניסה עם קוד": "Enter with a code",
      "וורוצלב בידיים שלכם": "Wrocław in your hands",
      "פחות זמן לתכנן.": "Less time planning.",
      "יותר זמן": "More time to",
      "להתאהב בעיר.": "fall in love with the city.",
      "מסלולים אינטראקטיביים בעברית שמסדרים את היום, מחברים בין המקומות הנכונים ומשאירים מספיק מקום לגילויים שבדרך.": "Interactive routes that organise your day, connect the right places and leave room for discoveries along the way.",
      "פתחו את מסלול 24 השעות": "Open the 24-hour route",
      "הכירו את המסלול המלא": "Explore the full route",
      "יתרונות": "Benefits",
      "בעברית": "In three languages",
      "בחמש שפות": "In five languages",
      "מותאם לנייד": "Mobile friendly",
      "קישורי ניווט ישירים": "Direct navigation links",
      "תצוגה מקדימה של המסלול": "Route preview",
      "היום שלכם בוורוצלב": "Your day in Wrocław",
      "מסלול חי": "Live route",
      "התחנה הבאה": "Next stop",
      "כיכר השוק של ורוצלב": "Wrocław Market Square",
      "8 דקות הליכה": "8-minute walk",
      "4.6 ק״מ": "4.6 km",
      "מתחילים בנחת": "Start at an easy pace",
      "תחנות": "stops",
      "הליכה": "walking",
      "מתחילים בחינם": "Start for free",
      "24 שעות בוורוצלב": "24 hours in Wrocław",
      "מסלול טעימה מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים לדרך — בלי הרשמה ובלי כרטיס אשראי.": "A complete one-day sample route. Open it on your phone, choose a stop and set off — no registration or credit card.",
      "יום אחד. העיר העתיקה, הנהר ואוסטרוב טומסקי.": "One day: the Old Town, the river and Ostrów Tumski.",
      "לפתיחת המפה ←": "Open the map →",
      "המוצר הראשון של Wroc-love": "The first Wroc-love product",
      "וורוצלב – המסלול המלא ל־4 ימים": "Wrocław — the complete 4-day route",
      "ארבעה ימים מסודרים בקצב הגיוני, עם כל מה שצריך כדי ליהנות מהעיר בלי לקפוץ הלוך ושוב ובלי לבלות את החופשה בחיפושים.": "Four well-paced days with everything you need to enjoy the city without unnecessary backtracking or spending your holiday searching.",
      "יום 1": "Day 1", "יום 2": "Day 2", "יום 3": "Day 3", "יום 4": "Day 4",
      "העיר העתיקה והגמדים": "The Old Town and dwarfs",
      "מסלול ראשון נעים בין כיכר השוק, הרחובות ההיסטוריים והגמדים שאסור לפספס.": "A relaxed first route through the Market Square, historic streets and unmissable dwarfs.",
      "האוניברסיטה, הנהר ואוסטרוב טומסקי": "The university, river and Ostrów Tumski",
      "יום שמחבר תצפית, טיילת על גדת האודר והאזור העתיק והרגוע ביותר בעיר.": "A day connecting a viewpoint, the Oder promenade and the city's oldest, quietest quarter.",
      "Hydropolis, Hala Stulecia והמזרקה": "Hydropolis, Centennial Hall and the fountain",
      "מסלול מזרח העיר עם אדריכלות, פארקים, מים ומופע ערב בעונה המתאימה.": "An eastern Wrocław route with architecture, parks, water and a seasonal evening show.",
      "קניות, שיט, בתי קפה והשלמות": "Shopping, a river cruise, cafés and favourites",
      "יום גמיש שמאפשר לבחור את הקצב, להשלים מקומות ולסיים את הטיול בלי לחץ.": "A flexible day to choose your pace, revisit places and finish the trip without pressure.",
      "מחיר ותכולת החבילה": "Price and package contents",
      "מחיר השקה": "Launch price",
      "תשלום חד־פעמי · 30 ימי גישה": "One-time payment · 30 days of access",
      "ארבעה מסלולים יומיים מסודרים": "Four organised daily routes",
      "מפה אינטראקטיבית בעברית": "Interactive map in three languages",
      "מפה אינטראקטיבית בחמש שפות": "Interactive map in five languages",
      "קישורי ניווט ישירים לכל תחנה": "Direct navigation links for every stop",
      "המלצות אוכל, קפה, קינוחים וקניות": "Food, coffee, dessert and shopping recommendations",
      "זמני הליכה והצעות לקצב נוח": "Walking times and comfortable pacing",
      "עדכונים למסלול במשך תקופת הגישה": "Route updates during the access period",
      "לרכישת גישה": "Purchase access",
      "כבר רכשתם? כניסה עם קוד": "Already purchased? Enter with a code",
      "ללא מנוי וללא חידוש אוטומטי": "No subscription and no automatic renewal",
      "פשוט מהתשלום ועד הטיול": "Simple from payment to travel",
      "איך זה יעבוד?": "How does it work?",
      "רוכשים גישה": "Purchase access",
      "תשלום חד־פעמי ומאובטח למסלול שבחרתם.": "A secure one-time payment for your chosen route.",
      "מקבלים קוד למייל": "Receive a code by email",
      "בלי לזכור סיסמה ובלי לפתוח חשבון מסובך.": "No password to remember and no complicated account.",
      "מטיילים במשך 30 יום": "Travel for 30 days",
      "פותחים את המסלול מכל טלפון וחוזרים אליו מתי שרוצים.": "Open the route on any phone and return whenever you like.",
      "העיר כבר מחכה. אנחנו רק מסדרים לכם את הדרך.": "The city is waiting. We simply organise the way.",
      "התחילו במסלול החינמי": "Start the free route",
      "מבית קהילת Wrocław & Lower Silesia": "By the Wrocław & Lower Silesia community",
      "הקהילה שלנו בפייסבוק": "Our Facebook community",
      "הצטרפו לקבוצת הפייסבוק": "Join the Facebook group",
      "בקרו בדף העסקי": "Visit our Facebook page",
      "עקבו אחרינו באינסטגרם": "Follow us on Instagram",
      "המסלול שלכם לוורוצלב": "Your Wrocław route",
      "כניסה למסלול המלא": "Full-route access",
      "הזינו את קוד הגישה שקיבלתם": "Enter the access code you received",
      "הקוד מופעל בפעם הראשונה שבה משתמשים בו ומעניק גישה למשך 30 יום.": "The code activates on first use and provides access for 30 days.",
      "קוד גישה": "Access code",
      "כניסה למסלול": "Open the route",
      "עדיין אין לכם קוד?": "Don't have a code yet?",
      "אפשר לרכוש גישה מאובטחת ל־30 יום ב־49 ₪.": "Purchase secure 30-day access for ₪49.",
      "רכישת גישה": "Purchase access",
      "חזרה לפרטי המסלול": "Back to route details",
      "תשלום חד־פעמי מאובטח": "Secure one-time payment",
      "המסלול המלא ל־4 ימים בוורוצלב": "The complete 4-day Wrocław route",
      "49 ₪ בלבד. לאחר השלמת התשלום תיפתח גישה מיידית למשך 30 יום, ללא מנוי וללא חידוש אוטומטי.": "Only ₪49. After payment, immediate access opens for 30 days, with no subscription or automatic renewal.",
      "סה״כ לתשלום": "Total",
      "תשלום באמצעות PayPal": "Pay with PayPal",
      "טוענים תשלום מאובטח…": "Loading secure payment…",
      "כבר יש לכם קוד גישה?": "Already have an access code?",
      "כניסה באמצעות קוד": "Enter with a code",
      "המסלול המלא שלכם": "Your complete route",
      "גישה פעילה": "Access active",
      "יציאה": "Log out",
      "וורוצלב בקצב נכון": "Wrocław at the right pace",
      "המסלול המלא ל־4 ימים": "The complete 4-day route",
      "כל יום בנוי כאזור אחד נוח, כדי שתבלו בעיר ולא בנסיעות הלוך ושוב.": "Each day focuses on one convenient area, so you spend time in the city rather than travelling back and forth.",
      "טיפ קטן": "A small tip",
      "אפשר להחליף בין הימים לפי מזג האוויר. יום 3 מתאים במיוחד ליום נעים ויבש.": "You can swap days according to the weather. Day 3 is best on a pleasant, dry day.",
      "בחירת יום": "Choose a day",
      "היכרות רגועה עם הלב של ורוצלב, בלי למהר ועם זמן לעצירות קטנות בדרך.": "A relaxed introduction to the heart of Wrocław, with time for small stops along the way.",
      "כיכר השוק ובית העירייה": "Market Square and Town Hall",
      "מתחילים כשהכיכר עוד רגועה ומקבלים תחושה ראשונה של העיר.": "Start while the square is still calm and get your first feel for the city.",
      "ניווט ב־Google Maps": "Navigate with Google Maps",
      "מסלול גמדים קצר": "Short dwarf trail",
      "מחפשים כמה מהגמדים המוכרים סביב הכיכר, בלי להפוך את היום למרדף.": "Find a few well-known dwarfs around the square without turning the day into a race.",
      "פתיחת נקודת התחלה": "Open starting point",
      "רחוב Świdnicka ובית האופרה": "Świdnicka Street and the Opera House",
      "הליכה נעימה דרומה דרך אחד הרחובות המרכזיים של העיר.": "A pleasant walk south along one of the city's main streets.",
      "ניווט": "Navigate",
      "רובע ארבע הדתות": "Four Denominations District",
      "סמטאות, חצרות ובתי קפה באווירה שונה מהכיכר הראשית.": "Alleys, courtyards and cafés with a different atmosphere from the main square.",
      "יום של תצפית, מים והחלק העתיק והשקט ביותר של העיר.": "A day of viewpoints, water and the city's oldest, quietest quarter.",
      "אוניברסיטת ורוצלב": "University of Wrocław",
      "אם פתוח, כדאי לעלות למגדל המתמטי ולהיכנס לאולם לאופולדינה.": "If open, climb the Mathematical Tower and visit the Aula Leopoldina.",
      "Ossolineum והחצר": "Ossolineum and its courtyard",
      "פינה יפה ושקטה שרבים עוברים לידה בלי להיכנס.": "A beautiful, quiet corner many people pass without entering.",
      "איי האודר וגשרי העיר": "Oder islands and city bridges",
      "חוצים ברגל בין האיים ועוצרים לארוחה או קפה על הדרך.": "Walk between the islands and stop for a meal or coffee along the way.",
      "אוסטרוב טומסקי": "Ostrów Tumski",
      "מגיעים לקראת ערב, כשהאור רך והאזור מקבל אווירה מיוחדת.": "Arrive towards evening, when the light softens and the area gains a special atmosphere.",
      "יום במזרח העיר שמשלב מוזיאון, אדריכלות, גנים ומים.": "A day in eastern Wrocław combining a museum, architecture, gardens and water.",
      "מוזיאון אינטראקטיבי ומושקע. מומלץ להזמין שעה מראש בתקופות עמוסות.": "A polished interactive museum. Booking a time slot is recommended during busy periods.",
      "מבנה חשוב ומרשים, גם למי שאינו חובב אדריכלות.": "An important and impressive building, even for non-architecture fans.",
      "הגן היפני": "Japanese Garden",
      "הפסקה ירוקה ונעימה סמוך לאולם המאה.": "A pleasant green break beside Centennial Hall.",
      "Pergola והמזרקה המולטימדיאלית": "Pergola and Multimedia Fountain",
      "מסיימים באזור הפתוח; כדאי לבדוק את שעות המופעים העונתיות ביום הביקור.": "Finish in the open area; check the seasonal show times on the day of your visit.",
      "יום גמיש שמאפשר להשלים מה שאהבתם ולשמור זמן לנשימה.": "A flexible day to revisit favourites and leave time to breathe.",
      "מרכז קניות קטן יותר במבנה אייקוני, נוח גם לביקור קצר.": "A smaller shopping centre in an iconic building, suitable even for a short visit.",
      "למי שרוצה מבחר גדול יותר של חנויות ואוכל, סמוך לתחנה המרכזית.": "For a larger choice of shops and food, next to the main station.",
      "שיט קצר באודר": "Short Oder cruise",
      "דרך רגועה לראות את קו העיר מזווית אחרת; הפעילות תלויה בעונה ובמזג האוויר.": "A relaxed way to see the skyline from another angle; availability depends on season and weather.",
      "חיפוש נקודות יציאה": "Find departure points",
      "קפה והשלמות במרכז": "Coffee and final stops in the centre",
      "חוזרים לאזור שאהבתם או בוחרים בית קפה בלי לנסות להספיק עוד רשימה.": "Return to an area you loved or choose a café without trying to complete another list.",
      "בתי קפה בסביבה": "Nearby cafés",
      "שמרו את הדף בטלפון": "Save this page on your phone",
      "המסלול שלכם זמין לאורך תקופת הגישה.": "Your route remains available throughout the access period.",
      "חזרה ליום הראשון": "Back to Day 1"
    },
    pl: {
      "מסלולים חכמים למטיילים ישראלים": "Inteligentne trasy dla podróżnych",
      "ניווט ראשי": "Nawigacja główna",
      "מסלול חינמי": "Darmowa trasa", "מסלול 4 ימים": "Trasa 4-dniowa", "איך זה עובד": "Jak to działa", "כניסה עם קוד": "Wejście z kodem",
      "וורוצלב בידיים שלכם": "Wrocław w Twoich rękach", "פחות זמן לתכנן.": "Mniej czasu na planowanie.", "יותר זמן": "Więcej czasu, by", "להתאהב בעיר.": "zakochać się w mieście.",
      "מסלולים אינטראקטיביים בעברית שמסדרים את היום, מחברים בין המקומות הנכונים ומשאירים מספיק מקום לגילויים שבדרך.": "Interaktywne trasy porządkują dzień, łączą właściwe miejsca i zostawiają przestrzeń na odkrycia po drodze.",
      "פתחו את מסלול 24 השעות": "Otwórz trasę 24-godzinną", "הכירו את המסלול המלא": "Poznaj pełną trasę", "יתרונות": "Zalety", "בעברית": "W trzech językach", "בחמש שפות": "W pięciu językach", "מותאם לנייד": "Dostosowane do telefonu", "קישורי ניווט ישירים": "Bezpośrednie linki nawigacyjne",
      "תצוגה מקדימה של המסלול": "Podgląd trasy", "היום שלכם בוורוצלב": "Twój dzień we Wrocławiu", "מסלול חי": "Trasa na żywo", "התחנה הבאה": "Następny przystanek", "כיכר השוק של ורוצלב": "Rynek we Wrocławiu", "8 דקות הליכה": "8 minut pieszo", "4.6 ק״מ": "4,6 km", "מתחילים בנחת": "Spokojny początek", "תחנות": "przystanków", "הליכה": "pieszo",
      "מתחילים בחינם": "Zacznij bezpłatnie", "24 שעות בוורוצלב": "24 godziny we Wrocławiu", "מסלול טעימה מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים לדרך — בלי הרשמה ובלי כרטיס אשראי.": "Pełna jednodniowa trasa próbna. Otwórz ją w telefonie, wybierz przystanek i ruszaj — bez rejestracji i karty.", "יום אחד. העיר העתיקה, הנהר ואוסטרוב טומסקי.": "Jeden dzień: Stare Miasto, rzeka i Ostrów Tumski.", "לפתיחת המפה ←": "Otwórz mapę →",
      "המוצר הראשון של Wroc-love": "Pierwszy produkt Wroc-love", "וורוצלב – המסלול המלא ל־4 ימים": "Wrocław — pełna trasa na 4 dni", "ארבעה ימים מסודרים בקצב הגיוני, עם כל מה שצריך כדי ליהנות מהעיר בלי לקפוץ הלוך ושוב ובלי לבלות את החופשה בחיפושים.": "Cztery dobrze zaplanowane dni, aby cieszyć się miastem bez zbędnego krążenia i szukania informacji.",
      "יום 1": "Dzień 1", "יום 2": "Dzień 2", "יום 3": "Dzień 3", "יום 4": "Dzień 4",
      "העיר העתיקה והגמדים": "Stare Miasto i krasnale", "מסלול ראשון נעים בין כיכר השוק, הרחובות ההיסטוריים והגמדים שאסור לפספס.": "Spokojna pierwsza trasa przez Rynek, historyczne ulice i najciekawsze krasnale.",
      "האוניברסיטה, הנהר ואוסטרוב טומסקי": "Uniwersytet, rzeka i Ostrów Tumski", "יום שמחבר תצפית, טיילת על גדת האודר והאזור העתיק והרגוע ביותר בעיר.": "Dzień łączący punkt widokowy, promenadę nad Odrą i najstarszą, spokojną część miasta.",
      "Hydropolis, Hala Stulecia והמזרקה": "Hydropolis, Hala Stulecia i fontanna", "מסלול מזרח העיר עם אדריכלות, פארקים, מים ומופע ערב בעונה המתאימה.": "Trasa po wschodnim Wrocławiu z architekturą, parkami, wodą i sezonowym pokazem wieczornym.",
      "קניות, שיט, בתי קפה והשלמות": "Zakupy, rejs, kawiarnie i ulubione miejsca", "יום גמיש שמאפשר לבחור את הקצב, להשלים מקומות ולסיים את הטיול בלי לחץ.": "Elastyczny dzień pozwalający wybrać tempo i zakończyć wyjazd bez pośpiechu.",
      "מחיר ותכולת החבילה": "Cena i zawartość pakietu", "מחיר השקה": "Cena premierowa", "תשלום חד־פעמי · 30 ימי גישה": "Jednorazowa płatność · 30 dni dostępu", "ארבעה מסלולים יומיים מסודרים": "Cztery uporządkowane trasy dzienne", "מפה אינטראקטיבית בעברית": "Interaktywna mapa w trzech językach", "מפה אינטראקטיבית בחמש שפות": "Interaktywna mapa w pięciu językach", "קישורי ניווט ישירים לכל תחנה": "Bezpośrednie linki do każdego przystanku", "המלצות אוכל, קפה, קינוחים וקניות": "Polecenia jedzenia, kawy, deserów i zakupów", "זמני הליכה והצעות לקצב נוח": "Czasy przejścia i wygodne tempo", "עדכונים למסלול במשך תקופת הגישה": "Aktualizacje trasy w okresie dostępu", "לרכישת גישה": "Kup dostęp", "כבר רכשתם? כניסה עם קוד": "Masz już dostęp? Wejdź z kodem", "ללא מנוי וללא חידוש אוטומטי": "Bez abonamentu i automatycznego odnowienia",
      "פשוט מהתשלום ועד הטיול": "Prosto od płatności do podróży", "איך זה יעבוד?": "Jak to działa?", "רוכשים גישה": "Kupujesz dostęp", "תשלום חד־פעמי ומאובטח למסלול שבחרתם.": "Bezpieczna jednorazowa płatność za wybraną trasę.", "מקבלים קוד למייל": "Otrzymujesz kod e-mailem", "בלי לזכור סיסמה ובלי לפתוח חשבון מסובך.": "Bez hasła i skomplikowanego konta.", "מטיילים במשך 30 יום": "Podróżujesz przez 30 dni", "פותחים את המסלול מכל טלפון וחוזרים אליו מתי שרוצים.": "Otwierasz trasę na dowolnym telefonie i wracasz, kiedy chcesz.", "העיר כבר מחכה. אנחנו רק מסדרים לכם את הדרך.": "Miasto już czeka. My tylko porządkujemy drogę.", "התחילו במסלול החינמי": "Zacznij darmową trasę", "מבית קהילת Wrocław & Lower Silesia": "Od społeczności Wrocław & Lower Silesia", "הקהילה שלנו בפייסבוק": "Nasza społeczność na Facebooku", "הצטרפו לקבוצת הפייסבוק": "Dołącz do grupy na Facebooku", "בקרו בדף העסקי": "Odwiedź naszą stronę na Facebooku", "עקבו אחרינו באינסטגרם": "Obserwuj nas na Instagramie",
      "המסלול שלכם לוורוצלב": "Twoja trasa po Wrocławiu", "כניסה למסלול המלא": "Dostęp do pełnej trasy", "הזינו את קוד הגישה שקיבלתם": "Wpisz otrzymany kod dostępu", "הקוד מופעל בפעם הראשונה שבה משתמשים בו ומעניק גישה למשך 30 יום.": "Kod aktywuje się przy pierwszym użyciu i daje dostęp na 30 dni.", "קוד גישה": "Kod dostępu", "כניסה למסלול": "Otwórz trasę", "עדיין אין לכם קוד?": "Nie masz jeszcze kodu?", "אפשר לרכוש גישה מאובטחת ל־30 יום ב־49 ₪.": "Kup bezpieczny dostęp na 30 dni za 49 ₪.", "רכישת גישה": "Kup dostęp", "חזרה לפרטי המסלול": "Wróć do szczegółów trasy",
      "תשלום חד־פעמי מאובטח": "Bezpieczna płatność jednorazowa", "המסלול המלא ל־4 ימים בוורוצלב": "Pełna 4-dniowa trasa po Wrocławiu", "49 ₪ בלבד. לאחר השלמת התשלום תיפתח גישה מיידית למשך 30 יום, ללא מנוי וללא חידוש אוטומטי.": "Tylko 49 ₪. Po płatności otrzymasz natychmiastowy dostęp na 30 dni, bez abonamentu i automatycznego odnowienia.", "סה״כ לתשלום": "Razem", "תשלום באמצעות PayPal": "Zapłać przez PayPal", "טוענים תשלום מאובטח…": "Ładowanie bezpiecznej płatności…", "כבר יש לכם קוד גישה?": "Masz już kod dostępu?", "כניסה באמצעות קוד": "Wejdź z kodem",
      "המסלול המלא שלכם": "Twoja pełna trasa", "גישה פעילה": "Dostęp aktywny", "יציאה": "Wyloguj", "וורוצלב בקצב נכון": "Wrocław w dobrym tempie", "המסלול המלא ל־4 ימים": "Pełna trasa na 4 dni", "כל יום בנוי כאזור אחד נוח, כדי שתבלו בעיר ולא בנסיעות הלוך ושוב.": "Każdy dzień obejmuje jeden wygodny obszar, aby spędzać czas w mieście, a nie w przejazdach.", "טיפ קטן": "Mała wskazówka", "אפשר להחליף בין הימים לפי מזג האוויר. יום 3 מתאים במיוחד ליום נעים ויבש.": "Dni można zamieniać zależnie od pogody. Dzień 3 najlepiej sprawdzi się przy suchej, przyjemnej pogodzie.", "בחירת יום": "Wybór dnia",
      "היכרות רגועה עם הלב של ורוצלב, בלי למהר ועם זמן לעצירות קטנות בדרך.": "Spokojne poznawanie serca Wrocławia, z czasem na krótkie postoje.", "כיכר השוק ובית העירייה": "Rynek i Ratusz", "מתחילים כשהכיכר עוד רגועה ומקבלים תחושה ראשונה של העיר.": "Zacznij, gdy Rynek jest jeszcze spokojny, i poczuj atmosferę miasta.", "ניווט ב־Google Maps": "Nawiguj w Google Maps", "מסלול גמדים קצר": "Krótka trasa krasnali", "מחפשים כמה מהגמדים המוכרים סביב הכיכר, בלי להפוך את היום למרדף.": "Znajdź kilka znanych krasnali wokół Rynku bez zamieniania dnia w wyścig.", "פתיחת נקודת התחלה": "Otwórz punkt startowy", "רחוב Świdnicka ובית האופרה": "Ulica Świdnicka i Opera", "הליכה נעימה דרומה דרך אחד הרחובות המרכזיים של העיר.": "Przyjemny spacer na południe jedną z głównych ulic miasta.", "ניווט": "Nawiguj", "רובע ארבע הדתות": "Dzielnica Czterech Wyznań", "סמטאות, חצרות ובתי קפה באווירה שונה מהכיכר הראשית.": "Zaułki, podwórka i kawiarnie o innej atmosferze niż Rynek.",
      "יום של תצפית, מים והחלק העתיק והשקט ביותר של העיר.": "Dzień widoków, wody i najstarszej, najspokojniejszej części miasta.", "אוניברסיטת ורוצלב": "Uniwersytet Wrocławski", "אם פתוח, כדאי לעלות למגדל המתמטי ולהיכנס לאולם לאופולדינה.": "Jeśli jest otwarte, wejdź na Wieżę Matematyczną i zobacz Aulę Leopoldina.", "Ossolineum והחצר": "Ossolineum i dziedziniec", "פינה יפה ושקטה שרבים עוברים לידה בלי להיכנס.": "Piękny, spokojny zakątek, który wiele osób mija.", "איי האודר וגשרי העיר": "Wyspy odrzańskie i mosty", "חוצים ברגל בין האיים ועוצרים לארוחה או קפה על הדרך.": "Przejdź pieszo między wyspami i zatrzymaj się na posiłek lub kawę.", "אוסטרוב טומסקי": "Ostrów Tumski", "מגיעים לקראת ערב, כשהאור רך והאזור מקבל אווירה מיוחדת.": "Przyjdź pod wieczór, gdy światło mięknie, a okolica nabiera wyjątkowego klimatu.",
      "יום במזרח העיר שמשלב מוזיאון, אדריכלות, גנים ומים.": "Dzień we wschodniej części miasta: muzeum, architektura, ogrody i woda.", "מוזיאון אינטראקטיבי ומושקע. מומלץ להזמין שעה מראש בתקופות עמוסות.": "Dopracowane muzeum interaktywne. W ruchliwych okresach warto zarezerwować godzinę.", "מבנה חשוב ומרשים, גם למי שאינו חובב אדריכלות.": "Ważny i imponujący budynek, również dla osób niezainteresowanych architekturą.", "הגן היפני": "Ogród Japoński", "הפסקה ירוקה ונעימה סמוך לאולם המאה.": "Przyjemna zielona przerwa obok Hali Stulecia.", "Pergola והמזרקה המולטימדיאלית": "Pergola i Fontanna Multimedialna", "מסיימים באזור הפתוח; כדאי לבדוק את שעות המופעים העונתיות ביום הביקור.": "Zakończ w otwartej przestrzeni; sprawdź godziny sezonowych pokazów w dniu wizyty.",
      "יום גמיש שמאפשר להשלים מה שאהבתם ולשמור זמן לנשימה.": "Elastyczny dzień na ulubione miejsca i chwilę oddechu.", "מרכז קניות קטן יותר במבנה אייקוני, נוח גם לביקור קצר.": "Mniejsze centrum handlowe w ikonicznym budynku, dobre także na krótką wizytę.", "למי שרוצה מבחר גדול יותר של חנויות ואוכל, סמוך לתחנה המרכזית.": "Większy wybór sklepów i jedzenia obok dworca głównego.", "שיט קצר באודר": "Krótki rejs po Odrze", "דרך רגועה לראות את קו העיר מזווית אחרת; הפעילות תלויה בעונה ובמזג האוויר.": "Spokojny sposób na zobaczenie panoramy z innej perspektywy; rejs zależy od sezonu i pogody.", "חיפוש נקודות יציאה": "Znajdź miejsca odpłynięcia", "קפה והשלמות במרכז": "Kawa i ostatnie miejsca w centrum", "חוזרים לאזור שאהבתם או בוחרים בית קפה בלי לנסות להספיק עוד רשימה.": "Wróć do ulubionej okolicy lub wybierz kawiarnię bez kolejnej listy do zaliczenia.", "בתי קפה בסביבה": "Kawiarnie w pobliżu", "שמרו את הדף בטלפון": "Zapisz stronę w telefonie", "המסלול שלכם זמין לאורך תקופת הגישה.": "Trasa jest dostępna przez cały okres dostępu.", "חזרה ליום הראשון": "Wróć do dnia 1"
    }
  };
  Object.assign(translations.en, {
    "מסלול כריסמס": "Christmas route",
    "המוצר השלישי של Wroc-love": "The third Wroc-love product",
    "וורוצלב בכריסמס – מסלול רגוע ל־3 ימים": "Christmas in Wrocław — a relaxed 3-day route",
    "מסלול חורפי רגוע: שווקי כריסמס, העיר העתיקה, אוסטרוב טומסקי, קפה חם וזמן למנוחה בלי לרוץ בין התחנות.": "A relaxed winter route: Christmas markets, the Old Town, Ostrów Tumski, warm coffee and time to rest without rushing between stops.",
    "שוק הכריסמס והעיר העתיקה": "Christmas Market and the Old Town",
    "פתיחה נעימה בכיכר השוק, בין האורות, הדוכנים והרחובות המקושטים.": "A gentle start in the Market Square among the lights, stalls and decorated streets.",
    "האוניברסיטה ואוסטרוב טומסקי": "The university and Ostrów Tumski",
    "יום תרבותי בקצב נוח, עם מבנים היסטוריים, הנהר והאזור העתיק של העיר.": "A comfortably paced cultural day with historic buildings, the river and the city's oldest quarter.",
    "השלמות, קניות וטעמים חורפיים": "Favourite places, shopping and winter flavours",
    "יום גמיש לבתי קפה, קניות, מקומות אהובים והפסקות חמות לאורך הדרך.": "A flexible day for cafés, shopping, favourite places and warm breaks along the way.",
    "מסלול כריסמס לשלושה ימים": "Three-day Christmas route",
    "מסלול עונתי": "Seasonal route",
    "3 ימים בוורוצלב החורפית": "3 days in winter Wrocław",
    "מפה אינטראקטיבית בחמש שפות, עם תחנות מסודרות וקישורי ניווט ישירים.": "An interactive map in five languages with organised stops and direct navigation links.",
    "פתחו את מפת הכריסמס": "Open the Christmas map",
    "מתאים לזוג שמעדיף קצב רגוע ונוח.": "Designed for a couple who prefer a relaxed, comfortable pace.",
    "Wroc-love | מסלולים חכמים בוורוצלב": "Wroc-love | Smart routes in Wrocław",
    "כניסה למסלול | Wroc-love": "Route access | Wroc-love",
    "רכישת גישה | Wroc-love": "Purchase access | Wroc-love",
    "המסלול המלא ל־4 ימים | Wroc-love": "The complete 4-day route | Wroc-love",
    "הרכישה עדיין אינה פעילה. בקרוב נחבר תשלום מאובטח.": "Purchasing is not active yet. Secure payment will be available soon.",
    "בודקים את הקוד…": "Checking the code…",
    "לא הצלחנו לאמת את הקוד.": "We couldn't verify the code.",
    "הקוד אושר. מעבירים אתכם למסלול…": "Code approved. Opening your route…",
    "קוד הגישה אינו בפורמט הנכון.": "The access code format is invalid.",
    "הקוד אינו תקף. בדקו אותו ונסו שוב.": "The code is invalid. Check it and try again.",
    "תקופת הגישה של הקוד הסתיימה.": "This code's access period has expired.",
    "מערכת הגישה עדיין אינה מחוברת.": "The access system is not connected yet.",
    "אירעה שגיאה. נסו שוב.": "Something went wrong. Please try again.",
    "בחרו אמצעי תשלום להמשך:": "Choose a payment method to continue:",
    "מאשרים את התשלום ופותחים את המסלול…": "Confirming payment and opening your route…",
    "התשלום בוטל ולא בוצע חיוב.": "Payment was cancelled. You were not charged.",
    "לא הצלחנו להשלים את התשלום. נסו שוב בעוד רגע.": "We couldn't complete the payment. Please try again shortly.",
    "לא ניתן לטעון את PayPal כרגע. נסו שוב מאוחר יותר.": "PayPal cannot be loaded right now. Please try again later.",
    "התשלום עדיין אינו פעיל.": "Payment is not active yet.",
    "לא הצלחנו לפתוח את התשלום ב־PayPal.": "We couldn't start the PayPal payment.",
    "התשלום לא הושלם. לא בוצע חיוב נוסף.": "Payment was not completed. No additional charge was made.",
    "שירות האתר אינו זמין כרגע. נסו שוב מאוחר יותר.": "The service is currently unavailable. Please try again later.",
    "גישה פעילה עד": "Access active until"
  });

  Object.assign(translations.pl, {
    "מסלול כריסמס": "Trasa świąteczna",
    "המוצר השלישי של Wroc-love": "Trzeci produkt Wroc-love",
    "וורוצלב בכריסמס – מסלול רגוע ל־3 ימים": "Boże Narodzenie we Wrocławiu — spokojna trasa na 3 dni",
    "מסלול חורפי רגוע: שווקי כריסמס, העיר העתיקה, אוסטרוב טומסקי, קפה חם וזמן למנוחה בלי לרוץ בין התחנות.": "Spokojna zimowa trasa: jarmarki bożonarodzeniowe, Stare Miasto, Ostrów Tumski, gorąca kawa i czas na odpoczynek bez pośpiechu.",
    "שוק הכריסמס והעיר העתיקה": "Jarmark bożonarodzeniowy i Stare Miasto",
    "פתיחה נעימה בכיכר השוק, בין האורות, הדוכנים והרחובות המקושטים.": "Spokojny początek na Rynku pośród świateł, stoisk i udekorowanych ulic.",
    "האוניברסיטה ואוסטרוב טומסקי": "Uniwersytet i Ostrów Tumski",
    "יום תרבותי בקצב נוח, עם מבנים היסטוריים, הנהר והאזור העתיק של העיר.": "Dzień kulturalny w wygodnym tempie: zabytkowe budynki, rzeka i najstarsza część miasta.",
    "השלמות, קניות וטעמים חורפיים": "Ulubione miejsca, zakupy i zimowe smaki",
    "יום גמיש לבתי קפה, קניות, מקומות אהובים והפסקות חמות לאורך הדרך.": "Elastyczny dzień na kawiarnie, zakupy, ulubione miejsca i ciepłe przerwy po drodze.",
    "מסלול כריסמס לשלושה ימים": "Trzydniowa trasa świąteczna",
    "מסלול עונתי": "Trasa sezonowa",
    "3 ימים בוורוצלב החורפית": "3 dni w zimowym Wrocławiu",
    "מפה אינטראקטיבית בחמש שפות, עם תחנות מסודרות וקישורי ניווט ישירים.": "Interaktywna mapa w pięciu językach, z uporządkowanymi przystankami i bezpośrednimi linkami nawigacyjnymi.",
    "פתחו את מפת הכריסמס": "Otwórz mapę świąteczną",
    "מתאים לזוג שמעדיף קצב רגוע ונוח.": "Dla pary, która preferuje spokojne i wygodne tempo.",
    "Wroc-love | מסלולים חכמים בוורוצלב": "Wroc-love | Inteligentne trasy po Wrocławiu",
    "כניסה למסלול | Wroc-love": "Dostęp do trasy | Wroc-love",
    "רכישת גישה | Wroc-love": "Kup dostęp | Wroc-love",
    "המסלול המלא ל־4 ימים | Wroc-love": "Pełna trasa na 4 dni | Wroc-love",
    "הרכישה עדיין אינה פעילה. בקרוב נחבר תשלום מאובטח.": "Zakup nie jest jeszcze aktywny. Bezpieczna płatność będzie dostępna wkrótce.",
    "בודקים את הקוד…": "Sprawdzanie kodu…",
    "לא הצלחנו לאמת את הקוד.": "Nie udało się zweryfikować kodu.",
    "הקוד אושר. מעבירים אתכם למסלול…": "Kod zaakceptowany. Otwieramy trasę…",
    "קוד הגישה אינו בפורמט הנכון.": "Format kodu dostępu jest nieprawidłowy.",
    "הקוד אינו תקף. בדקו אותו ונסו שוב.": "Kod jest nieprawidłowy. Sprawdź go i spróbuj ponownie.",
    "תקופת הגישה של הקוד הסתיימה.": "Okres dostępu dla tego kodu wygasł.",
    "מערכת הגישה עדיין אינה מחוברת.": "System dostępu nie jest jeszcze podłączony.",
    "אירעה שגיאה. נסו שוב.": "Wystąpił błąd. Spróbuj ponownie.",
    "בחרו אמצעי תשלום להמשך:": "Wybierz metodę płatności:",
    "מאשרים את התשלום ופותחים את המסלול…": "Potwierdzamy płatność i otwieramy trasę…",
    "התשלום בוטל ולא בוצע חיוב.": "Płatność została anulowana. Nie pobrano opłaty.",
    "לא הצלחנו להשלים את התשלום. נסו שוב בעוד רגע.": "Nie udało się zakończyć płatności. Spróbuj ponownie za chwilę.",
    "לא ניתן לטעון את PayPal כרגע. נסו שוב מאוחר יותר.": "Nie można teraz załadować PayPal. Spróbuj ponownie później.",
    "התשלום עדיין אינו פעיל.": "Płatność nie jest jeszcze aktywna.",
    "לא הצלחנו לפתוח את התשלום ב־PayPal.": "Nie udało się rozpocząć płatności PayPal.",
    "התשלום לא הושלם. לא בוצע חיוב נוסף.": "Płatność nie została zakończona. Nie pobrano dodatkowej opłaty.",
    "שירות האתר אינו זמין כרגע. נסו שוב מאוחר יותר.": "Usługa jest obecnie niedostępna. Spróbuj ponownie później.",
    "גישה פעילה עד": "Dostęp aktywny do"
  });

  Object.assign(translations, window.EXTRA_SITE_TRANSLATIONS || {});

  const lifestyleTranslations = {
    en: {
      "אוכל, קניות ולינה": "Food, shopping & stays",
      "המוצר הרביעי של Wroc-love": "The fourth Wroc-love product",
      "לאכול, לשתות, לקנות ולישון בוורוצלב": "Eat, drink, shop and sleep in Wrocław",
      "41 מסעדות, בתי קפה, מרכזי קניות ומלונות מתוך הפוסטים המקוריים שלנו — במדריך אינטראקטיבי אחד שמציג בדיוק את מה שאתם צריכים עכשיו.": "41 restaurants, cafés, shopping centres and hotels from our original posts — in one interactive guide that shows exactly what you need now.",
      "קטגוריות במדריך": "Guide categories", "לאכול": "Eat", "מסעדות וטעמים": "Restaurants and flavours", "מהמטבח הפולני ועד ראמן, סושי, פיצה ומקומות לערב.": "From Polish cuisine to ramen, sushi, pizza and evening spots.",
      "לשתות": "Drink", "קפה, מתוקים וברים": "Coffee, sweets and bars", "עצירות טובות לקפה, קינוח, גלידה או משקה בדרך.": "Good stops for coffee, dessert, ice cream or a drink along the way.",
      "לקנות": "Shop", "מרכזי קניות": "Shopping centres", "מ־Wroclavia ו־Renoma ועד האאוטלט ומרכזים מקומיים.": "From Wroclavia and Renoma to the outlet and local centres.",
      "לישון": "Sleep", "מלונות מומלצים": "Recommended hotels", "תשעה מלונות ואזורים נוחים לביקור ראשון בעיר.": "Nine hotels and convenient areas for a first visit.",
      "מדריך אוכל, קניות ולינה": "Food, shopping and accommodation guide", "מדריך חי שמתעדכן": "A living, evolving guide", "41 מקומות. חמש שפות. מפה אחת.": "41 places. Five languages. One map.",
      "מסננים לפי צורך, מקבלים זום אוטומטי, ניווט ישיר וקישור לפוסט המקורי בדף העסקי.": "Filter by need, get automatic zoom, direct navigation and a link to the original business-page post.", "פתחו את המדריך": "Open the guide", "זמין בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Available in Hebrew, English, Polish, German and Czech."
      ,"חינם עד 31 בדצמבר 2026": "Free until 31 December 2026", "זמין בחינם כרגע בעברית, אנגלית, פולנית, גרמנית וצ׳כית. החל מ־1 בינואר 2027 תידרש רכישה או כניסה עם קוד.": "Currently free in Hebrew, English, Polish, German and Czech. From 1 January 2027, a purchase or access code will be required."
    },
    pl: {
      "אוכל, קניות ולינה": "Jedzenie, zakupy i noclegi", "המוצר הרביעי של Wroc-love": "Czwarty produkt Wroc-love", "לאכול, לשתות, לקנות ולישון בוורוצלב": "Jedz, pij, kupuj i śpij we Wrocławiu",
      "41 מסעדות, בתי קפה, מרכזי קניות ומלונות מתוך הפוסטים המקוריים שלנו — במדריך אינטראקטיבי אחד שמציג בדיוק את מה שאתם צריכים עכשיו.": "41 restauracji, kawiarni, centrów handlowych i hoteli z naszych oryginalnych postów — w jednym interaktywnym przewodniku.",
      "קטגוריות במדריך": "Kategorie przewodnika", "לאכול": "Jedzenie", "מסעדות וטעמים": "Restauracje i smaki", "מהמטבח הפולני ועד ראמן, סושי, פיצה ומקומות לערב.": "Od kuchni polskiej po ramen, sushi, pizzę i miejsca na wieczór.",
      "לשתות": "Napoje", "קפה, מתוקים וברים": "Kawa, słodkości i bary", "עצירות טובות לקפה, קינוח, גלידה או משקה בדרך.": "Dobre przystanki na kawę, deser, lody lub drinka.",
      "לקנות": "Zakupy", "מרכזי קניות": "Centra handlowe", "מ־Wroclavia ו־Renoma ועד האאוטלט ומרכזים מקומיים.": "Od Wroclavii i Renomy po outlet i lokalne centra.",
      "לישון": "Nocleg", "מלונות מומלצים": "Polecane hotele", "תשעה מלונות ואזורים נוחים לביקור ראשון בעיר.": "Dziewięć hoteli i wygodnych lokalizacji na pierwszą wizytę.",
      "מדריך אוכל, קניות ולינה": "Przewodnik po jedzeniu, zakupach i noclegach", "מדריך חי שמתעדכן": "Żywy, aktualizowany przewodnik", "41 מקומות. חמש שפות. מפה אחת.": "41 miejsc. Pięć języków. Jedna mapa.",
      "מסננים לפי צורך, מקבלים זום אוטומטי, ניווט ישיר וקישור לפוסט המקורי בדף העסקי.": "Filtruj według potrzeb, korzystaj z automatycznego przybliżenia, nawigacji i linku do oryginalnego postu.", "פתחו את המדריך": "Otwórz przewodnik", "זמין בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Dostępny po hebrajsku, angielsku, polsku, niemiecku i czesku."
      ,"חינם עד 31 בדצמבר 2026": "Bezpłatnie do 31 grudnia 2026", "זמין בחינם כרגע בעברית, אנגלית, פולנית, גרמנית וצ׳כית. החל מ־1 בינואר 2027 תידרש רכישה או כניסה עם קוד.": "Obecnie bezpłatny po hebrajsku, angielsku, polsku, niemiecku i czesku. Od 1 stycznia 2027 wymagany będzie zakup lub kod dostępu."
    },
    de: {
      "אוכל, קניות ולינה": "Essen, Einkaufen & Übernachten", "המוצר הרביעי של Wroc-love": "Das vierte Wroc-love-Produkt", "לאכול, לשתות, לקנות ולישון בוורוצלב": "Essen, trinken, einkaufen und übernachten in Wrocław",
      "41 מסעדות, בתי קפה, מרכזי קניות ומלונות מתוך הפוסטים המקוריים שלנו — במדריך אינטראקטיבי אחד שמציג בדיוק את מה שאתם צריכים עכשיו.": "41 Restaurants, Cafés, Einkaufszentren und Hotels aus unseren Originalbeiträgen — in einem interaktiven Guide.",
      "קטגוריות במדריך": "Guide-Kategorien", "לאכול": "Essen", "מסעדות וטעמים": "Restaurants und Aromen", "מהמטבח הפולני ועד ראמן, סושי, פיצה ומקומות לערב.": "Von polnischer Küche bis Ramen, Sushi, Pizza und Abendlocations.",
      "לשתות": "Trinken", "קפה, מתוקים וברים": "Kaffee, Süßes und Bars", "עצירות טובות לקפה, קינוח, גלידה או משקה בדרך.": "Gute Stopps für Kaffee, Dessert, Eis oder einen Drink.",
      "לקנות": "Einkaufen", "מרכזי קניות": "Einkaufszentren", "מ־Wroclavia ו־Renoma ועד האאוטלט ומרכזים מקומיים.": "Von Wroclavia und Renoma bis zum Outlet und lokalen Zentren.",
      "לישון": "Schlafen", "מלונות מומלצים": "Empfohlene Hotels", "תשעה מלונות ואזורים נוחים לביקור ראשון בעיר.": "Neun Hotels und günstige Lagen für den ersten Besuch.",
      "מדריך אוכל, קניות ולינה": "Guide für Essen, Einkaufen und Übernachten", "מדריך חי שמתעדכן": "Ein lebendiger, aktueller Guide", "41 מקומות. חמש שפות. מפה אחת.": "41 Orte. Fünf Sprachen. Eine Karte.",
      "מסננים לפי צורך, מקבלים זום אוטומטי, ניווט ישיר וקישור לפוסט המקורי בדף העסקי.": "Nach Bedarf filtern, automatisch zoomen, direkt navigieren und den Originalbeitrag öffnen.", "פתחו את המדריך": "Guide öffnen", "זמין בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Verfügbar auf Hebräisch, Englisch, Polnisch, Deutsch und Tschechisch."
      ,"חינם עד 31 בדצמבר 2026": "Kostenlos bis 31. Dezember 2026", "זמין בחינם כרגע בעברית, אנגלית, פולנית, גרמנית וצ׳כית. החל מ־1 בינואר 2027 תידרש רכישה או כניסה עם קוד.": "Derzeit kostenlos auf Hebräisch, Englisch, Polnisch, Deutsch und Tschechisch. Ab 1. Januar 2027 ist ein Kauf oder Zugangscode erforderlich."
    },
    cs: {
      "אוכל, קניות ולינה": "Jídlo, nákupy a ubytování", "המוצר הרביעי של Wroc-love": "Čtvrtý produkt Wroc-love", "לאכול, לשתות, לקנות ולישון בוורוצלב": "Jíst, pít, nakupovat a spát ve Vratislavi",
      "41 מסעדות, בתי קפה, מרכזי קניות ומלונות מתוך הפוסטים המקוריים שלנו — במדריך אינטראקטיבי אחד שמציג בדיוק את מה שאתם צריכים עכשיו.": "41 restaurací, kaváren, nákupních center a hotelů z našich původních příspěvků — v jednom interaktivním průvodci.",
      "קטגוריות במדריך": "Kategorie průvodce", "לאכול": "Jíst", "מסעדות וטעמים": "Restaurace a chutě", "מהמטבח הפולני ועד ראמן, סושי, פיצה ומקומות לערב.": "Od polské kuchyně po ramen, sushi, pizzu a večerní podniky.",
      "לשתות": "Pít", "קפה, מתוקים וברים": "Káva, sladkosti a bary", "עצירות טובות לקפה, קינוח, גלידה או משקה בדרך.": "Dobré zastávky na kávu, dezert, zmrzlinu nebo drink.",
      "לקנות": "Nakupovat", "מרכזי קניות": "Nákupní centra", "מ־Wroclavia ו־Renoma ועד האאוטלט ומרכזים מקומיים.": "Od Wroclavie a Renomy po outlet a místní centra.",
      "לישון": "Spát", "מלונות מומלצים": "Doporučené hotely", "תשעה מלונות ואזורים נוחים לביקור ראשון בעיר.": "Devět hotelů a vhodných lokalit pro první návštěvu.",
      "מדריך אוכל, קניות ולינה": "Průvodce jídlem, nákupy a ubytováním", "מדריך חי שמתעדכן": "Živý, aktualizovaný průvodce", "41 מקומות. חמש שפות. מפה אחת.": "41 míst. Pět jazyků. Jedna mapa.",
      "מסננים לפי צורך, מקבלים זום אוטומטי, ניווט ישיר וקישור לפוסט המקורי בדף העסקי.": "Filtrujte podle potřeby, využijte automatické přiblížení, navigaci a odkaz na původní příspěvek.", "פתחו את המדריך": "Otevřít průvodce", "זמין בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Dostupné v hebrejštině, angličtině, polštině, němčině a češtině."
      ,"חינם עד 31 בדצמבר 2026": "Zdarma do 31. prosince 2026", "זמין בחינם כרגע בעברית, אנגלית, פולנית, גרמנית וצ׳כית. החל מ־1 בינואר 2027 תידרש רכישה או כניסה עם קוד.": "Nyní zdarma v hebrejštině, angličtině, polštině, němčině a češtině. Od 1. ledna 2027 bude vyžadován nákup nebo přístupový kód."
    }
  };
  Object.entries(lifestyleTranslations).forEach(([code, values]) => Object.assign(translations[code] ||= {}, values));

  const excursionProductTranslations = {
    en: {
      "טיולים בשלזיה התחתית": "Lower Silesia excursions", "המוצר החמישי של Wroc-love": "The fifth Wroc-love product",
      "טיולי יום עצמאיים מוורוצלב ברחבי שלזיה התחתית, המבוססים על המקומות והתוכן המקורי של WROC-LOVE.": "Independent day trips from Wrocław across Lower Silesia, based on WROC-LOVE’s curated places and original content.",
      "מוצר חדש": "New product", "שלזיה התחתית, בקצב שלכם.": "Lower Silesia, at your pace.",
      "כל טיול יכלול מסלול מסודר ומידע מעשי, ויתפרסם רק כשהתחנות והתוכן יהיו מוכנים.": "Each excursion will include an organised route and practical information, and will be published only when its stops and content are ready.",
      "טיולים חדשים מתווספים בהדרגה.": "New excursions are being added.", "הבסיס למוצר כבר פתוח. הטיול הראשון יופיע כאן לאחר השלמת התוכן.": "The product foundation is now open. The first excursion will appear here when its content is ready.", "הטיול הראשון כבר פתוח.": "The first excursion is now open.", "טירת קשונז׳, Wałbrzych ושווידניצה — יום מלא של טירה, עיר היסטורית ואתר מורשת.": "Książ Castle, Wałbrzych and Świdnica — a full day of castle, historic city and heritage.", "פתחו את המוצר": "Open the product"
    },
    pl: {
      "טיולים בשלזיה התחתית": "Wycieczki po Dolnym Śląsku", "המוצר החמישי של Wroc-love": "Piąty produkt Wroc-love",
      "טיולי יום עצמאיים מוורוצלב ברחבי שלזיה התחתית, המבוססים על המקומות והתוכן המקורי של WROC-LOVE.": "Samodzielne wycieczki jednodniowe z Wrocławia po Dolnym Śląsku, oparte na wybranych miejscach i oryginalnych treściach WROC-LOVE.",
      "מוצר חדש": "Nowy produkt", "שלזיה התחתית, בקצב שלכם.": "Dolny Śląsk w Twoim tempie.",
      "כל טיול יכלול מסלול מסודר ומידע מעשי, ויתפרסם רק כשהתחנות והתוכן יהיו מוכנים.": "Każda wycieczka będzie zawierać uporządkowaną trasę i informacje praktyczne, a ukaże się dopiero po przygotowaniu przystanków i treści.",
      "טיולים חדשים מתווספים בהדרגה.": "Stopniowo dodajemy nowe wycieczki.", "הבסיס למוצר כבר פתוח. הטיול הראשון יופיע כאן לאחר השלמת התוכן.": "Podstawa produktu jest już dostępna. Pierwsza wycieczka pojawi się tutaj po przygotowaniu treści.", "הטיול הראשון כבר פתוח.": "Pierwsza wycieczka jest już dostępna.", "טירת קשונז׳, Wałbrzych ושווידניצה — יום מלא של טירה, עיר היסטורית ואתר מורשת.": "Zamek Książ, Wałbrzych i Świdnica — cały dzień zamku, historycznego miasta i dziedzictwa.", "פתחו את המוצר": "Otwórz produkt"
    },
    de: {
      "טיולים בשלזיה התחתית": "Ausflüge in Niederschlesien", "המוצר החמישי של Wroc-love": "Das fünfte Wroc-love-Produkt",
      "טיולי יום עצמאיים מוורוצלב ברחבי שלזיה התחתית, המבוססים על המקומות והתוכן המקורי של WROC-LOVE.": "Selbstständige Tagesausflüge von Wrocław durch Niederschlesien, basierend auf den kuratierten Orten und Originalinhalten von WROC-LOVE.",
      "מוצר חדש": "Neues Produkt", "שלזיה התחתית, בקצב שלכם.": "Niederschlesien in Ihrem Tempo.",
      "כל טיול יכלול מסלול מסודר ומידע מעשי, ויתפרסם רק כשהתחנות והתוכן יהיו מוכנים.": "Jeder Ausflug enthält eine geordnete Route und praktische Informationen und erscheint erst, wenn Stationen und Inhalte fertig sind.",
      "טיולים חדשים מתווספים בהדרגה.": "Nach und nach kommen neue Ausflüge hinzu.", "הבסיס למוצר כבר פתוח. הטיול הראשון יופיע כאן לאחר השלמת התוכן.": "Die Produktbasis ist jetzt verfügbar. Der erste Ausflug erscheint hier, sobald die Inhalte fertig sind.", "הטיול הראשון כבר פתוח.": "Der erste Ausflug ist jetzt verfügbar.", "טירת קשונז׳, Wałbrzych ושווידניצה — יום מלא של טירה, עיר היסטורית ואתר מורשת.": "Schloss Książ, Wałbrzych und Świdnica — ein ganzer Tag mit Schloss, historischer Stadt und Kulturerbe.", "פתחו את המוצר": "Produkt öffnen"
    },
    cs: {
      "טיולים בשלזיה התחתית": "Výlety po Dolním Slezsku", "המוצר החמישי של Wroc-love": "Pátý produkt Wroc-love",
      "טיולי יום עצמאיים מוורוצלב ברחבי שלזיה התחתית, המבוססים על המקומות והתוכן המקורי של WROC-LOVE.": "Samostatné jednodenní výlety z Vratislavi po Dolním Slezsku založené na vybraných místech a původním obsahu WROC-LOVE.",
      "מוצר חדש": "Nový produkt", "שלזיה התחתית, בקצב שלכם.": "Dolní Slezsko vaším tempem.",
      "כל טיול יכלול מסלול מסודר ומידע מעשי, ויתפרסם רק כשהתחנות והתוכן יהיו מוכנים.": "Každý výlet bude obsahovat uspořádanou trasu a praktické informace a vyjde až po dokončení zastávek a obsahu.",
      "טיולים חדשים מתווספים בהדרגה.": "Postupně přidáváme nové výlety.", "הבסיס למוצר כבר פתוח. הטיול הראשון יופיע כאן לאחר השלמת התוכן.": "Základ produktu je nyní dostupný. První výlet se zde objeví po dokončení obsahu.", "הטיול הראשון כבר פתוח.": "První výlet je nyní otevřený.", "טירת קשונז׳, Wałbrzych ושווידניצה — יום מלא של טירה, עיר היסטורית ואתר מורשת.": "Zámek Książ, Valbřich a Svídnice — celý den plný zámku, historického města a dědictví.", "פתחו את המוצר": "Otevřít produkt"
    }
  };
  Object.entries(excursionProductTranslations).forEach(([code, values]) => Object.assign(translations[code] ||= {}, values));

  const phaseOneTranslations = {
    en: {
      "תכולת המסלול": "Route contents", "כרגע ללא תשלום": "Currently free", "כל המסלולים והמפות זמינים כרגע ללא תשלום.": "All routes and maps are currently available free of charge.",
      "עדכונים שוטפים למסלול": "Ongoing route updates", "פתיחת מסלול 4 הימים": "Open the 4-day route", "פשוט בוחרים מסלול ומתחילים לטייל.": "Simply choose a route and start exploring.",
      "זמין כרגע ללא תשלום בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Currently available free of charge in Hebrew, English, Polish, German and Czech.",
      "פשוט מהבחירה ועד הטיול": "Simple from choosing to exploring", "בוחרים מסלול": "Choose a route", "מוצאים את המפה שמתאימה לסגנון ולמשך הטיול.": "Find the map that suits your travel style and trip length.",
      "פותחים מיד": "Open it instantly", "בלי הרשמה, בלי מייל, בלי קוד ובלי תשלום.": "No registration, email, code or payment.", "יוצאים לטייל": "Start exploring", "פותחים את המסלול בטלפון וחוזרים אליו מתי שרוצים.": "Open the route on your phone and return whenever you like.",
      "כל המסלולים פתוחים | Wroc-love": "All routes are open | Wroc-love", "שלב ההשקה הנוכחי": "Current launch phase", "כל המסלולים והמפות פתוחים לכולם": "All routes and maps are open to everyone",
      "אין צורך בהרשמה, במייל, בקוד גישה או בתשלום. פשוט בוחרים מסלול ומתחילים לטייל.": "No registration, email, access code or payment is required. Simply choose a route and start exploring.", "לכל המפות והמסלולים": "All maps and routes", "אין צורך בתשלום": "No payment required", "כל המסלולים והמפות זמינים כרגע ללא תשלום, ללא הרשמה וללא קוד גישה.": "All routes and maps are currently available free of charge, with no registration or access code."
    },
    pl: {
      "תכולת המסלול": "Zawartość trasy", "כרגע ללא תשלום": "Obecnie bezpłatnie", "כל המסלולים והמפות זמינים כרגע ללא תשלום.": "Wszystkie trasy i mapy są obecnie dostępne bezpłatnie.",
      "עדכונים שוטפים למסלול": "Bieżące aktualizacje trasy", "פתיחת מסלול 4 הימים": "Otwórz trasę na 4 dni", "פשוט בוחרים מסלול ומתחילים לטייל.": "Wybierz trasę i ruszaj w drogę.",
      "זמין כרגע ללא תשלום בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Obecnie dostępne bezpłatnie po hebrajsku, angielsku, polsku, niemiecku i czesku.",
      "פשוט מהבחירה ועד הטיול": "Prosto od wyboru do zwiedzania", "בוחרים מסלול": "Wybierz trasę", "מוצאים את המפה שמתאימה לסגנון ולמשך הטיול.": "Znajdź mapę dopasowaną do stylu i długości podróży.",
      "פותחים מיד": "Otwórz od razu", "בלי הרשמה, בלי מייל, בלי קוד ובלי תשלום.": "Bez rejestracji, e-maila, kodu i płatności.", "יוצאים לטייל": "Ruszaj w drogę", "פותחים את המסלול בטלפון וחוזרים אליו מתי שרוצים.": "Otwórz trasę w telefonie i wracaj do niej, kiedy chcesz.",
      "כל המסלולים פתוחים | Wroc-love": "Wszystkie trasy są otwarte | Wroc-love", "שלב ההשקה הנוכחי": "Obecna faza startowa", "כל המסלולים והמפות פתוחים לכולם": "Wszystkie trasy i mapy są otwarte dla wszystkich",
      "אין צורך בהרשמה, במייל, בקוד גישה או בתשלום. פשוט בוחרים מסלול ומתחילים לטייל.": "Nie trzeba się rejestrować, podawać e-maila, kodu ani płacić. Wybierz trasę i ruszaj.", "לכל המפות והמסלולים": "Wszystkie mapy i trasy", "אין צורך בתשלום": "Płatność nie jest wymagana", "כל המסלולים והמפות זמינים כרגע ללא תשלום, ללא הרשמה וללא קוד גישה.": "Wszystkie trasy i mapy są obecnie bezpłatne, bez rejestracji i kodu dostępu."
    },
    de: {
      "תכולת המסלול": "Routeninhalt", "כרגע ללא תשלום": "Derzeit kostenlos", "כל המסלולים והמפות זמינים כרגע ללא תשלום.": "Alle Routen und Karten sind derzeit kostenlos verfügbar.",
      "עדכונים שוטפים למסלול": "Laufende Routenaktualisierungen", "פתיחת מסלול 4 הימים": "4-Tage-Route öffnen", "פשוט בוחרים מסלול ומתחילים לטייל.": "Einfach eine Route wählen und losgehen.",
      "זמין כרגע ללא תשלום בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Derzeit kostenlos auf Hebräisch, Englisch, Polnisch, Deutsch und Tschechisch verfügbar.",
      "פשוט מהבחירה ועד הטיול": "Einfach von der Auswahl bis zur Entdeckung", "בוחרים מסלול": "Route wählen", "מוצאים את המפה שמתאימה לסגנון ולמשך הטיול.": "Finden Sie die Karte, die zu Ihrem Reisestil und Ihrer Reisedauer passt.",
      "פותחים מיד": "Sofort öffnen", "בלי הרשמה, בלי מייל, בלי קוד ובלי תשלום.": "Ohne Registrierung, E-Mail, Code oder Zahlung.", "יוצאים לטייל": "Losgehen", "פותחים את המסלול בטלפון וחוזרים אליו מתי שרוצים.": "Öffnen Sie die Route auf dem Smartphone und kehren Sie jederzeit zurück.",
      "כל המסלולים פתוחים | Wroc-love": "Alle Routen sind offen | Wroc-love", "שלב ההשקה הנוכחי": "Aktuelle Startphase", "כל המסלולים והמפות פתוחים לכולם": "Alle Routen und Karten sind für alle offen",
      "אין צורך בהרשמה, במייל, בקוד גישה או בתשלום. פשוט בוחרים מסלול ומתחילים לטייל.": "Keine Registrierung, E-Mail, Zugangscode oder Zahlung erforderlich. Einfach eine Route wählen und losgehen.", "לכל המפות והמסלולים": "Alle Karten und Routen", "אין צורך בתשלום": "Keine Zahlung erforderlich", "כל המסלולים והמפות זמינים כרגע ללא תשלום, ללא הרשמה וללא קוד גישה.": "Alle Routen und Karten sind derzeit kostenlos, ohne Registrierung oder Zugangscode verfügbar."
    },
    cs: {
      "תכולת המסלול": "Obsah trasy", "כרגע ללא תשלום": "Nyní zdarma", "כל המסלולים והמפות זמינים כרגע ללא תשלום.": "Všechny trasy a mapy jsou nyní k dispozici zdarma.",
      "עדכונים שוטפים למסלול": "Průběžné aktualizace trasy", "פתיחת מסלול 4 הימים": "Otevřít čtyřdenní trasu", "פשוט בוחרים מסלול ומתחילים לטייל.": "Stačí si vybrat trasu a vyrazit.",
      "זמין כרגע ללא תשלום בעברית, אנגלית, פולנית, גרמנית וצ׳כית.": "Nyní zdarma v hebrejštině, angličtině, polštině, němčině a češtině.",
      "פשוט מהבחירה ועד הטיול": "Jednoduše od výběru k objevování", "בוחרים מסלול": "Vyberte trasu", "מוצאים את המפה שמתאימה לסגנון ולמשך הטיול.": "Najděte mapu, která odpovídá stylu a délce vaší cesty.",
      "פותחים מיד": "Otevřete ihned", "בלי הרשמה, בלי מייל, בלי קוד ובלי תשלום.": "Bez registrace, e-mailu, kódu a platby.", "יוצאים לטייל": "Vyrazte na cestu", "פותחים את המסלול בטלפון וחוזרים אליו מתי שרוצים.": "Otevřete trasu v telefonu a vraťte se k ní kdykoli.",
      "כל המסלולים פתוחים | Wroc-love": "Všechny trasy jsou otevřené | Wroc-love", "שלב ההשקה הנוכחי": "Aktuální fáze spuštění", "כל המסלולים והמפות פתוחים לכולם": "Všechny trasy a mapy jsou otevřené pro každého",
      "אין צורך בהרשמה, במייל, בקוד גישה או בתשלום. פשוט בוחרים מסלול ומתחילים לטייל.": "Není nutná registrace, e-mail, přístupový kód ani platba. Stačí vybrat trasu a vyrazit.", "לכל המפות והמסלולים": "Všechny mapy a trasy", "אין צורך בתשלום": "Platba není nutná", "כל המסלולים והמפות זמינים כרגע ללא תשלום, ללא הרשמה וללא קוד גישה.": "Všechny trasy a mapy jsou nyní zdarma, bez registrace a přístupového kódu."
    }
  };
  Object.entries(phaseOneTranslations).forEach(([code, values]) => Object.assign(translations[code] ||= {}, values));

  const productNavigationTranslations = {
    en: {
      "כל המוצרים": "All products", "לכל המוצרים": "View all products", "מסלול ליום אחד": "One-day route",
      "מסלול מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים לדרך — בלי הרשמה ובלי כרטיס אשראי.": "A complete one-day city route. Open it on your phone, choose a stop and set off — no registration or credit card."
    },
    pl: {
      "כל המוצרים": "Wszystkie produkty", "לכל המוצרים": "Zobacz wszystkie produkty", "מסלול ליום אחד": "Trasa jednodniowa",
      "מסלול מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים לדרך — בלי הרשמה ובלי כרטיס אשראי.": "Pełna jednodniowa trasa po mieście. Otwórz ją w telefonie, wybierz przystanek i ruszaj — bez rejestracji i karty."
    },
    de: {
      "כל המוצרים": "Alle Produkte", "לכל המוצרים": "Alle Produkte ansehen", "מסלול ליום אחד": "Route für einen Tag",
      "מסלול מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים לדרך — בלי הרשמה ובלי כרטיס אשראי.": "Eine vollständige Route für einen Tag in der Stadt. Auf dem Smartphone öffnen, Station wählen und losgehen — ohne Registrierung oder Kreditkarte."
    },
    cs: {
      "כל המוצרים": "Všechny produkty", "לכל המוצרים": "Zobrazit všechny produkty", "מסלול ליום אחד": "Jednodenní trasa",
      "מסלול מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים לדרך — בלי הרשמה ובלי כרטיס אשראי.": "Kompletní jednodenní trasa městem. Otevřete ji v telefonu, vyberte zastávku a vyrazte — bez registrace a platební karty."
    }
  };
  Object.entries(productNavigationTranslations).forEach(([code, values]) => Object.assign(translations[code] ||= {}, values));

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalTitle = document.title;

  function t(text) {
    if (language === "he") return text;
    return translations[language]?.[text] || text;
  }

  function translateTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest("script, style")) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const trimmed = source.trim();
      if (!trimmed) continue;
      const translated = t(trimmed);
      node.nodeValue = source.replace(trimmed, translated);
    }
  }

  function translateAttributes() {
    document.querySelectorAll("[aria-label], [placeholder], [title]").forEach((element) => {
      if (!originalAttributes.has(element)) originalAttributes.set(element, {});
      const savedAttributes = originalAttributes.get(element);
      ["aria-label", "placeholder", "title"].forEach((name) => {
        if (!element.hasAttribute(name)) return;
        if (!(name in savedAttributes)) savedAttributes[name] = element.getAttribute(name);
        element.setAttribute(name, t(savedAttributes[name]));
      });
    });
  }

  function updateLanguageLinks() {
    document.querySelectorAll('a[href*=".html"]').forEach((link) => {
      const url = new URL(link.href, window.location.href);
      url.searchParams.set("lang", language);
      link.href = `${url.pathname}${url.search}${url.hash}`;
    });
  }

  function updateDocument() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.title = t(originalTitle);
    localStorage.setItem("wroclaw24-language", language);
    translateTextNodes();
    translateAttributes();
    updateLanguageLinks();
    document.querySelectorAll(".site-language-button").forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.dispatchEvent(new CustomEvent("wroc-language-change", { detail: { language } }));
  }

  function setLanguage(next) {
    if (!supported.includes(next)) return;
    language = next;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    history.replaceState({}, "", url);
    updateDocument();
  }

  function addSwitcher() {
    const switcher = document.createElement("div");
    switcher.className = "site-language-switcher";
    switcher.setAttribute("aria-label", "Language");
    const labels = { he: "עברית", en: "English", pl: "Polski", de: "Deutsch", cs: "Čeština" };
    switcher.innerHTML = supported.map((code) => `<button type="button" class="site-language-button" data-lang="${code}">${labels[code]}</button>`).join("");
    switcher.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-lang]");
      if (button) setLanguage(button.dataset.lang);
    });
    const header = document.querySelector(".site-header");
    if (header) {
      switcher.classList.add("site-language-switcher--header");
      header.appendChild(switcher);
    } else {
      document.body.appendChild(switcher);
    }
  }

  window.WROC_I18N = { t, get language() { return language; }, setLanguage, updateDocument };
  addSwitcher();
  updateDocument();
})();
