# 🗄️ QA en Bases de Datos

Las bases de datos son un componente crítico de cualquier MVP. El rol de QA es garantizar que los datos sean correctos, consistentes, seguros y eficientes de consultar.

## 1. Buenas prácticas generales de QA en bases de datos

- **Validación de esquemas**: asegurarse de que las tablas/colecciones cumplen con lo definido en los requisitos.

- **Integridad de datos**: probar constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK).

- **Migraciones seguras**: verificar que los cambios de esquema no rompen datos previos.

- **Pruebas con datos realistas**: usar datasets que simulen casos reales (no solo mocks triviales).

- **Backups y recuperación**: comprobar que el sistema puede restaurarse tras fallos.

- **Índices**: validar que existen índices en campos usados en consultas críticas.

## 2. Bases de datos relacionales (SQL)

Ejemplos: PostgreSQL, MySQL, SQL Server, MariaDB, Oracle.

- **Unitarias**: verificar funciones almacenadas, triggers, procedimientos.

- **Integración**: probar consultas JOIN y relaciones entre tablas.

- **Carga**: usar pgbench (PostgreSQL) o sysbench (MySQL) para simular transacciones.

- **Seguridad**:

    - Revisar permisos de usuario (``GRANT/REVOKE``).

    - Validar protección contra inyecciones SQL (usando consultas preparadas).

- **QA Tip**: siempre usar migraciones versionadas (Flyway, Liquibase).

## 3. Bases de datos no relacionales (NoSQL)

Ejemplos: MongoDB, Cassandra, DynamoDB, Redis.

- **Validación de esquemas flexibles**: usar validadores de JSON Schema en MongoDB.

- **Integridad eventual**: probar concurrencia y consistencia (lecturas/escrituras).

- **Performance**:

    - **MongoDB**: ``explain()`` para analizar queries.

    - **Redis**: medir latencia y TTLs en caché.

- **Seguridad**:

    - Validar autenticación habilitada (MongoDB sin auth = 🔴).

    - Revisar configuración de red (no exponer sin firewall).

## 4. Bases de datos vectoriales

Ejemplos: Pinecone, Weaviate, Milvus, Qdrant.

- **Validación de embeddings**: probar inserción y recuperación de vectores.

- **Pruebas de similitud**: verificar que las búsquedas devuelvan resultados relevantes.

- **Carga**: simular queries con alto volumen de vectores (miles/millones).

- **Seguridad**: validar cifrado de datos en tránsito (TLS).

👉 En hackathon: usar datasets pequeños para validar relevancia de búsqueda.

## 5. Bases de datos de grafos

Ejemplos: Neo4j, ArangoDB, Amazon Neptune.

- **Validación de relaciones**: QA debe probar que las conexiones entre nodos reflejan el modelo.

- **Consultas Cypher/Gremlin**: probar queries de grafos más usadas.

- **Performance**: validar tiempos en consultas profundas (ej. caminos más cortos).

- **Seguridad**: roles y restricciones en accesos a nodos/aristas.

## 6. Bases de datos basadas en Blockchain

Ejemplos: Ethereum, Hyperledger, IPFS.

- **Pruebas de integridad**: confirmar que los datos no se pueden alterar.

- **Validación de contratos inteligentes**:

    - Unitarias con Truffle / Hardhat (Ethereum).

    - Revisar gas usage y seguridad en funciones críticas.

- **Performance**: medir tiempos de transacción y confirmación.

- **Seguridad**: auditar dependencias y contratos con MythX o Slither.

## 7. Herramientas comunes para QA en bases de datos

- **SQL**:

    - pgAdmin, DBeaver (gestión y pruebas manuales).

    - Flyway, Liquibase (migraciones seguras).

- **NoSQL**:

    - MongoDB Compass, Dynobase, RedisInsight.

- **Carga / Stress**:

    - JMeter, Locust, k6 (para endpoints que interactúan con DB).

- **Seguridad**:

    - SQLMap (detección de inyecciones).

    - SonarQube (análisis de código que interactúa con DB).

## 8. Recomendaciones rápidas (Hackathon)

- **Relacionales**: usar migraciones y validar constraints básicos.

- **NoSQL**: testear queries más críticas con datasets pequeños.

- **Vectoriales**: validar búsqueda de similitud con ejemplos reales.

- **Grafos**: probar al menos una consulta Cypher/Gremlin que refleje el caso de uso.

- **Blockchain**: correr unit tests en contratos y validar gas.

👉 Entrega mínima:

- 1–2 pruebas de integridad de datos.

- Validar queries principales.

- Comprobar permisos de acceso básicos.

✅ Atenea podrá recomendar buenas prácticas de QA para cualquier tipo de base de datos usada en el MVP.