
        // Variables globales
        let isDarkMode = document.documentElement.classList.contains('dark');
        
        // Funciones del sidebar
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        }

        // Funciones del modo oscuro
        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            document.documentElement.classList.toggle('dark', isDarkMode);
            updateDarkModeIcon();
            localStorage.setItem('darkMode', isDarkMode);
        }

        function updateDarkModeIcon() {
            const darkModeIcon = document.getElementById('darkModeIcon');
            if (isDarkMode) {
                darkModeIcon.className = 'fas fa-sun text-sm';
            } else {
                darkModeIcon.className = 'fas fa-moon text-sm';
            }
        }

        // Función para mostrar fecha actual
        function updateCurrentDate() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateString = now.toLocaleDateString('es-ES', options);
            document.getElementById('currentDate').textContent = dateString;
        }

        // Sistema de Notificaciones Toast
        function showToast(title, message, type = 'info') {
            const toast = document.getElementById('toastNotification');
            const toastIcon = document.getElementById('toastIcon');
            const toastIconClass = document.getElementById('toastIconClass');
            const toastTitle = document.getElementById('toastTitle');
            const toastMessage = document.getElementById('toastMessage');

            const types = {
                success: {
                    bgColor: 'bg-green-500',
                    icon: 'fas fa-check'
                },
                error: {
                    bgColor: 'bg-red-500',
                    icon: 'fas fa-exclamation-circle'
                },
                warning: {
                    bgColor: 'bg-yellow-500',
                    icon: 'fas fa-exclamation-triangle'
                },
                info: {
                    bgColor: 'bg-blue-500',
                    icon: 'fas fa-info-circle'
                }
            };

            const config = types[type] || types.info;
            
            toastIcon.className = `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor}`;
            toastIconClass.className = `${config.icon} text-white text-sm`;
            toastTitle.textContent = title;
            toastMessage.textContent = message;

            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');

            setTimeout(() => {
                hideToast();
            }, 5000);
        }

        function hideToast() {
            const toast = document.getElementById('toastNotification');
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
        }

        // Funciones de modales
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('hidden');
            setTimeout(() => {
                const transform = modal.querySelector('.transform');
                if (transform) {
                    transform.classList.remove('scale-95');
                    transform.classList.add('scale-100');
                }
            }, 10);
            document.body.classList.add('overflow-hidden');
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            const transform = modal.querySelector('.transform');
            if (transform) {
                transform.classList.add('scale-95');
                transform.classList.remove('scale-100');
            }
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                // Reset forms if they exist
                const form = modal.querySelector('form');
                if (form) form.reset();
            }, 300);
        }

        // Animaciones de las barras de progreso
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-bar');
            const targetWidths = ['85%', '72%', '90%'];
            
            progressBars.forEach((bar, index) => {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidths[index];
                }, 100 * (index + 1));
            });
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Inicializar fecha
            updateCurrentDate();
            
            // Configurar modo oscuro desde localStorage
            const savedDarkMode = localStorage.getItem('darkMode');
            if (savedDarkMode !== null) {
                isDarkMode = savedDarkMode === 'true';
                document.documentElement.classList.toggle('dark', isDarkMode);
            }
            updateDarkModeIcon();
            
            // Sidebar toggles
            document.getElementById('mobileSidebarToggle')?.addEventListener('click', toggleSidebar);
            document.getElementById('toggleSidebar')?.addEventListener('click', toggleSidebar);
            document.getElementById('overlay')?.addEventListener('click', toggleSidebar);
            
            // Dark mode toggle
            document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
            
            // Modal triggers
            document.getElementById('quickAddTask')?.addEventListener('click', () => {
                openModal('quickTaskModal');
                document.getElementById('taskTitle')?.focus();
            });
            
            document.getElementById('notificationsBtn')?.addEventListener('click', () => {
                openModal('notificationsModal');
            });
            
            document.getElementById('userAvatar')?.addEventListener('click', () => {
                openModal('avatarModal');
            });
            
            // Modal close buttons
            document.getElementById('closeQuickTaskModal')?.addEventListener('click', () => closeModal('quickTaskModal'));
            document.getElementById('cancelQuickTask')?.addEventListener('click', () => closeModal('quickTaskModal'));
            document.getElementById('closeNotificationsModal')?.addEventListener('click', () => closeModal('notificationsModal'));
            document.getElementById('closeAvatarModal')?.addEventListener('click', () => closeModal('avatarModal'));
            
            // Close modals when clicking outside
            ['quickTaskModal', 'notificationsModal', 'avatarModal'].forEach(modalId => {
                document.getElementById(modalId)?.addEventListener('click', (e) => {
                    if (e.target.id === modalId) {
                        closeModal(modalId);
                    }
                });
            });
            
            // Task form submission
            document.getElementById('quickTaskForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const taskTitle = document.getElementById('taskTitle').value.trim();
                const taskPriority = document.getElementById('taskPriority').value;
                const taskCategory = document.getElementById('taskCategory').value;
                
                if (taskTitle) {
                    const priorityEmojis = { baja: '🟢', media: '🟡', alta: '🔴' };
                    const categoryEmojis = { personal: '👤', trabajo: '💼', estudios: '📚', salud: '❤️' };
                    
                    showToast(
                        'Tarea creada exitosamente',
                        `${priorityEmojis[taskPriority]} ${taskTitle} - ${categoryEmojis[taskCategory]} ${taskCategory}`,
                        'success'
                    );
                    
                    closeModal('quickTaskModal');
                }
            });
            
            // Avatar selection
            document.querySelectorAll('.avatar-option').forEach(option => {
                option.addEventListener('click', () => {
                    const userAvatar = document.getElementById('userAvatar');
                    if (option.dataset.avatar === 'gradient') {
                        userAvatar.src = '';
                        userAvatar.style.background = 'linear-gradient(135deg, #3B82F6, #8B5CF6)';
                        userAvatar.innerHTML = '<i class="fas fa-user text-white text-lg"></i>';
                    } else {
                        userAvatar.src = option.src;
                        userAvatar.style.background = '';
                        userAvatar.innerHTML = '';
                    }
                    closeModal('avatarModal');
                    showToast('Avatar actualizado', 'Tu foto de perfil ha sido cambiada', 'success');
                });
            });
            
            // Toast close button
            document.getElementById('closeToast')?.addEventListener('click', hideToast);
            
            // Quick access buttons
            document.querySelectorAll('[class*="bg-gradient-to-br from-"][class*="-50"]').forEach(button => {
                button.addEventListener('click', () => {
                    const text = button.querySelector('span').textContent;
                    showToast('Función en desarrollo', `${text} estará disponible pronto`, 'info');
                });
            });
            
            // Escape key to close modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['quickTaskModal', 'notificationsModal', 'avatarModal'].forEach(modalId => {
                        const modal = document.getElementById(modalId);
                        if (modal && !modal.classList.contains('hidden')) {
                            closeModal(modalId);
                        }
                    });
                }
            });
            
            // Initialize animations
            setTimeout(() => {
                animateProgressBars();
            }, 500);
            
            // Update date every minute
            setInterval(updateCurrentDate, 60000);
            
            // Welcome toast
            setTimeout(() => {
                showToast('¡Bienvenida de vuelta!', 'Tienes 3 nuevas notificaciones', 'info');
            }, 1500);
        });
