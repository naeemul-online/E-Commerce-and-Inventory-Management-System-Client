import type { ProductDetails } from "@/types/product"
import { ProductCTA } from "./product-cta"
import { ProductTabs } from "./product-tabs"
import { CollectionBreadcrumbs } from "@/components/collections/collection-breadcrumbs"

interface ProductDetailsPageProps {
  product: ProductDetails
}

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  return (
    <div className="py-4 md:py-6">
      {/* Breadcrumbs */}
      <CollectionBreadcrumbs
        collectionSlug={product.collectionSlug}
        collectionTitle={product.category}
        subcategorySlug={product.subcategory}
        subcategoryTitle={product.subcategory}
        productName={product.name}
      />

      {/* Product CTA Section */}
      <div className="mt-4 md:mt-6">
        <ProductCTA product={product} />
      </div>

      {/* Description & Reviews Tabs */}
      <ProductTabs product={product} />
    </div>
  )
}
