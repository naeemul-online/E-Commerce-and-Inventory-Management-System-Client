import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductDetailsPage } from "@/components/product"
import {
  getProductBySlug,
  getAllProductSlugs,
} from "@/lib/products-data"
import { getCollectionConfig } from "@/lib/collections-data"

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

  const collectionConfig = getCollectionConfig(product.collectionSlug)
  const primaryImage = product.images?.[0]?.url

  return {
    title: `${product.name} | Buy Online`,
    description: `Buy ${product.name} from ${product.brand}. ${collectionConfig?.description || ""}`,
    openGraph: {
      title: product.name,
      description: `Buy ${product.name} from ${product.brand}. Price: ৳${product.price}`,
      images: primaryImage ? [primaryImage] : [],
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
