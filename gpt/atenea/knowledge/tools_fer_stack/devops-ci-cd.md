# 🔄 QA en DevOps y CI/CD

Integrar QA en pipelines de DevOps permite que las pruebas se ejecuten de forma automática en cada commit, PR o despliegue. Esto asegura entregas rápidas y confiables, incluso en MVPs.

## 1. Principios de QA en CI/CD

- **Automatización**: pruebas unitarias, integración y E2E deben correr sin intervención manual.

- **Validación temprana**: ejecutar QA en cada commit para detectar errores rápido.

- **Bloqueo de builds**: si las pruebas fallan, no se despliega.

- **Visibilidad**: reportes claros para el equipo (logs, dashboards, notificaciones).

## 2. Herramientas CI/CD Populares

- **GitHub Actions**: ideal para proyectos en GitHub.

- **GitLab CI/CD**: integrado con repos GitLab.

- **CircleCI**: fácil de configurar, rápido en cloud.

- **Jenkins**: muy flexible, aunque más pesado.

- **Bitrise**: especializado en apps móviles.

## 3. Flujo típico de QA en CI/CD

- **Commit/PR**: desarrollador sube cambios.

- **Pipeline se dispara**: build + instalación de dependencias.

- **QA automático**:

    - Pruebas unitarias.

    - Pruebas de integración/API.

    - E2E/UI (Cypress/Playwright/Appium).

    - Auditorías de seguridad (npm audit, Bandit, PHPStan).

    - Análisis de calidad (SonarQube, ESLint, PHP-CS-Fixer).

- **Reporte**: logs + dashboard de resultados.

- **Deploy**: solo si QA pasa.

## 4. Ejemplos de Configuración

### 4.1 GitHub Actions (Node.js con Jest + Cypress)

````yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test # unitarias
      - run: npx cypress run # E2E
````

### 4.2 GitLab CI/CD (Python con PyTest + Bandit)

````yaml
stages:
- test
- security

unit_tests:
  stage: test
  script:
    - pip install -r requirements.txt
    - pytest

security_check:
stage: security
script:
- pip install bandit
- bandit -r .
````

## 5. QA en Contenedores y Cloud

- **Docker**: empaquetar app + entorno de pruebas.

- **Kubernetes**: ejecutar QA en pods de pre-producción.

- **GitHub Codespaces**: entornos efímeros para QA.

## 6. Integración de Reportes

- **Allure Reports**: reportes detallados con gráficos.

- **JUnit Reports (XML)**: compatibles con la mayoría de CI/CD.

- **Slack / Discord notifications**: enviar resultados al equipo.

## 7. Recomendaciones rápidas (Hackathon)

- Si usas **GitHub**, configura un **workflow mínimo**:

    - ``npm run test`` (unitarias).

    - ``npx cypress run`` (E2E).

- Para **Python**: ``pytest`` + ``bandit``.

- Para **PHP**: ``phpunit`` o ``pest`` + ``phpstan``.

- Para **Java/Kotlin**: ``mvn test`` o ``gradle test``.

- Para **Mobile**: **Bitrise** o GitHub Actions con emuladores.

👉 Entrega mínima: un **pipeline que ejecute unitarias** + al menos un E2E, y que bloquee el deploy si falla.

✅ Atenea podrá guiar a los equipos en cómo automatizar QA en pipelines CI/CD, adaptándose al stack y recursos disponibles, desde lo más simple hasta lo avanzado.