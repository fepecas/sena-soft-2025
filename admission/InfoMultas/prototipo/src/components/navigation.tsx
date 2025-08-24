"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Map, Camera, BarChart3, Search, Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useTheme } from "next-themes"

const navigationItems = [
  {
    name: "Fotomultas",
    href: "/fotomultas",
    icon: Search,
  },
  {
    name: "InfoMultas",
    href: "/infomultas",
    icon: MessageCircle,
  },
  {
    name: "Mapa",
    href: "/mapa",
    icon: Map,
  },
  {
    name: "Reportar",
    href: "/reportar",
    icon: Camera,
  },
  {
    name: "Panel",
    href: "/panel",
    icon: BarChart3,
  },
]

function NavigationContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  return (
    <>
      <div className="p-4 border-b border-[#e8edf5] dark:border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#0d141c] dark:text-foreground font-bold text-lg">InfoMultas</h1>
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href} onClick={onItemClick}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive
                      ? "bg-[#0d80f2] hover:bg-[#309ce8] text-white"
                      : "text-[#61758a] dark:text-muted-foreground hover:text-[#0d141c] dark:hover:text-foreground",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="p-4 border-t border-[#e8edf5] dark:border-border">
        <div className="text-xs text-[#61758a] dark:text-muted-foreground text-center">InfoMultas Colombia v1.0</div>
      </div>
    </>
  )
}

export function MobileMenuButton() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <nav className="h-full bg-[#ffffff] dark:bg-card flex flex-col">
          <NavigationContent onItemClick={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function Navigation() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return null
  }

  return (
    <nav className="w-64 bg-[#ffffff] dark:bg-card border-r border-[#e8edf5] dark:border-border flex flex-col">
      <NavigationContent />
    </nav>
  )
}
