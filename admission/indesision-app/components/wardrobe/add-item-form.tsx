"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/lib/context/app-context"
import { X, Upload, Plus, ImageIcon } from "lucide-react"

interface AddItemFormProps {
  onClose: () => void
}

export function AddItemForm({ onClose }: AddItemFormProps) {
  const { dispatch } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    color: "",
    material: "",
    category: "",
    imageUrl: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setFormData((prev) => ({ ...prev, imageUrl: "" })) // Clear URL input when file is selected
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    let imageUrl = formData.imageUrl

    if (selectedFile) {
      // In a real app, this would upload to cloud storage (Vercel Blob, Cloudinary, etc.)
      // For now, we'll use the preview URL
      imageUrl = previewUrl
    } else if (!imageUrl) {
      imageUrl = `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(formData.name + " " + formData.type)}`
    }

    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      color: formData.color,
      material: formData.material,
      category: formData.category,
      imageUrl,
      tags: formData.tags,
    }

    dispatch({ type: "ADD_WARDROBE_ITEM", payload: newItem })
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
          <CardTitle>Agregar Nueva Prenda</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Imagen de la prenda</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl("")
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                    >
                      Cambiar imagen
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Sube una imagen desde tu dispositivo o ingresa una URL
                    </p>

                    <div className="space-y-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Seleccionar archivo
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">o</span>
                        </div>
                      </div>

                      <Input
                        type="url"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la prenda *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Camiseta básica blanca"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
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
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, color: value }))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el color" />
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
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, material: value }))} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el material" />
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
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la categoría" />
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
                {isLoading ? "Guardando..." : "Agregar Prenda"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
