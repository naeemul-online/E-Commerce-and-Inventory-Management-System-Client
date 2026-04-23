"use server"

import { revalidatePath } from "next/cache"

import { serverFetch } from "@/lib/server-fetch"
import type { ProductListItem } from "@/types/product"

type UpdateProductResponse = {
  success: boolean
  message: string
  data?: ProductListItem | null
}

/**
 * Update a product via `PATCH /product/:id`.
 *
 * Accepts a FormData payload with the same shape as `createProduct`
 * (`data` JSON string + optional `images` files). Unchanged images can be
 * omitted — the backend keeps the existing gallery when `images` is empty.
 */
export const updateProduct = async (
  productId: string,
  formData: FormData
): Promise<UpdateProductResponse> => {
  try {
    const res = await serverFetch.patch(`/product/${productId}`, {
      body: formData,
    })

    const parsed = (await res.json().catch(() => null)) as
      | UpdateProductResponse
      | null

    if (!res.ok || !parsed?.success) {
      return {
        success: false,
        message: parsed?.message || "Failed to update product.",
        data: parsed?.data ?? null,
      }
    }

    revalidatePath("/admin/dashboard/products")
    revalidatePath(`/admin/dashboard/products/${productId}/edit`)

    return parsed
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to update product."
          : "Failed to update product.",
    }
  }
}
