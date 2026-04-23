"use server"

import { revalidatePath } from "next/cache"

import { AuthError, requireAdmin } from "@/lib/auth-guards"
import { serverFetch } from "@/lib/server-fetch"

export const deleteBrand = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await requireAdmin()

    const res = await serverFetch.delete(`/brand/${id}`)
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean
      message?: string
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.message || `Failed to delete brand (status ${res.status}).`,
      }
    }

    revalidatePath("/admin/dashboard/brands")
    revalidatePath("/admin/dashboard/products")

    return {
      success: data?.success ?? true,
      message: data?.message || "Brand deleted.",
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { success: false, message: error.message }
    }
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Failed to delete brand."
          : "Failed to delete brand.",
    }
  }
}
