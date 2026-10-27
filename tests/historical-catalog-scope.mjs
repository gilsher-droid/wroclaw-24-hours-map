import {readFileSync} from 'node:fs';

// Historical enrichment receipts describe the catalog before the separate
// Poznań addition. Keep their original record checks scoped to that catalog.
// poznan-excursion.test.mjs independently checks the full new ID set and hashes
// all 233 prior records and all six prior excursions without filtering them.
const additions = new Set(JSON.parse(readFileSync('data/poznan-excursion-place-ids.json', 'utf8')));
export const historicalPlaceIds = places => Object.keys(places).filter(id => !additions.has(id));
