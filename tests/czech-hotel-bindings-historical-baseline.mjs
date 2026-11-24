import {beforeCzechAltusAtoBinding,beforeCzechAltusAtoRegistryRows,expectedCzechAltusAtoURL} from './czech-altus-ato-bindings-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechHotelBindings = JSON.parse(readFileSync('tests/fixtures/czech-hotel-photo-bindings-20261124.json'));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Project only the three native-verified additions when reading older receipts.
export function beforeCzechHotelBinding(place) {
  place=beforeCzechAltusAtoBinding(place);
  const p=czechHotelBindings.changed[place?.id];
  if(!p||!place.socialPosts?.some(row=>row.context===czechHotelBindings.context))return place;
  assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Czech hotel social change: '+place.id);
  return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeCzechHotelRegistryRows(id,rows) {
  rows=beforeCzechAltusAtoRegistryRows(id,rows);
  const p=czechHotelBindings.changed[id];
  if(!p||!rows?.some(row=>row.context===czechHotelBindings.context))return rows;
  assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Czech hotel registry change: '+id);
  return p.beforeRegistryRows;
}
export function expectedCzechHotelURL(id,platform,language,historical) {
  return expectedCzechAltusAtoURL(id,platform,language,czechHotelBindings.targets.find(t=>t.id===id&&t.row.platform===platform&&t.row.language===language)?.row.url||historical);
}
