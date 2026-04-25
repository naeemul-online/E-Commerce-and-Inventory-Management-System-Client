"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Category } from "@/types/category"

import CategoryCreateForm from "./CategoryCreateForm"

type EditCategoryButtonProps = {
  category: Pick<Category, "id" | "name" | "image">
  /**
   * When true, the trigger is non-interactive. Used by row-level wrappers
   * that share a pending state (e.g. while a sibling delete request is in
   * flight) so the admin cannot edit a row that is being removed.
   */
  disabled?: boolean
}

const EditCategoryButton = ({
  category,
  disabled = false,
}: EditCategoryButtonProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (next: boolean) => {
    if (disabled && next) return
    setOpen(next)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={disabled}
        aria-disabled={disabled}
        onClick={() => {
          if (disabled) return
          setOpen(true)
        }}
      >
        Edit
      </Button>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Edit category</SheetTitle>
          <SheetDescription>
            Update the category name. The slug will be regenerated on the
            server if supported.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <CategoryCreateForm
            mode="edit"
            categoryId={category.id}
            initial={{ name: category.name, image: category.image ?? null }}
            onSuccess={() => {
              setOpen(false)
              router.refresh()
            }}
            onCancel={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default EditCategoryButton
