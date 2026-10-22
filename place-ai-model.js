(function(root){
 'use strict';
 const languages=['he','en','pl','de','cs'];
 const tasks={
 he:['ספר לי על ההיסטוריה והייחוד של המקום, בצורה קצרה ומעניינת.','על אילו שלושה פרטים כדאי להסתכל בביקור במקום?','הסבר על המקום בשפה שמתאימה לילדים, והצע שאלת גילוי אחת.','מה אפשר לשלב בקרבת המקום בהליכה? ציין מרחקים רק אם אפשר לאמת אותם.','כתוב כאן את השאלה שלך.'],
 en:['Tell me briefly about the history and character of this place.','Which three details should I look for when visiting?','Explain this place for children and suggest one discovery question.','What could I visit nearby on foot? Give distances only if verifiable.','Write your question here.'],
 pl:['Opowiedz krótko o historii i charakterze tego miejsca.','Na jakie trzy szczegóły warto zwrócić uwagę podczas wizyty?','Wyjaśnij to miejsce dzieciom i zaproponuj jedno pytanie do odkrywania.','Co można odwiedzić w pobliżu pieszo? Podawaj odległości tylko wtedy, gdy można je potwierdzić.','Wpisz tutaj swoje pytanie.'],
 de:['Erzähle kurz von der Geschichte und den Besonderheiten dieses Ortes.','Auf welche drei Details sollte ich beim Besuch achten?','Erkläre diesen Ort für Kinder und schlage eine Entdeckerfrage vor.','Was kann ich in der Nähe zu Fuß besuchen? Nenne Entfernungen nur, wenn sie überprüfbar sind.','Schreibe hier deine Frage.'],
 cs:['Stručně mi pověz o historii a charakteru tohoto místa.','Kterých tří detailů si mám při návštěvě všimnout?','Vysvětli toto místo dětem a navrhni jednu objevitelskou otázku.','Co mohu navštívit v okolí pěšky? Vzdálenosti uváděj jen tehdy, pokud je lze ověřit.','Napište sem svou otázku.']};
 const intros={he:'השב בעברית על המקום הבא. אין להניח שאני נמצא בו כרגע.',en:'Answer in English about this place. Do not assume I am currently there.',pl:'Odpowiedz po polsku o tym miejscu. Nie zakładaj, że obecnie tam jestem.',de:'Antworte auf Deutsch über diesen Ort. Gehe nicht davon aus, dass ich gerade dort bin.',cs:'Odpověz česky o tomto místě. Nepředpokládej, že tam právě jsem.'};
 const cautions={he:'אל תמציא עובדות. לשעות פתיחה, מחירים ואירועים השתמש במקורות רשמיים עדכניים, צרף קישורים וציין כשאינך יכול לאמת מידע.',en:'Do not invent facts. For opening hours, prices and events, use current official sources, include links, and say when information cannot be verified.',pl:'Nie wymyślaj faktów. Godziny otwarcia, ceny i wydarzenia sprawdzaj w aktualnych oficjalnych źródłach. Dodaj linki i zaznacz informacje, których nie można potwierdzić.',de:'Erfinde keine Fakten. Nutze für Öffnungszeiten, Preise und Veranstaltungen aktuelle offizielle Quellen, verlinke sie und kennzeichne nicht überprüfbare Angaben.',cs:'Nevymýšlej si fakta. Otevírací dobu, ceny a akce ověřuj v aktuálních oficiálních zdrojích, přidej odkazy a označ neověřitelné informace.'};
 const cityNames={wroclaw:'Wrocław',boleslawiec:'Bolesławiec',jawor:'Jawor',karpacz:'Karpacz','jelenia-gora':'Jelenia Góra','sucha-lesna':'Sucha Leśna',lesna:'Leśna'};
 const local=(v,l)=>typeof v==='string'?v:v?.[l]||v?.en||v?.he||'';
 function context(input,lang='he',catalog){
  lang=languages.includes(lang)?lang:'he';
  const record=typeof input==='string'?catalog?.getPlace?.(input):input;
  if(!record)return null;
  const p=record.canonicalPlace||catalog?.getPlace?.(record.canonicalPlaceId||record.id)||record;
  const name=local(p.name,lang);if(!name)return null;
  return {id:String(p.id||record.canonicalPlaceId||record.id||''),name,localName:String(p.localName||''),city:String(p.location?.address?.city||p.city||cityNames[p.location?.cityId||p.cityId]||''),language:lang};
 }
 function prompt(ctx,preset=0){
  if(!ctx)return '';
  const l=languages.includes(ctx.language)?ctx.language:'he';
  const identity=[ctx.name,ctx.localName,ctx.city].filter((v,i,a)=>v&&a.indexOf(v)===i).flatMap(v=>l==='he'?v.split(/([\p{Script=Latin}][\p{Script=Latin}\p{N}\s'’.&()\-]*)/u).map(s=>s.trim()).filter(Boolean):[v]);
  return [intros[l],...identity,'',tasks[l][Number.isInteger(preset)&&preset>=0&&preset<5?preset:0],'',cautions[l]].join('\n');
 }
 root.WROC_PLACE_AI_MODEL=Object.freeze({context,prompt,languages,tasks});
})(typeof window!=='undefined'?window:globalThis);
