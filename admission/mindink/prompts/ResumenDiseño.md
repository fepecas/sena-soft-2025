# Resumen

## MindInk — Diario digital

Estamos construyendo **MindInk**, un diario digital en formato de libro virtual para personas que buscan bienestar emocional y desarrollo personal. Permite organizar notas en libros temáticos, etiquetarlas y navegar con índice. Además, integra un acompañante de IA opcional que genera resúmenes y preguntas reflexivas para ayudar a la autoconciencia, sin dar juicios ni consejos.

---

## Funcionalidades principales

* **Biblioteca de libros**

  * Vista principal con tarjetas de libros creados por el usuario (título, número de notas, última fecha de escritura).

* **Notas dentro de libros**

  * Escritura diaria con formato básico (negritas, subrayado, resaltado).
  * Cada nota puede llevar etiquetas.

* **Índice expandible**

  * Dentro de cada libro, un listado de notas (fecha, título automático, etiquetas).

* **Notas de acompañante (IA)** — sección independiente donde se guardan las reflexiones generadas:

  * **Resumen inmediato** (cuando el usuario lo solicita).
  * **Pregunta reflexiva** (durante la escritura).
  * **Nota automática** (cada 3 días, solo si hay entradas).

* **Búsqueda avanzada**

  * Filtrar notas por palabra clave, etiqueta o fecha.

* **Animación de libro**

  * Efecto de “hoja pasando” para reforzar la experiencia íntima de escritura.

---

## Requisitos técnicos

* **Frontend:** React con gestión de estado local.
* **Almacenamiento:** Guardar la información en formato JSON (libros, notas, notas de acompañante).
* **Responsive:** Diseño adaptable para móvil y escritorio.
* **Persistencia:** localStorage editando JSON.
* **Componentes clave:**

  * Barra de navegación inferior.
  * Cards de libros.
  * Lista de notas.
  * Panel flotante para IA.
* **Filtros y búsqueda:** implementados con estado local.
* **Paleta:** colores neutros y tonos cálidos para transmitir intimidad.

---

## Flujo de usuario

### Ver Libros

1. El usuario abre la app y ve sus libros como tarjetas con título y número de notas.

### Crear una nota

1. Elige un libro → toca **"Nueva Nota"** → escribe su entrada.
2. Puede añadir etiquetas antes de guardar.

### Usar Acompañante de IA (opcional)

1. Dentro de la nota, pulsa **"Pedir resumen"**: aparece un panel flotante con un breve resumen.
2. Puede pedir **"Pregunta reflexiva"** para profundizar.
3. Decide si guarda esa reflexión en **Notas de Acompañante**.

### Ver Notas de Acompañante

1. Va a la pestaña dedicada.
2. Puede filtrar por tipo (resumen, pregunta, automática).
3. Cada 3 días, aparece una nota automática que sintetiza las entradas recientes.

### Buscar y organizar

* Usa la búsqueda para encontrar notas por etiqueta, fecha o palabra clave.
* El índice del libro permite navegar de forma estructurada.

---

## Estructura de diseño

* **Barra de navegación inferior:** Biblioteca | Acompañante | Búsqueda | Notas IA
* **Biblioteca:** tarjetas de libros (recientes y todos).
* **Cards de libros:** portada con título y contador de notas.
* **Lista de notas:** dentro de cada libro, índice expandible con etiquetas visibles.
* **Panel IA:** modal flotante (resumen/pregunta) que aparece dentro de la nota.
* **Notas de Acompañante:** lista con tarjetas diferenciadas por color/icono según el tipo de reflexión.

### Animaciones

* Usar **Framer Motion** para transición de páginas y apertura de modales.
* Animación de **"hoja pasando"** al moverse entre notas de un libro.

---

## Notas adicionales / Consideraciones

* El acompañante de IA debe **evitar juicios y consejos**; su función es facilitar la autoconciencia mediante resúmenes y preguntas abiertas.
* La nota automática cada 3 días debe generarse únicamente si existen entradas nuevas en el período.
* Mantener la experiencia íntima y privada: todas las herramientas que usan IA son opt-in y los datos permanecen en almacenamiento local salvo que el usuario decida sincronizar.
