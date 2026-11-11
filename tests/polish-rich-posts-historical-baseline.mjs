import {beforeHeCurrent79Routing,expectedHeCurrent79Url} from './he-current79-historical-baseline.mjs';
import {beforeHeWrittenPhotoPosts,heWrittenPhotoSignatures} from './he-written-photo-historical-baseline.mjs';
// Old preservation receipts predate the separately verified Polish social bindings.
// Only the exact accepted social-array delta is projected; every other field remains.
import {beforeApprovedPlaceMedia} from './approved-place-media-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const signatures={
 ...JSON.parse(readFileSync('tests/fixtures/polish-rich-posts-20261110-signatures.json')),
 ...JSON.parse(readFileSync('tests/fixtures/new-cemetery-pl-post-20261111-signatures.json')),
 ...JSON.parse(readFileSync('tests/fixtures/new-horizons-bridge-social-20261111-signatures.json')),
 ...JSON.parse(readFileSync('tests/fixtures/dwarf-info-pl-post-20261111-signatures.json')),
};
const acceptedContexts=new Set(['verified-rich-place-gallery','verified-rich-place-photo-gallery']);
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function expectedPolishSocialUrl(id,platform,language,historical){
 const currentHE=expectedHeCurrent79Url(id,platform,language,historical);if(currentHE!==historical)return currentHE;
 if(language==='he'&&heWrittenPhotoSignatures[id]?.urls[platform])return heWrittenPhotoSignatures[id].urls[platform];
 if(id==='chatka'&&platform==='instagram'&&language==='pl')return null;
 if(signatures[id]?.urls?.[`${platform}:${language}`])return signatures[id].urls[`${platform}:${language}`];
 return platform==='facebook'&&language==='pl'&&signatures[id]?signatures[id].url:historical;
}
export function beforePolishRichPosts(value){
 value=beforeApprovedPlaceMedia(beforeHeWrittenPhotoPosts(beforeHeCurrent79Routing(value)));
 const added=value?.socialPosts?.filter(post=>acceptedContexts.has(post.context))||[];
 if(!added.length)return value;
 const signature=signatures[value.id];
 assert.ok(signature,'Unapproved Polish place binding: '+value.id);
 assert.equal(added.length,signature.addedCount||1);
 for(const post of added)assert.equal(post.url,signature.urls?.[`${post.platform}:${post.language}`]||signature.url);
 assert.equal(hash(value.socialPosts),signature.after,'Unapproved Polish social delta: '+value.id);
 const socialPosts=value.socialPosts.filter(post=>!acceptedContexts.has(post.context));
 assert.equal(hash(socialPosts),signature.before,'Historical social evidence changed: '+value.id);
 return {...value,socialPosts};
}
