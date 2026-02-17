# 🧰 Herramientas por Stack – Guía General

Este documento resume las principales herramientas de QA y testing clasificadas por stack. Su propósito es ofrecer una vista comparativa rápida y permitir a los equipos elegir la opción adecuada según su tecnología.

Para mayor detalle, cada stack tiene su propio archivo en este directorio.

## 📑 Índice por Stack

- [JavaScript/TypeScript](javascript-typescript.md)

- [Python](./python.md)

- [PHP](./php.md)

- [Java/Kotlin](./java-kotlin.md)

- [Mobile](./mobile.md)

- [Frontend Web General](./frontend-web.md)

- [DevOps/CI-CD](./devops-ci-cd.md)

- [Databases](./qa-databases.md)

- [Rust](./rust.md)

- [Ruby](./ruby-rails.md)

- [Go](./go.md)

- [Deploy Environment](./deploy-environment-qa.md)

- [C#](./csharp-dotnet.md)

- [Control Versions](./control-versions-qa.md)

- [Project Management](./project-management-qa.md)

- [Tools Testing](./tools-testing-qa.md)

## 🔍 Comparativo General

| Stack        | Unit Testing     | API/Integration  | E2E/UI                  | Performance       | Seguridad              | Accesibilidad            | Links Oficiales                     |
|--------------|:-----------------|------------------|-------------------------|-------------------|------------------------|--------------------------|-------------------------------------|
| JS/TS        | Jest, Vitest     | Supertest        | Cypress, Playwright     | k6, Lighthouse    | OWASP ZAP, npm audit   | axe-core, Storybook a11y | JS Doc                              |
| Python       | PyTest, unittest | Request + pytest | Behave                  | Locust            | Bandit, OWASP ZAP      | Undefined                | Python Docs                         |
| PHP          | PHPUnit, Pest    | Guzzle + PHPUnit | Laravel Dusk            | JMeter            | PHPStan, SonarQube     | Undefined                | PHP Docs                            |
| Java/Kotlin  | JUnit, TestNG    | Rest Assured     | Selenium, Serenity BDD  | Gatling, JMeter   | OWASP Dependency Check | Undefined                | Java Docs                           |
| Mobile       | JUnit, XCTest    | Undefined        | Appium, Detox, Espresso | Firebase Test Lab | Undefined              | Undefined                | Android Docs, Apple Docs            |
| Frontend Web | Testing Library  | Undefined        | Cypress, Playwright     | Lighthouse        | Undefined              | axe, Wave                | W3C Standards                       |
| DevOps/CI-CD | Undefined        | Undefined        | Undefined               | k6, JMeter        | Snyk, Trivy            | Undefined                | GitHub Actions Docs, GitLab CI Docs |

## 🎯 Recomendaciones rápidas

- **Si el stack es JavaScript/TypeScript (muy común en hackathons)**:
Usa Jest para unitarias, Cypress o Playwright para E2E, y Lighthouse para performance/accesibilidad.

- **Si el stack es Python (APIs)**:
PyTest + requests para API, Locust para carga, y Bandit para seguridad rápida.

- **Si el stack es PHP (Laravel típico)**:
PHPUnit o Pest para unitarias, Laravel Dusk para UI/E2E.

- **Si el stack es Java/Kotlin**:
JUnit/TestNG para unitarias, REST Assured para APIs, y Selenium para E2E.

- **Si es Mobile (Android/iOS)**:
Espresso/XCTest nativos o Appium si es multiplataforma.

- **CI/CD (GitHub/GitLab)**:
Integrar pruebas en el pipeline desde el inicio: unitarias → integración → E2E.

✅ Atenea brindará una visión panorámica inmediata, y luego profundizar en el archivo específico del stack que corresponda.