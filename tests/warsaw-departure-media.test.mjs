import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync} from 'node:fs';import {runInNewContext} from 'node:vm';import {createHash} from 'node:crypto';
test('Warsaw photos have original provenance, exact city geography and separate optional stops',()=>{
 const window={};for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(f,'utf8'),{window});
 const trip=window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id==='warsaw-lodz-wroclaw');
 assert.equal(trip.departurePlaceIds.length,3);assert.equal(trip.canonicalPlaceIds.length,8);
 const sums=new Set();for(const id of trip.departurePlaceIds){const p=window.WROC_CATALOG.getPlace(id);assert.equal(p.location.cityId,'warsaw');assert.ok(p.location.coordinates.lat>52.23&&p.location.coordinates.lat<52.25);assert.ok(!trip.canonicalPlaceIds.includes(id));for(const lang of ['he','en','pl','de','cs']){assert.ok(p.name[lang]);assert.ok(p.description[lang]);}for(const src of p.media.photos){assert.ok(existsSync(src.slice(1)));const meta=p.media.metadata[src],sum=createHash('sha256').update(readFileSync(src.slice(1))).digest('hex');assert.equal(meta.assetSHA256,sum);assert.equal(meta.familyForeground,false);assert.ok(!sums.has(meta.sourceSHA256));sums.add(meta.sourceSHA256);}}
 assert.equal(sums.size,8);
});
