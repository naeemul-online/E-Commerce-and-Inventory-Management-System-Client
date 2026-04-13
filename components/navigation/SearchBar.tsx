"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  className?: string
  variant?: "desktop" | "mobile"
  onClose?: () => void
}

export function SearchBar({
  className,
  variant = "desktop",
  onClose,
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Handle search submission
      console.log("Searching for:", query)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center",
        variant === "desktop" && "max-w-md flex-1",
        variant === "mobile" && "w-full",
        className
      )}
    >
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "h-10 w-full pr-4 pl-10",
            variant === "desktop" && "rounded-full border-muted-foreground/20",
            variant === "mobile" && "rounded-lg text-base"
          )}
        />
      </div>
      {variant === "mobile" && onClose && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-2 shrink-0"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close search</span>
        </Button>
      )}
    </form>
  )
}
