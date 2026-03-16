"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

interface LogoutConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }: LogoutConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-background border shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <LogOut className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-lg font-semibold">¿Cerrar sesión?</CardTitle>
          <CardDescription>
            ¿Estás seguro de que quieres cerrar sesión? Perderás el progreso no guardado.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={onConfirm} variant="destructive" className="w-full">
            Sí, cerrar sesión
          </Button>
          <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
