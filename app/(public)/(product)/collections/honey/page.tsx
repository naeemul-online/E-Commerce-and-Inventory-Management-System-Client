import { CollectionPage } from "@/components/collections"
import { honeyConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Honey — Pure, Organic & Raw Honey Collection",
  description: honeyConfig.description,
}

export default function HoneyCollectionPage() {
  return <CollectionPage config={honeyConfig} />
}
