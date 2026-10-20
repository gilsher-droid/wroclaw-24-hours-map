import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync,readdirSync} from "node:fs";
import {resolve} from "node:path";
import {runInNewContext} from "node:vm";
import {createHash} from "node:crypto";
const root=resolve(import.meta.dirname,"..");
const videos={"klodzko-old-town":{"he": "0YyKS3LcHrU", "en": "reMcbePY2yo"},"klodzko-fortress":{"he": "zNAM3xG5ED4", "en": "Swz838oySqQ"},"four-denominations-district":{"he": "rSn6kJy3gQE", "en": "oqziuQx8hLQ"},"renoma":{"he":"nrLBgAkEdt0","en":"0lgh4TXXbeo"},"bastion":{"he":"FLx49x9AtUM","en":"xc9jiC3TfNA"},"zyjnia-bwa-wroclaw":{"he":"ZO-A54BIZQk","en":"BAueoGqdcC4"},"morskie-oko-wroclaw":{"he":"R26FXh9Twh0","en":"e0gGTjUPYoQ"},"stadion-olimpijski-wroclaw":{"he":"--MnGY29fng","en":"tiCdc_8vIYw"},"pergola":{"he":"78GzPBmtRo4","en":"yP9iXmP47RQ"},"hala":{"he": "y74YI_tgRq0", "en": "EOBJMMmLY_I"},"boleslawiec-old-town":{"he": "0OvV3ic5ukk", "en": "WUcLYYodyrg"},"wang-church":{"he": "MinjLfDR-nc", "en": "I0yVmZFViio"},"karpacz-centre":{"he": "gQlJjc241gk", "en": "4WgaQo6HmWg"},"jelenia-gora-market-square":{"he": "kv047H3sRvA", "en": "G8QVSsk1ABk"},"jawor-church-of-peace":{he:"NovPV4iArX8",en:"JAXpHFfZH74"},"papa":{he:"Eyns7Gj66d0",en:"pIzp5Bmb9ck"},"fountain":{he:"O4te9Tsw3FU",en:"wYu3-sO5WkE"},"japanese":{he:"x39Gu8wchuA",en:"anSJzrqzqqg"},"four-domes":{he:"cs7AmJhitLo",en:"Ud5KD21e5kE"},"brzeg-castle":{he:"IYllRzq9VJs",en:"zbpTMh2Fe2c"},"brzeg-oder-gate":{he:"hvnoxm3reWo",en:"xs3NY7q0OX4"},"moszna-castle":{he:"5ghRWvbwU6Q",en:"UqqWiyXRk00"},"wuwa-estate":{he:"tEbmB6OWe90",en:"4EnO5yNkQxc"},"wuwa":{he:"tEbmB6OWe90",en:"4EnO5yNkQxc"}};
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
  assert.match(button,/<a/);assert.ok(!button.includes("DE/CZ/PL"));
  const embed=window.WROC_GUIDE_VIDEO.embedUrlFor(expected,lang);assert.match(embed,/youtube-nocookie\.com\/embed\//);assert.match(embed,/cc_load_policy=1/);assert.match(embed,new RegExp(`cc_lang_pref=${lang}`));assert.ok(!embed.includes("fs=0"));assert.match(embed,/origin=https%3A%2F%2Fwroc-love.com/);
 }
 assert.equal(window.WROC_GUIDE_VIDEO.button("aleja-bielany","he"),"");
 for (const lang of ["he","en","de","cs","pl"]) assert.equal(window.WROC_GUIDE_VIDEO.sourceFor("wuwa",lang),window.WROC_GUIDE_VIDEO.sourceFor("wuwa-estate",lang),"café shares the guide that discusses it");
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
test("legacy English guides retain complete DE CS PL fallback cue coverage",()=>{
 const window=runtime();const linked=Object.values(window.WROC_CATALOG.places).filter(p=>p.media?.guideVideos?.en&&manifests[p.id]);
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

test("every linked guide has published native caption proof for every map language",()=>{
 const window=runtime();
 const proof=JSON.parse(readFileSync(resolve(root,"docs/native-youtube-caption-verification.json"),"utf8"));
 assert.deepEqual(proof.mapLanguageCaptionPreference,{he:"he",en:"en",de:"de",cs:"cs",pl:"pl"});
 const linked=Object.values(window.WROC_CATALOG.places).filter(p=>p.media?.guideVideos?.en);
 for(const place of linked){
  const edition=videos[place.id];assert.ok(edition,`${place.id}: missing expected video identity`);
  const verified=proof.guides.find(g=>g.videos.en===edition.en&&g.videos.he===edition.he);
  assert.ok(verified,`${place.id}: YouTube Studio published-caption verification required before linking`);
  if(place.id==="wuwa"||place.id==="wuwa-estate")assert.ok(verified.sharedCanonicalPlaceIds.includes(place.id),"shared guide identity must be documented");
  for(const lang of ["en","de","cs","pl"])assert.ok(verified.englishPublishedManualTracks.includes(lang),`${place.id}: ${lang} captions must be published`);
  assert.equal(verified.hebrewPublishedTrack.language,"he");
 }
});

test("WuWA native caption sources preserve uploaded tracks, timing and original hashes",()=>{
 const provenance=JSON.parse(readFileSync(resolve(root,"data/wuwa-guide-caption-provenance.json"),"utf8"));
 assert.deepEqual(provenance.canonicalPlaceIds,["wuwa-estate","wuwa"]);
 for(const lang of ["he","en","de","cs","pl"]){
  const track=provenance.tracks[lang];
  const expectedEdition=lang==="he"?"he":"en";
  assert.equal(track.edition,expectedEdition);assert.equal(track.status,"Published");
  const source=provenance.editions[expectedEdition];
  assert.equal(source.videoId,videos["wuwa-estate"][expectedEdition]);assert.equal(source.visibility,"Public");
  assert.match(source.sourceSHA256,/^[a-f0-9]{64}$/);
  assert.equal(createHash("sha256").update(readFileSync(resolve(root,track.srtFile))).digest("hex"),track.srtSHA256);
  let previousEnd=0;
  for(const cue of track.cues){assert.ok(cue.start>=previousEnd&&cue.end>cue.start&&cue.end<=source.durationSeconds+.1);assert.ok(cue.text.trim());previousEnd=cue.end;}
  assert.ok(track.cues.length>0);
 }
});
