import {beforeCzechEightPhotoBinding,beforeCzechEightPhotoRegistryRows,expectedCzechEightPhotoURL} from './czech-eight-photo-bindings-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechBarBastionBindings = JSON.parse(readFileSync('tests/fixtures/czech-bar-bastion-bindings-20261124.json'));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Project only the two native-verified additions when reading older receipts.
export function beforeCzechBarBastionBinding(place) {
  place=beforeCzechEightPhotoBinding(place);
  const p=czechBarBastionBindings.changed[place?.id];
  if(!p||!place.socialPosts?.some(row=>row.context===czechBarBastionBindings.context))return place;
  assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Czech Bar/Bastion social change: '+place.id);
  return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeCzechBarBastionRegistryRows(id,rows) {
  rows=beforeCzechEightPhotoRegistryRows(id,rows);
  const p=czechBarBastionBindings.changed[id];
  if(!p||!rows?.some(row=>row.context===czechBarBastionBindings.context))return rows;
  assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Czech Bar/Bastion registry change: '+id);
  return p.beforeRegistryRows;
}
export function expectedCzechBarBastionURL(id,platform,language,historical) {
  return expectedCzechEightPhotoURL(id,platform,language,czechBarBastionBindings.targets.find(t=>t.id===id&&t.row.platform===platform&&t.row.language===language)?.row.url||historical);
}
