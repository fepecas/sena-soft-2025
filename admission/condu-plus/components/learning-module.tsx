"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, X, Target, Shield, Trophy } from "lucide-react"

interface LearningModuleProps {
  moduleId: string
  onBack: () => void
  onComplete: (moduleId: string, xpEarned: number) => void
}

export default function LearningModule({ moduleId, onBack, onComplete }: LearningModuleProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const savedProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
      return savedProgress[moduleId]?.currentLessonIndex || 0
    }
    return 0
  })

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const savedProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
      return savedProgress[moduleId]?.currentStepIndex || 0
    }
    return 0
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  const [moduleProgress, setModuleProgress] = useState<{ [key: number]: boolean }>(() => {
    if (typeof window !== "undefined") {
      const savedProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
      return savedProgress[moduleId]?.moduleProgress || {}
    }
    return {}
  })

  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>(() => {
    if (typeof window !== "undefined") {
      const savedProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
      return savedProgress[moduleId]?.userAnswers || {}
    }
    return {}
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const progressData = {
        moduleId,
        currentLessonIndex,
        currentStepIndex,
        moduleProgress,
        userAnswers, // Save user answers to localStorage
        timestamp: Date.now(),
      }

      const existingProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
      existingProgress[moduleId] = progressData
      localStorage.setItem("motoSeguroModuleProgress", JSON.stringify(existingProgress))
    }
  }, [moduleId, currentLessonIndex, currentStepIndex, moduleProgress, userAnswers])

  const moduleData = {
    signals: {
      title: "Señales de Tránsito",
      icon: Target,
      lessons: [
        {
          id: 1,
          title: "Señales de Advertencia",
          description: "Aprende a identificar señales que alertan sobre peligros",
          steps: [
            {
              type: "content",
              title: "¿Qué son las señales de advertencia?",
              content:
                "Las señales de advertencia son triangulares con borde rojo y fondo blanco. Su función es alertar a los conductores sobre peligros o situaciones especiales en la vía.",
              image: "/placeholder-cjkvr.jpg",
            },
            {
              type: "quiz",
              question: "¿Cuál es la forma de las señales de advertencia?",
              options: ["Circular", "Triangular", "Rectangular", "Octagonal"],
              correctAnswer: 1,
              explanation: "Las señales de advertencia siempre son triangulares con borde rojo.",
              points: 25,
            },
            {
              type: "visual-activity",
              title: "Identifica la señal correcta",
              question: "Selecciona la señal de advertencia de curva peligrosa:",
              options: [
                {
                  image: "/placeholder-owis8.png",
                  label: "Curva peligrosa",
                  correct: true,
                },
                {
                  image: "/circular-no-entry-sign.png",
                  label: "Prohibido el paso",
                  correct: false,
                },
                {
                  image: "/placeholder-cft8i.jpg",
                  label: "Información",
                  correct: false,
                },
              ],
              points: 30,
            },
          ],
        },
        {
          id: 2,
          title: "Señales de Prohibición",
          description: "Conoce las señales que indican restricciones",
          steps: [
            {
              type: "content",
              title: "Señales de Prohibición",
              content:
                "Las señales de prohibición son circulares con borde rojo y una línea diagonal. Indican acciones que están prohibidas en esa zona.",
              image: "/prohibition-sign.png",
            },
            {
              type: "quiz",
              question: "¿Qué significa una señal circular con borde rojo?",
              options: ["Advertencia", "Información", "Prohibición", "Obligación"],
              correctAnswer: 2,
              explanation: "Las señales circulares con borde rojo siempre indican prohibición.",
              points: 25,
            },
          ],
        },
      ],
    },
    helmet: {
      title: "Uso del Casco",
      icon: Shield,
      lessons: [
        {
          id: 1,
          title: "Importancia del Casco",
          description: "Por qué es vital usar casco al conducir moto",
          steps: [
            {
              type: "content",
              title: "Tu vida vale más que cualquier prisa",
              content:
                "El casco reduce en un 70% el riesgo de muerte y en un 65% el riesgo de lesiones graves en la cabeza. Es tu mejor protección en caso de accidente.",
              image: "/motorcycle-helmet-safety.png",
            },
            {
              type: "visual-activity",
              title: "Selecciona el casco correcto",
              question: "¿Cuál de estos cascos ofrece mejor protección?",
              options: [
                {
                  image: "/full-face-helmet.png",
                  label: "Casco integral",
                  correct: true,
                },
                {
                  image: "/half-motorcycle-helmet.png",
                  label: "Medio casco",
                  correct: false,
                },
                {
                  image: "/bicycle-helmet.png",
                  label: "Casco de bicicleta",
                  correct: false,
                },
              ],
              points: 35,
            },
          ],
        },
      ],
    },
  }

  const currentModule = moduleData[moduleId as keyof typeof moduleData]
  const currentLesson = currentModule?.lessons[currentLessonIndex]
  const currentStep = currentLesson?.steps[currentStepIndex]
  const totalLessons = currentModule?.lessons.length || 0
  const totalSteps = currentLesson?.steps.length || 0

  const handleAnswerSelect = (answerIndex: number) => {
    const answerKey = `lesson_${currentLessonIndex}_step_${currentStepIndex}`

    setUserAnswers((prev) => ({
      ...prev,
      [answerKey]: answerIndex,
    }))

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    // Auto-advance after showing feedback
    setTimeout(() => {
      handleNextStep()
    }, 2000)
  }

  const handleVisualActivitySelect = (optionIndex: number) => {
    const answerKey = `lesson_${currentLessonIndex}_step_${currentStepIndex}`

    setUserAnswers((prev) => ({
      ...prev,
      [answerKey]: optionIndex,
    }))

    setSelectedAnswer(optionIndex)
    setShowFeedback(true)

    setTimeout(() => {
      handleNextStep()
    }, 2000)
  }

  const handleNextStep = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else if (currentLessonIndex < totalLessons - 1) {
      // Mark current lesson as completed
      setModuleProgress({ ...moduleProgress, [currentLessonIndex]: true })
      setCurrentLessonIndex(currentLessonIndex + 1)
      setCurrentStepIndex(0)
      setLessonCompleted(true)
      setTimeout(() => setLessonCompleted(false), 2000)
    } else {
      const finalModuleProgress = { ...moduleProgress, [currentLessonIndex]: true }

      const finalProgressData = {
        moduleId,
        currentLessonIndex: totalLessons, // Mark as fully completed
        currentStepIndex: 0,
        moduleProgress: finalModuleProgress,
        userAnswers,
        completed: true, // Mark module as completed
        completionDate: Date.now(),
        timestamp: Date.now(),
      }

      if (typeof window !== "undefined") {
        const existingProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
        existingProgress[moduleId] = finalProgressData
        localStorage.setItem("motoSeguroModuleProgress", JSON.stringify(existingProgress))

        // Also update dashboard progress
        const dashboardProgress = JSON.parse(localStorage.getItem("motoSeguroDashboard") || "{}")
        if (!dashboardProgress.moduleProgress) {
          dashboardProgress.moduleProgress = {}
        }
        dashboardProgress.moduleProgress[moduleId] = 100 // Set to 100% completed
        localStorage.setItem("motoSeguroDashboard", JSON.stringify(dashboardProgress))
      }

      const totalXP = currentModule.lessons.reduce(
        (total, lesson) => total + lesson.steps.reduce((stepTotal, step) => stepTotal + (step.points || 0), 0),
        0,
      )

      onComplete(moduleId, totalXP)
    }
  }

  const handleBackToDashboard = () => {
    const progressData = {
      moduleId,
      currentLessonIndex,
      currentStepIndex,
      moduleProgress,
      userAnswers, // Save answers when going back to dashboard
      timestamp: Date.now(),
    }

    if (typeof window !== "undefined") {
      const existingProgress = JSON.parse(localStorage.getItem("motoSeguroModuleProgress") || "{}")
      existingProgress[moduleId] = progressData
      localStorage.setItem("motoSeguroModuleProgress", JSON.stringify(existingProgress))
    }

    onBack()
  }

  const overallProgress = ((currentLessonIndex * totalSteps + currentStepIndex + 1) / (totalLessons * totalSteps)) * 100

  const answerKey = `lesson_${currentLessonIndex}_step_${currentStepIndex}`
  const previousAnswer = userAnswers[answerKey]
  const hasBeenAnswered = previousAnswer !== undefined

  useEffect(() => {
    if (hasBeenAnswered && (currentStep.type === "quiz" || currentStep.type === "visual-activity")) {
      setSelectedAnswer(previousAnswer)
      setShowFeedback(true)
    } else {
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }, [currentLessonIndex, currentStepIndex, hasBeenAnswered, previousAnswer, currentStep.type])

  if (!currentModule || !currentLesson || !currentStep) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Módulo no encontrado</p>
          <Button onClick={onBack} className="mt-4">
            Volver al dashboard
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = currentModule.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <IconComponent className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-lg font-bold text-foreground">{currentModule.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Lección {currentLessonIndex + 1} de {totalLessons}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{Math.round(overallProgress)}% completado</p>
            <Progress value={overallProgress} className="w-32 h-2 mt-1" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Lesson completed celebration */}
        {lessonCompleted && (
          <Card className="mb-6 border-accent bg-accent/5">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-accent mx-auto mb-3" />
              <h2 className="text-xl font-bold text-foreground mb-2">¡Lección completada!</h2>
              <p className="text-muted-foreground">Has ganado puntos de experiencia</p>
            </CardContent>
          </Card>
        )}

        {/* Main content */}
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {currentStepIndex + 1}
              </span>
              {currentStep.title || currentLesson.title}
            </CardTitle>
            <CardDescription>{currentLesson.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Step */}
            {currentStep.type === "content" && (
              <div className="space-y-4">
                <img
                  src={currentStep.image || "/placeholder.svg"}
                  alt="Contenido educativo"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <p className="text-foreground leading-relaxed">{currentStep.content}</p>
              </div>
            )}

            {/* Quiz Step */}
            {currentStep.type === "quiz" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{currentStep.question}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentStep.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showFeedback
                          ? index === currentStep.correctAnswer
                            ? "default"
                            : selectedAnswer === index
                              ? "destructive"
                              : "outline"
                          : "outline"
                      }
                      className={`justify-start h-auto p-4 text-left bg-transparent ${
                        showFeedback && index === currentStep.correctAnswer ? "bg-accent hover:bg-accent" : ""
                      }`}
                      onClick={() => !showFeedback && handleAnswerSelect(index)}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center gap-3">
                        {showFeedback && index === currentStep.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-accent-foreground" />
                        )}
                        {showFeedback && selectedAnswer === index && index !== currentStep.correctAnswer && (
                          <X className="h-5 w-5 text-destructive-foreground" />
                        )}
                        {option}
                      </div>
                    </Button>
                  ))}
                </div>
                {showFeedback && (
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Explicación:</strong> {currentStep.explanation}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-accent">
                      <Trophy className="h-4 w-4" />+{currentStep.points} XP
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Visual Activity Step */}
            {currentStep.type === "visual-activity" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{currentStep.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentStep.options?.map((option, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        showFeedback
                          ? option.correct
                            ? "border-accent bg-accent/10"
                            : selectedAnswer === index
                              ? "border-destructive bg-destructive/10"
                              : ""
                          : "hover:border-primary"
                      }`}
                      onClick={() => !showFeedback && handleVisualActivitySelect(index)}
                    >
                      <CardContent className="p-4 text-center">
                        <img
                          src={option.image || "/placeholder.svg"}
                          alt={option.label}
                          className="w-full h-24 object-contain mb-3"
                        />
                        <p className="font-medium">{option.label}</p>
                        {showFeedback && option.correct && <CheckCircle className="h-6 w-6 text-accent mx-auto mt-2" />}
                        {showFeedback && selectedAnswer === index && !option.correct && (
                          <X className="h-6 w-6 text-destructive mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {showFeedback && (
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-accent">
                      <Trophy className="h-4 w-4" />+{currentStep.points} XP ganados
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBackToDashboard}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>
          <Button
            onClick={handleNextStep}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!showFeedback && (currentStep.type === "quiz" || currentStep.type === "visual-activity")}
          >
            {currentStepIndex === totalSteps - 1 && currentLessonIndex === totalLessons - 1 ? "Finalizar" : "Siguiente"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
