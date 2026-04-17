"use client"

import { useEffect, useState } from "react"

type AdminAnalyticsChartProps = {
  series: Array<{
    month: string
    sales: number
    orders: number
  }>
}

const AdminAnalyticsChart = ({ series }: AdminAnalyticsChartProps) => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setAnimated(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  const maxSales = Math.max(...series.map((item) => item.sales), 1)
  const maxOrders = Math.max(...series.map((item) => item.orders), 1)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-2">
        {series.map((item, index) => {
          const salesHeight = Math.max((item.sales / maxSales) * 100, 8)
          const ordersHeight = Math.max((item.orders / maxOrders) * 100, 8)

          return (
            <div key={item.month} className="space-y-2 text-center">
              <div className="flex h-40 items-end justify-center gap-1 rounded-md bg-muted/30 p-2">
                <div
                  className="w-3 rounded-sm bg-primary/85 transition-all duration-700 ease-out"
                  style={{
                    height: animated ? `${salesHeight}%` : "0%",
                    transitionDelay: `${index * 70}ms`,
                  }}
                  aria-label={`${item.month} sales`}
                />
                <div
                  className="w-3 rounded-sm bg-indigo-400/90 transition-all duration-700 ease-out"
                  style={{
                    height: animated ? `${ordersHeight}%` : "0%",
                    transitionDelay: `${index * 70 + 90}ms`,
                  }}
                  aria-label={`${item.month} orders`}
                />
              </div>
              <p className="text-xs font-medium text-zinc-600">{item.month}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-sm bg-primary/85" />
          Sales (USD)
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-sm bg-indigo-400/90" />
          Orders
        </div>
      </div>
    </div>
  )
}

export default AdminAnalyticsChart
