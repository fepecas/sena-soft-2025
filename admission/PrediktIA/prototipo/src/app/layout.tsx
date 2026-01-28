import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider as CustomThemeProvider } from "@/contexts/theme-context"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "PrediktIA - Predicción temprana, decisiones seguras",
  description:
    "Inteligencia artificial agéntica que monitorea mercados en tiempo real para identificar y notificar riesgos antes de que se materialicen.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <CustomThemeProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </CustomThemeProvider>
      </body>
    </html>
  )
}
