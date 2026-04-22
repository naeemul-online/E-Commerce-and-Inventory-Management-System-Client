import { CollectionPage } from "@/components/collections"
import { riceConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Rice — Premium Basmati & Aromatic Rice",
  description: riceConfig.description,
}

export default function RiceCollectionPage() {
  return <CollectionPage config={riceConfig} />
}
