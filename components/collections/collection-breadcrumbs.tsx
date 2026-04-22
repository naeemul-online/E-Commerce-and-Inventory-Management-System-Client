import { ChevronRight } from "lucide-react"
import Link from "next/link"

type CollectionBreadcrumbsProps = {
  title: string
  parentTitle?: string
  parentHref?: string
}

export function CollectionBreadcrumbs({ 
  title, 
  parentTitle, 
  parentHref 
}: CollectionBreadcrumbsProps) {
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
      
      {parentTitle && parentHref ? (
        <>
          <Link
            href={parentHref}
            className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            {parentTitle}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="font-medium text-foreground" aria-current="page">
            {title}
          </span>
        </>
      ) : (
        <span className="font-medium text-foreground" aria-current="page">
          {title}
        </span>
      )}
    </nav>
  )
}
