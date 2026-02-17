# 📝 Documentación de Resultados de Pruebas

La documentación de pruebas asegura **transparencia**, **trazabilidad** y **claridad** 
en la calidad del producto. Aunque en un hackathon el tiempo es limitado, 
un registro mínimo, pero bien estructurado aporta gran valor.

## 1. Principios de una buena documentación

- **Clara**: sin ambigüedades, entendible para todo el equipo.

- **Concisa**: suficiente detalle, sin exceso de texto irrelevante.

- **Reproducible**: cualquier persona debería poder replicar los pasos descritos.

- **Trazable**: cada prueba debe estar vinculada a un requisito o historia de usuario.

- **Visual**: evidencias (capturas, logs, métricas) aumentan la credibilidad.

## 2. Tipos de Documentación QA

### 2.1 Plan de Pruebas

Documento inicial que responde: **qué se prueba**, **cómo**, **cuándo** y **quién lo hace**.

- Alcance de pruebas.

- Tipos de prueba (unitarias, integración, exploratorias, etc.).

- Herramientas a utilizar.

- Cronograma (en hackathons: iteraciones diarias o por entregas).

### 2.2 Casos de Prueba (Test Cases)

- Identificador único (TC-001, TC-002…).

- Descripción del escenario.

- Pasos de ejecución.

- Datos de entrada.

- Resultado esperado.

- Resultado obtenido.

- Estado (✔️ Aprobado / ❌ Fallido / ⚪ Bloqueado).

### 2.3 Reportes de Defectos (Bug Reports)

Cada error detectado debe documentarse:

- ID del bug (BUG-001).

- Título descriptivo.

- Severidad (Alta, Media, Baja).

- Prioridad (Inmediata, Normal, Baja).

- Pasos para reproducir.

- Resultado esperado vs obtenido.

- Evidencias: capturas, logs, GIFs.

- Estado: Abierto / En progreso / Cerrado.

### 2.4 Reportes de Ejecución (Test Execution Report)

- Total de casos de prueba ejecutados.

- Casos aprobados vs fallidos.

- Defectos abiertos vs cerrados.

- Gráficos simples (pie/barra) para comunicar rápido.

### 2.5 Resumen Final (QA Summary)

- Qué se probó.

- Qué se encontró.

- Riesgos conocidos.

- Recomendación final: ¿apto para entrega/demo?

## 3. Ejemplos Prácticos

### 3.1 Caso de Prueba

```makefile
ID: TC-001
Título: Login exitoso
Precondiciones: Usuario registrado con email válido
Pasos:
1. Ingresar a /login
2. Introducir email y contraseña válidos
3. Presionar "Ingresar"
   Resultado esperado: Redirige al dashboard en <2s
   Resultado obtenido: ✅ Correcto
   Estado: Aprobado
```

### 3.2 Bug Report

```vbnet
ID: BUG-014
Título: Error al guardar formulario de registro
Severidad: Alta
Prioridad: Inmediata
Pasos:
  1. Ingresar datos válidos en el formulario de registro
  2. Presionar "Guardar"
Resultado esperado: Usuario creado y mensaje de éxito
Resultado obtenido: Error 500 en backend
Evidencias: captura_500.png
Estado: Abierto
```

### 3.3 Reporte de Ejecución

```yaml
Sprint 1 – Ejecución QA
Casos de prueba: 15
- Aprobados: 12
- Fallidos: 2
- Bloqueados: 1
Defectos reportados: 5 (3 abiertos, 2 cerrados)
Riesgos: Validación de formulario incompleta
```

## 4. Herramientas Sugeridas

- Básicas: Google Sheets, Notion, Excel (rápido, compartible).

- Gestión QA: TestRail, Zephyr, Xray.

- Reportes de bugs: GitHub Issues, Jira, Trello.

- Evidencias: Capturas (Lightshot, Greenshot), Grabaciones (Loom, OBS).

## 5. Checklist de Documentación

- [ ] Plan de pruebas creado (mínimo alcance y objetivos).

- [ ] Casos de prueba definidos y ejecutados.

- [ ] Bugs reportados con pasos claros y evidencias.

- [ ] Reporte de ejecución con métricas.

- [ ] Resumen final entregado con riesgos y recomendación.

## 6. Estándares y Referencias

- IEEE 829 – Estándar de documentación de pruebas.

- IEEE 29119-3 – Test documentation.

- ISTQB Foundation Level – Buenas prácticas de reporting.

- Atlassian QA Templates – Ejemplos de reportes y checklists.

✅ Atenea podrá guiar a cada equipo a través de un paso a paso en cómo documentar,
evitando reportes pobres y asegurando entregables claros para jueces y stakeholders.



