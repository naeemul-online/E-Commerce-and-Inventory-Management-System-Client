"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import type { CollectionProduct } from "@/types/collection"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CollectionProductCard({ product }: { product: CollectionProduct }) {
  const { addItem, setIsOpen } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: product.category,
    })
    setIsOpen(true)
  }

  return (
    <Link href={`/product/${product.slug}`}>
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
          <span
            className={cn(
              "absolute top-2 left-2 rounded-sm px-2 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground",
              "bg-primary"
            )}
          >
            {product.flag}
          </span>

          {/* Discount badge top-right */}
          <span
            className={cn(
              "absolute top-2 right-2 rounded-sm px-2 py-1 text-[11px] font-semibold tracking-wide text-white",
              "bg-emerald-600"
            )}
          >
            Save {product.discount}%
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-3">
          <h3 className="line-clamp-2 min-h-11 text-sm leading-snug font-medium text-foreground">
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
    </Link>
  )
}
