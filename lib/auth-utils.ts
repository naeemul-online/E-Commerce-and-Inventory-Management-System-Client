export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER"

export type RouteConfig = {
  exact: string[]
  patterns: RegExp[]
}

/**
 * Routes that should remain accessible without authentication.
 * (Use pathname-only values; query strings are not part of `pathname`.)
 */
export const authRoutes = ["/login", "/register"]

/**
 * Routes that require authentication but are shared across roles.
 * Keep these **outside** `/user`, `/admin`, `/super-admin` prefixes.
 */
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/profile", "/settings", "/account"],
  patterns: [
    /^\/profile(\/.*)?$/,
    /^\/settings(\/.*)?$/,
    /^\/account(\/.*)?$/,
  ],
}

/**
 * Super admin area: full control (users, admins, inventory, orders, deliveries).
 */
export const superAdminProtectedRoutes: RouteConfig = {
  patterns: [/^\/super-admin(\/.*)?$/],
  exact: [],
}

/**
 * Admin area: manage orders, users, delivery, inventory, and own profile/settings.
 */
export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin(\/.*)?$/],
  exact: [],
}

/**
 * User area: dashboard, orders, tracking, profile essentials.
 */
export const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/user(\/.*)?$/],
  exact: [],
}

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname)
}

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
  // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
}

export const getRouteOwner = (
  pathname: string
): "SUPER_ADMIN" | "ADMIN" | "USER" | "COMMON" | null => {
  if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
    return "SUPER_ADMIN"
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN"
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER"
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON"
  }
  return null
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard"
  }
  if (role === "SUPER_ADMIN") {
    return "/super-admin/dashboard"
  }
  if (role === "USER") {
    return "/user/dashboard"
  }
  return "/"
}

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath)

  if (routeOwner === null || routeOwner === "COMMON") {
    return true
  }

  if (routeOwner === role) {
    return true
  }

  return false
}
