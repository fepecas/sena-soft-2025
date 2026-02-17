# ☁️ QA en Despliegues y Entornos en la Nube

El QA en despliegue busca asegurar que el MVP sea accesible, estable, reproducible y evaluable en cualquier entorno. No basta con que funcione en local: debe estar disponible para el jurado y usuarios finales.

## 1. Buenas prácticas de QA en despliegues

- **Entornos diferenciados**: al menos dev y prod.

- **Automatización**: usar pipelines o scripts reproducibles para despliegue.

- **Pruebas post-despliegue**: validar endpoints, logs y estado del servicio tras cada release.

- **Disponibilidad**: asegurar que el MVP esté accesible con URL pública.

- **Rollback plan**: tener forma de regresar a versión anterior si falla.

## 2. QA con Vercel / Netlify

- Pruebas automáticas de build: detectan errores en configuración.

- **Preview URLs**: QA puede validar ramas antes de merge.

- Validación accesibilidad y performance (Lighthouse integrado).

- Ideal para frontends y backends serverless.

## 3. QA con Render / Railway / Heroku

- Logs en tiempo real para detectar errores post-deploy.

- Health checks automáticos (validar estado de la app).

- Rollback sencillo en caso de fallos.

- QA debe validar conectividad con base de datos y APIs externas.

## 4. QA con Firebase / Supabase

- Hosting web estático o dinámico.

- **Realtime Database / Firestore**: validar reglas de seguridad y permisos.

- **Emuladores locales**: QA puede testear antes de desplegar.

- **Auth**: validar registros/login bajo distintos casos.

## 5. QA con Docker / Kubernetes

- **Reproducibilidad**: todo el stack en contenedores, evitando “works on my machine”.

- **Pruebas de integridad**: levantar contenedor y correr tests dentro.

- **Docker Compose**: simular entornos con múltiples servicios.

- **Kubernetes health checks**: readiness y liveness probes para QA continuo.

## 6. Herramientas de QA en despliegue

- **k6 / JMeter**: pruebas de carga post-deploy.

- **OWASP ZAP**: validación de seguridad de endpoints públicos.

- **Lighthouse CI**: validación de performance web.

- **Checkly / UptimeRobot**: monitoreo de disponibilidad.

## 7. QA en entornos de hackathon

- **Usar servicios rápidos y gratuitos**: Vercel, Render, Firebase.

- Evitar dependencias pesadas (Kubernetes solo si es esencial).

- Siempre entregar una URL pública accesible.

- **Hacer smoke tests post-deploy**: validar login, APIs clave, carga mínima.

- **Documentar en README**: cómo desplegar y en qué servicio está disponible.

## 8. Recomendaciones rápidas (Hackathon)

- Desplegar en Vercel o Render (rápidos, free tier).

- Verificar disponibilidad desde otro dispositivo/red.

- Validar logs para capturar errores de producción.

- **Adjuntar en la entrega final**: URL + instrucciones de acceso.

👉 Entrega mínima:

- MVP desplegado en un servicio accesible.

- Validación de al menos 1–2 endpoints o funcionalidades clave post-deploy.

- Documentación de URL y credenciales de prueba.

✅ Atenea puede orientar a los equipos para que el MVP esté disponible y evaluable, cumpliendo con QA no solo en desarrollo, sino también en producción.