// Progress Dashboard Animations and Interactions
document.addEventListener("DOMContentLoaded", () => {
  // Animate progress bars on load
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('[style*="width:"]')
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = width
      }, 300)
    })
  }

  // Animate chart bars
  function animateChartBars() {
    const chartBars = document.querySelectorAll('[style*="height:"]')
    chartBars.forEach((bar, index) => {
      const height = bar.style.height
      bar.style.height = "0px"
      setTimeout(
        () => {
          bar.style.height = height
        },
        500 + index * 100,
      )
    })
  }

  // Counter animation for numbers
  function animateCounters() {
    const counters = document.querySelectorAll(".text-2xl")
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.textContent)
      if (!isNaN(target)) {
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            counter.textContent = target
            clearInterval(timer)
          } else {
            counter.textContent = Math.floor(current)
          }
        }, 30)
      }
    })
  }

  // Hover effects for cards
  function addCardHoverEffects() {
    const cards = document.querySelectorAll(".hover\\:shadow-md")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
      })
    })
  }

  // Interactive chart bars
  function addChartInteractivity() {
    const chartBars = document.querySelectorAll('[style*="height:"]')
    chartBars.forEach((bar) => {
      bar.addEventListener("mouseenter", function () {
        this.style.opacity = "0.8"
        this.style.transform = "scaleY(1.05)"
        this.style.transformOrigin = "bottom"
      })

      bar.addEventListener("mouseleave", function () {
        this.style.opacity = "1"
        this.style.transform = "scaleY(1)"
      })
    })
  }

  // Update page title
  document.getElementById("pageTitle").textContent = "Mi Progreso"

  // Initialize animations
  setTimeout(animateProgressBars, 500)
  setTimeout(animateChartBars, 800)
  setTimeout(animateCounters, 1000)
  addCardHoverEffects()
  addChartInteractivity()

  // Refresh data simulation
  setInterval(() => {
    // Simulate real-time updates
    const randomCards = document.querySelectorAll(".text-2xl")
    randomCards.forEach((card) => {
      if (Math.random() > 0.95) {
        // 5% chance to update
        const currentValue = Number.parseInt(card.textContent)
        if (!isNaN(currentValue)) {
          const change = Math.random() > 0.5 ? 1 : -1
          card.textContent = Math.max(0, currentValue + change)
        }
      }
    })
  }, 10000) // Update every 10 seconds
})
