"use server"

import { serverFetch } from "@/lib/server-fetch"
import { Brand } from "@/types/brand"

type BrandsListResponse = {
  success: boolean
  message: string
  data?: Brand | Brand[] | null
}

const toArray = (data: BrandsListResponse["data"]): Brand[] => {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

export const getBrands = async (): Promise<{
  success: boolean
  message: string
  data: Brand[]
}> => {
  try {
    const endpoints = ["/brand", "/brands"]

    let parsed: BrandsListResponse | null = null

    for (const path of endpoints) {
      const res = await serverFetch.get(path)
      if (!res.ok) continue
      parsed = (await res.json()) as BrandsListResponse
      break
    }

    if (!parsed) {
      return {
        success: false,
        message: "Failed to fetch brands.",
        data: [],
      }
    }

    return {
      success: Boolean(parsed.success),
      message: parsed.message || "Brands loaded.",
      data: toArray(parsed.data),
    }
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to fetch brands."
          : "Failed to fetch brands.",
      data: [],
    }
  }
}
