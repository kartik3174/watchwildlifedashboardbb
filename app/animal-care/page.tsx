import type { Metadata } from "next"
import { PageHeader } from "@/components/dashboard/page-header"
import { AnimalCareHub } from "@/components/animal-care/animal-care-hub"
import { AnimalProfile } from "@/components/animals/animal-profile"
import { LeafDecoration } from "@/components/leaf-decoration"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Animal Care | Owl Watch",
  description: "Health monitoring and care recommendations for wildlife",
}

export default async function AnimalCarePage({ searchParams }: { searchParams: { id?: string } }) {
  const supabase = createClient()
  const animalId = searchParams.id

  const { data: animals } = await supabase
    .from("animals")
    .select(`
      id,
      name,
      Tag_id,
      species:species_Id ( name )
    `)

  if (animalId && animals) {
    const animal = animals.find((a) => String(a.id) === animalId)

    if (animal) {
      return (
        <div className="container mx-auto py-6 relative">
          <LeafDecoration position="top-right" size="lg" opacity={0.05} className="hidden lg:block" />
          <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.05} className="hidden lg:block" />

          <PageHeader title={`${animal.name} (${animal.Tag_id})`} description={animal.species?.name || "Unknown"} />
          <AnimalProfile
            animal={{
              id: animal.Tag_id,
              name: animal.name,
              species: animal.species?.name || "Unknown",
              age: "Unknown",
              gender: "Unknown",
              status: "Monitoring",
              image: `/placeholder.svg?height=300&width=300`,
              description: `Health monitoring profile for ${animal.name}.`,
            }}
          />
        </div>
      )
    }
  }

  return (
    <div className="container mx-auto py-6 relative">
      <LeafDecoration position="top-right" size="lg" opacity={0.05} className="hidden lg:block" />
      <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.05} className="hidden lg:block" />
      <PageHeader title="Animal Care" description="Health monitoring and care recommendations" />
      <AnimalCareHub animals={animals || []} />
    </div>
  )
}
