import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const root=resolve(import.meta.dirname,'..');
function runtime(){const window={location:{origin:'https://wroc-love.com'}};const document={documentElement:{lang:'he'},addEventListener(){}};for(const f of ['data/place-catalog.js','data/youtube-video-hosting.js','youtube-video.js','guide-video.js','data/location-media.js'])runInNewContext(readFileSync(resolve(root,f),'utf8'),{window,document,console,URLSearchParams});return window;}
test('Papa point holds the complete deduplicated dwarf picture collection and keeps the information centre independent',()=>{
 const w=runtime(),p=w.WROC_CATALOG.getPlace('papa');assert.equal(p.media.photos.length,20);assert.equal(new Set(p.media.photos).size,20);
 assert.equal(w.WROC_CATALOG.getPlace('dwarf-info').media.photos.length,5);
 assert.deepEqual(Array.from(w.WROC_LOCATION_MEDIA.papa.gallery),Array.from(p.media.photos));
 const provenance=JSON.parse(readFileSync(resolve(root,'data/papa-gnomes-media-provenance.json'),'utf8'));
 assert.equal(provenance.photos.length,20);assert.equal(Object.keys(provenance.photoDuplicatesOmitted).length,6);
 assert.equal(provenance.photos.filter(x=>x.original===false).length,2);
 for(const photo of provenance.photos){const f=resolve(root,photo.asset.slice(1));assert.ok(existsSync(f));assert.equal(createHash('sha256').update(readFileSync(f)).digest('hex'),photo.outputSHA256);assert.ok(p.media.photos.includes(photo.asset));}
 assert.equal(p.media.guideVideos,undefined);for(const l of ['he','en','de','cs','pl'])assert.equal(w.WROC_GUIDE_VIDEO.sourceFor('papa',l),null);
});
test('Dwarf visit media uses six unique public YouTube clips with localized titles and no raw playback',()=>{
 const w=runtime(),p=w.WROC_CATALOG.getPlace('papa');assert.equal(p.media.videos.length,6);
 const records=p.media.videos.map(v=>typeof v==='string'?{src:v}:v);assert.equal(new Set(records.map(x=>x.src)).size,6);
 const hosted=records.map(v=>w.WROC_YOUTUBE_VIDEO_HOSTING[v.src]);assert.equal(hosted.filter(x=>x.status==='public').length,6);assert.ok(hosted.every(x=>x.status==='public'));
 for(const v of records){assert.ok(v.title.he&&v.title.en&&v.title.de&&v.title.cs&&v.title.pl);const reg=w.WROC_YOUTUBE_VIDEO_HOSTING[v.src];for(const lang of ['he','en','de','cs','pl']){const html=w.WROC_YOUTUBE_VIDEO.html(v.src,v.title[lang],lang);if(reg.status==='public'){assert.match(html,/youtube-nocookie\.com\/embed\//);}else{assert.equal(w.WROC_YOUTUBE_VIDEO.resolve(v.src),null);assert.match(html,/youtube-video-pending/);assert.ok(!html.includes('<iframe'));}}}
 assert.equal(w.WROC_CATALOG.getPlace('dwarf-info').media.videos.length,0);
});
