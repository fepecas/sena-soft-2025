import { LoginForm } from "@/components/auth/login-form"
import { BackButton } from "@/components/ui/back-button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="absolute top-4 left-4">
          <BackButton href="/" />
        </div>

        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-2xl">I</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Indesision</h1>
          <p className="text-muted-foreground mt-2">Tu asistente de moda personal</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-8 border">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-card-foreground">Iniciar Sesión</h2>
              <p className="text-muted-foreground mt-1">Accede a tu guardarropa digital</p>
            </div>

            <LoginForm />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
