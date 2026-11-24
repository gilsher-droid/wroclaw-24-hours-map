import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {czechEightPhotoBindings as proof,beforeCzechEightPhotoBinding,beforeCzechEightPhotoRegistryRows,beforeCzechEightLegacyRow} from './czech-eight-photo-bindings-historical-baseline.mjs';
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
const catalogs=[load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')];
test('Czech public and personal maps select the exact eight reviewed Czech photo posts and preserve prior posts and language choices',()=>{
  for(const catalog of catalogs)for(const t of proof.targets){
    const selected=catalog.getSocialPost(t.id,'facebook','cs');
    assert.equal(selected.url,t.row.url);assert.equal(selected.account,t.row.account);
    const place=catalog.getPlace(t.id),p=proof.changed[t.id];
    for(const old of p.beforeSocialPosts)assert.ok(place.socialPosts.some(row=>hash(row)===hash(old)));
    assert.equal(place.socialPosts.length,p.beforeSocialPosts.length+1);
    for(const[lang,h]of Object.entries(p.otherLanguageSelections))assert.equal(hash(catalog.getSocialPost(t.id,'facebook',lang)||null),h,t.id+':'+lang);
  }
});
test('The eight social additions and dated CS branch correction preserve all347 identities, all galleries, all other339 records, registry rows, aliases and coordinates',()=>{
  for(const c of catalogs){
    assert.equal(Object.keys(c.places).length,proof.beforeCount);
    for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(c.getPlace(id)),h,id);
    for(const t of proof.targets)assert.equal(hash(Object.fromEntries(Object.entries(c.getPlace(t.id)).filter(([k])=>k!=='socialPosts'))),proof.changed[t.id].afterNonSocialHash,t.id);
    assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
  }
  const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
  for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(registry[id]),h,id);
  for(const t of proof.targets)assert.equal(hash(registry[t.id]),proof.changed[t.id].afterRegistryHash,t.id);
});
test('Historical receipt projection rejects later unreviewed social changes',()=>{
  const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
  for(const t of proof.targets){
    const place=catalogs[0].getPlace(t.id),p=proof.changed[t.id];
    assert.equal(hash(beforeCzechEightPhotoBinding(place).socialPosts),hash(p.beforeSocialPosts));
    assert.equal(hash(beforeCzechEightPhotoRegistryRows(t.id,registry[t.id])),hash(p.beforeRegistryRows));
    assert.throws(()=>beforeCzechEightPhotoBinding({...place,socialPosts:[...place.socialPosts,{platform:'facebook',language:'cs',url:'https://example.com/unreviewed'}]}));
    assert.throws(()=>beforeCzechEightPhotoRegistryRows(t.id,[...registry[t.id],{language:'cs',url:'https://example.com/unreviewed'}]));
  }
});

test('The official branch update changes only the dated Czech description, retaining other languages and requiring exact receipt projection',()=>{
  for(const c of catalogs){
    for(const t of proof.targets){const p=c.getPlace(t.id),e=proof.changed[t.id];for(const [lang,text] of Object.entries(e.beforeDescription))if(lang!=='cs'||t.id!==proof.factualCorrection.id)assert.equal(p.description[lang],text,t.id+':'+lang);}
    const p=c.getPlace(proof.factualCorrection.id),e=proof.changed[p.id];assert.equal(p.description.cs,e.afterDescriptionCS);assert.ok(p.description.cs.includes('24. listopadu 2026'));assert.ok(!p.description.cs.includes('dočasně uzavřena'));
    assert.equal(beforeCzechEightPhotoBinding(p).description.cs,e.beforeDescriptionCS);assert.throws(()=>beforeCzechEightPhotoBinding({...p,description:{...p.description,cs:p.description.cs+' unreviewed'}}));
  }
});

test('The dated legacy CS correction is bounded and unrelated fields remain visible',()=>{
 const w={};runInNewContext(readFileSync('data/lifestyle-places.js','utf8'),{window:w});const row=w.WROC_LIFESTYLE_PLACES.find(x=>x.id===proof.factualCorrection.id),p=proof.changed[row.id];
 assert.equal(row.description.cs,p.afterDescriptionCS);assert.equal(beforeCzechEightLegacyRow(row).description.cs,p.beforeDescriptionCS);assert.equal(beforeCzechEightLegacyRow({...row,editorialPriority:'visible'}).editorialPriority,'visible');
 assert.throws(()=>beforeCzechEightLegacyRow({...row,description:{...row.description,cs:'unreviewed'}}));
 for(const t of proof.targets)assert.equal(beforeCzechEightPhotoBinding({...catalogs[0].getPlace(t.id),editorialPriority:'visible'}).editorialPriority,'visible');
});
