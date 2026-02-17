# ⚡ QA en JavaScript / TypeScript

El ecosistema de JS/TS ofrece múltiples frameworks para pruebas, desde unitarias hasta E2E. 
Esta guía resume las mejores opciones según el tipo de prueba y el contexto (MVP en hackathon o proyecto profesional).

## 1. Pruebas Unitarias

### 1.1 Herramientas principales

- **Jest**: estándar de facto, rápido y con mocks integrados.

- **Vitest**: compatible con Vite y proyectos modernos (Astro, Vue, React, etc.).

- **Mocha + Chai**: más flexible, requiere configuración adicional.

### 1.2 Ejemplo con Vitest

````js
import { sum } from './math';

test('sum adds numbers', () => {
  expect(sum(2, 3)).toBe(5);
});
````

✅ Recomendación rápida en hackathon: Vitest si usas Vite/Astro/Vue, Jest si usas React/Node clásico.

## 2. Pruebas de Integración y API

### 2.1 Herramientas

- **Supertest**: para testear APIs en Node.js.

- **Jest + fetch mock**: simula respuestas HTTP.

- **msw (Mock Service Worker)**: para interceptar requests en frontend.

### 2.2 Ejemplo con Supertest

````js
import request from 'supertest';
import app from '../app';

it('GET /users devuelve 200', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toBe(200);
});
````

## 3. Pruebas End-to-End (E2E)

### 3.1 Herramientas

- **Cypress**: intuitivo, buen ecosistema, visual.

- **Playwright**: rápido, multi-navegador, ideal para pipelines.

- **Puppeteer**: más abajo nivel, menos amigable que Cypress/Playwright.

### 3.2 Ejemplo con Playwright

````js
import { test, expect } from '@playwright/test';

test('login funciona', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', '123456');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
````

✅ En hackathon: Cypress si quieres ver resultados rápidos, Playwright si necesitas integración CI/CD.

## 4. Pruebas de Performance

### 4.1 Herramientas

- **Lighthouse**: auditoría de performance y accesibilidad en Chrome.

- **k6**: pruebas de carga y estrés sobre APIs/servicios.

### 4.2 Ejemplo con k6

````js
import http from 'k6/http';

export default function () {
  http.get('http://localhost:3000');
}
````

## 5. Pruebas de Seguridad

- **OWASP ZAP**: escaneo de vulnerabilidades web.

- **npm audit**: detecta dependencias inseguras.

- **Snyk**: análisis de seguridad continuo en CI/CD.

## 6. Accesibilidad

- **axe-core**: librería para testear accesibilidad.

- **Lighthouse**: mide accesibilidad con métricas WCAG.

- **Storybook a11y**: pruebas en componentes.

## 7. Herramientas Complementarias

- **Cobertura de código**: Istanbul/nyc.

- **Visual Regression**: Percy, Chromatic.

- **Gestión QA**: integración con GitHub Actions o GitLab CI para automatizar pruebas.

## 8. Recomendaciones Rápidas (Hackathon)

- **Unitarias**: Vitest o Jest.

- **API**: Supertest.

- **E2E**: Playwright si quieres CI/CD, Cypress si necesitas velocidad y debugging visual.

- **Performance**: Lighthouse (rápido), k6 (carga).

- **Accesibilidad**: axe-core + Lighthouse.

- **Seguridad**: npm audit + OWASP ZAP.

👉 Lo más importante: no probar todo, sino lo crítico del MVP (login, flujos principales, integraciones clave).

✅ Atenea podrá recomendar al instante qué herramientas usar en un equipo con stack JS/TS, con ejemplos y links oficiales.