import { CollectionPage } from "@/components/collections"
import { nutsConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Nuts & Seeds — Premium Dry Fruits & Seeds",
  description: nutsConfig.description,
}

export default function NutsSeedsCollectionPage() {
  return <CollectionPage config={nutsConfig} />
}
