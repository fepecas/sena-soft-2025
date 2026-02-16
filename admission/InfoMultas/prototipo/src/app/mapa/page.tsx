import { Search, Plus, Home, Map, MessageCircle, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { MobileHeader } from "@/components/mobile-header"

export default function MapaPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] dark:bg-background flex flex-col md:flex-row">
      <MobileHeader />
      <Navigation />

      {/* Map Section */}
      <div className="flex-1 bg-[#ffffff] dark:bg-card flex flex-col">
        <div className="p-4 md:p-6 border-b border-[#e8edf5] dark:border-border">
          <h1 className="text-xl md:text-2xl font-bold text-[#0d141c] dark:text-foreground mb-2">
            Mapa de Cámaras - Popayán
          </h1>
          <p className="text-[#61758a] dark:text-muted-foreground text-sm md:text-base">
            Ubicación de cámaras de fotomultas en la ciudad
          </p>
        </div>

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#61758a] dark:text-muted-foreground" />
              <Input
                placeholder="Buscar ubicación en Popayán..."
                className="pl-12 h-10 md:h-12 border-[#dbe0e5] dark:border-border text-sm md:text-base"
              />
            </div>

            <div className="bg-[#e8edf2] dark:bg-muted rounded-lg h-64 md:h-96 relative overflow-hidden">
              <img
                src="/street-map-markers.png"
                alt="Mapa de Popayán con cámaras"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white dark:bg-card rounded-lg p-1.5 md:p-2 shadow-sm">
                <Plus className="w-4 md:w-5 h-4 md:h-5 text-[#61758a] dark:text-muted-foreground" />
              </div>

              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-white dark:bg-card rounded-lg p-3 md:p-4 shadow-sm">
                <h4 className="font-medium text-[#0d141c] dark:text-foreground mb-2 text-sm md:text-base">Leyenda</h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-[#088738] rounded-full"></div>
                    <span className="text-[#61758a] dark:text-muted-foreground">Cámara Activa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-[#0d80f2] rounded-full"></div>
                    <span className="text-[#61758a] dark:text-muted-foreground">En Revisión</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 md:w-3 h-2.5 md:h-3 bg-[#f59e0b] rounded-full"></div>
                    <span className="text-[#61758a] dark:text-muted-foreground">Sin Confirmar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div className="bg-[#f0f2f5] dark:bg-muted rounded-lg p-4">
                <h3 className="text-[#0d141c] dark:text-foreground font-semibold mb-3 text-sm md:text-base">
                  Estado de Cámaras
                </h3>
                <div className="grid grid-cols-3 gap-4 md:space-y-0 md:block md:space-y-3">
                  <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left">
                    <span className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground mb-1 md:mb-0">
                      Activas
                    </span>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-2 h-2 bg-[#088738] rounded-full"></div>
                      <span className="text-sm font-medium">24</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left">
                    <span className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground mb-1 md:mb-0">
                      En Revisión
                    </span>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-2 h-2 bg-[#0d80f2] rounded-full"></div>
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left">
                    <span className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground mb-1 md:mb-0">
                      Sin Confirmar
                    </span>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-2 h-2 bg-[#f59e0b] rounded-full"></div>
                      <span className="text-sm font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f0f2f5] dark:bg-muted rounded-lg p-4">
                  <h3 className="text-[#0d141c] dark:text-foreground font-semibold mb-3 text-sm md:text-base">
                    Ubicaciones Principales
                  </h3>
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                    <div className="text-[#61758a] dark:text-muted-foreground">• Calle 5 con Carrera 9</div>
                    <div className="text-[#61758a] dark:text-muted-foreground">• Carrera 6 con Calle 4</div>
                    <div className="text-[#61758a] dark:text-muted-foreground">• Panamericana Norte</div>
                    <div className="text-[#61758a] dark:text-muted-foreground">• Centro Histórico</div>
                  </div>
                </div>

                <div className="bg-[#f0f2f5] dark:bg-muted rounded-lg p-4">
                  <h3 className="text-[#0d141c] dark:text-foreground font-semibold mb-3 text-sm md:text-base">
                    Acciones Rápidas
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-[#dbe0e5] dark:border-border bg-transparent text-xs md:text-sm"
                    >
                      Reportar Cámara
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-[#dbe0e5] dark:border-border bg-transparent text-xs md:text-sm"
                    >
                      Ver Estadísticas
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
