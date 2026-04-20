import ProductBrandCreateForm from "./_components/ProductBrandCreateForm"

const BrandsPage = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Product Brands</h1>
        <p className="text-sm text-muted-foreground">
          Create brand first, then use the brand while adding a product.
        </p>
      </div>

      <ProductBrandCreateForm />
    </section>
  )
}

export default BrandsPage
