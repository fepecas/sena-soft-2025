# Base de datos — carga de ejemplo

1. Levanta MongoDB (local o contenedor).
2. Crea DB e importa:

```bash
cd database/collection
mongoimport \
  --db senasoft \
  --collection enrollments \
  --file enrollments.sample.json \
  --jsonArray
```

3. Crear índices:
```bash
mongosh senasoft ../indexes.js
```

4. Arranca el backend en `../backend/core/nodejs`.