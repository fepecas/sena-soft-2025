"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BadgeCelebration from "./badge-celebration"
import NotificationSystem from "./notification-system"
import LogoutConfirmationModal from "./logout-confirmation-modal"
import {
  Shield,
  Trophy,
  Target,
  BookOpen,
  Zap,
  Star,
  Calendar,
  CheckCircle,
  Lock,
  Flame,
  Award,
  Settings,
  LogOut,
} from "lucide-react"

interface DashboardProps {
  onNavigateToModule: (moduleId: string) => void
  onNavigateToProfile: () => void
  onNavigateToAchievements: () => void
  onLogout: () => void
}

export default function Dashboard({
  onNavigateToModule,
  onNavigateToProfile,
  onNavigateToAchievements,
  onLogout,
}: DashboardProps) {
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailyChallengeCompleted")
      const today = new Date().toDateString()
      const savedDate = localStorage.getItem("dailyChallengeDate")

      // Reset daily challenge if it's a new day
      if (savedDate !== today) {
        localStorage.setItem("dailyChallengeDate", today)
        localStorage.removeItem("dailyChallengeCompleted")
        return false
      }

      return saved === "true"
    }
    return false
  })

  const [currentStreak, setCurrentStreak] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("currentStreak") || "7")
    }
    return 7
  })

  const [userLevel, setUserLevel] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("userLevel") || "3")
    }
    return 3
  })

  const [userXP, setUserXP] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("userXP") || "750")
    }
    return 750
  })

  const [nextLevelXP, setNextLevelXP] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(localStorage.getItem("nextLevelXP") || "1000")
    }
    return 1000
  })

  const [showBadgeCelebration, setShowBadgeCelebration] = useState(false)
  const [newBadge, setNewBadge] = useState<any>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const badges = [
    {
      id: 1,
      name: "Guerrero del Casco",
      icon: Shield,
      earned: true,
      color: "bg-accent",
      description: "Completa el módulo de uso del casco",
    },
    {
      id: 2,
      name: "Experto en Señales",
      icon: Target,
      earned: true,
      color: "bg-primary",
      description: "Domina todas las señales de tránsito",
    },
    {
      id: 3,
      name: "Racha de Fuego",
      icon: Flame,
      earned: true,
      color: "bg-secondary",
      description: "Mantén una racha de 7 días",
    },
    {
      id: 4,
      name: "Maestro de la Velocidad",
      icon: Zap,
      earned: false,
      color: "bg-muted",
      description: "Aprende sobre límites de velocidad",
    },
    {
      id: 5,
      name: "Campeón de Seguridad",
      icon: Trophy,
      earned: false,
      color: "bg-muted",
      description: "Obtén puntuación perfecta en 10 quizzes",
    },
    {
      id: 6,
      name: "Estudiante Dedicado",
      icon: BookOpen,
      earned: false,
      color: "bg-muted",
      description: "Completa 30 lecciones",
    },
  ]

  const dailyChallenge = {
    title: "Señales de tránsito",
    description: "¿Qué significa esta señal de tránsito?",
    question: "Una señal triangular con borde rojo significa:",
    options: ["Prohibición", "Advertencia de peligro", "Información", "Obligación"],
    correctAnswer: 1,
    points: 50,
  }

  const handleDailyChallengeComplete = () => {
    setDailyChallengeCompleted(true)
    setUserXP(userXP + dailyChallenge.points)

    const unlockedBadge = badges.find((badge) => !badge.earned && Math.random() > 0.7)
    if (unlockedBadge) {
      setNewBadge(unlockedBadge)
      setShowBadgeCelebration(true)
      unlockedBadge.earned = true
    }
  }

  const handleNotificationClick = (notification: any) => {
    switch (notification.type) {
      case "daily":
        document.getElementById("daily-challenge")?.scrollIntoView({ behavior: "smooth" })
        break
      case "achievement":
        onNavigateToAchievements()
        break
      case "module":
        onNavigateToModule("signals")
        break
      default:
        break
    }
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false)
    if (typeof window !== "undefined") {
      localStorage.clear()
    }
    onLogout()
  }

  const progressPercentage = (userXP / nextLevelXP) * 100

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailyChallengeCompleted", dailyChallengeCompleted.toString())
      localStorage.setItem("currentStreak", currentStreak.toString())
      localStorage.setItem("userLevel", userLevel.toString())
      localStorage.setItem("userXP", userXP.toString())
      localStorage.setItem("nextLevelXP", nextLevelXP.toString())
    }
  }, [dailyChallengeCompleted, currentStreak, userLevel, userXP, nextLevelXP])

  return (
    <div className="min-h-screen bg-background">
      {showBadgeCelebration && newBadge && (
        <BadgeCelebration
          badge={newBadge}
          onClose={() => {
            setShowBadgeCelebration(false)
            setNewBadge(null)
          }}
        />
      )}

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />

      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/mototaxi-driver-avatar.png" />
              <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground">¡Hola, Juan!</h1>
              <p className="text-sm text-muted-foreground">
                Nivel {userLevel} • {currentStreak} días seguidos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationSystem onNotificationClick={handleNotificationClick} />
            <Button variant="ghost" size="icon" onClick={onNavigateToProfile}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogoutClick}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Tu Progreso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Nivel {userLevel}</span>
                  <span>
                    {userXP}/{nextLevelXP} XP
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-xs text-muted-foreground">{nextLevelXP - userXP} XP para el siguiente nivel</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flame className="h-5 w-5 text-secondary" />
                Racha Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{currentStreak}</div>
                <p className="text-sm text-muted-foreground">días consecutivos</p>
                <p className="text-xs text-muted-foreground mt-2">¡Sigue así para mantener tu racha!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20" id="daily-challenge">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Reto del Día
              {dailyChallengeCompleted && <CheckCircle className="h-5 w-5 text-accent" />}
            </CardTitle>
            <CardDescription>{dailyChallenge.title}</CardDescription>
          </CardHeader>
          <CardContent>
            {!dailyChallengeCompleted ? (
              <div className="space-y-4">
                <p className="font-medium">{dailyChallenge.question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {dailyChallenge.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-3 text-left bg-transparent"
                      onClick={() => {
                        if (index === dailyChallenge.correctAnswer) {
                          handleDailyChallengeComplete()
                        }
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4" />+{dailyChallenge.points} XP por respuesta correcta
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <CheckCircle className="h-12 w-12 text-accent mx-auto" />
                <div>
                  <p className="font-semibold text-accent">¡Reto completado!</p>
                  <p className="text-sm text-muted-foreground">Has ganado {dailyChallenge.points} XP</p>
                </div>
                <Button variant="outline" disabled>
                  Vuelve mañana para un nuevo reto
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Tus Insignias
              </div>
              <Button variant="ghost" size="sm" onClick={onNavigateToAchievements}>
                Ver todas
              </Button>
            </CardTitle>
            <CardDescription>Colecciona insignias completando módulos y retos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {badges.map((badge) => {
                const IconComponent = badge.icon
                return (
                  <div
                    key={badge.id}
                    className={`relative p-4 rounded-lg text-center transition-all hover:scale-105 ${
                      badge.earned ? badge.color : "bg-muted"
                    } ${badge.earned ? "opacity-100" : "opacity-50"}`}
                  >
                    <IconComponent
                      className={`h-8 w-8 mx-auto mb-2 ${badge.earned ? "text-white" : "text-muted-foreground"}`}
                    />
                    <p className={`text-xs font-medium ${badge.earned ? "text-white" : "text-muted-foreground"}`}>
                      {badge.name}
                    </p>
                    {!badge.earned && <Lock className="absolute top-1 right-1 h-3 w-3 text-muted-foreground" />}
                    {badge.earned && (
                      <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Módulos de Aprendizaje
            </CardTitle>
            <CardDescription>Continúa tu educación en seguridad vial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "signals",
                  title: "Señales de Tránsito",
                  description: "Aprende todas las señales básicas",
                  progress: 80,
                  lessons: 12,
                  completedLessons: 10,
                  unlocked: true,
                  icon: Target,
                },
                {
                  id: "helmet",
                  title: "Uso del Casco",
                  description: "Importancia y tipos de cascos",
                  progress: 100,
                  lessons: 8,
                  completedLessons: 8,
                  unlocked: true,
                  icon: Shield,
                },
                {
                  id: "speed",
                  title: "Límites de Velocidad",
                  description: "Velocidades seguras en la ciudad",
                  progress: 45,
                  lessons: 10,
                  completedLessons: 4,
                  unlocked: true,
                  icon: Zap,
                },
                {
                  id: "intersections",
                  title: "Intersecciones",
                  description: "Navegación segura en cruces",
                  progress: 0,
                  lessons: 15,
                  completedLessons: 0,
                  unlocked: false,
                  icon: BookOpen,
                },
              ].map((module) => {
                const IconComponent = module.icon
                return (
                  <Card
                    key={module.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${!module.unlocked ? "opacity-60" : ""}`}
                    onClick={() => module.unlocked && onNavigateToModule(module.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            module.progress === 100 ? "bg-accent" : module.progress > 0 ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${
                              module.progress === 100
                                ? "text-accent-foreground"
                                : module.progress > 0
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{module.title}</h3>
                            {!module.unlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            {module.progress === 100 && <CheckCircle className="h-4 w-4 text-accent" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>
                                {module.completedLessons}/{module.lessons} lecciones
                              </span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
