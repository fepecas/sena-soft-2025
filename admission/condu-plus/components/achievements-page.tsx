"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Lock, Trophy, Target, Shield, Flame, Zap, BookOpen, Award, Star, Calendar } from "lucide-react"

interface AchievementsPageProps {
  onBack: () => void
}

export default function AchievementsPage({ onBack }: AchievementsPageProps) {
  const achievementCategories = [
    {
      title: "Seguridad Vial",
      achievements: [
        {
          id: 1,
          name: "Guerrero del Casco",
          description: "Completa el módulo de uso del casco",
          icon: Shield,
          earned: true,
          color: "bg-accent",
          progress: 100,
          requirement: "Completar módulo 'Uso del Casco'",
        },
        {
          id: 2,
          name: "Experto en Señales",
          description: "Domina todas las señales de tránsito",
          icon: Target,
          earned: true,
          color: "bg-primary",
          progress: 100,
          requirement: "Completar módulo 'Señales de Tránsito'",
        },
        {
          id: 3,
          name: "Maestro de la Velocidad",
          description: "Aprende sobre límites de velocidad",
          icon: Zap,
          earned: false,
          color: "bg-muted",
          progress: 45,
          requirement: "Completar módulo 'Límites de Velocidad'",
        },
      ],
    },
    {
      title: "Constancia",
      achievements: [
        {
          id: 4,
          name: "Racha de Fuego",
          description: "Mantén una racha de 7 días",
          icon: Flame,
          earned: true,
          color: "bg-secondary",
          progress: 100,
          requirement: "7 días consecutivos de actividad",
        },
        {
          id: 5,
          name: "Estudiante Dedicado",
          description: "Completa 30 lecciones",
          icon: BookOpen,
          earned: false,
          color: "bg-muted",
          progress: 60,
          requirement: "18/30 lecciones completadas",
        },
        {
          id: 6,
          name: "Madrugador",
          description: "Completa retos antes de las 8 AM",
          icon: Calendar,
          earned: false,
          color: "bg-muted",
          progress: 20,
          requirement: "Completar 5 retos matutinos",
        },
      ],
    },
    {
      title: "Excelencia",
      achievements: [
        {
          id: 7,
          name: "Campeón de Seguridad",
          description: "Obtén puntuación perfecta en 10 quizzes",
          icon: Trophy,
          earned: false,
          color: "bg-muted",
          progress: 30,
          requirement: "3/10 quizzes perfectos",
        },
        {
          id: 8,
          name: "Estrella Dorada",
          description: "Alcanza el nivel 10",
          icon: Star,
          earned: false,
          color: "bg-muted",
          progress: 30,
          requirement: "Nivel actual: 3/10",
        },
        {
          id: 9,
          name: "Leyenda Vial",
          description: "Completa todos los módulos disponibles",
          icon: Award,
          earned: false,
          color: "bg-muted",
          progress: 50,
          requirement: "2/4 módulos completados",
        },
      ],
    },
  ]

  const totalAchievements = achievementCategories.reduce((total, category) => total + category.achievements.length, 0)
  const earnedAchievements = achievementCategories.reduce(
    (total, category) => total + category.achievements.filter((a) => a.earned).length,
    0,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Logros e Insignias</h1>
              <p className="text-sm text-muted-foreground">
                {earnedAchievements} de {totalAchievements} insignias obtenidas
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{Math.round((earnedAchievements / totalAchievements) * 100)}%</p>
            <Progress value={(earnedAchievements / totalAchievements) * 100} className="w-32 h-2 mt-1" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {achievementCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.achievements.map((achievement) => {
                const IconComponent = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`relative overflow-hidden ${achievement.earned ? "border-accent" : "border-border"}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${achievement.color}`}>
                          <IconComponent
                            className={`h-8 w-8 ${achievement.earned ? "text-white" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                          {!achievement.earned && (
                            <Lock className="absolute top-4 right-4 h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <CardDescription>{achievement.description}</CardDescription>

                      {!achievement.earned && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-medium">{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">{achievement.requirement}</p>
                        </div>
                      )}

                      {achievement.earned && (
                        <div className="flex items-center gap-2 text-accent">
                          <Trophy className="h-4 w-4" />
                          <span className="text-sm font-semibold">¡Completado!</span>
                        </div>
                      )}
                    </CardContent>

                    {achievement.earned && (
                      <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-2 py-1 text-xs font-bold rounded-bl-lg">
                        ✓
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
