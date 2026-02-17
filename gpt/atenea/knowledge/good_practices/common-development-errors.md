# 🐞 Errores Comunes en el Desarrollo de Software

El desarrollo apresurado típico en la industria de software, lleva a descuidar aspectos claves de calidad.
Esta guía recopila los errores más frecuentes que QA debe vigilar, sus causas y cómo evitarlos.

## 1. Errores en Requisitos y Análisis

### 1.1 Requisitos ambiguos o incompletos

- **Causa**: falta de claridad o validación inicial.

- **Detección**: múltiples interpretaciones en el equipo; historias de usuario sin criterios de aceptación.

- **Prevención**: criterios claros (Definition of Done, Given-When-Then).

- **Ejemplo**: "El sistema deber ser rápido" -> Ambiguo. Mejor: "El sistema debe responder en menos de 2 segundos para 100 usuarios concurrentes".

## 2. Errores en la Lógica de Negocio

### 2.1 Validaciones insuficientes

- **Causa**: no probar entradas no válidas.

- **Detección**: campos que aceptan valores fuera de rango o formatos incorrectos.

- **Prevención**: pruebas de valores límite y particiones de equivalencia.

- **Ejemplo**: un campo de edad que acepta valores negativos o valores irreales.

### 2.2 Reglas mal implementadas

- **Causa**: requisitos mal entendidos o no escritos.

- **Detección**: resultados inesperados al comparar con las reglas de negocio.

- **Prevención**: colaboración constante entre QA y stakeholders.

## 3. Errores en Integración

### 3.1 API con contratos inconsistentes

- **Causa**: cambios en endpoints sin actualizar documentación.

- **Detección**: respuestas que no cumplen el esquema esperado.

- **Prevención**: uso de OpenAPI/Swagger y validación con **contracts test (Pact)**.

### 3.2 Gestión deficiente de errores

- **Causa**: endpoints devuelven 200 OK con mensajes de error en el body.

- **Detección**: analizar códigos HTTP y respuestas.

- **Prevención**: aplicar convenciones REST/GraphQL adecuadas.

## 4. Errores de UI/UX

### 4.1 Formularios sin validación adecuada

- **Causa**: depender completamente del backend.

- **Detección**: ingreso de correos sin "@", campos vacíos aceptados.

- **Prevención**: validación en ambos lados (cliente + servidor).

### 4.2 Falta de feedback al usuario

- **Causa**: no mostrar mensajes de error claros.

- **Detección**: botones que "no hacen nada" cuando falla la acción.

- **Prevención**: mostrar mensajes visibles, accesibles y útiles.

### 4.3 Accesibilidad ignorada

- **Causa**: no considerar estándares WCAG.

- **Detección**: no se puede navegar con teclado, contraste bajo, etc.

- **Prevención**: uso de herramientas como **axe** o **Lighthouse**.

## 5. Errores de seguridad

### 5.1 Exposición de secretos en el código

- **Causa**: push de ``.env`` o claves API en el repositorio.

- **Detección**: revisión de commits, escaneo con ``git-secrets``, ``trufflehog``.

- **Prevención**: uso de variables de entorno, gestión segura de secretos y ``.gitignore``.

### 5.2 Inyección de datos (SQLi, XSS)

- **Causa**: no sanitizar entradas de usuario.

- **Detección**: inputs que permiten ejecutar código, etc.

- **Prevención**: validación y sanitización rigurosa o estricta, uso de ORM, ``escape()`` de salida.

### 5.3 Autenticación insegura

- **Causa**: contraseñas débiles, tokens predecibles, sesiones sin expiración, no uso de estándares de cifrado, etc.

- **Detección**: revisar flujos de login, almacenamiento de usuarios, etc.

- **Prevención**: uso de librerías probadas, políticas de contraseñas, cifrado seguro (bcrypt, Argon2), OAuth2, JWT con expiración, HTTPS obligatorio, etc.

## 6. Errores en Rendimiento y Escalabilidad

### 6.1 Consultas ineficientes a la base de datos

- **Causa**: uso de ``SELECT *``, falta de índices, consultas N+1, etc.

- **Detección**: análisis de logs, herramientas de profiling, tiempos de respuestas largos, bloqueo de tablas, etc.

- **Prevención**: EXPLAIN en queries, índices en campos de búsqueda, optimización de consultas, uso de índices, revisión de esquemas, etc.

### 6.2 Carga excesiva en un solo servicio

- **Causa**: no usar caché, colas, arquitectura monolítica, falta de balanceo de carga, etc.

- **Detección**: saturación en endpoints críticos bajo carga, monitoreo de recursos, tiempos de respuesta, errores 500, etc.

- **Prevención**: rate limiting, tests con k6/JMeter, uso de caché (Redis, Memcached), colas (RabbitMQ, Kafka), arquitectura de microservicios, balanceadores de carga, etc.

## 7. Errores de Entorno y Configuración

### 7.1 "Funciona en mi máquina"

- **Causa**: entornos no replicables, dependencias no documentadas.

- **Detección**: diferencias en versiones de software, staging, producción, variables de entorno, etc.

- **Prevención**: uso de contenedores (Docker), infraestructura como código (Terraform, Ansible), CI/CD, documentación clara.

### 7.2 Configuración sensible en el código

- **Causa**: credenciales y endpoints hardcodeados.

- **Detección**: revisar código y logs.

- **Prevención**: variables de entorno, archivos .env no versionados.

## 8. Errores en el Proceso

### 8.1 Falta de pruebas de regresión

- **Causa**: no automatizar pruebas o no mantenerlas actualizadas al modificar el código.

- **Detección**: funcionalidades que dejan de funcionar tras cambios.

- **Prevención**: suite de pruebas automatizadas (unitarias, integración, end-to-end) y revisión continua.

### 8.2 Mala gestión de bugs

- **Causa**: no priorizar, documentar o comunicar adecuadamente los bugs.

- **Detección**: bugs recurrentes, falta de seguimiento.

- **Prevención**: uso de herramientas de seguimiento (Jira, Trello), priorización clara, comunicación efectiva.

## 9. Checklist de Prevención de Errores

- [ ] Los requisitos tienen criterios de aceptación claros.

- [ ] Se validan entradas en frontend y backend.

- [ ] API responde con códigos HTTP correctos.

- [ ] No hay secretos en repositorios.

- [ ] Inputs sanitizados contra XSS/SQLi.

- [ ] Consultas a BD optimizadas.

- [ ] Entornos reproducibles (Docker/CI).

- [ ] Pruebas de regresión ejecutadas.

- [ ] Bugs documentados con pasos y evidencias.

## 10. Referencias

- OWASP Top Ten: vulnerabilidades críticas de seguridad.

- Google Web.dev: errores comunes de UX y performance.

- Clean Code - Robert C. Martin: patrones de errores en desarrollo.

- Atlassian QA Guides: prácticas de gestión de bugs y testing.

✅ Con el documento presente nuestra Atenea podrá detectar patrones de error, prevenir fallos en MVPs
y recomendar buenas prácticas de manera inmediata.