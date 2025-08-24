"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Trophy, Target, BookOpen, Zap, Star, Calendar, ArrowRight, ArrowLeft } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "¡Bienvenido a Condu+!",
      subtitle: "Tu compañero para una conducción más segura",
      content: (
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-4">
              <Shield className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg text-foreground">
              Aprende las normas de tránsito y mejora tu seguridad vial de manera divertida e interactiva.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-accent/10 rounded-lg p-4">
                <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-sm font-semibold">Lecciones cortas</p>
                <p className="text-xs text-muted-foreground">Aprende en tu tiempo libre</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold">Retos diarios</p>
                <p className="text-xs text-muted-foreground">Mantén tu conocimiento fresco</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Gana mientras aprendes",
      subtitle: "Sistema de recompensas y gamificación",
      content: (
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-4">
              <Trophy className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg text-foreground">
              Cada lección completada te acerca más a convertirte en un conductor experto.
            </p>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4 bg-card rounded-lg p-4">
                <div className="bg-primary rounded-full p-2">
                  <Star className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Puntos de experiencia</p>
                  <p className="text-sm text-muted-foreground">Gana puntos por cada actividad completada</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card rounded-lg pl-4">
                <div className="bg-accent rounded-full p-2">
                  <Trophy className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Insignias especiales</p>
                  <p className="text-sm text-muted-foreground">Desbloquea logros únicos</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card rounded-lg p-4">
                <div className="bg-secondary rounded-full p-2">
                  <Zap className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Rachas de aprendizaje</p>
                  <p className="text-sm text-muted-foreground">Mantén tu progreso constante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tu rutina de aprendizaje",
      subtitle: "Cómo funciona Condu+ día a día",
      content: (
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-6">
              <Calendar className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-foreground">
              Solo necesitas 5-10 minutos al día para mejorar tu seguridad vial.
            </p>
            <div className="space-y-6 mt-6 ml-4">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-sm">
                  1
                </div>
                <p className="text-sm">Completa tu reto diario (2-3 minutos)</p>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="bg-accent rounded-full w-8 h-8 flex items-center justify-center text-accent-foreground font-bold text-sm">
                  2
                </div>
                <p className="text-sm">Estudia una micro-lección (3-5 minutos)</p>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center text-secondary-foreground font-bold text-sm">
                  3
                </div>
                <p className="text-sm">Practica con actividades interactivas</p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4 mt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Estudia durante los tiempos de espera entre carreras para maximizar tu
                aprendizaje.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Paso {currentStep + 1} de {steps.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content card */}
        <Card className="min-h-[400px]">
          <CardContent className="p-2">
            <div className="space-y-2">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-foreground">{steps[currentStep].title}</h1>
                <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
              </div>

              {steps[currentStep].content}
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button
            onClick={nextStep}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {currentStep === steps.length - 1 ? "Comenzar" : "Siguiente"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Skip option */}
        <div className="text-center">
          <button onClick={onComplete} className="text-sm text-muted-foreground hover:text-foreground underline">
            Saltar introducción
          </button>
        </div>
      </div>
    </div>
  )
}
