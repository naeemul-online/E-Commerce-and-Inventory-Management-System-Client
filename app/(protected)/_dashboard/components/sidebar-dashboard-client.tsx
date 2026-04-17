"use client"

import { RoleNavSection } from "@/app/(protected)/_dashboard/nav/role-nav"
import { Button } from "@/components/ui/button"
import { getIconComponent } from "@/lib/icon-mapper"
import { cn } from "@/lib/utils"
import { ChevronRight, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SidebarDashboardClientProps = {
  sections: RoleNavSection[]
}

const isItemActive = (pathname: string, matchers: (string | RegExp)[]) => {
  return matchers.some((matcher) => {
    if (typeof matcher === "string") {
      return pathname === matcher
    }
    return matcher.test(pathname)
  })
}

const SidebarDashboardClient = ({ sections }: SidebarDashboardClientProps) => {
  const pathname = usePathname()

  return (
    <aside className="hidden w-[250px] bg-white p-4 lg:block">
      <nav className="space-y-1">
        {sections.flatMap((section) => section.items).map((item) => {
          const active = isItemActive(pathname, item.match)
          const Icon = getIconComponent(item.icon ?? "Circle")
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "mb-1 h-11 w-full justify-start rounded-lg px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                  active && "bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white"
                )}
              >
                <Icon className="mr-2 size-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {active ? <ChevronRight className="size-4" /> : null}
              </Button>
            </Link>
          )
        })}
      </nav>

      <Button
        variant="ghost"
        className="mt-8 h-11 w-full justify-start rounded-lg bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 hover:text-white"
      >
        <LogOut className="mr-2 size-4" />
        Logout
      </Button>
    </aside>
  )
}

export default SidebarDashboardClient
