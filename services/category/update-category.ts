"use server"

import { revalidatePath } from "next/cache"

import { AuthError, requireAdmin } from "@/lib/auth-guards"
import { serverFetch } from "@/lib/server-fetch"
import { CreateCategoryResponse } from "@/types/category"

/**
 * Update endpoint mirrors create — multipart `FormData` with `name` and an
 * optional new `image` file. If `image` is omitted, the existing image on
 * the server is preserved.
 */
export const updateCategory = async (
  id: string,
  formData: FormData
): Promise<CreateCategoryResponse> => {
  try {
    await requireAdmin()

    const res = await serverFetch.patch(`/category/${id}`, { body: formData })

    const data = (await res.json().catch(() => ({}))) as CreateCategoryResponse

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.message ||
          `Failed to update category (status ${res.status}).`,
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
          ? error?.message || "Failed to update category."
          : "Failed to update category.",
    }
  }
}
