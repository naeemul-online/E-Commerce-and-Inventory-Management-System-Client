import { Button } from "@/components/ui/button"
import Link from "next/link"

const AdminDashboardNotFound = () => {
  return (
    <section className="rounded-2xl border bg-card p-6 text-center shadow-sm md:p-8">
      <h1 className="text-2xl font-semibold text-card-foreground md:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
        This admin dashboard page does not exist. Please use the sidebar links
        or return to the dashboard home.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/admin/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </section>
  )
}

export default AdminDashboardNotFound
