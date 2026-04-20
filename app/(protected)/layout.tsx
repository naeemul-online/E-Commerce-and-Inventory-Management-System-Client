import React from "react"

export const dynamic = "force-dynamic"

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="min-h-screen w-full bg-muted/10">{children}</div>
}

export default CommonDashboardLayout
