Resumen

Local Connect AI — Negocios inteligentes en tu ciudad
Estamos construyendo Local Connect AI, una aplicación móvil que conecta a usuarios con negocios locales de forma moderna y personalizada gracias a la integración de Inteligencia Artificial.
Cada negocio tendrá un perfil completo y los usuarios podrán explorar, buscar y descubrir empresas en su ciudad, además de crear una lista de favoritos.

Funcionalidades Principales

Pantalla principal: lista de tarjetas de negocios. Cada tarjeta incluye:

Imagen principal del negocio.

Nombre del negocio.

Categoría o especialidad.

Cantidad de seguidores.

Ubicación dentro de la ciudad.

Barra de búsqueda rápida con sugerencias inteligentes (IA predictiva).

Sección de destacados de la semana: muestra los negocios más populares con un breve resumen.

Lista de favoritos: el usuario puede guardar y gestionar negocios que le interesen.

Perfil del negocio/usuario: con foto/logo, descripción, servicios, opiniones y botón de "Seguir".

Integración de IA:

Recomendaciones personalizadas de negocios según intereses y ubicación.

Asistente virtual para descubrir tendencias o responder preguntas rápidas.

Requisitos Técnicos

Construcción en React Native (móvil-first).

Gestión de estado local con persistencia en JSON.

Diseño adaptable (responsive) para móviles y tablets.

Selector de tema claro/oscuro, con el modo claro como predeterminado.

Persistencia en almacenamiento local para favoritos y configuración.

Integración con un modelo de IA (recomendaciones y búsqueda inteligente).

Flujo de Usuario
Explorar Negocios

El usuario abre la app y ve inmediatamente un feed con tarjetas de negocios.

Cada tarjeta muestra imagen, nombre, categoría, seguidores y ubicación.

Buscar con IA

El usuario escribe en la barra de búsqueda.

El sistema muestra resultados predictivos y recomendaciones inteligentes.

Ver Detalles

Al tocar una tarjeta, se abre un modal desde abajo con información completa del negocio:

Imagen destacada.

Descripción y servicios.

Opiniones de clientes.

Botón "Seguir" o "Añadir a favoritos".

Destacados de la Semana

El usuario entra a la pestaña de Destacados.

Ve un resumen de los negocios más populares según métricas de la semana.

Puede explorar o seguirlos desde ahí.

Favoritos

En la pestaña Favoritos, el usuario encuentra todos los negocios que ha marcado.

Puede organizarlos, eliminarlos o acceder rápido a sus perfiles.

Perfil de Usuario/Negocio

El usuario puede configurar su propio perfil como cliente o negocio.

Si es negocio: sube logo, fotos, servicios, categoría y recibe métricas de seguidores.

Si es usuario: personaliza su perfil, preferencias y lista de favoritos.

Estructura

Menú de navegación inferior con 4 secciones:

Inicio

Destacados

Favoritos

Perfil

Cards personalizadas para negocios.

Componente de búsqueda inteligente.

Componentes de lista para favoritos y destacados.

Perfil dinámico (usuario o negocio).

Diseño

Estilo minimalista y limpio, con efecto Liquid Glass inspirado en iOS 26.

Colores modernos: azules con degradados y blancos.

Tipografía: Orbitron — Sans Serif, futurista y legible.

Construido con:

React Native + Tailwind para UI.

Material 3 para componentes: Button, Card, Typography, Avatar, Command, Sheet, etc.

Animaciones con Framer Motion para transiciones suaves.

Paleta neutra con tema claro/oscuro (variables de Material 3).

Theme-provider para manejar el cambio de temas.

Cada componente en su propio archivo (.tsx): card, navbar, modal, lista, etc.