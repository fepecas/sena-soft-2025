'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { ArrowLeft, Plus, BookOpen, CheckCircle2, AlertCircle, X } from 'lucide-react'

interface Subject {
  id: string
  name: string
  icon: string
  color: string
  pendingTasks: number
}

interface SubjectsScreenProps {
  onBack: () => void
  subjects: Subject[]
  onAddSubject: (subject: Omit<Subject, 'id'>) => void
}

// Íconos disponibles para seleccionar
const availableIcons = [
  '📘', '📚', '🧮', '🔬', '🧪', '⚗️', '🌍', '📜', '🗺️', 
  '📖', '✍️', '📝', '🗣️', '🎭', '🎨', '🖌️', '🎵', '🎸', 
  '⚽', '🏃‍♂️', '💻', '🔌', '⚡', '🌱', '🐛', '🧬', 
  '🏛️', '⚖️', '💰', '📊', '🌟', '🔥', '💡'
]

// Colores disponibles
const availableColors = [
  { name: 'Azul', class: 'bg-blue-500' },
  { name: 'Verde', class: 'bg-green-500' },
  { name: 'Naranja', class: 'bg-orange-500' },
  { name: 'Morado', class: 'bg-purple-500' },
  { name: 'Rosa', class: 'bg-pink-500' },
  { name: 'Rojo', class: 'bg-red-500' },
  { name: 'Amarillo', class: 'bg-yellow-500' },
  { name: 'Índigo', class: 'bg-indigo-500' },
  { name: 'Teal', class: 'bg-teal-500' },
  { name: 'Cyan', class: 'bg-cyan-500' }
]

export function SubjectsScreen({ onBack, subjects, onAddSubject }: SubjectsScreenProps) {
  const [isAddingSubject, setIsAddingSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0])
  const [selectedColor, setSelectedColor] = useState(availableColors[0])

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      onAddSubject({
        name: newSubjectName.trim(),
        icon: selectedIcon,
        color: selectedColor.class,
        pendingTasks: 0
      })
      
      // Resetear formulario
      setNewSubjectName('')
      setSelectedIcon(availableIcons[0])
      setSelectedColor(availableColors[0])
      setIsAddingSubject(false)
    }
  }

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
              <h1 className="font-bold text-xl text-gray-800">📚 Mis Materias</h1>
              <p className="text-sm text-gray-600">Organiza tus asignaturas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 pb-32">
        {/* Título principal */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-3xl mb-4 shadow-2xl">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Mis Asignaturas
          </h2>
          <p className="text-gray-600 font-medium mb-6">Gestiona todas tus materias desde aquí</p>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">{subjects.length}</div>
              <div className="text-sm font-bold text-gray-700">📘 Total materias</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">{subjects.filter(s => s.pendingTasks === 0).length}</div>
              <div className="text-sm font-bold text-gray-700">✅ Al día</div>
            </div>
          </div>
        </div>

        {/* Botón destacado para agregar materia */}
        <div className="mb-6">
          <Button
            onClick={() => setIsAddingSubject(true)}
            size="lg"
            className="w-full h-16 bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">Agregar Materia</div>
                <div className="text-sm opacity-90">Crea una nueva asignatura</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Lista de materias */}
        <div className="space-y-4 mb-6">
          {subjects.map((subject) => (
            <Card 
              key={subject.id}
              className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-xl rounded-3xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-16 h-16 ${subject.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-3`}
                  >
                    <span className="text-3xl">{subject.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{subject.name}</h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                      {subject.pendingTasks > 0 
                        ? `${subject.pendingTasks} tarea${subject.pendingTasks > 1 ? 's' : ''} pendiente${subject.pendingTasks > 1 ? 's' : ''}`
                        : '🎉 ¡Todas las tareas completadas!'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {subject.pendingTasks > 0 ? (
                    <>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-bold text-lg px-3 py-1 rounded-2xl">
                        {subject.pendingTasks}
                      </Badge>
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                      </div>
                    </>
                  ) : (
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Barra de progreso visual */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-gray-700">Progreso general</span>
                  <span className="text-sm font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-2xl">
                    {subject.pendingTasks === 0 ? '100%' : `${Math.max(0, 100 - (subject.pendingTasks * 15))}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div 
                    className={`h-3 rounded-full transition-all duration-700 shadow-lg ${ 
                      subject.pendingTasks === 0 
                        ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600' 
                        : subject.pendingTasks <= 2
                        ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600'
                    }`}
                    style={{ 
                      width: `${subject.pendingTasks === 0 ? 100 : Math.max(0, 100 - (subject.pendingTasks * 15))}%` 
                    }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mensaje cuando no hay materias */}
        {subjects.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">¡Agrega tu primera materia!</h3>
            <p className="text-gray-600 font-medium mb-4">Organiza tus asignaturas para comenzar a gestionar tus tareas de manera eficiente</p>
            <Button
              onClick={() => setIsAddingSubject(true)}
              className="bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white font-bold rounded-2xl px-6 py-3"
            >
              🚀 Crear primera materia
            </Button>
          </Card>
        )}

        {/* Mensaje motivacional */}
        <Card className="bg-gradient-to-r from-blue-50/80 via-green-50/80 to-orange-50/80 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-center shadow-lg">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">¡Mantén el equilibrio!</h3>
          <p className="text-gray-600 leading-relaxed font-medium">
            Organizar tus materias te ayuda a distribuir mejor tu tiempo de estudio y alcanzar ese 5.0 que tanto deseas.
          </p>
        </Card>
      </div>

      {/* Modal para agregar nueva materia */}
      <Dialog open={isAddingSubject} onOpenChange={setIsAddingSubject}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent">
              ➕ Nueva Materia
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-medium mt-2">
              Crea una nueva asignatura con su ícono y color personalizados para organizar mejor tus tareas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 p-2">
            {/* Campo nombre */}
            <div className="space-y-3">
              <Label htmlFor="subject-name" className="text-base font-bold text-gray-700">
                📝 Nombre de la materia
              </Label>
              <Input
                id="subject-name"
                placeholder="Ej: Matemáticas, Historia, Química..."
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="h-12 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-blue-500 transition-colors font-medium"
              />
            </div>

            {/* Selección de ícono */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-gray-700">
                🎨 Selecciona un ícono
              </Label>
              <div className="grid grid-cols-7 gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-2xl border-2">
                {availableIcons.map((icon, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${
                      selectedIcon === icon 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 shadow-lg scale-110' 
                        : 'bg-white hover:bg-blue-50 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de color */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-gray-700">
                🌈 Selecciona un color
              </Label>
              <div className="grid grid-cols-5 gap-3 p-2">
                {availableColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 ${color.class} rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                      selectedColor.name === color.name 
                        ? 'ring-4 ring-blue-300 scale-110' 
                        : 'hover:scale-105'
                    }`}
                  >
                    {selectedColor.name === color.name && (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-2xl border-2 border-blue-200">
              <Label className="text-sm font-bold text-gray-600 mb-2 block">Vista previa:</Label>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${selectedColor.class} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{selectedIcon}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{newSubjectName || 'Nombre de la materia'}</p>
                  <p className="text-sm text-gray-600 font-medium">0 tareas pendientes</p>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsAddingSubject(false)}
                className="flex-1 h-12 rounded-2xl border-2 font-bold"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddSubject}
                disabled={!newSubjectName.trim()}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Crear Materia
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}