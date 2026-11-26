import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const heTwoInstagramMapGaps=JSON.parse(readFileSync('tests/fixtures/he-two-instagram-map-gaps-20261126.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function beforeHeTwoInstagramMapGap(place){
 const p=heTwoInstagramMapGaps.changed[place?.id];
 if(!p||!place.socialPosts?.some(r=>r.context===heTwoInstagramMapGaps.context))return place;
 assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed HE social change: '+place.id);
 return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeHeTwoInstagramRegistryRows(id,rows){
 const p=heTwoInstagramMapGaps.changed[id];
 if(!p||!rows?.some(r=>r.context===heTwoInstagramMapGaps.context))return rows;
 assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed HE registry change: '+id);
 return p.beforeRegistryRows;
}
