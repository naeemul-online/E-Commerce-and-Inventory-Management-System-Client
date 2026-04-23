import { deleteCookie, getCookie, setCookie } from "./tokenHelper"
import { tryMockFetch } from "./fake-fetch"

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5001/api/v1"

/**
 * When `NEXT_PUBLIC_USE_MOCK_API=true`, `serverFetch` first tries the local
 * mock registry (see `lib/mocks/*.mock.ts`). If a route matches, the mock
 * Response is returned. Otherwise the request falls through to the real
 * backend unchanged. This lets every service keep calling `serverFetch` and
 * swap to real HTTP in production with a single env change.
 */
const USE_MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true" ||
  process.env.USE_MOCK_API === "true"

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
  if (USE_MOCK_API) {
    const mocked = await tryMockFetch(endpoint, options)
    if (mocked) return mocked
  }

  const { headers, ...restOptions } = options

  const cookieHeader = await getCookieHeader()

  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

  // When the caller passes FormData (e.g. multipart product create/update),
  // the runtime must set the multipart boundary itself. Forcing
  // `Content-Type: application/json` would break the upload.
  const isFormDataBody =
    typeof FormData !== "undefined" && restOptions.body instanceof FormData

  const baseHeaders: HeadersInit = isFormDataBody
    ? { ...headers }
    : { "Content-Type": "application/json", ...headers }

  const response = await fetch(`${BACKEND_API_URL}${url}`, {
    ...restOptions,
    cache: restOptions.cache ?? "no-store",
    headers: {
      ...baseHeaders,
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
      ...baseHeaders,
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
