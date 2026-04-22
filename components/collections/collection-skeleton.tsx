"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function CollectionPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumbs Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Header Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-8 w-48 md:h-10" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
        </div>

        {/* Controls Bar Skeleton */}
        <div className="flex items-center justify-between border-b pb-4">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Filter Sidebar Skeleton */}
          <div className="w-full shrink-0 lg:w-64">
            <div className="space-y-6 rounded-lg border p-4">
              {/* Categories */}
              <div>
                <Skeleton className="mb-3 h-5 w-24" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Skeleton className="mb-3 h-5 w-24" />
                <Skeleton className="h-2 w-full" />
                <div className="mt-2 flex justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>

              {/* Brands */}
              <div>
                <Skeleton className="mb-3 h-5 w-16" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-3/4" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}
