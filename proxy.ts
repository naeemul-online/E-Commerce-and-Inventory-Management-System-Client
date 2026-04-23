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

type RefreshedTokens = {
  accessToken: string
  refreshToken: string | null
}

/**
 * Build the URL to redirect the user to `/login`, preserving the page they
 * were trying to reach so the login flow can return them there afterwards.
 */
const buildLoginRedirect = (request: NextRequest): URL => {
  const loginUrl = new URL("/login", request.url)
  const target = `${request.nextUrl.pathname}${request.nextUrl.search}`
  if (target && target !== "/login") {
    loginUrl.searchParams.set("redirect", target)
  }
  return loginUrl
}

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.delete("accessToken")
  response.cookies.delete("refreshToken")
  return response
}

/**
 * Attach refreshed tokens to the outgoing response so the browser receives
 * the new cookies on its next render cycle.
 */
const attachRefreshedCookies = (
  response: NextResponse,
  tokens: RefreshedTokens | null
) => {
  if (!tokens) return response
  response.cookies.set("accessToken", tokens.accessToken, authCookieOptions)
  if (tokens.refreshToken) {
    response.cookies.set("refreshToken", tokens.refreshToken, authCookieOptions)
  }
  return response
}

/**
 * Forward the refreshed access/refresh tokens into the *incoming* request
 * headers so that server components, route handlers, and server actions
 * rendering inside the same invocation see the NEW cookie values via
 * `cookies()`. Without this, downstream code would read the expired token
 * and trigger a second refresh inside `serverFetch`.
 */
const buildRequestInitWithRefreshedCookies = (
  request: NextRequest,
  tokens: RefreshedTokens | null
) => {
  if (!tokens) return undefined

  const forwardedHeaders = new Headers(request.headers)
  const existing = request.cookies.getAll()
  const merged = new Map<string, string>()
  for (const { name, value } of existing) {
    merged.set(name, value)
  }
  merged.set("accessToken", tokens.accessToken)
  if (tokens.refreshToken) {
    merged.set("refreshToken", tokens.refreshToken)
  }
  const cookieHeader = Array.from(merged.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ")
  forwardedHeaders.set("cookie", cookieHeader)

  return { request: { headers: forwardedHeaders } }
}

const nextWithRefresh = (
  request: NextRequest,
  tokens: RefreshedTokens | null
) => {
  const init = buildRequestInitWithRefreshedCookies(request, tokens)
  const response = init ? NextResponse.next(init) : NextResponse.next()
  return attachRefreshedCookies(response, tokens)
}

const redirectWithRefresh = (
  destination: URL,
  tokens: RefreshedTokens | null
) => attachRefreshedCookies(NextResponse.redirect(destination), tokens)

const readUserRole = async (accessToken: string): Promise<UserRole | null> => {
  try {
    const claims = await verifyAccessToken(accessToken)
    return claims.role ?? null
  } catch {
    return null
  }
}

/**
 * Exchange the current `refreshToken` cookie for a fresh access/refresh pair
 * by calling the backend. Returns `null` on any failure so the caller can
 * decide whether the route requires a redirect to `/login`.
 */
const refreshAccessToken = async (
  request: NextRequest
): Promise<RefreshedTokens | null> => {
  const refreshToken = request.cookies.get("refreshToken")?.value || null
  if (!refreshToken) return null

  const accessCookie = request.cookies.get("accessToken")?.value
  const cookieHeader = [
    accessCookie ? `accessToken=${accessCookie}` : null,
    `refreshToken=${refreshToken}`,
  ]
    .filter(Boolean)
    .join("; ")

  try {
    const response = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    })

    if (!response.ok) return null

    const data = await response.json().catch(() => null)
    const nextAccessToken = data?.data?.accessToken as string | undefined
    const nextRefreshToken =
      (data?.data?.refreshToken as string | undefined) || null

    if (!nextAccessToken) return null
    return { accessToken: nextAccessToken, refreshToken: nextRefreshToken }
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const routeOwner = getRouteOwner(pathname)
  const onAuthRoute = isAuthRoute(pathname)
  const isProtectedRoute = routeOwner !== null

  let accessToken = request.cookies.get("accessToken")?.value || null
  let userRole: UserRole | null = null
  let refreshedTokens: RefreshedTokens | null = null

  // Verify the current access token; on failure, transparently try a refresh.
  if (accessToken) {
    userRole = await readUserRole(accessToken)

    if (!userRole) {
      refreshedTokens = await refreshAccessToken(request)

      if (refreshedTokens) {
        accessToken = refreshedTokens.accessToken
        userRole = await readUserRole(accessToken)
      }

      // Refresh either failed or returned a token we still can't verify.
      // For public routes just clear stale cookies and continue; for
      // protected routes bounce to /login with the original destination.
      if (!userRole) {
        if (!isProtectedRoute || onAuthRoute) {
          return clearAuthCookies(NextResponse.next())
        }
        return clearAuthCookies(
          NextResponse.redirect(buildLoginRedirect(request))
        )
      }
    }
  }

  // Logged-in visitor hitting /login or /register → send to their dashboard.
  if (accessToken && userRole && onAuthRoute) {
    return redirectWithRefresh(
      new URL(getDefaultDashboardRoute(userRole), request.url),
      refreshedTokens
    )
  }

  // Public route — nothing else to check.
  if (!isProtectedRoute) {
    return nextWithRefresh(request, refreshedTokens)
  }

  // Protected route without a session — force login and remember the target.
  if (!accessToken || !userRole) {
    return NextResponse.redirect(buildLoginRedirect(request))
  }

  // Shared protected area (profile / settings / account).
  if (routeOwner === "COMMON") {
    return nextWithRefresh(request, refreshedTokens)
  }

  // Role-owned area (/admin, /super-admin, /user) — only matching role passes.
  if (routeOwner !== userRole) {
    return redirectWithRefresh(
      new URL(getDefaultDashboardRoute(userRole), request.url),
      refreshedTokens
    )
  }

  return nextWithRefresh(request, refreshedTokens)
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
