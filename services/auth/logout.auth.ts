"use server"

import { serverFetch } from "@/lib/server-fetch"
import { deleteCookie } from "@/lib/tokenHelper"

export const logoutUser = async () => {
  try {
    await serverFetch.post("auth/logout")
  } catch (error) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Failed to logout. Please try again.",
    }
  }

  await deleteCookie("accessToken")
  await deleteCookie("refreshToken")

  return {
    success: true,
    message: "Logged out successfully.",
  }
}
