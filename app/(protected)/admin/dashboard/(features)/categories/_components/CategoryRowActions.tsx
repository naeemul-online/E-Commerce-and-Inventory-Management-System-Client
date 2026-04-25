"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { deleteCategory } from "@/services/category/delete-category"
import type { Category } from "@/types/category"

import EditCategoryButton from "./EditCategoryButton"

type CategoryRowActionsProps = {
  category: Pick<Category, "id" | "name" | "image">
}

const CategoryRowActions = ({ category }: CategoryRowActionsProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const performDelete = () => {
    startTransition(async () => {
      const result = await deleteCategory(category.id)

      if (!result.success) {
        toast.error(result.message || "Failed to delete category.")
        return
      }

      toast.success(result.message || `"${category.name}" deleted.`)
      router.refresh()
    })
  }

  const requestDelete = () => {
    if (isPending) return

    toast(`Delete "${category.name}"?`, {
      description:
        "This permanently removes the category. Products using it may need to be reassigned.",
      duration: 10_000,
      action: {
        label: "Delete",
        onClick: performDelete,
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    })
  }

  return (
    <div
      className="flex items-center justify-end gap-2"
      aria-busy={isPending}
    >
      <EditCategoryButton category={category} disabled={isPending} />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        disabled={isPending}
        aria-disabled={isPending}
        onClick={requestDelete}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  )
}

export default CategoryRowActions
