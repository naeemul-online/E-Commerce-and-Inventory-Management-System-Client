type PageLoadingSpinnerProps = {
  message?: string
}

const PageLoadingSpinner = ({
  message = "Loading...",
}: PageLoadingSpinnerProps) => {
  return (
    <div
      className="flex min-h-[60vh] w-full items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span
          className="inline-flex size-10 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export default PageLoadingSpinner
