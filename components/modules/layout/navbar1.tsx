"use client"

import { Book, Sunset, Trees, Zap } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface Navbar1Props {
  className?: string
  menu?: MenuItem[]
}

const Navbar1 = ({
  menu = [
    {
      title: "Oil & Ghee",
      url: "oil-ghee",
    },

    {
      title: "Honey",
      url: "/honey",
      items: [
        {
          title: "Merzul",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "/honey/merzul",
        },
        {
          title: "Sukkari",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/honey/sukkari",
        },
        {
          title: "Moriom",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/honey/moriom",
        },
      ],
    },
    {
      title: "Dates",
      url: "/honey",
      items: [
        {
          title: "Merzul",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "/honey/merzul",
        },
        {
          title: "Sukkari",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/honey/sukkari",
        },
        {
          title: "Moriom",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/honey/moriom",
        },
      ],
    },
    {
      title: "Spices",
      url: "#",
      items: [
        {
          title: "Botanical Nuts",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "nuts/botanical",
        },
        {
          title: "Drupes",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/nuts/drupes",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Legumes",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "/nuts/legumes",
        },
      ],
    },
    {
      title: "Nuts & Seeds",
      url: "#",
      items: [
        {
          title: "Botanical Nuts",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "nuts/botanical",
        },
        {
          title: "Drupes",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/nuts/drupes",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Legumes",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "/nuts/legumes",
        },
      ],
    },

    {
      title: "Flours & Lentils",
      url: "#",
      items: [
        {
          title: "Botanical Nuts",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "nuts/botanical",
        },
        {
          title: "Drupes",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/nuts/drupes",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Legumes",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "/nuts/legumes",
        },
      ],
    },
    // {
    //   title: "Certified",
    //   url: "#",
    // },
    // {
    //   title: "Pickle",
    //   url: "#",
    // },
  ],

  className,
}: Navbar1Props) => {
  return (
    <section className={cn("md:py-2", className)}>
      <div className="sticky top-0 z-50 container mx-auto w-full max-w-7xl">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between text-background md:flex">
          <div className="flex items-center lg:gap-6">
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-primary"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  )
}

export { Navbar1 }
