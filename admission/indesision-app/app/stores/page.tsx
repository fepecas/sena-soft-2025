"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { StoreSearch } from "@/components/stores/store-search"
import { StoreGrid } from "@/components/stores/store-grid"
import { WardrobeSuggestions } from "@/components/stores/wardrobe-suggestions"
import { BackButton } from "@/components/ui/back-button"
import { useApp } from "@/lib/context/app-context"
import { colombianStores } from "@/lib/data/stores"

export default function StoresPage() {
  const { state } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredStores = colombianStores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || store.categories.includes(selectedCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <BackButton href="/dashboard" />

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">Tiendas</h1>
          <p className="text-muted-foreground">Descubre las mejores tiendas de moda en Colombia</p>
        </div>

        {/* Search and Filters */}
        <StoreSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Wardrobe Suggestions */}
        {state.wardrobe.length > 0 && <WardrobeSuggestions wardrobe={state.wardrobe} />}

        {/* Stores Grid */}
        <StoreGrid stores={filteredStores} />
      </main>
    </div>
  )
}
