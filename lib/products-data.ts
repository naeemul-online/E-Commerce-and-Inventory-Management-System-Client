import type { ProductDetails } from "@/types/product"

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dsieyc8m2/image/upload/v1776360259/g1b6li1pzvf73qu59dn5.webp"

// Sample product data - in production this would come from a database
export const productsData: ProductDetails[] = [
  // Honey Products
  {
    id: "h-1",
    name: "Sundarban Honey 1kg",
    slug: "sundarban-honey-1kg",
    collectionSlug: "honey",
    images: [
      { id: "img-1", url: DEFAULT_IMAGE, alt: "Sundarban Honey 1kg - Front" },
      { id: "img-2", url: DEFAULT_IMAGE, alt: "Sundarban Honey 1kg - Side" },
      { id: "img-3", url: DEFAULT_IMAGE, alt: "Sundarban Honey 1kg - Label" },
      { id: "img-4", url: DEFAULT_IMAGE, alt: "Sundarban Honey 1kg - Nutrition" },
    ],
    price: 2200,
    originalPrice: 2500,
    discount: 12,
    flag: "New Arrival",
    category: "Honey",
    subcategory: "sundarban",
    brand: "Honeyraj",
    brandLogo: undefined,
    description:
      "Sourced from the world's largest mangrove forest, the Sundarbans, this honey is 100% natural and pure. The nectar is collected by bees from diverse wildflowers such as Khalsi, Keora, Bain, Garan, Geoa, and Sundari, giving Sundarban honey its unique taste, color, and exceptional qualities. No chemicals or artificial preservatives are used in this honey. Its color may range from golden to deep brown, and its thickness varies naturally depending on the season and floral sources.",
    benefits: [
      { title: "Boosts immunity", description: "Rich in antioxidants that protect the body from infections." },
      { title: "Effective for cough and sore throat", description: "Natural anti-inflammatory properties soothe the throat." },
      { title: "Improves digestion", description: "Enzyme-rich honey supports the digestive system." },
      { title: "Natural source of energy", description: "Glucose and fructose provide instant energy." },
      { title: "Beneficial for skin and hair", description: "Vitamins and minerals enhance skin radiance and strengthen hair." },
      { title: "Supports heart health", description: "Regular consumption improves blood circulation and reduces the risk of heart disease." },
      { title: "Helps manage diabetes", description: "In moderation, it supports blood sugar regulation." },
      { title: "Promotes wound healing", description: "Acts as a natural antiseptic to aid faster recovery." },
    ],
    countryOfOrigin: "Sundarban (Bangladesh)",
    inStock: true,
    stockQuantity: 50,
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  },
  {
    id: "h-2",
    name: "Black Seed (Kalojira) Honey 500g",
    slug: "black-seed-kalojira-honey-500g",
    collectionSlug: "honey",
    images: [
      { id: "img-1", url: DEFAULT_IMAGE, alt: "Black Seed Honey - Front" },
      { id: "img-2", url: DEFAULT_IMAGE, alt: "Black Seed Honey - Side" },
    ],
    price: 890,
    originalPrice: 1050,
    discount: 15,
    flag: "Offered Items",
    category: "Honey",
    subcategory: "black-seed",
    brand: "GhorerBazar",
    description:
      "Premium black seed honey infused with the goodness of Kalojira (Nigella sativa). This unique combination provides double the health benefits - the natural sweetness of pure honey combined with the powerful medicinal properties of black seed.",
    benefits: [
      { title: "Immune booster", description: "Strengthens the body's natural defense system." },
      { title: "Anti-inflammatory", description: "Reduces inflammation and soothes respiratory issues." },
      { title: "Digestive health", description: "Supports healthy digestion and gut flora." },
      { title: "Energy enhancement", description: "Provides natural, sustained energy throughout the day." },
    ],
    countryOfOrigin: "Bangladesh",
    inStock: true,
    stockQuantity: 35,
    reviews: [
      {
        id: "r-1",
        author: "Ahmed Khan",
        email: "ahmed@example.com",
        rating: 5,
        content: "Excellent quality honey! The black seed flavor is subtle but noticeable. Highly recommended.",
        date: "2024-03-15",
      },
      {
        id: "r-2",
        author: "Fatima Begum",
        email: "fatima@example.com",
        rating: 4,
        content: "Good product, authentic taste. Packaging could be better.",
        date: "2024-02-28",
      },
    ],
    averageRating: 4.5,
    totalReviews: 2,
  },
  // Oil & Ghee Products
  {
    id: "og-1",
    name: "Extra Virgin Olive Oil 500ml",
    slug: "extra-virgin-olive-oil-500ml",
    collectionSlug: "oil-ghee",
    images: [
      { id: "img-1", url: DEFAULT_IMAGE, alt: "Olive Oil - Front" },
      { id: "img-2", url: DEFAULT_IMAGE, alt: "Olive Oil - Back" },
    ],
    price: 850,
    originalPrice: 1000,
    discount: 15,
    flag: "New Arrival",
    category: "Oil & Ghee",
    subcategory: "olive-oil",
    brand: "OliveGold",
    description:
      "Premium extra virgin olive oil cold-pressed from the finest Mediterranean olives. Perfect for salads, cooking, and health-conscious diets. Rich in healthy monounsaturated fats and antioxidants.",
    benefits: [
      { title: "Heart healthy", description: "Rich in oleic acid that supports cardiovascular health." },
      { title: "Antioxidant rich", description: "Contains polyphenols that fight free radicals." },
      { title: "Versatile cooking", description: "Ideal for salads, sauteing, and Mediterranean dishes." },
    ],
    countryOfOrigin: "Spain",
    inStock: true,
    stockQuantity: 25,
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  },
  {
    id: "og-2",
    name: "Pure Desi Ghee 1kg",
    slug: "pure-desi-ghee-1kg",
    collectionSlug: "oil-ghee",
    images: [
      { id: "img-1", url: DEFAULT_IMAGE, alt: "Desi Ghee - Front" },
      { id: "img-2", url: DEFAULT_IMAGE, alt: "Desi Ghee - Label" },
    ],
    price: 1350,
    originalPrice: 1600,
    discount: 16,
    flag: "Offered Items",
    category: "Oil & Ghee",
    subcategory: "pure-ghee",
    brand: "GheePure",
    description:
      "Authentic desi ghee made from pure cow milk using traditional methods. Golden in color with a rich, nutty aroma. Perfect for cooking, religious ceremonies, and Ayurvedic practices.",
    benefits: [
      { title: "High smoke point", description: "Ideal for high-heat cooking without breaking down." },
      { title: "Rich in vitamins", description: "Contains vitamins A, D, E, and K." },
      { title: "Aids digestion", description: "Stimulates digestive enzymes and improves gut health." },
      { title: "Traditional taste", description: "Authentic flavor for Bengali and Indian cuisines." },
    ],
    countryOfOrigin: "Bangladesh",
    inStock: true,
    stockQuantity: 40,
    reviews: [
      {
        id: "r-3",
        author: "Rahim Uddin",
        email: "rahim@example.com",
        rating: 5,
        content: "Best ghee I have ever tasted! Pure and aromatic. Will definitely buy again.",
        date: "2024-04-01",
      },
    ],
    averageRating: 5,
    totalReviews: 1,
  },
  // Dates Products
  {
    id: "d-1",
    name: "Premium Ajwa Dates 500g",
    slug: "premium-ajwa-dates-500g",
    collectionSlug: "dates",
    images: [
      { id: "img-1", url: DEFAULT_IMAGE, alt: "Ajwa Dates - Front" },
      { id: "img-2", url: DEFAULT_IMAGE, alt: "Ajwa Dates - Close up" },
    ],
    price: 1800,
    originalPrice: 2200,
    discount: 18,
    flag: "New Arrival",
    category: "Dates",
    subcategory: "ajwa",
    brand: "DateKing",
    description:
      "Premium quality Ajwa dates from Madinah, Saudi Arabia. Known as the 'Holy Date', Ajwa is mentioned in Islamic traditions for its exceptional health benefits. Soft, sweet, and deeply nourishing.",
    benefits: [
      { title: "Heart protection", description: "Known to strengthen the heart and improve cardiovascular health." },
      { title: "Natural detox", description: "Helps remove toxins from the body." },
      { title: "Energy booster", description: "Natural sugars provide instant and sustained energy." },
      { title: "Spiritual significance", description: "Recommended in Islamic traditions for its blessed properties." },
    ],
    countryOfOrigin: "Saudi Arabia",
    inStock: true,
    stockQuantity: 30,
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  },
  // Spices Products
  {
    id: "s-1",
    name: "Organic Turmeric Powder 200g",
    slug: "organic-turmeric-powder-200g",
    collectionSlug: "spices",
    images: [
      { id: "img-1", url: DEFAULT_IMAGE, alt: "Turmeric Powder - Front" },
      { id: "img-2", url: DEFAULT_IMAGE, alt: "Turmeric Powder - Back" },
    ],
    price: 180,
    originalPrice: 220,
    discount: 18,
    flag: "Offered Items",
    category: "Spices",
    subcategory: "ground-spices",
    brand: "SpiceMaster",
    description:
      "100% organic turmeric powder ground from premium quality turmeric roots. Rich golden color with high curcumin content. Essential for Bengali cooking and traditional remedies.",
    benefits: [
      { title: "Anti-inflammatory", description: "Curcumin reduces inflammation throughout the body." },
      { title: "Antioxidant power", description: "Neutralizes free radicals and boosts body's antioxidant capacity." },
      { title: "Brain health", description: "May improve memory and reduce depression symptoms." },
      { title: "Cooking essential", description: "Adds color and flavor to curries and rice dishes." },
    ],
    countryOfOrigin: "Bangladesh",
    inStock: true,
    stockQuantity: 100,
    reviews: [
      {
        id: "r-4",
        author: "Salma Akter",
        email: "salma@example.com",
        rating: 5,
        content: "Beautiful color and fresh aroma. You can tell it's pure turmeric. Great for cooking!",
        date: "2024-03-20",
      },
      {
        id: "r-5",
        author: "Karim Miah",
        email: "karim@example.com",
        rating: 4,
        content: "Good quality turmeric. Slightly pricey but worth it for the purity.",
        date: "2024-03-10",
      },
    ],
    averageRating: 4.5,
    totalReviews: 2,
  },
]

// Helper function to get product by slug
export function getProductBySlug(slug: string): ProductDetails | null {
  return productsData.find((p) => p.slug === slug) || null
}

// Helper function to get products by collection
export function getProductsByCollection(collectionSlug: string): ProductDetails[] {
  return productsData.filter((p) => p.collectionSlug === collectionSlug)
}

// Helper function to get all product slugs for static generation
export function getAllProductSlugs(): string[] {
  return productsData.map((p) => p.slug)
}
