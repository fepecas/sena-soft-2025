"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bike, Shield, Trophy, Users, LogOut } from "lucide-react"
import Onboarding from "@/components/onboarding"
import Dashboard from "@/components/dashboard"
import LearningModule from "@/components/learning-module"
import AchievementsPage from "@/components/achievements-page"
import UserProfile from "@/components/user-profile"
import LogoutConfirmationModal from "@/components/logout-confirmation-modal"

export default function WelcomePage() {
  const [currentView, setCurrentView] = useState<
    "welcome" | "onboarding" | "dashboard" | "module" | "profile" | "achievements"
  >(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("motoSeguroCurrentView") as any) || "welcome"
    }
    return "welcome"
  })

  const [currentModuleId, setCurrentModuleId] = useState<string>("")
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState([])
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("motoSeguroCurrentView", currentView)
    }
  }, [currentView])

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("motoSeguroCurrentView")
    }
    setShowLogoutModal(false)
    setCurrentView("welcome")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentView("onboarding")
  }

  const handleOnboardingComplete = () => {
    setCurrentView("dashboard")
  }

  const handleGuestAccess = () => {
    setCurrentView("onboarding")
  }

  const handleNavigateToModule = (moduleId: string) => {
    setCurrentModuleId(moduleId)
    setCurrentView("module")
  }

  const handleNavigateToProfile = () => {
    setCurrentView("profile")
  }

  const handleNavigateToAchievements = () => {
    setCurrentView("achievements")
  }

  const handleModuleComplete = (moduleId: string, xpEarned: number) => {
    console.log(`Module ${moduleId} completed! XP earned: ${xpEarned}`)
    setCurrentView("dashboard")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
  }

  if (currentView === "onboarding") {
    return (
      <div>
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogoutClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
        <LogoutConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  if (currentView === "dashboard") {
    return (
      <Dashboard
        onNavigateToModule={handleNavigateToModule}
        onNavigateToProfile={handleNavigateToProfile}
        onNavigateToAchievements={handleNavigateToAchievements}
        onLogout={handleLogoutConfirm}
      />
    )
  }

  if (currentView === "module") {
    return (
      <div>
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogoutClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
        <LogoutConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
        <LearningModule moduleId={currentModuleId} onBack={handleBackToDashboard} onComplete={handleModuleComplete} />
      </div>
    )
  }

  if (currentView === "achievements") {
    return (
      <div>
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogoutClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
        <LogoutConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
        <AchievementsPage onBack={handleBackToDashboard} />
      </div>
    )
  }

  if (currentView === "profile") {
    return (
      <div>
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogoutClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
        <LogoutConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
        <UserProfile onBack={handleBackToDashboard} onNavigateToAchievements={handleNavigateToAchievements} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 py-px">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-4">
              <Bike className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Condu+</h1>
            <p className="text-muted-foreground mt-2">Aprende seguridad vial de forma divertida</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm font-semibold text-foreground">5,000+</p>
            <p className="text-xs text-muted-foreground">Usuarios</p>
          </div>
          <div className="space-y-1 leading-3">
            <div className="flex justify-center">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm font-semibold text-foreground">50+</p>
            <p className="text-xs text-muted-foreground">Lecciones</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">20+</p>
            <p className="text-xs text-muted-foreground">Insignias</p>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</CardTitle>
            <CardDescription>
              {isLogin ? "Continúa tu aprendizaje en seguridad vial" : "Únete a la comunidad de mototaxistas seguros"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardContent className="pt-6">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={handleGuestAccess}
            >
              Continuar como invitado
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">Explora algunas lecciones sin registrarte</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
