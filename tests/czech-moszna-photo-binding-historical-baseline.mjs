import {beforeCzechTwoPhotoBinding,beforeCzechTwoPhotoRegistryRows} from './czech-two-photo-bindings-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechMosznaPhotoBinding=JSON.parse(readFileSync('tests/fixtures/czech-moszna-photo-binding-20261125.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeCzechMosznaPhotoBinding(place){
 place=beforeCzechTwoPhotoBinding(place);
 const p=czechMosznaPhotoBinding;
 if(place?.id!==p.id||!place.socialPosts?.some(r=>r.context===p.context))return place;
 assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Moszna social change');
 return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeCzechMosznaPhotoRegistryRows(id,rows){
 rows=beforeCzechTwoPhotoRegistryRows(id,rows);
 const p=czechMosznaPhotoBinding;
 if(id!==p.id||!rows?.some(r=>r.context===p.context))return rows;
 assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Moszna registry change');
 return p.beforeRegistryRows;
}
