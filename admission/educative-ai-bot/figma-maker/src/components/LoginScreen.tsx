'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'

interface LoginScreenProps {
  onBack: () => void
  onLogin: (email: string, password: string) => void
}

export function LoginScreen({ onBack, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    
    // Simular autenticación (en una app real esto sería una llamada a API)
    setTimeout(() => {
      setIsLoading(false)
      onLogin(email, password)
    }, 1500)
  }

  const isFormValid = email.includes('@') && password.length >= 6

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
              <h1 className="text-xl font-bold text-gray-800">Iniciar Sesión</h1>
              <p className="text-sm text-gray-600">Accede a tu cuenta</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 min-h-[calc(100vh-80px)]">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-3xl mb-4 shadow-2xl">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent mb-2">
            ¡Bienvenido de vuelta!
          </h2>
          <p className="text-gray-600 text-lg max-w-sm mx-auto leading-relaxed">
            Continúa tu camino hacia el 5.0 🚀
          </p>
        </div>

        {/* Ilustración de fondo */}
        <div className="relative mb-6">
          <div className="w-64 h-40 rounded-3xl overflow-hidden shadow-2xl transform rotate-1 bg-gradient-to-br from-blue-200 to-green-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1712762056200-50d8f803ba10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcGhvbmUlMjBub3RlYm9vayUyMHN0dWR5aW5nJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU1ODkwNDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Estudiante usando celular y cuaderno"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 via-green-600/60 to-orange-600/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl mb-1">📱</div>
                <p className="text-sm font-bold">Tu éxito te espera</p>
              </div>
            </div>
          </div>
          
          {/* Elementos decorativos */}
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl shadow-lg animate-bounce flex items-center justify-center">
            <span className="text-xl">📚</span>
          </div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl shadow-lg animate-pulse flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
        </div>

        {/* Formulario de login */}
        <Card className="w-full max-w-sm bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de email */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                Correo electrónico
              </Label>
              <Input
                type="email"
                placeholder="tu.email@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-2xl border-2 border-blue-200 bg-white/80 font-medium focus:border-blue-400 focus:ring-blue-400"
                required
              />
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-bold flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-green-200 bg-white/80 font-medium focus:border-green-400 focus:ring-green-400 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-xl hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            {/* Enlace de contraseña olvidada */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              size="lg"
              className="w-full h-16 bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white text-xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar sesión 🚀'
              )}
            </Button>
          </form>
        </Card>

        {/* Mensaje motivacional */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-blue-50/80 to-green-50/80 backdrop-blur-sm border border-white/20 rounded-2xl max-w-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">💪</div>
            <p className="text-sm font-bold text-gray-700 mb-1">¡Un paso más cerca!</p>
            <p className="text-xs text-gray-600">Cada día de estudio te acerca a tu meta</p>
          </div>
        </Card>

        {/* Datos de ejemplo para testing */}
        <Card className="mt-4 p-3 bg-yellow-50/80 backdrop-blur-sm border border-yellow-200 rounded-2xl max-w-sm">
          <div className="text-center">
            <p className="text-xs text-yellow-700 font-bold mb-1">💡 Para probar la app:</p>
            <p className="text-xs text-yellow-600">Email: estudiante@5.0.com</p>
            <p className="text-xs text-yellow-600">Contraseña: mieta5.0</p>
          </div>
        </Card>
      </div>
    </div>
  )
}