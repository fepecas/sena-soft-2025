use("senasoft");

// Muestra de 20 aprendices (de los 2000 totales)
db.aprendices.insertMany([
  {
    id: "APREN_0001",
    nombre: "Ana María", 
    apellido: "Gómez",
    email: "ana.gomez@misena.edu.co",
    telefono: "3101234567",
    centroId: "CENTRO_001",
    programaId: "PROG_001", 
    departamento: "Antioquia",
    ciudad: "Medellín",
    githubUser: "ana_dev01",
    nivelIngles: "B1",
    fechaInscripcion: new Date("2025-01-15"),
    estado: "activo"
  },
  {
    id: "APREN_0002",
    nombre: "Carlos",
    apellido: "Hernández", 
    email: "carlos.hernandez@misena.edu.co",
    telefono: "3109876543",
    centroId: "CENTRO_001", 
    programaId: "PROG_002",
    departamento: "Antioquia",
    ciudad: "Medellín",
    githubUser: null,
    nivelIngles: "A2",
    fechaInscripcion: new Date("2025-01-16"), 
    estado: "activo"
  },
  {
    id: "APREN_0003",
    nombre: "Diana",
    apellido: "Ramírez",
    email: "diana.ramirez@misena.edu.co",
    telefono: "3207654321",
    centroId: "CENTRO_002",
    programaId: "PROG_001",
    departamento: "Cundinamarca", 
    ciudad: "Bogotá",
    githubUser: "diana_code", 
    nivelIngles: "B2",
    fechaInscripcion: new Date("2025-01-17"),
    estado: "activo"
  },
  {
    id: "APREN_0004", 
    nombre: "Eduardo",
    apellido: "Vargas",
    email: "eduardo.vargas@misena.edu.co",
    telefono: "3151122334",
    centroId: "CENTRO_003",
    programaId: "PROG_003",
    departamento: "Valle del Cauca",
    ciudad: "Cali", 
    githubUser: "edu_networks",
    nivelIngles: null,
    fechaInscripcion: new Date("2025-01-18"),
    estado: "activo"
  },
  {
    id: "APREN_0005",
    nombre: "Fernanda",
    apellido: "Cruz",
    email: "fernanda.cruz@misena.edu.co", 
    telefono: "3018887777",
    centroId: "CENTRO_004", 
    programaId: "PROG_004",
    departamento: "Atlántico",
    ciudad: "Barranquilla",
    githubUser: null,
    nivelIngles: "B1",
    fechaInscripcion: new Date("2025-01-19"),
    estado: "activo"
  },
  {
    id: "APREN_0006",
    nombre: "Gabriel",
    apellido: "Morales",
    email: "gabriel.morales@misena.edu.co",
    telefono: "3126669999", 
    centroId: "CENTRO_005",
    programaId: "PROG_001",
    departamento: "Santander", 
    ciudad: "Bucaramanga",
    githubUser: "gab_dev",
    nivelIngles: "A1",
    fechaInscripcion: new Date("2025-01-20"),
    estado: "activo"
  },
  {
    id: "APREN_0007",
    nombre: "Helena",
    apellido: "Jiménez",
    email: "helena.jimenez@misena.edu.co",
    telefono: "3175554444",
    centroId: "CENTRO_006",
    programaId: "PROG_002", 
    departamento: "Risaralda",
    ciudad: "Pereira",
    githubUser: null,
    nivelIngles: "B2", 
    fechaInscripción: new Date("2025-01-21"),
    estado: "activo"
  },
  {
    id: "APREN_0008",
    nombre: "Iván",
    apellido: "Restrepo",
    email: "ivan.restrepo@misena.edu.co",
    telefono: "3203331111",
    centroId: "CENTRO_007",
    programaId: "PROG_003",
    departamento: "Boyacá",
    ciudad: "Tunja", 
    githubUser: "ivan_networks",
    nivelIngles: null,
    fechaInscripcion: new Date("2025-01-22"),
    estado: "activo"
  },
  {
    id: "APREN_0009", 
    nombre: "Juliana",
    apellido: "Ospina",
    email: "juliana.ospina@misena.edu.co",
    telefono: "3142225555",
    centroId: "CENTRO_008",
    programaId: "PROG_004",
    departamento: "Norte de Santander",
    ciudad: "Cúcuta",
    githubUser: null,
    nivelIngles: "A2",
    fechaInscripcion: new Date("2025-01-23"),
    estado: "activo" 
  },
  {
    id: "APREN_0010",
    nombre: "Kevin",
    apellido: "Aguirre", 
    email: "kevin.aguirre@misena.edu.co",
    telefono: "3188889999",
    centroId: "CENTRO_009",
    programaId: "PROG_001", 
    departamento: "Tolima",
    ciudad: "Ibagué",
    githubUser: "kevin_fullstack",
    nivelIngles: "B1",
    fechaInscripcion: new Date("2025-01-24"),
    estado: "activo"
  }
  // ... continuar hasta APREN_2000 con distribución:
  // - 40% con githubUser
  // - 32% con nivelIngles B1/B2  
  // - Distribuidos por 10 centros
  // - 4 programas balanceados
  // - 23 departamentos colombianos
]);
