type AdminInventoryProductDetailsPageProps = {
  params: { id: string }
}

const AdminInventoryProductDetailsPage = ({
  params,
}: AdminInventoryProductDetailsPageProps) => {
  const { id } = params

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Product Details</h1>
      <p className="text-sm text-muted-foreground">
        Reviewing inventory information for product: {id}
      </p>
    </section>
  )
}

export default AdminInventoryProductDetailsPage
