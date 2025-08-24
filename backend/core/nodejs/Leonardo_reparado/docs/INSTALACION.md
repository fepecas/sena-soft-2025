# Instalación del Proyecto "Leonardo está incompleto"

Este documento describe los pasos necesarios para instalar y configurar el proyecto "Leonardo está incompleto" en un entorno local. Asegúrate de seguir cada paso cuidadosamente para garantizar que el proyecto funcione correctamente.

## Requisitos Previos

Antes de comenzar con la instalación, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js**: Asegúrate de tener la última versión de Node.js instalada. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **MongoDB**: Necesitarás una instancia de MongoDB. Puedes usar MongoDB Atlas para crear una base de datos en la nube o instalar MongoDB localmente. Más información en [mongodb.com](https://www.mongodb.com/).

## Pasos de Instalación

1. **Clonar el Repositorio**

   Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

   ```
   git clone https://github.com/tu_usuario/leonardo_incompleto.git
   ```

   Reemplaza `tu_usuario` con tu nombre de usuario de GitHub.

2. **Navegar al Directorio del Proyecto**

   Cambia al directorio del proyecto:

   ```
   cd leonardo_incompleto
   ```

3. **Instalar Dependencias**

   Ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```
   npm install
   ```

4. **Configurar Variables de Entorno**

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```
   NODE_ENV=development
   MONGO_URI=tu_uri_de_mongodb
   PORT=8080
   ALLOWED_ORIGINS=*
   ```

   Asegúrate de reemplazar `tu_uri_de_mongodb` con la URI de conexión de tu base de datos MongoDB.

5. **Iniciar el Servidor**

   Una vez que hayas configurado las variables de entorno, puedes iniciar el servidor con el siguiente comando:

   ```
   npm run dev
   ```

   Esto iniciará el servidor en modo de desarrollo.

## Verificación

Para verificar que la instalación fue exitosa, abre tu navegador y navega a `http://localhost:8080`. Deberías ver un mensaje que indica que el servidor está corriendo.

## Problemas Comunes

- **Error de conexión a MongoDB**: Asegúrate de que la URI de conexión en el archivo `.env` sea correcta y que tu base de datos esté en funcionamiento.
- **Dependencias no instaladas**: Si encuentras errores relacionados con dependencias, asegúrate de haber ejecutado `npm install` correctamente.

Siguiendo estos pasos, deberías poder instalar y configurar el proyecto "Leonardo está incompleto" sin problemas.