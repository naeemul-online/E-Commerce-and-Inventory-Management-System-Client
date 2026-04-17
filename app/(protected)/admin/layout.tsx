import DashboardShell from "@/app/(protected)/_dashboard/components/dashboard-shell"
import React from "react"

const AdminLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <DashboardShell role="ADMIN">{children}</DashboardShell>
}

export default AdminLayout
