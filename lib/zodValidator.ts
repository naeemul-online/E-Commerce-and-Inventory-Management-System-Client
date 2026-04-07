/* eslint-disable @typescript-eslint/no-explicit-any */

export const zodValidator = (payload: any, schema: any) => {
  const result = schema.safeParse(payload)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((issue: any) => ({
        field: issue.path[0].toString(),
        message: issue.message,
      })),
    }
  }

  return {
    success: true,
    data: result.data,
  }
}
