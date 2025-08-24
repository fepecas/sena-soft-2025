# Resumen

Fast Chef—Recetas rápidas y Saludable Estamos construyendo Fast Chef, un una app de recetas para personas con poco tiempo pero que quieres mantener una alimentación saludable.

## Funcionalidades Principales

La pantalla principal debe mostrar una lista de tarjetas de recetas. Cada tarjeta debe tener una foto, el nombre de la receta y el tiempo de preparación.
Construido con componentes de React, Tailwind y material 3.
Ver recetas rápidas y al hacer tap desplegar un modal de abajo hacia arriba con los detalles completos de la receta.
Crear una lista de compras con opción de edición y eliminación de los productos agregados.
Marcar receta como completada en la vista de recetas diarias.
Plan semanal de comidas con vista semanal y por dia.
Todo se guarda localmente.

## Requisitos Técnicos

React con gestión de estado local.
Guardar la configuración en formato JSON.
Diseño adaptable (responsive) para móvil y escritorio.
Selector de tema oscuro/claro.
Persistencia en el almacenamiento local (editando el JSON localmente).

## Flujo de Usuario

1. Ver Recetas
El usuario abre la app y ve inmediatamente una lista de recetas.
Cada receta muestra: foto, nombre y tiempo de preparación.

2. Seleccionar una Receta
El usuario toca la tarjeta de una receta.
Se abre un modal desde abajo con los detalles: ingredientes e instrucciones.

3. Añadir a Plan Semanal
Dentro del modal, el usuario toca el botón "Añadir al Plan".
Selecciona un día de la semana (ej: "Miércoles").
La app muestra una confirmación de que la receta fue añadida.

4. Crear Lista de Compras
En la pestaña "Ingredientes", el usuario toca el ícono + junto a los productos que necesita.
Los productos seleccionados se añaden automáticamente a la lista de compras.

5. Usar la Lista de Compras

    - El usuario va a la sección "Lista de Compras".
    - Ve una lista de todos los productos agregados y puede marcarlos, editarlos o eliminarlos.

6. Completar una Receta

    - El usuario va a su "Plan Semanal" y selecciona el día correspondiente (ej: "Miércoles").
    - Toca el botón "Marcar como completada" en la receta del día.
    - La app confirma la acción con una animación y marca la receta como hecha.
    - Añadir una tarea dentro de la página de un proyecto debería añadir automáticamente esa tarea a ese proyecto.

    **Estructura**: El diseño debe tener diferentes componentes como la barra de navegación Inferior, el contenido. Las cards  para cada una de las recetas, componente de lista, etc.

    **Diseño**:

    - Construir con patrones modernos de React.
    - Usar Tailwind.
    - Usar componentes de material 3 (Button, Card, Theme, Typography, Avatar, Command, Sheet, etc.).
    - Usar la fuente Plus Jakarta Sans:
        - Se puede instalar vía npm: npm i geist
        - O con Next.js:

    **JavaScript**:
    `import { Plus Jakarta Sans } from 'Plus Jakarta Sans/font/sans';`

    - Framer Motion (para animaciones).
    - Seguir el archivo de Figma como guía de diseño.
    - Paleta de colores neutros (variables de material 3, con tema oscuro).
    - Usar temas de material3/ui utilizando nombres de color semánticos.
    - Crear un theme-provider.tsx para permitir el cambio entre tema oscuro/claro.
    - Separar cada componente en su propio archivo .tsx, como card, sidebar, navbar, etc.
