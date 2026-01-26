"use client"

import { OutfitResultCard } from "./outfit-result-card"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"
import type { GeneratedOutfit } from "@/lib/ai/outfit-generator"

interface OutfitResultsProps {
  outfits: GeneratedOutfit[]
  isGenerating: boolean
}

export function OutfitResults({ outfits, isGenerating }: OutfitResultsProps) {
  if (isGenerating) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Creando outfits perfectos...</h3>
          <p className="text-muted-foreground text-center">
            Nuestra IA está analizando tu guardarropa y el clima para crear las mejores combinaciones
          </p>
        </CardContent>
      </Card>
    )
  }

  if (outfits.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Listo para generar outfits</h3>
          <p className="text-muted-foreground text-center">
            Completa el formulario y presiona "Generar Outfits" para ver sugerencias personalizadas
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Tus Outfits Generados</h3>
        <p className="text-muted-foreground">{outfits.length} combinaciones perfectas para ti</p>
      </div>

      <div className="space-y-4">
        {outfits.map((outfit, index) => (
          <OutfitResultCard key={index} outfit={outfit} />
        ))}
      </div>
    </div>
  )
}
