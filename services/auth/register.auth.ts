/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidator } from "@/lib/zodValidator"
import { registerSchema } from "@/zod/auth.validation"

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
    }

    console.log("payload", payload)

    const validation = zodValidator(payload, registerSchema)

    console.log("validation", validation)

    if (!validation.success) {
      return validation
    }

    const cleanData = validation.data
    console.log("clean data", cleanData)

    return cleanData
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    console.log(error)
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    }
  }
}
