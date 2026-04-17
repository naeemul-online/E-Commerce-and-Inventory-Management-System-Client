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
import { ChevronDown, ChevronRight, LogInIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"

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
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="flex w-full flex-col p-0 sm:max-w-sm"
      >
        <SheetHeader className="p-4 pb-0">
          <SheetTitle className="text-left">Hello there!</SheetTitle>

          <Link href="/login">
            <Button variant="outline">
              <LogInIcon className="h-4 w-4" />
              Signin
            </Button>
          </Link>
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
