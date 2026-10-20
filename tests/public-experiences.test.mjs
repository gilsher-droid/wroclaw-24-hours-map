import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const window={};for(const file of ['place-catalog','canonical-experiences','home-experiences','youtube-video-hosting'])vm.runInNewContext(readFileSync(new URL(`../data/${file}.js`,import.meta.url),'utf8'),{window});
const registry=window.WROC_EXPERIENCE_CATALOG;
test('Four public experiences reuse canonical places and retain separately scoped area media',()=>{
 assert.equal(window.WROC_HOME_EXPERIENCES.length,4);
 for(const {id} of window.WROC_HOME_EXPERIENCES)assert.ok(registry.getExperience(id));
 const dwarfs=registry.getExperience('wroclaw-dwarf-hunt');assert.deepEqual(Array.from(dwarfs.relatedCanonicalPlaceIds),['papa','dwarf-info']);
 const media=registry.resolveMedia(dwarfs);assert.equal(media.images.length,new Set(media.images).size);assert.ok(media.images.length>=30);assert.ok(media.guides.some(g=>g.canonicalPlaceId==='papa'));
 const beach=registry.resolveMedia('beach-bars-and-waterside-summer');assert.ok(beach.guides.some(g=>g.canonicalPlaceId==='morskie-oko-wroclaw'));
 const nad=registry.getExperience('nadodrze-neighbourhood-walk');assert.deepEqual(Array.from(nad.relatedCanonicalPlaceIds),['bru-coffee-bakehouse-wroclaw','lodziarnia-roma']);assert.equal(nad.mapPoints[0].id,'nadodrze');
 assert.equal(registry.getExperience('olbin-mural-walk'),null, 'Olbin remains an idea until original media is identified');
});
test('Public experience media excludes personal tram photos and resolves videos through Public YouTube only',()=>{
 const tram=registry.resolveMedia('wroclaw-tram-ride');assert.equal(tram.images.length,8);assert.ok(tram.images.every(src=>!/IMG_(4409|4474|4728)\.jpg$/.test(src)));
 for(const item of window.WROC_HOME_EXPERIENCES){const media=registry.resolveMedia(item.id);for(const src of media.images)assert.ok(existsSync(new URL('..'+src,import.meta.url)),src);for(const src of media.videos){const url=typeof src==='string'?src:src.src;assert.ok(/^https:\/\/(?:www\.)?youtube\.com\//.test(url)||window.WROC_YOUTUBE_VIDEO_HOSTING[url]?.status==='public',url);}}
});
