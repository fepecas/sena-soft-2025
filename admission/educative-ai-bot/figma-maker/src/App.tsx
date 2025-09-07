'use client'

import { useState } from 'react'
import { Button } from './components/ui/button'
import { WeeklyCalendar } from './components/WeeklyCalendar'
import { VerticalTaskList } from './components/VerticalTaskList'
import { OnboardingScreen } from './components/OnboardingScreen'
import { LoginScreen } from './components/LoginScreen'
import { AddTaskScreen } from './components/AddTaskScreen'
import { TaskDetailScreen } from './components/TaskDetailScreen'
import { SmartReminderScreen } from './components/SmartReminderScreen'
import { MicroQuizScreen } from './components/MicroQuizScreen'
import { SubjectsScreen } from './components/SubjectsScreen'
import { GlobalCalendarScreen } from './components/GlobalCalendarScreen'
import { AchievementsScreen } from './components/AchievementsScreen'
import { Plus, Bell, LogOut, User, Calendar, BookOpen, Trophy, Filter } from 'lucide-react'
import { ProfileScreen } from './components/ProfileScreen'
import { EditTaskScreen } from './components/EditTaskScreen'

// Datos de ejemplo
const initialTasks = {
  urgent: [
    {
      id: '1',
      title: 'Examen de Cálculo Integral',
      subject: 'Matemáticas',
      subjectIcon: '📘',
      dueTime: 'Hoy 2:00 PM',
      dueDate: new Date(),
      priority: 'urgent' as const,
      isStarred: true,
      description: 'Repasar derivadas, integrales y límites. Estudiar capítulos 5-8 del libro.'
    },
    {
      id: '2',
      title: 'Entrega ensayo sobre la Guerra Civil',
      subject: 'Historia',
      subjectIcon: '📜',
      dueTime: 'Hoy 11:59 PM',
      dueDate: new Date(),
      priority: 'urgent' as const,
      description: 'Ensayo de 1500 palabras sobre las causas y consecuencias de la Guerra Civil.'
    }
  ],
  today: [
    {
      id: '3',
      title: 'Laboratorio de Química Orgánica',
      subject: 'Química',
      subjectIcon: '🧪',
      dueTime: '3:00 PM',
      dueDate: new Date(),
      priority: 'today' as const,
      description: 'Práctica de síntesis orgánica en el laboratorio.'
    },
    {
      id: '4',
      title: 'Presentación grupal Romeo y Julieta',
      subject: 'Literatura',
      subjectIcon: '📖',
      dueTime: '4:30 PM',
      dueDate: new Date(),
      priority: 'today' as const,
      isStarred: true,
      description: 'Presentación de 15 minutos sobre los temas principales de la obra.'
    }
  ],
  upcoming: [
    {
      id: '5',
      title: 'Resolver problemas de Momentum',
      subject: 'Física',
      subjectIcon: '⚡',
      dueTime: 'Mañana',
      dueDate: new Date(Date.now() + 86400000),
      priority: 'upcoming' as const,
      description: 'Resolver ejercicios del capítulo 12 sobre conservación del momentum.'
    },
    {
      id: '6',
      title: 'Estudiar para quiz de Derivadas',
      subject: 'Matemáticas',
      subjectIcon: '📘',
      dueTime: 'Miércoles',
      dueDate: new Date(Date.now() + 172800000),
      priority: 'upcoming' as const,
      description: 'Quiz sobre reglas de derivación y aplicaciones.'
    },
    {
      id: '7',
      title: 'Preparar experimento de pH',
      subject: 'Química',
      subjectIcon: '🧪',
      dueTime: 'Jueves',
      dueDate: new Date(Date.now() + 259200000),
      priority: 'upcoming' as const,
      description: 'Preparar materiales para el laboratorio de pH y ácidos.'
    },
    {
      id: '8',
      title: 'Leer capítulos 5-7 de Don Quijote',
      subject: 'Literatura',
      subjectIcon: '📖',
      dueTime: 'Viernes',
      dueDate: new Date(Date.now() + 345600000),
      priority: 'upcoming' as const,
      description: 'Lectura obligatoria para el análisis literario.'
    }
  ]
}

