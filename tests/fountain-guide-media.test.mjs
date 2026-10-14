import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
function runtime(){const window={location:{origin:'https://wroc-love.com'}};const document={documentElement:{lang:'he'},addEventListener(){}};for(const f of ['data/place-catalog.js','data/youtube-video-hosting.js','youtube-video.js','guide-video.js'])runInNewContext(readFileSync(resolve(root,f),'utf8'),{window,document,console,URLSearchParams});return window;}
test('Fountain retains seven original photos and four migrated clips, adds four distinct public clips',()=>{
 const w=runtime(),p=w.WROC_CATALOG.getPlace('fountain');
 assert.equal(p.media.photos.length,7);assert.equal(new Set(p.media.photos).size,7);
 assert.equal(p.media.videos.length,8);assert.equal(new Set(p.media.videos).size,8);
 const ids=p.media.videos.map(src=>w.WROC_YOUTUBE_VIDEO.resolve(src));
 for(const id of ['dUm3NDEX-y4','dI_FB67JBL4','94K1bIwjteg','oFpZE7jAuZE','KR_7B_LUe-w','F8dmjvigNcc','j8HliEzlKG0','U7TyifQyg7k'])assert.ok(ids.some(url=>url.includes(id)));
 for(const src of p.media.videos){assert.equal(w.WROC_YOUTUBE_VIDEO_HOSTING[src].status,'public');assert.match(w.WROC_YOUTUBE_VIDEO.html(src),/youtube-nocookie\.com\/embed\//);}
 assert.equal(w.WROC_CATALOG.getPlace('multimedia-fountain').id,'fountain');
});

test('Fountain guide badge and native caption language follow all map languages and alias',()=>{
 const w=runtime();for(const lang of ['he','en','de','cs','pl']){
  const id=lang==='he'?'O4te9Tsw3FU':'wYu3-sO5WkE';
  for(const place of ['fountain','multimedia-fountain']){
   const src=w.WROC_GUIDE_VIDEO.sourceFor(place,lang);assert.equal(src,'https://youtube.com/shorts/'+id);
   assert.match(w.WROC_GUIDE_VIDEO.embedUrlFor(src,lang),new RegExp('cc_lang_pref='+lang));
   const icon=w.WROC_GUIDE_VIDEO.decorateIcon({html:'fountain',className:'place'},place,lang);assert.match(icon.html,/guide-marker-badge/);
   assert.ok(!w.WROC_CATALOG.getPlace(place).media.videos.includes(src));
  }
 }
});
test('Fountain manual caption files preserve timing and verified source checksums',async()=>{
 const {createHash}=await import('node:crypto');
 const p=JSON.parse(readFileSync(resolve(root,'data/fountain-guide-caption-provenance.json'),'utf8'));
 for(const lang of ['he','en','de','cs','pl']){
  const t=p.tracks[lang],s=p.editions[t.edition];assert.equal(t.status,'Published');assert.equal(t.edition,lang==='he'?'he':'en');assert.equal(s.visibility,'Public');
  assert.equal(t.srtSHA256,createHash('sha256').update(readFileSync(resolve(root,t.srtFile))).digest('hex'));
  assert.match(s.sourceSHA256,/^[a-f0-9]{64}$/);let end=0;for(const c of t.cues){assert.ok(c.start>=end&&c.end>c.start&&c.end<=s.durationSeconds);end=c.end;}
 }
});
