import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync,readdirSync} from "node:fs";
import {resolve} from "node:path";
import {runInNewContext} from "node:vm";
import {createHash} from "node:crypto";
const root=resolve(import.meta.dirname,"..");
const videos={"four-domes":{he:"cs7AmJhitLo",en:"Ud5KD21e5kE"},"brzeg-castle":{he:"IYllRzq9VJs",en:"zbpTMh2Fe2c"},"brzeg-oder-gate":{he:"hvnoxm3reWo",en:"xs3NY7q0OX4"},"moszna-castle":{he:"5ghRWvbwU6Q",en:"UqqWiyXRk00"}};
function runtime(){const window={location:{origin:"https://wroc-love.com"}};const document={documentElement:{lang:"he"},addEventListener(){}};for(const file of ["data/place-catalog.js","guide-video.js"])runInNewContext(readFileSync(resolve(root,file),"utf8"),{window,document,console,URLSearchParams});return window;}
const captions=JSON.parse(readFileSync(resolve(root,"data/guide-player-captions.json"),"utf8"));
const manifests={...JSON.parse(readFileSync(resolve(root,"data/additional-guides-subtitle-provenance.json"),"utf8")),"four-domes":JSON.parse(readFileSync(resolve(root,"data/four-domes-subtitle-provenance.json"),"utf8"))};
test("all guide language editions use the correct YouTube video and preserve separate ordinary media",()=>{
 const window=runtime();
 for(const [id,edition]of Object.entries(videos))for(const lang of ["he","en","pl","de","cs"]){
  const expected=`https://youtube.com/shorts/${edition[lang==="he"?"he":"en"]}`;
  const place=window.WROC_CATALOG.getPlace(id);
  assert.equal(window.WROC_GUIDE_VIDEO.sourceFor(id,lang),expected);
  assert.ok(!place.media.videos.includes(expected));
  const button=window.WROC_GUIDE_VIDEO.button(id,lang);assert.match(button,new RegExp(`href="${expected}"`));
  assert.match(button,/<a/);if(lang!=="he")assert.match(button,/DE\/CZ\/PL/);
  const embed=window.WROC_GUIDE_VIDEO.embedUrlFor(expected,lang);assert.match(embed,/youtube-nocookie\.com\/embed\//);assert.match(embed,/enablejsapi=1/);assert.match(embed,/origin=https%3A%2F%2Fwroc-love.com/);
 }
 assert.equal(window.WROC_GUIDE_VIDEO.button("aleja-bielany","he"),"");
});
test("guide sources remain traceable in local production backups",()=>{
 const digest=file=>createHash("sha256").update(readFileSync(file)).digest("hex");
 for(const [id,manifest]of Object.entries(manifests)){
  const source=resolve(root,`assets/guide-${id}-en.mp4`);
  assert.equal(digest(source),manifest.sourceSHA256);
  assert.equal(digest(resolve(root,manifest.asset.slice(1))),manifest.outputSHA256);
 }
});
test("no video files are published and every product loads the YouTube renderer",()=>{
 function scan(folder){return readdirSync(folder,{withFileTypes:true}).flatMap(e=>e.isDirectory()?scan(resolve(folder,e.name)):[resolve(folder,e.name)]);}
 assert.deepEqual(scan(resolve(root,"dist/client")).filter(p=>/\.(mp4|mov|webm|m4v|avi)$/i.test(p)),[]);
 for(const name of ["map","premium","moshe","lifestyle","cultural","excursions"]){const html=readFileSync(resolve(root,`${name}.html`),"utf8");assert.match(html,/\/guide-video\.js\?v=/);assert.match(html,/\/youtube-video\.js\?v=/);assert.match(html,/\/data\/youtube-video-hosting\.js\?v=/);}
 assert.ok(existsSync(resolve(root,"dist/client/youtube-video.js")));
});
test("every linked English guide has complete DE CS PL cue coverage",()=>{
 const window=runtime();const linked=Object.values(window.WROC_CATALOG.places).filter(p=>p.media?.guideVideos?.en);
 assert.equal(linked.length,Object.keys(captions).length);
 for(const place of linked){
  const id=place.id,manifest=manifests[id],edition=captions[videos[id].en];
  assert.ok(edition);assert.deepEqual(manifest.burnedSubtitleLanguages,["de","cs","pl"]);assert.deepEqual(edition.cues,manifest.cues);
  let previousEnd=0;for(const [start,end,translations]of edition.cues){assert.ok(start>=previousEnd&&end>start&&end<=manifest.durationSeconds);assert.equal(translations.length,3);assert.ok(translations.every(text=>typeof text==="string"&&text.trim()));previousEnd=end;}
 }
});
test("responsive captions stay synchronized across seeks and exact cue boundaries",()=>{
 const window=runtime();for(const edition of Object.values(captions)){
  for(const [start,end,text]of edition.cues){assert.deepEqual(Array.from(window.WROC_GUIDE_VIDEO.cueAt(edition.cues,(start+end)/2)),text);assert.deepEqual(Array.from(window.WROC_GUIDE_VIDEO.cueAt(edition.cues,start)),text);}
  assert.deepEqual(Array.from(window.WROC_GUIDE_VIDEO.cueAt(edition.cues,-1)),["","",""]);
  assert.deepEqual(Array.from(window.WROC_GUIDE_VIDEO.cueAt(edition.cues,edition.cues.at(-1)[1])),["","",""]);
 }
});
