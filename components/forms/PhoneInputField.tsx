"use client"

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import PhoneInput from "react-phone-number-input"

import "react-phone-number-input/style.css"

// Required for basic styling

import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input2 } from "../ui/input2"

type PhoneFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
}

const PhoneInputField = <T extends FieldValues>({
  control,
  name,
  label,
}: PhoneFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <PhoneInput
            international
            defaultCountry="BD" // Bangladesh as default
            value={value}
            onChange={onChange}
            inputComponent={Input2} // Uses your Shadcn Input for consistent UI
            id={name}
            className="flex rounded-3xl bg-input/50 pl-3"
            placeholder="Enter phone number"
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

export default PhoneInputField
