"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { CartDrawer } from "./CartDrawer"
import { CartTrigger } from "./CartTrigger"
import { FloatingCartWidget } from "./FloatingCartNavigate"
import { Logo } from "./Logo"
import { MenuBar } from "./MenuBar"
import { MenuDrawer } from "./MenuDrawer"
import { MobileBottomBar } from "./MobileBottomBar"
import { MoreMenu } from "./MoreMenu"
import { NavActions } from "./NavActions"
import { SearchBar } from "./SearchBar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop/Tablet Header */}
      <header className="relative z-50 mx-auto w-full bg-background">
        <div className="container mx-auto max-w-7xl px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile Menu Button (visible on mobile, left side) */}
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <Logo />

            {/* Desktop Search Bar */}
            <div className="hidden flex-1 justify-center px-4 md:flex">
              <SearchBar className="w-full max-w-lg" />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1">
              {/* Desktop Nav Actions */}
              <NavActions />

              {/* Cart Trigger - Desktop only, mobile uses bottom bar */}
              <CartTrigger className="hidden md:flex" />

              {/* More Menu - Desktop only */}
              <div className="hidden md:block">
                <MoreMenu />
              </div>

              {/* Mobile Cart Trigger - visible on mobile in top bar */}
              <CartTrigger className="md:hidden" />
            </div>
          </div>
        </div>

        {/* Category Menu Bar - Desktop only, becomes sticky on scroll */}
        <MenuBar />
      </header>

      {/* Cart Drawer - Unified for both mobile and desktop */}
      <CartDrawer />

      {/* Menu Drawer for mobile (triggered from top bar) */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar />

      {/* Floating Cart Widget - Fixed on right side, responsive for all devices */}
      <FloatingCartWidget />
    </>
  )
}
