"use client"

import { useApp } from "@/lib/context/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Shirt, Heart, Sparkles, ShoppingBag } from "lucide-react"

export function DashboardStats() {
  const { state } = useApp()

  const stats = [
    {
      label: "Prendas",
      value: state.wardrobe.length,
      icon: Shirt,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Favoritos",
      value: state.favorites.length,
      icon: Heart,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Outfits generados",
      value: "0", // This would be tracked in a real app
      icon: Sparkles,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Tiendas visitadas",
      value: "0", // This would be tracked in a real app
      icon: ShoppingBag,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
