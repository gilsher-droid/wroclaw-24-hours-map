import {beforeCzechEightPhotoBinding,beforeCzechEightPhotoRegistryRows} from './czech-eight-photo-bindings-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {czechBarBastionBindings as proof,beforeCzechBarBastionBinding,beforeCzechBarBastionRegistryRows} from './czech-bar-bastion-bindings-historical-baseline.mjs';
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
const catalogs=[load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')];
test('Czech public and personal maps select the exact Miś and Bastion photo posts and preserve prior posts and language choices',()=>{
  for(const catalog of catalogs)for(const t of proof.targets){
    const selected=catalog.getSocialPost(t.id,'facebook','cs');
    assert.equal(selected.url,t.row.url);assert.equal(selected.account,t.row.account);
    const place=catalog.getPlace(t.id),p=proof.changed[t.id];
    for(const old of p.beforeSocialPosts)assert.ok(place.socialPosts.some(row=>hash(row)===hash(old)));
    assert.equal(place.socialPosts.length,p.beforeSocialPosts.length+1);
    for(const[lang,h]of Object.entries(p.otherLanguageSelections))assert.equal(hash(catalog.getSocialPost(t.id,'facebook',lang)||null),h,t.id+':'+lang);
  }
});
test('The two social additions preserve all347 identities, all galleries, all other345 records, registry rows, aliases and coordinates',()=>{
  for(const c of catalogs){
    assert.equal(Object.keys(c.places).length,proof.beforeCount);
    for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(beforeCzechEightPhotoBinding(c.getPlace(id))),h,id);
    for(const t of proof.targets)assert.equal(hash(Object.fromEntries(Object.entries(c.getPlace(t.id)).filter(([k])=>k!=='socialPosts'))),proof.changed[t.id].beforeNonSocialHash,t.id);
    assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
  }
  const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
  for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(beforeCzechEightPhotoRegistryRows(id,registry[id])),h,id);
  for(const t of proof.targets)assert.equal(hash(registry[t.id]),proof.changed[t.id].afterRegistryHash,t.id);
});
test('Historical receipt projection rejects later unreviewed social changes',()=>{
  const registry=JSON.parse(readFileSync('data/localized-social-posts.json'));
  for(const t of proof.targets){
    const place=catalogs[0].getPlace(t.id),p=proof.changed[t.id];
    assert.equal(hash(beforeCzechBarBastionBinding(place).socialPosts),hash(p.beforeSocialPosts));
    assert.equal(hash(beforeCzechBarBastionRegistryRows(t.id,registry[t.id])),hash(p.beforeRegistryRows));
    assert.throws(()=>beforeCzechBarBastionBinding({...place,socialPosts:[...place.socialPosts,{platform:'facebook',language:'cs',url:'https://example.com/unreviewed'}]}));
    assert.throws(()=>beforeCzechBarBastionRegistryRows(t.id,[...registry[t.id],{language:'cs',url:'https://example.com/unreviewed'}]));
  }
});
