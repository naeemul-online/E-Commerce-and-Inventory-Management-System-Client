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
  { label: "Sign In", href: "/sign-in", icon: LogIn },
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
}

export interface MenuBarCategory {
  label: string
  href: string
  subcategories?: SubCategory[]
}

export const menuBarCategories: MenuBarCategory[] = [
  {
    label: "Oil & Ghee",
    href: "/category/oil-ghee",
    subcategories: [
      { label: "Olive Oil", href: "/category/oil-ghee/olive-oil" },
      { label: "Coconut Oil", href: "/category/oil-ghee/coconut-oil" },
      { label: "Pure Ghee", href: "/category/oil-ghee/pure-ghee" },
    ],
  },
  {
    label: "Honey",
    href: "/category/honey",
    subcategories: [
      { label: "Raw Honey", href: "/category/honey/raw-honey" },
      { label: "Manuka Honey", href: "/category/honey/manuka-honey" },
      { label: "Organic Honey", href: "/category/honey/organic-honey" },
    ],
  },
  {
    label: "Dates",
    href: "/category/dates",
    subcategories: [
      { label: "Ajwa Dates", href: "/category/dates/ajwa" },
      { label: "Medjool Dates", href: "/category/dates/medjool" },
      { label: "Safawi Dates", href: "/category/dates/safawi" },
    ],
  },
  {
    label: "Spices",
    href: "/category/spices",
    subcategories: [
      { label: "Whole Spices", href: "/category/spices/whole" },
      { label: "Ground Spices", href: "/category/spices/ground" },
      { label: "Spice Blends", href: "/category/spices/blends" },
    ],
  },
  {
    label: "Nuts & Seeds",
    href: "/category/nuts-seeds",
    subcategories: [
      { label: "Almonds", href: "/category/nuts-seeds/almonds" },
      { label: "Cashews", href: "/category/nuts-seeds/cashews" },
      { label: "Walnuts", href: "/category/nuts-seeds/walnuts" },
    ],
  },
  {
    label: "Beverage",
    href: "/category/beverage",
    subcategories: [
      { label: "Green Tea", href: "/category/beverage/green-tea" },
      { label: "Herbal Tea", href: "/category/beverage/herbal-tea" },
      { label: "Coffee", href: "/category/beverage/coffee" },
    ],
  },
]
