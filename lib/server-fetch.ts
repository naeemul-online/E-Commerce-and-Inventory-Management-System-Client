import { getCookie } from "./tokenHelper"

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5001/api/v1"

// /auth/login
const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options

  const accessToken = await getCookie("accessToken")

  // Ensure endpoint starts with /
  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

  const response = await fetch(`${BACKEND_API_URL}${url}`, {
    ...restOptions,
    headers: {
      // 1. Default to JSON (Essential for your Express backend)
      "Content-Type": "application/json",
      // 2. Spread incoming headers (allows overriding Content-Type if needed)
      ...headers,
      // 3. Authorization (using Cookie header for server-to-server)
      ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
    },
  })

  return response
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
