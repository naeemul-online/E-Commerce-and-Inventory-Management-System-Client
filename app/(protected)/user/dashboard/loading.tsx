const UserDashboardLoading = () => {
  return (
    <div className="space-y-5 md:space-y-6">
      <section className="h-28 animate-pulse rounded-2xl bg-zinc-200/70" />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <article
            key={`stat-skeleton-${idx}`}
            className="rounded-xl border bg-white p-3 shadow-sm sm:p-5"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-7 w-10 animate-pulse rounded bg-zinc-200/80 sm:h-9 sm:w-12" />
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-200/70 sm:h-4 sm:w-28" />
              </div>
              <div className="size-10 animate-pulse rounded-full bg-zinc-200/80 sm:size-12" />
            </div>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border bg-white">
        <div className="h-12 animate-pulse bg-zinc-200/80" />
        <div className="h-20 animate-pulse bg-zinc-100/70" />
      </section>

      <section className="overflow-hidden rounded-lg border bg-white">
        <div className="h-12 animate-pulse bg-zinc-200/80" />
        <div className="h-20 animate-pulse bg-zinc-100/70" />
      </section>
    </div>
  )
}

export default UserDashboardLoading
