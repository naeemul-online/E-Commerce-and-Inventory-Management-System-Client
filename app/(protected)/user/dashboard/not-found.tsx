import { Button } from "@/components/ui/button"
import Link from "next/link"

const UserDashboardNotFound = () => {
  return (
    <section className="rounded-2xl border bg-card p-6 text-center shadow-sm md:p-8">
      <h1 className="text-2xl font-semibold text-card-foreground md:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
        This dashboard page does not exist yet. Please use the available menu
        options or return to your dashboard home.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/user/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </section>
  )
}

export default UserDashboardNotFound
