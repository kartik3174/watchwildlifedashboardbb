"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthUpdates } from "@/components/animal-care/health-updates"
import { CareRecommendations } from "@/components/animal-care/care-recommendations"
import { VeterinaryHistory } from "@/components/animal-care/veterinary-history"

export function AnimalCareHub() {
  return (
    <Tabs defaultValue="health" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="health">Health Updates</TabsTrigger>
        <TabsTrigger value="recommendations">Care Recommendations</TabsTrigger>
        <TabsTrigger value="history">Veterinary History</TabsTrigger>
      </TabsList>

      <TabsContent value="health" className="space-y-6">
        <HealthUpdates />
      </TabsContent>

      <TabsContent value="recommendations" className="space-y-6">
        <CareRecommendations />
      </TabsContent>

      <TabsContent value="history" className="space-y-6">
        <VeterinaryHistory />
      </TabsContent>
    </Tabs>
  )
}
