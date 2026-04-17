const Loader = () => {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
      <div
        className="flex w-full max-w-sm flex-col items-center rounded-2xl border bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="relative mb-4 flex size-12 items-center justify-center">
          <span className="absolute inline-flex size-12 rounded-full border-2 border-primary/20" />
          <span className="inline-flex size-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>

        <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
          Loading your experience
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Please wait while we prepare everything for you.
        </p>

        <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.25s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.05s]" />
        </div>
      </div>
    </div>
  )
}

export default Loader
