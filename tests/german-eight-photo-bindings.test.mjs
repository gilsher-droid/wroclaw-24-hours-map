import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {germanEightPhotoBindings as proof,beforeGermanEightPhotoBinding,beforeGermanEightPhotoRegistryRows} from './german-eight-photo-bindings-historical-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
test('eight native-verified German photo posts open identically from public and personal maps, preserving every other place, language and media row',()=>{
 assert.equal(proof.targets.length,8);
 assert.deepEqual(proof.targets.map(t=>t.photos),[2,1,15,4,1,1,2,10]);
 for(const c of [load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')]){
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  for(const t of proof.targets){
   const p=c.getPlace(t.id),e=proof.changed[t.id],selected=c.getSocialPost(p,'facebook','de');
   assert.ok(t.photos>0&&t.photos<=20,t.id);
   assert.equal(selected.url,t.row.url);assert.equal(selected.account,'61595239823399');
   assert.ok(!selected.url.includes('/reel/'));
   assert.equal(p.socialPosts.length,e.beforeSocialPosts.length+1,t.id);
   assert.equal(hash(beforeGermanEightPhotoBinding(p).socialPosts),hash(e.beforeSocialPosts),t.id);
   assert.equal(hash(Object.fromEntries(Object.entries(p).filter(([k])=>k!=='socialPosts'))),e.beforeNonSocialHash,t.id);
   for(const[key,h]of Object.entries(e.otherLanguageSelections)){const[lang,platform]=key.split(':');assert.equal(hash(c.getSocialPost(p,platform,lang)||null),h,t.id+':'+key);}
   assert.throws(()=>beforeGermanEightPhotoBinding({...p,socialPosts:[...p.socialPosts,{url:'https://example.com/unreviewed'}]}));
  }
  for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(c.getPlace(id)),h,id);
  assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
 }
 const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
 for(const t of proof.targets)assert.equal(hash(beforeGermanEightPhotoRegistryRows(t.id,registry[t.id])),hash(proof.changed[t.id].beforeRegistryRows));
 for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(registry[id]),h,id);
 const nearby=JSON.parse(readFileSync('bluehost-api/public/personal-trips/nearby-places.json'));
 for(const t of proof.targets)assert.equal(hash(nearby[t.id].socialPosts),proof.changed[t.id].afterSocialHash,t.id);
});
