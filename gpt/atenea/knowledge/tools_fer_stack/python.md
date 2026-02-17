# 🐍 QA en Python

Python es ampliamente usado en **APIs**, **backend**, **automatización** y **data science**. Su ecosistema de testing es maduro y ofrece herramientas para pruebas unitarias, integración, seguridad y performance.

## 1. Pruebas Unitarias

### 1.1 Herramientas

- **PyTest**: framework más usado, simple y extensible.

- **unittest**: estándar incluido en Python.

- **doctest**: permite probar ejemplos en docstrings.

### 1.2 Ejemplo con PyTest

````python
def suma(a, b):
return a + b

def test_suma():
assert suma(2, 3) == 5
````

✅ Recomendación rápida en hackathon: PyTest por su simplicidad y plugins.

## 2. Pruebas de Integración y API

### 2.1 Herramientas

- **requests**: para consumir y testear endpoints.

- **httpx**: alternativa moderna y asíncrona.

- **pytest-django / pytest-flask**: para integrar con frameworks web.

### 2.2 Ejemplo con requests + PyTest

````python
import requests

def test_api_users():
response = requests.get("http://localhost:8000/users")
assert response.status_code == 200
````

## 3. Pruebas End-to-End (E2E)

Aunque Python no es el estándar para E2E en web, existen opciones:

- **Selenium**: control de navegador, multiplataforma.

- **Playwright para Python**: rápido y más moderno que Selenium.

- **Behave**: estilo BDD (Gherkin).

### 3.1 Ejemplo con Behave

````gherkin
Feature: Login
Scenario: Usuario accede con credenciales válidas
Given abro la página de login
When ingreso email y contraseña correctos
Then accedo al dashboard
````

## 4. Pruebas de Performance

- **Locust**: pruebas de carga sobre APIs, muy usado en Python.

- **Apache JMeter**: alternativa multiplataforma.

### 4.1 Ejemplo con Locust

````python
from locust import HttpUser, task

class UserBehavior(HttpUser):
@task
def get_users(self):
self.client.get("/users")
````

## 5. Pruebas de Seguridad

- **Bandit**: detecta vulnerabilidades en código Python.

- **Safety**: analiza dependencias inseguras.

- **OWASP ZAP**: escaneo dinámico de aplicaciones web.

## 6. Accesibilidad

Python no suele usarse para accesibilidad web directamente, pero puede integrarse con:

- axe-core via Playwright/Selenium para pruebas en frontend.

- Librerías custom para validar HTML generado.

## 7. Herramientas Complementarias

- **Coverage.py**: mide cobertura de pruebas.

- **tox**: automatiza entornos de prueba.

- **Hypothesis**: testing basado en propiedades (inputs aleatorios).

## 8. Recomendaciones rápidas (Hackathon)

- **Unitarias**: PyTest.

- **API**: requests + PyTest.

- **E2E**: Playwright para Python (si ya se conoce), o delegar a JS con Cypress/Playwright.

- **Performance**: Locust.

- **Seguridad**: Bandit + Safety.

- **Entrega mínima**: definir 3-5 casos críticos de API, correrlos en PyTest y documentar resultados.

👉 Lo más importante: validar endpoints críticos (login, CRUD principal, integraciones).

✅ Atenea podrá guiar a equipos Python en cómo cubrir lo esencial de QA, con ejemplos claros y herramientas listas para usar.