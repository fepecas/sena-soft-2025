"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Edit,
  Trophy,
  Target,
  Shield,
  Flame,
  Star,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  Save,
  X,
} from "lucide-react"

interface UserProfileProps {
  onBack: () => void
  onNavigateToAchievements: () => void
}

const weeklyActivity = [
  { day: "Lun", completed: true, xp: 100 },
  { day: "Mar", completed: false, xp: 0 },
  { day: "Mie", completed: true, xp: 150 },
  { day: "Jue", completed: true, xp: 200 },
  { day: "Vie", completed: false, xp: 0 },
  { day: "Sab", completed: true, xp: 250 },
  { day: "Dom", completed: true, xp: 300 },
]

const recentBadges = [
  { id: 1, name: "Badge 1", earnedDate: "2024-01-01", icon: Shield, color: "bg-green-500" },
  { id: 2, name: "Badge 2", earnedDate: "2024-01-02", icon: Flame, color: "bg-red-500" },
  { id: 3, name: "Badge 3", earnedDate: "2024-01-03", icon: Star, color: "bg-yellow-500" },
]

export default function UserProfile({ onBack, onNavigateToAchievements }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [editableData, setEditableData] = useState({
    name: "Juan David Rodríguez",
    email: "juan.rodriguez@email.com",
  })

  const [tempData, setTempData] = useState(editableData)

  const userStats = {
    ...editableData, // Use editable data instead of hardcoded values
    level: 3,
    xp: 750,
    nextLevelXP: 1000,
    currentStreak: 7,
    longestStreak: 15,
    totalLessons: 18,
    completedModules: 2,
    totalModules: 4,
    joinDate: "Enero 2024",
    totalXP: 2150,
    averageScore: 87,
  }

  const handleSave = () => {
    setEditableData(tempData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData(editableData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Mi Perfil</h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/mototaxi-driver-avatar.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {userStats.level}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nombre completo
                      </Label>
                      <Input
                        id="name"
                        value={tempData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Correo electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={tempData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">{userStats.name}</h2>
                    <p className="text-muted-foreground">{userStats.email}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Nivel {userStats.level}
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {userStats.totalXP} XP Total
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    {userStats.currentStreak} días seguidos
                  </Badge>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{userStats.averageScore}%</div>
                <p className="text-sm text-muted-foreground">Promedio de aciertos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Progreso de Nivel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Nivel {userStats.level}</span>
                  <span>
                    {userStats.xp}/{userStats.nextLevelXP} XP
                  </span>
                </div>
                <Progress value={(userStats.xp / userStats.nextLevelXP) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {userStats.nextLevelXP - userStats.xp} XP para nivel {userStats.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                Módulos Completados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>
                    {userStats.completedModules}/{userStats.totalModules}
                  </span>
                </div>
                <Progress value={(userStats.completedModules / userStats.totalModules) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {userStats.totalModules - userStats.completedModules} módulos restantes
                </p>
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
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-secondary">{userStats.currentStreak}</div>
                <p className="text-sm text-muted-foreground">días consecutivos</p>
                <p className="text-xs text-muted-foreground">Récord: {userStats.longestStreak} días</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Actividad de la Semana
            </CardTitle>
            <CardDescription>Tu progreso en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">{day.day}</div>
                  <div
                    className={`h-12 rounded-lg flex items-center justify-center ${
                      day.completed ? "bg-accent text-accent-foreground" : "bg-muted"
                    }`}
                  >
                    {day.completed ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-foreground">{day.completed ? `${day.xp} XP` : "0 XP"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Insignias Recientes
              </div>
              <Button variant="ghost" size="sm" onClick={onNavigateToAchievements}>
                Ver todas
              </Button>
            </CardTitle>
            <CardDescription>Tus logros más recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBadges.map((badge) => {
                const IconComponent = badge.icon
                return (
                  <div key={badge.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className={`p-3 rounded-lg ${badge.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.earnedDate}</p>
                    </div>
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Estadísticas Generales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-foreground">{userStats.totalLessons}</div>
                <p className="text-sm text-muted-foreground">Lecciones completadas</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-foreground">{userStats.totalXP}</div>
                <p className="text-sm text-muted-foreground">XP total ganado</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-foreground">{userStats.longestStreak}</div>
                <p className="text-sm text-muted-foreground">Racha más larga</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-bold text-foreground">{userStats.joinDate}</div>
                <p className="text-sm text-muted-foreground">Miembro desde</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
