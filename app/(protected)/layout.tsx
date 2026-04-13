import DashboardNavbar from "@/components/modules/dashboard/dashboard-navabr"
import DashboardSidebar from "@/components/modules/dashboard/dashboard-sidebar"
import React from "react"

export const dynamic = "force-dynamic"

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-7xl overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default CommonDashboardLayout
