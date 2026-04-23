"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import type { Brand } from "@/types/brand"
import type { Category } from "@/types/category"

import ProductFormSheet from "./ProductFormSheet"

type AddProductButtonProps = {
  categories: Category[]
  brands: Brand[]
  className?: string
}

const AddProductButton = ({
  categories,
  brands,
  className,
}: AddProductButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className={className}>
        Add product
      </Button>
      <ProductFormSheet
        mode="create"
        categories={categories}
        brands={brands}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default AddProductButton
