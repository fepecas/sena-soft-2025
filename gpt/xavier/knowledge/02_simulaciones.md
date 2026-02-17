Guiones de Interacción del Equipo de Desarrollo
Simulación 1: E-commerce (Definición de un Descuento)
Contexto: El equipo está definiendo una nueva funcionalidad para aplicar descuentos automáticos a ciertos productos.

Roles: Dev, QA y QC.

Objetivo: Aclarar la regla de negocio para prevenir errores de cálculo.

Diálogo:

Xavier (como QA): Hola, [nombre del Dev]. Para los descuentos, ¿hay una regla específica? Por ejemplo, si un producto tiene un descuento del 10%, ¿el precio final se debe redondear? ¿O se muestran los decimales?

Aprendiz (como Dev): (Respuesta esperada: "Buena pregunta. El precio final debe mostrarse con dos decimales, sin redondeo.")

Xavier (como QA): Entendido. Y para la verificación, [nombre del QC], cuando pruebes esta función, asegúrate de que el precio no se redondee y de que el descuento se aplique correctamente al total del carrito.

Aprendiz (como QC): (Respuesta esperada: "¡Claro! Anotado. Haré un par de pruebas con diferentes porcentajes de descuento y con diferentes cantidades de productos.")

Simulación 2: Gestor de Inventario (Reporte de Error de Rendimiento)
Contexto: Se ha implementado un nuevo módulo para generar reportes de inventario a largo plazo.

Roles: Dev, QA y QC.

Objetivo: Detectar un problema de rendimiento y proponer una mejora en la experiencia del usuario.

Diálogo:

Xavier (como QC): Hola, [nombre del Dev]. Encontré un problema al generar un reporte para el último año. El sistema se demora casi un minuto en cargar. El reporte de un mes se carga en segundos.

Aprendiz (como Dev): (Respuesta esperada: "Mmm, eso suena a un problema de rendimiento en la base de datos. Probablemente la consulta no está optimizada para manejar grandes volúmenes de datos.")

Xavier (como QA): Y para la experiencia del usuario, ¿hay alguna manera de mostrar un indicador de carga para que el usuario sepa que la aplicación no se ha congelado?

Aprendiz (como Dev): (Respuesta esperada: "Buena idea. Puedo agregar una barra de progreso que indique que el reporte se está generando.")

Simulación 3: App de Pedidos (Aclarando la Lógica de Notificaciones)
Contexto: El equipo está definiendo las notificaciones para el cliente sobre el estado de su pedido.

Roles: Dev, QA y QC.

Objetivo: Asegurar que la implementación de las notificaciones sea consistente.

Diálogo:

Xavier (como QA): Hola, [nombre del Dev]. Cuando un pedido es entregado, ¿se debe enviar una notificación push y un correo electrónico?

Aprendiz (como Dev): (Respuesta esperada: "Sí, se deben enviar ambas notificaciones.")

Xavier (como QA): Y, [nombre del QC], cuando pruebes las notificaciones, asegúrate de que el texto en el correo y en la notificación push coincida con el estado del pedido. A veces se envían textos genéricos.

Aprendiz (como QC): (Respuesta esperada: "Entendido. Verificaré que el texto sea 'Tu pedido ha sido entregado' en ambas notificaciones.")

Simulación 4: E-commerce (Verificación de un Formulario)
Contexto: Se está creando el formulario para registrar un nuevo usuario.

Roles: Dev, QA y QC.

Objetivo: Definir los criterios de seguridad de un formulario y la validación para el usuario.

Diálogo:

Xavier (como QA): Hola, [nombre del Dev]. Para la contraseña, ¿hay algún requisito de seguridad? Por ejemplo, ¿un mínimo de caracteres?

Aprendiz (como Dev): (Respuesta esperada: "Sí. La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.")

Xavier (como QA): Perfecto. [nombre del QC], asegúrate de probar con diferentes tipos de contraseñas, como solo letras, menos de 8 caracteres, etc.

Aprendiz (como QC): (Respuesta esperada: "Claro. Y si introduzco una contraseña incorrecta, ¿el mensaje de error debe decir exactamente qué requisito no se cumple?")

Simulación 5: Gestor de Inventario (Reporte de un Error de Usabilidad)
Contexto: Un Dev ha implementado una nueva barra de búsqueda para los productos.

Roles: Dev, QA y QC.

Objetivo: Reportar un problema de usabilidad y proponer una solución.

Diálogo:

Xavier (como QC): Hola, [nombre del Dev]. Cuando busco un producto y la búsqueda no arroja resultados, el sistema me muestra una página en blanco.

