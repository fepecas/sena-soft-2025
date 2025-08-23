# 📐 Wireframes — PrediktIA (MVP)

> Documento de referencia visual y funcional de las pantallas base del MVP.  
> Incluye: **Login, Registro, Onboarding (selección de mercados), Dashboard/Home, Mercados**, y los módulos **Anuncios** y **Settings** (pendientes de captura).  
> El objetivo es alinear a diseño, desarrollo y stakeholders sobre **qué ve el usuario, qué puede hacer y cómo responde la interfaz**.

---

## 🧭 Mapa rápido

- [🔐 Inicio de sesión (Login)](#-inicio-de-sesión-login)
- [🆕 Registro de cuenta (Sign up)](#-registro-de-cuenta-sign-up)
- [🧩 Onboarding — Selección de mercados](#-onboarding--selección-de-mercados)
- [📊 Dashboard / Home](#-dashboard--home)
- [📈 Mercados](#-mercados)
- [📰 Anuncios / Eventos regulatorios](#-anuncios--eventos-regulatorios)
- [⚙️ Settings](#️-settings)
- [🧩 Patrones comunes y accesibilidad](#-patrones-comunes-y-accesibilidad)

---

## 🔐 Inicio de sesión (Login)

**Propósito**  
Autenticar al usuario de forma rápida y segura, ofreciendo credenciales clásicas y acceso biométrico.

**Componentes clave**

- Logo y tagline: _“Predicción temprana, decisiones seguras”_.
- Inputs: **Correo electrónico** y **Contraseña**.
- Botón primario: **Ingresar**.
- CTA secundaria: **Inicio biométrico** (huella/rostro).
- Enlaces: **¿No tienes cuenta? Regístrate aquí** y **Olvidé mi contraseña**.

**Flujos**

1. **Login éxito** → redirige a **Dashboard**.
2. **Login con biometría** → si hay biometría registrada, acceso directo; si no, oferta de registro biométrico.
3. **Olvidé mi contraseña** → flujo de recuperación (envío de correo con enlace temporal).

**Estados y validaciones**

- Email con formato válido; contraseña obligatoria.
- Errores visibles bajo el campo y en toast discreto.
- Botón “Ingresar” deshabilitado hasta completar ambos campos.
- Estado _loading_ en el botón para evitar dobles envíos.

---

## 🆕 Registro de cuenta (Sign up)

**Propósito**  
Crear una cuenta mínima con datos básicos y habilitar registro biométrico opcional.

**Componentes clave**

- Campos: **Nombre completo**, **Correo electrónico**, **Contraseña**, **Confirmar contraseña**.
- Botón primario: **Crear cuenta**.
- Acción alternativa: **Registro biométrico**.
- Enlace: **¿Ya tienes cuenta? Inicia sesión**.

**Flujos**

1. **Alta estándar** → valida datos → crea usuario → invita a activar biometría → **Dashboard**.
2. **Alta con biometría** → registra huella/rostro del dispositivo → **Dashboard**.

**Validaciones**

- Contraseña = Confirmación; mínimo 6 caracteres.
- Email único (mensaje si ya existe).
- Estados de error y _loading_ consistentes con Login.

---

## 🧩 Onboarding — Selección de mercados

**Propósito**  
Personalizar el perfil inicial para entregar **alertas relevantes** desde el primer uso.

**Componentes clave**

- Indicador de pasos (3–4 puntos).
- **Checklist** de categorías: _Acciones, Divisas, Criptomonedas, Materias Primas_.
- Botón primario: **Continuar** (deshabilitado si no hay selección).

**Reglas**

- Requiere al menos **1** mercado seleccionado.
- Persistencia local inmediata (para configurar feeds y alertas).
- El siguiente paso del onboarding (no mostrado) puede incluir **sectores favoritos** y **nivel de riesgo** (slider).

**Resultados**

- Al completar el onboarding, el **Dashboard** se alimenta con datos y noticias de los mercados elegidos.

---

## 📊 Dashboard / Home

**Propósito**  
Ofrecer una **vista de contexto** y acceso rápido a lo importante: mercado global, favoritos y noticias filtradas por IA.

**Bloques principales**

1. **Resumen del Mercado (hoy)**

   - _KPI principal_ (ej.: **+0.5%** / 24h).
   - Mini **gráfico de línea** (tendencia mensual).

2. **Favoritos**

   - Lista de activos con **precio actual** y variación breve.
   - Acciones: abrir **detalle** o **configurar alerta**.

3. **Indicadores laterales** (barras de progreso)

   - Pistas visuales de **fuerza/volumen/volatilidad** (valores de referencia 60–80 en la captura).

4. **Noticias filtradas por IA**
   - Card con **título**, **resumen** y **ícono temático**.
   - Al hacer clic → detalle de noticia con **fuente original**.

**Interacciones**

- Click en activo de _Favoritos_ → **Detalle de activo**.
- Click en noticia → **Detalle de noticia** (overlay/página).
- El icono de **notificaciones** abre el _feed_ de alertas.

**Vacíos y errores**

- Si no hay favoritos: CTA “Agrega tus primeros activos”.
- Si falla el feed de noticias: mensaje y botón “Reintentar”.

---

## 📈 Mercados

**Propósito**  
Explorar _de forma amplia_ los activos y detectar **volatilidad** y **anomalías recientes**.

**Secciones**

1. **Indicadores de Volatilidad**

   - KPI (ej.: **+2.5%** últimos 7 días) y **gráfico** semanal.

2. **Anomalías Recientes**

   - Tarjetas de eventos con **ticker**, **resumen IA** y **variación** (badge verde/rojo).
   - Ejemplos (captura):
     - **BTC**: “sube +5% después del anuncio de la FED” (+5.2%).
     - **ETH**: “-3% por preocupaciones regulatorias” (−3.1%).
     - **GOLD**: “+2% por incertidumbre del mercado” (+2.4%).

3. **Listado de Activos**
   - Pestañas: **Todos / Favoritos / Alertas**.
   - Fila: **Nombre**, **Precio**, **Variación %** (color semántico).
   - Orden por variación o precio; búsqueda rápida.

**Acciones frecuentes**

- Abrir **detalle de activo** con gráfico + indicadores.
- **Configurar alerta** desde la fila o el detalle.
- Marcar como **favorito**.

---

## 📰 Anuncios / Eventos regulatorios

**Propósito**  
Centralizar **comunicados oficiales** (reguladores, bancos centrales, ministerios) que puedan impactar sectores o activos.

**Estructura de lista**

- **Título** del anuncio.
- **Fuente** (organismo, país), **fecha/hora**.
- **Resumen IA** del impacto (en 1–2 frases).
- **Chevron** para ver detalle.

**Detalle del anuncio**

- Texto del comunicado (extracto) + **enlace a la fuente**.
- **Evaluación de riesgo** (bajo/medio/alto).
- **Sectores y activos afectados** (chips con posibilidad de hacer click).
- Acciones: **“Crear alerta relacionada”**, **“Guardar”**, **“Compartir”**.

**Filtros**

- Por **fuente**, **país/región**, **sector**, **nivel de riesgo**, **fecha**.

**Reglas**

- Si un anuncio coincide con mercados del usuario → **genera alerta temprana**.
- Los anuncios “guardados” aparecen también en el **Dashboard** como recomendados.

---

## ⚙️ Settings

**Propósito**  
Permitir al usuario **personalizar** sensibilidad de riesgo, mercados relevantes y canales de notificación, además del **tema**.

**Secciones**

1. **Alertas y sensibilidad**

   - **Slider** de sensibilidad (Baja / Media / Alta).
   - Reglas ejemplo:
     - _Baja_: solo anomalías > ±10% en 24h.
     - _Media_: > ±5%.
     - _Alta_: > ±2% + anuncios relevantes.

2. **Mercados y sectores**

   - Selección/edición de **mercados** configurados en onboarding.
   - Sectores favoritos (chips seleccionables).

3. **Notificaciones**

   - Canales: **App**, **Correo**, **Integraciones** (webhook).
   - Programación “modo enfoque” (silenciar por horario).

4. **Apariencia**

   - **Tema**: oscuro/claro (toggle).
   - Tamaño de fuente (normal/grande).

5. **Seguridad**
   - Activar/gestionar **biometría**.
   - **Cerrar sesión** y **revocar dispositivos**.

**Estados**

- Guardado automático con confirmación (toast).
- Restablecer a valores predeterminados.
