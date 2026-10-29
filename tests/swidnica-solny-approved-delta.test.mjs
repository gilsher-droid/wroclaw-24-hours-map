import{beforeIslandTransferSnapshot}from'./island-transfer-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import{readFileSync}from'node:fs';
import{createHash}from'node:crypto';
import vm from'node:vm';
import{beforeSwidnicaSolnyRecord,beforeSwidnicaSolnyGallery,beforeSwidnicaTrip,beforeSwidnicaSnapshot}from'./swidnica-solny-historical-baseline.mjs';
const baseline=JSON.parse(readFileSync('tests/fixtures/swidnica-solny-oct28-preintegration.json'));
const approved=JSON.parse(readFileSync('data/swidnica-solny-oct28-approved-delta.json'));
const w={};for(const f of['data/place-catalog.js','data/lower-silesia-excursions.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window:w});
beforeIslandTransferSnapshot(w);
const plain=x=>JSON.parse(JSON.stringify(x));const hash=x=>createHash('sha256').update(Buffer.isBuffer(x)?x:JSON.stringify(x)).digest('hex');
test('New square and exact Salt Square photo preserve298 other records, aliases, old galleries and eight other excursions',()=>{
 assert.equal(Object.keys(w.WROC_CATALOG.places).length,300);let untouched=0;
 for(const[id,digest]of Object.entries(baseline.recordHashes)){const now=w.WROC_CATALOG.places[id];if(id!=='solny'){assert.equal(hash(now),digest,id);untouched++;}else{const restored=plain(now);restored.media=baseline.solnyBefore.media;assert.deepEqual(restored,baseline.solnyBefore);}}
 assert.equal(untouched,298);assert.deepEqual(plain(w.WROC_CATALOG.aliases),baseline.aliases);
 const old=baseline.solnyBefore.media,now=w.WROC_CATALOG.places.solny.media;assert.deepEqual(plain(now.photos.slice(0,old.photos.length)),old.photos);assert.equal(now.photos.length,old.photos.length+1);for(const[src,m]of Object.entries(old.metadata))assert.deepEqual(plain(now.metadata[src]),m);assert.deepEqual(plain(now.videos),old.videos);
 assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,9);for(const[id,digest]of Object.entries(baseline.tripHashes)){const t=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id===id);assert.equal(hash(beforeSwidnicaTrip(t)),digest,id);}
});
test('All thirteen newly published assets preserve exact original bytes and both exact personal consents',()=>{
 const square=w.WROC_CATALOG.places['swidnica-market-square'];assert.equal(hash(square),approved.approvedNewPlaceSHA);assert.equal(square.media.photos.length,12);assert.equal(square.media.videos.length,0);
 const salt=w.WROC_CATALOG.places.solny;const entries=[...square.media.photos.map(src=>[square,src]),[salt,salt.media.photos.at(-1)]];let personalCount=0;const shas=new Set();
 for(const[p,src]of entries){const m=p.media.metadata[src];assert.equal(hash(readFileSync(src.slice(1))),m.sourceSHA256);assert.equal(m.assetSHA256,m.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const lang of['he','en','pl','de','cs'])assert.ok(m.alt[lang]);if(m.specificPersonalApproval){assert.ok([approved.source2ApprovedSHA,approved.source11ApprovedSHA].includes(m.sourceSHA256));assert.equal(m.specificPersonalApproval.sourceSHA256,m.sourceSHA256);personalCount++;}shas.add(m.sourceSHA256);}
 assert.equal(personalCount,2);assert.equal(shas.size,13);
});
test('Historical projection rejects changed identity, old media, approval metadata and itinerary content',()=>{
 const salt=w.WROC_CATALOG.places.solny;
 for(const change of[x=>x.location.coordinates.lat+=.01,x=>x.links.website='https://example.invalid',x=>x.media.photos.reverse(),x=>x.media.photos.push('/assets/unapproved.jpg'),x=>x.media.metadata[x.media.photos.at(-1)].sourceSHA256='bad']){const changed=plain(salt);change(changed);assert.throws(()=>beforeSwidnicaSolnyRecord(changed));}
 assert.throws(()=>beforeSwidnicaSolnyGallery([...salt.media.photos,'/assets/unapproved.jpg'],'solny'));
 const trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id==='ksiaz-swidnica-day-trip');for(const change of[x=>x.summary.en='unapproved',x=>x.travel.estimates[0].minutes='0',x=>x.routePoints.reverse()]){const changed=plain(trip);change(changed);assert.throws(()=>beforeSwidnicaTrip(changed));}
 const runtime={WROC_CATALOG:{...w.WROC_CATALOG,places:{...w.WROC_CATALOG.places},getPlace:id=>id==='swidnica-market-square'?{...plain(w.WROC_CATALOG.places[id]),description:{en:'unapproved'}}:w.WROC_CATALOG.getPlace(id)}};assert.throws(()=>beforeSwidnicaSnapshot(runtime));
});
