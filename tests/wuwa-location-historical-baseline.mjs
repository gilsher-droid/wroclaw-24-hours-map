import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const review=JSON.parse(readFileSync('tests/fixtures/wuwa-location-correction-nov22.json'));
const before=review.before.media.photos;
const after=before.filter(asset=>asset!==review.excludedAsset);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
// Project only the exact one-photo correction for immutable older receipts.
// The current-catalog test below validates the real corrected gallery.
export function beforeWuWALocationMedia(value){
  if(Array.isArray(value)&&same(value,after))return [...before];
  if(value?.id!==review.canonicalId||!same(value.media?.photos,after))return value;
  return {...value,media:{...value.media,photos:[...before]}};
}

export function beforeWuWALocationSource(file,value){
 if(file!=='data/cultural-canonical-places.js')return value;
 const text=value.toString();
 if(!text.includes(review.sourcePatch))return value;
 assert.ok(text.endsWith(review.sourcePatch),'Unreviewed WuWA location source delta');
 return Buffer.from(text.slice(0,-review.sourcePatch.length));
}
