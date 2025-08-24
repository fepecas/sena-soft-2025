"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/context/app-context"
import type { GeneratedOutfit } from "@/lib/ai/outfit-generator"
import { Heart, Check } from "lucide-react"

interface OutfitResultCardProps {
  outfit: GeneratedOutfit
}

export function OutfitResultCard({ outfit }: OutfitResultCardProps) {
  const { state, dispatch } = useApp()
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveToFavorites = () => {
    const favoriteOutfit = {
      id: Date.now().toString(),
      name: outfit.name,
      items: outfit.items,
      occasion: outfit.occasion || "General",
      description: outfit.justification,
      weather: state.currentWeather?.description || "",
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: "ADD_FAVORITE", payload: favoriteOutfit })
    setIsSaved(true)

    // Reset after 2 seconds
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{outfit.name}</CardTitle>
            {outfit.occasion && (
              <Badge variant="secondary" className="mt-1">
                {outfit.occasion}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveToFavorites}
              disabled={isSaved}
              className="flex items-center gap-1 bg-transparent"
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4" />
                  Guardado
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  Guardar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Items in the outfit */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Prendas incluidas:</h4>
          <div className="grid grid-cols-2 gap-2">
            {outfit.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs">👕</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color} {item.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Justification */}
        {outfit.justification && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">¿Por qué esta combinación?</h4>
            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{outfit.justification}</p>
          </div>
        )}

        {/* Weather consideration */}
        {state.currentWeather && (
          <div className="text-xs text-muted-foreground">
            Considerando: {state.currentWeather.temperature}°C, {state.currentWeather.description}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
