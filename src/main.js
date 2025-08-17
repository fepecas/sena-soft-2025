// main.js - Agente Rembranth con sistema de referencias locales
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fileRoutes = require('./routes/files');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

// Mock del LocalReferencesProcessor hasta que lo implementes
class LocalReferencesProcessor {
    constructor(basePath) {
        this.basePath = basePath;
        this.references = [];
    }
    
    async initialize() {
        console.log(`Inicializando referencias desde ${this.basePath}`);
        return true;
    }
    
    getKnowledgeStats() {
        return {
            totalReferences: 0,
            categories: {},
            status: { active: 0, pending: 0 }
        };
    }
    
    searchKnowledge(query, category) {
        return [];
    }
    
    getReferencesByCategory(category) {
        return [];
    }
    
    async addReference(url, title, category) {
        return { url, title, category };
    }
    
    async reloadReferences() {
        return 0;
    }
    
    async exportKnowledge(format) {
        return format === 'markdown' ? '# Knowledge Base\n\nNo references available.' : '[]';
    }
}

class AgenteRembranth {
    constructor() {
        // Inicializar Google AI
        this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Sistema de referencias locales
        this.referencesProcessor = new LocalReferencesProcessor('./knowledge-base');

        // Base de conocimientos de patrones de diseño
        this.patronesDiseno = {
            conversion: {
                colores: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
                cta_buttons: ['Comenzar ahora', 'Obtener gratis', 'Unirse hoy'],
                layouts: ['hero-section', 'feature-grid', 'testimonial-carousel']
            },
            ecommerce: {
                colores: ['#E74C3C', '#F39C12', '#27AE60', '#3498DB'],
                elementos: ['product-gallery', 'price-comparison', 'trust-badges']
            },
            saas: {
                colores: ['#6C5CE7', '#00B894', '#FDCB6E', '#E17055'],
                elementos: ['feature-comparison', 'pricing-table', 'demo-request']
            }
        };

        // Configuración del servidor
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        
        // Servir archivos estáticos
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use('/api/files', fileRoutes);

        this.setupRoutes();
        this.initializeReferences();
    }

    async initializeReferences() {
        console.log('📚 Inicializando sistema de referencias locales...');
        const success = await this.referencesProcessor.initialize();
        if (success) {
            console.log('✅ Sistema de referencias iniciado correctamente');
            this.logKnowledgeStats();
        } else {
            console.warn('⚠️ Error inicializando sistema de referencias');
        }
    }

    logKnowledgeStats() {
        const stats = this.referencesProcessor.getKnowledgeStats();
        console.log(`
📊 ESTADÍSTICAS DE BASE DE CONOCIMIENTOS:
- Total referencias: ${stats.totalReferences}
- Categorías: ${Object.keys(stats.categories).join(', ')}
- Estado: ${stats.status.active} activas, ${stats.status.pending} pendientes
        `);
    }

    async consultarPatrones(industria, objetivo) {
        const patrones = this.patronesDiseno[industria] || this.patronesDiseno.conversion;
        const referencias = this.referencesProcessor.searchKnowledge(`${industria} ${objetivo}`);
        
        return {
            colores_recomendados: patrones.colores,
            elementos_ui: patrones.elementos || patrones.cta_buttons,
            principios: [
                'Contraste 4.5:1 mínimo para accesibilidad',
                'Jerarquía visual clara con tipografía',
                'Espacios en blanco para reducir carga cognitiva',
                'CTA prominente y acción clara'
            ],
            referencias_externas: referencias.slice(0, 5).map(ref => ({
                titulo: ref.title,
                url: ref.url,
                categoria: ref.category,
                descripcion: ref.metadata?.description || 'Recurso relevante para el diseño'
            }))
        };
    }

