"use server"

import { getSupabaseServerClient } from "@/lib/supabase"

export type Species = {
  id: number
  name: string
  scientific_name: string
  conservation_status: string
  description: string
}

export async function getSpecies(): Promise<Species[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("species").select("*").order("name")

  if (error) {
    console.error("Error fetching species:", error)
    return []
  }

  return data || []
}
