"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Store } from "@/lib/data/stores"
import { ExternalLink, MapPin, Star } from "lucide-react"

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  const handleVisitStore = () => {
    window.open(store.website, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{store.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">{store.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {store.location}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{store.description}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {store.categories.slice(0, 3).map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {store.categories.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{store.categories.length - 3}
            </Badge>
          )}
        </div>

        {/* Price Range */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Rango de precios:</span>
          <span className="font-medium text-foreground">{store.priceRange}</span>
        </div>

        {/* Visit Button */}
        <Button onClick={handleVisitStore} className="w-full bg-transparent" variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Visitar Tienda
        </Button>
      </CardContent>
    </Card>
  )
}
