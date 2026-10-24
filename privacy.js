(function () {
  "use strict";
  const content = {
    en: {
      title: "Privacy notice",
      operator: "Who operates this site",
      operatorText: "WROC-LOVE is operated by Gil Sher. Contact our team using the private request form linked below.",
      choice: "Your choice",
      choiceText: "The site works without analytics or advertising measurement. On your first visit, you can accept or reject analytics. A separate advertising choice appears if Meta Pixel is enabled. You can change or withdraw your choice at any time using the Privacy settings button on any site page. We store the choice on your device for up to 180 days.",
      analytics: "Usage analytics",
      analyticsText: "With your analytics consent, Google Analytics 4 measures page views, map and place or experience openings, product clicks, ticker clicks, and outbound link domains. Events may include site language, product and canonical place or experience IDs, and standard campaign UTM values. The site keeps the campaign values in session storage during that browser session. Google may also receive technical information such as browser and network data and set analytics cookies. No analytics tag is loaded before analytics consent.",
      marketing: "Advertising measurement",
      marketingText: "If enabled, and with your separate marketing consent, Meta Pixel measures page views and map product views to help us understand traffic from Facebook and Instagram ads. Meta may receive technical information such as browser and network data and set cookies. The site does not send Purchase or Lead events. No Meta Pixel is loaded before marketing consent.",
      providers: "Recipients and further information",
      providersText: "Google and Meta process the data received through their services under their own terms and privacy policies. Their processing may involve transfers outside the European Economic Area. Read Google's and Meta's policies for details and controls.",
      rights: "Your rights and questions",
      rightsText: "You can withdraw consent at any time. For access, correction or deletion requests, contact us using the private request form and describe your request in the notes. You may also contact your local data protection authority.",
      updated: "Updated 24 September 2026.",
    },
    he: {
      title: "מדיניות פרטיות",
      operator: "מי מפעיל את האתר",
      operatorText: "את האתר מפעיל גיל שר. אפשר לפנות לצוות דרך טופס הפנייה הפרטי המקושר בהמשך.",
      choice: "הבחירה שלכם",
      choiceText: "האתר פועל גם ללא מדידה אנליטית או מדידת פרסום. בכניסה הראשונה אפשר לאשר או לדחות מדידה אנליטית. בחירה נפרדת למדידת פרסום תופיע אם Meta Pixel יופעל. ניתן לשנות או לבטל את הבחירה בכל עת דרך כפתור הגדרות הפרטיות בכל עמוד באתר. הבחירה נשמרת במכשיר עד 180 ימים.",
      analytics: "מדידת שימוש באתר",
      analyticsText: "בהסכמתכם למדידה, Google Analytics 4 מודד צפיות בדפים, פתיחת מפות, מקומות וחוויות, לחיצות על מוצרים וידיעות, ודומיינים של קישורים חיצוניים. אירועים עשויים לכלול שפה, מזהי מוצר ומקום או חוויה קנוניים וערכי UTM של קמפיין. ערכי הקמפיין נשמרים באחסון הסשן בדפדפן. Google עשויה לקבל גם מידע טכני כגון נתוני דפדפן ורשת ולהגדיר עוגיות מדידה. תגית המדידה לא נטענת לפני הסכמה.",
      marketing: "מדידת פרסום",
      marketingText: "אם יופעל, ורק בהסכמה נפרדת לשיווק, Meta Pixel ימדוד צפיות בדפים ובמוצרי מפה כדי להבין תנועה ממודעות Facebook ו־Instagram. Meta עשויה לקבל מידע טכני כגון נתוני דפדפן ורשת ולהגדיר עוגיות. האתר אינו שולח אירועי רכישה או ליד. הפיקסל לא נטען לפני הסכמה לשיווק.",
      providers: "ספקים ומידע נוסף",
      providersText: "Google ו־Meta מעבדות מידע שמתקבל בשירותיהן לפי התנאים ומדיניות הפרטיות שלהן. העיבוד עשוי לכלול העברת מידע אל מחוץ לאזור הכלכלי האירופי. פרטים ואפשרויות שליטה מופיעים במדיניות שלהן.",
      rights: "זכויות ושאלות",
      rightsText: "אפשר לבטל הסכמה בכל עת. לבקשות עיון, תיקון או מחיקה אפשר לפנות בטופס הפרטי ולפרט את הבקשה בשדה ההערות. אפשר לפנות גם לרשות הגנת הפרטיות המקומית.",
      updated: "עודכן ב־24 בספטמבר 2026.",
    },
    pl: {
      title: "Informacja o prywatności", operator: "Operator witryny", operatorText: "Serwis WROC-LOVE prowadzi Gil Sher. Z zespołem można skontaktować się przez prywatny formularz poniżej.",
      choice: "Twój wybór", choiceText: "Strona działa bez analityki i pomiaru reklam. Przy pierwszej wizycie możesz zaakceptować lub odrzucić analitykę. Osobny wybór pomiaru reklam pojawi się, jeśli Meta Pixel zostanie włączony. Zgodę możesz zmienić lub wycofać w dowolnej chwili przyciskiem Ustawienia prywatności na każdej stronie. Wybór przechowujemy na Twoim urządzeniu do 180 dni.",
      analytics: "Analityka korzystania z witryny", analyticsText: "Za Twoją zgodą Google Analytics 4 mierzy odsłony, otwarcia map, miejsc i atrakcji, kliknięcia produktów i wiadomości oraz domeny linków zewnętrznych. Zdarzenia mogą zawierać język, identyfikatory produktu, miejsca lub atrakcji oraz standardowe parametry UTM kampanii. Parametry kampanii są przechowywane w pamięci sesji przeglądarki. Google może otrzymywać także dane techniczne przeglądarki i sieci oraz zapisywać analityczne pliki cookie. Tag nie ładuje się przed wyrażeniem zgody.",
      marketing: "Pomiar reklam", marketingText: "Jeśli zostanie włączony, i tylko za osobną zgodą, Meta Pixel będzie mierzyć odsłony stron i produktów mapowych, aby oceniać ruch z reklam Facebooka i Instagrama. Meta może otrzymywać dane techniczne przeglądarki i sieci oraz zapisywać pliki cookie. Strona nie wysyła zdarzeń Purchase ani Lead. Pixel nie ładuje się przed zgodą marketingową.",
      providers: "Odbiorcy i dalsze informacje", providersText: "Google i Meta przetwarzają otrzymane dane zgodnie ze swoimi warunkami i politykami prywatności. Przetwarzanie może obejmować przekazywanie danych poza Europejski Obszar Gospodarczy. Szczegóły i ustawienia znajdziesz w ich politykach.",
      rights: "Twoje prawa i pytania", rightsText: "Zgodę można wycofać w dowolnym momencie. W sprawie dostępu, poprawienia lub usunięcia danych skorzystaj z prywatnego formularza i opisz prośbę w uwagach. Możesz też skontaktować się z lokalnym organem ochrony danych.", updated: "Aktualizacja: 24 września 2026 r.",
    },
    de: {
      title: "Datenschutzhinweis", operator: "Betreiber", operatorText: "WROC-LOVE wird von Gil Sher betrieben. Kontaktieren Sie unser Team über das unten verlinkte private Formular.",
      choice: "Ihre Wahl", choiceText: "Die Website funktioniert ohne Analyse- oder Werbemessung. Beim ersten Besuch können Sie der Analyse zustimmen oder sie ablehnen. Eine separate Auswahl zur Werbemessung erscheint, falls Meta Pixel aktiviert wird. Über die Schaltfläche Datenschutzeinstellungen auf jeder Seite können Sie Ihre Wahl jederzeit ändern oder widerrufen. Die Wahl wird bis zu 180 Tage auf Ihrem Gerät gespeichert.",
      analytics: "Nutzungsanalyse", analyticsText: "Mit Ihrer Einwilligung misst Google Analytics 4 Seitenaufrufe, das Öffnen von Karten, Orten und Erlebnissen, Produkt- und Nachrichtenticker-Klicks sowie Domains externer Links. Ereignisse können Sprache, Produkt- und kanonische Orts- oder Erlebnis-IDs sowie Standard-UTM-Kampagnenwerte enthalten. Kampagnenwerte bleiben während der Browsersitzung im Sitzungsspeicher. Google kann außerdem technische Browser- und Netzwerkdaten erhalten und Analyse-Cookies setzen. Vor Ihrer Einwilligung wird kein Analyse-Tag geladen.",
      marketing: "Werbemessung", marketingText: "Falls aktiviert, misst Meta Pixel nur mit gesonderter Marketing-Einwilligung Seiten- und Kartenproduktaufrufe, um Zugriffe über Facebook- und Instagram-Anzeigen auszuwerten. Meta kann technische Browser- und Netzwerkdaten erhalten und Cookies setzen. Die Website sendet keine Purchase- oder Lead-Ereignisse. Vor der Marketing-Einwilligung wird Meta Pixel nicht geladen.",
      providers: "Empfänger und weitere Informationen", providersText: "Google und Meta verarbeiten erhaltene Daten nach ihren eigenen Bedingungen und Datenschutzrichtlinien. Dies kann Übermittlungen außerhalb des Europäischen Wirtschaftsraums umfassen. Einzelheiten und Kontrollmöglichkeiten finden Sie in ihren Richtlinien.",
      rights: "Ihre Rechte und Fragen", rightsText: "Sie können Ihre Einwilligung jederzeit widerrufen. Für Auskunft, Berichtigung oder Löschung nutzen Sie das private Formular und beschreiben Ihr Anliegen im Notizfeld. Sie können sich auch an Ihre örtliche Datenschutzbehörde wenden.", updated: "Stand: 24. September 2026.",
    },
    cs: {
      title: "Ochrana soukromí", operator: "Provozovatel", operatorText: "WROC-LOVE provozuje Gil Sher. Tým můžete kontaktovat pomocí soukromého formuláře níže.",
      choice: "Vaše volba", choiceText: "Web funguje bez analytiky a měření reklam. Při první návštěvě můžete analytiku přijmout nebo odmítnout. Samostatná volba měření reklam se zobrazí, pokud bude Meta Pixel aktivován. Souhlas lze kdykoli změnit nebo odvolat tlačítkem Nastavení soukromí na každé stránce. Volba se ukládá ve vašem zařízení až na 180 dní.",
      analytics: "Analýza používání webu", analyticsText: "S vaším souhlasem Google Analytics 4 měří zobrazení stránek, otevření map, míst a zážitků, kliknutí na produkty a zprávy a domény externích odkazů. Události mohou obsahovat jazyk, ID produktu, místa či zážitku a standardní hodnoty kampaně UTM. Hodnoty kampaně se během relace uchovávají v úložišti prohlížeče. Google může získat také technické údaje o prohlížeči a síti a ukládat analytické soubory cookie. Před souhlasem se analytický tag nenačítá.",
      marketing: "Měření reklam", marketingText: "Pokud bude aktivován, Meta Pixel bude pouze s odděleným marketingovým souhlasem měřit zobrazení stránek a mapových produktů pro vyhodnocení návštěv z reklam na Facebooku a Instagramu. Meta může získat technické údaje o prohlížeči a síti a ukládat cookies. Web neposílá události Purchase ani Lead. Pixel se před souhlasem nenačítá.",
      providers: "Příjemci a další informace", providersText: "Google a Meta zpracovávají získané údaje podle vlastních podmínek a zásad ochrany soukromí. Zpracování může zahrnovat předávání údajů mimo Evropský hospodářský prostor. Podrobnosti a možnosti nastavení najdete v jejich zásadách.",
      rights: "Vaše práva a dotazy", rightsText: "Souhlas můžete kdykoli odvolat. Pro přístup, opravu nebo výmaz údajů použijte soukromý formulář a popište požadavek v poznámce. Můžete také kontaktovat místní úřad pro ochranu údajů.", updated: "Aktualizováno 24. září 2026.",
    },
  };
  for(const [code,text] of Object.entries({"en": " Community contributions: email sign-in, selected submissions and files are stored privately for review. Only content you explicitly offer and the credit name you choose may become public after owner approval. The rest of your personal album is not submitted. You can withdraw a contribution in My contributions. Owner administrators can review maps and submissions. Rejected or withdrawn originals may be retained privately for recovery and handling requests; contact the team for permanent deletion. Public videos use YouTube.", "he": " הצעות תוכן מהקהילה: הכניסה במייל, ההצעות והקבצים שנבחרו נשמרים באופן פרטי לבדיקה. רק תוכן שבחרתם להציע ושם הקרדיט שבחרתם עשויים להתפרסם לאחר אישור מנהל. שאר האלבום האישי אינו נשלח. אפשר לבטל הצעה באזור התרומות שלי. מנהלי האתר יכולים לבדוק מפות והצעות. מקור שנדחה או בוטל עשוי להישמר באופן פרטי לצורכי שחזור וטיפול בפניות; למחיקה לצמיתות פנו לצוות. סרטונים ציבוריים מופעלים מיוטיוב.", "pl": " Propozycje społeczności: logowanie e-mailem, wybrane materiały i pliki są przechowywane prywatnie do oceny. Tylko wyraźnie zaoferowana treść i wybrany podpis mogą zostać opublikowane po zgodzie właściciela. Reszta albumu nie jest przesyłana. Propozycję można wycofać w Moje propozycje. Administratorzy mogą przeglądać mapy i propozycje. Odrzucone i wycofane oryginały mogą pozostać prywatnie do odzyskiwania i obsługi zgłoszeń; w celu trwałego usunięcia skontaktuj się z zespołem. Publiczne filmy korzystają z YouTube.", "de": " Community-Beiträge: E-Mail-Anmeldung, ausgewählte Vorschläge und Dateien werden privat zur Prüfung gespeichert. Nur ausdrücklich angebotene Inhalte und der gewählte Quellenname können nach Freigabe veröffentlicht werden. Der Rest des persönlichen Albums wird nicht eingereicht. Beiträge lassen sich unter Meine Beiträge zurückziehen. Eigentümer können Karten und Vorschläge prüfen. Abgelehnte oder zurückgezogene Originale können zur Wiederherstellung und Bearbeitung von Anfragen privat erhalten bleiben; für endgültige Löschung das Team kontaktieren. Öffentliche Videos nutzen YouTube.", "cs": " Komunitní příspěvky: e-mailové přihlášení, vybrané návrhy a soubory se soukromě ukládají ke kontrole. Po schválení vlastníkem lze zveřejnit pouze výslovně nabídnutý obsah a zvolené jméno autora. Zbytek osobního alba se neodesílá. Návrh lze stáhnout v Moje příspěvky. Správci mohou kontrolovat mapy a návrhy. Odmítnuté nebo stažené originály mohou zůstat soukromě pro obnovu a řešení požadavků; pro trvalé odstranění kontaktujte tým. Veřejná videa používají YouTube."}))content[code].rightsText+=text;
  const lang = new URLSearchParams(location.search).get("lang");
  const selected = content[lang] ? lang : "en";
  const t = content[selected];
  document.documentElement.lang = selected;
  document.documentElement.dir = selected === "he" ? "rtl" : "ltr";
  document.title = `${t.title} | WROC-LOVE`;
  document.querySelectorAll(".languages a").forEach((link) => { if (link.lang === selected) link.setAttribute("aria-current", "page"); });
  const article = document.getElementById("notice");
  const add = (tag, value) => { const el = document.createElement(tag); el.textContent = value; article.appendChild(el); };
  add("h1", t.title);
  for (const [heading, body] of [[t.operator,t.operatorText],[t.choice,t.choiceText],[t.analytics,t.analyticsText],[t.marketing,t.marketingText],[t.providers,t.providersText],[t.rights,t.rightsText]]) { add("h2", heading); add("p", body); }
  const links = document.createElement("p");
  links.innerHTML = '<a href="https://policies.google.com/privacy">Google Privacy Policy</a> · <a href="https://www.facebook.com/privacy/policy/">Meta Privacy Policy</a>';
  article.appendChild(links);
  const requestPrivacy = {
    he: ["בקשות למסלול אישי", "כאשר שולחים בקשה, פרטי הקשר והעדפות הטיול נשלחים לצוות ונשמרים בצד השרת לצורך טיפול בפנייה ובהצעה. אין הרשמה אוטומטית לדיוור ואין העברת פרטי הטופס לכלי המדידה. אין למלא שמות של ילדים, מספרי דרכון או פרטי תשלום. טופס פניות לצוות"],
    en: ["Personal trip requests", "When you send a request, your contact details and travel preferences are sent to our team and stored server-side to handle the request and proposal. There is no automatic newsletter signup and form contents are not sent to analytics tools. Do not enter children’s names, passport numbers or payment details. Private contact form"],
    pl: ["Zapytania o osobistą trasę", "Dane kontaktowe i preferencje podróży są przekazywane zespołowi i przechowywane na serwerze w celu obsługi zapytania i oferty. Bez automatycznego zapisu do newslettera i bez przesyłania treści formularza do narzędzi analitycznych. Nie wpisuj imion dzieci, numerów paszportów ani danych płatności. Prywatny formularz kontaktowy"],
    de: ["Anfragen für persönliche Reisen", "Kontaktdaten und Reisewünsche werden an unser Team gesendet und zur Bearbeitung der Anfrage und des Angebots serverseitig gespeichert. Keine automatische Newsletter-Anmeldung; Formularinhalte gehen nicht an Analysetools. Keine Kindernamen, Passnummern oder Zahlungsdaten eingeben. Privates Kontaktformular"],
    cs: ["Žádosti o osobní výlet", "Kontaktní údaje a cestovní preference jsou předány týmu a uloženy na serveru pro vyřízení žádosti a nabídky. Bez automatického přihlášení k newsletteru; obsah formuláře se neposílá analytickým nástrojům. Neuvádějte jména dětí, čísla pasů ani platební údaje. Soukromý kontaktní formulář"]
  };
  add("h2", requestPrivacy[selected][0]);
  add("p", requestPrivacy[selected][1]);
  const requestLink = document.createElement("a"); requestLink.href = `/personal-trip.html?lang=${selected}#request`; requestLink.textContent = requestPrivacy[selected][0]; article.appendChild(requestLink);
  add("p", t.updated);
})();
