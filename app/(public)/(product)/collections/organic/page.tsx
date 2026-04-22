import { CollectionPage } from "@/components/collections"
import { organicConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Organic — Certified Organic Products",
  description: organicConfig.description,
}

export default function OrganicCollectionPage() {
  return <CollectionPage config={organicConfig} />
}
