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

type BrandCreateFormProps = {
  onSuccess?: () => void
  onCancel?: () => void
}

const BrandCreateForm = ({ onSuccess, onCancel }: BrandCreateFormProps) => {
  const form = useForm<CreateBrandInput, unknown, CreateBrandOutput>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: { name: "" },
  })

  async function onSubmit(values: CreateBrandOutput) {
    const result = await createBrand(values)

    if (!result.success) {
      toast.error(result.message || "Brand creation failed.")
      return
    }

    toast.success(result.message || "Brand created successfully.")
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
          label="Brand name"
          placeholder="e.g. Apple"
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
          {form.formState.isSubmitting ? "Creating..." : "Create brand"}
        </Button>
      </div>
    </form>
  )
}

export default BrandCreateForm
