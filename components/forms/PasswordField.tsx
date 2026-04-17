import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

import { Eye, EyeOff } from "lucide-react"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input, InputProps } from "../ui/input"

type PasswordFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
} & InputProps

const PasswordField = <T extends FieldValues>({
  control,
  name,
  label,
  showPassword,
  setShowPassword,
  ...props
}: PasswordFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <div className="relative">
            <Input
              id={name}
              type={showPassword ? "text" : "password"}
              className="pr-10"
              {...field}
              {...props}
              required
              aria-invalid={fieldState.invalid}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {fieldState.error && (
            <FieldError className="text-xs text-destructive">
              {fieldState.error.message}
            </FieldError>
          )}
        </Field>
      )}
    />
  )
}

export default PasswordField
