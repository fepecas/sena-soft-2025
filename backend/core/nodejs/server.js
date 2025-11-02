require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de headers de seguridad
app.set('etag', false);
app.disable('x-powered-by');

// Middleware global de no-cache
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Middlewares
app.use(express.json({ limit: '10mb' }));

// CORS configurado para Leonardo
const allowedOrigins = process.env.ALLOWED_ORIGINS ? 
  process.env.ALLOWED_ORIGINS.split(',') : ['*'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  }
}));

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Rutas API
app.use('/api/centros', require('./routes/centros'));
app.use('/api/programas', require('./routes/programas'));
app.use('/api/instructores', require('./routes/instructores'));
app.use('/api/aprendices', require('./routes/aprendices'));
app.use('/api/metricas', require('./routes/metricas'));

// Rutas específicas para Leonardo GPT
app.use('/metrics', require('./routes/leonardo'));

// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({
    message: 'SENASoft Metrics API v2.0 - Leonardo GPT Compatible',
    endpoints: {
      health: '/health',
      leonardoMetrics: '/metrics/scalar',
      detailedMetrics: '/api/metricas',
      documentation: 'https://github.com/senasoft/reto-leonardo'
    }
  });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Modo: ${process.env.NODE_ENV}`);
});

module.exports = app;
