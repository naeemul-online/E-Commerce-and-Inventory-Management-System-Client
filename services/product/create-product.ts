"use server"

import { revalidatePath } from "next/cache"

import { serverFetch } from "@/lib/server-fetch"
import type { ProductListItem } from "@/types/product"

type CreateProductResponse = {
  success: boolean
  message: string
  data?: ProductListItem | null
}

/**
 * Create a product via `POST /product`.
 *
 * The backend expects `multipart/form-data` with:
 *   - `data`    → JSON string of the product body
 *   - `images`  → one or more image files (appended with the same key)
 *
 * The caller (`ProductForm`) builds the FormData from react-hook-form state
 * and passes it through. `serverFetch` will forward the body without
 * overriding Content-Type (see `lib/server-fetch.ts`).
 */
export const createProduct = async (
  formData: FormData
): Promise<CreateProductResponse> => {
  try {
    const res = await serverFetch.post("/product", { body: formData })

    const parsed = (await res.json().catch(() => null)) as
      | CreateProductResponse
      | null

    if (!res.ok || !parsed?.success) {
      return {
        success: false,
        message: parsed?.message || "Failed to create product.",
        data: parsed?.data ?? null,
      }
    }

    revalidatePath("/admin/dashboard/products")

    return parsed
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to create product."
          : "Failed to create product.",
    }
  }
}
