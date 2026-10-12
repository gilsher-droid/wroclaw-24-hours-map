import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const root=resolve(import.meta.dirname,'..');
function runtime(){const window={location:{origin:'https://wroc-love.com'}};const document={documentElement:{lang:'he'},addEventListener(){}};for(const file of ['data/place-catalog.js','data/youtube-video-hosting.js','youtube-video.js','guide-video.js'])runInNewContext(readFileSync(resolve(root,file),'utf8'),{window,document,console,URLSearchParams});return window;}
test('Japanese Garden keeps existing gallery and adds only two unique photos and two public YouTube visit clips',()=>{
 const w=runtime(),place=w.WROC_CATALOG.getPlace('japanese');
 assert.equal(place.media.photos.length,8);assert.equal(new Set(place.media.photos).size,8);
 assert.deepEqual(Array.from(place.media.videos),['https://youtube.com/shorts/Ni0GwsP-uMg','https://youtube.com/shorts/OMuXVtwAkAA']);
 for(const url of place.media.videos){assert.equal(w.WROC_YOUTUBE_VIDEO.resolve(url),url);assert.equal(w.WROC_YOUTUBE_VIDEO_HOSTING[url].status,'public');assert.match(w.WROC_YOUTUBE_VIDEO.html(url),/youtube-nocookie\.com\/embed\//);}
 for(const asset of ['assets/japanese-visit-07.jpg','assets/japanese-visit-08.jpg'])assert.ok(existsSync(resolve(root,asset)));
});
test('Japanese Garden guide badge and native captions follow all five map languages',()=>{
 const w=runtime();for(const lang of ['he','en','de','cs','pl']){
 const video=lang==='he'?'x39Gu8wchuA':'anSJzrqzqqg',src=w.WROC_GUIDE_VIDEO.sourceFor('japanese',lang);
 assert.equal(src,'https://youtube.com/shorts/'+video);assert.match(w.WROC_GUIDE_VIDEO.embedUrlFor(src,lang),new RegExp('cc_lang_pref='+lang));
 const icon=w.WROC_GUIDE_VIDEO.decorateIcon({html:'garden',className:'place'},'japanese',lang);assert.match(icon.className,/guide-marker-shell/);assert.match(icon.html,/guide-marker-badge/);
 }
});
test('Japanese Garden five manual caption tracks are published and match stored source checksums',()=>{
 const p=JSON.parse(readFileSync(resolve(root,'data/japanese-guide-caption-provenance.json'),'utf8'));
 for(const lang of ['he','en','de','cs','pl']){const t=p.tracks[lang];assert.equal(t.status,'Published');assert.equal(t.edition,lang==='he'?'he':'en');assert.equal(p.editions[t.edition].visibility,'Public');assert.equal(t.srtSHA256,createHash('sha256').update(readFileSync(resolve(root,t.srtFile))).digest('hex'));let end=0;for(const c of t.cues){assert.ok(c.start>=end&&c.end>c.start&&c.end<=p.editions[t.edition].durationSeconds);end=c.end;}}
});

test('four-day native visit modal resolves Japanese direct YouTube URLs and preserves titled video records',()=>{
 const w=runtime(),place=w.WROC_CATALOG.getPlace('japanese');
 const nodes={"video-player":{src:"",parentElement:{querySelector:()=>null},setAttribute(){}},"video-title":{textContent:""}};
 const document={getElementById:id=>nodes[id],querySelectorAll:()=>[]};
 const source=readFileSync(resolve(root,'premium.js'),'utf8');
 const extract=name=>{const start=source.indexOf('  function '+name+'(');return source.slice(start,source.indexOf('\n  ',source.indexOf('\n  }',start)+5));};
 const context={window:w,document,language:'en',compactActionLabels:{en:{videos:'Video'}},activeVideoLocation:{id:'japanese',name:'Japanese Garden',resources:{videos:place.media.videos}},activeVideoIndex:0,text:s=>s};
 runInNewContext(extract('resourcesFor')+extract('renderVideo')+'renderVideo();',context);
 assert.match(nodes['video-player'].src,/youtube-nocookie\.com\/embed\/Ni0GwsP-uMg/);
 assert.equal(nodes['video-title'].textContent,'Japanese Garden — Video 1');
 context.activeVideoIndex=1;runInNewContext('renderVideo();',context);
 assert.match(nodes['video-player'].src,/youtube-nocookie\.com\/embed\/OMuXVtwAkAA/);
 const titled={src:'https://youtube.com/shorts/Ni0GwsP-uMg',title:'Stream'};
 context.activeVideoLocation.resources.videos=[titled];context.activeVideoIndex=0;runInNewContext('renderVideo();',context);
 assert.equal(nodes['video-title'].textContent,'Japanese Garden — Stream');
});
