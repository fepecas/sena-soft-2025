import { Search, Car, CheckCircle, AlertCircle, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { MobileHeader } from "@/components/mobile-header"

export default function PanelPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] dark:bg-background flex">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <MobileHeader />

        <div className="flex-1 bg-[#ffffff] dark:bg-card flex flex-col">
          <div className="p-4 md:p-6 border-b border-[#e8edf5] dark:border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#0d141c] dark:text-foreground mb-2">
                Panel de Control
              </h1>
              <p className="text-sm md:text-base text-[#61758a] dark:text-muted-foreground">
                Resumen de multas y estado de vehículos
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="flex-1 p-4 md:p-6 space-y-6 md:space-y-8">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <Card className="p-3 md:p-6 border-[#dbe0e5] dark:border-border">
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#0d80f2] dark:bg-primary rounded-lg flex items-center justify-center">
                      <Car className="w-4 h-4 md:w-6 md:h-6 text-white dark:text-black" />
                    </div>

                    <div className="text-center md:text-left">
                      <div className="text-lg md:text-2xl font-bold text-[#0d141c] dark:text-foreground">12</div>
                      <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">Vehículos</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 md:p-6 border-[#dbe0e5] dark:border-border">
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#f59e0b] rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-lg md:text-2xl font-bold text-[#0d141c] dark:text-foreground">5</div>
                      <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">Multas Activas</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 md:p-6 border-[#dbe0e5] dark:border-border">
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#088738] rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-lg md:text-2xl font-bold text-[#0d141c] dark:text-foreground">7</div>
                      <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">Sin Multas</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 md:p-6 border-[#dbe0e5] dark:border-border">
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#4a739c] dark:bg-secondary rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white dark:text-secondary-foreground" />
                    </div>
                    <div className="text-center md:text-left">
                      <div className="text-lg md:text-2xl font-bold text-[#0d141c] dark:text-foreground">$750K</div>
                      <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">Total Multas</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#0d141c] dark:text-foreground mb-4">
                    Historial de Consultas
                  </h3>
                  <div className="space-y-3">
                    <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0d80f2] dark:bg-primary rounded-lg flex items-center justify-center">
                          <Car className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            Vehículo ABC-123
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground truncate">
                            Multa #1234567890
                          </div>
                          <div className="text-xs text-[#61758a] dark:text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            Hace 2 horas
                          </div>
                        </div>
                        <Car className="w-4 h-4 text-[#61758a] dark:text-muted-foreground flex-shrink-0" />
                      </div>
                    </Card>

                    <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#4a739c] dark:bg-secondary rounded-lg flex items-center justify-center">
                          <Car className="w-4 h-4 md:w-5 md:h-5 text-white dark:text-secondary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            Vehículo XYZ-987
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground truncate">
                            Multa #9876543210
                          </div>
                          <div className="text-xs text-[#61758a] dark:text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            Hace 1 día
                          </div>
                        </div>
                        <Car className="w-4 h-4 text-[#61758a] dark:text-muted-foreground flex-shrink-0" />
                      </div>
                    </Card>

                    <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#088738] rounded-lg flex items-center justify-center">
                          <Car className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            Vehículo DEF-456
                          </div>
                          <div className="text-xs md:text-sm text-[#088738]">Sin multas pendientes</div>
                          <div className="text-xs text-[#61758a] dark:text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            Hace 3 días
                          </div>
                        </div>
                        <CheckCircle className="w-4 h-4 text-[#088738] flex-shrink-0" />
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#0d141c] dark:text-foreground mb-4">
                    Multas Activas
                  </h3>
                  <div className="space-y-4">
                    <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            2024-07-20
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                            Calle 5 con Carrera 9, Popayán
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="font-bold text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            $250,000
                          </div>
                          <div className="text-xs text-[#f59e0b]">Vence en 15 días</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 mt-3">
                        <Button size="sm" className="bg-[#0d80f2] hover:bg-[#309ce8] text-white">
                          Ver Detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#dbe0e5] dark:border-border bg-transparent"
                        >
                          Pagar
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            2024-06-15
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                            Carrera 6 con Calle 4, Popayán
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="font-bold text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            $180,000
                          </div>
                          <div className="text-xs text-[#088738]">Descuento 50%</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 mt-3">
                        <Button size="sm" className="bg-[#0d80f2] hover:bg-[#309ce8] text-white">
                          Ver Detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#dbe0e5] dark:border-border bg-transparent"
                        >
                          Pagar
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            2024-05-03
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                            Panamericana Norte, Popayán
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="font-bold text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            $320,000
                          </div>
                          <div className="text-xs text-[#ef4444]">Vencida</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 mt-3">
                        <Button size="sm" className="bg-[#0d80f2] hover:bg-[#309ce8] text-white">
                          Ver Detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#dbe0e5] dark:border-border bg-transparent"
                        >
                          Pagar
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[#0d141c] dark:text-foreground mb-4">
                  Estado General de Vehículos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Car className="w-4 h-4 md:w-5 md:h-5 text-[#61758a] dark:text-muted-foreground" />
                        <div>
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            ABC-123
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                            Sin multas pendientes
                          </div>
                        </div>
                      </div>
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#088738]" />
                    </div>
                  </Card>

                  <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Car className="w-4 h-4 md:w-5 md:h-5 text-[#61758a] dark:text-muted-foreground" />
                        <div>
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            XYZ-987
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                            1 multa pendiente
                          </div>
                        </div>
                      </div>
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#0d80f2] dark:text-primary" />
                    </div>
                  </Card>

                  <Card className="p-3 md:p-4 border-[#dbe0e5] dark:border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Car className="w-4 h-4 md:w-5 md:h-5 text-[#61758a] dark:text-muted-foreground" />
                        <div>
                          <div className="font-medium text-[#0d141c] dark:text-foreground text-sm md:text-base">
                            DEF-456
                          </div>
                          <div className="text-xs md:text-sm text-[#61758a] dark:text-muted-foreground">
                            2 multas pendientes
                          </div>
                        </div>
                      </div>
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#ef4444]" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
