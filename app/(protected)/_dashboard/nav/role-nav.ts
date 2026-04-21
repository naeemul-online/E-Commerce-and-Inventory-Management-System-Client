import { UserRole } from "@/lib/auth-utils"

export type RoleNavItem = {
  href: string
  label: string
  match: string[]
  badgeKey?: string
  icon?: string
}

export type RoleNavSection = {
  title: string
  items: RoleNavItem[]
}

const baseNavByRole: Record<UserRole, RoleNavSection[]> = {
  USER: [
    {
      title: "Shop",
      items: [
        {
          href: "/",
          label: "Home",
          // Dashboard is never rendered at "/", so this item will never be marked active.
          match: [],
          icon: "Home",
        },
      ],
    },
    {
      title: "Overview",
      items: [
        {
          href: "/user/dashboard",
          label: "Dashboard",
          match: ["/user/dashboard"],
          icon: "LayoutDashboard",
        },
        {
          href: "/user/dashboard/orders",
          label: "My Orders",
          match: ["/user/dashboard/orders"],
          icon: "ShoppingCart",
        },
        {
          href: "/user/dashboard/wishlist",
          label: "Wishlist",
          match: ["/user/dashboard/wishlist"],
          icon: "Heart",
        },
        {
          href: "/user/dashboard/coupons",
          label: "Promo/Coupon",
          match: ["/user/dashboard/coupons"],
          icon: "TicketPercent",
        },
        {
          href: "/user/dashboard/address",
          label: "Address",
          match: ["/user/dashboard/address"],
          icon: "MapPinned",
        },
        {
          href: "/user/dashboard/payments",
          label: "Payments",
          match: ["/user/dashboard/payments"],
          icon: "WalletCards",
        },
        {
          href: "/user/dashboard/reviews",
          label: "Product Reviews",
          match: ["/user/dashboard/reviews"],
          icon: "Star",
        },
        {
          href: "/user/dashboard/tickets",
          label: "Support Tickets",
          match: ["/user/dashboard/tickets"],
          icon: "MessageCircleMore",
        },
        {
          href: "/user/dashboard/profile",
          label: "Manage Profile",
          match: ["/user/dashboard/profile"],
          icon: "UserCog",
        },
        {
          href: "/user/dashboard/change-password",
          label: "Change Password",
          match: ["/user/dashboard/change-password"],
          icon: "LockKeyhole",
        },
      ],
    },
  ],
  ADMIN: [
    {
      title: "Storefront",
      items: [
        {
          href: "/",
          label: "Home",
          match: [],
          icon: "Home",
        },
      ],
    },
    {
      title: "Overview",
      items: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          match: ["/admin/dashboard"],
          icon: "LayoutDashboard",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          href: "/admin/dashboard/products",
          label: "Products",
          match: ["re:^/admin/dashboard/products(/.*)?$"],
          icon: "Package",
        },
        {
          href: "/admin/dashboard/categories",
          label: "Categories",
          match: ["re:^/admin/dashboard/categories(/.*)?$"],
          icon: "Tags",
        },
        {
          href: "/admin/dashboard/brands",
          label: "Brands",
          match: ["re:^/admin/dashboard/brands(/.*)?$"],
          icon: "BadgeCheck",
        },
        {
          href: "/admin/dashboard/inventory",
          label: "Inventory",
          match: ["re:^/admin/dashboard/inventory(/.*)?$"],
          icon: "Boxes",
        },
        {
          href: "/admin/dashboard/orders",
          label: "Orders",
          match: ["re:^/admin/dashboard/orders(/.*)?$"],
          icon: "ShoppingCart",
        },
        {
          href: "/admin/dashboard/users",
          label: "Users",
          match: ["re:^/admin/dashboard/users(/.*)?$"],
          icon: "UsersRound",
        },
        {
          href: "/admin/dashboard/delivery",
          label: "Delivery",
          match: ["re:^/admin/dashboard/delivery(/.*)?$"],
          icon: "Truck",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          href: "/admin/dashboard/profile",
          label: "Admin Profile",
          match: ["re:^/admin/dashboard/profile(/.*)?$"],
          icon: "UserCog",
        },
      ],
    },
  ],
  SUPER_ADMIN: [
    {
      title: "Storefront",
      items: [
        {
          href: "/",
          label: "Home",
          match: [],
          icon: "Home",
        },
      ],
    },
    {
      title: "Overview",
      items: [
        {
          href: "/super-admin/dashboard",
          label: "Dashboard",
          match: ["/super-admin/dashboard"],
          icon: "LayoutDashboard",
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          href: "/super-admin/users",
          label: "Manage Admins",
          match: ["/super-admin/users"],
          icon: "Users",
        },
        {
          href: "/super-admin/system",
          label: "System Settings",
          match: ["/super-admin/system"],
          icon: "Settings",
        },
      ],
    },
  ],
}

export const getRoleNav = (role: UserRole): RoleNavSection[] => {
  return baseNavByRole[role] || []
}
