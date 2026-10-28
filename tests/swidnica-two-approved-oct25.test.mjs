import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const proof=JSON.parse(readFileSync('data/swidnica-two-approved-oct25-preservation.json')),window={};
runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
const hash=b=>createHash('sha256').update(b).digest('hex');
test('Two approved Swidnica originals add distinct full photographs while preserving all230othercanonicals and every prior target field',()=>{
 const places=window.WROC_CATALOG.places,id=proof.canonicalId;
 assert.equal(historicalPlaceIds(places).length,Object.keys(proof.recordHashes).length+2);
 for(const[k,v]of historicalPlaceIds(places).map(id=>[id,places[id]]))if(k!==id&&k!=="lodz-roa-weasels-mural"&&k!=="forum-kulinarne-wroclaw")assert.equal(hash(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(v)))),proof.recordHashes[k],k);
 const p=JSON.parse(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(places[id]))));assert.equal(proof.photos.length,2);assert.equal(p.media.photos.length,9);assert.deepEqual(p.media.photos.slice(0,7),proof.before.media.photos);
 for(const r of proof.photos){assert.equal(p.media.photos.filter(a=>a===r.asset).length,1);assert.equal(hash(readFileSync('.'+r.asset)),r.sourceSHA256);const m=p.media.metadata[r.asset];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.specificPersonalPhotoApproval.call,'call_3ea6c74fe9c6409fb1f8292024aa8f27');for(const l of['he','en','pl','de','cs'])assert.ok(m.alt[l]);delete p.media.metadata[r.asset];}
 p.media.photos=proof.before.media.photos;assert.deepEqual(p,proof.before);
});
