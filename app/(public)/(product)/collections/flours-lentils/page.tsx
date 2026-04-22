import { CollectionPage } from "@/components/collections"
import { floursConfig } from "@/lib/collections-data"

export const metadata = {
  title: "Flours & Lentils — Quality Flour & Pulses",
  description: floursConfig.description,
}

export default function FloursLentilsCollectionPage() {
  return <CollectionPage config={floursConfig} />
}
