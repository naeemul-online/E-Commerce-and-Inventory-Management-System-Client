import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "@/lib/auth-utils"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  /* ----------------------------
   * 1. Read cookie (middleware-safe)
   * ---------------------------- */
  const accessToken = request.cookies.get("accessToken")?.value || null

  let userRole: UserRole | null = null

  /* ----------------------------
   * 2. Verify JWT (if exists)
   * ---------------------------- */
  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload

      userRole = decoded.role as UserRole
    } catch {
      // Invalid / expired token → clear cookies + redirect to login
      const response = NextResponse.redirect(new URL("/", request.url))

      response.cookies.delete("accessToken")
      response.cookies.delete("refreshToken")

      return response
    }
  }

  /* ----------------------------
   * 3. Route metadata
   * ---------------------------- */
  const routeOwner = getRouteOwner(pathname)
  const isAuth = isAuthRoute(pathname)

  /* ----------------------------
   * 4. Logged-in user visiting auth route
   * ---------------------------- */
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    )
  }

  /* ----------------------------
   * 5. Public routes
   * ---------------------------- */
  if (routeOwner === null) {
    return NextResponse.next()
  }

  /* ----------------------------
   * 6. Protected routes – unauthenticated
   * ---------------------------- */
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  /* ----------------------------
   * 7. Common protected routes
   * ---------------------------- */
  if (routeOwner === "COMMON") {
    return NextResponse.next()
  }

  /* ----------------------------
   * 8. Role-based protected routes
   * ---------------------------- */
  if (
    routeOwner === "ADMIN" ||
    routeOwner === "SUPER_ADMIN" ||
    routeOwner === "USER"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      )
    }
  }

  return NextResponse.next()
}

/* ----------------------------
 * Middleware matcher
 * ---------------------------- */
export const config = {
  matcher: ["/admin/:path*", "/super-admin/:path*", "/user/:path*", "/profile"],
}
