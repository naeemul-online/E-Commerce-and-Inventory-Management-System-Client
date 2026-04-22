import type { ProductDetails } from "@/types/product"

interface ProductDescriptionProps {
  product: ProductDetails
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div className="space-y-6">
      {/* Product Details Header */}
      <div className="border-l-4 border-primary pl-4">
        <h2 className="text-lg font-semibold text-foreground md:text-xl">
          Product Details
        </h2>
      </div>

      {/* Main Description */}
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {product.description}
      </p>

      {/* Benefits */}
      {product.benefits.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground md:text-base">
            Benefits:
          </h3>
          <ul className="space-y-2">
            {product.benefits.map((benefit, index) => (
              <li
                key={index}
                className="text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                <span className="font-medium text-foreground">
                  {benefit.title}
                </span>{" "}
                - {benefit.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Country of Origin */}
      <p className="text-sm text-muted-foreground md:text-base">
        <span className="font-medium text-foreground">Country of Origin:</span>{" "}
        {product.countryOfOrigin}
      </p>
    </div>
  )
}
