"use server"

import { apiFetch } from "@/lib/api-fetch"
import {
  ProductListItem,
  ProductListMeta,
  ProductListResponse,
} from "@/types/product"

const FALLBACK_LIMIT = 5

const defaultMeta: ProductListMeta = {
  totalData: 0,
  totalPages: 1,
  currentPage: 1,
  limit: FALLBACK_LIMIT,
}

const toArray = (data: ProductListResponse["data"]): ProductListItem[] => {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

const normalizeMeta = (
  meta: ProductListResponse["meta"] | undefined,
  page: number,
  limit: number,
  totalData: number
): ProductListMeta => {
  if (!meta) {
    const computedTotalPages = Math.max(1, Math.ceil(totalData / limit))
    return {
      ...defaultMeta,
      currentPage: page,
      limit,
      totalData,
      totalPages: computedTotalPages,
    }
  }

  return {
    totalData: Number(meta.totalData ?? totalData),
    totalPages: Math.max(1, Number(meta.totalPages ?? 1)),
    currentPage: Math.max(1, Number(meta.currentPage ?? page)),
    limit: Math.max(1, Number(meta.limit ?? limit)),
  }
}

/** Matches GET `/api/v1/products` listing query (see docs/backend/modules/product.md). */
export type GetProductsFilters = {
  searchTerm?: string
  sort?: string
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  isNew?: string
  isOffered?: string
}

const ALLOWED_SORT = new Set([
  "latest",
  "oldest",
  "price_high_low",
  "price_low_high",
])

const buildQueryString = (
  page: number,
  limit: number,
  filters?: GetProductsFilters
) => {
  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("limit", String(limit))
  const searchTerm = filters?.searchTerm?.trim()
  if (searchTerm) params.set("searchTerm", searchTerm)
  const sort = filters?.sort?.trim()
  if (sort && ALLOWED_SORT.has(sort)) params.set("sort", sort)
  const category = filters?.category?.trim()
  const brand = filters?.brand?.trim()
  if (category) params.set("category", category)
  if (brand) params.set("brand", brand)
  const minPrice = filters?.minPrice?.trim()
  const maxPrice = filters?.maxPrice?.trim()
  if (minPrice !== undefined && minPrice !== "" && !Number.isNaN(Number(minPrice))) {
    params.set("minPrice", minPrice)
  }
  if (maxPrice !== undefined && maxPrice !== "" && !Number.isNaN(Number(maxPrice))) {
    params.set("maxPrice", maxPrice)
  }
  const isNew = filters?.isNew
  if (isNew === "true" || isNew === "false") params.set("isNew", isNew)
  const isOffered = filters?.isOffered
  if (isOffered === "true" || isOffered === "false") {
    params.set("isOffered", isOffered)
  }
  return `?${params.toString()}`
}

export const getProducts = async (
  page = 1,
  limit = FALLBACK_LIMIT,
  filters?: GetProductsFilters
): Promise<{
  success: boolean
  message: string
  data: ProductListItem[]
  meta: ProductListMeta
}> => {
  try {
    const query = buildQueryString(page, limit, filters)
    const endpoints = [`/products${query}`, `/product${query}`]

    let data: ProductListResponse | null = null

    for (const endpoint of endpoints) {
      const res = await apiFetch.get(endpoint)

      if (!res.ok) continue

      data = (await res.json()) as ProductListResponse
      break
    }

    if (!data) {
      return {
        success: false,
        message: "Failed to fetch products.",
        data: [],
        meta: { ...defaultMeta, currentPage: page, limit },
      }
    }

    const normalizedData = toArray(data.data)
    const meta = normalizeMeta(data.meta, page, limit, normalizedData.length)

    return {
      success: Boolean(data.success),
      message: data.message || "Products loaded.",
      data: normalizedData,
      meta,
    }
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to fetch products."
          : "Failed to fetch products.",
      data: [],
      meta: { ...defaultMeta, currentPage: page, limit },
    }
  }
}
