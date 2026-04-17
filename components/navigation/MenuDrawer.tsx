"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  menuBarCategories,
  secondaryMenuLinks,
  type MenuBarCategory,
} from "@/constants/navigation"
import { cn } from "@/lib/utils"
import { getAuthUserInfo } from "@/services/auth/get-user-info.auth"
import { logoutUser } from "@/services/auth/logout.auth"
import {
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  LogInIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function CategoryAccordion({
  category,
  onClose,
}: {
  category: MenuBarCategory
  onClose: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0

  if (!hasSubcategories) {
    return (
      <Link
        href={category.href}
        onClick={onClose}
        className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
      >
        <span className="font-medium text-foreground">{category.label}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
        aria-expanded={isExpanded}
      >
        <span className="font-medium text-foreground">{category.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 pr-2 pb-2 pl-4">
          <Link
            href={category.href}
            onClick={onClose}
            className="flex items-center justify-between rounded-md p-2.5 transition-colors hover:bg-muted"
          >
            <span className="text-sm font-medium text-primary">
              All {category.label}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
          {category.subcategories!.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-md p-2.5 transition-colors hover:bg-muted"
            >
              <span className="text-sm text-muted-foreground">{sub.label}</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      setIsLoadingUser(true)
      const user = await getAuthUserInfo()
      setUserName(user?.fullName || null)
      setIsLoadingUser(false)
    }

    if (isOpen) {
      loadUser()
    }
  }, [isOpen])

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
            setUserName(null)
            onClose()
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="flex w-full flex-col p-0 sm:max-w-sm"
      >
        <SheetHeader className="p-4 pb-0">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="rounded-xl bg-[#f6891f] p-3 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d9d9d9] text-zinc-500">
                <CircleUserRound className="h-7 w-7" />
              </div>

              <div className="min-w-0 flex-1 text-left">
                {isLoadingUser ? (
                  <p className="mt-1 text-sm leading-tight font-medium text-white/90">
                    Checking...
                  </p>
                ) : userName ? (
                  <div className="mt-1">
                    <p className="truncate text-sm leading-tight font-medium text-white">
                      {userName}
                    </p>
                    <button
                      type="button"
                      onClick={handleLogoutConfirm}
                      disabled={isLoggingOut}
                      className="mt-1 text-[11px] leading-none font-medium text-white/85 underline-offset-2 hover:underline disabled:opacity-60"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-base leading-tight font-semibold">
                      Hello there!
                    </p>
                    <Link
                      href="/login"
                      onClick={onClose}
                      className="mt-1 inline-flex items-center gap-1 text-sm leading-tight font-medium text-white"
                    >
                      <LogInIcon className="h-4 w-4" />
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-4">
            {/* Categories Section - Using menuBarCategories */}
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Categories
              </h3>
              <div className="space-y-1">
                {menuBarCategories.map((category) => (
                  <CategoryAccordion
                    key={category.label}
                    category={category}
                    onClose={onClose}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Secondary Links Section */}
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Quick Links
              </h3>
              <div className="space-y-1">
                {secondaryMenuLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
                  >
                    <span className="font-medium text-foreground">
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Help Section */}
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Help & Support
              </h3>
              <div className="space-y-1">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <span className="font-medium text-foreground">
                    Contact Us
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/faq"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <span className="font-medium text-foreground">FAQ</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/shipping"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <span className="font-medium text-foreground">
                    Shipping Info
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
