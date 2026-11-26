import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const germanEightPhotoBindings=JSON.parse(readFileSync('tests/fixtures/german-eight-photo-bindings-20261126.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeGermanEightPhotoBinding(place){
 const p=germanEightPhotoBindings.changed[place?.id];
 if(!p||!place.socialPosts?.some(r=>r.context===germanEightPhotoBindings.context))return place;
 assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed German social change: '+place.id);
 return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeGermanEightPhotoRegistryRows(id,rows){
 const p=germanEightPhotoBindings.changed[id];
 if(!p||!rows?.some(r=>r.context===germanEightPhotoBindings.context))return rows;
 assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed German registry change: '+id);
 return p.beforeRegistryRows;
}
