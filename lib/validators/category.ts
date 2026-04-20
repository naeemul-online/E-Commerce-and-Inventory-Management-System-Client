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
