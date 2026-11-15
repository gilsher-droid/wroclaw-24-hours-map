import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {beforePolskieJadloSnapshot,beforePolskieJadloExperience,assertApprovedPolskieJadlo} from './polskie-jadlo-market-historical-baseline.mjs';
const proof=JSON.parse(readFileSync('data/polskie-jadlo-market-preservation-nov15.json','utf8'));
const plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
function load(){const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/lifestyle-places.js','data/location-media.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});return window;}
test('One distinct market milk bar is added; all346 preceding identities, galleries, social links and aliases remain unchanged',()=>{
  const w=load(),c=w.WROC_CATALOG,p=c.getPlace(proof.canonicalId);
  assert.equal(Object.keys(c.places).length,proof.beforeCount+1);
  for(const[id,expected]of Object.entries(proof.beforeRecordHashes))assert.equal(hash(c.getPlace(id)),expected,id);
  assert.deepEqual(plain(c.aliases),proof.beforeAliases);assert.deepEqual(plain(c.coordinateConflicts),proof.beforeConflicts);
  assert.deepEqual(plain(p),proof.approvedRecord);assert.equal(p.socialPosts.length,0);
  assert.equal(p.provenance.coordinatesScope,'Hala Targowa building; exact indoor counter position not verified');
  for(const language of ['he','en','pl','de','cs']){assert.ok(p.name[language]);assert.ok(p.description[language]);for(const platform of ['facebook','instagram'])assert.equal(c.getSocialPost(p,platform,language),null);}
});
test('Exact photos6to8 retain full image bytes and original provenance in both venue and market galleries',()=>{
  const w=load(),p=w.WROC_CATALOG.getPlace(proof.canonicalId),market=w.WROC_CATALOG.getPlace('hala-targowa');
  assert.deepEqual(plain(p.media.photos),proof.assets.map(x=>x.asset));
  assert.deepEqual(plain(w.WROC_LOCATION_MEDIA[p.id].gallery),plain(p.media.photos));
  for(const row of proof.assets){const meta=p.media.metadata[row.asset];assert.equal(createHash('sha256').update(readFileSync(row.asset.slice(1))).digest('hex'),meta.assetSHA256);assert.equal(meta.sourceSHA256,row.metadata.sourceSHA256);assert.equal(meta.originalFullPicturePreserved,true);assert.ok(market.media.photos.includes(row.asset));}
});
test('The same canonical stop joins the milk-bar experience and relevant food discovery without altering other experiences',()=>{
  const w=load(),p=w.WROC_CATALOG.getPlace(proof.canonicalId),milk=w.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-milk-bars');
  assert.equal(milk.relatedCanonicalPlaceIds.length,5);
  assert.deepEqual(plain(milk.relatedCanonicalPlaceIds.slice(0,4)),proof.beforeExperiences[milk.id].relatedCanonicalPlaceIds);
  assert.equal(w.WROC_LIFESTYLE_PLACES.filter(x=>x.canonicalPlaceId===p.id).length,1);
  assert.deepEqual(plain(w.WROC_LIFESTYLE_PLACES.find(x=>x.id===p.id).canonicalPlace.media.photos),plain(p.media.photos));
  for(const[id,expected]of Object.entries(proof.approvedExperiences)){const e=w.WROC_EXPERIENCE_CATALOG.getExperience(id);assert.deepEqual(plain(e),expected);assert.equal(e.relatedCanonicalPlaceIds.filter(x=>x===p.id).length,1);assert.equal(e.media.inheritFromCanonicalPlaceIds.filter(x=>x===p.id).length,1);}
  for(const[id,expected]of Object.entries(proof.otherExperienceHashes))assert.equal(hash(w.WROC_EXPERIENCE_CATALOG.getExperience(id)),expected,id);
});
test('Historical scope projection rejects altered new content and keeps unrelated edits visible',()=>{
  let w=load(),p=plain(w.WROC_CATALOG.getPlace(proof.canonicalId));p.name.en+=' unreviewed';assert.throws(()=>assertApprovedPolskieJadlo(p));
  const e=plain(w.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-milk-bars'));e.description.en+=' unreviewed';assert.throws(()=>beforePolskieJadloExperience(e));
  const catalog=w.WROC_CATALOG;assert.throws(()=>beforePolskieJadloSnapshot({...w,WROC_CATALOG:{...catalog,getPlace:id=>id===p.id?p:catalog.getPlace(id)}}));
  w=load();w.WROC_CATALOG.getPlace('cafe-targowa').name.en+=' visible';beforePolskieJadloSnapshot(w);assert.ok(w.WROC_CATALOG.getPlace('cafe-targowa').name.en.endsWith(' visible'));assert.equal(w.WROC_CATALOG.getPlace(proof.canonicalId),null);
});
