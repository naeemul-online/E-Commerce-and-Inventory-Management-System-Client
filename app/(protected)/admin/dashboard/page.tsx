import AdminAnalyticsChart from "@/app/(protected)/admin/dashboard/_components/admin-analytics-chart"
import { Button } from "@/components/ui/button"
import {
  Boxes,
  ChartColumnIncreasing,
  ShoppingCart,
  Truck,
  UsersRound,
} from "lucide-react"
import Link from "next/link"

const metrics = [
  {
    title: "Orders Today",
    value: 0,
    icon: ShoppingCart,
    iconBg: "bg-blue-500/15 text-blue-600",
    cardBg: "bg-blue-50",
  },
  {
    title: "Low Stock SKUs",
    value: 0,
    icon: Boxes,
    iconBg: "bg-amber-500/15 text-amber-600",
    cardBg: "bg-amber-50",
  },
  {
    title: "Pending Deliveries",
    value: 0,
    icon: Truck,
    iconBg: "bg-cyan-500/15 text-cyan-600",
    cardBg: "bg-cyan-50",
  },
  {
    title: "Active Users",
    value: 0,
    icon: UsersRound,
    iconBg: "bg-violet-500/15 text-violet-600",
    cardBg: "bg-violet-50",
  },
]

const quickActions = [
  { href: "/admin/dashboard/products", label: "Manage products" },
  { href: "/admin/dashboard/inventory", label: "Update inventory" },
  { href: "/admin/dashboard/orders", label: "Review orders" },
  { href: "/admin/dashboard/delivery", label: "Track deliveries" },
]

const analyticsSeries = [
  { month: "Jan", sales: 9200, orders: 130 },
  { month: "Feb", sales: 11200, orders: 154 },
  { month: "Mar", sales: 10400, orders: 147 },
  { month: "Apr", sales: 13800, orders: 186 },
  { month: "May", sales: 15100, orders: 198 },
  { month: "Jun", sales: 16700, orders: 224 },
]

const page = () => {
  return (
    <div className="space-y-5 md:space-y-6">
      <section className="animate-in fade-in-0 slide-in-from-top-2 rounded-2xl bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500 p-5 text-white duration-500 md:p-7">
        <h1 className="text-xl font-semibold md:text-2xl">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-white/90">
          Manage products, inventory, orders, deliveries, and users from one
          place.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <article
              key={metric.title}
              className={`animate-in fade-in-0 slide-in-from-bottom-2 rounded-xl border p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${metric.cardBg}`}
              style={{
                animationDuration: "500ms",
                animationDelay: `${80 + index * 60}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl leading-none font-bold text-zinc-900 sm:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 max-w-[170px] text-xs font-medium text-zinc-700 sm:text-base">
                    {metric.title}
                  </p>
                </div>
                <div className={`rounded-full p-2.5 sm:p-3 ${metric.iconBg}`}>
                  <Icon className="size-5 sm:size-6" />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="animate-in fade-in-0 slide-in-from-bottom-2 overflow-hidden rounded-lg border bg-white duration-500">
        <div className="flex items-center justify-between bg-primary px-4 py-3 sm:px-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-background sm:text-lg">
            <ChartColumnIncreasing className="size-4 sm:size-5" />
            Admin analytics
          </h2>
        </div>
        <div className="px-4 py-5 sm:px-5">
          <p className="text-sm text-zinc-600">
            Owner-level performance snapshot for revenue and orders. Keep this
            section on dashboard for faster daily decision making.
          </p>
          <div className="mt-4">
            <AdminAnalyticsChart series={analyticsSeries} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button key={action.href} asChild variant="outline" size="sm">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
