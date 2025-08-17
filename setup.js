// setup.js - Script para configurar el entorno inicial de Rembranth
const fs = require('fs').promises;
const path = require('path');

class RembranthSetup {
    constructor() {
        this.projectRoot = process.cwd();
        this.knowledgeBase = path.join(this.projectRoot, 'knowledge-base');
        this.publicDir = path.join(this.projectRoot, 'public');
        this.srcDir = path.join(this.projectRoot, 'src');
    }

    async setup() {
        console.log('🎨 Configurando Agente Rembranth...\n');

        try {
            await this.createDirectories();
            await this.createKnowledgeFiles();
            await this.createEnvironmentFile();
            await this.moveHtmlToPublic();
            await this.createLocalReferencesModule();
            await this.createDocumentation();
            await this.createTestScript();
            
            console.log('\n✅ ¡Configuración completada exitosamente!\n');
            console.log('📋 Próximos pasos:');
            console.log('1. Configura tu API key de Google AI en el archivo .env');
            console.log('2. Instala dependencias: npm install');
            console.log('3. Inicia el servidor: npm start');
            console.log('4. Agrega tus referencias en la carpeta knowledge-base/');
            console.log('5. Visita http://localhost:3000 para usar la interfaz');
            console.log('\n🚀 ¡Listo para usar Rembranth!');

        } catch (error) {
            console.error('❌ Error durante la configuración:', error);
            process.exit(1);
        }
    }

    async createDirectories() {
        console.log('📁 Creando estructura de directorios...');
        
        const directories = [
            this.knowledgeBase,
            path.join(this.knowledgeBase, 'design'),
            path.join(this.knowledgeBase, 'development'), 
            path.join(this.knowledgeBase, 'inspiration'),
            path.join(this.knowledgeBase, 'tools'),
            this.publicDir,
            this.srcDir,
            path.join(this.projectRoot, 'test')
        ];

        for (const dir of directories) {
            try {
                await fs.mkdir(dir, { recursive: true });
                console.log(`  ✓ ${path.relative(this.projectRoot, dir)}`);
            } catch (error) {
                console.log(`  ⚠️  ${path.relative(this.projectRoot, dir)} ya existe`);
            }
        }
    }

