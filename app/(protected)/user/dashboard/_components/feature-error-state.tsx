"use client"

import { Button } from "@/components/ui/button"

type FeatureErrorStateProps = {
  title: string
  message?: string
  reset: () => void
}

const FeatureErrorState = ({
  title,
  message,
  reset,
}: FeatureErrorStateProps) => {
  return (
    <section className="rounded-2xl border border-red-200/80 bg-card p-6 shadow-sm md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-card-foreground md:text-2xl">
          {title}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          {message ||
            "Something went wrong while loading this feature. Please try again."}
        </p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  )
}

export default FeatureErrorState
