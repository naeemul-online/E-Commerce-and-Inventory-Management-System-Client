"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { Brand } from "@/types/brand"
import type { Category } from "@/types/category"
import type { ProductListItem } from "@/types/product"
import { getProductById } from "@/services/product/get-product-by-id"

import ProductFormSheet from "./ProductFormSheet"

type EditProductButtonProps = {
  productId: string
  /**
   * Partial row data from the list. The sheet hydrates with this instantly,
   * then replaces it with the fresh payload fetched on open.
   */
  fallback: ProductListItem
  categories: Category[]
  brands: Brand[]
}

const EditProductButton = ({
  productId,
  fallback,
  categories,
  brands,
}: EditProductButtonProps) => {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState<ProductListItem>(fallback)
  const [isPending, startTransition] = useTransition()

  const handleOpen = () => {
    setOpen(true)
    startTransition(async () => {
      const result = await getProductById(productId)
      if (!result.success || !result.data) {
        if (result.message) toast.error(result.message)
        return
      }
      setProduct(result.data)
    })
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleOpen}
        disabled={isPending && !open}
      >
        Edit
      </Button>
      <ProductFormSheet
        mode="edit"
        categories={categories}
        brands={brands}
        initialProduct={product}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default EditProductButton
