"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shirt, Sparkles, Heart, ShoppingBag, ArrowRight } from "lucide-react"

export function NavigationCards() {
  const navigationItems = [
    {
      title: "Mi Guardarropa",
      description: "Gestiona y organiza todas tus prendas",
      icon: Shirt,
      href: "/wardrobe",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      title: "Generar Outfit",
      description: "Crea combinaciones perfectas con IA",
      icon: Sparkles,
      href: "/generator",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
    },
    {
      title: "Favoritos",
      description: "Tus outfits guardados y preferidos",
      icon: Heart,
      href: "/favorites",
      color: "from-accent/20 to-accent/5",
      iconColor: "text-accent",
    },
    {
      title: "Tiendas",
      description: "Descubre nuevas prendas y tendencias",
      icon: ShoppingBag,
      href: "/stores",
      color: "from-muted to-muted/50",
      iconColor: "text-muted-foreground",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-semibold text-foreground">¿Qué quieres hacer hoy?</h2>
        <p className="text-muted-foreground mt-1">Explora todas las funciones de tu asistente de moda</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {navigationItems.map((item, index) => (
          <Card
            key={index}
            className={`bg-gradient-to-br ${item.color} border-border/50 hover:shadow-lg transition-all duration-200 group`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-background/80 ${item.iconColor}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <CardTitle className="text-xl font-semibold text-card-foreground">{item.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start p-0 h-auto font-medium hover:bg-transparent"
              >
                <Link href={item.href} className="block">
                  Explorar
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
