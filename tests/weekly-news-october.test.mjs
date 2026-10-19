import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
const root=new URL('../',import.meta.url);
const context={window:{}};
for(const file of ['data/place-catalog.js','data/now-in-wroclaw.js']) vm.runInNewContext(fs.readFileSync(new URL(file,root),'utf8'),context);
const catalog=context.window.WROC_CATALOG;
test('verified locations preserve one identity, source provenance and temporary event dates',()=>{
 for(const [id,lat,lng] of [['zamek-topacz',51.0359459,16.9891338],['wroclaw-botanical-garden',51.1159,17.0478],['przystanek-kowary',50.79803,15.82576]]) {
   const place=catalog.getPlace(id);
   assert.equal(place.location.coordinates.lat,lat);
   assert.equal(place.location.coordinates.lng,lng);
   assert.equal(place.provenance.coordinateVerification.checkedAt,'2026-10-12');
   assert.ok(place.provenance.coordinateVerification.sourceUrl.startsWith('https://'));
   for(const alias of place.aliases) assert.equal(catalog.getPlace(alias)?.id,id);
 }
 for(const [id,start,end,status] of [['zamek-topacz','2026-10-16','2027-02-14','confirmed'],['wroclaw-botanical-garden','2026-10-13','2026-10-18','announced'],['national-museum','2026-10-01','2026-12-30','confirmed']]) {
   const event=catalog.getPlace(id).experiences[0];
   assert.equal(event.startDate,start); assert.equal(event.endDate,end); assert.equal(event.status,status);
 }
 assert.equal(catalog.getPlace('przystanek-kowary').location.address.street,'Dworcowa 8');
 assert.equal(catalog.getPlace('przystanek-kowary').provenance.openingDate,'2026-04-28');
 assert.equal(catalog.getPlace('lumina-park-2026-10'),null);
 assert.equal(catalog.getPlace('pumpkin-illuminations-2026-10'),null);
 assert.ok(catalog.getPlace('peruwiana'));
 assert.equal(catalog.getPlace('millet'),null);
});
