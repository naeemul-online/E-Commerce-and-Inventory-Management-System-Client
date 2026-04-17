import { RoleNavSection } from "@/app/(protected)/_dashboard/nav/role-nav"
import SidebarDashboardClient from "@/app/(protected)/_dashboard/components/sidebar-dashboard-client"

type SidebarDashboardProps = {
  sections: RoleNavSection[]
}

const SidebarDashboard = ({ sections }: SidebarDashboardProps) => {
  return <SidebarDashboardClient sections={sections} />
}

export default SidebarDashboard
