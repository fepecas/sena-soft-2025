-- Entrevista con ChatGTP --
    ° Tenemos al siguiente usuario con las siguientes caracteristicas: 
    Sebastián un estudiante de programación de 17 años que quiere reforzar sus conocimientos sobre lenguajes de programación ya que no le parece suficiente el aprendizaje que tiene en clases.
    Crea una entrevista de máximo 5 preguntas de una persona con e l perfil de Sebastián. 

    °Simula ser Sebastián y dame las respuestas a la preguntas ya planteadas.

-- Interfaces con Stitch --

    °Contexto
    Tenemos a Sebastián un estudiante de programación que quiere reforzar sus conocimientos sobre lenguajes de programación ya que no le parece suficiente el aprendizaje que tiene en clases.

    Sistema planteado: 
    Se tiene planteado a 'Coderoots' una plataforma con inteligencia artificial integrada que podrá ofrecer espacios donde se puedan estudiar y reforzar conceptos básicos, intermedios y avanzados sobre programación y lenguajes de programación (Principalmente Python, JavaScript, Java, SQL y C#) permitiendo a estudiantes reforzar conceptos vistos o conocer nuevos.

    Pantallas contener:
	1- Inicio de sesión 
	Donde tendrá un formulario que solo contendrá dos campos para ingresar el correo y contraseña junto con un pequeño apartado de texto en el inferior de ambos campos que permitirá recuperar la contraseña
	2- Home 
	Allí se verán cuatro apartados, el primero será sobre los conceptos de programación, el segundo sobre los lenguajes de programación a enseñar o reforzar, el tercero para generar un plan de estudio, y el ultimo en donde se podrá ver el progreso del estudiante según el plan de estudio
	3- Conceptos de programación:  Ingresado a este apartado de podrán ver tres tarjetas que traten conceptos de programación dividido en tres niveles, básico, intermedio y avanzados 
	4- Lenguajes de programación: Se podrán ver diferentes tarjetas con imágenes y breves descripciones en su inferior sobre el lenguaje de programación a tratar en esa tarjeta, cada una de estas se dividirá en 3 niveles que irán de básico, intermedio y terminando en avanzado
	5- Plan de estudio: Se desplegara un formulario con el cual se identificara las preferencias y  necesidades de aprendizaje del estudiante con el cual se generara un plan de estudio asistido con inteligencia artificial 
    6- Seguimiento: Según el avance se le mostrara al estudiante dashboard con sus avances y resultados en los apartados de estudio ya sean de programación, lenguajes o ambos  que haya decido reforzar.

-- Prototipado con V0 --

CodeRoots

    1. CodeRoots-Aprende a programar desde la raíz Estamos construyendo CodeRoots, plataforma de aprendizaje enfocado en programación con inteligencia artificial integrada para estudiantes que quieran iniciar en el mundo de la programación, reforzar conceptos básicos, intermedios y avanzados además de aprender de lenguajes de programación (Python, JavaScript, Java, SQL y C#) y su uso actual en el mercado, de esta manera buscamos que los estudiantes refuercen sus conceptos vistos en su formación o aprender nuevos conceptos que les permitan avanzar en su experiencia como programadores.

    2. Funcionalidades Principales:
    - Inicio de sesión, se debe mostrar un formulario con 2 campos, el primero para ingresar el correo electrónico y el segundo para ingresar la contraseña del usuario, además deberá tener un apartado de texto en debajo de los campos que permita a el usuario recuperar su contraseña en caso de ser olvidada.
    - La pantalla principal debe mostrar 4 apartados:
        1 – Conceptos de programación, este apartado tendrá una sección en la que presenta la opción de fundamentos de la programación, debe tener una descripción y un botón de redirección a la pantalla correspondiente.
        2 – Lenguajes de Programación, este apartado deberá presentar tarjetas con imágenes de cada uno de los lenguajes de programación disponibles en la plataforma, cada tarjeta deberá tener el nombre y una breve descripción del lenguaje de programación, estas tarjetas deberán presentarse en un carrusel.
        3 – Generar Plan de Estudio, este apartado tendrá una sección en la que presenta la opción de plan de estudio, debe tener una descripción y un botón de redirección a la pantalla correspondiente.
        4 – Progreso del estudiante, este apartado deberá presentar una barra de progreso general de los contenidos presentados en la plataforma, además de una grafica de barras separada por los días de la semana presentando cuantas horas se estudio en la semana y en qué días se desarrollaron las horas, además deberá tener un botón de redirección a la pantalla correspondiente.

    - La pantalla secundaria “Conceptos de programación”, al ingresar a este apartado se debe presentar 3 tarjetas con conceptos de programación, cada tarjeta debe tener una descripción del contenido de la misma, estas tarjetas deben ser seleccionables y se dividirán en 3 niveles, “Básico”, “Intermedio” y “Avanzado”.
    - La pantalla secundaria “Lenguajes de Programación”, al ingresar a este apartado se deberán presentar tarjetas con los lenguajes de programación disponibles dentro de la plataforma, cada tarjeta debe tener una imagen relacionada al lenguaje, un nombre y una breve descripción, las tarjetas deben estar divididas en 3 niveles, “Nivel Básico”, “Nivel Intermedio” y “Nivel Avanzado”.
    - La pantalla secundaria “Plan de estudio”, al ingresar a este apartado se desplegará un formulario dentro del cual se identificarán las preferencias y necesidades de aprendizaje del estudiante, en base a este formulario se generará un plan de estudio con los contenidos disponibles dentro de la plataforma con ayuda de inteligencia artificial.
    - La pantalla secundaria “Mi progreso”, al ingresar a este apartado se mostrará una barra de progreso total según los contenidos completados dentro de la plataforma, además se mostrarán secciones en las que presente el progreso actual de cursos específicos que este desarrollando, además de un apartado de resultados.
    Flujo de usuario:
        1 – Pantalla principal
        -	El usuario ingresa a la plataforma y ve inmediatamente la pantalla principal con los apartados disponibles (Conceptos de programación, Lenguajes de programación, Genera un plan de estudio y Progreso del estudiante).
        2 – Conceptos de programación:
        -	El usuario toca el botón de “explorar conceptos de programación” desde la pantalla principal.
        -	Se le presenta al usuario la pantalla de selección de niveles de conceptos, con el nivel básico, intermedio y avanzado.
        3 – Lenguajes de programación:
        -	El usuario selecciona una de las tarjetas de lenguaje de programación desde la pantalla principal.
        -	Se abre un modal con la imagen, titulo y descripción del lenguaje y un botón para redirigir a la pantalla del curso seleccionado.
        4 – Genera un plan de estudio:
        -	El usuario toca el botón de “generar plan” desde la pantalla principal.
        -	Se le presenta a el usuario la pantalla con el formulario de preferencias.
        -	En base a las respuestas se presentan los cursos disponibles y le permite al usuario seleccionar los que desea añadir a su plan de estudio.
        5 – Progreso del estudiante:
        -	El usuario toca el botón de “mi progreso” desde la pantalla principal.
        -	Se le presenta a el usuario la pantalla con la barra de progreso general.
        -	Se presentan secciones para cada curso del usuario y el progreso del mismo con graficas de barras según los módulos finalizados.
        -	Cada sección del curso debe redirigir a el respectivo curso si el usuario la selecciona.

    3. Ahora porfavor genera las demas pantallas explicadas en el prompt y conectalas con esa pantalla principal


    4. Bien, ahora genera una pantalla de inicio de sesion conectada a las pantallas ya generadas.

    5. Bien, remueve el nav duplicado de la parte superior, tambien en la pantalla de conceptos de programacion cuando el usuario de click en la tarjeta despligua un modal con la infomacion extendida del concepto

    6. bien, ahora generaremos una nueva pantalla, en el apartado de lenguajes de programacion al dar al boton de comenzar con el curso redirigira a una nueva pantalla presentando el curso como si fuera la primersa leccion del mismo.
    
    7. correcto, ahora en la pantalla principal el boton de "explorar gratis" debe redirigir a la parte superior de la pantalla principal. Ademas que el boton de continuar aprendiendo debe redirigin a la pantalla de conceptos.

    8. para finalzar, genera una nueva pantalla para el apartadod e conceptos de programacion, similar al de lenguajes, cuando des al boton de comenzar leccion redirecciona a una nueva pantalla con la informacion extendida simulando la leccion.

    9. el apartado de genera tu plan semanal dejo de funcionar, aunque seleccione una opcion este no permite continuar.

    



