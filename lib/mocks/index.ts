import type { MockRoute } from "./types"
import { productMocks } from "./products.mock"

/**
 * Central registry of mock routes consumed by `lib/fake-fetch.ts`.
 *
 * Register new modules here (brands, categories, orders, …) so every feature
 * can share the same fake-fetch transport. Each module should expose its own
 * `*.mock.ts` file that exports a `MockRoute[]`.
 */
export const mockRoutes: MockRoute[] = [
  ...productMocks,
  // ...brandMocks,
  // ...categoryMocks,
]

export type { MockContext, MockHandler, MockRoute } from "./types"
