"use client"

import { useEffect } from "react"
import { Header } from "@/components/layout/header"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { NavigationCards } from "@/components/dashboard/navigation-cards"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { BackButton } from "@/components/ui/back-button"
import { useApp } from "@/lib/context/app-context"
import { getWeather } from "@/lib/utils/weather"

export default function DashboardPage() {
  const { state, dispatch } = useApp()

  useEffect(() => {
    // Fetch weather data when component mounts
    if (state.user?.location && !state.currentWeather) {
      getWeather(state.user.location).then((weather) => {
        if (weather) {
          dispatch({ type: "SET_WEATHER", payload: weather })
        }
      })
    }
  }, [state.user?.location, state.currentWeather, dispatch])

  if (!state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Cargando...</h2>
          <p className="text-muted-foreground">Accediendo a tu perfil</p>
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <BackButton href="/" />

        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            {getGreeting()}, {state.user.name}
          </h1>
          <p className="text-muted-foreground">¿Qué te gustaría vestir hoy? Déjame ayudarte a decidir</p>
        </div>

        {/* Weather Card */}
        <WeatherCard />

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Navigation Cards */}
        <NavigationCards />
      </main>
    </div>
  )
}
