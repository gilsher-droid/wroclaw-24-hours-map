import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {marinaEnglishBinding as proof,beforeMarinaEnglishBinding} from './marina-en-binding-historical-baseline.mjs';
const hash = v => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const load = file => {const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
const c = load('data/place-catalog.js');
test('Marina English maps resolve the verified written-photo post and preserve the older post',()=>{
  for(const catalog of [c,load('bluehost-api/public/personal-trips/public-catalog.js')]) {
    assert.equal(catalog.getSocialPost(proof.id,'facebook','en').url,proof.row.url);
    assert.equal(catalog.getSocialPost(proof.id,'facebook','en').account,proof.row.account);
    for(const old of proof.beforeSocialPosts) assert.ok(catalog.getPlace(proof.id).socialPosts.some(row=>hash(row)===hash(old)));
    for(const lang of ['he','pl','de','cs']) assert.notEqual(catalog.getSocialPost(proof.id,'facebook',lang)?.url,proof.row.url);
  }
});
test('Marina identity, galleries, all other346 records and other registry entries remain exact',()=>{
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  for(const[id,h] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(c.getPlace(id)),h,id);
  assert.equal(hash(Object.fromEntries(Object.entries(c.getPlace(proof.id)).filter(([k])=>k!=='socialPosts'))),proof.beforeNonSocialHash);
  assert.equal(hash(c.aliases),proof.aliasesHash);
  assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
  const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
  for(const[id,h] of Object.entries(proof.unrelatedRegistryHashes)) assert.equal(hash(registry[id]),h,id);
});
test('Marina historical projection rejects additional unreviewed social edits',()=>{
  const p=c.getPlace(proof.id);
  assert.deepEqual(JSON.parse(JSON.stringify(beforeMarinaEnglishBinding(p).socialPosts)),proof.beforeSocialPosts);
  assert.throws(()=>beforeMarinaEnglishBinding({...p,socialPosts:[...p.socialPosts,{platform:'facebook',language:'en',url:'https://example.com/unreviewed'}]}));
  assert.equal(beforeMarinaEnglishBinding({...p,editorialPriority:'independent'}).editorialPriority,'independent');
});
