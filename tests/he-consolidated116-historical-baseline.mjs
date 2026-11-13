import{restoredPapaFBURL}from'./papa-he-fb-restoration-historical-baseline.mjs';
import{beforeHe125Routing,expectedHe125Url}from'./he-qualified125-historical-baseline.mjs';
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import assert from'node:assert/strict';
export const he116Fixture=JSON.parse(readFileSync('tests/fixtures/he-consolidated116-routing-20261111.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Project only exact reviewed arrays to the prior published catalog for historical receipts.
export function beforeHe116Routing(place){
 place=beforeHe125Routing(place);
 const s=he116Fixture.changed[place?.id];if(!s)return place;
 const current=hash(place.socialPosts);if(current===s.before)return place;
 const hasDelta=place.socialPosts?.some(p=>p.context==='verified-he-consolidated-routing-20261111'||(place.id==='papa'&&p.routingExcluded&&he116Fixture.negativeControls.some(r=>r.url===p.url)));
 if(!hasDelta)return place;
 assert.equal(current,s.after,'Unexpected consolidated HE routing delta: '+place.id);
 return {...place,socialPosts:s.beforeSocialPosts};
}
export function expectedHe116Url(id,platform,language,historical){
 if(language!=='he')return historical;
 if(id==='papa'&&platform==='facebook')return restoredPapaFBURL;
 if(he116Fixture.negativeControls.some(r=>r.id===id&&r.platform===platform))return null;
 return expectedHe125Url(id,platform,language,he116Fixture.candidates.find(r=>r.id===id&&r.platform===platform)?.url||historical);
}
