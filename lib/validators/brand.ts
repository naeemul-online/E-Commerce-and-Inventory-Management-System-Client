import { z } from "zod"

export const createBrandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(80, "Brand name must be under 80 characters"),
})

export type CreateBrandInput = z.input<typeof createBrandSchema>
export type CreateBrandOutput = z.output<typeof createBrandSchema>

/**
 * Update currently accepts the same payload as create. Kept as a separate
 * export so callers read as intent and the two can diverge later without
 * breaking existing create usages.
 */
export const updateBrandSchema = createBrandSchema
export type UpdateBrandInput = z.input<typeof updateBrandSchema>
export type UpdateBrandOutput = z.output<typeof updateBrandSchema>
