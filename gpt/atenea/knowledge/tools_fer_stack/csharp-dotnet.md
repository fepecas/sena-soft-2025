# ⚙️ QA en C# / .NET

El ecosistema .NET cuenta con un conjunto sólido de herramientas oficiales para pruebas unitarias, de integración y automatizadas, con amplia integración en Visual Studio, Rider y pipelines de CI/CD.

## 1. Pruebas Unitarias

### 1.1 Frameworks principales

- **xUnit**: moderno, rápido, muy usado en .NET Core.

- **NUnit**: veterano, con amplia comunidad.

- **MSTest**: oficial de Microsoft, integrado en Visual Studio.

### 1.2 Ejemplo con xUnit

````csharp
using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_ReturnsCorrectSum()
    {
        var calc = new Calculator();
        var result = calc.Add(2, 3);
        Assert.Equal(5, result);
    }
}
````

👉 En hackathon: usar xUnit por simplicidad y rapidez.

## 2. Pruebas de Integración / API

- **ASP.NET Core TestServer**: emula servidor sin necesidad de despliegue real.

- **WebApplicationFactory**: simplifica pruebas de endpoints.

### 2.1 Ejemplo

````csharp
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

public class ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Get_EndpointReturnsSuccess()
    {
        var response = await _client.GetAsync("/api/hello");
        response.EnsureSuccessStatusCode();
    }
}
````

## 3. Pruebas End-to-End (E2E)

- **Selenium**: pruebas de UI en navegadores.

- **Playwright for .NET**: moderno, más rápido y confiable que Selenium.

- **SpecFlow**: estilo BDD (similar a Cucumber).

👉 En hackathon: Playwright es más simple y se integra bien en pipelines.

## 4. Pruebas de Performance

- **BenchmarkDotNet**: estándar para microbenchmarks.

- **dotnet-counters**: analiza rendimiento en tiempo real.

## 5. Pruebas de Seguridad

- **SonarQube**: análisis estático de código C#.

- **DevSkim**: reglas de seguridad para código en tiempo real.

- **OWASP ZAP**: escaneo de apps web .NET.

## 6. Herramientas Complementarias

- **Moq**: librería de mocking para pruebas unitarias.

- **AutoFixture**: genera datos de prueba automáticos.

- **Coverlet**: cobertura de código en proyectos .NET.

- **ReportGenerator**: reportes de cobertura.

## 7. Recomendaciones rápidas (Hackathon)

- **Unitarias**: usar xUnit + Moq.

- **Integración**: WebApplicationFactory para APIs.

- **E2E**: Playwright (si hay frontend).

- **Performance**: opcional, solo si el MVP depende de velocidad.

- **Seguridad**: correr al menos un análisis con SonarQube o DevSkim.

👉 Entrega mínima: pruebas unitarias + un par de pruebas de API con WebApplicationFactory.

✅ Atenea podrá recomendar prácticas QA sólidas en .NET Core / C#, adaptadas tanto a proyectos web como APIs.