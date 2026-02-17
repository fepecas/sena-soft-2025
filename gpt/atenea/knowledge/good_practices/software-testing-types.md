# 🧪 Tipos de Pruebas de Software

Documentación completa sobre los diferentes tipos de pruebas de software, incluyendo pruebas funcionales,
no funcionales, unitarias, sistema (End-to-End), aceptación (UAT),
estrategias de pruebas, diseño de pruebas y datos, así como también trabajando por áreas específicas,
recetas rápidas, plantillas útiles y checklists express y finalmente recomendaciones por stack tecnológico.

## 0. Mapa rápido

- **Por nivel**: 
   
  - [Pruebas Unitarias](#11-pruebas-unitarias)
  
  - [Pruebas de Integración](#12-pruebas-de-integración)
  
  - [Pruebas de Sistema (End-to-End)](#13-pruebas-de-sistema-end-to-end)

- **Por objetivo**:
   
  - [Pruebas Funcionales](#21-pruebas-funcionales)
  
  - [Pruebas No Funcionales](#22-pruebas-no-funcionales)

- **Estrategia transversal**:
   
  - [Smoke/Sanity/Regresión](#31-smokesanityregresión)
  
  - [Exploratoria](#32-exploratoria-session-based)
  
  - [Basada en Riesgo](#33-basada-en-riesgo)
  
  - [CI/CD](#9-recomendaciones-por-stack-tecnológico-rápidas)
  
  - [Shift-Left/Shift-Right](#35-shift-left--shift-right)

## 1. Niveles de Prueba

### 1.1 Pruebas Unitarias
 
- **Qué validan**: funciones/métodos aislados.

- **Objetivo**: exactitud lógica y manejo de bordes.

- **Tips**: usar mocks/stubs para dependencias, rápidas y deterministas.

- **Herramientas**: Jest, Vitest, PyTest, NUnit, JUnit, PHPUnit, etc.

### 1.2 Pruebas de Integración

- **Qué validan**: interacción entre módulos (p. ej., API <-> DB).

- **Objetivo**: contratos y flujos entre componentes.

- **Tips**: base de datos temporal/contenerizada, test doubles de servicios externos.

### 1.3 Pruebas de Sistema (End-to-End)

- **Qué validan**: comportamiento del sistema completo (escenarios reales).

- **Objetivo**: que el flujo del usuario funcione de extremo a extremo.

- **Herramientas**: Cypress, Playwright, Selenium, TestCafe, etc.

### 1.4 Pruebas de Aceptación (UAT)

- **Qué validan**: criterios de negocio con lenguaje claro.

- **Objetivo**: confirmar "lista para producción".

- **Práctica recomendada**: BDD con criterios Given-When-Then (Gherkin).

## 2. Por Objetivo

### 2.1 Pruebas Funcionales

- **Casos felices y de error**, validaciones de formularios, reglas de negocio, etc.

- **API Testing**: contratos HTTP, códigos de estado, esquemas JSON, idempotencia, etc.

- **E2E web/móvil**: flujos principales (login, compra, envío de formulario, etc.).

### 2.2 Pruebas No Funcionales

#### 2.2.1 Rendimiento

- **Carga**: comportamiento bajo el uso esperado.

- **Estrés**: más allá del pico para encontrar el punto de ruptura.

- **Picos (Spike)**: ráfagas cortas de alto tráfico.

- **Resistencia (Soak)**: estabilidad en periodos largos.

- **Escalabilidad**: rendimiento al aumentar recursos/usuarios.

- **Herramientas**: k6, Locust, JMeter, etc.

#### 2.2.2 Seguridad

- **SAST/DAST/SCA**: análisis estático/dinámico, dinámico y de dependencias.

- **Revisar**: OWASP Top 10 (inyección, XSS, CSRF, auth rota, etc.).

- **Acciones rápidas**: sanitizar entradas, usar HTTPS, gestionar tokens/secretos, npm audit/pip-audit, OWASP ZAP Baseline, etc.

### 2.2.3 Usabilidad

- **Heurísticas básicas**: consistencia, feedback visible, prevención de errores, etc.

- **Pruebas rápidas**: 5 minutos con 2-3 usuarios internos.

### 2.2.4 Accessibilidad

- **Referencia**: WCAG 2.2 AA.

- **Chequear**: navegación por teclado, foco visible, texto alternativo, contraste, etc.

- **Herramientas**: Lighthouse, axe-core, WAVE, etc.

### 2.2.5 Compatibilidad

- **Navegadores/dispositivos clave**: define una **matriz mínima** (ej. Chrome, Firefox, Safari, Edge, Android, iOS, etc).

- **Datos locales/timezones/idiomas**: validar formatos y RTL/LTR si aplica.

### 2.2.6 Localización/Internacionalización (i18n)

- **Validar**: longitudes de texto, monedas, traducciones, formatos de fecha/número, separadores, pluralización, etc.

### 2.2.7 Confiabilidad/Resiliencia

- **Cortes controlados**: qué pasa si falla la red/servicio externo.

- **Reintentos y timeouts**: bien configurados.

## 3. Estrategias de Prueba

### 3.1 Smoke/Sanity/Regresión

- **Smoke**: lo mínimo para ver si "respira" el build.

- **Sanity**: verificación de cambios específicos.

- **Regresión**: asegurar que lo viejo no se rompe con lo nuevo.

### 3.2 Exploratoria (Session-based)

- **Charters (misiones)** de 30-60 minutos, con objetivo, alcance y notas.

- Ideal para descubrir fallos no previstos.

### 3.3 Basada en Riesgo

- Priorizar probar **funcionalidades críticas y de alto impacto** primero.

### 3.4 Pirámide de Pruebas

- Muchas **unitarias**, algunas **de integración**, pocas **E2E** (rápidas y estables).

### 3.5 Shift-Left & Shift-Right

- **Shift-Left**: mover pruebas más temprano en el ciclo de vida (desarrollo).

- **Shift-Right**: pruebas en producción, monitoreo y feedback post-lanzamiento

## 4. Diseño de Pruebas y Datos

### 4.1 Técnicas de Caja Negra

- **Partición de equivalencia** y **valores límite**.

- **Tablas de decisión** (combinaciones de reglas).

- **Transición de estados** (flujos con estados, ej. pedido).

**Ejemplo breve (límites):** campo edad (18-65):

- **Casos**:

  - Válidos: 18, 30, 65.
  
  - Inválidos: 17, 66, -1, "texto".

### 4.2 Técnicas de Caja Blanca

- **Cobertura de código**: sentencias, líneas, ramas, condiciones, caminos, etc.

- Objetivo práctico: cobertura alta en módulos críticos (calidad > porcentaje).

### 4.3 Gestión de Datos de Prueba

- **Fixtures/factories**, datos sintéticos, anonimización de PII.

- **Seeds** reproducibles para pruebas consistentes, limpiar entre tests.

- **Dobles de prueba**: mocks, stubs, fakes, spies, para servicios externos.

### 4.4 Entornos

- **Dev/Stage/Prod** con configuraciones esperadas.

- CI que ejecute: unitarias -> integración -> smoke E2E -> (opcional) performance liviano.

## 5. Áreas Específicas

### 5.1 APIs

- Validar **contratos**, **códigos** y **esquemas** (OpenAPI/JSON Schema).

- **Contrato entre servicios**: Pact (consumer/provider).

- **Herramientas**: Postman, Insomnia, Swagger UI, Dredd, etc.

### 5.2 Web

- **E2E**: Cypress/Playwright.

- **Componentes**: pruebas de UI por componente (Storybook test runner, Vitest + Testing Library).

- **Accesibilidad**: Lighthouse, axe-core en CI.

### 5.3 Móvil

- **UI funcional**: Appium, Detox.

- **Dispositivos reales o emuladores**, prioritarios según la matriz objetivo.

### 5.4 Base de Datos

- **Integridad**: claves, constraints, migraciones.

- **Consultas críticas**: tiempos y planes de ejecución simples.

## 6. Recetas Rápidas

### 6.1 Rendimiento con k6 (mínimo viable)

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = { vus: 10, duration: '1m' } // Carga ligera
export default function () {
    const res = http.get('https://tu-app.test/api/health');
    
    // Afirmaciones simples que se ven en códigos de retorno
    sleep(1);
}
```
- **Objetivo**: detectar timeouts y endpoints lentos, no micro-optimizar.

### 6.2 BDD (Gherkin) de login

```gherkin
Feature: Login
  Scenario: Acceso exitoso con credenciales válidas
    Given un usuario registrado
    When ingresa email y contraseña correctos
    Then ve el dashboard en menos de 2 segundos
```

### 7. Plantillas útiles

### 7.1 Caso de Prueba (mínimo)

```makefile
ID: TC-001
Título: Login con credenciales válidas
Precondiciones: Usuario registrado
Pasos:
  1) Abrir /login
  2) Ingresar email y password válidos
  3) Presionar "Ingresar
Resultado esperado: Redirige al dashboard < 2s, sesión activa
Severidad si falla: Alta
Evidencias: capturas/logs
```

### 7.2 Charter exploratorio

```makefile
ID: TC-001
Título: Login con credenciales válidas
Precondiciones: Usuario registrado
Pasos:
  1) Abrir /login
  2) Ingresar email y password válidos
  3) Presionar "Ingresar"
Resultado esperado: Redirige al dashboard < 2s, sesión activa
Severidad si falla: Alta
Evidencias: capturas/logs
```

### 7.3 Matriz de Pruebas (ejemplo)

| Funcionalidad  | Unit | Int | E2E | Perf | Sec | A11y |
|----------------|------|-----|-----|------|-----|------|
| Login          | ✅    | ✅   | ✅   | ⚪    | ⚪   | ⚪    |
| Perfil usuario | ✅    | ✅   | ⚪   | ⚪    | ⚪   | ⚪    |
| Pago           | ✅    | ✅   | ✅   | ✅    | ✅   | ⚪    |

(✅ = aplicar, ⚪ = no aplica/pendiente)

## 8. Checklists Express (cuando hay poco tiempo)

- [ ] **Smoke** de rutas críticas (abrir app, login, flujo principal).

- [ ] **Validaciones** de inputs (requeridos, formatos, límites).

- [ ] **Errores controlados** (404/500, mensajes claros).

- [ ] **Rendimiento básico** (1–2 endpoints con k6/Locust).

- [ ] **A11y mínima** (teclado, foco, contraste).

- [ ] **Seguridad básica** (no secretos en repo, cabeceras, ZAP baseline si da el tiempo).

- [ ] **Regresión rápida** tras cada fix importante.

## 9. Recomendaciones por Stack Tecnológico (rápidas)

- JS/TS (Web): Jest + Testing Library; Cypress/Playwright; Lighthouse/axe; k6.

- Python (API): PyTest + requests; Locust/k6; OWASP ZAP; pytest-cov.

- Java/Kotlin (API): JUnit + REST Assured; Pact; JMeter/k6.

- Mobile: Appium; BrowserStack/Emuladores locales.