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
import type { Brand } from "@/types/brand"

import BrandCreateForm from "./BrandCreateForm"

type EditBrandButtonProps = {
  brand: Pick<Brand, "id" | "name">
}

const EditBrandButton = ({ brand }: EditBrandButtonProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Edit brand</SheetTitle>
          <SheetDescription>
            Update the brand name. The slug will be regenerated on the server
            if supported.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <BrandCreateForm
            mode="edit"
            brandId={brand.id}
            initial={{ name: brand.name }}
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

export default EditBrandButton
