import { z } from "zod"

export const registerSchema = z
  .object({
    email: z
      .string("Email is required")
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string("Please confirm your password")
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string("Password is required").min(1, "Password is required"),
})

// Generic helper to parse FormData against any Zod schema
export function parseFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: Record<string, string[]> } {
  const raw = Object.fromEntries(formData.entries())
  const result = schema.safeParse(raw)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as Record<
      string,
      string[]
    >
    return { success: false, errors }
  }

  return { success: true, data: result.data }
}
