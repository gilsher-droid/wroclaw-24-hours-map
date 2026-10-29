import{lykAdditionId,assertReviewedLyk}from'./cafe-lyk-historical-baseline.mjs';
import{clubParkAdditionIds,assertReviewedClubPark}from'./club-copernicus-historical-baseline.mjs';
import {readFileSync} from 'node:fs';

// Historical enrichment receipts describe the catalog before the separate
// Poznań addition. Keep their original record checks scoped to that catalog.
// poznan-excursion.test.mjs independently checks the full new ID set and hashes
// all 233 prior records and all six prior excursions without filtering them.
// The separately authorized Bielsko/Opole addition has its own preservation
// test against all269 prior records and all7 prior excursion objects.
const additions = new Set([lykAdditionId,...clubParkAdditionIds,"swidnica-market-square",...JSON.parse(readFileSync('data/poznan-excursion-place-ids.json', 'utf8')), ...JSON.parse(readFileSync('data/slovakia-bielsko-opole-place-ids.json', 'utf8')), ...JSON.parse(readFileSync('data/torun-excursion-place-ids.json', 'utf8'))]);
export const historicalPlaceIds = places => {assertReviewedLyk(places);assertReviewedClubPark(places);return Object.keys(places).filter(id => !additions.has(id));};
