"use server"

import { getUserInfo } from "@/lib/getUserInfo"

export const getAuthUserInfo = async () => {
  return getUserInfo()
}
