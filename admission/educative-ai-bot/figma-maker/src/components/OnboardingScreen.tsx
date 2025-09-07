'use client'

import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { BookOpen, Target, Users, Sparkles } from 'lucide-react'

interface OnboardingScreenProps {
  onStart: () => void
}

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-orange-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-green-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-pink-400 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 min-h-screen">
        {/* Logo y título principal */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-3xl mb-6 shadow-2xl">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent mb-2 leading-tight">
            ¿Y si agendamos
          </h1>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4 leading-tight">
            un 5.0?
          </h1>
          
          <p className="text-gray-600 text-lg max-w-sm mx-auto leading-relaxed">
            La app que necesitas para organizar tus estudios y alcanzar el éxito académico 🚀
          </p>
        </div>

        {/* Ilustración principal */}
        <div className="relative mb-8">
          <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 bg-gradient-to-br from-blue-200 to-green-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1569164902518-6621784be07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnRzJTIwcGhvbmUlMjBib29rcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NTgzMTEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Estudiantes felices usando tecnología para estudiar"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Elementos flotantes decorativos */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl shadow-lg animate-bounce flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl shadow-lg animate-pulse flex items-center justify-center">
            <span className="text-xl">📚</span>
          </div>
          <div className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-sm">✨</span>
          </div>
        </div>

        {/* Tarjetas de características - HORIZONTALES SEGUIDAS */}
        <div className="flex gap-3 w-full max-w-md mb-8 overflow-x-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl flex-shrink-0 w-32 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-2">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-blue-700 text-sm">📘 Organiza</h3>
            <p className="text-blue-600 text-xs">materias</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl flex-shrink-0 w-32 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-2">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-green-700 text-sm">🎯 Metas</h3>
            <p className="text-green-600 text-xs">claras</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl flex-shrink-0 w-32 text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-orange-700 text-sm">🤝 Colabora</h3>
            <p className="text-orange-600 text-xs">con otros</p>
          </div>
        </div>

        {/* Botón principal */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full max-w-sm h-16 bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white text-xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl"
        >
          Comenzar 🚀
        </Button>

        {/* Texto de motivación */}
        <p className="text-sm text-gray-500 mt-6 text-center max-w-xs leading-relaxed">
          Únete a miles de estudiantes que ya mejoraron sus calificaciones con nuestra app ⭐
        </p>
      </div>
    </div>
  )
}