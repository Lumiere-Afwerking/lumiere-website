import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '63ghbydx', // Jouw unieke Sanity ID
  dataset: 'production',
  useCdn: true, // Zorgt ervoor dat foto's razendsnel laden
  apiVersion: '2024-02-24', // De datum van vandaag (of nieuwer)
});

const builder = imageUrlBuilder(client);

// Deze functie maakt van een Sanity afbeelding een werkende URL voor je website
export function urlFor(source) {
  return builder.image(source);
}
