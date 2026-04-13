import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js"

import { z } from "zod"

export const loginSchema = z.object({
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

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be at max 8 characters")
    .optional(),
})

// In auth.schema.ts — export both types
export type LoginInput = z.input<typeof loginSchema>
export type LoginOutput = z.output<typeof loginSchema>
