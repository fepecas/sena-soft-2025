import { Camera, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { MobileHeader } from "@/components/mobile-header"

export default function ReportarPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] dark:bg-background flex">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <MobileHeader />

        {/* Report Camera Section */}
        <div className="flex-1 bg-[#ffffff] dark:bg-card flex flex-col">
          <div className="p-4 md:p-6 border-b border-[#e8edf5] dark:border-border">
            <h1 className="text-xl md:text-2xl font-bold text-[#0d141c] dark:text-foreground mb-2">Reportar Cámara</h1>
            <p className="text-sm md:text-base text-[#61758a] dark:text-muted-foreground">
              Ayúdanos a mantener actualizada la información de cámaras
            </p>
          </div>

          <div className="flex-1 p-4 md:p-6">
            <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
              {/* Report Form */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                    Descripción de la Ubicación
                  </label>
                  <Textarea
                    className="border-[#dbe0e5] dark:border-border min-h-[80px] md:min-h-[100px]"
                    placeholder="Describe la ubicación exacta de la cámara, referencias cercanas, tipo de vía, etc..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                    Foto Principal
                  </label>
                  <div className="bg-[#e8edf5] dark:bg-muted rounded-lg h-32 md:h-48 flex flex-col items-center justify-center border-2 border-dashed border-[#dbe0e5] dark:border-border hover:border-[#0d80f2] dark:hover:border-primary transition-colors cursor-pointer">
                    <Camera className="w-8 md:w-12 h-8 md:h-12 text-[#61758a] dark:text-muted-foreground mb-2" />
                    <p className="text-sm md:text-base text-[#61758a] dark:text-muted-foreground text-center px-4">
                      Haz clic para subir una foto de la cámara
                    </p>
                    <p className="text-xs text-[#61758a] dark:text-muted-foreground mt-1">JPG, PNG hasta 5MB</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                    Foto Adicional
                    <span className="text-xs text-[#61758a] dark:text-muted-foreground ml-2">(Opcional)</span>
                  </label>
                  <div className="bg-[#e8edf5] dark:bg-muted rounded-lg h-24 md:h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#dbe0e5] dark:border-border hover:border-[#0d80f2] dark:hover:border-primary transition-colors cursor-pointer">
                    <Plus className="w-6 md:w-8 h-6 md:h-8 text-[#61758a] dark:text-muted-foreground mb-1" />
                    <p className="text-sm text-[#61758a] dark:text-muted-foreground">Foto adicional</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                    Ubicación en el Mapa
                  </label>
                  <div className="bg-[#e8edf2] dark:bg-muted rounded-lg h-32 md:h-48 relative overflow-hidden border border-[#dbe0e5] dark:border-border">
                    <img src="/location-map-pin.png" alt="Mapa de ubicación" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="bg-white dark:bg-card rounded-lg p-2 md:p-3 shadow-sm mx-4">
                        <p className="text-xs md:text-sm text-[#0d141c] dark:text-foreground text-center">
                          Haz clic para seleccionar ubicación
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                      Tipo de Cámara
                    </label>
                    <select className="w-full h-10 px-3 border border-[#dbe0e5] dark:border-border rounded-md bg-white dark:bg-card text-[#0d141c] dark:text-foreground">
                      <option>Seleccionar tipo</option>
                      <option>Semáforo</option>
                      <option>Velocidad</option>
                      <option>Pare/Ceda</option>
                      <option>Carril exclusivo</option>
                      <option>Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                      Estado Observado
                    </label>
                    <select className="w-full h-10 px-3 border border-[#dbe0e5] dark:border-border rounded-md bg-white dark:bg-card text-[#0d141c] dark:text-foreground">
                      <option>Seleccionar estado</option>
                      <option>Funcionando</option>
                      <option>Dañada</option>
                      <option>Nueva instalación</option>
                      <option>Removida</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0d141c] dark:text-foreground mb-2 block">
                    Información de Contacto (Opcional)
                  </label>
                  <Input
                    className="border-[#dbe0e5] dark:border-border"
                    placeholder="Email o teléfono para seguimiento"
                  />
                </div>

                <Button className="w-full h-10 md:h-12 bg-[#0d80f2] hover:bg-[#309ce8] 
                 text-white dark:bg-primary dark:hover:bg-primary/90 
                 dark:text-black text-base md:text-lg">
                  <Upload className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Enviar Reporte
                </Button>

              </div>

              {/* Info Box */}
              <div className="bg-[#f0f2f5] dark:bg-muted rounded-lg p-3 md:p-4">
                <h3 className="font-medium text-[#0d141c] dark:text-foreground mb-2">¿Por qué reportar?</h3>
                <ul className="text-sm text-[#61758a] dark:text-muted-foreground space-y-1">
                  <li>• Ayuda a mantener información actualizada</li>
                  <li>• Contribuye a la seguridad vial</li>
                  <li>• Permite mejor planificación de rutas</li>
                  <li>• Apoya a otros conductores</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
