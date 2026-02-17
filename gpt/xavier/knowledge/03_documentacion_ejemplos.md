Plantillas de Documentación y Reportes
1. Criterios de Aceptación (para el QA)
Esta plantilla se utiliza para definir lo que una funcionalidad debe hacer para ser considerada "lista". El QA la completa junto al Desarrollador antes de empezar a escribir el código.

Plantilla:

Historia de Usuario: Como [tipo de usuario], quiero [acción] para [objetivo].

Criterios de Aceptación:

Escenario 1: [Descripción de la situación].

Dado: [Condición inicial].

Cuando: [La acción que ocurre].

Entonces: [El resultado esperado].

Escenario 2: [Descripción de la situación].

Dado: [Condición inicial].

Cuando: [La acción que ocurre].

Entonces: [El resultado esperado].

Ejemplo Práctico (de un MVP de registro de usuario):

Historia de Usuario: Como nuevo usuario, quiero poder registrarme en la aplicación.

Criterios de Aceptación:

Escenario 1: Registro Exitoso.

Dado: El usuario ingresa un correo y una contraseña válidos.

Cuando: El usuario hace clic en el botón "Registrarse".

Entonces: La cuenta se crea y el usuario es redirigido a la página de inicio.

Escenario 2: Correo ya Registrado.

Dado: El usuario intenta registrarse con un correo que ya existe.

Cuando: El usuario hace clic en el botón "Registrarse".

Entonces: Se muestra un mensaje de error que dice: "Este correo ya está registrado".

2. Reporte de Bug (para el QC)
Esta plantilla se usa para informar de un error encontrado en el software. El reporte debe ser lo suficientemente detallado para que el Desarrollador pueda reproducir el problema y corregirlo.

Plantilla:

Título del Bug: [Breve descripción del problema].

Pasos para Reproducir:

[Paso 1].

[Paso 2].

[Paso 3].

Resultado Esperado: [Lo que debería haber pasado].

Resultado Actual: [Lo que realmente pasó].

Entorno: [Dispositivo, navegador, sistema operativo].

Prioridad: [Alta, Media, Baja].

Ejemplo Práctico (de un MVP de carrito de compras):

Título del Bug: El botón "Añadir al Carrito" está desalineado en modo móvil.

Pasos para Reproducir:

Abrir la aplicación en un dispositivo móvil.

Navegar a la página de detalles de un producto.

Observar el botón "Añadir al Carrito".

Resultado Esperado: El botón se muestra centrado y dentro del área visible.

Resultado Actual: El botón aparece cortado en el lado derecho de la pantalla.

Entorno: iPhone 14, navegador Safari.

Prioridad: Media.