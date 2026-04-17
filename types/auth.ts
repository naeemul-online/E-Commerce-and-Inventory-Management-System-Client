import { UserRole } from "@/lib/auth-utils"

export interface RegisterRequest {
  fullName: string
  phone: string
  email?: string
  password?: string
}

export interface LoginRequest {
  phone: string
  password?: string
}
export interface RegisterRequest {
  fullName: string
  phone: string
  email?: string
  password?: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    user: {
      id: string
      fullName: string
      phone: string
      role: string
    }
  }
}

export interface UserInfo {
  id: string
  fullName: string
  phone: string
  email: string
  role: UserRole
}
