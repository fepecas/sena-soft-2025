"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Sparkles } from "lucide-react"

interface BadgeCelebrationProps {
  badge: {
    id: number
    name: string
    description: string
    icon: React.ComponentType<any>
    color: string
  }
  onClose: () => void
}

export default function BadgeCelebration({ badge, onClose }: BadgeCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  const IconComponent = badge.icon

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card
        className={`max-w-sm w-full transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <CardContent className="p-8 text-center space-y-6">
          {/* Animated sparkles */}
          <div className="relative">
            <div className="absolute -top-2 -left-2 animate-bounce">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce delay-150">
              <Star className="h-5 w-5 text-accent" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
              <Star className="h-4 w-4 text-secondary" />
            </div>
            <div className="absolute -bottom-2 -right-2 animate-bounce delay-75">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            {/* Badge icon */}
            <div className={`${badge.color} rounded-full p-6 mx-auto animate-pulse`}>
              <IconComponent className="h-16 w-16 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">¡Nueva Insignia!</h2>
            <h3 className="text-xl font-semibold text-primary">{badge.name}</h3>
            <p className="text-muted-foreground">{badge.description}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-accent">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">+100 XP Bonus</span>
          </div>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            ¡Genial!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
