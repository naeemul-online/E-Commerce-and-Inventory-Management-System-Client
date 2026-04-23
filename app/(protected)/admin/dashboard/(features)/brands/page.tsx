import { Tag } from "lucide-react"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getBrands } from "@/services/brand/get-brands"

import AddBrandButton from "./_components/AddBrandButton"
import DeleteBrandButton from "./_components/DeleteBrandButton"
import EditBrandButton from "./_components/EditBrandButton"

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

const BrandsPage = async () => {
  const { data: brands, success, message } = await getBrands()

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Product brands
          </h1>
          <p className="text-sm text-muted-foreground">
            Create brands first, then pick one when adding a product.
          </p>
        </div>
        <AddBrandButton className="w-full sm:w-auto" />
      </header>

      {!success ? (
        <Card className="border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {message || "Failed to load brands."}
        </Card>
      ) : null}

      <Card className="overflow-hidden border bg-card p-0 shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>All brands</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {brands.length} total
          </span>
        </div>

        {brands.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            No brands yet. Use{" "}
            <span className="font-medium text-foreground">Add brand</span> to
            create your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {brand.slug}
                      </code>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(brand.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <EditBrandButton
                          brand={{ id: brand.id, name: brand.name }}
                        />
                        <DeleteBrandButton
                          brandId={brand.id}
                          brandName={brand.name}
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

export default BrandsPage
