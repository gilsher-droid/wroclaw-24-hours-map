import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {germanBrzegPhotoBinding as proof,beforeGermanBrzegPhotoBinding,beforeGermanBrzegPhotoRegistryRows} from './german-brzeg-photo-binding-historical-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
test('verified German Brzeg photo post resolves across public and personal maps while every other place and language is preserved',()=>{
 assert.equal(proof.target.photos,12);
 assert.ok(!proof.target.row.url.includes('/reel/'));
 for(const c of [load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')]){
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  const p=c.getPlace(proof.target.id),s=c.getSocialPost(p,'facebook','de');
  assert.equal(s.url,proof.target.row.url);assert.equal(s.account,'61595239823399');
  assert.equal(hash(beforeGermanBrzegPhotoBinding(p).socialPosts),hash(proof.beforeSocialPosts));
  assert.equal(hash(Object.fromEntries(Object.entries(p).filter(([k])=>k!=='socialPosts'))),proof.beforeNonSocialHash);
  for(const[key,h]of Object.entries(proof.otherLanguageSelections)){const[lang,platform]=key.split(':');assert.equal(hash(c.getSocialPost(p,platform,lang)||null),h,key);}
  for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(c.getPlace(id)),h,id);
  assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
  assert.throws(()=>beforeGermanBrzegPhotoBinding({...p,socialPosts:[...p.socialPosts,{url:'https://example.com/unreviewed'}]}));
 }
 const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
 assert.equal(hash(beforeGermanBrzegPhotoRegistryRows(proof.target.id,registry[proof.target.id])),hash(proof.beforeRegistryRows));
 for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(registry[id]),h,id);
 assert.throws(()=>beforeGermanBrzegPhotoRegistryRows(proof.target.id,[...registry[proof.target.id],{url:'https://example.com/unreviewed'}]));
 const nearby=JSON.parse(readFileSync('bluehost-api/public/personal-trips/nearby-places.json'));
 assert.equal(hash(nearby[proof.target.id].socialPosts),proof.afterSocialHash);
});
