/**
 * Edge-runtime-safe JWT verification using `jose`.
 *
 * `jsonwebtoken` depends on Node's built-in `crypto` module, which is not
 * available in the Edge runtime that Next.js uses for `proxy.ts` / middleware.
 * `jose` uses WebCrypto and works in both Edge and Node runtimes, so every
 * call site (proxy, server actions, API routes) can share this helper.
 */

import { jwtVerify } from "jose"

import type { UserRole } from "@/lib/auth-utils"

export type AccessTokenClaims = {
  sub?: string
  userId?: string
  email?: string
  role: UserRole
  iat?: number
  exp?: number
}

const getSecretKey = (): Uint8Array => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not configured. Set it in your environment before verifying tokens."
    )
  }
  return new TextEncoder().encode(secret)
}

/**
 * Verify an HS256 access token and return its claims. Throws on any failure
 * (expired, malformed, bad signature, missing secret).
 */
export const verifyAccessToken = async (
  token: string
): Promise<AccessTokenClaims> => {
  const { payload } = await jwtVerify(token, getSecretKey(), {
    algorithms: ["HS256"],
  })
  return payload as AccessTokenClaims
}
