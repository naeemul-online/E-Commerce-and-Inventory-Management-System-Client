import React from "react"

export const dynamic = "force-dynamic"

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="h-screen w-full overflow-hidden bg-muted/10">{children}</div>
}

export default CommonDashboardLayout
