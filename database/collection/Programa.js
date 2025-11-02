use("senasoft");

db.programas.insertMany([
  {
    id: "PROG_001",
    nombre: "Desarrollo de Software",
    codigo: "ADSO", 
    duracion: 24,
    modalidad: "presencial",
    nivel: "tecnologo",
    activo: true
  },
  {
    id: "PROG_002",
    nombre: "Análisis y Desarrollo de Sistemas de Información",
    codigo: "ADSI",
    duracion: 24, 
    modalidad: "mixta",
    nivel: "tecnologo",
    activo: true
  },
  {
    id: "PROG_003", 
    nombre: "Gestión de Redes de Datos",
    codigo: "GRD",
    duracion: 18,
    modalidad: "presencial", 
    nivel: "tecnico",
    activo: true
  },
  {
    id: "PROG_004",
    nombre: "Diseño e Integración de Multimedia", 
    codigo: "DIM",
    duracion: 18,
    modalidad: "virtual",
    nivel: "tecnico",
    activo: true
  }
]);
