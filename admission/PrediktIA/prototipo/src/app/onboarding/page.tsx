"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"
import { Bell, User } from "lucide-react"
import Image from "next/image"

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
  { name: "TechCorp", price: "$2,847", change: "+2.3%", progress: 60 },
  { name: "EnergyCo", price: "$201.50", change: "-1.2%", progress: 60 },
  { name: "FinanceInc", price: "$78.90", change: "+0.8%", progress: 80 },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([])
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [riskLevel, setRiskLevel] = useState(50)
  const [searchTerm, setSearchTerm] = useState("")

  const markets = [
    { id: "stocks", label: "Acciones", checked: selectedMarkets.includes("stocks") },
    { id: "currencies", label: "Divisas", checked: selectedMarkets.includes("currencies") },
    { id: "crypto", label: "Criptomonedas", checked: selectedMarkets.includes("crypto") },
    { id: "commodities", label: "Materias Primas", checked: selectedMarkets.includes("commodities") },
  ]

  const sectors = [
    { id: "technology", label: "Tecnología" },
    { id: "healthcare", label: "Salud" },
    { id: "finance", label: "Finanzas" },
    { id: "energy", label: "Energía" },
    { id: "consumer", label: "Bienes de Consumo" },
  ]

  const handleMarketChange = (marketId: string, checked: boolean) => {
    if (checked) {
      setSelectedMarkets([...selectedMarkets, marketId])
    } else {
      setSelectedMarkets(selectedMarkets.filter((id) => id !== marketId))
    }
  }

  const handleSectorChange = (sectorId: string, checked: boolean) => {
    if (checked) {
      setSelectedSectors([...selectedSectors, sectorId])
    } else {
      setSelectedSectors(selectedSectors.filter((id) => id !== sectorId))
    }
  }

  const getRiskLevelLabel = (value: number) => {
    if (value <= 33) return "Bajo"
    if (value <= 66) return "Medio"
    return "Alto"
  }

  const handleRiskLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskLevel(Number.parseInt(e.target.value))
  }

  const handleFinish = () => {
    // Save onboarding data and redirect to dashboard
    const onboardingData = {
      markets: selectedMarkets,
      sectors: selectedSectors,
      riskLevel: riskLevel,
    }
    localStorage.setItem("prediktia-onboarding", JSON.stringify(onboardingData))
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Step 1: Select Markets */}
      {currentStep === 1 && (
        <div className="w-80 p-6 border-r border-slate-700">
          <div className="mb-6">
            <div className="flex gap-1 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Selecciona tus mercados</h2>
            <p className="text-slate-400 text-sm">
              Elige los mercados que te interesan para recibir alertas de riesgo personalizadas.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {markets.map((market) => (
              <div key={market.id} className="flex items-center space-x-3">
                <Checkbox
                  id={market.id}
                  checked={market.checked}
                  onCheckedChange={(checked) => handleMarketChange(market.id, checked as boolean)}
                  className="border-slate-600"
                />
                <label htmlFor={market.id} className="text-sm font-medium cursor-pointer">
                  {market.label}
                </label>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={selectedMarkets.length === 0}
          >
            Continuar
          </Button>
        </div>
      )}

      {/* Step 2: Select Sectors */}
      {currentStep === 2 && (
        <div className="w-80 p-6 border-r border-slate-700">
          <div className="mb-6">
            <div className="flex gap-1 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Sectores y activos favoritos</h2>
            <p className="text-slate-400 text-sm">
              Selecciona tus sectores y activos favoritos para recibir alertas de riesgo más relevantes.
            </p>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Buscar sectores o activos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
            />
          </div>

          <div className="space-y-4 mb-8">
            {sectors.map((sector) => (
              <div key={sector.id} className="flex items-center space-x-3">
                <Checkbox
                  id={sector.id}
                  checked={selectedSectors.includes(sector.id)}
                  onCheckedChange={(checked) => handleSectorChange(sector.id, checked as boolean)}
                  className="border-slate-600"
                />
                <label htmlFor={sector.id} className="text-sm font-medium cursor-pointer">
                  {sector.label}
                </label>
              </div>
            ))}
          </div>

          <Button onClick={() => setCurrentStep(3)} className="w-full bg-blue-600 hover:bg-blue-700">
            Continuar
          </Button>
        </div>
      )}

      {/* Step 3: Risk Level */}
      {currentStep === 3 && (
        <div className="w-80 p-6 border-r border-slate-700">
          <div className="mb-6">
            <div className="flex gap-1 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Establece tu nivel de riesgo</h2>
            <p className="text-slate-400 text-sm">
              Ajusta el deslizador para establecer tu nivel de riesgo preferido para las alertas.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Nivel de Riesgo</span>
              <span>{getRiskLevelLabel(riskLevel)}</span>
            </div>
            <div className="relative mb-2">
              <input
                type="range"
                min="0"
                max="100"
                value={riskLevel}
                onChange={handleRiskLevelChange}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${riskLevel}%, #475569 ${riskLevel}%, #475569 100%)`,
                }}
              />
            </div>
            <div className="text-center text-xs text-slate-500">{riskLevel}%</div>
          </div>

          <Button onClick={handleFinish} className="w-full bg-blue-600 hover:bg-blue-700">
            Finalizar
          </Button>
        </div>
      )}

      {/* Right side - Dashboard preview */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex">
            <Image
              src="/images/prediktia-logo.png"
              alt="PrediktIA Logo"
              width={200}
              height={100}
              className="object-contain"
            />
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5" />
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm text-slate-400 mb-1">Hoy</h3>
            <h2 className="text-lg font-semibold mb-2">Resumen del Mercado</h2>
            <div className="text-2xl font-bold text-green-400 mb-1">+0.5%</div>
            <div className="text-sm text-green-400">24h +0.5%</div>
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
              className="h-40"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketOverviewData}>
                  <Line type="monotone" dataKey="value" stroke="rgb(59, 130, 246)" strokeWidth={2} dot={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Favorites Preview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Favoritos</h3>
            <div className="space-y-4">
              {favorites.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-slate-400">{item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <span className="text-sm w-8 text-right">{item.progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Noticias Filtradas por IA</h3>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <img src="/images/oil-drop.png" alt="Gota de petróleo" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <div className="text-sm font-medium">Auge del Sector Energético</div>
                  <div className="text-xs text-slate-400">
                    Se espera que los precios del petróleo suban debido a tensiones geopolíticas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
