"use client"

import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { ShoppingBag } from "lucide-react"

interface FloatingCartWidgetProps {
  className?: string
}

export function FloatingCartWidget({ className }: FloatingCartWidgetProps) {
  const { totalItems, subtotal, setIsOpen } = useCart()

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={cn(
        "fixed top-1/2 right-0 z-40 -translate-y-1/2",
        "flex flex-col items-center",
        "overflow-hidden rounded-l-lg shadow-lg",
        "transition-all duration-200 hover:scale-105",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Responsive sizing
        "w-14 md:w-16",
        // Hide on mobile when near bottom bar area
        "mb-16 md:mb-0",
        className
      )}
      aria-label={`Open cart with ${totalItems} items`}
    >
      {/* Top orange section with icon and item count */}
      <div className="flex w-full flex-col items-center gap-0.5 bg-primary px-2 py-2 text-white md:gap-1 md:px-3 md:py-3">
        <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
        <span className="text-[10px] font-medium whitespace-nowrap md:text-xs">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Bottom white section with price */}
      <div className="w-full bg-white px-2 py-1.5 text-center md:px-3 md:py-2">
        <span className="text-xs font-semibold text-primary md:text-sm">
          ৳{subtotal.toFixed(2)}
        </span>
      </div>
    </button>
  )
}
