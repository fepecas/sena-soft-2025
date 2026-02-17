# 🐘 QA en PHP

PHP sigue siendo uno de los lenguajes más usados en desarrollo 
web. Su ecosistema de QA está muy ligado a **Laravel** y frameworks
modernos, aunque existen herramientas universales para pruebas,
integración y calidad de código.

## 1. Pruebas Unitarias

### 1.1 Herramientas

- **PHPUnit**: estándar de facto para pruebas unitarias en PHP.

- **Pest**: alternativa moderna, sintaxis más limpia e intuitiva.

### 1.2 Ejemplo con PHPUnit

````php
<?php
use PHPUnit\Framework\TestCase;

class MathTest extends TestCase {
    public function testSum() {
        $this->assertEquals(5, 2 + 3);
    }
}
````

### 1.3 Ejemplo con Pest

````php
test('sum works', function () {
    expect(2 + 3)->toBe(5);
});
````

✅ Recomendación rápida en hackathon: Pest (si usas Laravel moderno), PHPUnit (si ya está configurado).

## 2. Pruebas de Integración y API

### 2.1 Herramientas

- **Laravel Test Tools**: PHPUnit + helpers de Laravel.

- **Laravel Dusk**: pruebas de navegador para integración y E2E.

- **Guzzle**: cliente HTTP para probar APIs manualmente o en PHPUnit.

### 2.2 Ejemplo con Laravel Test

````php
public function test_users_endpoint() {
    $response = $this->get('/users');
    $response->assertStatus(200);
}
````

## 3. Pruebas End-to-End (E2E)

### 3.1 Herramientas

- **Laravel Dusk**: automatiza el navegador Chrome, fácil de integrar.

- **Codeception**: framework de testing BDD/E2E.

- **Selenium**: opción universal, pero más pesada que Dusk.

### 3.2 Ejemplo con Laravel Dusk

````php
public function testLogin() {
    $this->browse(function ($browser) {
        $browser->visit('/login')
        ->type('email', 'test@example.com')
        ->type('password', 'secret')
        ->press('Login')
        ->assertPathIs('/dashboard');
    });
}
````

## 4. Pruebas de Performance

- **Apache JMeter**: pruebas de carga clásicas.

- **Artillery**: alternativa moderna (Node.js).

- **Blackfire**: profiling y performance para PHP.

## 5. Pruebas de Seguridad

- **PHPStan**: análisis estático del código.

- **Psalm**: otra opción de análisis estático, usada en Symfony.

- **SonarQube**: auditoría de seguridad y calidad en pipelines.

- **OWASP ZAP**: escaneo dinámico de aplicaciones web.

## 6. Accesibilidad

En proyectos PHP tradicionales no hay herramientas nativas, pero al generar frontend se recomienda:

- axe-core, Wave o Lighthouse (sobre HTML renderizado).

- Integrar con testing E2E (ej. Dusk + axe).

## 7. Herramientas Complementarias

- **PHP-CS-Fixer**: estandariza formato y estilo.

- **Infection (Mutation Testing)**: mide efectividad de las pruebas.

- **GitHub Actions con PHPUnit**: integración rápida en CI/CD.

## 8. Recomendaciones rápidas (Hackathon)

- **Unitarias**: PHPUnit o Pest.

- **Integración**: Laravel Test.

- **E2E**: Laravel Dusk.

- **Performance**: JMeter si se requiere.

- **Seguridad**: PHPStan + OWASP ZAP.

- **Entrega mínima**: tener al menos 3 pruebas (login, API principal, validaciones).

👉 Prioriza **Laravel Test** + **Dusk**, que ya vienen listos en el ecosistema y son rápidos de implementar.

✅ Atenea podrá dar recomendaciones directas y específicas para PHP/Laravel, con ejemplos claros y links oficiales.