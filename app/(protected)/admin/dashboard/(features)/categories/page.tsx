import { FolderTree, ImageIcon } from "lucide-react"
import Image from "next/image"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCategories } from "@/services/category/get-categories"

import AddCategoryButton from "./_components/AddCategoryButton"
import DeleteCategoryButton from "./_components/DeleteCategoryButton"
import EditCategoryButton from "./_components/EditCategoryButton"

const formatDate = (value?: string) => {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const CategoriesPage = async () => {
  const { data: categories, success, message } = await getCategories()

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Product categories
          </h1>
          <p className="text-sm text-muted-foreground">
            Create categories first, then pick one when adding a product.
          </p>
        </div>
        <AddCategoryButton className="w-full sm:w-auto" />
      </header>

      {!success ? (
        <Card className="border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {message || "Failed to load categories."}
        </Card>
      ) : null}

      <Card className="overflow-hidden border bg-card p-0 shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FolderTree
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span>All categories</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {categories.length} total
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            No categories yet. Use{" "}
            <span className="font-medium text-foreground">Add category</span>{" "}
            to create your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="relative size-10 overflow-hidden rounded-md border bg-muted">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={`${category.name} thumbnail`}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <ImageIcon
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(category.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <EditCategoryButton
                          category={{
                            id: category.id,
                            name: category.name,
                            image: category.image ?? null,
                          }}
                        />
                        <DeleteCategoryButton
                          categoryId={category.id}
                          categoryName={category.name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </section>
  )
}

export default CategoriesPage
