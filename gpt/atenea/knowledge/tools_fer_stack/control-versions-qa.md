# 🔀 QA en Control de Versiones (GitHub, GitLab, Bitbucket)

El control de versiones no solo organiza el código, también es clave en QA para asegurar trazabilidad, calidad en los cambios y colaboración del equipo.

## 1. Buenas prácticas de QA en control de versiones

- **Commits claros y frecuentes**: mensajes descriptivos, evitando “fix” o “update”.

- **Convención de ramas**:

    - **main o master**: estable.

    - **develop**: integración.

    - **feature/***: nuevas funcionalidades.

    - **bugfix/*:** correcciones puntuales.

- **Pull/Merge Requests con revisión**: mínimo un compañero debe validar antes de fusionar.

- **Integración de QA en PR**: ejecutar pruebas unitarias y linters automáticamente.

- **Etiquetas y releases**: marcar versiones importantes del MVP.

## 2. QA con GitHub

- **Actions**: automatizar pruebas (unitarias, linting, seguridad).

- **Protección de ramas**: evitar commits directos en main.

- **Code Owners**: asignar responsables de revisión.

- **Integración con SonarQube o CodeQL**: análisis estático de calidad y seguridad.

## 3. QA con GitLab

- **CI/CD integrado**: pipelines con stages de build, test y deploy.

- **Merge Request approvals**: revisiones obligatorias.

- **SAST y DAST integrados**: pruebas automáticas de seguridad.

- **Coverage reports**: visibilidad de cobertura en los MR.

## 4. QA con Bitbucket

- **Pipelines**: ejecución de pruebas en cada commit/push.

- **Branch permissions**: restringir quién puede fusionar.

- **Pull Request checklist**: asegurar validaciones QA antes del merge.

- **Integraciones**: Jira para trazabilidad de bugs.

## 5. Herramientas complementarias

- **Husky (pre-commit hooks)**: correr linters o pruebas antes de permitir commits.

- **Commitlint + Conventional Commits**: asegurar consistencia en mensajes.

- **Danger.js**: automatizar recordatorios de QA en PR.

- **SonarCloud**: análisis de calidad continuo conectado al repositorio.

## 6. QA en entornos de hackathon

- **Mantener un flujo simple**:

    - main estable.

    - ramas feature/* para trabajo paralelo.

- Hacer pull requests pequeños y rápidos.

- Ejecutar pruebas mínimas con cada PR (aunque sean unitarias).

- Documentar en el README los comandos para correr los tests.

## 7. Recomendaciones rápidas (Hackathon)

- Commits claros y frecuentes (mínimo 1 por cada avance real).

- Revisiones rápidas en PRs.

- **Integración mínima en CI**: correr npm test, pytest, phpunit o equivalente.

- **Evidencia de colaboración**: mostrar en el repositorio la participación de todos.

👉 Entrega mínima:

- Uso de ramas.

- PRs con revisiones.

- Pipeline básico que corra pruebas unitarias.

✅ Atenea podrá orientar a los equipos a usar control de versiones con foco QA, no solo como repositorio de código.