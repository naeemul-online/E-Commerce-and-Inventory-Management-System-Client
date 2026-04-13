import { serverFetch } from "@/lib/server-fetch"
import { UserInfo } from "@/types/auth"

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await serverFetch.get("/auth/profile", {
      cache: "no-store",
      credentials: "include",
    })

    const result = await response.json()

    if (!result?.success) {
      return null
    }

    return result.data as UserInfo
  } catch (error) {
    console.error("getUserInfo error:", error)
    return null
  }
}
