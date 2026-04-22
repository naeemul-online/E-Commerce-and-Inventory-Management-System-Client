import {
  Footprints,
  Gem,
  Heart,
  Home,
  LogIn,
  Menu,
  Package,
  Search,
  Shirt,
  ShoppingCart,
  User,
  Watch,
  type LucideIcon,
} from "lucide-react"

export interface NavLink {
  label: string
  href: string
  icon?: LucideIcon
}

export interface CategoryLink extends NavLink {
  description?: string
}

// Desktop navigation actions
export const desktopNavActions: NavLink[] = [
  { label: "Track Order", href: "/track", icon: Package },
  { label: "My Account", href: "/login", icon: LogIn },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
]

// Mobile bottom bar navigation
export const mobileNavItems: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Menu", href: "#menu", icon: Menu },
  { label: "Cart", href: "#cart", icon: ShoppingCart },
  { label: "Search", href: "#search", icon: Search },
  { label: "Account", href: "/account", icon: User },
]

// Legacy menu drawer categories (kept for backward compatibility)
export const menuCategories: CategoryLink[] = [
  {
    label: "Clothing",
    href: "/category/clothing",
    icon: Shirt,
    description: "Explore our latest fashion collection",
  },
  {
    label: "Footwear",
    href: "/category/footwear",
    icon: Footprints,
    description: "Step into style with our shoes",
  },
  {
    label: "Accessories",
    href: "/category/accessories",
    icon: Watch,
    description: "Complete your look",
  },
  {
    label: "Jewelry",
    href: "/category/jewelry",
    icon: Gem,
    description: "Timeless elegance",
  },
]

// Secondary menu links
export const secondaryMenuLinks: NavLink[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Sale", href: "/sale" },
  { label: "Gift Cards", href: "/gift-cards" },
]

// Menu bar categories with subcategories
export interface SubCategory {
  label: string
  href: string
  slug: string
}

export interface MenuBarCategory {
  label: string
  href: string
  slug: string
  subcategories?: SubCategory[]
}

export const menuBarCategories: MenuBarCategory[] = [
  {
    label: "Oil & Ghee",
    href: "/collections/oil-ghee",
    slug: "oil-ghee",
    subcategories: [
      { label: "Olive Oil", href: "/collections/oil-ghee/olive-oil", slug: "olive-oil" },
      { label: "Coconut Oil", href: "/collections/oil-ghee/coconut-oil", slug: "coconut-oil" },
      { label: "Pure Ghee", href: "/collections/oil-ghee/pure-ghee", slug: "pure-ghee" },
    ],
  },
  {
    label: "Honey",
    href: "/collections/honey",
    slug: "honey",
    subcategories: [
      { label: "Sundarban", href: "/collections/honey/sundarban", slug: "sundarban" },
      { label: "Black Seed", href: "/collections/honey/black-seed", slug: "black-seed" },
      { label: "Lichu Flower", href: "/collections/honey/lichu-flower", slug: "lichu-flower" },
      { label: "Sidr", href: "/collections/honey/sidr", slug: "sidr" },
      { label: "Organic", href: "/collections/honey/organic", slug: "organic" },
    ],
  },
  {
    label: "Dates",
    href: "/collections/dates",
    slug: "dates",
    subcategories: [
      { label: "Ajwa", href: "/collections/dates/ajwa", slug: "ajwa" },
      { label: "Medjool", href: "/collections/dates/medjool", slug: "medjool" },
      { label: "Safawi", href: "/collections/dates/safawi", slug: "safawi" },
      { label: "Khudri", href: "/collections/dates/khudri", slug: "khudri" },
      { label: "Sukkari", href: "/collections/dates/sukkari", slug: "sukkari" },
    ],
  },
  {
    label: "Spices",
    href: "/collections/spices",
    slug: "spices",
    subcategories: [
      { label: "Whole Spices", href: "/collections/spices/whole-spices", slug: "whole-spices" },
      { label: "Ground Spices", href: "/collections/spices/ground-spices", slug: "ground-spices" },
      { label: "Spice Blends", href: "/collections/spices/blends", slug: "blends" },
    ],
  },
  {
    label: "Nuts & Seeds",
    href: "/collections/nuts-seeds",
    slug: "nuts-seeds",
    subcategories: [
      { label: "Almonds", href: "/collections/nuts-seeds/almonds", slug: "almonds" },
      { label: "Cashews", href: "/collections/nuts-seeds/cashews", slug: "cashews" },
      { label: "Walnuts", href: "/collections/nuts-seeds/walnuts", slug: "walnuts" },
      { label: "Pistachios", href: "/collections/nuts-seeds/pistachios", slug: "pistachios" },
    ],
  },
  {
    label: "Beverage",
    href: "/collections/beverage",
    slug: "beverage",
    subcategories: [
      { label: "Tea", href: "/collections/beverage/tea", slug: "tea" },
      { label: "Coffee", href: "/collections/beverage/coffee", slug: "coffee" },
    ],
  },
  {
    label: "Rice",
    href: "/collections/rice",
    slug: "rice",
    subcategories: [
      { label: "Basmati", href: "/collections/rice/basmati", slug: "basmati" },
      { label: "Aromatic", href: "/collections/rice/aromatic", slug: "aromatic" },
      { label: "Brown Rice", href: "/collections/rice/brown-rice", slug: "brown-rice" },
    ],
  },
  {
    label: "Flours & Lentils",
    href: "/collections/flours-lentils",
    slug: "flours-lentils",
    subcategories: [
      { label: "Flour", href: "/collections/flours-lentils/flour", slug: "flour" },
      { label: "Lentils", href: "/collections/flours-lentils/lentils", slug: "lentils" },
    ],
  },
]
