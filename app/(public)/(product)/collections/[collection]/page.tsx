"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

import {
  CollectionBreadcrumbs,
  CollectionControlsBar,
  CollectionFilterSidebar,
  CollectionPagination,
  CollectionProductCard,
} from "@/components/collections"
import { getCollectionConfig } from "@/lib/collections-data"
import type { CollectionProduct } from "@/types/collection"

const ITEMS_PER_PAGE = 12

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()

  const collectionSlug = params.collection as string
  const config = getCollectionConfig(collectionSlug)

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFlags, setSelectedFlags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Pagination
  const currentPage = Number(searchParams.get("page")) || 1

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!config) return []

    let products = config.products.filter((product) => {
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }

      // Flag filter
      if (
        selectedFlags.length > 0 &&
        (!product.flag || !selectedFlags.includes(product.flag))
      ) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      return true
    })

    // Sorting
    switch (sortBy) {
      case "price-low":
        products = [...products].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products = [...products].sort((a, b) => b.price - a.price)
        break
      case "newest":
        products = [...products].sort((a, b) =>
          a.flag === "New Arrival" ? -1 : b.flag === "New Arrival" ? 1 : 0
        )
        break
      case "discount":
        products = [...products].sort(
          (a, b) => (b.discount || 0) - (a.discount || 0)
        )
        break
      default:
        break
    }

    return products
  }, [config, selectedCategories, selectedBrands, selectedFlags, priceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", page.toString())
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const handleAddToCart = (product: CollectionProduct) => {
    console.log("Add to cart:", product)
  }

  const handleQuickView = (product: CollectionProduct) => {
    console.log("Quick view:", product)
  }

  if (!config) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Collection not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumbs */}
        <CollectionBreadcrumbs collectionTitle={config.title} />

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {config.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{config.description}</p>
        </div>

        {/* Controls Bar */}
        <CollectionControlsBar
          totalProducts={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Main Content */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Filter Sidebar */}
          <CollectionFilterSidebar
            categories={config.categories}
            brands={config.brands}
            flags={config.flags}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedFlags={selectedFlags}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategories}
            onBrandChange={setSelectedBrands}
            onFlagChange={setSelectedFlags}
            onPriceChange={setPriceRange}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                    : "flex flex-col gap-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <CollectionProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <CollectionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
