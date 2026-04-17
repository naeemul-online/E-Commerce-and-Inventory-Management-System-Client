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
import { logoutUser } from "@/services/auth/logout.auth"
import { ChevronRight, LogOut, PanelLeftOpen } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type MobileDashboardNavProps = {
  sections: RoleNavSection[]
}

const isItemActive = (pathname: string, matchers: string[]) => {
  return matchers.some((matcher) => {
    if (matcher.startsWith("re:")) {
      const pattern = matcher.slice(3)
      return new RegExp(pattern).test(pathname)
    }
    return pathname === matcher
  })
}

const MobileDashboardNav = ({ sections }: MobileDashboardNavProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleLogoutConfirm = () => {
    if (isLoggingOut) return

    toast("Confirm logout", {
      description: "Are you sure you want to logout from your account?",
      duration: 10000,
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      action: {
        label: "Logout",
        onClick: async () => {
          setIsLoggingOut(true)
          setOpen(false)
          const loadingToast = toast.loading("Logging out...")

          try {
            const result = await logoutUser()
            if (!result?.success) {
              toast.error(result?.message || "Failed to logout.", {
                id: loadingToast,
              })
              return
            }

            toast.success(result.message || "Logged out successfully.", {
              id: loadingToast,
            })
            router.replace("/?loggedOut=true")
            router.refresh()
          } catch {
            toast.error("Failed to logout. Please try again.", {
              id: loadingToast,
            })
          } finally {
            setIsLoggingOut(false)
          }
        },
      },
    })
  }

  return (
    <div className="fixed top-1/2 right-0 z-45 -translate-y-[calc(50%+90px)] lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon-lg"
            className="rounded-l-xl rounded-r-none bg-zinc-900 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-zinc-800"
            aria-label="Open dashboard navigation"
          >
            <PanelLeftOpen className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[88%] overflow-y-auto border-r bg-zinc-50 p-0 sm:max-w-sm"
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
                        "mb-1 h-11 w-full justify-start rounded-lg px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-primary hover:text-background",
                        active &&
                          "bg-primary text-background hover:bg-primary hover:text-background"
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
            <Button
              variant="ghost"
              onClick={handleLogoutConfirm}
              disabled={isLoggingOut}
              className="mt-4 h-11 w-full justify-start rounded-lg bg-primary px-3 text-sm font-medium text-background hover:bg-primary/90 hover:text-background"
            >
              <LogOut className="mr-2 size-4" />
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileDashboardNav
