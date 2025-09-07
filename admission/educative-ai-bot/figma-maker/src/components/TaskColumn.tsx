'use client'

import { TaskCard } from './TaskCard'
import { Badge } from './ui/badge'

interface Task {
  id: string
  title: string
  subject: string
  subjectIcon: string
  dueTime?: string
  priority: 'urgent' | 'today' | 'upcoming'
  isStarred?: boolean
}

interface TaskColumnProps {
  title: string
  tasks: Task[]
  color: string
  count: number
  onTaskClick?: (task: Task) => void
}

export function TaskColumn({ title, tasks, color, count, onTaskClick }: TaskColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          <Badge className={`${color} text-white border-0 font-bold px-3 py-1 rounded-xl shadow-lg`}>
            {count}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            {...task} 
            onClick={() => onTaskClick?.(task)}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 px-4">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-gray-500 font-medium">¡Perfecto!</p>
            <p className="text-sm text-gray-400">No hay tareas aquí</p>
          </div>
        )}
      </div>
    </div>
  )
}