"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import type { CollectionProduct } from "@/types/collection"
import { Eye, ShoppingCart } from "lucide-react"
import Image from "next/image"

type CollectionProductCardProps = {
  product: CollectionProduct
  viewMode?: "grid" | "list"
  onAddToCart?: (product: CollectionProduct) => void
  onQuickView?: (product: CollectionProduct) => void
}

export function CollectionProductCard({
  product,
  viewMode = "grid",
  onQuickView,
}: CollectionProductCardProps) {
  const { addItem, setIsOpen } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: product.category,
    })
    setIsOpen(true)
  }

  if (viewMode === "list") {
    return (
      <article className="group flex gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-md bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="128px"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
          {product.flag && (
            <span className="absolute top-1 left-1 rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
              {product.flag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="line-clamp-2 text-base font-medium text-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.category} • {product.brand}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                -{product.discount}%
              </span>
            </div>

            <div className="flex gap-2">
              {onQuickView && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onQuickView(product)}
                  className="size-9"
                >
                  <Eye className="size-4" />
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="size-4" />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Grid view (default)
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {/* Image + Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Flag badge top-left */}
        {product.flag && (
          <span className="absolute top-2 left-2 rounded-sm bg-primary px-2 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground">
            {product.flag}
          </span>
        )}

        {/* Discount badge top-right */}
        {product.discount && (
          <span className="absolute top-2 right-2 rounded-sm bg-emerald-600 px-2 py-1 text-[11px] font-semibold tracking-wide text-white">
            Save {product.discount}%
          </span>
        )}

        {/* Quick view overlay */}
        {onQuickView && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onQuickView(product)}
              className="gap-2"
            >
              <Eye className="size-4" />
              Quick View
            </Button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm leading-snug font-medium text-foreground">
          {product.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">
            ৳{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ৳{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="size-4" />
          Add To Cart
        </Button>
      </div>
    </article>
  )
}
