"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
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
          "flex w-full items-start justify-between gap-3 px-5 pt-5 pb-3 text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <div className="flex flex-col items-start gap-1.5">
          <h3 className="text-sm font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <span
            aria-hidden="true"
            className="h-[3px] w-10 rounded-full bg-primary"
          />
        </div>
        {open ? (
          <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        ) : (
          <Plus className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
        <span className="sr-only">{open ? "Collapse" : "Expand"} {title}</span>
      </button>
      {open ? (
        <div id={contentId} className="px-5 pt-1 pb-5">
          {children}
        </div>
      ) : null}
    </div>
  )
}

type CollectionFilterSidebarProps = {
  slug: string
  categories: readonly string[]
  brands: readonly string[]
  flags: readonly string[]
  className?: string
}

export function CollectionFilterSidebar({
  slug,
  categories,
  brands,
  flags,
  className,
}: CollectionFilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFlags, setSelectedFlags] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    )
  }

  return (
    <aside
      className={cn("w-full shrink-0 flex-col gap-4", className)}
      aria-label={`${slug} filters`}
    >
      <FilterCard title="Filter By Category">
        <div className="flex flex-col">
          {categories.map((cat) => (
            <CheckboxRow
              key={cat}
              id={`${slug}-cat-${cat}`}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onCheckedChange={() =>
                toggle(cat, selectedCategories, setSelectedCategories)
              }
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard title="Price">
        <div className="flex items-center gap-2">
          <Input
            id={`${slug}-price-min`}
            type="number"
            inputMode="numeric"
            placeholder="min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-9 flex-1"
            min={0}
            aria-label="Minimum price"
          />
          <span aria-hidden="true" className="text-muted-foreground">
            -
          </span>
          <Input
            id={`${slug}-price-max`}
            type="number"
            inputMode="numeric"
            placeholder="max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-9 flex-1"
            min={0}
            aria-label="Maximum price"
          />
          <Button type="button" className="h-9 px-4">
            Go
          </Button>
        </div>
      </FilterCard>

      <FilterCard title="Brands">
        <div className="flex flex-col">
          {brands.map((brand) => (
            <CheckboxRow
              key={brand}
              id={`${slug}-brand-${brand}`}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() =>
                toggle(brand, selectedBrands, setSelectedBrands)
              }
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard title="Product Flag">
        <div className="flex flex-col">
          {flags.map((flag) => (
            <CheckboxRow
              key={flag}
              id={`${slug}-flag-${flag}`}
              label={flag}
              checked={selectedFlags.includes(flag)}
              onCheckedChange={() =>
                toggle(flag, selectedFlags, setSelectedFlags)
              }
            />
          ))}
        </div>
      </FilterCard>
    </aside>
  )
}
