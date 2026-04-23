export interface ProductListItem {
  id: string
  title: string
  slug: string
  description?: string
  regularPrice: number
  discountedPrice?: number | null
  stock: number
  images?: string[]
  isNew?: boolean
  isOffered?: boolean
  isPublished?: boolean
  categoryId: string
  brandId: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
  category?: {
    id: string
    name: string
    slug: string
  }
  brand?: {
    id: string
    name: string
    slug: string
  }
}

export interface ProductListMeta {
  totalData: number
  totalPages: number
  currentPage: number
  limit: number
}

export interface ProductListResponse {
  success: boolean
  message: string
  meta?: ProductListMeta
  data: ProductListItem[] | ProductListItem | null
}

// Product Details Page Types
export type ProductImage = {
  id: string
  url: string
  alt: string
}

export type ProductReview = {
  id: string
  author: string
  email: string
  rating: number
  content: string
  date: string
}

export type ProductBenefit = {
  title: string
  description: string
}

export type ProductDetails = {
  id: string
  name: string
  slug: string
  collectionSlug: string
  images: ProductImage[]
  price: number
  originalPrice: number
  discount: number
  flag: "New Arrival" | "Offered Items"
  category: string
  subcategory?: string
  brand: string
  brandLogo?: string
  description: string
  benefits: ProductBenefit[]
  countryOfOrigin: string
  inStock: boolean
  stockQuantity: number
  reviews: ProductReview[]
  averageRating: number
  totalReviews: number
}

export type RatingBreakdown = {
  stars: number
  count: number
  percentage: number
}
