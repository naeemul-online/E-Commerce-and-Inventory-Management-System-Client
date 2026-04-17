import { Button } from "@/components/ui/button"
import Link from "next/link"

const SuperAdminNotFoundPage = () => {
  return (
    <section className="rounded-2xl border bg-white p-6 text-center shadow-sm md:p-10">
      <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 md:text-base">
        This super admin page does not exist. Use the sidebar to navigate to an
        available section.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/super-admin/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </section>
  )
}

export default SuperAdminNotFoundPage
