import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import vm from 'node:vm';
export async function generatePlaceAnalyticsCatalog(root){
 const window={};
 for(const name of ['place-catalog','canonical-experiences'])vm.runInNewContext(await readFile(resolve(root,'data',name+'.js'),'utf8'),{window});
 const places=Object.fromEntries(Object.values(window.WROC_CATALOG.places).map(p=>[p.id,p.name?.en||p.localName||p.id]));
 const registry=window.WROC_EXPERIENCE_CATALOG;
 const experiences=Object.fromEntries(Object.values(registry.experiences||{}).map(e=>[e.id,e.name?.en||e.id]));
 const dir=resolve(root,'bluehost-api/public/place-events');await mkdir(dir,{recursive:true});
 await writeFile(resolve(dir,'catalog.json'),JSON.stringify({places,experiences})+'\n');
}
