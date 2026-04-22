import type { CollectionConfig } from "@/types/collection"
import { CollectionBreadcrumbs } from "./collection-breadcrumbs"
import { CollectionControlsBar } from "./collection-controls-bar"
import { CollectionFilterSidebar } from "./collection-filter-sidebar"
import { CollectionPagination } from "./collection-pagination"
import { CollectionProductCard } from "./collection-product-card"

type CollectionPageProps = {
  config: CollectionConfig
}

export function CollectionPage({ config }: CollectionPageProps) {
  const { slug, title, categories, brands, flags, products } = config

  return (
    <main className="flex flex-col gap-4 bg-muted/40 py-6 md:gap-5">
      {/* Title + Breadcrumbs banner */}
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        <CollectionBreadcrumbs title={title} />
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr] lg:gap-5">
        {/* Sidebar (desktop only) */}
        <CollectionFilterSidebar
          slug={slug}
          categories={categories}
          brands={brands}
          flags={flags}
          className="hidden lg:flex"
        />

        {/* Main column */}
        <section className="flex flex-col gap-4 lg:gap-5">
          <CollectionControlsBar slug={slug} totalCount={products.length} />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <CollectionProductCard key={product.id} product={product} />
            ))}
          </div>

          <CollectionPagination totalPages={Math.ceil(products.length / 12) || 1} />
        </section>
      </div>
    </main>
  )
}
