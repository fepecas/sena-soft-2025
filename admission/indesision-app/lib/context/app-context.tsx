"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  location: string
  gender: string
  style: string
}

interface WardrobeItem {
  id: string
  name: string
  type: string
  color: string
  material: string
  category: string
  imageUrl: string
  tags: string[]
}

interface Outfit {
  id: string
  name: string
  items: WardrobeItem[]
  occasion: string
  description: string
  weather: string
  createdAt: string
}

interface AppState {
  user: User | null
  wardrobe: WardrobeItem[]
  favorites: Outfit[]
  currentWeather: any
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "ADD_WARDROBE_ITEM"; payload: WardrobeItem }
  | { type: "REMOVE_WARDROBE_ITEM"; payload: string }
  | { type: "ADD_FAVORITE"; payload: Outfit }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "SET_WEATHER"; payload: any }
  | { type: "LOGOUT" }

const initialState: AppState = {
  user: null,
  wardrobe: [],
  favorites: [],
  currentWeather: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "ADD_WARDROBE_ITEM":
      return { ...state, wardrobe: [...state.wardrobe, action.payload] }
    case "REMOVE_WARDROBE_ITEM":
      return { ...state, wardrobe: state.wardrobe.filter((item) => item.id !== action.payload) }
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] }
    case "REMOVE_FAVORITE":
      return { ...state, favorites: state.favorites.filter((outfit) => outfit.id !== action.payload) }
    case "SET_WEATHER":
      return { ...state, currentWeather: action.payload }
    case "LOGOUT":
      return initialState
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