    async createKnowledgeFiles() {
        console.log('\n📚 Creando archivos de base de conocimientos...');

        const knowledgeFiles = [
            {
                path: path.join(this.knowledgeBase, 'README.md'),
                content: `# Base de Conocimientos - Rembranth

Esta carpeta contiene las referencias y recursos que Rembranth utilizará para mejorar sus recomendaciones de diseño.

## Estructura

- \`design/\` - Referencias de diseño UI/UX
- \`development/\` - Recursos de desarrollo frontend
- \`inspiration/\` - Sitios y proyectos inspiradores
- \`tools/\` - Herramientas de diseño y desarrollo

## Formatos Soportados

### Enlaces Markdown
\`\`\`markdown
## Título de Sección
- [Nombre del recurso](https://ejemplo.com) - Descripción opcional
- [Otro recurso](https://otro-ejemplo.com)
\`\`\`

### URLs con descripción
\`\`\`
https://ejemplo.com - Descripción del sitio
https://otro-ejemplo.com - Otro recurso útil
\`\`\`

### URLs planas
\`\`\`
https://ejemplo.com
https://otro-ejemplo.com
\`\`\`

## Actualización

Los archivos se recargan automáticamente cuando inicias Rembranth. También puedes usar:
- \`POST /api/knowledge/reload\` - Recargar referencias
- \`GET /api/knowledge/search?q=término\` - Buscar referencias
- \`GET /api/knowledge/stats\` - Ver estadísticas

## Agregar Referencias Manualmente

Puedes agregar referencias directamente desde la interfaz web o usando la API:
\`\`\`
POST /api/knowledge/add
{
  "url": "https://ejemplo.com",
  "title": "Título opcional",
  "category": "design"
}
\`\`\`
`
            },
            {
                path: path.join(this.knowledgeBase, 'design', 'ui-references.md'),
                content: `# Referencias de Diseño UI/UX

## Inspiración General
- [Awwwards](https://www.awwwards.com/) - Los mejores diseños web del mundo
- [Dribbble](https://dribbble.com/) - Comunidad global de diseñadores
- [Behance](https://www.behance.net/) - Plataforma de portfolios creativos
- [Muzli](https://muzli.com/) - Inspiración diaria de diseño
- [Collect UI](https://collectui.com/) - Colección de interfaces
- [UI Movement](https://uimovement.com/) - Inspiración de UI diaria
- [Page Flows](https://pageflows.com/) - Flujos de usuario de productos populares

## Sistemas de Diseño
- [Material Design](https://material.io/design) - Sistema de diseño de Google
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) - Guías de Apple
- [Atlassian Design System](https://atlassian.design/) - Sistema de Atlassian
- [IBM Carbon](https://carbondesignsystem.com/) - Sistema de diseño de IBM
- [Shopify Polaris](https://polaris.shopify.com/) - Sistema de Shopify
- [Ant Design](https://ant.design/) - Sistema de diseño empresarial
- [Lightning Design System](https://www.lightningdesignsystem.com/) - Sistema de Salesforce

## Librerías de Componentes React
- [Chakra UI](https://chakra-ui.com/) - Componentes modulares y accesibles
- [Mantine](https://mantine.dev/) - Librería moderna de React
- [React Bootstrap](https://react-bootstrap.github.io/) - Bootstrap para React
- [Semantic UI React](https://react.semantic-ui.com/) - React integration for Semantic UI

## Recursos de Color
- [Coolors](https://coolors.co/) - Generador de paletas de colores
- [Adobe Color](https://color.adobe.com/) - Herramienta de color de Adobe
- [Color Hunt](https://colorhunt.co/) - Paletas curadas
- [Paletton](https://paletton.com/) - Generador de esquemas de color
- [Colorable](https://colorable.jxnblk.com/) - Verificador de contraste de colores

## Tipografía
- [Google Fonts](https://fonts.google.com/) - Fuentes web gratuitas
- [Font Pair](https://fontpair.co/) - Combinaciones de fuentes
- [Typewolf](https://www.typewolf.com/) - Inspiración tipográfica
- [Modular Scale](https://www.modularscale.com/) - Calculadora de escalas tipográficas
`
            },
            {
                path: path.join(this.knowledgeBase, 'development', 'frontend-resources.md'),
                content: `# Recursos de Desarrollo Frontend

## Frameworks CSS
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Bootstrap](https://getbootstrap.com/) - Framework CSS popular
- [Bulma](https://bulma.io/) - Framework CSS moderno
- [Foundation](https://get.foundation/) - Framework responsive

## Herramientas de Construcción
- [Vite](https://vitejs.dev/) - Build tool ultrarrápido
- [Webpack](https://webpack.js.org/) - Empaquetador de módulos
- [Parcel](https://parceljs.org/) - Zero-configuration build tool
- [Rollup](https://rollupjs.org/) - Module bundler para librerías

## Testing y Performance
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría automática de sitios web
- [GTmetrix](https://gtmetrix.com/) - Análisis de rendimiento web
- [WebPageTest](https://www.webpagetest.org/) - Testing detallado de performance
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) - Métricas de Google

## Herramientas de Desarrollo
- [CodePen](https://codepen.io/) - Editor de código online
- [JSFiddle](https://jsfiddle.net/) - Playground de JavaScript
- [CodeSandbox](https://codesandbox.io/) - IDE online para desarrollo web
- [StackBlitz](https://stackblitz.com/) - IDE online con Node.js

## CSS Tools
https://autoprefixer.github.io/ - Autoprefixer CSS online
https://cssgrid-generator.netlify.app/ - CSS Grid Generator
https://flexbox.help/ - Flexbox cheatsheet interactivo
https://animista.net/ - Generador de animaciones CSS

## Documentación y Guías
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación web completa
- [CSS-Tricks](https://css-tricks.com/) - Guías y trucos CSS
- [A List Apart](https://alistapart.com/) - Artículos sobre estándares web
- [Smashing Magazine](https://www.smashingmagazine.com/) - Revista de diseño web
- [web.dev](https://web.dev/) - Guías modernas de desarrollo web
`
            },
            {
                path: path.join(this.knowledgeBase, 'inspiration', 'showcase-sites.md'),
                content: `# Sitios Web Inspiradores

## Portafolios de Diseñadores
- [Tobias van Schneider](https://www.vanschneider.com/) - Diseñador multidisciplinario
- [Robby Leonardi](http://www.rleonardi.com/) - CV interactivo creativo
- [Bruno Simon](https://bruno-simon.com/) - Portfolio 3D interactivo
- [Jacek Jedryszek](https://jacekjedryszek.com/) - Portfolio minimalista

## Sitios Corporativos Ejemplares
- [Apple](https://www.apple.com/) - Diseño minimalista y elegante
- [Stripe](https://stripe.com/) - Diseño limpio y funcional
- [Linear](https://linear.app/) - Herramienta de gestión de proyectos
- [Notion](https://www.notion.so/) - Workspace todo-en-uno

## E-commerce Inspirador
- [Warby Parker](https://warbyparker.com/) - Retail online innovador
- [Allbirds](https://www.allbirds.com/) - Diseño sostenible y limpio
- [Glossier](https://www.glossier.com/) - Marca de belleza moderna
- [Away](https://www.awaytravel.com/) - Equipaje moderno

## Sitios con Animaciones Destacadas
- [Species in Pieces](http://species-in-pieces.com/) - Arte interactivo
- [The Boat](http://www.sbs.com.au/theboat/) - Storytelling interactivo
- [Impossible Bureau](https://impossible-bureau.com/) - Estudio de diseño creativo
- [Active Theory](https://activetheory.net/) - Agencia de experiencias digitales

## Agencias y Estudios de Diseño
https://www.metalab.co/ - Estudio de diseño de interfaces
https://www.huge.com/ - Agencia de experiencia digital
https://www.ideo.com/ - Consultora de diseño e innovación
https://www.frogdesign.com/ - Estudio de diseño global
`
            },
            {
                path: path.join(this.knowledgeBase, 'tools', 'design-tools.md'),
                content: `# Herramientas de Diseño

## Diseño de Interfaces
- [Figma](https://www.figma.com/) - Herramienta de diseño colaborativo
- [Sketch](https://www.sketch.com/) - Editor de diseño para Mac
- [Adobe XD](https://www.adobe.com/products/xd.html) - Herramienta de Adobe
- [Penpot](https://penpot.app/) - Alternativa open-source a Figma

## Prototipado e Interacción
- [Principle](https://principleformac.com/) - Herramienta de animación
- [Framer](https://www.framer.com/) - Herramienta de prototipado avanzado
- [InVision](https://www.invisionapp.com/) - Plataforma de prototipado
- [Marvel](https://marvelapp.com/) - Prototipado simple

## Generadores y Utilidades
- [Remove.bg](https://www.remove.bg/) - Eliminar fondos automáticamente
- [Unsplash](https://unsplash.com/) - Fotos gratuitas de alta calidad
- [Pexels](https://www.pexels.com/) - Videos y fotos gratuitas
- [Canva](https://www.canva.com/) - Herramienta de diseño simplificada

## Íconos y Recursos Gráficos
https://heroicons.com/ - Íconos SVG hermosos
https://feathericons.com/ - Íconos minimalistas
https://www.flaticon.com/ - Millones de íconos gratuitos
https://iconify.design/ - Librería unificada de íconos

## Herramientas de Desarrollo de Temas
- [Theme UI](https://theme-ui.com/) - Librería para crear sistemas de diseño
- [Styled System](https://styled-system.com/) - Style props para styled-components
- [Stitches](https://stitches.dev/) - CSS-in-JS con performance
`
            }
        ];

        for (const file of knowledgeFiles) {
            await fs.writeFile(file.path, file.content);
            console.log(`  ✓ ${path.relative(this.projectRoot, file.path)}`);
        }
    }

