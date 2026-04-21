import MobileDashboardNav from "@/app/(protected)/_dashboard/components/mobile-dashboard-nav"
import SidebarDashboard from "@/app/(protected)/_dashboard/components/sidebar-dashboard"
import { getRoleNav } from "@/app/(protected)/_dashboard/nav/role-nav"
import { Navbar } from "@/components/navigation"
import React from "react"

const UserDashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const sections = getRoleNav("USER")

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-muted/10">
      {/* Storefront navbar so shoppers can still search, browse categories, and open the cart */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* Sidebar + scrollable dashboard content */}
      <div className="flex min-h-0 flex-1">
        <SidebarDashboard sections={sections} />
        <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        <MobileDashboardNav sections={sections} />
      </div>
    </div>
  )
}

export default UserDashboardLayout
