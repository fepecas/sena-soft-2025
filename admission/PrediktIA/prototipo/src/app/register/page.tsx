"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fingerprint, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const success = await register(email, password, name)

    if (success) {
      router.push("/onboarding")
    } else {
      setError("El correo electrónico ya está registrado")
    }
  }

  const handleBiometricRegister = () => {
    // Simulate biometric registration
    alert("Funcionalidad biométrica disponible próximamente")
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>

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
          <p className="text-slate-400 text-sm mt-2">Crea tu cuenta para comenzar</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <Input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 h-12"
              required
            />
          </div>

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
              minLength={6}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 h-12"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        {/* Biometric Register */}
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">O regístrate con biométrico</p>

          <button
            onClick={handleBiometricRegister}
            className="flex flex-col items-center justify-center space-y-2 mx-auto p-4 rounded-lg hover:bg-slate-800 transition-colors"
            disabled={isLoading}
          >
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
              <Fingerprint className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-white text-sm font-medium">Registro Biométrico</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-slate-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
