// Project only the exact owner-approved photo correction for older receipts.
// Historical fixtures remain unchanged; the new regression checks the real state.
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const before=JSON.parse(readFileSync('tests/fixtures/jolie-photo-attribution-nov8-before.json'));
const signatures=JSON.parse(readFileSync('tests/fixtures/jolie-photo-attribution-nov8-signatures.json'));
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
export function beforeJoliePhotoAttribution(value){
 const signature=signatures[value?.id];
 return signature&&hash(value)===signature.after?before[value.id]:value;
}
export function beforeJoliePhotoSnapshot(w){
 const c=w.WROC_CATALOG;
 if(c)w.WROC_CATALOG={...c,places:Object.fromEntries(Object.entries(c.places).map(([id,p])=>[id,beforeJoliePhotoAttribution(p)])),getPlace:id=>beforeJoliePhotoAttribution(c.getPlace(id))};
 for(const rows of Object.values(w).filter(Array.isArray))for(const row of rows)if(row?.canonicalPlace)row.canonicalPlace=beforeJoliePhotoAttribution(row.canonicalPlace);
 for(const id of Object.keys(before)){
  const resource=w.WROC_LOCATION_MEDIA?.[id],gallery=resource?.gallery;
  if(!gallery)continue;
  const old=before[id].media.photos;
  const corrected=id==='chatka'?old.filter(p=>p!=='/assets/feels-familiar/chatka-placki.jpg'):[...old,'/assets/feels-familiar/chatka-placki.jpg'];
  if(hash(gallery)===hash(corrected))resource.gallery=[...old];
 }
 return w;
}
