"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export type Animal = {
  id: number
  name: string
  tag_id: string
  gender: string
  age_estimate: string
  health_status: string
  last_seen: string
  species_name?: string
  notes?: string
  image_url?: string
}

export async function getAnimals(): Promise<Animal[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("animals")
    .select(`
      *,
      species:species_id (name)
    `)
    .order("name")

  if (error) {
    console.error("Error fetching animals:", error)
    return []
  }

  return data.map((animal) => ({
    ...animal,
    species_name: animal.species?.name,
    last_seen: animal.last_seen ? new Date(animal.last_seen).toLocaleString() : "Unknown",
    image_url: animal.image_url,
  }))
}

export async function addAnimal(animalData: Omit<Animal, "id">) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("animals").insert([animalData]).select()

  if (error) {
    console.error("Error adding animal:", error)
    throw new Error(error.message)
  }

  return data[0]
}
