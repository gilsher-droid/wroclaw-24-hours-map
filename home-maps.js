(()=>{
 const host=document.getElementById('home-maps');if(!host)return;
 const paths=["map", "premium", "excursions", "lifestyle", "cultural", "moshe", "guides"];
 const photos=['/assets/rynek-market-square.jpg','/assets/hala-stulecia-01.jpg','/assets/ksiaz-castle-01.jpg','/assets/food-cafes/cafe-berg-01.jpg','/assets/hala-stulecia-01.jpg','/assets/old-town-hall-wroclaw.jpg','/assets/wuwa-estate-14.jpg'];
 const copy={
  "he": {
    "heading": "בוחרים מפה, ומתחילים לגלות",
    "lead": "חמש מפות לפי הזמן והסגנון שלכם. בכל מפה מקומות, תמונות, סרטונים וקישורי ניווט.",
    "left": "גלילה שמאלה",
    "right": "גלילה ימינה",
    "open": "פתחו את המפה",
    "titles": [
      "יום ראשון בוורוצלב",
      "כמה ימים בעיר",
      "יוצאים מהעיר, או בדרך אליה",
      "אוכל, קפה ומה שביניהם",
      "העיר דרך התרבות",
      "וורוצלב בכריסמס",
      "ללכת עם המדריך שלנו"
    ],
    "descriptions": [
      "תחנות מסודרות ליום ראשון בעיר. אפשר לדלג ולעצור בדרך.",
      "מסלול לפי ימים ואזורים. בוחרים יום ומשנים לפי האנרגיה.",
      "טיולים עצמאיים ועצירות בערים בדרך לוורוצלב.",
      "מקומות לאכול, לשתות, לקנות ולישון. חיפוש חופשי במפה.",
      "מוזיאונים, אדריכלות ואמנות. בוחרים לפי העניין שלכם.",
      "מסלול עונתי לכריסמס. בדקו את מועדי האירועים לפני הנסיעה.",
      "כל המקומות בעיר עם הדרכות המדריך שלנו. בוחרים מקום, צופים ויוצאים לגלות."
    ]
  },
  "en": {
    "heading": "Choose your map. Discover your Wrocław.",
    "lead": "Five maps for different interests and trip lengths. Explore places, photos, videos and navigation.",
    "left": "Scroll left",
    "right": "Scroll right",
    "open": "Open the map",
    "titles": [
      "Your first day in Wrocław",
      "A few days in the city",
      "Beyond the city, or on your way",
      "Food, cafés and more",
      "The city through culture",
      "Christmas in Wrocław",
      "Walk with our guide"
    ],
    "descriptions": [
      "An ordered first day in the city, with room to pause or skip stops.",
      "Days organised by area. Choose a day and adapt it to your energy.",
      "Independent excursions and city stops on your way to Wrocław.",
      "Find places to eat, drink, shop and stay freely on the map.",
      "Museums, architecture and art selected around your interests.",
      "A seasonal Christmas route. Check event dates before travelling.",
      "Wrocław city places with our video guide. Choose a place, watch and explore."
    ]
  },
  "pl": {
    "heading": "Wybierz mapę i odkrywaj Wrocław",
    "lead": "Pięć map według zainteresowań i długości pobytu. Miejsca, zdjęcia, filmy i nawigacja.",
    "left": "Przewiń w lewo",
    "right": "Przewiń w prawo",
    "open": "Otwórz mapę",
    "titles": [
      "Pierwszy dzień we Wrocławiu",
      "Kilka dni w mieście",
      "Poza miastem lub po drodze",
      "Jedzenie, kawa i więcej",
      "Miasto przez kulturę",
      "Boże Narodzenie we Wrocławiu",
      "Spacer z naszym przewodnikiem"
    ],
    "descriptions": [
      "Uporządkowany pierwszy dzień z czasem na przerwy.",
      "Dni według okolic. Dopasuj plan do swojej energii.",
      "Samodzielne wycieczki i przystanki w miastach w drodze do Wrocławia.",
      "Miejsca na jedzenie, kawę, zakupy i nocleg na mapie.",
      "Muzea, architektura i sztuka według zainteresowań.",
      "Sezonowa trasa świąteczna. Sprawdź daty wydarzeń.",
      "Miejsca we Wrocławiu z naszym przewodnikiem wideo. Wybierz miejsce, obejrzyj film i odkrywaj."
    ]
  },
  "de": {
    "heading": "Ihre Karte für Ihr Wrocław",
    "lead": "Fünf Karten für unterschiedliche Interessen und Reisedauern. Mit Orten, Fotos, Videos und Navigation.",
    "left": "Nach links scrollen",
    "right": "Nach rechts scrollen",
    "open": "Karte öffnen",
    "titles": [
      "Ihr erster Tag in Wrocław",
      "Mehrere Tage in der Stadt",
      "Ausflüge und Anreise",
      "Essen, Cafés und mehr",
      "Die Stadt durch Kultur",
      "Weihnachten in Wrocław",
      "Mit unserem Reiseführer durch Wrocław"
    ],
    "descriptions": [
      "Ein geordneter erster Tag mit Raum für Pausen.",
      "Tage nach Stadtbereichen. An Ihre Energie anpassbar.",
      "Individuelle Ausflüge und Stadtbesuche auf dem Weg nach Wrocław.",
      "Essen, Cafés, Einkauf und Unterkunft frei auf der Karte finden.",
      "Museen, Architektur und Kunst nach Ihren Interessen.",
      "Saisonale Weihnachtsroute. Veranstaltungstermine prüfen.",
      "Orte in Wrocław mit unserem Video-Reiseführer. Ort wählen, Film ansehen und entdecken."
    ]
  },
  "cs": {
    "heading": "Vyberte mapu a objevujte Vratislav",
    "lead": "Pět map podle zájmů a délky pobytu. Místa, fotografie, videa a navigace.",
    "left": "Posunout doleva",
    "right": "Posunout doprava",
    "open": "Otevřít mapu",
    "titles": [
      "První den ve Vratislavi",
      "Několik dní ve městě",
      "Mimo město nebo cestou",
      "Jídlo, káva a více",
      "Město skrze kulturu",
      "Vánoce ve Vratislavi",
      "Procházka s naším průvodcem"
    ],
    "descriptions": [
      "První den s přehledným pořadím a časem na pauzy.",
      "Dny podle oblastí. Upravte si je podle energie.",
      "Samostatné výlety a zastávky ve městech cestou do Vratislavi.",
      "Jídlo, kavárny, nákupy a ubytování volně na mapě.",
      "Muzea, architektura a umění podle zájmů.",
      "Sezonní vánoční trasa. Ověřte termíny akcí.",
      "Místa ve Vratislavi s naším videoprůvodcem. Vyberte místo, sledujte a objevujte."
    ]
  }
};
 const make=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text)e.textContent=text;return e;};
 function render(){const language=copy[document.documentElement.lang]?document.documentElement.lang:'he',c=copy[language];host.replaceChildren();const title=make('h2','',c.heading);title.id='home-maps-title';const lead=make('p','home-maps-lead',c.lead);const rail=make('div','home-maps-rail');rail.id='home-maps-rail';rail.setAttribute('aria-labelledby',title.id);
 paths.forEach((path,i)=>{if(['lifestyle','guides'].includes(path))return;const a=make('a','home-map-card');a.href='/products/interactive-maps/'+path+'.html?lang='+language;const img=make('img','');img.src=i===1?'/assets/home-map-preview/map-'+language+'.webp':photos[i];img.alt='';img.loading='lazy';img.width=540;img.height=320;const body=make('div','home-map-copy');const h=make('h3','',c.titles[i]);const p=make('p','',c.descriptions[i]);const cta=make('span','home-map-open',c.open);body.append(h,p,cta);a.append(img,body);rail.append(a);});host.append(title,lead,rail);const labels={he:["בחרו מפה לטיול שלכם","גלו את ימי הטיול"],en:["Choose your city map","Explore the excursions"],pl:["Wybierz mapę miasta","Odkryj wycieczki"],de:["Ihre Stadtkarte wählen","Ausflüge entdecken"],cs:["Vyberte mapu města","Objevte výlety"]}[language];document.querySelectorAll("[data-home-cta]").forEach(a=>{a.textContent=labels[a.dataset.homeCta==="maps"?0:1]});}
 document.addEventListener('wroc-language-change',render);render();
})();
