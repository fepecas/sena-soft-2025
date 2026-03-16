# 📖 Libro Vivo — Diario Digital con IA Acompañante

## 🌟 Resumen
**Libro Vivo** es un diario digital en formato de libro virtual, diseñado para personas que buscan **bienestar emocional y desarrollo personal**.  
Permite organizar escritos en libros y notas, usar etiquetas y un índice estructurado.  
Integra un **acompañante de IA opcional** que genera resúmenes y preguntas reflexivas, sin juicios ni consejos, ofreciendo un espacio íntimo y seguro.

---

## 🔑 Funcionalidades Clave
- **Biblioteca de Libros**: colección de diarios organizados como libros, cada uno con su índice.  
- **Notas dentro de Libros**: escritura diaria con opciones de formato básico (negritas, subrayado, resaltado).  
- **Etiquetas y Categorías**: clasificación de notas por temas como *nostalgia, gratitud, inspiración*.  
- **Índice Expandible**: navegación rápida entre capítulos y notas.  
- **Notas de Acompañante (IA)**:
  - *Resúmenes inmediatos* de notas.
  - *Preguntas reflexivas* durante la escritura.
  - *Notas automáticas cada 3 días* si hay actividad.  
- **Búsqueda Avanzada**: por palabras clave, etiquetas y fechas.  
- **Animación de Libro**: simula pasar páginas para mayor cercanía emocional.  
- **Privacidad y Control**: el usuario decide cuándo activar la IA; los textos personales permanecen intactos.  

---

## 🛠️ Requisitos Técnicos
- **Framework**: React (con Zustand o Context API para estado).  
- **UI**: TailwindCSS + Material 3 Components (Card, Button, Modal, List, Chip, Tabs).  
- **Persistencia**: LocalStorage con JSON (`libros.json`, `notasIA.json`).  
- **Animaciones**: Framer Motion (transiciones + efecto de pasar hoja).  
- **Tema**: claro/oscuro con `theme-provider.tsx`.  
- **Tipografía**: Plus Jakarta Sans.  

---

## 👤 Flujo de Usuario
1. **Abrir app** → ver biblioteca con libros en tarjetas.  
2. **Crear Libro** → añadir título.  
3. **Escribir Nota** → editor con etiquetas.  
4. **Invocar IA (opcional)** → botón para generar resumen o pregunta reflexiva.  
5. **Guardar Reflexión** → queda en la sección separada de *Notas de Acompañante*.  
6. **Recibir Nota Automática** → cada 3 días, resumen de los escritos recientes.  
7. **Explorar y Buscar** → navegar por índice, etiquetas o búsqueda avanzada.  

---

## 💡 Impacto
- **Bienestar emocional**: procesar emociones, reducir ansiedad, generar claridad mental.  
- **Desarrollo personal**: reconocer patrones, mejorar decisiones, fortalecer autoconfianza.  
- **Hábito positivo**: fomentar escritura constante como práctica de autocuidado.  

---
