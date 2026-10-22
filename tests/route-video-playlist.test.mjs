import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const window={};
for(const file of ['data/place-catalog.js','data/location-media.js','youtube-video.js'])runInNewContext(readFileSync(file,'utf8'),{window,console});
const app=readFileSync('app.js','utf8');
const openFunction=app.slice(app.indexOf('  function openVideo('),app.indexOf('  function closeVideo('));
test('Actual 24h open handler opens both raw canonical Tumski visits in all five languages',()=>{
 const place=window.WROC_CATALOG.getPlace('most-tumski');
 const source={id:place.id,name:place.name,resources:window.WROC_LOCATION_MEDIA[place.id]};
 assert.equal(source.resources.videos.length,2);
 assert.deepEqual(Array.from(source.resources.videos),['https://www.youtube.com/watch?v=3Sxf4k4DkiM','https://www.youtube.com/watch?v=9nOC5KsNCqQ']);
 for(const lang of ['he','en','pl','de','cs']){
  const elements={'video-choices':{},'video-modal':{hidden:true},'video-close':{focus(){}}};let rendered;
  const context={window,currentLanguage:lang,allLocations:()=>[source],escapeHtml:String,document:{getElementById:id=>elements[id],body:{classList:{add(){}}}},renderVideo(){rendered=context.activeVideoLocation;}};
  runInNewContext(openFunction+';openVideo("most-tumski");',context);
  assert.equal(elements['video-modal'].hidden,false,lang);
  assert.ok(rendered);assert.equal(rendered.resources.videos.length,2);
  for(const video of rendered.resources.videos){assert.equal(typeof video.src,'string');assert.equal(video.title[lang],place.name[lang]);assert.ok(window.WROC_YOUTUBE_VIDEO.embed(video.src));}
  assert.equal((elements['video-choices'].innerHTML.match(/class="video-choice"/g)||[]).length,2);
 }
 assert.equal(typeof source.resources.videos[0],'string','Source stays unchanged');
});
test('Shared playlist accepts legacy title objects and strings without losing titles or URLs',()=>{
 const input=[{src:'https://youtu.be/3Sxf4k4DkiM',title:{he:'ביקור',en:'Visit'}},{src:'https://youtu.be/9nOC5KsNCqQ',title:'Second visit'}];
 const result=window.WROC_YOUTUBE_VIDEO.playlist(input,{});
 assert.equal(result[0].title.he,'ביקור');assert.equal(result[0].title.cs,'Visit');assert.equal(result[1].title.he,'Second visit');assert.equal(result[1].src,input[1].src);
});