Aprendiz (como Dev): (Respuesta esperada: "Eso no debería pasar. Debería mostrar un mensaje de 'No se encontraron resultados'.")

Xavier (como QA): Y, para la usabilidad, [nombre del Dev], ¿podríamos agregar sugerencias de búsqueda o una sección de productos más vendidos para que el usuario no llegue a una página vacía?

Aprendiz (como Dev): (Respuesta esperada: "Es una excelente idea. La próxima vez, planeemos un flujo para cuando no haya resultados, para que la experiencia no sea un callejón sin salida.")

Simulación 6: App de Pedidos (Ajustando la Lógica de Cancelación)
Contexto: El equipo está implementando una función para que los clientes cancelen sus pedidos.

Roles: Dev, QA y QC.

Objetivo: Definir la lógica de negocio para la cancelación de pedidos y la respuesta del sistema al usuario.

Diálogo:

Xavier (como QA): Hola, [nombre del Dev]. Si un pedido ya fue enviado, ¿el cliente aún puede cancelarlo?

Aprendiz (como Dev): (Respuesta esperada: "No. Si el pedido ya tiene el estado 'Enviado', la opción de cancelar debe desaparecer.")

Xavier (como QC): Y si el cliente intenta cancelar y el pedido ya no se puede cancelar, ¿el botón simplemente se deshabilita, o aparece un mensaje que explique por qué no se puede cancelar?

Aprendiz (como Dev): (Respuesta esperada: "El botón de 'Cancelar' debe desaparecer, y se debe mostrar un mensaje que diga 'Este pedido ya no se puede cancelar'.")

Simulación 7: E-commerce (Reporte de un Error de Compatibilidad)
Contexto: Un Dev ha implementado la nueva página de inicio, y el QC la está probando en diferentes dispositivos.

Roles: Dev, QA y QC.

Objetivo: Identificar un error de responsive design y proponer una solución escalable.

Diálogo:

Xavier (como QC): Hola, [nombre del Dev]. La barra de navegación se ve muy bien en el escritorio, pero en el iPad los elementos del menú se superponen y no se pueden leer.

Aprendiz (como Dev): (Respuesta esperada: "Gracias por el reporte. Probablemente es un error de responsive design. A veces el diseño se rompe en pantallas con resoluciones intermedias.")

Xavier (como QA): Y, [nombre del Dev], ¿estás utilizando alguna herramienta para garantizar que el diseño se adapte a todas las resoluciones?

Aprendiz (como Dev): (Respuesta esperada: "Estoy utilizando una librería de CSS, pero parece que no está funcionando correctamente en ese rango.")

Simulación 8: Gestor de Inventario (Verificación de la Lógica de Filtros)
Contexto: Se está implementando una nueva función de filtrado en el inventario.

Roles: Dev, QA y QC.

Objetivo: Aclarar la lógica de negocio detrás de una funcionalidad clave.

Diálogo:

Xavier (como QA): Hola, [nombre del Dev]. Para la función de filtros, si selecciono más de una categoría, ¿la búsqueda debe mostrarme los productos que pertenecen a cualquiera de las categorías seleccionadas, o los que cumplen con todas?

Aprendiz (como Dev): (Respuesta esperada: "Debe mostrar los productos que pertenecen a cualquiera de las categorías. Es una lógica 'O'.")

Xavier (como QA): Perfecto. [nombre del QC], cuando pruebes esta función, asegúrate de que si filtras por "Ropa" y "Calzado", el sistema te muestre los productos que estén en cualquiera de las dos categorías.

Aprendiz (como QC): (Respuesta esperada: "Entendido. También haré pruebas con filtros que no arrojen resultados para ver cómo se comporta el sistema.")

Simulación 9: App de Pedidos (Aclarando los Mensajes de Error)
Contexto: El equipo está definiendo la lógica de errores al ingresar una dirección incorrecta.

Roles: Dev, QA y QC.

Objetivo: Definir criterios claros para los mensajes de error y las validaciones de datos.

Diálogo:

Xavier (como QA): Hola, [nombre del Dev]. Si el usuario ingresa una dirección que no existe, ¿el mensaje de error debe ser general o específico?

Aprendiz (como Dev): (Respuesta esperada: "Debe ser específico. El mensaje debe decir: 'La dirección no es válida. Por favor, revisa la calle y el número.'")

Xavier (como QA): Y, [nombre del QC], cuando pruebes esta función, asegúrate de que el mensaje de error sea el correcto y de que el usuario no pueda continuar si los datos de la dirección son incorrectos.

Aprendiz (como QC): (Respuesta esperada: "Por supuesto. También probaré el sistema con direcciones que tengan caracteres especiales para ver si la validación funciona correctamente.")