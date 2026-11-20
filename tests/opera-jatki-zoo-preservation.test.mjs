import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {beforeNov20Guides,beforeNov20Christmas,beforeNov20Source} from './opera-jatki-zoo-historical-baseline.mjs';
const proof=JSON.parse(readFileSync('tests/fixtures/opera-jatki-zoo-nov20-delta.json'));
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
const w={};for(const f of ['data/place-catalog.js','data/extra-languages.js','data/moshe-route.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window:w});
test('Nov20 changes exactly nine declared fields on four identities; every other canonical field and record remains intact',()=>{
 assert.equal(Object.keys(w.WROC_CATALOG.places).length,Object.keys(proof.beforeRecordHashes).length);
 for(const [id,h] of Object.entries(proof.beforeRecordHashes))assert.equal(hash(beforeNov20Guides(w.WROC_CATALOG.getPlace(id))),h,id);
 let count=0;for(const [id,fields] of Object.entries(proof.places))for(const [path,d] of Object.entries(fields)){
  const actual=path.split('.').reduce((v,k)=>v[k],w.WROC_CATALOG.getPlace(id));assert.equal(hash(actual),hash(d.after),id+':'+path);count++;
 }
 assert.equal(count,9);
});
test('Historical projections leave unrelated changes observable and reject altered Christmas choice coordinates',()=>{
 const p=w.WROC_CATALOG.getPlace('zoo-wroclaw');assert.equal(beforeNov20Guides({...p,editorialPriority:'changed'}).editorialPriority,'changed');
 const changed=JSON.parse(JSON.stringify(p));changed.media.guideVideos.en='https://example.com/unreviewed';assert.equal(beforeNov20Guides(changed).media.guideVideos.en,'https://example.com/unreviewed');
 const route=JSON.parse(JSON.stringify(w.PREMIUM_STOPS));route.find(s=>s.id==='opera').coordinates[0]+=1;assert.throws(()=>beforeNov20Christmas(route));
 for(const file of Object.keys(proof.sources)){const input=readFileSync(file,'utf8')+'\n// unreviewed';assert.ok(beforeNov20Source(file,Buffer.from(input)).toString().endsWith('// unreviewed'));}
});
