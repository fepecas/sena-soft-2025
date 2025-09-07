'use client'

import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Clock, Star } from 'lucide-react'

interface TaskCardProps {
  id: string
  title: string
  subject: string
  subjectIcon: string
  dueTime?: string
  priority: 'urgent' | 'today' | 'upcoming'
  isStarred?: boolean
  onClick?: () => void
}

const priorityColors = {
  urgent: 'bg-red-100 border-red-200 hover:bg-red-150',
  today: 'bg-orange-100 border-orange-200 hover:bg-orange-150',
  upcoming: 'bg-blue-100 border-blue-200 hover:bg-blue-150'
}

const subjectColors = {
  'Matemáticas': 'bg-blue-500',
  'Química': 'bg-green-500',
  'Historia': 'bg-purple-500',
  'Inglés': 'bg-pink-500',
  'Física': 'bg-orange-500',
  'Literatura': 'bg-indigo-500'
}

export function TaskCard({ title, subject, subjectIcon, dueTime, priority, isStarred, onClick }: TaskCardProps) {
  return (
    <Card 
      className={`p-4 mb-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 rounded-2xl ${priorityColors[priority]}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${subjectColors[subject as keyof typeof subjectColors] || 'bg-gray-500'} rounded-xl flex items-center justify-center shadow-md`}>
            <span className="text-lg">{subjectIcon}</span>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-white/80 text-gray-700 border-0 font-semibold rounded-lg px-3 py-1"
          >
            {subject}
          </Badge>
        </div>
        {isStarred && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
      </div>
      
      <h3 className="mb-3 leading-tight font-bold text-gray-800">{title}</h3>
      
      {dueTime && (
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-1 w-fit">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{dueTime}</span>
        </div>
      )}
    </Card>
  )
}