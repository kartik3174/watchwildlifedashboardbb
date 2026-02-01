import type { Metadata } from "next"
import { PageHeader } from "@/components/dashboard/page-header"
import { TrackingMap } from "@/components/tracking/tracking-map"
import { WebcamDetector } from "@/components/tracking/webcam-detector"
import { Eye } from "lucide-react"
import { LeafDecoration } from "@/components/leaf-decoration"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Wildlife Tracking | W.A.T.C.H",
  description: "Track and monitor wildlife in real-time",
}

export default async function TrackingPage() {
  const supabase = createClient()

  // 🔥 Fetch camera locations from database
  const { data: cameras } = await supabase
    .from("cameras")
    .select("id, location")

  return (
    <div className="container mx-auto py-6 space-y-6 relative">
      <LeafDecoration position="top-right" size="lg" opacity={0.1} className="hidden lg:block" />
      <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.1} className="hidden lg:block" />

      <PageHeader
        title="Wildlife Tracking"
        description="Monitor wildlife locations and detect intruders in real-time"
        icon={<Eye className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          {/* Pass cameras to map */}
          <TrackingMap cameras={cameras || []} />
        </div>
        <div className="order-1 lg:order-2">
          <WebcamDetector />
        </div>
      </div>
    </div>
  )
}
