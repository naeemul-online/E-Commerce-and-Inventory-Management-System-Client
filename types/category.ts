export interface Category {
  id: string
  name: string
  slug: string
  /** Cloudinary (or any remote) image URL returned by the API. */
  image?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateCategoryResponse {
  success: boolean
  message: string
  data?: Category
}
