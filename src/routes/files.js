// routes/files.js - Rutas para subida y procesamiento de archivos
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads'); // Dos niveles arriba desde src/routes/
        // Crear directorio si no existe
        console.log('🔍 Verificando directorio de uploads:', uploadDir);
        fs.mkdir(uploadDir, { recursive: true })
            .then(() => {
                console.log('✅ Directorio uploads verificado/creado');
                cb(null, uploadDir);
            })
            .catch((err) => {
                console.error('❌ Error creando directorio uploads:', err);
                cb(err);
            });
    },
    filename: (req, file, cb) => {
        // Generar nombre único con timestamp
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Filtros para tipos de archivo
const fileFilter = (req, file, cb) => {
    // Tipos de archivo permitidos
    const allowedTypes = {
        'image/jpeg': true,
        'image/jpg': true,
        'image/png': true,
        'image/gif': true,
        'image/webp': true,
        'application/pdf': true,
        'text/plain': true,
        'application/json': true
    };

    if (allowedTypes[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB límite
        files: 5 // máximo 5 archivos por vez
    },
    fileFilter: fileFilter
});

// Inicializar Google AI para análisis de imágenes
let genAI, visionModel;
try {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} catch (error) {
    console.error('❌ Error inicializando Google AI para visión:', error);
}

// Función para convertir archivo a base64
async function fileToGenerativePart(filePath, mimeType) {
    try {
        const data = await fs.readFile(filePath);
        return {
            inlineData: {
                data: data.toString('base64'),
                mimeType: mimeType
            }
        };
    } catch (error) {
        console.error('Error leyendo archivo:', error);
        throw error;
    }
}

// Función para analizar imagen con Gemini Vision
async function analyzeImage(filePath, mimeType, context = {}) {
    if (!visionModel) {
        throw new Error('Modelo de visión no disponible');
    }

    try {
        const imagePart = await fileToGenerativePart(filePath, mimeType);
        
        const prompt = `
Eres Rembranth, un experto diseñador UI/UX que analiza interfaces y diseños.

Analiza esta imagen y proporciona:

1. **ANÁLISIS VISUAL:**
   - Tipo de interfaz (landing page, app móvil, dashboard, etc.)
   - Elementos de diseño identificados
   - Esquema de colores utilizado
   - Tipografía y jerarquía visual

2. **ANÁLISIS UX/UI:**
   - Principios de diseño aplicados
   - Problemas de usabilidad detectados
   - Elementos que funcionan bien
   - Áreas de mejora específicas

3. **RECOMENDACIONES:**
   - 3 mejoras prioritarias con justificación
   - Sugerencias de optimización para conversión
   - Consideraciones de accesibilidad
   - Optimizaciones para móviles (si aplica)

4. **CÓDIGO SUGERIDO:**
   - Componente HTML/CSS mejorado para un elemento clave
   - Implementación de las mejoras sugeridas

CONTEXTO ADICIONAL:
- Industria: ${context.industria || 'general'}
- Objetivo: ${context.objetivo || 'mejorar UX'}
- Público objetivo: ${context.publico_objetivo || 'usuarios generales'}

Responde en formato JSON estructurado.
        `;

        const result = await visionModel.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Intentar parsear como JSON
        try {
            const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (parseError) {
            // Si no es JSON válido, devolver como texto estructurado
            return {
                analisis_visual: text.substring(0, 500) + '...',
                analisis_ux: 'Análisis generado por IA',
                recomendaciones: ['Optimizar contraste', 'Mejorar jerarquía visual', 'Optimizar para móviles'],
                codigo_sugerido: '<div class="mejora-ui">Componente optimizado</div>',
                texto_completo: text
            };
        }
    } catch (error) {
        console.error('Error en análisis de imagen:', error);
        throw error;
    }
}

// RUTA: Subir archivo único
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No se recibió ningún archivo'
            });
        }

        const fileInfo = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            uploadedAt: new Date().toISOString()
        };

        // Si es una imagen, realizar análisis automático
        if (req.file.mimetype.startsWith('image/')) {
            try {
                const context = {
                    industria: req.body.industria,
                    objetivo: req.body.objetivo,
                    publico_objetivo: req.body.publico_objetivo
                };

                console.log('🔍 Analizando imagen con IA...');
                const analisis = await analyzeImage(req.file.path, req.file.mimetype, context);
                
                fileInfo.analisis_ia = analisis;
                fileInfo.tipo_analisis = 'imagen_ui_ux';
            } catch (analysisError) {
                console.error('Error en análisis de imagen:', analysisError);
                fileInfo.analisis_ia = {
                    error: 'No se pudo analizar la imagen',
                    message: analysisError.message
                };
            }
        }

        res.json({
            success: true,
            message: 'Archivo subido exitosamente',
            file: fileInfo
        });

    } catch (error) {
        console.error('Error subiendo archivo:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// RUTA: Subir múltiples archivos
router.post('/upload-multiple', upload.array('files', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No se recibieron archivos'
            });
        }

        const filesInfo = [];

        for (const file of req.files) {
            const fileInfo = {
                filename: file.filename,
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                path: file.path,
                uploadedAt: new Date().toISOString()
            };

            // Analizar solo la primera imagen para evitar sobrecarga
            if (file.mimetype.startsWith('image/') && filesInfo.length === 0) {
                try {
                    const context = {
                        industria: req.body.industria,
                        objetivo: req.body.objetivo,
                        publico_objetivo: req.body.publico_objetivo
                    };

                    const analisis = await analyzeImage(file.path, file.mimetype, context);
                    fileInfo.analisis_ia = analisis;
                } catch (analysisError) {
                    fileInfo.analisis_ia = { error: 'Error en análisis' };
                }
            }

            filesInfo.push(fileInfo);
        }

        res.json({
            success: true,
            message: `${req.files.length} archivos subidos exitosamente`,
            files: filesInfo
        });

    } catch (error) {
        console.error('Error subiendo archivos:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// RUTA: Analizar imagen existente
router.post('/analyze/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads', filename);
        
        // Verificar que el archivo existe
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: 'Archivo no encontrado'
            });
        }

        // Obtener tipo MIME del archivo (simplificado)
        const ext = path.extname(filename).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        };

        const mimeType = mimeTypes[ext];
        if (!mimeType) {
            return res.status(400).json({
                success: false,
                error: 'Tipo de archivo no soportado para análisis'
            });
        }

        const context = {
            industria: req.body.industria,
            objetivo: req.body.objetivo,
            publico_objetivo: req.body.publico_objetivo
        };

        console.log(`🔍 Re-analizando imagen: ${filename}`);
        const analisis = await analyzeImage(filePath, mimeType, context);

        res.json({
            success: true,
            filename: filename,
            analisis: analisis,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error analizando imagen:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// RUTA: Listar archivos subidos
router.get('/list', async (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, '../uploads');
        
        // Crear directorio si no existe
        await fs.mkdir(uploadsDir, { recursive: true });
        
        const files = await fs.readdir(uploadsDir);
        const filesInfo = [];

        for (const file of files) {
            try {
                const filePath = path.join(uploadsDir, file);
                const stats = await fs.stat(filePath);
                
                filesInfo.push({
                    filename: file,
                    size: stats.size,
                    createdAt: stats.birthtime.toISOString(),
                    modifiedAt: stats.mtime.toISOString(),
                    isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
                });
            } catch (statError) {
                console.error(`Error obteniendo stats de ${file}:`, statError);
            }
        }

        res.json({
            success: true,
            files: filesInfo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        });

    } catch (error) {
        console.error('Error listando archivos:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// RUTA: Servir archivo subido
router.get('/serve/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads', filename);
        
        // Verificar que el archivo existe
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: 'Archivo no encontrado'
            });
        }

        // Servir el archivo
        res.sendFile(filePath);

    } catch (error) {
        console.error('Error sirviendo archivo:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// RUTA: Eliminar archivo
router.delete('/delete/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../uploads', filename);
        
        // Verificar que el archivo existe
        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: 'Archivo no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Archivo eliminado exitosamente',
            filename: filename
        });

    } catch (error) {
        console.error('Error eliminando archivo:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// RUTA: Limpiar uploads antiguos (más de 24 horas)
router.post('/cleanup', async (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, '../uploads');
        const files = await fs.readdir(uploadsDir);
        const now = new Date();
        const cutoff = 24 * 60 * 60 * 1000; // 24 horas en ms
        
        let deletedCount = 0;

        for (const file of files) {
            try {
                const filePath = path.join(uploadsDir, file);
                const stats = await fs.stat(filePath);
                
                if (now - stats.mtime > cutoff) {
                    await fs.unlink(filePath);
                    deletedCount++;
                    console.log(`🗑️ Eliminado archivo antiguo: ${file}`);
                }
            } catch (error) {
                console.error(`Error procesando ${file}:`, error);
            }
        }

        res.json({
            success: true,
            message: `Limpieza completada`,
            deletedFiles: deletedCount
        });

    } catch (error) {
        console.error('Error en limpieza:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Manejo de errores de multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    success: false,
                    error: 'El archivo es demasiado grande (máximo 10MB)'
                });
            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    success: false,
                    error: 'Demasiados archivos (máximo 5)'
                });
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    success: false,
                    error: 'Campo de archivo inesperado'
                });
            default:
                return res.status(400).json({
                    success: false,
                    error: `Error de subida: ${error.message}`
                });
        }
    }

    if (error.message.includes('Tipo de archivo no permitido')) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

    next(error);
});

module.exports = router;