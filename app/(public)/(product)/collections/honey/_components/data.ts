export type HoneyProduct = {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  flag: "New Arrival" | "Offered Items"
  category: string
  brand: string
}

const IMAGE =
  "https://res.cloudinary.com/dsieyc8m2/image/upload/v1776360259/g1b6li1pzvf73qu59dn5.webp"

export const honeyProducts: HoneyProduct[] = [
  {
    id: "h-1",
    name: "Sundarban Pure Honey (500g)",
    image: IMAGE,
    price: 620,
    originalPrice: 780,
    discount: 21,
    flag: "Offered Items",
    category: "Sundarban",
    brand: "GhorerBazar",
  },
  {
    id: "h-2",
    name: "Black Seed (Kalojira) Honey (250g)",
    image: IMAGE,
    price: 890,
    originalPrice: 1050,
    discount: 15,
    flag: "New Arrival",
    category: "Black Seed",
    brand: "Honeyraj",
  },
  {
    id: "h-3",
    name: "Lichu Flower Honey (500g)",
    image: IMAGE,
    price: 540,
    originalPrice: 650,
    discount: 17,
    flag: "Offered Items",
    category: "Lichu Flower",
    brand: "GhorerBazar",
  },
  {
    id: "h-4",
    name: "Sidr Mountain Honey (250g)",
    image: IMAGE,
    price: 1250,
    originalPrice: 1500,
    discount: 17,
    flag: "New Arrival",
    category: "Sidr",
    brand: "Honeyraj",
  },
  {
    id: "h-5",
    name: "Raw Honeycomb Block (400g)",
    image: IMAGE,
    price: 980,
    originalPrice: 1200,
    discount: 18,
    flag: "Offered Items",
    category: "Honeycomb",
    brand: "GhorerBazar",
  },
  {
    id: "h-6",
    name: "Organic Wild Honey (1kg)",
    image: IMAGE,
    price: 1450,
    originalPrice: 1700,
    discount: 15,
    flag: "New Arrival",
    category: "Organic",
    brand: "Honeyraj",
  },
  {
    id: "h-7",
    name: "Crystal Mustard Honey (500g)",
    image: IMAGE,
    price: 480,
    originalPrice: 600,
    discount: 20,
    flag: "Offered Items",
    category: "Crystal Honey",
    brand: "GhorerBazar",
  },
  {
    id: "h-8",
    name: "Sundarban Khalisha Honey (1kg)",
    image: IMAGE,
    price: 1180,
    originalPrice: 1400,
    discount: 16,
    flag: "New Arrival",
    category: "Sundarban",
    brand: "Honeyraj",
  },
  {
    id: "h-9",
    name: "Black Seed Honey (500g)",
    image: IMAGE,
    price: 1650,
    originalPrice: 1900,
    discount: 13,
    flag: "Offered Items",
    category: "Black Seed",
    brand: "GhorerBazar",
  },
  {
    id: "h-10",
    name: "Lichu Flower Honey (1kg)",
    image: IMAGE,
    price: 980,
    originalPrice: 1200,
    discount: 18,
    flag: "New Arrival",
    category: "Lichu Flower",
    brand: "Honeyraj",
  },
  {
    id: "h-11",
    name: "Sidr Honey (500g)",
    image: IMAGE,
    price: 2200,
    originalPrice: 2600,
    discount: 15,
    flag: "Offered Items",
    category: "Sidr",
    brand: "GhorerBazar",
  },
  {
    id: "h-12",
    name: "Raw Organic Honey (500g)",
    image: IMAGE,
    price: 720,
    originalPrice: 900,
    discount: 20,
    flag: "New Arrival",
    category: "Organic",
    brand: "Honeyraj",
  },
]

export const HONEY_CATEGORIES = [
  "Sundarban",
  "Black Seed",
  "Lichu Flower",
  "Sidr",
  "Honeycomb",
  "Organic",
  "Crystal Honey",
] as const

export const HONEY_BRANDS = ["GhorerBazar", "Honeyraj"] as const

export const HONEY_FLAGS = ["New Arrival", "Offered Items"] as const
