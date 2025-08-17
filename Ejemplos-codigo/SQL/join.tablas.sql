-- ByteMaster dice: JOIN une tablas que tienen relación entre sí
SELECT e.nombre, c.nombre_curso
FROM estudiantes e
JOIN cursos c ON e.curso_id = c.id;
-- bueno esto seria unas relacciones o bueno, un inner join entre tablas