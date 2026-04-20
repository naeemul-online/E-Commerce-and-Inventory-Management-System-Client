"use server"

import { serverFetch } from "@/lib/server-fetch"
import { Category } from "@/types/category"

type CategoriesListResponse = {
  success: boolean
  message: string
  data?: Category | Category[] | null
}

const toArray = (data: CategoriesListResponse["data"]): Category[] => {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

export const getCategories = async (): Promise<{
  success: boolean
  message: string
  data: Category[]
}> => {
  try {
    const endpoints = ["/category", "/categories"]

    let parsed: CategoriesListResponse | null = null

    for (const path of endpoints) {
      const res = await serverFetch.get(path)
      if (!res.ok) continue
      parsed = (await res.json()) as CategoriesListResponse
      break
    }

    if (!parsed) {
      return {
        success: false,
        message: "Failed to fetch categories.",
        data: [],
      }
    }

    return {
      success: Boolean(parsed.success),
      message: parsed.message || "Categories loaded.",
      data: toArray(parsed.data),
    }
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Failed to fetch categories."
          : "Failed to fetch categories.",
      data: [],
    }
  }
}
