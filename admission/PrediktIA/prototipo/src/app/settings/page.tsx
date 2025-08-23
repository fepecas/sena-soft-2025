"use client"

import type React from "react"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { AppHeader } from "@/components/app-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useTheme } from "@/contexts/theme-context"

export default function SettingsPage() {
  const [alertSensitivity, setAlertSensitivity] = useState(50)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { theme, setTheme } = useTheme()

  const getSensitivityLabel = (value: number) => {
    if (value <= 33) return "Baja"
    if (value <= 66) return "Media"
    return "Alta"
  }

  const handleSensitivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertSensitivity(Number.parseInt(e.target.value))
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <AppHeader showBackButton />

      <div className="p-4">
        {/* Notifications Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Notificaciones</h2>

          {/* Alert Sensitivity */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-base font-medium">Sensibilidad de Alertas</div>
                <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  Ajusta la sensibilidad de tus alertas
                </div>
              </div>
              <div className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-gray-600"}`}>
                {getSensitivityLabel(alertSensitivity)}
              </div>
            </div>

            {/* Sensitivity Slider */}
            <div className="relative mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={alertSensitivity}
                onChange={handleSensitivityChange}
                className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${alertSensitivity}%, ${theme === "dark" ? "#475569" : "#e5e7eb"} ${alertSensitivity}%, ${theme === "dark" ? "#475569" : "#e5e7eb"} 100%)`,
                }}
              />
              <div className="text-center text-xs mt-1" style={{ color: theme === "dark" ? "#64748b" : "#6b7280" }}>
                {alertSensitivity}%
              </div>
            </div>
          </div>
        </div>

        {/* Markets Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Mercados</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-medium">Selecciona los mercados que quieres monitorear</div>
            </div>
            <div className="text-sm text-blue-400">Todos</div>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Notificaciones</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-medium">Habilitar o deshabilitar notificaciones</div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
        </div>

        {/* Appearance Section */}
        <div className="mb-20">
          <h2 className="text-lg font-semibold mb-4">Apariencia</h2>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-medium">Tema</div>
              <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                Cambia entre temas oscuro y claro
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("dark")}
                className={`px-3 py-1 rounded text-sm ${
                  theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                Oscuro
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`px-3 py-1 rounded text-sm ${
                  theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                Claro
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
