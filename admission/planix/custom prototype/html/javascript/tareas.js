class TaskManager {
  constructor() {
    this.tasks = this.loadTasks()
    this.currentFilter = "all"
    this.currentSort = "dueDate"
    this.currentView = "grid"
    this.selectedColor = "indigo"
    this.selectedCategory = ""
    this.productivityTips = [
      "Divide las tareas grandes en subtareas más pequeñas. Esto te ayudará a mantener el momentum y sentir progreso constante.",
      "Usa la técnica Pomodoro: trabaja 25 minutos, descansa 5. Es perfecta para mantener la concentración.",
      "Prioriza las tareas más importantes al inicio del día cuando tienes más energía mental.",
      "Establece deadlines realistas. Es mejor completar una tarea bien que varias a medias.",
      "Celebra los pequeños logros. Cada tarea completada es un paso hacia tus objetivos.",
      "Elimina las distracciones durante el tiempo de trabajo. Tu futuro yo te lo agradecerá.",
      "Revisa y ajusta tus prioridades semanalmente. La flexibilidad es clave para el éxito.",
    ]

    this.init()
  }

  init() {
    this.showLoadingAnimation()

    setTimeout(() => {
      this.bindEvents()
      this.renderTasks()
      this.updateTaskCounts()
      this.updateWelcomeBanner()
      this.hideLoadingAnimation()
    }, 1000)
  }

  showLoadingAnimation() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.remove("hidden")
    }
  }

  hideLoadingAnimation() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.add("hidden")
    }
  }

  updateWelcomeBanner() {
    const pendingTasks = this.tasks.filter((t) => !t.completed).length
    const completedToday = this.tasks.filter((t) => {
      if (!t.completedAt) return false
      const today = new Date().toDateString()
      return new Date(t.completedAt).toDateString() === today
    }).length

    const pendingElement = document.getElementById("pendingTasksCount")
    const completedElement = document.getElementById("completedToday")

    if (pendingElement) pendingElement.textContent = pendingTasks
    if (completedElement) completedElement.textContent = completedToday
  }

  rotateTip() {
    const tipElement = document.getElementById("dailyTip")
    if (tipElement) {
      const randomTip = this.productivityTips[Math.floor(Math.random() * this.productivityTips.length)]
      tipElement.textContent = randomTip
    }
  }

  bindEvents() {
    // Modal events
    const createTaskBtn = document.getElementById("createTaskBtn")
    const closeTaskModal = document.getElementById("closeTaskModal")
    const cancelTaskBtn = document.getElementById("cancelTaskBtn")
    const taskForm = document.getElementById("taskForm")
    const nextTipBtn = document.getElementById("nextTipBtn")
    const emptyStateCreateBtn = document.getElementById("emptyStateCreateBtn")

    if (createTaskBtn) createTaskBtn.addEventListener("click", () => this.openTaskModal())
    if (closeTaskModal) closeTaskModal.addEventListener("click", () => this.closeTaskModal())
    if (cancelTaskBtn) cancelTaskBtn.addEventListener("click", () => this.closeTaskModal())
    if (taskForm) taskForm.addEventListener("submit", (e) => this.handleTaskSubmit(e))
    if (nextTipBtn) nextTipBtn.addEventListener("click", () => this.rotateTip())
    if (emptyStateCreateBtn) emptyStateCreateBtn.addEventListener("click", () => this.openTaskModal())

    // Color selection
    document.querySelectorAll(".color-option").forEach((option) => {
      option.addEventListener("click", (e) => this.selectColor(e))
    })

    // Category selection
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.selectCategory(e))
    })

    // Filter events
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilter(e))
    })

    // Sort and view events
    const sortSelect = document.getElementById("sortSelect")
    const gridViewBtn = document.getElementById("gridViewBtn")
    const listViewBtn = document.getElementById("listViewBtn")

    if (sortSelect) sortSelect.addEventListener("change", (e) => this.handleSort(e))
    if (gridViewBtn) gridViewBtn.addEventListener("click", () => this.setView("grid"))
    if (listViewBtn) listViewBtn.addEventListener("click", () => this.setView("list"))

    // Close modal on overlay click
    const taskModal = document.getElementById("taskModal")
    if (taskModal) {
      taskModal.addEventListener("click", (e) => {
        if (e.target.id === "taskModal") {
          this.closeTaskModal()
        }
      })
    }
  }

  openTaskModal(task = null) {
    const modal = document.getElementById("taskModal")
    const form = document.getElementById("taskForm")

    if (task) {
      this.populateForm(task)
      document.querySelector("#taskModal h2").textContent = "Editar tarea"
    } else {
      if (form) form.reset()
      this.selectedColor = "indigo"
      this.selectedCategory = ""
      this.updateColorSelection()
      this.updateCategorySelection()
      document.querySelector("#taskModal h2").textContent = "Nueva tarea"
    }

    if (modal) {
      modal.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    }

    setTimeout(() => {
      const titleInput = document.getElementById("taskTitle")
      if (titleInput) titleInput.focus()
    }, 300)
  }

  closeTaskModal() {
    const modal = document.getElementById("taskModal")
    if (modal) {
      modal.classList.add("hidden")
      document.body.style.overflow = "auto"
    }
  }

  handleTaskSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const taskData = {
      id: Date.now().toString(),
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      dueDate: formData.get("dueDate"),
      reminder: formData.get("reminder"),
      priority: formData.get("priority"),
      project: formData.get("project"),
      color: this.selectedColor,
      category: this.selectedCategory,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    if (!taskData.title) {
      this.showNotification("El título es obligatorio", "error")
      return
    }

    if (!taskData.category) {
      this.showNotification("Selecciona una categoría", "error")
      return
    }

    this.addTask(taskData)
    this.closeTaskModal()
    this.showNotification("¡Tarea creada exitosamente! 🎉", "success")
  }

  addTask(taskData) {
    this.tasks.unshift(taskData)
    this.saveTasks()
    this.renderTasks()
    this.updateTaskCounts()
    this.updateWelcomeBanner()
  }

  deleteTask(taskId) {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.saveTasks()
      this.renderTasks()
      this.updateTaskCounts()
      this.showNotification("Tarea eliminada", "success")
    }
  }

  toggleTaskComplete(taskId) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (task) {
      task.completed = !task.completed
      task.completedAt = task.completed ? new Date().toISOString() : null
      this.saveTasks()
      this.renderTasks()
      this.updateTaskCounts()
      this.updateWelcomeBanner()

      const message = task.completed ? "Tarea completada" : "Tarea marcada como pendiente"
      this.showNotification(message, "success")
    }
  }

  selectColor(e) {
    document.querySelectorAll(".color-option").forEach((option) => {
      option.classList.remove("ring-2", "ring-offset-2")
    })

    const colorOption = e.target
    this.selectedColor = colorOption.dataset.color
    colorOption.classList.add("ring-2", "ring-offset-2")
  }

  selectCategory(e) {
    e.preventDefault()

    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("bg-blue-500", "text-white")
      btn.classList.add("bg-gray-100", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300")
    })

    const categoryBtn = e.target.closest(".category-btn")
    this.selectedCategory = categoryBtn.dataset.category
    categoryBtn.classList.remove("bg-gray-100", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300")
    categoryBtn.classList.add("bg-blue-500", "text-white")
  }

  updateColorSelection() {
    document.querySelectorAll(".color-option").forEach((option) => {
      option.classList.remove("ring-2", "ring-offset-2")
      if (option.dataset.color === this.selectedColor) {
        option.classList.add("ring-2", "ring-offset-2")
      }
    })
  }

  updateCategorySelection() {
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("bg-blue-500", "text-white")
      btn.classList.add("bg-gray-100", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300")

      if (btn.dataset.category === this.selectedCategory) {
        btn.classList.remove("bg-gray-100", "dark:bg-gray-700", "text-gray-700", "dark:text-gray-300")
        btn.classList.add("bg-blue-500", "text-white")
      }
    })
  }

  handleFilter(e) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active", "bg-blue-500", "text-white")
      btn.classList.add("bg-gray-200", "dark:bg-gray-700", "text-gray-800", "dark:text-gray-200")
    })

    e.target.classList.remove("bg-gray-200", "dark:bg-gray-700", "text-gray-800", "dark:text-gray-200")
    e.target.classList.add("active", "bg-blue-500", "text-white")

    this.currentFilter = e.target.dataset.filter
    this.renderTasks()
  }

  handleSort(e) {
    this.currentSort = e.target.value
    this.renderTasks()
  }

  setView(view) {
    this.currentView = view

    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active", "bg-white", "dark:bg-gray-600", "text-gray-900", "dark:text-white")
      btn.classList.add("text-gray-600", "dark:text-gray-400")
    })

    if (view === "grid") {
      const gridBtn = document.getElementById("gridViewBtn")
      if (gridBtn) {
        gridBtn.classList.remove("text-gray-600", "dark:text-gray-400")
        gridBtn.classList.add("active", "bg-white", "dark:bg-gray-600", "text-gray-900", "dark:text-white")
      }
    } else {
      const listBtn = document.getElementById("listViewBtn")
      if (listBtn) {
        listBtn.classList.remove("text-gray-600", "dark:text-gray-400")
        listBtn.classList.add("active", "bg-white", "dark:bg-gray-600", "text-gray-900", "dark:text-white")
      }
    }

    this.renderTasks()
  }

  getFilteredTasks() {
    let filtered = [...this.tasks]

    switch (this.currentFilter) {
      case "pending":
        filtered = filtered.filter((task) => !task.completed)
        break
      case "completed":
        filtered = filtered.filter((task) => task.completed)
        break
      case "overdue":
        filtered = filtered.filter((task) => {
          if (!task.dueDate || task.completed) return false
          return new Date(task.dueDate) < new Date()
        })
        break
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (this.currentSort) {
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "alphabetical":
          return a.title.localeCompare(b.title)
        case "dueDate":
        default:
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
      }
    })

    return filtered
  }

  renderTasks() {
    const container = document.getElementById("tasksContainer")
    const emptyState = document.getElementById("emptyState")
    const filteredTasks = this.getFilteredTasks()

    if (filteredTasks.length === 0) {
      if (container) container.innerHTML = ""
      if (emptyState) emptyState.classList.remove("hidden")
      return
    }

    if (emptyState) emptyState.classList.add("hidden")

    if (container) {
      if (this.currentView === "list") {
        container.className = "space-y-3"
      } else {
        container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      }

      container.innerHTML = filteredTasks.map((task) => this.createTaskCard(task)).join("")
      this.bindTaskEvents()
    }
  }

  createTaskCard(task) {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    const priorityColors = {
      urgent: "text-red-500",
      high: "text-orange-500",
      medium: "text-yellow-500",
      low: "text-green-500",
    }

    const categoryIcons = {
      trabajo: "fas fa-briefcase",
      personal: "fas fa-user",
      estudio: "fas fa-graduation-cap",
    }

    const colorClasses = {
      indigo:
        "border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      purple:
        "border-l-purple-500 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      blue: "border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      pink: "border-l-pink-500 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20",
      yellow:
        "border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
    }

    return `
            <div class="task-card group bg-white dark:bg-gray-800 border-l-4 ${colorClasses[task.color]} rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-4 ${task.completed ? "opacity-60" : ""}">
                <div class="flex items-start justify-between mb-3">
                    <button class="task-complete-btn w-6 h-6 rounded-full border-2 ${task.completed ? `bg-${task.color}-500 border-${task.color}-500` : "border-gray-300 dark:border-gray-600"} flex items-center justify-center hover:border-${task.color}-500 transition-all duration-300 transform hover:scale-110" data-task-id="${task.id}">
                        ${task.completed ? '<i class="fas fa-check text-white text-xs"></i>' : ""}
                    </button>
                    <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button class="task-edit-btn p-1 text-gray-400 hover:text-blue-500 transition-all duration-200 transform hover:scale-110" data-task-id="${task.id}">
                            <i class="fas fa-edit text-sm"></i>
                        </button>
                        <button class="task-delete-btn p-1 text-gray-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110" data-task-id="${task.id}">
                            <i class="fas fa-trash text-sm"></i>
                        </button>
                    </div>
                </div>
                
                <h3 class="font-medium text-gray-900 dark:text-white mb-2 ${task.completed ? "line-through" : ""}">${task.title}</h3>
                
                ${task.description ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">${task.description}</p>` : ""}
                
                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span class="flex items-center">
                        <i class="${categoryIcons[task.category]} mr-1"></i>
                        ${task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </span>
                    ${
                      task.priority
                        ? `<span class="flex items-center ${priorityColors[task.priority]}">
                        <i class="fas fa-flag mr-1"></i>
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>`
                        : ""
                    }
                </div>
                
                ${
                  task.dueDate
                    ? `<div class="flex items-center text-sm ${isOverdue ? "text-red-500" : "text-gray-500 dark:text-gray-400"}">
                    <i class="fas fa-calendar mr-2"></i>
                    ${this.formatDate(task.dueDate)}
                    ${isOverdue ? '<span class="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Vencida</span>' : ""}
                </div>`
                    : ""
                }
                
                ${
                  task.project
                    ? `<div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <i class="fas fa-project-diagram mr-1"></i>
                    ${task.project}
                </div>`
                    : ""
                }
            </div>
        `
  }

  bindTaskEvents() {
    document.querySelectorAll(".task-complete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        this.toggleTaskComplete(btn.dataset.taskId)
      })
    })

    document.querySelectorAll(".task-edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const task = this.tasks.find((t) => t.id === btn.dataset.taskId)
        this.openTaskModal(task)
      })
    })

    document.querySelectorAll(".task-delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        this.deleteTask(btn.dataset.taskId)
      })
    })
  }

  updateTaskCounts() {
    const all = this.tasks.length
    const pending = this.tasks.filter((t) => !t.completed).length
    const completed = this.tasks.filter((t) => t.completed).length
    const overdue = this.tasks.filter((t) => {
      if (!t.dueDate || t.completed) return false
      return new Date(t.dueDate) < new Date()
    }).length

    const allSpan = document.querySelector('[data-filter="all"] span')
    const pendingSpan = document.querySelector('[data-filter="pending"] span')
    const completedSpan = document.querySelector('[data-filter="completed"] span')
    const overdueSpan = document.querySelector('[data-filter="overdue"] span')

    if (allSpan) allSpan.textContent = all
    if (pendingSpan) pendingSpan.textContent = pending
    if (completedSpan) completedSpan.textContent = completed
    if (overdueSpan) overdueSpan.textContent = overdue
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoy"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana"
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-xl transition-all duration-500`

    switch (type) {
      case "success":
        notification.classList.add("bg-green-500", "text-white")
        break
      case "error":
        notification.classList.add("bg-red-500", "text-white")
        break
      default:
        notification.classList.add("bg-blue-500", "text-white")
    }

    notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-triangle" : "info-circle"} text-lg"></i>
                </div>
                <div class="flex-1">
                    <span class="font-medium">${message}</span>
                </div>
                <button class="notification-close text-white hover:text-gray-200 transition-colors duration-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `

    document.body.appendChild(notification)

    notification.querySelector(".notification-close").addEventListener("click", () => {
      document.body.removeChild(notification)
    })

    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 4000)
  }

  loadTasks() {
    const saved = localStorage.getItem("planix_tasks")
    if (saved) {
      return JSON.parse(saved)
    }

    return [
      {
        id: "1",
        title: "Completar presentación del proyecto",
        description: "Finalizar las diapositivas y preparar la demo para la reunión del viernes",
        dueDate: "2025-08-25",
        reminder: "09:00",
        priority: "high",
        project: "proyecto1",
        color: "blue",
        category: "trabajo",
        completed: false,
        createdAt: "2025-08-20T10:00:00.000Z",
      },
      {
        id: "2",
        title: "Estudiar para examen de matemáticas",
        description: "Repasar capítulos 5-8 del libro de cálculo",
        dueDate: "2025-08-24",
        reminder: "14:00",
        priority: "urgent",
        project: "",
        color: "purple",
        category: "estudio",
        completed: false,
        createdAt: "2025-08-19T15:30:00.000Z",
      },
      {
        id: "3",
        title: "Comprar regalo de cumpleaños",
        description: "Buscar un regalo especial para el cumpleaños de mamá",
        dueDate: "2025-08-23",
        reminder: "",
        priority: "medium",
        project: "",
        color: "pink",
        category: "personal",
        completed: true,
        createdAt: "2025-08-18T12:00:00.000Z",
        completedAt: "2025-08-21T16:45:00.000Z",
      },
    ]
  }

  saveTasks() {
    localStorage.setItem("planix_tasks", JSON.stringify(this.tasks))
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TaskManager()
})
