import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {heTwoInstagramMapGaps as proof,beforeHeTwoInstagramMapGap,beforeHeTwoInstagramRegistryRows} from './he-two-instagram-map-gaps-historical-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
test('existing human-published Hebrew Instagram galleries open from public and personal maps without altering other places or languages',()=>{
 assert.equal(proof.targets.length,2);
 for(const c of [load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')]){
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  for(const t of proof.targets){
   const p=c.getPlace(t.id),e=proof.changed[t.id],selected=c.getSocialPost(p,'instagram','he');
   assert.ok(t.photos>0&&t.photos<=20);
   assert.equal(selected.url,t.row.url);assert.equal(selected.account,'wroclaw.lowersilesia.he');
   assert.equal(p.socialPosts.length,e.beforeSocialPosts.length+1);
   assert.equal(hash(beforeHeTwoInstagramMapGap(p).socialPosts),hash(e.beforeSocialPosts));
   assert.equal(hash(Object.fromEntries(Object.entries(p).filter(([k])=>k!=='socialPosts'))),e.beforeNonSocialHash);
   for(const[key,h]of Object.entries(e.otherLanguageSelections)){const[lang,platform]=key.split(':');assert.equal(hash(c.getSocialPost(p,platform,lang)||null),h);}
   assert.throws(()=>beforeHeTwoInstagramMapGap({...p,socialPosts:[...p.socialPosts,{url:'https://example.com/unreviewed'}]}));
  }
  for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(c.getPlace(id)),h,id);
  assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
 }
 const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
 for(const t of proof.targets)assert.equal(hash(beforeHeTwoInstagramRegistryRows(t.id,registry[t.id])),hash(proof.changed[t.id].beforeRegistryRows));
 for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(registry[id]),h,id);
 const nearby=JSON.parse(readFileSync('bluehost-api/public/personal-trips/nearby-places.json'));
 for(const t of proof.targets)assert.equal(hash(nearby[t.id].socialPosts),proof.changed[t.id].afterSocialHash);
});
