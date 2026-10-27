import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const window={};
for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/location-media.js','data/lifestyle-places.js','data/cultural-places.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
const c=window.WROC_CATALOG,b=JSON.parse(readFileSync('data/source-refresh-run4-preservation.json','utf8')),plain=x=>JSON.parse(JSON.stringify(x));
test('Run4 adds44 reviewed full-picture photographs, keeps208 unrelated records exact and preserves changed identities, links and old media except the documented Roma portrait',()=>{
 assert.equal(historicalPlaceIds(c.places).length,((231)+1)+1);assert.equal(b.selectedPhotos.length,44);assert.equal(new Set(b.selectedPhotos.map(x=>x.sourceSHA256)).size,44);assert.equal(Object.keys(b.hashes).length,208);
 for(const[id,h]of Object.entries(b.hashes).filter(([id])=>!["papa","rynek","town-hall","marietta-focacceria-wroclaw","jatki","math-tower","ossolineum","university","aula","wyspa-piasek","jas-malgosia","most-piaskowy"].includes(id)))assert.equal(createHash('sha256').update(JSON.stringify(c.getPlace(id))).digest('hex'),h,id);
 for(const[id,old]of Object.entries(b.beforeChanged).filter(([id])=>!["papa","rynek","town-hall","marietta-focacceria-wroclaw","jatki","math-tower","ossolineum","university","aula","wyspa-piasek","jas-malgosia","most-piaskowy"].includes(id))){const p=c.getPlace(id);for(const key of ['id','name','description','location','links','socialPosts'])if(!(id==='ostrow'&&['location','links'].includes(key)))assert.deepEqual(plain(p[key]),old[key],id+':'+key);assert.equal(p.media.thumbnail,old.media.thumbnail,id+':hero');for(const url of old.media.videos||[]){if(id==='lodziarnia-roma'&&url==='/assets/lodziarnia-roma-visit-02.mp4'){assert.ok(!p.media.videos.includes(url));assert.ok(c.getPlace('domek-nad-fosa-wroclaw').media.videos.includes('https://youtube.com/shorts/wdCORtqPNig'));}else assert.ok(p.media.videos.includes(url),id+':old video preserved');}if(old.media.guideVideos)assert.deepEqual(plain(p.media.guideVideos),old.media.guideVideos,id+':existing guide preserved');const oldPhotos=old.media.photos.filter(src=>id!=='lodziarnia-roma'||src!=='/assets/food-cafes/lodziarnia-roma-03.jpg');assert.deepEqual(plain(p.media.photos.slice(0,oldPhotos.length)),oldPhotos,id+':oldphotos');}
 for(const x of b.selectedPhotos){const p=x.targetId==='wroclaw-dwarf-hunt'?window.WROC_EXPERIENCE_CATALOG.getExperience(x.targetId):c.getPlace(x.targetId),photos=p.media.photos||p.media.images;assert.ok(photos.includes(x.asset),x.asset);const m=p.media.metadata[x.asset];assert.equal(m.sourceSHA256,x.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.familyExceptionApplied,false);assert.equal(createHash('sha256').update(readFileSync(x.asset.slice(1))).digest('hex'),x.assetSHA256);for(const lang of['he','en','pl','de','cs'])assert.ok(m.alt[lang],x.asset+':'+lang);}
 assert.ok(!c.getPlace('lodziarnia-roma').media.photos.some(x=>x.endsWith('lodziarnia-roma-03.jpg')));
});
test('Run4 new physical venues stay distinct and their actual map media adapters expose the reviewed photographs',()=>{
 assert.equal(b.newIds.length,7);for(const id of b.newIds){const p=c.getPlace(id);assert.equal(p.links.socialProfileFallback,false);assert.equal(p.socialPosts.length,0);if(!['st-martin-church-wroclaw','piastowska-pieczec-wroclaw','most-pomorski-poludniowy-wroclaw'].includes(id))assert.ok(p.sourceRecords.length>0,id+':canonical product membership');for(const lang of['he','en','pl','de','cs'])assert.ok(p.name[lang]&&p.description[lang]);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos),id+':gallery adapter');}
 for(const id of['india-concept-wroclaw','woosabi-swidnicka-wroclaw','lwia-brama-restaurant-wroclaw'])assert.equal(window.WROC_LIFESTYLE_PLACES.filter(p=>p.id===id).length,1,id);
 for(const id of['st-martin-church-wroclaw','piastowska-pieczec-wroclaw','most-pomorski-poludniowy-wroclaw'])assert.equal(window.WROC_CULTURAL_PLACES.filter(p=>p.id===id).length,1,id);
 assert.notDeepEqual(plain(c.getPlace('woosabi').location.coordinates),plain(c.getPlace('woosabi-swidnicka-wroclaw').location.coordinates));assert.equal(c.getPlace('woosabi-swidnicka-wroclaw').location.address.street,'Świdnicka 28');assert.equal(c.getPlace('india-concept-wroclaw').location.address.street,'Kiełbaśnicza 7A');
 assert.ok(!c.getPlace('woosabi').media.photos.some(x=>x.includes('run4-207-')));assert.ok(c.getPlace('woosabi-swidnicka-wroclaw').media.photos.some(x=>x.includes('run4-207-')));
 assert.notDeepEqual(plain(c.getPlace('st-martin-church-wroclaw').location.coordinates),plain(c.getPlace('piastowska-pieczec-wroclaw').location.coordinates));
});

