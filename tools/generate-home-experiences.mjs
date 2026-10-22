import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
export async function generateHomeExperiences(root=process.cwd()){
 const ctx=vm.createContext({window:{}});for(const file of ['place-catalog','canonical-experiences'])vm.runInContext(await readFile(`${root}/data/${file}.js`,'utf8'),ctx);
 const featured=['beach-bars-and-waterside-summer','wroclaw-tram-ride','wroclaw-dwarf-hunt','nadodrze-neighbourhood-walk','wroclaw-milk-bars','coffee-lovers-wroclaw'];
 const data=featured.map(id=>{const e=ctx.window.WROC_EXPERIENCE_CATALOG.getExperience(id);if(!e)throw Error(id);const h=e.media?.hero;return{id,name:e.name,...(h?.position?{photoPosition:h.position}:{}),photo:h?.src||(h?.canonicalPlaceId?ctx.window.WROC_CATALOG.getPlace(h.canonicalPlaceId).media.photos[h.photoIndex]:null)}});
 await writeFile(`${root}/data/home-experiences.js`,'window.WROC_HOME_EXPERIENCES = '+JSON.stringify(data,null,2)+';\n');
}
