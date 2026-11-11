import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import assert from'node:assert/strict';
export const heWrittenPhotoSignatures=JSON.parse(readFileSync('tests/fixtures/he-written-photo-posts-20261111-signatures.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Accept only the sixteen verified HE additions; retain exact historical rows.
export function beforeHeWrittenPhotoPosts(place){
 const added=place?.socialPosts?.filter(p=>p.context==='verified-written-place-photo-post')||[];
 if(!added.length)return place;
 const s=heWrittenPhotoSignatures[place.id];assert.ok(s,'Unapproved HE binding '+place.id);
 assert.equal(added.length,2);assert.equal(hash(place.socialPosts),s.after);
 for(const p of added){assert.equal(p.language,'he');assert.equal(p.url,s.urls[p.platform]);}
 const socialPosts=place.socialPosts.filter(p=>p.context!=='verified-written-place-photo-post');assert.equal(hash(socialPosts),s.before);
 return {...place,socialPosts};
}