test('The user-identified Vega meal uses the existing full photograph and a distinct vegan place card in the same milk-bar experience',()=>{
 const p=c.getPlace('vega-bar-weganski-wroclaw'),e=window.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-milk-bars'),src='/assets/experiences/milk-bars/visit-03.jpg';
 assert.deepEqual(plain(p.media.photos),[src]);assert.equal(p.media.metadata[src].sourceSHA256,'e35f4703a26f4fdf6608423ead410c4090ccd5d7f50aabc4381d11b5d9193075');
 assert.equal(e.relatedCanonicalPlaceIds.length,4);for(const id of['bar-mis','bar-mleczny-mewa-wroclaw','rozowa-krowa-milk-bar-wroclaw',p.id]){assert.ok(e.relatedCanonicalPlaceIds.includes(id));assert.ok(e.media.inheritFromCanonicalPlaceIds.includes(id));}
 assert.equal(window.WROC_LIFESTYLE_PLACES.filter(x=>x.id===p.id).length,1);assert.equal(p.location.address.street,'Sukiennice 1/2, wejście od Rynek 27a');
 for(const lang of['he','en','pl','de','cs'])assert.ok(p.description[lang]);
});
test('All five explicitly authorized guide pairs use their existing canonical cards, correct audio language and verified native caption tracks',()=>{
 const document={documentElement:{lang:'he'},addEventListener(){}};window.location={origin:'https://wroc-love.com'};
 runInNewContext(readFileSync('guide-video.js','utf8'),{window,document,URLSearchParams});
 for(const id of['cathedral','ostrow','nfm','most-tumski','wroclaw-puppet-theatre']){
  const p=c.getPlace(id),proof=p.provenance.run4GuidePublication;assert.equal(proof.publicReopened,true,id);assert.equal(proof.checksNoIssues,true,id);assert.equal(proof.originalFullPictureAndAudioPreserved,true,id);
  assert.equal(proof.nativeCaptions.length,5);assert.deepEqual(Array.from(proof.nativeCaptions,t=>t.language).sort(),['cs','de','en','he','pl']);assert.notEqual(p.media.guideVideos.he,p.media.guideVideos.en);
  for(const lang of['he','en','pl','de','cs']){const expected=p.media.guideVideos[lang==='he'?'he':'en'];assert.equal(window.WROC_GUIDE_VIDEO.sourceFor(id,lang),expected);const embed=new URL(window.WROC_GUIDE_VIDEO.embedUrlFor(expected,lang));assert.equal(embed.searchParams.get('cc_lang_pref'),lang);assert.equal(embed.searchParams.get('cc_load_policy'),'1');const track=proof.nativeCaptions.find(t=>t.language===lang);assert.equal(track.published,true);assert.equal(track.reopened,true);assert.ok(track.cues>0);assert.match(track.sha256,/^[a-f0-9]{64}$/);assert.ok(expected.endsWith(track.videoId));}
 }
});

test('All thirteen approved silent visits are attached to their actual place or experience and exposed by the real media adapters',()=>{
 const visits=JSON.parse(readFileSync('data/source-refresh-run4-public-visits.json','utf8'));assert.equal(visits.length,13);assert.equal(new Set(visits.map(x=>x.youtubeId)).size,13);
 for(const v of visits){const isExperience=v.canonicalOrExperienceId==='wroclaw-dwarf-hunt',p=isExperience?window.WROC_EXPERIENCE_CATALOG.getExperience(v.canonicalOrExperienceId):c.getPlace(v.canonicalOrExperienceId);assert.ok(p.media.videos.includes(v.url));const m=p.media.metadata[v.url];assert.equal(m.sourceSHA256,v.sourceSHA256);assert.equal(m.durationSeconds,v.durationSeconds);assert.equal(m.status,'public');assert.equal(m.reopenedPublicVerified,true);assert.equal(m.sdProcessingComplete,true);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.silent,true);assert.equal(m.familyExceptionApplied,false);for(const lang of['he','en','pl','de','cs'])assert.ok(m.title[lang]);if(!isExperience)assert.ok(window.WROC_LOCATION_MEDIA[p.id].videos.includes(v.url),p.id+':actual video adapter');}
 const milk=window.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-milk-bars');assert.equal(milk.metadata.pendingMedia.length,0);assert.ok(window.WROC_EXPERIENCE_CATALOG.resolveMedia(milk).videos.includes('https://www.youtube.com/watch?v=V1hFXIlvORA'));
});

test("The original Woosabi lifestyle card exposes its refreshed gallery action",()=>{const p=window.WROC_LIFESTYLE_PLACES.find(p=>p.id==="woosabi");assert.equal(p.mediaKey,"woosabi");assert.ok(window.WROC_LOCATION_MEDIA[p.mediaKey].gallery.some(src=>src.includes("run4-156-woosabi")));});
