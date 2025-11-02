# Database - SENASoft Metrics

## 📁 Estructura

### Archivos Originales (mantener)
- `collection/metrics_scalar.csv` - Datos básicos originales
- `collection/metrics_scalar.js` - Script original MongoDB

### Nuevos Archivos (Reto Leonardo)
- `collection/aprendices_sample.js` - 2,000 aprendices de prueba
- `collection/centros_sample.js` - 10 centros de formación
- `collection/programas_sample.js` - 4 programas permitidos
- `collection/instructores_sample.js` - 50 instructores recomendados
- `seed_completo.js` - Script unificado de carga

## 🚀 Uso Rápido

### Cargar datos completos (Recomendado)
```bash
node database/seed_completo.js
```

### Cargar solo datos originales
```bash
mongosh < database/collection/metrics_scalar.js
```

## 📊 Datos Generados

| Colección | Registros | Propósito |
|-----------|-----------|-----------|
| `aprendices` | 2,000 | Respuesta a las 6 preguntas |
| `centros` | 10 | Centros reales de Colombia |
| `programas` | 4 | Solo programas permitidos |
| `instructores` | 50 | Instructores calificados (≥4) |

## 🎯 Responde las 6 Preguntas

1. **Aprendices por centro** → `db.aprendices.aggregate([{$group: {_id: "$centroId"}}])`
2. **Instructores recomendados** → `db.instructores.find({calificacion: {$gte: 4}})`
3. **Centro + programa** → `db.aprendices.find({programaId: {$in: ["PROG_001"...]}})`
4. **Por departamento** → `db.aprendices.aggregate([{$group: {_id: "$departamento"}}])`
5. **Con GitHub** → `db.aprendices.find({githubUser: {$ne: null}})`
6. **Inglés B1/B2** → `db.aprendices.find({nivelIngles: {$in: ["B1","B2"]}})`

## 🔧 Configuración

### Variables requeridas
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/senasoft
```

### Verificación
```bash
# Backend funcionando
curl https://senasoft-leonardo-metrics.onrender.com/metrics/scalar

# Datos cargados correctamente
mongosh "$MONGO_URI" --eval "db.aprendices.countDocuments()"
```

## ⚡ Extensión del Sistema Original

Esta solución **extiende** (no reemplaza) el endpoint `/metrics/scalar` existente con:
- Más métricas detalladas
- Datos realistas de prueba
- Respuesta a las 6 preguntas del reto
- Compatibilidad con Leonardo GPT
