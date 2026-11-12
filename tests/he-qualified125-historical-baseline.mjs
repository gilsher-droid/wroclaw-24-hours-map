import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import assert from'node:assert/strict';
export const he125Fixture=JSON.parse(readFileSync('tests/fixtures/he-qualified125-routing-20261112.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeHe125Routing(place){const s=he125Fixture.changed[place?.id];if(!s)return place;const current=hash(place.socialPosts);if(current===s.before)return place;if(!place.socialPosts?.some(p=>p.context==='verified-he-qualified-routing-20261112'))return place;assert.equal(current,s.after,'Unexpected qualified HE routing delta: '+place.id);return {...place,socialPosts:s.beforeSocialPosts};}
export function expectedHe125Url(id,platform,language,historical){if(language!=='he')return historical;return he125Fixture.candidates.find(r=>r.changeRequired&&r.id===id&&r.platform===platform)?.url||historical;}
