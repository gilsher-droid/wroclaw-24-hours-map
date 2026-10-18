import './build-static.mjs';
import {readFile,writeFile,readdir,rm,rename,copyFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=process.cwd(),client=resolve(root,'dist/client'),output=resolve(root,'dist/sandbox');
const disabled=['management','admin.html','admin.js','access.html','access.js','checkout.html','checkout.js'];
for(const name of disabled)await rm(join(client,name),{recursive:true,force:true});
await writeFile(join(client,'analytics-config.js'),'window.WROC_ANALYTICS_CONFIG = Object.freeze({ga4MeasurementId:"",metaPixelId:""});\n');
await copyFile(resolve(root,'sandbox-guard.js'),join(client,'sandbox-guard.js'));
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory()){await walk(p);continue;}if(!e.name.endsWith('.html'))continue;let html=await readFile(p,'utf8');html=html.replace(/<head([^>]*)>/i,'<head$1>\n<meta name="robots" content="noindex,nofollow,noarchive">\n<script src="/sandbox-guard.js"></script>');await writeFile(p,html);}}
await walk(client);
// Read-only production image reuse keeps this preview small. Put experimental
// images under assets/sandbox/ so they remain local to this environment.
const experiments=join(client,'assets/sandbox');
let experimentalFiles=[];
try { experimentalFiles=await readdir(experiments); } catch {}
const savedExperiments=join(root,'dist/sandbox-assets');
if(experimentalFiles.length) await rename(experiments,savedExperiments);
await rm(join(client,'assets'),{recursive:true,force:true});
await mkdir(join(client,'assets'),{recursive:true});
if(experimentalFiles.length) await rename(savedExperiments,experiments);
await writeFile(join(client,'.htaccess'),`Options -Indexes
<IfModule mod_headers.c>
Header set X-Robots-Tag "noindex, nofollow, noarchive"
Header set Cache-Control "no-store"
</IfModule>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^assets/(.*)$ https://wroc-love.com/assets/$1 [R=302,L,NE]
`);
await writeFile(join(client,'robots.txt'),'User-agent: *\nDisallow: /\n');
await writeFile(join(client,'sandbox-manifest.json'),JSON.stringify({environment:'sandbox',productionPublishing:false,liveFormSubmissions:false,productionAnalytics:false,assets:'existing public production media via read-only redirect; overrides under assets/sandbox/',disabledRoutes:disabled},null,2));
await rm(output,{recursive:true,force:true});await rename(client,output);
console.log('Isolated static sandbox built at dist/sandbox. No production deployment performed.');
