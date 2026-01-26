"use client"

import { useState } from "react"
import Image from "next/image"
import type { WardrobeItem } from "@/lib/context/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditItemDialog } from "./edit-item-dialog"
import { useApp } from "@/lib/context/app-context"
import { Edit, Trash2 } from "lucide-react"

interface WardrobeItemCardProps {
  item: WardrobeItem
}

export function WardrobeItemCard({ item }: WardrobeItemCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { dispatch } = useApp()

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta prenda?")) {
      dispatch({ type: "REMOVE_WARDROBE_ITEM", payload: item.id })
    }
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={item.imageUrl || "/placeholder.svg?height=300&width=300&query=clothing item"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
            <Button size="sm" variant="secondary" onClick={() => setShowEditDialog(true)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete} className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-card-foreground truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {item.type} • {item.color}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {item.material}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
          </div>

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {showEditDialog && <EditItemDialog item={item} onClose={() => setShowEditDialog(false)} />}
    </>
  )
}
