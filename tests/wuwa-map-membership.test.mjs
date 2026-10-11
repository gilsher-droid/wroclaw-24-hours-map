import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {runInNewContext} from "node:vm";

const root=resolve(import.meta.dirname,"..");
test("WuWA café is actually registered on Lifestyle with café-only media and shared localized guides",()=>{
 const window={location:{origin:"https://wroc-love.com"}};
 const document={documentElement:{lang:"en"},addEventListener(){}};
 for(const file of ["data/place-catalog.js","data/lifestyle-places.js","data/location-media.js","guide-video.js"])
  runInNewContext(readFileSync(resolve(root,file),"utf8"),{window,document,console,URLSearchParams});
 const records=window.WROC_LIFESTYLE_PLACES.filter(p=>p.id==="wuwa");
 assert.equal(records.length,1,"a canonical record without map membership does not render a café card");
 const record=records[0];assert.equal(record.canonicalPlaceId,"wuwa");
 assert.equal(record.canonicalPlace,window.WROC_CATALOG.getPlace("wuwa"));
 assert.notEqual(record.canonicalPlace,window.WROC_CATALOG.getPlace("wuwa-estate"));
 assert.ok(window.WROC_CATALOG.products["lifestyle-guide"].places.some(p=>p.placeId==="wuwa"));
 assert.deepEqual(Array.from(record.coordinates),[51.10709,17.08730]);
 assert.ok(record.categories.includes("drink"));
 const cafe=record.canonicalPlace,estate=window.WROC_CATALOG.getPlace("wuwa-estate");
 assert.ok(cafe.media.photos.length>0);
 for(const photo of cafe.media.photos)assert.ok(estate.media.metadata[photo].tags.includes("wuwa-cafe"),`${photo}: residential/model photos do not belong in café gallery`);
 assert.deepEqual(Array.from(cafe.media.videos),["/assets/wuwa-cafe-visit-01.mp4"]);
 for(const lang of ["he","en","de","cs","pl"]){
  assert.ok(record.name[lang]);assert.ok(record.description[lang]);
  const url=window.WROC_GUIDE_VIDEO.sourceFor(record.canonicalPlaceId,lang);
  assert.equal(url,window.WROC_GUIDE_VIDEO.sourceFor("wuwa-estate",lang));
  assert.match(window.WROC_GUIDE_VIDEO.button(record.canonicalPlaceId,lang),/<a/);
  assert.match(window.WROC_GUIDE_VIDEO.embedUrlFor(url,lang),new RegExp(`cc_lang_pref=${lang}`));
 }
});


test("WuWA café Lifestyle video modal resolves the verified Public YouTube clip instead of pending",()=>{
 const window={};
 const content={innerHTML:""};
 const modal={hidden:true,setAttribute(){},querySelector(){return {focus(){}};}};
 const document={addEventListener(){},body:{style:{}},getElementById(id){return id==="media-content"?content:id==="media-modal"?modal:{textContent:""};}};
 const context={window,document,console,language:"en",escapeHtml:s=>s,placeName:()=>"WuWA Café"};
 for(const file of ["data/place-catalog.js","data/location-media.js","data/youtube-video-hosting.js","youtube-video.js"])
  runInNewContext(readFileSync(resolve(root,file),"utf8"),context);
 context.resources=window.WROC_LOCATION_MEDIA;
 context.places=[{id:"wuwa",mediaKey:"wuwa",canonicalPlace:window.WROC_CATALOG.getPlace("wuwa")}];
 const source=readFileSync(resolve(root,"lifestyle.js"),"utf8");
 const body=source.slice(source.indexOf("  function openMedia("),source.indexOf("\n  function ",source.indexOf("  function openMedia(")+10));
 runInNewContext(body+'openMedia("wuwa","video");',context);
 assert.match(content.innerHTML,/youtube-nocookie\.com\/embed\/EYv9g8XlrdA/);
 assert.ok(!content.innerHTML.includes("youtube-video-pending"));
 assert.equal(modal.hidden,false);
 const build=readFileSync(resolve(root,"build-static.mjs"),"utf8");
 assert.match(build,/scripts = await Promise.all\(\[.*"\/data\/youtube-video-hosting\.js"/);
});

test("WuWA Hebrew estate opens the verified guide reel while the café keeps its exact café photo post",()=>{
 const window={};
 runInNewContext(readFileSync(resolve(root,"data/place-catalog.js"),"utf8"),{window});
 const estate=window.WROC_CATALOG.getPlace("wuwa-estate");
 const cafe=window.WROC_CATALOG.getPlace("wuwa");
 assert.equal(window.WROC_CATALOG.getSocialPost(estate,"instagram","he").url,"https://www.instagram.com/wroclaw.lowersilesia.he/reel/DeWwwEGoSad/");
 assert.equal(window.WROC_CATALOG.getSocialPost(cafe,"instagram","he").url,"https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUv_EEkU6W/");
 assert.equal(window.WROC_CATALOG.getSocialPost(estate,"facebook","en").url,"https://www.facebook.com/reel/1065198726348075");
 assert.ok(window.WROC_CATALOG.getSocialPost(cafe,"facebook","en").url.includes("pfbid02HdjiayM8Wsxbz17y6gU7ThBTokKsUrckz5QK8D5n9mUPxtKPgDZ64TWidZFb6s7bl"));
 assert.ok(estate.socialPosts.some(p=>p.platform==="instagram"&&p.language==="en"&&p.url==="https://www.instagram.com/p/DeMbjvQjkfH/"));
});


test("WuWA estate routes to verified new guide posts in Hebrew, English and German without discarding previous posts",()=>{
 const window={};
 runInNewContext(readFileSync(resolve(root,"data/place-catalog.js"),"utf8"),{window});
 const estate=window.WROC_CATALOG.getPlace("wuwa-estate");
 const expected={he:{facebook:"https://www.facebook.com/reel/2839486733089503",instagram:"https://www.instagram.com/wroclaw.lowersilesia.he/reel/DeWwwEGoSad/"},en:{facebook:"https://www.facebook.com/reel/1065198726348075",instagram:"https://www.instagram.com/wroclaw.lowersilesia/reel/DeWy1l6hun1/"},de:{facebook:"https://www.facebook.com/reel/1495527859295815/",instagram:"https://www.instagram.com/reel/DeWyP7ugQcO/"}};
 for(const [lang,platforms] of Object.entries(expected))for(const [platform,url] of Object.entries(platforms))assert.equal(window.WROC_CATALOG.getSocialPost(estate,platform,lang).url,url);
 assert.ok(estate.socialPosts.some(p=>p.url==="https://www.instagram.com/p/DeMbjvQjkfH/"));
});
