import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '63ghbydx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-02-24',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
