// src/lib/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Standard client configuration
export const client = createClient({
  projectId: 'plv6g7d8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03' // Add API version for stability
});

// Image URL builder
const builder = imageUrlBuilder(client);

// Utility function for generating image URLs
export function urlFor(source) {
  return builder.image(source);
}
