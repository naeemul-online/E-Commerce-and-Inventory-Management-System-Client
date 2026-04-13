import { NavSection } from "@/types/dashboard.interface"
import { getDefaultDashboardRoute, UserRole } from "./auth-utils"

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role)
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
          roles: ["SUPER_ADMIN", "USER", "ADMIN"],
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["SUPER_ADMIN", "USER", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["USER"],
        },
      ],
    },
  ]
}

export const getUserNavItems: NavSection[] = [
  {
    title: "My Order",
    items: [
      {
        title: "Order",
        href: "/user/dashboard/order",
        icon: "Calendar", // ✅ String
        badge: undefined,
        roles: ["USER"],
      },
    ],
  },
  {
    title: "My Profile",
    items: [
      {
        title: "setting",
        href: "/user/dashboard/profile",
        icon: "Calendar", // ✅ String
        badge: undefined,
        roles: ["USER"],
      },
    ],
  },
]

export const getAdminNavItems: NavSection[] = [
  {
    title: "Order Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/order-management",
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "USERS",
        href: "/admin/dashboard/users-management",
        icon: "Stethoscope", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Profile",
        href: "/admin/dashboard/my-profile",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
]

export const getSuperAdminNavItems: NavSection[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Admins",
        href: "/super-admin/dashboard/admin-management",
        icon: "Shield", // ✅ String
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "ORDERS",
        href: "/super-admin/dashboard/orders-management",
        icon: "Stethoscope", // ✅ String
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Profile",
        href: "/super-admin/dashboard/my-profile",
        icon: "Users", // ✅ String
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
]

export const getNavItemsByRole = async (
  role: UserRole
): Promise<NavSection[]> => {
  const commonNavItems = getCommonNavItems(role)

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...getAdminNavItems]
    case "USER":
      return [...commonNavItems, ...getUserNavItems]
    case "SUPER_ADMIN":
      return [...commonNavItems, ...getSuperAdminNavItems]
    default:
      return []
  }
}
