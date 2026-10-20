import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
export async function generateHomeExcursions(root = process.cwd()) {
  const context = vm.createContext({ window: {} });
  for (const file of ['place-catalog.js', 'lower-silesia-excursions.js']) {
    vm.runInContext(await readFile(`${root}/data/${file}`, 'utf8'), context);
  }
  const trips = context.window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.map(trip => {
    const photo = context.window.WROC_CATALOG.places[trip.heroMedia.canonicalPlaceId]?.media.photos[trip.heroMedia.photoIndex];
    if (!photo?.startsWith('/assets/')) throw new Error(`Missing local hero: ${trip.id}`);
    return { id: trip.id, title: trip.title, summary: trip.summary, photo };
  });
  await writeFile(`${root}/data/home-excursions.js`, `/* Generated from canonical excursion data. Do not edit. */\nwindow.WROC_HOME_EXCURSIONS = ${JSON.stringify(trips, null, 2)};\n`);
  return trips;
}
if (process.argv[1]?.endsWith('generate-home-excursions.mjs')) await generateHomeExcursions();
