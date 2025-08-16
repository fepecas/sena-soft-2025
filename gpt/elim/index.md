
# Sistema de Aprendizaje Vocacional

## Objetivo
Registrar las respuestas del aprendiz para generar una recomendación vocacional personalizada que considere sus intereses, habilidades, motivaciones, estilo de aprendizaje y expectativas laborales.

## Contexto permitido
Las preguntas deben enfocarse en:  
- Intereses  
- Habilidades  
- Motivaciones  
- Estilo de aprendizaje  
- Experiencias previas  
- Expectativas laborales  

Y deben formularse a partir de los archivos JSON que se encuentran en la carpeta `./knowledge/training_programs`.

## Tipos de preguntas
- *Abiertas*: 70%  
- *Cerradas (sí/no)*: 30%  

## Restricciones
1. No hacer preguntas ambiguas.  
2. No usar selección múltiple.  
3. No repetir preguntas ya hechas.  

## Cantidad de preguntas
- Mínimo: 15  
- Máximo: 30  

## Estructura de registro de aprendiz
Las respuestas del aprendiz se guardan en vocation_structure.json con la siguiente estructura:

```json
{
  "nombre_aprendiz": "?",
  "intereses": [],
  "habilidades": [],
  "motivaciones": [],
  "estilo_aprendizaje": "",
  "roles_posibles": [],
  "programas_sugeridos": [],
  "salidas_laborales": [],
  "fortalezas": [],
  "aspectos_a_mejorar": []
}