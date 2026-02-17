# 💎 QA en Ruby on Rails

Rails es un framework con gran tradición en pruebas integradas. Su filosofía "convention over configuration" se extiende al testing, lo que lo convierte en un stack con un ecosistema QA muy completo.

## 1. Pruebas Unitarias

### 1.1 Herramientas principales

- **Minitest**: viene integrado en Rails por defecto.

- **RSpec**: el más usado en la comunidad Rails, estilo BDD (muy legible).

### 1.2 Ejemplo con Minitest

````ruby
require "test_helper"

class CalculatorTest < ActiveSupport::TestCase
    test "sum of numbers" do
        assert_equal 5, Calculator.add(2, 3)
    end
end
````

### 1.3 Ejemplo con RSpec

````ruby
RSpec.describe Calculator, type: :model do
    it "adds two numbers" do
        expect(Calculator.add(2, 3)).to eq(5)
    end
end
````

👉 En hackathon: usar RSpec por su expresividad y comunidad.

## 2. Pruebas de Integración / API

- Rails soporta pruebas de controladores y rutas fácilmente:

````ruby
RSpec.describe "GET /hello", type: :request do
    it "returns hello world" do
        get "/hello"
        expect(response).to have_http_status(:ok)
        expect(response.body).to include("Hello World")
    end
end
````

- También se pueden usar herramientas externas:

- **Rack::Test**: para simular requests HTTP.

- **Airborne**: testing de APIs con estilo RSpec.

## 3. Pruebas End-to-End (E2E)

- **Capybara**: simula la interacción del usuario con la aplicación.

- **Selenium**: usado junto con Capybara para navegadores reales.

- **Cuprite**: alternativa ligera a Selenium (usa Chrome DevTools).

### 3.1 Ejemplo con Capybara:

````ruby
RSpec.feature "Login", type: :feature do
    scenario "user logs in successfully" do
        visit "/login"
        fill_in "Username", with: "testuser"
        fill_in "Password", with: "123456"
        click_button "Login"

        expect(page).to have_content("Welcome, testuser")
    end
end
````

## 4. Pruebas de Performance

- **Rack::MiniProfiler**: analiza queries y rendimiento.

- **benchmark-ips**: microbenchmarks en Ruby.

- **Apache JMeter**: para stress/load testing de APIs Rails.

## 5. Pruebas de Seguridad

- **Brakeman**: análisis estático de seguridad para Rails (detecta inyecciones, XSS, CSRF).

- **bundler-audit**: revisa dependencias vulnerables.

- **OWASP ZAP**: análisis dinámico de endpoints web.

## 6. Herramientas Complementarias

- **FactoryBot**: creación de datos de prueba.

- **Faker**: generación de datos aleatorios.

- **SimpleCov**: medición de cobertura de código.

- **Shoulda Matchers**: validaciones y relaciones expresivas en RSpec.

## 7. Recomendaciones rápidas (Hackathon)

- **Unitarias**: usar RSpec + FactoryBot.

- **Integración**: RSpec requests con Rack::Test.

- **E2E**: Capybara + Cuprite (más rápido que Selenium).

- **Performance**: opcional, solo si el MVP depende de consultas pesadas.

- **Seguridad**: correr al menos Brakeman antes de entregar.

👉 Entrega mínima: pruebas unitarias + un par de pruebas de integración (endpoints) + correr Brakeman.

✅ Atenea podrá recomendar QA en proyectos Ruby on Rails con las mejores prácticas, desde lo básico hasta la seguridad avanzada.