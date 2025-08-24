"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { OutfitGeneratorForm } from "@/components/generator/outfit-generator-form"
import { OutfitResults } from "@/components/generator/outfit-results"
import { BackButton } from "@/components/ui/back-button"
import { useApp } from "@/lib/context/app-context"
import type { GeneratedOutfit } from "@/lib/ai/outfit-generator"

export default function GeneratorPage() {
  const { state } = useApp()
  const [generatedOutfits, setGeneratedOutfits] = useState<GeneratedOutfit[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleOutfitsGenerated = (outfits: GeneratedOutfit[]) => {
    setGeneratedOutfits(outfits)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <BackButton href="/dashboard" />

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">Generador de Outfits</h1>
          <p className="text-muted-foreground">Deja que la IA cree combinaciones perfectas con tu guardarropa</p>
        </div>

        {/* Check if user has wardrobe items */}
        {state.wardrobe.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-2xl">👕</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Necesitas prendas en tu guardarropa</h3>
            <p className="text-muted-foreground mb-4">
              Agrega algunas prendas a tu guardarropa para poder generar outfits increíbles
            </p>
            <a
              href="/wardrobe"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Ir al Guardarropa
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <div>
              <OutfitGeneratorForm
                onOutfitsGenerated={handleOutfitsGenerated}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
              />
            </div>

            {/* Results */}
            <div>
              <OutfitResults outfits={generatedOutfits} isGenerating={isGenerating} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
