'use client'

import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { ArrowLeft, Trophy, Flame, Star, Target, Calendar, CheckCircle2 } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  isCompleted: boolean
  color: string
}

interface AchievementsScreenProps {
  onBack: () => void
  currentStreak: number
  totalTasksCompleted: number
  weeklyGoal: number
  weeklyCompleted: number
}

export function AchievementsScreen({ 
  onBack, 
  currentStreak = 3, 
  totalTasksCompleted = 42, 
  weeklyGoal = 10, 
  weeklyCompleted = 7 
}: AchievementsScreenProps) {
  
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Racha de fuego',
      description: 'Completa tareas 7 días seguidos',
      icon: '🔥',
      progress: currentStreak,
      maxProgress: 7,
      isCompleted: currentStreak >= 7,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: '2',
      title: 'Estudiante dedicado',
      description: 'Completa 50 tareas en total',
      icon: '📚',
      progress: totalTasksCompleted,
      maxProgress: 50,
      isCompleted: totalTasksCompleted >= 50,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '3',
      title: 'Meta semanal',
      description: 'Completa 10 tareas esta semana',
      icon: '🎯',
      progress: weeklyCompleted,
      maxProgress: weeklyGoal,
      isCompleted: weeklyCompleted >= weeklyGoal,
      color: 'from-green-500 to-green-600'
    },
    {
      id: '4',
      title: 'Organizador experto',
      description: 'Usa la app 30 días seguidos',
      icon: '⭐',
      progress: 15,
      maxProgress: 30,
      isCompleted: false,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "¡Comienza tu racha hoy!"
    if (streak < 3) return `¡Llevas ${streak} día${streak > 1 ? 's' : ''} completando tareas!`
    if (streak < 7) return `🔥 ¡${streak} días seguidos! ¡Vas genial!`
    if (streak < 14) return `🔥🔥 ¡${streak} días! ¡Eres imparable!`
    return `🔥🔥🔥 ¡${streak} días! ¡Eres una leyenda!`
  }

  const getMotivationalMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "¡Buenos días! Es un gran día para lograr tu 5.0 ✨"
    if (hour < 18) return "¡Buenas tardes! Sigue así, vas por buen camino 🚀"
    return "¡Buenas noches! Termina el día con una tarea más 🌙"
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
              <h1 className="font-bold text-xl text-gray-800">🏆 Logros</h1>
              <p className="text-sm text-gray-600">Tu progreso académico</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4">
        {/* Título principal */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl mb-4 shadow-2xl">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            ¡Tus Logros!
          </h2>
          <p className="text-gray-600">{getMotivationalMessage()}</p>
        </div>

        {/* Racha principal */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-6 mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
              <Flame className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Racha Actual
            </h3>
            <div className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              {currentStreak}
            </div>
            <p className="text-gray-600 font-medium mb-4">
              {currentStreak === 1 ? 'día' : 'días'} completando tareas
            </p>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-orange-200">
              <p className="font-bold text-orange-700">
                {getStreakMessage(currentStreak)}
              </p>
            </div>
          </div>
        </Card>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/60 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-2xl font-bold text-blue-600">{totalTasksCompleted}</div>
            <div className="text-xs font-bold text-blue-700">Tareas totales</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border border-green-200 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-2xl font-bold text-green-600">{weeklyCompleted}/{weeklyGoal}</div>
            <div className="text-xs font-bold text-green-700">Esta semana</div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border border-orange-200 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-2xl font-bold text-orange-600">{achievements.filter(a => a.isCompleted).length}</div>
            <div className="text-xs font-bold text-orange-700">Logros</div>
          </Card>
        </div>

        {/* Lista de logros */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎖️ Logros Disponibles</h3>
          
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-4 ${
                achievement.isCompleted ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-xl">{achievement.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                
                {achievement.isCompleted && (
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 font-bold">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    ¡Completado!
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Progreso</span>
                  <span className="text-sm font-bold text-gray-700">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 text-center">
                  {achievement.isCompleted ? '¡Felicitaciones!' : `Te faltan ${achievement.maxProgress - achievement.progress} para completar este logro`}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mensaje motivacional final */}
        <Card className="bg-gradient-to-r from-blue-50/80 to-green-50/80 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-center">
          <div className="text-4xl mb-3">💪</div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">¡Sigue así!</h3>
          <p className="text-gray-600 leading-relaxed">
            Cada tarea completada te acerca más a tu meta. Tu constancia y dedicación son la clave del éxito académico.
          </p>
        </Card>
      </div>
    </div>
  )
}