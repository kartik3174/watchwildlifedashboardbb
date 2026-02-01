"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export type Alert = {
  id: number
  animal_id?: number
  animal_name?: string
  alert_type: string
  severity: string
  message: string
  location?: string
  status: string
  created_at: string
  latitude?: number
  longitude?: number
}

export async function getAlerts(limit = 10, includeResolved = false): Promise<Alert[]> {
  const supabase = getSupabaseServerClient()

  let query = supabase
    .from("alerts")
    .select(`
      *,
      animal:animal_id (name)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (!includeResolved) {
    query = query.eq("status", "active")
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching alerts:", error)
    return []
  }

  return data.map((alert) => ({
    id: alert.id,
    animal_id: alert.animal_id,
    animal_name: alert.animal?.name,
    alert_type: alert.alert_type,
    severity: alert.severity,
    message: alert.message,
    location: alert.location,
    status: alert.status,
    created_at: new Date(alert.created_at).toLocaleString(),
    latitude: alert.latitude,
    longitude: alert.longitude,
  }))
}

export async function resolveAlert(alertId: number) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("alerts")
    .update({
      status: "resolved",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", alertId)
    .select()

  if (error) {
    console.error("Error resolving alert:", error)
    throw new Error(error.message)
  }

  return data[0]
}