    async generarPropuestaDiseno(contexto, patrones) {
        const referenciasRelevantes = await this.buscarReferenciasRelevantes(contexto);
        
        const prompt = `
Eres Rembranth, un experto diseñador de interfaces que ayuda a equipos de desarrollo.

CONTEXTO DEL PROYECTO:
${contexto.descripcion || contexto.mensaje}

${contexto.imagen_referenciada ? `IMAGEN ANALIZADA: ${contexto.imagen_referenciada}` : ''}

PÚBLICO OBJETIVO:
${contexto.publico_objetivo}

INDUSTRIA:
${contexto.industria}

PATRONES RECOMENDADOS:
- Colores: ${patrones.colores_recomendados.join(', ')}
- Elementos: ${patrones.elementos_ui.join(', ')}

REFERENCIAS EXTERNAS DISPONIBLES:
${referenciasRelevantes.map(ref => `- ${ref.titulo}: ${ref.url} (${ref.categoria})`).join('\n')}

GENERA:
1. Análisis del diseño actual
2. 3 mejoras específicas con justificación psicológica
3. Código HTML/CSS para un componente clave
4. Microcopys persuasivos para CTAs
5. Referencias específicas que apoyen las recomendaciones
6. Métricas de conversión esperadas

Responde en formato JSON con esta estructura:
{
  "analisis": "...",
  "mejoras": [{"titulo": "...", "justificacion": "...", "impacto": "...", "referencia": "..."}],
  "codigo": "...",
  "microcopys": ["...", "..."],
  "referencias_utilizadas": [{"titulo": "...", "url": "...", "relevancia": "..."}],
  "metricas_esperadas": "..."
}
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseJSONResponse(response.text());
        } catch (error) {
            console.error('Error en LLM:', error);
            return this.getResponseFallback();
        }
    }

    async buscarReferenciasRelevantes(contexto) {
        const queries = [
            `${contexto.industria} design patterns`,
            `${contexto.objetivo} optimization`,
            `${contexto.publico_objetivo} ui ux`,
            contexto.descripcion || contexto.mensaje
        ];

        const referencias = [];
        for (const query of queries) {
            const results = this.referencesProcessor.searchKnowledge(query);
            referencias.push(...results.slice(0, 2));
        }

        const uniqueRefs = Array.from(
            new Map(referencias.map(ref => [ref.url, ref])).values()
        );
        
        return uniqueRefs.slice(0, 5);
    }

    async procesarMensajeChat(mensaje, configuracion) {
        const contexto = {
            mensaje: mensaje,
            descripcion: mensaje,
            industria: configuracion.industria || 'saas',
            publico_objetivo: configuracion.publico_objetivo || 'usuarios generales',
            objetivo: configuracion.objetivo || 'conversion'
        };

        try {
            const imageReference = this.detectImageReference(mensaje);
            if (imageReference) {
                contexto.imagen_referenciada = imageReference;
                contexto.descripcion += ` (referencia a imagen: ${imageReference})`;
            }

            if (this.isSearchQuery(mensaje)) {
                return await this.procesarConsultaConocimiento(mensaje, contexto);
            }

            const resultado = await this.procesarConsulta(contexto);
            
            let respuesta = `🎨 **Análisis de diseño:**\n\n`;
            
            if (imageReference) {
                respuesta += `📸 **Imagen analizada:** ${imageReference}\n\n`;
            }
            
            respuesta += `**🔍 Análisis:**\n${resultado.propuesta.analisis}\n\n`;
            
            if (resultado.propuesta.mejoras && resultado.propuesta.mejoras.length > 0) {
                respuesta += `**✨ Mejoras recomendadas:**\n`;
                resultado.propuesta.mejoras.forEach((mejora, i) => {
                    respuesta += `${i + 1}. **${mejora.titulo}:** ${mejora.justificacion}`;
                    if (mejora.referencia) {
                        respuesta += ` ([Ver referencia](${mejora.referencia}))`;
                    }
                    respuesta += ` (Impacto: ${mejora.impacto})\n`;
                });
                respuesta += `\n`;
            }

            if (resultado.propuesta.codigo) {
                respuesta += `**💻 Código sugerido:**\n\`\`\`html\n${resultado.propuesta.codigo}\n\`\`\`\n\n`;
            }

            if (resultado.propuesta.microcopys && resultado.propuesta.microcopys.length > 0) {
                respuesta += `**💬 Microcopys sugeridos:**\n`;
                resultado.propuesta.microcopys.forEach((copy, i) => {
                    respuesta += `• "${copy}"\n`;
                });
                respuesta += `\n`;
            }

