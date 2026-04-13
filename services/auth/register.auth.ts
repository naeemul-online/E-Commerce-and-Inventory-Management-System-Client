"use server"

import { serverFetch } from "@/lib/server-fetch"
import { setCookie } from "@/lib/tokenHelper"
import { RegisterRequest } from "@/types/auth"

export const registerUser = async (payload: RegisterRequest) => {
  try {
    const res = await serverFetch.post("/auth/register", {
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    // ✅ store token
    await setCookie("accessToken", data.data?.accessToken, {
      httpOnly: true,
      secure: true,
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
