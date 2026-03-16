// proyectos.js - Funcionalidad de gestión de proyectos

class ProyectosManager {
    constructor() {
        this.proyectos = [
            {
                id: 1,
                nombre: "Investigación I",
                descripcion: "Proyecto de investigación sobre inteligencia artificial",
                color: "blue",
                fechaCreacion: new Date(2024, 3, 15),
                tareas: [
                    { id: 1, titulo: "Revisión de literatura", completada: true },
                    { id: 2, titulo: "Diseño de experimento", completada: false },
                    { id: 3, titulo: "Recopilación de datos", completada: false }
                ]
            },
            {
                id: 2,
                nombre: "Desarrollo IA",
                descripcion: "Desarrollo de aplicación con machine learning",
                color: "purple",
                fechaCreacion: new Date(2024, 4, 1),
                tareas: [
                    { id: 4, titulo: "Protocolo de desarrollo", completada: true },
                    { id: 5, titulo: "Sprint fase 1", completada: true },
                    { id: 6, titulo: "Presentación inicial", completada: false }
                ]
            }
        ];
        
        this.vistaActual = 'grid';
        this.colorSeleccionado = 'blue';
        this.proyectoEditando = null;
        
        this.init();
    }
    
    init() {
        this.renderProyectos();
        this.bindEvents();
        this.setupSearch();
    }
    
