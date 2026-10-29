import {readFile,writeFile}from'node:fs/promises';import{resolve}from'node:path';import{createHash}from'node:crypto';
export async function versionNearbyAssets(root,client){
 for(const file of ['nearby.html','index.html']){const path=resolve(client,file);let html=await readFile(path,'utf8');const urls=[...html.matchAll(/(?:src|href)="(\/[^"?]+\.(?:js|css))(?:\?[^" ]*)?"/g)].map(m=>m[1]);for(const url of new Set(urls)){const content=await readFile(resolve(root,url.slice(1)));const hash=createHash('sha256').update(content).digest('hex').slice(0,16);html=html.replaceAll(new RegExp(`((?:src|href)=")${url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(?:\\?[^" ]*)?("[ >])`,'g'),`$1${url}?v=${hash}$2`);}await writeFile(path,html);}
}
