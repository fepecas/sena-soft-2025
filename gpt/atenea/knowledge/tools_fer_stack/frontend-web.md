# 🌐 QA en Frontend Web (Astro / Vue / React / Angular / Svelte)

El frontend es la cara visible de las aplicaciones, y sus pruebas deben garantizar correcta interacción, accesibilidad, performance y confiabilidad en los flujos críticos.

## 1. Pruebas Unitarias en Componentes

### 1.1 Herramientas

- **Vitest**: ideal para proyectos con Vite/Astro/Vue.

- **Jest**: popular en proyectos React/Next.js.

- **Testing Library**: (React, Vue, Angular, Svelte) para pruebas centradas en el usuario.

### 1.2 Ejemplo en React con Testing Library

````tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renderiza el botón con texto', () => {
    render(<Button text="Enviar" />);
    expect(screen.getByText('Enviar')).toBeInTheDocument();
});
````

✅ En hackathon: Vitest (Astro/Vue/Svelte), Jest (React).

## 2. Pruebas de Integración

Validan cómo interactúan varios componentes entre sí.

- **React Testing Library**: simula interacciones entre componentes.

- **Vue Test Utils**: testing oficial para Vue.

- **Angular Testing (Jasmine/Karma)**: nativo en Angular CLI.

### 2.1 Ejemplo en Vue con Vue Test Utils

````js
import { mount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue'

test('envía formulario con datos válidos', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('input[type=email]').setValue('test@mail.com')
    await wrapper.find('input[type=password]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted()).toHaveProperty('submit')
})
````

## 3. Pruebas End-to-End (E2E)

### 3.1 Herramientas

- **Cypress**: fácil de usar, debugging visual.

- **Playwright**: más rápido y robusto en CI/CD.

- **Puppeteer**: más bajo nivel, útil para automatización simple.

### 3.2 Ejemplo con Cypress

````js
describe('Flujo de Login', () => {
    it('permite login válido', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type('test@mail.com')
        cy.get('input[name=password]').type('123456')
        cy.get('button[type=submit]').click()
        cy.url().should('include', '/dashboard')
    })
})
````

✅ En hackathon: Cypress (rápido y visual) o Playwright (CI/CD).

## 4. Pruebas de Performance

- **Lighthouse**: mide performance, accesibilidad y SEO.

- **WebPageTest**: análisis profundo de carga.

- **Bundle Analyzer**: analiza peso de bundles.

## 5. Pruebas de Accesibilidad (a11y)

- **axe-core**: librería de accesibilidad automatizada.

- **storybook-addon-a11y**: pruebas de accesibilidad en componentes.

- **Pa11y**: validaciones automáticas de accesibilidad.

### 5.1 Ejemplo con axe-core en React

````tsx
import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import Button from './Button'

test('botón cumple con accesibilidad', async () => {
    const { container } = render(<Button text="Enviar" />)
    expect(await axe(container)).toHaveNoViolations()
})
````

## 6. Pruebas de Seguridad

- **npm audit**: analiza dependencias inseguras.

- **Snyk**: seguridad en librerías y CI/CD.

- **OWASP ZAP**: escaneo dinámico de apps web.

## 7. Herramientas Complementarias

- **Visual Regression**: Percy, Chromatic.

- **Cobertura**: Istanbul/nyc.

- **CI/CD QA**: GitHub Actions con Cypress/Playwright para automatizar pruebas.

## 8. Recomendaciones rápidas (Hackathon)

- **Unitarias**: Vitest (Astro/Vue/Svelte), Jest (React/Next).

- **Integración**: Testing Library (React/Vue), Angular Test (Angular).

- **E2E**: Cypress (visual rápido) o Playwright (robusto en pipelines).

- **Performance**: Lighthouse.

- **Accesibilidad**: axe-core + Lighthouse.

- **Entrega mínima**: validar login, navegación y un flujo clave del MVP.

👉 Prioriza usabilidad y accesibilidad, que dan puntos extra en competencias como SENASoft.

✅ Atenea podrá recomendar un stack de QA completo para equipos frontend web, con guías prácticas y adaptadas al MVP.