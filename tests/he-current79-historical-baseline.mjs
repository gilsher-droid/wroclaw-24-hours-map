import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import assert from'node:assert/strict';
export const heCurrent79Fixture=JSON.parse(readFileSync('tests/fixtures/he-current79-routing-20261111.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Restore only these exact approved HE social arrays for older preservation receipts.
export function beforeHeCurrent79Routing(place){
 const s=heCurrent79Fixture.changed[place?.id];if(!s)return place;
 const hasCurrentDelta=place.socialPosts?.some(p=>p.context==='verified-he-written-photo-routing-20261111'||(place.id==='chatka'&&p.url==='https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUurgzkeMm/'&&p.routingExcluded));
 if(!hasCurrentDelta)return place;
 const current=hash(place.socialPosts);if(current===s.before)return place;
 assert.equal(current,s.after,'Unexpected HE routing delta: '+place.id);
 return {...place,socialPosts:s.beforeSocialPosts};
}
export function expectedHeCurrent79Url(id,platform,language,historical){
 if(language!=='he')return historical;
 if(id==='chatka'&&platform==='instagram')return null;
 return heCurrent79Fixture.candidates.find(r=>r.changeRequired&&r.id===id&&r.platform===platform)?.url||historical;
}
