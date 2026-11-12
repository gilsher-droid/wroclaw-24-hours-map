import{readFileSync}from'node:fs';import assert from'node:assert/strict';
const rows=JSON.parse(readFileSync('tests/fixtures/five-official-website-preservation-20261112.json'));
// Normalize only these exact approved website fields for older full-record receipts.
export function beforeFiveOfficialWebsites(place){const r=rows.find(x=>x.id===place?.id);if(!r||place.links.website===r.before)return place;assert.equal(place.links.website,r.after,'Unexpected official website delta: '+place.id);return {...place,links:{...place.links,website:r.before}};}
