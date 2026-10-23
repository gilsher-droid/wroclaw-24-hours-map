import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
test('Żyjnia keeps one cultural identity and traceable public media with published native captions',()=>{
 const window={};
 for(const file of ['data/place-catalog.js','data/canonical-experiences.js','data/cultural-places.js'])runInNewContext(readFileSync(file,'utf8'),{window,console});
 const p=window.WROC_CATALOG.getPlace('zyjnia-bwa-wroclaw');
 assert.equal(window.WROC_CATALOG.getPlace('galeria-dizajn').id,p.id);
 assert.equal(window.WROC_CULTURAL_PLACES.filter(x=>(x.canonicalPlaceId||x.id)===p.id).length,1);
 assert.deepEqual(JSON.parse(JSON.stringify(p.location.coordinates)),{lat:51.1086376,lng:17.0331186});
 assert.equal(p.media.photos.length,12);assert.equal(p.media.videos.length,9);
 for(const photo of p.media.photos)assert.ok(existsSync(photo.slice(1)));
 for(const original of ["/assets/zyjnia-bwa/zyjnia-01.jpg","/assets/zyjnia-bwa/zyjnia-02.jpg","/assets/zyjnia-bwa/zyjnia-03.jpg"]) assert.ok(p.media.photos.includes(original));
 const visits=JSON.parse(readFileSync('data/zyjnia-visit-publication-receipt.json','utf8'));
 assert.equal(new Set(visits.map(v=>v.youtube)).size,7);
 for(const v of visits){assert.equal(v.visibility,'Public');assert.equal(v.savedPublicVerified,true);assert.ok(p.media.videos.includes(v.youtube));}
 for(const lang of ['he','en','pl','de','cs'])assert.equal(window.WROC_CATALOG.getSocialPost(p,'instagram',lang),null);
 for(const lang of ['he','de'])assert.equal(window.WROC_CATALOG.getSocialPost(p,'facebook',lang),null);
 for(const lang of ['en','pl','cs'])assert.ok(window.WROC_CATALOG.getSocialPost(p,'facebook',lang)?.url.includes('story_fbid='));
 const proof=JSON.parse(readFileSync('data/zyjnia-guide-caption-provenance.json','utf8'));
 for(const lang of ['he','en','pl','de','cs']){
  const edition=proof.editions[lang==='he'?'he':'en'],track=proof.tracks[lang];
  assert.equal(edition.visibility,'Public');assert.equal(edition.savedVisibilityVerified,true);assert.equal(edition.originalPictureAudioUnchanged,true);
  assert.equal(track.status,'Published');assert.equal(track.reopenedVerified,true);assert.equal(track.videoId,edition.id);
  assert.equal(createHash('sha256').update(readFileSync(track.srtFile)).digest('hex'),track.srtSHA256);
  assert.ok(!p.media.videos.includes(edition.url));
  let end=0;for(const cue of track.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);assert.ok(cue.text.trim());end=cue.end;}
 }
});
