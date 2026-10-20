import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const json=f=>JSON.parse(readFileSync(f,'utf8'));
const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/cultural-places.js','data/premium-route.js','data/moshe-route.js','data/youtube-video-hosting.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
const p=JSON.parse(JSON.stringify(window.WROC_CATALOG.getPlace('bastion'))),before=json('data/bastion-refresh-preservation-baseline.json'),proof=json('data/bastion-refresh-provenance.json');
test('Bastion refresh appends distinct place media while preserving chosen wide hero and existing visits',()=>{
 assert.equal(p.id,'bastion');const links={...p.links};assert.equal(links.socialProfileFallback,false);delete links.socialProfileFallback;assert.deepEqual(links,before.links);const prov=JSON.parse(JSON.stringify(p.provenance));delete prov.mediaRefreshedAt;prov.factualSources[0].verifiedAt=before.provenance.factualSources[0].verifiedAt;assert.deepEqual(prov,before.provenance);assert.equal(p.media.thumbnail,before.media.thumbnail);assert.equal(p.media.photos.length,8);assert.equal(new Set(p.media.photos).size,8);assert.equal(p.media.videos.length,6);
 assert.deepEqual(p.media.photos.slice(0,2),before.media.photos);assert.deepEqual(p.media.videos.slice(0,5),before.media.videos);
 for(const [key,value] of Object.entries(before.media.metadata))assert.deepEqual(p.media.metadata[key],value);
 for(const photo of proof.photos){assert.ok(p.media.photos.includes(photo.siteAsset));assert.ok(existsSync(photo.siteAsset.slice(1)));assert.equal(createHash('sha256').update(readFileSync(photo.siteAsset.slice(1))).digest('hex'),photo.assetSHA256);for(const l of ['he','en','pl','de','cs'])assert.ok(p.media.metadata[photo.siteAsset].alt[l]);}
 for(const x of proof.excluded)assert.ok(!Object.values(p.media.metadata).some(m=>m.sourceSHA256===x.sha256));
 const key=p.media.videos.at(-1),clip=window.WROC_YOUTUBE_VIDEO_HOSTING[key];assert.equal(clip.youtube,'https://youtube.com/watch?v=TlV9gewmJVI');assert.equal(clip.savedPublicVerified,true);assert.equal(clip.checks,'complete-no-issues');assert.equal(existsSync(key.slice(1)),false);
 assert.equal(window.WROC_CULTURAL_PLACES.filter(r=>r.canonicalPlaceId==='bastion').length,1);
});
test('Bastion refresh leaves all193other canonical records unchanged',()=>{const baseline=json('data/bastion-refresh-unrelated-preservation.json');assert.equal(Object.keys(window.WROC_CATALOG.places).length,baseline.canonicalPlaceCount);assert.equal(Object.keys(baseline.hashes).length,193);for(const[id,hash]of Object.entries(baseline.hashes))assert.equal(createHash('sha256').update(JSON.stringify(window.WROC_CATALOG.getPlace(id))).digest('hex'),hash,id);});
