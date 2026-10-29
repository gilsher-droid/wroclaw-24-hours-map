import {beforeBridgesNorthSnapshot} from './bridges-north-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

// Draft replacement for tests/dialogue-beach-historical-baseline.mjs.
// This newest helper must not import urban/Lyk/older helpers: urban imports it.
const proof = JSON.parse(readFileSync('data/dialogue-beach-oct29-approved-additions.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const clone = value => JSON.parse(JSON.stringify(value));
const owns = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const newIds = new Set(proof.newIds);
const updatedIds = new Set(proof.updatedIds);
const beforeExperiences = Object.fromEntries(
  Object.values(proof.beforeExperiences).map(experience => [experience.id, experience]),
);
export const dialogueBeachAdditionIds = proof.newIds;

function assertReviewedRecord(value, id) {
  const signature = hash(value);
  const beforeHash = updatedIds.has(id) ? proof.beforeRecordHashes[id] : null;
  assert.ok(
    signature === proof.approvedRecordHashes[id] || (beforeHash && signature === beforeHash),
    'Unreviewed dialogue/beach canonical: ' + id,
  );
  if (updatedIds.has(id)) {
    // The three human extensions authorize gallery-only canonical changes.
    const before = proof.beforeUpdatedRecords[id];
    assert.ok(before, 'Missing reviewed old canonical: ' + id);
    const restored=clone(value);for(const field of proof.allowedUpdatedFields[id]){if(owns(before,field))restored[field]=clone(before[field]);else delete restored[field];}
    assert.deepEqual(restored,before,'Fields outside reviewed enrichment changed: '+id);
  }
}

export function assertReviewedDialogueBeach(places) {
  for (const id of proof.ids) if (owns(places, id)) assertReviewedRecord(places[id], id);
}

export function beforeDialogueBeachRecord(value) {
  if (!value || !updatedIds.has(value.id) || !value.location || !value.socialPosts) return value;
  assertReviewedRecord(value, value.id);
  return clone(proof.beforeUpdatedRecords[value.id]);
}

export function beforeDialogueBeachExperience(value) {
  const before = value && beforeExperiences[value.id];
  if (!before) return value;
  assert.ok(
    [proof.approvedExperienceHashes[value.id], hash(before)].includes(hash(value)),
    'Unreviewed dialogue/beach experience: ' + value.id,
  );
  return clone(before);
}

export function beforeDialogueBeachLifestyle(value) {
  if (!value || !updatedIds.has(value.id)) return value;
  const before = proof.beforeUpdatedLifestyleRecords[value.id];
  assert.ok(before, 'Missing reviewed old Lifestyle adapter: ' + value.id);
  assert.ok(
    [proof.approvedUpdatedLifestyleHashes[value.id], hash(before)].includes(hash(value)),
    'Unreviewed updated Lifestyle adapter: ' + value.id,
  );
  return clone(before);
}

// Optional entry point for older tests that receive a bare gallery array.
// Only the exact final gallery and exact baseline gallery are accepted.
export function beforeDialogueBeachGallery(value, id) {
  if (!updatedIds.has(id)) return value;
  const before = proof.beforeUpdatedRecords[id].media.photos;
  assert.ok([hash(proof.bindings[id]), hash(before)].includes(hash(value)), 'Unreviewed updated gallery: ' + id);
  return clone(before);
}

export function beforeDialogueBeachOnlySnapshot(window) {
  beforeBridgesNorthSnapshot(window);
  const catalog = window.WROC_CATALOG;
  if (catalog) {
    assertReviewedDialogueBeach(catalog.places);
    const places = Object.fromEntries(Object.entries(catalog.places)
      .filter(([id]) => !newIds.has(id))
      .map(([id, value]) => [id, beforeDialogueBeachRecord(value)]));
    window.WROC_CATALOG = {
      ...catalog,
      places,
      getPlace: id => {
        const canonicalId = catalog.resolveId(id);
        if (newIds.has(canonicalId)) return null;
        // Read and validate the original getter result. Looking up a restored
        // dictionary entry here would mask a custom getter's unapproved delta.
        const actual = catalog.getPlace(id);
        return updatedIds.has(canonicalId) ? beforeDialogueBeachRecord(actual) : actual;
      },
    };
  }
  if (window.WROC_LIFESTYLE_PLACES) {
    window.WROC_LIFESTYLE_PLACES = window.WROC_LIFESTYLE_PLACES
      .filter(row => !newIds.has(row.id)).map(beforeDialogueBeachLifestyle);
  }
  // No old Cultural row or recommendation is changed by the human extensions.
  // Pass all such rows through, including unexpected IDs and changed fields.
  for (const key of ['WROC_CULTURAL_PLACES', 'PREMIUM_RECOMMENDATIONS']) {
    if (window[key]) window[key] = window[key].filter(row => !newIds.has(row.id));
  }
  if (window.WROC_LOCATION_MEDIA) {
    const media = {...window.WROC_LOCATION_MEDIA};
    for (const id of newIds) delete media[id];
    for (const id of updatedIds) {
      // null is the explicit fixture sentinel for an absent baseline resource.
      // JSON cannot store an undefined-valued slot.
      const before = proof.beforeUpdatedLocationMedia[id];
      assert.notEqual(before, undefined, 'Missing old resource slot: ' + id);
      const actualHash = owns(media, id) ? hash(media[id]) : null;
      const beforeHash = before === null ? null : hash(before);
      assert.ok(
        [proof.approvedUpdatedLocationMediaHashes[id], beforeHash].includes(actualHash),
        'Unreviewed updated location media: ' + id,
      );
      if (before === null) delete media[id];
      else media[id] = clone(before);
    }
    window.WROC_LOCATION_MEDIA = media;
  }
  const registry = window.WROC_EXPERIENCE_CATALOG;
  if (registry) {
    // Guard every registry representation that will be restored. A modified
    // getter, array entry or byId entry must not disappear behind projection.
    for (const id of Object.keys(beforeExperiences)) {
      const value = registry.getExperience(id);
      assert.equal(value?.id, id, 'Missing or misidentified reviewed experience: ' + id);
      beforeDialogueBeachExperience(value);
      if (owns(registry.byId, id)) beforeDialogueBeachExperience(registry.byId[id]);
    }
    for (const value of registry.experiences) beforeDialogueBeachExperience(value);
    window.WROC_EXPERIENCE_CATALOG = {
      ...registry,
      experiences: registry.experiences.map(beforeDialogueBeachExperience),
      byId: Object.fromEntries(Object.entries(registry.byId)
        .map(([id, value]) => [id, beforeDialogueBeachExperience(value)])),
      getExperience: id => beforeDialogueBeachExperience(registry.getExperience(id)),
      forProduct: id => registry.forProduct(id).map(beforeDialogueBeachExperience),
      resolveMedia: value => registry.resolveMedia(
        typeof value === 'string' && owns(beforeExperiences, value)
          ? beforeDialogueBeachExperience(registry.getExperience(value))
          : ((value&&proof.allowedHistoricalExperienceHashes?.[value.id]?.includes(hash(value)))?value:beforeDialogueBeachExperience(value)),
      ),
    };
  }
  return window;
}
