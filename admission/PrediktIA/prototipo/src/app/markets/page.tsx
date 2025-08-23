"use client"

import { useState, useEffect } from "react"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"
import { ArrowRight } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useTheme } from "@/contexts/theme-context"

const volatilityData = [
  { day: "Lun", value: 2.1 },
  { day: "Mar", value: 2.3 },
  { day: "Mié", value: 1.8 },
  { day: "Jue", value: 2.7 },
  { day: "Vie", value: 2.5 },
  { day: "Sáb", value: 2.2 },
  { day: "Dom", value: 2.5 },
]

const recentAnomalies = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    description: "BTC sube +5% después del anuncio de la FED",
    change: "+5.2%",
    positive: true,
    icon: "₿",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    description: "ETH cayó -3% debido a preocupaciones regulatorias",
    change: "-3.1%",
    positive: false,
    icon: "Ξ",
  },
  {
    symbol: "GOLD",
    name: "Oro",
    description: "El oro subió +2% en medio de la incertidumbre del mercado",
    change: "+2.4%",
    positive: true,
    icon: "$",
  },
]

const assetsList = [
  { name: "Activo A", price: "$1,234.56", change: "+2.3%", positive: true },
  { name: "Activo B", price: "$678.90", change: "-1.5%", positive: false },
  { name: "Activo C", price: "$345.67", change: "+0.8%", positive: true },
  { name: "Activo D", price: "$901.23", change: "-0.2%", positive: false },
  { name: "Activo E", price: "$567.89", change: "-1.7%", positive: false },
  { name: "Activo F", price: "$789.01", change: "-0.6%", positive: false },
]

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState("Todos")
  const [volatilityValue, setVolatilityValue] = useState(2.5)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      setVolatilityValue((prev) => prev + (Math.random() - 0.5) * 0.2)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <AppHeader showSearch />

      <div className="p-4">
        {/* Volatility Indicators */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Indicadores de Volatilidad</h2>
          <div className="text-2xl font-bold text-green-400 mb-1">+{volatilityValue.toFixed(1)}%</div>
          <div className="text-sm text-green-400 mb-4">Últimos 7 Días +{volatilityValue.toFixed(1)}%</div>

          {/* Volatility Chart */}
          <ChartContainer
            config={{
              value: {
                label: "Volatilidad",
                color: "rgb(59, 130, 246)",
              },
            }}
            className="h-32 mb-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volatilityData}>
                <Line type="monotone" dataKey="value" stroke="rgb(59, 130, 246)" strokeWidth={2} dot={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: theme === "dark" ? "#64748b" : "#6b7280" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Recent Anomalies */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Anomalías Recientes</h2>
          <div className="space-y-3">
            {recentAnomalies.map((anomaly, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 flex items-center justify-between ${theme === "dark" ? "bg-slate-800" : "bg-white border border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${theme === "dark" ? "bg-slate-700" : "bg-gray-100"}`}
                  >
                    {anomaly.icon}
                  </div>
                  <div>
                    <div className="font-medium">{anomaly.symbol}</div>
                    <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                      {anomaly.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`text-sm font-medium ${anomaly.positive ? "text-green-400" : "text-red-400"}`}>
                    {anomaly.change}
                  </div>
                  <ArrowRight className={`w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-gray-400"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assets Tabs */}
        <div className="mb-4">
          <div className={`flex gap-4 border-b ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}>
            {["Todos", "Favoritos", "Alertas"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? `${theme === "dark" ? "text-white" : "text-gray-900"} border-blue-500`
                    : `${theme === "dark" ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} border-transparent`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Assets List */}
        <div className="space-y-3 mb-20">
          {assetsList.map((asset, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-3 border-b ${theme === "dark" ? "border-slate-800" : "border-gray-200"}`}
            >
              <div>
                <div className="font-medium">{asset.name}</div>
                <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>{asset.price}</div>
              </div>
              <div className={`text-sm font-medium ${asset.positive ? "text-green-400" : "text-red-400"}`}>
                {asset.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
