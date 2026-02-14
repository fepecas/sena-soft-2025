

# Ecotrack - DEMO - ES
**Integrantes**:
- Juan Miguel Moya
- Edixon Tunjo
- Simon Cardona

## Contenido
 - [Resumen](#resumen) 
 - [Caracteristicas Principales ](#caracteristicas-principales)
 - [Stack tecnico](#Stack-tecnico)
 - [Estructura de la demo](#estructura)
 - [Promts utilizados](#Promts-utilizados)
 - [Video resumen](#video-resumen)
 - [Conceptos de Diseño](#conceptos-de-diseño)
 - [propuesta de valor](#propuesta-de-valor)
 - [Posibles mejoras por implementar](#posibles-mejoras-por-implementar)
---

## ***RESUMEN***

*"Ecotrack busca y pretende ser una aplicacion que ayuda a gestionar el control personal de la huella de carbono mediante registro de ´acciones´, metricas y consejos que buscamos potenciar con IA"*

*El desarrollo de este producto se realizo bajo el concepto de vibe codign y bajo  el conociemnto de las herramientas y lenguajes por los aprendices involucrados*
 
---



## Caracteristicas Principales

1. **Registro de Actividades**:
- Ecotrack permite* registrar actividades potenciales de dejar huella de carbono  para ciudadanos "promedio".
- La informacion de las actividades se almacena inicialmente en LocalStorage

2. **Historial de actividades**
- vizualizar en tarjetas horizontales el registro de actividades generadas por el usuario.
- permite ver el registro de actividades en rangos de tiempo.

3. **Analitica de informacion**
- Graficas sobre que tipo de actividad genera mayor impacto el usuario.
- Resumen total de la huella de carbono generada por el usuario.
- Cada actividad tiene un factor de impacto que afecta que tanta huella deja la actividad.

4. **Consejos**
 
 - Apartado para vizualizar consejos de acuerdo a la categoria de mayor impacto dada por los registros del usuario.
 -  posibilidad de integrar API key para consejos mejorados con IA.
 ---
## Stack tecnico

"Para este pototipo se utilizo por flexibilidad y rapidez: "

|            |                |
| ---------- | -------------- |
| HTML puro  | Mquetado       |
| CSS puro   | estilos        |
| JavasCript | logica         |
---
## Estructura
la demo maneja la siguiente estructura por simplicidad:
```txt
ecotrack_2.0
|
|--/app
|    |--index.html               #maquetado
|    |--script.js                #Logica acoplada
|    |--style.css                #Estilado simple
|
|--/promts
|    |--promt_list_1.md          #Promts utilizados para la demo
|
|--/video
|    |--demo_ecotrack.mp4        #video resumen-presentacion 
|
|--readme.md                     #este documento

```
## Promts Utilizados

Los promts que se utilizaron en la iteracion de este producto:

- [promt_list_1.md](/Promts/promt_list_1.md)


## Video Resumen
[Aqui](/Promts/promt_list_1.md) puede encontrar el video explicativo de ecotrack  a grandes rasgos.

[video](/video/demo_ecotrack.mp4)

---

## Conceptos De Diseño

- "Se opto por tonos claros y verdes que hacen referencia a la naturaleza y pureza... 'todo lo que no es verde' hace referencia a las acciones y actividades del usario genera dentro de este entorono y como lo afecta a este. "

- los componentes tienen una estetica suaves, sobretodo en sus bordes para no dar rigides a la aplicación y animaciones para dar mas dinamismo a las interacciones.
---

## propuesta de valor

*"Ecotrack busca hacer una auto-concientización sobre la huella de carbono que el usuario genera diariamiente, pensamos que esto como una gran forma y un esfuerzo para combatir falta de cultura verde y mejorar practicas en el dia dia de las personas en el contexto ambiental."*

## Posibles mejoras por implementar

*Pensamos que las siguientes mejoras e implementaciones podrian mejorar significativamente en la concientizacion ciudadana sobre su huella de carbono:*

1. **Mejora en la integracion con IA** - para mejorar los consejos de acuerdo a las descripciones de las actividades descritas por el usuario.
2.  **division de la logica** para mayor crecimiento en sus funcionalidades
3. **Utilizacion de frameworks** para mayor eficiencia en las funcionalidades, se describen algunos en mente: 
4. **Astro.js con React** - para la reactividad  y reutilizacion de componente.

5. ** BD MySQL** - datos mejor estructurados y mejor implementacion de consultas
6. **Express** - Para API de los datos y manejo de acciones

7. **Validacion de usuario mas robusta** - para mejor privacidad de datos.
8. **Mas analiticas de metricas** -Para mejores analisis de la huella de carbono.

9.  **Creacion de categorias y Activiades no predefinidas** - para mas personalizacion del usuario, mayor "trackeo" de las actividades y mejores metricas para las analiticas.

10.  **Despligue en nube** - Para disponibilidad web

11.  **Prioridad movil** - Mayor accesibilidad de los usuarios.
---