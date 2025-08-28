"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  Bot,
  CalendarIcon,
  BarChart3,
  BookOpen,
  Settings,
  Send,
  Plus,
  Clock,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
} from "lucide-react"

// Datos simulados según los requerimientos
const userData = {
  usuario: {
    id: 1,
    nombre: "Juan Pérez",
    nivel: "Secundaria",
    metas: ["Mejorar matemáticas", "Practicar inglés 30 min/día"],
  },
  progreso: {
    matematicas: 70,
    ingles: 50,
    ciencias: 80,
    historia: 65,
  },
  recordatorios: [
    { fecha: "2025-08-24", tarea: "Practicar 10 ejercicios de álgebra" },
    { fecha: "2025-08-25", tarea: "Leer un artículo en inglés" },
  ],
  recursos: [
    { materia: "Matemáticas", tipo: "video", titulo: "Ecuaciones paso a paso" },
    { materia: "Inglés", tipo: "quiz", titulo: "Vocabulario básico de viajes" },
  ],
}

export default function TutorIAApp() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { type: "tutor", message: "¡Hola! Soy tu tutor de IA. ¿En qué puedo ayudarte hoy?" },
  ])
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", level: "" })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "tutor", label: "Tutor IA", icon: Bot },
    { id: "planificador", label: "Planificador", icon: CalendarIcon },
    { id: "progreso", label: "Progreso", icon: BarChart3 },
    { id: "recursos", label: "Recursos", icon: BookOpen },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de login - guardar en JSON
    const loginInfo = {
      timestamp: new Date().toISOString(),
      email: loginData.email,
      action: "login",
    }
    console.log("Login data saved:", JSON.stringify(loginInfo, null, 2))
    setIsLoggedIn(true)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de registro - guardar en JSON
    const registerInfo = {
      timestamp: new Date().toISOString(),
      ...registerData,
      action: "register",
    }
    console.log("Register data saved:", JSON.stringify(registerInfo, null, 2))
    setIsLoggedIn(true)
  }

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = { type: "student", message: chatMessage }
    setChatHistory((prev) => [...prev, newMessage])

    // Simulación de respuesta del tutor IA
    setTimeout(() => {
      const tutorResponse = {
        type: "tutor",
        message: `Entiendo tu pregunta sobre "${chatMessage}". Te ayudo paso a paso: 1) Primero identifica los conceptos clave, 2) Aplica la fórmula correspondiente, 3) Verifica tu resultado. ¿Te gustaría que profundice en algún punto específico?`,
      }
      setChatHistory((prev) => [...prev, tutorResponse])
    }, 1000)

    setChatMessage("")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white text-center">
            <h1 className="font-serif text-2xl font-black mb-2">Tutor IA</h1>
            <p className="text-blue-100">Asistente de Aprendizaje Personalizado</p>
          </div>

          <div className="p-6">
            <div className="flex gap-2 mb-6">
              <Button
                variant={showLogin ? "default" : "outline"}
                onClick={() => setShowLogin(true)}
                className="flex-1 rounded-full"
              >
                Iniciar Sesión
              </Button>
              <Button
                variant={!showLogin ? "default" : "outline"}
                onClick={() => setShowLogin(false)}
                className="flex-1 rounded-full"
              >
                Registrarse
              </Button>
            </div>

            {showLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl">
                  Iniciar Sesión
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="level">Nivel educativo</Label>
                  <Input
                    id="level"
                    placeholder="Ej: Secundaria, Universidad"
                    value={registerData.level}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, level: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                    className="rounded-xl"
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl">
                  Registrarse
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[800px]">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 text-white">
          <div className="flex items-center justify-center">
            <h1 className="font-serif text-lg font-black">Tutor IA</h1>
          </div>
          <p className="text-center text-sm text-blue-100 mt-1">¡Hola, {userData.usuario.nombre}!</p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {activeSection === "inicio" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="font-serif text-xl font-black mb-1">Dashboard</h2>
                <p className="text-sm text-muted-foreground">Bienvenido de vuelta</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Card className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-muted-foreground">Semanal</span>
                    </div>
                    <div className="text-lg font-bold">75%</div>
                    <p className="text-xs text-muted-foreground">Progreso</p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-xs text-muted-foreground">Tareas</span>
                    </div>
                    <div className="text-lg font-bold">{userData.recordatorios.length}</div>
                    <p className="text-xs text-muted-foreground">Pendientes</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif text-lg font-bold mb-1">¿Necesitas ayuda?</h3>
                  <p className="text-sm opacity-90 mb-3">Pregunta al Tutor IA</p>
                  <Button
                    variant="secondary"
                    onClick={() => setActiveSection("tutor")}
                    className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl"
                  >
                    Preguntar ahora
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Progreso por Materia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(userData.progreso).map(([materia, progreso]) => (
                    <div key={materia} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium">{materia}</span>
                        <span className="font-bold">{progreso}%</span>
                      </div>
                      <Progress value={progreso} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Tus Metas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userData.usuario.metas.map((meta, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Target className="h-3 w-3 text-blue-600" />
                        <span>{meta}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "tutor" && (
            <div className="space-y-4 h-full flex flex-col">
              <div className="text-center">
                <h2 className="font-serif text-xl font-black mb-1">Chat con Tutor IA</h2>
                <p className="text-sm text-muted-foreground">Haz cualquier pregunta</p>
              </div>

              <Card className="flex-1 rounded-2xl">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === "student" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                            chat.type === "student" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribe tu pregunta..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="rounded-xl"
                    />
                    <Button onClick={handleSendMessage} className="rounded-xl">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm" className="justify-start rounded-xl bg-transparent">
                  <Plus className="h-3 w-3 mr-2" />
                  Explicar más simple
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl bg-transparent">
                  <Plus className="h-3 w-3 mr-2" />
                  Dame un ejemplo
                </Button>
              </div>
            </div>
          )}

          {activeSection === "planificador" && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="font-serif text-xl font-black mb-1">Planificador</h2>
                <p className="text-sm text-muted-foreground">Organiza tu tiempo</p>
              </div>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Recordatorios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.recordatorios.map((recordatorio, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{recordatorio.tarea}</p>
                          <p className="text-xs text-muted-foreground">{recordatorio.fecha}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Meta
              </Button>
            </div>
          )}

          {activeSection === "progreso" && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="font-serif text-xl font-black mb-1">Progreso</h2>
                <p className="text-sm text-muted-foreground">Tu rendimiento académico</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(userData.progreso).map(([materia, progreso]) => (
                  <Card key={materia} className="rounded-2xl">
                    <CardContent className="p-4">
                      <h3 className="font-serif capitalize text-sm font-bold mb-2">{materia}</h3>
                      <div className="space-y-2">
                        <div className="text-lg font-bold">{progreso}%</div>
                        <Progress value={progreso} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg font-bold">66%</p>
                      <p className="text-xs text-muted-foreground">Promedio</p>
                    </div>
                    <div>
                      <Award className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                      <p className="text-lg font-bold">12</p>
                      <p className="text-xs text-muted-foreground">Ejercicios</p>
                    </div>
                    <div>
                      <Clock className="h-6 w-6 text-green-600 mx-auto mb-1" />
                      <p className="text-lg font-bold">45h</p>
                      <p className="text-xs text-muted-foreground">Tiempo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "recursos" && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="font-serif text-xl font-black mb-1">Recursos</h2>
                <p className="text-sm text-muted-foreground">Materiales personalizados</p>
              </div>

              <div className="space-y-3">
                {userData.recursos.map((recurso, index) => (
                  <Card key={index} className="rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-sm font-bold">{recurso.titulo}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {recurso.tipo}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{recurso.materia}</p>
                      <Button size="sm" className="w-full rounded-xl">
                        <BookOpen className="h-3 w-3 mr-2" />
                        Acceder
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Generar Recurso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="materia" className="text-sm">
                      Materia
                    </Label>
                    <Input id="materia" placeholder="Ej: Matemáticas..." className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="tema" className="text-sm">
                      Tema específico
                    </Label>
                    <Input id="tema" placeholder="Ej: Ecuaciones..." className="rounded-xl" />
                  </div>
                  <Button className="w-full rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Generar
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "configuracion" && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="font-serif text-xl font-black mb-1">Configuración</h2>
                <p className="text-sm text-muted-foreground">Personaliza tu experiencia</p>
              </div>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="nombre" className="text-sm">
                      Nombre
                    </Label>
                    <Input id="nombre" defaultValue={userData.usuario.nombre} className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="nivel" className="text-sm">
                      Nivel Educativo
                    </Label>
                    <Input id="nivel" defaultValue={userData.usuario.nivel} className="rounded-xl" />
                  </div>
                  <Button className="w-full rounded-xl">Guardar Cambios</Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">Preferencias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="horario" className="text-sm">
                      Horario Preferido
                    </Label>
                    <Input id="horario" placeholder="9:00 AM - 11:00 AM" className="rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="dificultad" className="text-sm">
                      Nivel de Dificultad
                    </Label>
                    <Input id="dificultad" placeholder="Básico, Intermedio..." className="rounded-xl" />
                  </div>
                  <Button className="w-full rounded-xl">Actualizar</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="bg-white border-t border-gray-200 p-2">
          <div className="flex justify-around">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                    activeSection === item.id ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
