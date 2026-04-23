import { NextRequest, NextResponse } from "next/server"

import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "@/lib/auth-utils"
import { verifyAccessToken } from "@/lib/jwt"

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

const readUserRole = async (
  accessToken: string
): Promise<UserRole | null> => {
  try {
    const claims = await verifyAccessToken(accessToken)
    return claims.role ?? null
  } catch {
    return null
  }
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
  const nextRefreshToken =
    (data?.data?.refreshToken as string | undefined) || null

  if (!nextAccessToken) {
    return null
  }

  return { accessToken: nextAccessToken, refreshToken: nextRefreshToken }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  let accessToken = request.cookies.get("accessToken")?.value || null
  let userRole: UserRole | null = null
  let refreshedTokens:
    | { accessToken: string; refreshToken: string | null }
    | null = null

  if (accessToken) {
    userRole = await readUserRole(accessToken)

    if (!userRole) {
      refreshedTokens = await refreshAccessToken(request)

      if (!refreshedTokens) {
        // Public auth routes can still render without a valid session.
        if (isAuthRoute(pathname)) {
          return clearAuthCookies(NextResponse.next())
        }
        const loginUrl = new URL("/login", request.url)
        return clearAuthCookies(NextResponse.redirect(loginUrl))
      }

      accessToken = refreshedTokens.accessToken
      userRole = await readUserRole(accessToken)

      if (!userRole) {
        const loginUrl = new URL("/login", request.url)
        return clearAuthCookies(NextResponse.redirect(loginUrl))
      }
    }
  }

  const routeOwner = getRouteOwner(pathname)
  const isAuth = isAuthRoute(pathname)

  // Logged-in user visiting /login or /register → send them to their dashboard.
  if (accessToken && userRole && isAuth) {
    return withRefreshedTokens(
      NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url)
      ),
      refreshedTokens
    )
  }

  // Public routes – no further checks needed.
  if (routeOwner === null) {
    return withRefreshedTokens(NextResponse.next(), refreshedTokens)
  }

  // Protected routes, but no session → force login and remember the target.
  if (!accessToken || !userRole) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set(
      "redirect",
      `${pathname}${request.nextUrl.search}`
    )
    return NextResponse.redirect(loginUrl)
  }

  // Common protected routes (profile / settings / account) — any role allowed.
  if (routeOwner === "COMMON") {
    return withRefreshedTokens(NextResponse.next(), refreshedTokens)
  }

  // Role-owned area (/admin, /super-admin, /user) — only the matching role.
  if (routeOwner !== userRole) {
    return withRefreshedTokens(
      NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url)
      ),
      refreshedTokens
    )
  }

  return withRefreshedTokens(NextResponse.next(), refreshedTokens)
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/super-admin/:path*",
    "/user/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/account/:path*",
  ],
}
