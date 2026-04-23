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

import CategoryCreateForm from "./CategoryCreateForm"

type AddCategoryButtonProps = {
  className?: string
}

const AddCategoryButton = ({ className }: AddCategoryButtonProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className={cn("text-background", className)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add category
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Create category</SheetTitle>
          <SheetDescription>
            Categories are required before a product can be created.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <CategoryCreateForm
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

export default AddCategoryButton
