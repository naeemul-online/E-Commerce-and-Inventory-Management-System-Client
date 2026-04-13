"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  HelpCircle,
  MoreHorizontal,
  Phone,
  Shield,
} from "lucide-react"
import Link from "next/link"

const moreMenuItems = [
  { label: "Help Center", href: "/help", icon: HelpCircle },
  { label: "Contact Us", href: "/contact", icon: Phone },
  { label: "Terms of Service", href: "/terms", icon: FileText },
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
]

export function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {moreMenuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={item.label}>
              {index === moreMenuItems.length - 2 && <DropdownMenuSeparator />}
              <DropdownMenuItem asChild>
                <Link
                  href={item.href}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
