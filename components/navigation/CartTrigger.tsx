"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"

interface CartTriggerProps {
  variant?: "desktop" | "mobile"
  className?: string
}

export function CartTrigger({
  variant = "desktop",
  className,
}: CartTriggerProps) {
  const { setIsOpen, totalItems } = useCart()

  if (variant === "mobile") {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative flex flex-col items-center justify-center gap-0.5",
          className
        )}
        aria-label={`Open cart with ${totalItems} items`}
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#1a2744] px-1 text-[10px] font-bold text-white">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium tracking-wide text-white uppercase">
          Cart
        </span>
      </button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      className={cn("relative", className)}
      aria-label={`Open cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF8033] px-1 text-[10px] font-bold text-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Button>
  )
}
