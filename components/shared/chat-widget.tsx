"use client"

import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"

type ChatWidgetProps = {
  className?: string
}

export function ChatWidget({ className }: ChatWidgetProps) {
  return (
    <button
      type="button"
      aria-label="Chat with us"
      className={cn(
        "fixed right-4 bottom-20 z-40 flex items-center gap-2 rounded-full",
        "bg-primary py-2 pr-4 pl-2 text-primary-foreground shadow-lg",
        "transition-transform duration-200 hover:scale-105",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "md:bottom-6",
        className
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15">
        <MessageCircle className="size-4" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold">Chat with us</span>
    </button>
  )
}
