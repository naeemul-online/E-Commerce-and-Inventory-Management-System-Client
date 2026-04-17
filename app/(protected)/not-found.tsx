import { Button } from "@/components/ui/button"
import Link from "next/link"

const ProtectedNotFoundPage = () => {
  return (
    <section className="rounded-2xl border bg-white p-6 text-center shadow-sm md:p-10">
      <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 md:text-base">
        This protected page does not exist or was moved. Use available
        navigation links to continue.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button asChild variant="outline">
          <Link href="/user/dashboard">User dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/dashboard">Admin dashboard</Link>
        </Button>
      </div>
    </section>
  )
}

export default ProtectedNotFoundPage
