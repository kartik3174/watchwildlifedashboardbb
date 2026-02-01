import type { Metadata } from "next"
import { BarChart3 } from "lucide-react" // Changed to a valid icon
import { PageHeader } from "@/components/dashboard/page-header"
import { AnalyticsOverview } from "@/components/tools/analytics-overview"
import { LeafDecoration } from "@/components/leaf-decoration"

export const metadata: Metadata = {
  title: "Analytics | W.A.T.C.H",
  description: "Advanced analytics and insights for wildlife conservation data",
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6 relative">
      <LeafDecoration position="top-right" size="lg" opacity={0.05} className="hidden lg:block" />
      <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.05} className="hidden lg:block" />

      <PageHeader
        title="Conservation Analytics"
        description="Advanced data analysis and insights for wildlife conservation"
        icon={<BarChart3 className="h-6 w-6 text-forest-green" />}
      />
      <AnalyticsOverview />
    </div>
  )
}
