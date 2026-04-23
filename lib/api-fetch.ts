import { serverFetch } from "./server-fetch"
import { fakeFetch } from "./fake-fetch"

/**
 * Unified transport used by service modules. Swap all services from
 * `serverFetch` to `apiFetch` to make them mock-swappable without touching
 * the service logic.
 *
 * Toggle behaviour:
 *   - `NEXT_PUBLIC_USE_FAKE_API=true` (or `USE_FAKE_API=true`) → fakeFetch
 *   - anything else (default)                                  → serverFetch
 *
 * The public surface (get/post/put/patch/delete) is identical to serverFetch,
 * so existing code keeps working.
 */
const USE_FAKE_API =
  process.env.NEXT_PUBLIC_USE_FAKE_API === "true" ||
  process.env.USE_FAKE_API === "true"

export const apiFetch = USE_FAKE_API ? fakeFetch : serverFetch

export const isFakeApiEnabled = USE_FAKE_API
