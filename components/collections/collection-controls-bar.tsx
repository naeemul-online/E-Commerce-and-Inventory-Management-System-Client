"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

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
  slug: string
  totalCount: number
}

export function CollectionControlsBar({
  slug,
  totalCount: _totalCount,
}: CollectionControlsBarProps) {
  const [sort, setSort] = useState("default")
  const [layout, setLayout] = useState("default")

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <NativeSelect
        id={`${slug}-sort`}
        label="Sort By :"
        value={sort}
        onChange={setSort}
        options={[
          { label: "Default Sorting", value: "default" },
          { label: "Price: Low to High", value: "price-asc" },
          { label: "Price: High to Low", value: "price-desc" },
          { label: "Name: A to Z", value: "name-asc" },
          { label: "Newest", value: "newest" },
        ]}
      />
      <NativeSelect
        id={`${slug}-layout`}
        value={layout}
        onChange={setLayout}
        accent
        options={[
          { label: "Default", value: "default" },
          { label: "12 per page", value: "12" },
          { label: "24 per page", value: "24" },
          { label: "48 per page", value: "48" },
        ]}
      />
    </div>
  )
}
