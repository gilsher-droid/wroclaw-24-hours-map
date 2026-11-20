import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const proof=JSON.parse(readFileSync('tests/fixtures/opera-jatki-zoo-nov20-delta.json'));
const plain=v=>JSON.parse(JSON.stringify(v));
// Undo only exact approved Nov20 fields; leave every unrelated field observable.
export function beforeNov20Guides(p){
 if(!p||!proof.places[p.id])return p;
 let result=p;
 for(const [path,d] of Object.entries(proof.places[p.id])){
  const keys=path.split('.'),value=keys.length===2?result[keys[0]]?.[keys[1]]:result[path];
  if(JSON.stringify(value)!==JSON.stringify(d.after))continue;
  result={...result};
  if(keys.length===2){result[keys[0]]={...result[keys[0]]};if(d.before===null)delete result[keys[0]][keys[1]];else result[keys[0]][keys[1]]=plain(d.before);}
  else result[path]=plain(d.before);
 }
 return result;
}
export function beforeNov20Source(file,value){const d=proof.sources[file];if(!d||!value.toString().includes(d.after))return value;return Buffer.from(value.toString().replace(d.after,d.before));}
export function beforeNov20Christmas(stops){
 if(!stops?.some(s=>s.id==='opera'&&s.day===3)||!stops.some(s=>s.id==='nfm'&&s.day===3))return stops;
 const choices=stops.filter(s=>['opera','nfm'].includes(s.id)&&s.day===3);
 for(const s of choices){const expected=proof.route.after.find(x=>x.id===s.id&&x.day===3);assert.deepEqual(plain(Object.fromEntries(Object.entries(s).filter(([k])=>!['canonicalPlace','resources'].includes(k)))),expected,'Unreviewed Christmas '+s.id);}
 const original=proof.route.before;
 return stops.filter(s=>s.id!=='nfm'||s.day!==3).map(s=>s.id==='opera'&&s.day===3?plain(original):s.day===3&&s.order>choices[1].order?{...s,order:s.order-1}:s);
}

export function beforeNov20Legacy(row){
 if(!row)return row;
 let out={...row};
 if(row.canonicalPlace)out.canonicalPlace=beforeNov20Guides(row.canonicalPlace);
 if(row.id==='jatki'&&row.name?.he==='סמטת יאטקי, סמטת הקצבים'){
  const changes={he:['סמטת יאטקי, סמטת הקצבים',row.day?'סמטת הקצבים':'סמטת יאטקי']};
  if(row.day)Object.assign(changes,{en:['Jatki Alley','Old Butchers’ Alley'],de:[row.name.de==='Jatki-Gasse'?'Jatki-Gasse':'Jatki Alley',row.name.de==='Jatki-Gasse'?'Alte Metzgergasse':'Old Butchers’ Alley'],cs:[row.name.cs==='Alej Jatki'?'Alej Jatki':'Jatki Alley',row.name.cs==='Alej Jatki'?'Ulička starých řezníků':'Old Butchers’ Alley']});
  out.name={...row.name};for(const [lang,[after,before]] of Object.entries(changes))if(row.name[lang]===after)out.name[lang]=before;
 }

 return out;
}
export function beforeNov20Snapshot(w){
 if(w.PREMIUM_STOPS)w.PREMIUM_STOPS=beforeNov20Christmas(w.PREMIUM_STOPS);
 for(const key of ['PREMIUM_STOPS','PREMIUM_RECOMMENDATIONS','LOCATIONS','WROC_LIFESTYLE_PLACES','WROC_CULTURAL_PLACES'])if(w[key])w[key]=w[key].map(beforeNov20Legacy);
 return w;
}
