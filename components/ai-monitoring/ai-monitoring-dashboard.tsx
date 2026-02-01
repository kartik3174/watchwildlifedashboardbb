"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BehavioralPatterns } from "@/components/ai-monitoring/behavioral-patterns"
import { ThreatAlerts } from "@/components/ai-monitoring/threat-alerts"
import { PredictiveInsights } from "@/components/ai-monitoring/predictive-insights"
import { ActivityTimeline } from "@/components/ai-monitoring/activity-timeline"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientErrorBoundary } from "@/components/client-error-boundary"
import { useToast } from "@/hooks/use-toast"

function AIMonitoringDashboard() {
  const [timeRange, setTimeRange] = useState<string>("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("patterns")
  const { toast } = useToast()

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const handleExport = () => {
    try {
      const timestamp = new Date().toLocaleString()
      let csvContent = `AI Monitoring Export - ${activeTab}\nGenerated: ${timestamp}\n\n`

      switch (activeTab) {
        case "patterns":
          csvContent +=
            "Tab: Behavioral Patterns\nNote: Use the export button within the Behavioral Patterns tab for detailed data."
          break
        case "threats":
          csvContent += "Tab: Threat Alerts\nNote: Threat alerts are monitored and logged in real-time."
          break
        case "insights":
          csvContent +=
            "Tab: Predictive Insights\nNote: Use the export button within the Predictive Insights tab for detailed data."
          break
        case "timeline":
          csvContent += "Tab: Activity Timeline\nNote: Timeline data shows recent activity events."
          break
      }

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `ai-monitoring-${activeTab}-${Date.now()}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: `${activeTab} data has been exported`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none bg-transparent"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="patterns" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="patterns" className="py-2">
            Behavioral Patterns
          </TabsTrigger>
          <TabsTrigger value="threats" className="py-2">
            Threat Alerts
          </TabsTrigger>
          <TabsTrigger value="insights" className="py-2">
            Predictive Insights
          </TabsTrigger>
          <TabsTrigger value="timeline" className="py-2">
            Activity Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-6">
          <ClientErrorBoundary>
            <BehavioralPatterns />
          </ClientErrorBoundary>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <ClientErrorBoundary>
            <ThreatAlerts />
          </ClientErrorBoundary>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <ClientErrorBoundary>
            <PredictiveInsights />
          </ClientErrorBoundary>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <ClientErrorBoundary>
            <ActivityTimeline timeRange={timeRange} />
          </ClientErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Export as default for dynamic import
export default AIMonitoringDashboard
