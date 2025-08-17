// local-references.js - Procesador de referencias locales para Rembranth
const fs = require('fs').promises;
const path = require('path');

class LocalReferencesProcessor {
    constructor(knowledgeBasePath = './knowledge-base') {
        this.knowledgeBasePath = knowledgeBasePath;
        this.references = new Map();
        this.categories = new Set();
        this.lastUpdate = null;
        
        // Extensiones de archivo soportadas
        this.supportedExtensions = ['.md', '.txt', '.json', '.csv'];
        
        // Patrones para extraer URLs
        this.urlPatterns = [
            // Markdown links: [text](url)
            /\[([^\]]+)\]\(([^)]+)\)/g,
            // Plain URLs: https://example.com
            /https?:\/\/[^\s<>"{}|\\^`[\]]+/g,
            // URLs with description: https://example.com - description
            /^(https?:\/\/[^\s]+)\s*-\s*(.+)$/gm
        ];
        
        console.log('📚 LocalReferencesProcessor inicializado');
        console.log(`📁 Base de conocimientos: ${this.knowledgeBasePath}`);
    }

    /**
     * Inicializar el procesador y cargar todas las referencias
     */
    async initialize() {
        try {
            await this.ensureKnowledgeBaseExists();
            const count = await this.loadAllReferences();
            this.lastUpdate = new Date();
            
            console.log(`✅ Referencias cargadas: ${count}`);
            console.log(`📂 Categorías encontradas: ${[...this.categories].join(', ')}`);
            
            return true;
        } catch (error) {
            console.error('❌ Error inicializando referencias:', error);
            return false;
        }
    }

    /**
     * Asegurar que existe la carpeta de base de conocimientos
     */
    async ensureKnowledgeBaseExists() {
        try {
            await fs.access(this.knowledgeBasePath);
        } catch (error) {
            console.log('📁 Creando carpeta de base de conocimientos...');
            await fs.mkdir(this.knowledgeBasePath, { recursive: true });
            await this.createDefaultStructure();
        }
    }

    /**
     * Crear estructura por defecto
     */
    async createDefaultStructure() {
        const defaultFolders = ['design', 'development', 'inspiration', 'tools'];
        const defaultFiles = [
            {
                path: 'README.md',
                content: `# Base de Conocimientos - Rembranth

Esta carpeta contiene las referencias que Rembranth utilizará para mejorar sus recomendaciones.

## Estructura
- design/ - Referencias de diseño UI/UX
- development/ - Recursos de desarrollo frontend  
- inspiration/ - Sitios web inspiradores
- tools/ - Herramientas de diseño

## Formato soportado
- Enlaces Markdown: [Texto](https://ejemplo.com)
- URLs planas: https://ejemplo.com
- URLs con descripción: https://ejemplo.com - Descripción del sitio

Las referencias se actualizan automáticamente al iniciar el servidor.
`
            },
            {
                path: 'design/ui-libraries.md',
                content: `# Librerías y Sistemas de Diseño

## Sistemas de Diseño Populares
- [Material Design](https://material.io/) - Sistema de diseño de Google
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) - Guías de interfaz humana de Apple
- [IBM Carbon](https://carbondesignsystem.com/) - Sistema de diseño empresarial
- [Shopify Polaris](https://polaris.shopify.com/) - Sistema para comercio electrónico

## Librerías de Componentes
- [Ant Design](https://ant.design/) - Componentes React empresariales
- [Chakra UI](https://chakra-ui.com/) - Componentes modulares y accesibles
- [Mantine](https://mantine.dev/) - Librería moderna de React
- [Headless UI](https://headlessui.com/) - Componentes sin estilo

## Frameworks CSS
https://tailwindcss.com/ - Framework utility-first
https://getbootstrap.com/ - Framework CSS popular
https://bulma.io/ - CSS framework moderno sin JavaScript
`
            },
            {
                path: 'development/frontend-tools.md',
                content: `# Herramientas de Desarrollo Frontend

## Editores y IDEs
- [VS Code](https://code.visualstudio.com/) - Editor de código gratuito de Microsoft
- [WebStorm](https://www.jetbrains.com/webstorm/) - IDE especializado para desarrollo web
- [Sublime Text](https://www.sublimetext.com/) - Editor de texto sofisticado

## Testing y Performance
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría automática de sitios web
- [GTmetrix](https://gtmetrix.com/) - Análisis de rendimiento web
- [WebPageTest](https://www.webpagetest.org/) - Testing detallado de performance

## Herramientas de Construcción
https://vitejs.dev/ - Build tool ultrarrápido
https://webpack.js.org/ - Empaquetador de módulos
https://parceljs.org/ - Zero-configuration build tool
`
            }
        ];

        // Crear carpetas
        for (const folder of defaultFolders) {
            await fs.mkdir(path.join(this.knowledgeBasePath, folder), { recursive: true });
        }

        // Crear archivos por defecto
        for (const file of defaultFiles) {
            const filePath = path.join(this.knowledgeBasePath, file.path);
            await fs.writeFile(filePath, file.content);
        }

        console.log('📁 Estructura por defecto creada');
    }

    /**
     * Cargar todas las referencias de la base de conocimientos
     */
    async loadAllReferences() {
        this.references.clear();
        this.categories.clear();
        
        const files = await this.findAllFiles(this.knowledgeBasePath);
        let totalReferences = 0;

        for (const filePath of files) {
            try {
                const count = await this.processFile(filePath);
                totalReferences += count;
            } catch (error) {
                console.warn(`⚠️ Error procesando ${filePath}:`, error.message);
            }
        }

        return totalReferences;
    }

    /**
     * Encontrar todos los archivos soportados recursivamente
     */
    async findAllFiles(dirPath) {
        const files = [];
        
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                
                if (entry.isDirectory()) {
                    // Recursión para subdirectorios
                    const subFiles = await this.findAllFiles(fullPath);
                    files.push(...subFiles);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (this.supportedExtensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        } catch (error) {
            console.warn(`⚠️ No se pudo leer directorio ${dirPath}:`, error.message);
        }

        return files;
    }

    /**
     * Procesar un archivo específico y extraer referencias
     */
    async processFile(filePath) {
        const content = await fs.readFile(filePath, 'utf8');
        const category = this.extractCategoryFromPath(filePath);
        const source = path.relative(this.knowledgeBasePath, filePath);
        
        const references = this.extractReferencesFromContent(content);
        let count = 0;

        for (const ref of references) {
            const referenceId = this.generateReferenceId(ref.url, source);
            
            this.references.set(referenceId, {
                id: referenceId,
                title: ref.title || this.extractTitleFromUrl(ref.url),
                url: ref.url,
                category: category,
                source: source,
                filePath: filePath,
                description: ref.description,
                metadata: {
                    addedDate: new Date(),
                    lastChecked: null,
                    status: 'active',
                    description: ref.description
                }
            });
            
            count++;
        }

        this.categories.add(category);
        return count;
    }

    /**
     * Extraer categoría del path del archivo
     */
    extractCategoryFromPath(filePath) {
        const relativePath = path.relative(this.knowledgeBasePath, filePath);
        const pathParts = relativePath.split(path.sep);
        
        if (pathParts.length > 1) {
            return pathParts[0]; // Primera carpeta como categoría
        }
        
        return 'general';
    }

    /**
     * Extraer referencias del contenido de un archivo
     */
    extractReferencesFromContent(content) {
        const references = [];
        const foundUrls = new Set(); // Evitar duplicados

        // Patrón 1: Links Markdown [texto](url)
        const markdownLinks = content.matchAll(this.urlPatterns[0]);
        for (const match of markdownLinks) {
            const url = match[2].trim();
            const title = match[1].trim();
            
            if (this.isValidUrl(url) && !foundUrls.has(url)) {
                references.push({ url, title });
                foundUrls.add(url);
            }
        }

        // Patrón 2: URLs con descripción (url - descripción)
        const urlsWithDescription = content.matchAll(this.urlPatterns[2]);
        for (const match of urlsWithDescription) {
            const url = match[1].trim();
            const description = match[2].trim();
            
            if (this.isValidUrl(url) && !foundUrls.has(url)) {
                references.push({ url, description, title: description });
                foundUrls.add(url);
            }
        }

        // Patrón 3: URLs planas
        const plainUrls = content.matchAll(this.urlPatterns[1]);
        for (const match of plainUrls) {
            const url = match[0].trim();
            
            if (this.isValidUrl(url) && !foundUrls.has(url)) {
                // Solo agregar si no fue capturada por los patrones anteriores
                const isInMarkdownLink = content.includes(`](${url})`);
                const isWithDescription = content.includes(`${url} -`);
                
                if (!isInMarkdownLink && !isWithDescription) {
                    references.push({ url });
                    foundUrls.add(url);
                }
            }
        }

        return references;
    }

    /**
     * Validar si una URL es válida
     */
    isValidUrl(urlString) {
        try {
            const url = new URL(urlString);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }

    /**
     * Extraer título de una URL
     */
    extractTitleFromUrl(url) {
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname.replace('www.', '');
            const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
            
            if (pathParts.length > 0) {
                const lastPart = pathParts[pathParts.length - 1];
                return `${domain}/${lastPart}`;
            }
            
            return domain;
        } catch (e) {
            return url.substring(0, 50) + '...';
        }
    }

    /**
     * Generar ID único para una referencia
     */
    generateReferenceId(url, source) {
        const hash = require('crypto').createHash('md5');
        hash.update(url + source);
        return hash.digest('hex').substring(0, 12);
    }

    /**
     * Buscar referencias por término de búsqueda
     */
    searchKnowledge(query, category = null) {
        const searchTerms = query.toLowerCase().split(' ');
        const results = [];

        for (const ref of this.references.values()) {
            // Filtrar por categoría si se especifica
            if (category && ref.category !== category) {
                continue;
            }

            // Calcular relevancia
            let relevance = 0;
            const searchText = `${ref.title} ${ref.url} ${ref.description || ''} ${ref.category}`.toLowerCase();

            for (const term of searchTerms) {
                if (searchText.includes(term)) {
                    relevance++;
                }
            }

            if (relevance > 0) {
                results.push({
                    ...ref,
                    relevance: relevance / searchTerms.length
                });
            }
        }

        // Ordenar por relevancia
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    /**
     * Obtener referencias por categoría
     */
    getReferencesByCategory(category) {
        const results = [];
        
        for (const ref of this.references.values()) {
            if (ref.category === category) {
                results.push(ref);
            }
        }
        
        return results;
    }

    /**
     * Obtener estadísticas de la base de conocimientos
     */
    getKnowledgeStats() {
        const stats = {
            totalReferences: this.references.size,
            categories: {},
            status: {
                active: 0,
                pending: 0,
                error: 0
            },
            lastUpdate: this.lastUpdate
        };

        // Contar por categorías
        for (const ref of this.references.values()) {
            if (!stats.categories[ref.category]) {
                stats.categories[ref.category] = 0;
            }
            stats.categories[ref.category]++;
            
            // Contar por estado
            if (ref.metadata && ref.metadata.status) {
                stats.status[ref.metadata.status]++;
            } else {
                stats.status.active++;
            }
        }

        return stats;
    }

    /**
     * Agregar referencia manualmente
     */
    async addReference(url, title = null, category = 'manual') {
        if (!this.isValidUrl(url)) {
            throw new Error('URL no válida');
        }

        const referenceId = this.generateReferenceId(url, 'manual');
        const reference = {
            id: referenceId,
            title: title || this.extractTitleFromUrl(url),
            url: url,
            category: category,
            source: 'manual',
            filePath: null,
            description: null,
            metadata: {
                addedDate: new Date(),
                lastChecked: null,
                status: 'active',
                manual: true
            }
        };

        this.references.set(referenceId, reference);
        this.categories.add(category);

        // Optionally save to a manual references file
        await this.saveManualReference(reference);
        
        return reference;
    }

    /**
     * Guardar referencia manual en archivo
     */
    async saveManualReference(reference) {
        const manualFile = path.join(this.knowledgeBasePath, 'manual-references.md');
        const entry = `- [${reference.title}](${reference.url}) - Agregado manualmente el ${new Date().toLocaleDateString()}\n`;
        
        try {
            await fs.appendFile(manualFile, entry);
        } catch (error) {
            // Si el archivo no existe, crearlo con header
            const header = `# Referencias Agregadas Manualmente\n\nEste archivo contiene las referencias agregadas a través de la interfaz web.\n\n`;
            await fs.writeFile(manualFile, header + entry);
        }
    }

    /**
     * Recargar todas las referencias
     */
    async reloadReferences() {
        console.log('🔄 Recargando base de conocimientos...');
        return await this.loadAllReferences();
    }

    /**
     * Exportar conocimientos en formato JSON o Markdown
     */
    async exportKnowledge(format = 'json') {
        const references = Array.from(this.references.values());
        
        if (format === 'markdown') {
            let markdown = `# Base de Conocimientos Rembranth\n\nExportado: ${new Date().toISOString()}\nTotal referencias: ${references.length}\n\n`;
            
            const categoriesSet = new Set(references.map(ref => ref.category));
            
            for (const category of Array.from(categoriesSet).sort()) {
                markdown += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
                
                const categoryRefs = references.filter(ref => ref.category === category);
                for (const ref of categoryRefs) {
                    markdown += `- [${ref.title}](${ref.url})`;
                    if (ref.description) {
                        markdown += ` - ${ref.description}`;
                    }
                    markdown += `\n`;
                }
                markdown += '\n';
            }
            
            return markdown;
        }
        
        // Formato JSON por defecto
        return JSON.stringify({
            exportDate: new Date().toISOString(),
            totalReferences: references.length,
            categories: Array.from(this.categories),
            references: references
        }, null, 2);
    }

    /**
     * Limpiar referencias inválidas o duplicadas
     */
    async cleanupReferences() {
        const before = this.references.size;
        const toRemove = [];

        for (const [id, ref] of this.references.entries()) {
            if (!this.isValidUrl(ref.url)) {
                toRemove.push(id);
            }
        }

        for (const id of toRemove) {
            this.references.delete(id);
        }

        const after = this.references.size;
        console.log(`🧹 Limpieza completada: ${before - after} referencias removidas`);
        
        return before - after;
    }

    /**
     * Obtener información detallada de una referencia
     */
    getReference(id) {
        return this.references.get(id);
    }

    /**
     * Verificar si el procesador está inicializado
     */
    isInitialized() {
        return this.references.size > 0;
    }
}

module.exports = LocalReferencesProcessor;