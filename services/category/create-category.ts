"use server"

import { revalidatePath } from "next/cache"

import { AuthError, requireAdmin } from "@/lib/auth-guards"
import { serverFetch } from "@/lib/server-fetch"
import { CreateCategoryResponse } from "@/types/category"

/**
 * The category endpoint expects multipart `FormData` shaped as:
 *   - `name`:  string
 *   - `image`: file (optional on the server, required by our admin UI)
 *
 * The form builds the FormData on the client and passes it through here so
 * that the file blob survives the boundary; serializing/deserializing files
 * through plain server-action arguments is unreliable.
 */
export const createCategory = async (
  formData: FormData
): Promise<CreateCategoryResponse> => {
  try {
    await requireAdmin()

    const res = await serverFetch.post("/category", { body: formData })

    const data = (await res.json().catch(() => ({}))) as CreateCategoryResponse

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.message ||
          `Failed to create category (status ${res.status}).`,
      }
    }

    if (data?.success) {
      revalidatePath("/admin/dashboard/categories")
      revalidatePath("/admin/dashboard/products")
    }

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { success: false, message: error.message }
    }
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Failed to create category."
          : "Failed to create category.",
    }
  }
}
