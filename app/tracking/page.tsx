import type { Metadata } from "next"
import { PageHeader } from "@/components/dashboard/page-header"
import { TrackingMap } from "@/components/tracking/tracking-map"
import { WebcamDetector } from "@/components/tracking/webcam-detector"
import { Eye } from "lucide-react"
import { LeafDecoration } from "@/components/leaf-decoration"

export const metadata: Metadata = {
  title: "Wildlife Tracking | W.A.T.C.H",
  description: "Track and monitor wildlife in real-time",
}

export default function TrackingPage() {
  return (
    <div className="container mx-auto py-6 space-y-6 relative">
      {/* Decorative leaf elements */}
      <LeafDecoration position="top-right" size="lg" opacity={0.1} className="hidden lg:block" />
      <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.1} className="hidden lg:block" />

      <PageHeader
        title="Wildlife Tracking"
        description="Monitor wildlife locations and detect intruders in real-time"
        icon={<Eye className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          <TrackingMap />
        </div>
        <div className="order-1 lg:order-2">
          <WebcamDetector />
        </div>
      </div>
    </div>
  )
}
