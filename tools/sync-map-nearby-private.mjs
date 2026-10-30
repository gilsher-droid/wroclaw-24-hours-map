import{readFile,writeFile,copyFile,readdir}from'node:fs/promises';import{resolve}from'node:path';import{runInNewContext}from'node:vm';import{createHash}from'node:crypto';
export async function syncMapNearbyPrivate(root=process.cwd()){
 const dir=resolve(root,'bluehost-api/public/personal-trips');
 for(const f of ['map-tiles.js','map-nearby.js','map-nearby.css','nearby-model.js','place-panel-copy.js','place-popup-photo.js','place-popup-photo.css'])await copyFile(resolve(root,f),resolve(dir,f));
 await copyFile(resolve(root,'data/dining-taxonomy.js'),resolve(dir,'dining-taxonomy.js'));
 const source=await readFile(resolve(root,'data/place-catalog.js'),'utf8'),window={};runInNewContext(source,{window});await writeFile(resolve(dir,'public-catalog.js'),source);
 await writeFile(resolve(dir,'nearby-places.json'),JSON.stringify(Object.fromEntries(Object.entries(window.WROC_CATALOG.places).filter(([,p])=>!['private','hidden','excluded','deleted','rejected'].includes(p.status)&&p.location?.coordinates)),null,2)+'\n');
 const manifest={};for(const f of (await readdir(dir)).sort())if(/\.(js|css|json)$/.test(f)&&f!=='album-assets.json')manifest[f]=createHash('sha256').update(await readFile(resolve(dir,f))).digest('hex');await writeFile(resolve(dir,'album-assets.json'),JSON.stringify(manifest,null,2)+'\n');
}
if(process.argv[1]===new URL(import.meta.url).pathname)await syncMapNearbyPrivate();
