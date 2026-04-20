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
  categoryId: string
  brandId: string
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
