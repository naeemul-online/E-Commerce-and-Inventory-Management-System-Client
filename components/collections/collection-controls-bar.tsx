"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, Grid3X3, List } from "lucide-react"

type NativeSelectProps = {
  id: string
  label?: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  accent?: boolean
}

function NativeSelect({
  id,
  label,
  value,
  onChange,
  options,
  accent = false,
}: NativeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      {label ? (
        <label
          htmlFor={id}
          className="hidden text-sm text-muted-foreground md:block"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-9 appearance-none rounded-md border pr-8 pl-3 text-sm",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            accent
              ? "border-primary/50 bg-transparent font-medium text-primary hover:border-primary"
              : "border-border bg-card text-foreground hover:border-ring"
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2",
            accent ? "text-primary" : "text-muted-foreground"
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

type CollectionControlsBarProps = {
  totalProducts: number
  sortBy: string
  onSortChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function CollectionControlsBar({
  totalProducts,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: CollectionControlsBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
      {/* Product count */}
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{totalProducts}</span>{" "}
        products found
      </p>

      <div className="flex items-center gap-3">
        {/* Sort select */}
        <NativeSelect
          id="sort-by"
          label="Sort By :"
          value={sortBy}
          onChange={onSortChange}
          options={[
            { label: "Featured", value: "featured" },
            { label: "Price: Low to High", value: "price-low" },
            { label: "Price: High to Low", value: "price-high" },
            { label: "Newest", value: "newest" },
            { label: "Best Discount", value: "discount" },
          ]}
        />

        {/* View mode toggle */}
        <div className="hidden items-center gap-1 rounded-md border border-border p-1 md:flex">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "rounded p-1.5 transition-colors",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <Grid3X3 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "rounded p-1.5 transition-colors",
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
