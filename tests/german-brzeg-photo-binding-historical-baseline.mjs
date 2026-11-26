import {beforeGermanFourDomesPhotoBinding,beforeGermanFourDomesPhotoRegistryRows} from './german-four-domes-photo-binding-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const germanBrzegPhotoBinding=JSON.parse(readFileSync('tests/fixtures/german-brzeg-photo-binding-20261126.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeGermanBrzegPhotoBinding(place){
 place=beforeGermanFourDomesPhotoBinding(place);
 if(place?.id!==germanBrzegPhotoBinding.target.id||!place.socialPosts?.some(r=>r.context===germanBrzegPhotoBinding.context))return place;
 assert.equal(hash(place.socialPosts),germanBrzegPhotoBinding.afterSocialHash,'Unreviewed German social change: '+place.id);
 return {...place,socialPosts:germanBrzegPhotoBinding.beforeSocialPosts};
}
export function beforeGermanBrzegPhotoRegistryRows(id,rows){
 rows=beforeGermanFourDomesPhotoRegistryRows(id,rows);
 if(id!==germanBrzegPhotoBinding.target.id||!rows?.some(r=>r.context===germanBrzegPhotoBinding.context))return rows;
 assert.equal(hash(rows),germanBrzegPhotoBinding.afterRegistryHash,'Unreviewed German registry change: '+id);
 return germanBrzegPhotoBinding.beforeRegistryRows;
}