// Datos de materias
const initialSubjects = [
  { id: '1', name: 'Matemáticas', icon: '📘', color: 'bg-blue-500', pendingTasks: 3 },
  { id: '2', name: 'Química', icon: '🧪', color: 'bg-green-500', pendingTasks: 2 },
  { id: '3', name: 'Historia', icon: '📜', color: 'bg-purple-500', pendingTasks: 1 },
  { id: '4', name: 'Literatura', icon: '📖', color: 'bg-indigo-500', pendingTasks: 2 },
  { id: '5', name: 'Física', icon: '⚡', color: 'bg-orange-500', pendingTasks: 1 },
  { id: '6', name: 'Inglés', icon: '🗣️', color: 'bg-pink-500', pendingTasks: 0 },
  { id: '7', name: 'Arte', icon: '🎨', color: 'bg-red-500', pendingTasks: 0 },
  { id: '8', name: 'Biología', icon: '🌱', color: 'bg-green-600', pendingTasks: 0 }
]

type Screen = 'onboarding' | 'login' | 'dashboard' | 'add-task' | 'edit-task' | 'task-detail' | 'smart-reminder' | 'micro-quiz' | 'subjects' | 'calendar' | 'achievements' | 'profile'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const [subjects, setSubjects] = useState(initialSubjects)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showReminder, setShowReminder] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [completedTask, setCompletedTask] = useState<any>(null) // Nuevo estado para la tarea completada

  // Convertir tareas a array plano para la lista vertical
  const allTasks = [
    ...tasks.urgent,
    ...tasks.today,
    ...tasks.upcoming
  ]

  // Filtrar tareas por día seleccionado
  const getTasksForDate = (date: Date) => {
    return allTasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      return taskDate.toDateString() === date.toDateString()
    })
  }

  const tasksForSelectedDate = getTasksForDate(selectedDate)

  // Funciones de autenticación
  const handleStart = () => {
    setCurrentScreen('login')
  }

  const handleLogin = (email: string, password: string) => {
    // Validación simple para demo (en una app real sería una llamada a API)
    if (email.includes('@') && password.length >= 6) {
      setIsAuthenticated(true)
      setUserEmail(email)
      setCurrentScreen('dashboard')
    } else {
      alert('Credenciales inválidas')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserEmail('')
    setCurrentScreen('onboarding')
    setSelectedTask(null)
    setSelectedDate(new Date())
    setCompletedTask(null) // Reset tarea completada
  }

  const handleBackToLogin = () => {
    setCurrentScreen('login')
  }

  // Función para manejar selección de día en el calendario
  const handleDaySelect = (date: Date) => {
    setSelectedDate(date)
  }

  // Funciones de navegación existentes
  const handleAddTask = () => {
    setCurrentScreen('add-task')
  }

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard')
    setSelectedTask(null)
    setCompletedTask(null)
  }

  // CAMBIO: handleSaveTask ya no lleva al micro-quiz, solo vuelve al dashboard
  const handleSaveTask = (newTask: any) => {
    // Determinar la prioridad basada en la fecha
    const today = new Date()
    const taskDate = new Date(newTask.dueDate)
    const diffTime = taskDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let priority: 'urgent' | 'today' | 'upcoming' = 'upcoming'
    if (diffDays <= 0) {
      priority = 'urgent'
    } else if (diffDays === 1) {
      priority = 'today'
    }

    const taskWithPriority = {
      ...newTask,
      priority,
      dueTime: newTask.dueTime || (diffDays === 0 ? 'Hoy' : diffDays === 1 ? 'Mañana' : `En ${diffDays} días`)
    }

    // Agregar la tarea a la columna correspondiente
    setTasks(prevTasks => ({
      ...prevTasks,
      [priority]: [...prevTasks[priority], taskWithPriority]
    }))

    // CAMBIO: Volver directamente al dashboard, sin micro-quiz
    setCurrentScreen('dashboard')
  }

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setCurrentScreen('task-detail')
  }

  // CAMBIO: handleMarkComplete ahora lleva al micro-quiz
  const handleMarkComplete = (taskId: string) => {
    // Encontrar la tarea completada para pasarla al micro-quiz
    const completedTaskData = allTasks.find(task => task.id === taskId)
    
    // Remover la tarea de su columna actual
    const updatedTasks = { ...tasks }
    Object.keys(updatedTasks).forEach(key => {
      updatedTasks[key as keyof typeof updatedTasks] = updatedTasks[key as keyof typeof updatedTasks].filter(task => task.id !== taskId)
    })
    setTasks(updatedTasks)
    
    // Guardar la tarea completada y mostrar micro-quiz
    setCompletedTask(completedTaskData)
    setCurrentScreen('micro-quiz')
  }

  const handleEditTask = (task: any) => {
    setSelectedTask(task)
    setCurrentScreen('edit-task')
  }

  // Nueva función para manejar la actualización de tareas
  const handleUpdateTask = (updatedTask: any) => {
    // Determinar la prioridad basada en la nueva fecha
    const today = new Date()
    const taskDate = new Date(updatedTask.dueDate)
    const diffTime = taskDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let priority: 'urgent' | 'today' | 'upcoming' = 'upcoming'
    if (diffDays <= 0) {
      priority = 'urgent'
    } else if (diffDays === 1) {
      priority = 'today'
    }

    const taskWithUpdatedPriority = {
      ...updatedTask,
      priority,
      dueTime: updatedTask.dueTime || (diffDays === 0 ? 'Hoy' : diffDays === 1 ? 'Mañana' : `En ${diffDays} días`)
    }

    // Remover la tarea de todas las columnas
    const updatedTasks = { ...tasks }
    Object.keys(updatedTasks).forEach(key => {
      updatedTasks[key as keyof typeof updatedTasks] = updatedTasks[key as keyof typeof updatedTasks].filter(task => task.id !== updatedTask.id)
    })

    // Agregar la tarea actualizada a la columna correspondiente
    updatedTasks[priority] = [...updatedTasks[priority], taskWithUpdatedPriority]
    
    setTasks(updatedTasks)
    setCurrentScreen('dashboard')
    setSelectedTask(null)
  }

  const handleShowReminder = () => {
    setShowReminder(true)
  }

  const handleStartNow = () => {
    setShowReminder(false)
    if (selectedTask) {
      setCurrentScreen('task-detail')
    }
  }

  const handleDismissReminder = () => {
    setShowReminder(false)
  }

  const handleSubmitQuizAnswer = (answer: string) => {
    console.log('Quiz answer:', answer)
    console.log('Completed task:', completedTask)
    setCurrentScreen('dashboard')
    setCompletedTask(null) // Limpiar la tarea completada
  }

  const handleOpenCalendar = () => {
    setCurrentScreen('calendar')
  }

  const handleOpenSubjects = () => {
    setCurrentScreen('subjects')
  }

  const handleOpenAchievements = () => {
    setCurrentScreen('achievements')
  }

  // Funciones para perfil
  const handleOpenProfile = () => {
    setCurrentScreen('profile')
  }

  const handleEditProfile = () => {
    // Por ahora solo muestra un alert, pero aquí se podría abrir un modal de edición
    alert('Funcionalidad de edición de perfil - próximamente disponible!')
  }

  // Funciones para materias
  const handleAddSubject = (newSubject: Omit<{id: string, name: string, icon: string, color: string, pendingTasks: number}, 'id'>) => {
    const subjectWithId = {
      ...newSubject,
      id: Date.now().toString() // ID único basado en timestamp
    }
    setSubjects(prevSubjects => [...prevSubjects, subjectWithId])
  }

  // Función para mostrar todas las tareas (resetear filtro)
  const handleShowAllTasks = () => {
    setSelectedDate(new Date()) // Volver a hoy
  }

  // Pantalla de onboarding
  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onStart={handleStart} />
  }

  // Pantalla de login
  if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onBack={() => setCurrentScreen('onboarding')}
        onLogin={handleLogin}
      />
    )
  }

  // Verificar autenticación para el resto de pantallas
  if (!isAuthenticated) {
    return <OnboardingScreen onStart={handleStart} />
  }

  // Pantalla de agregar tarea
  if (currentScreen === 'add-task') {
    return (
      <AddTaskScreen
        onBack={handleBackToDashboard}
        onSave={handleSaveTask}
      />
    )
  }

  // Pantalla de editar tarea
  if (currentScreen === 'edit-task' && selectedTask) {
    return (
      <EditTaskScreen
        onBack={handleBackToDashboard}
        onSave={handleUpdateTask}
        task={selectedTask}
      />
    )
  }

  // Pantalla de detalle de tarea
  if (currentScreen === 'task-detail' && selectedTask) {
    return (
      <TaskDetailScreen
        task={selectedTask}
        onBack={handleBackToDashboard}
        onMarkComplete={handleMarkComplete}
        onEdit={handleEditTask}
      />
    )
  }

  // CAMBIO: Micro-quiz ahora solo para tareas completadas
  if (currentScreen === 'micro-quiz' && completedTask) {
    return (
      <MicroQuizScreen
        onBack={handleBackToDashboard}
        onSubmitAnswer={handleSubmitQuizAnswer}
        question={`¡Felicidades por completar "${completedTask.title}"! 🎉 ¿Qué fue lo más interesante que aprendiste con esta tarea? ¿Cómo te ayudará en tu proceso de estudio?`}
        subject="Reflexión"
        subjectIcon="💭"
        completedTask={completedTask}
      />
    )
  }

  // Pantalla de materias
  if (currentScreen === 'subjects') {
    return (
      <SubjectsScreen
        onBack={handleBackToDashboard}
        subjects={subjects}
        onAddSubject={handleAddSubject}
      />
    )
  }

  // Pantalla de calendario global
  if (currentScreen === 'calendar') {
    return (
      <GlobalCalendarScreen
        onBack={handleBackToDashboard}
        tasks={allTasks}
        onTaskClick={handleTaskClick}
      />
    )
  }

  // Pantalla de logros
  if (currentScreen === 'achievements') {
    return (
      <AchievementsScreen
        onBack={handleBackToDashboard}
        currentStreak={3}
        totalTasksCompleted={42}
        weeklyGoal={10}
        weeklyCompleted={7}
      />
    )
  }

  // Pantalla de perfil
  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        onBack={handleBackToDashboard}
        onEditProfile={handleEditProfile}
        userEmail={userEmail}
      />
    )
  }

  // Dashboard principal - CON CALENDARIO INTERACTIVO
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-orange-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-green-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-orange-400 rounded-full blur-lg"></div>
      </div>

      {/* Header con botón de logout */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">5.0</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-600">¡Hola, {userEmail.split('@')[0]}! 🚀</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 w-10 p-0 relative rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-700"
              onClick={handleShowReminder}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 w-10 p-0 rounded-xl bg-green-100 hover:bg-green-200 text-green-700"
              onClick={handleOpenProfile}
              title="Ver perfil"
            >
              <User className="h-5 w-5" />
            </Button>
            {/* Botón de logout - reemplaza el botón de búsqueda */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 w-10 p-0 rounded-xl bg-red-100 hover:bg-red-200 text-red-700"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal - SCROLL SOLO VERTICAL */}
      <div className="relative z-10 pb-32 overflow-y-auto">
        {/* Calendario semanal interactivo */}
        <div className="p-4 pb-0">
          <WeeklyCalendar 
            onCalendarClick={handleOpenCalendar}
            onDaySelect={handleDaySelect}
            selectedDate={selectedDate}
          />
        </div>
        
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-4 mb-6 mx-4">
          <div className="bg-white/60 backdrop-blur-sm border border-red-200 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-1">{tasks.urgent.length}</div>
            <div className="text-sm font-bold text-red-700">🚨 Urgentes</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-orange-200 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-1">{tasks.today.length}</div>
            <div className="text-sm font-bold text-orange-700">📅 Hoy</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">{tasks.upcoming.length}</div>
            <div className="text-sm font-bold text-blue-700">⏳ Próximas</div>
          </div>
        </div>

        {/* Indicador de filtro por día y botón para mostrar todas */}
        <div className="mx-4 mb-4 flex items-center justify-between">
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-700">
                📅 {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long',
                  day: 'numeric', 
                  month: 'short' 
                })}
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-bold">
                {tasksForSelectedDate.length} tarea{tasksForSelectedDate.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          {selectedDate.toDateString() !== new Date().toDateString() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShowAllTasks}
              className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 shadow-lg text-sm font-bold text-gray-700 hover:bg-white/80"
            >
              Ver todas las tareas
            </Button>
          )}
        </div>

        {/* Lista vertical de tareas filtrada por día seleccionado */}
        <VerticalTaskList 
          allTasks={tasksForSelectedDate.length > 0 ? tasksForSelectedDate : allTasks}
          onTaskClick={handleTaskClick}
        />
        
        {/* Mensaje cuando no hay tareas para el día seleccionado */}
        {tasksForSelectedDate.length === 0 && selectedDate.toDateString() !== new Date().toDateString() && (
          <div className="mx-4 mb-6">
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡Día libre!</h3>
              <p className="text-gray-600 font-medium mb-4">No tienes tareas programadas para este día</p>
              <Button
                onClick={handleAddTask}
                className="bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white font-bold rounded-2xl px-6 py-2"
              >
                ➕ Agregar tarea para este día
              </Button>
            </div>
          </div>
        )}
        
        {/* Espaciado inferior para el navbar */}
        <div className="h-6"></div>
      </div>

      {/* Navegación inferior - 3 PESTAÑAS COMO ESPECIFICADO */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="mx-4 mb-4 bg-white/90 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-3 gap-1 p-3">
            <Button 
              variant="ghost" 
              className={`flex-col h-16 rounded-2xl transition-all duration-200 ${
                currentScreen === 'calendar' ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100 text-blue-700'
              }`}
              onClick={handleOpenCalendar}
            >
              <Calendar className="h-6 w-6 mb-1" />
              <span className="text-xs font-bold">📅 Calendario</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className={`flex-col h-16 rounded-2xl transition-all duration-200 ${
                currentScreen === 'subjects' ? 'bg-green-100 text-green-700' : 'hover:bg-green-100 text-green-700'
              }`}
              onClick={handleOpenSubjects}
            >
              <BookOpen className="h-6 w-6 mb-1" />
              <span className="text-xs font-bold">📘 Materias</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className={`flex-col h-16 rounded-2xl transition-all duration-200 ${
                currentScreen === 'achievements' ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-100 text-orange-700'
              }`}
              onClick={handleOpenAchievements}
            >
              <Trophy className="h-6 w-6 mb-1" />
              <span className="text-xs font-bold">🏆 Logros</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Botón flotante para agregar tarea - SEPARADO DEL NAVBAR */}
      <Button
        onClick={handleAddTask}
        size="lg"
        className="fixed bottom-24 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 hover:from-blue-700 hover:via-green-700 hover:to-orange-700 text-white shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-110 active:scale-95 z-20"
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* Recordatorio inteligente */}
      {showReminder && (
        <SmartReminderScreen
          task={{
            title: 'Examen de Cálculo Integral',
            subject: 'Matemáticas',
            subjectIcon: '📘',
            dueTime: 'En 30 minutos'
          }}
          onStartNow={handleStartNow}
          onDismiss={handleDismissReminder}
        />
      )}
    </div>
  )
}