import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {beforeNov18EnglishTwo} from './english-two-social-bindings-nov18-historical-baseline.mjs';
const proof=JSON.parse(readFileSync('data/polskie-jadlo-market-preservation-nov15.json','utf8'));
const id=proof.canonicalId,clone=x=>JSON.parse(JSON.stringify(x));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');

export function assertApprovedPolskieJadlo(record){
  if(record?.id===id)assert.equal(hash(record),proof.approvedRecordHash,'Unreviewed Polskie Jadlo record');
}
export function beforePolskieJadloExperience(value){
  const expected=proof.approvedExperiences[value?.id];
  if(!expected||!value.relatedCanonicalPlaceIds?.includes(id))return value;
  assert.equal(hash(value),hash(expected),'Unreviewed Polskie Jadlo experience membership');
  return clone(proof.beforeExperiences[value.id]);
}
// Older preservation receipts retain their exact scope. The new independent
// test protects all 346 preceding records and the real, unprojected addition.
export function beforePolskieJadloSnapshot(window){
  const catalog=window.WROC_CATALOG;
  if(catalog){
    assertApprovedPolskieJadlo(catalog.getPlace(id));
    assertApprovedPolskieJadlo(catalog.places[id]);
    const places=Object.fromEntries(Object.entries(catalog.places).map(([key,p])=>[key,beforeNov18EnglishTwo(p)]));delete places[id];
    const products={...catalog.products};
    if(products['lifestyle-guide'])products['lifestyle-guide']={...products['lifestyle-guide'],places:products['lifestyle-guide'].places.filter(row=>{
      if(row.placeId!==id)return true;
      assert.deepEqual(clone(row),proof.approvedProductRow,'Unreviewed Polskie Jadlo product reference');return false;
    })};
    window.WROC_CATALOG={...catalog,places,products,getPlace:key=>{
      const place=catalog.getPlace(key);assertApprovedPolskieJadlo(place);return place?.id===id?null:beforeNov18EnglishTwo(place);
    }};
  }
  if(window.WROC_LIFESTYLE_PLACES)window.WROC_LIFESTYLE_PLACES=window.WROC_LIFESTYLE_PLACES.filter(row=>{
    if((row.canonicalPlaceId||row.id)!==id)return true;
    assert.deepEqual(clone(row),proof.approvedLifestyleRow,'Unreviewed Polskie Jadlo map row');return false;
  });
  if(window.WROC_LOCATION_MEDIA?.[id]){
    assert.deepEqual(clone(window.WROC_LOCATION_MEDIA[id]),proof.approvedLocationMedia,'Unreviewed Polskie Jadlo gallery');
    window.WROC_LOCATION_MEDIA={...window.WROC_LOCATION_MEDIA};delete window.WROC_LOCATION_MEDIA[id];
  }
  const registry=window.WROC_EXPERIENCE_CATALOG;
  if(registry){
    for(const key of Object.keys(proof.approvedExperiences))beforePolskieJadloExperience(registry.getExperience(key));
    window.WROC_EXPERIENCE_CATALOG={...registry,
      experiences:registry.experiences.map(beforePolskieJadloExperience),
      byId:Object.fromEntries(Object.entries(registry.byId).map(([key,value])=>[key,beforePolskieJadloExperience(value)])),
      getExperience:key=>beforePolskieJadloExperience(registry.getExperience(key)),
      forProduct:key=>registry.forProduct(key).map(beforePolskieJadloExperience)};
  }
  return window;
}
