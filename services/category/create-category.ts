"use server"

import { revalidatePath } from "next/cache"

import { serverFetch } from "@/lib/server-fetch"
import { CreateCategoryOutput } from "@/lib/validators/category"
import { CreateCategoryResponse } from "@/types/category"

export const createCategory = async (
  payload: CreateCategoryOutput
): Promise<CreateCategoryResponse> => {
  try {
    const res = await serverFetch.post("/category", {
      body: JSON.stringify(payload),
    })

    const data = (await res.json()) as CreateCategoryResponse

    if (data?.success) {
      revalidatePath("/admin/dashboard/categories")
      revalidatePath("/admin/dashboard/products")
    }

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Failed to create category."
          : "Failed to create category.",
    }
  }
}
