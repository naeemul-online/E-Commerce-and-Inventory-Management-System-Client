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
    <main className="flex flex-col gap-4 bg-muted/40 py-6 md:gap-5">
      {/* Title + Breadcrumbs banner */}
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Honey
        </h1>
        <HoneyBreadcrumbs />
      </header>

      {/* Content grid — the first filter card in the sidebar aligns with the
          controls bar in the main column thanks to implicit grid row placement. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr] lg:gap-5">
        {/* Sidebar (desktop only) */}
        <HoneyFilterSidebar className="hidden lg:flex" />

        {/* Main column */}
        <section className="flex flex-col gap-4 lg:gap-5">
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
