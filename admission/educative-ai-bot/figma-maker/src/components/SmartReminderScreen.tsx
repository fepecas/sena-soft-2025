'use client'

import { Button } from './ui/button'
import { Card } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Bell, Clock, X, Sparkles } from 'lucide-react'

interface SmartReminderScreenProps {
  task: {
    title: string
    subject: string
    subjectIcon: string
    dueTime: string
  }
  onStartNow: () => void
  onDismiss: () => void
}

export function SmartReminderScreen({ task, onStartNow, onDismiss }: SmartReminderScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white/95 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-6 w-full max-w-sm transform animate-in slide-in-from-bottom-4 duration-300">
        {/* Header con icono de notificación */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-full mb-4 shadow-xl animate-pulse">
            <Bell className="h-8 w-8 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h2 className="font-bold text-xl text-gray-800">Recordatorio Inteligente</h2>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
        </div>

        {/* Ilustración */}
        <div className="relative mb-6">
          <div className="w-full h-32 rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1661874120666-23792c72b48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGhpbmtpbmclMjBsaWdodGJ1bGIlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NTU4MzExMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Estudiante pensando"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 via-green-600/60 to-orange-600/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl animate-bounce">💡</div>
            </div>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="text-center mb-6">
          <p className="text-lg font-bold text-gray-800 mb-2">
            ¡No olvides tu próxima tarea!
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-2xl">{task.subjectIcon}</span>
              <div className="text-center">
                <p className="font-bold text-gray-700">{task.subject}</p>
                <p className="text-sm text-gray-600">{task.title}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-orange-600">
            <Clock className="h-4 w-4" />
            <p className="font-semibold">{task.dueTime}</p>
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6 border border-orange-200">
          <div className="text-center">
            <div className="text-2xl mb-2">🌟</div>
            <p className="text-sm font-semibold text-orange-700">
              "El éxito es la suma de pequeños esfuerzos repetidos día tras día"
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button
            onClick={onStartNow}
            size="lg"
            className="w-full h-12 bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white font-bold shadow-xl rounded-2xl transform transition-all duration-200 hover:scale-105"
          >
            Iniciar ahora 🚀
          </Button>
          
          <Button
            onClick={onDismiss}
            variant="outline"
            size="lg"
            className="w-full h-12 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl"
          >
            Recordar más tarde
          </Button>
        </div>

        {/* Botón de cerrar */}
        <Button
          onClick={onDismiss}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full bg-white/50 hover:bg-white/80"
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  )
}