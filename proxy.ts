import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "@/lib/auth-utils"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5001/api/v1"

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  path: "/",
} as const

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.delete("accessToken")
  response.cookies.delete("refreshToken")
  return response
}

const withRefreshedTokens = (
  response: NextResponse,
  tokens: { accessToken: string | null; refreshToken: string | null } | null
) => {
  if (tokens?.accessToken) {
    response.cookies.set("accessToken", tokens.accessToken, authCookieOptions)
  }
  if (tokens?.refreshToken) {
    response.cookies.set("refreshToken", tokens.refreshToken, authCookieOptions)
  }

  return response
}

const verifyUserRole = (accessToken: string) => {
  const decoded = jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string
  ) as JwtPayload

  return decoded.role as UserRole
}

const refreshAccessToken = async (
  request: NextRequest
): Promise<{ accessToken: string; refreshToken: string | null } | null> => {
  const refreshToken = request.cookies.get("refreshToken")?.value || null

  if (!refreshToken) {
    return null
  }

  const cookieHeader = [
    `refreshToken=${refreshToken}`,
    request.cookies.get("accessToken")?.value
      ? `accessToken=${request.cookies.get("accessToken")?.value}`
      : null,
  ]
    .filter(Boolean)
    .join("; ")

  const response = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  const nextAccessToken = data?.data?.accessToken as string | undefined
  const nextRefreshToken = (data?.data?.refreshToken as string | undefined) || null

  if (!nextAccessToken) {
    return null
  }

  return { accessToken: nextAccessToken, refreshToken: nextRefreshToken }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  let accessToken = request.cookies.get("accessToken")?.value || null
  let userRole: UserRole | null = null
  let refreshedTokens: { accessToken: string; refreshToken: string | null } | null =
    null

  if (accessToken) {
    try {
      userRole = verifyUserRole(accessToken)
    } catch {
      refreshedTokens = await refreshAccessToken(request)

      if (!refreshedTokens) {
        const loginUrl = new URL("/login", request.url)
        return clearAuthCookies(NextResponse.redirect(loginUrl))
      }
      accessToken = refreshedTokens.accessToken

      try {
        userRole = verifyUserRole(accessToken)
      } catch {
        const loginUrl = new URL("/login", request.url)
        return clearAuthCookies(NextResponse.redirect(loginUrl))
      }
    }
  }

  const routeOwner = getRouteOwner(pathname)
  const isAuth = isAuthRoute(pathname)

  // Logged-in user visiting auth routes → send them to their dashboard
  if (accessToken && isAuth) {
    if (!userRole) {
      return clearAuthCookies(NextResponse.redirect(new URL("/login", request.url)))
    }

    return withRefreshedTokens(
      NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url)),
      refreshedTokens
    )
  }

  // Public routes
  if (routeOwner === null) {
    return NextResponse.next()
  }

  // Protected routes – unauthenticated
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If we have a token but couldn't read a role, treat it as unauthenticated
  if (!userRole) {
    const loginUrl = new URL("/login", request.url)
    return clearAuthCookies(NextResponse.redirect(loginUrl))
  }

  // Common protected routes are accessible to any authenticated role
  if (routeOwner === "COMMON") {
    return withRefreshedTokens(NextResponse.next(), refreshedTokens)
  }

  // Role-based protected routes
  if (routeOwner !== userRole) {
    return withRefreshedTokens(
      NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url)),
      refreshedTokens
    )
  }

  console.log(refreshedTokens)

  return withRefreshedTokens(NextResponse.next(), refreshedTokens)
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/super-admin/:path*",
    "/user/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/account/:path*",
  ],
}

