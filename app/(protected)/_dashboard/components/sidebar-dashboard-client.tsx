"use client"

import { RoleNavSection } from "@/app/(protected)/_dashboard/nav/role-nav"
import { Button } from "@/components/ui/button"
import { getIconComponent } from "@/lib/icon-mapper"
import { cn } from "@/lib/utils"
import { logoutUser } from "@/services/auth/logout.auth"
import { ChevronRight, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type SidebarDashboardClientProps = {
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

const SidebarDashboardClient = ({ sections }: SidebarDashboardClientProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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
    <aside className="sticky top-0 hidden h-screen w-[250px] flex-col border-r border-sidebar-border bg-sidebar px-3 py-4 text-sidebar-foreground lg:flex">
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {sections
          .flatMap((section) => section.items)
          .map((item) => {
            const active = isItemActive(pathname, item.match)
            const Icon = getIconComponent(item.icon ?? "Circle")
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-11 w-full justify-start rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
                    active &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
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

      <div className="pt-4">
        <Button
          variant="ghost"
          onClick={handleLogoutConfirm}
          disabled={isLoggingOut}
          className="h-11 w-full justify-start rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

export default SidebarDashboardClient
