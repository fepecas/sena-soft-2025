
# **Lista de promts**
- [PROMTS DE DESARROLLO](#promts-de-desarrollo)
  - [Promt_create_1 1.0](#promt_create_1-10) 
  - [Promt_create_1 1.1](#promt_create_1-11)
  - [promt_create_2 1.0](#promt_create_2-10)
  - [promt_create_3 1.0](#promt_create_3-10)
- [PROMTS DE ADICIONES](#promts-de-adiciones)
  - [promt_add_1 1.0](#promt_add_1-10)
- [PROMTS DE CORRECCIONES](#promts-de-correcciones)
  - [promt fix_1 1.0](#promt-fix_1-10)
  - [promt fix_2 1.0](#promt-fix_2-10)
---
# Promts de Desarrollo
## Promt_create_1 1.0
primer promt utilizado
```txt
Necesito que generes un prototipo funcional de una aplicación web llamada "EcoTrack" que permite a los usuarios monitorear su huella de carbono diaria. 
Contexto: EcoTrack es una aplicación web que registra actividades cotidianas (transporte, alimentación, energía, compras) y calcula las emisiones de CO2 asociadas, mostrando un total diario y un desglose por categorías. También ofrece recomendaciones personalizadas para reducir la huella de carbono.
Tecnologías: Usa HTML, CSS y JavaScript vanilla. Para el gráfico, utiliza Chart.js (incluye el CDN en el HTML). Para almacenar los datos, usa localStorage del navegador.
Funcionalidades:
1. Un formulario para agregar actividades con los campos: tipo de actividad (select con categorías), nombre de la actividad (input text), emisiones de CO2 en kg (input number).
2. Al enviar el formulario, la actividad se guarda en localStorage y se actualiza la interfaz.
3. Calcular y mostrar el total de emisiones del día en kg.
4. Mostrar un gráfico circular (con Chart.js) que desglose las emisiones por categoría.
5. Mostrar una lista de recomendaciones basadas en las categorías con más emisiones.
Diseño:
- Interfaz limpia y moderna con una barra de navegación superior con el logo "EcoTrack"
- Diseño responsive: en móviles se apilan los elementos, en escritorio dos columnas
- Colores: verde (
#2ecc71) para elementos primarios, azul (
#3498db) para secundarios
- Usar tarjetas (cards) con sombras para separar secciones
Código:
- Genera un archivo HTML con la estructura básica
- Incluye el CSS en el mismo archivo dentro de <style>
- Incluye el JavaScript en el mismo archivo dentro de <script>
- Asegúrate de que el gráfico se actualice cada vez que se agrega una actividad
- Las recomendaciones deben generarse dinámicamente según los datos
Recomendaciones por categoría:
- Transporte: "Considera usar transporte público, bicicleta o caminar"
- Alimentación: "Reduce el consumo de carne y productos animales"
- Energía: "Apaga los electrodomésticos cuando no los uses"
- Compras: "Compra productos locales y evita empaques plásticos"
Por favor, genera el código completo listo para usar, incluyendo la inicialización del gráfico y las funciones para guardar y cargar datos de localStorage.

Te voy a crear el prototipo funcional de EcoTrack. Hay una consideración importante: en el entorno de Claude.ai, localStorage no está disponible, así que voy a usar almacenamiento en memoria que funcionará durante la sesión. Si necesitas que persista entre sesiones, puedes copiar el código a tu propio entorno donde localStorage sí funciona.

```
## Promt_create_1 1.1 
Mejora del promt

```txt
Eres un desarrollador fullstack especializado en aplicaciones web con HTML, CSS y JavaScript vanilla. Tu tarea es crear un prototipo funcional de una aplicación web llamada "EcoTrack" para monitoreo de huella de carbono.

## CONTEXTO
EcoTrack es una aplicación web que permite a los usuarios:
- Registrar actividades diarias en categorías (transporte, alimentación, energía, compras)
- Calcular emisiones de CO2 asociadas
- Visualizar el total diario y desglose por categorías
- Recibir recomendaciones personalizadas para reducir su huella de carbono

## REQUISITOS TÉCNICOS
- Tecnologías: HTML5, CSS3, JavaScript vanilla
- Gráficos: Chart.js (incluir CDN en el HTML)
- Almacenamiento: localStorage del navegador
- Estructura: Single HTML file con CSS y JS embebidos

## FUNCIONALIDADES PRINCIPALES
1. Formulario de registro de actividades con campos:
   - Tipo de actividad (select con categorías: transporte, alimentación, energía, compras)
   - Nombre de la actividad (input text)
   - Emisiones de CO2 en kg (input number)

2. Almacenamiento y actualización:
   - Al enviar el formulario, guardar la actividad en localStorage
   - Actualizar la interfaz automáticamente tras cada adición

3. Cálculo y visualización:
   - Mostrar el total de emisiones diarias en kg
   - Gráfico circular (Chart.js) con desglose por categoría
   - Actualización del gráfico con cada nueva actividad

4. Sistema de recomendaciones:
   - Lista de recomendaciones basadas en las categorías con más emisiones
   - Recomendaciones específicas por categoría:
     * Transporte: "Considera usar transporte público, bicicleta o caminar"
     * Alimentación: "Reduce el consumo de carne y productos animales"
     * Energía: "Apaga los electrodomésticos cuando no los uses"
     * Compras: "Compra productos locales y evita empaques plásticos"

## DISEÑO Y UX
- Interfaz limpia y moderna con barra de navegación superior con logo "EcoTrack"
- Diseño responsive (mobile-first): elementos apilados en móviles, dos columnas en escritorio
- Esquema de colores:
  * Verde (#2ecc71) para elementos primarios
  * Azul (#3498db) para elementos secundarios
- Uso de tarjetas (cards) con sombras para separar secciones
- Feedback visual al usuario tras acciones (ej. agregar actividad)

## ESTRUCTURA DEL CÓDIGO
- Un único archivo HTML con la estructura básica
- CSS embebido dentro de <style>
- JavaScript embebido dentro de <script> al final del body
- Inicialización adecuada de Chart.js
- Funciones para:
  * Guardar/cargar datos de localStorage
  * Calcular totales y categorías
  * Renderizar gráfico y recomendaciones
  * Manejar eventos del formulario

## ENTREGABLE
Código completo listo para ejecutar, que incluya:
1. Declaración DOCTYPE y estructura HTML válida
2. CDN de Chart.js incluido
3. Diseño responsive implementado
4. Lógica completa de almacenamiento y actualización
5. Gráfico interactivo que se actualice con cada cambio
6. Sistema de recomendaciones dinámico

```
## promt_create_2 1.0

para diseño de la interfaz
```txt
"App móvil estilo 'Eco Tracker' con interfaz minimalista en tonos verdes y azules, pantalla de dashboard que muestre: 
- Huella de carbono semanal con gráfico circular 
- Iconos de actividades (transporte, dieta, energía) 
- Botón flotante para registrar acción 
- Barra de progreso de metas ecológicas 
Estilo: Flat Design, moderna y elegante. 
Resolución: 4K, aspecto de app móvil."
```
## promt_create_3 1.0
para contexto de logica
```txt
"Genera código js para calcular huella de carbono basado en:
- Transporte: km recorridos × tipo de vehículo (ej: coche: 0.12 kgCO2/km).
- Dieta: emisiones por tipo de alimento (ej: carne: 27 kgCO2/kg, verduras: 2 kgCO2/kg).
- Energía: kWh consumidos × 0.5 kgCO2/kWh.
Crea una función que reciba estos parámetros y retorne la huella total en kgCO2/semana."
```
# promts de Adiciones
## promt_add_1 1.0
para añadir inicio de secion
```txt
toma como base el archivo que te envie secion.js y creame un inicio de secion para una app de huella de carbono llamada ecotrack el inicio de secion lo quiero simple y minimalista con el nombre de la aplicacion en el centro como es un prototipo solo pon que se inicie con usuario y que al precionar en iniciar secion redirija a el archivo index.html
```
# promts de correcciones
## promt fix_1 1.0

```txt
Revisa la integridad y funionalidad del proyecto... 
me interesa revisar principalmente debido a fallas e inconsistencias : 
- analitica de consumo/huella de carbono(parece funcionar bien)
-registro de actividades(fallas) 

Dame por favor una lista de las fallas que se estan presentando y una guia detallada de como solucionar estos problemas.
```
## promt fix_2 1.0
```txt
aplica este razonamiento para solventar estas falencias.
```