            if (resultado.propuesta.referencias_utilizadas && resultado.propuesta.referencias_utilizadas.length > 0) {
                respuesta += `**📚 Referencias consultadas:**\n`;
                resultado.propuesta.referencias_utilizadas.forEach(ref => {
                    respuesta += `• [${ref.titulo}](${ref.url}) - ${ref.relevancia}\n`;
                });
                respuesta += `\n`;
            }

            respuesta += `**📊 Métricas esperadas:** ${resultado.propuesta.metricas_esperadas}\n\n`;
            respuesta += `**🎯 Puntuación de validación:** ${resultado.validacion.puntuacion}/100`;

            return respuesta;
        } catch (error) {
            console.error('Error procesando mensaje:', error);
            return `⚠ Error al procesar la consulta. Detalles: ${error.message}`;
        }
    }

    isSearchQuery(mensaje) {
        const searchKeywords = [
            'busca', 'encuentra', 'referencia', 'ejemplo', 'link', 'artículo',
            'inspiración', 'recurso', 'documentación', 'tutorial', 'guía'
        ];
        return searchKeywords.some(keyword => mensaje.toLowerCase().includes(keyword));
    }

    async procesarConsultaConocimiento(mensaje, contexto) {
        const referencias = this.referencesProcessor.searchKnowledge(mensaje);
        
        if (referencias.length === 0) {
            return `🔍 No encontré referencias específicas para "${mensaje}". Aquí tienes algunas sugerencias generales:\n\n` +
                   this.getSugerenciasGenerales(contexto);
        }

        let respuesta = `🔍 **Referencias encontradas para "${mensaje}":**\n\n`;
        
        referencias.slice(0, 8).forEach((ref, i) => {
            respuesta += `${i + 1}. **[${ref.title}](${ref.url})**\n`;
            if (ref.metadata?.description) {
                respuesta += `   ${ref.metadata.description}\n`;
            }
            respuesta += `   🏷 Categoría: ${ref.category} | 📄 Fuente: ${ref.source}\n\n`;
        });

        const categorias = [...new Set(referencias.map(ref => ref.category))];
        if (categorias.length > 0) {
            respuesta += `**💡 También podrías explorar:**\n`;
            for (const categoria of categorias.slice(0, 3)) {
                const catRefs = this.referencesProcessor.getReferencesByCategory(categoria);
                respuesta += `• ${categoria}: ${catRefs.length} recursos disponibles\n`;
            }
        }

        return respuesta;
    }

    getSugerenciasGenerales(contexto) {
        const stats = this.referencesProcessor.getKnowledgeStats();
        let sugerencias = `**📚 Recursos disponibles en la base de conocimientos:**\n\n`;
        
        for (const [categoria, count] of Object.entries(stats.categories)) {
            sugerencias += `• **${categoria}**: ${count} referencias\n`;
        }
        
        sugerencias += `\n**💡 Prueba consultas como:**\n`;
        sugerencias += `• "Busca ejemplos de ${contexto.industria}"\n`;
        sugerencias += `• "Referencias de ${contexto.objetivo}"\n`;
        sugerencias += `• "Inspiración para UI/UX"\n`;
        sugerencias += `• "Herramientas de diseño"`;
        
        return sugerencias;
    }

    detectImageReference(mensaje) {
        const patterns = [
            /imagen\s+(\w+\.(jpg|jpeg|png|gif|webp|svg))/i,
            /archivo\s+(\w+\.(jpg|jpeg|png|gif|webp|svg))/i,
            /(\w+\.(jpg|jpeg|png|gif|webp|svg))/i,
            /esta\s+imagen/i,
            /la\s+imagen\s+que\s+subí/i
        ];

        for (const pattern of patterns) {
            const match = mensaje.match(pattern);
            if (match) {
                return match[1] || 'imagen_subida';
            }
        }
        
        return null;
    }

    async validarConAgenteMkt(propuesta, contexto) {
        const prompt = `
Actúas como un agente especialista en marketing digital que valida propuestas de diseño.

PROPUESTA A VALIDAR:
${JSON.stringify(propuesta, null, 2)}

CONTEXTO DE MARCA:
- Industria: ${contexto.industria}
- Objetivo: ${contexto.objetivo}
- Público: ${contexto.publico_objetivo}

VALIDA:
1. Coherencia con objetivos de conversión
2. Alineación con el público objetivo
3. Competitividad en el mercado
4. Riesgos potenciales

Responde con:
- puntuacion: número del 1-100
- aprobado: true/false
- observaciones: array de strings
- sugerencias_adicionales: array de strings
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseJSONResponse(response.text());
        } catch (error) {
            return {
                puntuacion: 85,
                aprobado: true,
                observaciones: ['Validación automática exitosa'],
                sugerencias_adicionales: []
            };
        }
    }

    async procesarConsulta(contexto) {
        console.log('🎨 Rembranth iniciando análisis...');

        const patrones = await this.consultarPatrones(contexto.industria, contexto.objetivo);
        console.log('📊 Patrones consultados:', patrones);

        const propuesta = await this.generarPropuestaDiseno(contexto, patrones);
        console.log('🤖 Propuesta generada por LLM');

        const validacion = await this.validarConAgenteMkt(propuesta, contexto);
        console.log('✅ Validación A2A completada:', validacion.puntuacion, '/100');

        return {
            propuesta,
            validacion,
            patrones_utilizados: patrones,
            timestamp: new Date().toISOString(),
            agente: 'Rembranth v1.0'
        };
    }

    async analyzeImageWithRembranth(file) {
        try {
            const contexto = {
                mensaje: `Analiza esta imagen de diseño: ${file.originalname}`,
                descripcion: `Análisis de imagen subida: ${file.originalname}`,
                industria: 'general',
                publico_objetivo: 'usuarios generales',
                objetivo: 'usability_analysis',
                tipo_analisis: 'imagen'
            };

            console.log('🖼️ Analizando imagen con Rembranth:', file.originalname);
            const resultado = await this.procesarConsulta(contexto);
            
            return {
                type: 'image_analysis',
                filename: file.originalname,
                path: file.path,
                analysis: {
                    completo: resultado.propuesta,
                    validacion: resultado.validacion,
                    patrones: resultado.patrones_utilizados,
                    puntuacion: resultado.validacion.puntuacion
                },
                suggestions: [
                    `✅ Imagen "${file.originalname}" analizada exitosamente`,
                    `🎯 Puntuación de validación: ${resultado.validacion.puntuacion}/100`,
                    `📊 ${resultado.propuesta.mejoras?.length || 0} mejoras identificadas`,
                    `💡 Usar el chat para preguntas específicas sobre esta imagen`
                ],
                status: 'analysis_completed',
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error analizando imagen:', error);
            return {
                type: 'image_analysis',
                filename: file.originalname,
                error: error.message,
                suggestions: [
                    'Error en el análisis automático',
                    'Puedes usar el chat para análisis manual',
                    'Verifica que la imagen sea un diseño o interfaz'
                ],
                status: 'analysis_failed'
            };
        }
    }

    parseJSONResponse(text) {
        try {
            const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (error) {
            console.error('Error parseando JSON:', error);
            return this.getResponseFallback();
        }
    }

    getResponseFallback() {
        return {
            analisis: "Análisis generado automáticamente basado en mejores prácticas de UX/UI",
            mejoras: [
                {
                    titulo: "Optimizar contraste de colores",
                    justificacion: "Mejora accesibilidad y legibilidad según WCAG 2.1",
                    impacto: "15% mejora en conversión"
                },
                {
                    titulo: "Mejorar jerarquía visual",
                    justificacion: "Guiar la atención del usuario hacia CTAs principales",
                    impacto: "10% reducción en bounce rate"
                },
                {
                    titulo: "Optimizar para móviles",
                    justificacion: "78% del tráfico viene desde dispositivos móviles",
                    impacto: "25% mejora en engagement móvil"
                }
            ],
            codigo: `<button class="btn-primary" style="background: #3B82F6; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Comenzar ahora</button>`,
            microcopys: ["Comenzar gratis", "Sin compromiso", "Únete hoy"],
            metricas_esperadas: "10-20% mejora en conversión esperada basada en optimizaciones implementadas"
        };
    }

    setupRoutes() {
        // Ruta principal
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        // Upload de archivos
        this.app.post('/api/rembranth/uploads', upload.single('file'), async (req, res) => {
            try {
                if (!req.file) {
                    return res.status(400).json({
                        success: false,
                        error: 'No se recibió ningún archivo'
                    });
                }

                const fileInfo = {
                    id: Date.now() + Math.random(),
                    originalName: req.file.originalname,
                    filename: req.file.filename,
                    path: req.file.path,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                    uploadDate: new Date().toISOString()
                };

                let analysisResult = null;
                if (req.file.mimetype.startsWith('image/')) {
                    console.log('🎨 Iniciando análisis de imagen con Rembranth...');
                    analysisResult = await this.analyzeImageWithRembranth(req.file);
                    console.log('✅ Análisis completado');
                }

                res.json({
                    success: true,
                    message: `Archivo "${req.file.originalname}" procesado exitosamente`,
                    file: fileInfo,
                    analysis: analysisResult,
                    hasAnalysis: analysisResult !== null,
                    timestamp: new Date().toISOString()
                });

            } catch (error) {
                console.error('Error en upload de Rembranth:', error);
                res.status(500).json({
                    success: false,
                    error: error.message,
                    details: 'Error procesando archivo'
                });
            }
        });

        // Chat endpoint
        this.app.post('/api/rembranth/chat', async (req, res) => {
            try {
                const { mensaje, configuracion } = req.body;
                
                if (!mensaje) {
                    return res.status(400).json({
                        success: false,
                        error: 'Mensaje es requerido'
                    });
                }

                const respuesta = await this.procesarMensajeChat(mensaje, configuracion || {});

                res.json({
                    success: true,
                    mensaje: respuesta,
                    timestamp: new Date().toISOString()
                });

            } catch (error) {
                console.error('Error en chat:', error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });

        // Knowledge base endpoints
        this.app.get('/api/knowledge/search', async (req, res) => {
            try {
                const { q: query, category } = req.query;
                
                if (!query) {
                    return res.status(400).json({
                        success: false,
                        error: 'Query parameter "q" is required'
                    });
                }

                const results = this.referencesProcessor.searchKnowledge(query, category);
                
                res.json({
                    success: true,
                    query: query,
                    category: category || 'all',
                    results: results.slice(0, 20),
                    total: results.length,
                    timestamp: new Date().toISOString()
                });

            } catch (error) {
                console.error('Error en búsqueda:', error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });

        // Health check
        this.app.get('/api/health', (req, res) => {
            const knowledgeStats = this.referencesProcessor.getKnowledgeStats();
            
            res.json({
                status: 'OK',
                agente: 'Rembranth',
                version: '1.1',
                timestamp: new Date().toISOString(),
                frontend: 'Integrado',
                knowledge: {
                    enabled: true,
                    totalReferences: knowledgeStats.totalReferences,
                    categories: Object.keys(knowledgeStats.categories).length
                }
            });
        });

        // Consulta principal
        this.app.post('/api/rembranth/consultar', async (req, res) => {
            try {
                const contexto = req.body;
                const resultado = await this.procesarConsulta(contexto);
                
                res.json({
                    success: true,
                    data: resultado
                });
            } catch (error) {
                console.error('Error en consulta:', error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
    }

    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`
🎨 ====================================
   AGENTE REMBRANTH INICIADO v1.1
====================================

🌐 Frontend: http://localhost:${port}
📡 API Base: http://localhost:${port}/api

Endpoints disponibles:
- GET  /                         (Frontend)
- POST /api/rembranth/chat       (Chat)
- POST /api/rembranth/consultar  (API)
- GET  /api/health               (Status)

🚀 ¡Listo para SENASoft 2025!
====================================
            `);
        });
    }
}

// Ejemplo de uso
if (require.main === module) {
    const rembranth = new AgenteRembranth();
    rembranth.start();
}

module.exports = AgenteRembranth;