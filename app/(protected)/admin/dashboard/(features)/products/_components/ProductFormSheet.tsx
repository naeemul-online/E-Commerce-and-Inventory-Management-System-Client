"use client"

import { useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Brand } from "@/types/brand"
import type { Category } from "@/types/category"
import type { ProductListItem } from "@/types/product"

import ProductForm from "./ProductForm"

type ProductFormSheetProps = {
  mode: "create" | "edit"
  categories: Category[]
  brands: Brand[]
  initialProduct?: ProductListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Slide-in drawer that hosts the reusable ProductForm.
 *
 * Animation is provided by `Sheet` (data-open / data-closed transitions on
 * the Radix primitive). The sheet is wider than the default `sm:max-w-sm`
 * so the form has enough horizontal room for 2–3 column groups.
 */
const ProductFormSheet = ({
  mode,
  categories,
  brands,
  initialProduct,
  open,
  onOpenChange,
}: ProductFormSheetProps) => {
  const title = mode === "create" ? "Add product" : "Edit product"
  const description =
    mode === "create"
      ? "Fill in the details below to create a new product."
      : "Update product information and save your changes."

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-xl lg:max-w-2xl"
      >
        <SheetHeader className="border-b">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <ProductForm
          mode={mode}
          categories={categories}
          brands={brands}
          initialProduct={initialProduct}
          stickyFooter
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  )
}

export default ProductFormSheet

export const useProductFormSheet = () => {
  const [open, setOpen] = useState(false)
  return { open, setOpen }
}
