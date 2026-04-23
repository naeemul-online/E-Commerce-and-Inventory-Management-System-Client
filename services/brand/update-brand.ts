"use server"

import { revalidatePath } from "next/cache"

import { AuthError, requireAdmin } from "@/lib/auth-guards"
import { serverFetch } from "@/lib/server-fetch"
import { UpdateBrandOutput } from "@/lib/validators/brand"
import { CreateBrandResponse } from "@/types/brand"

export const updateBrand = async (
  id: string,
  payload: UpdateBrandOutput
): Promise<CreateBrandResponse> => {
  try {
    await requireAdmin()

    const res = await serverFetch.patch(`/brand/${id}`, {
      body: JSON.stringify(payload),
    })

    const data = (await res.json()) as CreateBrandResponse

    if (data?.success) {
      revalidatePath("/admin/dashboard/brands")
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
          ? error?.message || "Failed to update brand."
          : "Failed to update brand.",
    }
  }
}
