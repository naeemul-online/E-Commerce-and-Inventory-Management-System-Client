"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import BrandCreateForm from "./BrandCreateForm"

type AddBrandButtonProps = {
  className?: string
}

const AddBrandButton = ({ className }: AddBrandButtonProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className={cn("text-background", className)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add brand
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Create brand</SheetTitle>
          <SheetDescription>
            Brands are required before a product can be created.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <BrandCreateForm
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

export default AddBrandButton
