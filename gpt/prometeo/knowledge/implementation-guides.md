# Implementation Guides

## Setup Proyecto Nuevo

### 1. Frontend (React)
```bash
# Crear proyecto
npx create-react-app mi-app
cd mi-app

# Instalar dependencias básicas
npm install axios react-router-dom

# Estructura de carpetas
src/
  components/
  pages/
  hooks/
  utils/
  services/
```

### 2. Backend (Node.js)
```bash
# Crear proyecto
npm init -y
npm install express cors dotenv

# Crear estructura
server/
  routes/
  controllers/
  middleware/
  models/
```

### 3. Database (PostgreSQL)
```sql
-- Crear base de datos
CREATE DATABASE mi_app;

-- Tabla usuarios ejemplo
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Implementar Autenticación

### Step 1: Backend JWT
```javascript
// Backend - auth.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({error: 'No token'});
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({error: 'Invalid token'});
  }
};
```

### Step 2: Frontend Login
```javascript
// Frontend - LoginForm.jsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = async () => {
  const response = await axios.post('/api/login', {email, password});
  localStorage.setItem('token', response.data.token);
  window.location.href = '/dashboard';
};
```

## Deploy a Producción

### 1. Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy a Vercel
npx vercel --prod
```

### 2. Backend (Railway/Heroku)
```bash
# Crear Procfile
echo "web: node server.js" > Procfile

# Deploy
git push railway main
```

### 3. Database (Railway/PlanetScale)
- Crear database en Railway
- Copiar connection string
- Actualizar variables de entorno

## Implementar Features Comunes

### CRUD Básico
```javascript
// GET all
app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users.rows);
});

// POST create
app.post('/api/users', async (req, res) => {
  const {email} = req.body;
  const result = await db.query(
    'INSERT INTO users (email) VALUES ($1) RETURNING *', 
    [email]
  );
  res.json(result.rows[0]);
});
```

### File Upload
```javascript
// Backend
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({filename: req.file.filename});
});
```

### Real-time (Socket.io)
```javascript
// Backend
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('message', data); // Broadcast a todos
  });
});

// Frontend
const socket = io();
socket.emit('message', 'Hello');
socket.on('message', (data) => console.log(data));
```

## Testing Setup

### Frontend (Jest)
```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Backend (Jest + Supertest)
```javascript
// api.test.js
const request = require('supertest');
const app = require('./app');

test('GET /api/users returns users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
```

## Monitoring Básico

### Error Tracking
```javascript
// Frontend
window.addEventListener('error', (error) => {
  console.error('Error caught:', error);
  // Enviar a servicio como Sentry
});

// Backend
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
```