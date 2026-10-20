import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {resolve} from "node:path";
import {runInNewContext} from "node:vm";
const root=resolve(import.meta.dirname,"..");
test("Nadodrze media enriches its existing area without leaking to Olbin or duplicating places",()=>{
 const ctx={window:{},console}; for(const f of ["place-catalog","canonical-experiences","cultural-places"])runInNewContext(readFileSync(resolve(root,`data/${f}.js`),"utf8"),ctx);
 const w=ctx.window,e=w.WROC_EXPERIENCE_CATALOG.getExperience("street-art-nadodrze-olbin");
 assert.equal(w.WROC_EXPERIENCE_CATALOG.experiences.length,13);
 assert.equal(w.WROC_CULTURAL_EXPERIENCES.filter(x=>x.id===e.id).length,1);
 assert.equal(w.WROC_CATALOG.getPlace("nadodrze"),null);
 assert.deepEqual(Array.from(e.mapPoints,p=>p.id),["nadodrze","olbin"]);
 const [n,o]=e.mapPoints;assert.deepEqual(Array.from(n.coordinates),[51.1192,17.0325]);assert.deepEqual(Array.from(o.coordinates),[51.119,17.05]);
 assert.equal(n.media.photos.length,2);assert.equal(n.media.videos.length,1);assert.equal(o.media,undefined);
 for(const l of ["he","en","pl","de","cs"]){assert.ok(n.name[l]);assert.ok(n.description[l]);assert.ok(n.media.metadata[n.media.photos[0]].alt[l]);}
 assert.ok(existsSync(resolve(root,n.media.photos[0].slice(1))));
 const registry=JSON.parse(readFileSync(resolve(root,"data/youtube-media-migration.json"),"utf8"));assert.ok(Object.values(registry).some(v=>v.youtube===n.media.videos[0]&&v.status==="public"));
 assert.equal(n.social.length,10);assert.ok(n.social.every(post=>["he","en","pl","de","cs"].includes(post.language)));assert.equal(n.links.socialProfileFallback,false);
});
