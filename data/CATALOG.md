# WROC-LOVE canonical catalog

`place-catalog.js` is the canonical identity layer for WROC-LOVE places. It is generated from the reviewed product data by `tools/generate-place-catalog.mjs` and loaded before each product's data file.

The approved UI still reads the existing global arrays. When a product loads, `WROC_CATALOG.registerProduct()` creates normalized Product and RouteStop records and attaches these non-breaking compatibility fields to each legacy record:

- `canonicalPlaceId`
- `canonicalPlace`
- `relatedPlaceIds`
- `productRecordId`

The legacy fields remain temporarily so the current maps, route order, editorial copy and five-language presentation do not change during migration.

## Canonical Place

Each place has a stable ID, localized name and description, selected coordinates, coordinate candidates, taxonomy, suitability, visit metadata, links, media, social posts, transport metadata, source records and editorial priority.

Empty personalization fields are intentional. They are ready for later editorial enrichment and must not be populated from the open web automatically.

## Product and RouteStop

Registered products are available under `WROC_CATALOG.products`. A normalized RouteStop references `placeId` and keeps route-only information such as day, order, arrival time, duration, optional status, presentation copy and coordinate override.

`culture-evening` is intentionally a route experience without a canonical physical `placeId`. Combined stops use a primary canonical place plus `relatedPlaceIds`.

## Coordinate conflicts

`WROC_CATALOG.coordinateConflicts` is an audit list, not an automatic correction list. Existing route coordinates remain as route-specific overrides until each discrepancy is reviewed. This prevents the migration from changing the approved route geometry.

## Regeneration

After an approved place-data change, regenerate `data/place-catalog.js` and run the regression suite. The generated file must not be hand-edited.
