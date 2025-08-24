# SEMILLAS DE DATOS

El archivo `SEMILLAS_DE_DATOS.md` proporciona información sobre las semillas de datos que se pueden cargar en la base de datos para facilitar las pruebas y el desarrollo del proyecto "Leonardo está incompleto". A continuación, se detallan los aspectos clave relacionados con las semillas de datos.

## ¿Qué son las semillas de datos?

Las semillas de datos son conjuntos de datos predefinidos que se utilizan para poblar una base de datos con información inicial. Esto es especialmente útil en entornos de desarrollo y pruebas, donde se necesita un conjunto de datos representativo para verificar el funcionamiento de la aplicación.

## Archivos de semillas

En el proyecto, se incluye un archivo de semillas llamado `inscripciones.seed.json`. Este archivo contiene datos de inscripción que pueden ser utilizados para cargar información en la base de datos de MongoDB.

### Formato del archivo de semillas

El archivo `inscripciones.seed.json` está estructurado en formato JSON y contiene un array de objetos. Cada objeto representa una inscripción y debe incluir los campos necesarios según el modelo de datos definido en la aplicación.

#### Ejemplo de contenido de `inscripciones.seed.json`

```json
[
  {
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com",
    "curso": "Desarrollo Web",
    "fechaInscripcion": "2023-01-15"
  },
  {
    "nombre": "María López",
    "email": "maria.lopez@example.com",
    "curso": "Data Science",
    "fechaInscripcion": "2023-02-20"
  }
]
```

## Cargar las semillas de datos

Para cargar las semillas de datos en la base de datos, se debe ejecutar el script `cargarDatos.js`, que se encuentra en la carpeta `semillas`. Este script se encargará de leer el archivo `inscripciones.seed.json` y agregar los datos a la colección correspondiente en MongoDB.

### Instrucciones para cargar las semillas

1. Asegúrate de que la base de datos esté en funcionamiento y que la conexión esté configurada correctamente en el archivo `.env`.
2. Ejecuta el script de carga de datos utilizando Node.js:

   ```bash
   node semillas/cargarDatos.js
   ```

3. Verifica que los datos se hayan cargado correctamente en la base de datos.

## Conclusión

Las semillas de datos son una herramienta valiosa para el desarrollo y las pruebas del proyecto "Leonardo está incompleto". Facilitan la creación de un entorno de pruebas realista y permiten a los desarrolladores verificar el funcionamiento de la aplicación con datos representativos.