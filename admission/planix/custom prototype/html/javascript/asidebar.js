
        // Variables globales
        let sidebarOpen = false;
        let darkMode = false;
        let isAuthenticated = false;
        let currentUser = null;

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            // Cargar estado guardado
            darkMode = localStorage.getItem('darkMode') === 'true';
            isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
            }

            // Aplicar tema inicial
            initTheme();
            updateUIState();
            initSidebar();
            setupEventListeners();
            animateElements();
        });

        // Funciones principales
        function initTheme() {
            const html = document.documentElement;
            const darkModeIcon = document.getElementById('darkModeIcon');
            const footerIcon = document.querySelector('#darkModeToggleFooter i');
            
            if (darkMode) {
                html.classList.add('dark');
                if (darkModeIcon) darkModeIcon.className = 'fas fa-sun text-sm';
                if (footerIcon) footerIcon.className = 'fas fa-sun';
            } else {
                html.classList.remove('dark');
                if (darkModeIcon) darkModeIcon.className = 'fas fa-moon text-sm';
                if (footerIcon) footerIcon.className = 'fas fa-moon';
            }
        }

        function updateUIState() {
            const elements = {
                unauthenticatedHeader: document.getElementById('unauthenticatedHeader'),
                authenticatedHeader: document.getElementById('authenticatedHeader'),
                mainNavigation: document.getElementById('mainNavigation'),
                unauthenticatedContent: document.getElementById('unauthenticatedContent'),
                userName: document.getElementById('userName'),
                userAvatar: document.getElementById('userAvatar'),
                createTaskBtn: document.getElementById('createTaskBtn')
            };

            if (isAuthenticated && currentUser) {
                elements.unauthenticatedHeader?.classList.add('hidden');
                elements.unauthenticatedContent?.classList.add('hidden');
                elements.authenticatedHeader?.classList.remove('hidden');
                elements.mainNavigation?.classList.remove('hidden');
                
                if (elements.userName) elements.userName.textContent = currentUser.name;
                if (elements.userAvatar && currentUser.avatar) {
                    elements.userAvatar.src = currentUser.avatar;
                }
                
                if (elements.createTaskBtn) {
                    elements.createTaskBtn.disabled = false;
                    elements.createTaskBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            } else {
                elements.unauthenticatedHeader?.classList.remove('hidden');
                elements.unauthenticatedContent?.classList.remove('hidden');
                elements.authenticatedHeader?.classList.add('hidden');
                elements.mainNavigation?.classList.add('hidden');
                
                if (elements.createTaskBtn) {
                    elements.createTaskBtn.disabled = true;
                    elements.createTaskBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }

        function initSidebar() {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) return;

            if (window.innerWidth < 1024) {
                sidebar.classList.add('-translate-x-full');
                sidebarOpen = false;
            } else {
                sidebar.classList.remove('-translate-x-full');
                sidebarOpen = false;
            }
        }

        function toggleDarkMode() {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            initTheme();
            showNotification(`Modo ${darkMode ? 'oscuro' : 'claro'} activado`, 'success');
        }

        function toggleMobileSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            
            if (!sidebar) return;

            sidebarOpen = !sidebarOpen;
            if (sidebarOpen) {
                sidebar.classList.remove('-translate-x-full');
                overlay?.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay?.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        }

        function closeSidebar() {
            if (window.innerWidth < 1024) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('overlay');
                
                sidebarOpen = false;
                sidebar?.classList.add('-translate-x-full');
                overlay?.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        }

        function handleLogin(email, password) {
            if (!email || !password) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }

            showNotification('Iniciando sesión...', 'info');
            
            setTimeout(() => {
                const user = {
                    id: Date.now(),
                    name: email.split('@')[0],
                    email: email,
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                };
                
                isAuthenticated = true;
                currentUser = user;
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                closeModal('loginModal');
                updateUIState();
                showNotification(`¡Bienvenido ${user.name}!`, 'success');
            }, 1500);
        }

        function handleRegister(name, email, password) {
            if (!name || !email || !password) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }

            showNotification('Creando cuenta...', 'info');
            
            setTimeout(() => {
                const user = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                };
                
                isAuthenticated = true;
                currentUser = user;
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                closeModal('registerModal');
                updateUIState();
                showNotification(`¡Cuenta creada! Bienvenido ${user.name}!`, 'success');
            }, 1500);
        }

        function handleLogout() {
            if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                isAuthenticated = false;
                currentUser = null;
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('currentUser');
                
                closeModal('avatarModal');
                updateUIState();
                showNotification('Sesión cerrada exitosamente', 'success');
            }
        }

        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
                
                // Focus en primer input
                setTimeout(() => {
                    const firstInput = modal.querySelector('input');
                    if (firstInput) firstInput.focus();
                }, 100);
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                
                // Reset form si existe
                const form = modal.querySelector('form');
                if (form) form.reset();
            }
        }

        function changeAvatar(newAvatarSrc) {
            const userAvatar = document.getElementById('userAvatar');
            if (userAvatar) {
                userAvatar.src = newAvatarSrc;
            }
            
            if (currentUser) {
                currentUser.avatar = newAvatarSrc;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            
            closeModal('avatarModal');
            showNotification('Avatar actualizado correctamente', 'success');
        }

        function handleAvatarUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                showNotification('Por favor selecciona una imagen válida', 'error');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                showNotification('El archivo es demasiado grande. Máximo 2MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                changeAvatar(e.target.result);
            };
            reader.onerror = function() {
                showNotification('Error al cargar la imagen', 'error');
            };
            reader.readAsDataURL(file);
        }

        function setActiveLink(hash) {
            const links = document.querySelectorAll('.sidebar-link');
            links.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active-link');
                }
            });
            
            // Actualizar título
            const titles = {
                '#home': 'Inicio',
                '#calendario': 'Calendario', 
                '#tareas': 'Tareas',
                '#proyectos': 'Proyectos',
                '#progreso': 'Progreso'
            };
            
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.textContent = titles[hash] || 'Planix';
            }
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500', 
                warning: 'bg-yellow-500',
                info: 'bg-blue-500'
            };
            
            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle', 
                info: 'fa-info-circle'
            };
            
            notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${colors[type]} text-white max-w-sm`;
            
            notification.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="fas ${icons[type]}"></i>
                    <span class="flex-1">${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-2 opacity-70 hover:opacity-100">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.remove('translate-x-full'), 100);
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.classList.add('translate-x-full');
                    setTimeout(() => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }
            }, 5000);
        }

        function animateElements() {
            setTimeout(() => {
                const elements = document.querySelectorAll('.slide-in-left');
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('active');
                    }, index * 100);
                });
            }, 200);
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function setupEventListeners() {
            // Botones de autenticación
            document.getElementById('showLogin')?.addEventListener('click', () => openModal('loginModal'));
            document.getElementById('showRegister')?.addEventListener('click', () => openModal('registerModal'));
            document.getElementById('closeLogin')?.addEventListener('click', () => closeModal('loginModal'));
            document.getElementById('closeRegister')?.addEventListener('click', () => closeModal('registerModal'));
            document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
            
            // Cambios entre modales
            document.getElementById('switchToRegister')?.addEventListener('click', () => {
                closeModal('loginModal');
                setTimeout(() => openModal('registerModal'), 300);
            });
            
            document.getElementById('switchToLogin')?.addEventListener('click', () => {
                closeModal('registerModal');
                setTimeout(() => openModal('loginModal'), 300);
            });

            // Formularios
            document.getElementById('loginForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                handleLogin(email, password);
            });

            document.getElementById('registerForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value; 
                const password = document.getElementById('registerPassword').value;
                handleRegister(name, email, password);
            });

            // Sidebar
            document.getElementById('mobileSidebarToggle')?.addEventListener('click', toggleMobileSidebar);
            document.getElementById('toggleSidebar')?.addEventListener('click', closeSidebar);
            document.getElementById('overlay')?.addEventListener('click', closeSidebar);
            
            // Dark mode
            document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
            document.getElementById('darkModeToggleFooter')?.addEventListener('click', toggleDarkMode);

            // Avatar
            document.getElementById('userAvatar')?.addEventListener('click', () => {
                if (isAuthenticated) {
                    openModal('avatarModal');
                } else {
                    showNotification('Debes iniciar sesión primero', 'warning');
                }
            });
            
            document.getElementById('closeAvatarModal')?.addEventListener('click', () => closeModal('avatarModal'));
            document.getElementById('uploadCustomAvatar')?.addEventListener('click', () => {
                document.getElementById('avatarFileInput')?.click();
            });
            document.getElementById('avatarFileInput')?.addEventListener('change', handleAvatarUpload);

            // Opciones de avatar
            document.querySelectorAll('.avatar-option').forEach(option => {
                option.addEventListener('click', () => {
                    if (option.dataset.avatar === 'gradient') {
                        const canvas = document.createElement('canvas');
                        canvas.width = 80;
                        canvas.height = 80;
                        const ctx = canvas.getContext('2d');
                        
                        const gradient = ctx.createLinearGradient(0, 0, 80, 80);
                        gradient.addColorStop(0, '#60a5fa');
                        gradient.addColorStop(1, '#a855f7');
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, 80, 80);
                        
                        ctx.fillStyle = 'white';
                        ctx.font = 'bold 24px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('👤', 40, 40);
                        
                        changeAvatar(canvas.toDataURL());
                    } else {
                        changeAvatar(option.src);
                    }
                });
            });

            // Enlaces de navegación
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    if (!isAuthenticated) {
                        e.preventDefault();
                        showNotification('Debes iniciar sesión para acceder', 'warning');
                        return;
                    }
                    
                    setActiveLink(link.getAttribute('href'));
                    
                    if (window.innerWidth < 1024) {
                        setTimeout(closeSidebar, 150);
                    }
                });
            });

            // Botón crear tarea
            document.getElementById('createTaskBtn')?.addEventListener('click', (e) => {
                if (!isAuthenticated) {
                    e.preventDefault();
                    showNotification('Debes iniciar sesión para crear tareas', 'warning');
                } else {
                    showNotification('Función de crear tarea próximamente', 'info');
                }
            });

            // Cerrar modales con clic fuera
            ['loginModal', 'registerModal', 'avatarModal'].forEach(modalId => {
                const modal = document.getElementById(modalId);
                modal?.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal(modalId);
                });
            });

            // Eventos de ventana
            window.addEventListener('resize', () => {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('overlay');
                
                if (window.innerWidth >= 1024) {
                    sidebar?.classList.remove('-translate-x-full');
                    overlay?.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                    sidebarOpen = false;
                } else if (!sidebarOpen) {
                    sidebar?.classList.add('-translate-x-full');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const openModals = ['loginModal', 'registerModal', 'avatarModal'];
                    for (const modalId of openModals) {
                        const modal = document.getElementById(modalId);
                        if (modal && !modal.classList.contains('hidden')) {
                            closeModal(modalId);
                            break;
                        }
                    }
                    
                    if (sidebarOpen && window.innerWidth < 1024) {
                        closeSidebar();
                    }
                }
            });
        }

        // API pública
        window.PlanixApp = {
            showNotification,
            toggleDarkMode,
            isAuthenticated: () => isAuthenticated,
            getCurrentUser: () => currentUser,
            version: '1.0.0'
        };
