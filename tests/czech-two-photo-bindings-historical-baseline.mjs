import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechTwoPhotoBindings=JSON.parse(readFileSync('tests/fixtures/czech-two-photo-bindings-20261125.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeCzechTwoPhotoBinding(place){
 const p=czechTwoPhotoBindings.changed[place?.id];
 if(!p||!place.socialPosts?.some(r=>r.context===czechTwoPhotoBindings.context))return place;
 assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Czech social change: '+place.id);
 return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeCzechTwoPhotoRegistryRows(id,rows){
 const p=czechTwoPhotoBindings.changed[id];
 if(!p||!rows?.some(r=>r.context===czechTwoPhotoBindings.context))return rows;
 assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Czech registry change: '+id);
 return p.beforeRegistryRows;
}
