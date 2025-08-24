"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { WardrobeGrid } from "@/components/wardrobe/wardrobe-grid"
import { AddItemForm } from "@/components/wardrobe/add-item-form"
import { BackButton } from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context/app-context"
import { Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WardrobePage() {
  const { state } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterColor, setFilterColor] = useState("all")

  const filteredWardrobe = state.wardrobe.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === "all" || item.type === filterType
    const matchesColor = filterColor === "all" || item.color === filterColor

    return matchesSearch && matchesType && matchesColor
  })

  const uniqueTypes = [...new Set(state.wardrobe.map((item) => item.type))]
  const uniqueColors = [...new Set(state.wardrobe.map((item) => item.color))]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <BackButton href="/dashboard" />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Mi Guardarropa</h1>
            <p className="text-muted-foreground">
              {state.wardrobe.length} {state.wardrobe.length === 1 ? "prenda" : "prendas"} en tu colección
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Agregar Prenda
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar prendas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterColor} onValueChange={setFilterColor}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los colores</SelectItem>
                {uniqueColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Wardrobe Grid */}
        <WardrobeGrid items={filteredWardrobe} />

        {/* Add Item Form Modal */}
        {showAddForm && <AddItemForm onClose={() => setShowAddForm(false)} />}
      </main>
    </div>
  )
}
