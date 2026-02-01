import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 👇 ADD THIS (server helper your app expects)
export const getSupabaseServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}
