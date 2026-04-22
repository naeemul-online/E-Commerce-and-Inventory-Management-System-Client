import { notFound } from "next/navigation"
import { CollectionBreadcrumbs } from "@/components/collections/collection-breadcrumbs"
import { CollectionControlsBar } from "@/components/collections/collection-controls-bar"
import { CollectionFilterSidebar } from "@/components/collections/collection-filter-sidebar"
import { CollectionPagination } from "@/components/collections/collection-pagination"
import { CollectionProductCard } from "@/components/collections/collection-product-card"
import { getCollectionConfig, getSubcategoryLabel } from "@/lib/collections-data"

type Props = {
  params: Promise<{ collection: string; subcategory: string }>
}

export async function generateMetadata({ params }: Props) {
  const { collection, subcategory } = await params
  const config = getCollectionConfig(collection)
  const subcategoryLabel = getSubcategoryLabel(collection, subcategory)

  if (!config || !subcategoryLabel) {
    return {
      title: "Not Found",
    }
  }

  return {
    title: `${subcategoryLabel} ${config.title} — Premium Quality Products`,
    description: `Browse our collection of premium ${subcategoryLabel.toLowerCase()} in ${config.title.toLowerCase()}.`,
  }
}

export default async function SubcategoryPage({ params }: Props) {
  const { collection, subcategory } = await params
  const config = getCollectionConfig(collection)
  const subcategoryLabel = getSubcategoryLabel(collection, subcategory)

  if (!config || !subcategoryLabel) {
    notFound()
  }

  // Filter products by subcategory
  const filteredProducts = config.products.filter(
    (product) => product.category === subcategoryLabel
  )

  const pageTitle = `${subcategoryLabel} ${config.title}`

  return (
    <main className="flex flex-col gap-4 bg-muted/40 py-6 md:gap-5">
      {/* Title + Breadcrumbs banner */}
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {pageTitle}
        </h1>
        <CollectionBreadcrumbs
          title={subcategoryLabel}
          parentTitle={config.title}
          parentHref={`/collections/${collection}`}
        />
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr] lg:gap-5">
        {/* Sidebar (desktop only) */}
        <CollectionFilterSidebar
          slug={`${collection}-${subcategory}`}
          categories={config.categories}
          brands={config.brands}
          flags={config.flags}
          className="hidden lg:flex"
        />

        {/* Main column */}
        <section className="flex flex-col gap-4 lg:gap-5">
          <CollectionControlsBar
            slug={`${collection}-${subcategory}`}
            totalCount={filteredProducts.length}
          />

          {filteredProducts.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <CollectionProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <CollectionPagination
            totalPages={Math.ceil(filteredProducts.length / 12) || 1}
          />
        </section>
      </div>
    </main>
  )
}
