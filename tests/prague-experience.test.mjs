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
 assert.equal(e.mapPoints.length,2);
 assert.equal(e.mapPoints[0].id,'wroclavia-bus-departure');
 assert.equal(e.mapPoints[1].id,'prague-arrival');
 assert.equal(e.mapRoute.kind,'schematic');
 assert.equal(e.mapRoute.provenance.fullTrackAvailable,false);
 assert.deepEqual(Array.from(e.mapRoute.coordinates[0]),Array.from(e.mapPoints[0].coordinates));
 assert.deepEqual(Array.from(e.mapRoute.coordinates.at(-1)),Array.from(e.mapPoints[1].coordinates));
 for(const lang of ['he','en','pl','de','cs']){assert.ok(e.mapTitle[lang]);assert.ok(e.mapNote[lang]);}
 for(const p of e.mapPoints){assert.ok(e.media.images.includes(p.photo));}
 assert.ok(e.mapPoints[0].coordinates[0]>51.09&&e.mapPoints[0].coordinates[0]<51.10);
 assert.ok(e.mapPoints[1].coordinates[0]>50.08&&e.mapPoints[1].coordinates[0]<50.10);
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
test('Prague planning identifies the documented bus departure and separates the optional road-trip extension',()=>{
 const e=window.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-prague-public-transport');
 const planning=e.journeyPlanning;
 assert.deepEqual(Array.from(planning.options,x=>x.id),['flixbus','train','car','flight','scenic-extension']);
 for(const lang of ['he','en','pl','de','cs']){
  assert.ok(planning.title[lang]&&planning.intro[lang]&&planning.note[lang]);
  for(const option of planning.options){assert.ok(option.title[lang]&&option.body[lang]);for(const link of option.links)assert.ok(link.label[lang]);}
 }
 assert.match(planning.options[0].body.en,/Wroclavia/);
 assert.match(planning.options[0].body.en,/Wrocław Główny/);
 assert.match(planning.options[0].body.en,/level -2/);
 assert.match(planning.options.at(-1).body.en,/plan the onward leg to Prague separately/);
 assert.ok(planning.options.at(-1).links[0].url.includes('trip=jawor-karpacz-jelenia-gora-day-trip'));
 assert.ok(planning.options.at(-1).links[0].url.includes('lang={lang}'));
});
