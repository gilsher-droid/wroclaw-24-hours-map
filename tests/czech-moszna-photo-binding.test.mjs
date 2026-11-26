import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {beforeGermanEightPhotoBinding} from './german-eight-photo-bindings-historical-baseline.mjs';
import {beforeCzechTwoPhotoBinding,beforeCzechTwoPhotoRegistryRows} from './czech-two-photo-bindings-historical-baseline.mjs';
import {czechMosznaPhotoBinding as proof,beforeCzechMosznaPhotoBinding,beforeCzechMosznaPhotoRegistryRows} from './czech-moszna-photo-binding-historical-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
test('Moszna Czech photo post resolves in both maps, preserving all other identities, media, languages and historical links',()=>{
 for(const c of [load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')]){
  const place=beforeGermanEightPhotoBinding(c.getPlace(proof.id)),selected=c.getSocialPost(place,'facebook','cs');
  assert.equal(selected.url,proof.row.url);assert.equal(selected.account,'61594716405964');
  assert.equal(place.socialPosts.length,proof.beforeSocialPosts.length+1);
  assert.equal(hash(beforeCzechMosznaPhotoBinding(place).socialPosts),hash(proof.beforeSocialPosts));
  assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([k])=>k!=='socialPosts'))),proof.beforeNonSocialHash);
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(beforeCzechTwoPhotoBinding(c.getPlace(id))),h,id);
  for(const[lang,h]of Object.entries(proof.otherLanguageSelections))assert.equal(hash(c.getSocialPost(place,'facebook',lang)||null),h,lang);
  assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
  assert.throws(()=>beforeCzechMosznaPhotoBinding({...place,socialPosts:[...place.socialPosts,{url:'https://example.com/unreviewed'}]}));
 }
 const reg=JSON.parse(readFileSync('data/localized-social-posts.json'));
 assert.equal(hash(beforeCzechMosznaPhotoRegistryRows(proof.id,reg[proof.id])),hash(proof.beforeRegistryRows));
 for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(beforeCzechTwoPhotoRegistryRows(id,reg[id])),h,id);
});
