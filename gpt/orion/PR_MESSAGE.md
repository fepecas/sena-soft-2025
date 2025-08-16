¡va! aquí tienes **`PR_MESSAGE.md`** listo para pegar en tu repo. Es una plantilla clara y completa para abrir el Pull Request de **Orion**.

---

# PR: Orion – Asistente de Análisis y Estrategia de Proyectos

## Resumen (2–3 líneas)

**Orion** es un GPT persona que actúa como **mentor técnico y consultor metodológico** para proyectos de software. Entrega **diagnósticos claros**, **recomendaciones accionables** y **rutas estratégicas**, priorizando explicación por encima de grandes bloques de código y cerrando cada respuesta con un **bloque JSON validable**.

---

## Alcance del PR

* Añade documentación integral (README, prompt, instrucciones operativas).
* Define **contrato de salida** con **JSON Schema** y configuración de orquestación.
* Incluye **plantillas** para diagnósticos, ADRs, rendimiento y readiness.
* Proporciona **ejemplos reales** que muestran formato y valor pedagógico.

---

## Checklist de archivos incluidos

* [ ] `gpt/orion/README.md`
* [ ] `gpt/orion/prompt_orion.md`
* [ ] `gpt/orion/instructions_orion.md`
* [ ] `gpt/orion/response_orion.schema.json`
* [ ] `gpt/orion/response_orion.json`
* [ ] `gpt/orion/templates/diagnostico_tecnico.md`
* [ ] `gpt/orion/templates/adr_light.md`
* [ ] `gpt/orion/templates/plan_rendimiento.md`
* [ ] `gpt/orion/templates/readiness_checklist.md`
* [ ] `gpt/orion/examples/caso_1.md`
* [ ] `gpt/orion/examples/caso_2.md`
* [ ] `gpt/orion/assets/avatar_orion.png` / `avatar_orion_full.png` / `avatar_orion.md`'

> Marca solo lo que esté en este PR.

---

## Valor / Aporte a “Desarrollo Integral 2025”

* **Claridad y consistencia**: todas las respuestas siguen una **plantilla obligatoria** (Contexto → Proceso → Diagnóstico → Recomendaciones → Próximos pasos → Indicadores → JSON).
* **Medibilidad**: cada salida incluye **métricas/umbrales** y un **bloque JSON** validable (facilita revisión objetiva por jurados).
* **Formación**: estilo **profesor–ingeniero** que explica *por qué* y *cómo*, no solo *qué*.
* **Escalabilidad organizacional**: plantillas y ADRs fomentan documentación viva, trazabilidad y toma de decisiones informada.

---

## Cómo probar / revisar (orden sugerido)

1. **README** → visión, alcance, principios y ejemplos de uso.
2. **`prompt_orion.md`** → “cerebro”: rol, tono, método O·R·I·O·N, estructura por defecto.
3. **`instructions_orion.md`** → manual operativo: plantilla obligatoria y salida JSON.
4. **`response_orion.schema.json`** → contrato de salida (JSON Schema Draft 2020-12).
5. **`response_orion.json`** → configuración del orquestador (rutas/mode `markdown+json`).
6. **`templates/*.md`** → moldes listos (diagnóstico, ADR, rendimiento, checklist).
7. **`examples/caso_1.md` y `caso_2.md`** → verificar que **siguen la plantilla** y que el **JSON** concuerda con el schema.
8. (Opcional) **Validación automática** del bloque JSON:

### Validación rápida del schema

* **Python**

  ```bash
  python gpt/orion/scripts/validate_response.py gpt/orion/examples/salida_orion_ejemplo.json
  ```
* **Node.js (Ajv)**

  ```bash
  node gpt/orion/scripts/validate_response.js gpt/orion/examples/salida_orion_ejemplo.json
  ```

> Si no incluyes los scripts en este PR, puedes validar con cualquier herramienta JSON Schema 2020-12 pegando el schema y el bloque JSON de los ejemplos.

---

## Criterios de aceptación (para el revisor)

* [ ] El **README** es coherente con el contenido del PR y describe bien a Orion.
* [ ] El **prompt** y las **instructions** **no se contradicen** y piden la misma estructura de salida.
* [ ] El **schema** exige los mínimos: `status`, `context_summary`, `recommendations`, `next_steps` (y acepta opcionales).
* [ ] La **config** (`response_orion.json`) referencia rutas válidas y `output.mode = "markdown+json"`.
* [ ] Los **examples** muestran todas las secciones y cierran con JSON **válido**.
* [ ] Las **plantillas** cubren diagnóstico, ADR, rendimiento y readiness.
* [ ] (Opcional) Los scripts de validación funcionan y reportan errores útiles.

---

## Cómo verificar rutas (sanity check)

* [ ] Abrir cada ruta del checklist en el repo.
* [ ] Confirmar que el orden de secciones en **`defaults.sections_order`** (dentro de `response_orion.json`) coincide con `instructions_orion.md`.
* [ ] Si cambiaste nombres/carpetas, actualizar **todas** las referencias (error típico).

---

## Imágenes / Medios (si aplican)

* `gpt/orion/assets/avatar_orion.png`
* `gpt/orion/assets/avatar_orion_full.png`
* (Opcional) GIF corto mostrando “input → salida con JSON validado”

> Si no están en este PR, elimina esta sección o márcala como *N/A*.

---

## Riesgos / Limitaciones

* Orion **no** genera grandes bloques de código; prioriza explicación (diseño intencional).
* No sustituye auditorías de seguridad ni decisiones legales/compliance.
* Requiere **contexto suficiente** del usuario para diagnósticos de alta certeza.

---

## Notas de implementación

* Dialecto del Schema: **Draft 2020-12**.
* El bloque JSON debe ir bajo el heading **“## JSON”** (configurable en `response_orion.json`).
* En validaciones fallidas, el orquestador puede **adjuntar advertencia** (según `on_validation_error`).

---

## Cambios incluidos en este PR

* [ ] Documentación (README, prompt, instructions)
* [ ] Esquema de salida (JSON Schema)
* [ ] Configuración de orquestación
* [ ] Plantillas
* [ ] Ejemplos
* [ ] Scripts de validación
* [ ] Activos/medios

> Marca lo que aplique.

---

## Contacto / Autoría

* Responsables:
* `[Tomas Esquivel P.]`
* `[Nombre]`
* `[Nombre]`
* Licencia: **MIT**

