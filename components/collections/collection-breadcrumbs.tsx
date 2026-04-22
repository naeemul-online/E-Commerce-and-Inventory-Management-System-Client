import { ChevronRight } from "lucide-react"
import Link from "next/link"

type CollectionBreadcrumbsProps = {
  title?: string
  parentTitle?: string
  parentHref?: string
  // For product details pages
  collectionSlug?: string
  collectionTitle?: string
  subcategorySlug?: string
  subcategoryTitle?: string
  productName?: string
}

export function CollectionBreadcrumbs({
  title,
  parentTitle,
  parentHref,
  collectionSlug,
  collectionTitle,
  subcategorySlug,
  subcategoryTitle,
  productName,
}: CollectionBreadcrumbsProps) {
  // Product details breadcrumb
  if (collectionSlug && productName) {
    return (
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
        >
          Home
        </Link>
        <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
        <Link
          href={`/collections/${collectionSlug}`}
          className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
        >
          {collectionTitle || collectionSlug}
        </Link>
        {subcategorySlug && subcategoryTitle && (
          <>
            <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
            <Link
              href={`/collections/${collectionSlug}/${subcategorySlug}`}
              className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {subcategoryTitle}
            </Link>
          </>
        )}
        <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
        <span
          className="line-clamp-1 font-medium text-foreground"
          aria-current="page"
        >
          {productName}
        </span>
      </nav>
    )
  }

  // Collection/subcategory breadcrumb
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
