"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import TextField from "@/components/forms/TextField"
import {
  CreateCategoryInput,
  CreateCategoryOutput,
  createCategorySchema,
} from "@/lib/validators/category"
import { createCategory } from "@/services/category/create-category"

const ProductCategoryCreateForm = () => {
  const form = useForm<CreateCategoryInput, unknown, CreateCategoryOutput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: CreateCategoryOutput) {
    const result = await createCategory(values)

    if (!result.success) {
      toast.error(result.message || "Category creation failed.")
      return
    }

    toast.success(result.message || "Category created successfully.")
    form.reset({ name: "" })
  }

  return (
    <Card className="border bg-card shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Create Product Category</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add category first, then use it while creating a product.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="gap-4">
            <TextField
              control={form.control}
              name="name"
              label="Category Name"
              placeholder="e.g. sundarban honey"
              disabled={form.formState.isSubmitting}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="cursor-pointer text-background"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductCategoryCreateForm
