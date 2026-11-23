import {beforeNov23EnglishTwoPhotos, beforeNov23EnglishTwoRegistryRows} from './english-two-photo-bindings-nov23-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {cafeEnglishBinding as proof, beforeCafeEnglishBinding} from './cafe-targowa-en-binding-historical-baseline.mjs';
const load = file => {const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
const hash = v => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const catalog=load('data/place-catalog.js');
test('Cafe Targowa English action opens the verified three-photo post in public and shared catalogs',()=>{
 for(const c of [catalog,load('bluehost-api/public/personal-trips/public-catalog.js')]) {
  assert.equal(c.getSocialPost(proof.id,'facebook','en').url,proof.row.url);
  assert.equal(c.getSocialPost(proof.id,'facebook','en').account,'61595036942289');
  for(const old of proof.beforeSocialPosts)assert.ok(c.getPlace(proof.id).socialPosts.some(row=>hash(row)===hash(old)));
  for(const language of ['he','pl','de','cs'])assert.notEqual(c.getSocialPost(proof.id,'facebook',language)?.url,proof.row.url);
 }
});
test('Only the new English social row changes; all347 identities, photos and other languages remain exact',()=>{
 assert.equal(Object.keys(catalog.places).length,proof.beforeCount);
 for(const [id,expected]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(beforeNov23EnglishTwoPhotos(catalog.getPlace(id))),expected,id);
 assert.equal(hash(Object.fromEntries(Object.entries(catalog.getPlace(proof.id)).filter(([k])=>k!=='socialPosts'))),proof.beforeNonSocialHash);
 assert.equal(hash(catalog.aliases),proof.aliasesHash);assert.equal(hash(catalog.coordinateConflicts),proof.coordinateConflictsHash);
 const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
 for(const [id,expected]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(beforeNov23EnglishTwoRegistryRows(id,registry[id])),expected,id);
 assert.deepEqual(JSON.parse(JSON.stringify(beforeCafeEnglishBinding(catalog.getPlace(proof.id)).socialPosts)),proof.beforeSocialPosts);
 const changed={...catalog.getPlace(proof.id),socialPosts:[...catalog.getPlace(proof.id).socialPosts,{platform:'facebook',language:'en',url:'https://example.com/unreviewed'}]};assert.throws(()=>beforeCafeEnglishBinding(changed));
});
