import React from "react"

export const dynamic = "force-dynamic"

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl">
      <div className="flex flex-1 flex-col">
        <main className="bg-muted/10 p-4 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default CommonDashboardLayout
