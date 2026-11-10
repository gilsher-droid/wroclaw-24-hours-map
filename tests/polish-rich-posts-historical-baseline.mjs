// Old preservation receipts predate the separately verified Polish social bindings.
// Only the exact accepted social-array delta is projected; every other field remains.
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const signatures=JSON.parse(readFileSync('tests/fixtures/polish-rich-posts-20261110-signatures.json'));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function expectedPolishSocialUrl(id,platform,language,historical){
 if(id==='chatka'&&platform==='instagram'&&language==='pl')return null;
 return platform==='facebook'&&language==='pl'&&signatures[id]?signatures[id].url:historical;
}
export function beforePolishRichPosts(value){
 const added=value?.socialPosts?.filter(post=>post.context==='verified-rich-place-gallery')||[];
 if(!added.length)return value;
 const signature=signatures[value.id];
 assert.ok(signature,'Unapproved Polish place binding: '+value.id);
 assert.equal(added.length,1);
 assert.equal(added[0].url,signature.url);
 assert.equal(hash(value.socialPosts),signature.after,'Unapproved Polish social delta: '+value.id);
 const socialPosts=value.socialPosts.filter(post=>post.context!=='verified-rich-place-gallery');
 assert.equal(hash(socialPosts),signature.before,'Historical social evidence changed: '+value.id);
 return {...value,socialPosts};
}
