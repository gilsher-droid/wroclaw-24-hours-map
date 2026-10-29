import{beforeSwidnicaSnapshot}from'./swidnica-solny-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {beforeNamedWroclawMedia,beforeNamedWroclawGallery,historicalNamedWroclawAssetSHA} from './named-wroclaw-media-historical-baseline.mjs';
const window={};for(const f of ['data/place-catalog.js','data/location-media.js','data/lower-silesia-excursions.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window});
beforeSwidnicaSnapshot(window);
const baseline=JSON.parse(readFileSync('tests/fixtures/named-wroclaw-oct28-preintegration.json'));
const approved=JSON.parse(readFileSync('data/named-wroclaw-oct28-media-provenance.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
const hash=x=>createHash('sha256').update(Buffer.isBuffer(x)?x:JSON.stringify(x)).digest('hex');
test('Named inbox preserves all280 other canonical records, all19 identities, aliases and nine excursion objects',()=>{
 assert.equal(Object.keys(window.WROC_CATALOG.places).length,299);
 let untouched=0;
 for(const[id,h]of Object.entries(baseline.recordHashes)){
  const p=window.WROC_CATALOG.getPlace(id);
  if(!baseline.targetsBefore[id]){assert.equal(hash(p),h,id);untouched++;continue;}
  const restored=plain(p);restored.media=baseline.targetsBefore[id].media;
  assert.deepEqual(restored,baseline.targetsBefore[id],id+' identity/nonmedia');
 }
 assert.equal(untouched,280);assert.deepEqual(plain(window.WROC_CATALOG.aliases),baseline.aliases);
 assert.equal(window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,9);
 for(const[id,h]of Object.entries(baseline.tripHashes))assert.equal(hash(window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id===id)),h,id);
});
test('All63 selected original assets match source SHA and full dimensions, including six guarded existing-capture upgrades',()=>{
 assert.equal(approved.assets.length,63);assert.equal(approved.assets.filter(a=>a.action==='append-distinct-original').length,57);
 assert.equal(approved.assets.filter(a=>a.action==='upgrade-existing-capture-source').length,6);
 for(const a of approved.assets){
  assert.equal(hash(readFileSync(a.asset.slice(1))),a.sourceSHA256,a.asset);
  assert.ok(a.sourceDimensions[0]>1000&&a.sourceDimensions[1]>1000);
  const places=Object.values(window.WROC_CATALOG.places).filter(p=>p.media.photos.includes(a.asset));assert.ok(places.length);
  for(const p of places){const m=p.media.metadata[a.asset];assert.equal(m.sourceSHA256,a.sourceSHA256);assert.equal(m.assetSHA256,a.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const lang of ['he','en','pl','de','cs'])assert.ok(m.alt[lang]);}
  if(baseline.replacedAssetSHAs[a.asset])assert.equal(historicalNamedWroclawAssetSHA(a.asset),baseline.replacedAssetSHAs[a.asset]);
 }
});
test('Every prior photo/order, guide and visit descriptor survives; source upgrades change only the six documented photo metadata entries',()=>{
 for(const id of approved.canonicalIDs){
  const before=baseline.targetsBefore[id].media,now=window.WROC_CATALOG.getPlace(id).media;
  assert.deepEqual(plain(now.photos.slice(0,before.photos.length)),before.photos,id+' old gallery order');
  assert.equal(new Set(now.photos).size,now.photos.length);
  assert.equal(new Set(now.photos.map(src=>hash(readFileSync(src.slice(1))))).size,now.photos.length,id+' duplicate bytes');
  if(before.thumbnail)assert.equal(now.thumbnail,before.thumbnail);
  assert.deepEqual(plain(now.videos.slice(0,before.videos.length)),before.videos);
  for(const[k,v]of Object.entries(before))if(!['photos','metadata','videos','thumbnail'].includes(k))assert.deepEqual(plain(now[k]),v,id+k);
  for(const[src,m]of Object.entries(before.metadata||{}))if(!baseline.replacedAssetSHAs[src])assert.deepEqual(plain(now.metadata[src]),m,id+src);
  assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(now.photos),id+' actual route adapter');
 }
});
test('Only the three specifically approved Public videos append to the two exact place playlists',()=>{
 const expected={28:['rynek','TzJ-mxTa-pc','0ef301149fdf6ffcc013ffec3638ccc7f7e504df593156e1d84228044267cdd1'],37:['rynek','wl_HlDde4n8','368c4dc857368137188001d8b11f69aaabea3914b82907a18eea6991b7e58719'],45:['wroclaw-botanical-garden','8Zl2zIbcScY','561c92571240a2898c074168d9c5a9ec7210ae38841f6794f9118fcd23082290']};
 assert.deepEqual(approved.videoAdditions.map(x=>x.sourceIndex),[28,37,45]);
 for(const a of approved.videoAdditions){const[id,videoID,sha]=expected[a.sourceIndex];assert.equal(a.canonicalID,id);assert.equal(a.sourceSHA256,sha);assert.equal(new URL(a.url).searchParams.get('v'),videoID);const p=window.WROC_CATALOG.getPlace(id),m=p.media.metadata[a.url];assert.equal(p.media.videos.filter(v=>v===a.url).length,1);assert.equal(m.uploadSHA256,sha);assert.equal(m.visibility,'Public');assert.equal(m.savedPublicVerified,true);assert.equal(m.actualPlaybackVerified,true);assert.equal(m.checks,'complete-no-issues');assert.equal(m.originalAudioUnchanged,true);assert.equal(m.originalPictureUnchanged,true);for(const l of ['he','en','pl','de','cs'])assert.ok(m.title[l]);assert.ok(window.WROC_LOCATION_MEDIA[id].videos.some(v=>(typeof v==='string'?v:v.src)===a.url));}
 const garden=window.WROC_CATALOG.getPlace('wroclaw-botanical-garden');assert.match(garden.media.metadata[approved.videoAdditions[2].url].description.en,/surroundings|approach|outside/i);
});
test('All65 photographs are accounted for; exposure variant65 reuses64 and historical poster62 stays archived',()=>{
 assert.equal(approved.sourceLedger.length,65);assert.equal(new Set(approved.sourceLedger.map(x=>x.sourceIndex)).size,65);
 assert.equal(approved.sourceLedger.find(x=>x.sourceIndex===65).selectedSourceIndex,64);
 assert.equal(approved.sourceLedger.find(x=>x.sourceIndex===62).state,'historical-advertisement-archived');
 assert.ok(!approved.sourceLedger.some(x=>x.state==='identity-pending'));
 assert.ok(!approved.videoAdditions.some(x=>x.sourceIndex===36));
 assert.match(window.WROC_CATALOG.getPlace('solny').media.metadata['/assets/named-wroclaw-oct28/source-042.jpg'].alt.en,/adjoining lane/);
});
test('Historical projection rejects changed coordinates, links, original bytes metadata, galleries and unapproved video edits for every target',()=>{
 for(const id of approved.canonicalIDs){const p=window.WROC_CATALOG.getPlace(id);assert.deepEqual(beforeNamedWroclawMedia(p),baseline.targetsBefore[id]);assert.deepEqual(plain(beforeNamedWroclawGallery(p.media.photos,id)),baseline.targetsBefore[id].media.photos);
  for(const mutate of [x=>x.location.coordinates.lat+=.01,x=>x.links.website='https://example.invalid',x=>x.media.photos.push('/assets/unapproved.jpg'),x=>x.media.metadata[x.media.photos[0]]={bad:true},x=>x.media.videos.push('https://youtu.be/unapproved')]){const changed=plain(p);mutate(changed);assert.throws(()=>beforeNamedWroclawMedia(changed),id);}
  assert.throws(()=>beforeNamedWroclawGallery([...p.media.photos,'/assets/unapproved.jpg'],id));
 }
 const untouched=window.WROC_CATALOG.getPlace('forum-kulinarne-wroclaw');assert.equal(beforeNamedWroclawMedia(untouched),untouched);
});

test('Each authorized video delta rejects changed source provenance, title and removal',()=>{
 for(const a of approved.videoAdditions){const p=window.WROC_CATALOG.getPlace(a.canonicalID);
  for(const mutate of [x=>x.media.metadata[a.url].uploadSHA256='unapproved',x=>x.media.metadata[a.url].title.en='Unreviewed title',x=>x.media.videos=x.media.videos.filter(v=>v!==a.url)]){const changed=plain(p);mutate(changed);assert.throws(()=>beforeNamedWroclawMedia(changed),String(a.sourceIndex));}
 }
});

test('Existing DoubleTree and water-overlay Cafe Targowa cards expose the approved gallery without adding places',()=>{
 const w={WROC_CATALOG:window.WROC_CATALOG};vm.runInNewContext(readFileSync('data/lifestyle-places.js','utf8'),{window:w});
 assert.equal(w.WROC_LIFESTYLE_PLACES.filter(p=>p.id==='doubletree').length,1);assert.equal(w.WROC_LIFESTYLE_PLACES.find(p=>p.id==='doubletree').mediaKey,'doubletree');
 const source=readFileSync('lifestyle.js','utf8');const body=source.slice(source.indexOf('  function openMedia('),source.indexOf('  function closeMedia('));
 const content={innerHTML:'',querySelectorAll:()=>[]};const modal={hidden:true,setAttribute(){},querySelector:()=>({focus(){}})};const title={textContent:''};
 vm.runInNewContext(body+";openMedia('cafe-targowa','gallery');",{places:[],freeWaterOverlayPlaces:[{id:'cafe-targowa',mediaKey:'cafe-targowa',name:'Cafe Targowa',canonicalPlace:window.WROC_CATALOG.getPlace('cafe-targowa')}],resources:window.WROC_LOCATION_MEDIA,language:'en',local:x=>typeof x==='object'?x.en:x,placeName:x=>x.name,escapeHtml:x=>x,document:{getElementById:id=>id==='media-modal'?modal:id==='media-title'?title:content,body:{style:{}}}});
 assert.equal(modal.hidden,false);assert.match(content.innerHTML,/source-027.jpg/);assert.match(content.innerHTML,/source-063.jpg/);
});
