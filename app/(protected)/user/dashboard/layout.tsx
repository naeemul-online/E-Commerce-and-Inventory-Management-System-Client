import DashboardShell from "@/app/(protected)/_dashboard/components/dashboard-shell"
import React from "react"

const UserDashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <DashboardShell role="USER">{children}</DashboardShell>
}

export default UserDashboardLayout
