"use client"

import { MobileMenuButton } from "@/components/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function MobileHeader() {
  const isMobile = useIsMobile()
  const { setTheme, theme } = useTheme()

  if (!isMobile) {
    return null
  }

  return (
    <header className="bg-[#ffffff] dark:bg-card border-b border-[#e8edf5] dark:border-border p-4 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-3">
        <MobileMenuButton />
        <h1 className="text-[#0d141c] dark:text-foreground font-bold text-lg">InfoMultas</h1>
      </div>
      <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </header>
  )
}
