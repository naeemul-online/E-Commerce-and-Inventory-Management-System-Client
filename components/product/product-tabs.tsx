"use client"

import { useState } from "react"
import type { ProductDetails } from "@/types/product"
import { cn } from "@/lib/utils"
import { ProductDescription } from "./product-description"
import { ProductReviews } from "./product-reviews"

interface ProductTabsProps {
  product: ProductDetails
}

type TabId = "description" | "reviews"

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description")

  const tabs = [
    { id: "description" as TabId, label: "Description" },
    { id: "reviews" as TabId, label: `Customer Reviews (${product.totalReviews})` },
  ]

  return (
    <section className="mt-8 border-t border-border">
      {/* Tab Headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors md:px-6 md:text-base",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === "description" && (
          <ProductDescription product={product} />
        )}
        {activeTab === "reviews" && <ProductReviews product={product} />}
      </div>
    </section>
  )
}
