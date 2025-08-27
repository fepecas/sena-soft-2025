# SENASoft Metrics API

## Descripción del Proyecto

Esta es una API RESTful diseñada para obtener métricas clave relacionadas con el proyecto SENASoft. El backend está construido con Node.js, Express y Mongoose, y se conecta a una base de datos de MongoDB Atlas.

## Características

* **API REST**: Expone varios endpoints para consultar métricas en formato JSON.
* **Conexión a MongoDB**: Usa Mongoose para interactuar con la base de datos de manera eficiente.
* **Variables de Entorno**: Configuración segura a través de archivos `.env`.
* **Control de Caché**: Desactiva el caché del navegador para asegurar que las respuestas de la API sean siempre actuales.

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:
-   [Node.js](https://nodejs.org/) (versión 18 o superior)
-   [npm](https://www.npmjs.com/) (viene incluido con Node.js)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (para la base de datos)
-   [MongoDB Compass](https://www.mongodb.com/products/compass) o la herramienta de línea de comandos `mongoimport`.

## Instalación

1.  **Clonar el repositorio** (o trabajar en la carpeta existente):
    ```bash
    git clone [https://www.youtube.com/watch?v=JAhzfmBGYDw](https://www.youtube.com/watch?v=JAhzfmBGYDw)
    cd senasoft-1/backend/core/nodejs
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    -   Crea un archivo llamado `.env.development` en la carpeta `nodejs`.
    -   Copia tu cadena de conexión de MongoDB Atlas en la variable `MONGO_URI`.
        ```env
        MONGO_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<tu_bd>?retryWrites=true&w=majority
        PORT=8080
        ALLOWED_ORIGINS=*
        ```

4.  **Importar los datos**:
    -   Usa el comando `mongoimport` desde la terminal para cargar los datos en tu base de datos.
    -   Asegúrate de reemplazar la URI con la tuya y de estar en la carpeta `nodejs` o de usar la ruta completa al archivo CSV.
    ```bash
    mongoimport --uri "mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/senasoft" --collection metrics_scalar --type csv --file "../../../database/collection/metrics_scalar.csv" --headerline
    ```
    
    -   Si también necesitas importar el archivo `aprendices.json`, puedes usar el script `insert_aprendices.js`.

## Uso de la API

Para iniciar el servidor, ve a la carpeta `nodejs` y ejecuta:
```bash
node server.js

La API estará disponible en http://localhost:8080.

Endpoints Disponibles
Método	Endpoint	Descripción
GET	/metrics/scalar	Obtiene métricas generales y escalares.
GET	/metrics/por-centro	Retorna el total de aprendices por centro de formación.
GET	/metrics/instructores-por-centro	Retorna los instructores recomendados por cada centro.
GET	/metrics/por-programa-centro	Retorna el total de aprendices agrupados por programa y centro.
GET	/metrics/por-departamento	Retorna el total de aprendices por departamento de residencia.
GET	/metrics/con-github	Retorna el total de aprendices con cuenta de GitHub.
GET	/metrics/nivel-ingles	Retorna el total de aprendices con nivel B1 o B2 por centro.