"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import TextField from "@/components/forms/TextField"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import {
  CreateBrandInput,
  CreateBrandOutput,
  createBrandSchema,
} from "@/lib/validators/brand"
import { createBrand } from "@/services/brand/create-brand"

const ProductBrandCreateForm = () => {
  const form = useForm<CreateBrandInput, unknown, CreateBrandOutput>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: CreateBrandOutput) {
    const result = await createBrand(values)

    if (!result.success) {
      toast.error(result.message || "Brand creation failed.")
      return
    }

    toast.success(result.message || "Brand created successfully.")
    form.reset({ name: "" })
  }

  return (
    <Card className="border bg-card shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Create Product Brand</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add brand first, then use it while creating a product.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="gap-4">
            <TextField
              control={form.control}
              name="name"
              label="Brand Name"
              placeholder="e.g. sundarban honey"
              disabled={form.formState.isSubmitting}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="cursor-pointer text-background"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Brand"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductBrandCreateForm
