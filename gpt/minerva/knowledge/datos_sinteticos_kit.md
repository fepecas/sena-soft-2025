# Kit de Datos Sintéticos — Cómo usarlo, Plantilla y Ejemplos

**Cuándo usarlo**  
Actívalo cuando tu etapa sea **≥ Diseño** o ya tengas un **flujo agéntico mínimo** y **métricas** de valor claras. Sirve para probar el MVP sin datos sensibles, cubrir casos límite y preparar evidencias para jurado.

---

## Plantilla (rellena tú)

- **Objetivo del dataset**  
  *Qué evidencia del MVP valida (ej.: mejora de claridad del prompt del intento 1→2; desempeño offline→online; cobertura de accesibilidad).*

- **Variables (campos y dominios)**  
  *Lista/tabla con nombre, tipo y valores válidos. Indica cuáles son obligatorias.*

- **Generación**  
  *Cómo lo generarás (prompts, scripts, mezcla). Fuente 100% sintética. Define tamaño inicial (p. ej., 200–500 filas).*

- **Cobertura**  
  *Casos felices, bordes (baja conectividad, accesibilidad), y errores (inputs ambiguos, faltantes). Incluye porcentajes objetivo.*

- **Privacidad/Ética**  
  *No incluir PII. Balance por perfiles/territorios. Reglas para evitar sesgos.*

- **Reproducibilidad**  
  *Semilla (seed), versión del prompt/script, fecha, responsable.*

- **Validación**  
  *Checks automáticos o manuales (distribuciones, coherencia de campos, relaciones esperadas).*

- **Uso en las pruebas**  
  *Cómo se consume: qué vista/endpoint/flujo del MVP usa el dataset y qué resultado esperas evidenciar.*

- **Bitácora**  
  *Cambios, fechas y quién los hizo.*

---

## Ejemplo general (agnóstico, edítalo o bórralo)

- **Objetivo**: Evidenciar que el **agente tutor** mejora la **claridad del prompt** entre intento 1 y 2, y que el MVP funciona con **baja conectividad** y **opciones de accesibilidad**.

- **Variables**
  - `usuario_id` (string)  
  - `perfil` {aprendiz|instructor}  
  - `conectividad` {2G|3G|4G|WiFi}  
  - `accesibilidad.lector_pantalla` {true|false}  
  - `accesibilidad.alto_contraste` {true|false}  
  - `nivel_alfabetizacion` {bajo|medio|alto}  
  - `reto_id` (string)  
  - `intento_n` {1|2|3}  
  - `prompt_texto` (string)  
  - `score_claridad` {1..5} *(esperado ↑ del intento 1 al 2)*  
  - `feedback_agente` (string corto)  
  - `resultado` {ok|ayuda|error}  
  - `offline` {sí|no}  
  - `latencia_ms` (int, 50–5000)  
  - `tokens_in` / `tokens_out` (int, opcional)  
  - `timestamp` (ISO 8601)

- **Generación (prompt ejemplo)**  
  “Genera **300** filas con el esquema anterior:  
  - 40% `conectividad` en {2G,3G}; 60% en {4G,WiFi}.  
  - 20% con `accesibilidad.lector_pantalla=true`.  
  - 30% de `prompt_texto` ambiguos en `intento_n=1` que mejoran su `score_claridad` en `intento_n=2` (≥ +1).  
  - 10% de casos con `offline=sí` que luego se sincronizan (mismo `usuario_id`/`reto_id`, `intento_n` consecutivo).  
  - `resultado` proporcional a `score_claridad` (1–2 → error/ayuda; 3–5 → ok/ayuda).  
  Sin datos sensibles; texto realista y breve.”

- **Cobertura (objetivo)**  
  - Felices: 50% (WiFi/4G, `score_claridad` ≥3 en intento 2).  
  - Bordes: 30% (2G/3G y/o accesibilidad activa).  
  - Errores: 20% (prompts muy ambiguos, entradas vacías controladas).

- **Privacidad/Ética**  
  - Sin PII (nombres/cedulas/correos).  
  - Balance de `perfil` y `nivel_alfabetizacion`.  
  - Revisar que `feedback_agente` no incluya juicios sesgados.

- **Reproducibilidad**  
  - `seed=2025` · versión prompt `v1` · responsable `Equipo Minerva` · fecha actual.

- **Validación (checks)**  
  - Distribuciones por `conectividad` y `perfil`.  
  - **Mejora esperada**: en ≥70% de pares (intento1→intento2), `score_claridad` sube ≥1.  
  - Coherencia: `offline=sí` debe existir con un evento posterior `offline=no` del mismo usuario/reto.  
  - Sin campos nulos en obligatorios.

- **Uso en pruebas**  
  - Cargar 50 filas en modo “demo” del MVP para grabar evidencias (capturas y resultados esperados).  
  - Registrar ejemplos donde el agente **justifica** la mejora de claridad.

---

## Ejemplo mínimo (ultracorto)

- **Objetivo**: Validar que el agente mejora prompts de 1→2.  
- **Variables mínimas**: `usuario_id`, `reto_id`, `intento_n` {1|2}, `prompt_texto`, `score_claridad` {1..5}, `resultado` {ok|ayuda|error}.  
- **Generación (prompt corto)**:  
  “Crea **120** filas con 60 parejas intento1→intento2. En el 75% de parejas, el `score_claridad` del segundo intento es mayor. Texto breve, sin PII.”  
- **Checks**:  
  - Existen exactamente **60** parejas 1→2 por `usuario_id+reto_id`.  
  - En ≥75% de parejas, `score_claridad(2) > score_claridad(1)`.  
  - Sin nulos en campos mínimos.

> **Nota**: Estos ejemplos son orientativos. Puedes borrarlos y dejar solo la **Plantilla** si deseas la versión más minimalista.
