/**
 * @deprecated Mock-vs-real routing now lives inside `serverFetch` itself
 * (see `lib/server-fetch.ts`). Import `serverFetch` directly in new code.
 *
 * This module is kept as a pass-through alias so previously migrated files
 * keep compiling.
 */
export { serverFetch as apiFetch } from "./server-fetch"
