"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WardrobeItem } from "@/lib/context/app-context"
import { Lightbulb, TrendingUp } from "lucide-react"

interface WardrobeSuggestionsProps {
  wardrobe: WardrobeItem[]
}

export function WardrobeSuggestions({ wardrobe }: WardrobeSuggestionsProps) {
  // Analyze wardrobe to suggest missing items
  const analyzeWardrobe = () => {
    const types = wardrobe.map((item) => item.type)
    const colors = wardrobe.map((item) => item.color)
    const categories = wardrobe.map((item) => item.category)

    const suggestions = []

    // Basic wardrobe essentials
    const essentials = ["Camiseta", "Pantalón", "Zapatos", "Chaqueta"]
    const missingEssentials = essentials.filter(
      (essential) => !types.some((type) => type.toLowerCase().includes(essential.toLowerCase())),
    )

    if (missingEssentials.length > 0) {
      suggestions.push({
        type: "Básicos faltantes",
        items: missingEssentials,
        reason: "Estas prendas básicas completarían tu guardarropa",
      })
    }

    // Color suggestions
    const basicColors = ["Negro", "Blanco", "Gris"]
    const missingColors = basicColors.filter((color) => !colors.includes(color))

    if (missingColors.length > 0) {
      suggestions.push({
        type: "Colores básicos",
        items: missingColors.map((color) => `Prendas en ${color}`),
        reason: "Los colores neutros son versátiles para cualquier ocasión",
      })
    }

    // Category suggestions
    const hasFormale = categories.includes("Formal")
    const hasCasual = categories.includes("Casual")

    if (!hasFormale) {
      suggestions.push({
        type: "Ropa formal",
        items: ["Camisa formal", "Pantalón de vestir", "Zapatos formales"],
        reason: "Para ocasiones especiales y trabajo",
      })
    }

    if (!hasCasual) {
      suggestions.push({
        type: "Ropa casual",
        items: ["Camisetas básicas", "Jeans", "Tenis"],
        reason: "Para el día a día y comodidad",
      })
    }

    return suggestions.slice(0, 2) // Limit to 2 suggestions
  }

  const suggestions = analyzeWardrobe()

  if (suggestions.length === 0) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-primary" />
          Sugerencias para tu Guardarropa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <h4 className="font-medium text-card-foreground">{suggestion.type}</h4>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {suggestion.items.map((item, itemIndex) => (
                <Badge key={itemIndex} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
          </div>
        ))}
        <div className="text-xs text-muted-foreground mt-4">
          💡 Busca estas prendas en las tiendas de abajo para completar tu estilo
        </div>
      </CardContent>
    </Card>
  )
}
