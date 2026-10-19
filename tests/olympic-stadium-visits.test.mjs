import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const json=p=>JSON.parse(readFileSync(p,'utf8'));
const load=(...files)=>{const window={};for(const f of ['data/extra-languages.js','data/place-catalog.js','data/canonical-experiences.js',...files])runInNewContext(readFileSync(f,'utf8'),{window,console});return window;};
test('Olympic Stadium keeps its canonical identity and 17 photo hashes, adding six checked Public visit clips without raw video',()=>{
 const w=load('data/location-media.js'),p=w.WROC_CATALOG.getPlace('stadion-olimpijski-wroclaw'),proof=json('data/olympic-stadium-enrichment-provenance.json'),clips=json('data/olympic-stadium-visit-publication.json');
 assert.equal(w.WROC_CATALOG.getPlace('olympic-stadium-wroclaw'),p);assert.equal(p.media.photos.length,17);assert.equal(p.media.thumbnail,'/assets/stadion-olimpijski-09.jpg');
 for(const src of p.media.photos)assert.equal(createHash('sha256').update(readFileSync(src.slice(1))).digest('hex'),proof.photoSHA256[src]);
 assert.equal(clips.length,6);assert.equal(new Set(clips.map(c=>c.youtube)).size,6);assert.deepEqual(Array.from(p.media.videos),clips.map(c=>c.youtube));
 for(const clip of clips){assert.equal(clip.status,'public');assert.equal(clip.processingStatus,'complete');assert.equal(clip.copyrightStatus,'no-issues-found');assert.equal(clip.communityGuidelinesStatus,'no-issues-found');assert.equal(existsSync(clip.mediaKey.slice(1)),false);}
 assert.deepEqual(Array.from(w.WROC_LOCATION_MEDIA[p.id].videos,v=>v.src),clips.map(c=>c.youtube));assert.equal(p.media.guideVideos,undefined);
});
test('Olympic Stadium routes nine verified exact-language posts and leaves Hebrew Instagram unavailable',()=>{
 const w=load(),p=w.WROC_CATALOG.getPlace('stadion-olimpijski-wroclaw'),audit=json('data/olympic-stadium-enrichment-provenance.json').social;
 for(const r of audit.filter(r=>r.status==='verified-written-place-post')){const post=w.WROC_CATALOG.getSocialPost(p,r.platform,r.language);assert.equal(post.url,r.url);assert.equal(post.verifiedAt,'2026-10-19');assert.ok(!post.routingExcluded);}
 assert.equal(w.WROC_CATALOG.getSocialPost(p,'instagram','he'),null);assert.equal(p.links.socialProfileFallback,false);
 const c=load('data/cultural-places.js');assert.equal(c.WROC_CULTURAL_PLACES.filter(r=>r.canonicalPlaceId===p.id).length,1);
 const r=load('data/premium-route.js');assert.equal(r.PREMIUM_RECOMMENDATIONS.filter(r=>r.canonicalPlaceId===p.id).length,1);
});
