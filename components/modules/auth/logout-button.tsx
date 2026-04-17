"use client"

import { Button } from "@/components/ui/button"
import { logoutUser } from "@/services/auth/logout.auth"

const LogoutButton = () => {
  const handleLogout = async () => {
    const res = await logoutUser()

    console.log(res)
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

export default LogoutButton
