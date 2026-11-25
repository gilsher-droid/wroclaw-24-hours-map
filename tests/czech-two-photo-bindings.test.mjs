import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {czechTwoPhotoBindings as proof,beforeCzechTwoPhotoBinding,beforeCzechTwoPhotoRegistryRows} from './czech-two-photo-bindings-historical-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
test('two verified Czech photo posts resolve identically in public and personal maps, preserving all other places, sources and languages',()=>{
 assert.deepEqual(proof.targets.map(t=>[t.id,t.photos]),[['four-domes',3],['brzeg-castle',20]]);
 for(const c of [load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')]){
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  for(const t of proof.targets){
   const p=c.getPlace(t.id),e=proof.changed[t.id],s=c.getSocialPost(t.id,'facebook','cs');
   assert.equal(s.url,t.row.url);assert.equal(s.account,'61594716405964');
   assert.equal(p.socialPosts.length,e.beforeSocialPosts.length+1);
   assert.equal(hash(beforeCzechTwoPhotoBinding(p).socialPosts),hash(e.beforeSocialPosts));
   assert.equal(hash(Object.fromEntries(Object.entries(p).filter(([k])=>k!=='socialPosts'))),e.beforeNonSocialHash);
   for(const[lang,h]of Object.entries(e.otherLanguageSelections))assert.equal(hash(c.getSocialPost(t.id,'facebook',lang)||null),h,t.id+':'+lang);
   assert.throws(()=>beforeCzechTwoPhotoBinding({...p,socialPosts:[...p.socialPosts,{url:'https://example.com/unreviewed'}]}));
  }
  for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(c.getPlace(id)),h,id);
  assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
 }
 const reg=JSON.parse(readFileSync('data/localized-social-posts.json'));
 for(const t of proof.targets)assert.equal(hash(beforeCzechTwoPhotoRegistryRows(t.id,reg[t.id])),hash(proof.changed[t.id].beforeRegistryRows));
 for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(reg[id]),h,id);
});
