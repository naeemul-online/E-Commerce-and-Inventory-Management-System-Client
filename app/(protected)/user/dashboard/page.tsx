import { Button } from "@/components/ui/button"
import {
  CircleDollarSign,
  Gift,
  Heart,
  MessageCircleMore,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react"

const stats = [
  {
    title: "Total order placed",
    value: 0,
    icon: ShoppingBag,
    iconBg: "bg-blue-500/15 text-blue-600",
    cardBg: "bg-violet-50",
  },
  {
    title: "Running orders",
    value: 0,
    icon: ShoppingBasket,
    iconBg: "bg-amber-500/15 text-amber-600",
    cardBg: "bg-cyan-50",
  },
  {
    title: "Items in cart",
    value: 0,
    icon: Gift,
    iconBg: "bg-green-500/15 text-green-600",
    cardBg: "bg-slate-50",
  },
  {
    title: "Product in wishlist's",
    value: 0,
    icon: Heart,
    iconBg: "bg-orange-500/15 text-orange-600",
    cardBg: "bg-blue-50",
  },
  {
    title: "Amount spent",
    value: 0,
    icon: CircleDollarSign,
    iconBg: "bg-blue-500/15 text-blue-600",
    cardBg: "bg-purple-50",
  },
  {
    title: "Opened Tickets",
    value: 0,
    icon: MessageCircleMore,
    iconBg: "bg-fuchsia-500/15 text-fuchsia-600",
    cardBg: "bg-cyan-50",
  },
]

const Page = () => {
  return (
    <div className="space-y-5 md:space-y-6">
      <section className="animate-in fade-in-0 slide-in-from-top-2 rounded-2xl bg-linear-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 p-5 text-white duration-500 md:p-7">
        <h1 className="text-xl font-semibold md:text-2xl">My Dashboard</h1>
        <p className="mt-1 text-sm text-white/90">
          Track your orders, wishlist, payments, and account updates in one
          place.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <article
              key={stat.title}
              className={`animate-in fade-in-0 slide-in-from-bottom-2 rounded-xl border p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${stat.cardBg}`}
              style={{
                animationDuration: "500ms",
                animationDelay: `${80 + index * 60}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl leading-none font-bold text-zinc-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[170px] text-xs font-medium text-zinc-700 sm:text-base">
                    {stat.title}
                  </p>
                </div>
                <div className={`rounded-full p-2.5 sm:p-3 ${stat.iconBg}`}>
                  <Icon className="size-5 sm:size-6" />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="animate-in fade-in-0 slide-in-from-bottom-2 overflow-hidden rounded-lg border bg-white duration-500">
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 sm:px-5">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Recent orders
          </h2>
          <Button
            variant="outline"
            className="h-8 rounded-md border-white/80 transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            All orders
          </Button>
        </div>
        <div className="px-4 py-8 text-center text-zinc-500 sm:px-5">
          No Order Found
        </div>
      </section>

      <section className="animate-in fade-in-0 slide-in-from-bottom-2 overflow-hidden rounded-lg border bg-white duration-500">
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 sm:px-5">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Wishlist items
          </h2>
          <Button
            variant="outline"
            className="h-8 rounded-md border-white/80 transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            View more
          </Button>
        </div>
        <div className="px-4 py-8 text-center text-zinc-500 sm:px-5">
          No Product in Wishlist
        </div>
      </section>
    </div>
  )
}

export default Page
