import { z } from "zod"

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name must be at least 1 characters")
    .transform((val) => val.trim().replace(/\s+/g, " ")),
  phone: z
    .string()
    .min(8, "Invalid phone number")
    .max(11, "Invalid phone number")
    .regex(/^\d+$/, "Phone must contain only numbers")
    .transform((val) => val.trim()),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || undefined),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be at most 8 characters"),
})
