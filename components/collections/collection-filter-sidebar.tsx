"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"
import { useState } from "react"

type CheckboxRowProps = {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (next: boolean) => void
}

function CheckboxRow({ id, label, checked, onCheckedChange }: CheckboxRowProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-foreground/90 hover:text-foreground"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className={cn(
          "size-4 shrink-0 cursor-pointer rounded-sm border border-border",
          "accent-primary"
        )}
      />
      <span>{label}</span>
    </label>
  )
}

type FilterCardProps = {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterCard({ title, children, defaultOpen = true }: FilterCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = `filter-card-${title.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {open ? (
          <ChevronUp className="size-4 text-muted-foreground" aria-hidden="true" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        )}
        <span className="sr-only">{open ? "Collapse" : "Expand"} {title}</span>
      </button>
      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

type CollectionFilterSidebarProps = {
  categories: string[]
  brands: string[]
  flags: string[]
  selectedCategories: string[]
  selectedBrands: string[]
  selectedFlags: string[]
  priceRange: [number, number]
  onCategoryChange: (categories: string[]) => void
  onBrandChange: (brands: string[]) => void
  onFlagChange: (flags: string[]) => void
  onPriceChange: (range: [number, number]) => void
  className?: string
}

export function CollectionFilterSidebar({
  categories,
  brands,
  flags,
  selectedCategories,
  selectedBrands,
  selectedFlags,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onFlagChange,
  onPriceChange,
  className,
}: CollectionFilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    )
  }

  const clearAllFilters = () => {
    onCategoryChange([])
    onBrandChange([])
    onFlagChange([])
    onPriceChange([0, 5000])
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedFlags.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000

  const filterContent = (
    <div className="flex flex-col gap-4">
      {/* Active Filters & Clear All */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Active filters:
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
          >
            <X className="mr-1 size-3" />
            Clear all
          </Button>
        </div>
      )}

      {/* Categories */}
      <FilterCard title="Categories">
        <div className="flex flex-col">
          {categories.map((cat) => (
            <CheckboxRow
              key={cat}
              id={`cat-${cat}`}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onCheckedChange={() =>
                toggle(cat, selectedCategories, onCategoryChange)
              }
            />
          ))}
        </div>
      </FilterCard>

      {/* Price Range */}
      <FilterCard title="Price Range">
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            min={0}
            max={5000}
            step={50}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>৳{priceRange[0]}</span>
            <span>৳{priceRange[1]}</span>
          </div>
        </div>
      </FilterCard>

      {/* Brands */}
      <FilterCard title="Brands">
        <div className="flex flex-col">
          {brands.map((brand) => (
            <CheckboxRow
              key={brand}
              id={`brand-${brand}`}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() =>
                toggle(brand, selectedBrands, onBrandChange)
              }
            />
          ))}
        </div>
      </FilterCard>

      {/* Product Flags */}
      <FilterCard title="Product Flag">
        <div className="flex flex-col">
          {flags.map((flag) => (
            <CheckboxRow
              key={flag}
              id={`flag-${flag}`}
              label={flag}
              checked={selectedFlags.includes(flag)}
              onCheckedChange={() => toggle(flag, selectedFlags, onFlagChange)}
            />
          ))}
        </div>
      </FilterCard>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="mb-4 gap-2"
        >
          <Filter className="size-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
              {selectedCategories.length +
                selectedBrands.length +
                selectedFlags.length}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-background p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            {filterContent}
            <Button
              className="mt-4 w-full"
              onClick={() => setMobileOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn("hidden w-64 shrink-0 flex-col gap-4 lg:flex", className)}
        aria-label="Product filters"
      >
        {filterContent}
      </aside>
    </>
  )
}
