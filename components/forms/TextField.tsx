import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input, InputProps } from "../ui/input"

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
} & InputProps

const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: TextFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Input
            id={name}
            {...field}
            {...props}
            aria-invalid={fieldState.invalid}
          />

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

export default TextField
