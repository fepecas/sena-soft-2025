use("senasoft");

db.instructores.insertMany([
  {
    id: "INST_001",
    nombre: "Carlos Andrés",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@sena.edu.co",
    especialidades: ["JavaScript", "React", "Node.js"],
    centroId: "CENTRO_001",
    experiencia: 8,
    calificacion: 5,
    activo: true
  },
  {
    id: "INST_002", 
    nombre: "Ana María",
    apellido: "García",
    email: "ana.garcia@sena.edu.co",
    especialidades: ["Python", "Django", "Bases de Datos"],
    centroId: "CENTRO_001",
    experiencia: 6,
    calificacion: 5,
    activo: true
  },
  {
    id: "INST_003",
    nombre: "Miguel Ángel", 
    apellido: "López",
    email: "miguel.lopez@sena.edu.co",
    especialidades: ["Java", "Spring", "Microservicios"],
    centroId: "CENTRO_002",
    experiencia: 10,
    calificacion: 5,
    activo: true
  },
  {
    id: "INST_004",
    nombre: "Diana Patricia",
    apellido: "Martínez",
    email: "diana.martinez@sena.edu.co", 
    especialidades: ["Redes", "Cisco", "Seguridad"],
    centroId: "CENTRO_002",
    experiencia: 7,
    calificacion: 4,
    activo: true
  },
  {
    id: "INST_005",
    nombre: "Roberto",
    apellido: "Silva",
    email: "roberto.silva@sena.edu.co",
    especialidades: ["Diseño", "Adobe", "UX/UI"],
    centroId: "CENTRO_003",
    experiencia: 5,
    calificacion: 4,
    activo: true
  },
  // ... continuar patrón para 45 instructores más
  {
    id: "INST_050",
    nombre: "Valentina",
    apellido: "Torres",
    email: "valentina.torres@sena.edu.co",
    especialidades: ["Multimedia", "Video", "Animación"], 
    centroId: "CENTRO_010",
    experiencia: 4,
    calificacion: 4,
    activo: true
  }
]);
