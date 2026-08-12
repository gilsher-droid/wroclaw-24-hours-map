(function () {
  "use strict";

  const supported = ["he", "en", "pl", "de", "cs"];
  const params = new URLSearchParams(window.location.search);
  const saved = localStorage.getItem("wroclaw24-language");
  let language = supported.includes(params.get("lang")) ? params.get("lang") : supported.includes(saved) ? saved : "he";

  const ui = {
    he: {
      brandLine: "מגלים את האזור דרך המקומות הנכונים",
      homeReturn: "חזרה לאתר הראשי",
      eyebrow: "המוצר החמישי של Wroc-love",
      title: "טיולים בשלזיה התחתונה",
      lead: "מתארחים בוורוצלב ורוצים לצאת ליום מחוץ לעיר? כאן ירוכזו בהדרגה טיולי היום שלנו ברחבי שלזיה התחתונה.",
      stateTitle: "טיולים חדשים מתווספים בהדרגה.",
      stateText: "אנחנו מכינים מסלולים המבוססים על המקומות והתוכן המקורי של WROC-LOVE. כל טיול יתפרסם כשהתחנות והמידע יהיו מוכנים.",
      foundationTitle: "בסיס למדריכי יום עצמאיים",
      foundationText: "כל טיול עתידי יוכל לכלול מפה, סדר תחנות, זמני נסיעה, מידע מעשי, תמונות וקישורי ניווט — בלי להמציא מקומות ובלי לשכפל את הקטלוג הקנוני.",
      communityLine: "מבית קהילת Wrocław & Lower Silesia",
      facebookGroup: "קבוצת הפייסבוק", facebookPage: "הדף העסקי", instagram: "אינסטגרם"
    },
    en: {
      brandLine: "Discover the region through the right places",
      homeReturn: "Back to the main site",
      eyebrow: "The fifth Wroc-love product",
      title: "Lower Silesia excursions",
      lead: "Staying in Wrocław and looking for a day beyond the city? This is where our Lower Silesia day trips will be added over time.",
      stateTitle: "New excursions are being added.",
      stateText: "We are preparing routes based on WROC-LOVE’s curated places and original content. Each excursion will be published when its stops and practical information are ready.",
      foundationTitle: "A foundation for independent day guides",
      foundationText: "Each future excursion can include a map, ordered stops, travel times, practical information, photos and navigation links — without inventing places or duplicating the canonical catalog.",
      communityLine: "By the Wrocław & Lower Silesia community",
      facebookGroup: "Facebook group", facebookPage: "Business page", instagram: "Instagram"
    },
    pl: {
      brandLine: "Odkrywaj region przez właściwe miejsca",
      homeReturn: "Wróć do strony głównej",
      eyebrow: "Piąty produkt Wroc-love",
      title: "Wycieczki po Dolnym Śląsku",
      lead: "Nocujesz we Wrocławiu i chcesz wybrać się na jeden dzień poza miasto? Tutaj stopniowo pojawią się nasze wycieczki po Dolnym Śląsku.",
      stateTitle: "Stopniowo dodajemy nowe wycieczki.",
      stateText: "Przygotowujemy trasy na podstawie wybranych miejsc i oryginalnych treści WROC-LOVE. Każda wycieczka zostanie opublikowana, gdy przystanki i informacje praktyczne będą gotowe.",
      foundationTitle: "Baza samodzielnych przewodników jednodniowych",
      foundationText: "Każda przyszła wycieczka może zawierać mapę, kolejność przystanków, czasy przejazdu, informacje praktyczne, zdjęcia i linki do nawigacji — bez wymyślania miejsc i powielania katalogu kanonicznego.",
      communityLine: "Od społeczności Wrocław & Dolny Śląsk",
      facebookGroup: "Grupa na Facebooku", facebookPage: "Strona firmowa", instagram: "Instagram"
    },
    de: {
      brandLine: "Die Region über die richtigen Orte entdecken",
      homeReturn: "Zurück zur Hauptseite",
      eyebrow: "Das fünfte Wroc-love-Produkt",
      title: "Ausflüge in Niederschlesien",
      lead: "Sie wohnen in Wrocław und möchten einen Tag außerhalb der Stadt verbringen? Hier kommen nach und nach unsere Tagesausflüge durch Niederschlesien hinzu.",
      stateTitle: "Nach und nach kommen neue Ausflüge hinzu.",
      stateText: "Wir bereiten Routen auf Grundlage der kuratierten Orte und Originalinhalte von WROC-LOVE vor. Jeder Ausflug erscheint, sobald Stationen und praktische Informationen fertig sind.",
      foundationTitle: "Eine Basis für selbstständige Tagesausflüge",
      foundationText: "Jeder künftige Ausflug kann eine Karte, geordnete Stopps, Fahrzeiten, praktische Hinweise, Fotos und Navigationslinks enthalten — ohne Orte zu erfinden oder den kanonischen Katalog zu duplizieren.",
      communityLine: "Von der Wrocław & Lower Silesia Community",
      facebookGroup: "Facebook-Gruppe", facebookPage: "Unternehmensseite", instagram: "Instagram"
    },
    cs: {
      brandLine: "Objevujte region prostřednictvím správných míst",
      homeReturn: "Zpět na hlavní stránku",
      eyebrow: "Pátý produkt Wroc-love",
      title: "Výlety po Dolním Slezsku",
      lead: "Bydlíte ve Vratislavi a chcete vyrazit na den mimo město? Zde budou postupně přibývat naše jednodenní výlety po Dolním Slezsku.",
      stateTitle: "Postupně přidáváme nové výlety.",
      stateText: "Připravujeme trasy založené na pečlivě vybraných místech a původním obsahu WROC-LOVE. Každý výlet zveřejníme, až budou zastávky a praktické informace připravené.",
      foundationTitle: "Základ samostatných jednodenních průvodců",
      foundationText: "Každý budoucí výlet může obsahovat mapu, pořadí zastávek, jízdní časy, praktické informace, fotografie a navigační odkazy — bez vymýšlení míst a duplikování kanonického katalogu.",
      communityLine: "Od komunity Wrocław & Dolní Slezsko",
      facebookGroup: "Skupina na Facebooku", facebookPage: "Firemní stránka", instagram: "Instagram"
    }
  };

  function tr(key) { return ui[language]?.[key] || ui.en[key] || key; }

  function applyLanguage(next = language) {
    language = supported.includes(next) ? next : "he";
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    localStorage.setItem("wroclaw24-language", language);
    document.title = `${tr("title")} | Wroc-love`;
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = tr(element.dataset.i18n); });
    document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === language));
    document.querySelectorAll("[data-home-link]").forEach((link) => { link.href = `/?lang=${language}`; });
    const url = new URL(location.href);
    url.searchParams.set("lang", language);
    history.replaceState(null, "", url);
  }

  document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  applyLanguage();
})();
