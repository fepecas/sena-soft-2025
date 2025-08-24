"use client"

import type { Outfit } from "@/lib/context/app-context"
import { FavoriteOutfitCard } from "./favorite-outfit-card"

interface FavoritesGridProps {
  favorites: Outfit[]
}

export function FavoritesGrid({ favorites }: FavoritesGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((outfit) => (
        <FavoriteOutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </div>
  )
}
