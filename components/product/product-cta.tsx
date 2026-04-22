"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Phone } from "lucide-react"
import type { ProductDetails } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ProductImageGallery } from "./product-image-gallery"

interface ProductCTAProps {
  product: ProductDetails
}

export function ProductCTA({ product }: ProductCTAProps) {
  const [quantity, setQuantity] = useState(1)

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrement = () => {
    if (quantity < product.stockQuantity) setQuantity(quantity + 1)
  }

  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2 lg:gap-10">
      {/* Image Gallery */}
      <ProductImageGallery images={product.images} productName={product.name} />

      {/* Product Info */}
      <div className="flex flex-col gap-4">
        {/* Product Name */}
        <h1 className="text-xl font-semibold text-foreground md:text-2xl">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-primary md:text-2xl">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-base text-muted-foreground line-through md:text-lg">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-white">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Quantity:</span>
          <div className="flex items-center rounded-sm border border-border">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex h-9 w-10 items-center justify-center border-x border-border text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stockQuantity}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            className="gap-2 bg-primary text-white hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4" />
            ADD TO CART
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            BUY NOW
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            className="gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order On WhatsApp
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2 bg-foreground text-background hover:bg-foreground/90"
          >
            <Phone className="h-4 w-4" />
            Call For Order
          </Button>
        </div>

        {/* Brand */}
        <div className="flex items-center gap-2 border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">Brand:</span>
          {product.brandLogo ? (
            <Image
              src={product.brandLogo}
              alt={product.brand}
              width={80}
              height={24}
              className="h-6 w-auto object-contain"
            />
          ) : (
            <span className="text-sm font-medium">{product.brand}</span>
          )}
        </div>
      </div>
    </section>
  )
}
