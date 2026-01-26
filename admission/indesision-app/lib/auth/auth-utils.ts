export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  location: string
  gender: string
  style: string
}

// Mock authentication functions - in a real app, these would call your backend API
export async function loginUser(credentials: LoginCredentials) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          id: "1",
          name: "Usuario Demo",
          email: credentials.email,
          location: "Bogotá",
          gender: "Unisex",
          style: "Casual",
        },
      })
    }, 1000)
  })
}

export async function registerUser(data: RegisterData) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          location: data.location,
          gender: data.gender,
          style: data.style,
        },
      })
    }, 1000)
  })
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}
