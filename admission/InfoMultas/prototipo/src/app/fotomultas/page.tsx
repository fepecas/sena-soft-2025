import { Search, MessageCircle, Car, Home, FileText, Map, HelpCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { MobileHeader } from "@/components/mobile-header"

export default function FotomultasPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] dark:bg-background flex flex-col md:flex-row">
      <MobileHeader />
      <Navigation />

      {/* Main Fotomultas Content */}
      <div className="flex-1 bg-[#ffffff] dark:bg-card flex flex-col">
        <div className="p-4 md:p-6 border-b border-[#e8edf5] dark:border-border">
          <h1 className="text-xl md:text-2xl font-bold text-[#0d141c] dark:text-foreground mb-2">
            Consulta de Fotomultas
          </h1>
          <p className="text-[#61758a] dark:text-muted-foreground text-sm md:text-base">
            Consulta el estado de las multas de tu vehículo
          </p>
        </div>

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
            {/* Search Section */}
            <div className="bg-[#f0f2f5] dark:bg-muted rounded-lg p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold text-[#0d141c] dark:text-foreground mb-4">
                Buscar por Placa
              </h2>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#61758a] dark:text-muted-foreground" />
                <Input
                  placeholder="Ingrese placa del vehículo (ej: ABC-123)"
                  className="pl-12 h-10 md:h-12 text-base md:text-lg bg-white dark:bg-card border-[#dbe0e5] dark:border-border"
                />
              </div>
             <Button className="w-full h-10 md:h-12 bg-[#0d80f2] hover:bg-[#309ce8] text-white      dark:bg-primary dark:hover:bg-primary/90 dark:text-black text-base md:text-lg">
              Consultar Multas
            </Button>

            </div>

            {/* Vehicle Illustration */}
            <div className="bg-[#e8edf5] dark:bg-muted rounded-lg p-6 md:p-8 text-center">
              <div className="w-24 md:w-32 h-18 md:h-24 mx-auto mb-4 bg-[#4a739c] dark:bg-primary rounded-lg flex items-center justify-center">
                <Car className="w-8 md:w-12 h-8 md:h-12 text-[#ffffff] dark:text-primary-foreground" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-[#0d141c] dark:text-foreground mb-2">
                Consulta Rápida
              </h3>
              <p className="text-[#61758a] dark:text-muted-foreground text-sm md:text-base">
                Ingresa la placa de tu vehículo para consultar multas pendientes
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-[#0d141c] dark:text-foreground font-semibold text-base md:text-lg">Acceso Rápido</h3>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <Button
                  variant="outline"
                  className="h-14 md:h-16 border-[#dbe0e5] dark:border-border bg-transparent flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5 text-[#0d80f2] dark:text-primary" />
                  <div className="text-left">
                    <div className="font-medium text-sm md:text-base">Chatear con IA</div>
                    <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                      Asistente virtual
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-14 md:h-16 border-[#dbe0e5] dark:border-border bg-transparent flex items-center gap-3"
                >
                  <Map className="w-5 h-5 text-[#0d80f2] dark:text-primary" />
                  <div className="text-left">
                    <div className="font-medium text-sm md:text-base">Ver Mapa</div>
                    <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                      Cámaras en Popayán
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* External Links */}
            <div className="bg-[#f0f2f5] dark:bg-muted rounded-lg p-4">
              <h4 className="font-medium text-[#0d141c] dark:text-foreground mb-3 text-sm md:text-base">
                Enlaces Externos
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#dbe0e5] dark:border-border bg-white dark:bg-card text-xs md:text-sm"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#dbe0e5] dark:border-border bg-white dark:bg-card text-xs md:text-sm"
                >
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
