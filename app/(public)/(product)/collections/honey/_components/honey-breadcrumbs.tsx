import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function HoneyBreadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Link
        href="/"
        className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
      >
        Home
      </Link>
      <ChevronRight className="size-3.5" aria-hidden="true" />
      <span className="font-medium text-foreground" aria-current="page">
        Honey
      </span>
    </nav>
  )
}
