export type CollectionProduct = {
  id: string
  name: string
  slug: string
  image: string
  price: number
  originalPrice: number
  discount: number
  flag: "New Arrival" | "Offered Items"
  category: string
  brand: string
}

export type CollectionConfig = {
  slug: string
  title: string
  description: string
  categories: readonly string[]
  brands: readonly string[]
  flags: readonly string[]
  products: CollectionProduct[]
}
