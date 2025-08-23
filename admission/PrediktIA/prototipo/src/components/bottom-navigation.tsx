"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, TrendingUp, AlertTriangle, Settings } from "lucide-react"

const navigationItems = [
  { icon: Home, label: "Inicio", path: "/dashboard" },
  { icon: TrendingUp, label: "Mercados", path: "/markets" },
  { icon: AlertTriangle, label: "Alertas", path: "/announcements" },
  { icon: Settings, label: "Configuración", path: "/settings" },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
