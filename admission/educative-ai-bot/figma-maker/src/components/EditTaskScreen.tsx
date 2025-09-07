'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Card } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowLeft, Calendar as CalendarIcon, Save, Clock, Edit } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface EditTaskScreenProps {
  onBack: () => void
  onSave: (task: any) => void
  task: any // La tarea a editar con todos sus datos actuales
}

const subjects = [
  { id: 'matematicas', name: 'Matemáticas', icon: '📘', color: 'bg-blue-500' },
  { id: 'quimica', name: 'Química', icon: '🧪', color: 'bg-green-500' },
  { id: 'historia', name: 'Historia', icon: '📜', color: 'bg-purple-500' },
  { id: 'ingles', name: 'Inglés', icon: '🗣️', color: 'bg-pink-500' },
  { id: 'fisica', name: 'Física', icon: '⚡', color: 'bg-orange-500' },
  { id: 'literatura', name: 'Literatura', icon: '📖', color: 'bg-indigo-500' },
  { id: 'biologia', name: 'Biología', icon: '🌱', color: 'bg-green-600' },
  { id: 'arte', name: 'Arte', icon: '🎨', color: 'bg-red-500' }
]

const timeOptions = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
]

export function EditTaskScreen({ onBack, onSave, task }: EditTaskScreenProps) {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Precargar los datos de la tarea al cargar el componente
  useEffect(() => {
    if (task) {
      // Encontrar el ID de la materia basado en el nombre
      const subjectData = subjects.find(s => s.name === task.subject)
      setSelectedSubject(subjectData?.id || '')
      
      setTaskTitle(task.title || '')
      setTaskDescription(task.description || '')
      setSelectedDate(task.dueDate ? new Date(task.dueDate) : undefined)
      setSelectedTime(task.dueTime || '')
    }
  }, [task])

  const handleSave = () => {
    if (!selectedSubject || !taskTitle || !selectedDate) {
      return // Validación básica
    }

    const selectedSubjectData = subjects.find(s => s.id === selectedSubject)
    const updatedTask = {
      ...task, // Mantener datos como ID y prioridad original
      title: taskTitle,
      subject: selectedSubjectData?.name || '',
      subjectIcon: selectedSubjectData?.icon || '📝',
      description: taskDescription,
      dueDate: selectedDate,
      dueTime: selectedTime
    }

    onSave(updatedTask)
  }

  const isFormValid = selectedSubject && taskTitle && selectedDate

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-orange-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-green-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-orange-400 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 left-16 w-20 h-20 bg-pink-400 rounded-full blur-lg"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-10 w-10 p-0 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-bold text-gray-800">Editar Tarea</h1>
              <p className="text-xs text-gray-600">Actualiza los detalles de tu tarea ✏️</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 pb-8">
        {/* Ilustración de fondo */}
        <div className="relative mb-6 rounded-3xl overflow-hidden shadow-2xl">
          <div className="h-40 relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1588561181397-fed38f837e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGVzayUyMG5vdGVib29rJTIwcGxhbm5pbmclMjBzdHVkeXxlbnwxfHx8fDE3NTU4Mjk0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Estudiante editando tareas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Edit className="h-8 w-8 mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-lg">¡Perfecciona tu tarea!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-6">
          <div className="space-y-6">
            {/* Selector de Asignatura */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold">Asignatura</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-blue-200 bg-white/80 font-medium">
                  <SelectValue placeholder="Selecciona una materia 📚" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-blue-200">
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id} className="rounded-xl my-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{subject.icon}</span>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Título de la tarea */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold">¿Qué necesitas hacer?</Label>
              <Input
                placeholder="Ej: Estudiar para examen de matemáticas 📝"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="h-14 rounded-2xl border-2 border-green-200 bg-white/80 font-medium"
              />
            </div>

            {/* Descripción opcional */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold">Descripción (opcional)</Label>
              <Textarea
                placeholder="Agrega detalles adicionales sobre la tarea... 💭"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="min-h-[100px] resize-none rounded-2xl border-2 border-orange-200 bg-white/80 font-medium"
              />
            </div>

            {/* Fecha límite */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold">Fecha límite</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger>
                  <div className="w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 justify-start text-left rounded-2xl border-2 border-purple-200 bg-white/80 font-medium hover:bg-purple-50"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-purple-600" />
                      {selectedDate ? (
                        <span className="text-gray-800">
                          {format(selectedDate, "PPP", { locale: es })}
                        </span>
                      ) : (
                        <span className="text-gray-500">Selecciona una fecha 📅</span>
                      )}
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl border-2 border-purple-200" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setIsCalendarOpen(false)
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="rounded-2xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Hora opcional */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold">Hora (opcional)</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-full h-14 rounded-2xl border-2 border-pink-200 bg-white/80 font-medium">
                  <SelectValue placeholder="Selecciona una hora ⏰" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 border-pink-200">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time} className="rounded-xl my-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-pink-600" />
                        <span className="font-medium">{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Vista previa de los cambios */}
        {(selectedSubject || taskTitle) && (
          <Card className="mt-6 p-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg">
            <div className="flex items-start gap-3">
              <div className="text-3xl">
                {subjects.find(s => s.id === selectedSubject)?.icon || '📝'}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">
                  {taskTitle || 'Título de la tarea'}
                </h4>
                <p className="text-gray-600 font-medium">
                  {subjects.find(s => s.id === selectedSubject)?.name || 'Sin asignatura'}
                  {selectedDate && ` • ${format(selectedDate, "PP", { locale: es })}`}
                  {selectedTime && ` • ${selectedTime}`}
                </p>
                {taskDescription && (
                  <p className="text-gray-500 text-sm mt-2 font-medium">
                    {taskDescription}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Información sobre los cambios */}
        <Card className="mt-4 p-4 bg-gradient-to-r from-blue-50/80 to-green-50/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Edit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Editando: {task?.title}</h4>
              <p className="text-gray-600 text-sm font-medium">Modifica los campos que necesites actualizar</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Botón flotante para guardar cambios */}
      <div className="fixed bottom-6 left-4 right-4 z-20">
        <Button
          onClick={handleSave}
          disabled={!isFormValid}
          size="lg"
          className="w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transform transition-all duration-200 hover:scale-105 disabled:transform-none"
        >
          <Save className="mr-3 h-6 w-6" />
          Guardar Cambios ✨
        </Button>
      </div>
    </div>
  )
}