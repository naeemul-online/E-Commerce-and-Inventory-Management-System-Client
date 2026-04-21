import SidebarDashboard from "@/app/(protected)/_dashboard/components/sidebar-dashboard"
import MobileDashboardNav from "@/app/(protected)/_dashboard/components/mobile-dashboard-nav"
import { getRoleNav } from "@/app/(protected)/_dashboard/nav/role-nav"
import { UserRole } from "@/lib/auth-utils"
import React from "react"

type DashboardShellProps = {
  role: UserRole
  children: React.ReactNode
}

const DashboardShell = ({ role, children }: DashboardShellProps) => {
  const sections = getRoleNav(role)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/10">
      <SidebarDashboard sections={sections} />
      <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
      <MobileDashboardNav sections={sections} variant="hamburger" />
    </div>
  )
}

export default DashboardShell
