"use server"

import { serverFetch } from "@/lib/server-fetch"
import { setCookie } from "@/lib/tokenHelper"
import { LoginRequest } from "@/types/auth"

export const login = async (payload: LoginRequest) => {
  try {
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    // ✅ store token
    await setCookie("accessToken", data?.data?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    })

    await setCookie("refreshToken", data?.data?.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    })

    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    console.log(error)
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    }
  }
}
