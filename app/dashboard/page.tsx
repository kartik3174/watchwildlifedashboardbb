"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AnimalDashboard } from "@/components/dashboard/animal-dashboard"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { HealthStatusDashboard } from "@/components/dashboard/health-status-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { ClientErrorBoundary } from "@/components/client-error-boundary"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import { LeafDecoration } from "@/components/leaf-decoration"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (tabParam === "health") {
      setActiveTab("health")
    } else {
      setActiveTab("overview")
    }
  }, [tabParam])

  return (
    <PageTransition>
      <div className="container mx-auto py-6 relative">
        <LeafDecoration position="top-right" size="lg" opacity={0.05} className="hidden lg:block" />
        <LeafDecoration position="bottom-left" size="md" rotation={45} opacity={0.05} className="hidden lg:block" />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <PageHeader title="Animal Dashboard" description="Monitor and track wildlife conservation data">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                asChild
                className="w-full sm:w-auto transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link href="/action-view">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Actions
                </Link>
              </Button>
            </div>
          </PageHeader>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="w-full grid grid-cols-2 h-auto">
              <TabsTrigger value="overview" className="py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="health" className="py-2">
                Health & Behavior
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ClientErrorBoundary>
                <AnimalDashboard />
              </ClientErrorBoundary>
            </TabsContent>

            <TabsContent value="health" className="mt-6">
              <ClientErrorBoundary>
                <HealthStatusDashboard />
              </ClientErrorBoundary>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageTransition>
  )
}
