"use server"

import { serverFetch } from "@/lib/server-fetch"
import type { ProductListItem } from "@/types/product"

type GetProductByIdResponse = {
  success: boolean
  message: string
  data: ProductListItem | null
}

/**
 * Fetch a single product by its id via `GET /product/:id`.
 *
 * Falls back to the plural `/products/:id` path the same way
 * `get-products.ts` does, so local backends that use either convention keep
 * working. Returns `data: null` on 404 / parse failure.
 */
export const getProductById = async (
  id: string
): Promise<GetProductByIdResponse> => {
  try {
    const endpoints = [`/product/${id}`, `/products/${id}`]

    for (const endpoint of endpoints) {
      const res = await serverFetch.get(endpoint)
      if (!res.ok) continue

      const parsed = (await res.json().catch(() => null)) as {
        success?: boolean
        message?: string
        data?: ProductListItem | null
      } | null

      if (!parsed) continue

      return {
        success: Boolean(parsed.success ?? true),
        message: parsed.message || "Product retrieved successfully.",
        data: parsed.data ?? null,
      }
    }

    return {
      success: false,
      message: "Product not found.",
      data: null,
    }
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to fetch product."
          : "Failed to fetch product.",
      data: null,
    }
  }
}
