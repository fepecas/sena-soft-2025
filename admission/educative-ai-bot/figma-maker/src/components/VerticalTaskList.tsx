'use client'

import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Clock, Star, CheckCircle2, AlertCircle } from 'lucide-react'

interface Task {
  id: string
  title: string
  subject: string
  subjectIcon: string
  dueTime?: string
  priority: 'urgent' | 'today' | 'upcoming'
  isStarred?: boolean
  isCompleted?: boolean
}

interface VerticalTaskListProps {
  allTasks: Task[]
  onTaskClick?: (task: Task) => void
}

const priorityConfig = {
  urgent: {
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    label: '🚨 Urgente',
    gradient: 'from-red-500 to-red-600'
  },
  today: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    label: '📅 Hoy',
    gradient: 'from-orange-500 to-orange-600'
  },
  upcoming: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    label: '⏳ Próximas',
    gradient: 'from-blue-500 to-blue-600'
  }
}

const subjectColors = {
  'Matemáticas': 'bg-blue-500',
  'Química': 'bg-green-500',
  'Historia': 'bg-purple-500',
  'Inglés': 'bg-pink-500',
  'Física': 'bg-orange-500',
  'Literatura': 'bg-indigo-500',
  'Biología': 'bg-green-600',
  'Arte': 'bg-red-500'
}

export function VerticalTaskList({ allTasks, onTaskClick }: VerticalTaskListProps) {
  // Ordenar tareas por prioridad
  const sortedTasks = [...allTasks].sort((a, b) => {
    const priorityOrder = { urgent: 0, today: 1, upcoming: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-gray-800 mb-4 px-3">📋 Todas tus tareas</h3>
      
      {sortedTasks.map((task) => {
        const priorityInfo = priorityConfig[task.priority]
        
        return (
          <Card 
            key={task.id}
            className={`mx-3 p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 rounded-2xl ${priorityInfo.bgColor} ${priorityInfo.borderColor}`}
            onClick={() => onTaskClick?.(task)}
          >
            {/* Header de la tarjeta */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${subjectColors[task.subject as keyof typeof subjectColors] || 'bg-gray-500'} rounded-xl flex items-center justify-center shadow-md`}>
                  <span className="text-xl">{task.subjectIcon}</span>
                </div>
                <div>
                  <Badge className={`${priorityInfo.bgColor} ${priorityInfo.color} border-0 font-bold mb-1`}>
                    {priorityInfo.label}
                  </Badge>
                  <p className="text-sm font-semibold text-gray-600">{task.subject}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {task.isStarred && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                {task.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            
            {/* Título de la tarea */}
            <h4 className="mb-3 leading-tight font-bold text-gray-800">{task.title}</h4>
            
            {/* Footer con fecha/hora */}
            {task.dueTime && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{task.dueTime}</span>
                </div>
                
                {/* Estado visual */}
                <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                  task.isCompleted ? 'bg-green-200 text-green-800' : 
                  task.priority === 'urgent' ? 'bg-red-200 text-red-800' :
                  task.priority === 'today' ? 'bg-orange-200 text-orange-800' :
                  'bg-blue-200 text-blue-800'
                }`}>
                  {task.isCompleted ? '✅ Completada' : 
                   task.priority === 'urgent' ? '🚨 Urgente' :
                   task.priority === 'today' ? '📅 Hoy' : 
                   '⏳ Próxima'}
                </div>
              </div>
            )}
          </Card>
        )
      })}
      
      {sortedTasks.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¡Increíble!</h3>
          <p className="text-gray-600 font-medium mb-2">No tienes tareas pendientes</p>
          <p className="text-sm text-gray-500">Es el momento perfecto para relajarte o estudiar algo nuevo</p>
        </div>
      )}
    </div>
  )
}