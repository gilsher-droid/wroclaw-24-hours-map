import{beforeLykSnapshot}from'./cafe-lyk-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const window={};for(const file of ['place-catalog','canonical-experiences','home-experiences','youtube-video-hosting'])vm.runInNewContext(readFileSync(new URL(`../data/${file}.js`,import.meta.url),'utf8'),{window});
beforeLykSnapshot(window);
const registry=window.WROC_EXPERIENCE_CATALOG;
test('Eight historical public experiences reuse canonical places and retain separately scoped area media',()=>{
 assert.equal(window.WROC_HOME_EXPERIENCES.length,8);
 assert.deepEqual(Array.from(window.WROC_HOME_EXPERIENCES.slice(0,2),e=>e.id),['walk-with-our-guide','food-coffee-and-more']);
 for(const item of window.WROC_HOME_EXPERIENCES){if(item.destinationPath){assert.ok(['/products/interactive-maps/guides.html','/products/interactive-maps/lifestyle.html'].includes(item.destinationPath));assert.ok(existsSync(new URL('..'+item.photo,import.meta.url)));}else assert.ok(registry.getExperience(item.id));}
 const milk=registry.getExperience('wroclaw-milk-bars');assert.deepEqual(Array.from(milk.relatedCanonicalPlaceIds),['bar-mis','bar-mleczny-mewa-wroclaw','rozowa-krowa-milk-bar-wroclaw','vega-bar-weganski-wroclaw']);assert.equal(registry.resolveMedia(milk).images.length,13);assert.equal(milk.media.videos.length,0);
 const dwarfs=registry.getExperience('wroclaw-dwarf-hunt');assert.deepEqual(Array.from(dwarfs.relatedCanonicalPlaceIds),['papa','dwarf-info','mostek-pokutnic-wroclaw']);
 const media=registry.resolveMedia(dwarfs);assert.equal(media.images.length,new Set(media.images).size);assert.ok(media.images.length>=30);assert.ok(media.guides.some(g=>g.canonicalPlaceId==='papa'));
 const beach=registry.resolveMedia('beach-bars-and-waterside-summer');assert.ok(beach.guides.some(g=>g.canonicalPlaceId==='morskie-oko-wroclaw'));
 const nad=registry.getExperience('nadodrze-neighbourhood-walk');assert.deepEqual(Array.from(nad.relatedCanonicalPlaceIds),['bru-coffee-bakehouse-wroclaw','lodziarnia-roma']);assert.equal(nad.mapPoints[0].id,'nadodrze');
 assert.equal(registry.getExperience('olbin-mural-walk'),null, 'Olbin remains an idea until original media is identified');
});
test('Public experience media excludes personal tram photos and resolves videos through Public YouTube only',()=>{
 const tram=registry.resolveMedia('wroclaw-tram-ride');assert.equal(tram.images.length,10);assert.ok(tram.images.every(src=>!/IMG_(4409|4474|4728)\.jpg$/.test(src)));
 for(const item of window.WROC_HOME_EXPERIENCES.filter(e=>!e.destinationPath)){const media=registry.resolveMedia(item.id);for(const src of media.images)assert.ok(existsSync(new URL('..'+src,import.meta.url)),src);for(const src of media.videos){const url=typeof src==='string'?src:src.src;assert.ok(/^https:\/\/(?:www\.)?youtube\.com\//.test(url)||window.WROC_YOUTUBE_VIDEO_HOSTING[url]?.status==='public',url);}}
});

test('Coffee experience reuses fifteen distinct city cafes and their assigned galleries',()=>{
 const e=registry.getExperience('coffee-lovers-wroclaw');
 assert.equal(e.relatedCanonicalPlaceIds.length,15);
 assert.equal(new Set(e.relatedCanonicalPlaceIds).size,15);
 assert.deepEqual(Array.from(e.media.inheritFromCanonicalPlaceIds),Array.from(e.relatedCanonicalPlaceIds));
 for(const id of e.relatedCanonicalPlaceIds){const p=window.WROC_CATALOG.getPlace(id);assert.ok(p.media.photos.length,id);assert.ok(p.location.coordinates.lat>51&&p.location.coordinates.lat<51.2,id);}
 const media=registry.resolveMedia(e);assert.ok(media.images.length>=50);assert.equal(media.images.length,new Set(media.images).size);
 assert.ok(media.videos.length>0);
 assert.ok(window.WROC_HOME_EXPERIENCES.some(x=>x.id===e.id));
 for(const lang of ['he','en','pl','de','cs']){assert.ok(e.name[lang]);assert.ok(e.description[lang]);}
 assert.equal(registry.getExperience('vegan-vegetarian-wroclaw'),null);
 assert.equal(registry.getExperience('foodies-wroclaw'),null);
});
