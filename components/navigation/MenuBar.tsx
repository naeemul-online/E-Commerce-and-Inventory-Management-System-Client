"use client"

import { menuBarCategories, type MenuBarCategory } from "@/constants/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

function MenuDropdown({ category }: { category: MenuBarCategory }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!category.subcategories || category.subcategories.length === 0) {
    return (
      <Link
        href={category.href}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90",
          "rounded-md transition-colors hover:bg-white/10 hover:text-white",
          "whitespace-nowrap"
        )}
      >
        {category.label}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90",
          "rounded-md transition-colors hover:bg-white/10 hover:text-white",
          "whitespace-nowrap"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {category.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 opacity-70 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={cn(
          "absolute top-full left-0 z-[100] mt-1 min-w-[180px] rounded-lg border bg-white py-1 shadow-lg",
          "origin-top transition-all duration-200",
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        )}
      >
        <Link
          href={category.href}
          className="block px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          All {category.label}
        </Link>
        <div className="mx-2 my-1 h-px bg-border" />
        {category.subcategories.map((sub) => (
          <Link
            key={sub.href}
            href={sub.href}
            className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {sub.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function MenuBar() {
  const [isSticky, setIsSticky] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const menuBar = document.getElementById("menu-bar")
      if (!menuBar) return

      const rect = menuBar.getBoundingClientRect()
      const shouldBeSticky = rect.top <= 0

      if (shouldBeSticky && !isSticky) {
        setIsSticky(true)
        setTimeout(() => setIsVisible(true), 10)
      } else if (!shouldBeSticky && isSticky) {
        setIsVisible(false)
        setTimeout(() => setIsSticky(false), 200)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isSticky])

  return (
    <>
      {/* Placeholder to maintain layout when sticky - hidden on mobile */}
      <div
        id="menu-bar"
        className={cn("hidden h-12 md:block", isSticky && "invisible")}
      />

      {/* Actual menu bar */}
      <nav
        className={cn(
          "z-60 hidden w-full bg-[#1a3a3a] md:block",
          isSticky
            ? "fixed top-0 right-0 left-0 transition-transform duration-300 ease-out"
            : "absolute",
          isSticky && (isVisible ? "translate-y-0" : "-translate-y-full")
        )}
        style={!isSticky ? { marginTop: "-48px" } : undefined}
      >
        <div className="container mx-auto flex max-w-7xl px-4">
          <ul className="flex h-12 items-center justify-center gap-1">
            {menuBarCategories.map((category) => (
              <li key={category.label}>
                <MenuDropdown category={category} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
