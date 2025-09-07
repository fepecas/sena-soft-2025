'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, CalendarDays } from 'lucide-react'
import { Button } from './ui/button'

interface WeeklyCalendarProps {
  onCalendarClick?: () => void
  onDaySelect?: (date: Date) => void
  selectedDate?: Date
}

export function WeeklyCalendar({ onCalendarClick, onDaySelect, selectedDate }: WeeklyCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(0)
  
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const today = new Date()
  const currentDay = today.getDay()
  
  // Generar fechas de la semana actual
  const getWeekDates = (weekOffset: number) => {
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - currentDay + (weekOffset * 7))
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })
  }
  
  const weekDates = getWeekDates(currentWeek)
  
  const dayColors = [
    'from-red-400 to-red-500', 
    'from-blue-400 to-blue-500', 
    'from-green-400 to-green-500', 
    'from-orange-400 to-orange-500', 
    'from-purple-400 to-purple-500', 
    'from-pink-400 to-pink-500', 
    'from-indigo-400 to-indigo-500'
  ]

  // Función para navegar a semana anterior/siguiente
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = direction === 'prev' ? currentWeek - 1 : currentWeek + 1
    setCurrentWeek(newWeek)
  }

  // Función para seleccionar un día específico
  const handleDayClick = (date: Date) => {
    onDaySelect?.(date)
  }

  // Verificar si una fecha está seleccionada
  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-6 mb-6">
      {/* Header del calendario - clickeable para ir a vista global */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onCalendarClick}
          className="flex items-center gap-3 hover:bg-white/40 rounded-2xl p-2 -ml-2 transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <CalendarDays className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-800">
              📅 {weekDates[0].toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-sm text-gray-600">Toca para ver calendario completo</p>
          </div>
        </button>
        
        {/* Controles de navegación de semana */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('prev')}
            className="h-10 w-10 p-0 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('next')}
            className="h-10 w-10 p-0 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all duration-200 hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Grilla de días de la semana - CLICKEABLES */}
      <div className="grid grid-cols-7 gap-3">
        {weekDates.map((date, index) => {
          const isToday = date.toDateString() === today.toDateString()
          const isSelected = isDateSelected(date)
          const isPastDate = date < today && !isToday
          
          return (
            <div key={index} className="text-center">
              {/* Etiqueta del día */}
              <div className="text-sm text-gray-500 mb-2 font-medium">
                {days[index]}
              </div>
              
              {/* Día clickeable */}
              <button
                onClick={() => handleDayClick(date)}
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 relative
                  ${isToday ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''}
                  ${isSelected ? 'ring-4 ring-green-400 ring-offset-2 scale-110' : ''}
                  ${isPastDate ? 'opacity-60' : ''}
                  bg-gradient-to-br ${dayColors[index]}
                `}
              >
                {date.getDate()}
                
                {/* Indicador de día seleccionado */}
                {isSelected && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                
                {/* Indicador de hoy */}
                {isToday && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                )}
              </button>
              
              {/* Etiqueta del día */}
              <div className="mt-1 text-xs font-medium">
                {isToday && <span className="text-yellow-600">Hoy</span>}
                {isSelected && !isToday && <span className="text-green-600">Elegido</span>}
                {isPastDate && !isSelected && <span className="text-gray-400">Pasado</span>}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Leyenda de navegación */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 bg-white/60 rounded-xl px-3 py-2 inline-block">
          💡 Toca un día para ver sus tareas • Toca el header para el calendario completo
        </p>
      </div>
    </div>
  )
}