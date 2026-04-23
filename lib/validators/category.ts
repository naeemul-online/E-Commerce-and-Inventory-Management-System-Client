import { z } from "zod"

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(80, "Category name must be under 80 characters"),
})

export type CreateCategoryInput = z.input<typeof createCategorySchema>
export type CreateCategoryOutput = z.output<typeof createCategorySchema>

/**
 * Update uses the same payload shape as create today. Exported as its own
 * alias so callers read as intent ("updateCategorySchema") and so we can
 * evolve the two independently (e.g. add `slug` override) without breaking
 * create callers.
 */
export const updateCategorySchema = createCategorySchema
export type UpdateCategoryInput = z.input<typeof updateCategorySchema>
export type UpdateCategoryOutput = z.output<typeof updateCategorySchema>
