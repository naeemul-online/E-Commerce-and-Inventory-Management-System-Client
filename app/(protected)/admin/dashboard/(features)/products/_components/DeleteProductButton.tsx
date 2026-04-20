"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { deleteProduct } from "@/services/product/delete-product"

type DeleteProductButtonProps = {
  productId: string
}

const DeleteProductButton = ({ productId }: DeleteProductButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!isConfirmed) return

    startTransition(async () => {
      const result = await deleteProduct(productId)

      if (!result.success) {
        toast.error(result.message || "Delete failed.")
        return
      }

      toast.success(result.message || "Product deleted.")
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

export default DeleteProductButton
