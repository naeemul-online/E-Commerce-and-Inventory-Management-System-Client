/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidator } from "@/lib/zod.validator"
import { registerUserValidationZodSchema } from "@/zod/auth.validation"

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    }

    console.log(payload)

    if (
      zodValidator(payload, registerUserValidationZodSchema).success === false
    ) {
      return zodValidator(payload, registerUserValidationZodSchema)
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerUserValidationZodSchema
    ).data
    if (!validatedPayload) {
      return {
        success: false,
        message: "Invalid form data. Please check your input and try again.",
      }
    }

    // const res = await serverFetch.post("/user/register", {
    //   body: validatedPayload,
    // })

    // const result = await res.json()

    // if (result.success) {
    //   await loginUser(_currentState, formData)
    // }

    return validatedPayload
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
