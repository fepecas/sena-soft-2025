# Reto Leonardo (incompleto)

Este archivo describe la implementación de los nuevos parámetros con los cuales Leonardo podrá responder preguntas frecuentes relacionadas con SENASOFT.

## Autores
- Jorge Enrique Porras Sandoval
- Alex Jhoan Chaguendo Gonzalez
- Dovin Richard Arboleda Hoyos

## Instalación y ejecución

* Clonar el repositorio
```bash
  git clone https://github.com/IngAlim2023/senasoft.git
  cd backend/core/nodejs
```

### Instalar dependencias:

```bash
  npm install
```
### Crear un archivo .env con configuración:
```
ini
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/pruebaLeonardo
PORT=8002
ALLOWED_ORIGINS=*
```

## Estructura de los datos

En el archivo dataLeonardo.csv se encuentra la estructura de los datos sintéticos generados.
Este dataset fue diseñado específicamente para dar soporte a las respuestas de las preguntas propuestas por Globant, por lo cual contiene las variables y registros necesarios para realizar las métricas y análisis planteados.

### Ruta del archivo:

```bash
  database\collection\dataLeonardo.csv
```

## Base de datos

Se utilizó el mismo motor de base de datos que ya traía el repositorio: MongoDB.

La estructura de la colección fue diseñada de la siguiente manera:

```
{
  "_id": "a1",
  "aprendiz": "Laura Pérez",
  "centroFormacion": "Centro Industrial de Soacha",
  "programa": "Desarrollo de Software",
  "departamento": "Cundinamarca",
  "instructorRecomendado": "Carlos Ramírez",
  "github": true,
  "nivelIngles": "B1"
}
```
teneindo en cuenta la resolucion de de las preguntas propuestas por Globant


## 🌐 En el servidor:

Se utilizo la misma ruta:
```bash
 /metrics/scalar 
```
para devolver la información necesaria en la resolución de las métricas.


Puedes hacer uso de este endpoint para ver las respuesta del servidor:

```bash
 https://serverleonardo.onrender.com/metrics/scalar
```

## Consideraciones

* Esta estructura permite responder de manera directa a las preguntas propuestas por Globant en el reto.

* Los campos fueron definidos teniendo en cuenta:

    - Datos personales y académicos del aprendiz (aprendiz, programa, departamento).

    - Centro de formación para agrupar estadísticas.

    - Recomendación de instructores.

    - Información técnica adicional (github, nivelIngles).


## 👉 Así, con este modelo se facilita la consulta de métricas como:

* Cantidad de aprendices por centro de formación.

* Programas con mayor número de inscritos.

* Distribución de aprendices por departamento.

* Instructores recomendados.
 
* Nivel de inglés y presencia en GitHub.