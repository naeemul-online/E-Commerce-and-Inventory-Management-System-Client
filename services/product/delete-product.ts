"use server"

import { revalidatePath } from "next/cache"

import { serverFetch } from "@/lib/server-fetch"

export const deleteProduct = async (
  productId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const endpoints = [`/products/${productId}`, `/product/${productId}`]

    for (const endpoint of endpoints) {
      const res = await serverFetch.delete(endpoint)

      if (!res.ok) continue

      const data = (await res.json()) as { success?: boolean; message?: string }

      revalidatePath("/admin/dashboard/products")

      return {
        success: Boolean(data.success ?? true),
        message: data.message || "Product deleted successfully.",
      }
    }

    return { success: false, message: "Failed to delete product." }
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to delete product."
          : "Failed to delete product.",
    }
  }
}
