"use client"

import { useApp } from "@/lib/context/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWeatherIcon } from "@/lib/utils/weather"
import { Cloud, Droplets, Wind, MapPin } from "lucide-react"

export function WeatherCard() {
  const { state } = useApp()

  if (!state.currentWeather) {
    return (
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <Cloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Cargando información del clima...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { temperature, description, icon, humidity, windSpeed, city } = state.currentWeather

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          Clima en {city}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img src={getWeatherIcon(icon) || "/placeholder.svg"} alt={description} className="w-16 h-16" />
            </div>
            <div>
              <div className="text-3xl font-bold text-card-foreground">{temperature}°C</div>
              <div className="text-muted-foreground capitalize">{description}</div>
            </div>
          </div>

          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Droplets className="h-4 w-4" />
              <span>{humidity}% humedad</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wind className="h-4 w-4" />
              <span>{windSpeed} m/s viento</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
