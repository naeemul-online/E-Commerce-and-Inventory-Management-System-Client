import { Button } from "@/components/ui/button"
import Link from "next/link"

const SuperAdminDashboardNotFound = () => {
  return (
    <section className="rounded-2xl border bg-card p-6 text-center shadow-sm md:p-8">
      <h1 className="text-2xl font-semibold text-card-foreground md:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
        This super admin page does not exist. Use available dashboard links or
        go back to dashboard home.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/super-admin/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </section>
  )
}

export default SuperAdminDashboardNotFound
