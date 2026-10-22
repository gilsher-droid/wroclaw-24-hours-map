import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
test('Centennial Hall guides enrich the same place in both relevant maps with verified native captions',()=>{
 const window={};const context={window,console};
 for(const file of ['data/extra-languages.js','data/place-catalog.js','data/canonical-experiences.js','data/premium-route.js','data/cultural-places.js'])runInNewContext(readFileSync(file,'utf8'),context);
 const place=window.WROC_CATALOG.getPlace('hala');
 assert.equal(window.PREMIUM_STOPS.filter(x=>x.canonicalPlaceId==='hala').length,1);
 assert.equal(window.WROC_CULTURAL_PLACES.filter(x=>x.canonicalPlaceId==='hala').length,1);
 assert.equal(place.media.photos.length,17);assert.equal(place.media.videos.length,5);
 const proof=JSON.parse(readFileSync('data/hala-guide-caption-provenance.json','utf8'));
 assert.deepEqual(proof.canonicalPlaceIds,['hala']);assert.equal(proof.bloopersExcluded,true);
 for(const lang of ['he','en','de','cs','pl']){
  const track=proof.tracks[lang],edition=proof.editions[lang==='he'?'he':'en'];
  assert.equal(track.status,'Published');assert.equal(edition.visibility,'Public');assert.ok(!edition.sourceFile.includes('backup'));
  assert.equal(createHash('sha256').update(readFileSync(track.srtFile)).digest('hex'),track.srtSHA256);
  let end=0;for(const cue of track.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);assert.ok(cue.text.trim());end=cue.end;}
 }
});
