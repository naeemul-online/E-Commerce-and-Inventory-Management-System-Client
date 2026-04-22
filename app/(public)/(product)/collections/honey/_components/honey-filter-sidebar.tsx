"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  HONEY_BRANDS,
  HONEY_CATEGORIES,
  HONEY_FLAGS,
} from "./data"

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

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="border-b border-border pb-5">
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">
        {title}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export function HoneyFilterSidebar({ className }: { className?: string }) {
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
      className={cn(
        "w-full shrink-0 rounded-lg border border-border bg-card p-5",
        className
      )}
      aria-label="Honey filters"
    >
      <div className="flex flex-col gap-5">
        <Section title="Filter By Category">
          {HONEY_CATEGORIES.map((cat) => (
            <CheckboxRow
              key={cat}
              id={`honey-cat-${cat}`}
              label={cat}
              checked={selectedCategories.includes(cat)}
              onCheckedChange={() =>
                toggle(cat, selectedCategories, setSelectedCategories)
              }
            />
          ))}
        </Section>

        <Section title="Price">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label
                htmlFor="honey-price-min"
                className="mb-1 block text-xs text-muted-foreground"
              >
                Min
              </Label>
              <Input
                id="honey-price-min"
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-9"
                min={0}
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="honey-price-max"
                className="mb-1 block text-xs text-muted-foreground"
              >
                Max
              </Label>
              <Input
                id="honey-price-max"
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-9"
                min={0}
              />
            </div>
            <Button type="button" className="h-9">
              Go
            </Button>
          </div>
        </Section>

        <Section title="Brands">
          {HONEY_BRANDS.map((brand) => (
            <CheckboxRow
              key={brand}
              id={`honey-brand-${brand}`}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() =>
                toggle(brand, selectedBrands, setSelectedBrands)
              }
            />
          ))}
        </Section>

        <div className="pb-1">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">
            Product Flag
          </h3>
          <div className="flex flex-col">
            {HONEY_FLAGS.map((flag) => (
              <CheckboxRow
                key={flag}
                id={`honey-flag-${flag}`}
                label={flag}
                checked={selectedFlags.includes(flag)}
                onCheckedChange={() =>
                  toggle(flag, selectedFlags, setSelectedFlags)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
