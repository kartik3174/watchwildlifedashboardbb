"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { HealthStatusChart } from "@/components/dashboard/health-status-chart"
import { BehavioralTrendsChart } from "@/components/dashboard/behavioral-trends-chart"
import { AnimalTable, animals } from "@/components/dashboard/animal-table"
import { useToast } from "@/hooks/use-toast"

export function AnimalDashboard() {
  const [species, setSpecies] = useState<string>("all")
  const [healthStatus, setHealthStatus] = useState<string>("all")
  const [location, setLocation] = useState<string>("all")
  const { toast } = useToast()

  const filteredAnimals = animals.filter((animal) => {
    const speciesMatch = species === "all" || animal.species.toLowerCase() === species.toLowerCase()
    const statusMatch = healthStatus === "all" || animal.status.toLowerCase() === healthStatus.toLowerCase()
    const locationMatch = location === "all" || animal.location.toLowerCase() === location.toLowerCase()
    return speciesMatch && statusMatch && locationMatch
  })

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()

      doc.setFontSize(20)
      doc.text("Wildlife Conservation Dashboard Report", 20, 20)

      doc.setFontSize(10)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30)

      doc.setFontSize(14)
      doc.text("Filters Applied:", 20, 45)
      doc.setFontSize(10)
      doc.text(`Species: ${species === "all" ? "All Species" : species}`, 20, 52)
      doc.text(`Health Status: ${healthStatus === "all" ? "All Statuses" : healthStatus}`, 20, 58)
      doc.text(`Location: ${location === "all" ? "All Locations" : location}`, 20, 64)

      doc.setFontSize(14)
      doc.text("Health Status Distribution:", 20, 80)
      const statusCounts = filteredAnimals.reduce((acc: any, animal) => {
        acc[animal.status] = (acc[animal.status] || 0) + 1
        return acc
      }, {})

      let yStatus = 87
      Object.entries(statusCounts).forEach(([status, count]) => {
        doc.text(`${status}: ${count} animals`, 20, yStatus)
        yStatus += 6
      })

      doc.setFontSize(14)
      doc.text("Behavioral Activity Patterns:", 20, 127)
      doc.setFontSize(10)
      let yBehavior = 134
      filteredAnimals.slice(0, 5).forEach((animal) => {
        doc.text(`${animal.name} (${animal.species}): ${animal.activityPattern}`, 20, yBehavior)
        yBehavior += 6
      })

      doc.setFontSize(14)
      doc.text("Monitored Animals Summary:", 20, 174)
      doc.setFontSize(10)
      let yPos = 181
      filteredAnimals.slice(0, 15).forEach((animal, index) => {
        if (yPos > 270) {
          doc.addPage()
          yPos = 20
        }
        doc.text(`${animal.name} (${animal.species}) - ${animal.status} - ${animal.location}`, 20, yPos)
        yPos += 6
      })

      doc.save(`wildlife-report-${Date.now()}.pdf`)

      toast({
        title: "Report Generated",
        description: "PDF report has been downloaded successfully",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF report",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={species} onValueChange={setSpecies}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="elephant">Elephant</SelectItem>
              <SelectItem value="lion">Lion</SelectItem>
              <SelectItem value="rhino">Rhino</SelectItem>
              <SelectItem value="tiger">Tiger</SelectItem>
              <SelectItem value="gorilla">Gorilla</SelectItem>
            </SelectContent>
          </Select>

          <Select value={healthStatus} onValueChange={setHealthStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Health Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            PDF Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
            <CardDescription>Overall health distribution of tracked animals</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthStatusChart animals={filteredAnimals} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Behavioral Trends</CardTitle>
            <CardDescription>Activity patterns over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <BehavioralTrendsChart animals={filteredAnimals} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Animals</TabsTrigger>
          <TabsTrigger value="tracked">Currently Tracked</TabsTrigger>
          <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <AnimalTable animals={filteredAnimals} />
        </TabsContent>
        <TabsContent value="tracked" className="mt-6">
          <AnimalTable filter="tracked" animals={filteredAnimals} />
        </TabsContent>
        <TabsContent value="alerts" className="mt-6">
          <AnimalTable filter="alerts" animals={filteredAnimals} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
