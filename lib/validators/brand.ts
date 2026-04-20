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
