"use client"

import { desktopNavActions } from "@/constants/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavActionsProps {
  className?: string
}

export function NavActions({ className }: NavActionsProps) {
  return (
    <nav className={cn("hidden items-center gap-1 lg:flex", className)}>
      {desktopNavActions.map((action) => {
        const Icon = action.icon
        return (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{action.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
