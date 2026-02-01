"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, MapPin, Navigation, Heart, Activity } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { IntruderAlert } from "@/components/tracking/intruder-alert"
import { LeafDecoration } from "@/components/leaf-decoration"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const animalsData = [
  {
    id: "EL-001",
    name: "Tembo",
    species: "Elephant",
    position: { top: "20%", left: "30%" },
    status: "Excellent",
    image: "/majestic-african-elephant.png",
    habitat: "Savanna Grasslands",
    location: "North Region, Sector 3",
    coordinates: "2.4567°N, 34.8901°E",
    lastSeen: "2 hours ago",
    vitals: {
      heartRate: "65 bpm",
      temperature: "36.2°C",
      activity: "Normal",
    },
    alert: false,
  },
  {
    id: "LI-002",
    name: "Simba",
    species: "Lion",
    position: { top: "40%", left: "60%" },
    status: "Good",
    image: "/lion.jpg",
    habitat: "Open Woodland",
    location: "East Region, Sector 5",
    coordinates: "2.1234°N, 35.5678°E",
    lastSeen: "1 hour ago",
    vitals: {
      heartRate: "70 bpm",
      temperature: "38.1°C",
      activity: "Normal",
    },
    alert: false,
  },
  {
    id: "RH-003",
    name: "Kifaru",
    species: "Rhino",
    position: { top: "70%", left: "40%" },
    status: "Fair",
    image: "/majestic-rhino.png",
    habitat: "Wetland Marshes",
    location: "South Region, Sector 2",
    coordinates: "1.8765°N, 34.2109°E",
    lastSeen: "3 hours ago",
    vitals: {
      heartRate: "75 bpm",
      temperature: "37.5°C",
      activity: "Reduced",
    },
    alert: false,
  },
  {
    id: "TI-004",
    name: "Raja",
    species: "Tiger",
    position: { top: "50%", left: "80%" },
    status: "Poor",
    image: "/majestic-tiger.png",
    habitat: "Dense Forest",
    location: "West Region, Sector 7",
    coordinates: "2.6543°N, 34.1098°E",
    lastSeen: "30 minutes ago",
    vitals: {
      heartRate: "90 bpm",
      temperature: "39.2°C",
      activity: "Low",
    },
    alert: true,
    alertMessage: "Elevated temperature and heart rate",
  },
  {
    id: "GO-005",
    name: "Zuri",
    species: "Gorilla",
    position: { top: "30%", left: "10%" },
    status: "Critical",
    image: "/majestic-gorilla.png",
    habitat: "Mountain Forest",
    location: "North Region, Sector 1",
    coordinates: "2.9876°N, 33.5432°E",
    lastSeen: "4 hours ago",
    vitals: {
      heartRate: "95 bpm",
      temperature: "39.5°C",
      activity: "Very Low",
    },
    alert: true,
    alertMessage: "Significantly reduced activity and elevated vitals",
  },
]

export function TrackingMap() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showIntruderAlert, setShowIntruderAlert] = useState(false)
  const [showMovementAlert, setShowMovementAlert] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState<(typeof animalsData)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const intruderTimer = setTimeout(() => {
      setShowIntruderAlert(true)
    }, 5000)

    const movementTimer = setTimeout(() => {
      setShowMovementAlert(true)
    }, 10000)

    return () => {
      clearTimeout(intruderTimer)
      clearTimeout(movementTimer)
    }
  }, [])

  const handleAnimalClick = (animal: (typeof animalsData)[0]) => {
    setSelectedAnimal(animal)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
        return "bg-green-500 hover:bg-green-600"
      case "good":
        return "bg-blue-500 hover:bg-blue-600"
      case "fair":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "poor":
        return "bg-red-500 hover:bg-red-600"
      case "critical":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="space-y-6 relative">
      <LeafDecoration position="top-right" size="sm" opacity={0.1} />
      <LeafDecoration position="bottom-left" size="sm" opacity={0.1} rotation={45} />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by animal ID or tag..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="shrink-0">Find Animal</Button>
      </div>

      {showIntruderAlert && <IntruderAlert onClose={() => setShowIntruderAlert(false)} />}

      {showMovementAlert && (
        <Alert variant="destructive" className="animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unusual Movement Detected</AlertTitle>
          <AlertDescription>
            Animal ID: TI-004 (Raja) has left the safe zone. Last location: West Region, Sector 7.
          </AlertDescription>
          <div className="mt-2">
            <Button variant="destructive" size="sm">
              View Location
            </Button>
          </div>
        </Alert>
      )}

      <Card className="border-2 relative overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="h-[600px] w-full bg-gradient-to-br from-green-100 via-green-50 to-blue-50 dark:from-green-950 dark:via-slate-900 dark:to-blue-950 relative border">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="absolute top-4 left-4 bg-background/80 px-3 py-1 rounded-md text-xs font-medium border">
              North Region
            </div>
            <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-md text-xs font-medium border">
              South Region
            </div>
            <div className="absolute top-4 right-4 bg-background/80 px-3 py-1 rounded-md text-xs font-medium border">
              East Region
            </div>
            <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-md text-xs font-medium border">
              West Region
            </div>

            {animalsData.map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleAnimalClick(animal)}
                className="absolute z-10 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                style={{
                  top: animal.position.top,
                  left: animal.position.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative">
                  <Badge
                    className={`${getStatusColor(animal.status)} cursor-pointer text-xs px-2 py-1 shadow-lg ${
                      animal.alert ? "animate-pulse ring-2 ring-red-500" : ""
                    }`}
                  >
                    {animal.id}
                  </Badge>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full opacity-50"></div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedAnimal?.name} - Full Tracking Report</DialogTitle>
            <DialogDescription>
              {selectedAnimal?.species} ({selectedAnimal?.id}) - Real-time Monitoring Data
            </DialogDescription>
          </DialogHeader>

          {selectedAnimal && (
            <div className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2">
                <Image
                  src={selectedAnimal.image || "/placeholder.svg"}
                  alt={selectedAnimal.name}
                  fill
                  className="object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${getStatusColor(selectedAnimal.status)}`}>
                  {selectedAnimal.status}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Current Location</p>
                    <p className="font-medium">{selectedAnimal.location}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Coordinates</p>
                    <p className="font-medium font-mono text-sm">{selectedAnimal.coordinates}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Habitat Type</p>
                    <p className="font-medium">{selectedAnimal.habitat}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Last Seen</p>
                    <p className="font-medium">{selectedAnimal.lastSeen}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Current Vital Signs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg border flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Heart Rate</p>
                      <p className="font-semibold text-lg">{selectedAnimal.vitals.heartRate}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border flex items-center gap-3">
                    <Activity className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-semibold text-lg">{selectedAnimal.vitals.temperature}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg border flex items-center gap-3">
                    <Navigation className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Activity</p>
                      <p className="font-semibold text-lg">{selectedAnimal.vitals.activity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAnimal.alert && (
                <>
                  <Separator />
                  <Alert variant="destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="text-lg">Active Health Alert</AlertTitle>
                    <AlertDescription className="text-base mt-2">{selectedAnimal.alertMessage}</AlertDescription>
                  </Alert>
                </>
              )}

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" asChild>
                  <a href={`/animals/${selectedAnimal.id}`}>View Full Profile</a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
