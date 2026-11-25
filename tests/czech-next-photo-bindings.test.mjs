import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {czechNextPhotoBindings as proof,beforeCzechNextPhotoBinding,beforeCzechNextPhotoRegistryRows} from './czech-next-photo-bindings-historical-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const load=file=>{const window={};runInNewContext(readFileSync(file,'utf8'),{window});return window.WROC_CATALOG;};
const catalogs=[load('data/place-catalog.js'),load('bluehost-api/public/personal-trips/public-catalog.js')];
test('38 verified Czech photo posts route identically in public and personal maps, with older posts and other languages preserved',()=>{
 assert.equal(proof.targets.length,38);assert.equal(proof.targets.reduce((n,t)=>n+t.photos,0),377);
 for(const c of catalogs)for(const t of proof.targets){
  const p=c.getPlace(t.id),e=proof.changed[t.id],s=c.getSocialPost(t.id,'facebook','cs');
  assert.equal(s.url,t.row.url);assert.equal(s.account,'61594716405964');
  assert.match(s.url,/^https:\/\/www\.facebook\.com\/61594716405964\/posts\/\d+$/);
  assert.equal(p.socialPosts.length,e.beforeSocialPosts.length+1);
  for(const old of e.beforeSocialPosts)assert.ok(p.socialPosts.some(r=>hash(r)===hash(old)));
  for(const[lang,h]of Object.entries(e.otherLanguageSelections))assert.equal(hash(c.getSocialPost(t.id,'facebook',lang)||null),h,t.id+':'+lang);
 }
});
test('all347 identities, galleries, descriptions, aliases, coordinates and unrelated309 records remain unchanged',()=>{
 for(const c of catalogs){
  assert.equal(Object.keys(c.places).length,proof.beforeCount);
  for(const[id,h]of Object.entries(proof.unrelatedRecordHashes))assert.equal(hash(beforeCzechNextPhotoBinding(c.getPlace(id))),h,id);
  for(const t of proof.targets)assert.equal(hash(Object.fromEntries(Object.entries(c.getPlace(t.id)).filter(([k])=>k!=='socialPosts'))),proof.changed[t.id].beforeNonSocialHash,t.id);
  assert.equal(hash(c.aliases),proof.aliasesHash);assert.equal(hash(c.coordinateConflicts),proof.coordinateConflictsHash);
 }
 const reg=JSON.parse(readFileSync('data/localized-social-posts.json'));
 for(const[id,h]of Object.entries(proof.unrelatedRegistryHashes))assert.equal(hash(beforeCzechNextPhotoRegistryRows(id,reg[id])),h,id);
 for(const t of proof.targets)assert.equal(hash(reg[t.id]),proof.changed[t.id].afterRegistryHash,t.id);
});
test('historical projection is exact, rejects unreviewed social changes and retains unrelated mutations for older checks',()=>{
 const reg=JSON.parse(readFileSync('data/localized-social-posts.json'));
 for(const t of proof.targets){const p=catalogs[0].getPlace(t.id),e=proof.changed[t.id];
  assert.equal(hash(beforeCzechNextPhotoBinding(p).socialPosts),hash(e.beforeSocialPosts));
  assert.equal(hash(beforeCzechNextPhotoRegistryRows(t.id,reg[t.id])),hash(e.beforeRegistryRows));
  assert.equal(beforeCzechNextPhotoBinding({...p,editorialPriority:'visible'}).editorialPriority,'visible');
  assert.throws(()=>beforeCzechNextPhotoBinding({...p,socialPosts:[...p.socialPosts,{platform:'facebook',language:'cs',url:'https://example.com/unreviewed'}]}));
  assert.throws(()=>beforeCzechNextPhotoRegistryRows(t.id,[...reg[t.id],{language:'cs',url:'https://example.com/unreviewed'}]));
 }
});
