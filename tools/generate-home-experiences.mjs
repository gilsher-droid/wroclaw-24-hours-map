import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
export async function generateHomeExperiences(root=process.cwd()){
 const ctx=vm.createContext({window:{}});for(const file of ['place-catalog','canonical-experiences'])vm.runInContext(await readFile(`${root}/data/${file}.js`,'utf8'),ctx);
 const featured=['coffee-lovers-wroclaw','beach-bars-and-waterside-summer','wroclaw-tram-ride','wroclaw-dwarf-hunt','nadodrze-neighbourhood-walk','wroclaw-milk-bars','bridges-and-islands-wroclaw'];
 const promoted=[{"id": "walk-with-our-guide", "kind": "experience", "destinationPath": "/products/interactive-maps/guides.html", "name": {"he": "ללכת עם המדריך שלנו", "en": "Walk with our guide", "pl": "Spacer z naszym przewodnikiem", "de": "Mit unserem Reiseführer durch Wrocław", "cs": "Procházka s naším průvodcem"}, "photo": "/assets/wuwa-estate-14.jpg"}, {"id": "food-coffee-and-more", "kind": "experience", "destinationPath": "/products/interactive-maps/lifestyle.html", "name": {"he": "אוכל, קפה ומה שביניהם", "en": "Food, cafés and more", "pl": "Jedzenie, kawa i więcej", "de": "Essen, Cafés und mehr", "cs": "Jídlo, káva a něco navíc"}, "photo": "/assets/food-cafes/cafe-berg-01.jpg"}];
 const data=[...promoted,...featured.map(id=>{const e=ctx.window.WROC_EXPERIENCE_CATALOG.getExperience(id);if(!e)throw Error(id);const h=e.media?.hero;return{id,name:e.name,...(h?.position?{photoPosition:h.position}:{}),photo:h?.src||(h?.canonicalPlaceId?ctx.window.WROC_CATALOG.getPlace(h.canonicalPlaceId).media.photos[h.photoIndex]:null)}})];
 await writeFile(`${root}/data/home-experiences.js`,'window.WROC_HOME_EXPERIENCES = '+JSON.stringify(data,null,2)+';\n');
}
