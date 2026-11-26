import {beforeGermanEightPhotoBinding,beforeGermanEightPhotoRegistryRows} from './german-eight-photo-bindings-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const germanFourDomesPhotoBinding=JSON.parse(readFileSync('tests/fixtures/german-four-domes-photo-binding-20261126.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeGermanFourDomesPhotoBinding(place){
 place=beforeGermanEightPhotoBinding(place);
 if(place?.id!==germanFourDomesPhotoBinding.target.id||!place.socialPosts?.some(r=>r.context===germanFourDomesPhotoBinding.context))return place;
 assert.equal(hash(place.socialPosts),germanFourDomesPhotoBinding.afterSocialHash,'Unreviewed German social change: '+place.id);
 return {...place,socialPosts:germanFourDomesPhotoBinding.beforeSocialPosts};
}
export function beforeGermanFourDomesPhotoRegistryRows(id,rows){
 rows=beforeGermanEightPhotoRegistryRows(id,rows);
 if(id!==germanFourDomesPhotoBinding.target.id||!rows?.some(r=>r.context===germanFourDomesPhotoBinding.context))return rows;
 assert.equal(hash(rows),germanFourDomesPhotoBinding.afterRegistryHash,'Unreviewed German registry change: '+id);
 return germanFourDomesPhotoBinding.beforeRegistryRows;
}
