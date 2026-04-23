"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import TextField from "@/components/forms/TextField"
import {
  type CreateCategoryInput,
  type CreateCategoryOutput,
  createCategorySchema,
} from "@/lib/validators/category"
import { createCategory } from "@/services/category/create-category"
import { updateCategory } from "@/services/category/update-category"

type CategoryFormMode = "create" | "edit"

type CategoryCreateFormProps = {
  /** Defaults to "create" for backwards compatibility. */
  mode?: CategoryFormMode
  /** Required when `mode === "edit"`. */
  categoryId?: string
  /** Prefill used for edit mode. */
  initial?: { name: string }
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Reusable form for both "Create" and "Edit" category flows. The default
 * export name is kept as `CategoryCreateForm` to avoid touching every
 * existing import; callers that edit just pass `mode="edit"` + `categoryId`.
 */
const CategoryCreateForm = ({
  mode = "create",
  categoryId,
  initial,
  onSuccess,
  onCancel,
}: CategoryCreateFormProps) => {
  const form = useForm<CreateCategoryInput, unknown, CreateCategoryOutput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: initial?.name ?? "" },
  })

  async function onSubmit(values: CreateCategoryOutput) {
    const result =
      mode === "edit" && categoryId
        ? await updateCategory(categoryId, values)
        : await createCategory(values)

    if (!result.success) {
      toast.error(
        result.message ||
          (mode === "edit"
            ? "Category update failed."
            : "Category creation failed.")
      )
      return
    }

    toast.success(
      result.message ||
        (mode === "edit"
          ? "Category updated successfully."
          : "Category created successfully.")
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
        : "Create category"

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-6"
    >
      <FieldGroup className="gap-4">
        <TextField
          control={form.control}
          name="name"
          label="Category name"
          placeholder="e.g. Laptops"
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

export default CategoryCreateForm
