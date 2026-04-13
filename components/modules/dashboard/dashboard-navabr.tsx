import { getDefaultDashboardRoute } from "@/lib/auth-utils"
import { getNavItemsByRole } from "@/lib/navItems.config"

import { getUserInfo } from "@/lib/getUserInfo"

import { UserInfo } from "@/types/auth"
import DashboardNavbarContent from "./dashboard-navbar-content"

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo
  const navItems = await getNavItemsByRole(userInfo.role)
  const dashboardHome = getDefaultDashboardRoute(userInfo.role)

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  )
}

export default DashboardNavbar
