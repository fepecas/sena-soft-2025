# 🦀 QA en Rust (Rocket / Actix Web)

Rust ofrece seguridad de memoria y concurrencia como parte del lenguaje, lo que ya previene muchos errores comunes. Aun así, cuenta con herramientas para pruebas unitarias, integración, rendimiento y seguridad muy potentes.

## 1. Pruebas Unitarias

Rust tiene soporte nativo para pruebas en el propio lenguaje, usando el atributo #[test].

### 1.1 Ejemplo básico

````rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}
````

👉 Ejecutar con:

````bash
cargo test
````

## 2. Pruebas de Integración / API

Rust soporta pruebas de integración en la carpeta tests/.

### 2.1 Ejemplo con Actix Web

````rust
use actix_web::{test, App, HttpResponse, web};

async fn hello() -> HttpResponse {
    HttpResponse::Ok().body("Hello World")
}

#[actix_web::test]
async fn test_hello() {
    let app = test::init_service(App::new().route("/hello", web::get().to(hello))).await;
    let req = test::TestRequest::get().uri("/hello").to_request();
    let resp = test::call_service(&app, req).await;
    assert!(resp.status().is_success());
}
````

### 2.2 Ejemplo con Rocket

````rust
#[macro_use] extern crate rocket;

#[get("/hello")]
fn hello() -> &'static str {
    "Hello, world!"
}

#[cfg(test)]
mod tests {
    use super::*;
    use rocket::local::blocking::Client;

    #[test]
    fn test_hello() {
        let client = Client::tracked(rocket::build().mount("/", routes![hello])).unwrap();
        let response = client.get("/hello").dispatch();
        assert_eq!(response.into_string().unwrap(), "Hello, world!");
    }
}
````

## 3. Pruebas End-to-End (E2E)

Rust no tiene frameworks E2E nativos para UI, pero se integra con:

- **Cypress**: para frontends que consumen APIs Rust.

- **Playwright**: para pruebas de frontend/backend combinadas.

- **k6**: ideal para stress/load testing de APIs Rust.

👉 En hackathon: usar k6 si se quiere validar performance de la API.

## 4. Pruebas de Performance

- **Benchmarks nativos** con #[bench] (requiere nightly o crates externos).

- **Criterion.rs**: librería de benchmarks confiable y con reportes.

### 4.1 Ejemplo con Criterion:

````rust
use criterion::{black_box, Criterion, criterion_group, criterion_main};

fn bench_add(c: &mut Criterion) {
    c.bench_function("add 2+3", |b| b.iter(|| add(black_box(2), black_box(3))));
}

criterion_group!(benches, bench_add);
criterion_main!(benches);
````

## 5. Pruebas de Seguridad

- **cargo-audit**: revisa vulnerabilidades en dependencias.

- **clippy**: linter avanzado que detecta patrones inseguros.

- **MIRAI**: análisis estático de código para seguridad.

- **OWASP ZAP / Burp Suite**: para pruebas dinámicas en APIs Rust.

## 6. Herramientas Complementarias

- **Mockall**: mocking framework para Rust.

- **proptest**: pruebas basadas en propiedades (similar a QuickCheck de Haskell).

- **insta**: testing basado en snapshots.

- **Tarpaulin**: cobertura de código en Rust.

## 7. Recomendaciones rápidas (Hackathon)

- **Unitarias**: usar cargo test.

- **Integración/API**: Actix o Rocket con #[test].

- **E2E**: opcional, pero k6 para stress tests es útil.

- **Performance**: usar Criterion solo si es crítico.

- **Seguridad**: correr cargo audit y clippy antes de entregar.

👉 Entrega mínima: unitarias + integración de endpoints + cargo audit.

✅ Atenea podrá asistir equipos que elijan Rust con Rocket o Actix, ofreciendo QA completo desde pruebas unitarias hasta seguridad y performance.