export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER"

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
  exact: string[]
  patterns: RegExp[]
}

export const authRoutes = ["/login", "/register"]

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/profile", "/profile/:id", "edit-profile/:id"],
  patterns: [], // [/password/change-password, /password/reset-password => /password/*]
}

export const hostProtectedRoutes: RouteConfig = {
  patterns: [/^\/super-admin/], // Routes starting with /doctor/* , /assitants, /appointments/*
  exact: [], // "/assistants"
}

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/], // Routes starting with /admin/*
  exact: [], // "/admins"
}

export const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/user/], // Routes starting with /dashboard/*
  exact: [], // "/dashboard"
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
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "SUPER_ADMIN"
  }
  if (isRouteMatches(pathname, hostProtectedRoutes)) {
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
