"use client"

import { RoleNavSection } from "@/app/(protected)/_dashboard/nav/role-nav"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getIconComponent } from "@/lib/icon-mapper"
import { cn } from "@/lib/utils"
import { ChevronRight, PanelRightOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type MobileDashboardNavProps = {
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

const MobileDashboardNav = ({ sections }: MobileDashboardNavProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="fixed top-1/2 right-0 z-45 -translate-y-[calc(50%+90px)] lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon-lg"
            className="rounded-l-xl rounded-r-none bg-zinc-900 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-zinc-800"
            aria-label="Open dashboard navigation"
          >
            <PanelRightOpen className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[88%] overflow-y-auto border-l bg-zinc-50 p-0 sm:max-w-sm"
        >
          <SheetHeader className="border-b bg-white px-5 py-4">
            <SheetTitle>Dashboard Menu</SheetTitle>
          </SheetHeader>
          <nav className="space-y-1 p-3">
            {sections.flatMap((section) => section.items).map((item) => {
              const active = isItemActive(pathname, item.match)
              const Icon = getIconComponent(item.icon ?? "Circle")
              return (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "mb-1 h-11 w-full justify-start rounded-lg px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900",
                        active &&
                          "bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white"
                      )}
                    >
                      <Icon className="mr-2 size-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {active ? <ChevronRight className="size-4" /> : null}
                    </Button>
                  </Link>
                </SheetClose>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileDashboardNav
