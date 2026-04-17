import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type AdminFeaturePlaceholderProps = {
  title: string
  description: string
}

const AdminFeaturePlaceholder = ({
  title,
  description,
}: AdminFeaturePlaceholderProps) => {
  return (
    <section className="animate-in fade-in-0 slide-in-from-bottom-2 rounded-2xl border bg-white p-6 shadow-sm duration-300 md:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Admin feature
        </Badge>
        <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">{title}</h1>
        <p className="mt-3 text-sm text-zinc-600 md:text-base">{description}</p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">Back to Admin Dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AdminFeaturePlaceholder
