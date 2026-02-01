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

export default async function AnimalCarePage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const supabase = createClient()
  const animalId = searchParams.id

  // 🔥 Fetch animals from database
  const { data: animals } = await supabase
    .from("animals")
    .select(`
      id,
      name,
      Tag_id,
      species:speciesId ( name )
    `)

  // 🧠 If user clicked an animal card → show profile page
  if (animalId && animals) {
    const animal = animals.find((a) => String(a.id) === animalId)

    if (animal) {
      const mappedAnimal = {
        id: animal.Tag_id, // your UI expects string ID like E-001
        name: animal.name,
        species: animal.species?.name || "Unknown",
        age: "Unknown",
        gender: "Unknown",
        status: "Monitoring",
        image: `/placeholder.svg?height=300&width=300`,
        description: `Health monitoring profile for ${animal.name}.`,
      }

      return (
        <div className="container mx-auto py-6 relative">
          <LeafDecoration position="top-right" size="lg" opacity={0.05} className="hidden lg:block" />
          <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.05} className="hidden lg:block" />

          <PageHeader
            title={`${mappedAnimal.name} (${mappedAnimal.id})`}
            description={`${mappedAnimal.species}`}
          />
          <AnimalProfile animal={mappedAnimal} />
        </div>
      )
    }
  }

  // 🌿 Default Animal Care Hub page
  return (
    <div className="container mx-auto py-6 relative">
      <LeafDecoration position="top-right" size="lg" opacity={0.05} className="hidden lg:block" />
      <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.05} className="hidden lg:block" />

      <PageHeader title="Animal Care" description="Health monitoring and care recommendations" />
      <AnimalCareHub animals={animals || []} />
    </div>
  )
}
