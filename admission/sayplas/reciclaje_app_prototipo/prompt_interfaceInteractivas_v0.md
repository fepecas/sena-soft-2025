# Especificaciones de la Aplicación Móvil (Flujo de Pantallas)

En base a las siguientes imágenes necesito que muestres la aplicación funcional.  
Se trata de una **APP MÓVIL**. Te doy las interfaces, explico el orden y su flujo.  

## Pantalla 1 (Inicial) – `inicio_sesion.png`
- Inicio de sesión o registro.  
- Al dar click en **Continuar** → pasa a la **Pantalla 2**.  
- **Nota:** no tiene menú inferior ni flecha de retroceso.  

## Pantalla 2 – (Seleccionar Rol) **[CREAR]**
- Interfaz nueva (basada en el mismo patrón de diseño y colores de las demás).  
- Debe permitir elegir entre:
  - **Ciudadano** → pasa a **Pantalla 3**.  
  - **Reciclador** → pasa a **Pantalla 4**.  
- Debe tener un botón **Continuar**.  
- **Nota:** no tiene menú inferior ni flecha de retroceso.  

## Pantalla 3 – `registro_exitoso.png`
- Inicio de sesión exitoso como ciudadano.  
- Al dar click en **Continuar** → pasa a **Pantalla 5**.  
- **Nota:** no tiene menú inferior ni flecha de retroceso.  

## Pantalla 4 – `registro_exitoso_reciclador.png`
- Inicio de sesión exitoso como reciclador.  
- Al dar click en **Continuar** → pasa a **Pantalla 11**.  
- **Nota:** no tiene menú inferior ni flecha de retroceso.  

## Pantalla 5 – `pantalla_principal.png`
- Pantalla principal (Ciudadano).  
- Acciones:
  - **Icono usuario (menú inferior)** → Pantalla 6.  
  - **Icono publicaciones (menú inferior)** → Pantalla 7.  
  - **Icono más (menú inferior)** → Pantalla 9.  
  - **Botón “Mis reportes” (superior)** → Pantalla 8.  
- **Menú inferior:** casa → 5, más → 9, perfil → 6, calendario → 7, campana → 8.  

## Pantalla 6 – `info_perfil.png`
- Perfil del ciudadano.  
- Acciones:
  - **Cerrar sesión** → Pantalla 1.  
- **Nota:** no tiene menú inferior.  

## Pantalla 7 – `publicaciones.png`
- Red social enfocada en reciclaje.  
- **Menú inferior:** casa → 5, más → 9, perfil → 6, calendario → 7, campana → 8.  

## Pantalla 8 – `reportes.png`
- Interfaz de reportes.  
- Acciones:
  - **Botón reportar** → Pantalla 10.  
- **Menú inferior:** casa → 5, más → 9, perfil → 6, calendario → 7, campana → 8.  

## Pantalla 9 – `reportar_reciclaje.png`
- Reportar reciclaje.  
- **Nota:** no tiene menú inferior.  

## Pantalla 10 – `reporte_exitoso.png`
- Reporte exitoso.  
- Acciones:
  - **Botón Volver** → Pantalla 5.  

## Pantalla 11 – `main_reciclador.png`
- Pantalla principal del reciclador.  
- Acciones:
  - **Icono usuario (menú inferior)** → Pantalla 12.  
  - **Icono estadísticas (menú inferior)** → Pantalla 13.  
  - **Icono notificaciones (menú inferior)** → Pantalla 14.  
  - **Icono publicaciones (menú inferior)** → Pantalla 7.  
- **Menú inferior:** campana → 14, lupa → 11, gráfico de barras → 13, calendario → 7, perfil → 12.  

## Pantalla 12 – `perfil_reciclador.png`
- Perfil del reciclador.  
- Acciones:
  - **Cerrar sesión** → Pantalla 1.  
- **Nota:** no tiene menú inferior.  

## Pantalla 13 – `estadisticas.png`
- Estadísticas del reciclador.  
- **Menú inferior:** campana → 14, lupa → 11, gráfico → 13, calendario → 7, perfil → 12.  

## Pantalla 14 – `notificaciones_reciclador.png`
- Notificaciones.  
- Acciones:
  - **Botón Ver más** → Pantalla 15.  
- **Menú inferior:** campana → 14, lupa → 11, gráfico → 13, calendario → 7, perfil → 12.  

## Pantalla 15 – `verMas_notificacion_repartidor.png`
- Reporte de un ciudadano.  
- **Menú inferior:** campana → 14, lupa → 11, gráfico → 13, calendario → 7, perfil → 12.  

# Instrucciones Adicionales

1. **Pantallas sin menú inferior:** 1, 2, 3, 4, 6, 9, 12.  
2. **Pantallas sin flecha de retroceso:** 1, 2, 3, 4.  
3. **Pantallas con menú inferior (Ciudadano):** 5, 7, 8.  
   - Casa → 5  
   - Más → 9  
   - Perfil → 6  
   - Calendario → 7  
   - Campana → 8  
4. **Pantallas con menú inferior (Reciclador):** 11, 13, 14, 15.  
   - Campana → 14  
   - Lupa → 11  
   - Gráfico de barras → 13  
   - Calendario → 7  
   - Perfil → 12  

# Resumen
- La única pantalla nueva a **crear** es la **Pantalla 2 (Seleccionar Rol)**.  
- Todas las demás deben integrarse tal cual con las imágenes y el flujo descrito.  
- Respetar el diseño, colores y patrones ya definidos.  
