const FeatureLoadingSkeleton = () => {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-4 h-6 w-24 animate-pulse rounded-full bg-zinc-200/80" />
        <div className="mx-auto h-9 w-3/4 animate-pulse rounded bg-zinc-200/80" />
        <div className="mx-auto mt-4 h-4 w-full animate-pulse rounded bg-zinc-100/80" />
        <div className="mx-auto mt-2 h-4 w-11/12 animate-pulse rounded bg-zinc-100/80" />
        <div className="mx-auto mt-8 h-9 w-44 animate-pulse rounded-md bg-zinc-200/80" />
      </div>
    </section>
  )
}

export default FeatureLoadingSkeleton
