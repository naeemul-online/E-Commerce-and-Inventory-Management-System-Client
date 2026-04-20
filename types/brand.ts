export interface Brand {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface CreateBrandResponse {
  success: boolean
  message: string
  data?: Brand
}
