import { MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { MobileHeader } from "@/components/mobile-header"

export default function InfoMultasPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] dark:bg-background flex flex-col md:flex-row">
      <MobileHeader />
      <Navigation />

      {/* Chat Assistant */}
      <div className="flex-1 bg-[#ffffff] dark:bg-card flex flex-col">
        <div className="p-4 md:p-6 border-b border-[#e8edf5] dark:border-border">
          <h1 className="text-xl md:text-2xl font-bold text-[#0d141c] dark:text-foreground mb-2">
            Asistente InfoMultas
          </h1>
          <p className="text-[#61758a] dark:text-muted-foreground text-sm md:text-base">
            Pregunta sobre normatividad vial y fotomultas
          </p>
        </div>

        <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground mb-4">
              Asistente InfoMultas
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#e8edf5] dark:bg-muted flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 md:w-5 h-4 md:h-5 text-[#4a739c] dark:text-muted-foreground" />
                </div>
                <div className="flex-1 bg-[#f0f2f5] dark:bg-muted rounded-lg p-3 md:p-4">
                  <p className="text-foreground leading-relaxed text-sm md:text-base">
                    ¡Hola! Estoy aquí para ayudarte con cualquier pregunta sobre fotomultas, infracciones de tránsito y
                    normatividad vial en Colombia. ¿En qué puedo ayudarte hoy?
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#0d80f2] dark:bg-primary text-white dark:text-black p-3 md:p-4 rounded-lg max-w-xs md:max-w-md">
                  <p className="text-xs md:text-sm">
                    Hola, recibí una fotomulta en Popayán. ¿Cómo puedo consultar los detalles y pagarla?
                  </p>
                </div>
              </div>


              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#e8edf5] dark:bg-muted flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 md:w-5 h-4 md:h-5 text-[#4a739c] dark:text-muted-foreground" />
                </div>
                <div className="flex-1 bg-[#f0f2f5] dark:bg-muted rounded-lg p-3 md:p-4">
                  <p className="text-[#0d141c] dark:text-foreground leading-relaxed text-sm md:text-base">
                    Puedes consultar los detalles de tu fotomulta y pagarla a través del sitio web del SIMIT o en
                    centros de pago autorizados. Necesitarás tu número de cédula y el número de la infracción. ¿Te
                    gustaría que te proporcione el enlace directo al SIMIT?
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#0d80f2] dark:bg-primary text-white dark:text-black p-3 md:p-4 rounded-lg max-w-xs md:max-w-md">
                  <p className="text-xs md:text-sm">
                    Sí, por favor. También me gustaría saber cuáles son los plazos para pagar sin recargos.
                  </p>
                </div>
              </div>


              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#e8edf5] dark:bg-muted flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 md:w-5 h-4 md:h-5 text-[#4a739c] dark:text-muted-foreground" />
                </div>
                <div className="flex-1 bg-[#f0f2f5] dark:bg-muted rounded-lg p-3 md:p-4">
                  <p className="text-[#0d141c] dark:text-foreground leading-relaxed text-sm md:text-base">
                    Perfecto. Puedes acceder al SIMIT en www.simit.org.co. Para los plazos de pago:
                    <br />• Tienes 30 días calendario desde la notificación para pagar con descuento del 50%
                    <br />• Después de 30 días, pagas el valor total
                    <br />• Si no pagas en 60 días, se generan intereses de mora
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-[#e8edf5] dark:border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 md:gap-3">
              <Input
                placeholder="Escribe tu pregunta sobre fotomultas..."
                className="flex-1 border-[#dbe0e5] dark:border-border h-10 md:h-12 text-sm md:text-base"
              />
              <Button
                size="icon"
                className="bg-[#0d80f2] hover:bg-[#309ce8] dark:bg-primary dark:hover:bg-primary/90 h-10 md:h-12 w-10 md:w-12"
              >
                <Send className="w-4 md:w-5 h-4 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
