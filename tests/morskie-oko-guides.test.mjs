import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
test('Morskie Oko guides preserve the canonical recommendation, visit media and localized social links',()=>{
 const proof=JSON.parse(readFileSync('data/morskie-oko-guide-caption-provenance.json','utf8')),window={};
 for(const f of ['data/extra-languages.js','data/place-catalog.js','data/canonical-experiences.js','data/premium-route.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
 const p=window.WROC_CATALOG.getPlace('morskie-oko-wroclaw');assert.equal(p.media.photos.length,27);assert.equal(p.media.videos.length,6);assert.ok(!p.media.photos.some(url=>url.includes('entrance-20261019')));assert.equal(p.media.photos[0],'/assets/morskie-oko-refresh/morskie-oko-04.jpg');assert.equal(p.socialPosts.length,9);
 assert.equal(window.PREMIUM_RECOMMENDATIONS.filter(r=>r.canonicalPlaceId===p.id).length,1);
 assert.equal(p.media.guideVideos.he,'https://youtube.com/shorts/R26FXh9Twh0');assert.equal(p.media.guideVideos.en,'https://youtube.com/shorts/e0gGTjUPYoQ');
 for(const lang of ['he','en','pl','de','cs']){const track=proof.tracks[lang],edition=proof.editions[lang==='he'?'he':'en'];assert.equal(edition.visibility,'Public');assert.equal(edition.savedVisibilityVerified,true);assert.equal(track.status,'Published');assert.equal(track.reopenedVerified,true);assert.equal(track.videoId,edition.id);assert.equal(createHash('sha256').update(readFileSync(track.srtFile)).digest('hex'),track.srtSHA256);let end=0;for(const cue of track.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);assert.ok(cue.text.trim());end=cue.end;}}
});
