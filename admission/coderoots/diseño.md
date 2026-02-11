✍ Tipografía

Primaria: Inter (o Poppins si ya está en uso). Fallbacks: system-ui, -apple-system, Segoe UI.
Jerarquía y uso
    H1 · 36–40px · semibold · tracking -1% (títulos de página: “Explora…” / “Mi Progreso”).
    H2 · 24–28px · semibold (bloques: “Lenguajes…”, “Generar Plan”).
    H3 · 18–20px · semibold (títulos de cards).
    Body · 16px · regular (descripciones en cards).
    Small/Meta · 14px · medium (labels, badges, subtítulos).

Reglas
    Líneas: 1.3–1.45.
    Máximo 60–75 caracteres por párrafo.
    Evitar mayúsculas sostenidas; preferir Sentence case.

🎨 Paleta de Colores (modo oscuro por defecto)

Los valores son aproximados al diseño mostrado; ajústalos con tus tokens de tema.
Fondo base #0E2A24 (Pine 900)
Superficie #12332C (Pine 800) · contenedores / cards
Borde / Separadores #1F4A40
Texto principal #E6F2EC
Texto secundario #A8B5AE
Primario (CTA / barras / focus) #16A34A
Hover #15803D · Active #166534 · Soft #1B4D41
Acento (gráficas, highlights) #2EBE8E
Neutros: #D1D5DB (neutro claro), #6B7280 (neutro medio)


Sombra: 0 10px 24px rgba(0,0,0,.25)

Contraste: mantener AA mínimo (texto sobre #0E2A24 ≥ 4.5:1).

⚙️ Sistema de Espaciado & Radio

Espaciado: 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48
Contenedor: máx. 1140–1200px con padding-inline: 24px
Radio: 12px (inputs), 14–16px (cards), 24px (chips/hero)
Iconografía: línea simple / relleno suave (estilo Lucide). Tamaños 16, 20, 24.

🧩 Componentes UI

Botones
Primario: fondo #16A34A, texto blanco, radio 12–14px, altura 44–48px.
Secundario: borde #1F4A40, fondo #12332C, texto claro.
Ghost/Link: sin borde, color texto principal con hover en #1B4D41.
Estados:
    Hover: elevar + cambiar a tono más oscuro.
    Deshabilitado: opacity: .5, cursor: not-allowed.
    Con icono: icono a la izquierda, 16–20px, gap: 8px.
Inputs & Selects
Altura 44px, fondo #102E27, borde #1F4A40, radio 12px.
Placeholder en texto secundario.
Validación: borde y ayuda en color de estado; mensaje 14px.
    Cards (grillas de cursos/lenguajes)
    Fondo #12332C, radio 16px, padding 16–20px.
    Imagen/ilustración a la derecha o superior (90–120px).
    Título (H3) + descripción breve (2–3 líneas).
Hover: elevar + borde #2EBE8E 1px sutil.
Barra de progreso
Track #1B3E36, fill #16A34A, radio total.
Texto de porcentaje alineado a la derecha (Small/Meta).
Badges / Chips
Fondo suave #1B4D41 o color de estado soft.
Texto 12–13px, padding: 2px 8px, radio 9999px.
Navbar
Altura 64–72px, fondo #0E2A24 translúcido (opcional blur).
Logo/brand a la izquierda, navegación centrada, acciones a la derecha (buscar, “Comenzar”, avatar).
Gráficas (Progreso semanal)
Barras con un solo color de acento (no múltiples), grid y ejes en neutro medio.
Etiquetas cortas (Lun–Dom), tooltips mínimos.

