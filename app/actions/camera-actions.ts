"use server"

import { getSupabaseServerClient } from "@/lib/supabase"

export type Camera = {
  id: number
  name: string
  location: string
  location_description?: string
  camera_type?: string
  status: string
  threshold_value: number
  last_maintenance?: string
}

export async function getCameras(): Promise<Camera[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("cameras").select("*").order("name")

  if (error) {
    console.error("Error fetching cameras:", error)
    return []
  }

  return data.map((camera) => ({
    ...camera,
    location: typeof camera.location === "string" ? camera.location : `(${camera.location.x}, ${camera.location.y})`,
    last_maintenance: camera.last_maintenance ? new Date(camera.last_maintenance).toLocaleDateString() : "Not recorded",
  }))
}

export async function addCamera(cameraData: Omit<Camera, "id" | "location"> & { latitude: number; longitude: number }) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("cameras")
    .insert([
      {
        name: cameraData.name,
        location: `(${cameraData.longitude},${cameraData.latitude})`,
        location_description: cameraData.location_description,
        camera_type: cameraData.camera_type,
        status: cameraData.status,
        threshold_value: cameraData.threshold_value,
        last_maintenance: cameraData.last_maintenance,
      },
    ])
    .select()

  if (error) {
    console.error("Error adding camera:", error)
    throw new Error(error.message)
  }

  return data[0]
}

export async function updateCamera(id: number, cameraData: Partial<Camera>) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("cameras")
    .update({
      status: cameraData.status,
      threshold_value: cameraData.threshold_value,
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating camera:", error)
    throw new Error(error.message)
  }

  return data[0]
}