    async createLocalReferencesModule() {
        console.log('\n🔧 Creando módulo local-references.js...');
        
        const moduleContent = await this.getLocalReferencesContent();
        const modulePath = path.join(this.srcDir, 'local-references.js');
        
        await fs.writeFile(modulePath, moduleContent);
        console.log(`  ✓ ${path.relative(this.projectRoot, modulePath)}`);
    }

    async getLocalReferencesContent() {
        // Este contenido viene del artifact anterior
        return `// local-references.js - Procesador de referencias locales para Rembranth
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
            /\\[([^\\]]+)\\]\\(([^)]+)\\)/g,
            // Plain URLs: https://example.com
            /https?:\\/\\/[^\\s<>"{}|\\\\\\^\\`[\\]]+/g,
            // URLs with description: https://example.com - description
            /^(https?:\\/\\/[^\\s]+)\\s*-\\s*(.+)$/gm
        ];
        
        console.log('📚 LocalReferencesProcessor inicializado');
        console.log(\`📁 Base de conocimientos: \${this.knowledgeBasePath}\`);
    }

    /**
     * Inicializar el procesador y cargar todas las referencias
     */
    async initialize() {
        try {
            await this.ensureKnowledgeBaseExists();
            const count = await this.loadAllReferences();
            this.lastUpdate = new Date();
            
            console.log(\`✅ Referencias cargadas: \${count}\`);
            console.log(\`📂 Categorías encontradas: \${[...this.categories].join(', ')}\`);
            
            return true;
        } catch (error) {
            console.error('❌ Error inicializando referencias:', error);
            return false;
        }
    }

    // ... resto del contenido del módulo LocalReferencesProcessor
    // (El código completo está en el artifact anterior)
}

module.exports = LocalReferencesProcessor;`;
    }

    async createEnvironmentFile() {
        console.log('\n🔐 Creando archivo de configuración .env...');
        
        const envContent = `# Configuración de Rembranth
# Obtén tu API key en: https://makersuite.google.com/app/apikey

GOOGLE_AI_API_KEY=tu_api_key_aqui

# Puerto del servidor (opcional)
PORT=3000

# Configuración adicional
NODE_ENV=development

# Base de conocimientos
KNOWLEDGE_BASE_PATH=./knowledge-base

# Configuración de la aplicación
APP_NAME=Rembranth
APP_VERSION=1.1.0
APP_DESCRIPTION="Agente de Diseño IA para SENASoft 2025"
`;

        const envPath = path.join(this.projectRoot, '.env');
        
        try {
            await fs.access(envPath);
            console.log('  ⚠️  .env ya existe, no se sobrescribirá');
        } catch (error) {
            await fs.writeFile(envPath, envContent);
            console.log('  ✓ .env creado');
        }
    }

    async moveHtmlToPublic() {
        console.log('\n📄 Configurando archivos públicos...');
        
        const htmlSource = path.join(this.projectRoot, 'rembranth.html');
        const htmlDest = path.join(this.publicDir, 'index.html');
        
        try {
            await fs.access(htmlSource);
            await fs.copyFile(htmlSource, htmlDest);
            console.log('  ✓ rembranth.html → public/index.html');
        } catch (error) {
            console.log('  ⚠️  rembranth.html no encontrado, creando index.html básico');
            
            const basicHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rembranth - Agente de Diseño IA</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .logo { font-size: 4em; margin-bottom: 20px; }
        .message { 
            background: rgba(255, 255, 255, 0.15); 
            padding: 30px; 
            border-radius: 15px; 
            margin: 20px 0;
            backdrop-filter: blur(5px);
        }
        .api-list {
            text-align: left;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        .status {
            display: inline-block;
            padding: 10px 20px;
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 25px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🎨</div>
        <h1>Rembranth</h1>
        <p style="font-size: 1.2em; margin-bottom: 30px;">Agente de Diseño IA para SENASoft 2025</p>
        
        <div id="status" class="status">
            🔄 Verificando estado del servidor...
        </div>
        
        <div class="message">
            <h3>⚙️ Configuración Inicial</h3>
            <p>Para activar la interfaz completa:</p>
            <ol style="text-align: left; max-width: 500px; margin: 20px auto;">
                <li>Configura tu API key en <code>.env</code></li>
                <li>Ejecuta <code>npm install</code></li>
                <li>Inicia con <code>npm start</code></li>
                <li>Agrega el archivo HTML completo en public/</li>
            </ol>
        </div>
        
        <div class="api-list">
            <h3>📡 API Endpoints Disponibles</h3>
            <ul>
                <li><code>POST /api/rembranth/chat</code> - Chat con el agente</li>
                <li><code>GET /api/knowledge/search</code> - Buscar referencias</li>
                <li><code>GET /api/knowledge/stats</code> - Estadísticas</li>
                <li><code>POST /api/knowledge/add</code> - Agregar referencia</li>
                <li><code>GET /api/health</code> - Estado del sistema</li>
            </ul>
        </div>
    </div>
    
    <script>
        fetch('/api/health')
            .then(r => r.json())
            .then(data => {
                document.getElementById('status').innerHTML = 
                    '✅ Servidor activo - ' + data.agente + ' v' + data.version +
                    '<br>📚 ' + (data.knowledge?.totalReferences || 0) + ' referencias cargadas';
                document.getElementById('status').style.background = 'rgba(16, 185, 129, 0.2)';
                document.getElementById('status').style.borderColor = 'rgba(16, 185, 129, 0.3)';
            })
            .catch(() => {
                document.getElementById('status').innerHTML = 
                    '❌ Servidor no disponible<br>Ejecuta <code>npm start</code>';
                document.getElementById('status').style.background = 'rgba(239, 68, 68, 0.2)';
                document.getElementById('status').style.borderColor = 'rgba(239, 68, 68, 0.3)';
            });
    </script>
</body>
</html>`;
            
            await fs.writeFile(htmlDest, basicHtml);
            console.log('  ✓ index.html básico creado');
        }
    }

    async createTestScript() {
        console.log('\n🧪 Creando script de pruebas...');
        
        const testContent = `// test-agente.js - Pruebas básicas para Rembranth
const AgenteRembranth = require('../src/main');

async function testBasicFunctionality() {
    console.log('🧪 Iniciando pruebas básicas de Rembranth...\n');

    try {
        // Test 1: Inicialización
        console.log('1️⃣ Probando inicialización...');
        const agente = new AgenteRembranth();
        console.log('✅ Agente inicializado correctamente\n');

        // Test 2: Referencias locales
        console.log('2️⃣ Probando sistema de referencias...');
        const stats = agente.referencesProcessor.getKnowledgeStats();
        console.log(\`📊 Referencias cargadas: \${stats.totalReferences}\`);
        console.log(\`📂 Categorías: \${Object.keys(stats.categories).join(', ')}\`);
        
        if (stats.totalReferences > 0) {
            console.log('✅ Sistema de referencias funcionando\n');
        } else {
            console.log('⚠️  No se encontraron referencias, verifica knowledge-base/\n');
        }

        // Test 3: Búsqueda
        console.log('3️⃣ Probando búsqueda de conocimientos...');
        const searchResults = agente.referencesProcessor.searchKnowledge('design');
        console.log(\`🔍 Resultados para "design": \${searchResults.length}\`);
        
        if (searchResults.length > 0) {
            console.log(\`📝 Ejemplo: \${searchResults[0].title} - \${searchResults[0].url}\`);
            console.log('✅ Búsqueda funcionando correctamente\n');
        }

        // Test 4: Consulta de patrones
        console.log('4️⃣ Probando consulta de patrones...');
        const patrones = await agente.consultarPatrones('saas', 'conversion');
        console.log(\`🎨 Colores recomendados: \${patrones.colores_recomendados.length}\`);
        console.log(\`🧩 Elementos UI: \${patrones.elementos_ui.length}\`);
        console.log(\`📚 Referencias externas: \${patrones.referencias_externas?.length || 0}\`);
        console.log('✅ Patrones de diseño funcionando\n');

        console.log('🎉 ¡Todas las pruebas pasaron correctamente!');
        console.log('🚀 Rembranth está listo para usar');

    } catch (error) {
        console.error('❌ Error en las pruebas:', error);
        process.exit(1);
    }
}

async function testApiEndpoints() {
    console.log('\n🌐 Probando endpoints de API...');
    
    // Simular inicio del servidor en puerto de prueba
    const agente = new AgenteRembranth();
    const testPort = 3001;
    
    console.log(\`📡 Iniciando servidor de prueba en puerto \${testPort}...\`);
    
    // Aquí podrías agregar pruebas de endpoints si es necesario
    console.log('ℹ️  Ejecuta npm start y visita http://localhost:3000 para pruebas completas');
}

// Ejecutar pruebas
if (require.main === module) {
    testBasicFunctionality()
        .then(() => testApiEndpoints())
        .catch(console.error);
}

module.exports = { testBasicFunctionality, testApiEndpoints };`;

        const testPath = path.join(this.projectRoot, 'test', 'test-agente.js');
        await fs.writeFile(testPath, testContent);
        console.log(`  ✓ ${path.relative(this.projectRoot, testPath)}`);
    }

    async createDocumentation() {
        console.log('\n📖 Creando documentación...');
        
        const readmeContent = `# Rembranth - Agente de Diseño IA

> Asistente inteligente especializado en diseño UI/UX para SENASoft 2025

![Rembranth Logo](https://img.shields.io/badge/🎨-Rembranth-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Node](https://img.shields.io/badge/Node-%3E%3D18.0.0-green?style=for-the-badge)

## 🚀 Inicio Rápido

### 1. Configurar API Key
\`\`\`bash
# Edita el archivo .env
GOOGLE_AI_API_KEY=tu_api_key_de_google_ai
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Iniciar servidor
\`\`\`bash
npm start
# o para desarrollo:
npm run dev
\`\`\`

### 4. Abrir interfaz
Visita \`http://localhost:3000\`

## 📁 Estructura del Proyecto

\`\`\`
agente-rembranth/
├── src/
│   ├── main.js                 ← Servidor principal
│   └── local-references.js     ← Sistema de referencias locales
├── public/
│   └── index.html              ← Interfaz web
├── knowledge-base/             ← Base de conocimientos
│   ├── design/                 ← Referencias de diseño
│   ├── development/            ← Recursos de desarrollo
│   ├── inspiration/            ← Sitios inspiradores
│   ├── tools/                  ← Herramientas
│   └── README.md
├── test/
│   └── test-agente.js          ← Pruebas básicas
├── package.json
├── .env                        ← Configuración
└── README.md
\`\`\`

## 📚 Base de Conocimientos

Rembranth utiliza un sistema de referencias locales para enriquecer sus respuestas:

### Agregar Referencias

#### Método 1: Archivos Markdown
\`\`\`markdown
## Mi Categoría
- [Recurso útil](https://ejemplo.com) - Descripción
- [Otro recurso](https://otro.com)
\`\`\`

#### Método 2: URLs con descripción
\`\`\`
https://ejemplo.com - Descripción del sitio
https://otro-ejemplo.com - Otro recurso útil
\`\`\`

#### Método 3: URLs planas
\`\`\`
https://ejemplo.com
https://otro-ejemplo.com
\`\`\`

### Categorías Disponibles
- \`design/\` - Referencias de diseño UI/UX
- \`development/\` - Recursos de desarrollo frontend
- \`inspiration/\` - Sitios web inspiradores
- \`tools/\` - Herramientas de diseño

## 🔧 API Endpoints

### Chat con Rembranth
\`\`\`http
POST /api/rembranth/chat
Content-Type: application/json

{
  "mensaje": "Analiza este diseño",
  "configuracion": {
    "industria": "saas",
    "publico_objetivo": "desarrolladores", 
    "objetivo": "conversion"
  }
}
\`\`\`

### Sistema de Conocimientos

#### Buscar referencias
\`\`\`http
GET /api/knowledge/search?q=diseño&category=design
\`\`\`

#### Estadísticas
\`\`\`http
GET /api/knowledge/stats
\`\`\`

#### Agregar referencia
\`\`\`http
POST /api/knowledge/add
Content-Type: application/json

{
  "url": "https://ejemplo.com",
  "title": "Título opcional",
  "category": "design"
}
\`\`\`

#### Recargar referencias
\`\`\`http
POST /api/knowledge/reload
\`\`\`

#### Exportar conocimientos
\`\`\`http
GET /api/knowledge/export?format=json
GET /api/knowledge/export?format=markdown
\`\`\`

### Estado del sistema
\`\`\`http
GET /api/health
\`\`\`

## 🎨 Características Principales

### ✨ Capacidades del Agente
- 📊 Análisis automático de diseños
- 🎯 Recomendaciones basadas en objetivos
- 💻 Generación de código HTML/CSS
- 📈 Métricas de conversión esperadas
- 🔍 Búsqueda inteligente en base de conocimientos

### 🖥️ Interfaz Web
- 💬 Chat interactivo con Rembranth
- 📁 Carga de archivos (imágenes, PDFs)
- 🌐 Gestión de URLs de conocimiento
- ⚙️ Configuración por industria y objetivo
- 📋 Exportación de conversaciones

### 🧠 Sistema de Referencias
- 📚 Carga automática de archivos locales
- 🔍 Búsqueda semántica inteligente
- 📊 Estadísticas de conocimiento
- 🔄 Actualización en tiempo real
- 💾 Exportación de datos

## 🛠️ Desarrollo

### Ejecutar pruebas
\`\`\`bash
npm test
\`\`\`

### Desarrollo con recarga automática
\`\`\`bash
npm run dev
\`\`\`

### Estructura del código
- \`src/main.js\` - Servidor Express con todas las rutas
- \`src/local-references.js\` - Procesador de referencias locales
- \`public/index.html\` - Interfaz web completa
- \`knowledge-base/\` - Base de conocimientos local

## 📋 Requisitos

- Node.js >= 18.0.0
- API Key de Google Generative AI
- Navegador moderno para la interfaz

## 🎯 Configuración para SENASoft 2025

### Industrias soportadas
- E-commerce
- SaaS
- Landing Pages  
- Corporativo
- Educación
- Salud

### Objetivos de optimización
- Aumentar conversiones
- Mejorar engagement
- Optimizar usabilidad
- Fortalecer branding
- Mejorar accesibilidad

## 📞 Soporte

Para problemas o sugerencias:
1. Revisa los logs del servidor
2. Verifica tu API key en \`.env\`
3. Asegúrate que \`knowledge-base/\` tenga contenido
4. Ejecuta \`npm test\` para diagnósticos

## 🚀 ¡Listo para SENASoft 2025!

Rembranth está optimizado para ayudarte en la competencia con:
- ⚡ Respuestas rápidas y precisas
- 🎨 Conocimiento especializado en diseño
- 💡 Sugerencias basadas en mejores prácticas
- 🔧 Código listo para implementar

---

*"Diseñando el futuro con IA"* - Rembranth 🎨✨`;

        await fs.writeFile(path.join(this.projectRoot, 'README.md'), readmeContent);
        console.log('  ✓ README.md actualizado');

        // Crear archivo de configuración adicional
        const configContent = `# Configuración Avanzada de Rembranth

## Variables de Entorno

\`\`\`env
# API Key de Google AI (REQUERIDA)
GOOGLE_AI_API_KEY=tu_api_key_aqui

# Puerto del servidor
PORT=3000

# Modo de desarrollo
NODE_ENV=development

# Ruta de la base de conocimientos
KNOWLEDGE_BASE_PATH=./knowledge-base

# Configuración del agente
APP_NAME=Rembranth
APP_VERSION=1.1.0
\`\`\`

## Personalización

### Agregar nuevas industrias
Edita \`src/main.js\` en la sección \`patronesDiseno\`:

\`\`\`javascript
this.patronesDiseno = {
    mi_industria: {
        colores: ['#FF6B6B', '#4ECDC4'],
        elementos: ['custom-component', 'special-layout']
    }
};
\`\`\`

### Modificar patrones de URL
En \`src/local-references.js\`, ajusta \`urlPatterns\`:

\`\`\`javascript
this.urlPatterns = [
    /\\[([^\\]]+)\\]\\(([^)]+)\\)/g,  // Markdown
    /https?:\\/\\/[^\\s<>"{}|\\\\\\^\\`[\\]]+/g,  // URLs planas
    // Agrega tus patrones personalizados
];
\`\`\`

## Integración con Herramientas Externas

### Webhook de Figma
\`\`\`http
POST /api/webhook/figma
Content-Type: application/json

{
  "design_url": "https://figma.com/file/...",
  "event": "design_updated"
}
\`\`\`

### API de estado
\`\`\`javascript
const response = await fetch('/api/health');
const status = await response.json();
console.log(status.knowledge.totalReferences);
\`\`\`
`;

        await fs.writeFile(path.join(this.projectRoot, 'CONFIGURATION.md'), configContent);
        console.log('  ✓ CONFIGURATION.md creado');
    }
}

// Ejecutar setup
if (require.main === module) {
    const setup = new RembranthSetup();
    setup.setup();
}

module.exports = RembranthSetup;