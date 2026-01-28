"use client"

import { useState, useEffect } from "react"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, ResponsiveContainer, BarChart, Bar } from "recharts"
import { AppHeader } from "@/components/app-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useTheme } from "@/contexts/theme-context"

const marketOverviewData = [
  { month: "Ene", value: 100 },
  { month: "Feb", value: 105 },
  { month: "Mar", value: 98 },
  { month: "Abr", value: 110 },
  { month: "May", value: 115 },
  { month: "Jun", value: 108 },
]

const candlestickData = [
  { day: 1, open: 100, high: 110, low: 95, close: 105, volume: 1000 },
  { day: 2, open: 105, high: 115, low: 100, close: 112, volume: 1200 },
  { day: 3, open: 112, high: 118, low: 108, close: 115, volume: 900 },
  { day: 4, open: 115, high: 120, low: 110, close: 118, volume: 1100 },
  { day: 5, open: 118, high: 125, low: 115, close: 122, volume: 1300 },
]

const favorites = [
  { name: "TechCorp", price: "$2,847", change: "+2.3%", progress: 60, positive: true },
  { name: "EnergyCo", price: "$201.50", change: "-1.2%", progress: 40, positive: false },
  { name: "FinanceInc", price: "$78.90", change: "+0.8%", progress: 80, positive: true },
]

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketValue, setMarketValue] = useState(0.5)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setMarketValue((prev) => prev + (Math.random() - 0.5) * 0.1)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <AppHeader />

      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Market Overview Section */}
          <div className="mb-6">
            <div className="mb-4">
              <h3 className={`text-sm mb-1 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>Hoy</h3>
              <h2 className="text-lg font-semibold mb-2">Resumen del Mercado</h2>
              <div className="text-2xl font-bold text-green-400 mb-1">+{marketValue.toFixed(1)}%</div>
              <div className="text-sm text-green-400">24h +{marketValue.toFixed(1)}%</div>
            </div>

            {/* Market Chart */}
            <div className="mb-8">
              <ChartContainer
                config={{
                  value: {
                    label: "Valor del Mercado",
                    color: "rgb(59, 130, 246)",
                  },
                }}
                className="h-48"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketOverviewData}>
                    <Line type="monotone" dataKey="value" stroke="rgb(59, 130, 246)" strokeWidth={2} dot={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: theme === "dark" ? "#64748b" : "#6b7280" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Favoritos</h3>
            <div className="space-y-4">
              {favorites.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white border border-gray-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                        {item.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-20 h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-slate-700" : "bg-gray-200"}`}
                      >
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className="text-sm w-8 text-right">{item.progress}</span>
                    </div>
                    <div className={`text-sm font-medium ${item.positive ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Filtered News Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Noticias Filtradas por IA</h3>

            {/* Candlestick Chart */}
            <div className="mb-4">
              <ChartContainer
                config={{
                  volume: {
                    label: "Volumen",
                    color: "rgb(34, 197, 94)",
                  },
                }}
                className="h-32"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={candlestickData}>
                    <Bar dataKey="volume" fill="rgb(34, 197, 94)" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: theme === "dark" ? "#64748b" : "#6b7280" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className={`text-sm mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
              ¿Colapso del Mercado Inminente?
            </div>
            <div className={`text-xs mb-4 ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
              La IA predice una posible caída en el sector tecnológico
            </div>

            {/* Energy News with Oil Drop Image */}
            <div
              className={`rounded-lg p-4 mb-4 ${theme === "dark" ? "bg-slate-800" : "bg-white border border-gray-200"}`}
            >
              <div className="flex items-center gap-3">
                <img src="/images/oil-drop.png" alt="Gota de petróleo" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <div className="text-sm font-medium">Auge del Sector Energético</div>
                  <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Se espera que los precios del petróleo suban debido a tensiones geopolíticas
                  </div>
                </div>
              </div>
            </div>

            {/* Market Sentiment */}
            <div>
              <h4 className="text-sm font-medium mb-2">Sentimiento del Mercado</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>Alcista</div>
                <div
                  className={`flex-1 h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-slate-700" : "bg-gray-200"}`}
                >
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>75%</div>
              </div>
              <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                El sentimiento general del mercado se mantiene cautelosamente optimista a pesar de la volatilidad
                reciente
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
