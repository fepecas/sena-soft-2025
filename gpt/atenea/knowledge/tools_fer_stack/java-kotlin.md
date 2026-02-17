# ☕ QA en Java / Kotlin

Java y Kotlin son lenguajes ampliamente usados en backend, Android y aplicaciones empresariales. Su ecosistema de QA es robusto y con gran soporte en CI/CD.

## 1. Pruebas Unitarias

### 1.1 Herramientas

- **JUnit**: estándar de facto en pruebas unitarias.

- **TestNG**: alternativa avanzada, con más opciones de configuración.

- **Mockito**: mocking para pruebas unitarias.

### 1.2 Ejemplo con JUnit 5 (Java)

````java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class MathTest {
    @Test
    void testSum() {
        assertEquals(5, 2 + 3);
    }
}
````

### 1.3 Ejemplo con JUnit + Kotlin

````kotlin
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class MathTest {
    @Test
    fun testSum() {
        assertEquals(5, 2 + 3)
    }
}
````

✅ En hackathon: JUnit es lo más rápido y estándar.

## 2. Pruebas de Integración y API

### 2.1 Herramientas

- **Spring Boot Test**: integrado con JUnit.

- **REST Assured**: para testear APIs REST de forma sencilla.

- **Mockito**: para simular dependencias.

### 2.2 Ejemplo con REST Assured

````java
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import static org.hamcrest.Matchers.equalTo;

class ApiTest {
    @Test
    void testGetUsers() {
        RestAssured.get("http://localhost:8080/users")
        .then()
        .statusCode(200)
        .body("size()", equalTo(3));
    }
}
````

## 3. Pruebas End-to-End (E2E)

### 3.1 Herramientas

- **Selenium**: estándar para pruebas de navegador.

- **Serenity BDD**: framework para pruebas E2E con reportes avanzados.

- **Cucumber**: estilo BDD, integración con JUnit/TestNG.

### 3.2 Ejemplo con Cucumber (Kotlin)

````gherkin
Feature: Login
Scenario: Usuario accede correctamente
Given estoy en la página de login
When ingreso credenciales válidas
Then debo ver el dashboard
````

## 4. Pruebas de Performance

- **Apache JMeter**: clásico para pruebas de carga.

- **Gatling**: DSL en Scala/Kotlin para performance testing.

- **Micrometer**: métricas en aplicaciones Spring Boot.

## 5. Pruebas de Seguridad

- **OWASP Dependency Check**: analiza dependencias inseguras.

- **SonarQube**: calidad de código y seguridad.

- **FindSecBugs**: plugin para detectar vulnerabilidades en Java.

## 6. Accesibilidad

En Java/Kotlin no es habitual para frontend web, pero en Android sí existen opciones:

- **Accessibility Test Framework for Android**: framework oficial de Google.

- **Espresso + accesibilidad**: se pueden verificar labels y roles en apps Android.

## 7. Herramientas Complementarias

- **JaCoCo**: mide cobertura de código en Java/Kotlin.

- **Gradle Test / Maven Surefire Plugin**: integración de pruebas en builds.

- **Allure Reports**: reportes avanzados de pruebas.

## 8. Recomendaciones rápidas (Hackathon)

- **Unitarias**: JUnit.

- **API**: REST Assured.

- **E2E**: Selenium o Cucumber si el equipo ya lo maneja.

- **Performance**: JMeter si se necesita.

- **Seguridad**: Dependency Check + SonarQube.

- **Entrega mínima**: pruebas unitarias críticas + al menos 1 caso de API con REST Assured.

👉 Prioriza **JUnit + REST Assured**, fáciles de configurar y cubren lo esencial en un MVP.

✅ Atenea podrá guiar a equipos Java/Kotlin con recomendaciones concretas, ejemplos y herramientas probadas en entornos reales.