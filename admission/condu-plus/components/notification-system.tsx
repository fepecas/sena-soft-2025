"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, X, Trophy, Target, Flame, BookOpen } from "lucide-react"

interface Notification {
  id: string
  type: "achievement" | "reminder" | "streak" | "module" | "daily"
  title: string
  message: string
  timestamp: Date
  read: boolean
  icon: React.ReactNode
}

interface NotificationSystemProps {
  onNotificationClick?: (notification: Notification) => void
}

export default function NotificationSystem({ onNotificationClick }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "daily",
      title: "¡Reto del día disponible!",
      message: "Completa el quiz de señales de tránsito y gana 50 XP",
      timestamp: new Date(),
      read: false,
      icon: <Target className="h-4 w-4 text-primary" />,
    },
    {
      id: "2",
      type: "achievement",
      title: "¡Nueva insignia desbloqueada!",
      message: "Has ganado la insignia 'Experto en Cascos'",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      icon: <Trophy className="h-4 w-4 text-primary" />,
    },
    {
      id: "3",
      type: "streak",
      title: "¡Racha de 7 días!",
      message: "Mantén tu racha completando el reto de hoy",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
      icon: <Flame className="h-4 w-4 text-accent" />,
    },
    {
      id: "4",
      type: "module",
      title: "Nuevo módulo disponible",
      message: "El módulo 'Conducción Defensiva' ya está listo",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)
  const [showBadge, setShowBadge] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    setShowBadge(unreadCount > 0)
  }, [unreadCount])

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    onNotificationClick?.(notification)
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Ahora"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  // Simular nuevas notificaciones
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: "reminder" as const,
          title: "¡No olvides tu reto diario!",
          message: "Tienes 2 horas para completar el reto de hoy",
          icon: <Target className="h-4 w-4 text-primary" />,
        },
        {
          type: "achievement" as const,
          title: "¡Logro desbloqueado!",
          message: "Has completado 5 módulos consecutivos",
          icon: <Trophy className="h-4 w-4 text-primary" />,
        },
      ]

      if (Math.random() > 0.7) {
        // 30% chance cada 30 segundos
        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)]
        const newNotification: Notification = {
          id: Date.now().toString(),
          ...randomNotif,
          timestamp: new Date(),
          read: false,
        }

        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Mantener máximo 10
      }
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
        <Bell className="h-5 w-5" />
        {showBadge && (
          <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </Button>

      {/* Panel de notificaciones */}
      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Notificaciones</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Marcar todas
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium truncate ${
                            !notification.read ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="h-4 w-4 opacity-0 group-hover:opacity-100 hover:bg-destructive/10"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t bg-muted/30">
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setShowNotifications(false)}>
                Ver todas las notificaciones
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Overlay para cerrar */}
      {showNotifications && <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />}
    </div>
  )
}
