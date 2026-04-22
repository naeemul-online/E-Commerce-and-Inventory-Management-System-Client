import { CollectionPage } from "@/components/collections"
import { spicesConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Spices — Premium Ground & Whole Spices",
  description: spicesConfig.description,
}

export default function SpicesCollectionPage() {
  return <CollectionPage config={spicesConfig} />
}
