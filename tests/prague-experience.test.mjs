import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const window={};
for(const file of ['place-catalog','canonical-experiences','home-experiences','youtube-video-hosting'])vm.runInNewContext(readFileSync(new URL(`../data/${file}.js`,import.meta.url),'utf8'),{window});
test('Prague has one discoverable five-language experience, distinct from canonical city places',()=>{
 const id='wroclaw-prague-public-transport',e=window.WROC_EXPERIENCE_CATALOG.getExperience(id);
 assert.equal(window.WROC_HOME_EXPERIENCES.filter(x=>x.id===id).length,1);
 for(const lang of ['he','en','pl','de','cs']){assert.ok(e.name[lang]);assert.ok(e.subtitle[lang]);assert.ok(e.visitNote[lang]);}
 assert.equal(e.media.hero.src,'/assets/experiences/prague/IMG_5425.JPG');
 assert.equal(new Set(e.media.images).size,12);
 assert.equal(window.WROC_CATALOG.getPlace('prague'),null);
 assert.equal(e.mapPoints.length,1);
 assert.equal(e.mapPoints[0].id,'prague-arrival');
 for(const lang of ['he','en','pl','de','cs']){assert.ok(e.mapTitle[lang]);assert.ok(e.mapNote[lang]);}
 for(const p of e.mapPoints){assert.ok(p.coordinates[0]>50.08&&p.coordinates[0]<50.10);assert.ok(p.coordinates[1]>14.42&&p.coordinates[1]<14.44);assert.ok(e.media.images.includes(p.photo));}
});
test('Prague videos resolve to eight distinct verified Public YouTube entries',()=>{
 const videos=window.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-prague-public-transport').media.videos;
 assert.equal(videos.length,8);const urls=[];
 for(const src of videos){const entry=window.WROC_YOUTUBE_VIDEO_HOSTING[src];assert.equal(entry.status,'public');urls.push(entry.youtube);}
 assert.equal(new Set(urls).size,8);
});
test('Historical Prague projection accepts the reviewed update and rejects unexpected changes', async()=>{
 const {beforePragueExperience,beforePragueSnapshot}=await import('./prague-historical-baseline.mjs');
 const e=window.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-prague-public-transport');
 assert.equal(beforePragueExperience(e).mapPoints.length,0);
 const changed=JSON.parse(JSON.stringify(e));changed.description.en+=' unexpected';
 assert.throws(()=>beforePragueExperience(changed),/Unreviewed Prague/);
 const snapshot=beforePragueSnapshot({...window});
 assert.equal(snapshot.WROC_HOME_EXPERIENCES.some(x=>x.id===e.id),false);
 assert.equal(window.WROC_HOME_EXPERIENCES.some(x=>x.id===e.id),true);
});
