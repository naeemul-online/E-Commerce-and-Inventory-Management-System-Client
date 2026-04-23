import { z } from "zod"

/**
 * Shared schema for the admin Create / Edit Product form.
 *
 * Numeric fields use `z.coerce.number()` so the form can keep native text
 * inputs (which always produce strings) without extra wiring on each field.
 * `discountedPrice` is optional and stays `null` when emptied in the UI.
 */
export const productFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .max(120, "Title must be under 120 characters"),
    slug: z
      .string()
      .trim()
      .max(140, "Slug must be under 140 characters")
      .optional()
      .or(z.literal("")),
    description: z
      .string()
      .trim()
      .min(5, "Description must be at least 5 characters")
      .max(2000, "Description must be under 2000 characters"),
    regularPrice: z.coerce
      .number({ error: "Regular price is required" })
      .min(0, "Regular price must be ≥ 0"),
    discountedPrice: z
      .preprocess(
        (v) =>
          v === "" || v === null || v === undefined ? undefined : v,
        z.coerce.number().min(0, "Discounted price must be ≥ 0").optional()
      )
      .optional(),
    stock: z.coerce
      .number({ error: "Stock is required" })
      .int("Stock must be a whole number")
      .min(0, "Stock must be ≥ 0"),
    categoryId: z.string().min(1, "Category is required"),
    brandId: z.string().min(1, "Brand is required"),
    tags: z.array(z.string().trim().min(1)).default([]),
    isNew: z.boolean().default(false),
    isOffered: z.boolean().default(false),
    isPublished: z.boolean().default(false),
  })
  .refine(
    (v) =>
      v.discountedPrice === undefined ||
      v.discountedPrice === null ||
      v.discountedPrice <= v.regularPrice,
    {
      path: ["discountedPrice"],
      message: "Discounted price cannot exceed regular price",
    }
  )

export type ProductFormInput = z.input<typeof productFormSchema>
export type ProductFormValues = z.output<typeof productFormSchema>
