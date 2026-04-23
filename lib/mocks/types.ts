/**
 * Shared types & utilities for the reusable fake-fetch mock system.
 *
 * Each feature module (products, brands, categories, …) contributes a list of
 * MockRoute definitions. The fake-fetch helper walks the registry, matches the
 * incoming request against the route pattern, and invokes the handler with
 * parsed query/body/params.
 */

export type MockMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type MockContext = {
  method: MockMethod
  path: string
  query: URLSearchParams
  body?: unknown
}

export type MockHandler = (
  ctx: MockContext,
  params: Record<string, string>
) => unknown | Promise<unknown>

export type MockRoute = {
  method: MockMethod
  /** Path pattern relative to API base. Supports `:param` placeholders. */
  pattern: string
  handler: MockHandler
}

/**
 * Match a request path against a pattern like `/products/:slug`.
 * Returns the extracted params or `null` when the pattern doesn't match.
 */
export function matchRoute(
  pattern: string,
  path: string
): Record<string, string> | null {
  const patternSegments = pattern.split("/").filter(Boolean)
  const pathSegments = path.split("/").filter(Boolean)

  if (patternSegments.length !== pathSegments.length) return null

  const params: Record<string, string> = {}

  for (let i = 0; i < patternSegments.length; i++) {
    const pSeg = patternSegments[i]
    const aSeg = pathSegments[i]

    if (pSeg.startsWith(":")) {
      params[pSeg.slice(1)] = decodeURIComponent(aSeg)
      continue
    }

    if (pSeg !== aSeg) return null
  }

  return params
}
