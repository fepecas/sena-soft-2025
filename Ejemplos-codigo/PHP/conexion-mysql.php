<?php


// Datos de conexión
$host = "localhost";  // Servidor de base de datos
$usuario = "root";    // Usuario MySQL
$clave = "";          // Contraseña
$base_datos = "test"; // Nombre de la base de datos

// Crear conexión usando mysqli
$conexion = new mysqli($host, $usuario, $clave, $base_datos);

// Revisar si la conexión fue exitosa
if ($conexion->connect_error) {
    die("Mano, no se pudo, pailas!: " . $conexion->connect_error);
}

echo "¡Manoo!, ya .";
?>
