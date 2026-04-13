"use server"

import { serverFetch } from "@/lib/server-fetch"
import { deleteCookie } from "@/lib/tokenHelper"
import { redirect } from "next/navigation"

export const logoutUser = async () => {
  await deleteCookie("accessToken")
  await deleteCookie("refreshToken")
  await serverFetch.post("auth/logout")
  redirect("/?loggedOut=true")
}
