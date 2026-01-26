"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/lib/context/app-context"
import type { WardrobeItem } from "@/lib/context/app-context"
import { X, Plus } from "lucide-react"

interface EditItemDialogProps {
  item: WardrobeItem
  onClose: () => void
}

export function EditItemDialog({ item, onClose }: EditItemDialogProps) {
  const { state, dispatch } = useApp()
  const [formData, setFormData] = useState({
    name: item.name,
    type: item.type,
    color: item.color,
    material: item.material,
    category: item.category,
    imageUrl: item.imageUrl,
    tags: [...item.tags],
  })
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const clothingTypes = [
    "Camiseta",
    "Camisa",
    "Blusa",
    "Suéter",
    "Chaqueta",
    "Abrigo",
    "Pantalón",
    "Jeans",
    "Falda",
    "Vestido",
    "Shorts",
    "Zapatos",
    "Botas",
    "Sandalias",
    "Tenis",
    "Accesorios",
    "Sombrero",
    "Bolso",
    "Cinturón",
  ]

  const colors = [
    "Negro",
    "Blanco",
    "Gris",
    "Azul",
    "Rojo",
    "Verde",
    "Amarillo",
    "Rosa",
    "Morado",
    "Naranja",
    "Marrón",
    "Beige",
  ]

  const materials = ["Algodón", "Poliéster", "Lana", "Seda", "Lino", "Denim", "Cuero", "Sintético", "Mezcla", "Otro"]

  const categories = [
    "Casual",
    "Formal",
    "Deportivo",
    "Elegante",
    "Trabajo",
    "Fiesta",
    "Playa",
    "Invierno",
    "Verano",
    "Entretiempo",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const updatedItem: WardrobeItem = {
      ...item,
      name: formData.name,
      type: formData.type,
      color: formData.color,
      material: formData.material,
      category: formData.category,
      imageUrl: formData.imageUrl,
      tags: formData.tags,
    }

    // Update the item in the wardrobe
    const updatedWardrobe = state.wardrobe.map((wardrobeItem) =>
      wardrobeItem.id === item.id ? updatedItem : wardrobeItem,
    )

    // This would typically be handled by a proper action, but for simplicity:
    dispatch({ type: "REMOVE_WARDROBE_ITEM", payload: item.id })
    dispatch({ type: "ADD_WARDROBE_ITEM", payload: updatedItem })

    setIsLoading(false)
    onClose()
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Editar Prenda</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la prenda *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {clothingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color *</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, color: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Material *</Label>
                <Select
                  value={formData.material}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, material: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags adicionales</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Agregar tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-secondary-foreground/70 hover:text-secondary-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
