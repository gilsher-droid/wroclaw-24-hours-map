import {czechMosznaPhotoBinding,beforeCzechMosznaPhotoBinding,beforeCzechMosznaPhotoRegistryRows} from './czech-moszna-photo-binding-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const czechNextPhotoBindings=JSON.parse(readFileSync('tests/fixtures/czech-next-photo-bindings-20261124.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Remove only these 38 exact, native-verified additions for older receipt checks.
export function beforeCzechNextPhotoBinding(place){
 place=beforeCzechMosznaPhotoBinding(place);
 const p=czechNextPhotoBindings.changed[place?.id];
 if(!p||!place.socialPosts?.some(r=>r.context===czechNextPhotoBindings.context))return place;
 assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Czech photo social change: '+place.id);
 return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeCzechNextPhotoRegistryRows(id,rows){
 rows=beforeCzechMosznaPhotoRegistryRows(id,rows);
 const p=czechNextPhotoBindings.changed[id];
 if(!p||!rows?.some(r=>r.context===czechNextPhotoBindings.context))return rows;
 assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Czech photo registry change: '+id);
 return p.beforeRegistryRows;
}
export function expectedCzechNextPhotoURL(id,platform,language,historical){
 if(id===czechMosznaPhotoBinding.id&&platform==='facebook'&&language==='cs')return czechMosznaPhotoBinding.row.url;
 return czechNextPhotoBindings.targets.find(t=>t.id===id&&t.row.platform===platform&&t.row.language===language)?.row.url||historical;
}
