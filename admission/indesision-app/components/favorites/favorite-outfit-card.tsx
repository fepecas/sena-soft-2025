"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/context/app-context"
import type { Outfit } from "@/lib/context/app-context"
import { Trash2, RefreshCw, Calendar, Cloud } from "lucide-react"

interface FavoriteOutfitCardProps {
  outfit: Outfit
}

export function FavoriteOutfitCard({ outfit }: FavoriteOutfitCardProps) {
  const { dispatch } = useApp()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este outfit de favoritos?")) {
      setIsDeleting(true)
      // Simulate async operation
      setTimeout(() => {
        dispatch({ type: "REMOVE_FAVORITE", payload: outfit.id })
        setIsDeleting(false)
      }, 500)
    }
  }

  const handleReuse = () => {
    // Navigate to generator with this outfit as inspiration
    // In a real app, you might pre-fill the generator form
    window.location.href = "/generator"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{outfit.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{outfit.occasion}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(outfit.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReuse}
              className="h-8 w-8 p-0 bg-transparent"
              title="Reutilizar outfit"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 w-8 p-0"
              title="Eliminar de favoritos"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Items in the outfit */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Prendas ({outfit.items.length}):</h4>
          <div className="space-y-2">
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

        {/* Description */}
        {outfit.description && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Descripción:</h4>
            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{outfit.description}</p>
          </div>
        )}

        {/* Weather info */}
        {outfit.weather && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cloud className="h-3 w-3" />
            <span>Clima: {outfit.weather}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
