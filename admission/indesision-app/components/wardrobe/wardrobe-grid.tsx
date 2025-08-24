"use client"

import type { WardrobeItem } from "@/lib/context/app-context"
import { WardrobeItemCard } from "./wardrobe-item-card"
import { Shirt } from "lucide-react"

interface WardrobeGridProps {
  items: WardrobeItem[]
}

export function WardrobeGrid({ items }: WardrobeGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <Shirt className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Tu guardarropa está vacío</h3>
        <p className="text-muted-foreground">Comienza agregando tu primera prenda para crear outfits increíbles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <WardrobeItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
