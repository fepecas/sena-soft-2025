"use client"

import { Bell, User, ArrowLeft, Search, LogOut, UserCircle } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import Image from "next/image"

interface AppHeaderProps {
  title?: string
  showBackButton?: boolean
  showSearch?: boolean
  showNotifications?: boolean
}

export function AppHeader({
  title,
  showBackButton = false,
  showSearch = false,
  showNotifications = true,
}: AppHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.push("/")
  }

  const getTitle = () => {
    if (title) return title

    switch (pathname) {
      case "/dashboard":
        return " "
      case "/markets":
        return "Markets"
      case "/announcements":
        return "Announcements"
      case "/settings":
        return "Settings"
      default:
        return "PrediktIA"
    }
  }

  const showLogo = pathname === "/dashboard"

  return (
    <header
      className={`flex items-center justify-between p-4 border-b ${theme === "dark" ? "border-slate-700" : "border-gray-200"}`}
    >
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {showLogo ? (
          <div className="flex items-center gap-2">
            <div className="flex">
            <Image
              src="/images/prediktia-logo.png"
              alt="PrediktIA Logo"
              width={200}
              height={100}
              className="object-contain"
            />
            </div>
            <span className="text-xl font-semibold">{getTitle()}</span>
          </div>
        ) : (
          <h1 className="text-xl font-semibold">{getTitle()}</h1>
        )}
      </div>

      <div className="flex items-center gap-4 relative">
        {showSearch && <Search className="w-5 h-5" />}
        {showNotifications && (
          <>
            <Bell className="w-5 h-5" />
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`w-8 h-8 ${theme === "dark" ? "bg-slate-600" : "bg-gray-300"} rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}
              >
                <User className="w-4 h-4" />
              </button>

              {showUserMenu && (
                <div
                  className={`absolute right-0 top-10 w-64 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"} border rounded-lg shadow-lg z-50`}
                >
                  <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${theme === "dark" ? "bg-slate-600" : "bg-gray-300"} rounded-full flex items-center justify-center`}
                      >
                        <UserCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-medium">{user?.name || "Usuario"}</div>
                        <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                          {user?.email || "usuario@prediktia.com"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md ${theme === "dark" ? "hover:bg-slate-700 text-red-400" : "hover:bg-gray-100 text-red-600"} transition-colors`}
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {showUserMenu && <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />}
    </header>
  )
}
