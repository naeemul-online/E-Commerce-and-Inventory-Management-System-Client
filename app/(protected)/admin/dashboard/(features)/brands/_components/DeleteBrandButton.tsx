"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { deleteBrand } from "@/services/brand/delete-brand"

type DeleteBrandButtonProps = {
  brandId: string
  brandName?: string
}

const DeleteBrandButton = ({
  brandId,
  brandName,
}: DeleteBrandButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const label = brandName ? `"${brandName}"` : "this brand"
    const isConfirmed = window.confirm(
      `Delete ${label}? Products using it may become invalid until reassigned.`
    )
    if (!isConfirmed) return

    startTransition(async () => {
      const result = await deleteBrand(brandId)
      if (!result.success) {
        toast.error(result.message || "Delete failed.")
        return
      }
      toast.success(result.message || "Brand deleted.")
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

export default DeleteBrandButton
