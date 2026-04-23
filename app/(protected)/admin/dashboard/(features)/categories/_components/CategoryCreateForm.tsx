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

type CategoryCreateFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

const CategoryCreateForm = ({
  onSuccess,
  onCancel,
}: CategoryCreateFormProps) => {
  const form = useForm<CreateCategoryInput, unknown, CreateCategoryOutput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "" },
  })

  async function onSubmit(values: CreateCategoryOutput) {
    const result = await createCategory(values)

    if (!result.success) {
      toast.error(result.message || "Category creation failed.")
      return
    }

    toast.success(result.message || "Category created successfully.")
    form.reset({ name: "" })
    onSuccess?.()
  }

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
          disabled={form.formState.isSubmitting}
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
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
        ) : null}
        <Button
          type="submit"
          className="text-background"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create category"}
        </Button>
      </div>
    </form>
  )
}

export default CategoryCreateForm
