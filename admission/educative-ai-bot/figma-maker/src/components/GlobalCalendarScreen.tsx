'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'

interface Task {
  id: string
  title: string
  subject: string
  subjectIcon: string
  dueDate: Date
  dueTime?: string
  priority: 'urgent' | 'today' | 'upcoming'
}

interface GlobalCalendarScreenProps {
  onBack: () => void
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export function GlobalCalendarScreen({ onBack, tasks, onTaskClick }: GlobalCalendarScreenProps) {
  const [currentWeek, setCurrentWeek] = useState(0)
  
  const today = new Date()
  const startDate = startOfWeek(addDays(today, currentWeek * 7), { weekStartsOn: 1 })
  
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))
  
  const dayColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600', 
    'from-orange-500 to-orange-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-red-500 to-red-600'
  ]

  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => isSameDay(task.dueDate, date))
      .sort((a, b) => {
        const priorityOrder = { urgent: 0, today: 1, upcoming: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 border-red-300 text-red-700'
      case 'today': return 'bg-orange-100 border-orange-300 text-orange-700'
      default: return 'bg-blue-100 border-blue-300 text-blue-700'
    }
  }

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
              <h1 className="font-bold text-xl text-gray-800">📅 Calendario</h1>
              <p className="text-sm text-gray-600">Vista semanal completa</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="h-10 w-10 p-0 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="h-10 w-10 p-0 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4">
        {/* Título de la semana */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-2xl mb-4 shadow-xl">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {format(startDate, "MMMM yyyy", { locale: es })}
          </h2>
          <p className="text-gray-600">
            {format(startDate, "d", { locale: es })} - {format(addDays(startDate, 6), "d 'de' MMMM", { locale: es })}
          </p>
        </div>

        {/* Calendario semanal */}
        <div className="space-y-4 mb-6">
          {weekDays.map((date, index) => {
            const dayTasks = getTasksForDay(date)
            const isToday = isSameDay(date, today)
            
            return (
              <Card 
                key={index}
                className={`bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-4 ${
                  isToday ? 'ring-4 ring-yellow-400 ring-offset-2' : ''
                }`}
              >
                {/* Header del día */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${dayColors[index]} rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${isToday ? 'animate-pulse' : ''}`}>
                      {format(date, 'd')}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {days[index]}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(date, "d 'de' MMMM", { locale: es })}
                        {isToday && ' - Hoy'}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={`${dayTasks.length > 0 ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-green-100 text-green-700 border-green-200'} font-bold`}>
                    {dayTasks.length} tarea{dayTasks.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {/* Tareas del día */}
                {dayTasks.length > 0 ? (
                  <div className="space-y-3">
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onTaskClick?.(task)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transform transition-all duration-200 hover:scale-105 ${getPriorityColor(task.priority)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{task.subjectIcon}</span>
                            <div>
                              <h4 className="font-bold text-sm">{task.title}</h4>
                              <p className="text-xs opacity-80">{task.subject}</p>
                            </div>
                          </div>
                          {task.dueTime && (
                            <div className="flex items-center gap-1 text-xs opacity-80">
                              <Clock className="h-3 w-3" />
                              <span>{task.dueTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-3xl mb-2">🎉</div>
                    <p className="text-gray-500 font-medium">¡Día libre!</p>
                    <p className="text-sm text-gray-400">No hay tareas programadas</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Resumen de la semana */}
        <Card className="bg-gradient-to-r from-blue-50/80 to-green-50/80 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Resumen de la semana</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {tasks.filter(t => t.priority === 'urgent' && weekDays.some(d => isSameDay(d, t.dueDate))).length}
              </div>
              <div className="text-xs text-red-700">Urgentes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {tasks.filter(t => t.priority === 'today' && weekDays.some(d => isSameDay(d, t.dueDate))).length}
              </div>
              <div className="text-xs text-orange-700">Hoy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => t.priority === 'upcoming' && weekDays.some(d => isSameDay(d, t.dueDate))).length}
              </div>
              <div className="text-xs text-blue-700">Próximas</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}