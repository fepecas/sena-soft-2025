// DEPRECATED - This file is no longer used
// The project now uses a backend deployed on AWS
// See: backend/core/nodejs/ for current implementation
// See: backend/core/nodejs/openai.action.schema.json for endpoints

// HISTORICAL FILE - DO NOT DELETE
// Keep as reference for original data format

// Seleccionar (o crear) la base
use("senasoft");

// Crear colección
db.createCollection("metrics_scalar");

// Insertar datos iniciales (1 fila de ejemplo)
db.metrics_scalar.insertOne([
    {
    "Metric": "PFFRONT",
    "Description": "% de perfiles DEV Frontend en los aprendices inscritos",
    "Value": "31.0%"
    }
]);
