"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import TextField from "@/components/forms/TextField"
import {
  type CreateBrandInput,
  type CreateBrandOutput,
  createBrandSchema,
} from "@/lib/validators/brand"
import { createBrand } from "@/services/brand/create-brand"
import { updateBrand } from "@/services/brand/update-brand"

type BrandFormMode = "create" | "edit"

type BrandCreateFormProps = {
  /** Defaults to "create" for backwards compatibility. */
  mode?: BrandFormMode
  /** Required when `mode === "edit"`. */
  brandId?: string
  /** Prefill used for edit mode. */
  initial?: { name: string }
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Reusable form for both "Create" and "Edit" brand flows. The default export
 * name is kept as `BrandCreateForm` to avoid touching every existing import;
 * callers that edit just pass `mode="edit"` + `brandId`.
 */
const BrandCreateForm = ({
  mode = "create",
  brandId,
  initial,
  onSuccess,
  onCancel,
}: BrandCreateFormProps) => {
  const form = useForm<CreateBrandInput, unknown, CreateBrandOutput>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: { name: initial?.name ?? "" },
  })

  async function onSubmit(values: CreateBrandOutput) {
    const result =
      mode === "edit" && brandId
        ? await updateBrand(brandId, values)
        : await createBrand(values)

    if (!result.success) {
      toast.error(
        result.message ||
          (mode === "edit" ? "Brand update failed." : "Brand creation failed.")
      )
      return
    }

    toast.success(
      result.message ||
        (mode === "edit"
          ? "Brand updated successfully."
          : "Brand created successfully.")
    )

    if (mode === "create") {
      form.reset({ name: "" })
    }
    onSuccess?.()
  }

  const isSubmitting = form.formState.isSubmitting
  const submitLabel =
    mode === "edit"
      ? isSubmitting
        ? "Saving..."
        : "Save changes"
      : isSubmitting
        ? "Creating..."
        : "Create brand"

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <TextField
          control={form.control}
          name="name"
          label="Brand name"
          placeholder="e.g. Apple"
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Slug is generated automatically from the name on the server.
        </p>
      </FieldGroup>

      <div className="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        ) : null}
        <Button
          type="submit"
          className="text-background"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default BrandCreateForm
