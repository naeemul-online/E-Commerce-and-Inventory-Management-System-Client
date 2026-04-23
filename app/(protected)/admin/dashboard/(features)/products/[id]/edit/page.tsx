import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getBrands } from "@/services/brand/get-brands"
import { getCategories } from "@/services/category/get-categories"
import { getProductById } from "@/services/product/get-product-by-id"

import ProductForm from "../../_components/ProductForm"

type AdminProductEditPageProps = {
  params: Promise<{ id: string }>
}

const AdminProductEditPage = async ({ params }: AdminProductEditPageProps) => {
  const { id } = await params

  const [productResult, categoriesResult, brandsResult] = await Promise.all([
    getProductById(id),
    getCategories(),
    getBrands(),
  ])

  if (!productResult.success || !productResult.data) {
    notFound()
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold">Edit product</h1>
          <p className="text-sm text-muted-foreground">
            Update product information and save your changes.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/dashboard/products">Back to products</Link>
        </Button>
      </header>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <ProductForm
          mode="edit"
          categories={categoriesResult.data}
          brands={brandsResult.data}
          initialProduct={productResult.data}
        />
      </div>
    </section>
  )
}

export default AdminProductEditPage
