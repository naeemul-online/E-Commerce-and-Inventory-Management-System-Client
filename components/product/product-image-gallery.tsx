"use client"

import Image from "next/image"
import { useState } from "react"
import type { ProductImage } from "@/types/product"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-2 md:flex-col md:gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border-2 transition-all md:h-20 md:w-20",
              selectedImage === index
                ? "border-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-muted/30 md:flex-1">
        <Image
          src={images[selectedImage]?.url || "/placeholder.png"}
          alt={images[selectedImage]?.alt || productName}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  )
}
