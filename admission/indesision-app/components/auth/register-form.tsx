"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/lib/context/app-context"
import { User, Mail, Lock, MapPin, Chrome } from "lucide-react"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    gender: "",
    style: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useApp()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration - in real app, this would call an API
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        location: formData.location,
        gender: formData.gender,
        style: formData.style,
      }

      dispatch({ type: "SET_USER", payload: newUser })
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const handleGoogleRegister = () => {
    // Placeholder for Google OAuth integration
    console.log("Google register clicked - requires OAuth setup")
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Ciudad</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            type="text"
            placeholder="Bogotá, Medellín, Cali..."
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Identidad de moda</Label>
        <Select onValueChange={(value) => updateFormData("gender", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu identidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="femenino">Femenino</SelectItem>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
            <SelectItem value="no-binario">No binario</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="style">Estilo preferido</Label>
        <Select onValueChange={(value) => updateFormData("style", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="elegante">Elegante</SelectItem>
            <SelectItem value="deportivo">Deportivo</SelectItem>
            <SelectItem value="bohemio">Bohemio</SelectItem>
            <SelectItem value="minimalista">Minimalista</SelectItem>
            <SelectItem value="urbano">Urbano</SelectItem>
            <SelectItem value="vintage">Vintage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleGoogleRegister}>
        <Chrome className="mr-2 h-4 w-4" />
        Registrarse con Google
      </Button>
    </form>
  )
}
