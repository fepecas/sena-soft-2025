"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/lib/context/app-context"
import { generateOutfits, type GeneratedOutfit } from "@/lib/ai/outfit-generator"
import { getWeather } from "@/lib/utils/weather"
import { Sparkles, Cloud, MapPin, Thermometer } from "lucide-react"

interface OutfitGeneratorFormProps {
  onOutfitsGenerated: (outfits: GeneratedOutfit[]) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function OutfitGeneratorForm({ onOutfitsGenerated, isGenerating, setIsGenerating }: OutfitGeneratorFormProps) {
  const { state, dispatch } = useApp()
  const [formData, setFormData] = useState({
    occasion: "",
    description: "",
  })

  const occasions = [
    "Casual",
    "Trabajo",
    "Fiesta",
    "Gym",
    "Cita romántica",
    "Reunión formal",
    "Salida nocturna",
    "Brunch",
    "Viaje",
    "Otro",
  ]

  // Update weather when component mounts
  useEffect(() => {
    if (state.user?.location && !state.currentWeather) {
      getWeather(state.user.location).then((weather) => {
        if (weather) {
          dispatch({ type: "SET_WEATHER", payload: weather })
        }
      })
    }
  }, [state.user?.location, state.currentWeather, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.occasion) return

    setIsGenerating(true)

    try {
      const outfits = await generateOutfits({
        wardrobe: state.wardrobe,
        occasion: formData.occasion,
        description: formData.description,
        weather: state.currentWeather,
        userStyle: state.user?.style || "Casual",
        userGender: state.user?.gender || "Unisex",
      })

      onOutfitsGenerated(outfits)
    } catch (error) {
      console.error("Error generating outfits:", error)
      // In a real app, you'd show an error message to the user
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Crear Outfit Perfecto
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Weather Display */}
        {state.currentWeather && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Clima actual</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{state.currentWeather.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{state.currentWeather.temperature}°C</span>
                <span className="text-sm text-muted-foreground capitalize">{state.currentWeather.description}</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Occasion Selection */}
          <div className="space-y-2">
            <Label htmlFor="occasion">Ocasión *</Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, occasion: value }))} required>
              <SelectTrigger>
                <SelectValue placeholder="¿Para qué ocasión necesitas el outfit?" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map((occasion) => (
                  <SelectItem key={occasion} value={occasion}>
                    {occasion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción adicional</Label>
            <Textarea
              id="description"
              placeholder="Ej: Quiero algo cómodo pero elegante, con colores neutros..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* User Info Display */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Tu perfil:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>Estilo: {state.user?.style}</div>
              <div>Identidad: {state.user?.gender}</div>
              <div>Prendas disponibles: {state.wardrobe.length}</div>
              <div>Ubicación: {state.user?.location}</div>
            </div>
          </div>

          {/* Generate Button */}
          <Button type="submit" className="w-full" disabled={isGenerating || !formData.occasion}>
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generando outfits mágicos...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generar Outfits
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
