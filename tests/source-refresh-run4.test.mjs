import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const window={};
for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/location-media.js','data/lifestyle-places.js','data/cultural-places.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
const c=window.WROC_CATALOG,b=JSON.parse(readFileSync('data/source-refresh-run4-preservation.json','utf8')),plain=x=>JSON.parse(JSON.stringify(x));
test('Run4 adds44 reviewed full-picture photographs, keeps208 unrelated records exact and preserves changed identities, links and old media except the documented Roma portrait',()=>{
 assert.equal(Object.keys(c.places).length,231);assert.equal(b.selectedPhotos.length,44);assert.equal(new Set(b.selectedPhotos.map(x=>x.sourceSHA256)).size,44);assert.equal(Object.keys(b.hashes).length,208);
 for(const[id,h]of Object.entries(b.hashes))assert.equal(createHash('sha256').update(JSON.stringify(c.getPlace(id))).digest('hex'),h,id);
 for(const[id,old]of Object.entries(b.beforeChanged)){const p=c.getPlace(id);for(const key of ['id','name','description','location','links','socialPosts'])assert.deepEqual(plain(p[key]),old[key],id+':'+key);assert.equal(p.media.thumbnail,old.media.thumbnail,id+':hero');const oldPhotos=old.media.photos.filter(src=>id!=='lodziarnia-roma'||src!=='/assets/food-cafes/lodziarnia-roma-03.jpg');assert.deepEqual(plain(p.media.photos.slice(0,oldPhotos.length)),oldPhotos,id+':oldphotos');}
 for(const x of b.selectedPhotos){const p=x.targetId==='wroclaw-dwarf-hunt'?window.WROC_EXPERIENCE_CATALOG.getExperience(x.targetId):c.getPlace(x.targetId),photos=p.media.photos||p.media.images;assert.ok(photos.includes(x.asset),x.asset);const m=p.media.metadata[x.asset];assert.equal(m.sourceSHA256,x.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.familyExceptionApplied,false);assert.equal(createHash('sha256').update(readFileSync(x.asset.slice(1))).digest('hex'),x.assetSHA256);for(const lang of['he','en','pl','de','cs'])assert.ok(m.alt[lang],x.asset+':'+lang);}
 assert.ok(!c.getPlace('lodziarnia-roma').media.photos.some(x=>x.endsWith('lodziarnia-roma-03.jpg')));
});
test('Run4 new physical venues stay distinct and their actual map media adapters expose the reviewed photographs',()=>{
 assert.equal(b.newIds.length,7);for(const id of b.newIds){const p=c.getPlace(id);assert.equal(p.links.socialProfileFallback,false);assert.equal(p.socialPosts.length,0);for(const lang of['he','en','pl','de','cs'])assert.ok(p.name[lang]&&p.description[lang]);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos),id+':gallery adapter');}
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