    bindEvents() {
        // Botón crear proyecto
        document.getElementById('crearProyecto').addEventListener('click', () => {
            this.abrirModalCrear();
        });
        
        // Botones de vista
        document.getElementById('vistaGrid').addEventListener('click', () => {
            this.cambiarVista('grid');
        });
        
        document.getElementById('vistaLista').addEventListener('click', () => {
            this.cambiarVista('lista');
        });
        
        // Modal events
        document.getElementById('cerrarModal').addEventListener('click', () => {
            this.cerrarModal();
        });
        
        document.getElementById('cancelarModal').addEventListener('click', () => {
            this.cerrarModal();
        });
        
        // Form submit
        document.getElementById('formProyecto').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarProyecto();
        });
        
        // Color selection
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.seleccionarColor(e.target.dataset.color);
            });
        });
        
        // Close modal on overlay click
        document.getElementById('modalProyecto').addEventListener('click', (e) => {
            if (e.target.id === 'modalProyecto') {
                this.cerrarModal();
            }
        });
    }
    
    setupSearch() {
        const searchInput = document.getElementById('buscarProyecto');
        searchInput.addEventListener('input', (e) => {
            this.filtrarProyectos(e.target.value);
        });
    }
    
    renderProyectos(proyectosFiltrados = null) {
        const proyectosAMostrar = proyectosFiltrados || this.proyectos;
        
        if (this.vistaActual === 'grid') {
            this.renderGrid(proyectosAMostrar);
        } else {
            this.renderLista(proyectosAMostrar);
        }
        
        // Mostrar estado vacío si no hay proyectos
        this.toggleEstadoVacio(proyectosAMostrar.length === 0);
    }
    
    renderGrid(proyectos) {
        const gridContainer = document.getElementById('proyectosGrid');
        gridContainer.innerHTML = '';
        
        proyectos.forEach(proyecto => {
            const tareasCompletadas = proyecto.tareas.filter(t => t.completada).length;
            const totalTareas = proyecto.tareas.length;
            const porcentajeCompletado = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;
            
            const proyectoCard = this.createProjectCard(proyecto, porcentajeCompletado, tareasCompletadas, totalTareas);
            gridContainer.appendChild(proyectoCard);
        });
    }
    
    renderLista(proyectos) {
        const listaContainer = document.getElementById('proyectosLista');
        listaContainer.innerHTML = '';
        
        proyectos.forEach(proyecto => {
            const tareasCompletadas = proyecto.tareas.filter(t => t.completada).length;
            const totalTareas = proyecto.tareas.length;
            const porcentajeCompletado = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;
            
            const proyectoItem = this.createProjectListItem(proyecto, porcentajeCompletado, tareasCompletadas, totalTareas);
            listaContainer.appendChild(proyectoItem);
        });
    }
    
    createProjectCard(proyecto, porcentaje, completadas, total) {
        const div = document.createElement('div');
        div.className = `bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer`;
        
        div.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-${proyecto.color}-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-folder text-white text-sm"></i>
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-sm font-semibold text-gray-800 dark:text-white truncate">${proyecto.nombre}</h3>
                    </div>
                </div>
                <div class="flex space-x-1">
                    <button class="edit-project p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200" data-id="${proyecto.id}">
                        <i class="fas fa-edit text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"></i>
                    </button>
                    <button class="delete-project p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors duration-200" data-id="${proyecto.id}">
                        <i class="fas fa-trash text-xs text-gray-400 hover:text-red-600"></i>
                    </button>
                </div>
            </div>
            
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">${proyecto.descripcion || 'Sin descripción'}</p>
            
            <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-500 dark:text-gray-400">${completadas}/${total} tareas completadas</span>
                    <span class="text-${proyecto.color}-600 dark:text-${proyecto.color}-400 font-semibold">${porcentaje}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div class="bg-${proyecto.color}-500 h-2 rounded-full transition-all duration-500" style="width: ${porcentaje}%"></div>
                </div>
            </div>
            
            <div class="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Creado ${this.formatearFecha(proyecto.fechaCreacion)}</span>
                <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-${proyecto.color}-500 rounded-full"></div>
                    <span class="capitalize">${proyecto.color}</span>
                </div>
            </div>
        `;
        
        // Event listeners para botones
        div.querySelector('.edit-project').addEventListener('click', (e) => {
            e.stopPropagation();
            this.editarProyecto(proyecto.id);
        });
        
        div.querySelector('.delete-project').addEventListener('click', (e) => {
            e.stopPropagation();
            this.eliminarProyecto(proyecto.id);
        });
        
        // Click en la card para ver detalles
        div.addEventListener('click', () => {
            this.verDetallesProyecto(proyecto.id);
        });
        
        return div;
    }
    
    createProjectListItem(proyecto, porcentaje, completadas, total) {
        const div = document.createElement('div');
        div.className = `bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 cursor-pointer`;
        
        div.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 flex-1 min-w-0">
                    <div class="w-10 h-10 bg-${proyecto.color}-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-folder text-white"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-semibold text-gray-800 dark:text-white truncate">${proyecto.nombre}</h3>
                        <p class="text-xs text-gray-600 dark:text-gray-400 truncate">${proyecto.descripcion || 'Sin descripción'}</p>
                        <div class="flex items-center space-x-4 mt-1">
                            <span class="text-xs text-gray-500 dark:text-gray-400">${completadas}/${total} tareas</span>
                            <span class="text-xs text-${proyecto.color}-600 dark:text-${proyecto.color}-400 font-semibold">${porcentaje}%</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-16">
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="bg-${proyecto.color}-500 h-2 rounded-full transition-all duration-500" style="width: ${porcentaje}%"></div>
                        </div>
                    </div>
                    <div class="flex space-x-1">
                        <button class="edit-project p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200" data-id="${proyecto.id}">
                            <i class="fas fa-edit text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"></i>
                        </button>
                        <button class="delete-project p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors duration-200" data-id="${proyecto.id}">
                            <i class="fas fa-trash text-xs text-gray-400 hover:text-red-600"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Event listeners para botones
        div.querySelector('.edit-project').addEventListener('click', (e) => {
            e.stopPropagation();
            this.editarProyecto(proyecto.id);
        });
        
        div.querySelector('.delete-project').addEventListener('click', (e) => {
            e.stopPropagation();
            this.eliminarProyecto(proyecto.id);
        });
        
        // Click en el item para ver detalles
        div.addEventListener('click', () => {
            this.verDetallesProyecto(proyecto.id);
        });
        
        return div;
    }
    
    cambiarVista(vista) {
        this.vistaActual = vista;
        
        // Actualizar botones
        if (vista === 'grid') {
            document.getElementById('vistaGrid').classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            document.getElementById('vistaGrid').classList.remove('text-gray-400');
            document.getElementById('vistaLista').classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            document.getElementById('vistaLista').classList.add('text-gray-400');
            
            document.getElementById('proyectosGrid').classList.remove('hidden');
            document.getElementById('proyectosLista').classList.add('hidden');
        } else {
            document.getElementById('vistaLista').classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            document.getElementById('vistaLista').classList.remove('text-gray-400');
            document.getElementById('vistaGrid').classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            document.getElementById('vistaGrid').classList.add('text-gray-400');
            
            document.getElementById('proyectosLista').classList.remove('hidden');
            document.getElementById('proyectosGrid').classList.add('hidden');
        }
        
        this.renderProyectos();
    }
    
    filtrarProyectos(termino) {
        if (!termino.trim()) {
            this.renderProyectos();
            return;
        }
        
        const proyectosFiltrados = this.proyectos.filter(proyecto => 
            proyecto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
            (proyecto.descripcion && proyecto.descripcion.toLowerCase().includes(termino.toLowerCase()))
        );
        
        this.renderProyectos(proyectosFiltrados);
    }
    
    abrirModalCrear() {
        this.proyectoEditando = null;
        document.getElementById('modalTitle').textContent = 'Crear Nuevo Proyecto';
        document.getElementById('formProyecto').reset();
        this.seleccionarColor('blue');
        document.getElementById('modalProyecto').classList.remove('hidden');
    }
    
    editarProyecto(id) {
        const proyecto = this.proyectos.find(p => p.id === id);
        if (!proyecto) return;
        
        this.proyectoEditando = proyecto;
        document.getElementById('modalTitle').textContent = 'Editar Proyecto';
        document.getElementById('nombreProyecto').value = proyecto.nombre;
        document.getElementById('descripcionProyecto').value = proyecto.descripcion || '';
        this.seleccionarColor(proyecto.color);
        document.getElementById('modalProyecto').classList.remove('hidden');
    }
    
    eliminarProyecto(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.')) {
            this.proyectos = this.proyectos.filter(p => p.id !== id);
            this.renderProyectos();
            this.mostrarNotificacion('Proyecto eliminado correctamente', 'success');
        }
    }
    
    verDetallesProyecto(id) {
        // Aquí puedes implementar la navegación a una vista detallada del proyecto
        console.log('Ver detalles del proyecto:', id);
        this.mostrarNotificacion('Función de detalles en desarrollo', 'info');
    }
    
    seleccionarColor(color) {
        this.colorSeleccionado = color;
        
        // Actualizar UI
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.classList.remove('ring-2', 'ring-gray-400');
        });
        
        const colorBtn = document.querySelector(`[data-color="${color}"]`);
        if (colorBtn) {
            colorBtn.classList.add('ring-2', 'ring-gray-400');
        }
    }
    
    guardarProyecto() {
        const nombre = document.getElementById('nombreProyecto').value.trim();
        const descripcion = document.getElementById('descripcionProyecto').value.trim();
        
        if (!nombre) {
            this.mostrarNotificacion('El nombre del proyecto es requerido', 'error');
            return;
        }
        
        if (this.proyectoEditando) {
            // Editar proyecto existente
            const index = this.proyectos.findIndex(p => p.id === this.proyectoEditando.id);
            if (index !== -1) {
                this.proyectos[index] = {
                    ...this.proyectos[index],
                    nombre,
                    descripcion,
                    color: this.colorSeleccionado
                };
                this.mostrarNotificacion('Proyecto actualizado correctamente', 'success');
            }
        } else {
            // Crear nuevo proyecto
            const nuevoProyecto = {
                id: Date.now(), // Simple ID generation
                nombre,
                descripcion,
                color: this.colorSeleccionado,
                fechaCreacion: new Date(),
                tareas: []
            };
            this.proyectos.push(nuevoProyecto);
            this.mostrarNotificacion('Proyecto creado correctamente', 'success');
        }
        
        this.renderProyectos();
        this.cerrarModal();
    }
    
    cerrarModal() {
        document.getElementById('modalProyecto').classList.add('hidden');
        document.getElementById('formProyecto').reset();
        this.proyectoEditando = null;
        this.seleccionarColor('blue');
    }
    
    toggleEstadoVacio(mostrar) {
        const estadoVacio = document.getElementById('estadoVacio');
        const grid = document.getElementById('proyectosGrid');
        const lista = document.getElementById('proyectosLista');
        
        if (mostrar) {
            estadoVacio.classList.remove('hidden');
            grid.classList.add('hidden');
            lista.classList.add('hidden');
        } else {
            estadoVacio.classList.add('hidden');
            if (this.vistaActual === 'grid') {
                grid.classList.remove('hidden');
            } else {
                lista.classList.remove('hidden');
            }
        }
    }
    
    formatearFecha(fecha) {
        const opciones = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    }
    
    mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
        
        // Aplicar estilos según el tipo
        switch (tipo) {
            case 'success':
                notificacion.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                notificacion.classList.add('bg-red-500', 'text-white');
                break;
            case 'info':
                notificacion.classList.add('bg-blue-500', 'text-white');
                break;
            default:
                notificacion.classList.add('bg-gray-500', 'text-white');
        }
        
        notificacion.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${tipo === 'success' ? 'check' : tipo === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${mensaje}</span>
            </div>
        `;
        
        document.body.appendChild(notificacion);
        
        // Animación de entrada
        setTimeout(() => {
            notificacion.classList.remove('translate-x-full');
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
}

// Inicializar el gestor de proyectos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const proyectosManager = new ProyectosManager();
    
    // Event listener para el botón del estado vacío
    document.addEventListener('click', function(e) {
        if (e.target.closest('#estadoVacio button')) {
            proyectosManager.abrirModalCrear();
        }
    });
});

// Agregar estilos CSS adicionales para proyectos
const proyectosStyles = `
    <style>
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .project-card-hover {
            transition: all 0.3s ease;
        }
        
        .project-card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-in-up {
            animation: slideInUp 0.3s ease-out;
        }
        
        .notification-enter {
            transform: translateX(100%);
            opacity: 0;
        }
        
        .notification-show {
            transform: translateX(0);
            opacity: 1;
            transition: all 0.3s ease-out;
        }
    </style>
`;

// Inyectar estilos
document.head.insertAdjacentHTML('beforeend', proyectosStyles);