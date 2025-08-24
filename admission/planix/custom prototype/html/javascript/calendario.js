// calendario.js - Funcionalidad del calendario

class CalendarioManager {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.events = [
            { date: new Date(2024, 4, 15), title: "Fiesta de cumpleaños de Ana", type: "personal", color: "blue" },
            { date: new Date(2024, 4, 20), title: "Reunión de equipo", type: "trabajo", color: "green" },
            { date: new Date(2024, 4, 25), title: "Examen de química", type: "academico", color: "red" }
        ];
        this.tasks = [
            { id: 1, title: "Comprar regalos para la fiesta de cumpleaños de Ana", category: "Personal", completed: false },
            { id: 2, title: "Revisar el informe de marketing", category: "Trabajo", completed: false },
            { id: 3, title: "Estudiar para el examen de química", category: "Académico", completed: false }
        ];
        
        this.monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        
        this.init();
    }
    
    init() {
        this.renderCalendar();
        this.bindEvents();
        this.updateCurrentMonth();
    }
    
    bindEvents() {
        // Navegación de mes
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
            this.updateCurrentMonth();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
            this.updateCurrentMonth();
        });
        
        // Tabs de vista
        document.getElementById('tabMes').addEventListener('click', () => {
            this.showMonthView();
        });
        
        document.getElementById('tabSemana').addEventListener('click', () => {
            this.showWeekView();
        });
        
        // Botones de crear
        document.getElementById('nuevaTarea').addEventListener('click', () => {
            this.showTaskModal();
        });
        
        document.getElementById('nuevoEvento').addEventListener('click', () => {
            this.showEventModal();
        });
    }
    
    updateCurrentMonth() {
        const monthElement = document.getElementById('currentMonth');
        monthElement.textContent = `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }
    
    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Primer día del mes y último día del mes anterior
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Generar 42 días (6 semanas)
        for (let i = 0; i < 42; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(currentDay, month);
            calendarGrid.appendChild(dayElement);
        }
    }
    
    createDayElement(date, currentMonth) {
        const dayDiv = document.createElement('div');
        const isCurrentMonth = date.getMonth() === currentMonth;
        const isToday = this.isToday(date);
        const hasEvent = this.hasEventOnDate(date);
        
        dayDiv.className = `
            relative p-2 min-h-[80px] border border-gray-100 dark:border-gray-700 cursor-pointer
            hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200
            ${isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600'}
            ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}
        `;
        
        // Número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = `text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`;
        dayNumber.textContent = date.getDate();
        dayDiv.appendChild(dayNumber);
        
        // Indicador de eventos
        if (hasEvent) {
            const eventIndicator = document.createElement('div');
            eventIndicator.className = 'absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full';
            dayDiv.appendChild(eventIndicator);
        }
        
        // Eventos del día
        const dayEvents = this.getEventsForDate(date);
        dayEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `text-xs p-1 mt-1 rounded bg-${event.color}-100 dark:bg-${event.color}-900 text-${event.color}-800 dark:text-${event.color}-200 truncate`;
            eventDiv.textContent = event.title;
            eventDiv.title = event.title;
            dayDiv.appendChild(eventDiv);
        });
        
        // Event listener para seleccionar día
        dayDiv.addEventListener('click', () => {
            this.selectDate(date);
        });
        
        return dayDiv;
    }
    
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
    
    hasEventOnDate(date) {
        return this.events.some(event => 
            event.date.toDateString() === date.toDateString()
        );
    }
    
    getEventsForDate(date) {
        return this.events.filter(event => 
            event.date.toDateString() === date.toDateString()
        );
    }
    
    selectDate(date) {
        this.selectedDate = date;
        // Aquí puedes agregar lógica para mostrar detalles del día seleccionado
        console.log('Fecha seleccionada:', date.toDateString());
    }
    
    showMonthView() {
        document.getElementById('calendarioMensual').classList.remove('hidden');
        document.getElementById('calendarioSemanal').classList.add('hidden');
        
        // Actualizar tabs
        document.getElementById('tabMes').classList.add('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
        document.getElementById('tabMes').classList.remove('text-gray-500', 'dark:text-gray-400');
        
        document.getElementById('tabSemana').classList.remove('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
        document.getElementById('tabSemana').classList.add('text-gray-500', 'dark:text-gray-400');
    }
    
    showWeekView() {
        document.getElementById('calendarioMensual').classList.add('hidden');
        document.getElementById('calendarioSemanal').classList.remove('hidden');
        
        // Actualizar tabs
        document.getElementById('tabSemana').classList.add('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
        document.getElementById('tabSemana').classList.remove('text-gray-500', 'dark:text-gray-400');
        
        document.getElementById('tabMes').classList.remove('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
        document.getElementById('tabMes').classList.add('text-gray-500', 'dark:text-gray-400');
    }
    
    showTaskModal() {
        // Aquí puedes implementar un modal para crear nuevas tareas
        const title = prompt('Título de la nueva tarea:');
        if (title) {
            const newTask = {
                id: this.tasks.length + 1,
                title: title,
                category: 'Personal',
                completed: false
            };
            this.tasks.push(newTask);
            console.log('Nueva tarea creada:', newTask);
            // Actualizar la UI de tareas
            this.updateTasksList();
        }
    }
    
    showEventModal() {
        // Aquí puedes implementar un modal para crear nuevos eventos
        const title = prompt('Título del nuevo evento:');
        if (title) {
            const selectedDate = this.selectedDate || new Date();
            const newEvent = {
                date: selectedDate,
                title: title,
                type: 'personal',
                color: 'blue'
            };
            this.events.push(newEvent);
            console.log('Nuevo evento creado:', newEvent);
            // Re-renderizar el calendario
            this.renderCalendar();
        }
    }
    
    updateTasksList() {
        // Actualizar la lista de tareas en la UI
        // Esta función se puede expandir para actualizar dinámicamente la lista
        console.log('Actualizando lista de tareas...');
    }
}

// Inicializar el calendario cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const calendario = new CalendarioManager();
    
    // Manejar checkboxes de tareas
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.closest('.space-y-3')) {
            const taskContainer = e.target.closest('.flex');
            if (e.target.checked) {
                taskContainer.classList.add('opacity-50');
                taskContainer.querySelector('p').classList.add('line-through');
            } else {
                taskContainer.classList.remove('opacity-50');
                taskContainer.querySelector('p').classList.remove('line-through');
            }
        }
    });
});

// Agregar estilos CSS adicionales para el calendario
const calendarStyles = `
    <style>
        .tab-button.active {
            border-bottom: 2px solid;
        }
        
        .calendar-day-hover:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes pulse-event {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .event-indicator {
            animation: pulse-event 2s infinite;
        }
    </style>
`;

// Inyectar estilos
document.head.insertAdjacentHTML('beforeend', calendarStyles);