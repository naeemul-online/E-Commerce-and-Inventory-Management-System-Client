import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductDetailsPage } from "@/components/product"
import { getProductBySlug, getAllProductSlugs } from "@/lib/products-data"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | Buy Online`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailsPage product={product} />
}
