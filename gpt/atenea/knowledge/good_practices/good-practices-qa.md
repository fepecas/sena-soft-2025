# 🛡️ Buenas Prácticas QA

El aseguramiento de la calidad (QA) es un proceso continuo que busca garantizar que el producto cumpla con los requisitos, 
funcione correctamente y aporte valor al usuario final. A continuación se presenta una guía de práctica que combina principios, 
recomendaciones y ejemplos aplicables para equipos de desarrollo en entornos ágiles.

## 1. Principios Fundamentales de QA

- **Prevención antes que corrección**: detectar problemas en etapas tempranas es más barato y efectivo.

- **QA es responsabilidad de todos**: no es solo el rol de un testes, sino del equipo entero.

- **Pruebas iterativas**: probar de manera continua conforme avanza el desarrollo.

- **Calidad visible**: cada entrega debe tener criterios claros de calidad (Definition of Done).

## 2. Buenas Prácticas Clave

### 2.1. Involucrar QA desde el inicio

- Revisar requisitos y detectar ambigüedades.

- Validar que los criterios de aceptación sean claros, medibles y verificables.

### 2.2. Definir criterios de aceptación

- Usar lenguaje sencillo y orientado al usuario.

- Ejemplo: "Cuando el usuario ingresa credenciales válidas, debe acceder al software en menos de 2 segundos."

### 2.3. Automatizar pruebas prioritarias

- Iniciar con pruebas unitarias en funciones críticas.

- Integrar pruebas automatizadas en el pipeline de CI/CD.

- Ejemplo de herramientas: Jest(JS/TS), PyTest(Python), Selenium (UI), PHPUnit (PHP), etc.

### 2.4. Combinar pruebas automatizadas y manuales

- Automatizar lo repetitivo y crítico.

- Usar pruebas manuales exploratorias para descubrir fallos no previstos.

### 2.5. Priorizar según riesgo e impacto

- Probar primero lo que afecta directamente la experiencia del usuario o la seguridad.

- Ejemplo: Autenticación > Carrito de compras > Reportes secundarios, etc.

### 2.6. Mantener trazabilidad

- Relacionar requisitos <-> casos de prueba <-> defectos reportados.

- Usar herramientas ligeras como Trello, Notion o GitHub Projects si no hay un gestor de QA.

### 2.7. Documentar con claridad

- Incluir en cada bug: pasos de reproducción, resultado esperado, resultado obtenido, severidad y evidencias (capturas/logs).

### 2.8. Promover la colaboración

- QA debe dar feedback rápido al equipo, no ser un cuello de botella.

- Ejemplo: Si en cada sprint aparecen bugs de validación de formularios -> crear una checklist específica para inputs.

## 3. Checklist Rápido de QA (para cada entrega)

- [ ] Los requisitos estén claros y testeables.

- [ ] Todos los criterios de aceptación fueron validados.

- [ ] Se cubrieron pruebas unitarias básicas.

- [ ] Se ejecutaron pruebas funcionales en los módulos principales.

- [ ] Se probaron escenarios de error (inputs inválidos, límites, fallos de conexión, etc.).

- [ ] Se verificó la experiencia del usuario en navegadores o dispositivos principales.

- [ ] Los resultados de pruebas están documentados.

- [ ] No hay defectos críticos abiertos antes de entregar.

Así como existe esta checklist sencilla, básica y rápida, también es profundizar.

## 4. Estándares y Referencias

- **ISTQB Foundation Level**: Principios básicos de QA y Testing.

- **ISO/IEC 25010**: Modelo de calidad del software.

- **IEEE 29119**: Estándares de documentación de pruebas.

- **Atlassian QA Guidelines**: Buenas prácticas aplicadas a equipos ágiles.

✅ Este documento forma parte de la gran base de conocimiento de nuestra querida Atenea, y debe apoyar a cada equipo
de forma constante e iterativa conformen avancen en cada MVP y brindar lecciones.