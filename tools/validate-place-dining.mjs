import {readFileSync} from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const source=JSON.parse(readFileSync('data/place-dining.json','utf8')),window={};for(const f of ['data/place-catalog.js','data/dining-taxonomy.js','data/canonical-experiences.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window});
const catalog=window.WROC_CATALOG,t=window.WROC_DINING;
assert.equal(source.version,1);const tags=['eat','drink','food','cafe','coffee','dessert','restaurant','bakery','bar','market'];
const candidates=Object.values(catalog.places).filter(p=>p.categories.some(x=>tags.includes(x))).map(p=>p.id).sort();assert.deepEqual(Object.keys(source.places).sort(),candidates,'All candidate identities must be reviewed, including unclassified and other cities');
let verified=0;for(const [id,r]of Object.entries(source.places)){
 assert.ok(catalog.getPlace(id),id);assert.deepEqual(JSON.parse(JSON.stringify(catalog.getPlace(id).dining)),r,id+' catalogue overlay');assert.equal(r.version,1);assert.ok(r.review.reason.length>20);assert.ok(['unknown','partial','verified'].includes(r.review.status));
 assert.ok(['unknown','vegan','vegetarian','mixed'].includes(r.dietary.venue));for(const k of ['veganOptions','vegetarianOptions'])assert.ok(['unknown','verified'].includes(r.dietary[k]));
 const asserted=[];for(const [key,dict]of [['venueTypes',t.venueTypes],['cuisines',t.cuisines]]){assert.equal(new Set(r[key]).size,r[key].length);for(const value of r[key]){assert.ok(dict[value],id+' '+value);asserted.push(key+'.'+value);}}
 for(const [key,value]of Object.entries(r.dietary))if(value!=='unknown')asserted.push('dietary.'+key);
 const covered=new Set();for(const e of r.evidence){assert.ok(/^https:\/\//.test(e.url));assert.ok(/^2026-\d\d-\d\d$/.test(e.verifiedAt));assert.ok(e.kind&&e.claim);for(const f of e.fields)covered.add(f);}
 for(const f of asserted)assert.ok(covered.has(f),id+' lacks evidence for '+f);if(asserted.length)verified++;
}
const all=Object.values(catalog.places).filter(p=>p.location.cityId==='wroclaw');
const food=all.filter(p=>p.dining?.evidence?.length&&p.dining.venueTypes.some(x=>['restaurant','bakery','patisserie','ice-cream','food-hall','market','milk-bar','takeaway'].includes(x))).map(p=>p.id);
const veg=all.filter(p=>t.dietaryMatch(p,'vegetarian')).map(p=>p.id);
for(const [id,expected]of [['foodies-wroclaw',food],['vegetarian-vegan-wroclaw',veg]])assert.deepEqual(Array.from(window.WROC_EXPERIENCE_CATALOG.getExperience(id).relatedCanonicalPlaceIds),expected,id+' shared selection');
console.log(JSON.stringify({candidates:candidates.length,verifiedFields:verified,unknown:candidates.length-verified,foodies:food.length,vegetarianAndVegan:veg.length}));
