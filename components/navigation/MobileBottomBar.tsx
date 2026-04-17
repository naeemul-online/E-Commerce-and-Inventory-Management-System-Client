"use client"

import { cn } from "@/lib/utils"
import { Home, Menu, Search, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CartTrigger } from "./CartTrigger"
import { MenuDrawer } from "./MenuDrawer"
import { SearchBar } from "./SearchBar"

export function MobileBottomBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex h-full flex-col">
            <div className="flex flex-1 items-start justify-center p-4 pt-20">
              <div className="w-full max-w-sm">
                <SearchBar
                  variant="mobile"
                  onClose={() => setIsSearchOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Drawer */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Bottom Navigation Bar */}
      <nav
        className={cn(
          "fixed right-0 bottom-0 left-0 z-40 bg-[#FF8033] md:hidden",
          "pb-[env(safe-area-inset-bottom)]"
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="grid h-16 grid-cols-5">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-0.5"
            aria-label="Home"
          >
            <Home className="h-6 w-6 text-white" />
            <span className="text-[10px] font-medium tracking-wide text-white uppercase">
              Home
            </span>
          </Link>

          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-white" />
            <span className="text-[10px] font-medium tracking-wide text-white uppercase">
              Menu
            </span>
          </button>

          {/* Cart */}
          <CartTrigger variant="mobile" />

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5"
            aria-label="Open search"
          >
            <Search className="h-6 w-6 text-white" />
            <span className="text-[10px] font-medium tracking-wide text-white uppercase">
              Search
            </span>
          </button>

          {/* Account */}
          <Link
            href="/user/dashboard"
            className="flex flex-col items-center justify-center gap-0.5"
            aria-label="Account"
          >
            <User className="h-6 w-6 text-white" />
            <span className="text-[10px] font-medium tracking-wide text-white uppercase">
              Account
            </span>
          </Link>
        </div>
      </nav>
    </>
  )
}
