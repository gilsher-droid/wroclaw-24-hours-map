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
