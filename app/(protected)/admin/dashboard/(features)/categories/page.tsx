import ProductCategoryCreateForm from "../products/_components/ProductCategoryCreateForm"

const CategoriesPage = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Product Categories
        </h1>
        <p className="text-sm text-muted-foreground">
          Create category first, then use the category while adding a product.
        </p>
      </div>

      <ProductCategoryCreateForm />
    </section>
  )
}

export default CategoriesPage
