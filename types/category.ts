export interface Category {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface CreateCategoryResponse {
  success: boolean
  message: string
  data?: Category
}
