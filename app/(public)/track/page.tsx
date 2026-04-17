"use client"

import { Button } from "@/components/ui/button"
import { PackageSearch } from "lucide-react"
import Link from "next/link"
import { FormEvent, useMemo, useState } from "react"
import { Skeleton } from "boneyard-js/react"

const getOrderState = (orderNumber: string) => {
  const normalized = orderNumber.trim().toLowerCase()
  if (normalized === "nf-1001" || normalized === "order-1001") {
    return "found" as const
  }
  return "not-found" as const
}

type ResultCardProps = {
  status: "found" | "not-found"
}

const ResultCard = ({ status }: ResultCardProps) => {
  if (status === "found") {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl border bg-background px-6 py-8 text-center shadow-sm">
        <p className="text-xl font-semibold text-zinc-900">Order Found</p>
        <p className="mt-2 text-sm text-zinc-600">
          Your order is in transit and expected to arrive within 2-3 days.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-10 max-w-xl text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background">
        <PackageSearch className="h-6 w-6 text-primary" />
      </div>
      <p className="mt-3 text-[28px] leading-tight font-semibold text-zinc-800">
        Order Not Found
      </p>
      <p className="mx-auto mt-2 max-w-lg text-base text-zinc-600">
        We couldn&apos;t find any order with that number. Please check your
        order ID and try again.
      </p>
      <Button
        asChild
        className="mt-7 h-12 rounded-lg bg-primary px-8 text-sm font-semibold text-background hover:bg-zinc-700"
      >
        <Link href="/">Back to Shopping</Link>
      </Button>
    </div>
  )
}

const TrackPage = () => {
  const [orderNumber, setOrderNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [status, setStatus] = useState<"found" | "not-found">("not-found")

  const hasInput = useMemo(() => orderNumber.trim().length > 0, [orderNumber])

  const handleTrack = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasInput || isTracking) return

    setIsTracking(true)

    window.setTimeout(() => {
      setStatus(getOrderState(orderNumber))
      setIsTracking(false)
    }, 950)
  }

  return (
    <section className="min-h-[calc(100vh-180px)] bg-zinc-100/80 px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-[28px] leading-tight font-semibold text-zinc-900">
              Order Tracking
            </h1>
            <p className="mt-1 text-base text-zinc-600">
              Track your order progress and view details
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex w-full gap-2 md:w-auto">
            <input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Enter Order Number"
              className="h-12 w-full rounded-lg border border-zinc-200 bg-background px-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none md:w-[270px]"
            />
            <Button
              type="submit"
              disabled={!hasInput || isTracking}
              className="h-12 rounded-lg bg-primary px-7 text-sm font-semibold text-white hover:bg-zinc-700 disabled:opacity-60"
            >
              Track
            </Button>
          </form>
        </div>

        <Skeleton
          name="public-track-result"
          loading={isTracking}
          fixture={<ResultCard status="not-found" />}
        >
          <ResultCard status={status} />
        </Skeleton>
      </div>
    </section>
  )
}

export default TrackPage
