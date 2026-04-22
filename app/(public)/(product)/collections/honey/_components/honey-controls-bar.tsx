"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

type NativeSelectProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
}

function NativeSelect({
  id,
  label,
  value,
  onChange,
  options,
}: NativeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-9 appearance-none rounded-md border border-border bg-card pr-8 pl-3 text-sm text-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            "hover:border-ring"
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export function HoneyControlsBar({ totalCount }: { totalCount: number }) {
  const [sort, setSort] = useState("default")
  const [layout, setLayout] = useState("default")

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{totalCount}</span>{" "}
        products
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <NativeSelect
          id="honey-sort"
          label="Sort By:"
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
          id="honey-layout"
          label=""
          value={layout}
          onChange={setLayout}
          options={[
            { label: "Default", value: "default" },
            { label: "12 per page", value: "12" },
            { label: "24 per page", value: "24" },
            { label: "48 per page", value: "48" },
          ]}
        />
      </div>
    </div>
  )
}
