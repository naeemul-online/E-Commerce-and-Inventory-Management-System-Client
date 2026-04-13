import { getDefaultDashboardRoute } from "@/lib/auth-utils"
import { getNavItemsByRole } from "@/lib/navItems.config"

import { getUserInfo } from "@/lib/getUserInfo"
import { NavSection } from "@/types/dashboard.interface"

import { UserInfo } from "@/types/auth"
import DashboardSidebarContent from "./dashboard-sidebar-content"

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo

  const navItems: NavSection[] = await getNavItemsByRole(userInfo.role)
  const dashboardHome = getDefaultDashboardRoute(userInfo.role)

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  )
}

export default DashboardSidebar
