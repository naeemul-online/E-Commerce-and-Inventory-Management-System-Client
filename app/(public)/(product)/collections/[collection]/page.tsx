import { notFound } from "next/navigation"
import { CollectionPage } from "@/components/collections"
import { getCollectionConfig, collectionConfigs } from "@/lib/collections-data"

type Props = {
  params: Promise<{ collection: string }>
}

export async function generateMetadata({ params }: Props) {
  const { collection } = await params
  const config = getCollectionConfig(collection)

  if (!config) {
    return {
      title: "Collection Not Found",
    }
  }

  return {
    title: `${config.title} — Premium Quality Products`,
    description: config.description,
  }
}

export function generateStaticParams() {
  return Object.keys(collectionConfigs).map((collection) => ({
    collection,
  }))
}

export default async function DynamicCollectionPage({ params }: Props) {
  const { collection } = await params
  const config = getCollectionConfig(collection)

  if (!config) {
    notFound()
  }

  return <CollectionPage config={config} />
}
