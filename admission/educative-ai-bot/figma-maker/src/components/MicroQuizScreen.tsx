'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card } from './ui/card'
import { ArrowLeft, Lightbulb, Sparkles, CheckCircle2 } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface MicroQuizScreenProps {
  onBack: () => void
  onSubmitAnswer: (answer: string) => void
  question: string
  subject: string
  subjectIcon: string
  completedTask?: any // Nueva prop opcional para la tarea completada
}

export function MicroQuizScreen({ 
  onBack, 
  onSubmitAnswer, 
  question, 
  subject, 
  subjectIcon,
  completedTask 
}: MicroQuizScreenProps) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-orange-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-green-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-pink-400 rounded-full blur-lg"></div>
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
              <h1 className="text-xl font-bold text-gray-800">Momento de reflexión</h1>
              <p className="text-sm text-gray-600">¡Tarea completada! 🎉</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 min-h-[calc(100vh-80px)]">
        {/* Celebración de tarea completada */}
        {completedTask && (
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">¡Tarea completada!</h2>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{completedTask.subjectIcon}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-700">{completedTask.subject}</p>
                    <p className="text-xs text-gray-600">{completedTask.dueTime}</p>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-left">{completedTask.title}</h3>
              </div>
              
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm text-green-700 font-bold">
                ¡Un paso más cerca de tu 5.0!
              </p>
            </div>
          </Card>
        )}

        {/* Ilustración principal */}
        <div className="relative mb-6">
          <div className="w-64 h-48 rounded-3xl overflow-hidden shadow-2xl transform -rotate-1 bg-gradient-to-br from-orange-200 to-pink-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGhpbmtpbmclMjBib29rcyUyMHN0dWR5aW5nfGVufDB8fHx8MTY5ODQ4MDAwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Estudiante pensando y reflexionando"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/60 via-pink-600/60 to-purple-600/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-5xl mb-2">💡</div>
                <p className="text-lg font-bold">Reflexiona</p>
              </div>
            </div>
          </div>
          
          {/* Elementos decorativos */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-lg animate-bounce flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl shadow-lg animate-pulse flex items-center justify-center">
            <span className="text-xl">✨</span>
          </div>
          <div className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg flex items-center justify-center">
            <span className="text-sm">🎯</span>
          </div>
        </div>

        {/* Card principal de reflexión */}
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-6">
          {/* Encabezado de la reflexión */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {subject}
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Comparte tu experiencia y aprendizajes
            </p>
          </div>

          {/* Pregunta de reflexión */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">{subjectIcon}</span>
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{question}</p>
              </div>
            </div>
          </div>

          {/* Campo de respuesta */}
          <div className="mb-6">
            <Textarea
              placeholder="Escribe aquí tu reflexión... 💭

• ¿Qué aprendiste?
• ¿Qué fue lo más difícil?
• ¿Cómo lo aplicarás en el futuro?
• ¿Qué te motivó a completarla?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="h-32 rounded-2xl border-2 border-orange-200 bg-white/80 resize-none focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500"
            />
          </div>

          {/* Botón de envío */}
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            size="lg"
            className="w-full h-16 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 hover:from-orange-700 hover:via-pink-700 hover:to-purple-700 text-white text-xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Sparkles className="h-6 w-6 mr-2" />
            Enviar reflexión 🚀
          </Button>
        </Card>

        {/* Mensaje motivacional */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-green-50/80 to-blue-50/80 backdrop-blur-sm border border-green-200 rounded-2xl max-w-md">
          <div className="text-center">
            <div className="text-2xl mb-2">🌟</div>
            <p className="text-sm font-bold text-gray-700 mb-1">¡Cada reflexión te hace más fuerte!</p>
            <p className="text-xs text-gray-600">Aprender de la experiencia es la clave del éxito</p>
          </div>
        </Card>
      </div>
    </div>
  )
}