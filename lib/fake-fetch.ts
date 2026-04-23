import { mockRoutes } from "./mocks"
import { matchRoute, type MockContext, type MockMethod } from "./mocks/types"

/**
 * Reusable fake fetch that mirrors the public surface of `serverFetch`.
 *
 * Route handlers live in `lib/mocks/*.mock.ts` and are aggregated in
 * `lib/mocks/index.ts`. This keeps per-feature mock data isolated while the
 * transport layer stays shared.
 *
 * Two entry points are exported:
 *   - `fakeFetch`      → standalone helper. Unmatched routes return 404.
 *   - `tryMockFetch`   → returns a Response when a mock matches, otherwise
 *                        `null`. Used by `server-fetch` so it can transparently
 *                        fall through to the real backend when no mock exists.
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

function normalizePath(endpoint: string): {
  pathname: string
  query: URLSearchParams
} {
  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  const [pathname, queryString = ""] = url.split("?")
  return { pathname, query: new URLSearchParams(queryString) }
}

async function runMock(
  endpoint: string,
  options: RequestInit
): Promise<Response | null> {
  const { pathname, query } = normalizePath(endpoint)
  const method =
    ((options.method || "GET").toUpperCase() as MockMethod) ?? "GET"

  for (const route of mockRoutes) {
    if (route.method !== method) continue
    const params = matchRoute(route.pattern, pathname)
    if (!params) continue

    await new Promise((resolve) => setTimeout(resolve, DEFAULT_DELAY_MS))

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
            error instanceof Error
              ? error.message
              : "Fake fetch handler error",
          data: null,
        },
        { status: 500 }
      )
    }
  }

  return null
}

/**
 * Returns a mock Response when a route matches, otherwise null.
 * Intended for use inside `server-fetch` as an opt-in intercept.
 */
export async function tryMockFetch(
  endpoint: string,
  options: RequestInit
): Promise<Response | null> {
  return runMock(endpoint, options)
}

async function fakeFetchHelper(
  endpoint: string,
  options: RequestInit
): Promise<Response> {
  const mocked = await runMock(endpoint, options)
  if (mocked) return mocked

  const { pathname } = normalizePath(endpoint)
  const method = (options.method || "GET").toUpperCase()
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
