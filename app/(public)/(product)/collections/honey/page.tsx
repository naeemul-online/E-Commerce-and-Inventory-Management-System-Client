import { honeyProducts } from "./_components/data"
import { HoneyBreadcrumbs } from "./_components/honey-breadcrumbs"
import { HoneyChatWidget } from "./_components/honey-chat-widget"
import { HoneyControlsBar } from "./_components/honey-controls-bar"
import { HoneyFilterSidebar } from "./_components/honey-filter-sidebar"
import { HoneyPagination } from "./_components/honey-pagination"
import { HoneyProductCard } from "./_components/honey-product-card"

export const metadata = {
  title: "Honey — Pure, Organic & Raw Honey Collection",
  description:
    "Shop our full range of pure honey: Sundarban, Black Seed, Lichu Flower, Sidr, Honeycomb, Organic, and Crystal honey from trusted brands.",
}

export default function HoneyCollectionPage() {
  return (
    <main className="flex flex-col gap-6 py-6">
      {/* Breadcrumbs */}
      <HoneyBreadcrumbs />

      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Honey
        </h1>
        <p className="text-sm text-muted-foreground">
          Pure, raw, and organic honey sourced from trusted apiaries.
        </p>
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar (desktop only) */}
        <HoneyFilterSidebar className="hidden lg:block" />

        {/* Main column */}
        <section className="flex flex-col gap-4">
          <HoneyControlsBar totalCount={honeyProducts.length} />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {honeyProducts.map((product) => (
              <HoneyProductCard key={product.id} product={product} />
            ))}
          </div>

          <HoneyPagination totalPages={2} />
        </section>
      </div>

      {/* Mobile-only chat widget. FloatingCartWidget is already rendered globally by the Navbar. */}
      <HoneyChatWidget />
    </main>
  )
}
