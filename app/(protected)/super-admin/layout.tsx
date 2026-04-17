import DashboardShell from "@/app/(protected)/_dashboard/components/dashboard-shell"
import React from "react"

const SuperAdminLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <DashboardShell role="SUPER_ADMIN">{children}</DashboardShell>
}

export default SuperAdminLayout
