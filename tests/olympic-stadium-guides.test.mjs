import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
test('Olympic guides have published native source and translated captions without replacing visit media',()=>{
 const proof=JSON.parse(readFileSync('data/olympic-stadium-guide-caption-provenance.json','utf8')),window={};
 for(const f of ['data/extra-languages.js','data/place-catalog.js','data/canonical-experiences.js','data/cultural-places.js','data/premium-route.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
 const p=window.WROC_CATALOG.getPlace('stadion-olimpijski-wroclaw');assert.equal(window.WROC_CATALOG.getPlace('olympic-stadium-wroclaw'),p);assert.equal(p.media.photos.length,20);assert.equal(p.media.videos.length,6);
 assert.equal(window.WROC_CULTURAL_PLACES.filter(r=>r.canonicalPlaceId===p.id).length,1);assert.equal(window.PREMIUM_RECOMMENDATIONS.filter(r=>r.canonicalPlaceId===p.id).length,1);
 for(const lang of ['he','en','pl','de','cs']){const track=proof.tracks[lang],edition=proof.editions[lang==='he'?'he':'en'];assert.equal(edition.visibility,'Public');assert.equal(edition.savedVisibilityVerified,true);assert.equal(track.status,'Published');assert.equal(track.videoId,edition.id);assert.equal(createHash('sha256').update(readFileSync(track.srtFile)).digest('hex'),track.srtSHA256);let end=0;for(const cue of track.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);assert.ok(cue.text.trim());end=cue.end;}}
});
