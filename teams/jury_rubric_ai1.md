Necesito la evaluación del [EQUIPO N] a lo largo del libro de Excel indexado "SENA Soft 2025, AI Arena Final Result.xlsx".

Quiero que arrojes una calificación de 0 a 10 para cada hoja, según las siguientes directrices:

1️⃣ **Formulario 1 (IA)**  
   - En la columna B está el nombre del equipo.  
   - Evalúa toda la fila según el encabezado de la fila 1.  
   - Propósito: identificar si el equipo se presentó con claridad y conocimiento técnico, mostrando entendimiento de su propuesta de software.  
   - Si hay URLs, síguelas para revisar diseños, textos o código.  
   - Entrega un puntaje final (0–10).

2️⃣ **Formulario 2 (IA)**  
   - Evalúa la solidez del roadmap.  
   - Se espera que los aprendices estructuren un producto con visión a largo plazo, con etapas y un uso creciente de IA y agentes.  
   - Considera si hay épicas, historias de usuario, diagramas o documentación.  
   - Puntúa de 0–10 según la claridad y coherencia del producto propuesto, sin juzgar si pueden completarlo en 3 días.

3️⃣ **Formulario 3 (IA)**  
   - En la columna E hay una URL al repositorio de GitHub.  
   - Evalúa la calidad del código y documentación.  
   - Prioriza el README (debe explicar instalación, flujo, endpoints y uso del LLM, MCP y A2A).  
   - Examina si hay evidencia de integración real (código, logs, contenedores o despliegues).  
   - Puntúa de 0–10 según solidez técnica.

4️⃣ **Formulario 4 (IA)**  
   - Evalúa la descripción técnica del MVP.  
   - Revisa las columnas F y G: nivel de autonomía agéntica planificado vs. ejecutado.  
   - Observa las integraciones (LLM, MCP, A2A) y cualquier evidencia adicional en la columna R.  
   - Puntúa de 0–10 según la coherencia técnica y narrativa.

---

**Salida esperada:**
Un bloque JSON como este:

{
  "team": "Equipo NN",
  "scores": {
    "form1": 8.0,
    "form2": 7.5,
    "form3": 9.0,
    "form4": 8.0
  },
  "average": 8.1,
  "comments": {
    "strengths": "Describe con precisión el dominio técnico y coherencia entre roadmap y MVP.",
    "improvements": "Agregar evidencia visual o logs del MVP desplegado."
  }
}
