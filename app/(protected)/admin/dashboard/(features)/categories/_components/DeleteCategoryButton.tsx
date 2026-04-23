"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { deleteCategory } from "@/services/category/delete-category"

type DeleteCategoryButtonProps = {
  categoryId: string
  categoryName?: string
}

const DeleteCategoryButton = ({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const label = categoryName ? `"${categoryName}"` : "this category"
    const isConfirmed = window.confirm(
      `Delete ${label}? Products using it may become invalid until reassigned.`
    )
    if (!isConfirmed) return

    startTransition(async () => {
      const result = await deleteCategory(categoryId)
      if (!result.success) {
        toast.error(result.message || "Delete failed.")
        return
      }
      toast.success(result.message || "Category deleted.")
      router.refresh()
    })
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  )
}

export default DeleteCategoryButton
