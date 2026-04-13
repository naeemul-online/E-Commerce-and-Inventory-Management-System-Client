import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js"

import { z } from "zod"

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .transform((v) => v.trim().replace(/\s+/g, " ")),

  phone: z
    .string()
    .transform((val) => val.replace(/[\s-]/g, ""))
    .transform((val) => {
      const phone = parsePhoneNumberFromString(val, "BD") // or dynamic
      return phone ? phone.number : val
    })
    .refine((val) => isValidPhoneNumber(val), {
      message: "Enter a valid phone number",
    }),

  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v?.trim().toLowerCase())),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be at max 8 characters")
    .optional(),
})

// In auth.schema.ts — export both types
export type RegisterInput = z.input<typeof registerSchema>
export type RegisterOutput = z.output<typeof registerSchema>
