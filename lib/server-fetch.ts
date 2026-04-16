import { deleteCookie, getCookie, setCookie } from "./tokenHelper"

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5001/api/v1"

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  path: "/",
} as const

const getCookieHeader = async (accessToken?: string | null) => {
  const currentAccessToken = accessToken ?? (await getCookie("accessToken"))
  const refreshToken = await getCookie("refreshToken")

  const cookieParts = [
    currentAccessToken ? `accessToken=${currentAccessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ].filter(Boolean)

  return cookieParts.length > 0 ? cookieParts.join("; ") : null
}

const refreshAccessToken = async () => {
  const cookieHeader = await getCookieHeader()

  if (!cookieHeader) {
    return null
  }

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
  const nextRefreshToken = data?.data?.refreshToken as string | undefined

  if (!nextAccessToken) {
    return null
  }

  try {
    await setCookie("accessToken", nextAccessToken, authCookieOptions)
    if (nextRefreshToken) {
      await setCookie("refreshToken", nextRefreshToken, authCookieOptions)
    }
  } catch {
    // Cookie mutation is not always available during server rendering.
  }

  return nextAccessToken as string
}

const clearAuthCookies = async () => {
  try {
    await deleteCookie("accessToken")
    await deleteCookie("refreshToken")
  } catch {
    // Cookie mutation is not always available during server rendering.
  }
}

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options

  const cookieHeader = await getCookieHeader()

  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

  const response = await fetch(`${BACKEND_API_URL}${url}`, {
    ...restOptions,
    cache: restOptions.cache ?? "no-store",
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  })

  if (response.status !== 401 || url === "/auth/refresh-token") {
    return response
  }

  const nextAccessToken = await refreshAccessToken()

  if (!nextAccessToken) {
    await clearAuthCookies()
    return response
  }

  const retryCookieHeader = await getCookieHeader(nextAccessToken)

  return fetch(`${BACKEND_API_URL}${url}`, {
    ...restOptions,
    cache: restOptions.cache ?? "no-store",
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(retryCookieHeader ? { Cookie: retryCookieHeader } : {}),
    },
  })
}

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
}

/**
 *
 * serverFetch.get("/auth/me")
 * serverFetch.post("/auth/login", { body: JSON.stringify({}) })
 */
