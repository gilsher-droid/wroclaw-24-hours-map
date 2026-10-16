import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
test('Four excursion audits remove only reviewed repetitions while retaining alternatives and Public uploads',()=>{
 const c=JSON.parse(readFileSync('data/excursion-gallery-curation-oct16.json','utf8')),window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window,console});const catalog=window.WROC_CATALOG,registry=JSON.parse(readFileSync('data/youtube-media-migration.json','utf8'));
 assert.equal(c.photoExclusions.length,59);assert.equal(c.videoExclusions.length,6);assert.equal(c.guidesPreserved,true);assert.equal(c.originalsPreserved,true);
 for(const [id,n] of Object.entries(c.counts)){const p=catalog.getPlace(id);assert.equal(p.media.photos.length,n.after.photos);assert.equal(p.media.videos.length,n.after.videos);}
 for(const p of c.photoExclusions){assert.equal(existsSync(p.asset.slice(1)),false);assert.equal(catalog.getPlace(p.placeId).media.photos.includes(p.asset),false);assert.ok(catalog.getPlace(p.placeId).media.photos.includes(p.retain));assert.match(p.sourceSHA256,/^[a-f0-9]{64}$/);}
 for(const v of c.videoExclusions){const gallery=catalog.getPlace(v.placeId).media.videos;assert.equal(gallery.includes(v.youtube),false);assert.ok(gallery.includes(v.retain));assert.ok(Object.values(registry).some(r=>r.status==='public'&&r.youtube===v.youtube),'Curating a gallery must not delete its Public YouTube upload');}
 for(const asset of ['/assets/ksiaz-castle-12.jpg','/assets/ksiaz-castle-13.jpg'])assert.ok(catalog.getPlace('ksiaz-castle').media.photos.includes(asset),'Different projected memorial content remains available');
});
