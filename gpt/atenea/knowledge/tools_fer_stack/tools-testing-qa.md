# 🧪 QA con Herramientas de Pruebas Externas (Postman, JUnit, Selenium, etc.)

Estas herramientas complementan las pruebas unitarias e integradas en el código, permitiendo validar APIs, automatizar flujos y asegurar la calidad en múltiples niveles.

## 1. Postman (APIs REST/GraphQL)

- **Pruebas funcionales**:

    - Validar endpoints de autenticación, CRUD, búsquedas.

    - Verificar respuestas esperadas: status codes, payloads, tiempos.

- **Colecciones de pruebas**: agrupar peticiones y ejecutarlas en secuencia.

- **Variables de entorno**: manejar URLs, tokens, parámetros.

- **Newman (CLI)**: ejecutar colecciones en CI/CD.

- **QA Hackathon Tip**: mínimo 3–5 endpoints documentados y probados con Postman.

## 2. JUnit (Java / Kotlin)

- Framework estándar para pruebas unitarias e integración.

- Compatible con Spring Boot, Ktor y otros frameworks.

- **Assertions comunes**:

    - assertEquals(expected, actual)

    - assertThrows(Exception.class, () -> …)

- **Integración con CI/CD**: resultados visibles en pipelines.

- **QA Hackathon Tip**: al menos cubrir las clases críticas de lógica.

## 3. Selenium (UI Testing)

- Automatiza interacciones en navegadores.

- **Casos de uso QA**:

    - Validar que los formularios funcionan.

    - Probar navegación básica entre vistas.

    - Revisar mensajes de error/validación.

- **Drivers**: ChromeDriver, GeckoDriver (Firefox).

- **Selenium Grid**: pruebas paralelas en varios navegadores.

- **QA Hackathon Tip**: crear mínimo 1 flujo crítico (ej. login + acción principal).

## 4. Otras herramientas útiles en QA

- **Cypress**: alternativa moderna a Selenium, más simple de configurar.

- **Playwright**: pruebas cross-browser rápidas.

- **Pytest**: framework de pruebas en Python (unitarias + integración).

- **PHPUnit**: framework de pruebas en PHP (Laravel, Symfony).

- **Vitest/Jest**: testing moderno para proyectos JS/TS.

## 5. QA en entornos de hackathon

- **Postman**: validar APIs clave con colecciones compartidas al jurado.

- **JUnit/Pytest/PHPUnit/Vitest**: correr unitarias automáticamente en CI.

- **Selenium/Cypress**: automatizar al menos 1 flujo crítico si el tiempo lo permite.

- **Entrega final**: adjuntar colecciones/exportaciones de pruebas y capturas de ejecución.

## 6. Recomendaciones rápidas (Hackathon)

- Usar Postman + Newman para documentar y validar APIs.

- Cubrir lógica de negocio con framework de testing del lenguaje elegido.

- Probar al menos 1 flujo end-to-end en la UI (Selenium/Cypress).

- Documentar cómo correr las pruebas (README.md).

👉 Entrega mínima:

- Colección Postman con validaciones básicas.

- Unitarias en el lenguaje backend.

- Evidencia de al menos un flujo UI probado.

✅ Atenea podrá recomendar las herramientas de QA externas más adecuadas según el stack y tiempo disponible en la hackathon.