import{beforeFiveOfficialWebsites}from'./five-official-websites-historical-baseline.mjs';
import{readFileSync}from'node:fs';import assert from'node:assert/strict';
const rows=JSON.parse(readFileSync('tests/fixtures/he-five-description-preservation-20261112.json'));
// Older full-record receipts normalize only these five explicitly approved HE fields.
export function beforeHeFiveDescriptions(place){place=beforeFiveOfficialWebsites(place);const r=rows.find(x=>x.id===place?.id);if(!r||place.description.he===r.before)return place;assert.equal(place.description.he,r.after,'Unexpected Hebrew description delta: '+place.id);return {...place,description:{...place.description,he:r.before}};}
