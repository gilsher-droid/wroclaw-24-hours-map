import {beforeRegional42} from './regional42-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const load=()=>{const window={};for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});return window;};
const ids=['jawor-church-of-peace','jawor-market-square','jawor-piast-castle','karpacz-centre','wang-church','jelenia-gora-market-square'];
test('Third excursion preserves the human visit order with Wang separate from Karpacz',()=>{
 const w=load(),trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[2];
 assert.equal(trip.id,'jawor-karpacz-jelenia-gora-day-trip');assert.deepEqual(Array.from(trip.canonicalPlaceIds),ids);
 assert.deepEqual(Array.from(trip.routePoints,p=>p.canonicalPlaceId||p.id),['wroclaw-start',...ids,'wroclaw-return']);
 for(const lang of ['he','en','pl','de','cs'])for(const field of ['title','summary'])assert.ok(trip[field][lang]);
 assert.equal(trip.travel.segments.filter(x=>x.mode==='walking').length,2);
 assert.equal(trip.travel.estimates.length,0,'No invented drive-time estimates');
 assert.match(trip.navigation.googleMaps,/travelmode=driving/);
 assert.deepEqual(Object.keys(w.WROC_CATALOG.getPlace('jawor-church-of-peace').media.guideVideos),['he','en']);
 for(const id of ids){const p=w.WROC_CATALOG.getPlace(id);assert.equal(p.location.regionId,'lower-silesia');assert.ok(p.media.photos.length>0);}
 assert.deepEqual(Object.keys(w.WROC_CATALOG.getPlace('wang-church').media.guideVideos),['he','en'],'Wang uses the existing canonical place');
 for(const id of ['karpacz-centre','jelenia-gora-market-square'])assert.deepEqual(Object.keys(w.WROC_CATALOG.getPlace(id).media.guideVideos),['he','en']);
});
test('Excursion photos have unique verified source hashes and intact optimized assets',()=>{
 const w=load(),provenance=JSON.parse(readFileSync('data/excursion-three-media-provenance.json'));const photos=provenance.photos;
 assert.equal(photos.length,120);assert.equal(new Set(photos.map(x=>x.sha256)).size,photos.length);
 for(const photo of photos){assert.ok(w.WROC_CATALOG.getPlace(photo.place).media.photos.includes(photo.asset));const f=photo.asset.slice(1);assert.ok(existsSync(f));assert.equal(createHash('sha256').update(readFileSync(f)).digest('hex'),photo.outputSHA256);assert.ok(!photo.source.includes('פספוסים'));}
 assert.ok(provenance.duplicates.length>0);assert.equal(provenance.excluded.filter(x=>x.excluded).length,12);
});

test('Jawor guides keep published native captions and source timing for all five languages',()=>{
 const proof=JSON.parse(readFileSync('data/jawor-guide-caption-provenance.json'));
 for(const lang of ['he','en','pl','de','cs']){const track=proof.tracks[lang];assert.equal(track.status,'Published');assert.equal(track.edition,lang==='he'?'he':'en');const edition=proof.editions[track.edition];assert.equal(edition.visibility,'Public');assert.match(edition.sourceSHA256,/^[a-f0-9]{64}$/);assert.equal(createHash('sha256').update(readFileSync(track.srtFile)).digest('hex'),track.srtSHA256);let end=0;for(const cue of track.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);end=cue.end;}}
});
test('All 44 published visit uploads and 38 curated clips resolve to verified Public YouTube entries without raw website videos',()=>{
 const w=load(),provenance=JSON.parse(readFileSync('data/excursion-three-visit-provenance.json'));const registry=JSON.parse(readFileSync('data/youtube-media-migration.json'));
 assert.equal(provenance.visits.length,44);assert.equal(new Set(provenance.visits.map(x=>x.youtube)).size,44);
 const expected={'jawor-church-of-peace':1,'karpacz-centre':13,'wang-church':17,'jelenia-gora-market-square':7};
 for(const [id,count]of Object.entries(expected))assert.equal(beforeRegional42(w.WROC_CATALOG.getPlace(id)).media.videos.length,count);
 for(const row of provenance.visits){assert.equal(row.visibility,'Public');assert.equal(row.checks,'completed, no issues');assert.match(row.youtube,/^https:\/\/youtube.com\/shorts\/[A-Za-z0-9_-]{11}$/);assert.equal(w.WROC_CATALOG.getPlace(row.place).media.videos.includes(row.youtube),row.websiteIncluded!==false);assert.equal(registry[row.registryKey].status,'public');assert.equal(registry[row.registryKey].youtube,row.youtube);assert.equal(registry[row.registryKey].sourceSHA256,row.sourceSHA256);assert.ok(!existsSync(row.registryKey.slice(1)),'Registry alias must not create a raw website video');}
});

test('Karpacz, Wang and Jelenia guides preserve verified native tracks and original source checksums',()=>{
 for(const id of ['karpacz-centre','jelenia-gora-market-square','wang-church']){
 const proof=JSON.parse(readFileSync(`data/${id}-guide-caption-provenance.json`));
 assert.equal(proof.bloopersExcluded,true);
 for(const lang of ['he','en','pl','de','cs']){const t=proof.tracks[lang],edition=proof.editions[lang==='he'?'he':'en'];assert.equal(t.status,'Published');assert.equal(edition.visibility,'Public');assert.match(edition.sourceSHA256,/^[a-f0-9]{64}$/);assert.equal(createHash('sha256').update(readFileSync(t.srtFile)).digest('hex'),t.srtSHA256);let end=0;for(const c of t.cues){assert.ok(c.start>=end&&c.end>c.start&&c.end<=edition.durationSeconds);end=c.end;}}
 }
});
