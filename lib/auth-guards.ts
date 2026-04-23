/**
 * Server-side auth guards for Server Actions and Route Handlers.
 *
 * The `proxy` only protects route navigations. Server Actions are invoked via
 * POST to the page they live on, so they MUST re-verify the session before
 * mutating data. Call `requireAdmin()` at the top of every admin-only action.
 */

import { cookies } from "next/headers"

import { UserRole } from "@/lib/auth-utils"
import { verifyAccessToken, type AccessTokenClaims } from "@/lib/jwt"

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: "UNAUTHENTICATED" | "FORBIDDEN"
  ) {
    super(message)
    this.name = "AuthError"
  }
}

/**
 * Read the current session from cookies. Returns `null` if missing or invalid.
 * Does NOT attempt a refresh — that responsibility stays in `proxy.ts`.
 */
export const getSessionClaims =
  async (): Promise<AccessTokenClaims | null> => {
    const store = await cookies()
    const accessToken = store.get("accessToken")?.value

    if (!accessToken) return null

    try {
      return await verifyAccessToken(accessToken)
    } catch {
      return null
    }
  }

/** Throws AuthError unless an accepted role is present on the cookie token. */
export const requireRole = async (
  allowed: readonly UserRole[]
): Promise<AccessTokenClaims> => {
  const claims = await getSessionClaims()

  if (!claims) {
    throw new AuthError("You must be signed in.", "UNAUTHENTICATED")
  }
  if (!allowed.includes(claims.role)) {
    throw new AuthError(
      "You do not have permission to perform this action.",
      "FORBIDDEN"
    )
  }

  return claims
}

/** Convenience wrapper: allow ADMIN and SUPER_ADMIN. */
export const requireAdmin = () =>
  requireRole(["ADMIN", "SUPER_ADMIN"] as const)

/** Convenience wrapper: only SUPER_ADMIN. */
export const requireSuperAdmin = () => requireRole(["SUPER_ADMIN"] as const)

/**
 * Helper for services returning `{ success, message }` shapes — turns an
 * AuthError into a user-facing response so the UI can show a toast.
 */
export const toAuthFailure = <T extends { success: boolean; message: string }>(
  err: unknown,
  fallback: T
): T => {
  if (err instanceof AuthError) {
    return { ...fallback, success: false, message: err.message }
  }
  throw err
}
