import { CollectionPage } from "@/components/collections"
import { datesConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Dates — Premium Ajwa, Medjool & More",
  description: datesConfig.description,
}

export default function DatesCollectionPage() {
  return <CollectionPage config={datesConfig} />
}
