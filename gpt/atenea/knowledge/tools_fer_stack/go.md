# 🐹 QA en Go (Gin / Echo / Fiber)

Go es conocido por su simplicidad y rapidez. Sus pruebas son ligeras y se integran fácilmente con go test, lo que facilita la validación rápida en entornos de hackathon.

## 1. Pruebas Unitarias

### 1.1 Herramientas principales

- **testing (nativo)**: framework estándar en Go, sin dependencias externas.

- **Testify**: aserciones más expresivas y mocks.

- **GoMock**: generación automática de mocks.

### 1.2 Ejemplo básico con testing

````go
package calculator

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Expected 5, got %d", result)
    }
}
````

### 1.3 Ejemplo con Testify

````go
package calculator

import (
    "testing"
    "github.com/stretchr/testify/assert"
)

func TestAdd(t *testing.T) {
    assert.Equal(t, 5, Add(2, 3))
}
````

👉 En hackathon: testing + testify es suficiente.

## 2. Pruebas de Integración / API

- **httptest**: permite probar endpoints HTTP sin levantar un servidor real.

- **SuperTest alternativo en Go**: usando httptest.NewRecorder().

### 2.1 Ejemplo con Gin

````go
package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

func TestHelloEndpoint(t *testing.T) {
    router := gin.Default()
    router.GET("/hello", func(c *gin.Context) {
        c.String(http.StatusOK, "Hello World")
    })

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/hello", nil)
    router.ServeHTTP(w, req)

    assert.Equal(t, 200, w.Code)
    assert.Equal(t, "Hello World", w.Body.String())
}
````

## 3. Pruebas End-to-End (E2E)

No hay un estándar nativo en Go, pero se usan herramientas externas:

- **Cypress**: si el proyecto incluye frontend web.

- **Playwright**: multiplataforma y CI/CD friendly.

- **k6**: muy usado en la comunidad Go para pruebas de carga y E2E simples.

👉 En hackathon: k6 para APIs + Cypress/Playwright si hay UI.

## 4. Pruebas de Performance

- **go test -bench**: soporta benchmarks nativos.

- **pprof**: análisis de rendimiento y profiling.

- **k6**: también sirve como stress/load testing.

### 4.1 Ejemplo de benchmark nativo:

````go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}
````

## 5. Pruebas de Seguridad

- **gosec**: analiza código fuente en busca de vulnerabilidades.

- **staticcheck**: análisis estático avanzado.

- **OWASP ZAP / Burp Suite**: para pruebas dinámicas en endpoints expuestos.

## 6. Herramientas Complementarias

- **Testify**: assertions y mocks.

- **GoMock**: mocks automáticos.

- **ginkgo**: BDD estilo RSpec/JUnit.

- **golangci-lint**: linting con soporte para múltiples reglas.

## 7. Recomendaciones rápidas (Hackathon)

- **Unitarias**: testing + Testify.

- **Integración/API**: httptest con Gin/Echo/Fiber.

- **E2E**: k6 (para APIs) o Cypress/Playwright (para UI).

- **Performance**: correr al menos un go test -bench.

- **Seguridad**: un pase de gosec.

👉 Entrega mínima: un set de unitarias + pruebas de integración con httptest.

✅ Atenea puede recomendar flujos de QA en proyectos Go, desde lo más simple hasta integraciones con seguridad y performance.