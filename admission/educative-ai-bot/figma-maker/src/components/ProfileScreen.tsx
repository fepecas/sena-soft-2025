'use client'

import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { ArrowLeft, Edit2, User, GraduationCap, School, Trophy, Calendar, Target } from 'lucide-react'

interface ProfileScreenProps {
  onBack: () => void
  onEditProfile: () => void
  userEmail: string
}

export function ProfileScreen({ onBack, onEditProfile, userEmail }: ProfileScreenProps) {
  // Datos del estudiante (en una app real vendrían de la base de datos)
  const studentData = {
    fullName: "Ana Sofía González",
    school: "Colegio San Patricio",
    grade: "11° Grado",
    currentStreak: 12,
    avatar: "AS", // Iniciales para el avatar
    totalTasksCompleted: 45,
    weeklyGoal: 10,
    weeklyCompleted: 8,
    email: userEmail
  }

  const streakProgress = (studentData.currentStreak % 30) * (100 / 30) // Progreso hacia la siguiente meta (30 días)

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
              <h1 className="text-xl font-bold text-gray-800">Mi Perfil</h1>
              <p className="text-sm text-gray-600">Información personal</p>
            </div>
          </div>
          
          <Button 
            onClick={onEditProfile}
            className="bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white font-bold rounded-2xl px-4 py-2 shadow-lg"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 p-6 pb-32 space-y-6">
        
        {/* Encabezado con foto de perfil y datos principales */}
        <div className="bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Foto de perfil circular */}
            <div className="relative">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white/50">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent">
                  {studentData.avatar}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-lg">🔥</span>
              </div>
            </div>
            
            {/* Información principal */}
            <div className="text-white space-y-2">
              <h2 className="text-2xl font-bold">{studentData.fullName}</h2>
              <div className="flex flex-col gap-1 text-white/90">
                <div className="flex items-center justify-center gap-2">
                  <School className="h-4 w-4" />
                  <span className="font-medium">{studentData.school}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-medium">{studentData.grade}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta de racha destacada */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">¡Racha Activa!</h3>
                <p className="text-gray-600 font-medium">¡Sigue así, vas increíble!</p>
              </div>
            </div>
            
            {/* Contador de días */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                {studentData.currentStreak}
              </div>
              <p className="text-gray-700 font-bold">días consecutivos</p>
            </div>
            
            {/* Barra de progreso hacia la siguiente meta */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600">Próxima meta: 30 días</span>
                <span className="text-sm font-bold text-orange-600">{Math.round(streakProgress)}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={streakProgress} 
                  className="h-3 bg-gray-200 rounded-full overflow-hidden"
                />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full transition-all duration-500"
                  style={{ width: `${streakProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 font-medium">¡Faltan {30 - (studentData.currentStreak % 30)} días para desbloquear el próximo logro!</p>
            </div>
          </div>
        </div>

        {/* Tarjetas de información con glassmorphism */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* Información personal */}
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Información Personal
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Nombre completo</span>
                <span className="font-bold text-gray-800">{studentData.fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Colegio</span>
                <span className="font-bold text-gray-800">{studentData.school}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Grado</span>
                <span className="font-bold text-gray-800">{studentData.grade}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Email</span>
                <span className="font-bold text-gray-800 text-sm">{studentData.email}</span>
              </div>
            </div>
          </div>

          {/* Estadísticas de progreso */}
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-green-600" />
              Estadísticas de Progreso
            </h3>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Total de tareas completadas */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-700 mb-1">{studentData.totalTasksCompleted}</div>
                <div className="text-sm font-bold text-blue-600">Tareas completadas</div>
                <Calendar className="h-6 w-6 text-blue-500 mx-auto mt-2" />
              </div>
              
              {/* Meta semanal */}
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">{studentData.weeklyCompleted}/{studentData.weeklyGoal}</div>
                <div className="text-sm font-bold text-green-600">Meta semanal</div>
                <Target className="h-6 w-6 text-green-500 mx-auto mt-2" />
              </div>
              
            </div>
            
            {/* Progreso semanal */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600">Progreso esta semana</span>
                <span className="text-sm font-bold text-green-600">{Math.round((studentData.weeklyCompleted / studentData.weeklyGoal) * 100)}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={(studentData.weeklyCompleted / studentData.weeklyGoal) * 100} 
                  className="h-3 bg-gray-200 rounded-full"
                />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${(studentData.weeklyCompleted / studentData.weeklyGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Mensaje motivacional */}
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 border border-white/20 rounded-3xl p-6 shadow-lg text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">¡Eres increíble!</h3>
          <p className="text-gray-600 font-medium">Tu dedicación y constancia te llevarán a lograr ese 5.0 que tanto deseas. ¡Sigue adelante! 🚀</p>
        </div>

      </div>
    </div>
  )
}