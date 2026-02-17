# 📱 QA en Mobile (Android / iOS / Multiplataforma)

Las pruebas en entornos móviles deben validar no solo la lógica de negocio, sino también interacciones de usuario, compatibilidad de dispositivos y experiencia fluida.

## 1. Pruebas Unitarias

### 1.1 Android (Java/Kotlin)

- **JUnit**: estándar en Android para unitarias.

- **Robolectric**: emula componentes Android sin necesidad de emulador.

### 1.2 iOS (Swift)

- **XCTest**: framework oficial de Apple.

### 1.3 Multiplataforma

- **React Native**: Jest + React Native Testing Library.

- **Flutter**: flutter_test.

### 1.4 Ejemplo en Kotlin con JUnit

````kotlin
import org.junit.Test
import kotlin.test.assertEquals

class MathTest {
    @Test
    fun testSum() {
        assertEquals(5, 2 + 3)
    }
}
````

## 2. Pruebas de Integración

### 2.1 Android

- **Espresso (AndroidX Test)**: framework oficial para UI y flujo de integración.

### 2.2 iOS

- **XCUITest**: extensión de XCTest para integración y UI.

### 2.3 Multiplataforma

- **Flutter Integration Test**: pruebas de flujo en Flutter.

- **Detox**: framework para React Native.

## 3. Pruebas End-to-End (E2E)

### 3.1 Herramientas

- **Appium**: estándar abierto para automatización multiplataforma (Android + iOS).

- **Espresso (Android)**: UI automation oficial.

- **XCUITest (iOS)**: UI automation oficial.

- **Detox (React Native)**: específico para flujos en RN.

### 3.2 Ejemplo con Espresso (Android)

````kotlin
@Test
fun testLoginFlow() {
    onView(withId(R.id.email)).perform(typeText("test@example.com"))
    onView(withId(R.id.password)).perform(typeText("123456"))
    onView(withId(R.id.login_button)).perform(click())
    onView(withId(R.id.dashboard)).check(matches(isDisplayed()))
}
````

## 4. Pruebas de Performance

- **Firebase Test Lab**: pruebas en dispositivos reales.

- **Android Profiler (Android Studio)**: análisis de CPU, memoria y red.

- **Xcode Instruments (iOS)**: análisis de performance en iOS.

## 5. Pruebas de Seguridad

- **MobSF (Mobile Security Framework)**: escaneo de apps Android/iOS.

- **OWASP Mobile Testing Guide**: buenas prácticas para seguridad móvil.

- **SonarQube**: análisis estático de código móvil.

## 6. Accesibilidad

- **Android Accessibility Scanner**: analiza apps Android en dispositivos reales.

- **Xcode Accessibility Inspector (iOS)**: herramienta oficial para apps iOS.

- **axe para React Native**: librerías integradas en Jest/RTL.

## 7. Herramientas Complementarias

- **Fastlane**: automatización de builds y testing para mobile.

- **Bitrise / GitHub Actions**: CI/CD para apps móviles.

- **BrowserStack App Live**: pruebas manuales en dispositivos reales.

## 8. Recomendaciones rápidas (Hackathon)

- **Android**: JUnit + Espresso.

- **iOS**: XCTest + XCUITest.

- **React Native**: Jest + Detox.

- **Flutter**: flutter_test + Integration Test.

- **Multiplataforma (rápida)**: Appium si necesitas cubrir Android e iOS con un solo set de pruebas.

👉 Prioriza flujos críticos (login, navegación, formularios) y prueba en al menos un dispositivo real o emulador.

✅ Atenea podrá guiar a equipos mobile con las herramientas oficiales y multiplataforma, adaptándose al stack del equipo y los recursos disponibles.