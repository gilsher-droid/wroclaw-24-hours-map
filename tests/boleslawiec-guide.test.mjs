import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
test('Boleslawiec guides remain on the same town stop alongside later approved visit additions',()=>{
 const window={}; for(const file of ['data/place-catalog.js','data/lower-silesia-excursions.js']) runInNewContext(readFileSync(file,'utf8'),{window,console});
 const town=window.WROC_CATALOG.getPlace('boleslawiec-old-town');
 const route=window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id==='czocha-boleslawiec-two-day-trip');
 assert.equal(route.routePoints.filter(p=>p.canonicalPlaceId==='boleslawiec-old-town').length,1);
 assert.equal(town.media.photos.length,85);assert.equal(town.media.videos.length,15);
 assert.equal(town.media.guideVideos.he,'https://youtube.com/shorts/0OvV3ic5ukk');assert.equal(town.media.guideVideos.en,'https://youtube.com/shorts/WUcLYYodyrg');
 const proof=JSON.parse(readFileSync('data/boleslawiec-old-town-guide-caption-provenance.json','utf8'));
 assert.equal(proof.bloopersExcluded,true);
 for(const lang of ['he','en','de','cs','pl']){
  const t=proof.tracks[lang],edition=proof.editions[lang==='he'?'he':'en'];
  assert.equal(t.status,'Published');assert.equal(edition.visibility,'Public');assert.ok(!edition.sourceFile.includes('פספוסים'));
  assert.equal(createHash('sha256').update(readFileSync(t.srtFile)).digest('hex'),t.srtSHA256);
  let end=0;for(const cue of t.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);assert.ok(cue.text.trim());end=cue.end;}
 }
});
