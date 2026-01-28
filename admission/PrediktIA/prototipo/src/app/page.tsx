"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fingerprint } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)

    if (success) {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("prediktia_onboarding_completed")
      if (hasCompletedOnboarding) {
        router.push("/dashboard")
      } else {
        router.push("/onboarding")
      }
    } else {
      setError("Credenciales incorrectas")
    }
  }

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    alert("Funcionalidad biométrica disponible próximamente")
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/prediktia-logo.png"
              alt="PrediktIA Logo"
              width={500}
              height={250}
              className="object-contain"
            />
          </div>
          <p className="text-slate-400 text-sm mt-2">Predicción temprana, decisiones seguras</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 h-12"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">O inicia sesión con biométrico</p>

          <button
            onClick={handleBiometricLogin}
            className="flex flex-col items-center justify-center space-y-2 mx-auto p-4 rounded-lg hover:bg-slate-800 transition-colors"
            disabled={isLoading}
          >
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
              <Fingerprint className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-white text-sm font-medium">Inicio Biométrico</span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-slate-400 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Forgot Password */}
        <div className="text-center">
          <button className="text-slate-400 text-sm hover:text-white transition-colors">Olvidé mi contraseña</button>
        </div>
      </div>
    </div>
  )
}
