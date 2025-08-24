"use client"

import { Header } from "@/components/layout/header"
import { FavoritesGrid } from "@/components/favorites/favorites-grid"
import { BackButton } from "@/components/ui/back-button"
import { useApp } from "@/lib/context/app-context"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { state } = useApp()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <BackButton href="/dashboard" />

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">Mis Favoritos</h1>
          <p className="text-muted-foreground">
            {state.favorites.length} {state.favorites.length === 1 ? "outfit guardado" : "outfits guardados"}
          </p>
        </div>

        {/* Favorites Grid */}
        {state.favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No tienes outfits favoritos aún</h3>
            <p className="text-muted-foreground mb-4">
              Genera algunos outfits y guárdalos como favoritos para verlos aquí
            </p>
            <a
              href="/generator"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Generar Outfits
            </a>
          </div>
        ) : (
          <FavoritesGrid favorites={state.favorites} />
        )}
      </main>
    </div>
  )
}
