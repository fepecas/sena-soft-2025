"use client"

import { ArrowRight, Bell, AlertTriangle, TrendingUp, DollarSign, Building2 } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useTheme } from "@/contexts/theme-context"

const notifications = [
  {
    title: "La Reserva Federal Mantiene Estables las Tasas de Interés",
    date: "2024-06-15",
    source: "Reserva Federal",
    description:
      "La Reserva Federal anunció que mantendrá las tasas de interés actuales, citando preocupaciones sobre la estabilidad económica.",
    type: "info",
    icon: Building2,
    priority: "medium",
  },
  {
    title: "Alerta de Volatilidad del Mercado",
    date: "2024-06-14",
    source: "PrediktIA AI",
    description: "Se detectaron patrones de trading inusuales en el sector tecnológico. Monitoreando posibles riesgos.",
    type: "warning",
    icon: AlertTriangle,
    priority: "high",
  },
  {
    title: "La Tasa de Desempleo Se Mantiene Baja en 3.7%",
    date: "2024-06-14",
    source: "Oficina de Estadísticas Laborales",
    description: "Los últimos datos de empleo muestran fortaleza continua en el mercado laboral con desempleo estable.",
    type: "positive",
    icon: TrendingUp,
    priority: "low",
  },
  {
    title: "El Tesoro Anuncia Nueva Emisión de Bonos",
    date: "2024-06-13",
    source: "Departamento del Tesoro",
    description:
      "El Departamento del Tesoro emitirá nuevos bonos a 10 años para financiar proyectos de infraestructura.",
    type: "info",
    icon: DollarSign,
    priority: "medium",
  },
  {
    title: "Crecimiento del PIB Revisado al Alza a 2.5%",
    date: "2024-06-11",
    source: "Oficina de Análisis Económico",
    description:
      "Las cifras trimestrales del PIB muestran un rendimiento económico más fuerte de lo esperado en múltiples sectores.",
    type: "positive",
    icon: TrendingUp,
    priority: "low",
  },
]

export default function AnnouncementsPage() {
  const { theme } = useTheme()

  const getNotificationColors = (type: string, priority: string) => {
    if (theme === "dark") {
      switch (type) {
        case "warning":
          return "bg-amber-900/20 border-amber-500/30 text-amber-200"
        case "positive":
          return "bg-green-900/20 border-green-500/30 text-green-200"
        default:
          return "bg-slate-800 border-slate-700 text-white"
      }
    } else {
      switch (type) {
        case "warning":
          return "bg-amber-50 border-amber-200 text-amber-800"
        case "positive":
          return "bg-green-50 border-green-200 text-green-800"
        default:
          return "bg-white border-gray-200 text-gray-900"
      }
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-amber-500"
      case "positive":
        return "text-green-500"
      default:
        return theme === "dark" ? "text-blue-400" : "text-blue-500"
    }
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <AppHeader showBackButton />

      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Bell className={`w-5 h-5 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
          <h2 className="text-lg font-semibold">Notificaciones</h2>
        </div>

        <div className="space-y-3 mb-20">
          {notifications.map((notification, index) => {
            const IconComponent = notification.icon
            return (
              <div
                key={index}
                className={`${getNotificationColors(notification.type, notification.priority)} rounded-xl p-4 border transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-slate-700" : "bg-gray-100"} flex-shrink-0`}>
                    <IconComponent className={`w-4 h-4 ${getIconColor(notification.type)}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold leading-tight pr-2">{notification.title}</h3>
                      {notification.priority === "high" && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                        {notification.date}
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-gray-100 text-gray-600"}`}
                      >
                        {notification.source}
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-gray-600"}`}>
                      {notification.description}
                    </p>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-400"} flex-shrink-0 mt-1`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
