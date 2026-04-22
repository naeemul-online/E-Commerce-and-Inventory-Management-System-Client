"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function CollectionPagination({ totalPages = 2 }: { totalPages?: number }) {
  const [page, setPage] = useState(1)

  const goTo = (next: number) => {
    if (next < 1 || next > totalPages) return
    setPage(next)
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const baseBtn =
    "inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-sm transition-colors"

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 py-4"
    >
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          baseBtn,
          "text-foreground hover:border-ring hover:bg-muted",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            baseBtn,
            p === page
              ? "border-primary bg-primary text-primary-foreground"
              : "text-foreground hover:border-ring hover:bg-muted"
          )}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          baseBtn,
          "text-foreground hover:border-ring hover:bg-muted",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
