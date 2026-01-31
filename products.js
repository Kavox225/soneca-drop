/**
 * SONECA DROPS – Product catalog.
 * Add or edit products here. One file, no database.
 *
 * Required: slug, name, shortDescription, longDescription, tags, pricing, subscriptionEnabled
 * Optional: image, origin, cooperative, variety, process, altitude, tastingNotes
 *
 * Pricing: use your Stripe Price IDs. Amount in cents (EUR).
 * Sizes: 250g = 1 bag, 500g = 2 bags, 1kg = 4 bags.
 */

const products = [
  {
    slug: 'ethiopia-yirgacheffe',
    name: 'DROP #001 – Ethiopia Yirgacheffe',
    shortDescription: 'Floral, bright. Washed. Single origin.',
    longDescription: 'A classic Yirgacheffe with jasmine and stone fruit. Washed process, high altitude. Roasted for filter and espresso.',
    tags: ['filter', 'fruity', 'floral'],
    pricing: {
      size_250: { priceId: 'price_250_001', amount: 899 },   // 8.99€ – replace with your Stripe price ID
      size_500: { priceId: 'price_500_001', amount: 1699 },
      size_1000: { priceId: 'price_1000_001', amount: 3199 },
    },
    currency: 'EUR',
    image: '/assets/pack-mock.svg',
    subscriptionEnabled: true,
    origin: 'Ethiopia, Yirgacheffe',
    cooperative: 'Yirgacheffe Coffee Farmers Cooperative Union',
    variety: 'Heirloom',
    process: 'Washed',
    altitude: '1800–2200 masl',
    tastingNotes: 'Jasmine, peach, bergamot',
  },
  {
    slug: 'colombia-supremo',
    name: 'DROP #002 – Colombia Supremo',
    shortDescription: 'Chocolate, nuts. Washed. Balanced.',
    longDescription: 'Smooth and versatile. Caramel and hazelnut. Perfect daily driver for any brew method.',
    tags: ['espresso', 'filter', 'chocolatey'],
    pricing: {
      size_250: { priceId: 'price_250_002', amount: 799 },
      size_500: { priceId: 'price_500_002', amount: 1499 },
      size_1000: { priceId: 'price_1000_002', amount: 2799 },
    },
    currency: 'EUR',
    image: '/assets/pack-mock.svg',
    subscriptionEnabled: true,
    origin: 'Colombia, Huila',
    variety: 'Caturra, Castillo',
    process: 'Washed',
    altitude: '1500–1900 masl',
    tastingNotes: 'Chocolate, hazelnut, caramel',
  },
  {
    slug: 'brazil-santos',
    name: 'DROP #003 – Brazil Santos',
    shortDescription: 'Nutty, low acidity. Natural. Espresso blend base.',
    longDescription: 'Classic Santos. Full body, nutty, sweet. Natural process for a round cup. Great for espresso and milk drinks.',
    tags: ['espresso', 'chocolatey', 'nutty'],
    pricing: {
      size_250: { priceId: 'price_250_003', amount: 749 },
      size_500: { priceId: 'price_500_003', amount: 1399 },
      size_1000: { priceId: 'price_1000_003', amount: 2599 },
    },
    currency: 'EUR',
    subscriptionEnabled: false,
    origin: 'Brazil, Santos',
    process: 'Natural',
    tastingNotes: 'Hazelnut, cocoa, brown sugar',
  },
];

export default products;

/** Get product by slug */
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

/** Get featured product (first one, or add a `featured: true` field if you prefer) */
export function getFeaturedProduct() {
  return products[0] || null;
}

/** All unique tags from all products */
export function getAllTags() {
  const set = new Set();
  products.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
