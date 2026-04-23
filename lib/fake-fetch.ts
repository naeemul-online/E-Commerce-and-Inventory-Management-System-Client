import { mockRoutes } from "./mocks"
import { matchRoute, type MockContext, type MockMethod } from "./mocks/types"

/**
 * Reusable fake fetch that mirrors the public surface of `serverFetch`.
 *
 * Usage is identical to `serverFetch`:
 *   const res = await fakeFetch.get("/products?page=1")
 *   const json = await res.json()
 *
 * Route handlers live in `lib/mocks/*.mock.ts` and are aggregated in
 * `lib/mocks/index.ts`. This keeps per-feature mock data isolated while the
 * transport layer stays shared.
 */

const DEFAULT_DELAY_MS = 120

function makeResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  })
}

function parseBody(options: RequestInit): unknown {
  if (!options.body) return undefined
  if (typeof options.body === "string") {
    try {
      return JSON.parse(options.body)
    } catch {
      return options.body
    }
  }
  return options.body
}

async function fakeFetchHelper(
  endpoint: string,
  options: RequestInit
): Promise<Response> {
  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  const [pathname, queryString = ""] = url.split("?")
  const query = new URLSearchParams(queryString)
  const method = ((options.method || "GET").toUpperCase() as MockMethod) ?? "GET"

  // Simulate a small amount of latency so UI loading states stay visible.
  await new Promise((resolve) => setTimeout(resolve, DEFAULT_DELAY_MS))

  for (const route of mockRoutes) {
    if (route.method !== method) continue
    const params = matchRoute(route.pattern, pathname)
    if (!params) continue

    const context: MockContext = {
      method,
      path: pathname,
      query,
      body: parseBody(options),
    }

    try {
      const body = await route.handler(context, params)
      return makeResponse(body)
    } catch (error) {
      return makeResponse(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Fake fetch handler error",
          data: null,
        },
        { status: 500 }
      )
    }
  }

  return makeResponse(
    {
      success: false,
      message: `[fake-fetch] No mock registered for ${method} ${pathname}`,
      data: null,
    },
    { status: 404 }
  )
}

export const fakeFetch = {
  get: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fakeFetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fakeFetchHelper(endpoint, { ...options, method: "POST" }),

  put: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fakeFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fakeFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    fakeFetchHelper(endpoint, { ...options, method: "DELETE" }),
}
