import {beforeCzechBarBastionBinding,beforeCzechBarBastionRegistryRows,expectedCzechBarBastionURL} from './czech-bar-bastion-bindings-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechAltusAtoBindings = JSON.parse(readFileSync('tests/fixtures/czech-altus-ato-bindings-20261124.json'));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Project only the two native-verified additions when reading older receipts.
export function beforeCzechAltusAtoBinding(place) {
  place=beforeCzechBarBastionBinding(place);
  const p=czechAltusAtoBindings.changed[place?.id];
  if(!p||!place.socialPosts?.some(row=>row.context===czechAltusAtoBindings.context))return place;
  assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Czech Altus/Ato social change: '+place.id);
  return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeCzechAltusAtoRegistryRows(id,rows) {
  rows=beforeCzechBarBastionRegistryRows(id,rows);
  const p=czechAltusAtoBindings.changed[id];
  if(!p||!rows?.some(row=>row.context===czechAltusAtoBindings.context))return rows;
  assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Czech Altus/Ato registry change: '+id);
  return p.beforeRegistryRows;
}
export function expectedCzechAltusAtoURL(id,platform,language,historical) {
  return expectedCzechBarBastionURL(id,platform,language,czechAltusAtoBindings.targets.find(t=>t.id===id&&t.row.platform===platform&&t.row.language===language)?.row.url||historical);
}
