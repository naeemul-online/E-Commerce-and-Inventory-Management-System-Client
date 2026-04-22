import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="py-4 md:py-6">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Product CTA Skeleton */}
      <div className="mt-4 grid gap-6 md:mt-6 lg:grid-cols-2 lg:gap-10">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-2 md:flex-col md:gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 md:h-20 md:w-20" />
            ))}
          </div>
          <Skeleton className="aspect-square w-full md:flex-1" />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
          </div>
          <div className="flex items-center gap-2 border-t border-border pt-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-8 border-t border-border">
        <div className="flex border-b border-border">
          <Skeleton className="my-3 h-5 w-24" />
          <Skeleton className="my-3 ml-4 h-5 w-36" />
        </div>
        <div className="space-y-4 py-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}
