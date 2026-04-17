import { Button } from "@/components/ui/button"
import Link from "next/link"

const AdminDashboardNotFound = () => {
  return (
    <section className="rounded-2xl border bg-white p-6 text-center shadow-sm md:p-10">
      <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 md:text-base">
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
