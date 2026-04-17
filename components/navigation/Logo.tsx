"use client"

import { Store } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center justify-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-background">
        <Store className="h-5 w-5" />
      </div>
      <span className="text-sm font-bold tracking-tight text-primary sm:block">
        Nafiya <br />
        Mart
      </span>
    </Link>
  )
}
