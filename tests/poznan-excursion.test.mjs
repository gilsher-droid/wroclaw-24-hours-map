import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';

const languages = ['he', 'en', 'pl', 'de', 'cs'];
function load() {
  const window = {};
  for (const file of ['data/place-catalog.js', 'data/lower-silesia-excursions.js', 'data/home-excursions.js']) {
    runInNewContext(readFileSync(file, 'utf8'), {window});
  }
  return window;
}

test('Poznan focuses on its city walk and optional places without an intercity map line', () => {
  const w = load(), product = w.WROC_LOWER_SILESIA_EXCURSIONS;
  const trip = product.excursions.find(item => item.id === 'poznan-wroclaw-stopover');
  assert.ok(trip);
  assert.equal(product.excursions.length, 7);
  assert.equal(trip.meta.region, 'wielkopolska');
  assert.equal(trip.initialMapFocus, 'local-stops');
  assert.deepEqual(Array.from(trip.walkingRoute.points, point => point.canonicalPlaceId), Array.from(trip.canonicalPlaceIds));
  assert.equal(trip.walkingRoute.closedLoop, false);
  for (const id of trip.optionalPlaceIds) {
    assert.ok(!trip.canonicalPlaceIds.includes(id), `${id} must not become a mandatory stop`);
    assert.ok(!trip.routePoints.some(point => point.canonicalPlaceId === id));
    assert.ok(product.canonicalPlaceIds.includes(id));
  }
  const walk = new URL(trip.walkingRoute.navigation.googleMaps);
  assert.equal(trip.navigation.googleMaps, walk.href);
  assert.equal(trip.localOnlyMap, true);
  assert.ok(trip.routePoints.every(point => point.canonicalPlaceId));
  assert.equal(walk.searchParams.get('travelmode'), 'walking');
  assert.ok(!walk.href.includes('Warsaw'));
  assert.ok(w.WROC_HOME_EXCURSIONS.find(item => item.id === trip.id)?.photo.startsWith('/assets/poznan/'));
});

test('Poznan places retain explicit Greater Poland geography and complete localized text', () => {
  const w = load(), trip = w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(item => item.id === 'poznan-wroclaw-stopover');
  const ids = [...trip.canonicalPlaceIds, ...trip.optionalPlaceIds];
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) {
    const place = w.WROC_CATALOG.getPlace(id);
    assert.equal(place.location.cityId, 'poznan');
    assert.equal(place.location.regionId, 'wielkopolska');
    assert.equal(place.location.countryCode, 'PL');
    assert.ok(place.location.coordinates.lat > 52.39 && place.location.coordinates.lat < 52.43);
    assert.ok(place.location.coordinates.lng > 16.88 && place.location.coordinates.lng < 17.03);
    assert.equal(place.links.socialProfileFallback, false);
    for (const language of languages) {
      assert.ok(place.name[language]?.trim());
      assert.ok(place.description[language]?.trim());
      assert.ok(trip.title[language]?.trim());
    }
    for (const text of [place.name.he, place.description.he]) {
      for (const line of text.split('\n')) assert.ok(!(/[א-ת]/.test(line) && /[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(line)), `${id}: mixed Hebrew and Latin line`);
    }
  }
  assert.notEqual(w.WROC_CATALOG.getPlace('nifty-puro-poznan').id, w.WROC_CATALOG.getPlace('puro-poznan-stare-miasto').id);
  assert.match(w.WROC_CATALOG.getPlace('stary-mlyn-zamkowa-poznan').description.en, /not eaten at this Poznań branch/i);
});

test('Poznan media records the current inventory and the scoped folder approval', () => {
  const proof = JSON.parse(readFileSync('data/poznan-excursion-media-provenance.json', 'utf8'));
  assert.equal(proof.sourcePhotoFiles, 131);
  assert.equal(proof.reviewedCurrentInventory, 138);
  assert.equal(proof.folderPersonalMediaApproval.scope, 'Poznanfolder only');
  assert.equal(proof.folderPersonalMediaApproval.humanWords, 'כל התמונות והסירטונים האישיים של פוזנן מאושרים לפרסום');
  assert.equal(proof.sourceVideoFiles, 7);
  assert.ok(proof.photos.length > 0);
  const w = load(), held = new Set(proof.heldPersonalPhotos.map(row => row.sourceSHA256));
  for (const photo of proof.photos) {
    assert.ok(existsSync(`.${photo.asset}`));
    assert.match(photo.sourceSHA256, /^[a-f0-9]{64}$/);
    assert.match(photo.assetSHA256, /^[a-f0-9]{64}$/);
    if (held.has(photo.sourceSHA256)) assert.ok(photo.exactImageHumanApproval, `unapproved personal image ${photo.sourceIndex}`);
    const place = w.WROC_CATALOG.getPlace(photo.placeId);
    assert.ok(place.media.photos.includes(photo.asset));
  }
  for (const photo of proof.heldPersonalPhotos) {
    for (const place of Object.values(w.WROC_CATALOG.places).filter(item => item.location.cityId === 'poznan')) {
      for (const meta of Object.values(place.media.metadata || {})) {
        if (meta.sourceSHA256 === photo.sourceSHA256) assert.ok(meta.exactImageHumanApproval);
      }
    }
  }
});


test('The Poznan addition preserves every prior canonical record and every prior excursion byte for byte', () => {
  const w=load(), proof=JSON.parse(readFileSync('tests/fixtures/poznan-preintegration.json','utf8'));
  const ids=JSON.parse(readFileSync('data/poznan-excursion-place-ids.json','utf8'));
  const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
  assert.equal(Object.keys(proof.recordHashes).length,233);
  assert.equal(Object.keys(w.WROC_CATALOG.places).length,233+ids.length);
  assert.deepEqual(Object.keys(w.WROC_CATALOG.places).filter(id=>!Object.hasOwn(proof.recordHashes,id)).sort(),ids.slice().sort());
  const trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(x=>x.id==='poznan-wroclaw-stopover');
  assert.deepEqual([...trip.canonicalPlaceIds,...trip.optionalPlaceIds].sort(),ids.slice().sort());
  for(const[id,expected]of Object.entries(proof.recordHashes))assert.equal(hash(w.WROC_CATALOG.places[id]),expected,id);
  for(const[id,expected]of Object.entries(proof.tripHashes))assert.equal(hash(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(x=>x.id===id)),expected,id);
  const source=readFileSync('data/canonical-places-source.js','utf8'),marker='// Poznań excursion: explicit geography, separate physical venues and reviewed own photographs.';
  assert.equal(createHash('sha256').update(source.slice(0,source.indexOf(marker)).trimEnd()+'\n').digest('hex'),proof.canonicalSourceSHA256);
  assert.ok(trip.optionalPlaceIds.includes('poznan-old-zoo'));
  assert.ok(trip.optionalPlaceIds.includes('poznan-new-zoo'));
  assert.ok(!ids.includes('holimex-poznan'));
});
