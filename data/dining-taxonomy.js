(function(){
 'use strict';
 const t=(he,en,pl,de,cs)=>({he,en,pl,de,cs});
 const venueTypes={
  restaurant:t('מסעדה','Restaurant','Restauracja','Restaurant','Restaurace'),
  cafe:t('בית קפה','Café','Kawiarnia','Café','Kavárna'),
  bakery:t('מאפייה','Bakery','Piekarnia','Bäckerei','Pekárna'),
  patisserie:t('קונדיטוריה','Patisserie','Cukiernia','Konditorei','Cukrárna'),
  'ice-cream':t('גלידרייה','Ice-cream shop','Lodziarnia','Eisdiele','Zmrzlinárna'),
  bar:t('בר','Bar','Bar','Bar','Bar'),
  'wine-bar':t('בר יין','Wine bar','Winiarnia','Weinbar','Vinárna'),
  pub:t('פאב או מבשלה','Pub or brewery','Pub lub browar','Pub oder Brauerei','Hospoda nebo pivovar'),
  'food-hall':t('מתחם אוכל','Food hall','Hala gastronomiczna','Foodhall','Gastronomická hala'),
  market:t('שוק','Market','Targ','Markt','Trh'),
  'beach-bar':t('ביץ׳ בר','Beach bar','Beach bar','Beachbar','Plážový bar'),
  'milk-bar':t('מילק באר','Milk bar','Bar mleczny','Milchbar','Mléčný bar'),
  takeaway:t('אוכל לקחת','Takeaway','Na wynos','Zum Mitnehmen','Jídlo s sebou'),
  'tea-room':t('בית תה','Tearoom','Herbaciarnia','Teehaus','Čajovna'),
  'chocolate-cafe':t('בית קפה ושוקולד','Chocolate café','Pijalnia czekolady','Schokoladencafé','Čokoládová kavárna')
 };
 const cuisines={
  italian:t('איטלקי','Italian','Włoska','Italienisch','Italská'),
  polish:t('פולני','Polish','Polska','Polnisch','Polská'),
  japanese:t('יפני','Japanese','Japońska','Japanisch','Japonská'),
  thai:t('תאילנדי','Thai','Tajska','Thailändisch','Thajská'),
  peruvian:t('פרואני','Peruvian','Peruwiańska','Peruanisch','Peruánská'),
  mediterranean:t('ים תיכוני','Mediterranean','Śródziemnomorska','Mediterran','Středomořská'),
  indian:t('הודי','Indian','Indyjska','Indisch','Indická'),
  georgian:t('גאורגי','Georgian','Gruzińska','Georgisch','Gruzínská'),
  chinese:t('סיני','Chinese','Chińska','Chinesisch','Čínská'),
  mexican:t('מקסיקני','Mexican','Meksykańska','Mexikanisch','Mexická'),
  french:t('צרפתי','French','Francuska','Französisch','Francouzská'),
  asian:t('אסייתי','Asian','Azjatycka','Asiatisch','Asijská'),
  international:t('בינלאומי','International','Międzynarodowa','International','Mezinárodní')
 };
 const dietary={
  vegan:t('אפשרויות טבעוניות מאומתות, כולל מקומות טבעוניים','Verified vegan choices, including vegan venues','Potwierdzone opcje wegańskie, także lokale wegańskie','Bestätigte vegane Optionen, einschließlich veganer Lokale','Ověřené veganské možnosti včetně veganských podniků'),
  vegetarian:t('אפשרויות צמחוניות מאומתות, כולל מקומות צמחוניים וטבעוניים','Verified vegetarian choices, including vegetarian and vegan venues','Potwierdzone opcje wegetariańskie, także lokale wege i wegańskie','Bestätigte vegetarische Optionen, einschließlich vegetarischer und veganer Lokale','Ověřené vegetariánské možnosti včetně vegetariánských a veganských podniků'),
  'vegan-only':t('מקום טבעוני כולו','Entirely vegan venue','Lokal całkowicie wegański','Vollständig veganes Lokal','Zcela veganský podnik'),
  'vegetarian-only':t('מקום צמחוני או טבעוני כולו','Entirely vegetarian or vegan venue','Lokal całkowicie wegetariański lub wegański','Vollständig vegetarisches oder veganes Lokal','Zcela vegetariánský nebo veganský podnik'),
  'vegan-options':t('מקום מעורב עם אפשרויות טבעוניות','Mixed venue with vegan options','Lokal mieszany z opcjami wegańskimi','Gemischtes Lokal mit veganen Optionen','Smíšený podnik s veganskými možnostmi'),
  'vegetarian-options':t('מקום מעורב עם אפשרויות צמחוניות','Mixed venue with vegetarian options','Lokal mieszany z opcjami wegetariańskimi','Gemischtes Lokal mit vegetarischen Optionen','Smíšený podnik s vegetariánskými možnostmi')
 };
 const quickCategories={all:t('הכול','All','Wszystko','Alle','Vše'),eat:t('אוכל','Food','Jedzenie','Essen','Jídlo'),coffee:t('קפה','Coffee','Kawa','Kaffee','Káva'),drink:t('שתייה','Drinks','Napoje','Getränke','Nápoje'),museums:t('מוזיאונים','Museums','Muzea','Museen','Muzea'),sights:t('מה לראות','Things to see','Co zobaczyć','Sehenswertes','Co vidět')};
 function dietaryMatch(place,filter='all'){
  if(filter==='all')return true;
  const d=place.dining?.dietary||{},vegan=d.venue==='vegan',vegetarian=vegan||d.venue==='vegetarian';
  const veganOptions=d.veganOptions==='verified',vegetarianOptions=d.vegetarianOptions==='verified'||veganOptions;
  return ({vegan:vegan||veganOptions,vegetarian:vegetarian||vegetarianOptions,'vegan-only':vegan,'vegetarian-only':vegetarian,'vegan-options':d.venue==='mixed'&&veganOptions,'vegetarian-options':d.venue==='mixed'&&vegetarianOptions})[filter]===true;
 }
 function categoryMatch(p,category='all'){
  const c=p.categories||[],types=p.dining?.venueTypes||[],has=values=>values.some(x=>c.includes(x)),kind=values=>values.some(x=>types.includes(x));
  if(category==='all')return true;
  if(category==='eat')return has(['eat','food','dessert','restaurant'])||kind(['restaurant','bakery','patisserie','ice-cream','food-hall','market','milk-bar','takeaway']);
  if(category==='coffee')return has(['cafe','coffee'])||kind(['cafe','chocolate-cafe']);
  if(category==='drink')return has(['drink'])||kind(['bar','wine-bar','pub','beach-bar','tea-room','cafe']);
  if(category==='museums')return has(['museum','museums','museums-history']);
  if(category==='sights')return has(['culture','art','architecture','architecture-design','historical-landmark','sightseeing','nature','park','parks','monument','landmark','viewpoint','religion','attraction','enjoy','history','heritage','city','bridge','island','square','waterfront','garden','castle','castles','church','city-center','city-centre','area','gallery','historic-square','historical-site','lake','public-art','religious-heritage','remembrance','river','scenic-viewpoint','street-art','unesco-world-heritage','urban-nature','walk','water','wooden-architecture','zoo']);
  return false;
 }
 function matches(place,{category='all',venueType='all',cuisine='all',dietary:preference='all'}={}){
  return categoryMatch(place,category)&&(venueType==='all'||place.dining?.venueTypes?.includes(venueType))&&(cuisine==='all'||place.dining?.cuisines?.includes(cuisine))&&dietaryMatch(place,preference);
 }
 const label=(dictionary,id,lang='en')=>dictionary[id]?.[lang]||dictionary[id]?.en||'';
 window.WROC_DINING=Object.freeze({version:1,venueTypes,cuisines,dietary,quickCategories,dietaryMatch,categoryMatch,matches,label});
})();
