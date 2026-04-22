import { CollectionPage } from "@/components/collections"
import { beverageConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Beverage — Premium Tea & Coffee",
  description: beverageConfig.description,
}

export default function BeverageCollectionPage() {
  return <CollectionPage config={beverageConfig} />
}
