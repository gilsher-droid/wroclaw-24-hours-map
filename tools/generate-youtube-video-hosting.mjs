import {readFile,writeFile} from 'node:fs/promises';
const manifest=JSON.parse(await readFile(new URL('../data/youtube-media-migration.json',import.meta.url),'utf8'));
for(const entry of Object.values(manifest)){
 if(entry.status==='public'&&!/^https:\/\/youtube\.com\/(?:shorts\/|watch\?v=)[A-Za-z0-9_-]{11}$/.test(entry.youtube||''))throw new Error('Public video is missing its verified YouTube link');
}
await writeFile(new URL('../data/youtube-video-hosting.js',import.meta.url),'window.WROC_YOUTUBE_VIDEO_HOSTING = '+JSON.stringify(manifest)+';\n');
console.log('Generated YouTube registry:',Object.values(manifest).filter(e=>e.status==='public').length,'public videos');
