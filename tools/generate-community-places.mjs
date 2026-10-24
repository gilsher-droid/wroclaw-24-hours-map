import {readFile,writeFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {resolve} from 'node:path';
export async function generateCommunityPlaces(root=process.cwd()){
 const window={};runInNewContext(await readFile(resolve(root,'data/place-catalog.js'),'utf8'),{window});
 const places=Object.fromEntries(Object.values(window.WROC_CATALOG.places).filter(p=>p.status==='published'&&p.location?.coordinates).map(p=>[p.id,{id:p.id,name:p.name,coordinates:p.location.coordinates}]));
 const text=JSON.stringify(places,null,2)+'\n';await writeFile(resolve(root,'data/community-places.json'),text);
 await writeFile(resolve(root,'bluehost-api/public/personal-trips/community-places.json'),text);
}
if(process.argv[1]===new URL(import.meta.url).pathname)await generateCommunityPlaces();
