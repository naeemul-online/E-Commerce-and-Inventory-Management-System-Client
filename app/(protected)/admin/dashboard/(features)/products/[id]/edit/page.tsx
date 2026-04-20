type AdminProductEditPageProps = {
  params: {
    id: string
  }
}

const AdminProductEditPage = ({ params }: AdminProductEditPageProps) => {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <p className="text-sm text-muted-foreground">
        Product edit form will be added here for product: {params.id}
      </p>
    </section>
  )
}

export default AdminProductEditPage
