import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechEightPhotoBindings = JSON.parse(readFileSync('tests/fixtures/czech-eight-photo-bindings-20261124.json'));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Project only the eight native-verified additions when reading older receipts.
export function beforeCzechEightPhotoBinding(place) {
  const p=czechEightPhotoBindings.changed[place?.id];
  if(!p||!place.socialPosts?.some(row=>row.context===czechEightPhotoBindings.context))return place;
  assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Czech eight-photo social change: '+place.id);
  const projected={...place,socialPosts:p.beforeSocialPosts};
  if(p.beforeDescriptionCS!==undefined){
    assert.equal(place.description.cs,p.afterDescriptionCS,'Unreviewed Czech branch description');
    projected.description={...place.description,cs:p.beforeDescriptionCS};
  }
  return projected;
}
export function beforeCzechEightPhotoRegistryRows(id,rows) {
  const p=czechEightPhotoBindings.changed[id];
  if(!p||!rows?.some(row=>row.context===czechEightPhotoBindings.context))return rows;
  assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Czech eight-photo registry change: '+id);
  return p.beforeRegistryRows;
}
export function expectedCzechEightPhotoURL(id,platform,language,historical) {
  return czechEightPhotoBindings.targets.find(t=>t.id===id&&t.row.platform===platform&&t.row.language===language)?.row.url||historical;
}

export function beforeCzechEightLegacyRow(row) {
  const p=czechEightPhotoBindings.changed[row?.id];
  if(p?.beforeDescriptionCS===undefined||row.description?.cs===p.beforeDescriptionCS)return row;
  assert.equal(row.description.cs,p.afterDescriptionCS,'Unreviewed Czech legacy branch description');
  return {...row,description:{...row.description,cs:p.beforeDescriptionCS}};
}
