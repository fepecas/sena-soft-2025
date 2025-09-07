'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Clock, Calendar, CheckCircle2, Edit3, Star, AlarmClock } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Task {
  id: string
  title: string
  subject: string
  subjectIcon: string
  description?: string
  dueDate: Date
  dueTime?: string
  priority: 'urgent' | 'today' | 'upcoming'
  isStarred?: boolean
  isCompleted?: boolean
}

interface TaskDetailScreenProps {
  task: Task
  onBack: () => void
  onMarkComplete: (taskId: string) => void
  onEdit: (task: Task) => void
}

const priorityConfig = {
  urgent: {
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    label: '🚨 Urgente'
  },
  today: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    label: '📅 Hoy'
  },
  upcoming: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    label: '⏳ Próxima'
  }
}

const subjectColors = {
  'Matemáticas': 'bg-blue-500',
  'Química': 'bg-green-500',
  'Historia': 'bg-purple-500',
  'Inglés': 'bg-pink-500',
  'Física': 'bg-orange-500',
  'Literatura': 'bg-indigo-500'
}

export function TaskDetailScreen({ task, onBack, onMarkComplete, onEdit }: TaskDetailScreenProps) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted || false)
  
  const handleMarkComplete = () => {
    setIsCompleted(true)
    onMarkComplete(task.id)
  }

  const daysUntilDue = Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const isOverdue = daysUntilDue < 0
  const isDueToday = daysUntilDue === 0
  const isDueSoon = daysUntilDue <= 2 && daysUntilDue > 0

  const priorityInfo = priorityConfig[task.priority]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-orange-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-green-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-orange-400 rounded-full blur-lg"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-10 w-10 p-0 rounded-xl bg-white/50 hover:bg-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-bold text-gray-800">Detalle de Tarea</h1>
              <p className="text-xs text-gray-600">Revisa y gestiona tu tarea</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 pb-8">
        {/* Tarjeta principal de la tarea */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-6 mb-6">
          {/* Header de la tarea */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 ${subjectColors[task.subject as keyof typeof subjectColors] || 'bg-gray-500'} rounded-2xl flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{task.subjectIcon}</span>
              </div>
              <div>
                <Badge className={`${priorityInfo.bgColor} ${priorityInfo.color} border-0 font-semibold`}>
                  {priorityInfo.label}
                </Badge>
                <h2 className="text-lg font-bold text-gray-800 mt-1">{task.subject}</h2>
              </div>
            </div>
            {task.isStarred && (
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
            )}
          </div>

          {/* Título de la tarea */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
            {task.title}
          </h3>

          {/* Descripción si existe */}
          {task.description && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Descripción:</h4>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-2xl leading-relaxed">
                {task.description}
              </p>
            </div>
          )}

          {/* Información de fecha */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Fecha límite</p>
                <p className={`text-sm ${isOverdue ? 'text-red-600 font-bold' : isDueToday ? 'text-orange-600 font-bold' : isDueSoon ? 'text-yellow-600 font-bold' : 'text-gray-600'}`}>
                  {format(task.dueDate, "EEEE, d 'de' MMMM", { locale: es })}
                  {isOverdue && ' - ¡Vencida!'}
                  {isDueToday && ' - ¡Hoy!'}
                  {isDueSoon && ' - Próximamente'}
                </p>
              </div>
            </div>

            {task.dueTime && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Hora</p>
                  <p className="text-sm text-gray-600">{task.dueTime}</p>
                </div>
              </div>
            )}
          </div>

          {/* Estado de progreso */}
          <div className={`p-4 rounded-2xl border-2 ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} mb-6`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${isCompleted ? 'bg-green-500' : 'bg-yellow-500'} rounded-xl flex items-center justify-center`}>
                {isCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-white" />
                ) : (
                  <AlarmClock className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <p className={`font-bold ${isCompleted ? 'text-green-700' : 'text-yellow-700'}`}>
                  {isCompleted ? '¡Tarea completada!' : 'Pendiente de completar'}
                </p>
                <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isCompleted ? 'Excelente trabajo 🎉' : 'No olvides completar esta tarea'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Botones de acción */}
        <div className="space-y-4">
          {!isCompleted && (
            <Button
              onClick={handleMarkComplete}
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-xl rounded-2xl transform transition-all duration-200 hover:scale-105"
            >
              <CheckCircle2 className="mr-3 h-6 w-6" />
              Marcar como completada ✅
            </Button>
          )}

          <Button
            onClick={() => onEdit(task)}
            variant="outline"
            size="lg"
            className="w-full h-14 bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 text-blue-700 font-bold rounded-2xl transform transition-all duration-200 hover:scale-105"
          >
            <Edit3 className="mr-3 h-5 w-5" />
            Editar tarea
          </Button>
        </div>

        {/* Mensaje motivacional */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-blue-50/80 to-green-50/80 backdrop-blur-sm border border-white/20 rounded-2xl">
          <div className="text-center">
            <div className="text-3xl mb-2">💪</div>
            <p className="font-semibold text-gray-700 mb-1">¡Tú puedes lograrlo!</p>
            <p className="text-sm text-gray-600">Cada tarea completada te acerca más a tu 5.0</p>
          </div>
        </Card>
      </div>
    </div>
  )
}