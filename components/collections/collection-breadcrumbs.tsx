"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

type CollectionBreadcrumbsProps = {
  collectionTitle: string
  collectionHref?: string
  subcategoryTitle?: string
}

export function CollectionBreadcrumbs({
  collectionTitle,
  collectionHref,
  subcategoryTitle,
}: CollectionBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      <Link
        href="/"
        className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
      >
        Home
      </Link>
      <ChevronRight className="size-3.5" aria-hidden="true" />
      
      {subcategoryTitle && collectionHref ? (
        <>
          <Link
            href={collectionHref}
            className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            {collectionTitle}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="font-medium text-foreground" aria-current="page">
            {subcategoryTitle}
          </span>
        </>
      ) : (
        <span className="font-medium text-foreground" aria-current="page">
          {collectionTitle}
        </span>
      )}
    </nav>
  )
}
